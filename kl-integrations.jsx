// ============================================================
// Data Catalog — Integrasi K/L (External Connectors) · FITUR 13.x
// Sumber: §13.1-13.5 — One Map BIG, InaRISK BNPB, BMKG, KLHK, BPS
// Connector health, sync status, endpoint, CRS, data flows
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const KL_INTEGRATIONS = [
  {
    id: "onemap", name: "One Map Policy (BIG)", feature: "13.1", status: "ok", icon: "map",
    desc: "Base mapping konsisten kebijakan Satu Peta · RBI official",
    proto: "WMS / WMTS", crs: "SRGI 2013", latency: "142ms", uptime: "99.9%", lastSync: "real-time",
    datasets: ["RBI 1:25.000", "Batas administrasi", "Toponimi nasional"],
    since: "Q3 2024", tor: "§1.2.3 #6.a",
  },
  {
    id: "inarisk", name: "InaRISK (BNPB)", feature: "13.2", status: "ok", icon: "alert-triangle",
    desc: "Indeks risiko bencana nasional · cross-validation hazard",
    proto: "REST API + WMS", crs: "EPSG:4326", latency: "180ms", uptime: "99.6%", lastSync: "2 jam lalu",
    datasets: ["Risiko banjir", "Risiko longsor", "Risiko gempa", "Kapasitas daerah"],
    since: "Q4 2024", tor: "§1.2.3 #6.b",
  },
  {
    id: "bmkg", name: "BMKG Climate Service", feature: "13.3", status: "ok", icon: "thermometer",
    desc: "Curah hujan, temperatur, peringatan dini · feed real-time",
    proto: "REST API + Kafka", crs: "EPSG:4326", latency: "95ms", uptime: "99.8%", lastSync: "5 menit lalu",
    datasets: ["Curah hujan harian", "Prakiraan cuaca", "Peringatan dini", "Data stasiun (138)"],
    since: "Q1 2025", tor: "§1.2.3 #6.c",
  },
  {
    id: "klhk", name: "KLHK SIGN-SMART", feature: "13.4", status: "degraded", icon: "factory",
    desc: "LULC, karhutla, deforestasi · WMS",
    proto: "WMS", crs: "EPSG:4326", latency: "1.2s", uptime: "97.2%", lastSync: "60 hari lalu",
    datasets: ["LULC nasional", "Kawasan hutan SK", "Hotspot karhutla", "Gambut"],
    since: "Q2 2025", tor: "§1.2.3 #6.d", note: "Latency tinggi 1.2s (vs target 500ms). WMS endpoint perlu optimasi.",
  },
  {
    id: "bps", name: "BPS Socio-Economic", feature: "13.5", status: "ok", icon: "users",
    desc: "Sensus, susenas, sakernas · API REST",
    proto: "REST API", crs: "—", latency: "210ms", uptime: "99.4%", lastSync: "30 hari lalu",
    datasets: ["Sensus 2020", "Susenas", "Sakernas", "PDB regional"],
    since: "Q1 2025", tor: "§1.2.3 #6.e",
  },
];

