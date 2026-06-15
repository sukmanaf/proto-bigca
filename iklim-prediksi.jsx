// ============================================================
// iklim-prediksi.jsx — Tab B: Prediksi (ML workbench) untuk Iklim Wilayah
// Mode Titik (UC-1 klasifikasi, UC-2 suhu, UC-3 hujan) — auto-isi dari DB.
// Disclaimer: hasil bersifat indikatif/eksperimen (§13).
// ============================================================

const Icon = window.Icon;
const tr = window.tr;
const MONTHS = window.MONTHS_ID;

function TabPrediksi({ climate, committed, REGIONS, setTab, year }) {
  const TASKS = window.ML_TASKS;
  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];

  const [mode, setMode] = React.useState("titik");
  const [task, setTask] = React.useState("uc2");
  const [month, setMonth] = React.useState(6); // index bulan (0-11) → Jul=6
  const [result, setResult] = React.useState(null);
  const [running, setRunning] = React.useState(false);
  const [apiError, setApiError] = React.useState(null); // pesan error API (null = ok)

  // fitur auto-isi dari DB (series bulan terpilih + current)
  const base = climate.series[month];
  const [feat, setFeat] = React.useState(null);

  React.useEffect(() => {
    const b = climate.series[month];
    setFeat({
      rh: b.rh, wind: b.wind, rad: b.rad, cloud: climate.current?.cloud ?? 50,
      lat: kabObj.lat, lon: kabObj.lng,
    });
    setResult(null);
    setApiError(null);
  }, [month, committed.kab]);

  function setF(k, v) { setFeat(f => ({ ...f, [k]: v })); }

  async function runPredict() {
    setRunning(true);
    setResult(null);
    setApiError(null);

    const cfg = window.APP_CONFIG || {};
    if (cfg.ML_API_ENABLED && cfg.ML_API_URL != null) {
      try {
        if (cfg.ML_API_URL == null) throw new Error("ML_API_URL tidak dikonfigurasi di env.js");
        const b = climate.series[month];
        let res;
        if (task === "uc1") {
          // UC-1: klasifikasi cuaca — POST /v1/predict/weather
          const body = {
            suhu_c: b.t2m,
            kelembaban_pct: feat.rh,
            kecepatan_angin_kmh: +(feat.wind * 3.6).toFixed(1), // m/s → km/h
            arah_angin_deg: 180,
            tutupan_awan_pct: feat.cloud,
            lat: feat.lat,
            lon: feat.lon,
            datetime_local: new Date().toISOString().replace("T", " ").slice(0, 19),
          };
          const r = await fetch(`${cfg.ML_API_URL}/v1/predict/weather`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const data = await r.json();
          res = {
            kind: "class", value: data.predicted, prob: data.proba,
            modelVer: data.model_version,
            shap: data.shap && data.shap.length > 0 ? data.shap : null,
          };
        } else if (task === "uc2") {
          // UC-2: prediksi suhu bulanan — POST /v1/predict/climate
          const body = {
            lat: feat.lat, lon: feat.lon,
            month: month + 1, // frontend 0-11 → API 1-12
            rh2m: feat.rh,
            ws2m: feat.wind,
            allsky_sfc_sw_dwn: feat.rad,
          };
          const r = await fetch(`${cfg.ML_API_URL}/v1/predict/climate`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const data = await r.json();
          const val = +data.predicted.toFixed(2);
          res = {
            kind: "value", value: val, unit: "°C",
            ci: (data.ci_low !== null && data.ci_high !== null)
              ? [data.ci_low, data.ci_high] : null,
            modelVer: data.model_version,
            shap: data.shap && data.shap.length > 0 ? data.shap : null,
          };
        } else if (task === "uc3") {
          // UC-3: deteksi anomali — POST /v1/anomaly/check
          const b = climate.series[month];
          const body = {
            suhu_c: b.t2m,
            kelembaban_pct: feat.rh,
            curah_hujan_mm: b.precip,
            kecepatan_angin_kmh: +(feat.wind * 3.6).toFixed(1),
          };
          const r = await fetch(`${cfg.ML_API_URL}/v1/anomaly/check`, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const data = await r.json();
          res = {
            kind: "anomaly",
            is_anomaly: data.is_anomaly,
            reason: data.reason,
            anomaly_score: data.anomaly_score,
            method: data.method,
            modelVer: "UC3-IsoForest@dev",
            shap: null,
          };
        }
        setResult(res);
      } catch (err) {
        setApiError(`Gagal menghubungi ML API: ${err.message}`);
      }
    } else {
      setApiError("ML API dinonaktifkan (ML_API_ENABLED: false di env.js)");
    }
    setRunning(false);
  }

  const taskObj = TASKS.find(t => t.id === task);

  return (
    <div className="prediksi-body">
      {/* MODE + TASK */}
      <div className="pred-toolbar">
        <div className="pred-mode">
          <button className={`pred-mode-btn ${mode === "titik" ? "on" : ""}`} onClick={() => setMode("titik")}><Icon name="map-pin" size={13} /> {tr("Mode Titik")}</button>
          <button className={`pred-mode-btn ${mode === "area" ? "on" : ""}`} onClick={() => setMode("area")}><Icon name="grid-3x3" size={13} /> {tr("Mode Area/Grid")}</button>
        </div>
        <div className="pred-task">
          <label>{tr("Task ML")}</label>
          <select value={task} onChange={e => { setTask(e.target.value); setResult(null); }}>
            {window.ML_TASKS.map(t => <option key={t.id} value={t.id}>{t.code} · {t.name}</option>)}
          </select>
        </div>
        <div className="pred-autofill"><Icon name="database" size={13} /> {tr("Auto-isi dari DB")}</div>
      </div>

      {mode === "area" ? (
        <AreaGridPredict task={task} month={month} setMonth={setMonth} climate={climate} committed={committed} REGIONS={REGIONS} setTab={setTab} taskObj={taskObj} year={year} />
      ) : (
        <div className="pred-two">
          {/* PARAMETER */}
          <div className="rdtr-detail-card pred-params">
            <div className="rdtr-detail-head"><Icon name="sliders-horizontal" size={14} /> {tr("Parameter")} <span className="pred-params-hint">{tr("auto dari DB · bisa diedit")}</span></div>
            <div className="pred-form">
              <PField label={tr("Provinsi")}><input value={provObj.name} readOnly className="pred-ro" /></PField>
              <PField label={tr("Kota/Kab")}><input value={kabObj.name} readOnly className="pred-ro" /></PField>
              <PField label={tr("Bulan")}>
                <select value={month} onChange={e => setMonth(+e.target.value)}>
                  {MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}
                </select>
              </PField>
              {feat && <>
                <PField label="RH (%)"><input type="number" value={feat.rh} onChange={e => setF("rh", +e.target.value)} /></PField>
                <PField label={tr("Angin")+" (m/s)"}><input type="number" step="0.1" value={feat.wind} onChange={e => setF("wind", +e.target.value)} /></PField>
                <PField label={tr("Radiasi")}><input type="number" step="0.1" value={feat.rad} onChange={e => setF("rad", +e.target.value)} /></PField>
                <PField label={tr("Tutupan Awan")+" (%)"}><input type="number" value={feat.cloud} onChange={e => setF("cloud", +e.target.value)} /></PField>
                <PField label="Lat / Lon"><input value={feat.lat.toFixed(3) + " / " + feat.lon.toFixed(3)} readOnly className="pred-ro" /></PField>
              </>}
            </div>
            <button className="pred-run" onClick={runPredict} disabled={running}>
              {running ? <><span className="pred-spin" /> {tr("Memproses…")}</> : <><Icon name="play" size={15} /> {tr("PREDIKSI")}</>}
            </button>
            {apiError && (
              <div className="pred-api-warn">
                <Icon name="wifi-off" size={12} /> {apiError}
              </div>
            )}
          </div>

          {/* HASIL */}
          <div className="rdtr-detail-card pred-result">
            <div className="rdtr-detail-head"><Icon name="target" size={14} /> {tr("Hasil")}</div>
            {!result && !running && (
              <div className="pred-empty"><Icon name="sparkles" size={28} /><span>{tr("Isi parameter lalu klik Prediksi")}</span></div>
            )}
            {running && <div className="pred-empty"><span className="pred-spin big" /><span>{tr("Menjalankan model")} {taskObj.model}…</span></div>}
            {result && <ResultCard result={result} taskObj={taskObj} month={month} setTab={setTab} />}
          </div>
        </div>
      )}

      <div className="pred-disclaimer">
        <Icon name="alert-triangle" size={13} />
        {tr("Hasil prediksi bersifat indikatif/eksperimen untuk analisis & perencanaan — bukan pengganti prakiraan operasional resmi BMKG.")}
      </div>
    </div>
  );
}

function AreaGridPredict({ task, month, setMonth, climate, committed, REGIONS, setTab, taskObj, year }) {
  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];
  const kecObj = committed.kec && kabObj.kecLevel
    ? (kabObj.kec || []).find(k => k.code === committed.kec) || null
    : null;

  const defaultScope = kecObj ? "kec" : "kab";
  const [running, setRunning] = React.useState(false);
  const [grid, setGrid] = React.useState(null);
  const [progress, setProgress] = React.useState(0);
  const [gridError, setGridError] = React.useState(null);
  const [gridScope, setGridScope] = React.useState(defaultScope);

  React.useEffect(() => {
    const def = kecObj ? "kec" : "kab";
    setGrid(null); setGridError(null); setGridScope(def);
  }, [task, committed.kab, committed.kec]);

  const isClass = task === "uc1";
  const unit = task === "uc1" ? "" : "°C";

  // Scope yang tersedia: hanya bisa ke atas (kec → kab → prov)
  const availableScopes = [...(kecObj ? ["kec"] : []), "kab", "prov"];
  const scopeNames = {
    kec: kecObj ? kecObj.name : "",
    kab: kabObj.name,
    prov: provObj.name,
  };

  // Hitung center + span dari data yang ada — tidak hardcode per wilayah
  function computeGeo(scope) {
    if (scope === "prov") {
      const kabs = Object.values(provObj.kab);
      const lngs = kabs.map(k => k.lng), lats = kabs.map(k => k.lat);
      const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats), maxLat = Math.max(...lats);
      const s = Math.max(maxLng - minLng, maxLat - minLat) * 1.6 || 0.5;
      const c = [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
      const z = s < 0.3 ? 11 : s < 0.8 ? 9 : s < 1.5 ? 8 : s < 3 ? 7 : 6;
      return { center: c, span: s, mapZoom: z };
    }
    if (scope === "kec" && kecObj) {
      return { center: [kecObj.lng, kecObj.lat], span: 0.05, mapZoom: 14 };
    }
    // kab: hitung dari bounding box kecamatan jika ada, jika tidak pakai default
    if (kabObj.kecLevel && kabObj.kec && kabObj.kec.length > 0) {
      const lngs = kabObj.kec.map(k => k.lng), lats = kabObj.kec.map(k => k.lat);
      const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats), maxLat = Math.max(...lats);
      const s = Math.max(maxLng - minLng, maxLat - minLat) * 2.2 || 0.15;
      return { center: [kabObj.lng, kabObj.lat], span: s, mapZoom: 12 };
    }
    return { center: [kabObj.lng, kabObj.lat], span: 0.15, mapZoom: 11 };
  }

  const { center, mapZoom } = React.useMemo(() => computeGeo(gridScope), [gridScope, committed.prov, committed.kab, committed.kec]);

  async function runGrid(scope = gridScope) {
    if (task === "uc3") return;
    const cfg = window.APP_CONFIG || {};
    if (!cfg.ML_API_ENABLED || cfg.ML_API_URL == null) {
      setGridError("ML API dinonaktifkan");
      return;
    }
    setRunning(true); setGrid(null); setProgress(0); setGridError(null);
    const cols = 14, rows = 14;
    const b = climate.series[month];
    const endpoint = task === "uc1" ? "/v1/predict/batch/weather" : "/v1/predict/batch/climate";

    function buildCells(gc, gs) {
      const its = [], meta = [];
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const lng = gc[0] - gs / 2 + (c + 0.5) / cols * gs;
        const lat = gc[1] - gs / 2 + (r + 0.5) / rows * gs;
        meta.push({ lng, lat, c, r, dx: gs / cols, dy: gs / rows });
        if (task === "uc1") {
          its.push({
            suhu_c: b.t2m, kelembaban_pct: b.rh,
            kecepatan_angin_kmh: +(b.wind * 3.6).toFixed(1),
            arah_angin_deg: 180, tutupan_awan_pct: 50,
            lat, lon: lng,
            datetime_local: new Date().toISOString().replace("T", " ").slice(0, 19),
          });
        } else {
          its.push({ lat, lon: lng, month: month + 1, rh2m: b.rh, ws2m: b.wind, allsky_sfc_sw_dwn: b.rad });
        }
      }
      return { its, meta };
    }

    async function fetchBatch(its, meta) {
      const r = await fetch(`${cfg.ML_API_URL}${endpoint}`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: its }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const data = await r.json();
      return { results: data.results, meta };
    }

    try {
      const allCells = [];
      let vmin = Infinity, vmax = -Infinity, cls = {};

      function collectResults(results, meta) {
        results.forEach((res, idx) => {
          if (!res) return;
          const m = meta[idx];
          const v = res.predicted;
          allCells.push({ lng: m.lng, lat: m.lat, v, prob: res.proba || null, c: m.c, r: m.r, dx: m.dx, dy: m.dy });
          if (!isClass) { vmin = Math.min(vmin, v); vmax = Math.max(vmax, v); }
          else cls[v] = (cls[v] || 0) + 1;
        });
      }

      if (scope === "prov" && task === "uc2") {
        // Province UC-2: panggil endpoint khusus yang ambil fitur cuaca per kab dari DB,
        // bukan pakai fitur kab terpilih untuk semua kab (bug lama: hasil seragam).
        setProgress(30);
        const yp = year ? `&year=${year}` : "";
        const url = `${cfg.ML_API_URL}/v1/predict/climate/by-province/${encodeURIComponent(committed.prov)}?month=${month + 1}${yp}`;
        const r = await fetch(url);
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const data = await r.json();
        setProgress(80);
        const sz = 0.15;
        data.results.forEach(res => {
          const v = res.predicted;
          allCells.push({
            lng: res.lon, lat: res.lat, v, prob: null,
            c: 0, r: 0, dx: sz, dy: sz, label: res.label,
          });
          vmin = Math.min(vmin, v);
          vmax = Math.max(vmax, v);
        });
      } else if (scope === "prov") {
        // Province UC-1 (klasifikasi): masih pakai endpoint batch lama.
        // (UC-1 tidak memiliki endpoint by-province khusus.)
        const kabList = Object.values(provObj.kab).filter(k => k.data);
        const its = [], meta = [];
        const sz = 0.15;
        for (const kab of kabList) {
          meta.push({ lng: kab.lng, lat: kab.lat, c: 0, r: 0, dx: sz, dy: sz });
          its.push({
            suhu_c: b.t2m, kelembaban_pct: b.rh,
            kecepatan_angin_kmh: +(b.wind * 3.6).toFixed(1),
            arah_angin_deg: 180, tutupan_awan_pct: 50,
            lat: kab.lat, lon: kab.lng,
            datetime_local: new Date().toISOString().replace("T", " ").slice(0, 19),
          });
        }
        setProgress(30);
        const { results } = await fetchBatch(its, meta);
        setProgress(80);
        collectResults(results, meta);
      } else {
        const { center: gc, span: gs } = computeGeo(scope);
        const { its, meta } = buildCells(gc, gs);
        setProgress(30);
        const { results } = await fetchBatch(its, meta);
        setProgress(80);
        collectResults(results, meta);
      }

      setGrid({ cells: allCells, vmin, vmax, cls, n: allCells.length });
      setProgress(100);
    } catch (err) {
      setGridError(`Gagal batch predict: ${err.message}`);
    }
    setRunning(false);
  }

  // ramp untuk hasil
  const rampFor = (v) => {
    if (isClass) {
      const map = { "Hujan": "#1E4E6B", "Berawan": "#88A6B5", "Cerah Berawan": "#E9C46A", "Cerah": "#E9A352" };
      return map[v] || "#9DACA4";
    }
    // Skala warna ABSOLUT — supaya suhu yang sama selalu menghasilkan warna yang sama,
    // baik di mode prov maupun kab. Untuk t2m Indonesia: 18°C (biru) → 25°C (krem) → 32°C (merah).
    const lo = task === "uc3" ? 0 : 18;
    const hi = task === "uc3" ? 800 : 32;
    const t = Math.max(0, Math.min(1, (v - lo) / (hi - lo)));
    const ramp = task === "uc3" ? ["#FBF3E0", "#60A5FA", "#11324B"] : ["#1E6CB5", "#FDF3DC", "#C44E37"];
    const seg = t < 0.5 ? 0 : 1, lt = t < 0.5 ? t * 2 : (t - 0.5) * 2;
    return lerpHex(ramp[seg], ramp[seg + 1], lt);
  };

  const polygons = grid ? grid.cells.map(cell => ({
    coords: [[[cell.lng - cell.dx / 2, cell.lat - cell.dy / 2], [cell.lng + cell.dx / 2, cell.lat - cell.dy / 2], [cell.lng + cell.dx / 2, cell.lat + cell.dy / 2], [cell.lng - cell.dx / 2, cell.lat + cell.dy / 2]]],
    color: "rgba(255,255,255,0.5)", fillColor: rampFor(cell.v), fillOpacity: 0.65, weight: 0.5,
    tooltip: `${isClass ? cell.v : cell.v + unit}`,
  })) : [];

  return (
    <div className="pred-area-body">
      <div className="pred-area-toolbar">
        <div className="pred-area-info">
          <Icon name="grid-3x3" size={14} />
          <span>{tr("Prediksi grid")} {taskObj.code} · {scopeNames[gridScope]} · {gridScope === "prov" ? `${Object.values(provObj.kab).filter(k => k.data).length} kab/kota` : "14×14 sel"} · {MONTHS[month]}</span>
        </div>
        <div className="pred-scope-toggle">
          {availableScopes.map(s => (
            <button key={s} className={`pred-scope-btn${gridScope === s ? " on" : ""}`} onClick={() => { setGridScope(s); runGrid(s); }} disabled={running}>
              {scopeNames[s]}
            </button>
          ))}
        </div>
        <label className="pred-area-month">{tr("Bulan")}
          <select value={month} onChange={e => setMonth(+e.target.value)}>{MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}</select>
        </label>
        <button className="pred-run sm" onClick={runGrid} disabled={running}>
          {running ? <><span className="pred-spin" /> {tr("Memproses")} {progress}%</> : <><Icon name="play" size={14} /> {tr("Jalankan Grid")}</>}
        </button>
      </div>

      <div className="pred-area-stage">
        {task === "uc3" && (
          <div className="pred-area-empty"><Icon name="alert-circle" size={28} /><span>{tr("Mode grid tidak tersedia untuk UC-3 (Deteksi Anomali). Gunakan Mode Titik.")}</span></div>
        )}
        {task !== "uc3" && !grid && !running && !gridError && (
          <div className="pred-area-empty"><Icon name="grid-3x3" size={30} /><span>{tr("Klik \u201cJalankan Grid\u201d untuk memprediksi seluruh wilayah")}</span></div>
        )}
        {gridError && (
          <div className="pred-area-empty"><Icon name="wifi-off" size={28} /><span className="pred-api-warn">{gridError}</span></div>
        )}
        {running && (
          <div className="pred-area-empty"><span className="pred-spin big" /><span>{tr("Memprediksi")} 196 {tr("sel")} · {taskObj.model}… {progress}%</span></div>
        )}
        {grid && (
          <window.GeoMap key={committed.kab + gridScope} center={center} zoom={mapZoom} basemap="positron" polygons={polygons} controls={true} />
        )}
      </div>

      {grid && (
        <div className="pred-area-foot">
          <div className="pred-area-summary">
            {isClass ? (
              <>
                <span className="pred-area-stat"><b>{grid.n}</b> {tr("sel")}</span>
                {Object.keys(grid.cls).map(k => <span key={k} className="pred-area-stat"><i style={{ background: rampFor(k) }} />{k}: <b>{grid.cls[k]}</b></span>)}
              </>
            ) : (
              <>
                <span className="pred-area-stat">min <b>{grid.vmin.toFixed(1)}{unit}</b></span>
                <span className="pred-area-stat">maks <b>{grid.vmax.toFixed(1)}{unit}</b></span>
                <span className="pred-area-stat">rerata <b>{(grid.cells.reduce((a, c) => a + c.v, 0) / grid.n).toFixed(1)}{unit}</b></span>
              </>
            )}
          </div>
          <div className="pred-area-actions">
            <button className="ghost-btn sm" onClick={() => setTab("peta")}><Icon name="map" size={13} /> {tr("Lihat di Tab Peta")} →</button>
            <button className="ghost-btn sm" onClick={() => setTab("publikasi")}><Icon name="share-2" size={13} /> {tr("Publikasikan layer")}</button>
          </div>
        </div>
      )}
      <div className="pred-disclaimer"><Icon name="alert-triangle" size={13} /> {tr("Hasil prediksi grid bersifat indikatif/eksperimen — bukan prakiraan operasional resmi BMKG.")}</div>
    </div>
  );
}

