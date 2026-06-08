// ============================================================
// Sectoral — Tourism Sector Vulnerability · FITUR 4.5
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.5
// TCI (Tourism Climate Index) + destination resilience +
// coral bleaching + adaptation recommendation
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const TOUR_REGIONS = [
  { id: "bali", name: "Bali" },
  { id: "ntb", name: "NTB (Lombok)" },
  { id: "sulut", name: "Sulawesi Utara (Bunaken)" },
];

const TOUR_TYPES = [
  { id: "pantai", label: "Pantai", icon: "globe", color: "#0E5A78" },
  { id: "koral", label: "Koral", icon: "alert-triangle", color: "#C44E37" },
  { id: "gunung", label: "Gunung", icon: "thermometer", color: "#5B8C5A" },
];

// destinations (mock) — id, name, type, tciDelta (%), threat, resilience 0-100, x, y
const TOUR_DEST = {
  bali: [
    { id: 1, name: "Pantai Kuta", type: "pantai", tci: -28, threat: "erosion +18%", res: 34, x: 35, y: 62 },
    { id: 2, name: "Nusa Penida", type: "koral", tci: -22, threat: "bleaching 65% (dari 12%)", res: 28, x: 62, y: 70 },
    { id: 3, name: "Gunung Batur", type: "gunung", tci: -8, threat: "longsor sedang", res: 68, x: 55, y: 30 },
    { id: 4, name: "Tanah Lot", type: "pantai", tci: -19, threat: "abrasi + SLR", res: 45, x: 28, y: 48 },
    { id: 5, name: "Sanur Reef", type: "koral", tci: -16, threat: "bleaching 48%", res: 52, x: 48, y: 58 },
    { id: 6, name: "Ubud Hinterland", type: "gunung", tci: -5, threat: "curah hujan ekstrem", res: 74, x: 45, y: 40 },
  ],
  ntb: [
    { id: 1, name: "Gili Trawangan", type: "koral", tci: -25, threat: "bleaching 58%", res: 31, x: 30, y: 35 },
    { id: 2, name: "Pantai Senggigi", type: "pantai", tci: -20, threat: "abrasi +14%", res: 42, x: 38, y: 55 },
    { id: 3, name: "Gunung Rinjani", type: "gunung", tci: -10, threat: "erupsi-prep + longsor", res: 60, x: 58, y: 30 },
    { id: 4, name: "Pink Beach", type: "pantai", tci: -17, threat: "SLR + wave climate", res: 48, x: 68, y: 60 },
  ],
  sulut: [
    { id: 1, name: "Bunaken Reef", type: "koral", tci: -30, threat: "bleaching 71%", res: 24, x: 40, y: 45 },
    { id: 2, name: "Pantai Malalayang", type: "pantai", tci: -15, threat: "abrasi sedang", res: 55, x: 32, y: 62 },
    { id: 3, name: "Gunung Lokon", type: "gunung", tci: -7, threat: "erupsi-prep", res: 66, x: 60, y: 35 },
  ],
};

function resColor(r) {
  if (r >= 65) return "#2F7D5E";
  if (r >= 45) return "#C18820";
  return "#8B1A1A";
}
function resLabel(r) {
  if (r >= 65) return "Resilien";
  if (r >= 45) return "Sedang";
  return "Rentan";
}

