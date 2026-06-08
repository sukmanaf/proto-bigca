// ============================================================
// Climate Modeling — Continuous Model Performance Monitor · FITUR 11.2
// Sumber: §11.2 — real-time MLOps: rolling metrics, drift detection,
// retraining trigger (MLflow). Multi-model registry.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const MM_MODELS = [
  { id: "crop", name: "Crop yield predictor", ver: "v2.1", status: "warning", mae: 0.42, maeTarget: 0.5, r2: 0.78, r2Target: 0.7, preds: 12400, validated: 8200, drift: true, driftFeat: "slope test (input features)" },
  { id: "flood", name: "Flood depth ensemble", ver: "v3.4", status: "good", mae: 0.18, maeTarget: 0.3, r2: 0.86, r2Target: 0.75, preds: 48200, validated: 31400, drift: false },
  { id: "fire", name: "Karhutla risk LightGBM", ver: "v1.8", status: "good", mae: 0.09, maeTarget: 0.15, r2: 0.81, r2Target: 0.7, preds: 28900, validated: 19200, drift: false },
  { id: "vuln", name: "Vulnerability scorer", ver: "v2.0", status: "critical", mae: 0.31, maeTarget: 0.25, r2: 0.62, r2Target: 0.7, preds: 6700, validated: 4100, drift: true, driftFeat: "population density distribution shift" },
  { id: "cc", name: "Carrying capacity CNN", ver: "v1.3", status: "good", mae: 0.07, maeTarget: 0.1, r2: 0.79, r2Target: 0.75, preds: 15300, validated: 9800, drift: false },
];

function mmStatusColor(s) { return s === "good" ? "#2F7D5E" : s === "warning" ? "#C18820" : "#8B1A1A"; }
function mmStatusLabel(s) { return s === "good" ? "GOOD" : s === "warning" ? "DRIFT WARNING" : "DEGRADED"; }

