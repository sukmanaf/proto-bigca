// ============================================================
// Sectoral — Land Carrying Capacity Analysis (SHAP) · FITUR 4.7
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.7
// H3 hexagon CC score + SHAP global + per-cell explanation +
// limiting factor + scenario simulation (re-predict)
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const CC_REGIONS = [
  { id: "demak", name: "Kab. Demak", prov: "Jateng", center: [110.64, -6.89], zoom: 11 },
  { id: "makassar", name: "Kota Makassar", prov: "Sulsel", center: [119.45, -5.16], zoom: 11.5 },
  { id: "wajo", name: "Kab. Wajo", prov: "Sulsel", center: [120.03, -4.0], zoom: 10.5 },
];

const CC_GLOBAL = [
  { f: "Water available", v: 0.28 },
  { f: "Slope", v: 0.18 },
  { f: "Soil quality", v: 0.14 },
  { f: "Flood risk", v: 0.12 },
  { f: "Aksesibilitas", v: 0.10 },
  { f: "Sanitation", v: 0.08 },
  { f: "Land cover", v: 0.06 },
  { f: "Air quality", v: 0.04 },
];

const CC_LIMITING = [
  { f: "Water", km2: 320, color: "#0E5A78" },
  { f: "Sanitation", km2: 180, color: "#C18820" },
  { f: "Hazard", km2: 120, color: "#8B1A1A" },
];

// H3 hex grid (mock) — id, q/r axial, cc score, limiting factor
function genHexGrid() {
  const cells = [];
  let id = 0;
  for (let r = 0; r < 7; r++) {
    for (let q = 0; q < 9; q++) {
      const seed = ((q * 7 + r * 13) % 100) / 100;
      const cc = +(0.15 + seed * 0.75).toFixed(2);
      const lim = cc < 0.35 ? (seed > 0.6 ? "Water" : seed > 0.3 ? "Hazard" : "Sanitation") : null;
      cells.push({ id: id++, q, r, cc, lim });
    }
  }
  return cells;
}
const CC_CELLS = genHexGrid();

function ccColor(v) {
  if (v >= 0.7) return "#2F7D5E";   // tinggi tersisa
  if (v >= 0.45) return "#88C0A1";  // sedang
  if (v >= 0.30) return "#C18820";  // rendah (mendekati limit)
  return "#8B1A1A";                 // overloaded
}
function ccCat(v) {
  if (v >= 0.7) return "Tinggi tersisa";
  if (v >= 0.45) return "Sedang";
  if (v >= 0.30) return "Rendah (mendekati limit)";
  return "Overloaded";
}

