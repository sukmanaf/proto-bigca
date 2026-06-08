// ============================================================
// Climate Modeling — Flood & Drought Modeler (FITUR 2.6)
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §2.6 (Flood & Drought)
// Mode · wilayah · return period · climate scenario · custom run
// → peta DAS + statistik dampak live + cross-links
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const DAS_REGIONS = [
  { id: "citarum", name: "DAS Citarum", prov: "Jabar", areaKm2: 6614, basePop: 412000, baseFloodKm2: 2340, asetT: 1.8, taniKm2: 187, sekolah: 87, rs: 12 },
  { id: "cenranae", name: "DAS Cenranae (Wajo)", prov: "Sulsel", areaKm2: 2890, basePop: 142000, baseFloodKm2: 880, asetT: 0.62, taniKm2: 94, sekolah: 38, rs: 5 },
  { id: "bengawan", name: "DAS Bengawan Solo", prov: "Jateng/Jatim", areaKm2: 16100, basePop: 680000, baseFloodKm2: 3120, asetT: 2.9, taniKm2: 412, sekolah: 142, rs: 24 },
  { id: "kapuas", name: "DAS Kapuas", prov: "Kalbar", areaKm2: 98740, basePop: 240000, baseFloodKm2: 1840, asetT: 0.9, taniKm2: 156, sekolah: 54, rs: 8 },
];

const RETURN_PERIODS = [
  { id: 100, label: "100-yr", mult: 1.0 },
  { id: 50, label: "50-yr", mult: 0.82 },
  { id: 25, label: "25-yr", mult: 0.64 },
  { id: 10, label: "10-yr", mult: 0.45 },
  { id: 5, label: "5-yr", mult: 0.31 },
];

const CLIMATE_SCN = [
  { id: "current", label: "Current", mult: 1.0, delta: 0 },
  { id: "2050-245", label: "2050 SSP2-4.5", mult: 1.14, delta: 14 },
  { id: "2050-585", label: "2050 SSP5-8.5", mult: 1.24, delta: 24 },
  { id: "2100-585", label: "2100 SSP5-8.5", mult: 1.48, delta: 48 },
];

