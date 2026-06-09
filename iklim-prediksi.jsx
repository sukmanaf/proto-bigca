// ============================================================
// iklim-prediksi.jsx — Tab B: Prediksi (ML workbench) untuk Iklim Wilayah
// Mode Titik (UC-1 klasifikasi, UC-2 suhu, UC-3 hujan) — auto-isi dari DB.
// Disclaimer: hasil bersifat indikatif/eksperimen (§13).
// ============================================================

const Icon = window.Icon;
const tr = window.tr;
const MONTHS = window.MONTHS_ID;

function TabPrediksi({ climate, committed, REGIONS, setTab }) {
  const TASKS = window.ML_TASKS;
  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];

  const [mode, setMode] = React.useState("titik");
  const [task, setTask] = React.useState("uc2");
  const [month, setMonth] = React.useState(6); // index bulan (0-11) → Jul=6
  const [result, setResult] = React.useState(null);
  const [running, setRunning] = React.useState(false);

  // fitur auto-isi dari DB (series bulan terpilih + current)
  const base = climate.series[month];
  const [feat, setFeat] = React.useState(null);

  React.useEffect(() => {
    const b = climate.series[month];
    setFeat({
      rh: b.rh, wind: b.wind, rad: b.rad, cloud: climate.current.cloud,
      lat: kabObj.lat, lon: kabObj.lng,
    });
    setResult(null);
  }, [month, committed.kab]);

  function setF(k, v) { setFeat(f => ({ ...f, [k]: v })); }

  function runPredict() {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setResult(predict(task, month, feat, climate));
      setRunning(false);
    }, 700);
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
        <AreaGridPredict task={task} month={month} setMonth={setMonth} climate={climate} committed={committed} REGIONS={REGIONS} setTab={setTab} taskObj={taskObj} />
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