function KLIntegrations({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("onemap");
  const k = KL_INTEGRATIONS.find(x => x.id === selected);
  const okCount = KL_INTEGRATIONS.filter(x => x.status === "ok").length;

  return (
    <div className="feat-page kl-page" data-screen-label="Feature: Integrasi K/L">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("data")} className="link-btn">{tr("Katalog Data")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Integrasi K/L</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-data"><Icon name="git-branch" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 13.1–13.5 · INTEGRASI EKSTERNAL</div>
              <h1>Integrasi Kementerian/Lembaga</h1>
              <div className="feat-sub">5 konektor K/L: One Map BIG · InaRISK BNPB · BMKG · KLHK SIGN-SMART · BPS · live health monitoring</div>
            </div>
          </div>
          <div className="feat-actions"><button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button></div>
        </div>
      </div>

      <div className="kl-summary">
        <div className="kl-sum"><span className="status-dot online" /><strong>{okCount}/{KL_INTEGRATIONS.length}</strong> connector sehat</div>
        <div className="kl-sum"><Icon name="alert-triangle" size={14} style={{ color: "var(--warning-700)" }} /><strong>1</strong> degraded (KLHK)</div>
        <div className="kl-sum"><Icon name="database" size={14} /><strong>19</strong> dataset ter-sync</div>
        <div className="kl-sum"><Icon name="shield" size={14} />SRGI 2013 aligned</div>
      </div>

      <div className="kl-body">
        <aside className="kl-list">
          {KL_INTEGRATIONS.map(x => (
            <button key={x.id} className={`kl-conn ${selected === x.id ? "on" : ""}`} onClick={() => setSelected(x.id)}>
              <div className={`kl-conn-icon status-${x.status}`}><Icon name={x.icon} size={18} /></div>
              <div className="kl-conn-body">
                <div className="kl-conn-name">{x.name}</div>
                <div className="kl-conn-meta">FITUR {x.feature} · {x.proto}</div>
              </div>
              <span className="kl-conn-dot" style={{ background: x.status === "ok" ? "#2F7D5E" : "#C18820" }} />
            </button>
          ))}
        </aside>

        <div className="kl-detail">
          <div className="kl-detail-head">
            <div className={`kl-detail-icon status-${k.status}`}><Icon name={k.icon} size={24} /></div>
            <div className="kl-detail-title">
              <div className="kl-detail-name">{k.name}</div>
              <div className="kl-detail-desc">{k.desc}</div>
            </div>
            <span className={`mcp-status-pill ${k.status === "ok" ? "ok" : "degraded"}`}>{k.status === "ok" ? "HEALTHY" : "DEGRADED"}</span>
          </div>

          <div className="kl-stats">
            <div className="kl-stat"><div className="kl-stat-label">Protocol</div><div className="kl-stat-val">{k.proto}</div></div>
            <div className="kl-stat"><div className="kl-stat-label">CRS</div><div className="kl-stat-val">{k.crs}</div></div>
            <div className="kl-stat"><div className="kl-stat-label">Latency</div><div className="kl-stat-val" style={{ color: parseFloat(k.latency) > 500 || k.latency.includes("s") ? "var(--warning-700)" : "var(--gray-900)" }}>{k.latency}</div></div>
            <div className="kl-stat"><div className="kl-stat-label">Uptime</div><div className="kl-stat-val">{k.uptime}</div></div>
            <div className="kl-stat"><div className="kl-stat-label">Last sync</div><div className="kl-stat-val sm">{k.lastSync}</div></div>
            <div className="kl-stat"><div className="kl-stat-label">Sejak</div><div className="kl-stat-val sm">{k.since}</div></div>
          </div>

          {k.note && <div className="kl-note"><Icon name="alert-triangle" size={13} />{k.note}</div>}

          <div className="kl-datasets">
            <div className="kl-datasets-label">Dataset ter-sync ({k.datasets.length})</div>
            <div className="kl-ds-grid">
              {k.datasets.map(d => (
                <div key={d} className="kl-ds"><Icon name="check-circle" size={13} />{d}</div>
              ))}
            </div>
          </div>

          <div className="kl-flow">
            <div className="kl-flow-node ext">{k.name.split(" ")[0]}<span>K/L sumber</span></div>
            <div className="kl-flow-arrow"><Icon name="arrow-right" size={16} /><span className="kl-flow-proto">{k.proto}</span></div>
            <div className="kl-flow-node adapter">Adapter SDSS<span>CRS transform + cache</span></div>
            <div className="kl-flow-arrow"><Icon name="arrow-right" size={16} /></div>
            <div className="kl-flow-node platform">Platform<span>62 fitur</span></div>
          </div>

          <div className="kl-detail-actions">
            <button className="ghost-btn small"><Icon name="activity" size={12} />Health log</button>
            <button className="ghost-btn small"><Icon name="settings" size={12} />Config endpoint</button>
            <button className="ghost-btn small"><Icon name="loader" size={12} />Force re-sync</button>
            <span className="kl-tor">{k.tor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { KLIntegrations });
