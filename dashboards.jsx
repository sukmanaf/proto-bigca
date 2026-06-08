// ============================================================
// Reports — Dynamic Dashboards (Widget Builder) · FITUR 8.2
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §8.2
// Dashboard berisi banyak widget (KPI, chart, table, map, gauge,
// sankey) drag-drop per role. Edit mode + widget library.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const DASH_PRESETS = [
  { id: "bpbd", name: "BPBD Demak", role: "Tactical / krisis" },
  { id: "bappeda", name: "Bappeda Sulsel", role: "Perencanaan" },
  { id: "exec", name: "Eksekutif Bappenas", role: "Strategic" },
];

// Widget library
const WIDGET_LIB = [
  { type: "kpi", icon: "bar-chart-3", label: "KPI Card" },
  { type: "line", icon: "trending-up", label: "Time-series" },
  { type: "bar", icon: "bar-chart-3", label: "Bar Chart" },
  { type: "donut", icon: "target", label: "Pie / Donut" },
  { type: "map", icon: "map", label: "Map Embed" },
  { type: "table", icon: "database", label: "Table" },
  { type: "gauge", icon: "compass", label: "Gauge" },
  { type: "sparkline", icon: "activity", label: "Sparkline" },
];

// Default dashboard layout per preset (each widget: id, type, w (cols 1-4), title)
const DASH_LAYOUTS = {
  bpbd: [
    { id: "w1", type: "kpi", w: 1, title: "Alerts aktif", value: "3", trend: "+1" },
    { id: "w2", type: "kpi", w: 1, title: "Pop @ risk", value: "142.000", trend: "+18%", warn: true },
    { id: "w3", type: "kpi", w: 1, title: "Anggaran", value: "12.4 M", sub: "of 14.2 M" },
    { id: "w4", type: "kpi", w: 1, title: "Coverage", value: "87%", trend: "+5%" },
    { id: "w5", type: "map", w: 2, title: "Hazard real-time" },
    { id: "w6", type: "line", w: 2, title: "Trend banjir 5 tahun" },
    { id: "w7", type: "table", w: 2, title: "Top 5 kecamatan rentan" },
    { id: "w8", type: "bar", w: 2, title: "Forecast 7 hari (probability)" },
  ],
  bappeda: [
    { id: "w1", type: "kpi", w: 1, title: "Skenario aktif", value: "12", trend: "+3" },
    { id: "w2", type: "kpi", w: 1, title: "Risk Index", value: "62.4", trend: "+1.8", warn: true },
    { id: "w3", type: "gauge", w: 1, title: "MCDA progress" },
    { id: "w4", type: "donut", w: 1, title: "Alokasi sektor" },
    { id: "w5", type: "line", w: 2, title: "Proyeksi vulnerability 2025-2050" },
    { id: "w6", type: "map", w: 2, title: "Peta prioritas intervensi" },
    { id: "w7", type: "bar", w: 4, title: "Anggaran adaptasi per kab/kota" },
  ],
  exec: [
    { id: "w1", type: "kpi", w: 1, title: "Provinsi aktif", value: "34/38" },
    { id: "w2", type: "kpi", w: 1, title: "Risk nasional", value: "62.4", trend: "+1.8", warn: true },
    { id: "w3", type: "kpi", w: 1, title: "Action items", value: "12", trend: "-3" },
    { id: "w4", type: "kpi", w: 1, title: "Laporan", value: "8", trend: "+2" },
    { id: "w5", type: "map", w: 3, title: "Risk map nasional" },
    { id: "w6", type: "donut", w: 1, title: "Status NDC" },
    { id: "w7", type: "line", w: 4, title: "Trend Risk Index nasional 10 tahun" },
  ],
};

