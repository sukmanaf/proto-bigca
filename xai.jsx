// ============================================================
// AI — Explainable AI (XAI) Service · FITUR 6.9
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §6.9
// SHAP local + global + counterfactual + bias detection
// Service horizontal: jelaskan output model AI manapun
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

// Models that can be explained (horizontal service)
const XAI_MODELS = [
  { id: "cc", name: "Land Carrying Capacity", pred: "0.34", cat: "Moderate-Low", loc: "Cell H3-887c4d (Demak)", why: "limiting factor" },
  { id: "fire", name: "Forest Fire Prediction", pred: "0.74", cat: "Very High", loc: "Kalimantan Barat", why: "why this area at risk" },
  { id: "vuln", name: "Vulnerability Scoring", pred: "0.84", cat: "Sangat Tinggi", loc: "Kab. Wajo", why: "why this ranking" },
  { id: "anomaly", name: "Anomaly Detection", pred: "2.4σ", cat: "Flagged", loc: "Sungai Cenranae", why: "why flagged" },
];

// SHAP values per model (feature, value) — sorted by |value|
const XAI_SHAP = {
  cc: [
    { f: "Water availability", v: -0.15 },
    { f: "Flood risk", v: -0.12 },
    { f: "Slope", v: -0.04 },
    { f: "Aksesibilitas", v: +0.05 },
    { f: "Soil quality", v: +0.02 },
  ],
  fire: [
    { f: "FWI (fuel dryness)", v: +0.22 },
    { f: "ENSO (ONI +1.3)", v: +0.18 },
    { f: "Peatland proximity", v: +0.11 },
    { f: "NDMI moisture", v: -0.08 },
    { f: "Rainfall forecast", v: -0.06 },
  ],
  vuln: [
    { f: "Flood hazard", v: +0.19 },
    { f: "Adaptive capacity", v: +0.17 },
    { f: "Population exposure", v: +0.13 },
    { f: "Fiscal space", v: +0.09 },
    { f: "Infrastructure", v: -0.05 },
  ],
  anomaly: [
    { f: "Discharge spike", v: +0.28 },
    { f: "Upstream rainfall", v: +0.15 },
    { f: "Soil saturation", v: +0.10 },
    { f: "Tidal phase", v: +0.04 },
    { f: "Baseline drift", v: -0.03 },
  ],
};

const XAI_INTERP = {
  cc: "Lokasi ini memiliki keterbatasan utama pada ketersediaan air bersih dan risiko banjir tinggi. Aksesibilitas baik tapi tidak cukup untuk mengkompensasi.",
  fire: "Area ini berisiko sangat tinggi karena kombinasi fuel dryness ekstrem dan sinyal El Niño moderate. Proximity ke gambut memperburuk; curah hujan rendah tidak membantu.",
  vuln: "Ranking tinggi didorong oleh hazard banjir + rendahnya kapasitas adaptif. Eksposur populasi besar; ruang fiskal terbatas memperparah.",
  anomaly: "Di-flag karena lonjakan debit 2.4σ di atas baseline, dipicu hujan hulu + saturasi tanah. Bukan artefak drift sensor.",
};

const XAI_COUNTERFACTUAL = {
  cc: [
    { cond: "Ketersediaan air ditingkatkan 30%", res: "0.52" },
    { cond: "Tanggul flood control dibangun", res: "0.41" },
    { cond: "Keduanya dilakukan", res: "0.61", best: true },
  ],
  fire: [
    { cond: "ENSO mereda ke neutral", res: "0.48" },
    { cond: "Patroli + canal blocking gambut", res: "0.55" },
    { cond: "Hujan buatan + patroli", res: "0.32", best: true },
  ],
  vuln: [
    { cond: "Kapasitas adaptif +25%", res: "0.68" },
    { cond: "Drainase + EWS dipasang", res: "0.71" },
    { cond: "Paket adaptasi penuh", res: "0.59", best: true },
  ],
  anomaly: [
    { cond: "Hujan hulu turun 40%", res: "1.2σ" },
    { cond: "Normalisasi sungai", res: "1.6σ" },
    { cond: "Keduanya", res: "0.8σ", best: true },
  ],
};

