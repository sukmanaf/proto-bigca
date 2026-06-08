// ============================================================
// Polish (Sesi 5)
// • Public Landing (P5 — story map style)
// • Keyboard shortcut cheatsheet (?)
// • Mobile bottom nav
// • State patterns showcase
// (Dark mode handled via CSS in index.html)
// ============================================================

const Icon = window.Icon;

// =================================================================
// 1) PUBLIC LANDING (P5) — §6.11
// =================================================================
function PublicLanding({ setRoute, openAI }) {
  const stories = [
    {
      slug: "sulsel-flood-2024", title: "Sulawesi Selatan Hadapi Banjir Terburuk dalam Dekade",
      excerpt: "Kombinasi La Niña dan deforestasi membuat 12 kabupaten terdampak. Apa kata data platform?",
      read: "8 menit", date: "26 Mei 2026", category: "Cerita", thumb: "flood",
    },
    {
      slug: "ntt-drought-resilience", title: "Bagaimana NTT Membangun Ketahanan Kekeringan",
      excerpt: "Lima kabupaten di Timor merancang adaptasi multi-dekade. Studi kasus integrated planning.",
      read: "12 menit", date: "22 Mei 2026", category: "Studi Kasus", thumb: "drought",
    },
    {
      slug: "mangrove-coastal-defense", title: "Mangrove: Tembok Hidup untuk Pesisir Indonesia",
      excerpt: "Restorasi mangrove di Pinrang menunjukkan ROI 3.4× dibanding seawall konvensional.",
      read: "6 menit", date: "18 Mei 2026", category: "Solusi", thumb: "mangrove",
    },
    {
      slug: "kalbar-fire-enso", title: "ENSO 2026: Antisipasi Karhutla Kalimantan",
      excerpt: "Prediksi IOD positif dan El Niño lemah — apa artinya untuk musim kemarau di Kalbar?",
      read: "5 menit", date: "15 Mei 2026", category: "Prediksi", thumb: "fire",
    },
  ];

  return (
    <div className="public-landing" data-screen-label="Public Landing (P5)">
      {/* Public top nav (different from internal top bar) */}
      <header className="pub-nav">
        <div className="pub-nav-inner">
          <div className="brand">
            <div className="brand-mark">
              <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                <circle cx="16" cy="16" r="14" fill="#0E5A78" />
                <path d="M6 16 C 10 8, 22 8, 26 16 C 22 24, 10 24, 6 16 Z" fill="none" stroke="white" strokeWidth="1.4" />
                <circle cx="16" cy="16" r="2.5" fill="white" />
              </svg>
            </div>
            <div className="brand-text">
              <div className="brand-name">CLIMATE ACTION</div>
              <div className="brand-sub">BIG · Indonesia</div>
            </div>
          </div>
          <nav className="pub-nav-links">
            <button className="active">Cerita</button>
            <button onClick={() => setRoute("map")}>Peta</button>
            <button>Berita</button>
            <button>Tentang</button>
            <button>API</button>
          </nav>
          <div className="pub-nav-actions">
            <button className="ghost-btn">🌐 ID</button>
            <button className="primary-btn">Masuk</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pub-hero">
        <div className="pub-hero-inner">
          <div className="pub-hero-text">
            <div className="pub-hero-tag">🌏 Platform Pemerintah · Akses Publik</div>
            <h1>Memahami Iklim Indonesia,<br />Membangun Aksi Bersama.</h1>
            <p className="pub-hero-sub">
              Platform geospasial nasional yang menghimpun 62 fitur analisis iklim — dari pemodelan,
              kerentanan, sampai dukungan keputusan. Akses terbuka untuk warga, jurnalis, dan akademisi.
            </p>
            <div className="pub-hero-actions">
              <button className="primary-btn" onClick={() => setRoute("map")}>
                <Icon name="map" size={16} />Buka Peta Iklim
              </button>
              <button className="ghost-btn" onClick={openAI}>
                <Icon name="bot" size={16} />Tanya AI tentang iklim
              </button>
            </div>
            <div className="pub-hero-stats">
              <div><strong>38</strong> provinsi terpantau</div>
              <div><strong>514</strong> kab/kota</div>
              <div><strong>1,247</strong> dataset</div>
              <div><strong>5</strong> integrasi K/L</div>
            </div>
          </div>
          <div className="pub-hero-visual">
            <PublicHeroVisual />
          </div>
        </div>
      </section>

      {/* Active alerts */}
      <section className="pub-section">
        <div className="pub-section-inner">
          <div className="pub-section-head">
            <div>
              <h2>Peringatan Aktif</h2>
              <p>Status iklim & bencana terkini se-Indonesia · update real-time</p>
            </div>
            <button className="link-btn">Lihat semua peringatan →</button>
          </div>
          <div className="pub-alerts">
            {[
              { sev: "high", type: "🌊 Banjir", area: "Wajo, Sulsel", time: "2 jam lalu", desc: "Siaga 2 · 12.400 jiwa terdampak proyeksi 48 jam" },
              { sev: "medium", type: "☀️ Kekeringan", area: "Belu, NTT", time: "1 hari lalu", desc: "SPI-3 moderate · 3 minggu kekurangan curah hujan" },
              { sev: "medium", type: "🔥 Karhutla", area: "Sintang, Kalbar", time: "1 hari lalu", desc: "23 hotspot terdeteksi · konfidensi >80%" },
            ].map((a, i) => (
              <div key={i} className={`pub-alert sev-${a.sev}`}>
                <div className="pub-alert-stripe" />
                <div className="pub-alert-type">{a.type}</div>
                <div className="pub-alert-area">{a.area}</div>
                <div className="pub-alert-desc">{a.desc}</div>
                <div className="pub-alert-time">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="pub-section alt-bg">
        <div className="pub-section-inner">
          <div className="pub-section-head">
            <div>
              <h2>Cerita Iklim Indonesia</h2>
              <p>Studi kasus, narasi data, dan kisah lapangan dari 38 provinsi</p>
            </div>
            <div className="pub-filter">
              <button className="pub-filter-btn active">Semua</button>
              <button className="pub-filter-btn">Cerita</button>
              <button className="pub-filter-btn">Studi Kasus</button>
              <button className="pub-filter-btn">Solusi</button>
              <button className="pub-filter-btn">Prediksi</button>
            </div>
          </div>
          <div className="pub-stories-grid">
            {stories.map(s => (
              <article key={s.slug} className="pub-story">
                <div className={`pub-story-thumb thumb-${s.thumb}`}>
                  <PublicStoryThumb type={s.thumb} />
                  <div className="pub-story-cat">{s.category}</div>
                </div>
                <div className="pub-story-body">
                  <h3>{s.title}</h3>
                  <p>{s.excerpt}</p>
                  <div className="pub-story-meta">
                    <span><Icon name="clock" size={12} />{s.read}</span>
                    <span className="dot-sep">·</span>
                    <span>{s.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="pub-section">
        <div className="pub-section-inner pub-subscribe">
          <div>
            <div className="pub-subscribe-tag">🔔 Berlangganan</div>
            <h2>Dapatkan peringatan iklim langsung di email Anda</h2>
            <p>Setiap minggu rangkuman 5-menit. Saat ada peringatan dini, langsung kirim — gratis, tanpa spam.</p>
          </div>
          <form className="pub-subscribe-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="email@example.com" />
            <button type="submit" className="primary-btn">Berlangganan</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="pub-footer">
        <div className="pub-footer-inner">
          <div>
            <div className="brand-name" style={{ color: "white" }}>CLIMATE ACTION PLATFORM</div>
            <div className="pub-footer-sub">Badan Informasi Geospasial · Indonesia</div>
            <div className="pub-footer-sub">Platform aksi iklim publik · 2026</div>
          </div>
          <div className="pub-footer-cols">
            <div>
              <div className="pub-footer-label">Platform</div>
              <button>Peta Iklim Publik</button>
              <button>Cerita</button>
              <button>API Publik</button>
              <button>Status System</button>
            </div>
            <div>
              <div className="pub-footer-label">Sumber</div>
              <button>Dokumentasi</button>
              <button>Metodologi</button>
              <button>Data Lineage</button>
              <button>Open data</button>
            </div>
            <div>
              <div className="pub-footer-label">K/L Mitra</div>
              <button>BIG</button>
              <button>BNPB</button>
              <button>BMKG</button>
              <button>KLHK · BPS · Bappenas</button>
            </div>
            <div>
              <div className="pub-footer-label">Kontak</div>
              <button>info@climate.big.go.id</button>
              <button>+62 21 8753155</button>
              <button>Press kit</button>
            </div>
          </div>
        </div>
        <div className="pub-footer-bottom">
          <span>© 2026 Badan Informasi Geospasial RI · v1.2.0</span>
          <span>Hak akses publik per UU No 14/2008 KIP · PDP Law compliant</span>
        </div>
      </footer>
    </div>
  );
}

function PublicHeroVisual() {
  return (
    <svg viewBox="0 0 480 360" className="pub-hero-svg">
      <defs>
        <linearGradient id="pub-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C5DCE5" />
          <stop offset="1" stopColor="#E1ECF1" />
        </linearGradient>
        <linearGradient id="pub-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3784A2" />
          <stop offset="1" stopColor="#0E5A78" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#pub-sky)" rx="16" />
      {/* Indonesian archipelago abstract shape */}
      <g opacity="0.95">
        <path d="M40,180 Q 80,160 130,170 T 220,165 Q 240,160 260,168" fill="none" stroke="#0E5A78" strokeWidth="3" />
        <ellipse cx="80" cy="180" rx="35" ry="12" fill="#2F7D5E" />
        <ellipse cx="160" cy="172" rx="30" ry="10" fill="#2F7D5E" />
        <ellipse cx="220" cy="170" rx="45" ry="14" fill="#2F7D5E" />
        <ellipse cx="300" cy="175" rx="38" ry="14" fill="#2F7D5E" />
        <ellipse cx="380" cy="180" rx="40" ry="16" fill="#2F7D5E" />
        <ellipse cx="430" cy="200" rx="28" ry="10" fill="#2F7D5E" />
        <ellipse cx="350" cy="240" rx="22" ry="8" fill="#2F7D5E" />
      </g>
      {/* Risk pulse markers */}
      <g>
        <circle cx="225" cy="170" r="12" fill="none" stroke="#8B1A1A" strokeWidth="2">
          <animate attributeName="r" from="6" to="20" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="1" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="225" cy="170" r="4" fill="#8B1A1A" />
      </g>
      <g>
        <circle cx="300" cy="178" r="10" fill="none" stroke="#C44E37" strokeWidth="1.5">
          <animate attributeName="r" from="5" to="16" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" from="0.8" to="0" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="178" r="3" fill="#C44E37" />
      </g>
      {/* sun */}
      <g opacity="0.85">
        <circle cx="400" cy="70" r="32" fill="#E9A352" />
        <circle cx="400" cy="70" r="40" fill="none" stroke="#E9A352" strokeWidth="1.5" opacity="0.4" />
      </g>
      {/* clouds */}
      <g opacity="0.7">
        <circle cx="90" cy="80" r="18" fill="white" />
        <circle cx="115" cy="78" r="22" fill="white" />
        <circle cx="140" cy="82" r="18" fill="white" />
      </g>
      {/* annotation labels */}
      <g fontSize="11" fill="#074866" fontFamily="Inter, sans-serif">
        <text x="195" y="155" fontWeight="600">⚠ Sulsel</text>
        <text x="280" y="160" fontWeight="500">Kalbar</text>
        <text x="60" y="200" fontWeight="500">Jabar</text>
        <text x="420" y="225" fontWeight="500">Papua</text>
      </g>
      <g fontSize="10" fill="#6B7B74">
        <text x="195" y="320" textAnchor="middle">38 provinsi · 514 kab/kota · 1.247 dataset</text>
      </g>
    </svg>
  );
}

function PublicStoryThumb({ type }) {
  if (type === "flood") return (
    <svg viewBox="0 0 240 140" className="story-svg">
      <defs><linearGradient id="t-flood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#074866" /><stop offset="1" stopColor="#0E5A78" /></linearGradient></defs>
      <rect width="240" height="140" fill="url(#t-flood)" />
      <path d="M0,80 Q 40,60 80,75 T 160,72 T 240,80 L 240,140 L 0,140 Z" fill="#1B6E8A" opacity="0.6" />
      <path d="M0,95 Q 40,80 80,90 T 160,87 T 240,95 L 240,140 L 0,140 Z" fill="#3784A2" opacity="0.7" />
      <rect x="40" y="60" width="14" height="30" fill="#0B1220" opacity="0.7" />
      <rect x="120" y="50" width="16" height="40" fill="#0B1220" opacity="0.7" />
      <rect x="180" y="55" width="14" height="35" fill="#0B1220" opacity="0.7" />
    </svg>
  );
  if (type === "drought") return (
    <svg viewBox="0 0 240 140" className="story-svg">
      <rect width="240" height="140" fill="#C44E37" />
      <circle cx="180" cy="35" r="22" fill="#E9A352" />
      <g opacity="0.8">
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={i} x1={(i*9) % 240} y1={80 + (i%5)*12} x2={(i*9) % 240 + 8} y2={80 + (i%5)*12} stroke="#FBE9DA" strokeWidth="1.5" />
        ))}
      </g>
    </svg>
  );
  if (type === "mangrove") return (
    <svg viewBox="0 0 240 140" className="story-svg">
      <rect width="240" height="140" fill="#0E5A78" />
      <rect y="100" width="240" height="40" fill="#2A9D8F" opacity="0.7" />
      {[40,80,120,160,200].map(x => (
        <g key={x}>
          <line x1={x} y1="100" x2={x} y2="80" stroke="#2F7D5E" strokeWidth="2" />
          <line x1={x} y1="90" x2={x-8} y2="100" stroke="#2F7D5E" strokeWidth="1.5" />
          <line x1={x} y1="90" x2={x+8} y2="100" stroke="#2F7D5E" strokeWidth="1.5" />
          <circle cx={x} cy="65" r="12" fill="#2F7D5E" />
          <circle cx={x-7} cy="72" r="10" fill="#5B8C5A" />
          <circle cx={x+7} cy="72" r="10" fill="#5B8C5A" />
        </g>
      ))}
    </svg>
  );
  if (type === "fire") return (
    <svg viewBox="0 0 240 140" className="story-svg">
      <defs><linearGradient id="t-fire" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#5A1212" /><stop offset="0.5" stopColor="#8B1A1A" /><stop offset="1" stopColor="#E9A352" /></linearGradient></defs>
      <rect width="240" height="140" fill="url(#t-fire)" />
      <g opacity="0.85">
        {[[60,80,18],[100,70,22],[140,75,16],[180,85,20]].map(([x,y,r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#E9A352" opacity="0.6" />
        ))}
      </g>
    </svg>
  );
  return <svg viewBox="0 0 240 140" className="story-svg"><rect width="240" height="140" fill="#9DACA4" /></svg>;
}

// =================================================================
// 2) KEYBOARD SHORTCUTS OVERLAY (?)
// =================================================================
function ShortcutOverlay({ onClose }) {
  return (
    <div className="kbd-scrim" onClick={onClose}>
      <div className="kbd-modal" onClick={e => e.stopPropagation()} role="dialog">
        <header className="kbd-head">
          <div>
            <h2>Pintasan Keyboard</h2>
            <p>Tekan tombol untuk mempercepat navigasi & aksi</p>
          </div>
          <button className="icon-btn" onClick={onClose}><Icon name="x" size={18} /></button>
        </header>
        <div className="kbd-grid">
          <div className="kbd-section">
            <div className="kbd-section-label">Navigasi</div>
            <KbdRow keys={["⌘", "K"]} desc="Pencarian global (modul, fitur, layer)" />
            <KbdRow keys={["⌘", "I"]} desc="Toggle AI Assistant drawer" />
            <KbdRow keys={["?"]} desc="Tampilkan halaman ini" />
            <KbdRow keys={["G", "D"]} desc="Loncat ke Dashboard" />
            <KbdRow keys={["G", "M"]} desc="Loncat ke Map Explorer" />
            <KbdRow keys={["G", "S"]} desc="Loncat ke SDSS" />
            <KbdRow keys={["Esc"]} desc="Tutup overlay aktif" />
          </div>
          <div className="kbd-section">
            <div className="kbd-section-label">Aksi cepat</div>
            <KbdRow keys={["N"]} desc="Skenario baru" />
            <KbdRow keys={["R"]} desc="Re-run analisis aktif" />
            <KbdRow keys={["E"]} desc="Export laporan / data" />
            <KbdRow keys={["P"]} desc="Pin halaman / hasil" />
            <KbdRow keys={["⌘", "S"]} desc="Simpan draf" />
            <KbdRow keys={["⌘", "Enter"]} desc="Submit form / Run" />
          </div>
          <div className="kbd-section">
            <div className="kbd-section-label">Map Explorer</div>
            <KbdRow keys={["L"]} desc="Toggle layer panel" />
            <KbdRow keys={["+"]} desc="Zoom in" />
            <KbdRow keys={["-"]} desc="Zoom out" />
            <KbdRow keys={["M"]} desc="Measure tool" />
            <KbdRow keys={["D"]} desc="Drawing tool" />
            <KbdRow keys={["T"]} desc="Toggle time slider" />
          </div>
          <div className="kbd-section">
            <div className="kbd-section-label">AI Assistant</div>
            <KbdRow keys={["⌘", "Enter"]} desc="Kirim pesan" />
            <KbdRow keys={["⌘", "/"]} desc="Pilih konteks" />
            <KbdRow keys={["⌘", "L"]} desc="Bersihkan chat" />
            <KbdRow keys={["↑"]} desc="Edit pesan terakhir" />
            <div className="kbd-section-label" style={{ marginTop: 16 }}>Crisis Mode</div>
            <KbdRow keys={["Shift", "C"]} desc="Toggle Crisis Mode" />
            <KbdRow keys={["Shift", "A"]} desc="Akui semua alert" />
          </div>
        </div>
        <footer className="kbd-foot">
          <span>💡 Tip: shortcut hanya aktif di luar input field</span>
          <button className="link-btn" onClick={onClose}>Tutup (Esc)</button>
        </footer>
      </div>
    </div>
  );
}

function KbdRow({ keys, desc }) {
  return (
    <div className="kbd-row">
      <div className="kbd-keys">{keys.map((k, i) => <kbd key={i}>{k}</kbd>)}</div>
      <div className="kbd-desc">{desc}</div>
    </div>
  );
}

// =================================================================
// 3) MOBILE BOTTOM NAV
// =================================================================
function MobileBottomNav({ route, setRoute, openAI }) {
  const items = [
    { id: "dashboard", icon: "home", label: "Beranda" },
    { id: "map", icon: "map", label: "Peta" },
    { id: "ai", icon: "bot", label: "AI", action: () => openAI() },
    { id: "reports", icon: "file-text", label: "Laporan" },
    { id: "more", icon: "menu", label: "Lainnya" },
  ];
  return (
    <nav className="mobile-bottom-nav" aria-label="Navigasi mobile">
      {items.map(it => (
        <button
          key={it.id}
          className={`mb-nav-item ${route === it.id ? "active" : ""}`}
          onClick={it.action || (() => setRoute(it.id))}
        >
          <Icon name={it.icon} size={20} />
          <span>{it.label}</span>
        </button>
      ))}
    </nav>
  );
}

// =================================================================
// 4) STATE PATTERNS SHOWCASE — §10
// =================================================================
function StatePatterns({ setRoute }) {
  return (
    <div className="state-patterns" data-screen-label="State Patterns Showcase">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <span>State Patterns Library</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-settings"><Icon name="layers" size={24} /></div>
            <div>
              <div className="feat-badge">DESIGN SYSTEM · §10</div>
              <h1>State Patterns</h1>
              <div className="feat-sub">Empty · Loading · Error · Degraded · Success — pola yang digunakan lintas-fitur untuk menangani semua kondisi</div>
            </div>
          </div>
        </div>
      </div>

      <section className="state-section">
        <h3>1. Empty State</h3>
        <p className="state-section-desc">Saat tidak ada data untuk ditampilkan — bukan error, hanya belum ada.</p>
        <div className="state-grid">
          <div className="state-card">
            <div className="state-empty">
              <div className="state-icon"><Icon name="file-text" size={48} strokeWidth={1.2} /></div>
              <div className="state-title">Belum ada skenario</div>
              <div className="state-desc">Buat skenario pertama untuk mulai analisis MCDA dan dukungan keputusan.</div>
              <button className="primary-btn"><Icon name="plus" size={14} />Skenario Baru</button>
            </div>
            <div className="state-meta">Untuk: list/table kosong (no data)</div>
          </div>
          <div className="state-card">
            <div className="state-empty">
              <div className="state-icon"><Icon name="search" size={48} strokeWidth={1.2} /></div>
              <div className="state-title">Tidak ada hasil</div>
              <div className="state-desc">Pencarian "<strong>kalimantan flood 2080</strong>" tidak menemukan hasil. Coba kata kunci lain atau perluas filter.</div>
              <button className="ghost-btn">Bersihkan filter</button>
            </div>
            <div className="state-meta">Untuk: pencarian / filter kosong</div>
          </div>
        </div>
      </section>

      <section className="state-section">
        <h3>2. Loading State</h3>
        <p className="state-section-desc">Saat data sedang di-fetch — pakai skeleton, bukan spinner besar, untuk perceived performance.</p>
        <div className="state-grid">
          <div className="state-card">
            <div className="state-loading">
              <div className="skeleton-line w-50" />
              <div className="skeleton-line w-80" />
              <div className="skeleton-line w-65" />
              <div className="skeleton-block" />
              <div className="skeleton-line w-40" />
            </div>
            <div className="state-meta">Skeleton — text content</div>
          </div>
          <div className="state-card">
            <div className="state-loading">
              <div className="skeleton-card">
                <div className="skeleton-circle" />
                <div style={{ flex: 1 }}>
                  <div className="skeleton-line w-70" />
                  <div className="skeleton-line w-50" style={{ marginTop: 6 }} />
                </div>
              </div>
              <div className="skeleton-card">
                <div className="skeleton-circle" />
                <div style={{ flex: 1 }}>
                  <div className="skeleton-line w-60" />
                  <div className="skeleton-line w-80" style={{ marginTop: 6 }} />
                </div>
              </div>
              <div className="skeleton-card">
                <div className="skeleton-circle" />
                <div style={{ flex: 1 }}>
                  <div className="skeleton-line w-50" />
                  <div className="skeleton-line w-70" style={{ marginTop: 6 }} />
                </div>
              </div>
            </div>
            <div className="state-meta">Skeleton — list / activity feed</div>
          </div>
          <div className="state-card">
            <div className="state-loading center">
              <div className="state-spinner" />
              <div className="state-title">Menjalankan MCDA…</div>
              <div className="state-desc">24 kab × 8 indikator · estimasi 4-7 menit</div>
              <div className="state-progress">
                <div style={{ width: "42%" }} />
              </div>
              <div className="state-progress-label">42% — Normalisasi kriteria…</div>
            </div>
            <div className="state-meta">Long-running task — with progress</div>
          </div>
        </div>
      </section>

      <section className="state-section">
        <h3>3. Error State</h3>
        <p className="state-section-desc">Saat terjadi kegagalan — pesan domain-friendly + tindakan recovery yang jelas.</p>
        <div className="state-grid">
          <div className="state-card">
            <div className="state-error">
              <div className="state-icon error"><Icon name="wifi-off" size={48} strokeWidth={1.2} /></div>
              <div className="state-title">Tidak dapat terhubung</div>
              <div className="state-desc">Koneksi internet putus. Data yang ditampilkan dari cache 23 menit lalu.</div>
              <div className="state-actions">
                <button className="primary-btn">Coba lagi</button>
                <button className="ghost-btn">Gunakan offline</button>
              </div>
            </div>
            <div className="state-meta">Network / Connectivity error</div>
          </div>
          <div className="state-card">
            <div className="state-error">
              <div className="state-icon error"><Icon name="shield" size={48} strokeWidth={1.2} /></div>
              <div className="state-title">Akses ditolak</div>
              <div className="state-desc">Persona Anda <strong>P4 Private Sector</strong> tidak memiliki akses ke FITUR 11.1 Hindcasting Tool.</div>
              <div className="state-actions">
                <button className="ghost-btn">Hubungi admin</button>
                <button className="link-btn">Lihat hak akses</button>
              </div>
            </div>
            <div className="state-meta">Permission denied</div>
          </div>
          <div className="state-card">
            <div className="state-error">
              <div className="state-icon error"><Icon name="x-circle" size={48} strokeWidth={1.2} /></div>
              <div className="state-title">Server bermasalah</div>
              <div className="state-desc">Kami sedang memperbaikinya. <span className="mono muted">err-2026-05-24-1432</span></div>
              <div className="state-actions">
                <button className="primary-btn">Refresh halaman</button>
                <button className="ghost-btn">Lapor masalah</button>
              </div>
            </div>
            <div className="state-meta">Generic server error</div>
          </div>
        </div>
      </section>

      <section className="state-section">
        <h3>4. Partial / Degraded State (FR-GVX-07)</h3>
        <p className="state-section-desc">Saat sebagian sumber data offline — UI tetap fungsional dengan notice ringan.</p>
        <div className="state-grid">
          <div className="state-card">
            <div className="state-degraded">
              <div className="state-degraded-banner">
                <Icon name="alert-triangle" size={14} />
                <span><strong>Layer GeoVertix sedang lambat</strong> · menggunakan cache 23 menit · auto-refresh saat tersedia</span>
                <button className="link-btn">Detail</button>
              </div>
              <div className="state-degraded-body">
                <div className="state-block-row">
                  <div className="state-block ok">
                    <Icon name="check-circle" size={16} />
                    <span><strong>KPI Cards</strong> · 4/4 OK</span>
                  </div>
                  <div className="state-block warn">
                    <Icon name="alert-triangle" size={16} />
                    <span><strong>Risk Map</strong> · cached</span>
                  </div>
                  <div className="state-block ok">
                    <Icon name="check-circle" size={16} />
                    <span><strong>Activity Feed</strong> · live</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="state-meta">Partial degraded — dashboard zona-by-zona</div>
          </div>
          <div className="state-card">
            <div className="state-degraded">
              <div className="state-degraded-banner danger">
                <Icon name="x-circle" size={14} />
                <span><strong>KLHK SIGN-SMART feed offline</strong> · LULC 2024 layer tidak tersedia · ETA recovery 2 jam</span>
              </div>
              <div className="state-degraded-body">
                <div className="state-degraded-detail">
                  <div className="muted">Yang tidak terdampak:</div>
                  <ul>
                    <li>Layer LULC dari cache lokal masih tersedia</li>
                    <li>Layer dari sumber lain (BNPB, BMKG, BPS) berfungsi normal</li>
                    <li>Skenario yang sudah pre-compute tidak terdampak</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="state-meta">External feed down — graceful fallback</div>
          </div>
        </div>
      </section>

      <section className="state-section">
        <h3>5. Success State & Feedback</h3>
        <p className="state-section-desc">Konfirmasi setelah aksi berhasil — toast singkat atau inline confirmation.</p>
        <div className="state-grid">
          <div className="state-card">
            <div className="state-toast success">
              <div className="state-toast-icon"><Icon name="check-circle" size={18} /></div>
              <div className="state-toast-body">
                <strong>Skenario tersimpan</strong>
                <div>"Sulsel Flood Adaptation 2025-2050" masuk pipeline (Draft) · MCDA akan berjalan otomatis</div>
              </div>
              <button className="icon-btn small"><Icon name="x" size={14} /></button>
            </div>
            <div className="state-meta">Toast — Success</div>
          </div>
          <div className="state-card">
            <div className="state-toast info">
              <div className="state-toast-icon"><Icon name="info" size={18} /></div>
              <div className="state-toast-body">
                <strong>3 alert baru sejak terakhir login</strong>
                <div>Lihat ringkasan di Activity Feed</div>
              </div>
              <button className="link-btn">Lihat</button>
            </div>
            <div className="state-meta">Toast — Info</div>
          </div>
          <div className="state-card">
            <div className="state-inline-success">
              <Icon name="check-circle" size={14} />
              <span>Bobot diterima · auto-save 2 detik lalu</span>
            </div>
            <div style={{ height: 60 }} />
            <div className="state-meta">Inline confirmation — auto-save</div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PublicLanding, ShortcutOverlay, MobileBottomNav, StatePatterns });
