// ============================================================
// SDSS — Impact Analysis Engine · FITUR 5.3
// Sumber: §5.3 — workflow DAG chained (climate→LULC→flood→intervention
// →vuln→carbon→aggregate), progress view + outcome KPI delta view
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const IMPACT_STEPS = [
  { id: "climate", label: "Climate (2050 SSP2-4.5)", t: "12s" },
  { id: "lulc", label: "LULC projection", t: "18s" },
  { id: "flood", label: "Flood hazard recompute", t: "2m 14s" },
  { id: "intervention", label: "Apply tanggul + mangrove intervention", t: "32s" },
  { id: "vuln", label: "Vulnerability (Modul 3.1)", t: "1m 02s" },
  { id: "carbon", label: "Carbon impact (Modul 2.3)", t: "24s" },
  { id: "aggregate", label: "Aggregate KPIs", t: "8s" },
];

const IMPACT_KPIS = [
  { label: "Populasi terdampak (2050)", base: "412.000", scn: "142.000", delta: "−65.5%", good: true },
  { label: "Loss avoided", base: "—", scn: "IDR 0.48 T/yr", delta: "1.2 T × 0.4 freq", good: true },
  { label: "Lives saved (modeled)", base: "—", scn: "~340/yr", delta: "kombinasi", good: true },
  { label: "Carbon co-benefit", base: "0", scn: "+18 ktCO₂/yr", delta: "mangrove sequestration", good: true },
  { label: "Area banjir 100-yr", base: "340 km²", scn: "118 km²", delta: "−65%", good: true },
  { label: "Biodiversity koridor", base: "2", scn: "8", delta: "+6 pulih", good: true },
];

