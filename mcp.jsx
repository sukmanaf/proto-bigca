// ============================================================
// AI — MCP Server (Toolbox Bridge) · FITUR 6.7
// Sumber: §6.7 — middleware register tools (schema) → LLM tool call →
// validate+execute → return. Tool registry + schema + live call log.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const MCP_TOOLS = [
  { id: "flood_modeling", desc: "Hidrodinamika 2D simulasi banjir per return period & climate scenario", auth: "read:flood-modeling", latency: "180s", rate: "10/min", calls: 1240, status: "ok",
    inputs: [
      { k: "region", t: "GeoJSON", req: true, note: "AOI for simulation" },
      { k: "return_period", t: "enum [2,5,10,25,50,100]", req: false, note: "default 100" },
      { k: "climate_scenario", t: "enum [current,SSP1-2.6,SSP2-4.5,SSP3-7.0,SSP5-8.5]", req: false, note: "default current" },
      { k: "time_horizon", t: "integer [2024-2100]", req: false, note: "default 2024" },
    ],
    outputs: [
      { k: "hazard_map", t: "COG", note: "Flood depth raster" },
      { k: "affected_population", t: "integer" },
      { k: "affected_area_km2", t: "float" },
      { k: "alert_recommendations", t: "list[string]" },
    ],
  },
  { id: "vulnerability_assessment", desc: "MCDA multi-criteria vulnerability scoring per kab/kota", auth: "read:vulnerability", latency: "30s", rate: "20/min", calls: 3180, status: "ok", inputs: [], outputs: [] },
  { id: "mcda", desc: "Generic weighted overlay MCDA engine", auth: "read:mcda", latency: "10s", rate: "30/min", calls: 5420, status: "ok", inputs: [], outputs: [] },
  { id: "rdtr_suitability", desc: "Land suitability mapping per peruntukan RDTR", auth: "read:rdtr", latency: "45s", rate: "10/min", calls: 890, status: "ok", inputs: [], outputs: [] },
  { id: "detect_anomaly", desc: "Real-time anomaly detection dari stream data EWS", auth: "read:ews", latency: "5s", rate: "60/min", calls: 12400, status: "ok", inputs: [], outputs: [] },
  { id: "carbon_inventory", desc: "Net carbon footprint sektoral per wilayah", auth: "read:carbon", latency: "60s", rate: "10/min", calls: 420, status: "degraded", inputs: [], outputs: [] },
  { id: "renewable_optim", desc: "MILP renewable energy site optimization", auth: "read:renewable", latency: "120s", rate: "5/min", calls: 210, status: "ok", inputs: [], outputs: [] },
];

const MCP_CALLLOG = [
  { tool: "detect_anomaly", client: "NLP Query (6.5)", ms: 142, status: "200", when: "baru saja" },
  { tool: "flood_modeling", client: "AI Assistant", ms: 4820, status: "200", when: "12 dtk lalu" },
  { tool: "vulnerability_assessment", client: "NLP Query (6.5)", ms: 280, status: "200", when: "34 dtk lalu" },
  { tool: "carbon_inventory", client: "external API", ms: 1240, status: "503", when: "1 mnt lalu" },
  { tool: "mcda", client: "RDTR Toolbox (4.1)", ms: 95, status: "200", when: "2 mnt lalu" },
];

