// ============================================================
// AI — Federated Learning Infrastructure · FITUR 6.8
// Sumber: §6.8 — FedAvg coordinator/clients, privacy (DP/secure agg),
// training rounds, client status, global model convergence
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const FL_COHORTS = [
  { id: "disease", name: "Disease outbreak prediction", clients: 12, reason: "Data kesehatan sensitif per provinsi", round: 24, acc: 0.84, status: "training" },
  { id: "power", name: "Power demand forecasting", clients: 8, reason: "Data PLN per region terproteksi", round: 41, acc: 0.91, status: "converged" },
  { id: "crop", name: "Crop yield prediction", clients: 18, reason: "Data Kementan per provinsi", round: 17, acc: 0.78, status: "training" },
  { id: "anomaly", name: "Anomaly detection lokal", clients: 24, reason: "Data IoT proprietary", round: 33, acc: 0.86, status: "training" },
];

const FL_CLIENTS = [
  { name: "Prov. Jawa Barat", samples: "142K", status: "online", contrib: 0.18, lastSync: "baru saja" },
  { name: "Prov. Sulawesi Selatan", samples: "98K", status: "online", contrib: 0.14, lastSync: "12 dtk lalu" },
  { name: "Prov. Kalimantan Barat", samples: "76K", status: "online", contrib: 0.11, lastSync: "30 dtk lalu" },
  { name: "Prov. NTT", samples: "54K", status: "training", contrib: 0.08, lastSync: "sedang train" },
  { name: "Prov. Papua", samples: "32K", status: "offline", contrib: 0.05, lastSync: "2 jam lalu" },
  { name: "Prov. Jawa Timur", samples: "168K", status: "online", contrib: 0.21, lastSync: "8 dtk lalu" },
];

