// ============================================================
// Shell: TopBar, Sidebar, ContextBar, StatusBar, FloatingAI
// — §5.1, §5.2, §5.3, §5.4, §5.6, §5.8 of spec
// ============================================================
const tr = window.tr;

function TopBar({ ctx, setCtx, route, setRoute, openSearch, openAI, toggleSidebar, sidebarOpen }) {
  const persona = window.PERSONAS[ctx.persona];
  const [userMenu, setUserMenu] = React.useState(false);
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [langOpen, setLangOpen] = React.useState(false);

  return (
    <header className="topbar" data-screen-label="Top Bar">
      <div className="topbar-left">
        <button className="icon-btn" onClick={toggleSidebar} title={sidebarOpen ? tr("Tutup sidebar") : tr("Buka sidebar")} aria-label="Toggle sidebar">
          <Icon name="menu" size={20} />
        </button>
        <button className="brand" onClick={() => setRoute("dashboard")}>
          <div className="brand-mark">
            <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
              <circle cx="16" cy="16" r="14" fill="#0E5A78" />
              <path d="M6 16 C 10 8, 22 8, 26 16 C 22 24, 10 24, 6 16 Z" fill="none" stroke="white" strokeWidth="1.4" />
              <circle cx="16" cy="16" r="2.5" fill="white" />
              <path d="M16 4 V 28 M 4 16 H 28" stroke="white" strokeWidth="0.6" opacity="0.4" />
            </svg>
          </div>
          <div className="brand-text">
            <div className="brand-name">CLIMATE ACTION</div>
            <div className="brand-sub">BIG · Indonesia</div>
          </div>
        </button>
      </div>

      <button className="search-trigger" onClick={openSearch} aria-label="Cari (Cmd+K)">
        <Icon name="search" size={16} />
        <span>{tr("Cari layer, skenario, fitur, laporan, atau dokumentasi…")}</span>
        <kbd className="kbd-inline">⌘K</kbd>
      </button>

      <div className="topbar-right">
        <button className="topbtn" onClick={openAI} title="AI Assistant (⌘I)">
          <Icon name="bot" size={18} />
          <span>AI</span>
        </button>

        <div className="topbtn-wrap">
          <button className="topbtn icon-only" onClick={() => { setNotifOpen(!notifOpen); setUserMenu(false); setLangOpen(false); }} title={tr("Notifikasi")}>
            <Icon name="bell" size={18} />
            <span className="badge-dot">3</span>
          </button>
          {notifOpen && (
            <div className="dropdown notif-dropdown">
              <div className="dropdown-head">
                <span>{tr("Notifikasi")}</span>
                <button className="link-btn">{tr("Tandai semua dibaca")}</button>
              </div>
              {window.NOTIFICATIONS.map((n, i) => (
                <div key={i} className="notif-item">
                  <div className={`notif-icon notif-${n.color}`}><Icon name={n.icon} size={16} /></div>
                  <div className="notif-body">
                    <div className="notif-title">{tr(n.title)}</div>
                    <div className="notif-text">{tr(n.body)}</div>
                  </div>
                  <div className="notif-when">{n.when}</div>
                </div>
              ))}
              <div className="dropdown-foot">
                <button className="link-btn">{tr("Lihat semua aktivitas →")}</button>
              </div>
            </div>
          )}
        </div>

        <div className="topbtn-wrap">
          <button className="topbtn" onClick={() => { setLangOpen(!langOpen); setUserMenu(false); setNotifOpen(false); }}>
            <Icon name="globe" size={16} />
            <span>{ctx.lang === "id" ? "ID" : "EN"}</span>
            <Icon name="chevron-down" size={14} />
          </button>
          {langOpen && (
            <div className="dropdown lang-dropdown">
              {[["id","Bahasa Indonesia"],["en","English"]].map(([k, name]) => (
                /* names intentionally untranslated */
                <button key={k} className={`dropdown-item ${ctx.lang === k ? "active" : ""}`} onClick={() => { setCtx({ ...ctx, lang: k }); setLangOpen(false); }}>
                  <span>{name}</span>
                  {ctx.lang === k && <Icon name="check-circle" size={14} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="topbtn-wrap">
          <button className="user-pill" onClick={() => { setUserMenu(!userMenu); setNotifOpen(false); setLangOpen(false); }}>
            <div className="avatar" style={{ background: persona.color }}>
              {persona.name.split(" ").map(x => x[0]).slice(0, 2).join("")}
            </div>
            <div className="user-pill-text">
              <div className="user-name">{persona.name.split(" ")[0]}</div>
              <div className="user-role">{persona.title}</div>
            </div>
            <Icon name="chevron-down" size={14} />
          </button>
          {userMenu && (
            <div className="dropdown user-dropdown">
              <div className="user-info">
                <div className="avatar lg" style={{ background: persona.color }}>
                  {persona.name.split(" ").map(x => x[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <div className="user-name">{persona.name}</div>
                  <div className="user-meta">{persona.role}</div>
                  <div className="user-meta muted">{persona.org}</div>
                </div>
              </div>
              <div className="dropdown-sep" />
              <button className="dropdown-item"><Icon name="user" size={16} /><span>{tr("Profil saya")}</span></button>
              <button className="dropdown-item"><Icon name="settings" size={16} /><span>{tr("Pengaturan")}</span></button>
              <button className="dropdown-item"><Icon name="help-circle" size={16} /><span>{tr("Bantuan & dokumentasi")}</span></button>
              <div className="dropdown-sep" />
              <button className="dropdown-item danger"><Icon name="log-out" size={16} /><span>{tr("Keluar")}</span></button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function Sidebar({ open, route, setRoute, persona }) {
  // Module visibility per persona (§3.6)
  const allowed = {
    P1: ["dashboard","map","sdss","reports","collab","data","settings"],
    P2: ["dashboard","map","modeling","vulnerability","sectoral","sdss","ai","collab","reports","data","settings"],
    P3: ["dashboard","map","modeling","vulnerability","sectoral","sdss","ai","collab","reports","data","settings"],
    P4: ["dashboard","map","sectoral","sdss","reports","data","settings"],
    P5: ["dashboard","map","reports","data"],
  };
  const visible = allowed[persona] || allowed.P2;

  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`} data-screen-label="Sidebar">
      <nav className="sidebar-nav">
        {window.MODULES.filter(m => visible.includes(m.id)).map(m => (
          <button
            key={m.id}
            className={`nav-item ${route === m.id ? "active" : ""}`}
            onClick={() => setRoute(m.id)}
            title={!open ? m.name : ""}
          >
            <Icon name={m.icon} size={18} strokeWidth={1.7} />
            {open && <span className="nav-label">{tr(m.short)}</span>}
            {open && m.count > 0 && <span className="nav-count">{m.count}</span>}
            {route === m.id && <span className="nav-active-bar" />}
          </button>
        ))}
      </nav>

      {open && (
        <div className="sidebar-foot">
          <div className="sidebar-section-label">{tr("Tersematkan")}</div>
          <button className="nav-item small">
            <Icon name="pin" size={16} />
            <span className="nav-label">{tr("Sulsel Banjir 2024")}</span>
          </button>
          <button className="nav-item small">
            <Icon name="pin" size={16} />
            <span className="nav-label">{tr("RDTR Makassar 2030")}</span>
          </button>
        </div>
      )}
    </aside>
  );
}

function ContextBar({ ctx, setCtx, crisis }) {
  const [open, setOpen] = React.useState(null);
  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];
  const period = window.PERIODS.find(p => p.id === ctx.period) || window.PERIODS[1];
  const scenario = window.SCENARIOS.find(s => s.id === ctx.scenario) || window.SCENARIOS[1];

  return (
    <div className={`contextbar ${crisis ? "crisis" : ""}`}>
      {crisis && (
        <div className="crisis-banner">
          <Icon name="siren" size={18} />
          <strong>{tr("MODE KRISIS:")}</strong>
          <span>{window.CRISIS_EVENT.type} · {window.CRISIS_EVENT.area} · {window.CRISIS_EVENT.level}</span>
          <span className="crisis-meta">Diaktifkan {window.CRISIS_EVENT.started} · {window.CRISIS_EVENT.affected} terdampak</span>
          <button className="crisis-cta"><Icon name="zap" size={14} />{tr("Buka Crisis Map")}</button>
        </div>
      )}
      <div className="ctx-row">
        <div className="ctx-label">{tr("Konteks:")}</div>

        <ContextPicker
          icon="map-pin"
          label={tr("Provinsi")}
          value={tr(province.name)}
          sub={`${province.kabs} kab/kota · ${province.pop}`}
          open={open === "prov"}
          onToggle={() => setOpen(open === "prov" ? null : "prov")}
        >
          {window.PROVINCES.map(p => (
            <button key={p.code} className={`picker-item ${ctx.province === p.code ? "active" : ""}`} onClick={() => { setCtx({ ...ctx, province: p.code }); setOpen(null); }}>
              <div className="picker-item-main">{p.name}</div>
              <div className="picker-item-sub">{p.kabs} kab/kota · {p.pop}</div>
            </button>
          ))}
        </ContextPicker>

        <ContextPicker
          icon="calendar"
          label={tr("Periode")}
          value={period.id}
          sub={period.label.replace(/\(.*\)/, "").trim()}
          open={open === "period"}
          onToggle={() => setOpen(open === "period" ? null : "period")}
        >
          {window.PERIODS.map(p => (
            <button key={p.id} className={`picker-item ${ctx.period === p.id ? "active" : ""}`} onClick={() => { setCtx({ ...ctx, period: p.id }); setOpen(null); }}>
              <div className="picker-item-main">{p.label}</div>
            </button>
          ))}
        </ContextPicker>

        <ContextPicker
          icon="target"
          label={tr("Skenario")}
          value={scenario.name}
          sub={scenario.desc}
          open={open === "scn"}
          onToggle={() => setOpen(open === "scn" ? null : "scn")}
        >
          {window.SCENARIOS.map(s => (
            <button key={s.id} className={`picker-item ${ctx.scenario === s.id ? "active" : ""}`} onClick={() => { setCtx({ ...ctx, scenario: s.id }); setOpen(null); }}>
              <div className="picker-item-main">{s.name}</div>
              <div className="picker-item-sub">{s.desc}</div>
            </button>
          ))}
        </ContextPicker>

        <div className="ctx-divider" />

        <div className="ctx-pins">
          <span className="ctx-pins-label">Pin:</span>
          <button className="pin-chip"><Icon name="pin" size={12} />Makassar</button>
          <button className="pin-chip"><Icon name="pin" size={12} />Wajo</button>
          <button className="pin-chip add"><Icon name="plus" size={12} />{tr("Tambah")}</button>
        </div>
      </div>
    </div>
  );
}

function ContextPicker({ icon, label, value, sub, open, onToggle, children }) {
  return (
    <div className={`ctx-picker ${open ? "open" : ""}`}>
      <button className="ctx-picker-btn" onClick={onToggle}>
        <Icon name={icon} size={14} />
        <div className="ctx-picker-content">
          <div className="ctx-picker-label">{label}</div>
          <div className="ctx-picker-value">{value}</div>
        </div>
        <Icon name="chevron-down" size={14} />
      </button>
      {open && (
        <div className="ctx-picker-menu">
          {children}
        </div>
      )}
    </div>
  );
}

function StatusBar({ ctx, crisis }) {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="statusbar">
      <div className="status-cluster">
        <span className="status-dot online" />
        <span>{tr("Online")}</span>
      </div>
      <span className="status-sep" />
      <div className="status-cluster">
        <Icon name="database" size={12} />
        <span>{tr("Data ter-update:")} <strong>{tr("23m lalu")}</strong></span>
      </div>
      <span className="status-sep" />
      <div className="status-cluster">
        <span className="status-dot online" />
        <span>GeoVertix: <strong>99.8%</strong> uptime · 142ms</span>
      </div>
      <span className="status-sep" />
      <div className="status-cluster">
        <Icon name="loader" size={12} className={crisis ? "spin" : ""} />
        <span><strong>{crisis ? 12 : 5}</strong> {tr("jobs berjalan")}</span>
      </div>
      <span className="status-sep" />
      <div className="status-cluster">
        <Icon name="git-branch" size={12} />
        <span>v1.2.0 · build 2026.05.24</span>
      </div>
      <div className="status-right">
        <Icon name="clock" size={12} />
        <span>{time} WITA</span>
      </div>
    </div>
  );
}

function FloatingAI({ open, onClick }) {
  if (open) return null;
  return (
    <button className="floating-ai" onClick={onClick} title="AI Assistant (⌘I)" aria-label="Buka AI Assistant">
      <div className="floating-ai-pulse" />
      <Icon name="sparkles" size={20} />
      <span>{tr("Tanya AI")}</span>
    </button>
  );
}

Object.assign(window, { TopBar, Sidebar, ContextBar, StatusBar, FloatingAI });