function CarryingCapacity({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("demak");
  const [selected, setSelected] = React.useState(31);
  const [addPop, setAddPop] = React.useState(1000);
  const [addRoad, setAddRoad] = React.useState(false);
  const [addWater, setAddWater] = React.useState(false);
  const [simResult, setSimResult] = React.useState(null);

  const region = CC_REGIONS.find(r => r.id === regionId);
  const cell = CC_CELLS.find(c => c.id === selected) || CC_CELLS[31];
  const maxG = Math.max(...CC_GLOBAL.map(g => g.v));

  // per-cell SHAP (deterministic from cell)
  const cellShap = React.useMemo(() => {
    const base = cell.cc;
    return [
      { f: "Water available", v: addWater ? +0.10 : -(0.20 - base * 0.15).toFixed(2) * 1 },
      { f: "Flood risk", v: -(0.12 - base * 0.05) },
      { f: "Slope", v: -0.04 },
      { f: "Aksesibilitas", v: addRoad ? +0.12 : +0.05 },
      { f: "Soil quality", v: +0.03 },
    ].map(s => ({ ...s, v: +s.v.toFixed(2) })).sort((a, b) => Math.abs(b.v) - Math.abs(a.v));
  }, [cell, addWater, addRoad]);

  const runSim = () => {
    const popPenalty = (addPop / 1000) * 0.08;
    const waterBonus = addWater ? 0.12 : 0;
    const roadBonus = addRoad ? 0.05 : 0;
    const after = Math.max(0.05, Math.min(0.99, cell.cc - popPenalty + waterBonus + roadBonus));
    setSimResult({ before: cell.cc, after: +after.toFixed(2), limit: addWater ? "sanitation" : "water" });
  };

  return (
    <div className="feat-page cc-page" data-screen-label="Feature: Carrying Capacity">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Land Carrying Capacity</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sectoral"><Icon name="layers" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.7 · SECTORAL · XAI</div>
              <h1>Land Carrying Capacity Analysis</h1>
              <div className="feat-sub">Daya dukung & daya tampung lahan per H3 cell · LightGBM + Spatial CNN · explainable AI (SHAP) per sel</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={() => setRoute("feature-xai")}><Icon name="eye" size={14} />XAI Service</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
          </div>
        </div>
      </div>

      <div className="cc-body">
        {/* LEFT: region + map + sim */}
        <div className="cc-left">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Carrying Capacity · {region.name}</div>
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input" style={{ maxWidth: 180 }}>
                {CC_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="cc-map-stage">
              <HexMap cells={CC_CELLS} selected={selected} region={region} onSelect={(id) => { setSelected(id); setSimResult(null); }} />
              <div className="cc-legend">
                <div className="cc-legend-title">Carrying Capacity</div>
                {[["#2F7D5E","Tinggi tersisa"],["#88C0A1","Sedang"],["#C18820","Mendekati limit"],["#8B1A1A","Overloaded"]].map(([c, l]) => (
                  <div key={l} className="cc-legend-row"><span className="sw" style={{ background: c }} />{l}</div>
                ))}
              </div>
            </div>
            <div className="cc-limiting">
              <span className="cc-limiting-label">Limiting factor overlay:</span>
              {CC_LIMITING.map(l => (
                <span key={l.f} className="cc-limiting-chip"><span className="dot" style={{ background: l.color }} />{l.f}: <strong>{l.km2} km²</strong></span>
              ))}
            </div>
          </div>

          <div className="cc-sim-card">
            <div className="rdtr-panel-head">Scenario Simulation — "Apa jika ditambah?"</div>
            <div className="cc-sim-controls">
              <label className="fm-field">
                <span>Add population: <strong>+{addPop.toLocaleString("id-ID")} jiwa</strong></span>
                <input type="range" min="0" max="5000" step="500" value={addPop} onChange={e => setAddPop(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--accent-sunset)" }} />
              </label>
              <div className="cc-sim-checks">
                <label className="fm-check"><input type="checkbox" checked={addRoad} onChange={e => setAddRoad(e.target.checked)} />Add road</label>
                <label className="fm-check"><input type="checkbox" checked={addWater} onChange={e => setAddWater(e.target.checked)} />Add water supply</label>
              </div>
              <button className="primary-btn rdtr-gen" onClick={runSim}><Icon name="play" size={14} />Simulate (re-predict)</button>
            </div>
            {simResult && (
              <div className="cc-sim-result">
                <div className="cc-sim-delta">
                  <span>CC {region.name}</span>
                  <span className="cc-sim-nums">{simResult.before.toFixed(2)} <Icon name="arrow-right" size={13} /> <strong style={{ color: ccColor(simResult.after) }}>{simResult.after.toFixed(2)}</strong></span>
                </div>
                <div className="cc-sim-limit"><Icon name="info" size={12} />Limit utama: <strong>{simResult.limit}</strong> — {simResult.after < simResult.before ? "perlu pre-condition sebelum tambah populasi" : "intervensi menaikkan daya dukung"}</div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: SHAP global + per-cell */}
        <aside className="cc-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">SHAP Global — Feature Importance</div>
            <div className="cc-global">
              {CC_GLOBAL.map((g, i) => (
                <div key={i} className="cc-global-row">
                  <span className="cc-global-feat">{g.f}</span>
                  <div className="cc-global-bar"><div style={{ width: `${(g.v / maxG) * 100}%` }} /></div>
                  <span className="cc-global-val">{g.v.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rdtr-panel cc-cell">
            <div className="rdtr-panel-head">Per-Cell Explanation
              <span className="rdtr-comp-tag">klik cell di peta</span>
            </div>
            <div className="cc-cell-id">Cell H3-{(0x887c4d + cell.id).toString(16)}…</div>
            <div className="cc-cell-pred">Predicted CC: <strong style={{ color: ccColor(cell.cc) }}>{cell.cc.toFixed(2)}</strong> <span className="muted">({ccCat(cell.cc)})</span></div>
            <div className="cc-cell-shap">
              {cellShap.map((s, i) => (
                <div key={i} className="cc-shap-row">
                  <span className="cc-shap-feat">{s.f}</span>
                  <div className="cc-shap-bar-zone">
                    <div className="cc-shap-center" />
                    {s.v < 0
                      ? <div className="cc-shap-bar neg" style={{ right: "50%", width: `${Math.min(48, Math.abs(s.v) * 200)}%` }} />
                      : <div className="cc-shap-bar pos" style={{ left: "50%", width: `${Math.min(48, s.v * 200)}%` }} />}
                  </div>
                  <span className={`cc-shap-val ${s.v < 0 ? "neg" : "pos"}`}>{s.v > 0 ? "+" : ""}{s.v.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="cc-cell-reco">
              <Icon name="sparkles" size={13} />
              <span><strong>Rekomendasi:</strong> {cell.cc < 0.35 ? "Pre-condition: tingkatkan supply air bersih sebelum tambah populasi." : "Daya dukung memadai; pantau faktor pembatas saat pengembangan."}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function HexMap({ cells, selected, onSelect, region }) {
  const c = (region && region.center) || [119.45, -5.16];
  const step = 0.018; // jarak antar-hex (derajat)
  const s = step * 0.62; // radius hex
  // pusatkan grid 9×7
  const q0 = 4, r0 = 3;
  const hexPoly = (clng, clat) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 180 * (60 * i - 30);
      // koreksi aspek lintang agar hex tampak teratur
      pts.push([clng + s * Math.cos(a) / Math.cos(clat * Math.PI / 180), clat + s * Math.sin(a)]);
    }
    return pts;
  };
  const polygons = cells.map(cell => {
    const clng = c[0] + (cell.q - q0) * step + (cell.r % 2) * (step / 2);
    const clat = c[1] - (cell.r - r0) * step * 0.86;
    const isSel = selected === cell.id;
    return {
      coords: [hexPoly(clng, clat)],
      color: isSel ? "#1F2E29" : "#ffffff", weight: isSel ? 2.5 : 1,
      fillColor: ccColor(cell.cc), fillOpacity: isSel ? 0.95 : 0.7,
      onClick: () => onSelect(cell.id),
      tooltip: `<div class="rrm-pop-title">Sel #${cell.id}</div>
        <div class="rrm-pop-row"><span>Daya dukung</span><b style="color:${ccColor(cell.cc)}">${cell.cc}</b></div>
        ${cell.lim ? `<div class="rrm-pop-row"><span>Pembatas</span><b>${cell.lim}</b></div>` : ""}`,
    };
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap key={(region && region.id) || "cc"} center={c} zoom={(region && region.zoom) || 11.5} basemap="positron" polygons={polygons} controls={true} />
    </div>
  );
}

Object.assign(window, { CarryingCapacity });
