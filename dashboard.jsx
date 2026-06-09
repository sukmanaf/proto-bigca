// ============================================================
// Dashboard / Home — §6 of spec
// ============================================================
const tr = window.tr;

function Dashboard({ ctx, setRoute, openAI, crisis }) {
  const persona = window.PERSONAS[ctx.persona];
  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];
  const kpis = window.KPIS_BY_PERSONA[ctx.persona] || window.KPIS_BY_PERSONA.P2;

  // Quick Actions per persona (§5.4)
  const quickActions = {
    P1: [
      { icon: "file-text", label: "Briefing Hari Ini", primary: true, route: "reports" },
      { icon: "git-pull-request", label: "Bandingkan Skenario", route: "sdss" },
      { icon: "trending-up", label: "Lihat Trend Nasional", route: "map" },
      { icon: "bot", label: "Tanya AI", onClick: openAI },
    ],
    P2: [
      { icon: "plus-circle", label: "Skenario Baru", primary: true, route: "sdss" },
      { icon: "cloud-sun", label: "Iklim Wilayah", route: "feature-iklim" },
      { icon: "layers", label: "Cari Layer", route: "data" },
      { icon: "file-text", label: "Buat Laporan", route: "reports" },
      { icon: "bot", label: "Tanya AI", onClick: openAI },
    ],
    P3: [
      { icon: "git-branch", label: "Lanjutkan Project", primary: true, route: "modeling" },
      { icon: "sparkles", label: "Prediksi Iklim", route: "feature-iklim" },
      { icon: "activity", label: "Hindcast Baru", route: "modeling" },
      { icon: "download", label: "Download Dataset", route: "data" },
      { icon: "external-link", label: "API Docs", route: "settings" },
    ],
    P4: [
      { icon: "plus-circle", label: "Project Baru", primary: true, route: "sectoral" },
      { icon: "map-pin", label: "Cari Lokasi", route: "map" },
      { icon: "file-text", label: "Laporan Klien", route: "reports" },
      { icon: "bot", label: "Tanya AI", onClick: openAI },
    ],
    P5: [
      { icon: "map", label: "Peta Iklim Publik", primary: true, route: "map" },
      { icon: "book-open", label: "Cerita Iklim", route: "reports" },
      { icon: "bell", label: "Subscribe Alert", route: "settings" },
      { icon: "bot", label: "Tanya AI", onClick: openAI },
    ],
  }[ctx.persona] || [];

  const greet = (() => {
    const h = new Date().getHours();
    if (h < 11) return "Selamat pagi";
    if (h < 15) return "Selamat siang";
    if (h < 19) return "Selamat sore";
    return "Selamat malam";
  })();

  return (
    <div className="dashboard" data-screen-label="Dashboard / Home">
      {/* Greeting hero */}
      <div className="hero-row">
        <div>
          <div className="hero-greet">{tr(greet)}, {persona.name.split(" ")[0]}.</div>
          <h1 className="hero-title">
            {crisis ? (
              <>{tr("Mode Krisis aktif — fokus pada")} <span className="hero-emph">{window.CRISIS_EVENT.area}</span>.</>
            ) : (
              <>{tr("Ringkasan iklim")} <span className="hero-emph">{tr(province.name)}</span> · {ctx.scenario.toUpperCase()} · {ctx.period}.</>
            )}
          </h1>
          <div className="hero-sub">
            {crisis
              ? tr("Antrian aksi prioritas dan layer real-time telah diaktifkan.")
              : `12 ${tr("kab/kota dalam kategori risiko tinggi")} · 3 ${tr("alert aktif")} · ${kpis[3]?.value || 0} ${tr("skenario sedang berjalan.")}`}
          </div>
        </div>
        <div className="hero-aside">
          <div className="hero-stat">
            <div className="hero-stat-label">{tr("Risk Index Provinsi")}</div>
            <div className="hero-stat-value">
              <span className="hero-stat-num">{crisis ? "78.4" : "62.4"}</span>
              <span className="hero-stat-unit">/ 100</span>
            </div>
            <div className="hero-stat-meta">
              <Icon name="arrow-up" size={12} />
              <span>+1.8 vs Q1 2026 · {crisis ? tr("kategori KRISIS") : tr("kategori medium-high")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="zone quick-zone">
        <div className="quick-row">
          <div className="quick-label">
            <Icon name="zap" size={14} />
            <span>{tr("Aksi Cepat")}</span>
          </div>
          {quickActions.map((a, i) => (
            <button
              key={i}
              className={`quick-btn ${a.primary ? "primary" : ""}`}
              onClick={() => a.onClick ? a.onClick() : setRoute(a.route)}
            >
              <Icon name={a.icon} size={16} />
              <span>{tr(a.label)}</span>
            </button>
          ))}
          <div className="quick-spacer" />
          <button className="quick-btn ghost" title="Lebih banyak">
            <Icon name="more-horizontal" size={16} />
          </button>
        </div>
      </section>

      {/* KPI Cards row */}
      <section className="zone">
        <div className="kpi-grid">
          {kpis.map((k, i) => <KPICard key={i} {...k} />)}
        </div>
      </section>

      {/* Risk Map + Activity Feed two-column */}
      <section className="zone two-col">
        <RiskMapInline ctx={ctx} setRoute={setRoute} crisis={crisis} />
        <ActivityFeed setRoute={setRoute} />
      </section>

      {/* Snapshot Iklim Wilayah (FITUR 2.0) */}
      <section className="zone">
        <window.ClimateSnapshot ctx={ctx} setRoute={setRoute} />
      </section>

      {/* Module Grid */}
      <section className="zone">
        <ModuleGrid persona={ctx.persona} setRoute={setRoute} />
      </section>
    </div>
  );
}

