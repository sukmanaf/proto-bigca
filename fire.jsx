// ============================================================
// Sectoral — Forest Fire Risk Prediction (ENSO-aware) · FITUR 4.4
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.4
// ENSO signal + hotspot + fuel moisture (FWI) + anthropogenic → ML daily prob
// + ENSO-fire 30-year correlation, 7-day animation, Manggala Agni mode
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const FIRE_REGIONS = [
  { id: "kalbar", name: "Kalimantan Barat", risk: 0.74, center: [110.5, -0.3], zoom: 7.4 },
  { id: "riau", name: "Riau", risk: 0.81, center: [101.7, 0.5], zoom: 7.4 },
  { id: "sumsel", name: "Sumatera Selatan", risk: 0.68, center: [104.0, -3.2], zoom: 7.4 },
  { id: "kalteng", name: "Kalimantan Tengah", risk: 0.79, center: [113.4, -1.8], zoom: 7.2 },
];

// 7-day forecast probability multipliers
const FIRE_DAYS = [1.0, 1.08, 1.15, 1.22, 1.18, 1.27, 1.34];

// ENSO-fire 30yr scatter (year, ONI, hotspot-normalized)
const ENSO_HISTORY = [
  { y: 1994, oni: 0.4, hs: 0.45 }, { y: 1997, oni: 2.4, hs: 0.98 }, { y: 1998, oni: -1.5, hs: 0.22 },
  { y: 2002, oni: 1.1, hs: 0.62 }, { y: 2004, oni: 0.7, hs: 0.51 }, { y: 2006, oni: 0.9, hs: 0.58 },
  { y: 2009, oni: 1.4, hs: 0.71 }, { y: 2010, oni: -1.4, hs: 0.18 }, { y: 2014, oni: 0.6, hs: 0.48 },
  { y: 2015, oni: 2.5, hs: 1.0 }, { y: 2016, oni: -0.4, hs: 0.30 }, { y: 2018, oni: 0.8, hs: 0.55 },
  { y: 2019, oni: 0.9, hs: 0.66 }, { y: 2021, oni: -0.9, hs: 0.24 }, { y: 2023, oni: 1.6, hs: 0.82 },
  { y: 2026, oni: 1.3, hs: 0.76 },
];

function fireColor(v) {
  if (v >= 0.7) return "#8B1A1A";
  if (v >= 0.4) return "#C44E37";
  if (v >= 0.2) return "#C18820";
  return "#5B8C5A";
}
function fireCat(v) {
  if (v >= 0.7) return "Very High";
  if (v >= 0.4) return "High";
  if (v >= 0.2) return "Medium";
  return "Low";
}

