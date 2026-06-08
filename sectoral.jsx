// ============================================================
// Sectoral — Spatial Planning Support Toolbox (RDTR) · FITUR 4.1
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.1
// "Modul integratif outlet → input siap-pakai untuk RDTR"
// Suitability mapping · risk zoning · constraint · compliance · export
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const RDTR_KAB = [
  { id: "demak", name: "Kab. Demak", prov: "Jateng", kecs: ["Wedung", "Mijen", "Sayung"] },
  { id: "makassar", name: "Kota Makassar", prov: "Sulsel", kecs: ["Tamalanrea", "Biringkanaya", "Tallo"] },
  { id: "wajo", name: "Kab. Wajo", prov: "Sulsel", kecs: ["Tempe", "Sabbangparu", "Pammana"] },
];

const RDTR_PERUNTUKAN = [
  { id: "permukiman", label: "Permukiman", color: "#C98B3A" },
  { id: "industri", label: "Industri", color: "#6B7B74" },
  { id: "jasa", label: "Perdagangan-Jasa", color: "#A93E2A" },
  { id: "pertanian", label: "Pertanian", color: "#5B8C5A" },
  { id: "konservasi", label: "Konservasi", color: "#0E5A78" },
];

const RDTR_CONSTRAINTS = [
  { id: "hutanSK", label: "Hutan SK Menhut" },
  { id: "konservasi", label: "Kawasan konservasi" },
  { id: "sempadan", label: "Sempadan pantai" },
  { id: "banjir100", label: "Risiko banjir 100-yr" },
  { id: "slope25", label: "Slope > 25%" },
];

// Zoning polygons (mock pola ruang) — id, peruntukan, suitability, path, ha, label
const RDTR_ZONES = [
  { id: "z1", per: "permukiman", suit: "S1", ha: 45.2, path: "M140,90 L230,80 L240,150 L150,165 Z", label: "Permukiman R-3", kdb: "60%", klb: "2.4", gsb: "4m", flood: "rendah (20-yr)" },
  { id: "z2", per: "pertanian", suit: "S1", ha: 340, path: "M245,80 L380,75 L390,200 L250,210 Z", label: "Sawah dilindungi", kdb: "—", klb: "—", gsb: "—", flood: "sedang" },
  { id: "z3", per: "konservasi", suit: "S1", ha: 88, path: "M150,170 L245,165 L250,250 L160,260 Z", label: "Konservasi mangrove", kdb: "—", klb: "—", gsb: "—", flood: "tinggi pesisir" },
  { id: "z4", per: "permukiman", suit: "S2", ha: 12.4, path: "M255,215 L330,210 L335,270 L260,278 Z", label: "Permukiman R-2", kdb: "60%", klb: "1.8", gsb: "4m", flood: "rendah (20-yr)", warn: true },
  { id: "z5", per: "jasa", suit: "S2", ha: 18.6, path: "M340,205 L395,205 L398,265 L342,270 Z", label: "Perdagangan-Jasa K-2", kdb: "70%", klb: "3.2", gsb: "6m", flood: "rendah" },
  { id: "z6", per: "permukiman", suit: "N", ha: 12, path: "M165,265 L255,258 L258,320 L175,328 Z", label: "Zona inundasi 2050 — relokasi", kdb: "—", klb: "—", gsb: "—", flood: "inundasi 2050", relocate: true },
];

const suitColor = { S1: "#2F7D5E", S2: "#C18820", S3: "#C44E37", N: "#8B1A1A" };
const suitLabel = { S1: "Sangat Sesuai", S2: "Cukup Sesuai", S3: "Sesuai Marginal", N: "Tidak Sesuai" };

