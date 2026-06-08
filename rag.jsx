// ============================================================
// AI — RAG Pipeline & Knowledge Base · FITUR 6.6
// Sumber: §6.6 — document ingestion → embedding → retrieval (hybrid
// dense+BM25) → augmentation → cited answer. KB stats + retrieval viz.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const RAG_SOURCES = [
  { id: "uu", name: "UU & Peraturan", count: 142, icon: "book-open" },
  { id: "method", name: "Methodology docs", count: 87, icon: "file-text" },
  { id: "bp", name: "Best practices adaptasi", count: 213, icon: "sparkles" },
  { id: "faq", name: "FAQ internal helpdesk", count: 64, icon: "help-circle" },
  { id: "glos", name: "Glosarium iklim (ID/EN)", count: 1240, icon: "globe" },
  { id: "nspk", name: "Spatial planning (NSPK)", count: 56, icon: "map" },
];

const RAG_PRESET = {
  q: "Bagaimana regulasi tentang sempadan pantai?",
  retrieved: [
    { src: "UU 26/2007 Penataan Ruang", chunk: "Sempadan pantai adalah daratan sepanjang tepian pantai... minimal 100 meter dari titik pasang tertinggi", score: 0.91, page: "Pasal 14" },
    { src: "Permen ATR/BPN 11/2021", chunk: "Pengaturan sempadan pantai di tingkat kab/kota diatur dalam RTRW dan RDTR", score: 0.86, page: "Bab III" },
    { src: "NDC Indonesia 2022 Update", chunk: "Integrasi sempadan pantai dengan adaptasi SLR, proyeksi 100 tahun", score: 0.78, page: "Sec 4.2" },
    { src: "Best Practice Coastal — BNPB", chunk: "Fungsi sempadan: proteksi abrasi, intrusi air laut, habitat biota", score: 0.72, page: "p.18" },
  ],
  answer: "Berdasarkan regulasi Indonesia:\n\n**Sempadan pantai** adalah daratan sepanjang tepian pantai yang lebarnya proporsional dengan bentuk dan kondisi fisik pantai, **minimal 100 meter** dari titik pasang tertinggi ke arah daratan [1].\n\nFungsi sempadan pantai:\n- Melindungi pantai dari abrasi\n- Melindungi sumber air dari intrusi air laut\n- Habitat biota pantai & pelestarian biodiversity\n\nPengaturan di tingkat kabupaten/kota diatur dalam RTRW dan RDTR sesuai Permen ATR/BPN No. 11/2021 [2]. Untuk Demak, sempadan pantai harus diintegrasikan dengan adaptasi SLR, mempertimbangkan proyeksi 100 tahun [3].",
  citations: ["UU 26/2007 Penataan Ruang, Pasal 14", "Permen ATR/BPN 11/2021 tentang RDTR", "Dokumen NDC Indonesia 2022 Update"],
};

const RAG_SUGGESTIONS = [
  "Bagaimana regulasi tentang sempadan pantai?",
  "Apa metodologi MCDA untuk vulnerability?",
  "Best practice adaptasi banjir rob",
  "Definisi daya dukung lahan menurut PP 21/2021",
];