function ImpactEngine({ setRoute, ctx, openAI }) {
  const [phase, setPhase] = React.useState("outcome"); // running | outcome
  const [activeStep, setActiveStep] = React.useState(7);
  const timerRef = React.useRef(null);

  const runAgain = () => {
    setPhase("running"); setActiveStep(0);
    let i = 0;
    timerRef.current = setInterval(() => {
      i++;
      setActiveStep(i);
      if (i >= IMPACT_STEPS.length) { clearInterval(timerRef.current); setTimeout(() => setPhase("outcome"), 500); }
    }, 600);
  };
  React.useEffect(() => () => clearInterval(timerRef.current), []);

  return (
    <div className="feat-page impact-page" data-screen-label="Feature: Impact Analysis Engine">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>Impact Analysis Engine</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-sdss"><Icon name="git-branch" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 5.3 · SDSS CORE</div>
              <h1>Impact Analysis Engine</h1>
              <div className="feat-sub">Workflow DAG ber-rantai: climate → LULC → flood → intervensi → vulnerability → carbon → aggregate KPI</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={runAgain}><Icon name="play" size={14} />Re-run</button>
            <button className="primary-btn" onClick={() => setRoute("flow-report")}><Icon name="file-text" size={14} />Buat laporan</button>
          </div>
        </div>
      </div>

      <div className="impact-scnbar">
        <Icon name="target" size={14} />
        <span>Skenario: <strong>scn_tanggul_mangrove</strong></span>
        <span className="muted">vs</span>
        <span>baseline: <strong>baseline_no_action</strong></span>
        <span className="impact-scn-ctx">Sulsel · SSP2-4.5 · 2050</span>
      </div>

      <div className="impact-body">
        {/* LEFT: DAG pipeline */}
        <aside className="impact-pipeline">
          <div className="rdtr-panel-head" style={{ padding: "0 0 10px" }}>
            {phase === "running" ? "Progress" : "Causal Pathway"}
            {phase === "running" && <span className="impact-eta">~{Math.max(0, 4 - Math.floor(activeStep * 0.6))} mnt</span>}
          </div>
          <div className="impact-steps">
            {IMPACT_STEPS.map((s, i) => {
              const done = phase === "outcome" || i < activeStep;
              const active = phase === "running" && i === activeStep;
              return (
                <div key={s.id} className={`impact-step ${done ? "done" : active ? "active" : "queued"}`}>
                  <div className="impact-step-icon">
                    {done ? <Icon name="check-circle" size={15} /> : active ? <span className="whatif-spinner" /> : <Icon name="circle" size={15} />}
                  </div>
                  <div className="impact-step-body">
                    <div className="impact-step-label">{s.label}</div>
                    <div className="impact-step-t">{done ? s.t : active ? "running…" : "queued"}</div>
                  </div>
                  {i < IMPACT_STEPS.length - 1 && <div className="impact-step-conn" />}
                </div>
              );
            })}
          </div>
          {phase === "running" && (
            <div className="impact-run-actions">
              <button className="ghost-btn small"><Icon name="x" size={12} />Cancel</button>
              <button className="ghost-btn small"><Icon name="bell" size={12} />Background</button>
            </div>
          )}
        </aside>

        {/* RIGHT: outcome */}
        <div className="impact-outcome">
          {phase === "running" ? (
            <div className="impact-waiting">
              <span className="whatif-spinner big" />
              <div className="impact-waiting-t">Menjalankan impact analysis…</div>
              <div className="impact-waiting-d">Engine: Airflow DAG · intermediate results cached by content hash</div>
            </div>
          ) : (
            <>
              <div className="impact-kpi-card">
                <div className="impact-kpi-head"><Icon name="bar-chart-3" size={14} />KPI Summary · baseline → scenario</div>
                <div className="impact-kpis">
                  {IMPACT_KPIS.map((k, i) => (
                    <div key={i} className="impact-kpi">
                      <div className="impact-kpi-label">{k.label}</div>
                      <div className="impact-kpi-vals">
                        <span className="impact-kpi-base">{k.base}</span>
                        <Icon name="arrow-right" size={12} />
                        <span className="impact-kpi-scn">{k.scn}</span>
                      </div>
                      <span className={`impact-kpi-delta ${k.good ? "good" : "bad"}`}>{k.delta}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="impact-two">
                <div className="rdtr-detail-card">
                  <div className="rdtr-detail-head"><Icon name="map" size={13} />Map delta · baseline vs scenario</div>
                  <div className="impact-mapdelta">
                    <div className="impact-map-half"><div className="impact-map-label">Baseline</div><window.MapSurface layers={{ banjir: true, slr: true }} crisis={false} onHover={() => {}} /></div>
                    <div className="impact-map-half"><div className="impact-map-label">Scenario</div><window.MapSurface layers={{ banjir: true }} crisis={false} onHover={() => {}} /></div>
                  </div>
                </div>
                <div className="rdtr-detail-card">
                  <div className="rdtr-detail-head"><Icon name="git-branch" size={13} />Causal Pathway</div>
                  <div className="impact-causal">
                    {["Tanggul + mangrove", "↓ Flood hazard −58%", "↓ Vulnerability 0.84→0.51", "↓ Populasi terdampak −65%", "+ Carbon sequestration", "+ Biodiversity koridor"].map((c, i) => (
                      <div key={i} className={`impact-causal-row ${i === 0 ? "start" : ""}`}>
                        <span className="impact-causal-dot" />{c}
                      </div>
                    ))}
                  </div>
                  <div className="impact-confidence"><Icon name="info" size={12} />Confidence interval ±0.4 · ensemble model · cached intermediate</div>
                </div>
              </div>

              <div className="impact-crosslinks">
                <button className="fm-crosslink" onClick={() => setRoute("feature-scompare")}><Icon name="git-pull-request" size={14} /><span>Bandingkan dengan skenario lain</span><Icon name="chevron-right" size={12} /></button>
                <button className="fm-crosslink" onClick={() => setRoute("feature-mcda")}><Icon name="bar-chart-3" size={14} /><span>MCDA prioritas intervensi</span><Icon name="chevron-right" size={12} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ImpactEngine });
