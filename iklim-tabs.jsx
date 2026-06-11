// ============================================================
// iklim-tabs.jsx — Konten Tab Ikhtisar & Prediksi untuk Iklim Wilayah
// Dipakai oleh window.IklimWilayah (iklim-wilayah.jsx)
// ============================================================

const Icon = window.Icon;
const tr = window.tr;
const MONTHS = window.MONTHS_ID;

// ============================================================
// TAB A — IKHTISAR
// ============================================================
const DAILY_PARAM_META = {
  tavg: { label: "Suhu Rata", unit: "°C", color: "#C44E37", key: "tavg" },
  tmax: { label: "Suhu Max",  unit: "°C", color: "#E05A1C", key: "tmax" },
  tmin: { label: "Suhu Min",  unit: "°C", color: "#2A9D8F", key: "tmin" },
  prcp: { label: "Hujan",     unit: "mm", color: "#1E6CB5", key: "prcp" },
};

function TabIkhtisar({ climate, committed, REGIONS, setTab, setRoute, openAI, year, setYear, availableYears, seriesLoading }) {
  const [param, setParam] = React.useState("t2m");
  const [resolution, setResolution] = React.useState("bulanan");
  const [dailyParam, setDailyParam] = React.useState("tavg");
  const [dailyMonth, setDailyMonth] = React.useState(1);
  const [dailyData, setDailyData] = React.useState(null);
  const [dailyLoading, setDailyLoading] = React.useState(false);
  const [dailyError, setDailyError] = React.useState(null);
  const [annualData, setAnnualData] = React.useState(null);
  const [annualLoading, setAnnualLoading] = React.useState(false);
  const [annualError, setAnnualError] = React.useState(null);
  const [liveWeather, setLiveWeather] = React.useState(null);
  const [liveError, setLiveError] = React.useState(null);
  const [liveLoading, setLiveLoading] = React.useState(true);

  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];

  React.useEffect(() => {
    if (resolution !== "harian") return;
    const locationLabel = kabObj.locationLabel;
    if (!locationLabel) { setDailyError("no-data"); return; }
    const cfg = window.APP_CONFIG || {};
    if (!cfg.ML_API_ENABLED || !cfg.ML_API_URL) return;
    setDailyData(null); setDailyError(null); setDailyLoading(true);
    const params = new URLSearchParams();
    if (year) params.set("year", year);
    params.set("month", dailyMonth);
    fetch(`${cfg.ML_API_URL}/v1/climate/daily/${encodeURIComponent(locationLabel)}?${params}`)
      .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
      .then(d => { setDailyData(d); setDailyLoading(false); })
      .catch(e => { setDailyError(`${e}`); setDailyLoading(false); });
  }, [resolution, committed, year, dailyMonth]);

  React.useEffect(() => {
    if (resolution !== "tahunan") return;
    const locationLabel = kabObj.locationLabel;
    if (!locationLabel) { setAnnualError("no-data"); return; }
    const cfg = window.APP_CONFIG || {};
    if (!cfg.ML_API_ENABLED || !cfg.ML_API_URL) return;
    setAnnualData(null); setAnnualError(null); setAnnualLoading(true);
    fetch(`${cfg.ML_API_URL}/v1/climate/annual/${encodeURIComponent(locationLabel)}`)
      .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
      .then(d => { setAnnualData(d); setAnnualLoading(false); })
      .catch(e => { setAnnualError(`${e}`); setAnnualLoading(false); });
  }, [resolution, committed]);

  // Fetch kondisi terkini dari DB nyata via /v1/sample/weather (nearest station)
  React.useEffect(() => {
    setLiveWeather(null); setLiveError(null); setLiveLoading(true);
    const cfg = window.APP_CONFIG || {};
    if (!cfg.ML_API_ENABLED || !cfg.ML_API_URL) {
      setLiveError("ML API dinonaktifkan (ML_API_ENABLED: false)");
      setLiveLoading(false);
      return;
    }
    fetch(`${cfg.ML_API_URL}/v1/sample/weather?lat=${kabObj.lat}&lon=${kabObj.lng}`)
      .then(r => r.ok ? r.json() : Promise.reject(`HTTP ${r.status}`))
      .then(d => { setLiveWeather(d); setLiveLoading(false); })
      .catch(e => { setLiveError(`Gagal memuat data BMKG: ${e}`); setLiveLoading(false); });
  }, [committed.kab]);

  const cur = liveWeather ? {
    temp: liveWeather.suhu_c,
    cond: liveWeather.actual_cuaca || "—",
    rh: liveWeather.kelembaban_pct,
    rain: liveWeather.curah_hujan_mm,
    wind: +(liveWeather.kecepatan_angin_kmh / 3.6).toFixed(1),
    windDir: liveWeather.arah_angin_deg,
    cloud: liveWeather.tutupan_awan_pct,
    localTime: liveWeather.datetime_local,
  } : null;

  const [stationWeather, setStationWeather] = React.useState({});

  // Fetch kondisi terkini semua stasiun di provinsi dari DB
  React.useEffect(() => {
    const cfg = window.APP_CONFIG || {};
    if (!cfg.ML_API_ENABLED || !cfg.ML_API_URL) return;
    const kabs = Object.entries(provObj.kab).filter(([, o]) => o.data);
    Promise.all(kabs.map(([kk, o]) =>
      fetch(`${cfg.ML_API_URL}/v1/sample/weather?lat=${o.lat}&lon=${o.lng}`)
        .then(r => r.ok ? r.json() : null)
        .then(d => d ? [kk, { temp: d.suhu_c, cond: d.actual_cuaca }] : null)
        .catch(() => null)
    )).then(results => {
      const map = {};
      results.filter(Boolean).forEach(([kk, w]) => { map[kk] = w; });
      setStationWeather(map);
    });
  }, [committed.prov]);

  let markers = [];
  let center = [kabObj.lng, kabObj.lat];
  let zoom = 9;
  if (kabObj.kecLevel && committed.kec) {
    const kc = kabObj.kec.find(c => c.code === committed.kec);
    if (kc) { center = [kc.lng, kc.lat]; zoom = 12; }
  } else if (kabObj.kecLevel) {
    zoom = 11;
  }
  Object.keys(provObj.kab).forEach(kk => {
    const o = provObj.kab[kk];
    if (!o.data) return;
    const w = stationWeather[kk];
    markers.push({
      lng: o.lng, lat: o.lat,
      color: kk === committed.kab ? "#C44E37" : "#0E5A78",
      size: kk === committed.kab ? 18 : 13,
      label: w ? w.temp.toFixed(1) + "°" : "…",
      popup: w ? `<b>${o.name}</b><br>${w.cond} · ${w.temp}°C` : `<b>${o.name}</b>`,
    });
  });

  const paramMeta = {
    t2m: { label: "Suhu", unit: "°C", color: "#C44E37", key: "t2m" },
    precip: { label: "Hujan", unit: "mm", color: "#1E6CB5", key: "precip" },
    rh: { label: "Kelembaban", unit: "%", color: "#2A9D8F", key: "rh" },
    rad: { label: "Radiasi", unit: "MJ/m²", color: "#C18820", key: "rad" },
  }[param];

  const series = climate.series;
  const anomaly = cur ? (cur.temp - climate.normalT2m).toFixed(1) : null;

  return (
    <div className="ikhtisar-body">
      {/* KONDISI TERKINI */}
      <div className="ovw-current rdtr-detail-card">
        <div className="rdtr-detail-head">
          <Icon name="thermometer" size={14} /> {tr("Kondisi Terkini")} · BMKG
          {liveWeather && <span className="ovw-live-badge">DB Live</span>}
          {cur && <span className="ovw-time">{cur.localTime}</span>}
        </div>
        {liveLoading && (
          <div className="ovw-live-state"><span className="pred-spin" /> {tr("Memuat data BMKG…")}</div>
        )}
        {liveError && (
          <div className="ovw-live-state error"><Icon name="wifi-off" size={13} /> {liveError}</div>
        )}
        {cur && (
          <div className="ovw-cond-row">
            <div className="ovw-cond-main">
              <div className="ovw-temp">{cur.temp}<span>°C</span></div>
              <div className="ovw-cond-label"><WeatherGlyph cond={cur.cond} /> {cur.cond}</div>
              <div className="ovw-loc">{kabObj.name}{committed.kec ? " · " + (kabObj.kec.find(c=>c.code===committed.kec)||{}).name : ""}</div>
            </div>
            <div className="ovw-metrics">
              <Metric icon="droplets" label={tr("Kelembaban")} value={cur.rh + "%"} />
              <Metric icon="cloud-rain" label={tr("Curah Hujan")} value={cur.rain + " mm"} />
              <Metric icon="wind" label={tr("Angin")} value={cur.wind + " m/s"} sub={windCompass(cur.windDir)} />
              <Metric icon="cloud" label={tr("Tutupan Awan")} value={cur.cloud + "%"} />
            </div>
          </div>
        )}
      </div>

      {/* TIME-SERIES + PETA */}
      <div className="ovw-two">
        <div className="rdtr-detail-card ovw-ts-card" style={{ position: "relative" }}>
          {(seriesLoading || dailyLoading || annualLoading) && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(var(--surface-rgb,255,255,255),0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, borderRadius: "inherit" }}>
              <span className="pred-spin" style={{ marginRight: 6 }} /> Memuat data…
            </div>
          )}
          <div className="rdtr-detail-head" style={{ flexWrap: "wrap", gap: 4 }}>
            <Icon name="trending-up" size={14} />
            <span style={{ display: "inline-flex", gap: 2, marginLeft: 2 }}>
              {[["bulanan","Bulanan"],["harian","Harian"],["tahunan","Tahunan"]].map(([r, label]) => (
                <button key={r} onClick={() => setResolution(r)}
                  className={`ovw-chip${resolution === r ? " on" : ""}`}
                  style={resolution === r ? { "--chip": "#4B7BEC" } : { fontSize: 11 }}>
                  {label}
                </button>
              ))}
            </span>
            <span style={{ fontSize: 11, color: "var(--gray-500,#888)", marginLeft: 2 }}>
              · {{ bulanan: "NASA POWER", harian: "GHCN", tahunan: "NASA POWER" }[resolution]}
            </span>
            {resolution === "bulanan" && availableYears && availableYears.length > 1 && (
              <select value={year || ""} onChange={e => setYear(Number(e.target.value))}
                disabled={seriesLoading}
                style={{ fontSize: 11, padding: "1px 4px", borderRadius: 4, border: "1px solid var(--gray-300,#ccc)", background: "var(--surface,#fff)" }}>
                {availableYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            )}
            {resolution === "harian" && (
              <>
                <select value={year || ""} onChange={e => setYear(Number(e.target.value))}
                  disabled={dailyLoading}
                  style={{ fontSize: 11, padding: "1px 4px", borderRadius: 4, border: "1px solid var(--gray-300,#ccc)", background: "var(--surface,#fff)" }}>
                  {(availableYears && availableYears.length ? availableYears : [2023]).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={dailyMonth} onChange={e => setDailyMonth(Number(e.target.value))}
                  disabled={dailyLoading}
                  style={{ fontSize: 11, padding: "1px 4px", borderRadius: 4, border: "1px solid var(--gray-300,#ccc)", background: "var(--surface,#fff)" }}>
                  {["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"].map((m, i) => (
                    <option key={i+1} value={i+1}>{m}</option>
                  ))}
                </select>
              </>
            )}
          </div>

          {/* Param chips */}
          <div className="ovw-param-toggle">
            {resolution === "harian"
              ? Object.keys(DAILY_PARAM_META).map(p => (
                  <button key={p} className={`ovw-chip ${dailyParam === p ? "on" : ""}`} onClick={() => setDailyParam(p)} style={dailyParam === p ? { "--chip": DAILY_PARAM_META[p].color } : {}}>
                    {tr(DAILY_PARAM_META[p].label)}
                  </button>
                ))
              : Object.keys(paramMetaAll).map(p => (
                  <button key={p} className={`ovw-chip ${param === p ? "on" : ""}`} onClick={() => setParam(p)} style={param === p ? { "--chip": paramMetaAll[p].color } : {}}>
                    {tr(paramMetaAll[p].label)}
                  </button>
                ))
            }
          </div>

          {/* Chart */}
          {resolution === "bulanan" ? (
            <div className="ovw-chart"><ClimateChart series={series} meta={paramMeta} normalT2m={climate.normalT2m} /></div>
          ) : resolution === "harian" ? (
            dailyError
              ? <div style={{ padding: "24px 0", textAlign: "center", color: "var(--gray-400,#aaa)", fontSize: 12 }}><Icon name="wifi-off" size={14} /> Data harian tidak tersedia untuk wilayah ini</div>
              : dailyData
                ? <div className="ovw-chart"><DailyChart records={dailyData.records} meta={DAILY_PARAM_META[dailyParam]} /></div>
                : null
          ) : resolution === "tahunan" ? (
            annualError
              ? <div style={{ padding: "24px 0", textAlign: "center", color: "var(--gray-400,#aaa)", fontSize: 12 }}><Icon name="wifi-off" size={14} /> Data tahunan tidak tersedia</div>
              : annualData
                ? <div className="ovw-chart"><AnnualChart records={annualData.records} meta={paramMetaAll[param]} /></div>
                : null
          ) : null}

          {/* Footer info */}
          {resolution === "bulanan" && param === "t2m" && (
            <div className="ovw-normal">
              <span>{tr("Normal")}: <strong>{climate.normalT2m}°C</strong></span>
              {anomaly !== null && (
                <span className={`ovw-anom ${anomaly >= 0 ? "warm" : "cool"}`}>{tr("Anomali saat ini")}: <strong>{anomaly >= 0 ? "+" : ""}{anomaly}°C</strong></span>
              )}
            </div>
          )}
          {resolution === "harian" && dailyData && (
            <div className="ovw-normal" style={{ flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
              <span><Icon name="map-pin" size={11} /> {dailyData.station_name} · {dailyData.station_dist_km} km dari lokasi · {dailyData.records.length} hari</span>
              {dailyData.station_dist_km > 200 && (
                <span style={{ color: "var(--warn,#C47B00)", fontSize: 11 }}>
                  ⚠ Stasiun terdekat {dailyData.station_dist_km} km — data mungkin tidak representatif untuk wilayah ini
                </span>
              )}
            </div>
          )}
        </div>

        <div className="rdtr-detail-card ovw-map-card">
          <div className="rdtr-detail-head"><Icon name="map-pin" size={14} /> {tr("Peta Wilayah")} <span className="ovw-map-hint">{tr("klik titik untuk detail")}</span></div>
          <div className="ovw-map">
            <window.MapLibreMap center={center} zoom={zoom} basemap="positron" markers={markers} />
          </div>
        </div>
      </div>

      {/* AKSI */}
      <div className="ovw-actions">
        <button className="primary-btn" onClick={() => setTab("prediksi")}><Icon name="sparkles" size={14} /> {tr("Prediksi")} →</button>
        <button className="ghost-btn" onClick={() => setTab("peta")}><Icon name="map" size={14} /> {tr("Lihat di Peta")} →</button>
        <button className="ghost-btn" onClick={() => window.print && window.print()}><Icon name="file-down" size={14} /> {tr("Export PDF")}</button>
        <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} /> {tr("Jelaskan ini")}</button>
      </div>
    </div>
  );
}

const paramMetaAll = {
  t2m: { label: "Suhu", unit: "°C", color: "#C44E37", key: "t2m" },
  precip: { label: "Hujan", unit: "mm", color: "#1E6CB5", key: "precip" },
  rh: { label: "Kelembaban", unit: "%", color: "#2A9D8F", key: "rh" },
  rad: { label: "Radiasi", unit: "MJ/m²", color: "#C18820", key: "rad" },
};

function Metric({ icon, label, value, sub }) {
  return (
    <div className="ovw-metric">
      <Icon name={icon} size={15} />
      <div>
        <div className="ovw-metric-label">{label}</div>
        <div className="ovw-metric-value">{value}{sub && <span className="ovw-metric-sub"> {sub}</span>}</div>
      </div>
    </div>
  );
}

function WeatherGlyph({ cond }) {
  const c = cond.toLowerCase();
  let icon = "cloud";
  if (c.includes("cerah") && !c.includes("berawan")) icon = "sun";
  else if (c.includes("cerah")) icon = "cloud-sun";
  else if (c.includes("hujan")) icon = "cloud-rain";
  else if (c.includes("berawan")) icon = "cloud";
  return <Icon name={icon} size={16} />;
}

function windCompass(deg) {
  const dirs = ["U","TL","T","TG","S","BD","B","BL"];
  return dirs[Math.round(deg / 45) % 8] + " " + deg + "°";
}

// ---- Tooltip SVG helper ----
function ChartTooltip({ x, y, label, value, W, padL, padR, padT, H, padB, color }) {
  const tw = 78, th = 34;
  const tx = x + 10 + tw > W - padR ? x - 10 - tw : x + 10;
  const ty = Math.max(padT, Math.min(y - th / 2, H - padB - th));
  return (
    <g style={{ pointerEvents: "none" }}>
      <line x1={x} y1={padT} x2={x} y2={H - padB} stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
      <circle cx={x} cy={y} r="5" fill={color} stroke="white" strokeWidth="2" />
      <rect x={tx} y={ty} width={tw} height={th} rx="5" fill="var(--surface,#fff)" stroke="var(--gray-200,#ddd)" strokeWidth="1"
        style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.12))" }} />
      <text x={tx + tw / 2} y={ty + 12} fontSize="9" fill="var(--gray-500,#888)" textAnchor="middle">{label}</text>
      <text x={tx + tw / 2} y={ty + 26} fontSize="12" fontWeight="700" fill="var(--gray-800,#222)" textAnchor="middle">{value}</text>
    </g>
  );
}

