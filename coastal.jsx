// ============================================================
// Sectoral — Coastal Vulnerability Assessment · FITUR 4.3
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.3
// CVI (physical) + SVI (socio) + ERI (ecological) → CCVI composite
// Coastline segmented ~1km, clickable, adaptation options + BCR
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const COASTAL_REGIONS = [
  { id: "demak", name: "Demak", prov: "Jateng" },
  { id: "pinrang", name: "Pinrang", prov: "Sulsel" },
  { id: "makassar", name: "Makassar", prov: "Sulsel" },
];

const COASTAL_LAYERS = [
  { id: "ccvi", label: "CCVI Composite" },
  { id: "cvi", label: "CVI Physical only" },
  { id: "svi", label: "SVI Socio only" },
  { id: "eri", label: "ERI Ecological only" },
  { id: "typology", label: "Typology Cluster" },
];

// Coastline segments (mock) — ~1km each
const COASTAL_SEGMENTS = [
  { id: "S-042", kec: "Sayung", km: 1.2, cvi: 0.85, svi: 0.72, eri: 0.18, subsidence: 9.4, density: 3800, mangrove: 7 },
  { id: "S-043", kec: "Sayung", km: 1.1, cvi: 0.78, svi: 0.68, eri: 0.24, subsidence: 8.1, density: 3200, mangrove: 12 },
  { id: "S-044", kec: "Wedung", km: 1.3, cvi: 0.62, svi: 0.55, eri: 0.41, subsidence: 5.2, density: 2100, mangrove: 34 },
  { id: "S-045", kec: "Wedung", km: 1.0, cvi: 0.48, svi: 0.44, eri: 0.58, subsidence: 3.8, density: 1400, mangrove: 52 },
  { id: "S-046", kec: "Wedung", km: 1.2, cvi: 0.35, svi: 0.38, eri: 0.71, subsidence: 2.1, density: 900, mangrove: 78 },
  { id: "S-047", kec: "Bonang", km: 1.1, cvi: 0.41, svi: 0.49, eri: 0.62, subsidence: 2.9, density: 1600, mangrove: 64 },
];

function ccviOf(s) {
  // CCVI = α·CVI + β·SVI − γ·ERI (AHP weights), clamp 0-1
  const v = 0.45 * s.cvi + 0.35 * s.svi - 0.30 * s.eri + 0.30;
  return Math.min(0.99, Math.max(0.05, +v.toFixed(2)));
}
function ccviColor(v) {
  if (v >= 0.7) return "#8B1A1A";
  if (v >= 0.4) return "#C18820";
  return "#2F7D5E";
}
function ccviCat(v) {
  if (v >= 0.7) return "Kritis";
  if (v >= 0.4) return "Sedang";
  return "Rendah";
}

