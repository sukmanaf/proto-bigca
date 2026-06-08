// ============================================================
// AI — Predictive Modeling Framework (MLOps) · FITUR 6.3
// Sumber: §6.3 — forecast variabel iklim, auto-select model,
// confidence band, accuracy metrics, AutoML/MLflow
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const PM_VARS = [
  { id: "rainfall", label: "Curah hujan", unit: "mm/day", models: ["ConvLSTM", "Prophet"], horizon: "1–72 jam", mae: "4.2mm", r2: 0.78 },
  { id: "temp", label: "Temperatur harian", unit: "°C", models: ["LSTM", "Prophet"], horizon: "1–30 hari", mae: "0.8°C", r2: 0.84 },
  { id: "debit", label: "Debit sungai", unit: "m³/s", models: ["LSTM + physics"], horizon: "1–7 hari", mae: "12 m³/s", r2: 0.81 },
  { id: "fire", label: "Hotspot fire", unit: "count", models: ["XGBoost spatial"], horizon: "7 hari", mae: "3.1", r2: 0.76 },
  { id: "demand", label: "Demand listrik", unit: "MW", models: ["LSTM"], horizon: "1–24 jam", mae: "42 MW", r2: 0.91 },
];

const PM_MODELS = [
  { id: "auto", label: "Auto-select best", rec: true },
  { id: "convlstm", label: "ConvLSTM (radar-based)" },
  { id: "prophet", label: "Prophet (statistical)" },
  { id: "ensemble", label: "Ensemble (slower, akurat)" },
];

