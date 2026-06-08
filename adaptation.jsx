// ============================================================
// SDSS — Customizable Adaptation Recommendation · FITUR 5.4
// Sumber: §5.4 — knowledge base ~50-80 aksi adaptasi, fitness scoring
// per profil area, ranked recommendation cards, bundle paket
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const ADAPT_LIB = [
  { id: "mangrove", name: "Restorasi Mangrove", hazard: ["banjir", "slr"], sector: "Lingkungan", cost: "IDR 24-50 jt/ha", timeline: "18 bln", agency: "KLHK", eff: 0.88, co: 0.92, costEff: 0.78 },
  { id: "tanggul", name: "Tanggul & Rumah Pompa", hazard: ["banjir"], sector: "Infrastruktur", cost: "IDR 180 M", timeline: "36 bln", agency: "PUPR", eff: 0.82, co: 0.30, costEff: 0.55 },
  { id: "seeds", name: "Climate-Resilient Seeds", hazard: ["kekeringan", "pangan"], sector: "Pertanian", cost: "per varietas", timeline: "6 bln", agency: "Kementan", eff: 0.74, co: 0.60, costEff: 0.90 },
  { id: "embung", name: "Embung & Water Harvesting", hazard: ["kekeringan"], sector: "Pertanian", cost: "IDR 100-500 jt", timeline: "12 bln", agency: "PUPR/Kementan", eff: 0.79, co: 0.55, costEff: 0.82 },
  { id: "reforest", name: "Reforestasi", hazard: ["karbon", "banjir"], sector: "Lingkungan", cost: "IDR 30-50 jt/ha", timeline: "60 bln", agency: "KLHK", eff: 0.71, co: 0.95, costEff: 0.68 },
  { id: "retrofit", name: "Building Retrofit", hazard: ["heat", "banjir"], sector: "Permukiman", cost: "variable", timeline: "24 bln", agency: "PUPR", eff: 0.66, co: 0.40, costEff: 0.60 },
  { id: "insurance", name: "Insurance (CAT bond)", hazard: ["bencana"], sector: "Finansial", cost: "premium", timeline: "3 bln", agency: "Kemenkeu", eff: 0.58, co: 0.20, costEff: 0.88 },
  { id: "relokasi", name: "Relokasi Permukiman", hazard: ["hazard-ekstrem"], sector: "Permukiman", cost: "variable", timeline: "60 bln", agency: "Pemda", eff: 0.95, co: 0.35, costEff: 0.42 },
];

const HAZARD_OPTS = [
  { id: "banjir", label: "Banjir" }, { id: "kekeringan", label: "Kekeringan" }, { id: "slr", label: "Sea Level Rise" }, { id: "karbon", label: "Karbon" },
];

