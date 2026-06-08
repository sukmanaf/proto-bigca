// ============================================================
// AI — Scenario-Based Analysis Engine · FITUR 6.4
// Sumber: §6.4 — multi-objective optimization (NSGA-II), Latin
// Hypercube sampling, Pareto frontier, representative scenarios,
// AI-generated storyline narratives
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const SBA_OBJECTIVES = [
  { id: "loss", label: "Minimize loss (ekonomi)", on: true },
  { id: "pop", label: "Minimize populasi terdampak", on: true },
  { id: "eco", label: "Maximize co-benefit ekologi", on: true },
  { id: "budget", label: "Minimize budget", on: true },
];

const SBA_REPS = [
  { id: "cost", tag: "Best cost", color: "#0E5A78", loss: 42, pop: 31, eco: 48, budget: 380, desc: "Intervensi minimal, fokus efisiensi anggaran" },
  { id: "protect", tag: "Best protection", color: "#2F7D5E", loss: 18, pop: 12, eco: 62, budget: 1240, desc: "Proteksi maksimal, relokasi + tanggul" },
  { id: "balance", tag: "Best balance", color: "#C18820", loss: 26, pop: 19, eco: 74, budget: 620, desc: "Mangrove + drainase, BCR optimal", best: true },
  { id: "eco", tag: "Best eco co-benefit", color: "#5B8C5A", loss: 31, pop: 24, eco: 88, budget: 720, desc: "Restorasi ekosistem masif" },
  { id: "worst", tag: "Worst case (stress)", color: "#8B1A1A", loss: 78, pop: 64, eco: 22, budget: 180, desc: "Business-as-usual, untuk stress test" },
];

const SBA_STORYLINE = "Dalam **Balanced Path**, restorasi mangrove dimulai 2026 di 3 lokasi pesisir Demak-Sayung, dikombinasikan dengan retrofit drainase urban. Pada 2030, tutupan mangrove pulih 34% sementara populasi berisiko banjir turun dari 142.000 ke 89.000 jiwa. Investasi Rp 620 M menghasilkan benefit-cost ratio 3.4 — di atas baseline gray infrastructure (1.8). Co-benefit biodiversity tinggi: 8 koridor ekologis terpulihkan. Risiko residual tetap ada di zona inundasi 2050, memerlukan konversi peruntukan RDTR.";

