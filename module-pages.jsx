// ============================================================
// Module Pages — §7 of spec
// Map Explorer, Module Landing pages (Vulnerability, etc.)
// ============================================================

// ---------------- Map Explorer (full-screen) ----------------
function MapExplorer({ ctx, setRoute, crisis }) {
  const [layers, setLayers] = React.useState({
    banjir: true, slr: false, karhutla: false,
    population: false, infrastructure: false, lulc: false,
  });
  const [year, setYear] = React.useState(2026);
  const [hover, setHover] = React.useState(null);
  const [activeLayer, setActiveLayer] = React.useState("hazard");
  const [drawerOpen, setDrawerOpen] = React.useState(true);

  const layerCatalog = {
    hazard: [
      { id: "banjir", name: "Risiko Banjir", source: "InaRISK BNPB · GeoVertix WMS", count: "24 kab" },
      { id: "slr", name: "Sea Level Rise 2050", source: "Platform native · SSP2-4.5", count: "12 kab pesisir" },
      { id: "karhutla", name: "Risiko Kebakaran Hutan", source: "ENSO-aware ML · KLHK feed", count: "Q2 2026" },
    ],
    exposure: [
      { id: "population", name: "Populasi Density", source: "BPS Sensus 2020 + estimasi 2026", count: "9.1jt jiwa" },
      { id: "infrastructure", name: "Infrastruktur Kritis", source: "PUPR · BNPB", count: "1,247 titik" },
    ],
    landuse: [
      { id: "lulc", name: "LULC 2024 (Sentinel-2)", source: "KLHK SIGN-SMART", count: "10m resolution" },
    ],
  };

  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];

  return (
    <div className="map-explorer" data-screen-label="Map Explorer">
      <div className="map-explorer-head">
        <div className="map-explorer-title">
          <button className="back-btn" onClick={() => setRoute("dashboard")}>
            <Icon name="chevron-left" size={16} />Beranda
          </button>
          <div className="breadcrumb-sep">/</div>
          <Icon name="map" size={16} />
          <h2>Map Explorer</h2>
          <span className="map-explorer-meta">{province.name} · {ctx.scenario.toUpperCase()} · {year}</span>
        </div>
        <div className="map-explorer-actions">
          <button className="ghost-btn"><Icon name="share" size={14} />Bagikan view</button>
          <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
          <button className="primary-btn"><Icon name="plus" size={14} />Skenario dari peta</button>
        </div>
      </div>

      <div className="map-explorer-body">
        {/* Left layer drawer */}
        <aside className={`map-drawer ${drawerOpen ? "" : "hidden"}`}>
          <div className="map-drawer-tabs">
            {["hazard","exposure","landuse"].map(t => (
              <button key={t} className={`map-drawer-tab ${activeLayer === t ? "active" : ""}`} onClick={() => setActiveLayer(t)}>
                {t === "hazard" ? "Hazard" : t === "exposure" ? "Exposure" : "Land Use"}
              </button>
            ))}
          </div>
          <div className="map-drawer-search">
            <Icon name="search" size={14} />
            <input placeholder="Cari layer…" />
          </div>
          <div className="map-drawer-list">
            {layerCatalog[activeLayer].map(l => (
              <div key={l.id} className={`map-layer-row ${layers[l.id] ? "on" : ""}`}>
                <label className="map-layer-check">
                  <input type="checkbox" checked={!!layers[l.id]} onChange={e => setLayers({ ...layers, [l.id]: e.target.checked })} />
                  <span className="checkmark" />
                </label>
                <div className="map-layer-body">
                  <div className="map-layer-name">{l.name}</div>
                  <div className="map-layer-source">{l.source} · {l.count}</div>
                </div>
                <button className="map-layer-info" title="Info layer"><Icon name="info" size={14} /></button>
              </div>
            ))}
          </div>
          <div className="map-drawer-section">
            <div className="map-drawer-section-label">Saved Locations</div>
            <button className="saved-loc"><Icon name="pin" size={12} />Makassar — Banjir 2024</button>
            <button className="saved-loc"><Icon name="pin" size={12} />Wajo — Multi-hazard</button>
            <button className="saved-loc"><Icon name="pin" size={12} />NTT — Drought 2050</button>
            <button className="saved-loc add"><Icon name="plus" size={12} />Pin lokasi saat ini</button>
          </div>
        </aside>

        {/* Map canvas */}
        <div className="map-canvas" onMouseLeave={() => setHover(null)}>
          <MapSurface layers={layers} crisis={crisis} onHover={setHover} />

          <button
            className="map-drawer-toggle"
            onClick={() => setDrawerOpen(!drawerOpen)}
            style={{ left: drawerOpen ? 312 : 12 }}
          >
            <Icon name={drawerOpen ? "chevron-left" : "chevron-right"} size={14} />
          </button>

          <div className="map-overlay-tr">
            <button className="map-ctrl"><Icon name="zoom-in" size={14} /></button>
            <button className="map-ctrl"><Icon name="zoom-out" size={14} /></button>
            <button className="map-ctrl"><Icon name="maximize" size={14} /></button>
            <div className="map-ctrl-sep" />
            <button className="map-ctrl" title="Drawing tools"><Icon name="edit" size={14} /></button>
            <button className="map-ctrl" title="Measure"><Icon name="git-branch" size={14} /></button>
          </div>

          {/* Time slider */}
          <div className="time-slider">
            <button className="time-play"><Icon name="play" size={14} /></button>
            <div className="time-track">
              <div className="time-track-fill" style={{ width: `${((year - 2025) / 25) * 100}%` }} />
              <input
                type="range" min={2025} max={2050} value={year}
                onChange={e => setYear(parseInt(e.target.value))}
                className="time-range"
              />
              <div className="time-ticks">
                {[2025, 2030, 2035, 2040, 2045, 2050].map(y => (
                  <div key={y} className="time-tick" style={{ left: `${((y - 2025) / 25) * 100}%` }}>
                    <div className="time-tick-mark" />
                    <div className="time-tick-label">{y}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="time-value">{year}</div>
            <button className="ghost-btn small">Multi-temporal</button>
          </div>

          <div className="map-overlay-bl legend wide">
            <div className="legend-title">Legend · {Object.entries(layers).filter(([k,v]) => v).map(([k]) => k).join(" + ") || "tidak ada layer"}</div>
            <div className="legend-rows">
              {[
                ["Sangat Rendah", "#0E5A78"],
                ["Rendah", "#2F7D5E"],
                ["Sedang", "#C18820"],
                ["Tinggi", "#C44E37"],
                ["Sangat Tinggi", "#8B1A1A"],
              ].map(([l, c]) => (
                <div className="legend-row" key={l}>
                  <span className="legend-swatch" style={{ background: c }} />
                  <span>{l}</span>
                </div>
              ))}
            </div>
            <div className="legend-meta">Sumber: model ensemble · uncertainty band ±0.4 · update 23m lalu</div>
          </div>

          <div className="map-overlay-tl">
            <div className="map-coord">
              <Icon name="map-pin" size={12} />
              <span>−5.1477°, 119.4327°</span>
              <span className="muted">EPSG:4326</span>
            </div>
          </div>

          {hover && (
            <div className="map-tooltip large" style={{ left: hover.x + 16, top: hover.y + 16 }}>
              <div className="map-tooltip-title">{hover.name}</div>
              <div className="map-tooltip-row"><span>Risk Score</span><strong>{hover.score}</strong></div>
              <div className="map-tooltip-row"><span>Populasi</span><strong>{hover.pop}</strong></div>
              <div className="map-tooltip-row"><span>Year</span><strong>{year}</strong></div>
              <div className="map-tooltip-hint">Klik untuk drill-down ke Vulnerability →</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------- Generic Module Landing ----------------
function ModuleLanding({ moduleId, setRoute, openAI, ctx, setLang }) {
  const mod = window.MODULES.find(m => m.id === moduleId);
  if (!mod) return null;

  // Specific module data
  const moduleData = {
    vulnerability: {
      desc: "Penilaian dan pemodelan tingkat kerentanan multi-kriteria untuk area, kelompok masyarakat, dan sistem terhadap risiko iklim.",
      features: [
        { id: "3.1", name: "Multi-Criteria Vulnerability Assessment", desc: "Weighted overlay 12+ indikator (hazard, exposure, sensitivity, adaptive capacity)", status: "ready", actions: ["Buka Analisis","Histori"], persona: ["P1","P2","P3","P4"], route: "feature-vuln" },
        { id: "3.2", name: "Dynamic Vulnerability System Modeling", desc: "Simulasi feedback loop antar-indikator dengan system dynamics", status: "ready", actions: ["Buka Simulator","Templat"], persona: ["P2","P3"], route: "feature-dynvuln" },
      ],
      relatedFeatures: [
        { mod: "modeling", name: "Flood & Drought Modeling", id: "2.6" },
        { mod: "sdss", name: "Impact Analysis Engine", id: "5.3" },
        { mod: "reports", name: "Executive Summary Auto-Gen", id: "8.3" },
      ],
      stats: [
        { label: "Indikator tersedia", value: "23" },
        { label: "Provinsi ter-cover", value: "38/38" },
        { label: "Update terakhir", value: "23m lalu" },
      ],
    },
    modeling: {
      desc: "Pemodelan iklim canggih: hindcasting, projection scenario, deteksi perubahan LULC, biodiversity, SLR, banjir, dan kekeringan.",
      features: [
        { id: "2.1", name: "Advanced Climate Modeling", desc: "Ensemble CMIP6 downscaling untuk skala kab/kota, multi-scenario", status: "ready", actions: ["Run Model","Recent"], persona: ["P2","P3"], route: "feature-acm" },
        { id: "2.2", name: "LULC Change Detection", desc: "Multi-temporal Sentinel-2 + ML classification — perubahan tutupan lahan", status: "ready", actions: ["Buka","Histori"], persona: ["P2","P3"], route: "feature-lulc" },
        { id: "2.3", name: "Net Carbon Footprint", desc: "Akunting karbon spasial: sumber, sink, neraca neto", status: "beta", actions: ["Buka","Methodology"], route: "feature-carbon" },
        { id: "2.4", name: "Biodiversity Mapping", desc: "Species richness, habitat connectivity, area kunci", status: "ready", actions: ["Buka"], route: "feature-bio" },
        { id: "2.5", name: "Sea Level Rise & Subsidence", desc: "Proyeksi SLR + subsidence pesisir terintegrasi", status: "ready", actions: ["Buka","Compare"], route: "feature-slr" },
        { id: "2.6", name: "Flood & Drought Modeling", desc: "Hydrological modeling: banjir + kekeringan", status: "ready", actions: ["Buka","Run","Compare"], route: "feature-flood" },
        { id: "11.1", name: "Hindcasting Tool", desc: "Validasi model vs. observed (researcher-focus)", status: "ready", actions: ["Buka"], persona: ["P3"], route: "feature-hindcast" },
        { id: "11.2", name: "Continuous Model Monitor", desc: "Realtime monitoring akurasi model in-production", status: "ready", actions: ["Dashboard"], route: "feature-modelmon" },
      ],
      relatedFeatures: [
        { mod: "data", name: "Data Catalog", id: "10.1" },
        { mod: "sdss", name: "Scenario Manager", id: "5.2" },
      ],
      stats: [
        { label: "Model aktif", value: "5" },
        { label: "Hindcast running", value: "2" },
        { label: "Dataset ter-update", value: "23" },
      ],
    },
  };

  // Merge with extra data from module-pages-2.jsx
  const extra = (window.MODULE_DATA_EXTRA || {})[moduleId];
  const data = moduleData[moduleId] || extra;

  // Custom rich views
  if (extra && extra._customView) {
    if (extra._customView === "sdss") return <window.SDSSModule setRoute={setRoute} openAI={openAI} />;
    if (extra._customView === "data") return <window.DataCatalogModule setRoute={setRoute} openAI={openAI} />;
    if (extra._customView === "reports") return <window.ReportsModule setRoute={setRoute} openAI={openAI} />;
    if (extra._customView === "collab") return <window.CollabModule setRoute={setRoute} openAI={openAI} />;
    if (extra._customView === "settings") return <window.SettingsModule setRoute={setRoute} openAI={openAI} ctx={ctx} setLang={setLang} />;
  }

  // Generic fallback for modules without dedicated landing yet
  if (!data) {
    return (
      <GenericModulePlaceholder mod={mod} setRoute={setRoute} />
    );
  }

  return (
    <div className="module-landing" data-screen-label={`Module: ${mod.name}`}>
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>{mod.name}</span>
        </div>
        <div className="module-hero">
          <div className={`module-hero-icon module-${mod.id}`}>
            <Icon name={mod.icon} size={32} />
          </div>
          <div className="module-hero-text">
            <h1>{mod.name}</h1>
            <div className="module-hero-desc">{data.desc}</div>
          </div>
          <div className="module-hero-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn"><Icon name="book-open" size={14} />Dokumentasi</button>
          </div>
        </div>

        <div className="module-stats">
          {data.stats.map((s, i) => (
            <div key={i} className="module-stat">
              <div className="module-stat-label">{s.label}</div>
              <div className="module-stat-value">{s.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="module-section">
        <div className="module-section-head">
          <h3>Fitur di modul ini</h3>
          <div className="filter-pills">
            <button className="filter-pill active">Semua ({data.features.length})</button>
            <button className="filter-pill">Ready</button>
            <button className="filter-pill">Beta</button>
            <button className="filter-pill">Recently used</button>
          </div>
        </div>
        <div className="feature-grid">
          {data.features.map(f => <FeatureCard key={f.id} f={f} setRoute={setRoute} />)}
        </div>
      </div>

      <div className="module-section">
        <h3>Sering digunakan bersama</h3>
        <div className="related-row">
          {data.relatedFeatures.map(r => (
            <button key={r.id} className="related-card" onClick={() => setRoute(r.mod)}>
              <Icon name="arrow-right" size={14} />
              <div>
                <div className="related-name">{r.name}</div>
                <div className="related-mod">FITUR {r.id}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ f, setRoute }) {
  return (
    <div className="feature-card">
      <div className="feature-card-head">
        <div className="feature-card-id">FITUR {f.id}</div>
        <span className={`feature-status status-${f.status}`}>{f.status === "beta" ? "BETA" : "READY"}</span>
      </div>
      <div className="feature-card-name">{f.name}</div>
      <div className="feature-card-desc">{f.desc}</div>
      <div className="feature-card-actions">
        {(f.actions || ["Buka"]).map((a, i) => (
          <button key={i} className={`feature-action ${i === 0 ? "primary" : ""}`}
            onClick={() => { if (i === 0 && f.route && setRoute) setRoute(f.route); }}
          >{a}</button>
        ))}
      </div>
    </div>
  );
}

function GenericModulePlaceholder({ mod, setRoute }) {
  return (
    <div className="module-landing" data-screen-label={`Module: ${mod.name}`}>
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>{mod.name}</span>
        </div>
        <div className="module-hero">
          <div className={`module-hero-icon module-${mod.id}`}>
            <Icon name={mod.icon} size={32} />
          </div>
          <div className="module-hero-text">
            <h1>{mod.name}</h1>
            <div className="module-hero-desc">{mod.tagline}</div>
          </div>
        </div>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon">
          <Icon name="layers" size={40} strokeWidth={1.2} />
        </div>
        <div className="placeholder-title">Modul detail siap di Sesi berikutnya</div>
        <div className="placeholder-desc">
          {mod.count > 0 ? `${mod.count} fitur ` : ""}
          akan dijabarkan dengan pola module landing yang sama: feature cards, stats, related modules,
          empty/loading/error states sesuai §10.
        </div>
        <div className="placeholder-features">
          <div className="placeholder-features-label">Yang akan dibangun:</div>
          <ul>
            <li>Feature cards untuk semua {mod.count} fitur dengan status & action</li>
            <li>Filter & search dalam modul</li>
            <li>Recently used + favorite features</li>
            <li>Related modules / cross-link</li>
            <li>Empty / loading / error states</li>
          </ul>
        </div>
        <button className="primary-btn" onClick={() => setRoute("vulnerability")}>
          Lihat contoh module landing (Vulnerability) <Icon name="arrow-right" size={14} />
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { MapExplorer, ModuleLanding, FeatureCard });