function PredictiveModeling({ setRoute, ctx, openAI }) {
  const [variable, setVariable] = React.useState("rainfall");
  const [horizon, setHorizon] = React.useState(7);
  const [conf, setConf] = React.useState(95);
  const [model, setModel] = React.useState("auto");
  const [forecasted, setForecasted] = React.useState(true);
  const [running, setRunning] = React.useState(false);

  const v = PM_VARS.find(x => x.id === variable);
  const usedModel = model === "auto" ? v.models[0] : PM_MODELS.find(m => m.id === model)?.label.split(" ")[0];

  const forecast = () => { setRunning(true); setForecasted(false); setTimeout(() => { setRunning(false); setForecasted(true); }, 1400); };

  return (
    <div className="feat-page pm-page" data-screen-label="Feature: Predictive Modeling">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Predictive Modeling Framework</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="trending-up" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.3 · AI · MLOps</div>
              <h1>Predictive Modeling Framework</h1>
              <div className="feat-sub">Framework ML forecast time-series · auto-select model + AutoML (PyCaret) + MLflow registry + Optuna tuning</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={() => setRoute("feature-modelmon")}><Icon name="activity" size={14} />Monitor</button>
            <button className="ghost-btn"><Icon name="external-link" size={14} />MLflow</button>
          </div>
        </div>
      </div>

      <div className="pm-body">
        <aside className="pm-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Variabel</div>
            <div className="fm-radio-col">
              {PM_VARS.map(x => (
                <button key={x.id} className={`fm-radio-row ${variable === x.id ? "on" : ""}`} onClick={() => setVariable(x.id)}>
                  <span className="fm-radio-dot" /><span>{x.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Parameter</div>
            <div className="pm-loc"><Icon name="map-pin" size={13} />AOI: <strong>Kab. Wajo</strong> <button className="link-btn">ubah</button></div>
            <label className="fm-field" style={{ marginTop: 10 }}>
              <span>Horizon: <strong>{horizon} hari</strong></span>
              <input type="range" min="1" max="14" value={horizon} onChange={e => setHorizon(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--primary-600)" }} />
            </label>
            <div className="pm-conf">
              <span className="muted">Confidence level:</span>
              <div className="seg-control" style={{ marginTop: 4 }}>
                {[80, 90, 95].map(c => <button key={c} className={`seg-btn ${conf === c ? "active" : ""}`} onClick={() => setConf(c)}>{c}%</button>)}
              </div>
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Model</div>
            <div className="fm-radio-col">
              {PM_MODELS.map(m => (
                <button key={m.id} className={`fm-radio-row ${model === m.id ? "on" : ""}`} onClick={() => setModel(m.id)}>
                  <span className="fm-radio-dot" /><span>{m.label}</span>
                  {m.rec && <span className="fm-radio-delta" style={{ color: "var(--success-700)" }}>rec</span>}
                </button>
              ))}
            </div>
            <button className="primary-btn rdtr-gen" onClick={forecast} disabled={running} style={{ marginTop: 12 }}>
              {running ? <><span className="whatif-spinner" />Forecasting…</> : <><Icon name="play" size={14} />Forecast</>}
            </button>
          </div>
        </aside>

        <div className="pm-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="trending-up" size={14} />Forecast {v.label} · {horizon} hari · {conf}% CI</div>
              <span className="pm-modelused">Model: <strong>{usedModel}</strong>{model === "auto" && " (auto)"}</span>
            </div>
            <div className="pm-chart-stage">
              <PMChart v={v} horizon={horizon} conf={conf} running={running} forecasted={forecasted} />
            </div>
          </div>
          <div className="pm-metrics-row">
            <div className="pm-metric"><div className="pm-metric-label">MAE (last validation)</div><div className="pm-metric-val">{v.mae}</div></div>
            <div className="pm-metric"><div className="pm-metric-label">R²</div><div className="pm-metric-val">{v.r2}</div></div>
            <div className="pm-metric"><div className="pm-metric-label">Horizon range</div><div className="pm-metric-val sm">{v.horizon}</div></div>
            <div className="pm-metric"><div className="pm-metric-label">Models tersedia</div><div className="pm-metric-val sm">{v.models.join(", ")}</div></div>
          </div>
        </div>

        <aside className="pm-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">AutoML Pipeline</div>
            <div className="pm-pipeline">
              {[
                { t: "Feature engineering", d: "lags, rolling stats, climate covariates" },
                { t: "Model search (PyCaret)", d: "8 kandidat dievaluasi" },
                { t: "Hyperparameter (Optuna)", d: "120 trials · TPE sampler" },
                { t: "Cross-validation", d: "time-series split, 5 fold" },
                { t: "Registry (MLflow)", d: "best model versioned + deployed" },
              ].map((s, i) => (
                <div key={i} className="pm-pipe-step">
                  <div className="pm-pipe-dot">{i + 1}</div>
                  <div><div className="pm-pipe-t">{s.t}</div><div className="pm-pipe-d">{s.d}</div></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rdtr-panel pm-best">
            <div className="rdtr-panel-head">Best model terpilih</div>
            <div className="pm-best-name">{usedModel} <span className="pm-best-ver">v2.3</span></div>
            <div className="pm-best-row"><span className="muted">CV score (R²)</span><strong>{v.r2}</strong></div>
            <div className="pm-best-row"><span className="muted">Inference</span><strong>0.3s</strong></div>
            <div className="pm-best-row"><span className="muted">vs baseline</span><strong style={{ color: "var(--success-700)" }}>+14% akurasi</strong></div>
          </div>
          <div className="pm-foot-actions">
            <button className="ghost-btn rdtr-full"><Icon name="activity" size={13} />Residual analysis</button>
            <button className="ghost-btn rdtr-full" onClick={() => setRoute("feature-ews")}><Icon name="zap" size={13} />Anomaly threshold</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function PMChart({ v, horizon, conf, running, forecasted }) {
  // observation (past) + forecast (future) with CI band
  const obs = [];
  for (let i = 0; i <= 14; i++) {
    const y = 90 - Math.sin(i * 0.7) * 22 - (Math.random() * 6);
    obs.push(`${30 + i * 16},${y}`);
  }
  const fc = [], upper = [], lower = [];
  const startX = 30 + 14 * 16, startY = 75;
  const bandW = (110 - conf) / 30;
  for (let i = 0; i <= horizon; i++) {
    const x = startX + i * 16;
    const y = startY - Math.sin((14 + i) * 0.7) * 20 + i * 1.5;
    fc.push(`${x},${y}`);
    upper.push(`${x},${y - i * 2.5 * bandW - 4}`);
    lower.push(`${x},${y + i * 2.5 * bandW + 4}`);
  }
  return (
    <svg viewBox="0 0 540 200" className="pm-chart-svg" preserveAspectRatio="xMidYMid meet">
      <rect width="540" height="200" fill="var(--surface,#fff)" />
      <line x1="30" y1="170" x2="525" y2="170" stroke="var(--gray-300)" />
      <line x1="30" y1="15" x2="30" y2="170" stroke="var(--gray-300)" />
      {/* now divider */}
      <line x1={30 + 14 * 16} y1="15" x2={30 + 14 * 16} y2="170" stroke="var(--gray-300)" strokeDasharray="3 2" />
      <text x={30 + 14 * 16} y="13" fontSize="9" fill="var(--gray-500)" textAnchor="middle">now</text>
      {forecasted && !running && (
        <>
          {/* CI band */}
          <polygon points={upper.concat(lower.slice().reverse()).join(" ")} fill="var(--primary-200)" opacity="0.4" />
          {/* forecast line */}
          <polyline points={fc.join(" ")} fill="none" stroke="var(--primary-600)" strokeWidth="2" strokeDasharray="5 3" />
        </>
      )}
      {/* observation */}
      <polyline points={obs.join(" ")} fill="none" stroke="var(--gray-700)" strokeWidth="2" />
      {obs.filter((_, i) => i % 2 === 0).map((p, i) => { const [x, y] = p.split(","); return <circle key={i} cx={x} cy={y} r="2.5" fill="var(--gray-700)" />; })}
      <text x="50" y="28" fontSize="9" fill="var(--gray-500)">{v.label} ({v.unit})</text>
      {running && <text x="270" y="100" fontSize="13" fill="var(--gray-500)" textAnchor="middle">⚙ Forecasting…</text>}
      {forecasted && !running && <text x="522" y="40" fontSize="9" fill="var(--primary-700)" textAnchor="end">{conf}% CI band</text>}
    </svg>
  );
}

Object.assign(window, { PredictiveModeling });
