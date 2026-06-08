// ============================================================
// AI Assistant Drawer — §5.6, §16.6 of spec
// Side drawer (400px desktop), mock streaming, context-aware
// ============================================================

function AIDrawer({ open, onClose, ctx, route }) {
  const [messages, setMessages] = React.useState(() => [
    {
      role: "assistant",
      text: "Halo! Saya AI Assistant Climate Action Platform. Saya melihat konteks aktif Anda: **Sulawesi Selatan · SSP2-4.5 · 2025-2050**. Saya bisa bantu menjelaskan skor risiko, membuat ringkasan, merekomendasikan aksi, atau menarik data dari 62 fitur. Tanyakan apa saja.",
      time: "Baru saja",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [streaming, setStreaming] = React.useState(false);
  const [streamText, setStreamText] = React.useState("");
  const listRef = React.useRef(null);

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, streamText]);

  const lookupResponse = (q) => {
    const lc = q.toLowerCase();
    for (const r of window.AI_RESPONSES) {
      if (r.triggers.some(t => lc.includes(t))) return r.text;
    }
    return window.DEFAULT_AI_RESPONSE;
  };

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q || streaming) return;
    setInput("");
    const newMsgs = [...messages, { role: "user", text: q, time: "Baru saja" }];
    setMessages(newMsgs);
    setStreaming(true);
    setStreamText("");

    const reply = lookupResponse(q);
    let i = 0;
    const interval = setInterval(() => {
      i += Math.max(2, Math.floor(Math.random() * 6));
      setStreamText(reply.slice(0, i));
      if (i >= reply.length) {
        clearInterval(interval);
        setMessages([...newMsgs, { role: "assistant", text: reply, time: "Baru saja" }]);
        setStreamText("");
        setStreaming(false);
      }
    }, 24);
  };

  if (!open) return null;

  return (
    <>
      <div className="ai-drawer-scrim" onClick={onClose} />
      <aside className="ai-drawer" role="dialog" aria-label="AI Assistant">
        <header className="ai-head">
          <div className="ai-head-title">
            <div className="ai-avatar">
              <Icon name="sparkles" size={16} />
            </div>
            <div>
              <div className="ai-title">AI Assistant</div>
              <div className="ai-sub">Konteks: {window.PROVINCES.find(p => p.code === ctx.province)?.name} · {ctx.scenario.toUpperCase()} · halaman {route}</div>
            </div>
          </div>
          <div className="ai-actions">
            <button className="icon-btn" title="Riwayat"><Icon name="clock" size={16} /></button>
            <button className="icon-btn" title="Ganti model"><Icon name="more-vertical" size={16} /></button>
            <button className="icon-btn" onClick={onClose} title="Tutup"><Icon name="x" size={18} /></button>
          </div>
        </header>

        <div className="ai-context-strip">
          <Icon name="info" size={12} />
          <span>Setiap pertanyaan otomatis menerima konteks: provinsi, periode, skenario, halaman aktif, dan data dalam viewport.</span>
        </div>

        <div className="ai-list" ref={listRef}>
          {messages.map((m, i) => (
            <AIMessage key={i} {...m} />
          ))}
          {streaming && streamText && (
            <AIMessage role="assistant" text={streamText} time="Mengetik…" streaming />
          )}
        </div>

        <div className="ai-suggestions">
          <div className="ai-suggestions-label">Coba tanyakan:</div>
          <div className="ai-suggestions-row">
            {window.QUICK_PROMPTS.map((p, i) => (
              <button key={i} className="ai-suggestion" onClick={() => send(p)} disabled={streaming}>{p}</button>
            ))}
          </div>
        </div>

        <form className="ai-form" onSubmit={(e) => { e.preventDefault(); send(); }}>
          <button type="button" className="icon-btn-soft" title="Tambah konteks"><Icon name="plus" size={16} /></button>
          <input
            type="text"
            placeholder="Tanyakan tentang iklim, risiko, atau platform…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={streaming}
            className="ai-input"
          />
          <button type="submit" className="ai-send" disabled={!input.trim() || streaming}>
            <Icon name="send" size={16} />
          </button>
        </form>

        <div className="ai-foot">
          <kbd>⌘I</kbd> untuk buka/tutup · <kbd>↵</kbd> kirim · output AI bisa salah, validasi sebelum publish
        </div>
      </aside>
    </>
  );
}

function AIMessage({ role, text, time, streaming }) {
  // Simple markdown-ish formatter: **bold**, lines + bullets
  const formatted = text.split("\n").map((line, i) => {
    if (line.match(/^\d+\.\s/)) {
      return <li key={i}>{renderInline(line.replace(/^\d+\.\s/, ""))}</li>;
    }
    if (line.startsWith("- ") || line.startsWith("• ")) {
      return <li key={i}>{renderInline(line.replace(/^[-•]\s/, ""))}</li>;
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i}>{renderInline(line)}</p>;
  });

  return (
    <div className={`ai-msg role-${role}`}>
      {role === "assistant" && <div className="ai-msg-avatar"><Icon name="sparkles" size={14} /></div>}
      <div className="ai-msg-bubble">
        <div className="ai-msg-text">{formatted}{streaming && <span className="ai-cursor" />}</div>
        {role === "assistant" && !streaming && (
          <div className="ai-msg-tools">
            <button className="ai-tool-btn" title="Pin to page"><Icon name="pin" size={12} />Pin</button>
            <button className="ai-tool-btn" title="Copy"><Icon name="share" size={12} />Bagikan</button>
            <button className="ai-tool-btn" title="Source"><Icon name="info" size={12} />Sumber</button>
          </div>
        )}
        <div className="ai-msg-time">{time}</div>
      </div>
    </div>
  );
}

function renderInline(s) {
  const parts = s.split(/(\*\*[^*]+\*\*)/);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**")
      ? <strong key={i}>{p.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

Object.assign(window, { AIDrawer });
