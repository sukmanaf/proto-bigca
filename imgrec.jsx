// ============================================================
// AI — Image & Pattern Recognition Service · FITUR 6.1
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §6.1
// Layanan horizontal: object detection / segmentation / anomaly /
// damage assessment dari citra satelit/UAV. Pre-trained models +
// fine-tuning + active learning.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const IMG_TASKS = [
  { id: "object", label: "Object Detection", icon: "target", desc: "kapal, bangunan, pohon individu" },
  { id: "segment", label: "Semantic Segmentation", icon: "layers", desc: "infrastruktur, vegetasi sehat/sakit" },
  { id: "anomaly", label: "Anomaly Visual", icon: "alert-triangle", desc: "oil spill, illegal logging/mining" },
  { id: "damage", label: "Damage Assessment", icon: "siren", desc: "post-event disaster" },
];

const IMG_MODELS = {
  object: [
    { id: "yolov8", name: "YOLOv8 generic", src: "Open" },
    { id: "ship-sar", name: "Ship detection SAR (DOTA)", src: "Open" },
    { id: "deepforest", name: "Tree detection (DeepForest)", src: "Open" },
  ],
  segment: [
    { id: "maskrcnn", name: "Building footprint (Mask R-CNN)", src: "Microsoft" },
    { id: "mmseg", name: "Land infrastructure (MMSeg)", src: "Open" },
  ],
  anomaly: [
    { id: "oilspill", name: "Oil spill SAR (U-Net)", src: "Internal" },
    { id: "mining", name: "Mining detection", src: "Internal" },
    { id: "logging", name: "Illegal logging", src: "Internal" },
  ],
  damage: [
    { id: "xview2", name: "Building damage (xView2)", src: "Open" },
  ],
};

// Detection results per task
const IMG_RESULTS = {
  object: {
    label: "kapal terdeteksi", color: "#0E5A78",
    items: [
      { id: 1, type: "cargo_vessel", conf: 0.94, area: "—", x: 30, y: 28, w: 14, h: 8 },
      { id: 2, type: "fishing_boat", conf: 0.88, area: "—", x: 58, y: 52, w: 9, h: 6 },
      { id: 3, type: "fishing_boat", conf: 0.79, area: "—", x: 42, y: 70, w: 8, h: 5 },
      { id: 4, type: "tanker", conf: 0.91, area: "—", x: 70, y: 35, w: 16, h: 9 },
    ],
  },
  segment: {
    label: "kelas tersegmentasi", color: "#5B8C5A",
    items: [
      { id: 1, type: "bangunan", conf: 0.92, area: "142 unit" },
      { id: 2, type: "vegetasi sehat", conf: 0.87, area: "68 ha" },
      { id: 3, type: "vegetasi stress", conf: 0.81, area: "12 ha" },
      { id: 4, type: "jalan/perkerasan", conf: 0.95, area: "8.4 km" },
    ],
  },
  anomaly: {
    label: "anomali terdeteksi", color: "#8B1A1A",
    items: [
      { id: 1, type: "oil_slick", conf: 0.91, area: "14.2 ha", x: 34, y: 40, w: 22, h: 16 },
      { id: 2, type: "oil_sheen", conf: 0.76, area: "6.8 ha", x: 62, y: 58, w: 14, h: 11 },
      { id: 3, type: "vessel_source", conf: 0.83, area: "—", x: 50, y: 30, w: 6, h: 4 },
    ],
  },
  damage: {
    label: "bangunan dinilai", color: "#C44E37",
    items: [
      { id: 1, type: "destroyed", conf: 0.89, area: "23 unit" },
      { id: 2, type: "major_damage", conf: 0.85, area: "57 unit" },
      { id: 3, type: "minor_damage", conf: 0.78, area: "112 unit" },
      { id: 4, type: "no_damage", conf: 0.93, area: "340 unit" },
    ],
  },
};

