// ============================================================
// Sectoral — Renewable Energy Deployment Optimization · FITUR 4.6
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.6
// Suitability per teknologi (PLTS/PLTB/PLTM/Geothermal) + MILP
// portfolio optimization → ranked locations, LCOE, CO2 avoided
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const RE_TECHS = [
  { id: "plts", label: "PLTS (Surya)", color: "#E9A352", lcoe: 65 },
  { id: "pltb", label: "PLTB (Bayu)", color: "#0E5A78", lcoe: 78 },
  { id: "pltm", label: "PLTM (Mini-hidro)", color: "#2A9D8F", lcoe: 58 },
  { id: "geo", label: "Geothermal", color: "#C44E37", lcoe: 71 },
];

const RE_REGIONS = [
  { id: "ntt", name: "NTT", solar: 5.4, wind: 7.2, center: [122.5, -9.6], zoom: 7 },
  { id: "sulsel", name: "Sulawesi Selatan", solar: 4.9, wind: 5.1, center: [119.9, -4.3], zoom: 6.6 },
  { id: "jabar", name: "Jawa Barat", solar: 4.6, wind: 4.2, center: [107.6, -6.7], zoom: 7.8 },
];

// candidate sites (mock) — id, tech, mw, lcoe, grid km, koordinat asli (lng,lat)
const RE_SITES = {
  ntt: [
    { id: 1, tech: "plts", name: "Kupang Timur", mw: 80, lcoe: 62, grid: 2.1, lng: 123.75, lat: -10.15 },
    { id: 2, tech: "plts", name: "Sumba Tengah", mw: 120, lcoe: 64, grid: 3.8, lng: 119.65, lat: -9.62 },
    { id: 3, tech: "plts", name: "Flores Barat", mw: 70, lcoe: 68, grid: 4.2, lng: 120.48, lat: -8.65 },
    { id: 4, tech: "pltb", name: "Sumba Timur Ridge", mw: 90, lcoe: 76, grid: 5.0, lng: 120.30, lat: -9.85 },
    { id: 5, tech: "pltb", name: "Rote Highland", mw: 60, lcoe: 81, grid: 4.6, lng: 123.12, lat: -10.73 },
    { id: 6, tech: "plts", name: "Timor Tengah Utara", mw: 150, lcoe: 61, grid: 1.8, lng: 124.45, lat: -9.45 },
    { id: 7, tech: "pltb", name: "Alor Coastal", mw: 30, lcoe: 84, grid: 6.2, lng: 124.55, lat: -8.27 },
    { id: 8, tech: "geo", name: "Mataloko Geothermal", mw: 40, lcoe: 70, grid: 3.1, lng: 120.98, lat: -8.78 },
  ],
  sulsel: [
    { id: 1, tech: "plts", name: "Jeneponto Solar", mw: 100, lcoe: 66, grid: 2.4, lng: 119.73, lat: -5.63 },
    { id: 2, tech: "pltb", name: "Sidrap Wind", mw: 140, lcoe: 74, grid: 1.9, lng: 119.78, lat: -3.93 },
    { id: 3, tech: "pltm", name: "Bantaeng Hydro", mw: 25, lcoe: 56, grid: 3.0, lng: 119.98, lat: -5.48 },
    { id: 4, tech: "plts", name: "Bone Solar Farm", mw: 90, lcoe: 63, grid: 2.8, lng: 120.32, lat: -4.54 },
    { id: 5, tech: "geo", name: "Toraja Geothermal", mw: 35, lcoe: 72, grid: 4.5, lng: 119.85, lat: -3.08 },
  ],
  jabar: [
    { id: 1, tech: "plts", name: "Indramayu Solar", mw: 110, lcoe: 64, grid: 1.5, lng: 108.32, lat: -6.33 },
    { id: 2, tech: "pltm", name: "Cianjur Hydro", mw: 30, lcoe: 55, grid: 2.2, lng: 107.14, lat: -6.82 },
    { id: 3, tech: "geo", name: "Kamojang Geothermal", mw: 60, lcoe: 68, grid: 1.8, lng: 107.80, lat: -7.14 },
    { id: 4, tech: "plts", name: "Subang Solar", mw: 70, lcoe: 66, grid: 2.6, lng: 107.76, lat: -6.57 },
  ],
};