function XAIService({ setRoute, ctx, openAI }) {
  const [modelId, setModelId] = React.useState("cc");
  const [tab, setTab] = React.useState("local");

  const model = XAI_MODELS.find(m => m.id === modelId);
  const shap = XAI_SHAP[modelId];
  const maxAbs = Math.max(...shap.map(s => Math.abs(s.v)));

  return (
    <div className="feat-page xai-page" data-screen-label="Feature: Explainable AI (XAI)">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Explainable AI (XAI)</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="eye" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.9 · AI · GOVERNANCE</div>
              <h1>Explainable AI (XAI) Service</h1>
              <div className="feat-sub">Transparansi keputusan AI · SHAP local + global + counterfactual + bias detection · service horizontal untuk semua model</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export report</button>
          </div>
        </div>
      </div>

      {/* model selector */}
      <div className="xai-models">
        <span className="xai-models-label">Jelaskan output model:</span>
        {XAI_MODELS.map(m => (
          <button key={m.id} className={`xai-model ${modelId === m.id ? "on" : ""}`} onClick={() => setModelId(m.id)}>
            {m.name}
          </button>
        ))}
      </div>

      <div className="xai-body">
        {/* prediction card */}
        <div className="xai-pred-card">
          <div className="xai-pred-label">Prediction</div>
          <div className="xai-pred-val">{model.pred}<span className="xai-pred-cat">{model.cat}</span></div>
          <div className="xai-pred-loc"><Icon name="map-pin" size={12} />{model.loc}</div>
          <div className="xai-pred-why">XAI: <em>{model.why}</em></div>
        </div>

        <div className="xai-main">
          <div className="xai-tabs">
            {[["local","Local (SHAP)"],["global","Global Importance"],["counter","Counterfactual"],["bias","Bias Detection"]].map(([k, l]) => (
              <button key={k} className={`xai-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
            ))}
          </div>

          {tab === "local" && (
            <div className="xai-pane">
              <div className="xai-pane-title">Top contributing factors (SHAP values)</div>
              <div className="xai-shap">
                <div className="xai-shap-axis">
                  <span>negatif ←</span><span className="xai-shap-zero">0</span><span>→ positif</span>
                </div>
                {shap.map((s, i) => (
                  <div key={i} className="xai-shap-row">
                    <span className="xai-shap-feat">{s.f}</span>
                    <div className="xai-shap-bar-zone">
                      <div className="xai-shap-center" />
                      {s.v < 0 ? (
                        <div className="xai-shap-bar neg" style={{ right: "50%", width: `${(Math.abs(s.v) / maxAbs) * 48}%` }} />
                      ) : (
                        <div className="xai-shap-bar pos" style={{ left: "50%", width: `${(s.v / maxAbs) * 48}%` }} />
                      )}
                    </div>
                    <span className={`xai-shap-val ${s.v < 0 ? "neg" : "pos"}`}>{s.v > 0 ? "+" : ""}{s.v.toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="xai-interp">
                <Icon name="info" size={14} />
                <span><strong>Interpretasi:</strong> {XAI_INTERP[modelId]}</span>
              </div>
            </div>
          )}

          {tab === "global" && (
            <div className="xai-pane">
              <div className="xai-pane-title">Global feature importance (permutation + PDP)</div>
              <div className="xai-global">
                {shap.slice().sort((a, b) => Math.abs(b.v) - Math.abs(a.v)).map((s, i) => (
                  <div key={i} className="xai-global-row">
                    <span className="xai-global-rank">#{i + 1}</span>
                    <span className="xai-global-feat">{s.f}</span>
                    <div className="xai-global-bar"><div style={{ width: `${(Math.abs(s.v) / maxAbs) * 100}%` }} /></div>
                    <span className="xai-global-val">{(Math.abs(s.v) / maxAbs * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
              <div className="xai-pdp">
                <div className="xai-pdp-title">Partial Dependence — {shap[0].f}</div>
                <svg viewBox="0 0 300 120" className="xai-pdp-svg">
                  <line x1="30" y1="100" x2="290" y2="100" stroke="var(--gray-300)" />
                  <line x1="30" y1="15" x2="30" y2="100" stroke="var(--gray-300)" />
                  <path d="M30,85 Q90,70 150,45 T290,25" fill="none" stroke="var(--primary-600)" strokeWidth="2" />
                  <text x="160" y="115" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{shap[0].f} →</text>
                </svg>
              </div>
            </div>
          )}

          {tab === "counter" && (
            <div className="xai-pane">
              <div className="xai-pane-title">Counterfactual — "Apa jika…?" (DiCE)</div>
              <div className="xai-counter">
                {XAI_COUNTERFACTUAL[modelId].map((c, i) => (
                  <div key={i} className={`xai-counter-row ${c.best ? "best" : ""}`}>
                    <div className="xai-counter-cond"><Icon name="git-branch" size={13} />{c.cond}</div>
                    <div className="xai-counter-arrow"><Icon name="arrow-right" size={14} /></div>
                    <div className="xai-counter-res">{model.pred} → <strong>{c.res}</strong>{c.best && <span className="xai-best-tag">terbaik</span>}</div>
                  </div>
                ))}
              </div>
              <button className="fm-crosslink" onClick={() => setRoute("feature-whatif")} style={{ marginTop: 10 }}>
                <Icon name="zap" size={14} /><span>Simulasikan di What-If Tool</span><Icon name="chevron-right" size={12} />
              </button>
            </div>
          )}

          {tab === "bias" && (
            <div className="xai-pane">
              <div className="xai-pane-title">Bias Detection (AIF360 fairness metrics)</div>
              <div className="xai-bias">
                {[
                  { metric: "Disparate Impact (region)", val: "0.94", ok: true, note: "≥ 0.8 — fair" },
                  { metric: "Statistical Parity Diff", val: "−0.03", ok: true, note: "≈ 0 — seimbang" },
                  { metric: "Equal Opportunity Diff", val: "0.06", ok: true, note: "< 0.1 — acceptable" },
                  { metric: "Coverage urban vs rural", val: "0.71", ok: false, note: "< 0.8 — perlu rebalancing data rural" },
                ].map((b, i) => (
                  <div key={i} className={`xai-bias-row ${b.ok ? "ok" : "warn"}`}>
                    <Icon name={b.ok ? "check-circle" : "alert-triangle"} size={15} />
                    <span className="xai-bias-metric">{b.metric}</span>
                    <span className="xai-bias-val">{b.val}</span>
                    <span className="xai-bias-note">{b.note}</span>
                  </div>
                ))}
              </div>
              <div className="xai-interp">
                <Icon name="shield" size={14} />
                <span>Model lulus 3/4 fairness check. <strong>Coverage rural</strong> perlu perbaikan — rekomendasi: augment training data desa terpencil.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { XAIService });