function ModelMonitor({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("crop");
  const m = MM_MODELS.find(x => x.id === selected);
  const [ack, setAck] = React.useState(false);

  React.useEffect(() => setAck(false), [selected]);

  const counts = {
    good: MM_MODELS.filter(x => x.status === "good").length,
    warning: MM_MODELS.filter(x => x.status === "warning").length,
    critical: MM_MODELS.filter(x => x.status === "critical").length,
  };

  return (
    <div className="feat-page mm-page" data-screen-label="Feature: Model Performance Monitor">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Model Performance Monitor</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="activity" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 11.2 · MLOps · VALIDATION</div>
              <h1>Continuous Model Performance Monitor</h1>
              <div className="feat-sub">Real-time tracking akurasi model in-production · drift detection (KS/Wasserstein) · auto-retraining trigger (MLflow)</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="external-link" size={14} />MLflow</button>
          </div>
        </div>
      </div>

      <div className="mm-summary">
        <div className="mm-sum good"><span className="mm-sum-dot" /><strong>{counts.good}</strong> Good</div>
        <div className="mm-sum warning"><span className="mm-sum-dot" /><strong>{counts.warning}</strong> Drift warning</div>
        <div className="mm-sum critical"><span className="mm-sum-dot" /><strong>{counts.critical}</strong> Degraded</div>
        <div className="mm-sum-meta">5 model in-production · 111.500 prediksi total · 72.700 ter-validasi</div>
      </div>

      <div className="mm-body">
        {/* model registry */}
        <aside className="mm-registry">
          <div className="rdtr-panel-head" style={{ padding: "0 0 10px" }}>Model Registry</div>
          <div className="mm-list">
            {MM_MODELS.map(x => (
              <button key={x.id} className={`mm-item ${selected === x.id ? "on" : ""}`} onClick={() => setSelected(x.id)}>
                <span className="mm-item-status" style={{ background: mmStatusColor(x.status) }} />
                <div className="mm-item-body">
                  <div className="mm-item-name">{x.name}</div>
                  <div className="mm-item-ver">{x.ver} · R² {x.r2}</div>
                </div>
                {x.drift && <Icon name="alert-triangle" size={13} className="mm-item-drift" />}
              </button>
            ))}
          </div>
        </aside>

        {/* detail */}
        <div className="mm-detail">
          <div className="mm-detail-head">
            <div>
              <div className="mm-detail-name">{m.name} <span className="mm-detail-ver">{m.ver}</span></div>
              <div className="mm-detail-sub">Last 90 days · {m.preds.toLocaleString("id-ID")} prediksi · {m.validated.toLocaleString("id-ID")} ter-validasi</div>
            </div>
            <span className="mm-status-pill" style={{ background: mmStatusColor(m.status) }}>{mmStatusLabel(m.status)}</span>
          </div>

          <div className="mm-metrics">
            <div className={`mm-metric ${m.mae <= m.maeTarget ? "ok" : "bad"}`}>
              <div className="mm-metric-label">MAE</div>
              <div className="mm-metric-val">{m.mae}</div>
              <div className="mm-metric-target">target ≤ {m.maeTarget} · {m.mae <= m.maeTarget ? "GOOD" : "OVER"}</div>
            </div>
            <div className={`mm-metric ${m.r2 >= m.r2Target ? "ok" : "bad"}`}>
              <div className="mm-metric-label">R²</div>
              <div className="mm-metric-val">{m.r2}</div>
              <div className="mm-metric-target">target ≥ {m.r2Target} · {m.r2 >= m.r2Target ? "GOOD" : "UNDER"}</div>
            </div>
            <div className="mm-metric">
              <div className="mm-metric-label">Validation rate</div>
              <div className="mm-metric-val">{Math.round(m.validated / m.preds * 100)}%</div>
              <div className="mm-metric-target">{m.validated.toLocaleString("id-ID")} / {m.preds.toLocaleString("id-ID")}</div>
            </div>
          </div>

          <div className="mm-chart-card">
            <div className="mm-chart-head">Rolling MAE — last 30 days {m.status !== "good" && <span className="mm-trend-warn">↑ slight upward trend last 7 days</span>}</div>
            <svg viewBox="0 0 600 150" className="mm-chart-svg">
              <line x1="40" y1="120" x2="585" y2="120" stroke="var(--gray-300)" />
              <line x1="40" y1="15" x2="40" y2="120" stroke="var(--gray-300)" />
              {/* target line */}
              <line x1="40" y1="55" x2="585" y2="55" stroke="var(--success-700)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="582" y="51" fontSize="9" fill="var(--success-700)" textAnchor="end">target {m.maeTarget}</text>
              {/* rolling MAE line */}
              <polyline points={mmSeries(m).map((y, i) => `${40 + i * 18.5},${y}`).join(" ")} fill="none" stroke={mmStatusColor(m.status)} strokeWidth="2" />
              {["−30d", "−20d", "−10d", "now"].map((l, i) => <text key={l} x={40 + i * 180} y="138" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{l}</text>)}
            </svg>
          </div>

          {m.drift ? (
            <div className="mm-drift-alert">
              <Icon name="alert-triangle" size={18} />
              <div className="mm-drift-body">
                <div className="mm-drift-title">Data drift terdeteksi</div>
                <div className="mm-drift-desc">{m.driftFeat} — distribusi fitur input bergeser signifikan (KS test p &lt; 0.01). Akurasi berisiko menurun lebih lanjut.</div>
              </div>
            </div>
          ) : (
            <div className="mm-nodrift"><Icon name="check-circle" size={16} />Tidak ada drift terdeteksi · distribusi fitur stabil</div>
          )}

          <div className="mm-actions">
            {m.drift && <button className="primary-btn" onClick={() => setRoute("feature-acm")}><Icon name="loader" size={14} />Schedule retraining</button>}
            <button className="ghost-btn"><Icon name="activity" size={14} />Investigate drift</button>
            <button className={`ghost-btn ${ack ? "active" : ""}`} onClick={() => setAck(!ack)}><Icon name="check-circle" size={14} />{ack ? "Acknowledged" : "Acknowledge"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function mmSeries(m) {
  // generate 30-pt rolling MAE; trend upward if not good
  const base = m.mae;
  const target = m.maeTarget;
  const baseY = 120 - (1 - base / (target * 1.6)) * 65 - 30;
  return Array.from({ length: 30 }, (_, i) => {
    const drift = m.status === "good" ? 0 : (i > 22 ? (i - 22) * 2.4 : 0);
    const noise = Math.sin(i * 0.8) * 4 + (((i * 17) % 7) - 3);
    return Math.max(20, Math.min(115, baseY - drift + noise));
  });
}

Object.assign(window, { ModelMonitor });