function TourismVulnerability({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("bali");
  const [types, setTypes] = React.useState({ pantai: true, koral: true, gunung: true });
  const [scn, setScn] = React.useState("2050");
  const [selected, setSelected] = React.useState(1);

  const region = TOUR_REGIONS.find(r => r.id === regionId);
  const activeTypes = Object.entries(types).filter(([k, v]) => v).map(([k]) => k);
  const dests = (TOUR_DEST[regionId] || []).filter(d => activeTypes.includes(d.type));
  const ranked = [...dests].sort((a, b) => a.res - b.res);
  const sel = dests.find(d => d.id === selected) || dests[0];

  React.useEffect(() => { setSelected((TOUR_DEST[regionId] || [{ id: 1 }])[0].id); }, [regionId]);

  const adaptOptions = sel ? ({
    pantai: ["Climate-resilient infrastructure standard", "Manajemen abrasi + beach nourishment", "Diversifikasi produk wisata (less beach-dependent)"],
    koral: ["Investment koral restoration", "Pembatasan diving load saat bleaching alert", "Diversifikasi ke eco-tourism darat"],
    gunung: ["Early warning longsor + jalur evakuasi", "Standar bangunan tahan gempa/erupsi", "Manajemen kapasitas pengunjung musiman"],
  }[sel.type]) : [];

  return (
    <div className="feat-page tour-page" data-screen-label="Feature: Tourism Vulnerability">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Tourism Sector Vulnerability</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sectoral"><Icon name="globe" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.5 · SECTORAL</div>
              <h1>Tourism Sector Vulnerability</h1>
              <div className="feat-sub">Kerentanan destinasi climate-dependent · Tourism Climate Index (TCI) + coral bleaching + resilience score</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
          </div>
        </div>
      </div>

      <div className="tour-body">
        {/* LEFT */}
        <aside className="tour-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Wilayah & Tipe</div>
            <label className="fm-field">
              <span>Provinsi</span>
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {TOUR_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </label>
            <div className="tour-types">
              {TOUR_TYPES.map(t => (
                <label key={t.id} className={`re-tech ${types[t.id] ? "on" : ""}`}>
                  <input type="checkbox" checked={types[t.id]} onChange={e => setTypes({ ...types, [t.id]: e.target.checked })} />
                  <span className="re-tech-dot" style={{ background: t.color }} />
                  <span className="re-tech-label">{t.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Skenario</div>
            <div className="fm-radio-grid">
              {[["current","Current"],["2050","2050 SSP2-4.5"],["2100","2100 SSP5-8.5"]].map(([k, l]) => (
                <button key={k} className={`fm-radio ${scn === k ? "on" : ""}`} onClick={() => setScn(k)}>{l}</button>
              ))}
            </div>
          </div>

          <div className="rdtr-panel tour-tci">
            <div className="rdtr-panel-head">Tentang TCI</div>
            <p>Tourism Climate Index (Mieczkowski 1985) + Holiday Climate Index (Scott 2016, refinement tropis). Skor turun = kenyamanan iklim wisata menurun.</p>
          </div>
        </aside>

        {/* CENTER map */}
        <div className="tour-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Destinasi · {region.name} · {scn === "current" ? "Current" : scn}</div>
              <div className="tour-legend">
                <span><span className="sw" style={{ background: "#2F7D5E" }} />Resilien</span>
                <span><span className="sw" style={{ background: "#C18820" }} />Sedang</span>
                <span><span className="sw" style={{ background: "#8B1A1A" }} />Rentan</span>
              </div>
            </div>
            <div className="tour-map-stage">
              <TourMap dests={dests} selected={selected} onSelect={setSelected} />
            </div>
          </div>
        </div>

        {/* RIGHT ranked + detail */}
        <aside className="tour-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Top destinasi rentan
              <span className="rdtr-comp-tag">{scn === "current" ? "current" : scn}</span>
            </div>
            <div className="tour-ranked">
              {ranked.map((d, i) => (
                <button key={d.id} className={`tour-rank ${selected === d.id ? "on" : ""}`} onClick={() => setSelected(d.id)}>
                  <span className="tour-rank-n">{i + 1}</span>
                  <div className="tour-rank-body">
                    <div className="tour-rank-name">{d.name}</div>
                    <div className="tour-rank-meta">TCI {d.tci}% · {d.threat}</div>
                  </div>
                  <span className="tour-rank-res" style={{ color: resColor(d.res) }}>{d.res}</span>
                </button>
              ))}
            </div>
          </div>

          {sel && (
            <div className="rdtr-panel tour-detail">
              <div className="rdtr-panel-head">{sel.name}</div>
              <div className="tour-detail-scores">
                <div className="tour-ds"><span className="muted">TCI change</span><strong style={{ color: "var(--danger-700)" }}>{sel.tci}%</strong></div>
                <div className="tour-ds"><span className="muted">Resilience</span><strong style={{ color: resColor(sel.res) }}>{sel.res} · {resLabel(sel.res)}</strong></div>
              </div>
              <div className="tour-threat"><Icon name="alert-triangle" size={12} />Ancaman utama: <strong>{sel.threat}</strong></div>
              <div className="tour-adapt-label">Rekomendasi adaptasi:</div>
              <ul className="tour-adapt">
                {adaptOptions.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function TourMap({ dests, selected, onSelect }) {
  return (
    <svg viewBox="0 0 500 320" className="rdtr-svg" preserveAspectRatio="xMidYMid meet">
      <rect width="500" height="320" fill="#BAD9E8" fillOpacity="0.35" />
      {/* island */}
      <path d="M120,90 Q220,60 320,85 Q400,105 410,180 Q380,250 250,260 Q140,255 100,190 Q95,130 120,90 Z" fill="var(--surface,#fff)" stroke="var(--border-strong)" strokeWidth="1.2" fillOpacity="0.7" />
      <text x="250" y="160" fontSize="11" fill="var(--text-muted, #6B7B74)" textAnchor="middle">{""}</text>
      {dests.map(d => {
        const cx = 90 + d.x * 3.2, cy = 70 + d.y * 1.9;
        const isSel = selected === d.id;
        const tt = TOUR_TYPES.find(t => t.id === d.type);
        return (
          <g key={d.id} onClick={() => onSelect(d.id)} style={{ cursor: "pointer" }}>
            <circle cx={cx} cy={cy} r={isSel ? 13 : 10} fill={resColor(d.res)} fillOpacity={isSel ? 0.9 : 0.7} stroke={isSel ? "var(--text-primary)" : "#fff"} strokeWidth={isSel ? 2.5 : 1.5} />
            <text x={cx} y={cy + 3} fontSize="9" fill="#fff" textAnchor="middle" fontWeight="700">{d.res}</text>
            {isSel && <text x={cx} y={cy - 16} fontSize="10" fill="var(--text-primary)" textAnchor="middle" fontWeight="600">{d.name}</text>}
          </g>
        );
      })}
    </svg>
  );
}

Object.assign(window, { TourismVulnerability });
