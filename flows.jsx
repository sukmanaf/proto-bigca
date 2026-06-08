// ============================================================
// User Flows (Sesi 3) — §8 of spec
// • Onboarding overlay (Flow A)
// • Scenario Builder Wizard (Flow B core, FITUR 5.2)
// • Group Decision Room (Flow F, FITUR 5.7)
// • Report Builder (Flow H, FITUR 8.4)
// • Crisis Dashboard (Flow C, §2.5)
// ============================================================

const Icon = window.Icon;

// =================================================================
// 1) ONBOARDING — 4 steps modal overlay
// =================================================================
function OnboardingOverlay({ onClose, persona }) {
  const [step, setStep] = React.useState(0);
  const steps = [
    {
      title: "Selamat datang di Climate Action Platform",
      subtitle: "Tour singkat 90 detik untuk Persona Anda",
      content: <OnbStep1 persona={persona} />,
    },
    {
      title: "8 zona di Halaman Utama",
      subtitle: "Apa yang akan Anda lihat setiap hari",
      content: <OnbStep2 />,
    },
    {
      title: "AI Assistant selalu siap",
      subtitle: "Tanya apa saja — konteks halaman otomatis dikirim",
      content: <OnbStep3 />,
    },
    {
      title: "Anda siap memulai",
      subtitle: "Pintasan keyboard, Crisis Mode, dan kemana harus ke mana",
      content: <OnbStep4 />,
    },
  ];
  const cur = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="onb-scrim" onClick={onClose}>
      <div className="onb-modal" onClick={e => e.stopPropagation()} role="dialog">
        <button className="onb-close" onClick={onClose}><Icon name="x" size={18} /></button>
        <div className="onb-progress">
          {steps.map((s, i) => (
            <div key={i} className={`onb-progress-step ${i <= step ? "done" : ""} ${i === step ? "current" : ""}`}>
              <span className="onb-progress-num">{i + 1}</span>
            </div>
          ))}
        </div>
        <div className="onb-content">
          <div className="onb-step-label">Langkah {step + 1} dari {steps.length}</div>
          <h2 className="onb-title">{cur.title}</h2>
          <div className="onb-subtitle">{cur.subtitle}</div>
          <div className="onb-body">{cur.content}</div>
        </div>
        <div className="onb-foot">
          <button className="ghost-btn" onClick={onClose}>Lewati tour</button>
          <div className="onb-foot-right">
            {step > 0 && (
              <button className="ghost-btn" onClick={() => setStep(step - 1)}>
                <Icon name="chevron-left" size={14} />Sebelumnya
              </button>
            )}
            <button className="primary-btn" onClick={() => isLast ? onClose() : setStep(step + 1)}>
              {isLast ? "Selesai" : "Berikutnya"}
              {!isLast && <Icon name="chevron-right" size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OnbStep1({ persona }) {
  const p = window.PERSONAS[persona];
  return (
    <div className="onb-step-grid">
      <div className="onb-illust">
        <svg viewBox="0 0 320 200" className="onb-svg">
          <rect width="320" height="200" rx="12" fill="url(#sky)" />
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C5DCE5" />
              <stop offset="1" stopColor="#E1ECF1" />
            </linearGradient>
          </defs>
          <path d="M0,160 C 60,140 120,170 180,150 S 280,150 320,160 L 320,200 L 0,200 Z" fill="#2F7D5E" opacity="0.7" />
          <path d="M0,170 C 60,155 100,180 180,165 S 280,160 320,175 L 320,200 L 0,200 Z" fill="#2F7D5E" opacity="0.9" />
          <circle cx="260" cy="50" r="20" fill="#C18820" />
          <g opacity="0.6"><circle cx="80" cy="60" r="14" fill="white" /><circle cx="100" cy="60" r="18" fill="white" /><circle cx="120" cy="62" r="14" fill="white" /></g>
          <rect x="20" y="120" width="50" height="32" fill="#074866" />
          <rect x="80" y="110" width="40" height="42" fill="#1B6E8A" />
          <rect x="130" y="100" width="50" height="52" fill="#074866" />
          <rect x="190" y="115" width="35" height="37" fill="#0E5A78" />
        </svg>
      </div>
      <div className="onb-text">
        <div className="onb-callout">
          <div className="onb-callout-label">Persona Anda</div>
          <div className="onb-callout-value">{p.code} · {p.role}</div>
          <div className="onb-callout-meta">{p.org} · {p.title}</div>
        </div>
        <p>Platform Climate Action menghimpun <strong>62 fitur</strong> di <strong>10 modul</strong> — dari pemodelan iklim sampai dukungan keputusan multi-stakeholder.</p>
        <p>Tampilan halaman utama, KPI, sidebar, dan aksi cepat <strong>disesuaikan dengan persona Anda</strong>. Anda tidak akan melihat fitur yang tidak relevan.</p>
      </div>
    </div>
  );
}

function OnbStep2() {
  const zones = [
    { n: 1, name: "Header Bar", desc: "Brand · search · AI · notifikasi · profil" },
    { n: 2, name: "Context Bar", desc: "Provinsi · periode · skenario — semua zona ikut" },
    { n: 3, name: "Aksi Cepat", desc: "3-4 aksi tersering untuk persona Anda" },
    { n: 4, name: "KPI Cards", desc: "4 angka utama dengan trend & sparkline" },
    { n: 5, name: "Risk Map", desc: "Peta risiko inline · toggle layer · klik untuk drill-down" },
    { n: 6, name: "Activity Feed", desc: "Event terbaru · mention · alert · komentar" },
    { n: 7, name: "Module Grid", desc: "Pintu ke 10 modul · favorit & update badge" },
    { n: 8, name: "Status Bar", desc: "System health · GeoVertix uptime · jobs aktif" },
  ];
  return (
    <div className="onb-zones-grid">
      {zones.map(z => (
        <div key={z.n} className="onb-zone-card">
          <div className="onb-zone-num">{z.n}</div>
          <div className="onb-zone-body">
            <div className="onb-zone-name">{z.name}</div>
            <div className="onb-zone-desc">{z.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function OnbStep3() {
  return (
    <div className="onb-step-grid">
      <div className="onb-ai-preview">
        <div className="ai-msg role-assistant">
          <div className="ai-msg-avatar"><Icon name="sparkles" size={14} /></div>
          <div className="ai-msg-bubble">
            <div className="ai-msg-text">Halo! Saya AI Assistant. Konteks Anda: <strong>Sulsel · SSP2-4.5 · 2025-2050</strong>. Mau saya buat ringkasan harian?</div>
          </div>
        </div>
        <div className="ai-msg role-user">
          <div className="ai-msg-bubble">
            <div className="ai-msg-text">Kenapa Wajo skor tinggi?</div>
          </div>
        </div>
      </div>
      <div className="onb-text">
        <p><strong>Selalu kirim 4 hal otomatis</strong> ke AI:</p>
        <ul className="onb-list">
          <li><Icon name="map-pin" size={12} /> Provinsi yang dipilih</li>
          <li><Icon name="calendar" size={12} /> Periode</li>
          <li><Icon name="target" size={12} /> Skenario iklim</li>
          <li><Icon name="eye" size={12} /> Halaman yang sedang dibuka</li>
        </ul>
        <p>Buka kapan saja dengan tombol pojok kanan bawah atau pintasan <kbd>⌘I</kbd>.</p>
      </div>
    </div>
  );
}

function OnbStep4() {
  return (
    <div className="onb-step-grid">
      <div className="onb-kbd-grid">
        {[
          { keys: ["⌘", "K"], desc: "Pencarian global (modul, fitur, layer, ...)" },
          { keys: ["⌘", "I"], desc: "Buka / tutup AI Assistant" },
          { keys: ["?"], desc: "Cheatsheet shortcut" },
          { keys: ["M"], desc: "Buka Map Explorer" },
          { keys: ["G", "D"], desc: "Loncat ke Dashboard" },
          { keys: ["Esc"], desc: "Tutup overlay aktif" },
        ].map((s, i) => (
          <div key={i} className="onb-kbd-row">
            <div className="onb-kbd-keys">{s.keys.map((k, j) => <kbd key={j}>{k}</kbd>)}</div>
            <div className="onb-kbd-desc">{s.desc}</div>
          </div>
        ))}
      </div>
      <div className="onb-text">
        <p>Anda bisa <strong>aktifkan Crisis Mode</strong> dari panel Tweaks (kanan bawah). Ini mensimulasikan tampilan saat platform menerima sinyal bencana aktif.</p>
        <p>Lanjut ke:</p>
        <ul className="onb-list">
          <li><Icon name="zap" size={12} /> Lihat aksi cepat di Halaman Utama</li>
          <li><Icon name="compass" size={12} /> Coba buat skenario di SDSS</li>
          <li><Icon name="bot" size={12} /> Tanya AI satu pertanyaan</li>
        </ul>
      </div>
    </div>
  );
}

// =================================================================
// 2) SCENARIO BUILDER WIZARD — 5 steps · FITUR 5.2
// =================================================================
function ScenarioBuilder({ setRoute, ctx, openAI }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    template: null,
    province: ctx.province,
    period: ctx.period,
    climate: ctx.scenario,
    indicators: {
      flood: 25, slr: 15, drought: 10, population: 20, infrastructure: 10, lulc: 5, fiscal: 10, social: 5,
    },
    constraints: {
      excludeProtected: true,
      minInfra: false,
      maxBudget: false,
      onlyKabRiskHigh: false,
    },
    name: "",
    notes: "",
  });

  const steps = [
    { id: "template", label: "Templat", icon: "layers" },
    { id: "area", label: "Area & Periode", icon: "map-pin" },
    { id: "indicators", label: "Indikator (MCDA)", icon: "bar-chart-3" },
    { id: "constraints", label: "Kriteria", icon: "filter" },
    { id: "review", label: "Review & Simpan", icon: "check-circle" },
  ];

  const canProceed = () => {
    if (step === 0) return !!data.template;
    if (step === 4) return data.name.trim().length > 0;
    return true;
  };

  return (
    <div className="wizard" data-screen-label="Scenario Builder Wizard">
      <div className="wizard-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("sdss")} className="link-btn">SDSS</button>
          <Icon name="chevron-right" size={12} />
          <span>Skenario Baru</span>
        </div>
        <div className="wizard-title-row">
          <div>
            <h1>Buat Skenario Baru</h1>
            <div className="wizard-subtitle">FITUR 5.2 · Scenario Manager & Planning Builder · 5 langkah</div>
          </div>
          <div className="wizard-head-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn">Simpan draf</button>
            <button className="ghost-btn" onClick={() => setRoute("sdss")}>Batal</button>
          </div>
        </div>
      </div>

      <div className="wizard-stepper">
        {steps.map((s, i) => (
          <div key={s.id} className={`step-pill ${i === step ? "current" : ""} ${i < step ? "done" : ""}`}>
            <div className="step-pill-num">
              {i < step ? <Icon name="check-circle" size={16} /> : <span>{i + 1}</span>}
            </div>
            <div className="step-pill-body">
              <div className="step-pill-label">Langkah {i + 1}</div>
              <div className="step-pill-name">{s.label}</div>
            </div>
            {i < steps.length - 1 && <div className="step-pill-conn" />}
          </div>
        ))}
      </div>

      <div className="wizard-body">
        {step === 0 && <WzTemplate data={data} setData={setData} />}
        {step === 1 && <WzArea data={data} setData={setData} />}
        {step === 2 && <WzIndicators data={data} setData={setData} />}
        {step === 3 && <WzConstraints data={data} setData={setData} />}
        {step === 4 && <WzReview data={data} setData={setData} />}
      </div>

      <div className="wizard-foot">
        <button className="ghost-btn" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <Icon name="chevron-left" size={14} />Sebelumnya
        </button>
        <div className="wizard-foot-meta">
          {step === 4 ? "Klik 'Simpan & Jalankan MCDA' untuk submit skenario" : `${steps.length - step - 1} langkah lagi`}
        </div>
        {step < 4 ? (
          <button className="primary-btn" disabled={!canProceed()} onClick={() => setStep(step + 1)}>
            Lanjutkan<Icon name="chevron-right" size={14} />
          </button>
        ) : (
          <button className="primary-btn" disabled={!canProceed()} onClick={() => { alert("Skenario disimpan! (mock — di production akan trigger pipeline MCDA)"); setRoute("sdss"); }}>
            <Icon name="play" size={14} />Simpan & Jalankan MCDA
          </button>
        )}
      </div>
    </div>
  );
}

function WzTemplate({ data, setData }) {
  const templates = [
    { id: "rdtr", icon: "map", name: "RDTR Update", desc: "Update rencana detail tata ruang dengan multi-criteria · zonasi, peruntukan, konflik", uses: 142 },
    { id: "adapt", icon: "shield", name: "Climate Adaptation", desc: "Intervensi adaptasi: drainase, pesisir, ketahanan pangan, infrastruktur tahan iklim", uses: 89 },
    { id: "invest", icon: "factory", name: "Sectoral Investment", desc: "Alokasi anggaran sektoral multi-tahun · optimasi NSGA-II", uses: 64 },
    { id: "disaster", icon: "siren", name: "Disaster Response", desc: "Protokol tanggap bencana · evakuasi, dapur umum, jalur logistik", uses: 51 },
    { id: "landuse", icon: "layers", name: "Land Use Change", desc: "Skenario perubahan tata guna lahan · proyeksi LULC 2050", uses: 38 },
    { id: "blank", icon: "plus", name: "Blank Scenario", desc: "Mulai dari nol — pilih indikator dan kriteria sendiri", uses: null },
  ];
  return (
    <div className="wz-pane">
      <div className="wz-pane-head">
        <h2>Pilih templat sebagai titik awal</h2>
        <div className="wz-pane-desc">Setiap templat sudah pre-set indikator, bobot, dan kriteria yang lazim untuk use-case tersebut. Anda tetap bisa mengubah semuanya di langkah berikutnya.</div>
      </div>
      <div className="template-grid">
        {templates.map(t => (
          <button
            key={t.id}
            className={`template-card selectable ${data.template === t.id ? "selected" : ""}`}
            onClick={() => setData({ ...data, template: t.id })}
          >
            <div className="template-icon"><Icon name={t.icon} size={24} /></div>
            <div className="template-name">{t.name}</div>
            <div className="template-desc">{t.desc}</div>
            {t.uses !== null && <div className="template-uses">{t.uses}× digunakan</div>}
            {data.template === t.id && <div className="template-check"><Icon name="check-circle" size={18} /></div>}
          </button>
        ))}
      </div>
    </div>
  );
}

function WzArea({ data, setData }) {
  const provinces = window.PROVINCES.filter(p => p.code !== "all");
  return (
    <div className="wz-pane">
      <div className="wz-pane-head">
        <h2>Tentukan area & periode analisis</h2>
        <div className="wz-pane-desc">Pilih cakupan spasial dan temporal. Skenario iklim global menentukan dataset proyeksi yang dipakai.</div>
      </div>
      <div className="wz-area-layout">
        <div className="wz-area-form">
          <FormRow label="Provinsi" hint="Bisa pilih lebih dari satu">
            <div className="checkbox-grid">
              {provinces.map(p => (
                <label key={p.code} className={`checkbox-chip ${data.province === p.code ? "on" : ""}`}>
                  <input type="checkbox" checked={data.province === p.code} onChange={() => setData({ ...data, province: p.code })} />
                  <span>{p.name}</span>
                  <span className="checkbox-chip-meta">{p.kabs} kab</span>
                </label>
              ))}
            </div>
          </FormRow>
          <FormRow label="Periode" hint="Rentang tahun untuk proyeksi">
            <select className="text-input" value={data.period} onChange={e => setData({ ...data, period: e.target.value })}>
              {window.PERIODS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
          </FormRow>
          <FormRow label="Skenario iklim global" hint="SSP × RCP — kombinasi sosial-emisi">
            <div className="radio-card-grid">
              {window.SCENARIOS.map(s => (
                <label key={s.id} className={`radio-card ${data.climate === s.id ? "on" : ""}`}>
                  <input type="radio" checked={data.climate === s.id} onChange={() => setData({ ...data, climate: s.id })} />
                  <div>
                    <div className="radio-card-name">{s.name}</div>
                    <div className="radio-card-desc">{s.desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </FormRow>
        </div>
        <div className="wz-area-preview">
          <div className="wz-area-preview-label">Preview area</div>
          <div className="wz-area-preview-map">
            <svg viewBox="0 0 200 220" className="wz-mini-map">
              <rect width="200" height="220" fill="#F4F7F5" />
              <path d="M50,30 L160,30 L165,80 L155,160 L120,200 L70,200 L40,160 L45,80 Z"
                fill={data.province ? "var(--primary-500)" : "#B7C4BD"}
                fillOpacity="0.35"
                stroke={data.province ? "var(--primary-700)" : "#9DACA4"}
                strokeWidth="2" />
              <circle cx="105" cy="115" r="3" fill="var(--gray-900)" />
              <text x="112" y="118" fontSize="10" fill="var(--gray-900)">{window.PROVINCES.find(p => p.code === data.province)?.name?.split(" ")[0] || "—"}</text>
            </svg>
          </div>
          <div className="wz-area-summary">
            <div className="wz-summary-row"><span>Area</span><strong>{window.PROVINCES.find(p => p.code === data.province)?.name}</strong></div>
            <div className="wz-summary-row"><span>Kab/Kota</span><strong>{window.PROVINCES.find(p => p.code === data.province)?.kabs}</strong></div>
            <div className="wz-summary-row"><span>Populasi</span><strong>{window.PROVINCES.find(p => p.code === data.province)?.pop}</strong></div>
            <div className="wz-summary-row"><span>Periode</span><strong>{data.period}</strong></div>
            <div className="wz-summary-row"><span>Climate</span><strong>{window.SCENARIOS.find(s => s.id === data.climate)?.name}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WzIndicators({ data, setData }) {
  const total = Object.values(data.indicators).reduce((a, b) => a + b, 0);
  const indicators = [
    { id: "flood", icon: "🌊", name: "Risiko Banjir", desc: "Probabilitas banjir + kedalaman proyeksi", group: "hazard" },
    { id: "slr", icon: "🌊", name: "Sea Level Rise", desc: "Proyeksi kenaikan muka air laut + subsidence", group: "hazard" },
    { id: "drought", icon: "☀️", name: "Kekeringan", desc: "Indeks SPI/SPEI proyeksi", group: "hazard" },
    { id: "population", icon: "👥", name: "Populasi Terdampak", desc: "Densitas + kelompok rentan", group: "exposure" },
    { id: "infrastructure", icon: "🏗", name: "Infrastruktur Kritis", desc: "Density jalan, RS, sekolah, pelabuhan", group: "exposure" },
    { id: "lulc", icon: "🌳", name: "Tutupan Lahan", desc: "Proporsi vegetasi vs built-up", group: "sensitivity" },
    { id: "fiscal", icon: "💰", name: "Fiscal Capacity", desc: "Kapasitas fiskal kab/kota", group: "capacity" },
    { id: "social", icon: "🤝", name: "Modal Sosial", desc: "Tingkat literasi & gotong-royong", group: "capacity" },
  ];
  const groups = {
    hazard: { name: "Hazard (Ancaman)", color: "var(--danger-500)" },
    exposure: { name: "Exposure (Keterpaparan)", color: "var(--warning-500)" },
    sensitivity: { name: "Sensitivity (Sensitivitas)", color: "var(--info-500)" },
    capacity: { name: "Adaptive Capacity (Kapasitas)", color: "var(--success-500)" },
  };

  return (
    <div className="wz-pane">
      <div className="wz-pane-head">
        <h2>Pilih indikator MCDA & atur bobot</h2>
        <div className="wz-pane-desc">Bobot menentukan kontribusi tiap indikator ke skor akhir. Total harus 100%. Anda bisa pakai metode AHP atau direct weighting.</div>
      </div>
      <div className="wz-weights-head">
        <div className="wz-weight-method">
          <span>Metode pembobotan:</span>
          <div className="seg-control">
            <button className="seg-btn active">Direct</button>
            <button className="seg-btn">AHP Pairwise</button>
            <button className="seg-btn">Entropy</button>
          </div>
        </div>
        <div className={`wz-weight-total ${total === 100 ? "ok" : ""}`}>
          Total: <strong>{total}%</strong>
          {total !== 100 && <span className="muted"> (harus 100%)</span>}
          {total === 100 && <Icon name="check-circle" size={14} />}
        </div>
      </div>

      <div className="wz-indicators">
        {Object.entries(groups).map(([g, info]) => (
          <div key={g} className="wz-ind-group">
            <div className="wz-ind-group-head">
              <div className="wz-ind-group-dot" style={{ background: info.color }} />
              <div className="wz-ind-group-name">{info.name}</div>
            </div>
            {indicators.filter(ind => ind.group === g).map(ind => (
              <div key={ind.id} className="wz-ind-row">
                <div className="wz-ind-emoji">{ind.icon}</div>
                <div className="wz-ind-body">
                  <div className="wz-ind-name">{ind.name}</div>
                  <div className="wz-ind-desc">{ind.desc}</div>
                </div>
                <div className="wz-ind-slider">
                  <input
                    type="range" min="0" max="40" value={data.indicators[ind.id]}
                    onChange={e => setData({ ...data, indicators: { ...data.indicators, [ind.id]: parseInt(e.target.value) } })}
                    className="weight-range"
                    style={{ "--track-color": info.color }}
                  />
                </div>
                <div className="wz-ind-value">{data.indicators[ind.id]}%</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function WzConstraints({ data, setData }) {
  const items = [
    { id: "excludeProtected", name: "Exclude Kawasan Lindung", desc: "Kawasan konservasi & hutan lindung tidak masuk pertimbangan intervensi", icon: "shield" },
    { id: "minInfra", name: "Min. Akses Infrastruktur", desc: "Hanya pertimbangkan area dengan akses jalan & listrik existing", icon: "factory" },
    { id: "maxBudget", name: "Constraint Anggaran", desc: "Total intervensi ≤ Rp 50 milyar (5 tahun)", icon: "bar-chart-3" },
    { id: "onlyKabRiskHigh", name: "Hanya Kab Risiko Tinggi", desc: "Filter ke kab/kota dengan vulnerability score > 0.65", icon: "alert-triangle" },
  ];

  return (
    <div className="wz-pane">
      <div className="wz-pane-head">
        <h2>Tentukan kriteria & batasan</h2>
        <div className="wz-pane-desc">Constraint mempersempit ruang solusi sebelum optimasi. Anda bisa tambah custom constraint setelah skenario tersimpan.</div>
      </div>

      <div className="wz-constraints">
        {items.map(it => (
          <div key={it.id} className={`wz-constraint-card ${data.constraints[it.id] ? "on" : ""}`}>
            <div className="wz-constraint-icon"><Icon name={it.icon} size={20} /></div>
            <div className="wz-constraint-body">
              <div className="wz-constraint-name">{it.name}</div>
              <div className="wz-constraint-desc">{it.desc}</div>
            </div>
            <Toggle defaultOn={data.constraints[it.id]} onChange={v => setData({ ...data, constraints: { ...data.constraints, [it.id]: v } })} />
          </div>
        ))}
      </div>

      <div className="wz-add-custom">
        <button className="ghost-btn"><Icon name="plus" size={14} />Tambah constraint kustom (SQL / Python expression)</button>
      </div>

      <div className="wz-impact-preview">
        <div className="wz-impact-head">
          <Icon name="sparkles" size={14} />
          <strong>Dampak constraint pada ruang solusi:</strong>
        </div>
        <div className="wz-impact-bar">
          <div className="wz-impact-segment ok" style={{ width: "42%" }} />
          <div className="wz-impact-segment excluded" style={{ width: "58%" }} />
        </div>
        <div className="wz-impact-legend">
          <span><span className="dot ok" />Kandidat tersisa: <strong>42%</strong> (10 dari 24 kab)</span>
          <span><span className="dot excluded" />Dikecualikan: <strong>58%</strong></span>
        </div>
      </div>
    </div>
  );
}

function Toggle({ defaultOn, onChange }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <button className={`toggle ${on ? "on" : ""}`} onClick={() => { const n = !on; setOn(n); onChange && onChange(n); }}>
      <span className="toggle-knob" />
    </button>
  );
}

function WzReview({ data, setData }) {
  const prov = window.PROVINCES.find(p => p.code === data.province);
  const scn = window.SCENARIOS.find(s => s.id === data.climate);
  const tmpl = ["rdtr","adapt","invest","disaster","landuse","blank"].includes(data.template) ? data.template : "—";
  const tmplName = { rdtr: "RDTR Update", adapt: "Climate Adaptation", invest: "Sectoral Investment", disaster: "Disaster Response", landuse: "Land Use Change", blank: "Blank Scenario" }[tmpl] || "—";

  return (
    <div className="wz-pane">
      <div className="wz-pane-head">
        <h2>Review & beri nama skenario</h2>
        <div className="wz-pane-desc">Pastikan konfigurasi sudah sesuai, lalu beri nama. Setelah disimpan, skenario masuk pipeline (Draft → Konsultasi → Berjalan → Disetujui).</div>
      </div>

      <div className="wz-review-form">
        <FormRow label="Nama skenario" hint="Contoh: Sulsel Flood Adaptation 2025-2050">
          <input
            type="text" className="text-input"
            placeholder="Beri nama yang jelas..."
            value={data.name}
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </FormRow>
        <FormRow label="Catatan (opsional)" hint="Konteks atau tujuan skenario">
          <textarea className="text-input" rows="2" style={{ height: "auto", padding: "8px 12px" }}
            placeholder="Misal: Untuk persiapan RDTR 2030 Kota Makassar..."
            value={data.notes}
            onChange={e => setData({ ...data, notes: e.target.value })} />
        </FormRow>
      </div>

      <div className="wz-review-summary">
        <div className="wz-review-card">
          <div className="wz-review-label">Templat</div>
          <div className="wz-review-value">{tmplName}</div>
        </div>
        <div className="wz-review-card">
          <div className="wz-review-label">Area</div>
          <div className="wz-review-value">{prov?.name}</div>
          <div className="wz-review-meta">{prov?.kabs} kab · {prov?.pop}</div>
        </div>
        <div className="wz-review-card">
          <div className="wz-review-label">Periode</div>
          <div className="wz-review-value">{data.period}</div>
        </div>
        <div className="wz-review-card">
          <div className="wz-review-label">Climate</div>
          <div className="wz-review-value">{scn?.name}</div>
          <div className="wz-review-meta">{scn?.desc}</div>
        </div>
      </div>

      <div className="wz-review-section">
        <div className="wz-review-section-label">Indikator & bobot (top 3)</div>
        {Object.entries(data.indicators).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => (
          <div key={k} className="wz-review-ind">
            <span>{k}</span>
            <div className="mini-bar"><div style={{ width: `${(v/40)*100}%` }} /></div>
            <strong>{v}%</strong>
          </div>
        ))}
      </div>

      <div className="wz-review-section">
        <div className="wz-review-section-label">Constraint aktif</div>
        <div className="wz-review-chips">
          {Object.entries(data.constraints).filter(([k, v]) => v).map(([k]) => (
            <span key={k} className="wz-chip-on"><Icon name="check-circle" size={12} />{k}</span>
          ))}
          {!Object.values(data.constraints).some(v => v) && <span className="muted">Tidak ada constraint aktif</span>}
        </div>
      </div>

      <div className="wz-review-est">
        <Icon name="clock" size={14} />
        <span>Estimasi waktu komputasi: <strong>~4-7 menit</strong> · 24 kab × 8 indikator × MCDA + sensitivity</span>
      </div>
    </div>
  );
}

function FormRow({ label, hint, children }) {
  return (
    <div className="form-row">
      <div className="form-label">
        <div className="form-label-main">{label}</div>
        {hint && <div className="form-hint">{hint}</div>}
      </div>
      <div className="form-control">{children}</div>
    </div>
  );
}

// =================================================================
// 3) GROUP DECISION ROOM — Live session · FITUR 5.7
// =================================================================
function GroupDecisionRoom({ setRoute, sessionId, ctx, openAI }) {
  const [chatInput, setChatInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { who: "Hadi R.", role: "Sekda Pinrang", color: "#8B5F0E", text: "Selamat sore semua. Kita mulai sesi sign-off RDTR Pinrang. Sudah ada dua skenario yang akan kita bandingkan.", when: "13:02" },
    { who: "Budi P.", role: "Bappeda Sulsel", color: "#0E5A78", text: "Saya akan share screen MCDA result untuk dua opsi.", when: "13:03" },
    { who: "Rina S.", role: "BRIN", color: "#6A4C93", text: "Pak Budi, mohon include juga sensitivity terhadap SLR — coastal area Pinrang cukup vulnerable.", when: "13:05" },
    { who: "AI Assistant", role: "system", color: "#6A4C93", text: "Sensitivity analysis sudah tersedia. Untuk Opsi A (konservasi mangrove), MCDA score: 81, std: 4.2. Untuk Opsi B (relokasi), MCDA score: 68, std: 8.1 — robustness lebih rendah.", when: "13:06", system: true },
    { who: "Citra D.", role: "Bappeda Makassar", color: "#2A9D8F", text: "Setuju dengan Opsi A. Konservasi mangrove juga align dengan target RPJMN sektor lingkungan.", when: "13:08" },
  ]);
  const [votes, setVotes] = React.useState({ A: 8, B: 3, abstain: 3 });
  const [myVote, setMyVote] = React.useState(null);
  const chatRef = React.useRef(null);

  React.useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { who: "Budi P. (Anda)", role: "Bappeda Sulsel", color: "#0E5A78", text: chatInput, when: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) }]);
    setChatInput("");
  };

  const castVote = (v) => {
    if (myVote === v) return;
    const next = { ...votes };
    if (myVote) next[myVote] -= 1;
    next[v] += 1;
    setVotes(next);
    setMyVote(v);
  };

  const participants = [
    { name: "Hadi R.", role: "Sekda Pinrang", initials: "HR", color: "#8B5F0E", role_in_session: "Host" },
    { name: "Budi P. (Anda)", role: "Bappeda Sulsel", initials: "BP", color: "#0E5A78", role_in_session: "Presenter" },
    { name: "Citra D.", role: "Bappeda Makassar", initials: "CD", color: "#2A9D8F" },
    { name: "Rina S.", role: "BRIN", initials: "RS", color: "#6A4C93" },
    { name: "Sri W.", role: "Bappeda Pinrang", initials: "SW", color: "#2F7D5E" },
    { name: "Ahmad K.", role: "Bappenas", initials: "AK", color: "#074866" },
    { name: "Dr. Tono", role: "KLHK", initials: "DT", color: "#0F766E" },
    { name: "Indra", role: "BNPB", initials: "ID", color: "#8B1A1A" },
  ];
  const total = votes.A + votes.B + votes.abstain;

  return (
    <div className="group-room" data-screen-label="Group Decision Room">
      <header className="group-room-head">
        <button className="back-btn" onClick={() => setRoute("collab")}>
          <Icon name="chevron-left" size={16} />Kolaborasi
        </button>
        <div className="breadcrumb-sep">/</div>
        <div className="group-room-title">
          <span className="live-pill"><span className="live-dot" />LIVE</span>
          <h2>RDTR Pinrang — Sign-off Session</h2>
          <span className="muted">cons-042 · sinkron · {participants.length} peserta</span>
        </div>
        <div className="group-room-actions">
          <button className="ghost-btn"><Icon name="users" size={14} />Undang</button>
          <button className="ghost-btn"><Icon name="share" size={14} />Bagikan link</button>
          <button className="ghost-btn"><Icon name="file-text" size={14} />Catatan</button>
          <button className="primary-btn"><Icon name="x" size={14} />Akhiri sesi</button>
        </div>
      </header>

      <div className="group-room-body">
        {/* Left: scenario comparison map */}
        <div className="group-room-left">
          <div className="compare-head">
            <div className="compare-tabs">
              <button className="compare-tab active">Opsi A · Konservasi Mangrove</button>
              <button className="compare-tab">Opsi B · Relokasi Pesisir</button>
              <button className="compare-tab side-by-side"><Icon name="git-pull-request" size={14} />Bandingkan</button>
            </div>
            <div className="compare-meta">
              <span>MCDA Score: <strong style={{ color: "var(--success-700)" }}>81</strong></span>
              <span>·</span>
              <span>Sensitivity σ: <strong>4.2</strong></span>
              <span>·</span>
              <span>Cost: <strong>Rp 42M</strong></span>
            </div>
          </div>
          <div className="compare-map">
            <window.MapSurface layers={{ banjir: true, slr: true, karhutla: false }} crisis={false} onHover={() => {}} />
            <div className="compare-annotation">
              <Icon name="map-pin" size={14} />
              <strong>Zona Mangrove (Opsi A)</strong>
              <span className="muted">3 lokasi · 124 ha</span>
            </div>
          </div>
          <div className="compare-foot">
            <div className="compare-summary-table">
              <div className="compare-row header">
                <div>Kriteria</div>
                <div>Opsi A</div>
                <div>Opsi B</div>
                <div>Pemenang</div>
              </div>
              {[
                { c: "MCDA Score", a: "81", b: "68", w: "A" },
                { c: "Robustness (σ)", a: "4.2", b: "8.1", w: "A" },
                { c: "Cost (Rp M)", a: "42", b: "187", w: "A" },
                { c: "Time to deploy", a: "18 bln", b: "60 bln", w: "A" },
                { c: "Co-benefit biodiversity", a: "Tinggi", b: "Rendah", w: "A" },
                { c: "Risiko sosial", a: "Sedang", b: "Tinggi", w: "A" },
              ].map((r, i) => (
                <div key={i} className="compare-row">
                  <div>{r.c}</div>
                  <div className={r.w === "A" ? "win" : ""}>{r.a}</div>
                  <div className={r.w === "B" ? "win" : ""}>{r.b}</div>
                  <div><span className={`win-badge win-${r.w}`}>Opsi {r.w}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: participants + chat + vote */}
        <div className="group-room-right">
          <div className="participants-panel">
            <div className="panel-head">
              <span>Peserta · {participants.length} online</span>
              <button className="link-btn">+ Undang</button>
            </div>
            <div className="participants-row">
              {participants.map(p => (
                <div key={p.name} className="participant" title={`${p.name} (${p.role})`}>
                  <div className="participant-avatar" style={{ background: p.color }}>
                    {p.initials}
                    <span className="participant-status online" />
                  </div>
                  {p.role_in_session && <span className="participant-tag">{p.role_in_session}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="chat-panel">
            <div className="panel-head">
              <span><Icon name="message-square" size={14} />Diskusi sesi</span>
              <span className="muted">{messages.length} pesan</span>
            </div>
            <div className="chat-list" ref={chatRef}>
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.system ? "system" : ""}`}>
                  <div className="chat-avatar" style={{ background: m.color }}>{m.who.split(" ").map(x => x[0]).slice(0, 2).join("")}</div>
                  <div className="chat-body">
                    <div className="chat-head">
                      <strong>{m.who}</strong>
                      <span className="muted">{m.role}</span>
                      <span className="muted">·</span>
                      <span className="muted">{m.when}</span>
                    </div>
                    <div className="chat-text">{m.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="chat-form" onSubmit={send}>
              <input type="text" placeholder="Ketik pesan ke seluruh peserta..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
              <button type="submit" className="ai-send"><Icon name="send" size={14} /></button>
            </form>
          </div>

          <div className="vote-panel">
            <div className="panel-head">
              <span><Icon name="check-circle" size={14} />Voting · Pilih opsi RDTR</span>
              <span className="muted">{total} dari {participants.length} memilih</span>
            </div>
            <div className="vote-options">
              {[
                { id: "A", name: "Opsi A · Konservasi Mangrove", color: "var(--success-500)" },
                { id: "B", name: "Opsi B · Relokasi Pesisir", color: "var(--warning-500)" },
                { id: "abstain", name: "Abstain", color: "var(--gray-400)" },
              ].map(o => {
                const pct = total ? (votes[o.id] / total) * 100 : 0;
                return (
                  <button key={o.id} className={`vote-row ${myVote === o.id ? "voted" : ""}`} onClick={() => castVote(o.id)}>
                    <div className="vote-row-head">
                      <div className="vote-circle" style={{ borderColor: o.color, background: myVote === o.id ? o.color : "transparent" }}>
                        {myVote === o.id && <Icon name="check-circle" size={14} className="vote-check" />}
                      </div>
                      <div className="vote-name">{o.name}</div>
                      <div className="vote-count"><strong>{votes[o.id]}</strong></div>
                    </div>
                    <div className="vote-bar"><div style={{ width: `${pct}%`, background: o.color }} /></div>
                  </button>
                );
              })}
            </div>
            <div className="vote-foot">
              <Icon name="info" size={12} />
              <span>Sign-off butuh ≥ 75% suara (saat ini {total ? Math.round((votes.A / total) * 100) : 0}% untuk Opsi A) · voting tetap terbuka sampai sesi diakhiri Host</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =================================================================
// 4) REPORT BUILDER — Drag-drop · FITUR 8.4
// =================================================================
function ReportBuilder({ setRoute, ctx, openAI }) {
  const [meta, setMeta] = React.useState({
    title: "Q2 2026 Climate Risk Sulsel — Executive Summary",
    persona: "P1 Government Decision Maker",
    period: "Q2 2026",
    format: "PDF + PPT",
  });
  const [sections, setSections] = React.useState([
    { id: "s1", type: "cover", title: "Cover · BIG Climate Action", desc: "Cover page · logo + title + author + date" },
    { id: "s2", type: "summary", title: "Ringkasan Eksekutif (AI-generated)", desc: "Otomatis dari konteks: Sulsel · SSP2-4.5 · Q2 2026" },
    { id: "s3", type: "kpi", title: "4 KPI utama", desc: "Provinsi Aktif · Risk Alerts · Model Running · Scenarios" },
    { id: "s4", type: "map", title: "Peta Risiko Sulsel", desc: "Layer banjir + SLR · annotation 12 kab risiko tinggi" },
    { id: "s5", type: "chart", title: "Trend Risk Index 2025-2050", desc: "Line chart · ensemble band ± 0.4" },
    { id: "s6", type: "table", title: "Top 5 kab/kota risk", desc: "Table dengan score MCDA + populasi terdampak" },
    { id: "s7", type: "recommend", title: "Rekomendasi Aksi", desc: "AI-curated · prioritas 1-2-3 tahun" },
  ]);
  const [selected, setSelected] = React.useState("s2");

  const palette = [
    { type: "cover", icon: "file-text", label: "Cover", desc: "Halaman judul branded" },
    { type: "summary", icon: "sparkles", label: "Ringkasan AI", desc: "Auto-gen dari konteks (FITUR 8.3)" },
    { type: "kpi", icon: "bar-chart-3", label: "KPI Block", desc: "4 angka utama" },
    { type: "map", icon: "map", label: "Peta", desc: "Snapshot map dengan layer aktif" },
    { type: "chart", icon: "trending-up", label: "Chart", desc: "Line / bar / area" },
    { type: "table", icon: "database", label: "Tabel data", desc: "Tabel ranked dengan score" },
    { type: "text", icon: "edit", label: "Teks bebas", desc: "Narasi atau kontekstual" },
    { type: "recommend", icon: "check-circle", label: "Rekomendasi", desc: "Aksi prioritas AI" },
    { type: "scenario", icon: "target", label: "Compare Skenario", desc: "Side-by-side dari FITUR 7.3" },
    { type: "appendix", icon: "book-open", label: "Lampiran", desc: "Data lineage + metodologi" },
  ];

  const addSection = (type) => {
    const tmpl = palette.find(p => p.type === type);
    const newSec = { id: `s${Date.now()}`, type, title: tmpl.label, desc: tmpl.desc };
    setSections([...sections, newSec]);
    setSelected(newSec.id);
  };

  const removeSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    if (selected === id) setSelected(sections[0]?.id);
  };

  const move = (idx, dir) => {
    const next = [...sections];
    const target = idx + dir;
    if (target < 0 || target >= next.length) return;
    [next[idx], next[target]] = [next[target], next[idx]];
    setSections(next);
  };

  const sel = sections.find(s => s.id === selected);

  return (
    <div className="report-builder" data-screen-label="Report Builder">
      <div className="rb-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">Beranda</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("reports")} className="link-btn">Reports</button>
          <Icon name="chevron-right" size={12} />
          <span>Custom Report Builder</span>
        </div>
        <div className="rb-title-row">
          <div>
            <h1>Custom Report Builder</h1>
            <div className="wizard-subtitle">FITUR 8.4 · Drag-drop section, preview live, export PDF/PPT/DOCX</div>
          </div>
          <div className="rb-head-actions">
            <button className="ghost-btn"><Icon name="eye" size={14} />Preview full</button>
            <button className="ghost-btn"><Icon name="share" size={14} />Bagikan draf</button>
            <button className="primary-btn"><Icon name="download" size={14} />Generate {meta.format}</button>
          </div>
        </div>
        <div className="rb-meta-row">
          <div className="rb-meta-item">
            <label>Judul laporan</label>
            <input type="text" value={meta.title} onChange={e => setMeta({ ...meta, title: e.target.value })} className="text-input" />
          </div>
          <div className="rb-meta-item">
            <label>Audience persona</label>
            <select className="text-input" value={meta.persona} onChange={e => setMeta({ ...meta, persona: e.target.value })}>
              {Object.values(window.PERSONAS).map(p => <option key={p.code}>{p.code} {p.role}</option>)}
            </select>
          </div>
          <div className="rb-meta-item">
            <label>Periode</label>
            <input type="text" value={meta.period} onChange={e => setMeta({ ...meta, period: e.target.value })} className="text-input" />
          </div>
          <div className="rb-meta-item">
            <label>Format</label>
            <select className="text-input" value={meta.format} onChange={e => setMeta({ ...meta, format: e.target.value })}>
              <option>PDF</option>
              <option>PPT</option>
              <option>PDF + PPT</option>
              <option>DOCX</option>
              <option>Interactive HTML</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rb-body">
        {/* Palette */}
        <aside className="rb-palette">
          <div className="rb-palette-head">Section Library</div>
          <div className="rb-palette-list">
            {palette.map(p => (
              <button key={p.type} className="rb-palette-item" onClick={() => addSection(p.type)}>
                <div className="rb-palette-icon"><Icon name={p.icon} size={16} /></div>
                <div className="rb-palette-body">
                  <div className="rb-palette-name">{p.label}</div>
                  <div className="rb-palette-desc">{p.desc}</div>
                </div>
                <Icon name="plus" size={14} className="rb-palette-add" />
              </button>
            ))}
          </div>
        </aside>

        {/* Canvas */}
        <div className="rb-canvas">
          <div className="rb-canvas-head">
            <div>Struktur laporan</div>
            <span className="muted">{sections.length} section · estimasi {Math.ceil(sections.length * 1.5)} halaman</span>
          </div>
          <div className="rb-sections">
            {sections.map((s, i) => (
              <div
                key={s.id}
                className={`rb-section ${selected === s.id ? "selected" : ""}`}
                onClick={() => setSelected(s.id)}
              >
                <div className="rb-section-handle"><Icon name="more-vertical" size={14} /></div>
                <div className="rb-section-num">{i + 1}</div>
                <div className="rb-section-body">
                  <div className="rb-section-title">{s.title}</div>
                  <div className="rb-section-desc">{s.desc}</div>
                </div>
                <div className="rb-section-actions">
                  <button onClick={(e) => { e.stopPropagation(); move(i, -1); }} disabled={i === 0}><Icon name="chevron-up" size={14} /></button>
                  <button onClick={(e) => { e.stopPropagation(); move(i, 1); }} disabled={i === sections.length - 1}><Icon name="chevron-down" size={14} /></button>
                  <button onClick={(e) => { e.stopPropagation(); removeSection(s.id); }}><Icon name="x" size={14} /></button>
                </div>
              </div>
            ))}
            <button className="rb-add-section" onClick={() => addSection("text")}>
              <Icon name="plus" size={16} />Klik di sini atau drag dari Section Library
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="rb-preview">
          <div className="rb-preview-head">
            <span>Preview · {sel?.title}</span>
            <button className="ghost-btn small"><Icon name="maximize" size={12} /></button>
          </div>
          <div className="rb-preview-canvas">
            <SectionPreview section={sel} ctx={ctx} />
          </div>
          {sel && <SectionConfig section={sel} />}
        </div>
      </div>
    </div>
  );
}

function SectionPreview({ section, ctx }) {
  if (!section) return <div className="rb-empty">Pilih section untuk preview</div>;
  const province = window.PROVINCES.find(p => p.code === ctx.province) || window.PROVINCES[0];

  if (section.type === "cover") return (
    <div className="rb-cover">
      <div className="rb-cover-bg">
        <svg viewBox="0 0 300 180" className="rb-cover-svg">
          <rect width="300" height="180" fill="#074866" />
          <circle cx="240" cy="40" r="28" fill="white" opacity="0.2" />
          <text x="20" y="40" fontSize="10" fill="white" opacity="0.7">BIG · Climate Action Platform</text>
          <text x="20" y="92" fontSize="18" fill="white" fontWeight="700">Q2 2026</text>
          <text x="20" y="112" fontSize="13" fill="white">Climate Risk Sulsel</text>
          <text x="20" y="128" fontSize="9" fill="white" opacity="0.7">Executive Summary</text>
          <line x1="20" y1="160" x2="280" y2="160" stroke="white" opacity="0.4" strokeWidth="0.5" />
          <text x="20" y="172" fontSize="8" fill="white" opacity="0.7">Disusun oleh: Bappeda Sulsel · 27 Mei 2026</text>
        </svg>
      </div>
    </div>
  );
  if (section.type === "summary") return (
    <div className="rb-text-block">
      <div className="rb-section-pill">AI-generated · FITUR 8.3</div>
      <h4>Ringkasan Eksekutif</h4>
      <p>Provinsi <strong>{province.name}</strong> menunjukkan peningkatan Risk Index dari 60.6 menjadi <strong>62.4</strong> (+1.8) di Q2 2026 vs Q1. Penggerak utama: <em>intensifikasi presipitasi musim hujan</em> (+18% proyeksi SSP2-4.5) dan kombinasi <em>kapasitas adaptif rendah</em> di 12 kab pesisir.</p>
      <p>Tiga kab/kota dengan eskalasi terbesar: <strong>Wajo (banjir, +6.2)</strong>, <strong>Soppeng (kekeringan, +4.8)</strong>, <strong>Bone (multi-hazard, +3.9)</strong>. Tiga rekomendasi prioritas tersedia di section 7.</p>
    </div>
  );
  if (section.type === "kpi") return (
    <div className="rb-kpi-block">
      {window.KPIS_BY_PERSONA.P1.map((k, i) => (
        <div key={i} className="rb-kpi-mini">
          <div className="rb-kpi-label">{k.label}</div>
          <div className="rb-kpi-val">{k.value}</div>
        </div>
      ))}
    </div>
  );
  if (section.type === "map") return (
    <div className="rb-map-block">
      <window.MapSurface layers={{ banjir: true, slr: true }} crisis={false} onHover={() => {}} />
    </div>
  );
  if (section.type === "chart") return (
    <div className="rb-chart-block">
      <svg viewBox="0 0 300 140" className="rb-chart-svg">
        <line x1="30" y1="120" x2="290" y2="120" stroke="var(--gray-300)" />
        <line x1="30" y1="20" x2="30" y2="120" stroke="var(--gray-300)" />
        <path d="M30,90 Q 80,80 130,75 T 290,40" fill="none" stroke="var(--primary-600)" strokeWidth="2" />
        <path d="M30,100 L 290,95 L 290,30 L 30,50 Z" fill="var(--primary-200)" opacity="0.4" />
        {["2025","2030","2035","2040","2045","2050"].map((y, i) => (
          <text key={y} x={30 + i*52} y="135" fontSize="9" fill="var(--gray-500)" textAnchor="middle">{y}</text>
        ))}
        <text x="20" y="25" fontSize="9" fill="var(--gray-500)">80</text>
        <text x="20" y="125" fontSize="9" fill="var(--gray-500)">40</text>
      </svg>
      <div className="rb-chart-legend">Risk Index proyeksi 2025-2050 · ensemble band ± 0.4</div>
    </div>
  );
  if (section.type === "table") return (
    <div className="rb-table-block">
      <table>
        <thead><tr><th>Kab</th><th>Score</th><th>Pop. terdampak</th></tr></thead>
        <tbody>
          {[["Wajo","84","142K"],["Bone","79","98K"],["Soppeng","76","54K"],["Selayar","73","31K"],["Bulukumba","71","87K"]].map(r => (
            <tr key={r[0]}><td>{r[0]}</td><td><strong>{r[1]}</strong></td><td>{r[2]}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  if (section.type === "recommend") return (
    <div className="rb-rec-block">
      <div className="rb-section-pill">AI-curated · sorted by impact/cost</div>
      <ol>
        <li><strong>Pilot adaptasi Wajo (Rp 8.4M, 2027)</strong> — retrofit drainase 5 ruas Sengkang + restriksi RDTR zona pertanian flood-prone</li>
        <li><strong>Konservasi mangrove pesisir (Rp 42M, 2027-2029)</strong> — 3 lokasi Pinrang · co-benefit biodiversity</li>
        <li><strong>EWS terintegrasi Sulsel-wide</strong> — leverage InaRISK + platform native · Rp 3.2M setup</li>
      </ol>
    </div>
  );
  return (
    <div className="rb-text-block">
      <p className="muted">Section "<strong>{section.title}</strong>" — preview belum diatur. Klik <em>Config</em> di bawah untuk customize.</p>
    </div>
  );
}

function SectionConfig({ section }) {
  if (!section) return null;
  return (
    <div className="rb-config">
      <div className="rb-config-head">Config: {section.title}</div>
      <div className="rb-config-rows">
        <label><input type="checkbox" defaultChecked /> Tampilkan judul section</label>
        <label><input type="checkbox" defaultChecked /> Sertakan attribution & sumber data</label>
        <label><input type="checkbox" /> Halaman baru (page break)</label>
        {(section.type === "map" || section.type === "chart") && (
          <label><input type="checkbox" defaultChecked /> Interaktif di HTML, statis di PDF</label>
        )}
      </div>
    </div>
  );
}

// =================================================================
// 5) CRISIS DASHBOARD — when crisis mode is on
// =================================================================
function CrisisDashboard({ setRoute, openAI }) {
  const e = window.CRISIS_EVENT;
  return (
    <div className="crisis-dash" data-screen-label="Crisis Mode Dashboard">
      <div className="crisis-hero">
        <div className="crisis-hero-left">
          <div className="crisis-tag"><Icon name="siren" size={14} />MODE KRISIS AKTIF</div>
          <h1>{e.type}</h1>
          <div className="crisis-area">{e.area}</div>
          <div className="crisis-stats">
            <div className="crisis-stat">
              <div className="crisis-stat-label">Tingkat</div>
              <div className="crisis-stat-value">{e.level}</div>
            </div>
            <div className="crisis-stat">
              <div className="crisis-stat-label">Terdampak</div>
              <div className="crisis-stat-value">{e.affected}</div>
            </div>
            <div className="crisis-stat">
              <div className="crisis-stat-label">Dimulai</div>
              <div className="crisis-stat-value sm">{e.started}</div>
            </div>
            <div className="crisis-stat">
              <div className="crisis-stat-label">Confidence</div>
              <div className="crisis-stat-value">92%</div>
            </div>
          </div>
          <div className="crisis-actions">
            <button className="primary-btn danger"><Icon name="map" size={14} />Buka Crisis Map</button>
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />Tanya AI</button>
            <button className="ghost-btn"><Icon name="file-text" size={14} />Buat Brief Cepat</button>
            <button className="ghost-btn"><Icon name="send" size={14} />Kirim Alert</button>
          </div>
        </div>
        <div className="crisis-hero-right">
          <div className="crisis-mini-map">
            <window.MapSurface layers={{ banjir: true }} crisis={true} onHover={() => {}} />
          </div>
        </div>
      </div>

      <div className="crisis-grid">
        <div className="crisis-card">
          <div className="crisis-card-head">
            <Icon name="users" size={14} />Posko & Tim Lapangan
          </div>
          <div className="crisis-card-body">
            <div className="crisis-mini-row">
              <span className="status-dot online" />
              <span><strong>BPBD Wajo</strong> — 8 personel di lapangan</span>
            </div>
            <div className="crisis-mini-row">
              <span className="status-dot online" />
              <span><strong>BNPB Pusat</strong> — koordinasi aktif</span>
            </div>
            <div className="crisis-mini-row">
              <span className="status-dot online" />
              <span><strong>TNI Kodim Wajo</strong> — standby 24 personel</span>
            </div>
            <div className="crisis-mini-row">
              <span className="status-dot" style={{ background: "#C18820" }} />
              <span><strong>Tim PUPR</strong> — mobilisasi alat berat (ETA 2j)</span>
            </div>
          </div>
        </div>

        <div className="crisis-card">
          <div className="crisis-card-head">
            <Icon name="activity" size={14} />Timeline 24 jam
          </div>
          <div className="crisis-card-body">
            {[
              { time: "13:42", what: "Pemberitahuan ke kepala daerah & pers", who: "Otomatis" },
              { time: "12:18", what: "Tim BPBD turun ke 3 kecamatan terdampak", who: "BPBD Wajo" },
              { time: "08:30", what: "Aktivasi Crisis Mode platform", who: "Sistem EWS" },
              { time: "04:12", what: "Anomali debit Sungai Cenranae terdeteksi", who: "FITUR 6.2" },
            ].map((t, i) => (
              <div key={i} className="crisis-timeline-row">
                <div className="crisis-time">{t.time}</div>
                <div className="crisis-timeline-dot" />
                <div>
                  <div>{t.what}</div>
                  <div className="muted">{t.who}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="crisis-card">
          <div className="crisis-card-head">
            <Icon name="trending-up" size={14} />Proyeksi 48 jam
          </div>
          <div className="crisis-card-body">
            <svg viewBox="0 0 300 120" className="crisis-proj">
              <rect width="300" height="120" fill="white" />
              <line x1="30" y1="90" x2="290" y2="90" stroke="var(--gray-300)" />
              <line x1="30" y1="20" x2="30" y2="90" stroke="var(--gray-300)" />
              <path d="M30,80 Q 80,55 130,40 T 290,15" fill="none" stroke="var(--danger-600)" strokeWidth="2.5" />
              <path d="M30,85 L 290,40 L 290,5 L 30,55 Z" fill="var(--danger-200)" opacity="0.5" />
              <line x1="100" y1="20" x2="100" y2="90" stroke="var(--warning-500)" strokeDasharray="3,3" strokeWidth="1" />
              <text x="100" y="15" fontSize="9" fill="var(--warning-700)" textAnchor="middle">Sekarang</text>
              <line x1="200" y1="20" x2="200" y2="90" stroke="var(--danger-500)" strokeDasharray="3,3" strokeWidth="1" />
              <text x="200" y="15" fontSize="9" fill="var(--danger-700)" textAnchor="middle">Puncak T+18j</text>
              {["T-12","T-6","T","T+6","T+12","T+18","T+24"].map((l, i) => (
                <text key={l} x={30 + i*43} y="105" fontSize="8" fill="var(--gray-500)" textAnchor="middle">{l}</text>
              ))}
            </svg>
            <div className="crisis-proj-meta">Kedalaman air proyeksi · puncak <strong>1.8m</strong> di T+18 jam (BMKG ensemble)</div>
          </div>
        </div>

        <div className="crisis-card">
          <div className="crisis-card-head">
            <Icon name="message-square" size={14} />Update terbaru
          </div>
          <div className="crisis-card-body">
            {[
              { time: "13:48", who: "BPBD Wajo", text: "Evakuasi mandiri telah dilakukan di Kel. Pammana — 240 KK ke titik kumpul SDN 3" },
              { time: "13:32", who: "BMKG Sulsel", text: "Curah hujan 240mm/12h di Sengkang — ekstrem, peringatan dini diteruskan" },
              { time: "13:15", who: "Tim PUPR", text: "2 alat berat dikerahkan ke jalur Sungai Cenranae untuk normalisasi" },
            ].map((u, i) => (
              <div key={i} className="crisis-update">
                <span className="crisis-update-time">{u.time}</span>
                <div>
                  <div><strong>{u.who}</strong></div>
                  <div className="muted">{u.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { OnboardingOverlay, ScenarioBuilder, GroupDecisionRoom, ReportBuilder, CrisisDashboard });
