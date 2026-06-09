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
  { id: "S-042", kec: "Sayung", km: 1.2, cvi: 0.85, svi: 0.72, eri: 0.18, subsidence: 9.4, density: 3800, mangrove: 7, lng: 110.475, lat: -6.945 },
  { id: "S-043", kec: "Sayung", km: 1.1, cvi: 0.78, svi: 0.68, eri: 0.24, subsidence: 8.1, density: 3200, mangrove: 12, lng: 110.482, lat: -6.918 },
  { id: "S-044", kec: "Wedung", km: 1.3, cvi: 0.62, svi: 0.55, eri: 0.41, subsidence: 5.2, density: 2100, mangrove: 34, lng: 110.488, lat: -6.872 },
  { id: "S-045", kec: "Wedung", km: 1.0, cvi: 0.48, svi: 0.44, eri: 0.58, subsidence: 3.8, density: 1400, mangrove: 52, lng: 110.495, lat: -6.832 },
  { id: "S-046", kec: "Wedung", km: 1.2, cvi: 0.35, svi: 0.38, eri: 0.71, subsidence: 2.1, density: 900, mangrove: 78, lng: 110.503, lat: -6.800 },
  { id: "S-047", kec: "Bonang", km: 1.1, cvi: 0.41, svi: 0.49, eri: 0.62, subsidence: 2.9, density: 1600, mangrove: 64, lng: 110.522, lat: -6.836 },
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
  // garis pantai per-segmen diwarnai CCVI
  const lines = [];
  for (let i = 0; i < segments.length - 1; i++) {
    const v = ccviOf(segments[i]);
    lines.push({
      coords: [[segments[i].lng, segments[i].lat], [segments[i + 1].lng, segments[i + 1].lat]],
      color: ccviColor(v), weight: selected === segments[i].id ? 9 : 6,
      onClick: () => onSelect(segments[i].id),
      tooltip: `${segments[i].id} · ${segments[i].kec} · CCVI ${v} (${ccviCat(v)})`,
    });
  }
  // titik per-segmen (klik + seleksi + overlay)
  const circles = segments.map(s => {
    const v = ccviOf(s);
    const isSel = selected === s.id;
    return {
      lng: s.lng, lat: s.lat, radius: isSel ? 9 : 6,
      color: ccviColor(v), fillOpacity: isSel ? 1 : 0.85,
      onClick: () => onSelect(s.id),
      tooltip: `<div class="rrm-pop-title">${s.id} · ${s.kec}</div>
        <div class="rrm-pop-row"><span>CCVI</span><b style="color:${ccviColor(v)}">${v} (${ccviCat(v)})</b></div>
        <div class="rrm-pop-row"><span>Subsidence</span><b>${s.subsidence} cm/th</b></div>
        <div class="rrm-pop-row"><span>Mangrove</span><b>${s.mangrove}%</b></div>`,
    };
  });
  // overlay marker: mangrove tinggi (hijau) & populasi padat (merah)
  const markers = [];
  if (overlays.mangrove) segments.filter(s => s.mangrove > 40).forEach(s =>
    markers.push({ lng: s.lng + 0.012, lat: s.lat + 0.006, html: `<div style="width:10px;height:10px;border-radius:50%;background:#2F7D5E;opacity:.7;border:1px solid #fff;"></div>` }));
  if (overlays.pop) segments.filter(s => s.density > 2500).forEach(s =>
    markers.push({ lng: s.lng - 0.012, lat: s.lat - 0.006, html: `<div style="width:8px;height:8px;border-radius:50%;background:#C44E37;border:1px solid #fff;"></div>` }));

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap center={[110.50, -6.87]} zoom={11.2} basemap="positron" lines={lines} circles={circles} markers={markers} controls={true} />
      {computing && (
        <div style={{ position: "absolute", inset: 0, zIndex: 600, background: "rgba(15,31,26,0.4)", display: "grid", placeItems: "center", color: "#fff", fontSize: 13 }}>
          <span><span className="whatif-spinner" style={{ marginRight: 8 }} />recompute CCVI…</span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { CoastalVulnerability });
