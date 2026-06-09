// ============================================================
// Climate Modeling — LULC Change Detection · FITUR 2.2
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §2.2
// Swipe compare T1↔T2, Sankey transisi kelas, driver attribution,
// statistik (forest loss, deforestation rate, carbon impact)
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const LULC_REGIONS = [
  { id: "sintang", name: "Kab. Sintang", prov: "Kalbar", area: 21635, loss: 87400, rate: 0.92, carbon: 12.3, corridors: 8, center: [111.5, 0.05], zoom: 9 },
  { id: "kapuas", name: "Kab. Kapuas Hulu", prov: "Kalbar", area: 29842, loss: 54200, rate: 0.61, carbon: 7.8, corridors: 5, center: [112.9, 0.85], zoom: 9 },
  { id: "wajo", name: "Kab. Wajo", prov: "Sulsel", area: 2506, loss: 4100, rate: 0.34, carbon: 0.9, corridors: 2, center: [120.05, -4.0], zoom: 10 },
];

const LULC_CLASSES = [
  { id: "primer", label: "Hutan primer", color: "#1B5E3A", t1: 35, t2: 21 },
  { id: "sekunder", label: "Hutan sekunder", color: "#5B8C5A", t1: 28, t2: 26 },
  { id: "sawit", label: "Perkebunan sawit", color: "#C18820", t1: 12, t2: 27 },
  { id: "sawah", label: "Sawah", color: "#88C0A1", t1: 14, t2: 14 },
  { id: "terbuka", label: "Lahan terbuka", color: "#C49A6A", t1: 6, t2: 8 },
  { id: "permukiman", label: "Permukiman", color: "#A93E2A", t1: 5, t2: 4 },
];

// Sankey transitions (from→to, value%)
const LULC_FLOWS = [
  { from: "primer", to: "primer", v: 21 },
  { from: "primer", to: "sawit", v: 9 },
  { from: "primer", to: "sekunder", v: 5 },
  { from: "sekunder", to: "sekunder", v: 21 },
  { from: "sekunder", to: "sawit", v: 5 },
  { from: "sawit", to: "sawit", v: 12 },
  { from: "sawah", to: "sawah", v: 14 },
  { from: "terbuka", to: "terbuka", v: 6 },
  { from: "permukiman", to: "permukiman", v: 4 },
];

