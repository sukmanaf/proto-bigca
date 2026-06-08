// ============================================================
// Data Catalog — Real-Time Data Stream Processor · FITUR 10.4
// Sumber: §10.4 — Kafka event-driven, topics IoT/satellite, stream
// processing (windowing/aggregation), forward ke modul (Anomaly 6.2)
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const STREAM_TOPICS = [
  { id: "iot.river-level", cat: "IoT", rate: "1.2K/s", lag: "0.3s", status: "ok", consumers: 4 },
  { id: "iot.rainfall", cat: "IoT", rate: "840/s", lag: "0.5s", status: "ok", consumers: 6 },
  { id: "satellite.fire.modis", cat: "Satellite", rate: "12/min", lag: "2.1s", status: "ok", consumers: 3 },
  { id: "satellite.sentinel1.processed", cat: "Satellite", rate: "4/min", lag: "8s", status: "ok", consumers: 2 },
  { id: "iot.tide-gauge", cat: "IoT", rate: "320/s", lag: "0.4s", status: "ok", consumers: 3 },
  { id: "alerts.ews", cat: "Alerts", rate: "3/min", lag: "0.1s", status: "ok", consumers: 8 },
  { id: "iot.air-quality", cat: "IoT", rate: "210/s", lag: "1.2s", status: "degraded", consumers: 2 },
];

function StreamProcessor({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("iot.river-level");
  const [tick, setTick] = React.useState(0);
  const t = STREAM_TOPICS.find(x => x.id === selected);

  React.useEffect(() => {
    const iv = setInterval(() => setTick(x => x + 1), 1200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="feat-page strm-page" data-screen-label="Feature: Stream Processor">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("data")} className="link-btn">{tr("Katalog Data")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Real-Time Stream Processor</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-data"><Icon name="activity" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 10.4 · DATA MGMT</div>
              <h1>Real-Time Data Stream Processor</h1>
              <div className="feat-sub">Event-driven Kafka · topics IoT &amp; satelit · windowing + aggregation + pattern detection → forward ke modul</div>
            </div>
          </div>
          <div className="feat-actions"><button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button></div>
        </div>
      </div>

      <div className="strm-summary">
        <div className="strm-sum"><span className="status-dot online" /><strong>{STREAM_TOPICS.length}</strong> topics aktif</div>
        <div className="strm-sum"><Icon name="activity" size={14} /><strong>~2.6K</strong> events/s total</div>
        <div className="strm-sum"><Icon name="zap" size={14} /><strong>0.4s</strong> avg latency</div>
        <div className="strm-sum"><Icon name="git-branch" size={14} />Apache Kafka + Flink</div>
      </div>

      <div className="strm-body">
        <aside className="strm-topics">
          <div className="rdtr-panel-head" style={{ padding: "0 0 10px" }}>Topics</div>
          <div className="strm-list">
            {STREAM_TOPICS.map(x => (
              <button key={x.id} className={`strm-item ${selected === x.id ? "on" : ""}`} onClick={() => setSelected(x.id)}>
                <span className="strm-item-status" style={{ background: x.status === "ok" ? "#2F7D5E" : "#C18820" }} />
                <div className="strm-item-body">
                  <div className="strm-item-name">{x.id}</div>
                  <div className="strm-item-meta">{x.cat} · {x.rate}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="strm-detail">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><code className="strm-topic-name">{t.id}</code></div>
              <span className={`mcp-status-pill ${t.status === "ok" ? "ok" : "degraded"}`}>{t.status === "ok" ? "HEALTHY" : "LAG WARNING"}</span>
            </div>
            <div className="strm-metrics">
              <div className="strm-metric"><div className="strm-metric-label">Throughput</div><div className="strm-metric-val">{t.rate}</div></div>
              <div className="strm-metric"><div className="strm-metric-label">Consumer lag</div><div className="strm-metric-val">{t.lag}</div></div>
              <div className="strm-metric"><div className="strm-metric-label">Consumers</div><div className="strm-metric-val">{t.consumers}</div></div>
              <div className="strm-metric"><div className="strm-metric-label">Window</div><div className="strm-metric-val sm">tumbling 60s</div></div>
            </div>
            <div className="strm-flow">
              <svg viewBox="0 0 520 120" className="strm-flow-svg" preserveAspectRatio="xMidYMid meet">
                {/* producer */}
                <rect x="10" y="45" width="90" height="32" rx="6" fill="var(--info-50)" stroke="var(--info-500)" />
                <text x="55" y="65" fontSize="10" fill="var(--info-700)" textAnchor="middle">Producers</text>
                {/* kafka */}
                <rect x="210" y="40" width="100" height="42" rx="6" fill="var(--primary-50)" stroke="var(--primary-500)" />
                <text x="260" y="58" fontSize="10" fill="var(--primary-700)" textAnchor="middle" fontWeight="600">Kafka topic</text>
                <text x="260" y="72" fontSize="8" fill="var(--primary-700)" textAnchor="middle">Flink stream</text>
                {/* consumers */}
                <rect x="420" y="45" width="90" height="32" rx="6" fill="var(--success-50)" stroke="var(--success-500)" />
                <text x="465" y="65" fontSize="10" fill="var(--success-700)" textAnchor="middle">Modul 6.2 EWS</text>
                {/* flowing dots */}
                {[0,1,2].map(i => <circle key={i} r="3" fill="var(--accent-sea)"><animateMotion dur="1.5s" begin={`${i*0.5}s`} repeatCount="indefinite" path="M100,61 L210,61" /></circle>)}
                {[0,1,2].map(i => <circle key={"b"+i} r="3" fill="var(--success-600,#2F7D5E)"><animateMotion dur="1.5s" begin={`${i*0.5}s`} repeatCount="indefinite" path="M310,61 L420,61" /></circle>)}
              </svg>
            </div>
            <div className="strm-live">
              <div className="strm-live-head"><Icon name="activity" size={12} />Live events</div>
              {[0,1,2,3].map(i => {
                const v = (Math.sin((tick + i) * 1.3) * 40 + 60).toFixed(1);
                return <div key={i} className="strm-live-row"><span className="mono">{new Date(Date.now() - i*1200).toLocaleTimeString("id-ID")}</span><code>{t.id.split(".").pop()}={v}</code><span className="strm-ok">→ processed</span></div>;
              })}
            </div>
          </div>
          <div className="strm-forward">
            <Icon name="zap" size={13} />
            <span>Pattern detection: jika debit &gt; 2σ baseline → forward ke <button className="link-btn" onClick={() => setRoute("feature-ews")}>Anomaly Detection (6.2)</button> untuk trigger EWS.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StreamProcessor });
