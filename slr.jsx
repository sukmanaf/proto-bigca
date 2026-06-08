// ============================================================
// Climate Modeling — Sea Level Rise & Land Subsidence · FITUR 2.5
// Sumber: §2.5 — SLR regional + subsidence (GNSS) + inundasi proyeksi
// tide gauge time-series, cross-section profile
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const SLR_REGIONS = [
  { id: "semarang", name: "Kota Semarang", slr: 6.7, subsidence: 21.3, combined: 28 },
  { id: "demak", name: "Kab. Demak", slr: 6.2, subsidence: 9.4, combined: 15.6 },
  { id: "makassar", name: "Kota Makassar", slr: 5.8, subsidence: 3.1, combined: 8.9 },
  { id: "jakarta", name: "DKI Jakarta Utara", slr: 6.5, subsidence: 18.0, combined: 24.5 },
];

const SLR_SCN = [
  { id: "2030-245", label: "2030 SSP2-4.5", rise: 12 },
  { id: "2050-585", label: "2050 SSP5-8.5", rise: 26 },
  { id: "2100-585", label: "2100 SSP5-8.5", rise: 62 },
];

function SLRSubsidence({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("semarang");
  const [layers, setLayers] = React.useState({ slr: true, subsidence: true, inundasi: true, tide: true, gnss: true, cvi: false });
  const [scn, setScn] = React.useState("2050-585");
  const [tideLevel, setTideLevel] = React.useState("MSL");

  const region = SLR_REGIONS.find(r => r.id === regionId);
  const cs = SLR_SCN.find(s => s.id === scn);

  return (
    <div className="feat-page slr-page" data-screen-label="Feature: SLR & Subsidence">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Sea Level Rise & Subsidence</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="globe" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.5 · CLIMATE MODELING</div>
              <h1>Sea Level Rise &amp; Land Subsidence</h1>
              <div className="feat-sub">SLR regional + subsidence GNSS + inundasi proyeksi · tide gauge & cross-section · banjir rob pesisir</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={() => setRoute("feature-coastal")}><Icon name="alert-triangle" size={14} />Coastal Vuln</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export Layer</button>
          </div>
        </div>
      </div>

      <div className="slr-body">
        <aside className="slr-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Wilayah</div>
            <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input" style={{ width: "100%" }}>
              {SLR_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Layer aktif</div>
            <div className="fm-radio-col" style={{ gap: 5 }}>
              {[["slr","SLR (regional)"],["subsidence","Subsidence"],["inundasi","Inundasi proyeksi"],["tide","Tide gauges"],["gnss","GNSS stations"],["cvi","CVI"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={layers[k]} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Skenario</div>
            <div className="fm-radio-col">
              {SLR_SCN.map(s => (
                <button key={s.id} className={`fm-radio-row ${scn === s.id ? "on" : ""}`} onClick={() => setScn(s.id)}>
                  <span className="fm-radio-dot" /><span>{s.label}</span>
                </button>
              ))}
            </div>
            <div className="slr-tide">
              <span className="muted">Tide level:</span>
              <div className="seg-control" style={{ marginTop: 4 }}>
                {["MLW","MSL","MHHW"].map(t => <button key={t} className={`seg-btn ${tideLevel === t ? "active" : ""}`} onClick={() => setTideLevel(t)}>{t}</button>)}
              </div>
            </div>
          </div>
        </aside>

        <div className="slr-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Wilayah Pesisir · {region.name} · {cs.label}</div>
              <div className="slr-legend">
                <span><span className="sw" style={{ background: "#1E4E6B" }} />Inundasi</span>
                <span><span className="sw" style={{ background: "#C44E37" }} />Subsidence tinggi</span>
              </div>
            </div>
            <div className="slr-map-stage"><SLRMap region={region} cs={cs} layers={layers} /></div>
          </div>

          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="trending-up" size={14} />Time-series Tide Gauge · trend {region.slr} mm/yr (SLR)</div>
            <div className="slr-ts"><SLRTimeSeries region={region} /></div>
            <div className="slr-combined">
              <Icon name="alert-triangle" size={13} />
              Combined w/ subsidence: <strong>+{region.combined} mm/yr</strong> — {region.combined > 20 ? "kritis (subsidence dominan)" : "moderat"}
            </div>
          </div>
        </div>

        <aside className="slr-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Rate Breakdown</div>
            <div className="slr-rates">
              <div className="slr-rate"><span>SLR regional</span><strong>+{region.slr} mm/yr</strong></div>
              <div className="slr-rate"><span>Subsidence</span><strong style={{ color: "var(--danger-700)" }}>+{region.subsidence} mm/yr</strong></div>
              <div className="slr-rate total"><span>Combined relatif</span><strong>+{region.combined} mm/yr</strong></div>
            </div>
            <div className="slr-proj">
              <div className="slr-proj-label">Proyeksi kenaikan {cs.label.split(" ")[0]}:</div>
              <div className="slr-proj-val">+{Math.round(cs.rise + region.subsidence * (parseInt(cs.label) - 2026) / 10 / 10)} cm</div>
            </div>
          </div>

          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="activity" size={13} />Profil Cross-Section</div>
            <div className="slr-profile"><SLRProfile cs={cs} /></div>
          </div>

          <button className="fm-crosslink" onClick={() => setRoute("feature-flood")}>
            <Icon name="map" size={14} /><span>Flood modeling rob</span><Icon name="chevron-right" size={12} />
          </button>
        </aside>
      </div>
    </div>
  );
}

function SLRMap({ region, cs, layers }) {
  const inundDepth = cs.rise / 62; // 0..1
  return (
    <svg viewBox="0 0 500 320" className="rdtr-svg" preserveAspectRatio="xMidYMid meet">
      <rect width="500" height="320" fill="#BAD9E8" fillOpacity="0.3" />
      {/* land */}
      <path d="M0,140 Q120,120 250,135 Q380,150 500,130 L500,320 L0,320 Z" fill="var(--surface,#fff)" stroke="var(--border-strong)" strokeWidth="1" />
      {/* inundation zone (grows with scenario) */}
      {layers.inundasi && (
        <path d={`M0,140 Q120,120 250,135 Q380,150 500,130 L500,${150 + inundDepth * 60} Q380,${175 + inundDepth*55} 250,${165 + inundDepth*55} Q120,${155 + inundDepth*50} 0,${175 + inundDepth*50} Z`}
          fill="#1E4E6B" fillOpacity="0.5" />
      )}
      {/* subsidence gradient (color cells) */}
      {layers.subsidence && Array.from({ length: 8 }).map((_, i) => {
        const sev = (region.subsidence / 25) * (0.5 + (i % 3) * 0.25);
        return <rect key={i} x={20 + i * 58} y="200" width="54" height="50" fill="#C44E37" fillOpacity={sev * 0.5} />;
      })}
      {/* tide gauges */}
      {layers.tide && [[90,150],[260,148],[410,140]].map(([x, y], i) => (
        <g key={i}><circle cx={x} cy={y} r="5" fill="#0E5A78" stroke="#fff" strokeWidth="1.5" /><text x={x} y={y - 9} fontSize="8" fill="var(--text-primary)" textAnchor="middle">TG-{i+1}</text></g>
      ))}
      {/* GNSS CORS */}
      {layers.gnss && [[160,175],[340,170]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y-7} L${x+6},${y+5} L${x-6},${y+5} Z`} fill="#C18820" stroke="#fff" strokeWidth="1" />
      ))}
      <text x="20" y="30" fontSize="11" fill="#0E5A78">Laut</text>
      <text x="20" y="305" fontSize="11" fill="var(--text-muted,#6B7B74)">Daratan (subsidence overlay)</text>
    </svg>
  );
}

function SLRTimeSeries({ region }) {
  const pts = [];
  for (let i = 0; i <= 34; i++) {
    const yr = 1990 + i;
    const trend = (i / 34) * (region.slr * 0.34);
    const noise = Math.sin(i * 1.3) * 8 + (Math.random() - 0.5) * 6;
    pts.push(`${30 + i * 13},${110 - trend - noise}`);
  }
  return (
    <svg viewBox="0 0 480 140" className="slr-ts-svg">
      <line x1="30" y1="110" x2="470" y2="110" stroke="var(--gray-300)" />
      <polyline points={pts.join(" ")} fill="none" stroke="var(--primary-600)" strokeWidth="1.5" />
      <line x1="30" y1="110" x2="470" y2="60" stroke="var(--danger-500)" strokeWidth="1.5" strokeDasharray="4 3" />
      {["1990","2000","2010","2020"].map((y, i) => <text key={y} x={30 + i * 130} y="128" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{y}</text>)}
      <text x="460" y="56" fontSize="9" fill="var(--danger-700)" textAnchor="end">trend +{region.slr}mm/yr</text>
    </svg>
  );
}

function SLRProfile({ cs }) {
  const slr2050 = 95 - cs.rise * 0.3;
  return (
    <svg viewBox="0 0 280 130" className="slr-profile-svg">
      <path d="M10,40 Q60,35 100,55 L160,75 Q220,95 270,100" fill="none" stroke="var(--gray-700)" strokeWidth="1.5" />
      <path d="M10,40 Q60,35 100,55 L160,75 Q220,95 270,100 L270,130 L10,130 Z" fill="#C49A6A" fillOpacity="0.3" />
      {/* sea levels */}
      <line x1="10" y1="95" x2="270" y2="95" stroke="#0E5A78" strokeWidth="1" strokeDasharray="3 2" />
      <text x="14" y="92" fontSize="8" fill="#0E5A78">MSL</text>
      <line x1="10" y1={slr2050} x2="270" y2={slr2050} stroke="#C44E37" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="14" y={slr2050 - 3} fontSize="8" fill="#C44E37">{cs.label.split(" ")[0]} SLR</text>
      <rect x="10" y={slr2050} width="260" height={95 - slr2050} fill="#1E4E6B" fillOpacity="0.25" />
      <text x="200" y="120" fontSize="8" fill="var(--gray-500)">Seabed</text>
    </svg>
  );
}

Object.assign(window, { SLRSubsidence });