// ---- Chart bulanan (line untuk suhu/RH/radiasi, bar untuk hujan) ----
function ClimateChart({ series, meta }) {
  const [hover, setHover] = React.useState(null);
  const W = 560, H = 180, padL = 36, padR = 12, padT = 14, padB = 26;
  const vals = series.map(s => s[meta.key]);
  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = meta.key === "precip" ? 0 : min - (max - min) * 0.2;
  const hi = max + (max - min) * 0.2 || max + 1;
  const xOf = i => padL + (i / (series.length - 1)) * (W - padL - padR);
  const yOf = v => H - padB - ((v - lo) / (hi - lo)) * (H - padT - padB);
  const isBar = meta.key === "precip";

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width * W;
    let best = 0, bestDist = Infinity;
    series.forEach((_, i) => { const d = Math.abs(xOf(i) - mx); if (d < bestDist) { bestDist = d; best = i; } });
    const v = series[best][meta.key];
    setHover({ x: xOf(best), y: yOf(v), label: series[best].month, value: `${v} ${meta.unit}` });
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ovw-chart-svg" onMouseMove={onMouseMove} onMouseLeave={() => setHover(null)} style={{ cursor: "crosshair" }}>
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const v = lo + f * (hi - lo);
        const y = yOf(v);
        return (
          <g key={f}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--gray-200,#e3e8e5)" strokeWidth="1" />
            <text x={padL - 5} y={y + 3} fontSize="9" fill="var(--gray-500,#888)" textAnchor="end">{v.toFixed(0)}</text>
          </g>
        );
      })}
      {isBar ? (
        series.map((s, i) => {
          const bw = (W - padL - padR) / series.length * 0.6;
          const y = yOf(s[meta.key]);
          return <rect key={i} x={xOf(i) - bw / 2} y={y} width={bw} height={H - padB - y} rx="2" fill={meta.color} opacity="0.85" />;
        })
      ) : (
        <g>
          <polyline points={series.map((s, i) => `${xOf(i)},${yOf(s[meta.key])}`).join(" ")} fill="none" stroke={meta.color} strokeWidth="2.5" />
          {series.map((s, i) => <circle key={i} cx={xOf(i)} cy={yOf(s[meta.key])} r="3" fill={meta.color} />)}
        </g>
      )}
      {series.map((s, i) => <text key={i} x={xOf(i)} y={H - 8} fontSize="9" fill="var(--gray-500,#888)" textAnchor="middle">{s.month}</text>)}
      {hover && <ChartTooltip {...hover} W={W} padL={padL} padR={padR} padT={padT} H={H} padB={padB} color={meta.color} />}
    </svg>
  );
}

