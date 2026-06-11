// ============================================================
// climate-snapshot.jsx — Widget Home "Snapshot Iklim Wilayah" (FITUR 2.0)
// Disisipkan di dashboard.jsx setelah zona two-col, sebelum ModuleGrid.
// Data: /v1/sample/weather (kondisi terkini) + /v1/climate/series (sparkline suhu).
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

function ClimateSnapshot({ ctx, setRoute }) {
  const REGIONS = window.CLIMATE_REGIONS;
  const provObj = REGIONS[ctx.province];

  const [weather, setWeather] = React.useState(null);
  const [series, setSeries] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    if (!provObj) { setLoading(false); return; }
    const cfg = window.APP_CONFIG || {};
    if (!cfg.ML_API_ENABLED || !cfg.ML_API_URL) { setLoading(false); setError(true); return; }

    // cari kab pertama dengan data + locationLabel di provinsi
    const kabEntry = Object.entries(provObj.kab).find(([, o]) => o.data && o.locationLabel);
    if (!kabEntry) { setLoading(false); return; }
    const [, kabObj] = kabEntry;

    setLoading(true); setError(false);
    Promise.all([
      fetch(`${cfg.ML_API_URL}/v1/sample/weather?lat=${kabObj.lat}&lon=${kabObj.lng}`)
        .then(r => r.ok ? r.json() : null),
      fetch(`${cfg.ML_API_URL}/v1/climate/series/${encodeURIComponent(kabObj.locationLabel)}`)
        .then(r => r.ok ? r.json() : null),
    ])
    .then(([w, s]) => {
      setWeather(w);
      setSeries(s ? s.series : null);
      setLoading(false);
    })
    .catch(() => { setError(true); setLoading(false); });
  }, [ctx.province]);

  const provName = provObj ? provObj.name : tr("Wilayah");

  if (loading) return (
    <div className="snap-card snap-empty">
      <div className="snap-head"><Icon name="cloud-sun" size={16} /> {tr("Snapshot Iklim")} · {provName}</div>
      <div className="snap-empty-body"><span className="pred-spin" /> {tr("Memuat…")}</div>
    </div>
  );

  if (error || !weather || !series) return (
    <div className="snap-card snap-empty">
      <div className="snap-head"><Icon name="cloud-sun" size={16} /> {tr("Snapshot Iklim")} · {provName}</div>
      <div className="snap-empty-body">
        <Icon name="cloud-off" size={24} />
        <span>{tr("Data iklim wilayah belum tersedia.")}</span>
        <button className="link-btn" onClick={() => setRoute("data")}>{tr("Lihat cakupan data")} →</button>
      </div>
    </div>
  );

  const curMonthIdx = new Date().getMonth();
  const rainThisMonth = series[curMonthIdx] ? series[curMonthIdx].precip : "—";
  const spark = series.map(s => s.t2m);

  return (
    <div className="snap-card">
      <div className="snap-head">
        <span><Icon name="cloud-sun" size={16} /> {tr("Snapshot Iklim")} · {provName}</span>
        <button className="snap-collapse" title={tr("ringkas")}><Icon name="chevron-down" size={14} /></button>
      </div>
      <div className="snap-body">
        <div className="snap-metrics">
          <div className="snap-metric">
            <div className="snap-metric-label">{tr("Suhu terkini")}</div>
            <div className="snap-metric-value">{weather.suhu_c}<span>°C</span></div>
          </div>
          <div className="snap-metric">
            <div className="snap-metric-label">{tr("Hujan (bln ini)")}</div>
            <div className="snap-metric-value">{rainThisMonth}<span>mm</span></div>
          </div>
          <div className="snap-metric">
            <div className="snap-metric-label">{tr("Kondisi terkini")}</div>
            <div className="snap-metric-cond"><WeatherGlyph3 cond={weather.actual_cuaca} /> {weather.actual_cuaca || "—"}</div>
          </div>
        </div>
        <div className="snap-spark"><Sparkline data={spark} /></div>
      </div>
      <div className="snap-foot">
        <span className="snap-src"><Icon name="database" size={11} /> NASA POWER · BMKG · <span className="snap-fresh">DB Live</span></span>
        <button className="snap-open" onClick={() => setRoute("feature-iklim")}>{tr("Buka Iklim Wilayah")} <Icon name="arrow-right" size={13} /></button>
      </div>
    </div>
  );
}

function WeatherGlyph3({ cond }) {
  const c = (cond || "").toLowerCase();
  let icon = "cloud";
  if (c.includes("cerah") && !c.includes("berawan")) icon = "sun";
  else if (c.includes("cerah")) icon = "cloud-sun";
  else if (c.includes("hujan")) icon = "cloud-rain";
  return <Icon name={icon} size={15} />;
}

function Sparkline({ data }) {
  const W = 320, H = 44, pad = 3;
  const min = Math.min(...data), max = Math.max(...data);
  const xOf = i => pad + (i / (data.length - 1)) * (W - pad * 2);
  const yOf = v => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const pts = data.map((v, i) => `${xOf(i)},${yOf(v)}`).join(" ");
  const area = `${pad},${H - pad} ` + pts + ` ${W - pad},${H - pad}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="snap-spark-svg" preserveAspectRatio="none">
      <polygon points={area} fill="rgba(194,78,55,.12)" />
      <polyline points={pts} fill="none" stroke="#C44E37" strokeWidth="2" />
    </svg>
  );
}

Object.assign(window, { ClimateSnapshot });