function MCPServer({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("flood_modeling");
  const t = MCP_TOOLS.find(x => x.id === selected);
  const totalCalls = MCP_TOOLS.reduce((a, x) => a + x.calls, 0);

  return (
    <div className="feat-page mcp-page" data-screen-label="Feature: MCP Server">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>MCP Server</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="git-branch" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.7 · AI · MIDDLEWARE · BETA</div>
              <h1>MCP Server (Toolbox Bridge)</h1>
              <div className="feat-sub">Model Context Protocol · jembatan LLM ↔ 62 toolbox geospasial · register schema, validate, execute</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="book-open" size={14} />Protocol docs</button>
            <button className="ghost-btn"><Icon name="plus" size={14} />Register tool</button>
          </div>
        </div>
      </div>

      <div className="mcp-summary">
        <div className="mcp-sum"><span className="status-dot online" /><strong>{MCP_TOOLS.length}</strong> tools terdaftar</div>
        <div className="mcp-sum"><Icon name="activity" size={14} /><strong>{totalCalls.toLocaleString("id-ID")}</strong> calls (30 hari)</div>
        <div className="mcp-sum"><Icon name="zap" size={14} /><strong>99.6%</strong> success rate</div>
        <div className="mcp-sum"><Icon name="git-branch" size={14} />Endpoint: <code>mcp://climate.big.go.id/v1</code></div>
      </div>

      <div className="mcp-body">
        <aside className="mcp-registry">
          <div className="rdtr-panel-head" style={{ padding: "0 0 10px" }}>Tool Registry</div>
          <div className="mcp-list">
            {MCP_TOOLS.map(x => (
              <button key={x.id} className={`mcp-item ${selected === x.id ? "on" : ""}`} onClick={() => setSelected(x.id)}>
                <span className="mcp-item-status" style={{ background: x.status === "ok" ? "#2F7D5E" : "#C18820" }} />
                <div className="mcp-item-body">
                  <div className="mcp-item-name">{x.id}</div>
                  <div className="mcp-item-calls">{x.calls.toLocaleString("id-ID")} calls</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="mcp-detail">
          <div className="mcp-schema-card">
            <div className="mcp-schema-head">
              <code className="mcp-tool-name">{t.id}</code>
              <span className={`mcp-status-pill ${t.status}`}>{t.status === "ok" ? "HEALTHY" : "DEGRADED"}</span>
            </div>
            <div className="mcp-tool-desc">{t.desc}</div>
            <div className="mcp-meta-row">
              <span><Icon name="shield" size={12} />auth: <code>{t.auth}</code></span>
              <span><Icon name="clock" size={12} />max latency: {t.latency}</span>
              <span><Icon name="zap" size={12} />rate: {t.rate}</span>
            </div>

            {t.inputs.length > 0 && (
              <div className="mcp-schema-block">
                <div className="mcp-schema-label">inputs</div>
                {t.inputs.map(io => (
                  <div key={io.k} className="mcp-io">
                    <code className="mcp-io-k">{io.k}{io.req && <span className="mcp-req">*</span>}</code>
                    <code className="mcp-io-t">{io.t}</code>
                    {io.note && <span className="mcp-io-note">{io.note}</span>}
                  </div>
                ))}
              </div>
            )}
            {t.outputs.length > 0 && (
              <div className="mcp-schema-block">
                <div className="mcp-schema-label">outputs</div>
                {t.outputs.map(io => (
                  <div key={io.k} className="mcp-io">
                    <code className="mcp-io-k">{io.k}</code>
                    <code className="mcp-io-t out">{io.t}</code>
                    {io.note && <span className="mcp-io-note">{io.note}</span>}
                  </div>
                ))}
              </div>
            )}
            {t.inputs.length === 0 && <div className="mcp-noschema">Schema lengkap tersedia di Protocol docs.</div>}
          </div>

          <div className="mcp-log-card">
            <div className="mcp-log-head"><Icon name="activity" size={13} />Live call log</div>
            <table className="mcp-log">
              <thead><tr><th>Tool</th><th>Client</th><th>Latency</th><th>Status</th><th>Waktu</th></tr></thead>
              <tbody>
                {MCP_CALLLOG.map((l, i) => (
                  <tr key={i}>
                    <td><code>{l.tool}</code></td>
                    <td>{l.client}</td>
                    <td className="mono">{l.ms}ms</td>
                    <td><span className={`mcp-code ${l.status === "200" ? "ok" : "err"}`}>{l.status}</span></td>
                    <td className="muted">{l.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MCPServer });