function ForestFireRisk({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("kalbar");
  const [day, setDay] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [layers, setLayers] = React.useState({ prob: true, hotspot: true, peat: true, smoke: false, perim: false });
  const [manggala, setManggala] = React.useState(false);
  const playRef = React.useRef(null);

  const region = FIRE_REGIONS.find(r => r.id === regionId);
  const dayRisk = Math.min(0.95, region.risk * FIRE_DAYS[day]);

  React.useEffect(() => {
    if (playing) {
      playRef.current = setInterval(() => setDay(d => (d + 1) % 7), 700);
    } else {
      clearInterval(playRef.current);
    }
    return () => clearInterval(playRef.current);
  }, [playing]);

  const dateOf = (d) => {
    const base = new Date(2026, 8, 15);
    base.setDate(base.getDate() + d);
    return base.toLocaleDateString("id-ID", { day: "2-digit", month: "short" });
  };

  return (
    <div className={`feat-page fire-page ${manggala ? "manggala" : ""}`} data-screen-label="Feature: Forest Fire Risk">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Forest Fire Risk (ENSO-aware)</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="zap" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.4 · SECTORAL · ENSO-AWARE</div>
              <h1>Forest Fire Risk Prediction</h1>
              <div className="feat-sub">Prediksi karhutla harian-mingguan · ENSO + hotspot + FWI fuel moisture + ML · dukungan Manggala Agni &amp; BNPB</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className={`ghost-btn ${manggala ? "active" : ""}`} onClick={() => setManggala(!manggala)}><Icon name="siren" size={14} />Manggala Agni Mode</button>
            <button className="primary-btn"><Icon name="bell" size={14} />Subscribe Alert</button>
          </div>
        </div>
      </div>

      <div className="fire-body">
        {/* LEFT */}
        <aside className="fire-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Wilayah & Tanggal</div>
            <label className="fm-field">
              <span>Wilayah</span>
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {FIRE_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </label>
            <div className="fire-date">Tanggal: <strong>{dateOf(day)} 2026</strong> · forecast 7 hari</div>
          </div>

          <div className="fire-enso-card">
            <div className="fire-enso-head"><Icon name="thermometer" size={14} />ENSO Status</div>
            <div className="fire-enso-status">El Niño <strong>Moderate</strong></div>
            <div className="fire-enso-oni">ONI: <strong>+1.3</strong> <span className="muted">(peak SOND)</span></div>
            <div className="fire-enso-bar">
              <div className="fire-enso-track">
                <div className="fire-enso-fill" style={{ left: "50%", width: `${(1.3/2.5)*50}%` }} />
                <div className="fire-enso-marker" style={{ left: `${50 + (1.3/2.5)*50}%` }} />
              </div>
              <div className="fire-enso-scale"><span>La Niña</span><span>0</span><span>El Niño</span></div>
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Layer</div>
            <div className="fire-layers">
              {[["prob","Probability today"],["hotspot","Hotspot (24h)"],["peat","Peatland (gambut)"],["smoke","Smoke plume forecast"],["perim","Historic fire perimeter"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={layers[k]} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
          </div>

          <div className="rdtr-panel fire-anim">
            <div className="rdtr-panel-head">Animation 7-day</div>
            <button className="primary-btn rdtr-gen" onClick={() => setPlaying(!playing)}>
              <Icon name={playing ? "pause" : "play"} size={14} />{playing ? "Pause" : "Play"} forecast
            </button>
            <div className="fire-day-track">
              {FIRE_DAYS.map((_, i) => (
                <button key={i} className={`fire-day ${day === i ? "on" : ""}`} onClick={() => { setPlaying(false); setDay(i); }}>{dateOf(i)}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <div className="fire-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Peta Risiko Harian · {region.name}</div>
              <div className="fire-legend">
                <span><span className="sw" style={{ background: "#8B1A1A" }} />Very High</span>
                <span><span className="sw" style={{ background: "#C44E37" }} />High</span>
                <span><span className="sw" style={{ background: "#C18820" }} />Medium</span>
                <span><span className="sw" style={{ background: "#5B8C5A" }} />Low</span>
              </div>
            </div>
            <div className="rdtr-map-stage">
              <FireMap region={region} dayRisk={dayRisk} layers={layers} day={day} />
              <div className="fire-day-badge">{dateOf(day)} 2026 · Hari {day + 1}/7</div>
            </div>
          </div>

          {/* ENSO-fire correlation 30yr */}
          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head">
              <Icon name="activity" size={14} />Korelasi ENSO–Fire 30 Tahun
              <span className="muted">ONI vs hotspot count · r = 0.78 (p&lt;0.001)</span>
            </div>
            <div className="fire-scatter">
              <EnsoScatter data={ENSO_HISTORY} />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <aside className="fire-stats">
          <div className="fire-risk-card" style={{ borderLeftColor: fireColor(dayRisk) }}>
            <div className="fire-risk-label">Risiko {region.name}</div>
            <div className="fire-risk-val" style={{ color: fireColor(dayRisk) }}>{fireCat(dayRisk)}</div>
            <div className="fire-risk-prob">Probability: <strong>{dayRisk.toFixed(2)}</strong></div>
            <div className="fire-risk-meta">{dateOf(day)} 2026 · driven by El Niño moderate</div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Faktor Risiko</div>
            <div className="fire-factors">
              <FireFactor label="FWI (Fire Weather Index)" val={78} color="#C44E37" />
              <FireFactor label="NDMI (fuel dryness)" val={0.18} pct={82} color="#8B1A1A" raw="0.18 (kering)" />
              <FireFactor label="ENSO contribution" val={64} color="#C18820" />
              <FireFactor label="Antropogenik (proximity)" val={55} color="#8B5F0E" />
            </div>
          </div>

          <div className="rdtr-panel fire-ai">
            <div className="rdtr-panel-head"><Icon name="sparkles" size={13} />Interpretasi AI</div>
            <div className="fire-ai-body">
              <p>El Niño moderate (ONI +1.3) menaikkan risiko karhutla <strong>{region.name}</strong> ke <strong>{fireCat(dayRisk)}</strong>. Korelasi historis r=0.78 — pola 2015 & 2023 terulang. Prioritas: patroli Manggala Agni di gambut + water bombing standby.</p>
              <button className="link-btn" onClick={() => setManggala(true)}>Aktifkan Manggala Agni Mode →</button>
            </div>
          </div>

          <div className="fire-crosslinks">
            <button className="fm-crosslink" onClick={() => setRoute("feature-ews")}>
              <Icon name="zap" size={14} /><span>EWS &amp; alert config</span><Icon name="chevron-right" size={12} />
            </button>
            <button className="fm-crosslink" onClick={() => setRoute("feature-mcda")}>
              <Icon name="bar-chart-3" size={14} /><span>Prioritas mitigasi (MCDA)</span><Icon name="chevron-right" size={12} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FireFactor({ label, val, pct, color, raw }) {
  const width = pct != null ? pct : val;
  return (
    <div className="fire-factor">
      <div className="fire-factor-top"><span>{label}</span><strong>{raw || val}</strong></div>
      <div className="fire-factor-bar"><div style={{ width: `${width}%`, background: color }} /></div>
    </div>
  );
}

function FireMap({ region, dayRisk, layers, day }) {
  const c = region.center || [110.5, -0.3];
  // grid sel risiko di sekitar pusat provinsi (8×6 ~ 0.07° per sel)
  const circles = [];
  if (layers.prob) {
    const step = 0.085;
    for (let r = 0; r < 6; r++) for (let col = 0; col < 8; col++) {
      const seed = ((r * 8 + col) * 37 % 100) / 100;
      const prob = Math.min(0.95, Math.max(0.05, dayRisk * (0.5 + seed)));
      const lng = c[0] + (col - 3.5) * step;
      const lat = c[1] + (2.5 - r) * step;
      circles.push({
        lng, lat, radius: 13, color: fireColor(prob),
        fillOpacity: 0.2 + prob * 0.55,
        tooltip: `Prob. karhutla: <b style="color:${fireColor(prob)}">${(prob * 100).toFixed(0)}%</b>`,
      });
    }
  }

  // hotspot VIIRS aktif (pulse) — jumlah skala dayRisk
  const markers = [];
  if (layers.hotspot) {
    const spots = [[-0.18, 0.12], [0.05, -0.05], [0.22, -0.20], [-0.25, -0.10], [0.30, 0.18]];
    spots.slice(0, Math.ceil(dayRisk * 5)).forEach(([dl, dt]) => {
      markers.push({ lng: c[0] + dl, lat: c[1] + dt, html: `<div class="fire-hot"><span></span><i></i></div>`, popup: "Hotspot VIIRS aktif" });
    });
  }

  // overlay gambut & perimeter historis (poligon)
  const polygons = [];
  if (layers.peat) {
    const pe = 0.30;
    polygons.push({
      coords: [[[c[0] - pe, c[1] + pe * .6], [c[0] + pe, c[1] + pe * .7], [c[0] + pe * 1.1, c[1] - pe * .4], [c[0] - pe * .8, c[1] - pe * .5]]],
      color: "#6B4309", fillColor: "#6B4309", fillOpacity: 0.10, weight: 1.5, dash: "5 3", tooltip: "Lahan gambut",
    });
  }
  if (layers.perim) {
    const pr = 0.16;
    polygons.push({
      coords: [[[c[0] - pr, c[1] + pr], [c[0] + pr, c[1] + pr * .8], [c[0] + pr * 1.2, c[1] - pr], [c[0] - pr * .7, c[1] - pr * .9]]],
      color: "#1F2E29", fillColor: "#1F2E29", fillOpacity: 0.04, weight: 1.5, dash: "3 3", tooltip: "Perimeter kebakaran historis",
    });
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap key={region.id} center={c} zoom={region.zoom || 7.4} basemap="positron" circles={circles} polygons={polygons} markers={markers} controls={true} />
    </div>
  );
}

function EnsoScatter({ data }) {
  // x: year 1994-2026 → 40..480 ; y: oni -2..2.5 mapped, dot size by hotspot
  const xOf = (y) => 50 + ((y - 1994) / (2026 - 1994)) * 420;
  const yOf = (oni) => 110 - (oni / 2.5) * 80;
  return (
    <svg viewBox="0 0 500 180" className="fire-scatter-svg">
      <rect width="500" height="180" fill="var(--surface,#fff)" />
      {/* zero line */}
      <line x1="40" y1={yOf(0)} x2="490" y2={yOf(0)} stroke="var(--gray-300)" />
      {/* y labels */}
      {[2, 1, 0, -1, -2].map(v => (
        <g key={v}>
          <text x="32" y={yOf(v) + 3} fontSize="9" fill="var(--gray-500)" textAnchor="end">{v > 0 ? "+" : ""}{v}</text>
          <line x1="40" y1={yOf(v)} x2="44" y2={yOf(v)} stroke="var(--gray-400)" />
        </g>
      ))}
      {/* trend hint */}
      <line x1="50" y1={yOf(0.2)} x2="480" y2={yOf(1.0)} stroke="var(--danger-500)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      {/* points */}
      {data.map(d => (
        <g key={d.y}>
          <circle cx={xOf(d.y)} cy={yOf(d.oni)} r={3 + d.hs * 7} fill={d.oni > 0.5 ? "#C44E37" : d.oni < -0.5 ? "#0E5A78" : "#9DACA4"} fillOpacity="0.7" />
        </g>
      ))}
      {/* x labels */}
      {[1994, 2002, 2010, 2018, 2026].map(y => (
        <text key={y} x={xOf(y)} y="172" fontSize="9" fill="var(--gray-500)" textAnchor="middle">'{String(y).slice(2)}</text>
      ))}
      <text x="480" y={yOf(1.0) - 6} fontSize="9" fill="var(--danger-700)" textAnchor="end">r=0.78</text>
    </svg>
  );
}

Object.assign(window, { ForestFireRisk });
