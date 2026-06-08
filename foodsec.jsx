// ============================================================
// Sectoral — Food Security: Rice Field Flood & Drought · FITUR 4.2
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §4.2
// Sawah aktif + yield baseline (DSSAT) + hazard impact →
// yield loss map, KPI kerugian, time-series produksi, intervensi
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const FS_REGIONS = [
  { id: "jateng", name: "Jawa Tengah", sawah: 723000 },
  { id: "jabar", name: "Jawa Barat", sawah: 925000 },
  { id: "sulsel", name: "Sulawesi Selatan", sawah: 658000 },
];

const FS_SEASONS = ["MT-1 2026", "MT-2 2026", "Gadu 2026", "Walik 2025"];
const FS_SCENARIOS = [
  { id: "current", label: "Current obs", mult: 1.0 },
  { id: "2026", label: "2026 Forecast", mult: 1.18 },
  { id: "2050", label: "2050 SSP2-4.5", mult: 1.42 },
];

// kab impact cells (mock) — name, lossPct, cause, x, y, w, h
const FS_KABS = [
  { id: "demak", name: "Demak", loss: 30, cause: "banjir rob + drainase buruk", petani: 12000, x: 32, y: 30 },
  { id: "pekalongan", name: "Pekalongan", loss: 42, cause: "rob pesisir", petani: 9400, x: 18, y: 24 },
  { id: "grobogan", name: "Grobogan", loss: 18, cause: "kekeringan MT-2", petani: 7200, x: 55, y: 42 },
  { id: "kudus", name: "Kudus", loss: 25, cause: "banjir Sungai Wulan", petani: 5100, x: 44, y: 28 },
  { id: "pati", name: "Pati", loss: 12, cause: "kekeringan ringan", petani: 6800, x: 58, y: 22 },
  { id: "sragen", name: "Sragen", loss: 8, cause: "aman relatif", petani: 4200, x: 68, y: 56 },
];

function lossColor(p) {
  if (p >= 50) return "#8B1A1A";
  if (p >= 20) return "#C18820";
  if (p >= 5) return "#E9A352";
  return "#5B8C5A";
}

