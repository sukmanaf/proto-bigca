// ============================================================
// iklim-tabs.jsx — Konten Tab Ikhtisar & Prediksi untuk Iklim Wilayah
// Dipakai oleh window.IklimWilayah (iklim-wilayah.jsx)
// ============================================================

const Icon = window.Icon;
const tr = window.tr;
const MONTHS = window.MONTHS_ID;

// ============================================================
// TAB A — IKHTISAR
// ============================================================
function TabIkhtisar({ climate, committed, REGIONS, setTab, setRoute, openAI }) {
  const [param, setParam] = React.useState("t2m");
  const cur = climate.current;

  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];

  // markers peta: semua kota berdata di provinsi (atau kecamatan utk yogya)
  const DATA = window.CLIMATE_DATA;
  let markers = [];
  let center = [kabObj.lng, kabObj.lat];
  let zoom = 9;
  if (kabObj.kecLevel && committed.kec) {
    // zoom ke kecamatan
    const kc = kabObj.kec.find(c => c.code === committed.kec);
    if (kc) { center = [kc.lng, kc.lat]; zoom = 12; }
  } else if (kabObj.kecLevel) {
    zoom = 11;
  }
  // station markers
  Object.keys(provObj.kab).forEach(kk => {
    const o = provObj.kab[kk];
    if (o.data && DATA[kk]) {
      markers.push({
        lng: o.lng, lat: o.lat,
        color: kk === committed.kab ? "#C44E37" : "#0E5A78",
        size: kk === committed.kab ? 18 : 13,
        label: DATA[kk].current.temp.toFixed(1) + "°",
        popup: `<b>${o.name}</b><br>${DATA[kk].current.cond} · ${DATA[kk].current.temp}°C`,
      });
    }
  });

  const paramMeta = {
    t2m: { label: "Suhu", unit: "°C", color: "#C44E37", key: "t2m" },
    precip: { label: "Hujan", unit: "mm", color: "#1E6CB5", key: "precip" },
    rh: { label: "Kelembaban", unit: "%", color: "#2A9D8F", key: "rh" },
    rad: { label: "Radiasi", unit: "MJ/m²", color: "#C18820", key: "rad" },
  }[param];

  const series = climate.series;
  const anomaly = (cur.temp - climate.normalT2m).toFixed(1);

  return (
    <div className="ikhtisar-body">
      {/* KONDISI TERKINI */}
      <div className="ovw-current rdtr-detail-card">
        <div className="rdtr-detail-head">
          <Icon name="thermometer" size={14} /> {tr("Kondisi Terkini")} · BMKG
          <span className="ovw-time">{cur.localTime}</span>
        </div>
        <div className="ovw-cond-row">
          <div className="ovw-cond-main">
            <div className="ovw-temp">{cur.temp}<span>°C</span></div>
            <div className="ovw-cond-label"><WeatherGlyph cond={cur.cond} /> {cur.cond}</div>
            <div className="ovw-loc">{kabObj.name}{committed.kec ? " · " + (kabObj.kec.find(c=>c.code===committed.kec)||{}).name : ""}</div>
          </div>
          <div className="ovw-metrics">
            <Metric icon="droplets" label={tr("Kelembaban")} value={cur.rh + "%"} />
            <Metric icon="cloud-rain" label={tr("Curah Hujan")} value={cur.rain + " mm"} />
            <Metric icon="wind" label={tr("Angin")} value={cur.wind + " m/s"} sub={windCompass(cur.windDir)} />
            <Metric icon="cloud" label={tr("Tutupan Awan")} value={cur.cloud + "%"} />
          </div>
        </div>
      </div>

      {/* TIME-SERIES + PETA */}
      <div className="ovw-two">
        <div className="rdtr-detail-card ovw-ts-card">
          <div className="rdtr-detail-head">
            <Icon name="trending-up" size={14} /> {tr("Time-Series Bulanan")} · NASA POWER 2023
          </div>
          <div className="ovw-param-toggle">
            {Object.keys(paramMetaAll).map(p => (
              <button key={p} className={`ovw-chip ${param === p ? "on" : ""}`} onClick={() => setParam(p)} style={param === p ? { "--chip": paramMetaAll[p].color } : {}}>
                {tr(paramMetaAll[p].label)}
              </button>
            ))}
          </div>
          <div className="ovw-chart"><ClimateChart series={series} meta={paramMeta} normalT2m={climate.normalT2m} /></div>
          {param === "t2m" && (
            <div className="ovw-normal">
              <span>{tr("Normal")}: <strong>{climate.normalT2m}°C</strong></span>
              <span className={`ovw-anom ${anomaly >= 0 ? "warm" : "cool"}`}>{tr("Anomali saat ini")}: <strong>{anomaly >= 0 ? "+" : ""}{anomaly}°C</strong></span>
            </div>
          )}
        </div>

        <div className="rdtr-detail-card ovw-map-card">
          <div className="rdtr-detail-head"><Icon name="map-pin" size={14} /> {tr("Peta Wilayah")} <span className="ovw-map-hint">{tr("klik titik untuk detail")}</span></div>
          <div className="ovw-map">
            <window.MapLibreMap center={center} zoom={zoom} basemap="positron" markers={markers} />
          </div>
        </div>
      </div>

      {/* AKSI */}
      <div className="ovw-actions">
        <button className="primary-btn" onClick={() => setTab("prediksi")}><Icon name="sparkles" size={14} /> {tr("Prediksi")} →</button>
        <button className="ghost-btn" onClick={() => setTab("peta")}><Icon name="map" size={14} /> {tr("Lihat di Peta")} →</button>
        <button className="ghost-btn" onClick={() => window.print && window.print()}><Icon name="file-down" size={14} /> {tr("Export PDF")}</button>
        <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} /> {tr("Jelaskan ini")}</button>
      </div>
    </div>
  );
}

