// ============================================================
// SDSS — Multi-Level Decision Support Architecture · FITUR 5.1
// Sumber: §5.1 — workspace per governance tier (national/provincial/
// district), NDC tracker, K/L coordination, role-specific dashboards
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const ML_TIERS = [
  { id: "national", name: "Nasional (Pusat)", org: "Bappenas / BIG", desc: "Koordinasi lintas K/L, alokasi anggaran, NDC compliance" },
  { id: "provincial", name: "Provinsi", org: "Bappeda Provinsi", desc: "Harmonisasi antar kabupaten, RTRW provinsi" },
  { id: "district", name: "Kabupaten/Kota", org: "Bappeda / BPBD / OPD", desc: "Operasional RDTR, alert handling, RPJMD" },
];

const ML_PROVINCES = [
  { name: "Jawa Barat", status: "ontrack", year: 1 }, { name: "Jawa Tengah", status: "ontrack", year: 1 },
  { name: "Jawa Timur", status: "lagging", year: 1 }, { name: "Sulawesi Selatan", status: "ontrack", year: 2 },
  { name: "NTT", status: "critical", year: 2 }, { name: "Kalimantan Barat", status: "lagging", year: 2 },
  { name: "Papua", status: "critical", year: 3 }, { name: "Bali", status: "ontrack", year: 1 },
  { name: "Sumatera Utara", status: "lagging", year: 2 }, { name: "Riau", status: "critical", year: 3 },
];

function mlStatusColor(s) { return s === "ontrack" ? "#2F7D5E" : s === "lagging" ? "#C18820" : "#8B1A1A"; }

function MultiLevelDSS({ setRoute, ctx, openAI }) {
  const [tier, setTier] = React.useState("national");
  const t = ML_TIERS.find(x => x.id === tier);

  return (
    <div className="feat-page ml-page" data-screen-label="Feature: Multi-Level Decision Support">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>Multi-Level Decision Support</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sdss"><Icon name="layers" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 5.1 · SDSS CORE</div>
              <h1>Multi-Level Decision Support</h1>
              <div className="feat-sub">Workspace per tingkat pemerintahan · dashboard role-specific · agregasi cell → kec → kab → prov → nasional</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
          </div>
        </div>
      </div>

      <div className="ml-tierbar">
        <span className="ml-tierbar-label">Workspace tier:</span>
        {ML_TIERS.map(x => (
          <button key={x.id} className={`ml-tier ${tier === x.id ? "on" : ""}`} onClick={() => setTier(x.id)}>
            <span className="ml-tier-name">{x.name}</span>
            <span className="ml-tier-org">{x.org}</span>
          </button>
        ))}
      </div>

      {tier === "national" && (
        <div className="ml-grid">
          <div className="rdtr-panel ml-ndc">
            <div className="rdtr-panel-head">NDC Tracker</div>
            <div className="ml-ndc-targets">
              <div className="ml-ndc-t"><span className="muted">Target 2030 unconditional</span><strong>−31.89%</strong></div>
              <div className="ml-ndc-t"><span className="muted">Target 2030 conditional</span><strong>−43.20%</strong></div>
            </div>
            <div className="ml-ndc-status">
              <div className="ml-ndc-row"><span>Total emisi</span><strong>1.452 MtCO₂eq</strong></div>
              <div className="ml-ndc-row"><span>Reduction achieved</span><strong>9.2%</strong></div>
              <div className="ml-ndc-row"><span>Gap to target</span><strong style={{ color: "var(--danger-700)" }}>22.6 pp</strong></div>
            </div>
            <div className="ml-ndc-bar">
              <div className="ml-ndc-fill" style={{ width: "29%" }} />
              <div className="ml-ndc-target-mark" style={{ left: "100%" }} />
            </div>
            <div className="ml-ndc-warn"><Icon name="alert-triangle" size={13} />Status: Below trajectory</div>
            <button className="link-btn" onClick={() => setRoute("feature-carbon")}>Detail per sektor →</button>
          </div>

          <div className="rdtr-panel ml-provinces">
            <div className="rdtr-panel-head">19 Provinsi Pilot
              <span className="ml-prov-legend">
                <span><span className="dot" style={{ background: "#2F7D5E" }} />On-track</span>
                <span><span className="dot" style={{ background: "#C18820" }} />Lagging</span>
                <span><span className="dot" style={{ background: "#8B1A1A" }} />Critical</span>
              </span>
            </div>
            <div className="ml-prov-list">
              {ML_PROVINCES.map(p => (
                <button key={p.name} className="ml-prov" onClick={() => setRoute("feature-impact")}>
                  <span className="ml-prov-dot" style={{ background: mlStatusColor(p.status) }} />
                  <span className="ml-prov-name">{p.name}</span>
                  <span className="ml-prov-year">Th {p.year}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rdtr-panel ml-coord">
            <div className="rdtr-panel-head">Koordinasi K/L</div>
            <div className="ml-projects">
              <div className="ml-project"><div><div className="ml-proj-name">Project A: BIG × KLHK × BNPB</div><div className="ml-proj-status"><span className="ml-dots"><span className="on"/><span className="on"/><span/></span>Berjalan</div></div></div>
              <div className="ml-project"><div><div className="ml-proj-name">Project B: BIG × Kementan</div><div className="ml-proj-status"><span className="ml-dots"><span className="on"/><span/><span/></span>Planning</div></div></div>
              <div className="ml-project"><div><div className="ml-proj-name">Project C: BIG × ESDM × PLN</div><div className="ml-proj-status"><span className="ml-dots"><span className="on"/><span className="on"/><span className="on"/></span>Selesai</div></div></div>
            </div>
            <button className="link-btn">Calendar koordinasi →</button>
          </div>
        </div>
      )}

      {tier !== "national" && (
        <div className="ml-workspace">
          <div className="ml-ws-intro">
            <div className="ml-ws-icon"><Icon name={tier === "provincial" ? "map" : "home"} size={28} /></div>
            <div>
              <div className="ml-ws-title">Workspace {t.name}</div>
              <div className="ml-ws-org">{t.org} · {t.desc}</div>
            </div>
          </div>
          <div className="ml-ws-cards">
            {(tier === "provincial"
              ? [["Harmonisasi antar-kab", "map", "feature-impact"], ["RTRW Provinsi", "layers", "feature-rdtr"], ["Comparison kab/kota", "git-pull-request", "feature-scompare"], ["Provinsi dashboard", "bar-chart-3", "feature-dashboards"]]
              : [["Hazard real-time", "alert-triangle", "feature-flood"], ["Alert management (EWS)", "zap", "feature-ews"], ["RDTR tools", "map", "feature-rdtr"], ["OPD coordination", "users", "flow-group"]]
            ).map(([label, icon, route]) => (
              <button key={label} className="ml-ws-card" onClick={() => setRoute(route)}>
                <div className="ml-ws-card-icon"><Icon name={icon} size={20} /></div>
                <span>{label}</span>
                <Icon name="arrow-right" size={14} className="ml-ws-arrow" />
              </button>
            ))}
          </div>
          <div className="ml-ws-note"><Icon name="info" size={13} />Workflow state machine per dokumen perencanaan: DRAFT → REVIEW → APPROVED → PUBLISHED. Integrasi RPJMN/RPJMD/RDTR via adapter.</div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { MultiLevelDSS });
