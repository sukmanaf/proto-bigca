// ============================================================
// Vulnerability — Dynamic Vulnerability System Modeling · FITUR 3.2
// Sumber: §3.2 — System Dynamics: stocks/flows/feedback loops,
// trajectory 10-30yr, test intervention policies, leverage points
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

function DynamicVulnerability({ setRoute, ctx, openAI }) {
  const [adaptInvest, setAdaptInvest] = React.useState(8);   // anggaran adaptasi M/yr
  const [climateStress, setClimateStress] = React.useState(18); // % peningkatan hazard
  const [horizon, setHorizon] = React.useState(20);
  const [policy, setPolicy] = React.useState("baseline");

  // System Dynamics mock: vulnerability(t) from AC stock vs hazard
  const series = React.useMemo(() => {
    const policyMult = policy === "aggressive" ? 1.8 : policy === "minimal" ? 0.4 : 1.0;
    const pts = [];
    let ac = 0.42; // adaptive capacity stock init
    let vuln = 0.84;
    for (let t = 0; t <= horizon; t++) {
      const investFlow = (adaptInvest / 100) * policyMult * 0.6;
      const hazardGrowth = (climateStress / 100) * (t / horizon);
      ac = Math.min(0.95, ac + investFlow * (1 - ac) - hazardGrowth * 0.04); // R1 build + B1 deplete
      vuln = Math.max(0.1, Math.min(0.99, (0.6 + hazardGrowth) * (1 - ac * 0.7)));
      pts.push({ t: 2026 + t, vuln: +vuln.toFixed(2), ac: +ac.toFixed(2) });
    }
    return pts;
  }, [adaptInvest, climateStress, horizon, policy]);

  const final = series[series.length - 1];
  const start = series[0];

  return (
    <div className="feat-page dv-page" data-screen-label="Feature: Dynamic Vulnerability">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("vulnerability")} className="link-btn">{tr("Kerentanan")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Dynamic Vulnerability System Modeling</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-vulnerability"><Icon name="git-branch" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 3.2 · VULNERABILITY · SYSTEM DYNAMICS</div>
              <h1>Dynamic Vulnerability System Modeling</h1>
              <div className="feat-sub">Bagaimana vulnerability berubah seiring waktu · stocks/flows/feedback loops · test intervensi & leverage points</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={() => setRoute("feature-vuln")}><Icon name="alert-triangle" size={14} />Static MCDA</button>
          </div>
        </div>
      </div>

      <div className="dv-body">
        {/* LEFT controls */}
        <aside className="dv-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Parameter Sistem</div>
            <label className="fm-field"><span>Anggaran adaptasi: <strong>Rp {adaptInvest}M/th</strong></span><input type="range" min="0" max="30" value={adaptInvest} onChange={e => setAdaptInvest(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--success-500)" }} /></label>
            <label className="fm-field" style={{ marginTop: 10 }}><span>Tekanan iklim (hazard +): <strong>{climateStress}%</strong></span><input type="range" min="0" max="40" value={climateStress} onChange={e => setClimateStress(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--danger-500)" }} /></label>
            <label className="fm-field" style={{ marginTop: 10 }}><span>Horizon: <strong>{horizon} tahun</strong></span><input type="range" min="10" max="30" value={horizon} onChange={e => setHorizon(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--primary-600)" }} /></label>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Kebijakan Intervensi</div>
            <div className="fm-radio-col">
              {[["minimal","Minimal (BAU)"],["baseline","Baseline RPJMD"],["aggressive","Aggressive adaptation"]].map(([k, l]) => (
                <button key={k} className={`fm-radio-row ${policy === k ? "on" : ""}`} onClick={() => setPolicy(k)}><span className="fm-radio-dot" /><span>{l}</span></button>
              ))}
            </div>
          </div>
          <div className="rdtr-panel dv-leverage">
            <div className="rdtr-panel-head">Leverage Points</div>
            <div className="dv-lev"><Icon name="zap" size={12} />Investment flow → AC (R1 reinforcing)</div>
            <div className="dv-lev"><Icon name="zap" size={12} />Asset protection (B1 balancing)</div>
            <div className="dv-lev"><Icon name="alert-triangle" size={12} />Poverty lock-in (R2) — perlu intervensi sosial</div>
          </div>
        </aside>

        {/* CENTER */}
        <div className="dv-center">
          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="trending-up" size={14} />Trajectory Vulnerability vs Adaptive Capacity · {start.t}–{final.t}</div>
            <div className="dv-chart"><DVChart series={series} /></div>
            <div className="dv-outcome">
              <div className="dv-out"><span>Vulnerability {start.t}</span><strong>{start.vuln}</strong></div>
              <Icon name="arrow-right" size={14} />
              <div className="dv-out"><span>Vulnerability {final.t}</span><strong style={{ color: final.vuln < start.vuln ? "var(--success-700)" : "var(--danger-700)" }}>{final.vuln}</strong></div>
              <div className="dv-out alt"><span>Adaptive capacity {final.t}</span><strong style={{ color: "var(--success-700)" }}>{final.ac}</strong></div>
            </div>
          </div>

          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="git-branch" size={14} />Stock-Flow Diagram (Causal Loop)</div>
            <div className="dv-sfd"><DVStockFlow /></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DVChart({ series }) {
  const n = series.length;
  const xOf = (i) => 40 + (i / (n - 1)) * 540;
  const yOf = (v) => 160 - v * 140;
  const vulnPath = series.map((p, i) => `${xOf(i)},${yOf(p.vuln)}`).join(" ");
  const acPath = series.map((p, i) => `${xOf(i)},${yOf(p.ac)}`).join(" ");
  return (
    <svg viewBox="0 0 600 190" className="dv-chart-svg">
      <line x1="40" y1="160" x2="585" y2="160" stroke="var(--gray-300)" />
      <line x1="40" y1="15" x2="40" y2="160" stroke="var(--gray-300)" />
      {[0,0.25,0.5,0.75,1].map(v => <text key={v} x="34" y={yOf(v)+3} fontSize="8" fill="var(--gray-500)" textAnchor="end">{v}</text>)}
      <polyline points={vulnPath} fill="none" stroke="var(--danger-600)" strokeWidth="2.5" />
      <polyline points={acPath} fill="none" stroke="var(--success-600,#2F7D5E)" strokeWidth="2.5" strokeDasharray="5 3" />
      <text x={xOf(n-1)} y={yOf(series[n-1].vuln)-6} fontSize="9" fill="var(--danger-700)" textAnchor="end">Vulnerability</text>
      <text x={xOf(n-1)} y={yOf(series[n-1].ac)+12} fontSize="9" fill="var(--success-700)" textAnchor="end">Adaptive Capacity</text>
      <text x="40" y="178" fontSize="8" fill="var(--gray-500)">{series[0].t}</text>
      <text x="585" y="178" fontSize="8" fill="var(--gray-500)" textAnchor="end">{series[n-1].t}</text>
    </svg>
  );
}

function DVStockFlow() {
  return (
    <svg viewBox="0 0 600 220" className="dv-sfd-svg" preserveAspectRatio="xMidYMid meet">
      {/* stocks */}
      <g>
        <rect x="40" y="30" width="120" height="46" rx="6" fill="var(--info-50)" stroke="var(--info-500)" />
        <text x="100" y="50" fontSize="11" fill="var(--info-700)" textAnchor="middle" fontWeight="600">Exposure</text>
        <text x="100" y="64" fontSize="8" fill="var(--info-700)" textAnchor="middle">populasi & aset</text>

        <rect x="240" y="30" width="120" height="46" rx="6" fill="var(--danger-50)" stroke="var(--danger-500)" />
        <text x="300" y="50" fontSize="11" fill="var(--danger-700)" textAnchor="middle" fontWeight="600">Impact</text>
        <text x="300" y="64" fontSize="8" fill="var(--danger-700)" textAnchor="middle">loss & damage</text>

        <rect x="240" y="150" width="120" height="46" rx="6" fill="var(--success-50)" stroke="var(--success-500)" />
        <text x="300" y="170" fontSize="11" fill="var(--success-700)" textAnchor="middle" fontWeight="600">Adaptive Cap.</text>
        <text x="300" y="184" fontSize="8" fill="var(--success-700)" textAnchor="middle">infra/SDM/fiskal</text>

        <rect x="440" y="90" width="120" height="46" rx="6" fill="var(--warning-50)" stroke="var(--warning-500)" />
        <text x="500" y="110" fontSize="11" fill="var(--warning-700)" textAnchor="middle" fontWeight="600">Vulnerability</text>
        <text x="500" y="124" fontSize="8" fill="var(--warning-700)" textAnchor="middle">composite</text>
      </g>
      {/* flows */}
      <g stroke="var(--gray-400)" strokeWidth="1.5" fill="none" markerEnd="url(#dv-arrow)">
        <path d="M160,53 L240,53" />
        <path d="M300,76 L300,150" />
        <path d="M360,170 Q420,170 440,128" />
        <path d="M360,53 Q420,53 440,92" />
      </g>
      {/* feedback loop label */}
      <path d="M300,150 Q200,120 240,76" stroke="var(--success-500)" strokeWidth="1.2" fill="none" strokeDasharray="3 3" markerEnd="url(#dv-arrow)" />
      <text x="180" y="118" fontSize="8" fill="var(--success-700)">R1: invest→AC→↓impact</text>
      <defs>
        <marker id="dv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="var(--gray-400)" /></marker>
      </defs>
      <text x="20" y="14" fontSize="9" fill="var(--gray-500)">Climate hazard → Exposure → Impact ⇄ Adaptive Capacity → Vulnerability (feedback)</text>
    </svg>
  );
}

Object.assign(window, { DynamicVulnerability });