function RAGKnowledge({ setRoute, ctx, openAI }) {
  const [query, setQuery] = React.useState("");
  const [stage, setStage] = React.useState("idle"); // idle | retrieving | done
  const [result, setResult] = React.useState(null);

  const ask = (text) => {
    const q = (text ?? query).trim();
    if (!q || stage === "retrieving") return;
    setQuery(q);
    setStage("retrieving");
    setResult(null);
    setTimeout(() => { setResult(RAG_PRESET); setStage("done"); }, 1500);
  };

  const totalDocs = RAG_SOURCES.reduce((a, s) => a + s.count, 0);

  return (
    <div className="feat-page rag-page" data-screen-label="Feature: RAG Knowledge Base">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("ai")} className="link-btn">{tr("Asisten AI")}</button>
          <Icon name="chevron-right" size={12} />
          <span>RAG Pipeline & Knowledge Base</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-ai"><Icon name="book-open" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 6.6 · AI · KNOWLEDGE BASE</div>
              <h1>RAG Pipeline & Knowledge Base</h1>
              <div className="feat-sub">Retrieval-augmented generation dari dokumen K/L · hybrid dense+BM25 · jawaban ber-sitasi yang traceable</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn"><Icon name="plus" size={14} />Ingest dokumen</button>
          </div>
        </div>
      </div>

      <div className="rag-body">
        {/* LEFT: KB stats */}
        <aside className="rag-kb">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Knowledge Base</div>
            <div className="rag-kb-total">{totalDocs.toLocaleString("id-ID")}<span>dokumen terindeks</span></div>
            <div className="rag-kb-list">
              {RAG_SOURCES.map(s => (
                <div key={s.id} className="rag-kb-src">
                  <div className="rag-kb-icon"><Icon name={s.icon} size={14} /></div>
                  <span className="rag-kb-name">{s.name}</span>
                  <span className="rag-kb-count">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rdtr-panel rag-tech">
            <div className="rdtr-panel-head">Konfigurasi</div>
            <div className="rag-tech-row"><span className="muted">Embedding</span><strong>mpnet-multilingual</strong></div>
            <div className="rag-tech-row"><span className="muted">Vector dim</span><strong>768</strong></div>
            <div className="rag-tech-row"><span className="muted">Store</span><strong>Qdrant</strong></div>
            <div className="rag-tech-row"><span className="muted">Retrieval</span><strong>Hybrid (dense+BM25)</strong></div>
            <div className="rag-tech-row"><span className="muted">Re-ranker</span><strong>cross-encoder</strong></div>
            <div className="rag-tech-row"><span className="muted">Top-K</span><strong>5</strong></div>
          </div>
        </aside>

        {/* CENTER: query + answer */}
        <div className="rag-center">
          <form className="rag-search" onSubmit={e => { e.preventDefault(); ask(); }}>
            <Icon name="search" size={18} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tanya regulasi, metodologi, atau best practice…" disabled={stage === "retrieving"} />
            <button type="submit" className="primary-btn" disabled={!query.trim() || stage === "retrieving"}>Cari</button>
          </form>

          {stage === "idle" && (
            <div className="rag-empty">
              <div className="rag-empty-icon"><Icon name="book-open" size={36} strokeWidth={1.2} /></div>
              <div className="rag-empty-title">Tanya basis pengetahuan K/L</div>
              <div className="rag-empty-desc">Setiap jawaban menyertakan sitasi ke dokumen sumber untuk traceability penuh.</div>
              <div className="rag-suggestions">
                {RAG_SUGGESTIONS.map((s, i) => <button key={i} className="rag-suggestion" onClick={() => ask(s)}>{s}</button>)}
              </div>
            </div>
          )}

          {stage === "retrieving" && (
            <div className="rag-retrieving">
              <div className="rag-pipeline-viz">
                {["Embed query", "Hybrid search (Qdrant + BM25)", "Re-rank (cross-encoder)", "Augment + generate"].map((s, i) => (
                  <div key={i} className="rag-pv-step" style={{ animationDelay: `${i * 0.3}s` }}>
                    <span className="whatif-spinner" /><span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {stage === "done" && result && (
            <div className="rag-result">
              <div className="rag-answer-card">
                <div className="rag-answer-head"><Icon name="sparkles" size={14} />Jawaban</div>
                <div className="rag-answer-body">{ragMd(result.answer)}</div>
                <div className="rag-citations">
                  <div className="rag-cit-label">Sumber:</div>
                  {result.citations.map((c, i) => (
                    <div key={i} className="rag-cit"><span className="rag-cit-n">[{i + 1}]</span>{c}</div>
                  ))}
                </div>
              </div>
              <div className="rag-retrieved">
                <div className="rag-retrieved-head">Chunks ter-retrieve ({result.retrieved.length}) · hybrid score</div>
                {result.retrieved.map((r, i) => (
                  <div key={i} className="rag-chunk">
                    <div className="rag-chunk-head">
                      <span className="rag-chunk-src">{r.src}</span>
                      <span className="rag-chunk-score" style={{ color: r.score >= 0.85 ? "var(--success-700)" : "var(--warning-700)" }}>{r.score.toFixed(2)}</span>
                    </div>
                    <div className="rag-chunk-text">"{r.chunk}"</div>
                    <div className="rag-chunk-meta">{r.page}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ragMd(s) {
  return s.split("\n").map((line, i) => {
    if (line.startsWith("- ")) return <li key={i}>{ragInline(line.slice(2))}</li>;
    if (line.trim() === "") return <br key={i} />;
    return <p key={i}>{ragInline(line)}</p>;
  });
}
function ragInline(s) {
  return s.split(/(\*\*[^*]+\*\*|\[\d\])/).map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (/^\[\d\]$/.test(p)) return <sup key={i} className="rag-cit-mark">{p}</sup>;
    return <React.Fragment key={i}>{p}</React.Fragment>;
  });
}

Object.assign(window, { RAGKnowledge });