function AreaGridPredict({ task, month, setMonth, climate, committed, REGIONS, setTab, taskObj }) {
  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];
  const [running, setRunning] = React.useState(false);
  const [grid, setGrid] = React.useState(null);
  const [progress, setProgress] = React.useState(0);

  const isClass = task === "uc1";
  const unit = task === "uc1" ? "" : task === "uc3" ? "mm" : "°C";
  const center = [kabObj.lng, kabObj.lat];
  const span = committed.prov === "diy" ? 0.10 : 0.55;

  function runGrid() {
    setRunning(true); setGrid(null); setProgress(0);
    const cols = 14, rows = 14;
    const t = setInterval(() => setProgress(p => Math.min(100, p + 12)), 90);
    setTimeout(() => {
      clearInterval(t);
      const cells = [];
      let vmin = Infinity, vmax = -Infinity, cls = {};
      for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
        const lng = center[0] - span / 2 + (c + 0.5) / cols * span;
        const lat = center[1] - span / 2 + (r + 0.5) / rows * span;
        // prediksi per-sel: model dasar + variasi spasial deterministik
        const feat = { rh: climate.series[month].rh, wind: climate.series[month].wind, rad: climate.series[month].rad, cloud: climate.current.cloud, lat, lon: lng };
        const res = predict(task, month, feat, climate);
        const spatial = (Math.sin(lng * 9) * Math.cos(lat * 11)) * (isClass ? 0 : (task === "uc3" ? 28 : 0.9));
        let v = isClass ? res.value : +(res.value + spatial).toFixed(task === "uc3" ? 0 : 1);
        cells.push({ lng, lat, v, prob: res.prob, c, r, dx: span / cols, dy: span / rows });
        if (!isClass) { vmin = Math.min(vmin, v); vmax = Math.max(vmax, v); }
        else cls[v] = (cls[v] || 0) + 1;
      }
      setGrid({ cells, vmin, vmax, cls, n: cells.length });
      setRunning(false);
    }, 850);
  }

  // ramp untuk hasil
  const rampFor = (v) => {
    if (isClass) {
      const map = { "Hujan": "#1E4E6B", "Berawan": "#88A6B5", "Cerah Berawan": "#E9C46A", "Cerah": "#E9A352" };
      return map[v] || "#9DACA4";
    }
    const lo = grid.vmin, hi = grid.vmax;
    const t = hi > lo ? (v - lo) / (hi - lo) : 0.5;
    const ramp = task === "uc3" ? ["#FBF3E0", "#60A5FA", "#11324B"] : ["#1E6CB5", "#FDF3DC", "#C44E37"];
    const seg = t < 0.5 ? 0 : 1, lt = t < 0.5 ? t * 2 : (t - 0.5) * 2;
    return lerpHex(ramp[seg], ramp[seg + 1], lt);
  };

  const polygons = grid ? grid.cells.map(cell => ({
    coords: [[[cell.lng - cell.dx / 2, cell.lat - cell.dy / 2], [cell.lng + cell.dx / 2, cell.lat - cell.dy / 2], [cell.lng + cell.dx / 2, cell.lat + cell.dy / 2], [cell.lng - cell.dx / 2, cell.lat + cell.dy / 2]]],
    color: rampFor(cell.v), fillColor: rampFor(cell.v), fillOpacity: 0.6, weight: 0,
    tooltip: `${isClass ? cell.v : cell.v + unit}`,
  })) : [];

  return (
    <div className="pred-area-body">
      <div className="pred-area-toolbar">
        <div className="pred-area-info">
          <Icon name="grid-3x3" size={14} />
          <span>{tr("Prediksi grid")} {taskObj.code} · {kabObj.name} · 14×14 sel · {MONTHS[month]}</span>
        </div>
        <label className="pred-area-month">{tr("Bulan")}
          <select value={month} onChange={e => setMonth(+e.target.value)}>{MONTHS.map((m, i) => <option key={i} value={i}>{m}</option>)}</select>
        </label>
        <button className="pred-run sm" onClick={runGrid} disabled={running}>
          {running ? <><span className="pred-spin" /> {tr("Memproses")} {progress}%</> : <><Icon name="play" size={14} /> {tr("Jalankan Grid")}</>}
        </button>
      </div>

      <div className="pred-area-stage">
        {!grid && !running && (
          <div className="pred-area-empty"><Icon name="grid-3x3" size={30} /><span>{tr("Klik \u201cJalankan Grid\u201d untuk memprediksi seluruh wilayah")}</span></div>
        )}
        {running && (
          <div className="pred-area-empty"><span className="pred-spin big" /><span>{tr("Memprediksi")} 196 {tr("sel")} · {taskObj.model}…</span></div>
        )}
        {grid && (
          <window.GeoMap key={committed.kab} center={center} zoom={committed.prov === "diy" ? 11.5 : 9} basemap="positron" polygons={polygons} controls={true} />
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
                <span className="pred-area-stat">min <b>{grid.vmin.toFixed(task === "uc3" ? 0 : 1)}{unit}</b></span>
                <span className="pred-area-stat">maks <b>{grid.vmax.toFixed(task === "uc3" ? 0 : 1)}{unit}</b></span>
                <span className="pred-area-stat">rerata <b>{(grid.cells.reduce((a, c) => a + c.v, 0) / grid.n).toFixed(task === "uc3" ? 0 : 1)}{unit}</b></span>
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
      <div className={`pred-big ${result.kind}`}>
        {result.kind === "class" ? (
          <>
            <div className="pred-big-class"><WeatherGlyph2 cond={result.value} /> {result.value}</div>
            <div className="pred-big-prob">{tr("probabilitas")} {(result.prob * 100).toFixed(0)}%</div>
          </>
        ) : (
          <>
            <div className="pred-big-val">{result.value}<span>{result.unit}</span></div>
            <div className="pred-big-ci">CI 90%: {result.ci[0]} – {result.ci[1]} {result.unit}</div>
          </>
        )}
      </div>
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

// ---- Mesin prediksi mock (deterministik dari input) ----
function predict(task, month, feat, climate) {
  const b = climate.series[month];
  if (task === "uc1") {
    // Klasifikasi kondisi dari awan + hujan + RH
    let label, prob;
    const cloud = feat.cloud, rh = feat.rh, rain = b.precip;
    if (rain > 300 || (cloud > 80 && rh > 85)) { label = "Hujan"; prob = 0.74 + Math.min(0.2, rain / 2000); }
    else if (cloud > 60) { label = "Berawan"; prob = 0.68 + (cloud - 60) / 200; }
    else if (cloud > 30) { label = "Cerah Berawan"; prob = 0.7; }
    else { label = "Cerah"; prob = 0.8; }
    prob = Math.min(0.97, prob);
    return {
      kind: "class", value: label, prob, modelVer: "wx-rf@1.2",
      shap: [
        { f: "Tutupan awan", w: 0.42 },
        { f: "Kelembaban (RH)", w: 0.27 },
        { f: "Curah hujan klim.", w: 0.19 },
        { f: "Bulan", w: 0.12 },
      ],
    };
  }
  if (task === "uc3") {
    // Prediksi hujan bulanan
    const val = Math.round(b.precip * (0.95 + (feat.rh - b.rh) / 400));
    return {
      kind: "value", value: val, unit: "mm", ci: [Math.round(val * 0.78), Math.round(val * 1.22)], modelVer: "rain-lgbm@1.1",
      shap: [
        { f: "Bulan (musim)", w: 0.45 },
        { f: "Kelembaban (RH)", w: 0.24 },
        { f: "Koordinat", w: 0.18 },
        { f: "ENSO/IOD", w: 0.13 },
      ],
    };
  }
  // UC-2 suhu bulanan (default)
  const adj = (feat.rad - b.rad) * 0.05 - (feat.rh - b.rh) * 0.01 - (feat.cloud - climate.current.cloud) * 0.004;
  const val = +(b.t2m + adj).toFixed(2);
  return {
    kind: "value", value: val, unit: "°C", ci: [+(val - 0.85).toFixed(1), +(val + 0.85).toFixed(1)], modelVer: "t2m-lgbm@1.3",
    shap: [
      { f: "Radiasi surya", w: 0.41 },
      { f: "Bulan", w: 0.22 },
      { f: "Koordinat (lat/lon)", w: 0.20 },
      { f: "Kelembaban (RH)", w: 0.17 },
    ],
  };
}

Object.assign(window, { TabPrediksi });
