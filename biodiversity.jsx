// ============================================================
// Climate Modeling — Biodiversity Mapping (Citizen Science) · FITUR 2.4
// Sumber: §2.4 — species distribution + habitat connectivity +
// habitat shift projection + citizen science portal
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const BIO_SPECIES = [
  { id: "orangutan", emoji: "🦧", name: "Pongo pygmaeus", common: "Orangutan Borneo", iucn: "Critically Endangered", endemic: "Kalimantan", habitat: 23400, shift2050: -28, threat: "Deforestasi, perdagangan" },
  { id: "anoa", emoji: "🐃", name: "Bubalus depressicornis", common: "Anoa Dataran Rendah", iucn: "Endangered", endemic: "Sulawesi", habitat: 8200, shift2050: -22, threat: "Perburuan, konversi lahan" },
  { id: "maleo", emoji: "🐦", name: "Macrocephalon maleo", common: "Maleo", iucn: "Critically Endangered", endemic: "Sulawesi", habitat: 4100, shift2050: -34, threat: "Pengambilan telur, habitat loss" },
  { id: "cendrawasih", emoji: "🦜", name: "Paradisaea apoda", common: "Cendrawasih Besar", iucn: "Least Concern", endemic: "Papua", habitat: 31200, shift2050: -12, threat: "Perdagangan bulu" },
];

const BIO_OBS = [
  { who: "Andi (Makassar)", species: "Anoa", status: "verified", when: "2 jam lalu", conf: 0.92 },
  { who: "Rina (BRIN)", species: "Maleo", status: "verified", when: "5 jam lalu", conf: 0.88 },
  { who: "Budi (warga)", species: "Orangutan", status: "pending", when: "1 hari lalu", conf: 0.64 },
  { who: "Sari (UNHAS)", species: "Anoa", status: "verified", when: "2 hari lalu", conf: 0.95 },
];

