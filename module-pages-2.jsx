// ============================================================
// Module Pages — Part 2: data expansion + custom rich views
// for SDSS, Data Catalog, Reports, Collab, Settings, AI
// ============================================================

// Import from window (separate babel scope)
const FeatureCard = window.FeatureCard;
const Icon = window.Icon;

// Extra feature/module data
window.MODULE_DATA_EXTRA = {
  sectoral: {
    desc: "Analisis sektoral khusus per-domain: tata ruang (RDTR), ketahanan pangan, pesisir, kehutanan, pariwisata, energi terbarukan, dan daya dukung lahan.",
    features: [
      { id: "4.1", name: "Spatial Planning Support Toolbox (RDTR)", desc: "Modul utama dukung RDTR/RTRW: zonasi, peruntukan, konflik kepentingan", status: "ready", actions: ["Buka Toolbox","Templat RDTR"], route: "feature-rdtr", persona: ["P2"] },
      { id: "4.2", name: "Food Security (Rice Field)", desc: "Vulnerability sawah terhadap iklim · prediksi produksi padi", status: "ready", actions: ["Buka","Histori"], route: "feature-foodsec" },
      { id: "4.3", name: "Coastal Vulnerability", desc: "Indeks rentanan pesisir (CVI) terhadap SLR + abrasi", status: "ready", actions: ["Buka","Compare"], route: "feature-coastal" },
      { id: "4.4", name: "Forest Fire Risk (ENSO-aware)", desc: "Risiko karhutla dengan ML + sinyal ENSO IOD", status: "ready", actions: ["Buka","Real-time"], route: "feature-fire" },
      { id: "4.5", name: "Tourism Sector Vulnerability", desc: "Kerentanan obyek wisata terhadap perubahan iklim", status: "beta", actions: ["Buka"], route: "feature-tourism" },
      { id: "4.6", name: "Renewable Energy Deployment Optimization", desc: "Pemilihan lokasi optimal: PLTS, PLTB, PLTM dengan constraint sosial-ekologis", status: "ready", actions: ["Buka","Recent"], route: "feature-renewable" },
      { id: "4.7", name: "Land Carrying Capacity", desc: "Daya dukung dan daya tampung lingkungan", status: "ready", actions: ["Buka","Methodology"], route: "feature-cc" },
    ],
    relatedFeatures: [
      { mod: "vulnerability", name: "Multi-Criteria Vulnerability", id: "3.1" },
      { mod: "sdss", name: "Scenario Manager", id: "5.2" },
      { mod: "data", name: "LULC Layers", id: "10.1" },
    ],
    stats: [
      { label: "Sektor ter-cover", value: "7" },
      { label: "Layer sektoral", value: "142" },
      { label: "Analisis aktif", value: "23" },
    ],
  },
  sdss: { _customView: "sdss" },
  ai: {
    desc: "Asisten AI yang terdiri dari 9 fitur: NLP query, pengenalan citra, deteksi anomali EWS, predictive modeling, dan explainable AI.",
    features: [
      { id: "6.5", name: "Natural Language Query", desc: "Tanya platform dengan bahasa Indonesia natural · always-on AI", status: "ready", actions: ["Buka","Riwayat"], route: "feature-nlp" },
      { id: "6.6", name: "RAG Pipeline & Knowledge Base", desc: "Retrieval-augmented generation dari dokumen K/L (background)", status: "ready", actions: ["Buka","Docs"], route: "feature-rag" },
      { id: "6.2", name: "Anomaly Detection & EWS", desc: "Deteksi anomali real-time dari stream data · trigger crisis mode", status: "ready", actions: ["Dashboard","Tune"], persona: ["P1","P2"], route: "feature-ews" },
      { id: "6.1", name: "Image & Pattern Recognition", desc: "Deteksi objek dari citra satelit: deforestasi, urban sprawl, kebakaran", status: "ready", actions: ["Run Detection","Models"], route: "feature-imgrec" },
      { id: "6.3", name: "Predictive Modeling Framework", desc: "Framework ML untuk prediksi: framework + ops · MLOps", status: "ready", actions: ["Manage Models"], route: "feature-predictive" },
      { id: "6.4", name: "Scenario-Based Analysis Engine", desc: "Backend untuk Scenario Builder (linked ke FITUR 5.2)", status: "ready", actions: ["Buka"], route: "feature-scenengine" },
      { id: "6.7", name: "MCP Server", desc: "Model Context Protocol server untuk integrasi tools (dev-only)", status: "beta", actions: ["Endpoint","Health"], route: "feature-mcp" },
      { id: "6.8", name: "Federated Learning", desc: "Train model lintas-organisasi tanpa berbagi data raw", status: "beta", actions: ["Cohorts","Logs"], persona: ["P3"], route: "feature-federated" },
      { id: "6.9", name: "Explainable AI (XAI)", desc: "Penjelasan feature importance + counterfactual untuk setiap output AI", status: "ready", actions: ["Try"], route: "feature-xai" },
    ],
    relatedFeatures: [
      { mod: "vulnerability", name: "MCDA Vulnerability", id: "3.1" },
      { mod: "modeling", name: "Climate Modeling", id: "2.1" },
      { mod: "data", name: "Knowledge Base", id: "10.1" },
    ],
    stats: [
      { label: "Query bulan ini", value: "1,247" },
      { label: "Alerts aktif (6.2)", value: "3" },
      { label: "Models terdeploy", value: "12" },
    ],
  },
  collab: { _customView: "collab" },
  reports: { _customView: "reports" },
  data: { _customView: "data" },
  settings: { _customView: "settings" },
};