function LULCChangeDetection({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("sintang");
  const [focus, setFocus] = React.useState({ primer: true, sekunder: true, sawit: true, sawah: false });
  const [scn, setScn] = React.useState("trend");
  const [swipe, setSwipe] = React.useState(55);
  const [playing, setPlaying] = React.useState(false);
  const [onlyMajor, setOnlyMajor] = React.useState(true);
  const playRef = React.useRef(null);

  const region = LULC_REGIONS.find(r => r.id === regionId);

  React.useEffect(() => {
    if (playing) {
      let dir = 1;
      playRef.current = setInterval(() => {
        setSwipe(s => {
          if (s >= 95) dir = -1; if (s <= 5) dir = 1;
          return s + dir * 5;
        });
      }, 200);
    } else clearInterval(playRef.current);
    return () => clearInterval(playRef.current);
  }, [playing]);

  const flows = onlyMajor ? LULC_FLOWS.filter(f => f.v >= 1) : LULC_FLOWS;

  return (
    <div className="feat-page lulc-page" data-screen-label="Feature: LULC Change Detection">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>LULC Change Detection</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="layers" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.2 · CLIMATE MODELING</div>
              <h1>LULC Change Detection</h1>
              <div className="feat-sub">Deteksi perubahan tutupan lahan multi-temporal Sentinel-2 + ML · swipe compare, Sankey transisi, driver attribution</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
            <button className="primary-btn"><Icon name="play" size={14} />Jalankan Analisis</button>
          </div>
        </div>
      </div>

      <div className="lulc-body">
        {/* LEFT */}
        <aside className="lulc-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Wilayah</div>
            <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input" style={{ width: "100%" }}>
              {LULC_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name} · {r.prov}</option>)}
            </select>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Kelas Fokus</div>
            <div className="lulc-classes">
              {LULC_CLASSES.slice(0, 4).map(c => (
                <label key={c.id} className="fm-check"><input type="checkbox" checked={!!focus[c.id]} onChange={e => setFocus({ ...focus, [c.id]: e.target.checked })} /><span className="lulc-cdot" style={{ background: c.color }} />{c.label}</label>
              ))}
            </div>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Skenario Proyeksi</div>
            <div className="fm-radio-col">
              {[["trend","Trend (historical)"],["rpjmd","RPJMD-compliant"],["protect","Aggressive forest protection"]].map(([k, l]) => (
                <button key={k} className={`fm-radio-row ${scn === k ? "on" : ""}`} onClick={() => setScn(k)}>
                  <span className="fm-radio-dot" /><span>{l}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <div className="lulc-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Swipe Compare 2015 ↔ 2024 · {region.name}</div>
              <button className="ghost-btn small" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={12} />{playing ? "Pause" : "Time-lapse"}</button>
            </div>
            <div className="lulc-map-stage">
              <LULCMap swipe={swipe} focus={focus} region={region} />
              <div className="lulc-swipe-control">
                <span className="fm-swipe-label">2015</span>
                <input type="range" min="0" max="100" value={swipe} onChange={e => { setPlaying(false); setSwipe(+e.target.value); }} className="fm-swipe-range" />
                <span className="fm-swipe-label">2024</span>
              </div>
            </div>
          </div>

          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="git-branch" size={14} />Sankey Diagram Transisi 2015 → 2024
              <label className="lulc-sankey-filter"><input type="checkbox" checked={onlyMajor} onChange={e => setOnlyMajor(e.target.checked)} />Hanya transisi &gt;1%</label>
            </div>
            <div className="lulc-sankey"><LULCSankey flows={flows} /></div>
          </div>
        </div>

        {/* RIGHT stats */}
        <aside className="lulc-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Statistik &amp; Metrik</div>
            <div className="lulc-stats">
              <div className="lulc-stat"><span>Total area</span><strong>{region.area.toLocaleString("id-ID")} km²</strong></div>
              <div className="lulc-stat hi"><span>Forest loss 2015-2024</span><strong>{region.loss.toLocaleString("id-ID")} ha</strong></div>
              <div className="lulc-stat"><span>Deforestation rate</span><strong>{region.rate}%/yr</strong></div>
            </div>
            <div className="lulc-driver">
              <div className="lulc-driver-label">Driver utama (heuristic):</div>
              <div className="lulc-driver-bar">
                <div style={{ width: "62%", background: "#C18820" }}>Sawit 62%</div>
                <div style={{ width: "24%", background: "#A93E2A" }}>Permukiman</div>
                <div style={{ width: "14%", background: "#9DACA4" }}></div>
              </div>
            </div>
          </div>

          <div className="rdtr-panel lulc-impact">
            <div className="rdtr-panel-head">Cross-module Impact</div>
            <button className="lulc-impact-row" onClick={() => setRoute("feature-fire")}>
              <div className="lulc-impact-icon" style={{ background: "var(--danger-50)", color: "var(--danger-700)" }}><Icon name="thermometer" size={15} /></div>
              <div className="lulc-impact-body">
                <div className="lulc-impact-t">Carbon impact</div>
                <div className="lulc-impact-m">~{region.carbon} MtCO₂ released</div>
              </div>
              <Icon name="arrow-right" size={13} />
            </button>
            <button className="lulc-impact-row" onClick={() => setRoute("feature-vuln")}>
              <div className="lulc-impact-icon" style={{ background: "var(--success-50)", color: "var(--success-700)" }}><Icon name="globe" size={15} /></div>
              <div className="lulc-impact-body">
                <div className="lulc-impact-t">Biodiversity impact</div>
                <div className="lulc-impact-m">{region.corridors} koridor terancam</div>
              </div>
              <Icon name="arrow-right" size={13} />
            </button>
            <button className="lulc-impact-row" onClick={() => setRoute("feature-rdtr")}>
              <div className="lulc-impact-icon" style={{ background: "var(--info-50)", color: "var(--info-700)" }}><Icon name="map" size={15} /></div>
              <div className="lulc-impact-body">
                <div className="lulc-impact-t">Proyeksi RDTR</div>
                <div className="lulc-impact-m">Restriksi zona konversi</div>
              </div>
              <Icon name="arrow-right" size={13} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LULCMap({ swipe, focus, region }) {
  const c = (region && region.center) || [111.5, 0.05];
  const cols = 11, rows = 8, step = 0.045;
  const lng0 = c[0] - (cols / 2) * step, lat0 = c[1] + (rows / 2) * step;
  const colorOf = (id) => LULC_CLASSES.find(k => k.id === id)?.color || "#ccc";
  const splitLng = lng0 + (swipe / 100) * cols * step;

  const polygons = [];
  for (let r = 0; r < rows; r++) for (let col = 0; col < cols; col++) {
    const seed = ((r * cols + col) * 29) % 100;
    const c2015 = seed < 55 ? "primer" : seed < 78 ? "sekunder" : seed < 88 ? "sawah" : "permukiman";
    const converted = seed < 55 && seed % 3 === 0;
    const c2024 = converted ? "sawit" : c2015;
    const cellLng = lng0 + col * step, cellLat = lat0 - r * step;
    const showT2 = (cellLng + step / 2) < splitLng;
    const id = showT2 ? c2024 : c2015;
    const ring = [[cellLng, cellLat], [cellLng + step, cellLat], [cellLng + step, cellLat - step], [cellLng, cellLat - step]];
    polygons.push({
      coords: [ring], color: showT2 && converted ? "#8B1A1A" : "#ffffff",
      weight: showT2 && converted ? 1.4 : 0.4, fillColor: colorOf(id),
      fillOpacity: showT2 && converted ? 0.92 : 0.72,
      tooltip: `${showT2 ? "2024" : "2015"}: <b>${LULC_CLASSES.find(k => k.id === id)?.label || id}</b>${converted && showT2 ? " · <span style='color:#C44E37'>terkonversi</span>" : ""}`,
    });
  }
  // garis swipe vertikal
  const lines = [{
    coords: [[splitLng, lat0 + step * 0.2], [splitLng, lat0 - rows * step - step * 0.2]],
    color: "#1F2E29", weight: 2.5, dash: "5 3", tooltip: "Swipe 2015 ↔ 2024",
  }];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap key={(region && region.id) || "lulc"} center={c} zoom={(region && region.zoom) || 9} basemap="positron" polygons={polygons} lines={lines} controls={true} />
    </div>
  );
}

function LULCSankey({ flows }) {
  const colorOf = (id) => LULC_CLASSES.find(k => k.id === id)?.color || "#ccc";
  // left nodes & right nodes stacked
  const leftClasses = [...new Set(flows.map(f => f.from))];
  const rightClasses = [...new Set(flows.map(f => f.to))];
  let ly = 10, lyPos = {};
  leftClasses.forEach(c => { const h = LULC_CLASSES.find(k => k.id === c).t1 * 3; lyPos[c] = { y: ly, h }; ly += h + 6; });
  let ry = 10, ryPos = {};
  rightClasses.forEach(c => { const h = LULC_CLASSES.find(k => k.id === c).t2 * 3; ryPos[c] = { y: ry, h }; ry += h + 6; });
  // track offsets within each node
  const lOff = {}, rOff = {};
  leftClasses.forEach(c => lOff[c] = 0); rightClasses.forEach(c => rOff[c] = 0);

  return (
    <svg viewBox="0 0 480 230" className="lulc-sankey-svg">
      {/* flows */}
      {flows.map((f, i) => {
        const lp = lyPos[f.from], rp = ryPos[f.to];
        if (!lp || !rp) return null;
        const h = f.v * 3;
        const y1 = lp.y + lOff[f.from]; lOff[f.from] += h;
        const y2 = rp.y + rOff[f.to]; rOff[f.to] += h;
        const x1 = 110, x2 = 370;
        const d = `M${x1},${y1} C${(x1+x2)/2},${y1} ${(x1+x2)/2},${y2} ${x2},${y2} L${x2},${y2+h} C${(x1+x2)/2},${y2+h} ${(x1+x2)/2},${y1+h} ${x1},${y1+h} Z`;
        return <path key={i} d={d} fill={colorOf(f.from)} fillOpacity={f.from === f.to ? 0.3 : 0.55} />;
      })}
      {/* left nodes */}
      {leftClasses.map(c => {
        const p = lyPos[c]; const cl = LULC_CLASSES.find(k => k.id === c);
        return <g key={"l"+c}>
          <rect x="96" y={p.y} width="14" height={p.h} fill={cl.color} />
          <text x="92" y={p.y + p.h / 2 + 3} fontSize="9" fill="var(--text-secondary,#3E4F49)" textAnchor="end">{cl.label} {cl.t1}%</text>
        </g>;
      })}
      {/* right nodes */}
      {rightClasses.map(c => {
        const p = ryPos[c]; const cl = LULC_CLASSES.find(k => k.id === c);
        return <g key={"r"+c}>
          <rect x="370" y={p.y} width="14" height={p.h} fill={cl.color} />
          <text x="388" y={p.y + p.h / 2 + 3} fontSize="9" fill="var(--text-secondary,#3E4F49)">{cl.label} {cl.t2}%{c === "sawit" ? " ↑" : ""}</text>
        </g>;
      })}
      <text x="103" y="225" fontSize="9" fill="var(--gray-500)" textAnchor="middle">2015</text>
      <text x="377" y="225" fontSize="9" fill="var(--gray-500)" textAnchor="middle">2024</text>
    </svg>
  );
}

Object.assign(window, { LULCChangeDetection });