function ImageRecognition({ setRoute, ctx, openAI }) {
  const [task, setTask] = React.useState("anomaly");
  const [model, setModel] = React.useState("oilspill");
  const [conf, setConf] = React.useState(0.7);
  const [source, setSource] = React.useState("upload");
  const [running, setRunning] = React.useState(false);
  const [done, setDone] = React.useState(true);
  const [selected, setSelected] = React.useState(1);

  React.useEffect(() => {
    setModel(IMG_MODELS[task][0].id);
    setDone(true); setSelected(1);
  }, [task]);

  const result = IMG_RESULTS[task];
  const shown = result.items.filter(it => it.conf >= conf);
  const sel = result.items.find(it => it.id === selected) || result.items[0];

  const runInference = () => {
    setRunning(true); setDone(false);
    setTimeout(() => { setRunning(false); setDone(true); }, 1700);
  };

  return (
    <div className="feat-page imgrec-page" data-screen-label="Feature: Image Recognition">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Image &amp; Pattern Recognition</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="eye" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.1 · AI · HORIZONTAL</div>
              <h1>Image &amp; Pattern Recognition</h1>
              <div className="feat-sub">Deteksi & klasifikasi pola dari citra satelit/UAV · object detection, segmentation, anomaly, damage assessment</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="plus" size={14} />Train new model</button>
          </div>
        </div>
      </div>

      {/* task selector */}
      <div className="imgrec-tasks">
        {IMG_TASKS.map(t => (
          <button key={t.id} className={`imgrec-task ${task === t.id ? "on" : ""}`} onClick={() => setTask(t.id)}>
            <div className="imgrec-task-icon"><Icon name={t.icon} size={16} /></div>
            <div className="imgrec-task-body">
              <div className="imgrec-task-label">{t.label}</div>
              <div className="imgrec-task-desc">{t.desc}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="imgrec-body">
        {/* LEFT controls */}
        <aside className="imgrec-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Model</div>
            <select value={model} onChange={e => setModel(e.target.value)} className="text-input" style={{ width: "100%" }}>
              {IMG_MODELS[task].map(m => <option key={m.id} value={m.id}>{m.name} · {m.src}</option>)}
            </select>
            <label className="fm-field" style={{ marginTop: 12 }}>
              <span>Confidence threshold: <strong>{conf.toFixed(2)}</strong></span>
              <input type="range" min="0.3" max="0.95" step="0.01" value={conf} onChange={e => setConf(+e.target.value)} className="weight-range" style={{ "--track-color": "var(--primary-600)" }} />
            </label>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Input</div>
            <div className="fm-radio-col">
              {[["aoi","AOI Sentinel-1 latest pass"],["upload","Upload citra UAV"],["cctv","CCTV stream live"]].map(([k, l]) => (
                <button key={k} className={`fm-radio-row ${source === k ? "on" : ""}`} onClick={() => setSource(k)}>
                  <span className="fm-radio-dot" /><span>{l}</span>
                </button>
              ))}
            </div>
            {source === "upload" && (
              <div className="imgrec-upload">
                <Icon name="download" size={20} />
                <div className="imgrec-upload-t">Drag-drop citra UAV</div>
                <div className="imgrec-upload-m">3 files · 2.3 GB ter-upload</div>
              </div>
            )}
            <button className="primary-btn rdtr-gen" onClick={runInference} disabled={running} style={{ marginTop: 12 }}>
              {running ? <><span className="whatif-spinner" />Running inference…</> : <><Icon name="play" size={14} />Run Inference</>}
            </button>
          </div>

          <div className="rdtr-panel imgrec-active">
            <div className="rdtr-panel-head"><Icon name="loader" size={13} />Active Learning</div>
            <p>Model menandai kasus low-confidence (&lt; {conf.toFixed(2)}) → review manusia → retrain otomatis.</p>
            <div className="imgrec-active-stat"><strong>{result.items.filter(it => it.conf < conf).length}</strong> kasus menunggu review</div>
          </div>
        </aside>

        {/* CENTER image + detections */}
        <div className="imgrec-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="eye" size={14} />Hasil Inference · {IMG_TASKS.find(t => t.id === task).label}</div>
              <div className="muted" style={{ fontSize: 11 }}>{shown.length} {result.label} (≥ {conf.toFixed(2)})</div>
            </div>
            <div className="imgrec-stage">
              <ImgRecCanvas task={task} result={result} shown={shown} selected={selected} onSelect={setSelected} running={running} done={done} />
            </div>
          </div>
        </div>

        {/* RIGHT detections list */}
        <aside className="imgrec-results">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Deteksi ({shown.length})</div>
            <div className="imgrec-det-list">
              {shown.map(it => (
                <button key={it.id} className={`imgrec-det ${selected === it.id ? "on" : ""}`} onClick={() => setSelected(it.id)}>
                  <div className="imgrec-det-head">
                    <span className="imgrec-det-type">{it.type}</span>
                    <span className="imgrec-det-conf" style={{ color: it.conf >= 0.85 ? "var(--success-700)" : "var(--warning-700)" }}>{(it.conf*100).toFixed(0)}%</span>
                  </div>
                  {it.area !== "—" && <div className="imgrec-det-area">Area: {it.area}</div>}
                </button>
              ))}
            </div>
          </div>

          {sel && (
            <div className="rdtr-panel">
              <div className="rdtr-panel-head">Detail: {sel.type}</div>
              <div className="imgrec-detail">
                <div className="imgrec-detail-row"><span className="muted">Confidence</span><strong>{(sel.conf*100).toFixed(0)}%</strong></div>
                <div className="imgrec-detail-row"><span className="muted">Area</span><strong>{sel.area}</strong></div>
                <div className="imgrec-detail-row"><span className="muted">Coords</span><strong className="mono">−5.14°, 119.43°</strong></div>
                <div className="imgrec-validate">
                  <button className="imgrec-vbtn ok"><Icon name="check-circle" size={13} />Validate</button>
                  <button className="imgrec-vbtn reject"><Icon name="x-circle" size={13} />Reject</button>
                </div>
              </div>
            </div>
          )}

          <div className="imgrec-foot-actions">
            <button className="ghost-btn rdtr-full"><Icon name="pin" size={13} />Save annotations</button>
            {task === "anomaly" && <button className="primary-btn rdtr-full" onClick={() => setRoute("feature-ews")}><Icon name="zap" size={13} />Trigger alert</button>}
            {task === "damage" && <button className="primary-btn rdtr-full" onClick={() => setRoute("feature-flood")}><Icon name="siren" size={13} />Ke Crisis Map</button>}
          </div>
        </aside>
      </div>
    </div>
  );
}

function ImgRecCanvas({ task, result, shown, selected, onSelect, running, done }) {
  const isSeg = task === "segment" || task === "damage";
  return (
    <svg viewBox="0 0 500 340" className="imgrec-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="ir-sat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2e1f" /><stop offset="1" stopColor="#0d1a14" />
        </linearGradient>
        <pattern id="ir-water" width="500" height="340" patternUnits="userSpaceOnUse">
          <rect width="500" height="340" fill="#0d2230" />
        </pattern>
      </defs>
      {/* "satellite" background */}
      <rect width="500" height="340" fill={task === "object" || task === "anomaly" ? "url(#ir-water)" : "url(#ir-sat)"} />
      {/* texture noise */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect key={i} x={(i * 53) % 500} y={(i * 37) % 340} width="40" height="40" fill="#fff" opacity={0.015 + (i % 4) * 0.004} />
      ))}

      {/* segmentation masks (full-canvas colored regions) */}
      {isSeg && done && shown.map((it, i) => {
        const colors = { bangunan: "#C98B3A", "vegetasi sehat": "#5B8C5A", "vegetasi stress": "#C18820", "jalan/perkerasan": "#9DACA4", destroyed: "#8B1A1A", major_damage: "#C44E37", minor_damage: "#C18820", no_damage: "#5B8C5A" };
        const x = (i % 2) * 250, y = Math.floor(i / 2) * 170;
        return <rect key={it.id} x={x} y={y} width="250" height="170" fill={colors[it.type] || "#888"} fillOpacity={selected === it.id ? 0.55 : 0.32} stroke="#fff" strokeWidth={selected === it.id ? 2 : 0.5} onClick={() => onSelect(it.id)} style={{ cursor: "pointer" }} />;
      })}
      {isSeg && done && shown.map((it, i) => {
        const x = (i % 2) * 250 + 10, y = Math.floor(i / 2) * 170 + 22;
        return <text key={"t"+it.id} x={x} y={y} fontSize="12" fill="#fff" fontWeight="600" style={{ pointerEvents: "none" }}>{it.type}</text>;
      })}

      {/* bounding boxes (object/anomaly) */}
      {!isSeg && done && shown.map(it => {
        const x = it.x * 5, y = it.y * 3.4, w = it.w * 5, h = it.h * 3.4;
        const isSel = selected === it.id;
        return (
          <g key={it.id} onClick={() => onSelect(it.id)} style={{ cursor: "pointer" }}>
            <rect x={x} y={y} width={w} height={h} fill={result.color} fillOpacity={isSel ? 0.25 : 0.1} stroke={result.color} strokeWidth={isSel ? 2.5 : 1.5} />
            <rect x={x} y={y - 15} width={Math.max(60, it.type.length * 6.5)} height="14" fill={result.color} />
            <text x={x + 4} y={y - 4} fontSize="9" fill="#fff">{it.type} {(it.conf*100).toFixed(0)}%</text>
          </g>
        );
      })}

      {running && (
        <g>
          <rect width="500" height="340" fill="rgba(13,26,20,0.6)" />
          <text x="250" y="165" textAnchor="middle" fontSize="13" fill="#fff">⚙ Running inference (GPU)…</text>
          <rect x="170" y="180" width="160" height="4" rx="2" fill="#334063" />
          <rect x="170" y="180" width="100" height="4" rx="2" fill="var(--accent-sea, #2A9D8F)">
            <animate attributeName="width" from="20" to="160" dur="1.5s" repeatCount="indefinite" />
          </rect>
        </g>
      )}
      {/* scale + source */}
      <text x="12" y="330" fontSize="9" fill="#9DACA4">{task === "anomaly" || task === "object" ? "Sentinel-1 SAR · VV pol" : "Sentinel-2 · UAV mosaic"} · 10m</text>
    </svg>
  );
}

Object.assign(window, { ImageRecognition });