// =================================================================
// Custom Module: Decision Support (SDSS Core) — §7.5
// =================================================================
function SDSSModule({ setRoute, openAI }) {
  const mod = window.MODULES.find(m => m.id === "sdss");
  const [tab, setTab] = React.useState("scenarios");

  const scenarios = [
    { id: "scn-2026-001", name: "Sulsel Flood Adaptation 2025-2050", status: "konsultasi", owner: "Budi P.", province: "Sulsel", scenario: "SSP2-4.5", updated: "2 jam lalu", mcda: 84, comments: 12 },
    { id: "scn-2026-002", name: "RDTR Makassar 2030", status: "draft", owner: "Citra D.", province: "Sulsel", scenario: "SSP2-4.5", updated: "1 hari lalu", mcda: null, comments: 3 },
    { id: "scn-2026-003", name: "NTT Drought Adaptation 2027-2032", status: "approved", owner: "Hadi R.", province: "NTT", scenario: "SSP3-7.0", updated: "3 hari lalu", mcda: 76, comments: 28 },
    { id: "scn-2026-004", name: "Karhutla Mitigation Kalbar 2026", status: "running", owner: "Ahmad K.", province: "Kalbar", scenario: "SSP5-8.5", updated: "5 jam lalu", mcda: null, comments: 0 },
    { id: "scn-2026-005", name: "Coastal Retreat Demak", status: "konsultasi", owner: "Sri W.", province: "Jateng", scenario: "SSP2-4.5", updated: "1 minggu lalu", mcda: 81, comments: 41 },
    { id: "scn-2025-098", name: "Jabar Food Security 2050", status: "approved", owner: "Tim Pangan", province: "Jabar", scenario: "SSP1-2.6", updated: "2 minggu lalu", mcda: 88, comments: 67 },
  ];

  const features = [
    { id: "5.1", name: "Multi-Level Decision Support", desc: "Entry-point per persona ke fitur SDSS lain", route: "feature-multilevel" },
    { id: "5.2", name: "Scenario Manager & Planning Builder", desc: "CRUD skenario + planning wizard 5 langkah", route: "flow-scenario" },
    { id: "5.3", name: "Impact Analysis Engine", desc: "Hitung dampak skenario ke sektor terkait", route: "feature-impact" },
    { id: "5.4", name: "Customizable Adaptation Recommendation", desc: "Rekomendasi aksi adaptasi + ranking", route: "feature-adaptation" },
    { id: "5.5", name: "MCDA Engine", desc: "Multi-criteria decision analysis · weighted overlay", route: "feature-mcda" },
    { id: "5.6", name: "Context-Aware Recommendation Engine", desc: "Rekomendasi mengikuti konteks aktif", route: "feature-contextaware" },
    { id: "5.7", name: "Group Decision-Making", desc: "Realtime collab session sign-off multi-stakeholder", route: "flow-group" },
    { id: "5.8", name: "Simulation & What-If Tool", desc: "Quick-sim interaktif: slider parameter → outcome real-time", route: "feature-whatif" },
    { id: "5.9", name: "Sensitivity & Uncertainty Analyzer", desc: "Analisis sensitivitas Monte Carlo · uncertainty band", route: "feature-sensitivity" },
    { id: "5.10", name: "Optimization Solver", desc: "Multi-objective optimization · NSGA-II", route: "feature-optsolver" },
  ];

  return (
    <div className="module-landing" data-screen-label="Module: SDSS Decision Support">
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>{mod.name}</span>
        </div>
        <div className="module-hero">
          <div className="module-hero-icon module-sdss">
            <Icon name="compass" size={32} />
          </div>
          <div className="module-hero-text">
            <h1>Decision Support (SDSS Core)</h1>
            <div className="module-hero-desc">Inti platform: scenario builder, MCDA, impact analysis, group decision, sensitivity & optimization untuk mendukung pengambilan keputusan adaptasi iklim.</div>
          </div>
          <div className="module-hero-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="primary-btn" onClick={() => setRoute("flow-scenario")}><Icon name="plus" size={14} />Skenario Baru</button>
          </div>
        </div>
        <div className="module-stats">
          <div className="module-stat"><div className="module-stat-label">Active Scenarios</div><div className="module-stat-value">12</div></div>
          <div className="module-stat"><div className="module-stat-label">Pending Sign-off</div><div className="module-stat-value">3</div></div>
          <div className="module-stat"><div className="module-stat-label">Approved Q2</div><div className="module-stat-value">8</div></div>
          <div className="module-stat"><div className="module-stat-label">Running Optimization</div><div className="module-stat-value">2</div></div>
        </div>
      </div>

      <div className="tabs">
        {[
          { id: "scenarios", label: "Scenario Pipeline", count: scenarios.length },
          { id: "features", label: "Fitur SDSS", count: features.length },
          { id: "templates", label: "Templates", count: 6 },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}<span className="tab-count">{t.count}</span>
          </button>
        ))}
      </div>

      {tab === "scenarios" && (
        <>
          <div className="pipeline-row">
            {["draft","konsultasi","running","approved"].map(st => {
              const c = scenarios.filter(s => s.status === st).length;
              return (
                <div key={st} className={`pipeline-stage stage-${st}`}>
                  <div className="pipeline-stage-label">{stageLabel(st)}</div>
                  <div className="pipeline-stage-count">{c}</div>
                  <div className="pipeline-stage-bar"><div style={{ width: `${(c/scenarios.length)*100}%` }} /></div>
                </div>
              );
            })}
          </div>

          <div className="table-card">
            <div className="table-head-row">
              <div className="table-search">
                <Icon name="search" size={14} />
                <input placeholder="Cari skenario..." />
              </div>
              <div className="table-actions">
                <button className="ghost-btn small"><Icon name="filter" size={12} />Filter</button>
                <button className="ghost-btn small"><Icon name="download" size={12} />Export CSV</button>
                <button className="primary-btn" onClick={() => setRoute("flow-scenario")}><Icon name="plus" size={14} />Skenario Baru</button>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Skenario</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Provinsi · Climate</th>
                  <th>MCDA Score</th>
                  <th>Komentar</th>
                  <th>Update</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map(s => (
                  <tr key={s.id}>
                    <td>
                      <div className="cell-strong">{s.name}</div>
                      <div className="cell-meta">{s.id}</div>
                    </td>
                    <td><span className={`status-pill status-${s.status}`}>{stageLabel(s.status)}</span></td>
                    <td>{s.owner}</td>
                    <td>
                      <div>{s.province}</div>
                      <div className="cell-meta">{s.scenario}</div>
                    </td>
                    <td>
                      {s.mcda !== null ? (
                        <div className="mcda-score">
                          <span className="mcda-num">{s.mcda}</span>
                          <div className="mcda-bar"><div style={{ width: `${s.mcda}%`, background: mcdaColor(s.mcda) }} /></div>
                        </div>
                      ) : <span className="muted">—</span>}
                    </td>
                    <td>
                      <span className="comment-cell"><Icon name="message-square" size={12} />{s.comments}</span>
                    </td>
                    <td><span className="muted">{s.updated}</span></td>
                    <td><button className="icon-btn small"><Icon name="more-horizontal" size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "features" && (
        <div className="feature-grid">
          {features.map(f => <FeatureCard key={f.id} f={{ ...f, status: "ready", actions: ["Buka","Docs"] }} setRoute={setRoute} />)}
        </div>
      )}

      {tab === "templates" && (
        <div className="template-grid">
          {[
            { name: "RDTR Update", desc: "Update rencana detail tata ruang dengan multi-criteria", icon: "map", uses: 142 },
            { name: "Climate Adaptation", desc: "Intervensi adaptasi terhadap perubahan iklim", icon: "shield", uses: 89 },
            { name: "Sectoral Investment", desc: "Alokasi investasi sektoral multi-tahun", icon: "factory", uses: 64 },
            { name: "Disaster Response", desc: "Protokol tanggap bencana & evakuasi", icon: "siren", uses: 51 },
            { name: "Land Use Change", desc: "Skenario perubahan tata guna lahan", icon: "layers", uses: 38 },
            { name: "Blank Scenario", desc: "Mulai dari nol — pilih indikator, kriteria, area", icon: "plus", uses: null },
          ].map(t => (
            <button key={t.name} className="template-card">
              <div className="template-icon"><Icon name={t.icon} size={24} /></div>
              <div className="template-name">{t.name}</div>
              <div className="template-desc">{t.desc}</div>
              {t.uses !== null && <div className="template-uses">{t.uses}× digunakan</div>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function stageLabel(s) {
  return { draft: "Draft", konsultasi: "Konsultasi", running: "Berjalan", approved: "Disetujui" }[s] || s;
}
function mcdaColor(v) {
  if (v >= 80) return "#2F7D5E";
  if (v >= 65) return "#C18820";
  if (v >= 50) return "#C44E37";
  return "#8B1A1A";
}

// =================================================================
// Custom Module: Data Catalog — §7.10
// =================================================================
function DataCatalogModule({ setRoute, openAI }) {
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const layers = [
    { name: "Banjir Wajo 2024 — InaRISK", type: "Vector", source: "BNPB", format: "WMS", crs: "EPSG:4326", updated: "2 hari lalu", size: "4.2 MB", access: "public", quality: 92 },
    { name: "Sentinel-2 Sulsel Mei 2026", type: "Raster", source: "Platform", format: "GeoTIFF", crs: "EPSG:3857", updated: "23 menit lalu", size: "847 MB", access: "internal", quality: 98 },
    { name: "SLR Projection SSP2-4.5 2050", type: "Raster", source: "Platform native", format: "NetCDF", crs: "EPSG:4326", updated: "1 minggu lalu", size: "234 MB", access: "internal", quality: 88 },
    { name: "BMKG Curah Hujan Harian", type: "Time-series", source: "BMKG (INT-03)", format: "API", crs: "—", updated: "5 menit lalu", size: "stream", access: "internal", quality: 95 },
    { name: "BPS Sensus 2020 — Kecamatan", type: "Vector", source: "BPS (INT-05)", format: "Shapefile", crs: "EPSG:4326", updated: "30 hari lalu", size: "12.4 MB", access: "public", quality: 99 },
    { name: "KLHK SIGN-SMART LULC 2024", type: "Vector", source: "KLHK (INT-04)", format: "GeoJSON", crs: "EPSG:4326", updated: "60 hari lalu", size: "98 MB", access: "public", quality: 90 },
    { name: "One Map BIG — Batas Administrasi", type: "Vector", source: "BIG (INT-01)", format: "WMS", crs: "EPSG:4326", updated: "15 hari lalu", size: "62 MB", access: "public", quality: 100 },
    { name: "Populasi Density 2026 (estimasi)", type: "Raster", source: "Platform · BPS-derived", format: "GeoTIFF", crs: "EPSG:3857", updated: "5 hari lalu", size: "182 MB", access: "internal", quality: 84 },
    { name: "Karhutla Risk Q2 2026 — ENSO-aware", type: "Raster", source: "Platform native", format: "GeoTIFF", crs: "EPSG:3857", updated: "1 hari lalu", size: "412 MB", access: "internal", quality: 86 },
    { name: "RTRW Sulsel 2024 — Geometri", type: "Vector", source: "Bappeda Sulsel", format: "Shapefile", crs: "EPSG:4326", updated: "120 hari lalu", size: "28 MB", access: "restricted", quality: 78 },
  ];

  const filtered = layers.filter(l => {
    if (filter !== "all" && l.access !== filter) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase()) && !l.source.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="module-landing" data-screen-label="Module: Data Catalog">
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>Data Catalog</span>
        </div>
        <div className="module-hero">
          <div className="module-hero-icon module-data">
            <Icon name="database" size={32} />
          </div>
          <div className="module-hero-text">
            <h1>Data Catalog</h1>
            <div className="module-hero-desc">Browse, search, dan kelola layer & dataset. Compliance ISO 19115 metadata. Termasuk integrasi K/L: BIG One Map, BNPB InaRISK, BMKG, KLHK SIGN-SMART, BPS.</div>
          </div>
          <div className="module-hero-actions">
            <button className="ghost-btn" onClick={() => setRoute("feature-datadetail")}><Icon name="git-branch" size={14} />Data Lineage</button>
            <button className="ghost-btn" onClick={() => setRoute("feature-datadetail")}><Icon name="check-circle" size={14} />Quality Dashboard</button>
            <button className="primary-btn"><Icon name="plus" size={14} />Upload Layer</button>
          </div>
        </div>
        <div className="module-stats">
          <div className="module-stat"><div className="module-stat-label">Layer total</div><div className="module-stat-value">1,247</div></div>
          <div className="module-stat"><div className="module-stat-label">Layer publik</div><div className="module-stat-value">412</div></div>
          <div className="module-stat"><div className="module-stat-label">Storage</div><div className="module-stat-value">8.4 TB</div></div>
          <div className="module-stat"><div className="module-stat-label">External feeds</div><div className="module-stat-value">5/5</div></div>
        </div>
      </div>

      {/* External integrations row */}
      <div className="ext-integrations">
        <div className="ext-row-label">Integrasi K/L (live feeds):</div>
        {[
          { name: "One Map BIG", id: "13.1", status: "ok", latency: "142ms" },
          { name: "InaRISK BNPB", id: "13.2", status: "ok", latency: "180ms" },
          { name: "BMKG Climate", id: "13.3", status: "ok", latency: "95ms" },
          { name: "KLHK SIGN-SMART", id: "13.4", status: "degraded", latency: "1.2s" },
          { name: "BPS Socio-Econ", id: "13.5", status: "ok", latency: "210ms" },
        ].map(i => (
          <button key={i.id} className={`ext-card status-${i.status}`} onClick={() => setRoute("feature-klint")} style={{ cursor: "pointer", textAlign: "left" }}>
            <div className="ext-status-dot" />
            <div>
              <div className="ext-name">{i.name}</div>
              <div className="ext-meta">FITUR {i.id} · {i.latency}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="table-card">
        <div className="table-head-row">
          <div className="table-search">
            <Icon name="search" size={14} />
            <input placeholder="Cari layer, dataset, sumber..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="table-actions">
            <div className="seg-control">
              {[["all","Semua"],["public","Publik"],["internal","Internal"],["restricted","Terbatas"]].map(([k, l]) => (
                <button key={k} className={`seg-btn ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>{l}</button>
              ))}
            </div>
            <button className="ghost-btn small"><Icon name="filter" size={12} />Lanjutan</button>
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Nama Layer</th>
              <th>Tipe</th>
              <th>Sumber</th>
              <th>Format · CRS</th>
              <th>Quality</th>
              <th>Akses</th>
              <th>Update</th>
              <th>Ukuran</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l, i) => (
              <tr key={i}>
                <td>
                  <div className="cell-strong">{l.name}</div>
                </td>
                <td><span className="badge-mono">{l.type}</span></td>
                <td>{l.source}</td>
                <td>
                  <div className="badge-mono">{l.format}</div>
                  <div className="cell-meta">{l.crs}</div>
                </td>
                <td>
                  <div className="mcda-score">
                    <span className="mcda-num">{l.quality}</span>
                    <div className="mcda-bar"><div style={{ width: `${l.quality}%`, background: mcdaColor(l.quality) }} /></div>
                  </div>
                </td>
                <td><span className={`access-pill access-${l.access}`}>{l.access}</span></td>
                <td><span className="muted">{l.updated}</span></td>
                <td><span className="muted">{l.size}</span></td>
                <td>
                  <div className="cell-actions">
                    <button className="icon-btn small" title="Preview"><Icon name="eye" size={14} /></button>
                    <button className="icon-btn small" title="Buka di Map"><Icon name="map" size={14} /></button>
                    <button className="icon-btn small" title="Download"><Icon name="download" size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-foot">
          Menampilkan {filtered.length} dari {layers.length} hasil · Halaman 1 dari 125
        </div>
      </div>
    </div>
  );
}

// =================================================================
// Custom Module: Reports & Outputs — §7.8
// =================================================================
function ReportsModule({ setRoute, openAI }) {
  const reports = [
    { title: "Q1 2026 Climate Risk Sulsel", type: "Executive Summary", pages: 14, date: "23 Mei 2026", author: "Ahmad K.", thumb: "exec", tags: ["Sulsel","SSP2-4.5","Q1"] },
    { title: "Briefing Banjir Wajo Mei 2026", type: "Crisis Brief", pages: 4, date: "26 Mei 2026", author: "Auto-gen", thumb: "crisis", tags: ["Krisis","Wajo","Banjir"] },
    { title: "Vulnerability Map NTT 2025-2050", type: "Custom Report", pages: 28, date: "20 Mei 2026", author: "Rina S.", thumb: "vuln", tags: ["NTT","Drought","MCDA"] },
    { title: "Annual Climate Action Report 2025", type: "Annual Report", pages: 96, date: "1 Mei 2026", author: "Tim Bappenas", thumb: "annual", tags: ["Nasional","2025"] },
    { title: "RDTR Makassar 2030 — Concept Paper", type: "Planning Doc", pages: 42, date: "18 Mei 2026", author: "Citra D.", thumb: "rdtr", tags: ["Makassar","RDTR","2030"] },
    { title: "Karhutla Q2 2026 Forecast Kalbar", type: "Forecast", pages: 8, date: "15 Mei 2026", author: "Auto-gen", thumb: "fire", tags: ["Kalbar","Karhutla","ENSO"] },
  ];

  const features = [
    { id: "8.1", name: "Interactive Map (Advanced)", desc: "Lihat di Map Explorer", actions: ["Buka Map"], route: "map" },
    { id: "8.2", name: "Dynamic Dashboards", desc: "Dashboard kustom: drag-drop widget, embed map/chart/text", actions: ["Buka","Gallery"], route: "feature-dashboards" },
    { id: "8.3", name: "Executive Summary Auto-Generation", desc: "Otomatis dari konteks aktif · ringkasan 1-4 halaman", actions: ["Generate","Templat"], route: "flow-report" },
    { id: "8.4", name: "Custom Report Builder", desc: "Builder drag-drop untuk laporan multi-section", actions: ["Buka Builder"], route: "flow-report" },
  ];

  return (
    <div className="module-landing" data-screen-label="Module: Reports & Outputs">
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>Reports & Outputs</span>
        </div>
        <div className="module-hero">
          <div className="module-hero-icon module-reports">
            <Icon name="bar-chart-3" size={32} />
          </div>
          <div className="module-hero-text">
            <h1>Reports & Outputs</h1>
            <div className="module-hero-desc">Generate laporan eksekutif otomatis, bangun dashboard kustom, dan export ke PDF/PPT. 4 fitur: Map Advanced, Dashboards, Auto-Summary, Report Builder.</div>
          </div>
          <div className="module-hero-actions">
            <button className="ghost-btn" onClick={() => setRoute("flow-report")}><Icon name="bar-chart-3" size={14} />Custom Builder</button>
            <button className="primary-btn" onClick={() => setRoute("flow-report")}><Icon name="sparkles" size={14} />Generate Auto-Summary</button>
          </div>
        </div>
        <div className="module-stats">
          <div className="module-stat"><div className="module-stat-label">Laporan bulan ini</div><div className="module-stat-value">8</div></div>
          <div className="module-stat"><div className="module-stat-label">Dashboard kustom</div><div className="module-stat-value">23</div></div>
          <div className="module-stat"><div className="module-stat-label">Auto-gen Q2 YTD</div><div className="module-stat-value">142</div></div>
        </div>
      </div>

      <div className="section-head">
        <h3>Laporan terbaru</h3>
        <div className="filter-pills">
          <button className="filter-pill active">Semua</button>
          <button className="filter-pill">Exec Summary</button>
          <button className="filter-pill">Crisis Brief</button>
          <button className="filter-pill">Custom</button>
          <button className="filter-pill">Auto-gen</button>
        </div>
      </div>

      <div className="reports-grid">
        {reports.map((r, i) => (
          <div key={i} className="report-card">
            <div className={`report-thumb thumb-${r.thumb}`}>
              <ReportThumb type={r.thumb} />
              <div className="report-pages">{r.pages} hal</div>
            </div>
            <div className="report-body">
              <div className="report-type">{r.type}</div>
              <div className="report-title">{r.title}</div>
              <div className="report-meta">{r.author} · {r.date}</div>
              <div className="report-tags">
                {r.tags.map(t => <span key={t} className="report-tag">{t}</span>)}
              </div>
              <div className="report-actions">
                <button className="feature-action primary">Buka</button>
                <button className="feature-action"><Icon name="download" size={12} />PDF</button>
                <button className="feature-action"><Icon name="share" size={12} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="module-section">
        <h3>Fitur di modul ini</h3>
        <div className="feature-grid">
          {features.map(f => <FeatureCard key={f.id} f={{ ...f, status: "ready" }} setRoute={setRoute} />)}
        </div>
      </div>
    </div>
  );
}

function ReportThumb({ type }) {
  if (type === "exec") return (
    <svg viewBox="0 0 120 80" className="thumb-svg">
      <rect width="120" height="80" fill="#074866" />
      <rect x="10" y="14" width="60" height="3" fill="white" />
      <rect x="10" y="22" width="40" height="2" fill="white" opacity="0.7" />
      <circle cx="92" cy="22" r="14" fill="none" stroke="white" strokeWidth="1" opacity="0.5" />
      <rect x="10" y="40" width="100" height="28" fill="white" opacity="0.1" />
      <polyline points="14,62 26,52 38,55 50,46 62,48 74,42 86,38 98,44 106,40" fill="none" stroke="#3784A2" strokeWidth="1.5" />
    </svg>
  );
  if (type === "crisis") return (
    <svg viewBox="0 0 120 80" className="thumb-svg">
      <rect width="120" height="80" fill="#8B1A1A" />
      <path d="M52 20 L 68 20 L 76 36 L 60 56 L 44 36 Z" fill="none" stroke="white" strokeWidth="1.5" />
      <text x="60" y="42" fontSize="10" fill="white" textAnchor="middle" fontWeight="700">SIAGA 2</text>
      <rect x="10" y="64" width="100" height="2" fill="white" opacity="0.5" />
    </svg>
  );
  if (type === "vuln") return (
    <svg viewBox="0 0 120 80" className="thumb-svg">
      <rect width="120" height="80" fill="#6B4309" />
      <g opacity="0.9">
        {[0,1,2,3,4].map(i => <rect key={i} x={20 + i*16} y={20 + (i%2)*8} width="14" height={40 - i*4} fill={["#E1ECF1","#C18820","#C44E37","#8B1A1A","#5A1212"][i]} />)}
      </g>
    </svg>
  );
  if (type === "annual") return (
    <svg viewBox="0 0 120 80" className="thumb-svg">
      <rect width="120" height="80" fill="#0B1220" />
      <text x="60" y="32" fontSize="14" fill="white" textAnchor="middle" fontWeight="700">2025</text>
      <text x="60" y="48" fontSize="8" fill="#3784A2" textAnchor="middle">ANNUAL REPORT</text>
      <line x1="20" y1="58" x2="100" y2="58" stroke="#3784A2" strokeWidth="0.5" />
    </svg>
  );
  if (type === "rdtr") return (
    <svg viewBox="0 0 120 80" className="thumb-svg">
      <rect width="120" height="80" fill="#F4F7F5" />
      {Array.from({ length: 24 }).map((_, i) => (
        <rect key={i} x={(i%6)*20} y={Math.floor(i/6)*20} width="19" height="19"
          fill={["#FDF3DC","#C5DCE5","#DCE9DC","#F7E6E3"][(i*3)%4]} stroke="white" strokeWidth="0.5" />
      ))}
    </svg>
  );
  if (type === "fire") return (
    <svg viewBox="0 0 120 80" className="thumb-svg">
      <rect width="120" height="80" fill="#C44E37" />
      <g opacity="0.7">
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={10 + (i%6)*20} cy={20 + Math.floor(i/6)*30} r={4 + (i%3)*2} fill={["#F7E6E3","#F3D4CD","#FCA5A5"][i%3]} />
        ))}
      </g>
    </svg>
  );
  return null;
}

// =================================================================
// Custom Module: Collaboration — §7.7
// =================================================================
function CollabModule({ setRoute, openAI }) {
  const sessions = [
    { id: "cons-042", title: "RDTR Pinrang Sign-off", status: "scheduled", date: "28 Mei · 14:00 WITA", participants: ["AK","BP","CD","HR","+4"], pendingFrom: 4, mode: "synchronous" },
    { id: "cons-041", title: "NTT Drought Adaptation Final Review", status: "live", date: "Sekarang · 13:00 WITA", participants: ["HR","RW","SD","+11"], pendingFrom: 0, mode: "synchronous", liveCount: 14 },
    { id: "cons-040", title: "Sulsel Flood 2050 — Multi-stakeholder", status: "comments", date: "Aktif sampai 30 Mei", participants: ["AK","BP","CD","RS","+9"], pendingFrom: 7, mode: "asynchronous" },
    { id: "cons-039", title: "RDTR Makassar 2030 — Public Consultation", status: "approved", date: "Selesai 22 Mei", participants: ["+24"], pendingFrom: 0, mode: "asynchronous" },
  ];

  const features = [
    { id: "7.1", name: "Multi-Stakeholder Consultation Workflow", desc: "Workflow konsultasi multi-pihak dengan sign-off, voting, rekap", actions: ["Buka Workflow","Templat"] },
    { id: "7.2", name: "Annotation & Comment System", desc: "Komentar inline di peta, scenario, report — lintas-fitur", actions: ["Lihat Aktivitas"] },
    { id: "7.3", name: "Scenario Comparison Tool", desc: "Side-by-side diff 2-4 skenario · highlight perbedaan", actions: ["Buka Comparator"], route: "feature-scompare" },
  ];

  return (
    <div className="module-landing" data-screen-label="Module: Collaboration">
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>Collaboration</span>
        </div>
        <div className="module-hero">
          <div className="module-hero-icon module-collab">
            <Icon name="users" size={32} />
          </div>
          <div className="module-hero-text">
            <h1>Collaboration & Workflow</h1>
            <div className="module-hero-desc">Konsultasi multi-stakeholder, komentar lintas-fitur, dan komparator skenario untuk pengambilan keputusan kolaboratif lintas K/L dan Pemda.</div>
          </div>
          <div className="module-hero-actions">
            <button className="ghost-btn"><Icon name="git-pull-request" size={14} />Compare Skenario</button>
            <button className="primary-btn"><Icon name="plus" size={14} />Sesi Konsultasi Baru</button>
          </div>
        </div>
        <div className="module-stats">
          <div className="module-stat"><div className="module-stat-label">Sesi aktif</div><div className="module-stat-value">3</div></div>
          <div className="module-stat"><div className="module-stat-label">Sign-off pending</div><div className="module-stat-value">11</div></div>
          <div className="module-stat"><div className="module-stat-label">Komentar 30 hari</div><div className="module-stat-value">847</div></div>
        </div>
      </div>

      <div className="module-section">
        <h3>Sesi Konsultasi</h3>
        <div className="sessions-list">
          {sessions.map(s => (
            <div key={s.id} className={`session-card status-${s.status}`}>
              <div className="session-status-stripe" />
              <div className="session-main">
                <div className="session-head">
                  <span className={`session-pill status-${s.status}`}>
                    {s.status === "live" && <span className="live-dot" />}
                    {sessionStatusLabel(s.status)}
                  </span>
                  <span className="session-id">{s.id}</span>
                  <span className="session-mode">{s.mode === "synchronous" ? "Sinkron" : "Asinkron"}</span>
                </div>
                <div className="session-title">{s.title}</div>
                <div className="session-meta">
                  <span><Icon name="clock" size={12} />{s.date}</span>
                  {s.pendingFrom > 0 && <span className="pending"><Icon name="alert-triangle" size={12} />Menunggu sign-off dari {s.pendingFrom} pihak</span>}
                  {s.liveCount && <span className="live-count"><Icon name="circle-dot" size={12} />{s.liveCount} peserta online</span>}
                </div>
              </div>
              <div className="session-participants">
                {s.participants.map((p, i) => (
                  <div key={i} className="session-avatar" style={{ background: ["#0E5A78","#6A4C93","#2A9D8F","#2F7D5E","#8B5F0E"][i%5] }}>{p}</div>
                ))}
              </div>
              <div className="session-actions">
                <button className="primary-btn" onClick={() => setRoute("flow-group")}>{s.status === "live" ? "Gabung Sesi" : s.status === "scheduled" ? "Detail" : s.status === "approved" ? "Lihat Hasil" : "Buka"}</button>
                <button className="icon-btn small"><Icon name="more-vertical" size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="module-section">
        <h3>Fitur di modul ini</h3>
        <div className="feature-grid">
          {features.map(f => <FeatureCard key={f.id} f={{ ...f, status: "ready" }} setRoute={setRoute} />)}
        </div>
      </div>
    </div>
  );
}

function sessionStatusLabel(s) {
  return { live: "LIVE", scheduled: "Terjadwal", comments: "Komentar Aktif", approved: "Disetujui" }[s] || s;
}

// =================================================================
// Custom Module: Settings & Admin — §7.9
// =================================================================
function SettingsModule({ setRoute, openAI, ctx, setLang }) {
  const [tab, setTab] = React.useState("profile");

  const tabs = [
    { id: "profile", icon: "user", label: "Profil" },
    { id: "notifications", icon: "bell", label: "Notifikasi (9.2)" },
    { id: "auth", icon: "shield", label: "Auth & Akses (9.1)" },
    { id: "audit", icon: "activity", label: "Audit Log (9.3)" },
    { id: "i18n", icon: "globe", label: "Bahasa (9.4)" },
    { id: "onboarding", icon: "book-open", label: "Onboarding (9.5)" },
    { id: "api", icon: "external-link", label: "API & Developer (9.6)" },
    { id: "integrations", icon: "git-branch", label: "Integrasi K/L (13.x)" },
    { id: "about", icon: "info", label: "Tentang & Bantuan" },
  ];

  return (
    <div className="module-landing" data-screen-label="Module: Settings & Admin">
      <div className="module-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>Settings & Admin</span>
        </div>
        <div className="module-hero">
          <div className="module-hero-icon module-settings">
            <Icon name="settings" size={32} />
          </div>
          <div className="module-hero-text">
            <h1>Settings & Admin</h1>
            <div className="module-hero-desc">Profile, autentikasi, notifikasi, audit logger, bahasa, onboarding, API developer, dan status integrasi eksternal.</div>
          </div>
        </div>
      </div>

      <div className="settings-layout">
        <nav className="settings-nav">
          {tabs.map(t => (
            <button key={t.id} className={`settings-nav-item ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} size={16} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
        <div className="settings-content">
          {tab === "profile" && <SettingsProfile />}
          {tab === "notifications" && <SettingsNotif />}
          {tab === "auth" && <SettingsAuth />}
          {tab === "audit" && <SettingsAudit />}
          {tab === "i18n" && <SettingsI18n ctx={ctx} setLang={setLang} />}
          {tab === "onboarding" && <SettingsOnboarding />}
          {tab === "api" && <SettingsAPI />}
          {tab === "integrations" && <SettingsIntegrations setRoute={setRoute} />}
          {tab === "about" && <SettingsAbout setRoute={setRoute} goTab={setTab} />}
        </div>
      </div>
    </div>
  );
}

function FormRow({ label, hint, children }) {
  return (
    <div className="form-row">
      <div className="form-label">
        <div className="form-label-main">{label}</div>
        {hint && <div className="form-hint">{hint}</div>}
      </div>
      <div className="form-control">{children}</div>
    </div>
  );
}

function SettingsProfile() {
  return (
    <div className="settings-pane">
      <div className="settings-pane-head">
        <h2>Profil Pengguna</h2>
        <button className="primary-btn">Simpan perubahan</button>
      </div>
      <div className="form-card">
        <FormRow label="Foto profil">
          <div className="profile-avatar-row">
            <div className="avatar lg" style={{ background: "#0E5A78" }}>BP</div>
            <button className="ghost-btn">Unggah foto</button>
            <button className="ghost-btn">Hapus</button>
          </div>
        </FormRow>
        <FormRow label="Nama Lengkap"><input type="text" defaultValue="Budi Pratama" className="text-input" /></FormRow>
        <FormRow label="Jabatan"><input type="text" defaultValue="Perencana Madya" className="text-input" /></FormRow>
        <FormRow label="Instansi"><input type="text" defaultValue="Bappeda Sulawesi Selatan" className="text-input" /></FormRow>
        <FormRow label="Email" hint="Email instansi dianjurkan"><input type="email" defaultValue="b.pratama@sulselprov.go.id" className="text-input" /></FormRow>
        <FormRow label="No HP" hint="Untuk SMS alert krisis"><input type="tel" defaultValue="+62 812-3456-7890" className="text-input" /></FormRow>
        <FormRow label="Zona Waktu">
          <select className="text-input">
            <option>WITA (UTC+8) — Makassar</option>
            <option>WIB (UTC+7) — Jakarta</option>
            <option>WIT (UTC+9) — Jayapura</option>
          </select>
        </FormRow>
      </div>
    </div>
  );
}

function SettingsNotif() {
  const items = [
    { id: "risk", label: "Risk Alerts (EWS)", desc: "Anomali, krisis, peringatan dini", channels: { in: true, email: true, sms: true, push: true } },
    { id: "scenario", label: "Skenario & Konsultasi", desc: "Mention, comment, sign-off request", channels: { in: true, email: true, sms: false, push: true } },
    { id: "reports", label: "Laporan & Publikasi", desc: "Laporan baru, export selesai", channels: { in: true, email: false, sms: false, push: false } },
    { id: "system", label: "Sistem & Maintenance", desc: "Update, downtime, perubahan API", channels: { in: true, email: true, sms: false, push: false } },
    { id: "data", label: "Update Data", desc: "Layer baru, dataset ter-update", channels: { in: true, email: false, sms: false, push: false } },
  ];

  return (
    <div className="settings-pane">
      <div className="settings-pane-head">
        <h2>Pengaturan Notifikasi</h2>
        <button className="primary-btn">Simpan</button>
      </div>
      <table className="notif-prefs-table">
        <thead>
          <tr><th>Kategori</th><th>In-app</th><th>Email</th><th>SMS</th><th>Push</th></tr>
        </thead>
        <tbody>
          {items.map(it => (
            <tr key={it.id}>
              <td>
                <div className="cell-strong">{it.label}</div>
                <div className="cell-meta">{it.desc}</div>
              </td>
              {["in","email","sms","push"].map(ch => (
                <td key={ch}><Toggle defaultOn={it.channels[ch]} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="settings-note">
        <Icon name="info" size={14} />
        <span>Crisis Mode <strong>tidak menghormati</strong> pengaturan ini — alert selalu tampil di semua channel saat krisis aktif.</span>
      </div>
    </div>
  );
}

function Toggle({ defaultOn }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)}>
      <span className="toggle-knob" />
    </button>
  );
}

function SettingsAuth() {
  return (
    <div className="settings-pane">
      <div className="settings-pane-head">
        <h2>Autentikasi & Akses</h2>
      </div>
      <div className="form-card">
        <FormRow label="Persona" hint="Otomatis dari JWT — kontak admin untuk perubahan">
          <span className="badge-info">P2 · Government Planner</span>
        </FormRow>
        <FormRow label="Metode login" hint="SSO via Sistem Pemerintahan Berbasis Elektronik (SPBE)">
          <div className="auth-method">
            <Icon name="shield" size={16} />
            <span><strong>SSO Pemerintah</strong> · email@instansi.go.id</span>
            <span className="badge-success">Aktif</span>
          </div>
        </FormRow>
        <FormRow label="MFA (2FA)" hint="Wajib untuk persona P1/P2 sesuai PRD §16.3">
          <div className="auth-method">
            <Icon name="check-circle" size={16} />
            <span><strong>TOTP</strong> · Google Authenticator</span>
            <button className="link-btn">Re-setup</button>
          </div>
        </FormRow>
        <FormRow label="API tokens" hint="Personal access token untuk akses programmatic">
          <button className="ghost-btn"><Icon name="plus" size={14} />Buat token baru</button>
        </FormRow>
        <FormRow label="Session aktif">
          <div className="sessions-active">
            <div className="active-session">
              <Icon name="globe" size={14} />
              <span><strong>Chrome / macOS</strong> · Makassar · current</span>
              <span className="badge-success">Ini</span>
            </div>
            <div className="active-session">
              <Icon name="globe" size={14} />
              <span>Safari / iPhone · 2 jam lalu</span>
              <button className="link-btn">Sign out</button>
            </div>
          </div>
        </FormRow>
      </div>
    </div>
  );
}

function SettingsAudit() {
  const logs = [
    { time: "23/05/2026 14:32:11", user: "Budi P.", action: "scenario.update", target: "scn-2026-001", ip: "10.42.18.5" },
    { time: "23/05/2026 14:28:03", user: "Citra D.", action: "comment.create", target: "scn-2026-002", ip: "203.142.18.5" },
    { time: "23/05/2026 14:15:48", user: "system", action: "report.auto-gen", target: "rpt-2026-q1-sulsel", ip: "internal" },
    { time: "23/05/2026 13:58:22", user: "Rina S.", action: "data.download", target: "sentinel-sulsel-2026-05", ip: "180.244.18.15" },
    { time: "23/05/2026 13:42:00", user: "system", action: "ews.alert-trigger", target: "wajo-flood-2026", ip: "internal" },
    { time: "23/05/2026 13:21:15", user: "Ahmad K.", action: "scenario.sign-off", target: "scn-2026-003", ip: "10.42.18.7" },
    { time: "23/05/2026 12:45:32", user: "Hadi R.", action: "consultation.create", target: "cons-042", ip: "10.55.7.18" },
  ];
  return (
    <div className="settings-pane">
      <div className="settings-pane-head">
        <h2>Audit Log</h2>
        <div className="audit-filters">
          <input type="text" placeholder="Filter user / action / target..." className="text-input small" />
          <button className="ghost-btn"><Icon name="download" size={14} />Export CSV</button>
        </div>
      </div>
      <table className="audit-table">
        <thead>
          <tr><th>Waktu</th><th>User</th><th>Action</th><th>Target</th><th>IP</th></tr>
        </thead>
        <tbody>
          {logs.map((l, i) => (
            <tr key={i}>
              <td className="mono">{l.time}</td>
              <td>{l.user}</td>
              <td><span className="audit-action">{l.action}</span></td>
              <td className="mono muted">{l.target}</td>
              <td className="mono muted">{l.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="settings-note">
        <Icon name="info" size={14} />
        <span>Audit log immutable, retensi 7 tahun · compliance PDP Law & SPBE.</span>
      </div>
    </div>
  );
}

function SettingsI18n({ ctx, setLang }) {
  const lang = ctx?.lang || "id";
  return (
    <div className="settings-pane">
      <div className="settings-pane-head"><h2>Bahasa & Lokal</h2></div>
      <div className="form-card">
        <FormRow label="Bahasa UI" hint="Berubah seketika tanpa reload">
          <div className="lang-options">
            <label className={`lang-radio ${lang === "id" ? "active" : ""}`} onClick={() => setLang && setLang("id")}><input type="radio" name="ui-lang" checked={lang === "id"} readOnly /><div><div className="lang-name">Bahasa Indonesia</div><div className="lang-meta">Default per PRD FR-UI-04</div></div></label>
            <label className={`lang-radio ${lang === "en" ? "active" : ""}`} onClick={() => setLang && setLang("en")}><input type="radio" name="ui-lang" checked={lang === "en"} readOnly /><div><div className="lang-name">English</div><div className="lang-meta">Untuk kolaborasi internasional</div></div></label>
          </div>
        </FormRow>
        <FormRow label="Format tanggal">
          <select className="text-input">
            <option>DD/MM/YYYY (Indonesia)</option>
            <option>YYYY-MM-DD (ISO 8601)</option>
            <option>MM/DD/YYYY (US)</option>
          </select>
        </FormRow>
        <FormRow label="Format angka">
          <select className="text-input">
            <option>1.234,56 (Indonesia)</option>
            <option>1,234.56 (US/UK)</option>
          </select>
        </FormRow>
        <FormRow label="Unit pengukuran">
          <select className="text-input">
            <option>Metrik (m, km, °C)</option>
            <option>Imperial (ft, mi, °F)</option>
          </select>
        </FormRow>
      </div>
    </div>
  );
}

function SettingsOnboarding() {
  return (
    <div className="settings-pane">
      <div className="settings-pane-head"><h2>Onboarding & Tutorial</h2></div>
      <div className="onboarding-grid">
        {[
          { name: "Tour Halaman Utama", desc: "Pengenalan 8 zona dashboard · 3 menit", done: true },
          { name: "Membuat Skenario Pertama", desc: "Tutorial 5-langkah · 8 menit", done: true },
          { name: "Menggunakan AI Assistant", desc: "Best practice prompt + context · 4 menit", done: false },
          { name: "Map Explorer Advanced", desc: "Layer, time slider, drawing tools · 6 menit", done: false },
          { name: "Group Decision-Making", desc: "Sign-off workflow lintas-instansi · 7 menit", done: false },
          { name: "Crisis Mode Drill", desc: "Simulasi tanggap bencana · 5 menit", done: false },
        ].map(o => (
          <div key={o.name} className={`onboard-card ${o.done ? "done" : ""}`}>
            <div className="onboard-icon"><Icon name={o.done ? "check-circle" : "play"} size={20} /></div>
            <div className="onboard-body">
              <div className="onboard-name">{o.name}</div>
              <div className="onboard-desc">{o.desc}</div>
            </div>
            <button className={o.done ? "ghost-btn small" : "primary-btn"}>{o.done ? "Ulang" : "Mulai"}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsAPI() {
  return (
    <div className="settings-pane">
      <div className="settings-pane-head">
        <h2>API & Developer</h2>
        <button className="primary-btn"><Icon name="external-link" size={14} />Buka API Docs</button>
      </div>
      <div className="api-grid">
        <div className="api-card">
          <div className="api-card-label">Base URL</div>
          <code className="api-code">https://api.climate.big.go.id/v1</code>
          <button className="ghost-btn small">Copy</button>
        </div>
        <div className="api-card">
          <div className="api-card-label">Personal Access Token</div>
          <code className="api-code mono">cap_••••••••••••3f72a8</code>
          <button className="ghost-btn small">Show</button>
        </div>
        <div className="api-card">
          <div className="api-card-label">Rate limit</div>
          <code className="api-code">1000 req / hour</code>
          <div className="api-meta">Premium: 10,000/h</div>
        </div>
        <div className="api-card">
          <div className="api-card-label">OGC services</div>
          <code className="api-code">WMS · WFS · WCS · WPS</code>
          <button className="ghost-btn small">Endpoints</button>
        </div>
      </div>
      <div className="form-card">
        <div className="api-section-label">Quickstart — Python</div>
        <pre className="code-block">{`from climate_action import ClimateClient

client = ClimateClient(token="cap_...")
result = client.vulnerability.assess(
    province="sulsel",
    scenario="ssp2-45",
    period="2025-2050",
    indicators=["flood", "slr", "population"]
)
print(result.summary)`}</pre>
      </div>
    </div>
  );
}

function SettingsIntegrations({ setRoute }) {
  const integrations = [
    { name: "One Map BIG", id: "13.1", status: "ok", desc: "Layer geospasial nasional · WMS/WFS", since: "Q3 2024" },
    { name: "InaRISK BNPB", id: "13.2", status: "ok", desc: "Risiko bencana real-time · API REST", since: "Q4 2024" },
    { name: "BMKG Climate Service", id: "13.3", status: "ok", desc: "Curah hujan, temperatur, peringatan dini · API + WMS", since: "Q1 2025" },
    { name: "KLHK SIGN-SMART", id: "13.4", status: "degraded", desc: "LULC, karhutla, deforestasi · WMS", since: "Q2 2025", note: "Latency tinggi: 1.2s avg (vs target 500ms)" },
    { name: "BPS Socio-Economic", id: "13.5", status: "ok", desc: "Sensus, susenas, sakernas · API REST", since: "Q1 2025" },
  ];

  return (
    <div className="settings-pane">
      <div className="settings-pane-head">
        <h2>Integrasi Eksternal (K/L)</h2>
        <button className="ghost-btn" onClick={() => setRoute && setRoute("feature-klint")}><Icon name="git-branch" size={14} />Buka hub lengkap</button>
      </div>
      <div className="integrations-list">
        {integrations.map(it => (
          <div key={it.id} className={`integration-card status-${it.status}`}>
            <div className="integration-status">
              <span className="integration-dot" />
            </div>
            <div className="integration-body">
              <div className="integration-name">{it.name} <span className="badge-mono">FITUR {it.id}</span></div>
              <div className="integration-desc">{it.desc}</div>
              {it.note && <div className="integration-note"><Icon name="alert-triangle" size={12} />{it.note}</div>}
              <div className="integration-meta">Terintegrasi sejak {it.since}</div>
            </div>
            <div className="integration-actions">
              <button className="ghost-btn small"><Icon name="activity" size={12} />Health</button>
              <button className="ghost-btn small"><Icon name="settings" size={12} />Config</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsAbout({ setRoute, goTab }) {
  const credits = [
    { role: "Penyelenggara", name: "Badan Informasi Geospasial (BIG)" },
    { role: "Mitra Data", name: "BNPB · BMKG · KLHK · BPS" },
    { role: "Standar Geospasial", name: "SRGI 2013 · Kebijakan Satu Peta" },
  ];
  const links = [
    { icon: "book-open", label: "Restart Onboarding Tour", hint: "FITUR 9.5 · ulangi panduan halaman utama", tab: "onboarding" },
    { icon: "message-circle", label: "Pusat Bantuan & FAQ", hint: "Dokumentasi pengguna & troubleshooting", tab: "onboarding" },
    { icon: "external-link", label: "API & Developer Docs", hint: "OGC services, token, quickstart", tab: "api" },
    { icon: "shield", label: "Kebijakan Privasi (UU PDP)", hint: "Perlindungan data pribadi & retensi", tab: "auth" },
  ];
  return (
    <div className="settings-pane">
      <div className="settings-pane-head"><h2>Tentang & Bantuan</h2></div>
      <div className="about-hero">
        <div className="about-logo"><Icon name="globe" size={28} /></div>
        <div className="about-hero-text">
          <div className="about-app">Climate Action Platform</div>
          <div className="about-sub">Spatial Decision Support System · Badan Informasi Geospasial</div>
          <div className="about-meta">
            <span className="badge-mono">v1.4.0</span>
            <span className="badge-mono">build 2026.06.02</span>
            <span className="badge-success">Production</span>
          </div>
        </div>
      </div>

      <div className="about-cols">
        <div className="form-card">
          <div className="api-section-label">Kredit & Sumber</div>
          {credits.map(c => (
            <div key={c.role} className="about-credit">
              <span className="about-credit-role">{c.role}</span>
              <span className="about-credit-name">{c.name}</span>
            </div>
          ))}
          <div className="about-credit">
            <span className="about-credit-role">Lisensi</span>
            <span className="about-credit-name">Pemerintah RI · penggunaan internal K/L/D</span>
          </div>
        </div>

        <div className="about-links">
          <div className="api-section-label">Bantuan</div>
          {links.map(l => (
            <button key={l.label} className="about-link-row" onClick={() => l.tab && goTab && goTab(l.tab)}>
              <Icon name={l.icon} size={16} />
              <div className="about-link-body">
                <div className="about-link-label">{l.label}</div>
                <div className="about-link-hint">{l.hint}</div>
              </div>
              <Icon name="chevron-right" size={14} />
            </button>
          ))}
        </div>
      </div>

      <div className="settings-note">
        <Icon name="info" size={14} />
        <span>Platform mengikuti standar SPBE & WCAG 2.1 AA. Untuk dukungan teknis hubungi <strong>helpdesk@big.go.id</strong>.</span>
      </div>
    </div>
  );
}

Object.assign(window, { SDSSModule, DataCatalogModule, ReportsModule, CollabModule, SettingsModule });