// ----- KPI Card -----
function KPICard({ label, value, unit, trend, deltaLabel, spark, status }) {
  const trendIcon = trend > 0 ? "arrow-up" : trend < 0 ? "arrow-down" : "minus";
  const trendCls = trend > 0 ? "up" : trend < 0 ? "down" : "flat";
  const max = Math.max(...spark);
  const min = Math.min(...spark);
  const range = max - min || 1;
  const pts = spark.map((v, i) => {
    const x = (i / (spark.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className={`kpi-card ${status || ""}`}>
      <div className="kpi-head">
        <div className="kpi-label">{tr(label)}</div>
        <button className="kpi-more"><Icon name="more-horizontal" size={14} /></button>
      </div>
      <div className="kpi-value">
        <span className="kpi-num">{value}</span>
        {unit && <span className="kpi-unit">{unit}</span>}
      </div>
      <div className="kpi-meta">
        <span className={`kpi-trend ${trendCls}`}>
          <Icon name={trendIcon} size={12} />
          {Math.abs(trend)}
        </span>
        <span className="kpi-delta">{tr(deltaLabel)}</span>
      </div>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="kpi-spark" aria-hidden="true">
        <polyline points={pts.replace(/,(\d+\.?\d*)/g, (m, y) => `,${parseFloat(y) * 0.4}`)} fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <button className="kpi-link">{tr("Lihat detail")} <Icon name="chevron-right" size={12} /></button>
    </div>
  );
}

// ----- Risk Map (inline mock) -----
function RiskMapInline({ ctx, setRoute, crisis }) {
  const [layers, setLayers] = React.useState({ banjir: true, slr: false, karhutla: false });
  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];
  const [hover, setHover] = React.useState(null);

  return (
    <div className="card risk-map-card">
      <div className="card-head">
        <div className="card-title">
          <Icon name="map-pin" size={16} />
          <span>{tr("Peta Risiko")} · {tr(province.name)}</span>
        </div>
        <div className="card-actions">
          <button className="ghost-btn" onClick={() => setRoute("map")}>
            <Icon name="maximize" size={14} />
            <span>{tr("Buka Peta Penuh")}</span>
          </button>
        </div>
      </div>
      <div className="layer-toggle-row">
        <span className="layer-toggle-label">{tr("Layer aktif:")}</span>
        {[
          ["banjir", "Banjir", "#8B1A1A"],
          ["slr", "SLR 2050", "#0E5A78"],
          ["karhutla", "Karhutla", "#C44E37"],
        ].map(([k, label, color]) => (
          <label key={k} className={`layer-chip ${layers[k] ? "on" : ""}`}>
            <input type="checkbox" checked={layers[k]} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />
            <span className="layer-dot" style={{ background: layers[k] ? color : "transparent", borderColor: color }} />
            <span>{tr(label)}</span>
          </label>
        ))}
        <div className="layer-spacer" />
        <button className="ghost-btn small"><Icon name="layers" size={12} />{tr("Semua layer")}</button>
      </div>

      <div className="map-stage">
        <window.RealRiskMap ctx={ctx} layers={layers} crisis={crisis} onSelect={() => setRoute("vulnerability")} explorer={false} />
        <div className="map-overlay-tl">
          <div className="map-attribution">© BIG · GeoVertix WMS · OSM</div>
        </div>
        <div className="map-overlay-bl legend">
          <div className="legend-title">{tr("Risiko")}</div>
          {[
            ["Sangat Rendah", "#0E5A78"],
            ["Rendah", "#2F7D5E"],
            ["Sedang", "#C18820"],
            ["Tinggi", "#C44E37"],
            ["Sangat Tinggi", "#8B1A1A"],
          ].map(([l, c]) => (
            <div className="legend-row" key={l}>
              <span className="legend-swatch" style={{ background: c }} />
              <span>{tr(l)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="map-insight">
        <Icon name="sparkles" size={14} />
        <span><strong>{tr("Insight:")}</strong> {tr("12 kab dalam kategori risiko tinggi-sangat tinggi — Wajo, Bone, Soppeng paling rentan.")} <button className="link-btn">{tr("Lihat analisis MCDA →")}</button></span>
      </div>
    </div>
  );
}

// SVG mock map — abstract polygons resembling Sulawesi
function MapSurface({ layers, crisis, onHover }) {
  // Mock kab polygons: id, label, [risk_banjir, risk_slr, risk_karhutla], path, label_x, label_y
  const kabs = [
    { id: "wajo",     name: "Wajo",     pop: "395K", r: [5,2,3], path: "M260,160 L320,150 L340,200 L300,230 L255,210 Z" },
    { id: "bone",     name: "Bone",     pop: "752K", r: [4,3,2], path: "M275,235 L335,240 L340,290 L290,300 L268,275 Z" },
    { id: "soppeng",  name: "Soppeng",  pop: "230K", r: [3,1,4], path: "M205,180 L255,175 L260,215 L210,220 Z" },
    { id: "pinrang",  name: "Pinrang",  pop: "365K", r: [4,4,1], path: "M165,155 L210,148 L208,195 L160,200 Z" },
    { id: "makassar", name: "Makassar", pop: "1.4M", r: [3,4,1], path: "M155,310 L205,305 L210,340 L160,345 Z" },
    { id: "gowa",     name: "Gowa",     pop: "770K", r: [3,2,2], path: "M170,265 L235,260 L240,305 L172,310 Z" },
    { id: "takalar",  name: "Takalar",  pop: "295K", r: [2,4,1], path: "M155,348 L210,346 L212,385 L155,388 Z" },
    { id: "maros",    name: "Maros",    pop: "355K", r: [3,2,2], path: "M170,225 L240,222 L242,262 L172,265 Z" },
    { id: "pangkep",  name: "Pangkep",  pop: "335K", r: [3,3,1], path: "M165,190 L225,185 L228,222 L168,225 Z" },
    { id: "barru",    name: "Barru",    pop: "175K", r: [3,3,1], path: "M155,160 L195,155 L196,190 L156,194 Z" },
    { id: "parepare", name: "Parepare", pop: "150K", r: [2,3,1], path: "M150,125 L185,120 L188,155 L152,158 Z" },
    { id: "sidrap",   name: "Sidrap",   pop: "295K", r: [3,1,3], path: "M195,115 L255,108 L258,148 L198,152 Z" },
    { id: "luwu",     name: "Luwu",     pop: "365K", r: [2,1,4], path: "M280,80 L355,75 L360,135 L285,140 Z" },
    { id: "enrekang", name: "Enrekang", pop: "215K", r: [2,1,3], path: "M205,65 L275,60 L278,108 L208,110 Z" },
    { id: "tana-toraja", name: "Tana Toraja", pop: "230K", r: [1,1,3], path: "M155,40 L240,35 L243,80 L158,82 Z" },
    { id: "selayar",  name: "Selayar",  pop: "140K", r: [3,5,1], path: "M260,395 L305,395 L308,430 L262,430 Z" },
    { id: "bulukumba","name":"Bulukumba","pop":"425K","r":[3,4,1],"path":"M225,360 L290,355 L295,400 L228,405 Z" },
    { id: "bantaeng", name: "Bantaeng", pop: "190K", r: [3,4,1], path: "M195,360 L228,358 L230,395 L196,398 Z" },
    { id: "jeneponto","name":"Jeneponto","pop":"410K","r":[2,4,1],"path":"M150,358 L196,358 L196,398 L152,400 Z" },
    { id: "sinjai",   name: "Sinjai",   pop: "245K", r: [3,3,1], path: "M230,310 L290,308 L292,355 L232,358 Z" },
  ];

  const riskColors = ["#0E5A78", "#2F7D5E", "#C18820", "#C44E37", "#8B1A1A"];
  // Active risk: pick max of selected layers
  const activeKeys = Object.entries(layers).filter(([k, v]) => v).map(([k]) => k);
  const layerIdx = { banjir: 0, slr: 1, karhutla: 2 };

  const scoreFor = (k) => {
    if (activeKeys.length === 0) return 0;
    return Math.max(...activeKeys.map(key => k.r[layerIdx[key]]));
  };

  return (
    <svg viewBox="0 0 500 460" className="map-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#DEE5DD" strokeWidth="0.5" />
        </pattern>
        <pattern id="hatched" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="#9DACA4" strokeWidth="1" opacity="0.3" />
        </pattern>
      </defs>
      <rect width="500" height="460" fill="#F4F7F5" />
      <rect width="500" height="460" fill="url(#grid)" />
      {/* sea */}
      <path d="M0,0 L500,0 L500,460 L0,460 Z" fill="#E0F2FE" opacity="0.5" />
      {/* Continental outline (loose) */}
      <path
        d="M130,30 L380,30 L385,140 L370,250 L320,440 L240,455 L150,440 L100,360 L110,200 L120,90 Z"
        fill="#FAFAF9"
        stroke="#B7C4BD"
        strokeWidth="1.2"
      />

      {/* Kab polygons */}
      {kabs.map(k => {
        const score = scoreFor(k);
        const fill = score === 0 ? "#DEE5DD" : riskColors[score - 1];
        const opacity = score === 0 ? 0.4 : (crisis && (k.id === "wajo") ? 1 : 0.78);
        return (
          <g key={k.id}>
            <path
              d={k.path}
              fill={fill}
              fillOpacity={opacity}
              stroke="#FFFFFF"
              strokeWidth="1.5"
              className="kab-path"
              onMouseEnter={e => {
                const rect = e.currentTarget.ownerSVGElement.getBoundingClientRect();
                const stage = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
                onHover({ name: k.name, score: ["Sangat Rendah","Rendah","Sedang","Tinggi","Sangat Tinggi"][score-1] || "Tidak ada layer", pop: k.pop, x: e.clientX - stage.left, y: e.clientY - stage.top });
              }}
              onMouseMove={e => {
                const stage = e.currentTarget.ownerSVGElement.parentElement.getBoundingClientRect();
                onHover({ name: k.name, score: ["Sangat Rendah","Rendah","Sedang","Tinggi","Sangat Tinggi"][score-1] || "Tidak ada layer", pop: k.pop, x: e.clientX - stage.left, y: e.clientY - stage.top });
              }}
            />
            {crisis && k.id === "wajo" && (
              <>
                <circle cx="290" cy="195" r="14" fill="none" stroke="#8B1A1A" strokeWidth="2">
                  <animate attributeName="r" from="14" to="28" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="1" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="290" cy="195" r="5" fill="#8B1A1A" />
              </>
            )}
          </g>
        );
      })}

      {/* Cities */}
      <g className="city-markers" style={{ pointerEvents: "none" }}>
        <circle cx="180" cy="325" r="3" fill="#1F2E29" />
        <text x="187" y="328" fontSize="9" fill="#1F2E29">Makassar</text>
        <circle cx="290" cy="190" r="2" fill="#1F2E29" />
        <text x="295" y="193" fontSize="9" fill="#1F2E29">Sengkang</text>
        <circle cx="170" cy="142" r="2" fill="#1F2E29" />
        <text x="125" y="144" fontSize="9" fill="#1F2E29">Parepare</text>
      </g>

      {/* compass */}
      <g transform="translate(450,420)">
        <circle r="14" fill="white" stroke="#B7C4BD" />
        <path d="M0,-9 L4,3 L0,0 L-4,3 Z" fill="#1F2E29" />
        <text y="-15" textAnchor="middle" fontSize="8" fill="#6B7B74">N</text>
      </g>
      {/* scale bar */}
      <g transform="translate(20,420)">
        <line x1="0" y1="0" x2="80" y2="0" stroke="#1F2E29" strokeWidth="1.5" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#1F2E29" strokeWidth="1.5" />
        <line x1="40" y1="-3" x2="40" y2="3" stroke="#1F2E29" strokeWidth="1" />
        <line x1="80" y1="-3" x2="80" y2="3" stroke="#1F2E29" strokeWidth="1.5" />
        <text x="40" y="-7" textAnchor="middle" fontSize="9" fill="#1F2E29">50 km</text>
      </g>
    </svg>
  );
}

// ----- Activity Feed -----
function ActivityFeed({ setRoute }) {
  const [filter, setFilter] = React.useState("all");
  const filters = [
    { id: "all", label: "Semua" },
    { id: "mention", label: "Mention" },
    { id: "province", label: "Provinsi ini" },
    { id: "24h", label: "24 jam" },
  ];
  return (
    <div className="card activity-card">
      <div className="card-head">
        <div className="card-title">
          <Icon name="activity" size={16} />
          <span>{tr("Aktivitas Terkini")}</span>
        </div>
        <div className="card-actions">
          <button className="ghost-btn small"><Icon name="filter" size={12} />{tr("Filter")}</button>
        </div>
      </div>
      <div className="activity-tabs">
        {filters.map(f => (
          <button
            key={f.id}
            className={`activity-tab ${filter === f.id ? "active" : ""}`}
            onClick={() => setFilter(f.id)}
          >
            {tr(f.label)}
          </button>
        ))}
      </div>
      <div className="activity-list">
        {window.ACTIVITY_FEED.map((item, i) => (
          <div key={i} className={`activity-item ${item.severity === "high" ? "alert" : ""}`}>
            <div className={`activity-icon type-${item.type}`}>
              <Icon name={item.icon} size={14} />
            </div>
            <div className="activity-body">
              <div className="activity-title">{tr(item.title)}</div>
              <div className="activity-text">{tr(item.body)}</div>
              <div className="activity-meta">
                <span>{item.who}</span>
                <span className="dot-sep">·</span>
                <span>{item.when}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="activity-more">
        <span>{tr("Lihat 47 aktivitas lain")}</span>
        <Icon name="arrow-right" size={14} />
      </button>
    </div>
  );
}

// ----- Module Grid -----
function ModuleGrid({ persona, setRoute }) {
  const allowed = {
    P1: ["sdss","reports","collab","data","map"],
    P2: ["modeling","vulnerability","sectoral","sdss","ai","collab","reports","data","map","settings"],
    P3: ["modeling","vulnerability","sectoral","sdss","ai","collab","reports","data","map","settings"],
    P4: ["sectoral","sdss","reports","data","map"],
    P5: ["map","reports","data"],
  }[persona] || [];
  const mods = window.MODULES.filter(m => allowed.includes(m.id));

  return (
    <div className="modgrid-section">
      <div className="modgrid-head">
        <div className="card-title">
          <Icon name="layers" size={16} />
          <span>{tr("Modul Platform")}</span>
          <span className="modgrid-count">{mods.length} {tr("modul · 62 fitur")}</span>
        </div>
        <div className="card-actions">
          <button className="ghost-btn small">{tr("Atur urutan")}</button>
          <button className="ghost-btn small">{tr("Sembunyikan jarang dipakai")}</button>
        </div>
      </div>
      <div className="modgrid">
        {mods.map((m, i) => (
          <button
            key={m.id}
            className="modtile"
            onClick={() => setRoute(m.id)}
            data-fav={i < 3}
          >
            <div className="modtile-head">
              <div className={`modtile-icon module-${m.id}`}>
                <Icon name={m.icon} size={20} />
              </div>
              {i === 0 && <span className="modtile-badge fav">★ {tr("Favorit")}</span>}
              {m.id === "ai" && <span className="modtile-badge new">UPDATE</span>}
            </div>
            <div className="modtile-name">{tr(m.name)}</div>
            <div className="modtile-count">{m.count > 0 ? `${m.count} ${tr("fitur")}` : "—"}</div>
            <div className="modtile-tag">{m.tagline || ""}</div>
            <div className="modtile-arrow">
              <Icon name="arrow-right" size={14} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Dashboard, MapSurface });