function CoastalVulnerability({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("demak");
  const [layer, setLayer] = React.useState("ccvi");
  const [scn, setScn] = React.useState("current");
  const [overlays, setOverlays] = React.useState({ mangrove: true, pop: true, asset: true });
  const [selected, setSelected] = React.useState("S-042");
  const [computing, setComputing] = React.useState(false);

  const region = COASTAL_REGIONS.find(r => r.id === regionId);
  const seg = COASTAL_SEGMENTS.find(s => s.id === selected);
  const segCCVI = seg ? ccviOf(seg) : 0;

  const recompute = () => { setComputing(true); setTimeout(() => setComputing(false), 1200); };

  const adaptOptions = [
    { n: 1, name: "Mangrove rehabilitation 240 ha", cost: "IDR 24 M", bcr: 3.2 },
    { n: 2, name: "Tanggul + rumah pompa", cost: "IDR 180 M", bcr: 1.8 },
    { n: 3, name: "Relokasi rumah pesisir 200 KK", cost: "IDR 60 M", bcr: 4.1 },
  ];

  return (
    <div className="feat-page coastal-page" data-screen-label="Feature: Coastal Vulnerability">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Coastal Vulnerability Assessment</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sectoral"><Icon name="globe" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.3 · SECTORAL</div>
              <h1>Coastal Vulnerability Assessment</h1>
              <div className="feat-sub">CVI fisik + SVI sosial − ERI ekologis → CCVI composite · segmentasi garis pantai per ~1 km</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export Segments</button>
            <button className="primary-btn" onClick={() => setRoute("feature-mcda")}><Icon name="bar-chart-3" size={14} />MCDA</button>
          </div>
        </div>
      </div>

      <div className="coastal-body">
        {/* LEFT */}
        <aside className="coastal-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Filter Wilayah</div>
            <label className="fm-field">
              <span>Kabupaten/Kota</span>
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {COASTAL_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name} · {r.prov}</option>)}
              </select>
            </label>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Layer</div>
            <div className="fm-radio-col">
              {COASTAL_LAYERS.map(l => (
                <button key={l.id} className={`fm-radio-row ${layer === l.id ? "on" : ""}`} onClick={() => setLayer(l.id)}>
                  <span className="fm-radio-dot" /><span>{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Skenario</div>
            <div className="fm-radio-grid">
              {[["current","Current"],["2050-245","2050 SSP2-4.5"],["2100-585","2100 SSP5-8.5"]].map(([k, l]) => (
                <button key={k} className={`fm-radio ${scn === k ? "on" : ""}`} style={{ gridColumn: k === "current" ? "auto" : "span 1" }} onClick={() => setScn(k)}>{l}</button>
              ))}
            </div>
            <div className="coastal-overlays">
              <div className="coastal-overlays-label">Overlay:</div>
              {[["mangrove","Mangrove"],["pop","Populasi terdampak"],["asset","Aset kritis"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={overlays[k]} onChange={e => setOverlays({ ...overlays, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
            <button className="primary-btn rdtr-gen" onClick={recompute} disabled={computing} style={{ marginTop: 10 }}>
              {computing ? <><span className="whatif-spinner" />Recompute…</> : <><Icon name="play" size={14} />Recompute</>}
            </button>
          </div>
        </aside>

        {/* CENTER */}
        <div className="coastal-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="globe" size={14} />Coastline Terintegrasi · {region.name}</div>
              <div className="coastal-legend">
                <span><span className="line" style={{ background: "#8B1A1A" }} />CCVI &gt; 0.7</span>
                <span><span className="line" style={{ background: "#C18820" }} />0.4–0.7</span>
                <span><span className="line" style={{ background: "#2F7D5E" }} />&lt; 0.4</span>
              </div>
            </div>
            <div className="rdtr-map-stage">
              <CoastalMap segments={COASTAL_SEGMENTS} selected={selected} onSelect={setSelected} overlays={overlays} computing={computing} />
            </div>
          </div>
        </div>

        {/* RIGHT — segment detail */}
        <aside className="coastal-detail">
          {seg ? (
            <>
              <div className="rdtr-panel">
                <div className="rdtr-panel-head">Detail Segmen
                  <span className="rdtr-comp-tag">{seg.km} km · Kec. {seg.kec}</span>
                </div>
                <div className="coastal-seg-id">Segmen {region.id}-{seg.id}</div>
                <div className="coastal-scores">
                  {[
                    { k: "CVI physical", v: seg.cvi, c: "#0E5A78" },
                    { k: "SVI socio", v: seg.svi, c: "#C18820" },
                    { k: "ERI ecologic", v: seg.eri, c: "#2F7D5E", note: seg.eri < 0.3 ? "mangrove rusak" : "" },
                  ].map(s => (
                    <div key={s.k} className="coastal-score-row">
                      <span className="coastal-score-label">{s.k}{s.note && <em> ({s.note})</em>}</span>
                      <div className="coastal-score-bar"><div style={{ width: `${s.v*100}%`, background: s.c }} /></div>
                      <span className="coastal-score-val">{s.v.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="coastal-ccvi-row">
                    <span>CCVI</span>
                    <span className="coastal-ccvi-val" style={{ color: ccviColor(segCCVI) }}>{segCCVI.toFixed(2)} · {ccviCat(segCCVI)}</span>
                  </div>
                </div>
              </div>

              <div className="rdtr-panel">
                <div className="rdtr-panel-head">Driver Utama</div>
                <div className="coastal-drivers">
                  <div><Icon name="arrow-down" size={12} />Subsidence <strong>{seg.subsidence} cm/yr</strong></div>
                  <div><Icon name="users" size={12} />Densitas <strong>{seg.density.toLocaleString("id-ID")} jiwa/km²</strong> di buffer 500m</div>
                  <div><Icon name="globe" size={12} />Mangrove tinggal <strong>{seg.mangrove}%</strong> dari historic</div>
                </div>
              </div>

              <div className="rdtr-panel coastal-adapt">
                <div className="rdtr-panel-head">Adaptation Options</div>
                {adaptOptions.map(o => (
                  <div key={o.n} className="coastal-adapt-row">
                    <span className="coastal-adapt-n">{o.n}</span>
                    <div className="coastal-adapt-body">
                      <div className="coastal-adapt-name">{o.name}</div>
                      <div className="coastal-adapt-meta">{o.cost} · <strong className={o.bcr >= 3 ? "good" : ""}>BCR {o.bcr}</strong></div>
                    </div>
                  </div>
                ))}
                <button className="fm-crosslink" onClick={() => setRoute("feature-mcda")} style={{ marginTop: 8 }}>
                  <Icon name="bar-chart-3" size={14} /><span>MCDA untuk decide</span><Icon name="chevron-right" size={12} />
                </button>
              </div>
            </>
          ) : <div className="rdtr-detail-empty">Klik segmen garis pantai untuk lihat detail.</div>}
        </aside>
      </div>
    </div>
  );
}

function CoastalMap({ segments, selected, onSelect, overlays, computing }) {
  // coastline path split into segments along a curve
  const pts = [
    [90, 90], [150, 120], [210, 130], [270, 165], [320, 220], [350, 285], [380, 330],
  ];
  return (
    <svg viewBox="0 0 500 360" className="rdtr-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="co-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M 22 0 L 0 0 0 22" fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="500" height="360" fill="var(--surface-sunken, #E9EEEA)" />
      <rect width="500" height="360" fill="url(#co-grid)" />
      {/* sea */}
      <path d="M90,90 L150,120 L210,130 L270,165 L320,220 L350,285 L380,330 L500,360 L500,0 L500,0 L90,0 Z" fill="#BAD9E8" fillOpacity="0.4" />
      {/* land label */}
      <text x="130" y="280" fontSize="11" fill="var(--text-muted, #6B7B74)">Daratan</text>
      <text x="430" y="90" fontSize="11" fill="#0E5A78">Laut</text>

      {/* mangrove overlay */}
      {overlays.mangrove && segments.map((s, i) => s.mangrove > 40 && (
        <circle key={"m"+i} cx={pts[i][0] + 12} cy={pts[i][1] - 12} r="7" fill="#2F7D5E" fillOpacity="0.5" />
      ))}

      {/* coastline segments */}
      {segments.map((s, i) => {
        if (i >= pts.length - 1) return null;
        const v = ccviOf(s);
        const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
        const isSel = selected === s.id;
        return (
          <g key={s.id} onClick={() => onSelect(s.id)} style={{ cursor: "pointer" }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={ccviColor(v)} strokeWidth={isSel ? 9 : 6} strokeLinecap="round" opacity={isSel ? 1 : 0.85} />
            {isSel && <circle cx={(x1+x2)/2} cy={(y1+y2)/2} r="5" fill="#fff" stroke={ccviColor(v)} strokeWidth="2" />}
          </g>
        );
      })}

      {/* population overlay dots */}
      {overlays.pop && segments.map((s, i) => i < pts.length - 1 && s.density > 2500 && (
        <circle key={"p"+i} cx={pts[i][0] - 14} cy={pts[i][1] + 14} r="4" fill="#C44E37" />
      ))}
      {/* asset overlay */}
      {overlays.asset && <rect x="300" y="240" width="8" height="8" fill="#1F2E29" />}

      {computing && (
        <g>
          <rect x="180" y="20" width="140" height="26" rx="13" fill="var(--surface-elevated, #fff)" stroke="var(--border-subtle)" />
          <text x="250" y="37" textAnchor="middle" fontSize="11" fill="var(--text-secondary, #3E4F49)">⚙ recompute CCVI…</text>
        </g>
      )}
    </svg>
  );
}

Object.assign(window, { CoastalVulnerability });