function RenewableEnergy({ setRoute, ctx, openAI }) {
  const [techs, setTechs] = React.useState({ plts: true, pltb: true, pltm: false, geo: false });
  const [regionId, setRegionId] = React.useState("ntt");
  const [budget, setBudget] = React.useState(15);
  const [running, setRunning] = React.useState(false);
  const [optimized, setOptimized] = React.useState(true);
  const [selected, setSelected] = React.useState(null);

  const region = RE_REGIONS.find(r => r.id === regionId);
  const activeTechs = Object.entries(techs).filter(([k, v]) => v).map(([k]) => k);
  const allSites = RE_SITES[regionId] || [];
  const sites = allSites.filter(s => activeTechs.includes(s.tech));

  React.useEffect(() => { setSelected(null); setOptimized(true); }, [regionId]);

  // MILP-ish: greedy by lcoe within budget
  const portfolio = React.useMemo(() => {
    const sorted = [...sites].sort((a, b) => a.lcoe - b.lcoe);
    const picked = []; let cost = 0;
    const capexPerMW = 0.02; // IDR T per MW (~20 B/MW)
    for (const s of sorted) {
      const c = s.mw * capexPerMW;
      if (cost + c <= budget) { picked.push(s); cost += c; }
    }
    const totalMW = picked.reduce((a, s) => a + s.mw, 0);
    const avgLcoe = picked.length ? Math.round(picked.reduce((a, s) => a + s.lcoe * s.mw, 0) / totalMW) : 0;
    const co2 = Math.round(totalMW * 800); // tCO2/yr per MW approx
    return { picked, totalMW, cost: +cost.toFixed(1), avgLcoe, co2 };
  }, [sites, budget]);

  const runOpt = () => { setRunning(true); setOptimized(false); setTimeout(() => { setRunning(false); setOptimized(true); }, 1500); };

  const byTech = {};
  portfolio.picked.forEach(s => { byTech[s.tech] = byTech[s.tech] || { count: 0, mw: 0 }; byTech[s.tech].count++; byTech[s.tech].mw += s.mw; });

  const sel = sites.find(s => s.id === selected);

  return (
    <div className="feat-page re-page" data-screen-label="Feature: Renewable Energy">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Renewable Energy Optimization</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sectoral"><Icon name="zap" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.6 · SECTORAL</div>
              <h1>Renewable Energy Deployment Optimization</h1>
              <div className="feat-sub">Optimasi lokasi PLTS/PLTB/PLTM/Geothermal · MILP portfolio · target bauran EBT 23% (2025) → 31% (2050)</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export ESDM</button>
          </div>
        </div>
      </div>

      <div className="re-body">
        {/* LEFT controls */}
        <aside className="re-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Teknologi</div>
            <div className="re-tech-list">
              {RE_TECHS.map(t => (
                <label key={t.id} className={`re-tech ${techs[t.id] ? "on" : ""}`}>
                  <input type="checkbox" checked={techs[t.id]} onChange={e => setTechs({ ...techs, [t.id]: e.target.checked })} />
                  <span className="re-tech-dot" style={{ background: t.color }} />
                  <span className="re-tech-label">{t.label}</span>
                  <span className="re-tech-lcoe">${t.lcoe}/MWh</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Parameter</div>
            <label className="fm-field">
              <span>Wilayah</span>
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {RE_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </label>
            <label className="fm-field" style={{ marginTop: 10 }}>
              <span>Budget: <strong>IDR {budget} T</strong></span>
              <input type="range" min="3" max="30" step="1" value={budget} onChange={e => setBudget(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--accent-sunset)" }} />
            </label>
            <div className="re-resource">
              <div><span className="muted">Solar GHI</span><strong>{region.solar} kWh/m²/d</strong></div>
              <div><span className="muted">Wind avg</span><strong>{region.wind} m/s</strong></div>
            </div>
            <button className="primary-btn rdtr-gen" onClick={runOpt} disabled={running} style={{ marginTop: 12 }}>
              {running ? <><span className="whatif-spinner" />Solving MILP…</> : <><Icon name="play" size={14} />Run Optimization</>}
            </button>
            <div className="fm-run-note"><Icon name="info" size={11} />OR-Tools MILP · maximize generation s.t. budget + land constraint</div>
          </div>
        </aside>

        {/* CENTER map */}
        <div className="re-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Ranked Optimal Locations · {region.name}</div>
              <div className="re-legend">
                {RE_TECHS.filter(t => techs[t.id]).map(t => (
                  <span key={t.id}><span className="dot" style={{ background: t.color }} />{t.label.split(" ")[0]}</span>
                ))}
              </div>
            </div>
            <div className="rdtr-map-stage">
              <REMap sites={sites} picked={portfolio.picked} selected={selected} onSelect={setSelected} running={running} region={region} />
            </div>
          </div>
        </div>

        {/* RIGHT portfolio */}
        <aside className="re-portfolio">
          <div className="re-result-card">
            <div className="re-result-head"><Icon name="zap" size={14} />Optimal Portfolio (MILP)</div>
            <div className="re-result-big">{portfolio.totalMW.toLocaleString("id-ID")} <span>MW</span></div>
            <div className="re-result-meta">{portfolio.picked.length} lokasi · IDR {portfolio.cost} T · LCOE rata {portfolio.avgLcoe}/MWh</div>
            <div className="re-result-co2"><Icon name="check-circle" size={13} />CO₂ avoided: <strong>{portfolio.co2.toLocaleString("id-ID")} tCO₂/yr</strong></div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Breakdown per teknologi</div>
            <div className="re-breakdown">
              {RE_TECHS.filter(t => byTech[t.id]).map(t => (
                <div key={t.id} className="re-bd-row">
                  <span className="re-tech-dot" style={{ background: t.color }} />
                  <span className="re-bd-label">{t.label.split(" ")[0]}</span>
                  <span className="re-bd-count">{byTech[t.id].count} lokasi</span>
                  <span className="re-bd-mw">{byTech[t.id].mw} MW</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Ranked sites ({sites.length})</div>
            <div className="re-sites">
              {[...sites].sort((a, b) => a.lcoe - b.lcoe).map((s, i) => {
                const picked = portfolio.picked.includes(s);
                const tech = RE_TECHS.find(t => t.id === s.tech);
                return (
                  <button key={s.id} className={`re-site ${selected === s.id ? "on" : ""} ${picked ? "picked" : "skipped"}`} onClick={() => setSelected(s.id)}>
                    <span className="re-site-rank">{picked ? <Icon name="check-circle" size={13} /> : i + 1}</span>
                    <span className="re-site-dot" style={{ background: tech.color }} />
                    <div className="re-site-body">
                      <div className="re-site-name">{s.name}</div>
                      <div className="re-site-meta">{s.mw} MW · ${s.lcoe}/MWh · grid {s.grid}km</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button className="fm-crosslink" onClick={() => setRoute("feature-mcda")}>
            <Icon name="bar-chart-3" size={14} /><span>Suitability MCDA detail</span><Icon name="chevron-right" size={12} />
          </button>
        </aside>
      </div>
    </div>
  );
}

function REMap({ sites, picked, selected, onSelect, running, region }) {
  const view = (region && region.center) ? region : { center: [120, -7], zoom: 6 };
  const pickedIds = new Set(picked.map(s => s.id));

  const markers = sites.map(s => {
    const tech = RE_TECHS.find(t => t.id === s.tech);
    const isPicked = pickedIds.has(s.id);
    const isSel = selected === s.id;
    const sz = isSel ? 20 : isPicked ? 16 : 12;
    const ring = isPicked ? `box-shadow:0 0 0 ${isSel ? 6 : 4}px ${tech.color}33;` : "";
    const glyph = s.tech === "pltb" && isPicked ? "≋" : "";
    const html =
      `<div style="position:relative;display:flex;align-items:center;justify-content:center;width:${sz}px;height:${sz}px;border-radius:50%;background:${isPicked ? tech.color : "#C7D0CB"};border:2px solid #fff;${ring}cursor:pointer;font-size:10px;color:#fff;font-weight:700;">${glyph}${isSel ? `<div style="position:absolute;bottom:${sz + 2}px;white-space:nowrap;background:rgba(15,31,26,.88);color:#fff;font-size:10px;font-weight:600;padding:2px 6px;border-radius:5px;">${s.name}</div>` : ""}</div>`;
    return {
      lng: s.lng, lat: s.lat, html,
      onClick: () => onSelect(s.id),
      popup: `<b>${s.name}</b><br>${tech.label}<br>${s.mw} MW · LCOE ${s.lcoe} · grid ${s.grid} km`,
    };
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap key={view.id || "re"} center={view.center} zoom={view.zoom} basemap="positron" markers={markers} controls={true} />
      {running && (
        <div style={{ position: "absolute", inset: 0, zIndex: 600, background: "rgba(15,31,26,0.45)", display: "grid", placeItems: "center", color: "#fff", fontSize: 13 }}>
          <span><span className="whatif-spinner" style={{ marginRight: 8 }} />Solving MILP (OR-Tools)…</span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { RenewableEnergy });
