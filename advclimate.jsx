// ============================================================
// Climate Modeling — Advanced Climate Modeling · FITUR 2.1
// Sumber: §2.1 — CMIP6 ensemble downscaling, variabel iklim,
// skenario emisi, time-slider, ensemble/uncertainty, time-series
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const ACM_VARS = [
  { id: "tmax", label: "Suhu Maksimum", unit: "°C", base: 32 },
  { id: "precip", label: "Curah Hujan", unit: "mm/bln", base: 240 },
  { id: "humid", label: "Kelembaban", unit: "%", base: 78 },
  { id: "extreme", label: "Indeks Ekstrem", unit: "", base: 1.2 },
];
const ACM_SCN = [
  { id: "ssp126", label: "SSP1-2.6 (Mitigasi)", delta: 0.6 },
  { id: "ssp245", label: "SSP2-4.5 (Tengah)", delta: 1.4 },
  { id: "ssp370", label: "SSP3-7.0", delta: 2.2 },
  { id: "ssp585", label: "SSP5-8.5 (BAU)", delta: 3.4 },
];
const ACM_ENSEMBLE = ["Ensemble Mean", "Anggota individu (n=15)", "Uncertainty (5%–95%)", "Signal-to-noise"];

function AdvancedClimate({ setRoute, ctx, openAI }) {
  const [variable, setVariable] = React.useState("tmax");
  const [scn, setScn] = React.useState("ssp245");
  const [year, setYear] = React.useState(2050);
  const [ensemble, setEnsemble] = React.useState("Ensemble Mean");
  const [playing, setPlaying] = React.useState(false);
  const playRef = React.useRef(null);

  const v = ACM_VARS.find(x => x.id === variable);
  const cs = ACM_SCN.find(s => s.id === scn);
  const projDelta = cs.delta * ((year - 2025) / 75);
  const projVal = variable === "precip" ? Math.round(v.base * (1 + projDelta * 0.06)) : variable === "tmax" ? +(v.base + projDelta).toFixed(1) : +(v.base + projDelta * 0.5).toFixed(1);

  React.useEffect(() => {
    if (playing) playRef.current = setInterval(() => setYear(y => y >= 2100 ? 2025 : y + 5), 350);
    else clearInterval(playRef.current);
    return () => clearInterval(playRef.current);
  }, [playing]);

  return (
    <div className="feat-page acm-page" data-screen-label="Feature: Advanced Climate Modeling">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Advanced Climate Modeling</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="thermometer" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.1 · CLIMATE MODELING</div>
              <h1>Advanced Climate Modeling</h1>
              <div className="feat-sub">Ensemble CMIP6 downscaling skala kab/kota · multi-skenario · uncertainty band · time-series 1981–2100</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export NetCDF</button>
          </div>
        </div>
      </div>

      <div className="acm-body">
        <aside className="acm-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Variabel Iklim</div>
            <div className="fm-radio-col">
              {ACM_VARS.map(x => (
                <button key={x.id} className={`fm-radio-row ${variable === x.id ? "on" : ""}`} onClick={() => setVariable(x.id)}>
                  <span className="fm-radio-dot" /><span>{x.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Skenario Emisi</div>
            <div className="fm-radio-col">
              {ACM_SCN.map(s => (
                <button key={s.id} className={`fm-radio-row ${scn === s.id ? "on" : ""}`} onClick={() => setScn(s.id)}>
                  <span className="fm-radio-dot" /><span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Ensemble</div>
            <div className="fm-radio-col">
              {ACM_ENSEMBLE.map(e => (
                <button key={e} className={`fm-radio-row ${ensemble === e ? "on" : ""}`} onClick={() => setEnsemble(e)}>
                  <span className="fm-radio-dot" /><span>{e}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="acm-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />{v.label} · {cs.label} · {year}</div>
              <div className="acm-readout">{projVal}{v.unit} <span className="muted">(baseline {v.base}{v.unit})</span></div>
            </div>
            <div className="acm-map-stage"><ACMMap variable={variable} projDelta={projDelta} ensemble={ensemble} /></div>
            <div className="acm-timeslider">
              <button className="time-play" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={14} /></button>
              <input type="range" min="2025" max="2100" step="5" value={year} onChange={e => { setPlaying(false); setYear(+e.target.value); }} className="fm-swipe-range" />
              <span className="acm-year">{year}</span>
            </div>
          </div>
          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="trending-up" size={14} />Time-series {v.label} 1981–2100 · klik titik di peta</div>
            <div className="acm-ts"><ACMTimeSeries v={v} cs={cs} /></div>
          </div>
        </div>

        <aside className="acm-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Proyeksi {year}</div>
            <div className="acm-proj">
              <div className="acm-proj-val">{projVal}<span>{v.unit}</span></div>
              <div className={`acm-proj-delta ${projDelta > 0 ? "up" : ""}`}>
                {variable === "tmax" ? `+${projDelta.toFixed(1)}°C` : variable === "precip" ? `${projDelta > 0 ? "+" : ""}${Math.round(projDelta*6)}%`: `+${(projDelta*0.5).toFixed(1)}`} vs baseline
              </div>
            </div>
            <div className="acm-band">
              <div className="acm-band-label">Uncertainty 5%–95%</div>
              <div className="acm-band-bar"><div className="acm-band-fill" style={{ left: "20%", right: "15%" }} /><div className="acm-band-mean" style={{ left: "52%" }} /></div>
            </div>
          </div>
          <div className="rdtr-panel acm-submods">
            <div className="rdtr-panel-head">Sub-modul lanjutan</div>
            <label className="fm-check"><input type="checkbox" />LCZ overlay (Local Climate Zone)</label>
            <label className="fm-check"><input type="checkbox" />Microclimate UHI (Urban Heat Island)</label>
            <label className="fm-check"><input type="checkbox" defaultChecked />Compare baseline vs target</label>
          </div>
          <button className="fm-crosslink" onClick={() => setRoute("feature-flood")}>
            <Icon name="map" size={14} /><span>Driver untuk Flood Model</span><Icon name="chevron-right" size={12} />
          </button>
        </aside>
      </div>
    </div>
  );
}

function ACMMap({ variable, projDelta, ensemble }) {
  const isUncert = ensemble.startsWith("Uncertainty");
  const ramp = variable === "precip" ? ["#E0F2FE", "#60A5FA", "#1E4E6B"] : ["#FDF3DC", "#E9A352", "#C44E37", "#8B1A1A"];
  const colorAt = (t) => ramp[Math.min(ramp.length - 1, Math.floor(t * ramp.length))];

  // grid downscaling ~0.07° di atas Sulawesi Selatan
  const center = [119.9, -4.3];
  const cols = 11, rows = 7, step = 0.28;
  const lng0 = center[0] - (cols / 2) * step, lat0 = center[1] + (rows / 2) * step;

  const polygons = [];
  for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
    const seed = ((r * cols + col) * 31) % 100 / 100;
    const intensity = Math.min(0.99, seed * 0.6 + projDelta / 4);
    const lng = lng0 + col * step, lat = lat0 - r * step;
    const ring = [[lng, lat], [lng + step, lat], [lng + step, lat - step], [lng, lat - step]];
    polygons.push({
      coords: [ring], color: "#ffffff", weight: 0.4,
      fillColor: isUncert ? "#9DACA4" : colorAt(intensity),
      fillOpacity: isUncert ? intensity * 0.6 : 0.7,
      tooltip: isUncert ? `Uncertainty: ±${(intensity * (variable === "precip" ? 40 : 1.6)).toFixed(1)}${variable === "precip" ? "%" : "°C"}`
        : `${variable === "precip" ? "Δ presipitasi" : "Δ suhu"}: ${(intensity * (variable === "precip" ? 30 : 4) + projDelta).toFixed(1)}${variable === "precip" ? "%" : "°C"}`,
    });
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap center={center} zoom={6.4} basemap="positron" polygons={polygons} controls={true} />
    </div>
  );
}

function ACMTimeSeries({ v, cs }) {
  const pts = [], upper = [], lower = [];
  for (let i = 0; i <= 24; i++) {
    const yr = 1981 + i * 5;
    const future = yr > 2025;
    const trend = future ? cs.delta * ((yr - 2025) / 75) : 0;
    const seasonal = Math.sin(i * 1.1) * 4;
    const y = 100 - trend * 14 - seasonal;
    pts.push(`${30 + i * 18},${y}`);
    if (future) { upper.push(`${30 + i * 18},${y - trend * 5}`); lower.push(`${30 + i * 18},${y + trend * 5}`); }
  }
  return (
    <svg viewBox="0 0 480 130" className="acm-ts-svg">
      <line x1="30" y1="105" x2="470" y2="105" stroke="var(--gray-300)" />
      <line x1="426" y1="15" x2="426" y2="105" stroke="var(--gray-300)" strokeDasharray="2 2" />
      <text x="426" y="13" fontSize="8" fill="var(--gray-500)" textAnchor="middle">2025</text>
      {upper.length > 1 && <polygon points={upper.concat(lower.reverse()).join(" ")} fill="var(--danger-200,#F3D4CD)" opacity="0.4" />}
      <polyline points={pts.join(" ")} fill="none" stroke="var(--primary-600)" strokeWidth="1.5" />
      {["1981","2010","2040","2070","2100"].map((y, i) => <text key={y} x={30 + i * 110} y="123" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{y}</text>)}
    </svg>
  );
}

Object.assign(window, { AdvancedClimate });