function RDTRToolbox({ setRoute, ctx, openAI }) {
  const [kabId, setKabId] = React.useState("demak");
  const [kec, setKec] = React.useState("Wedung");
  const [peruntukan, setPeruntukan] = React.useState("permukiman");
  const [constraints, setConstraints] = React.useState({ hutanSK: true, konservasi: true, sempadan: true, banjir100: true, slope25: true });
  const [selectedZone, setSelectedZone] = React.useState("z4");
  const [generated, setGenerated] = React.useState(false);

  const kab = RDTR_KAB.find(k => k.id === kabId);
  const zone = RDTR_ZONES.find(z => z.id === selectedZone);
  const violations = RDTR_ZONES.filter(z => z.warn || z.relocate);

  React.useEffect(() => { setKec(kab.kecs[0]); }, [kabId]);

  return (
    <div className="feat-page rdtr-page" data-screen-label="Feature: RDTR Spatial Planning Toolbox">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Spatial Planning Toolbox (RDTR)</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sectoral"><Icon name="map" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.1 · SECTORAL · KRITIS</div>
              <h1>Spatial Planning Support Toolbox (RDTR)</h1>
              <div className="feat-sub">Terjemahkan hasil analitik iklim jadi input siap-pakai untuk Rencana Detail Tata Ruang · NSPK ATR/BPN</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="git-pull-request" size={14} />Compare existing</button>
            <button className="primary-btn"><Icon name="download" size={14} />Export RDTR Package</button>
          </div>
        </div>
      </div>

      <div className="rdtr-body">
        {/* LEFT */}
        <aside className="rdtr-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Pilih Wilayah RDTR</div>
            <label className="fm-field">
              <span>Kabupaten/Kota</span>
              <select value={kabId} onChange={e => setKabId(e.target.value)} className="text-input">
                {RDTR_KAB.map(k => <option key={k.id} value={k.id}>{k.name} · {k.prov}</option>)}
              </select>
            </label>
            <div className="rdtr-kec">
              {kab.kecs.map(k => (
                <button key={k} className={`fm-radio-row ${kec === k ? "on" : ""}`} onClick={() => setKec(k)}>
                  <span className="fm-radio-dot" /><span>Kec. {k}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Layer Suitability Aktif</div>
            <div className="rdtr-per-list">
              {RDTR_PERUNTUKAN.map(p => (
                <button key={p.id} className={`rdtr-per ${peruntukan === p.id ? "on" : ""}`} onClick={() => setPeruntukan(p.id)}>
                  <span className="rdtr-per-dot" style={{ background: p.color }} />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Constraint</div>
            <div className="rdtr-constraints">
              {RDTR_CONSTRAINTS.map(c => (
                <label key={c.id} className="fm-check">
                  <input type="checkbox" checked={constraints[c.id]} onChange={e => setConstraints({ ...constraints, [c.id]: e.target.checked })} />
                  {c.label}
                </label>
              ))}
            </div>
            <div className="rdtr-scn">Skenario: <strong>2050 SSP2-4.5</strong></div>
          </div>

          <div className="rdtr-actions">
            <button className="primary-btn rdtr-gen" onClick={() => setGenerated(true)}>
              <Icon name="sparkles" size={14} />Generate Recommendation
            </button>
            <button className="ghost-btn rdtr-full"><Icon name="git-pull-request" size={13} />Compare with Existing</button>
            <button className="ghost-btn rdtr-full"><Icon name="download" size={13} />Export RDTR Package (.gpkg)</button>
          </div>
        </aside>

        {/* CENTER */}
        <div className="rdtr-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="layers" size={14} />Peta Rancangan Pola Ruang · {kab.name}, Kec. {kec}</div>
              <div className="rdtr-map-legend">
                {RDTR_PERUNTUKAN.map(p => (
                  <span key={p.id}><span className="sw" style={{ background: p.color }} />{p.label}</span>
                ))}
              </div>
            </div>
            <div className="rdtr-map-stage">
              <RDTRMap zones={RDTR_ZONES} selected={selectedZone} onSelect={setSelectedZone} constraints={constraints} />
            </div>
            <div className="rdtr-area-summary">
              {RDTR_PERUNTUKAN.map(p => {
                const ha = RDTR_ZONES.filter(z => z.per === p.id).reduce((a, z) => a + z.ha, 0);
                if (!ha) return null;
                return <div key={p.id} className="rdtr-area-chip"><span className="rdtr-per-dot" style={{ background: p.color }} />{p.label}: <strong>{ha.toLocaleString("id-ID")} ha</strong></div>;
              })}
            </div>
          </div>

          {/* Detail zonasi (klik area) */}
          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head">
              <Icon name="map-pin" size={14} />Detail Zonasi
              <span className="muted">(klik area di peta)</span>
            </div>
            {zone ? (
              <div className="rdtr-detail-body">
                <div className="rdtr-detail-main">
                  <div className="rdtr-detail-zone">{zone.label}</div>
                  <span className="rdtr-suit-pill" style={{ background: suitColor[zone.suit] }}>{zone.suit} · {suitLabel[zone.suit]}</span>
                </div>
                <div className="rdtr-detail-grid">
                  <div><span className="muted">Luas</span><strong>{zone.ha} ha</strong></div>
                  <div><span className="muted">KDB max</span><strong>{zone.kdb}</strong></div>
                  <div><span className="muted">KLB max</span><strong>{zone.klb}</strong></div>
                  <div><span className="muted">GSB</span><strong>{zone.gsb}</strong></div>
                  <div><span className="muted">Risiko banjir</span><strong>{zone.flood}</strong></div>
                  <div><span className="muted">Peruntukan</span><strong>{RDTR_PERUNTUKAN.find(p => p.id === zone.per)?.label}</strong></div>
                </div>
                {(zone.warn || zone.relocate) && (
                  <div className="rdtr-detail-warn">
                    <Icon name="alert-triangle" size={13} />
                    {zone.relocate ? "Zona inundasi 2050 — relokasi dianjurkan" : "Berada di zona flood 50-yr — relokasi dianjurkan"}
                  </div>
                )}
              </div>
            ) : <div className="rdtr-detail-empty">Klik poligon zona di peta untuk lihat detail KDB/KLB/GSB & dasar rekomendasi.</div>}
          </div>
        </div>

        {/* RIGHT — compliance */}
        <aside className="rdtr-compliance">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Compliance Check
              <span className="rdtr-comp-tag">Permen ATR/BPN 11/2021</span>
            </div>
            <div className="rdtr-comp-list">
              <div className="rdtr-comp-row ok">
                <Icon name="check-circle" size={15} />
                <span>Tidak ada permukiman di hutan SK Menhut</span>
              </div>
              <div className="rdtr-comp-row ok">
                <Icon name="check-circle" size={15} />
                <span>Sempadan pantai 100m terpenuhi</span>
              </div>
              <div className="rdtr-comp-row warn">
                <Icon name="alert-triangle" size={15} />
                <span><strong>2 plot permukiman</strong> di zona banjir 50-yr — relokasi dianjurkan</span>
              </div>
              <div className="rdtr-comp-row warn">
                <Icon name="alert-triangle" size={15} />
                <span>Zona inundasi 2050 (12 ha) perlu konversi peruntukan</span>
              </div>
            </div>
            <div className="rdtr-comp-score">
              <div className="rdtr-comp-score-bar"><div style={{ width: "82%" }} /></div>
              <span><strong>82%</strong> compliant · {violations.length} violation</span>
            </div>
          </div>

          <div className="rdtr-panel rdtr-ai">
            <div className="rdtr-panel-head"><Icon name="sparkles" size={13} />Rekomendasi AI</div>
            <div className="rdtr-ai-body">
              <ol>
                <li>Konversi 12 ha zona inundasi 2050 dari permukiman → RTH/konservasi</li>
                <li>Relokasi 2 plot permukiman R-2 ke zona S1 di utara Kec. {kec}</li>
                <li>Tambah jalur evakuasi + shelter zone (kapasitas 5.000 jiwa)</li>
              </ol>
              <button className="link-btn" onClick={() => setRoute("feature-flood")}>Lihat flood hazard →</button>
            </div>
          </div>

          <div className="rdtr-crosslinks">
            <button className="fm-crosslink" onClick={() => setRoute("feature-mcda")}>
              <Icon name="bar-chart-3" size={14} /><span>Suitability via MCDA</span><Icon name="chevron-right" size={12} />
            </button>
            <button className="fm-crosslink" onClick={() => setRoute("feature-vuln")}>
              <Icon name="alert-triangle" size={14} /><span>Vulnerability dasar</span><Icon name="chevron-right" size={12} />
            </button>
            <button className="fm-crosslink" onClick={() => setRoute("flow-group")}>
              <Icon name="users" size={14} /><span>Konsultasi publik RDTR</span><Icon name="chevron-right" size={12} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function RDTRMap({ zones, selected, onSelect, constraints }) {
  const perColor = {};
  RDTR_PERUNTUKAN.forEach(p => perColor[p.id] = p.color);
  return (
    <svg viewBox="0 0 500 360" className="rdtr-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="rdtr-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
        </pattern>
        <pattern id="rdtr-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="#8B1A1A" strokeWidth="1.4" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="500" height="360" fill="var(--surface-sunken, #E9EEEA)" />
      <rect width="500" height="360" fill="url(#rdtr-grid)" />

      {/* zones */}
      {zones.map(z => (
        <g key={z.id} onClick={() => onSelect(z.id)} style={{ cursor: "pointer" }}>
          <path d={z.path} fill={z.relocate ? "url(#rdtr-hatch)" : perColor[z.per]}
            fillOpacity={z.relocate ? 0.9 : 0.7}
            stroke={selected === z.id ? "var(--text-primary)" : "#fff"}
            strokeWidth={selected === z.id ? 2.5 : 1.2} />
          {z.warn && <text x={parseInt(z.path.match(/M(\d+)/)[1]) + 20} y={parseInt(z.path.match(/M\d+,(\d+)/)[1]) + 30} fontSize="14" fill="#8B1A1A">⚠</text>}
        </g>
      ))}

      {/* coastal buffer line */}
      {constraints.sempadan && (
        <path d="M120,300 Q200,290 290,305 T420,300" fill="none" stroke="#0E5A78" strokeWidth="2" strokeDasharray="6 3" />
      )}
      {/* evacuation route */}
      <path d="M180,160 L250,210 L320,250 L380,300" fill="none" stroke="#1F2E29" strokeWidth="2.5" />
      <circle cx="380" cy="300" r="8" fill="none" stroke="#1F2E29" strokeWidth="2" />
      <circle cx="380" cy="300" r="3" fill="#1F2E29" />
      <text x="392" y="303" fontSize="9" fill="var(--text-primary)">Shelter 5.000</text>

      <text x="250" y="345" textAnchor="middle" fontSize="9" fill="var(--text-muted, #6B7B74)">━━ jalur evakuasi · ┄┄ sempadan pantai 100m</text>
    </svg>
  );
}

Object.assign(window, { RDTRToolbox });