function FoodSecurity({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("jateng");
  const [season, setSeason] = React.useState("MT-1 2026");
  const [hazards, setHazards] = React.useState({ banjir: true, kekeringan: true, hama: false });
  const [scn, setScn] = React.useState("2026");
  const [selected, setSelected] = React.useState("demak");
  const [calculating, setCalculating] = React.useState(false);

  const region = FS_REGIONS.find(r => r.id === regionId);
  const cs = FS_SCENARIOS.find(s => s.id === scn);
  const sel = FS_KABS.find(k => k.id === selected);

  const affectedHa = Math.round(region.sawah * 0.25 * cs.mult / 1.18);
  const lossBanjir = hazards.banjir ? Math.round(48000 * cs.mult) : 0;
  const lossDrought = hazards.kekeringan ? Math.round(67000 * cs.mult) : 0;
  const totalLoss = lossBanjir + lossDrought;
  const nilai = Math.round(totalLoss * 5); // IDR M (~5M/1000ton scaled)

  const calc = () => { setCalculating(true); setTimeout(() => setCalculating(false), 1300); };

  return (
    <div className="feat-page fs-page" data-screen-label="Feature: Food Security">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sectoral")} className="link-btn">{tr("Analisis Sektoral")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Food Security — Rice Field</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sectoral"><Icon name="layers" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 4.2 · SECTORAL</div>
              <h1>Food Security — Rice Field Impact</h1>
              <div className="feat-sub">Dampak banjir &amp; kekeringan pada sawah · deteksi sawah aktif SAR + yield DSSAT · early warning Kementan</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
            <button className="primary-btn"><Icon name="send" size={14} />Alert Kementan</button>
          </div>
        </div>
      </div>

      <div className="fs-body">
        {/* LEFT params */}
        <aside className="fs-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Parameter</div>
            <label className="fm-field">
              <span>Provinsi</span>
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {FS_REGIONS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </label>
            <label className="fm-field" style={{ marginTop: 10 }}>
              <span>Musim</span>
              <select value={season} onChange={e => setSeason(e.target.value)} className="text-input">
                {FS_SEASONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Hazard</div>
            <div className="fs-hazards">
              {[["banjir","Banjir"],["kekeringan","Kekeringan"],["hama","Hama (TBD)"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={hazards[k]} disabled={k === "hama"} onChange={e => setHazards({ ...hazards, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Skenario Climate</div>
            <div className="fm-radio-col">
              {FS_SCENARIOS.map(s => (
                <button key={s.id} className={`fm-radio-row ${scn === s.id ? "on" : ""}`} onClick={() => setScn(s.id)}>
                  <span className="fm-radio-dot" /><span>{s.label}</span>
                </button>
              ))}
            </div>
            <button className="primary-btn rdtr-gen" onClick={calc} disabled={calculating} style={{ marginTop: 12 }}>
              {calculating ? <><span className="whatif-spinner" />Calculating…</> : <><Icon name="play" size={14} />Calculate</>}
            </button>
          </div>
        </aside>

        {/* CENTER map + timeseries */}
        <div className="fs-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Peta Yield Loss · {region.name} · {season}</div>
              <div className="fs-legend">
                <span><span className="sw" style={{ background: "#8B1A1A" }} />&gt; 50%</span>
                <span><span className="sw" style={{ background: "#C18820" }} />20–50%</span>
                <span><span className="sw" style={{ background: "#E9A352" }} />&lt; 20%</span>
                <span><span className="sw" style={{ background: "#5B8C5A" }} />aman</span>
              </div>
            </div>
            <div className="fs-map-stage">
              <FSMap kabs={FS_KABS} selected={selected} onSelect={setSelected} hazards={hazards} calculating={calculating} />
            </div>
          </div>

          <div className="rdtr-detail-card">
            <div className="rdtr-detail-head"><Icon name="trending-up" size={14} />Produksi 5 Tahun + Proyeksi</div>
            <div className="fs-ts"><FSTimeSeries /></div>
          </div>
        </div>

        {/* RIGHT KPI + intervensi */}
        <aside className="fs-right">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">KPI Dashboard</div>
            <div className="fs-kpis">
              <div className="fs-kpi"><span>Sawah aktif</span><strong>{region.sawah.toLocaleString("id-ID")} ha</strong></div>
              <div className="fs-kpi"><span>Sawah terdampak</span><strong>{affectedHa.toLocaleString("id-ID")} ha <em>({Math.round(affectedHa/region.sawah*100)}%)</em></strong></div>
              <div className="fs-kpi"><span>Loss banjir</span><strong>~{lossBanjir.toLocaleString("id-ID")} ton</strong></div>
              <div className="fs-kpi"><span>Loss kekeringan</span><strong>~{lossDrought.toLocaleString("id-ID")} ton</strong></div>
              <div className="fs-kpi total"><span>Total kerugian</span><strong>~{totalLoss.toLocaleString("id-ID")} ton</strong></div>
              <div className="fs-kpi"><span>Nilai estimasi</span><strong>IDR {nilai.toLocaleString("id-ID")} M</strong></div>
            </div>
            <div className="fs-baseline"><Icon name="arrow-up" size={12} />vs baseline tahun lalu: <strong>+{Math.round((cs.mult - 1) * 100 + 4)}%</strong></div>
          </div>

          {sel && (
            <div className="rdtr-panel fs-intervensi">
              <div className="rdtr-panel-head">Prioritas Intervensi
                <span className="rdtr-comp-tag">klik kab di peta</span>
              </div>
              <div className="fs-int-head">
                <span className="fs-int-name">Kab. {sel.name}</span>
                <span className="fs-int-loss" style={{ color: lossColor(sel.loss) }}>loss {sel.loss}%</span>
              </div>
              <div className="fs-int-cause">Penyebab: {sel.cause}</div>
              <ol className="fs-int-reco">
                <li>Pembangunan tanggul lokal <span className="fs-pri high">priority high</span></li>
                <li>Asuransi padi (AUTP) untuk {sel.petani.toLocaleString("id-ID")} petani</li>
                <li>Varietas tahan banjir (Inpari 30) MT berikutnya</li>
              </ol>
              <button className="fm-crosslink" onClick={() => setRoute("feature-rdtr")}>
                <Icon name="map" size={14} /><span>Detail RDTR untuk {sel.name}</span><Icon name="chevron-right" size={12} />
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function FSMap({ kabs, selected, onSelect, hazards, calculating }) {
  return (
    <svg viewBox="0 0 500 320" className="rdtr-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="fs-rice" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#5B8C5A" strokeWidth="1" opacity="0.25" />
        </pattern>
      </defs>
      <rect width="500" height="320" fill="var(--surface-sunken, #E9EEEA)" />
      {/* province outline filled with rice pattern */}
      <path d="M60,60 L440,50 L450,240 L70,250 Z" fill="url(#fs-rice)" stroke="var(--border-strong)" strokeWidth="1.2" />
      {/* kab impact blocks */}
      {kabs.map(k => {
        const cx = 60 + k.x * 3.8, cy = 60 + k.y * 2.4;
        const isSel = selected === k.id;
        const r = 22 + k.loss * 0.4;
        return (
          <g key={k.id} onClick={() => onSelect(k.id)} style={{ cursor: "pointer" }}>
            <circle cx={cx} cy={cy} r={r} fill={lossColor(k.loss)} fillOpacity={isSel ? 0.85 : 0.6} stroke={isSel ? "var(--text-primary)" : "#fff"} strokeWidth={isSel ? 2.5 : 1.2} />
            <text x={cx} y={cy - 2} fontSize="10" fill="#fff" textAnchor="middle" fontWeight="600">{k.name}</text>
            <text x={cx} y={cy + 11} fontSize="9" fill="#fff" textAnchor="middle">{k.loss}%</text>
          </g>
        );
      })}
      {calculating && (
        <g>
          <rect width="500" height="320" fill="rgba(15,31,26,0.4)" />
          <text x="250" y="160" textAnchor="middle" fontSize="13" fill="#fff">⚙ DSSAT yield + impact functions…</text>
        </g>
      )}
    </svg>
  );
}

function FSTimeSeries() {
  return (
    <svg viewBox="0 0 480 150" className="fs-ts-svg">
      <rect width="480" height="150" fill="var(--surface,#fff)" />
      <line x1="40" y1="120" x2="465" y2="120" stroke="var(--gray-300)" />
      <line x1="40" y1="15" x2="40" y2="120" stroke="var(--gray-300)" />
      {[2,3,4,5].map((v, i) => <text key={v} x="32" y={123 - i * 30} fontSize="9" fill="var(--gray-500)" textAnchor="end">{v}</text>)}
      {/* baseline historic */}
      <polyline points="60,55 130,52 200,50 270,54" fill="none" stroke="var(--gray-700)" strokeWidth="2" />
      {[60,130,200,270].map((x, i) => <circle key={i} cx={x} cy={[55,52,50,54][i]} r="3" fill="var(--gray-700)" />)}
      {/* optimis */}
      <polyline points="270,54 340,48 410,42 465,38" fill="none" stroke="var(--success-600,#2F7D5E)" strokeWidth="2" strokeDasharray="4 3" />
      {/* pesimis */}
      <polyline points="270,54 340,68 410,82 465,92" fill="none" stroke="var(--danger-600)" strokeWidth="2" strokeDasharray="4 3" />
      <text x="468" y="36" fontSize="9" fill="var(--success-700)" textAnchor="end">optimis</text>
      <text x="468" y="100" fontSize="9" fill="var(--danger-700)" textAnchor="end">⚠ pesimis</text>
      {["2020","2022","2024","2026","2028","2030"].map((y, i) => <text key={y} x={60 + i * 81} y="138" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{y}</text>)}
      <line x1="270" y1="15" x2="270" y2="120" stroke="var(--gray-300)" strokeDasharray="2 2" />
      <text x="270" y="13" fontSize="8" fill="var(--gray-500)" textAnchor="middle">now</text>
    </svg>
  );
}

Object.assign(window, { FoodSecurity });