function BiodiversityMapping({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("orangutan");
  const [taxa, setTaxa] = React.useState("Mamalia");
  const [filters, setFilters] = React.useState({ endemik: true, terancam: true, cites: false });
  const [period, setPeriod] = React.useState("current");
  const [layers, setLayers] = React.useState({ current: true, future: true, obs: true, koridor: true, refugia: false });

  const sp = BIO_SPECIES.find(s => s.id === selected);

  return (
    <div className="feat-page bio-page" data-screen-label="Feature: Biodiversity Mapping">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Biodiversity Mapping</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="globe" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.4 · CLIMATE MODELING</div>
              <h1>Biodiversity Mapping</h1>
              <div className="feat-sub">Distribusi spesies + konektivitas habitat + proyeksi habitat shift + portal citizen science</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="primary-btn"><Icon name="plus" size={14} />Upload Observasi</button>
          </div>
        </div>
      </div>

      <div className="bio-body">
        <aside className="bio-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Pencarian</div>
            <div className="bio-search"><Icon name="search" size={14} /><input placeholder="Cari spesies..." /></div>
            <label className="fm-field" style={{ marginTop: 10 }}>
              <span>Taxa</span>
              <select value={taxa} onChange={e => setTaxa(e.target.value)} className="text-input">
                <option>Mamalia</option><option>Aves</option><option>Reptil</option><option>Amfibi</option>
              </select>
            </label>
            <div className="bio-filters">
              {[["endemik","Endemik"],["terancam","Terancam"],["cites","CITES App"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={filters[k]} onChange={e => setFilters({ ...filters, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Layer & Periode</div>
            <div className="fm-radio-col" style={{ gap: 5, marginBottom: 10 }}>
              {[["current","Habitat current"],["future","Habitat 2050"],["obs","Citizen obs"],["koridor","Koridor ekologis"],["refugia","Klimat refugia"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={layers[k]} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
            <div className="seg-control">
              {[["current","Current"],["2050","2050"],["2070","2070"]].map(([k, l]) => <button key={k} className={`seg-btn ${period === k ? "active" : ""}`} onClick={() => setPeriod(k)}>{l}</button>)}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Spesies prioritas</div>
            <div className="bio-splist">
              {BIO_SPECIES.map(s => (
                <button key={s.id} className={`bio-sp ${selected === s.id ? "on" : ""}`} onClick={() => setSelected(s.id)}>
                  <span className="bio-sp-emoji">{s.emoji}</span>
                  <div className="bio-sp-body"><div className="bio-sp-common">{s.common}</div><div className="bio-sp-iucn">{s.iucn}</div></div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="bio-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Distribusi Habitat · {sp.common}</div>
              <div className="bio-legend">
                <span><span className="sw" style={{ background: "#1B5E3A" }} />Sangat sesuai</span>
                <span><span className="sw" style={{ background: "#88C0A1" }} />Sesuai</span>
                <span><span className="sw" style={{ background: "#C49A6A" }} />Marginal</span>
              </div>
            </div>
            <div className="bio-map-stage"><BioMap sp={sp} layers={layers} period={period} /></div>
          </div>

          <div className="bio-citizen">
            <div className="rdtr-panel-head">Portal Citizen Science
              <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <button className="ghost-btn small"><Icon name="file-text" size={12} />Riwayat</button>
                <button className="ghost-btn small"><Icon name="target" size={12} />Leaderboard</button>
              </span>
            </div>
            <div className="bio-obs-list">
              {BIO_OBS.map((o, i) => (
                <div key={i} className="bio-obs">
                  <span className={`bio-obs-status ${o.status}`}>{o.status === "verified" ? <Icon name="check-circle" size={14} /> : <Icon name="clock" size={14} />}</span>
                  <div className="bio-obs-body">
                    <div className="bio-obs-who">{o.who} · <strong>{o.species}</strong></div>
                    <div className="bio-obs-meta">{o.status === "verified" ? "Terverifikasi" : "Menunggu review"} · conf {o.conf} · {o.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="bio-right">
          <div className="rdtr-panel bio-detail">
            <div className="bio-detail-head">
              <span className="bio-detail-emoji">{sp.emoji}</span>
              <div><div className="bio-detail-common">{sp.common}</div><div className="bio-detail-sci">{sp.name}</div></div>
            </div>
            <div className="bio-detail-rows">
              <div className="bio-dr"><span className="muted">Status IUCN</span><span className="bio-iucn-badge">{sp.iucn}</span></div>
              <div className="bio-dr"><span className="muted">Status nasional</span><strong>Dilindungi (UU 5/90)</strong></div>
              <div className="bio-dr"><span className="muted">Endemik</span><strong>{sp.endemic}</strong></div>
              <div className="bio-dr"><span className="muted">Habitat suitability</span><strong>{sp.habitat.toLocaleString("id-ID")} km²</strong></div>
              <div className="bio-dr"><span className="muted">Proyeksi 2050</span><strong style={{ color: "var(--danger-700)" }}>{sp.shift2050}%</strong></div>
            </div>
            <div className="bio-threat"><Icon name="alert-triangle" size={12} />Threat: {sp.threat}</div>
            <button className="fm-crosslink" onClick={() => setRoute("feature-rdtr")} style={{ marginTop: 10 }}>
              <Icon name="map" size={14} /><span>Rekomendasi konservasi (RDTR)</span><Icon name="chevron-right" size={12} />
            </button>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Habitat Shift</div>
            <div className="bio-shift">
              <div className="bio-shift-bar"><div className="bio-shift-now" style={{ width: "100%" }}>Current 100%</div></div>
              <div className="bio-shift-bar"><div className="bio-shift-fut" style={{ width: `${100 + sp.shift2050}%` }}>2050 {100 + sp.shift2050}%</div></div>
            </div>
            <div className="bio-shift-note"><Icon name="info" size={12} />Range contraction {Math.abs(sp.shift2050)}% di bawah {period === "current" ? "SSP2-4.5 2050" : "skenario terpilih"}. Identifikasi climate refugia direkomendasikan.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BioMap({ sp, layers, period }) {
  const shrink = period === "current" ? 1 : period === "2050" ? (1 + sp.shift2050 / 100) : (1 + sp.shift2050 / 100 * 1.6);
  return (
    <svg viewBox="0 0 500 320" className="rdtr-svg" preserveAspectRatio="xMidYMid meet">
      <rect width="500" height="320" fill="var(--surface-sunken,#E9EEEA)" />
      <path d="M60,70 Q200,50 350,75 Q440,90 450,180 Q400,260 250,265 Q120,260 80,190 Z" fill="var(--surface,#fff)" stroke="var(--border-strong)" strokeWidth="1.2" fillOpacity="0.5" />
      {/* current habitat (suitability blobs) */}
      {layers.current && (
        <g>
          <ellipse cx="200" cy="150" rx="110" ry="70" fill="#1B5E3A" fillOpacity="0.4" />
          <ellipse cx="200" cy="150" rx="75" ry="48" fill="#1B5E3A" fillOpacity="0.5" />
          <ellipse cx="320" cy="170" rx="55" ry="40" fill="#88C0A1" fillOpacity="0.5" />
        </g>
      )}
      {/* future habitat (shrunk) */}
      {layers.future && (
        <ellipse cx="200" cy="150" rx={110 * shrink} ry={70 * shrink} fill="none" stroke="#C44E37" strokeWidth="2" strokeDasharray="6 3" />
      )}
      {/* corridors */}
      {layers.koridor && <path d="M200,150 Q260,160 320,170" fill="none" stroke="#5B8C5A" strokeWidth="3" />}
      {/* citizen obs */}
      {layers.obs && [[180,140,"v"],[230,165,"v"],[300,175,"p"],[160,170,"v"]].map(([x, y, s], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={s === "v" ? "#0E5A78" : "none"} stroke={s === "v" ? "#fff" : "#C18820"} strokeWidth="1.5" />
      ))}
    </svg>
  );
}

Object.assign(window, { BiodiversityMapping });