function FloodDroughtModeler({ setRoute, ctx, openAI }) {
  const [mode, setMode] = React.useState("hazard");
  const [regionId, setRegionId] = React.useState("cenranae");
  const [returnP, setReturnP] = React.useState(100);
  const [scn, setScn] = React.useState("current");
  const [rainfall, setRainfall] = React.useState(250);
  const [duration, setDuration] = React.useState("24h");
  const [antecedent, setAntecedent] = React.useState("medium");
  const [running, setRunning] = React.useState(false);
  const [layers, setLayers] = React.useState({ cur100: true, fut100: true, drainase: false, tanggul: false, asset: false });
  const [swipe, setSwipe] = React.useState(60);

  const region = DAS_REGIONS.find(r => r.id === regionId);
  const rp = RETURN_PERIODS.find(r => r.id === returnP);
  const cs = CLIMATE_SCN.find(c => c.id === scn);

  // Deterministic impact model
  const factor = rp.mult * cs.mult;
  const floodKm2 = Math.round(region.baseFloodKm2 * factor);
  const popAffected = Math.round(region.basePop * factor);
  const aset = +(region.asetT * factor).toFixed(2);
  const tani = Math.round(region.taniKm2 * factor);
  const sekolah = Math.round(region.sekolah * factor);
  const rs = Math.round(region.rs * factor);

  const runSim = () => {
    setRunning(true);
    setTimeout(() => setRunning(false), 1600);
  };

  const modes = [
    { id: "hazard", label: "Bahaya & Risiko", icon: "alert-triangle" },
    { id: "drought", label: "Drought Monitor", icon: "thermometer" },
    { id: "nowcast", label: "Real-time Nowcast", icon: "activity" },
    { id: "custom", label: "Custom Simulation", icon: "zap" },
  ];

  return (
    <div className="feat-page flood-modeler" data-screen-label="Feature: Flood & Drought Modeler">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Flood &amp; Drought Modeling</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="thermometer" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.6 · CLIMATE MODELING · KRITIS</div>
              <h1>Flood &amp; Drought Modeling</h1>
              <div className="feat-sub">Hydrological modeling banjir &amp; kekeringan · HEC-RAS + nowcasting · early warning life-saving</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="git-branch" size={14} />Compare InaRISK</button>
            <button className="primary-btn" onClick={() => setRoute("feature-mcda")}><Icon name="bar-chart-3" size={14} />Lihat di MCDA</button>
          </div>
        </div>
      </div>

      {/* mode tabs */}
      <div className="fm-modes">
        {modes.map(m => (
          <button key={m.id} className={`fm-mode ${mode === m.id ? "active" : ""}`} onClick={() => setMode(m.id)}>
            <Icon name={m.icon} size={15} />
            <span>{m.label}</span>
          </button>
        ))}
        {mode === "nowcast" && <span className="fm-live-badge"><span className="live-dot" />LIVE · update 10 menit</span>}
      </div>

      <div className="fm-body">
        {/* LEFT controls */}
        <aside className="fm-controls">
          <div className="fm-panel">
            <div className="fm-panel-head">Wilayah (DAS)</div>
            <div className="fm-region">
              <Icon name="map-pin" size={15} />
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {DAS_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name} · {r.prov}</option>)}
              </select>
            </div>
            <div className="fm-region-meta">Luas DAS: <strong>{region.areaKm2.toLocaleString("id-ID")} km²</strong></div>
          </div>

          <div className="fm-panel">
            <div className="fm-panel-head">Return Period</div>
            <div className="fm-radio-grid">
              {RETURN_PERIODS.map(r => (
                <button key={r.id} className={`fm-radio ${returnP === r.id ? "on" : ""}`} onClick={() => setReturnP(r.id)}>{r.label}</button>
              ))}
            </div>
          </div>

          <div className="fm-panel">
            <div className="fm-panel-head">Skenario Climate</div>
            <div className="fm-radio-col">
              {CLIMATE_SCN.map(c => (
                <button key={c.id} className={`fm-radio-row ${scn === c.id ? "on" : ""}`} onClick={() => setScn(c.id)}>
                  <span className="fm-radio-dot" />
                  <span>{c.label}</span>
                  {c.delta > 0 && <span className="fm-radio-delta">+{c.delta}%</span>}
                </button>
              ))}
            </div>
          </div>

          {mode === "custom" && (
            <div className="fm-panel fm-custom">
              <div className="fm-panel-head">Custom Run</div>
              <label className="fm-field">
                <span>Rainfall (mm/24h)</span>
                <input type="number" value={rainfall} onChange={e => setRainfall(+e.target.value)} className="text-input" />
              </label>
              <label className="fm-field">
                <span>Duration</span>
                <select value={duration} onChange={e => setDuration(e.target.value)} className="text-input">
                  <option>6h</option><option>12h</option><option>24h</option><option>48h</option><option>72h</option>
                </select>
              </label>
              <label className="fm-field">
                <span>Antecedent moisture</span>
                <select value={antecedent} onChange={e => setAntecedent(e.target.value)} className="text-input">
                  <option value="dry">Dry</option><option value="medium">Medium</option><option value="wet">Wet</option>
                </select>
              </label>
              <button className="primary-btn fm-run" onClick={runSim} disabled={running}>
                {running ? <><span className="whatif-spinner" />Running HEC-RAS…</> : <><Icon name="play" size={14} />Run Simulation</>}
              </button>
              <div className="fm-run-note"><Icon name="clock" size={11} />Hydraulic sim DAS sedang &lt; 30 menit (mock: instan)</div>
            </div>
          )}

          <div className="fm-panel">
            <div className="fm-panel-head">Alert Subscriptions</div>
            <label className="fm-check"><input type="checkbox" defaultChecked /> Email</label>
            <label className="fm-check"><input type="checkbox" defaultChecked /> Push notification</label>
            <label className="fm-check"><input type="checkbox" /> SMS (BPBD tier)</label>
            <button className="ghost-btn small fm-manage"><Icon name="bell" size={12} />Manage Alerts</button>
          </div>
        </aside>

        {/* CENTER map */}
        <div className="fm-center">
          <div className="fm-map-card">
            <div className="fm-map-head">
              <div className="card-title"><Icon name="map" size={14} />Peta DAS · {region.name}</div>
              <div className="fm-depth-legend">
                <span>Kedalaman:</span>
                <span><span className="sw" style={{ background: "#BAD9E8" }} />0–0.5m</span>
                <span><span className="sw" style={{ background: "#5FA3C7" }} />0.5–1.5m</span>
                <span><span className="sw" style={{ background: "#1E4E6B" }} />&gt;1.5m</span>
              </div>
            </div>
            <div className="fm-map-stage">
              <FloodMap region={region} factor={factor} swipe={swipe} layers={layers} running={running} mode={mode} />
              {running && <div className="fm-running-overlay"><span className="whatif-spinner big" /><span>Menjalankan simulasi hidrolik…</span></div>}
              <div className="fm-swipe-control">
                <span className="fm-swipe-label">Current</span>
                <input type="range" min="0" max="100" value={swipe} onChange={e => setSwipe(+e.target.value)} className="fm-swipe-range" />
                <span className="fm-swipe-label">2050 {cs.delta > 0 ? cs.label : "future"}</span>
              </div>
            </div>
            <div className="fm-layer-toggles">
              {[
                ["cur100", `Banjir ${returnP}-yr (current)`],
                ["fut100", `Banjir ${returnP}-yr (${cs.label})`],
                ["drainase", "Drainase urban"],
                ["tanggul", "Tanggul existing"],
                ["asset", "Aset terdampak (overlay)"],
              ].map(([k, label]) => (
                <label key={k} className={`fm-layer ${layers[k] ? "on" : ""}`}>
                  <input type="checkbox" checked={layers[k]} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />
                  <span className="fm-layer-check" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT stats */}
        <aside className="fm-stats">
          <div className="fm-panel">
            <div className="fm-panel-head">Statistik &amp; Dampak
              <span className="fm-scn-tag">{rp.label} · {cs.label}</span>
            </div>
            <div className="fm-stat-list">
              <FmStat icon="map" label="Area tergenang" value={`${floodKm2.toLocaleString("id-ID")} km²`} hi />
              <FmStat icon="users" label="Populasi terdampak" value={popAffected.toLocaleString("id-ID")} hi />
              <FmStat icon="factory" label="Aset infrastruktur" value={`IDR ${aset} T`} />
              <FmStat icon="layers" label="Lahan pertanian" value={`${tani} km²`} />
              <FmStat icon="book-open" label="Sekolah" value={sekolah} inline rsVal={rs} />
            </div>
          </div>

          {cs.delta > 0 && (
            <div className="fm-delta-card">
              <div className="fm-delta-head"><Icon name="trending-up" size={14} />Delta vs Current · {cs.label}</div>
              <div className="fm-delta-rows">
                <div><span>Area</span><strong className="up">+{cs.delta}%</strong></div>
                <div><span>Populasi</span><strong className="up">+{Math.round(cs.delta * 0.78)}%</strong></div>
                <div><span>Aset</span><strong className="up">+{Math.round(cs.delta * 0.92)}%</strong></div>
              </div>
            </div>
          )}

          <div className="fm-panel fm-ai">
            <div className="fm-panel-head"><Icon name="sparkles" size={13} />Interpretasi AI</div>
            <div className="fm-ai-body">
              <p>Pada <strong>{rp.label}</strong> + <strong>{cs.label}</strong>, {region.name} memproyeksikan <strong>{floodKm2.toLocaleString("id-ID")} km²</strong> tergenang.{cs.delta > 0 && ` Perubahan iklim menambah ${cs.delta}% area banjir.`} Prioritas mitigasi: retrofit drainase + restriksi RDTR zona floodplain.</p>
            </div>
          </div>

          <div className="fm-crosslinks">
            <button className="fm-crosslink" onClick={() => setRoute("feature-mcda")}>
              <Icon name="bar-chart-3" size={14} /><span>Lihat di MCDA untuk mitigasi</span><Icon name="chevron-right" size={12} />
            </button>
            <button className="fm-crosslink" onClick={() => setRoute("feature-vuln")}>
              <Icon name="alert-triangle" size={14} /><span>Vulnerability assessment</span><Icon name="chevron-right" size={12} />
            </button>
            <button className="fm-crosslink"><Icon name="git-branch" size={14} /><span>Compare dengan InaRISK BNPB</span><Icon name="chevron-right" size={12} /></button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function FmStat({ icon, label, value, hi, inline, rsVal }) {
  return (
    <div className="fm-stat">
      <div className="fm-stat-icon"><Icon name={icon} size={14} /></div>
      <div className="fm-stat-body">
        <div className="fm-stat-label">{label}</div>
        {inline ? (
          <div className="fm-stat-inline"><strong>{value}</strong> sekolah · <strong>{rsVal}</strong> RS</div>
        ) : (
          <div className={`fm-stat-value ${hi ? "hi" : ""}`}>{value}</div>
        )}
      </div>
    </div>
  );
}

function FloodMap({ region, factor, swipe, layers, running, mode }) {
  // flood zones scale with factor; swipe reveals future extent
  const baseZones = [
    { d: "M150,180 Q200,150 260,175 T380,185 L390,240 Q300,260 200,250 T120,235 Z", depth: 2 },
    { d: "M180,250 Q260,235 340,255 L350,300 Q270,315 190,300 Z", depth: 1 },
    { d: "M200,120 Q250,108 300,125 L305,160 Q255,170 205,158 Z", depth: 0 },
  ];
  const depthColors = ["#BAD9E8", "#5FA3C7", "#1E4E6B"];
  const futureScale = 1 + (factor - 1) * 0.6;
  const revealFuture = swipe / 100;

  return (
    <svg viewBox="0 0 500 360" className="fm-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="fm-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
        </pattern>
        <clipPath id="fm-future-clip"><rect x={500 * (1 - revealFuture)} y="0" width={500 * revealFuture} height="360" /></clipPath>
      </defs>
      <rect width="500" height="360" fill="var(--surface-sunken, #E9EEEA)" />
      <rect width="500" height="360" fill="url(#fm-grid)" />

      {/* DAS outline */}
      <path d="M90,60 L400,50 L420,180 L380,320 L240,340 L120,310 L80,180 Z"
        fill="var(--surface, #fff)" stroke="var(--border-strong)" strokeWidth="1.5" fillOpacity="0.5" />
      {/* river network */}
      <path d="M120,80 Q200,160 240,200 T320,330" fill="none" stroke="#5FA3C7" strokeWidth="2.5" opacity="0.7" />
      <path d="M240,200 Q300,180 380,150" fill="none" stroke="#5FA3C7" strokeWidth="1.8" opacity="0.6" />

      {/* current flood (left of swipe) */}
      {layers.cur100 && baseZones.map((z, i) => (
        <path key={"c"+i} d={z.d} fill={depthColors[z.depth]} fillOpacity="0.62" stroke={depthColors[z.depth]} strokeWidth="0.5" />
      ))}

      {/* future flood (revealed by swipe, scaled larger) */}
      {layers.fut100 && (
        <g clipPath="url(#fm-future-clip)">
          {baseZones.map((z, i) => (
            <path key={"f"+i} d={z.d} fill={depthColors[Math.min(2, z.depth + 1)]} fillOpacity="0.72"
              transform={`translate(250,180) scale(${futureScale}) translate(-250,-180)`} />
          ))}
        </g>
      )}
      {/* swipe line */}
      {layers.fut100 && (
        <line x1={500 * (1 - revealFuture)} y1="0" x2={500 * (1 - revealFuture)} y2="360" stroke="var(--text-primary)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5" />
      )}

      {/* tanggul */}
      {layers.tanggul && <path d="M150,210 Q240,195 330,215" fill="none" stroke="#8B5F0E" strokeWidth="3" strokeDasharray="6 3" />}
      {/* drainase */}
      {layers.drainase && <g opacity="0.6">
        <line x1="180" y1="160" x2="200" y2="280" stroke="#2A9D8F" strokeWidth="1.5" />
        <line x1="280" y1="150" x2="290" y2="290" stroke="#2A9D8F" strokeWidth="1.5" />
      </g>}
      {/* asset overlay */}
      {layers.asset && <g>
        {[[220,200],[270,230],[180,240],[310,210],[240,170]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="7" height="7" fill="#8B1A1A" stroke="#fff" strokeWidth="0.6" />
        ))}
      </g>}

      <g transform="translate(250,200)" style={{ pointerEvents: "none" }}>
        <circle r="4" fill="var(--text-primary)" />
        <text y="20" textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--text-primary)">{region.name}</text>
      </g>
    </svg>
  );
}

Object.assign(window, { FloodDroughtModeler });