const paramMetaAll = {
  t2m: { label: "Suhu", unit: "°C", color: "#C44E37", key: "t2m" },
  precip: { label: "Hujan", unit: "mm", color: "#1E6CB5", key: "precip" },
  rh: { label: "Kelembaban", unit: "%", color: "#2A9D8F", key: "rh" },
  rad: { label: "Radiasi", unit: "MJ/m²", color: "#C18820", key: "rad" },
};

function Metric({ icon, label, value, sub }) {
  return (
    <div className="ovw-metric">
      <Icon name={icon} size={15} />
      <div>
        <div className="ovw-metric-label">{label}</div>
        <div className="ovw-metric-value">{value}{sub && <span className="ovw-metric-sub"> {sub}</span>}</div>
      </div>
    </div>
  );
}

function WeatherGlyph({ cond }) {
  const c = cond.toLowerCase();
  let icon = "cloud";
  if (c.includes("cerah") && !c.includes("berawan")) icon = "sun";
  else if (c.includes("cerah")) icon = "cloud-sun";
  else if (c.includes("hujan")) icon = "cloud-rain";
  else if (c.includes("berawan")) icon = "cloud";
  return <Icon name={icon} size={16} />;
}

function windCompass(deg) {
  const dirs = ["U","TL","T","TG","S","BD","B","BL"];
  return dirs[Math.round(deg / 45) % 8] + " " + deg + "°";
}

// ---- Chart bulanan (line untuk suhu/RH/radiasi, bar untuk hujan) ----
function ClimateChart({ series, meta }) {
  const W = 560, H = 180, padL = 36, padR = 12, padT = 14, padB = 26;
  const vals = series.map(s => s[meta.key]);
  const min = Math.min(...vals), max = Math.max(...vals);
  const lo = meta.key === "precip" ? 0 : min - (max - min) * 0.2;
  const hi = max + (max - min) * 0.2 || max + 1;
  const xOf = i => padL + (i / (series.length - 1)) * (W - padL - padR);
  const yOf = v => H - padB - ((v - lo) / (hi - lo)) * (H - padT - padB);
  const isBar = meta.key === "precip";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="ovw-chart-svg">
      {/* gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map(f => {
        const v = lo + f * (hi - lo);
        const y = yOf(v);
        return (
          <g key={f}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--gray-200,#e3e8e5)" strokeWidth="1" />
            <text x={padL - 5} y={y + 3} fontSize="9" fill="var(--gray-500,#888)" textAnchor="end">{v.toFixed(meta.key === "precip" ? 0 : 0)}</text>
          </g>
        );
      })}
      {/* data */}
      {isBar ? (
        series.map((s, i) => {
          const bw = (W - padL - padR) / series.length * 0.6;
          const y = yOf(s[meta.key]);
          return <rect key={i} x={xOf(i) - bw / 2} y={y} width={bw} height={H - padB - y} rx="2" fill={meta.color} opacity="0.85" />;
        })
      ) : (
        <g>
          <polyline points={series.map((s, i) => `${xOf(i)},${yOf(s[meta.key])}`).join(" ")} fill="none" stroke={meta.color} strokeWidth="2.5" />
          {series.map((s, i) => <circle key={i} cx={xOf(i)} cy={yOf(s[meta.key])} r="3" fill={meta.color} />)}
        </g>
      )}
      {/* x labels */}
      {series.map((s, i) => <text key={i} x={xOf(i)} y={H - 8} fontSize="9" fill="var(--gray-500,#888)" textAnchor="middle">{s.month}</text>)}
    </svg>
  );
}

Object.assign(window, { TabIkhtisar, ClimateChart });
