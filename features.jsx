// ============================================================
// Feature-level pages (Sesi 4)
// • MCDA Engine (FITUR 5.5)
// • Multi-Criteria Vulnerability Assessment (FITUR 3.1)
// • Hindcasting Tool (FITUR 11.1)
// • Sensitivity & Uncertainty Analyzer (FITUR 5.9)
// • Anomaly Detection & EWS (FITUR 6.2)
// ============================================================

const Icon = window.Icon;

// =================================================================
// Shared: feature page header
// =================================================================
function FeatureHeader({ setRoute, breadcrumb, icon, badge, title, subtitle, actions }) {
  return (
    <div className="feat-head">
      <div className="breadcrumb">
        {breadcrumb.map((b, i) => (
          <React.Fragment key={i}>
            {i > 0 && <Icon name="chevron-right" size={12} />}
            {b.route ? (
              <button onClick={() => setRoute(b.route)} className="link-btn">{b.label}</button>
            ) : (
              <span>{b.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="feat-head-row">
        <div className="feat-title-block">
          <div className={`feat-icon ${badge ? `module-${badge.split(".")[0] || ""}` : ""}`}>
            <Icon name={icon} size={24} />
          </div>
          <div>
            <div className="feat-badge">FITUR {badge}</div>
            <h1>{title}</h1>
            <div className="feat-sub">{subtitle}</div>
          </div>
        </div>
        <div className="feat-actions">{actions}</div>
      </div>
    </div>
  );
}

// =================================================================
// 1) MCDA ENGINE — FITUR 5.5
// =================================================================
function MCDAEngine({ setRoute, ctx, openAI }) {
  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];
  const [criteria, setCriteria] = React.useState([
    { id: "c1", name: "Indeks Risiko Banjir", weight: 22, dir: "minimize", source: "FITUR 2.6 Flood Model" },
    { id: "c2", name: "Populasi Terdampak", weight: 18, dir: "minimize", source: "BPS Sensus 2020 + estimasi" },
    { id: "c3", name: "Densitas Infrastruktur", weight: 15, dir: "maximize", source: "Platform native" },
    { id: "c4", name: "Kapasitas Fiskal Kab", weight: 12, dir: "maximize", source: "DJPK Kemenkeu 2024" },
    { id: "c5", name: "Tutupan Vegetasi", weight: 10, dir: "maximize", source: "KLHK SIGN-SMART" },
    { id: "c6", name: "SLR Exposure 2050", weight: 13, dir: "minimize", source: "FITUR 2.5 SLR Model" },
    { id: "c7", name: "Modal Sosial / SDM", weight: 10, dir: "maximize", source: "Susenas BPS" },
  ]);
  const [norm, setNorm] = React.useState("minmax");
  const [agg, setAgg] = React.useState("waspas");

  const total = criteria.reduce((a, c) => a + c.weight, 0);
  const setWeight = (id, w) => setCriteria(criteria.map(c => c.id === id ? { ...c, weight: w } : c));

  return (
    <div className="feat-page" data-screen-label="Feature: MCDA Engine">
      <FeatureHeader
        setRoute={setRoute}
        breadcrumb={[
          { label: "Beranda", route: "dashboard" },
          { label: "SDSS", route: "sdss" },
          { label: "MCDA Engine" },
        ]}
        icon="bar-chart-3"
        badge="5.5"
        title="MCDA Engine"
        subtitle="Multi-Criteria Decision Analysis · weighted overlay · 24 kab/kota Sulawesi Selatan"
        actions={
          <>
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn"><Icon name="git-pull-request" size={14} />Compare run</button>
            <button className="primary-btn"><Icon name="download" size={14} />Export GeoTIFF</button>
          </>
        }
      />

      <div className="mcda-body">
        <aside className="mcda-left">
          <div className="mcda-panel">
            <div className="mcda-panel-head">
              <div>
                <div className="mcda-panel-title">Kriteria & Bobot</div>
                <div className="mcda-panel-sub">{criteria.length} kriteria · Total bobot: <strong className={total === 100 ? "ok" : "warn"}>{total}%</strong></div>
              </div>
              <button className="ghost-btn small"><Icon name="plus" size={12} />Tambah</button>
            </div>
            <div className="mcda-criteria-list">
              {criteria.map(c => (
                <div key={c.id} className="mcda-criterion">
                  <div className="mcda-c-head">
                    <div className="mcda-c-name">{c.name}</div>
                    <div className="mcda-c-val">{c.weight}%</div>
                  </div>
                  <input type="range" min="0" max="40" value={c.weight}
                    className="weight-range"
                    onChange={e => setWeight(c.id, parseInt(e.target.value))}
                  />
                  <div className="mcda-c-meta">
                    <span className={`mcda-dir dir-${c.dir}`}>
                      <Icon name={c.dir === "maximize" ? "arrow-up" : "arrow-down"} size={10} />
                      {c.dir}
                    </span>
                    <span className="muted">{c.source}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mcda-panel">
            <div className="mcda-panel-head">
              <div>
                <div className="mcda-panel-title">Metode</div>
                <div className="mcda-panel-sub">Normalisasi & agregasi</div>
              </div>
            </div>
            <div className="mcda-method">
              <div className="mcda-method-label">Normalisasi</div>
              <div className="seg-control">
                {[["minmax","Min-Max"],["zscore","Z-Score"],["vector","Vector"]].map(([k, l]) => (
                  <button key={k} className={`seg-btn ${norm === k ? "active" : ""}`} onClick={() => setNorm(k)}>{l}</button>
                ))}
              </div>
            </div>
            <div className="mcda-method">
              <div className="mcda-method-label">Agregasi</div>
              <div className="seg-control">
                {[["wsum","WSM"],["wprod","WPM"],["waspas","WASPAS"],["topsis","TOPSIS"]].map(([k, l]) => (
                  <button key={k} className={`seg-btn ${agg === k ? "active" : ""}`} onClick={() => setAgg(k)}>{l}</button>
                ))}
              </div>
            </div>
            <div className="mcda-method-meta">
              <Icon name="info" size={12} />
              <span>WASPAS robust untuk weighting <strong>direct</strong>; gunakan TOPSIS jika ada idealisasi yang jelas.</span>
            </div>
          </div>

          <div className="mcda-panel">
            <div className="mcda-panel-head">
              <div>
                <div className="mcda-panel-title">Constraints aktif</div>
              </div>
            </div>
            <div className="mcda-constraints">
              <label className="mcda-cn"><input type="checkbox" defaultChecked /> Exclude kawasan lindung</label>
              <label className="mcda-cn"><input type="checkbox" defaultChecked /> Min. akses infrastruktur (jalan & listrik)</label>
              <label className="mcda-cn"><input type="checkbox" /> Anggaran ≤ Rp 50M (5 tahun)</label>
            </div>
          </div>
        </aside>

        <div className="mcda-center">
          <div className="mcda-result-head">
            <div className="mcda-result-title">
              <Icon name="map" size={14} />
              <span>Hasil MCDA · skor prioritas intervensi per-kabupaten</span>
            </div>
            <div className="mcda-result-meta">
              <span>Method: <strong>{agg.toUpperCase()}</strong> · norm: <strong>{norm}</strong></span>
              <span className="muted">·</span>
              <span>Run: <strong>5 detik lalu</strong> (24/24 kab)</span>
            </div>
          </div>
          <div className="mcda-result-map">
            <window.MapSurface layers={{ banjir: true, slr: true }} crisis={false} onHover={() => {}} />
            <div className="map-overlay-bl legend wide">
              <div className="legend-title">Skor Prioritas (0-100)</div>
              {[["80-100","Sangat Prioritas","#8B1A1A"],["60-80","Prioritas","#C44E37"],["40-60","Medium","#C18820"],["20-40","Rendah","#2F7D5E"],["0-20","Sangat Rendah","#0E5A78"]].map(([r, l, c]) => (
                <div key={l} className="legend-row">
                  <span className="legend-swatch" style={{ background: c }} />
                  <span>{l} <span className="muted">({r})</span></span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="mcda-right">
          <div className="mcda-panel">
            <div className="mcda-panel-head">
              <div>
                <div className="mcda-panel-title">Top 10 Prioritas</div>
                <div className="mcda-panel-sub">Klik untuk drill-down</div>
              </div>
            </div>
            <div className="mcda-ranking">
              {[
                { rank: 1, name: "Wajo", score: 87, change: +6 },
                { rank: 2, name: "Bone", score: 79, change: +3 },
                { rank: 3, name: "Soppeng", score: 76, change: +2 },
                { rank: 4, name: "Selayar", score: 73, change: +8 },
                { rank: 5, name: "Bulukumba", score: 71, change: -1 },
                { rank: 6, name: "Jeneponto", score: 68, change: 0 },
                { rank: 7, name: "Sinjai", score: 64, change: -2 },
                { rank: 8, name: "Pangkep", score: 61, change: +1 },
                { rank: 9, name: "Gowa", score: 58, change: -4 },
                { rank: 10, name: "Pinrang", score: 56, change: +2 },
              ].map(r => (
                <button key={r.name} className="mcda-rank-row">
                  <div className="mcda-rank-num">#{r.rank}</div>
                  <div className="mcda-rank-name">{r.name}</div>
                  <div className="mcda-rank-bar">
                    <div style={{ width: `${r.score}%`, background: r.score >= 80 ? "#8B1A1A" : r.score >= 60 ? "#C44E37" : r.score >= 40 ? "#C18820" : "#2F7D5E" }} />
                  </div>
                  <div className="mcda-rank-score">{r.score}</div>
                  <div className={`mcda-rank-change ${r.change > 0 ? "up" : r.change < 0 ? "down" : ""}`}>
                    {r.change > 0 ? "↑" : r.change < 0 ? "↓" : "—"} {r.change !== 0 && Math.abs(r.change)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mcda-panel">
            <div className="mcda-panel-head">
              <div>
                <div className="mcda-panel-title">Distribusi Skor</div>
                <div className="mcda-panel-sub">Histogram 24 kab/kota</div>
              </div>
            </div>
            <div className="mcda-histogram">
              <svg viewBox="0 0 240 120" className="hist-svg">
                {[
                  { x: 0, h: 30, c: "#0E5A78" },
                  { x: 1, h: 50, c: "#2F7D5E" },
                  { x: 2, h: 80, c: "#C18820" },
                  { x: 3, h: 60, c: "#C44E37" },
                  { x: 4, h: 30, c: "#8B1A1A" },
                ].map((b, i) => (
                  <rect key={i} x={20 + i*42} y={110 - b.h} width="34" height={b.h} fill={b.c} />
                ))}
                <line x1="10" y1="110" x2="230" y2="110" stroke="var(--gray-300)" />
                {["0-20","20-40","40-60","60-80","80-100"].map((l, i) => (
                  <text key={l} x={37 + i*42} y="120" fontSize="8" fill="var(--gray-500)" textAnchor="middle">{l}</text>
                ))}
              </svg>
            </div>
            <div className="hist-stats">
              <div><span className="muted">Mean</span><strong>54.2</strong></div>
              <div><span className="muted">Median</span><strong>52.0</strong></div>
              <div><span className="muted">Std Dev</span><strong>18.4</strong></div>
            </div>
          </div>

          <div className="mcda-panel">
            <div className="mcda-panel-head">
              <div>
                <div className="mcda-panel-title">Lanjut ke</div>
              </div>
            </div>
            <div className="mcda-actions-list">
              <button className="mcda-action" onClick={() => setRoute("feature-sensitivity")}>
                <Icon name="activity" size={14} />
                <div>
                  <div className="mcda-action-name">Sensitivity Analysis</div>
                  <div className="mcda-action-desc">Robustness skor terhadap perubahan bobot</div>
                </div>
                <Icon name="chevron-right" size={12} />
              </button>
              <button className="mcda-action">
                <Icon name="git-pull-request" size={14} />
                <div>
                  <div className="mcda-action-name">Bandingkan dengan run sebelumnya</div>
                  <div className="mcda-action-desc">Diff dari run terakhir 23m lalu</div>
                </div>
                <Icon name="chevron-right" size={12} />
              </button>
              <button className="mcda-action" onClick={() => setRoute("flow-report")}>
                <Icon name="file-text" size={14} />
                <div>
                  <div className="mcda-action-name">Bangun laporan dari hasil</div>
                  <div className="mcda-action-desc">Auto-include peta + ranking + metodologi</div>
                </div>
                <Icon name="chevron-right" size={12} />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// =================================================================
// 2) Multi-Criteria Vulnerability Assessment — FITUR 3.1
// =================================================================
function VulnerabilityDetail({ setRoute, ctx, openAI }) {
  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];
  const [selected, setSelected] = React.useState("wajo");

  const kabs = [
    { id: "wajo", name: "Wajo", score: 0.84, components: { hazard: 0.92, exposure: 0.78, sensitivity: 0.85, capacity: 0.42 } },
    { id: "bone", name: "Bone", score: 0.79, components: { hazard: 0.80, exposure: 0.82, sensitivity: 0.75, capacity: 0.48 } },
    { id: "soppeng", name: "Soppeng", score: 0.76, components: { hazard: 0.74, exposure: 0.70, sensitivity: 0.82, capacity: 0.45 } },
    { id: "selayar", name: "Selayar", score: 0.73, components: { hazard: 0.85, exposure: 0.65, sensitivity: 0.70, capacity: 0.50 } },
    { id: "bulukumba", name: "Bulukumba", score: 0.71, components: { hazard: 0.72, exposure: 0.74, sensitivity: 0.68, capacity: 0.55 } },
  ];
  const sel = kabs.find(k => k.id === selected);

  return (
    <div className="feat-page" data-screen-label="Feature: Vulnerability Assessment">
      <FeatureHeader
        setRoute={setRoute}
        breadcrumb={[
          { label: "Beranda", route: "dashboard" },
          { label: "Vulnerability", route: "vulnerability" },
          { label: "Multi-Criteria Assessment" },
        ]}
        icon="alert-triangle"
        badge="3.1"
        title="Multi-Criteria Vulnerability Assessment"
        subtitle={`Weighted overlay 12 indikator · ${province.name} · konteks ${ctx.scenario.toUpperCase()} · ${ctx.period}`}
        actions={
          <>
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Jelaskan ini</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
            <button className="primary-btn" onClick={() => setRoute("feature-mcda")}><Icon name="play" size={14} />Re-run MCDA</button>
          </>
        }
      />

      <div className="vuln-banner">
        <div className="vuln-banner-stats">
          {[
            { l: "Skor rata-rata", v: "0.62", sub: "Medium-High" },
            { l: "Kab risiko sangat tinggi", v: "5", sub: "≥ 0.75" },
            { l: "Populasi terdampak", v: "1.4jt", sub: "kategori High+" },
            { l: "Indikator dipakai", v: "12", sub: "4 grup IPCC" },
          ].map((s, i) => (
            <div key={i} className="vuln-stat">
              <div className="vuln-stat-label">{s.l}</div>
              <div className="vuln-stat-value">{s.v}</div>
              <div className="vuln-stat-sub">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="vuln-body">
        <div className="vuln-left">
          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="map" size={14} />Peta Kerentanan</div>
              <div className="card-actions">
                <div className="seg-control">
                  <button className="seg-btn active">Composite</button>
                  <button className="seg-btn">Hazard</button>
                  <button className="seg-btn">Exposure</button>
                  <button className="seg-btn">Capacity</button>
                </div>
              </div>
            </div>
            <div className="vuln-map">
              <window.MapSurface layers={{ banjir: true, slr: true, karhutla: true }} crisis={false} onHover={() => {}} />
              <div className="map-overlay-bl legend wide">
                <div className="legend-title">Indeks Kerentanan</div>
                {[["#8B1A1A","0.75-1.00 Sangat Tinggi"],["#C44E37","0.60-0.75 Tinggi"],["#C18820","0.40-0.60 Sedang"],["#2F7D5E","0.20-0.40 Rendah"],["#0E5A78","0.00-0.20 Sangat Rendah"]].map(([c, l]) => (
                  <div key={l} className="legend-row">
                    <span className="legend-swatch" style={{ background: c }} />
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="bar-chart-3" size={14} />Top 5 Kab — Dekomposisi Skor</div>
            </div>
            <div className="vuln-stacked">
              {kabs.map(k => {
                const total = k.components.hazard + k.components.exposure + k.components.sensitivity + (1 - k.components.capacity);
                return (
                  <button
                    key={k.id}
                    className={`vuln-stack-row ${selected === k.id ? "selected" : ""}`}
                    onClick={() => setSelected(k.id)}
                  >
                    <div className="vuln-stack-label">
                      <strong>{k.name}</strong>
                      <span className="vuln-stack-score">{k.score.toFixed(2)}</span>
                    </div>
                    <div className="vuln-stack-bar">
                      <div className="stack-seg hazard" style={{ width: `${(k.components.hazard / total) * 100}%` }} title={`Hazard: ${k.components.hazard.toFixed(2)}`} />
                      <div className="stack-seg exposure" style={{ width: `${(k.components.exposure / total) * 100}%` }} title={`Exposure: ${k.components.exposure.toFixed(2)}`} />
                      <div className="stack-seg sensitivity" style={{ width: `${(k.components.sensitivity / total) * 100}%` }} title={`Sensitivity: ${k.components.sensitivity.toFixed(2)}`} />
                      <div className="stack-seg capacity" style={{ width: `${((1 - k.components.capacity) / total) * 100}%` }} title={`Low Capacity: ${(1 - k.components.capacity).toFixed(2)}`} />
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="stack-legend">
              <span><span className="dot" style={{ background: "#8B1A1A" }} /> Hazard</span>
              <span><span className="dot" style={{ background: "#C44E37" }} /> Exposure</span>
              <span><span className="dot" style={{ background: "#C18820" }} /> Sensitivity</span>
              <span><span className="dot" style={{ background: "#6A4C93" }} /> Low Adaptive Capacity</span>
            </div>
          </div>
        </div>

        <aside className="vuln-right">
          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="map-pin" size={14} />{sel.name} — Detail</div>
            </div>
            <div className="vuln-detail">
              <div className="vuln-detail-score">
                <svg viewBox="0 0 120 120" width="120" height="120">
                  <circle cx="60" cy="60" r="48" fill="none" stroke="var(--gray-200)" strokeWidth="10" />
                  <circle cx="60" cy="60" r="48"
                    fill="none"
                    stroke={sel.score >= 0.75 ? "#8B1A1A" : sel.score >= 0.60 ? "#C44E37" : "#C18820"}
                    strokeWidth="10"
                    strokeDasharray={`${sel.score * 301.6} 301.6`}
                    transform="rotate(-90 60 60)"
                    strokeLinecap="round"
                  />
                  <text x="60" y="62" fontSize="22" fontWeight="700" textAnchor="middle" fill="var(--gray-900)" alignmentBaseline="middle">{sel.score.toFixed(2)}</text>
                  <text x="60" y="80" fontSize="9" textAnchor="middle" fill="var(--gray-500)">Indeks</text>
                </svg>
                <div className="vuln-detail-cat">
                  {sel.score >= 0.75 ? "Sangat Tinggi" : sel.score >= 0.60 ? "Tinggi" : sel.score >= 0.40 ? "Sedang" : "Rendah"}
                </div>
              </div>
              <div className="vuln-components">
                {[
                  { id: "hazard", label: "Hazard", color: "#8B1A1A" },
                  { id: "exposure", label: "Exposure", color: "#C44E37" },
                  { id: "sensitivity", label: "Sensitivity", color: "#C18820" },
                  { id: "capacity", label: "Adaptive Capacity", color: "#2F7D5E", invert: true },
                ].map(c => (
                  <div key={c.id} className="vuln-comp-row">
                    <div className="vuln-comp-label">{c.label}</div>
                    <div className="vuln-comp-bar">
                      <div style={{ width: `${sel.components[c.id] * 100}%`, background: c.color }} />
                    </div>
                    <div className="vuln-comp-val">{sel.components[c.id].toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="sparkles" size={14} />AI Insight</div>
            </div>
            <div className="vuln-ai">
              <p><strong>{sel.name}</strong> berada di kategori <strong>{sel.score >= 0.75 ? "Sangat Tinggi" : "Tinggi"}</strong> terutama karena <strong>kombinasi hazard dan rendahnya kapasitas adaptif</strong>.</p>
              <p>Rekomendasi prioritas:</p>
              <ul>
                <li>Retrofit drainase 5 ruas utama</li>
                <li>Update RDTR — restrict pertanian flood-prone</li>
                <li>Pilot dana adaptasi 2027 (Rp 8.4M)</li>
              </ul>
              <button className="link-btn">Lihat full XAI →</button>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="git-branch" size={14} />Lineage data</div>
            </div>
            <div className="vuln-lineage">
              {[
                "FITUR 2.6 Flood Model (banjir hazard)",
                "FITUR 2.5 SLR Projection (coastal exposure)",
                "BPS Sensus 2020 + estimasi 2026",
                "DJPK Kemenkeu — fiscal capacity 2024",
                "KLHK SIGN-SMART — LULC 2024",
                "Run ID: vuln-2026-05-24-1432",
              ].map((s, i) => (
                <div key={i} className="vuln-lineage-row">
                  <Icon name="check-circle" size={12} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

// =================================================================
// 3) HINDCASTING TOOL — FITUR 11.1
// =================================================================
function HindcastingTool({ setRoute, ctx, openAI }) {
  const [model, setModel] = React.useState("ensemble");
  const [variable, setVariable] = React.useState("precip");

  return (
    <div className="feat-page" data-screen-label="Feature: Hindcasting Tool">
      <FeatureHeader
        setRoute={setRoute}
        breadcrumb={[
          { label: "Beranda", route: "dashboard" },
          { label: "Climate Modeling", route: "modeling" },
          { label: "Hindcasting Tool" },
        ]}
        icon="git-branch"
        badge="11.1"
        title="Hindcasting Tool"
        subtitle="Validasi model proyeksi vs. observasi historis 1990-2020 · researcher tool"
        actions={
          <>
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn"><Icon name="external-link" size={14} />Notebook</button>
            <button className="primary-btn"><Icon name="play" size={14} />Re-run Hindcast</button>
          </>
        }
      />

      <div className="hind-controls">
        <div className="hind-control">
          <label>Model</label>
          <select className="text-input" value={model} onChange={e => setModel(e.target.value)}>
            <option value="cmip6">CMIP6 Multi-model Mean</option>
            <option value="hadgem">HadGEM3-GC31-LL</option>
            <option value="ecearth">EC-Earth3</option>
            <option value="ensemble">Ensemble (5 GCM) · default</option>
            <option value="platform">Platform native (downscaled)</option>
          </select>
        </div>
        <div className="hind-control">
          <label>Variabel</label>
          <select className="text-input" value={variable} onChange={e => setVariable(e.target.value)}>
            <option value="precip">Curah Hujan (mm/bulan)</option>
            <option value="tmax">Suhu Maksimum (°C)</option>
            <option value="tmin">Suhu Minimum (°C)</option>
            <option value="slr">Sea Level (cm)</option>
          </select>
        </div>
        <div className="hind-control">
          <label>Periode hindcast</label>
          <select className="text-input">
            <option>1990 – 2020 (default)</option>
            <option>2000 – 2020</option>
            <option>1980 – 2010</option>
          </select>
        </div>
        <div className="hind-control">
          <label>Observasi referensi</label>
          <select className="text-input">
            <option>BMKG Stasiun (138 titik)</option>
            <option>ERA5 Reanalysis</option>
            <option>CHIRPS satellite-derived</option>
            <option>CRU TS gridded</option>
          </select>
        </div>
      </div>

      <div className="hind-metrics">
        {[
          { label: "R²", value: "0.84", sub: "Goodness of fit", color: "var(--success-700)", good: true },
          { label: "RMSE", value: "23.4 mm", sub: "Root Mean Sq Error", color: "var(--warning-700)" },
          { label: "Bias", value: "+4.2 mm", sub: "Mean error", color: "var(--info-700)" },
          { label: "NSE", value: "0.78", sub: "Nash-Sutcliffe", color: "var(--success-700)", good: true },
          { label: "MAE", value: "18.1 mm", sub: "Mean Abs Error", color: "var(--gray-700)" },
          { label: "PBIAS", value: "+3.8%", sub: "% Bias", color: "var(--success-700)", good: true },
        ].map(m => (
          <div key={m.label} className={`hind-metric ${m.good ? "good" : ""}`}>
            <div className="hind-metric-label">{m.label}</div>
            <div className="hind-metric-value" style={{ color: m.color }}>{m.value}</div>
            <div className="hind-metric-sub">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="hind-charts">
        <div className="card">
          <div className="card-head">
            <div className="card-title"><Icon name="trending-up" size={14} />Time-series Compare 1990–2020</div>
            <div className="card-actions">
              <button className="ghost-btn small"><Icon name="zoom-in" size={12} /></button>
              <button className="ghost-btn small"><Icon name="download" size={12} /></button>
            </div>
          </div>
          <div className="hind-timeseries">
            <svg viewBox="0 0 600 240" className="hind-ts-svg">
              <rect width="600" height="240" fill="white" />
              <line x1="40" y1="200" x2="580" y2="200" stroke="var(--gray-300)" />
              <line x1="40" y1="20" x2="40" y2="200" stroke="var(--gray-300)" />
              {/* Y-axis labels */}
              {[0, 100, 200, 300, 400].map((y, i) => (
                <g key={y}>
                  <line x1="38" y1={200 - i*45} x2="42" y2={200 - i*45} stroke="var(--gray-400)" />
                  <text x="35" y={203 - i*45} fontSize="9" fill="var(--gray-500)" textAnchor="end">{y}</text>
                </g>
              ))}
              {/* X-axis years */}
              {[1990, 1995, 2000, 2005, 2010, 2015, 2020].map((y, i) => (
                <text key={y} x={40 + i*90} y="215" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{y}</text>
              ))}
              {/* Observed series (dashed) */}
              <polyline points={generateMonthly(540, 180, 1.0, 0.4).map((y, i) => `${40 + i*1.5},${y}`).join(" ")}
                fill="none" stroke="var(--gray-700)" strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Modeled series */}
              <polyline points={generateMonthly(540, 175, 1.0, 0.45).map((y, i) => `${40 + i*1.5},${y}`).join(" ")}
                fill="none" stroke="var(--primary-600)" strokeWidth="1.5" />
              {/* Ensemble band */}
              <polygon points={(() => {
                const upper = generateMonthly(540, 160, 0.9, 0.45).map((y, i) => `${40 + i*1.5},${y}`).join(" ");
                const lower = generateMonthly(540, 195, 1.1, 0.45).map((y, i) => `${40 + i*1.5},${y}`).reverse().join(" ");
                return upper + " " + lower;
              })()}
              fill="var(--primary-300)" opacity="0.25" />
            </svg>
            <div className="hind-legend">
              <span><span className="line dashed" />Observed (BMKG)</span>
              <span><span className="line" />Model</span>
              <span><span className="line band" />Ensemble ±1σ</span>
            </div>
          </div>
        </div>

        <div className="hind-row">
          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="activity" size={14} />Scatter Plot · Observed vs Modeled</div>
            </div>
            <div className="hind-scatter">
              <svg viewBox="0 0 280 240">
                <rect width="280" height="240" fill="white" />
                <line x1="40" y1="200" x2="260" y2="200" stroke="var(--gray-300)" />
                <line x1="40" y1="20" x2="40" y2="200" stroke="var(--gray-300)" />
                {/* 1:1 line */}
                <line x1="40" y1="200" x2="260" y2="20" stroke="var(--gray-300)" strokeDasharray="3 3" />
                {/* Scatter points */}
                {Array.from({ length: 80 }, (_, i) => {
                  const x = 50 + Math.random() * 200;
                  const y = (260 - x) + (Math.random() - 0.5) * 30;
                  return <circle key={i} cx={x} cy={y} r="2.5" fill="var(--primary-600)" opacity="0.5" />;
                })}
                {/* axis labels */}
                <text x="150" y="232" fontSize="10" fill="var(--gray-600)" textAnchor="middle">Observed (mm/bln)</text>
                <text x="15" y="115" fontSize="10" fill="var(--gray-600)" transform="rotate(-90 15 115)" textAnchor="middle">Modeled</text>
                {/* R² label */}
                <text x="240" y="40" fontSize="11" fill="var(--success-700)" textAnchor="end" fontWeight="600">R² = 0.84</text>
              </svg>
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title"><Icon name="map" size={14} />Spatial Residual</div>
              <span className="muted">obs − model · per stasiun</span>
            </div>
            <div className="hind-residual">
              <window.MapSurface layers={{ banjir: false, slr: false }} crisis={false} onHover={() => {}} />
              <div className="map-overlay-bl legend wide">
                <div className="legend-title">Residual (mm/bulan)</div>
                {[["#8B1A1A","≥ +30 over-predict"],["#C44E37","+10 to +30"],["#FAFAFA","−10 to +10 (good)"],["#3784A2","−30 to −10"],["#074866","≤ −30 under-predict"]].map(([c, l]) => (
                  <div key={l} className="legend-row">
                    <span className="legend-swatch" style={{ background: c, border: "1px solid var(--gray-300)" }} />
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hind-summary">
          <Icon name="info" size={14} />
          <span>
            <strong>Interpretasi:</strong> R² 0.84 dan NSE 0.78 mengindikasikan model <strong>menangkap variabilitas musiman dengan baik</strong>.
            Bias positif kecil (+3.8% PBIAS) berarti model sedikit over-predict precipitation di tail high-end —
            disarankan kalibrasi bias di pesisir timur Sulsel. <button className="link-btn">Buka methodology paper →</button>
          </span>
        </div>
      </div>
    </div>
  );
}

function generateMonthly(count, baseline, scale, amplitude) {
  return Array.from({ length: count }, (_, i) => {
    const seasonal = Math.sin(i / 12 * Math.PI * 2) * amplitude * 30;
    const trend = (i / count) * 5 * scale;
    const noise = (Math.random() - 0.5) * 15;
    return baseline - seasonal - trend + noise * scale;
  });
}

// =================================================================
// 4) SENSITIVITY & UNCERTAINTY ANALYZER — FITUR 5.9
// =================================================================
function SensitivityAnalyzer({ setRoute, ctx, openAI }) {
  const [method, setMethod] = React.useState("monte-carlo");

  const params = [
    { name: "Bobot Banjir (c1)", min: -0.34, max: +0.42 },
    { name: "Bobot Populasi (c2)", min: -0.28, max: +0.31 },
    { name: "Bobot SLR (c6)", min: -0.22, max: +0.26 },
    { name: "Bobot Infrastruktur (c3)", min: -0.18, max: +0.21 },
    { name: "Bobot Kapasitas Fiskal (c4)", min: -0.14, max: +0.16 },
    { name: "Threshold Constraint Anggaran", min: -0.11, max: +0.13 },
    { name: "Bobot Vegetasi (c5)", min: -0.08, max: +0.10 },
    { name: "Bobot Sosial (c7)", min: -0.05, max: +0.08 },
  ];
  const maxAbs = Math.max(...params.flatMap(p => [Math.abs(p.min), Math.abs(p.max)]));

  return (
    <div className="feat-page" data-screen-label="Feature: Sensitivity Analyzer">
      <FeatureHeader
        setRoute={setRoute}
        breadcrumb={[
          { label: "Beranda", route: "dashboard" },
          { label: "SDSS", route: "sdss" },
          { label: "Sensitivity & Uncertainty Analyzer" },
        ]}
        icon="activity"
        badge="5.9"
        title="Sensitivity & Uncertainty Analyzer"
        subtitle="Quantify robustness · Monte Carlo (1000 iters) · Sobol indices · OAT"
        actions={
          <>
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn"><Icon name="download" size={14} />Export</button>
            <button className="primary-btn"><Icon name="play" size={14} />Re-run analysis</button>
          </>
        }
      />

      <div className="sens-controls">
        <div className="sens-method">
          <label>Metode:</label>
          <div className="seg-control">
            {[["oat","OAT (one-at-a-time)"],["monte-carlo","Monte Carlo"],["sobol","Sobol Indices"]].map(([k, l]) => (
              <button key={k} className={`seg-btn ${method === k ? "active" : ""}`} onClick={() => setMethod(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="sens-meta">
          <span>Output: <strong>MCDA Composite Score</strong></span>
          <span className="muted">·</span>
          <span>Iterations: <strong>1,000</strong></span>
          <span className="muted">·</span>
          <span>Run time: <strong>4.2s</strong></span>
        </div>
      </div>

      <div className="sens-grid">
        <div className="card sens-tornado">
          <div className="card-head">
            <div className="card-title"><Icon name="bar-chart-3" size={14} />Tornado Chart · Parameter Importance</div>
            <span className="muted">Sorted by |∆ score|</span>
          </div>
          <div className="tornado-body">
            <div className="tornado-axis">
              {[-40, -20, 0, 20, 40].map(v => (
                <div key={v} className="tornado-tick" style={{ left: `${50 + (v/maxAbs)*48}%` }}>
                  <div className="tornado-tick-line" />
                  <div className="tornado-tick-label">{v > 0 ? "+" : ""}{v}%</div>
                </div>
              ))}
              <div className="tornado-zero" style={{ left: "50%" }} />
            </div>
            {params.map((p, i) => (
              <div key={p.name} className="tornado-row">
                <div className="tornado-label">{p.name}</div>
                <div className="tornado-bar-zone">
                  <div className="tornado-bar neg"
                    style={{
                      right: "50%",
                      width: `${(Math.abs(p.min) / maxAbs) * 48}%`,
                    }}>
                    <span className="tornado-val">{p.min.toFixed(2)}</span>
                  </div>
                  <div className="tornado-bar pos"
                    style={{
                      left: "50%",
                      width: `${(p.max / maxAbs) * 48}%`,
                    }}>
                    <span className="tornado-val">+{p.max.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="sens-insight">
            <Icon name="sparkles" size={14} />
            <span>Bobot <strong>Banjir</strong> dan <strong>Populasi</strong> adalah driver utama (±0.4) — perubahan ±10% pada keduanya bisa menggeser ranking top-5. Bobot vegetasi & sosial relatif stabil.</span>
          </div>
        </div>

        <div className="sens-side">
          <div className="card">
            <div className="card-head"><div className="card-title"><Icon name="trending-up" size={14} />Uncertainty Band</div></div>
            <div className="uncert-chart">
              <svg viewBox="0 0 280 200">
                <rect width="280" height="200" fill="white" />
                <line x1="30" y1="170" x2="270" y2="170" stroke="var(--gray-300)" />
                <line x1="30" y1="20" x2="30" y2="170" stroke="var(--gray-300)" />
                {/* P5-P95 band */}
                <path d="M30,140 L 70,120 L 110,95 L 150,80 L 190,70 L 230,55 L 270,40
                         L 270,90 L 230,105 L 190,120 L 150,130 L 110,145 L 70,160 L 30,165 Z"
                  fill="var(--warning-300, #F3D69E)" opacity="0.5" />
                {/* P25-P75 band */}
                <path d="M30,135 L 70,115 L 110,90 L 150,75 L 190,65 L 230,50 L 270,35
                         L 270,80 L 230,95 L 190,110 L 150,120 L 110,135 L 70,150 L 30,155 Z"
                  fill="var(--warning-500)" opacity="0.4" />
                {/* Median */}
                <polyline points="30,150 70,130 110,105 150,90 190,80 230,65 270,50"
                  fill="none" stroke="var(--danger-600)" strokeWidth="2" />
                {/* Y labels */}
                <text x="25" y="173" fontSize="9" fill="var(--gray-500)" textAnchor="end">0.4</text>
                <text x="25" y="20" fontSize="9" fill="var(--gray-500)" textAnchor="end">1.0</text>
                {/* X labels */}
                {["2025","2030","2035","2040","2045","2050"].map((y, i) => (
                  <text key={y} x={30 + i*48} y="185" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{y}</text>
                ))}
              </svg>
            </div>
            <div className="uncert-legend">
              <span><span className="swatch" style={{ background: "var(--danger-600)" }} /> Median</span>
              <span><span className="swatch" style={{ background: "var(--warning-500)" }} /> P25-P75 (50%)</span>
              <span><span className="swatch" style={{ background: "#F3D69E" }} /> P5-P95 (90%)</span>
            </div>
          </div>

          <div className="card">
            <div className="card-head"><div className="card-title">Stabilitas Ranking Top-5</div></div>
            <div className="rank-stability">
              {[
                { name: "Wajo", stable: 96, currentRank: 1 },
                { name: "Bone", stable: 89, currentRank: 2 },
                { name: "Soppeng", stable: 72, currentRank: 3 },
                { name: "Selayar", stable: 58, currentRank: 4 },
                { name: "Bulukumba", stable: 51, currentRank: 5 },
              ].map(r => (
                <div key={r.name} className="rank-stab-row">
                  <span className="rank-stab-name">#{r.currentRank} {r.name}</span>
                  <div className="rank-stab-bar">
                    <div style={{ width: `${r.stable}%`, background: r.stable >= 80 ? "var(--success-500)" : r.stable >= 65 ? "var(--warning-500)" : "var(--danger-500)" }} />
                  </div>
                  <span className="rank-stab-val">{r.stable}%</span>
                </div>
              ))}
            </div>
            <div className="rank-stab-foot">
              <Icon name="info" size={12} />
              <span>% iterasi di mana kab mempertahankan rank-nya · Wajo & Bone sangat robust; rank 4-5 sensitif terhadap bobot.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// 5) ANOMALY DETECTION & EWS — FITUR 6.2
// =================================================================
function AnomalyEWS({ setRoute, ctx, openAI }) {
  const [tab, setTab] = React.useState("active");

  const alerts = [
    { id: "alrt-2026-0042", severity: "high", type: "Banjir", area: "Kab. Wajo, Sulsel", trigger: "Debit Sungai Cenranae 348 m³/s · 2.4σ di atas baseline", detected: "26 Mei · 04:12 WITA", source: "Stream Anomaly · BMKG + EWS native", status: "active" },
    { id: "alrt-2026-0041", severity: "medium", type: "Kekeringan", area: "Kab. Belu, NTT", trigger: "SPI-3 = -1.4 (moderate drought) · 3 minggu berturut", detected: "24 Mei · 09:00 WITA", source: "BMKG Climate Service", status: "active" },
    { id: "alrt-2026-0040", severity: "medium", type: "Karhutla", area: "Kab. Sintang, Kalbar", trigger: "Hotspot count 23 · konfidensi >80% · ENSO neutral", detected: "23 Mei · 13:30 WIB", source: "KLHK SIPONGI + ML detector", status: "active" },
    { id: "alrt-2026-0039", severity: "low", type: "Anomali Suhu", area: "Kota Surabaya, Jatim", trigger: "Tmax 38.4°C · 2.1σ · heatwave indikator awal", detected: "22 Mei · 14:00 WIB", source: "BMKG Stasiun", status: "monitoring" },
    { id: "alrt-2026-0038", severity: "resolved", type: "Banjir", area: "Kab. Sukabumi, Jabar", trigger: "Curah hujan ekstrem · sudah surut", detected: "20 Mei", source: "Otomatis platform", status: "resolved" },
  ];

  const filtered = tab === "active" ? alerts.filter(a => a.status !== "resolved") : tab === "resolved" ? alerts.filter(a => a.status === "resolved") : alerts;

  return (
    <div className="feat-page" data-screen-label="Feature: Anomaly Detection & EWS">
      <FeatureHeader
        setRoute={setRoute}
        breadcrumb={[
          { label: "Beranda", route: "dashboard" },
          { label: "AI Assistant", route: "ai" },
          { label: "Anomaly Detection & EWS" },
        ]}
        icon="zap"
        badge="6.2"
        title="Anomaly Detection & Early Warning System"
        subtitle="Real-time anomaly detection · auto trigger Crisis Mode pada threshold tertentu"
        actions={
          <>
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn"><Icon name="settings" size={14} />Tune Thresholds</button>
            <button className="primary-btn"><Icon name="bell" size={14} />Subscribe SMS+Email</button>
          </>
        }
      />

      <div className="ews-status-row">
        <div className="ews-status-card sys-ok">
          <div className="ews-status-dot" />
          <div>
            <div className="ews-status-label">Sistem EWS</div>
            <div className="ews-status-value">Online · 99.8% uptime</div>
          </div>
        </div>
        <div className="ews-status-card">
          <Icon name="activity" size={20} />
          <div>
            <div className="ews-status-label">Data stream</div>
            <div className="ews-status-value">5/5 sumber aktif</div>
            <div className="ews-status-meta">BMKG · BNPB · KLHK · Stasiun · Satelit</div>
          </div>
        </div>
        <div className="ews-status-card">
          <Icon name="alert-triangle" size={20} style={{ color: "var(--danger-600)" }} />
          <div>
            <div className="ews-status-label">Alert aktif</div>
            <div className="ews-status-value">3 · Wajo, Belu, Sintang</div>
          </div>
        </div>
        <div className="ews-status-card">
          <Icon name="bell" size={20} />
          <div>
            <div className="ews-status-label">Notif terkirim 24j</div>
            <div className="ews-status-value">142 · multi-channel</div>
          </div>
        </div>
      </div>

      <div className="tabs">
        {[
          { id: "active", label: "Aktif", count: 3 },
          { id: "all", label: "Semua alerts", count: 5 },
          { id: "resolved", label: "Resolved", count: 1 },
          { id: "config", label: "Konfigurasi" },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            {t.label}{t.count && <span className="tab-count">{t.count}</span>}
          </button>
        ))}
      </div>

      {tab !== "config" && (
        <div className="ews-alert-list">
          {filtered.map(a => (
            <div key={a.id} className={`ews-alert sev-${a.severity}`}>
              <div className="ews-alert-stripe" />
              <div className="ews-alert-icon">
                {a.severity === "high" ? <Icon name="siren" size={20} /> :
                 a.severity === "medium" ? <Icon name="alert-triangle" size={20} /> :
                 a.severity === "resolved" ? <Icon name="check-circle" size={20} /> : <Icon name="info" size={20} />}
              </div>
              <div className="ews-alert-body">
                <div className="ews-alert-head">
                  <span className={`ews-sev-pill sev-${a.severity}`}>{a.severity.toUpperCase()}</span>
                  <span className="ews-alert-type">{a.type}</span>
                  <span className="muted">·</span>
                  <span className="muted">{a.id}</span>
                </div>
                <div className="ews-alert-area">{a.area}</div>
                <div className="ews-alert-trigger">{a.trigger}</div>
                <div className="ews-alert-meta">
                  <span><Icon name="clock" size={12} />{a.detected}</span>
                  <span>·</span>
                  <span><Icon name="database" size={12} />{a.source}</span>
                </div>
              </div>
              <div className="ews-alert-actions">
                {a.severity === "high" && (
                  <button className="primary-btn danger">
                    <Icon name="siren" size={14} />Aktivasi Crisis Mode
                  </button>
                )}
                <button className="ghost-btn small"><Icon name="map" size={12} />Map</button>
                <button className="ghost-btn small"><Icon name="file-text" size={12} />Brief</button>
                <button className="ghost-btn small"><Icon name="x" size={12} />Dismiss</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "config" && (
        <div className="card">
          <div className="card-head">
            <div className="card-title"><Icon name="settings" size={14} />Threshold Configuration</div>
            <span className="muted">Atur ambang batas trigger anomali per-tipe event</span>
          </div>
          <div className="ews-threshold-list">
            {[
              { name: "Banjir — Debit sungai", threshold: "≥ 2.0σ · 6 jam berturut", channels: ["SMS","Email","In-app","Crisis"] },
              { name: "Kekeringan — SPI-3", threshold: "≤ -1.5 · 3 minggu", channels: ["Email","In-app"] },
              { name: "Karhutla — Hotspot density", threshold: "≥ 15 hotspots conf>80%", channels: ["SMS","Email","In-app"] },
              { name: "Heat wave — Tmax", threshold: "≥ 2.0σ · 3 hari berturut", channels: ["Email","In-app"] },
              { name: "SLR event — coastal", threshold: "≥ +0.3m anomaly", channels: ["SMS","Email","In-app","Crisis"] },
            ].map((t, i) => (
              <div key={i} className="ews-threshold-row">
                <div className="ews-threshold-name">{t.name}</div>
                <div className="ews-threshold-val">{t.threshold}</div>
                <div className="ews-threshold-channels">
                  {["SMS","Email","In-app","Crisis"].map(c => (
                    <span key={c} className={`channel-pill ${t.channels.includes(c) ? "on" : ""}`}>{c}</span>
                  ))}
                </div>
                <button className="ghost-btn small"><Icon name="edit" size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { MCDAEngine, VulnerabilityDetail, HindcastingTool, SensitivityAnalyzer, AnomalyEWS });