function lerpHex(a, b, t) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  return "#" + pa.map((x, i) => Math.round(x + (pb[i] - x) * t).toString(16).padStart(2, "0")).join("");
}

function PField({ label, children }) {
  return <label className="pred-field"><span>{label}</span>{children}</label>;
}

function ResultCard({ result, taskObj, month, setTab }) {
  return (
    <div className="pred-result-inner">
      {result.kind === "anomaly" ? (
        <div className="pred-anomaly">
          <div className={`pred-anomaly-badge ${result.is_anomaly ? "bad" : "ok"}`}>
            <Icon name={result.is_anomaly ? "alert-triangle" : "check-circle"} size={22} />
            {result.is_anomaly ? tr("Anomali Terdeteksi") : tr("Data Normal")}
          </div>
          <div className="pred-anomaly-meta">
            <span>{tr("Skor anomali")}: <b>{result.anomaly_score.toFixed(4)}</b></span>
            <span>{tr("Metode")}: <b>{result.method}</b></span>
            {result.reason && result.reason !== "OK" && (
              <span>{tr("Keterangan")}: <b>{result.reason}</b></span>
            )}
          </div>
        </div>
      ) : (
        <div className={`pred-big ${result.kind}`}>
          {result.kind === "class" ? (
            <>
              <div className="pred-big-class"><WeatherGlyph2 cond={result.value} /> {result.value}</div>
              <div className="pred-big-prob">{tr("probabilitas")} {(result.prob * 100).toFixed(0)}%</div>
            </>
          ) : (
            <>
              <div className="pred-big-val">{result.value}<span>{result.unit}</span></div>
              {result.ci && (
                <div className="pred-big-ci">CI 90%: {result.ci[0]} – {result.ci[1]} {result.unit}</div>
              )}
            </>
          )}
        </div>
      )}
      {result.shap && (
        <div className="pred-xai">
          <div className="pred-xai-label"><Icon name="git-branch" size={12} /> XAI (SHAP) · {tr("kontribusi fitur")}</div>
          {result.shap.map(s => (
            <div key={s.f} className="pred-shap">
              <span className="pred-shap-f">{s.f}</span>
              <div className="pred-shap-bar"><div style={{ width: (s.w * 100) + "%" }} /></div>
              <span className="pred-shap-w">{(s.w * 100).toFixed(0)}%</span>
            </div>
          ))}
        </div>
      )}
      <div className="pred-meta">{tr("Model")}: <code>{result.modelVer}</code> · {tr("Bulan")}: {MONTHS[month]}</div>
      <div className="pred-result-actions">
        <button className="ghost-btn sm"><Icon name="save" size={13} /> {tr("Simpan hasil")}</button>
        <button className="ghost-btn sm" onClick={() => setTab("peta")}><Icon name="map" size={13} /> {tr("Jadikan Layer")} →</button>
        <button className="ghost-btn sm"><Icon name="plus" size={13} /> {tr("Tambah ke batch")}</button>
      </div>
    </div>
  );
}

function WeatherGlyph2({ cond }) {
  const c = (cond || "").toLowerCase();
  let icon = "cloud";
  if (c.includes("cerah") && !c.includes("berawan")) icon = "sun";
  else if (c.includes("cerah")) icon = "cloud-sun";
  else if (c.includes("hujan")) icon = "cloud-rain";
  return <Icon name={icon} size={22} />;
}

Object.assign(window, { TabPrediksi });