function DynamicDashboards({ setRoute, ctx, openAI }) {
  const [preset, setPreset] = React.useState("bpbd");
  const [edit, setEdit] = React.useState(false);
  const [widgets, setWidgets] = React.useState(DASH_LAYOUTS.bpbd);

  React.useEffect(() => { setWidgets(DASH_LAYOUTS[preset]); }, [preset]);

  const addWidget = (type) => {
    const lib = WIDGET_LIB.find(w => w.type === type);
    setWidgets(ws => [...ws, { id: "w" + Date.now(), type, w: type === "kpi" ? 1 : 2, title: lib.label + " baru", value: "—" }]);
  };
  const removeWidget = (id) => setWidgets(ws => ws.filter(w => w.id !== id));
  const resizeWidget = (id) => setWidgets(ws => ws.map(w => w.id === id ? { ...w, w: (w.w % 4) + 1 } : w));

  return (
    <div className="feat-page dash-page" data-screen-label="Feature: Dynamic Dashboards">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("reports")} className="link-btn">{tr("Laporan & Output")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Dynamic Dashboards</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-reports"><Icon name="bar-chart-3" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 8.2 · REPORTS</div>
              <h1>Dynamic Dashboards</h1>
              <div className="feat-sub">Dashboard widget drag-drop per role · KPI, chart, map, table, gauge · simpan sebagai template personal/shared</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className={`ghost-btn ${edit ? "active" : ""}`} onClick={() => setEdit(!edit)}><Icon name="edit" size={14} />{edit ? "Selesai edit" : "Edit dashboard"}</button>
            <button className="ghost-btn"><Icon name="share" size={14} />Share</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export PNG</button>
            <button className="primary-btn"><Icon name="clock" size={14} />Schedule email</button>
          </div>
        </div>
      </div>

      {/* preset tabs */}
      <div className="dash-presets">
        <span className="dash-presets-label">Dashboard:</span>
        {DASH_PRESETS.map(p => (
          <button key={p.id} className={`dash-preset ${preset === p.id ? "on" : ""}`} onClick={() => setPreset(p.id)}>
            <span>{p.name}</span><span className="dash-preset-role">{p.role}</span>
          </button>
        ))}
        <button className="dash-preset add"><Icon name="plus" size={13} />Dashboard baru</button>
      </div>

      <div className={`dash-layout ${edit ? "editing" : ""}`}>
        {/* widget library (edit mode) */}
        {edit && (
          <aside className="dash-library">
            <div className="rdtr-panel-head" style={{ padding: "0 0 10px" }}>Widget Library</div>
            <div className="dash-lib-list">
              {WIDGET_LIB.map(w => (
                <button key={w.type} className="dash-lib-item" onClick={() => addWidget(w.type)}>
                  <Icon name={w.icon} size={15} /><span>{w.label}</span><Icon name="plus" size={13} className="dash-lib-add" />
                </button>
              ))}
            </div>
            <div className="dash-lib-note"><Icon name="info" size={12} />Klik widget untuk tambah ke grid. Klik widget di grid untuk resize, drag handle untuk pindah.</div>
          </aside>
        )}

        {/* widget grid */}
        <div className="dash-grid">
          {widgets.map(w => (
            <div key={w.id} className={`dash-widget span-${w.w} ${edit ? "editable" : ""}`}>
              <div className="dash-widget-head">
                {edit && <span className="dash-widget-handle"><Icon name="more-vertical" size={13} /></span>}
                <span className="dash-widget-title">{w.title}</span>
                {edit && (
                  <span className="dash-widget-actions">
                    <button onClick={() => resizeWidget(w.id)} title="Resize"><Icon name="maximize" size={12} /></button>
                    <button onClick={() => removeWidget(w.id)} title="Hapus"><Icon name="x" size={12} /></button>
                  </span>
                )}
              </div>
              <div className="dash-widget-body"><DashWidget w={w} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashWidget({ w }) {
  if (w.type === "kpi") return (
    <div className={`dash-kpi ${w.warn ? "warn" : ""}`}>
      <div className="dash-kpi-val">{w.value}</div>
      {w.trend && <div className={`dash-kpi-trend ${w.trend.startsWith("-") ? "down" : "up"}`}>{w.trend}</div>}
      {w.sub && <div className="dash-kpi-sub">{w.sub}</div>}
    </div>
  );
  if (w.type === "line") return (
    <svg viewBox="0 0 280 90" className="dash-chart" preserveAspectRatio="none">
      <polyline points="0,75 40,68 80,55 120,58 160,42 200,38 240,28 280,20" fill="none" stroke="var(--primary-600)" strokeWidth="2" />
      <polygon points="0,75 40,68 80,55 120,58 160,42 200,38 240,28 280,20 280,90 0,90" fill="var(--primary-200)" opacity="0.3" />
    </svg>
  );
  if (w.type === "bar") return (
    <svg viewBox="0 0 280 90" className="dash-chart" preserveAspectRatio="none">
      {[42,58,35,70,48,62,55].map((h, i) => (
        <rect key={i} x={12 + i * 38} y={88 - h} width="26" height={h} fill={i === 3 ? "var(--risk-4)" : "var(--primary-500)"} />
      ))}
    </svg>
  );
  if (w.type === "donut") return (
    <svg viewBox="0 0 90 90" className="dash-donut">
      <circle cx="45" cy="45" r="32" fill="none" stroke="var(--gray-200)" strokeWidth="14" />
      <circle cx="45" cy="45" r="32" fill="none" stroke="var(--primary-600)" strokeWidth="14" strokeDasharray="120 201" transform="rotate(-90 45 45)" strokeLinecap="round" />
      <circle cx="45" cy="45" r="32" fill="none" stroke="var(--accent-sunset)" strokeWidth="14" strokeDasharray="55 201" strokeDashoffset="-120" transform="rotate(-90 45 45)" />
    </svg>
  );
  if (w.type === "gauge") return (
    <svg viewBox="0 0 120 70" className="dash-gauge">
      <path d="M10,65 A50,50 0 0,1 110,65" fill="none" stroke="var(--gray-200)" strokeWidth="10" strokeLinecap="round" />
      <path d="M10,65 A50,50 0 0,1 88,30" fill="none" stroke="var(--success-500)" strokeWidth="10" strokeLinecap="round" />
      <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--gray-900)">68%</text>
    </svg>
  );
  if (w.type === "sparkline") return (
    <svg viewBox="0 0 200 40" className="dash-chart" preserveAspectRatio="none">
      <polyline points="0,30 30,28 60,20 90,24 120,14 150,18 200,8" fill="none" stroke="var(--accent-sea)" strokeWidth="2" />
    </svg>
  );
  if (w.type === "map") return (
    <div className="dash-map">
      <window.MapSurface layers={{ banjir: true, slr: false, karhutla: false }} crisis={false} onHover={() => {}} />
    </div>
  );
  if (w.type === "table") return (
    <table className="dash-table">
      <tbody>
        {[["Wajo", "0.84"], ["Bone", "0.79"], ["Soppeng", "0.76"], ["Selayar", "0.73"], ["Bulukumba", "0.71"]].map((r, i) => (
          <tr key={i}><td>{r[0]}</td><td><span style={{ color: parseFloat(r[1]) >= 0.75 ? "var(--risk-5)" : "var(--risk-3)", fontWeight: 700 }}>{r[1]}</span></td></tr>
        ))}
      </tbody>
    </table>
  );
  return <div className="dash-placeholder">{w.type}</div>;
}

Object.assign(window, { DynamicDashboards });
