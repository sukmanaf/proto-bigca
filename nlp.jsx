// ============================================================
// AI — Natural Language Query (LLM Conversational) · FITUR 6.5
// Sumber: Katalog_Fitur_SDSS_Detail_v2.2 §6.5
// Full-page NLP query: intent parse → tool match (MCP) → execute → format
// (text + map + chart + table). Bedanya dgn AI drawer: pipeline transparan +
// rich structured responses.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

// Scripted conversation: each user query → pipeline trace + rich response
const NLQ_SCRIPT = [
  {
    q: "Tunjukkan wilayah paling rentan banjir di Jawa Tengah untuk skenario 2050",
    pipeline: [
      { step: "Intent", val: "spatial_query" },
      { step: "Tool (MCP)", val: "vulnerability_assessment" },
      { step: "Params", val: "hazard=flood · region=Jateng (33) · period=2050 · SSP2-4.5" },
      { step: "Execute", val: "vulnerability-service via MCP" },
    ],
    answer: "Berikut 5 kabupaten paling rentan banjir di Jawa Tengah untuk skenario **2050 SSP2-4.5**:",
    result: {
      type: "table+map",
      rows: [
        ["1", "Kab. Demak", "0.82"],
        ["2", "Kab. Pekalongan", "0.79"],
        ["3", "Kab. Banjarnegara", "0.74"],
        ["4", "Kab. Pati", "0.71"],
        ["5", "Kab. Kendal", "0.68"],
      ],
    },
    followups: ["Tampilkan detail per kabupaten?", "Generate rekomendasi adaptasi untuk Demak", "Bandingkan dengan skenario lain?"],
  },
  {
    q: "Generate rekomendasi adaptasi untuk Demak",
    pipeline: [
      { step: "Context", val: "maintain state: area=Demak" },
      { step: "Tool (MCP)", val: "context_aware_recommendation (5.6)" },
      { step: "Params", val: "area=Demak · hazard=flood+SLR" },
      { step: "Execute", val: "recommendation-engine" },
    ],
    answer: "Rekomendasi adaptasi untuk **Kab. Demak** (banjir + SLR), diurutkan berdasar benefit/cost ratio:",
    result: {
      type: "reco",
      items: [
        { n: 1, t: "Rehabilitasi mangrove 240 ha", m: "IDR 24 M · BCR 3.2 · co-benefit biodiversity" },
        { n: 2, t: "Relokasi rumah pesisir 200 KK", m: "IDR 60 M · BCR 4.1 · 5 tahun" },
        { n: 3, t: "Tanggul + rumah pompa Sayung", m: "IDR 180 M · BCR 1.8 · proteksi 12.000 jiwa" },
      ],
    },
    followups: ["Buat skenario dari rekomendasi ini", "Berapa total anggaran 3 opsi?", "Tampilkan di peta"],
  },
  {
    q: "Bandingkan SSP2-4.5 vs SSP5-8.5 untuk Demak 2050",
    pipeline: [
      { step: "Intent", val: "scenario_compare" },
      { step: "Tool (MCP)", val: "scenario_comparison (7.3)" },
      { step: "Params", val: "area=Demak · scenarios=[SSP2-4.5, SSP5-8.5] · 2050" },
      { step: "Execute", val: "compare-service" },
    ],
    answer: "Perbandingan dampak banjir **Demak 2050** antara dua skenario iklim:",
    result: {
      type: "compare",
      metrics: [
        { k: "Composite vulnerability", a: "0.82", b: "0.91" },
        { k: "Area tergenang", a: "340 km²", b: "418 km²" },
        { k: "Populasi terdampak", a: "412.000", b: "503.000" },
        { k: "SLR proyeksi", a: "+18 cm", b: "+26 cm" },
      ],
    },
    followups: ["Skenario mana yang lebih cost-effective dimitigasi?", "Export perbandingan ke PDF"],
  },
];

const NLQ_SUGGESTIONS = [
  "Wilayah paling rentan banjir di Jawa Tengah 2050",
  "Rekomendasi adaptasi untuk Demak",
  "Bandingkan SSP2-4.5 vs SSP5-8.5",
  "Berapa kabupaten risiko tinggi di Sulsel?",
];