function FederatedLearning({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("disease");
  const [dp, setDp] = React.useState(true);
  const [secureAgg, setSecureAgg] = React.useState(true);
  const c = FL_COHORTS.find(x => x.id === selected);

  return (
    <div className="feat-page fl-page" data-screen-label="Feature: Federated Learning">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Federated Learning</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="git-branch" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.8 · AI · PRIVACY · BETA</div>
              <h1>Federated Learning Infrastructure</h1>
              <div className="feat-sub">Train model lintas-organisasi tanpa berbagi data raw · FedAvg + differential privacy · data tetap di provinsi</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="plus" size={14} />New cohort</button>
          </div>
        </div>
      </div>

      <div className="fl-body">
        {/* LEFT cohorts */}
        <aside className="fl-cohorts">
          <div className="rdtr-panel-head" style={{ padding: "0 0 10px" }}>Training Cohorts</div>
          <div className="fl-cohort-list">
            {FL_COHORTS.map(x => (
              <button key={x.id} className={`fl-cohort ${selected === x.id ? "on" : ""}`} onClick={() => setSelected(x.id)}>
                <div className="fl-cohort-head">
                  <span className="fl-cohort-name">{x.name}</span>
                  <span className={`fl-cohort-status ${x.status}`}>{x.status === "converged" ? "✓" : <span className="whatif-spinner" style={{ width: 9, height: 9 }} />}</span>
                </div>
                <div className="fl-cohort-meta">{x.clients} clients · round {x.round} · acc {x.acc}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* CENTER architecture + convergence */}
        <div className="fl-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="git-branch" size={14} />Arsitektur FedAvg · {c.name}</div>
              <span className={`mcp-status-pill ${c.status === "converged" ? "ok" : "degraded"}`}>{c.status === "converged" ? "CONVERGED" : `ROUND ${c.round}`}</span>
            </div>
            <div className="fl-arch"><FLArch clients={c.clients} /></div>
          </div>
          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="trending-up" size={14} />Global Model Convergence · accuracy per round</div>
            <div className="fl-conv"><FLConvergence cohort={c} /></div>
          </div>
        </div>

        {/* RIGHT clients + privacy */}
        <aside className="fl-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Privacy</div>
            <label className="fl-toggle-row"><span><strong>Differential Privacy</strong><small>add noise ke gradients (ε=2.0)</small></span><Toggle defaultOn={dp} /></label>
            <label className="fl-toggle-row"><span><strong>Secure Aggregation</strong><small>homomorphic encryption</small></span><Toggle defaultOn={secureAgg} /></label>
            <div className="fl-privacy-note"><Icon name="shield" size={12} />Hanya <strong>model updates</strong> dikirim ke coordinator — data raw tidak pernah keluar dari client.</div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Clients ({FL_CLIENTS.filter(c => c.status !== "offline").length}/{FL_CLIENTS.length} aktif)</div>
            <div className="fl-clients">
              {FL_CLIENTS.map((cl, i) => (
                <div key={i} className="fl-client">
                  <span className={`fl-client-dot ${cl.status}`} />
                  <div className="fl-client-body">
                    <div className="fl-client-name">{cl.name}</div>
                    <div className="fl-client-meta">{cl.samples} samples · {cl.lastSync}</div>
                  </div>
                  <div className="fl-client-contrib">{Math.round(cl.contrib * 100)}%</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Toggle({ defaultOn }) {
  const [on, setOn] = React.useState(defaultOn);
  return <button className={`toggle ${on ? "on" : ""}`} onClick={() => setOn(!on)}><span className="toggle-knob" /></button>;
}

function FLArch({ clients }) {
  const nodes = [
    { x: 90, y: 200, label: "Jabar" }, { x: 175, y: 240, label: "Sulsel" }, { x: 260, y: 250, label: "Kalbar" },
    { x: 345, y: 240, label: "NTT" }, { x: 430, y: 200, label: "Jatim" },
  ];
  return (
    <svg viewBox="0 0 520 280" className="fl-arch-svg" preserveAspectRatio="xMidYMid meet">
      {/* edges */}
      {nodes.map((n, i) => <line key={i} x1="260" y1="70" x2={n.x} y2={n.y} stroke="var(--primary-300)" strokeWidth="1.5" strokeDasharray="4 3" />)}
      {/* update flow arrows */}
      {nodes.map((n, i) => <circle key={"u"+i} r="3" fill="var(--accent-sea)"><animateMotion dur={`${1.6 + i*0.2}s`} repeatCount="indefinite" path={`M${n.x},${n.y} L260,70`} /></circle>)}
      {/* coordinator */}
      <circle cx="260" cy="70" r="34" fill="var(--primary-600)" />
      <text x="260" y="66" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="700">BIG</text>
      <text x="260" y="80" fontSize="8" fill="#fff" textAnchor="middle">Coordinator</text>
      <text x="260" y="120" fontSize="9" fill="var(--gray-600)" textAnchor="middle">Global Model + Aggregator</text>
      {/* clients */}
      {nodes.map((n, i) => (
        <g key={"n"+i}>
          <circle cx={n.x} cy={n.y} r="22" fill="var(--surface,#fff)" stroke="var(--primary-400)" strokeWidth="2" />
          <text x={n.x} y={n.y - 2} fontSize="14" textAnchor="middle">🗄</text>
          <text x={n.x} y={n.y + 12} fontSize="7" fill="var(--gray-600)" textAnchor="middle">{n.label}</text>
        </g>
      ))}
      <text x="260" y="275" fontSize="9" fill="var(--gray-500)" textAnchor="middle">↑ model updates only (bukan data raw) · {clients} clients</text>
    </svg>
  );
}

function FLConvergence({ cohort }) {
  const target = cohort.acc;
  const pts = [];
  for (let i = 0; i <= cohort.round; i++) {
    const acc = target * (1 - Math.exp(-i / 8)) + Math.sin(i) * 0.01;
    pts.push(`${30 + (i / cohort.round) * 460},${120 - acc * 110}`);
  }
  return (
    <svg viewBox="0 0 510 150" className="fl-conv-svg">
      <line x1="30" y1="120" x2="500" y2="120" stroke="var(--gray-300)" />
      <line x1="30" y1="10" x2="30" y2="120" stroke="var(--gray-300)" />
      <line x1="30" y1={120 - target * 110} x2="500" y2={120 - target * 110} stroke="var(--success-700)" strokeWidth="1" strokeDasharray="4 3" />
      <text x="496" y={116 - target * 110} fontSize="9" fill="var(--success-700)" textAnchor="end">target {target}</text>
      <polyline points={pts.join(" ")} fill="none" stroke="var(--primary-600)" strokeWidth="2" />
      <text x="30" y="138" fontSize="9" fill="var(--gray-500)">round 0</text>
      <text x="500" y="138" fontSize="9" fill="var(--gray-500)" textAnchor="end">round {cohort.round}</text>
    </svg>
  );
}

Object.assign(window, { FederatedLearning });
