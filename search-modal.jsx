// ============================================================
// Global Search Modal — §5.5 of spec, Spotlight-style
// ============================================================

function SearchModal({ open, onClose, setRoute }) {
  const [q, setQ] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
      setQ("");
      setActive(0);
    }
  }, [open]);

  const results = React.useMemo(() => {
    if (!q.trim()) return window.SEARCH_INDEX.slice(0, 8);
    const lc = q.toLowerCase();
    return window.SEARCH_INDEX
      .filter(item => item.name.toLowerCase().includes(lc) || item.desc.toLowerCase().includes(lc) || item.type.toLowerCase().includes(lc))
      .slice(0, 12);
  }, [q]);

  // Group by type
  const grouped = React.useMemo(() => {
    const out = {};
    results.forEach(r => { (out[r.type] = out[r.type] || []).push(r); });
    return out;
  }, [results]);

  const flatList = results;

  const handleKey = (e) => {
    if (e.key === "Escape") { onClose(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive(a => Math.min(a + 1, flatList.length - 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    else if (e.key === "Enter")     {
      if (flatList[active]) {
        setRoute(flatList[active].id);
        onClose();
      }
    }
  };

  if (!open) return null;

  return (
    <div className="search-modal-wrap" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()} role="dialog" aria-label="Pencarian global">
        <div className="search-input-row">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            onKeyDown={handleKey}
            placeholder="Cari modul, fitur, layer, skenario, laporan, provinsi…"
            className="search-input"
          />
          <kbd>esc</kbd>
        </div>

        <div className="search-results">
          {flatList.length === 0 ? (
            <div className="search-empty">
              <Icon name="search" size={32} strokeWidth={1.2} />
              <div>Tidak ada hasil untuk "<strong>{q}</strong>"</div>
              <div className="muted">Coba kata kunci lain atau buka modul terkait dari sidebar.</div>
            </div>
          ) : (
            Object.entries(grouped).map(([type, items]) => (
              <div className="search-group" key={type}>
                <div className="search-group-label">{type}</div>
                {items.map((item) => {
                  const idx = flatList.indexOf(item);
                  return (
                    <button
                      key={item.name}
                      className={`search-result ${idx === active ? "active" : ""}`}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => { setRoute(item.id); onClose(); }}
                    >
                      <div className="search-result-icon">
                        <Icon name={searchIconFor(item.type)} size={14} />
                      </div>
                      <div className="search-result-body">
                        <div className="search-result-name">{highlight(item.name, q)}</div>
                        <div className="search-result-desc">{item.desc}</div>
                      </div>
                      <div className="search-result-meta">
                        <span className="search-result-type">{item.type}</span>
                        <Icon name="arrow-right" size={12} />
                      </div>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="search-foot">
          <div className="search-foot-keys">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigasi</span>
            <span><kbd>↵</kbd> buka</span>
            <span><kbd>esc</kbd> tutup</span>
          </div>
          <div className="search-foot-tip">
            Tip: ketik <kbd>m:</kbd> untuk modul, <kbd>f:</kbd> untuk fitur, <kbd>l:</kbd> untuk layer
          </div>
        </div>
      </div>
    </div>
  );
}

function searchIconFor(type) {
  return {
    "Modul": "layers",
    "Fitur": "circle-dot",
    "Layer": "map",
    "Skenario": "target",
    "Laporan": "file-text",
    "Provinsi": "map-pin",
    "Bantuan": "help-circle",
  }[type] || "circle";
}

function highlight(text, q) {
  if (!q.trim()) return text;
  const lc = text.toLowerCase();
  const lcq = q.toLowerCase();
  const i = lc.indexOf(lcq);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  );
}

Object.assign(window, { SearchModal });
