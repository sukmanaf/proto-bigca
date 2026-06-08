// ============================================================
// Climate Modeling — Net Carbon Footprint Monitoring · FITUR 2.3
// Sumber: §2.3 — emisi sektoral − serapan ekosistem = net;
// KPI cards, trajectory vs NDC, MACC, scenario reduction, methane hotspot
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const CARBON_REGIONS = [
  { id: "nasional", name: "Indonesia", emisi: 1452, serapan: 832 },
  { id: "kalbar", name: "Kalimantan Barat", emisi: 142, serapan: 98 },
  { id: "sulsel", name: "Sulawesi Selatan", emisi: 64, serapan: 38 },
  { id: "jabar", name: "Jawa Barat", emisi: 188, serapan: 42 },
];

const CARBON_SECTORS = [
  { id: "energi", label: "Energi", val: 620, color: "#8B1A1A" },
  { id: "lulucf", label: "LULUCF", val: 410, color: "#C18820" },
  { id: "industri", label: "Industri (IPPU)", val: 180, color: "#6B7B74" },
  { id: "pertanian", label: "Pertanian", val: 152, color: "#5B8C5A" },
  { id: "limbah", label: "Limbah", val: 90, color: "#0E5A78" },
];

const MACC = [
  { name: "Efisiensi energi industri", cost: -12, pot: 45 },
  { name: "Solar PV utility", cost: -5, pot: 80 },
  { name: "Restorasi gambut", cost: 8, pot: 120 },
  { name: "Reforestasi", cost: 15, pot: 95 },
  { name: "EV transport", cost: 32, pot: 60 },
  { name: "CCS industri", cost: 68, pot: 40 },
];