function NLPQuery({ setRoute, ctx, openAI }) {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [scriptIdx, setScriptIdx] = React.useState(0);
  const listRef = React.useRef(null);

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking]);

  const ask = (text) => {
    if (thinking) return;
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");
    // pick next scripted turn (cycle)
    const turn = NLQ_SCRIPT[scriptIdx % NLQ_SCRIPT.length];
    setScriptIdx(i => i + 1);
    setMessages(m => [...m, { role: "user", text: q }]);
    setThinking(true);
    setTimeout(() => {
      setMessages(m => [...m, { role: "assistant", ...turn }]);
      setThinking(false);
    }, 1100);
  };

  return (
    <div className="feat-page nlq-page" data-screen-label="Feature: NLP Query">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Natural Language Query</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="message-square" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.5 · AI ASSISTANT</div>
              <h1>Natural Language Query</h1>
              <div className="feat-sub">Tanya data geospasial pakai bahasa natural · LLM lokal + MCP tool bridge · demokratisasi analisis untuk user non-teknis</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn"><Icon name="clock" size={14} />Riwayat</button>
            <button className="ghost-btn"><Icon name="git-branch" size={14} />Model: Llama 3.1 8B</button>
          </div>
        </div>
      </div>

      <div className="nlq-body">
        {/* conversation */}
        <div className="nlq-chat">
          <div className="nlq-list" ref={listRef}>
            {messages.length === 0 && (
              <div className="nlq-empty">
                <div className="nlq-empty-icon"><Icon name="message-square" size={40} strokeWidth={1.2} /></div>
                <div className="nlq-empty-title">Tanya apa saja tentang data iklim Indonesia</div>
                <div className="nlq-empty-desc">Dalam Bahasa Indonesia atau English. Sistem akan parse intent, panggil tool yang relevan via MCP, dan format jawaban dengan peta/chart/tabel.</div>
                <div className="nlq-examples">
                  {NLQ_SUGGESTIONS.map((s, i) => (
                    <button key={i} className="nlq-example" onClick={() => ask(s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              m.role === "user" ? (
                <div key={i} className="nlq-msg user">
                  <div className="nlq-bubble user">{m.text}</div>
                </div>
              ) : (
                <div key={i} className="nlq-msg assistant">
                  <div className="nlq-avatar"><Icon name="sparkles" size={14} /></div>
                  <div className="nlq-assistant-body">
                    <NlqPipeline steps={m.pipeline} />
                    <div className="nlq-answer">{renderMd(m.answer)}</div>
                    <NlqResult result={m.result} />
                    {m.followups && (
                      <div className="nlq-followups">
                        <span className="nlq-followups-label">Tindak lanjut:</span>
                        {m.followups.map((f, j) => (
                          <button key={j} className="nlq-followup" onClick={() => ask(f)}>{f}</button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            ))}

            {thinking && (
              <div className="nlq-msg assistant">
                <div className="nlq-avatar"><Icon name="sparkles" size={14} /></div>
                <div className="nlq-thinking">
                  <span className="whatif-spinner" />
                  <span>Parsing intent · matching tool via MCP · executing…</span>
                </div>
              </div>
            )}
          </div>

          <form className="nlq-form" onSubmit={e => { e.preventDefault(); ask(); }}>
            <Icon name="message-square" size={16} />
            <input
              type="text" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Tanyakan dalam Bahasa Indonesia atau English…" disabled={thinking}
            />
            <button type="submit" className="nlq-send" disabled={!input.trim() || thinking}><Icon name="send" size={16} /></button>
          </form>
        </div>

        {/* side: how it works */}
        <aside className="nlq-side">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Arsitektur NLP</div>
            <div className="nlq-arch">
              {[
                { icon: "message-square", t: "Input NL", d: "ID / English" },
                { icon: "filter", t: "Intent Classifier", d: "fast small model" },
                { icon: "bot", t: "Local LLM", d: "Llama 3.1 8B + RAG (6.6)" },
                { icon: "git-branch", t: "MCP Bridge", d: "tool call dispatch (6.7)" },
                { icon: "layers", t: "Toolboxes", d: "62 fitur platform" },
                { icon: "file-text", t: "Formatter", d: "text + map + chart + table" },
              ].map((s, i) => (
                <div key={i} className="nlq-arch-step">
                  <div className="nlq-arch-icon"><Icon name={s.icon} size={14} /></div>
                  <div><div className="nlq-arch-t">{s.t}</div><div className="nlq-arch-d">{s.d}</div></div>
                  {i < 5 && <div className="nlq-arch-arrow"><Icon name="chevron-down" size={12} /></div>}
                </div>
              ))}
            </div>
          </div>
          <div className="rdtr-panel nlq-privacy">
            <div className="rdtr-panel-head"><Icon name="shield" size={13} />Privacy & sumber</div>
            <p>LLM <strong>lokal & open-source</strong> — data tidak keluar dari infrastruktur BIG. Setiap jawaban menyertakan sumber tool + dataset yang dipakai untuk traceability.</p>
          </div>
          <div className="nlq-related">
            <button className="fm-crosslink" onClick={() => setRoute("feature-xai")}>
              <Icon name="eye" size={14} /><span>Explainable AI (6.9)</span><Icon name="chevron-right" size={12} />
            </button>
            <button className="fm-crosslink" onClick={() => setRoute("ai")}>
              <Icon name="bot" size={14} /><span>Semua fitur AI</span><Icon name="chevron-right" size={12} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function NlqPipeline({ steps }) {
  const [open, setOpen] = React.useState(false);
  if (!steps) return null;
  return (
    <div className="nlq-pipeline">
      <button className="nlq-pipeline-toggle" onClick={() => setOpen(!open)}>
        <Icon name={open ? "chevron-down" : "chevron-right"} size={12} />
        <Icon name="git-branch" size={12} />
        <span>Pipeline ({steps.length} langkah)</span>
      </button>
      {open && (
        <div className="nlq-pipeline-steps">
          {steps.map((s, i) => (
            <div key={i} className="nlq-pipeline-row">
              <span className="nlq-pipeline-step">{s.step}</span>
              <span className="nlq-pipeline-val">{s.val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NlqResult({ result }) {
  if (!result) return null;
  if (result.type === "table+map") {
    return (
      <div className="nlq-result-split">
        <table className="nlq-table">
          <thead><tr><th>#</th><th>Kabupaten</th><th>Vuln</th></tr></thead>
          <tbody>
            {result.rows.map((r, i) => (
              <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td><span className="nlq-vuln" style={{ color: parseFloat(r[2]) >= 0.75 ? "#8B1A1A" : "#C18820" }}>{r[2]}</span></td></tr>
            ))}
          </tbody>
        </table>
        <div className="nlq-mini-map">
          <svg viewBox="0 0 160 140" preserveAspectRatio="xMidYMid meet">
            <rect width="160" height="140" fill="var(--surface-sunken,#E9EEEA)" />
            <path d="M20,40 L140,30 L150,100 L30,110 Z" fill="var(--surface,#fff)" stroke="var(--border-strong)" strokeWidth="1" />
            {[["#8B1A1A",55,55],["#8B1A1A",90,50],["#C18820",110,70],["#C18820",45,80],["#C18820",75,85]].map(([c,x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="7" fill={c} fillOpacity="0.8" />
            ))}
          </svg>
        </div>
      </div>
    );
  }
  if (result.type === "reco") {
    return (
      <div className="nlq-reco">
        {result.items.map(it => (
          <div key={it.n} className="nlq-reco-row">
            <span className="coastal-adapt-n">{it.n}</span>
            <div><div className="nlq-reco-t">{it.t}</div><div className="nlq-reco-m">{it.m}</div></div>
          </div>
        ))}
      </div>
    );
  }
  if (result.type === "compare") {
    return (
      <div className="nlq-compare">
        <div className="nlq-compare-head"><span>Metrik</span><span>SSP2-4.5</span><span>SSP5-8.5</span></div>
        {result.metrics.map((m, i) => (
          <div key={i} className="nlq-compare-row">
            <span>{m.k}</span><span className="nlq-comp-a">{m.a}</span><span className="nlq-comp-b">{m.b}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function renderMd(s) {
  if (!s) return null;
  return s.split(/(\*\*[^*]+\*\*)/).map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

Object.assign(window, { NLPQuery });
