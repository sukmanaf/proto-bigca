// ============================================================
// Collaboration — Scenario Comparison Tool (Group) · FITUR 7.3
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §7.3
// Side-by-side comparison: sync maps, KPI table, group voting
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const SC_PATHS = [
  {
    id: "A", name: "Path A", tag: "Green / Mangrove", color: "#2F7D5E",
    layers: { banjir: true, slr: true, karhutla: false },
    kpis: { pop: "142k", cost: "IDR 380 M", bcr: "4.2", time: "18 bln", co: "Tinggi" },
    votes: 12,
  },
  {
    id: "B", name: "Path B", tag: "Gray / Tanggul", color: "#6B7B74",
    layers: { banjir: true, slr: true, karhutla: false },
    kpis: { pop: "89k", cost: "IDR 720 M", bcr: "2.8", time: "36 bln", co: "Rendah" },
    votes: 5,
  },
  {
    id: "C", name: "Path C", tag: "Relocation", color: "#C44E37",
    layers: { banjir: false, slr: true, karhutla: false },
    kpis: { pop: "24k", cost: "IDR 1.2 T", bcr: "1.5", time: "60 bln", co: "Sedang" },
    votes: 3,
  },
];

const SC_KPI_ROWS = [
  { k: "Populasi tersisa berisiko", f: "pop", best: "C", lowerBetter: true },
  { k: "Biaya total", f: "cost", best: "A", lowerBetter: true },
  { k: "Benefit/Cost ratio", f: "bcr", best: "A", lowerBetter: false },
  { k: "Waktu deploy", f: "time", best: "A", lowerBetter: true },
  { k: "Co-benefit ekologis", f: "co", best: "A", lowerBetter: false },
];

function ScenarioComparison({ setRoute, ctx, openAI }) {
  const [votes, setVotes] = React.useState({ A: 12, B: 5, C: 3 });
  const [myVote, setMyVote] = React.useState(null);
  const [zoom, setZoom] = React.useState(1);

  const total = votes.A + votes.B + votes.C;
  const cast = (id) => {
    if (myVote === id) return;
    const next = { ...votes };
    if (myVote) next[myVote] -= 1;
    next[id] += 1;
    setVotes(next); setMyVote(id);
  };

  return (
    <div className="feat-page sc-page" data-screen-label="Feature: Scenario Comparison">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("collab")} className="link-btn">{tr("Kolaborasi")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Scenario Comparison</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-collab"><Icon name="git-pull-request" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 7.3 · COLLABORATION</div>
              <h1>Scenario Comparison Tool</h1>
              <div className="feat-sub">Bandingkan 2-4 skenario side-by-side · peta sinkron, KPI table, group voting · untuk group decision</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={() => setRoute("flow-group")}><Icon name="users" size={14} />Buka di Group Room</button>
            <button className="ghost-btn"><Icon name="plus" size={14} />Add path</button>
          </div>
        </div>
      </div>

      {/* sync controls */}
      <div className="sc-synccontrol">
        <Icon name="map-pin" size={13} />
        <span>Peta tersinkron (pan/zoom bersamaan)</span>
        <div className="sc-zoom">
          <button onClick={() => setZoom(z => Math.max(0.8, z - 0.1))}><Icon name="zoom-out" size={13} /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}><Icon name="zoom-in" size={13} /></button>
        </div>
        <span className="sc-sync-badge"><span className="status-dot online" />sinkron aktif</span>
      </div>

      {/* comparison columns */}
      <div className="sc-columns">
        {SC_PATHS.map(p => {
          const pct = total ? Math.round((votes[p.id] / total) * 100) : 0;
          return (
            <div key={p.id} className={`sc-col ${myVote === p.id ? "voted" : ""}`}>
              <div className="sc-col-head" style={{ borderTopColor: p.color }}>
                <div className="sc-col-name">{p.name}</div>
                <div className="sc-col-tag" style={{ color: p.color }}>{p.tag}</div>
              </div>
              <div className="sc-map">
                <div style={{ transform: `scale(${zoom})`, transformOrigin: "center", width: "100%", height: "100%" }}>
                  <window.MapSurface layers={p.layers} crisis={false} onHover={() => {}} />
                </div>
              </div>
              <div className="sc-kpis">
                {SC_KPI_ROWS.map(row => (
                  <div key={row.f} className={`sc-kpi-row ${row.best === p.id ? "best" : ""}`}>
                    <span className="sc-kpi-k">{row.k}</span>
                    <span className="sc-kpi-v">{p.kpis[row.f]}{row.best === p.id && <Icon name="check-circle" size={11} />}</span>
                  </div>
                ))}
              </div>
              <div className="sc-vote">
                <div className="sc-vote-bar"><div style={{ width: `${pct}%`, background: p.color }} /></div>
                <div className="sc-vote-meta"><strong>{pct}%</strong> · {votes[p.id]}/{total} suara</div>
                <button className={`sc-vote-btn ${myVote === p.id ? "on" : ""}`} onClick={() => cast(p.id)}>
                  {myVote === p.id ? <><Icon name="check-circle" size={13} />Suara Anda</> : "Pilih path ini"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="sc-footer">
        <div className="sc-winner">
          <Icon name="sparkles" size={14} />
          <span><strong>Path A (Green/Mangrove)</strong> unggul: BCR tertinggi (4.2), biaya terendah, deploy tercepat, co-benefit ekologis tinggi. AI merekomendasikan Path A.</span>
        </div>
        <div className="sc-foot-actions">
          <button className="ghost-btn"><Icon name="message-square" size={14} />Request discussion</button>
          <button className="ghost-btn" onClick={() => setRoute("feature-mcda")}><Icon name="bar-chart-3" size={14} />Detail MCDA</button>
          <button className="primary-btn"><Icon name="download" size={14} />Export comparison</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ScenarioComparison });
