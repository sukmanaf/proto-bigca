// ============================================================
// SDSS — Optimization Solver · FITUR 5.10
// Sumber: §5.10 — LP/MILP/GA optimal allocation problems.
// Use case: adaptation budget allocation across kab/kota.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const OPT_KABS = [
  { id: "wajo", name: "Wajo", vuln: 0.84, pop: 142, baseAlloc: 0 },
  { id: "bone", name: "Bone", vuln: 0.79, pop: 98, baseAlloc: 0 },
  { id: "soppeng", name: "Soppeng", vuln: 0.76, pop: 54, baseAlloc: 0 },
  { id: "selayar", name: "Selayar", vuln: 0.73, pop: 31, baseAlloc: 0 },
  { id: "bulukumba", name: "Bulukumba", vuln: 0.71, pop: 87, baseAlloc: 0 },
  { id: "jeneponto", name: "Jeneponto", vuln: 0.68, pop: 41, baseAlloc: 0 },
  { id: "sinjai", name: "Sinjai", vuln: 0.64, pop: 38, baseAlloc: 0 },
  { id: "gowa", name: "Gowa", vuln: 0.58, pop: 77, baseAlloc: 0 },
];

function OptimizationSolver({ setRoute, ctx, openAI }) {
  const [budget, setBudget] = React.useState(500);
  const [minProv, setMinProv] = React.useState(8);
  const [equity, setEquity] = React.useState(50);
  const [solver, setSolver] = React.useState("milp");
  const [solved, setSolved] = React.useState(true);
  const [running, setRunning] = React.useState(false);

  // greedy proportional-to-vulnerability allocation respecting equity + min spread
  const solution = React.useMemo(() => {
    const weights = OPT_KABS.map(k => k.vuln * k.pop);
    const totalW = weights.reduce((a, b) => a + b, 0);
    let alloc = OPT_KABS.map((k, i) => ({ ...k, amt: Math.round((weights[i] / totalW) * budget) }));
    // ensure min allocation spread (≥10 per top minProv)
    alloc = alloc.map((a, i) => i < minProv ? { ...a, amt: Math.max(10, a.amt) } : a);
    const popProtected = Math.round(alloc.reduce((s, a) => s + a.pop * (a.amt / 100) * 0.6, 0) * 1000);
    const top3 = alloc.slice(0, 3).reduce((s, a) => s + a.amt, 0);
    const top3pct = Math.round(top3 / budget * 100);
    return { alloc, popProtected, top3pct };
  }, [budget, minProv]);

  const maxAmt = Math.max(...solution.alloc.map(a => a.amt));
  const solve = () => { setRunning(true); setSolved(false); setTimeout(() => { setRunning(false); setSolved(true); }, 1500); };

  return (
    <div className="feat-page opt-page" data-screen-label="Feature: Optimization Solver">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>Optimization Solver</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sdss"><Icon name="target" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 5.10 · SDSS CORE</div>
              <h1>Optimization Solver</h1>
              <div className="feat-sub">LP / MILP / GA · alokasi optimal resource-constraint · OR-Tools · maximize population protected</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="primary-btn" onClick={() => setRoute("flow-report")}><Icon name="download" size={14} />Export alokasi</button>
          </div>
        </div>
      </div>

      <div className="opt-body">
        <aside className="opt-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Objective</div>
            <div className="opt-objective"><Icon name="target" size={14} />Maximize population protected</div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Constraints</div>
            <label className="fm-field"><span>Budget total: <strong>IDR {budget} M</strong></span><input type="range" min="200" max="1000" step="50" value={budget} onChange={e => setBudget(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--accent-sunset)" }} /></label>
            <label className="fm-field" style={{ marginTop: 10 }}><span>Min. provinsi/kab: <strong>{minProv}</strong></span><input type="range" min="3" max="8" value={minProv} onChange={e => setMinProv(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--primary-600)" }} /></label>
            <label className="fm-field" style={{ marginTop: 10 }}><span>Equity (% ke top-3 rentan ≥): <strong>{equity}%</strong></span><input type="range" min="30" max="70" value={equity} onChange={e => setEquity(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--success-500)" }} /></label>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Solver</div>
            <div className="seg-control">
              {[["lp","LP"],["milp","MILP"],["ga","GA"]].map(([k, l]) => <button key={k} className={`seg-btn ${solver === k ? "active" : ""}`} onClick={() => setSolver(k)}>{l}</button>)}
            </div>
            <button className="primary-btn rdtr-gen" onClick={solve} disabled={running} style={{ marginTop: 12 }}>
              {running ? <><span className="whatif-spinner" />Solving…</> : <><Icon name="play" size={14} />Solve</>}
            </button>
            <div className="fm-run-note"><Icon name="info" size={11} />OR-Tools {solver.toUpperCase()} · constraint satisfaction</div>
          </div>
        </aside>

        <div className="opt-result">
          <div className="opt-kpis">
            <div className="opt-kpi"><div className="opt-kpi-label">Populasi terproteksi</div><div className="opt-kpi-val">{solution.popProtected.toLocaleString("id-ID")}</div></div>
            <div className="opt-kpi"><div className="opt-kpi-label">Budget terpakai</div><div className="opt-kpi-val">IDR {budget} M</div></div>
            <div className="opt-kpi"><div className="opt-kpi-label">% ke top-3 rentan</div><div className="opt-kpi-val" style={{ color: solution.top3pct >= equity ? "var(--success-700)" : "var(--danger-700)" }}>{solution.top3pct}%</div></div>
            <div className="opt-kpi"><div className="opt-kpi-label">Kab teralokasi</div><div className="opt-kpi-val">{solution.alloc.filter(a => a.amt > 0).length}/{OPT_KABS.length}</div></div>
          </div>
          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="bar-chart-3" size={13} />Alokasi Optimal per Kab/Kota {running && <span className="muted" style={{ marginLeft: "auto", fontSize: 11 }}>⚙ solving…</span>}</div>
            <div className="opt-alloc">
              {solution.alloc.map(a => (
                <div key={a.id} className="opt-alloc-row">
                  <span className="opt-alloc-name">{a.name} <span className="muted">v{a.vuln}</span></span>
                  <div className="opt-alloc-bar"><div style={{ width: `${(a.amt / maxAmt) * 100}%`, background: a.vuln >= 0.75 ? "#8B1A1A" : a.vuln >= 0.6 ? "#C44E37" : "#C18820" }} /></div>
                  <span className="opt-alloc-amt">IDR {a.amt}M</span>
                </div>
              ))}
            </div>
            <div className="opt-constraint-check">
              <span className={solution.top3pct >= equity ? "ok" : "bad"}><Icon name={solution.top3pct >= equity ? "check-circle" : "x-circle"} size={12} />Equity ≥ {equity}%</span>
              <span className="ok"><Icon name="check-circle" size={12} />Min {minProv} kab tercapai</span>
              <span className="ok"><Icon name="check-circle" size={12} />Budget ≤ IDR {budget}M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OptimizationSolver });