// ---- Chart harian (line/bar untuk data per bulan, label tanggal di x-axis) ----
function DailyChart({ records, meta }) {
  const [hover, setHover] = React.useState(null);
  const W = 560, H = 180, padL = 36, padR = 12, padT = 14, padB = 26;
  const MONTHS_ID = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  const vals = records.map(r => r[meta.key]).filter(v => v != null);
  if (!vals.length) return (
    <div style={{ height: H, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400,#aaa)", fontSize: 12 }}>
      Tidak ada data
    </div>
  );

  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = meta.key === "prcp" ? 0 : min - (max - min) * 0.15;
  const hi = max + (max - min) * 0.15 || max + 1;
  const n = records.length;
  const xOf = i => padL + (i / (n - 1 || 1)) * (W - padL - padR);
  const yOf = v => H - padB - ((v - lo) / (hi - lo || 1)) * (H - padT - padB);
  const isBar = meta.key === "prcp";

  // Segmen polyline (putus saat null)
  const segments = [];
  let cur = [];
  records.forEach((r, i) => {
    const v = r[meta.key];
    if (v != null) { cur.push(`${xOf(i).toFixed(1)},${yOf(v).toFixed(1)}`); }
    else { if (cur.length) { segments.push(cur.join(" ")); cur = []; } }
  });
  if (cur.length) segments.push(cur.join(" "));

  // Label tanggal — tampilkan setiap 5 hari (1, 5, 10, 15, 20, 25, akhir bulan)
  const dateTicks = records.reduce((acc, r, i) => {
    const d = parseInt(r.date.substring(8, 10));
    if (d === 1 || d % 5 === 0 || i === records.length - 1) acc.push({ d, i });
    return acc;
  }, []);

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width * W;
    let best = 0, bestDist = Infinity;
    records.forEach((_, i) => { const d = Math.abs(xOf(i) - mx); if (d < bestDist) { bestDist = d; best = i; } });
    const r = records[best];
    const v = r[meta.key];
    if (v == null) { setHover(null); return; }
    const day = r.date.substring(8, 10);
    const mon = MONTHS_ID[parseInt(r.date.substring(5, 7)) - 1];
    setHover({ x: xOf(best), y: yOf(v), label: `${day} ${mon}`, value: `${v} ${meta.unit}` });
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ovw-chart-svg" onMouseMove={onMouseMove} onMouseLeave={() => setHover(null)} style={{ cursor: "crosshair" }}>
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const v = lo + f * (hi - lo);
        const y = yOf(v);
        return (
          <g key={f}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--gray-200,#e3e8e5)" strokeWidth="1" />
            <text x={padL - 4} y={y + 3} fontSize="9" fill="var(--gray-500,#888)" textAnchor="end">{v.toFixed(0)}</text>
          </g>
        );
      })}
      {dateTicks.map(({ i }) => (
        <line key={i} x1={xOf(i)} y1={padT} x2={xOf(i)} y2={H - padB} stroke="var(--gray-200,#e3e8e5)" strokeWidth="0.5" strokeDasharray="3,3" />
      ))}
      {isBar
        ? records.map((r, i) => {
            const v = r[meta.key];
            if (v == null || v <= 0) return null;
            const bw = Math.max(1, (W - padL - padR) / n * 0.8);
            const y = yOf(v);
            return <rect key={i} x={xOf(i) - bw / 2} y={y} width={bw} height={H - padB - y} fill={meta.color} opacity="0.75" />;
          })
        : (
          <g>
            {segments.map((pts, si) => (
              <polyline key={si} points={pts} fill="none" stroke={meta.color} strokeWidth="1.5" strokeLinejoin="round" />
            ))}
            {records.map((r, i) => {
              const v = r[meta.key];
              if (v == null) return null;
              return <circle key={i} cx={xOf(i)} cy={yOf(v)} r="2.5" fill={meta.color} />;
            })}
          </g>
        )
      }
      {dateTicks.map(({ d, i }) => (
        <text key={i} x={xOf(i)} y={H - 8} fontSize="9" fill="var(--gray-500,#888)" textAnchor="middle">{d}</text>
      ))}
      {hover && <ChartTooltip {...hover} W={W} padL={padL} padR={padR} padT={padT} H={H} padB={padB} color={meta.color} />}
    </svg>
  );
}

