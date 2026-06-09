// ============================================================
// FITUR 5.8 — What-If Quick Simulator (SDSS Core)
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2.md §5.8
// "Interaktif quick-simulation untuk eksplorasi cepat tanpa
//  membangun full scenario di 5.2"
// Sliders → debounced recompute → outcome live update
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const WHATIF_REGIONS = [
  { id: "sintang",  name: "Kab. Sintang",  prov: "Kalbar", basePopRisk: 23400,  baseFloodKm2: 42,  baseVuln: 0.52, forestHa: 87400, areaKm2: 21635, center: [111.5, 0.05], zoom: 9.5 },
  { id: "wajo",     name: "Kab. Wajo",     prov: "Sulsel", basePopRisk: 142000, baseFloodKm2: 88,  baseVuln: 0.84, forestHa: 12400, areaKm2: 2506, center: [120.03, -4.0], zoom: 10 },
  { id: "bone",     name: "Kab. Bone",     prov: "Sulsel", basePopRisk: 98000,  baseFloodKm2: 64,  baseVuln: 0.79, forestHa: 31200, areaKm2: 4559, center: [120.32, -4.54], zoom: 9.5 },
  { id: "soppeng",  name: "Kab. Soppeng",  prov: "Sulsel", basePopRisk: 54000,  baseFloodKm2: 38,  baseVuln: 0.76, forestHa: 18600, areaKm2: 1500, center: [119.89, -4.38], zoom: 10 },
  { id: "belu",     name: "Kab. Belu",     prov: "NTT",    basePopRisk: 31000,  baseFloodKm2: 22,  baseVuln: 0.71, forestHa: 9800,  areaKm2: 1284, center: [124.92, -9.17], zoom: 10 },
];

// Parameter definitions — match spec sliders
const WHATIF_PARAMS = [
  { key: "rainfall", label: "Curah hujan baseline", icon: "🌧", min: 1.0, max: 2.0, step: 0.05, def: 1.3, fmt: (v) => `${v.toFixed(2)}×`, hint: "Pengali presipitasi vs baseline historis", color: "var(--risk-1)" },
  { key: "forest",   label: "Konversi hutan → sawit", icon: "🌳", min: 0, max: 0.30, step: 0.01, def: 0.08, fmt: (v) => `${Math.round(v*100)}%`, hint: "Proporsi tutupan hutan dikonversi", color: "var(--accent-forest)" },
  { key: "pop",      label: "Pertumbuhan populasi", icon: "👥", min: 0, max: 0.05, step: 0.001, def: 0.015, fmt: (v) => `${(v*100).toFixed(1)}%/th`, hint: "Laju pertumbuhan tahunan (proyeksi 20 th)", color: "var(--accent-sunset)" },
  { key: "adapt",    label: "Kapasitas infra adaptif", icon: "🏗", min: -0.20, max: 0.50, step: 0.05, def: 0.20, fmt: (v) => `${v >= 0 ? "+" : ""}${Math.round(v*100)}%`, hint: "Perubahan kapasitas adaptasi (drainase, tanggul)", color: "var(--accent-sea)" },
];

const WHATIF_NEUTRAL = { rainfall: 1.0, forest: 0, pop: 0, adapt: 0 };

function computeWhatIf(region, p) {
  const rainFactor = Math.pow(p.rainfall, 1.4);
  const forestFactor = 1 + p.forest * 0.8;
  const popCompound = Math.pow(1 + p.pop, 20);
  const adaptMitigation = 1 - p.adapt * 0.35;

  const popAtRisk = Math.round(region.basePopRisk * (0.45 + 0.55 * rainFactor) * popCompound * adaptMitigation);
  const floodKm2 = +(region.baseFloodKm2 * rainFactor * forestFactor * adaptMitigation).toFixed(1);
  const carbon = +(region.forestHa * p.forest * 0.0021).toFixed(1); // ktCO₂/yr
  let vuln = region.baseVuln * (0.62 + 0.24 * rainFactor) * forestFactor * adaptMitigation * 0.86;
  vuln = Math.min(0.99, Math.max(0.05, vuln));
  return { popAtRisk, floodKm2, carbon, vuln: +vuln.toFixed(2) };
}

function fmtNum(n) {
  return n.toLocaleString("id-ID");
}
function deltaPct(base, now) {
  if (base === 0) return now === 0 ? 0 : 100;
  return Math.round(((now - base) / base) * 100);
}
function vulnColor(v) {
  if (v >= 0.75) return "var(--risk-5)";
  if (v >= 0.60) return "var(--risk-4)";
  if (v >= 0.40) return "var(--risk-3)";
  if (v >= 0.20) return "var(--risk-2)";
  return "var(--risk-1)";
}
function vulnLabel(v) {
  const t = window.tr;
  if (v >= 0.75) return t("Sangat Tinggi");
  if (v >= 0.60) return t("Tinggi");
  if (v >= 0.40) return t("Sedang");
  if (v >= 0.20) return t("Rendah");
  return t("Sangat Rendah");
}

