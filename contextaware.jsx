// ============================================================
// SDSS — Context-Aware Recommendation Engine · FITUR 5.6
// Sumber: §5.6 — 4 sub: policy-compliance, feasibility scoring,
// temporal sequencing, cross-sectoral synergy/conflict
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const CA_RECS = [
  {
    id: "tanggul", action: "Tanggul pesisir 1km", compliance: "conditional",
    legal: ["UU 26/2007", "Permen ATR/BPN 11/2021"], permits: ["KKPR", "AMDAL", "Izin Pemanfaatan Pesisir"],
    conflicts: ["Sempadan pantai 100m — perlu klarifikasi"], feasibility: 0.62, capacity: "Sedang",
  },
  {
    id: "mangrove", action: "Restorasi mangrove 240ha", compliance: "compliant",
    legal: ["UU 32/2009 PPLH", "PP 21/2021"], permits: ["Izin lokasi"],
    conflicts: [], feasibility: 0.84, capacity: "Tinggi",
  },
  {
    id: "relokasi", action: "Relokasi permukiman 200 KK", compliance: "non-compliant",
    legal: ["UU 26/2007"], permits: ["KKPR", "Persetujuan DPRD", "Ganti rugi"],
    conflicts: ["Lahan tujuan masih sengketa", "Anggaran belum dialokasi RPJMD"], feasibility: 0.34, capacity: "Rendah",
  },
];

const CA_SEQUENCE = [
  { year: "2026", actions: ["Mangrove fase 1", "Setup EWS"], color: "#2F7D5E" },
  { year: "2027", actions: ["Mangrove fase 2", "Tanggul (post-KKPR)"], color: "#C18820" },
  { year: "2028-30", actions: ["Relokasi bertahap", "Retrofit drainase"], color: "#0E5A78" },
];

function compColor(c) { return c === "compliant" ? "#2F7D5E" : c === "conditional" ? "#C18820" : "#8B1A1A"; }
function compLabel(c) { return c === "compliant" ? "Compliant" : c === "conditional" ? "Conditional" : "Non-compliant"; }