function ScenarioEngine({ setRoute, ctx, openAI }) {
  const [objectives, setObjectives] = React.useState({ loss: true, pop: true, eco: true, budget: true });
  const [samples, setSamples] = React.useState(5000);
  const [generated, setGenerated] = React.useState(true);
  const [running, setRunning] = React.useState(false);
  const [selected, setSelected] = React.useState("balance");
  const [showNarrative, setShowNarrative] = React.useState(false);

  const sel = SBA_REPS.find(r => r.id === selected);

  const generate = () => { setRunning(true); setGenerated(false); setTimeout(() => { setRunning(false); setGenerated(true); }, 1800); };

  return (
    <div className="feat-page sba-page" data-screen-label="Feature: Scenario Engine">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Scenario-Based Analysis Engine</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="target" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.4 · AI · OPTIMIZATION</div>
              <h1>Scenario-Based Analysis Engine</h1>
              <div className="feat-sub">Multi-objective optimization NSGA-II · Latin Hypercube sampling · Pareto frontier + AI storyline narratives</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="primary-btn" onClick={() => setRoute("flow-scenario")}><Icon name="git-pull-request" size={14} />Save ke Scenario Manager</button>
          </div>
        </div>
      </div>

      <div className="sba-body">
        {/* LEFT objectives */}
        <aside className="sba-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Objective (multi)</div>
            <div className="sba-objectives">
              {SBA_OBJECTIVES.map(o => (
                <label key={o.id} className="fm-check"><input type="checkbox" checked={objectives[o.id]} onChange={e => setObjectives({ ...objectives, [o.id]: e.target.checked })} />{o.label}</label>
              ))}
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Sampling</div>
            <label className="fm-field">
              <span>Scenarios: <strong>{samples.toLocaleString("id-ID")}</strong></span>
              <input type="range" min="1000" max="10000" step="1000" value={samples} onChange={e => setSamples(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--primary-600)" }} />
            </label>
            <div className="sba-method"><Icon name="info" size={11} />Latin Hypercube + NSGA-II · evaluate via Impact Engine (5.3)</div>
            <button className="primary-btn rdtr-gen" onClick={generate} disabled={running} style={{ marginTop: 12 }}>
              {running ? <><span className="whatif-spinner" />Evaluating…</> : <><Icon name="play" size={14} />Generate & Evaluate</>}
            </button>
          </div>
        </aside>

        {/* CENTER pareto */}
        <div className="sba-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="activity" size={14} />Pareto Frontier · loss vs populasi vs cost</div>
              <span className="muted" style={{ fontSize: 11 }}>{generated ? `${samples.toLocaleString("id-ID")} evaluated · ${SBA_REPS.length} non-dominated` : "—"}</span>
            </div>
            <div className="sba-pareto-stage">
              <ParetoPlot reps={SBA_REPS} selected={selected} onSelect={setSelected} running={running} generated={generated} />
            </div>
          </div>
          <div className="sba-storyline">
            <div className="sba-story-head">
              <Icon name="sparkles" size={14} />AI-generated storyline · <strong>{sel.tag}</strong>
              <button className="link-btn" onClick={() => setShowNarrative(!showNarrative)} style={{ marginLeft: "auto" }}>{showNarrative ? "Ringkas" : "Baca penuh"}</button>
            </div>
            <div className="sba-story-body">
              {showNarrative ? sbaMd(SBA_STORYLINE) : <p>{SBA_STORYLINE.replace(/\*\*/g, "").slice(0, 180)}…</p>}
            </div>
          </div>
        </div>

        {/* RIGHT representative scenarios */}
        <aside className="sba-right">
          <div className="rdtr-panel-head" style={{ padding: "0 0 8px" }}>5 Representative Scenarios</div>
          <div className="sba-reps">
            {SBA_REPS.map(r => (
              <button key={r.id} className={`sba-rep ${selected === r.id ? "on" : ""}`} onClick={() => setSelected(r.id)} style={{ borderLeftColor: r.color }}>
                <div className="sba-rep-head">
                  <span className="sba-rep-tag">{r.tag}</span>
                  {r.best && <span className="sba-rep-best">★ rekomendasi</span>}
                </div>
                <div className="sba-rep-desc">{r.desc}</div>
                <div className="sba-rep-metrics">
                  <span>loss {r.loss}</span><span>pop {r.pop}k</span><span>eco {r.eco}</span><span>Rp {r.budget}M</span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ParetoPlot({ reps, selected, onSelect, running, generated }) {
  // x = budget (cost), y = loss; bubble size = pop; color = eco
  const xOf = (b) => 50 + (b / 1300) * 440;
  const yOf = (l) => 200 - (l / 90) * 170;
  // dominated cloud (background points)
  const cloud = [];
  for (let i = 0; i < 60; i++) {
    const b = 180 + Math.random() * 1100;
    const l = (90 - (b / 1300) * 50) + Math.random() * 30 + 10;
    cloud.push({ x: xOf(b), y: yOf(l) });
  }
  return (
    <svg viewBox="0 0 520 240" className="sba-pareto-svg" preserveAspectRatio="xMidYMid meet">
      <line x1="50" y1="210" x2="500" y2="210" stroke="var(--gray-300)" />
      <line x1="50" y1="20" x2="50" y2="210" stroke="var(--gray-300)" />
      <text x="270" y="232" fontSize="9" fill="var(--gray-500)" textAnchor="middle">Budget (Rp M) →</text>
      <text x="16" y="115" fontSize="9" fill="var(--gray-500)" textAnchor="middle" transform="rotate(-90 16 115)">Loss →</text>
      {generated && !running && (
        <>
          {/* dominated cloud */}
          {cloud.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="2" fill="var(--gray-300)" opacity="0.5" />)}
          {/* pareto frontier line */}
          <polyline points={reps.filter(r => r.id !== "worst").sort((a,b)=>a.budget-b.budget).map(r => `${xOf(r.budget)},${yOf(r.loss)}`).join(" ")} fill="none" stroke="var(--primary-400)" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* representative points */}
          {reps.map(r => {
            const isSel = selected === r.id;
            return (
              <g key={r.id} onClick={() => onSelect(r.id)} style={{ cursor: "pointer" }}>
                <circle cx={xOf(r.budget)} cy={yOf(r.loss)} r={isSel ? 11 : 7 + r.pop / 12} fill={r.color} fillOpacity={isSel ? 0.9 : 0.6} stroke="#fff" strokeWidth={isSel ? 2.5 : 1.5} />
                {isSel && <text x={xOf(r.budget)} y={yOf(r.loss) - 15} fontSize="9" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">{r.tag}</text>}
              </g>
            );
          })}
        </>
      )}
      {running && <text x="270" y="120" fontSize="13" fill="var(--gray-500)" textAnchor="middle">⚙ NSGA-II evaluating…</text>}
    </svg>
  );
}

function sbaMd(s) {
  return s.split(/(\*\*[^*]+\*\*)/).map((p, i) => p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <React.Fragment key={i}>{p}</React.Fragment>);
}

Object.assign(window, { ScenarioEngine });