function AdaptationLibrary({ setRoute, ctx, openAI }) {
  const [hazard, setHazard] = React.useState("banjir");
  const [pref, setPref] = React.useState({ effectiveness: 40, cost: 35, cobenefit: 25 });
  const [selected, setSelected] = React.useState([]);

  const scored = ADAPT_LIB.map(a => {
    const relevant = a.hazard.includes(hazard);
    const fitness = (a.eff * pref.effectiveness + a.costEff * pref.cost + a.co * pref.cobenefit) / 100;
    return { ...a, relevant, fitness: +fitness.toFixed(2) };
  }).sort((a, b) => (b.relevant - a.relevant) || (b.fitness - a.fitness));

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const bundle = ADAPT_LIB.filter(a => selected.includes(a.id));

  return (
    <div className="feat-page adapt-page" data-screen-label="Feature: Adaptation Library">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>Adaptation Recommendation</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sdss"><Icon name="shield" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 5.4 · SDSS CORE</div>
              <h1>Customizable Adaptation Recommendation</h1>
              <div className="feat-sub">Knowledge base ~50-80 aksi adaptasi · fitness scoring per profil area · ranked + bundle paket komplementer</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="primary-btn" onClick={() => setRoute("flow-scenario")} disabled={!bundle.length}><Icon name="plus" size={14} />Buat skenario ({bundle.length})</button>
          </div>
        </div>
      </div>

      <div className="adapt-body">
        <aside className="adapt-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Profil Area</div>
            <div className="adapt-hazards">
              <span className="muted" style={{ fontSize: 11 }}>Hazard utama:</span>
              {HAZARD_OPTS.map(h => (
                <button key={h.id} className={`fm-radio ${hazard === h.id ? "on" : ""}`} onClick={() => setHazard(h.id)}>{h.label}</button>
              ))}
            </div>
            <div className="adapt-ctx">Sulsel · Kab. Wajo · vulnerability 0.84</div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Preferensi (bobot fitness)</div>
            {[["effectiveness", "Efektivitas"], ["cost", "Cost-efficiency"], ["cobenefit", "Co-benefit"]].map(([k, l]) => (
              <label key={k} className="fm-field">
                <span>{l}: <strong>{pref[k]}%</strong></span>
                <input type="range" min="0" max="60" value={pref[k]} onChange={e => setPref({ ...pref, [k]: +e.target.value })} className="weight-range" style={{ "--track-color": "var(--primary-600)" }} />
              </label>
            ))}
            <div className="adapt-pref-note"><Icon name="info" size={11} />fitness = eff×{pref.effectiveness}% + costEff×{pref.cost}% + co×{pref.cobenefit}%</div>
          </div>
          {bundle.length > 0 && (
            <div className="rdtr-panel adapt-bundle">
              <div className="rdtr-panel-head">Bundle terpilih ({bundle.length})</div>
              {bundle.map(b => <div key={b.id} className="adapt-bundle-row"><Icon name="check-circle" size={12} />{b.name}</div>)}
              <div className="adapt-bundle-total">Estimasi: paket komplementer untuk {HAZARD_OPTS.find(h => h.id === hazard)?.label}</div>
            </div>
          )}
        </aside>

        <div className="adapt-list">
          <div className="adapt-list-head">{scored.filter(a => a.relevant).length} aksi relevan untuk <strong>{HAZARD_OPTS.find(h => h.id === hazard)?.label}</strong> · diurutkan fitness score</div>
          <div className="adapt-grid">
            {scored.map(a => (
              <div key={a.id} className={`adapt-card ${!a.relevant ? "dim" : ""} ${selected.includes(a.id) ? "sel" : ""}`}>
                <div className="adapt-card-head">
                  <div className="adapt-card-name">{a.name}</div>
                  <div className="adapt-fitness" style={{ color: a.fitness >= 0.75 ? "var(--success-700)" : a.fitness >= 0.6 ? "var(--warning-700)" : "var(--gray-500)" }}>{a.fitness}</div>
                </div>
                <div className="adapt-tags">
                  {a.hazard.map(h => <span key={h} className="adapt-tag">{h}</span>)}
                  <span className="adapt-tag sector">{a.sector}</span>
                </div>
                <div className="adapt-bars">
                  <div className="adapt-bar-row"><span>Efektivitas</span><div className="adapt-bar"><div style={{ width: `${a.eff*100}%`, background: "var(--success-500)" }} /></div></div>
                  <div className="adapt-bar-row"><span>Cost-eff</span><div className="adapt-bar"><div style={{ width: `${a.costEff*100}%`, background: "var(--primary-500)" }} /></div></div>
                  <div className="adapt-bar-row"><span>Co-benefit</span><div className="adapt-bar"><div style={{ width: `${a.co*100}%`, background: "var(--accent-sea)" }} /></div></div>
                </div>
                <div className="adapt-meta">
                  <span><Icon name="bar-chart-3" size={11} />{a.cost}</span>
                  <span><Icon name="clock" size={11} />{a.timeline}</span>
                  <span><Icon name="shield" size={11} />{a.agency}</span>
                </div>
                <button className={`adapt-add ${selected.includes(a.id) ? "on" : ""}`} onClick={() => toggle(a.id)}>
                  {selected.includes(a.id) ? <><Icon name="check-circle" size={13} />Dalam bundle</> : <><Icon name="plus" size={13} />Tambah ke bundle</>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdaptationLibrary });
