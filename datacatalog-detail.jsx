// ============================================================
// Data Catalog — Lineage (10.2) + Quality (10.3) + Versioning (10.5)
// Sumber: §10.2/10.3/10.5 — tabbed detail view
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const DQ_DATASETS = [
  { name: "Climate Proj v3.2", compl: 0.98, pos: 0.95, thm: 0.91, tmp: 0.99, cons: 0.98 },
  { name: "LULC 2024", compl: 0.96, pos: 0.93, thm: 0.87, tmp: 0.95, cons: 0.94 },
  { name: "Carbon Inventory 2024", compl: 0.92, pos: null, thm: 0.84, tmp: 0.98, cons: 0.91 },
  { name: "Flood Hazard v2", compl: 0.94, pos: 0.91, thm: 0.89, tmp: 0.92, cons: 0.95 },
  { name: "Sentinel-2 Sulsel", compl: 0.99, pos: 0.97, thm: 0.93, tmp: 0.88, cons: 0.97 },
];

const DQ_ISSUES = [
  "Carbon: 12% missing untuk dataset baru (auto-imputed)",
  "LULC: 4 tiles missing recent acquisition (refresh queued)",
  "Climate: 1 stasiun offline (BMKG)",
];

const DV_VERSIONS = [
  { v: "v3.2", date: "24 Mei 2026", by: "Data Pipeline", change: "+ Sentinel-2 Mei 2026, re-calibrate bias", current: true },
  { v: "v3.1", date: "12 Apr 2026", by: "Rina S.", change: "Update BMKG curah hujan Q1" },
  { v: "v3.0", date: "01 Mar 2026", by: "Data Pipeline", change: "Major: downscaling CMIP6 ensemble baru" },
  { v: "v2.4", date: "18 Jan 2026", by: "Budi P.", change: "Fix metadata CRS EPSG:4326" },
];

function qColor(v) { if (v == null) return "var(--gray-400)"; return v >= 0.95 ? "#2F7D5E" : v >= 0.88 ? "#C18820" : "#C44E37"; }

function DataCatalogDetail({ setRoute, ctx, openAI }) {
  const [tab, setTab] = React.useState("lineage");

  return (
    <div className="feat-page dcd-page" data-screen-label="Feature: Data Catalog Detail">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("data")} className="link-btn">{tr("Katalog Data")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Lineage · Quality · Versioning</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-data"><Icon name="database" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 10.2 · 10.3 · 10.5 · DATA MGMT</div>
              <h1>Data Lineage, Quality &amp; Versioning</h1>
              <div className="feat-sub">ISO 19157 quality · OpenLineage DAG · time-travel versioning · reproducibility analisis</div>
            </div>
          </div>
          <div className="feat-actions"><button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button></div>
        </div>
      </div>

      <div className="ca-tabs">
        {[["lineage","Data Lineage (10.2)"],["quality","Data Quality (10.3)"],["versioning","Data Versioning (10.5)"]].map(([k, l]) => (
          <button key={k} className={`ca-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === "lineage" && (
        <div className="dcd-lineage">
          <div className="dcd-lineage-q"><Icon name="search" size={13} />"Dari mana data <strong>Carbon kab Demak 2024</strong>?"</div>
          <div className="dcd-dag">
            <div className="dcd-dag-col">
              <div className="dcd-dag-label">Sources</div>
              {["KLHK SIGN-SMART", "BPS PDB", "Modul 2.2 LULC"].map(s => <div key={s} className="dcd-node source">{s}</div>)}
            </div>
            <div className="dcd-dag-arrow"><Icon name="arrow-right" size={18} /></div>
            <div className="dcd-dag-col">
              <div className="dcd-dag-label">Process</div>
              {["IPCC Tier 2 formula", "Spatial allocation", "Validation QA"].map(s => <div key={s} className="dcd-node process">{s}</div>)}
            </div>
            <div className="dcd-dag-arrow"><Icon name="arrow-right" size={18} /></div>
            <div className="dcd-dag-col">
              <div className="dcd-dag-label">Output</div>
              <div className="dcd-node output">Carbon Layer Demak 2024<span className="dcd-node-v">v3.2</span></div>
            </div>
          </div>
          <div className="dcd-repro">
            <Icon name="git-branch" size={13} />
            <span>Reproducibility metadata: input version <code>lulc-2024.v3</code> · params <code>tier2-default</code> · run <code>2026-05-24-1432</code> — analisis dapat di-reproduce penuh.</span>
          </div>
        </div>
      )}

      {tab === "quality" && (
        <div className="dcd-quality">
          <div className="dcd-q-card">
            <div className="rdtr-detail-head"><Icon name="check-circle" size={13} />Quality Scorecard · ISO 19157</div>
            <table className="dcd-qtable">
              <thead><tr><th>Dataset</th><th>Compl</th><th>PosAcc</th><th>ThmAcc</th><th>TmpQual</th><th>Cons</th></tr></thead>
              <tbody>
                {DQ_DATASETS.map(d => (
                  <tr key={d.name}>
                    <td className="dcd-qname">{d.name}</td>
                    {["compl","pos","thm","tmp","cons"].map(k => (
                      <td key={k}><span className="dcd-qscore" style={{ color: qColor(d[k]) }}>{d[k] == null ? "N/A" : d[k].toFixed(2)}</span></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="dcd-issues">
            <div className="rdtr-panel-head">Issues terdeteksi (7 hari) · {DQ_ISSUES.length}</div>
            {DQ_ISSUES.map((s, i) => <div key={i} className="dcd-issue"><Icon name="alert-triangle" size={13} />{s}</div>)}
            <div className="dcd-q-actions">
              <button className="ghost-btn small"><Icon name="bar-chart-3" size={12} />Set quality SLA</button>
              <button className="ghost-btn small"><Icon name="bell" size={12} />Alert config</button>
            </div>
          </div>
        </div>
      )}

      {tab === "versioning" && (
        <div className="dcd-versioning">
          <div className="dcd-ver-head">
            <span className="card-title"><Icon name="git-branch" size={14} />Climate Projection · version history</span>
            <button className="ghost-btn small"><Icon name="clock" size={12} />Time-travel API</button>
          </div>
          <div className="dcd-timeline">
            {DV_VERSIONS.map((v, i) => (
              <div key={v.v} className={`dcd-ver ${v.current ? "current" : ""}`}>
                <div className="dcd-ver-dot" />
                {i < DV_VERSIONS.length - 1 && <div className="dcd-ver-line" />}
                <div className="dcd-ver-body">
                  <div className="dcd-ver-head-row">
                    <span className="dcd-ver-tag">{v.v}</span>
                    {v.current && <span className="dcd-ver-current">current</span>}
                    <span className="dcd-ver-date">{v.date}</span>
                  </div>
                  <div className="dcd-ver-change">{v.change}</div>
                  <div className="dcd-ver-by">oleh {v.by}</div>
                  {!v.current && <button className="link-btn">Restore / compare →</button>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DataCatalogDetail });