function WhatIfSimulator({ setRoute, ctx, openAI }) {
  const [regionId, setRegionId] = React.useState("sintang");
  const [params, setParams] = React.useState({ rainfall: 1.3, forest: 0.08, pop: 0.015, adapt: 0.20 });
  const [computing, setComputing] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [lastMs, setLastMs] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const timerRef = React.useRef(null);

  const region = WHATIF_REGIONS.find(r => r.id === regionId);
  const baseline = React.useMemo(() => computeWhatIf(region, WHATIF_NEUTRAL), [regionId]);

  // Debounced recompute (live-adjust simulation, <5s spec → ~480ms mock)
  React.useEffect(() => {
    setComputing(true);
    setSaved(false);
    const t0 = performance.now();
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setResult(computeWhatIf(region, params));
      setLastMs(Math.round(performance.now() - t0));
      setComputing(false);
    }, 480);
    return () => clearTimeout(timerRef.current);
  }, [params, regionId]);

  const r = result || baseline;

  const setParam = (key, val) => setParams(p => ({ ...p, [key]: val }));
  const reset = () => setParams({ rainfall: 1.3, forest: 0.08, pop: 0.015, adapt: 0.20 });

  const outcomes = [
    { key: "pop", label: "Populasi terdampak", icon: "users", base: baseline.popAtRisk, now: r.popAtRisk, fmt: fmtNum, unit: tr("jiwa"), invert: false },
    { key: "flood", label: "Area banjir", icon: "map", base: baseline.floodKm2, now: r.floodKm2, fmt: (v) => v.toFixed(1), unit: "km²", invert: false },
    { key: "carbon", label: "Emisi karbon", icon: "factory", base: baseline.carbon, now: r.carbon, fmt: (v) => `+${v.toFixed(1)}`, unit: "ktCO₂/th", invert: false, absolute: true },
    { key: "vuln", label: "Composite vulnerability", icon: "alert-triangle", base: baseline.vuln, now: r.vuln, fmt: (v) => v.toFixed(2), unit: vulnLabel(r.vuln), invert: false, isVuln: true },
  ];

  return (
    <div className="feat-page whatif" data-screen-label="Feature: What-If Quick Simulator">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>{tr("What-If Quick Simulator")}</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sdss"><Icon name="zap" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 5.8 · SDSS CORE</div>
              <h1>{tr("What-If Quick Simulator")}</h1>
              <div className="feat-sub">{tr("Eksplorasi cepat dampak intervensi tanpa membangun full scenario · recompute real-time")}</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={reset}><Icon name="loader" size={14} />{tr("Reset")}</button>
            <button className="primary-btn" onClick={() => setRoute("flow-scenario")}>
              <Icon name="git-pull-request" size={14} />{tr("Promote ke Scenario Manager")}
            </button>
          </div>
        </div>
      </div>

      <div className="whatif-body">
        {/* LEFT — parameter controls */}
        <aside className="whatif-controls">
          <div className="whatif-panel">
            <div className="whatif-panel-head">
              <span>{tr("Wilayah Analisis")}</span>
            </div>
            <div className="whatif-region">
              <Icon name="map-pin" size={16} />
              <select value={regionId} onChange={e => setRegionId(e.target.value)} className="text-input">
                {WHATIF_REGIONS.map(reg => (
                  <option key={reg.id} value={reg.id}>{tr(reg.name)} · {reg.prov}</option>
                ))}
              </select>
            </div>
            <div className="whatif-region-meta">
              <div><span className="muted">{tr("Luas")}</span><strong>{fmtNum(region.areaKm2)} km²</strong></div>
              <div><span className="muted">{tr("Hutan")}</span><strong>{fmtNum(region.forestHa)} ha</strong></div>
              <div><span className="muted">{tr("Vuln dasar")}</span><strong>{baseline.vuln.toFixed(2)}</strong></div>
            </div>
          </div>

          <div className="whatif-panel">
            <div className="whatif-panel-head">
              <span>{tr("Adjust parameters")}</span>
              <span className={`whatif-status ${computing ? "computing" : "done"}`}>
                {computing
                  ? <><span className="whatif-spinner" />{tr("recalculating…")}</>
                  : <><Icon name="check-circle" size={12} />{tr("Updated")} · {lastMs}ms</>}
              </span>
            </div>
            <div className="whatif-sliders">
              {WHATIF_PARAMS.map(p => (
                <div key={p.key} className="whatif-slider-row">
                  <div className="whatif-slider-top">
                    <span className="whatif-slider-label"><span className="whatif-emoji">{p.icon}</span>{tr(p.label)}</span>
                    <span className="whatif-slider-val" style={{ color: p.color }}>{p.fmt(params[p.key])}</span>
                  </div>
                  <input
                    type="range" min={p.min} max={p.max} step={p.step} value={params[p.key]}
                    className="weight-range whatif-range"
                    style={{ "--track-color": p.color }}
                    onChange={e => setParam(p.key, parseFloat(e.target.value))}
                  />
                  <div className="whatif-slider-hint">{tr(p.hint)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="whatif-usecase">
            <div className="whatif-usecase-label">{tr("Use case cepat:")}</div>
            <button className="whatif-usecase-btn" onClick={() => setParams({ ...params, rainfall: 1.3 })}>{tr("Curah hujan +30%")}</button>
            <button className="whatif-usecase-btn" onClick={() => setParams({ ...params, forest: 0.10 })}>{tr("Konversi hutan 10%")}</button>
            <button className="whatif-usecase-btn" onClick={() => setParams({ ...params, pop: 0.02 })}>{tr("Populasi 2%/th")}</button>
          </div>
        </aside>

        {/* CENTER — outcomes + map */}
        <div className="whatif-center">
          <div className="whatif-outcomes">
            {outcomes.map(o => {
              const dp = o.absolute ? null : deltaPct(o.base, o.now);
              const worse = o.isVuln ? o.now > o.base : (dp || 0) > 0;
              const better = o.isVuln ? o.now < o.base : (dp || 0) < 0;
              return (
                <div key={o.key} className={`whatif-outcome ${computing ? "computing" : ""}`}>
                  <div className="whatif-outcome-head">
                    <Icon name={o.icon} size={14} />
                    <span>{tr(o.label)}</span>
                  </div>
                  {o.isVuln ? (
                    <div className="whatif-outcome-vuln">
                      <span className="whatif-base">{o.fmt(o.base)}</span>
                      <Icon name="arrow-right" size={14} />
                      <span className="whatif-now" style={{ color: vulnColor(o.now) }}>{o.fmt(o.now)}</span>
                    </div>
                  ) : (
                    <div className="whatif-outcome-val">
                      {!o.absolute && <span className="whatif-base">{o.fmt(o.base)}</span>}
                      {!o.absolute && <Icon name="arrow-right" size={14} />}
                      <span className="whatif-now">{o.fmt(o.now)}</span>
                      <span className="whatif-unit">{o.unit}</span>
                    </div>
                  )}
                  <div className="whatif-outcome-foot">
                    {o.isVuln ? (
                      <span className={`whatif-delta ${worse ? "worse" : better ? "better" : "flat"}`}>
                        {worse ? "↑" : better ? "↓" : "—"} {vulnLabel(o.now)}
                      </span>
                    ) : o.absolute ? (
                      <span className="whatif-unit-inline">{o.unit}</span>
                    ) : (
                      <span className={`whatif-delta ${worse ? "worse" : better ? "better" : "flat"}`}>
                        {dp > 0 ? "+" : ""}{dp}% vs baseline
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="whatif-map-card">
            <div className="whatif-map-head">
              <div className="card-title"><Icon name="map" size={14} />{tr("Proyeksi dampak spasial ·")} {tr(region.name)}</div>
              <div className="whatif-map-legend">
                <span><span className="dot" style={{ background: "var(--risk-1)" }} />{tr("Baseline")}</span>
                <span><span className="dot" style={{ background: "var(--risk-4)", opacity: 0.55 }} />{tr("Tambahan banjir")}</span>
                <span><span className="dot" style={{ background: vulnColor(r.vuln) }} />Vuln saat ini</span>
              </div>
            </div>
            <div className="whatif-map-stage">
              <WhatIfMap region={region} baseline={baseline} result={r} computing={computing} />
            </div>
          </div>
        </div>

        {/* RIGHT — compare + save */}
        <aside className="whatif-right">
          <div className="whatif-panel">
            <div className="whatif-panel-head"><span>{tr("Ringkasan perubahan")}</span></div>
            <div className="whatif-summary">
              {outcomes.map(o => {
                const dp = o.absolute ? null : deltaPct(o.base, o.now);
                const worse = o.isVuln ? o.now > o.base : (dp || 0) > 0;
                const better = o.isVuln ? o.now < o.base : (dp || 0) < 0;
                return (
                  <div key={o.key} className="whatif-sum-row">
                    <span className="whatif-sum-label">{tr(o.label)}</span>
                    <span className={`whatif-sum-delta ${worse ? "worse" : better ? "better" : "flat"}`}>
                      {o.absolute ? `+${o.fmt(o.now).replace("+","")} ${o.unit}` : o.isVuln ? `${o.base.toFixed(2)} → ${o.now.toFixed(2)}` : `${dp > 0 ? "+" : ""}${dp}%`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="whatif-panel whatif-ai-note">
            <div className="whatif-panel-head"><span><Icon name="sparkles" size={13} />{tr("Interpretasi AI")}</span></div>
            <div className="whatif-ai-body">
              {r.vuln > baseline.vuln + 0.08 ? (
                <p>{tr("Kombinasi parameter ini")} <strong>{tr("menaikkan vulnerability")} {Math.round((r.vuln - baseline.vuln) / baseline.vuln * 100)}%</strong>. {tr("Driver utama:")} {params.rainfall > 1.4 ? tr("curah hujan ekstrem") : params.forest > 0.15 ? tr("konversi hutan masif") : tr("pertumbuhan populasi di area rentan")}.</p>
              ) : r.vuln < baseline.vuln - 0.03 ? (
                <p>{tr("Intervensi adaptif")} <strong>{tr("menurunkan vulnerability")}</strong> {tr("meski ada tekanan iklim. Kapasitas infra")} +{Math.round(params.adapt*100)}% {tr("efektif menahan dampak.")}</p>
              ) : (
                <p>{tr("Perubahan vulnerability moderat. Pertimbangkan menaikkan kapasitas adaptif untuk margin keamanan lebih besar.")}</p>
              )}
              <button className="link-btn" onClick={openAI}>{tr("Diskusikan dengan AI →")}</button>
            </div>
          </div>

          <div className="whatif-save">
            {saved ? (
              <div className="whatif-saved">
                <Icon name="check-circle" size={16} />
                <div>
                  <strong>{tr("Skenario tersimpan")}</strong>
                  <div className="muted">{tr("Masuk ke pipeline SDSS sebagai draft")}</div>
                </div>
              </div>
            ) : (
              <button className="primary-btn whatif-save-btn" onClick={() => setSaved(true)}>
                <Icon name="plus" size={14} />{tr("Simpan sebagai skenario")}
              </button>
            )}
            <div className="whatif-save-note">
              <Icon name="info" size={12} />
              <span>{tr("Quick-sim ini bisa di-promote ke Scenario Manager (FITUR 5.2) untuk analisis MCDA penuh.")}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// Live spatial impact map — flood overlay scales with computed result
function WhatIfMap({ region, baseline, result, computing }) {
  const c = region.center || [120, -4];
  const floodScale = Math.min(2.2, result.floodKm2 / (baseline.floodKm2 || 1));
  const vc = vulnColor(result.vuln);

  // titik fokus banjir di sekitar pusat AOI (offset derajat, radius meter)
  const zones = [
    { dl: 0.00, dt: 0.00, rBaseM: 4200 },
    { dl: -0.06, dt: -0.05, rBaseM: 3000 },
    { dl: 0.07, dt: -0.04, rBaseM: 2600 },
    { dl: -0.02, dt: 0.06, rBaseM: 2200 },
  ];

  const areas = [];
  // baseline (referensi, putus-putus)
  zones.forEach((z, i) => areas.push({
    lng: c[0] + z.dl, lat: c[1] + z.dt, radiusM: z.rBaseM,
    color: "#1E6CB5", fillOpacity: 0, weight: 1, dash: "3 3",
    tooltip: i === 0 ? `Baseline banjir · ${baseline.floodKm2} km²` : null,
  }));
  // proyeksi (skala live dengan hasil)
  zones.forEach((z, i) => areas.push({
    lng: c[0] + z.dl, lat: c[1] + z.dt, radiusM: z.rBaseM * floodScale,
    color: "#C44E37", fillColor: "#C44E37", fillOpacity: 0.22, weight: 1.5,
    tooltip: i === 0 ? `Proyeksi banjir · ${result.floodKm2.toFixed(1)} km² (×${floodScale.toFixed(2)})` : null,
  }));

  // marker pusat AOI (warna by vulnerability)
  const markers = [{
    lng: c[0], lat: c[1],
    html: `<div style="display:flex;flex-direction:column;align-items:center;">
      <div style="width:14px;height:14px;border-radius:50%;background:${vc};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.4);"></div>
      <div style="margin-top:2px;font-size:10px;font-weight:700;color:#0F1F1A;background:rgba(255,255,255,.85);padding:1px 5px;border-radius:4px;white-space:nowrap;">${region.name}</div>
    </div>`,
    popup: `Vulnerability: <b>${result.vuln.toFixed(2)}</b> (${vulnLabel(result.vuln)})`,
  }];

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap key={region.id} center={c} zoom={region.zoom || 10} basemap="positron" areas={areas} markers={markers} controls={true} />
      {computing && (
        <div style={{ position: "absolute", inset: 0, zIndex: 600, background: "rgba(15,31,26,0.35)", display: "grid", placeItems: "center", color: "#fff", fontSize: 13 }}>
          <span><span className="whatif-spinner" style={{ marginRight: 8 }} />{window.tr("menghitung ulang…")}</span>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { WhatIfSimulator });