function ContextAware({ setRoute, ctx, openAI }) {
  const [tab, setTab] = React.useState("policy");
  const [selected, setSelected] = React.useState("tanggul");
  const r = CA_RECS.find(x => x.id === selected);

  return (
    <div className="feat-page ca-page" data-screen-label="Feature: Context-Aware Recommendation">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>Context-Aware Recommendation</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sdss"><Icon name="compass" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 5.6 · SDSS CORE</div>
              <h1>Context-Aware Recommendation Engine</h1>
              <div className="feat-sub">4 lapisan kecerdasan: policy-compliance, feasibility scoring, temporal sequencing, cross-sectoral synergy</div>
            </div>
          </div>
          <div className="feat-actions"><button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button></div>
        </div>
      </div>

      <div className="ca-tabs">
        {[["policy","1. Policy-Compliant"],["feasibility","2. Feasibility Scoring"],["sequencing","3. Temporal Sequencing"],["crosssector","4. Cross-Sectoral"]].map(([k, l]) => (
          <button key={k} className={`ca-tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {(tab === "policy" || tab === "feasibility") && (
        <div className="ca-body">
          <aside className="ca-reclist">
            {CA_RECS.map(x => (
              <button key={x.id} className={`ca-rec ${selected === x.id ? "on" : ""}`} onClick={() => setSelected(x.id)}>
                <span className="ca-rec-dot" style={{ background: compColor(x.compliance) }} />
                <div className="ca-rec-body"><div className="ca-rec-name">{x.action}</div><div className="ca-rec-comp" style={{ color: compColor(x.compliance) }}>{compLabel(x.compliance)}</div></div>
              </button>
            ))}
          </aside>
          <div className="ca-detail">
            {tab === "policy" ? (
              <div className="ca-policy">
                <div className="ca-policy-head"><span className="ca-action">{r.action}</span><span className="ca-comp-pill" style={{ background: compColor(r.compliance) }}>{compLabel(r.compliance)}</span></div>
                <div className="ca-block"><div className="ca-block-label">Dasar hukum</div><div className="ca-chips">{r.legal.map(l => <span key={l} className="ca-chip legal">{l}</span>)}</div></div>
                <div className="ca-block"><div className="ca-block-label">Izin yang diperlukan</div><div className="ca-chips">{r.permits.map(p => <span key={p} className="ca-chip permit">{p}</span>)}</div></div>
                <div className="ca-block"><div className="ca-block-label">Potensi konflik</div>
                  {r.conflicts.length ? r.conflicts.map(c => <div key={c} className="ca-conflict"><Icon name="alert-triangle" size={12} />{c}</div>) : <div className="ca-noconflict"><Icon name="check-circle" size={12} />Tidak ada konflik terdeteksi</div>}
                </div>
              </div>
            ) : (
              <div className="ca-feas">
                <div className="ca-policy-head"><span className="ca-action">{r.action}</span></div>
                <div className="ca-feas-score">
                  <svg viewBox="0 0 120 120" width="110" height="110">
                    <circle cx="60" cy="60" r="48" fill="none" stroke="var(--gray-200)" strokeWidth="10" />
                    <circle cx="60" cy="60" r="48" fill="none" stroke={r.feasibility >= 0.7 ? "#2F7D5E" : r.feasibility >= 0.5 ? "#C18820" : "#8B1A1A"} strokeWidth="10" strokeDasharray={`${r.feasibility * 301.6} 301.6`} transform="rotate(-90 60 60)" strokeLinecap="round" />
                    <text x="60" y="64" fontSize="22" fontWeight="700" textAnchor="middle" fill="var(--gray-900)">{r.feasibility.toFixed(2)}</text>
                  </svg>
                  <div className="ca-feas-info">
                    <div className="ca-feas-cap">Kapasitas lokal: <strong>{r.capacity}</strong></div>
                    <div className="ca-feas-note">Feasibility score berbasis local capacity assessment (SDM, fiskal, kelembagaan, infrastruktur eksisting).</div>
                  </div>
                </div>
                <div className="ca-feas-bars">
                  {[["SDM", r.feasibility * 0.9], ["Fiskal", r.feasibility * 1.1 > 1 ? 0.95 : r.feasibility * 1.1], ["Kelembagaan", r.feasibility * 0.85], ["Infrastruktur", r.feasibility]].map(([l, v]) => (
                    <div key={l} className="ca-feas-bar-row"><span>{l}</span><div className="ca-feas-bar"><div style={{ width: `${Math.min(100, v*100)}%` }} /></div></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "sequencing" && (
        <div className="ca-seq">
          <div className="ca-seq-intro">Urutan optimal aksi adaptasi untuk dampak maksimal — mempertimbangkan dependency (mis. KKPR sebelum tanggul) & ramp-up kapasitas.</div>
          <div className="ca-timeline">
            {CA_SEQUENCE.map((s, i) => (
              <div key={i} className="ca-seq-col">
                <div className="ca-seq-year" style={{ color: s.color }}>{s.year}</div>
                <div className="ca-seq-line" style={{ background: s.color }} />
                <div className="ca-seq-actions">
                  {s.actions.map(a => <div key={a} className="ca-seq-action" style={{ borderLeftColor: s.color }}>{a}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "crosssector" && (
        <div className="ca-cross">
          <div className="ca-seq-intro">Analisis dampak lintas-sektor: identifikasi sinergi (saling menguatkan) & konflik (saling melemahkan).</div>
          <div className="ca-cross-grid">
            <div className="ca-cross-card synergy">
              <div className="ca-cross-head"><Icon name="check-circle" size={14} />Sinergi terdeteksi</div>
              {["Mangrove ↔ Biodiversity (koridor + sequestration)", "Mangrove ↔ Fisheries (nursery habitat)", "EWS ↔ RDTR (data hazard untuk zonasi)"].map(s => <div key={s} className="ca-cross-row">{s}</div>)}
            </div>
            <div className="ca-cross-card conflict">
              <div className="ca-cross-head"><Icon name="alert-triangle" size={14} />Konflik potensial</div>
              {["Tanggul ↔ Sempadan pantai (regulasi)", "Relokasi ↔ Lahan pertanian (food security)", "Industri ↔ Konservasi (peruntukan RDTR)"].map(s => <div key={s} className="ca-cross-row">{s}</div>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { ContextAware });