function CarbonFootprint({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("nasional");
  const [year, setYear] = React.useState(2024);
  const [reductions, setReductions] = React.useState({ energi: 25, lulucf: 30, industri: 15 });

  const region = CARBON_REGIONS.find(r => r.id === regionId);
  const net = region.emisi - region.serapan;
  const reducedEmisi = region.emisi - (
    CARBON_SECTORS.find(s => s.id === "energi").val / 1452 * region.emisi * reductions.energi / 100 +
    CARBON_SECTORS.find(s => s.id === "lulucf").val / 1452 * region.emisi * reductions.lulucf / 100 +
    CARBON_SECTORS.find(s => s.id === "industri").val / 1452 * region.emisi * reductions.industri / 100
  );
  const reducedNet = Math.round(reducedEmisi - region.serapan);

  const maxMacc = Math.max(...MACC.map(m => Math.abs(m.cost)));

  return (
    <div className="feat-page carbon-page" data-screen-label="Feature: Net Carbon Footprint">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Net Carbon Footprint</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="factory" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.3 · CLIMATE MODELING · BETA</div>
              <h1>Net Carbon Footprint Monitoring</h1>
              <div className="feat-sub">Emisi sektoral − serapan ekosistem · trajectory vs NDC · MACC · scenario reduction · methane hotspot</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export RAN-GRK</button>
          </div>
        </div>
      </div>

      <div className="carbon-filter">
        <label className="fm-field" style={{ maxWidth: 200 }}>
          <span>Wilayah</span>
          <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
            {CARBON_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
        </label>
        <label className="fm-field" style={{ maxWidth: 120 }}>
          <span>Tahun</span>
          <select value={year} onChange={e => setYear(+e.target.value)} className="text-input">
            {[2020, 2022, 2024].map(y => <option key={y}>{y}</option>)}
          </select>
        </label>
      </div>

      {/* KPI cards */}
      <div className="carbon-kpis">
        <div className="carbon-kpi emisi"><div className="carbon-kpi-label">Emisi</div><div className="carbon-kpi-val">{region.emisi.toLocaleString("id-ID")}</div><div className="carbon-kpi-unit">MtCO₂eq</div></div>
        <div className="carbon-kpi serapan"><div className="carbon-kpi-label">Serapan</div><div className="carbon-kpi-val">−{region.serapan.toLocaleString("id-ID")}</div><div className="carbon-kpi-unit">MtCO₂eq</div></div>
        <div className="carbon-kpi net"><div className="carbon-kpi-label">Net</div><div className="carbon-kpi-val">+{net.toLocaleString("id-ID")}</div><div className="carbon-kpi-unit">MtCO₂eq</div></div>
        <div className="carbon-kpi percap"><div className="carbon-kpi-label">Per kapita</div><div className="carbon-kpi-val">{(net / 275 * 1000 / 1000).toFixed(1)}</div><div className="carbon-kpi-unit">tCO₂/jiwa</div></div>
      </div>

      <div className="carbon-grid">
        {/* sector breakdown */}
        <div className="rdtr-panel">
          <div className="rdtr-panel-head">Emisi per Sektor</div>
          <div className="carbon-sectors">
            {CARBON_SECTORS.map(s => (
              <div key={s.id} className="carbon-sector">
                <span className="carbon-sector-label">{s.label}</span>
                <div className="carbon-sector-bar"><div style={{ width: `${(s.val / 620) * 100}%`, background: s.color }} /></div>
                <span className="carbon-sector-val">{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* trajectory vs NDC */}
        <div className="rdtr-panel">
          <div className="rdtr-panel-head">Trajectory vs Target NDC</div>
          <div className="carbon-traj">
            <svg viewBox="0 0 320 160" className="carbon-traj-svg">
              <line x1="34" y1="130" x2="310" y2="130" stroke="var(--gray-300)" />
              <line x1="34" y1="15" x2="34" y2="130" stroke="var(--gray-300)" />
              {/* actual */}
              <polyline points="34,90 90,82 146,78 202,70" fill="none" stroke="var(--gray-700)" strokeWidth="2" />
              {/* BAU */}
              <polyline points="202,70 258,52 310,38" fill="none" stroke="var(--danger-600)" strokeWidth="2" strokeDasharray="4 3" />
              {/* NDC target */}
              <polyline points="202,70 258,88 310,100" fill="none" stroke="var(--success-700)" strokeWidth="2" strokeDasharray="4 3" />
              <text x="305" y="34" fontSize="8" fill="var(--danger-700)" textAnchor="end">BAU</text>
              <text x="305" y="112" fontSize="8" fill="var(--success-700)" textAnchor="end">NDC −31.9%</text>
              <line x1="202" y1="15" x2="202" y2="130" stroke="var(--gray-300)" strokeDasharray="2 2" />
              <text x="202" y="13" fontSize="8" fill="var(--gray-500)" textAnchor="middle">2024</text>
              {["2010","2024","2030","2050"].map((y, i) => <text key={y} x={34 + i * 92} y="148" fontSize="8" fill="var(--gray-500)" textAnchor="middle">{y}</text>)}
            </svg>
          </div>
        </div>

        {/* MACC */}
        <div className="rdtr-panel carbon-macc-panel">
          <div className="rdtr-panel-head">Marginal Abatement Cost Curve (MACC)</div>
          <div className="carbon-macc">
            {MACC.map((m, i) => (
              <div key={i} className="carbon-macc-row">
                <span className="carbon-macc-name">{m.name}</span>
                <div className="carbon-macc-bar-zone">
                  <div className="carbon-macc-center" />
                  {m.cost < 0
                    ? <div className="carbon-macc-bar neg" style={{ right: "50%", width: `${(Math.abs(m.cost) / maxMacc) * 48}%` }}>${m.cost}</div>
                    : <div className="carbon-macc-bar pos" style={{ left: "50%", width: `${(m.cost / maxMacc) * 48}%` }}>+${m.cost}</div>}
                </div>
                <span className="carbon-macc-pot">{m.pot} Mt</span>
              </div>
            ))}
            <div className="carbon-macc-axis"><span>← cost-saving (USD/tCO₂)</span><span>cost →</span></div>
          </div>
        </div>

        {/* scenario reduction */}
        <div className="rdtr-panel carbon-reduce">
          <div className="rdtr-panel-head">Scenario "What-If" Reduction</div>
          <div className="carbon-reduce-sliders">
            {[["energi","Energi"],["lulucf","LULUCF"],["industri","Industri"]].map(([k, l]) => (
              <label key={k} className="fm-field">
                <span>{l}: <strong>{reductions[k]}%</strong></span>
                <input type="range" min="0" max="60" value={reductions[k]} onChange={e => setReductions({ ...reductions, [k]: +e.target.value })} className="weight-range" style={{ "--track-color": "var(--success-500)" }} />
              </label>
            ))}
          </div>
          <div className="carbon-reduce-result">
            <span>Net setelah reduksi</span>
            <span className="carbon-reduce-nums">+{net} <Icon name="arrow-right" size={13} /> <strong style={{ color: reducedNet < net * 0.7 ? "var(--success-700)" : "var(--warning-700)" }}>+{reducedNet}</strong> MtCO₂eq</span>
          </div>
          <div className="carbon-reduce-note"><Icon name="info" size={12} />Reduksi {Math.round((1 - reducedNet/net) * 100)}% — {reducedNet < net * 0.681 ? "memenuhi target NDC 31.9%" : "belum cukup untuk NDC"}</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CarbonFootprint });