// ---- Chart tahunan (bar/line per tahun, x-axis = tahun) ----
function AnnualChart({ records, meta }) {
  const [hover, setHover] = React.useState(null);
  const W = 560, H = 180, padL = 36, padR = 12, padT = 14, padB = 26;

  const keyMap = { t2m: "t2m", precip: "precip", rh: "rh", rad: "rad" };
  const dataKey = keyMap[meta.key] || meta.key;

  const vals = records.map(r => r[dataKey]).filter(v => v != null);
  if (!vals.length) return (
    <div style={{ height: H, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gray-400,#aaa)", fontSize: 12 }}>
      Tidak ada data
    </div>
  );

  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = dataKey === "precip" ? 0 : min - (max - min) * 0.2;
  const hi = max + (max - min) * 0.2 || max + 1;
  const n = records.length;
  const xOf = i => padL + (n === 1 ? (W - padL - padR) / 2 : (i / (n - 1)) * (W - padL - padR));
  const yOf = v => H - padB - ((v - lo) / (hi - lo || 1)) * (H - padT - padB);
  const isBar = dataKey === "precip";

  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = (e.clientX - rect.left) / rect.width * W;
    let best = 0, bestDist = Infinity;
    records.forEach((_, i) => { const d = Math.abs(xOf(i) - mx); if (d < bestDist) { bestDist = d; best = i; } });
    const v = records[best][dataKey];
    if (v == null) { setHover(null); return; }
    setHover({ x: xOf(best), y: yOf(v), label: String(records[best].year), value: `${v} ${meta.unit}` });
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ovw-chart-svg" onMouseMove={onMouseMove} onMouseLeave={() => setHover(null)} style={{ cursor: "crosshair" }}>
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const v = lo + f * (hi - lo);
        const y = yOf(v);
        return (
          <g key={f}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--gray-200,#e3e8e5)" strokeWidth="1" />
            <text x={padL - 4} y={y + 3} fontSize="9" fill="var(--gray-500,#888)" textAnchor="end">{v.toFixed(0)}</text>
          </g>
        );
      })}
      {isBar
        ? records.map((r, i) => {
            const v = r[dataKey];
            if (v == null) return null;
            const bw = Math.min(40, (W - padL - padR) / (n + 1) * 0.6);
            const y = yOf(v);
            return <rect key={i} x={xOf(i) - bw / 2} y={y} width={bw} height={H - padB - y} rx="3" fill={meta.color} opacity="0.85" />;
          })
        : (
          <g>
            {n > 1 && <polyline points={records.map((r, i) => `${xOf(i)},${yOf(r[dataKey])}`).join(" ")} fill="none" stroke={meta.color} strokeWidth="2.5" />}
            {records.map((r, i) => <circle key={i} cx={xOf(i)} cy={yOf(r[dataKey])} r="5" fill={meta.color} stroke="white" strokeWidth="2" />)}
          </g>
        )
      }
      {records.map((r, i) => (
        <text key={i} x={xOf(i)} y={H - 8} fontSize="9" fill="var(--gray-500,#888)" textAnchor="middle">{r.year}</text>
      ))}
      {hover && <ChartTooltip {...hover} W={W} padL={padL} padR={padR} padT={padT} H={H} padB={padB} color={meta.color} />}
    </svg>
  );
}

Object.assign(window, { TabIkhtisar, ClimateChart, DailyChart, AnnualChart });
