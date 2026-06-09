// ============================================================
// iklim-peta.jsx — Tab C: Peta & Layer (Spatial) untuk Iklim Wilayah
// Interpolasi IDW titik→permukaan, layer toggle, time slider, zonal stats.
// Basemap Leaflet nyata (window.GeoMap). Sumber: §2.0 spatialization.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;
const MONTHS = window.MONTHS_ID;

// ---- ramp warna per parameter ----
const PARAM_RAMP = {
  t2m:    { label: "Suhu", unit: "°C", stops: [["#1E6CB5", 22], ["#60A5FA", 25], ["#FDF3DC", 27], ["#E9A352", 28.5], ["#C44E37", 30]] },
  precip: { label: "Hujan", unit: "mm", stops: [["#FBF3E0", 20], ["#A7D7C5", 120], ["#60A5FA", 300], ["#1E6CB5", 500], ["#11324B", 700]] },
  rh:     { label: "Kelembaban", unit: "%", stops: [["#FBF3E0", 68], ["#A7D7C5", 76], ["#2A9D8F", 84], ["#1B6E63", 90]] },
  rad:    { label: "Radiasi", unit: "MJ/m²", stops: [["#FDF3DC", 16], ["#F2C879", 18], ["#E9A352", 20], ["#C18820", 21]] },
};

function rampColor(param, v) {
  const stops = PARAM_RAMP[param].stops;
  if (v <= stops[0][1]) return stops[0][0];
  if (v >= stops[stops.length - 1][1]) return stops[stops.length - 1][0];
  for (let i = 0; i < stops.length - 1; i++) {
    const [c1, v1] = stops[i], [c2, v2] = stops[i + 1];
    if (v >= v1 && v <= v2) {
      const t = (v - v1) / (v2 - v1);
      return lerpColor(c1, c2, t);
    }
  }
  return stops[stops.length - 1][0];
}
function lerpColor(a, b, t) {
  const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
  const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
  const p = pa.map((x, i) => Math.round(x + (pb[i] - x) * t));
  return "#" + p.map(x => x.toString(16).padStart(2, "0")).join("");
}

// ---- kumpulkan titik stasiun untuk surface ----
function getStations(prov, param, month) {
  const REGIONS = window.CLIMATE_REGIONS, DATA = window.CLIMATE_DATA;
  const provObj = REGIONS[prov];
  // DIY: pakai 8 titik kecamatan (RDTR) untuk surface kaya
  if (prov === "diy" && window.YOGYA_KEC_STATS) {
    const series = DATA.yogyakarta.series;
    const meanT = series.reduce((a, s) => a + s.t2m, 0) / 12;
    const meanP = series.reduce((a, s) => a + s.precip, 0) / 12;
    const mT = series[month].t2m - meanT;
    const mP = series[month].precip / (meanP || 1);
    return window.YOGYA_KEC_STATS.map(k => {
      const kc = provObj.kab.yogyakarta.kec.find(c => c.code === k.code);
      let val;
      if (param === "t2m") val = +(k.t2m + mT).toFixed(1);
      else if (param === "precip") val = Math.round(k.rain * mP);
      else val = series[month][param];
      return { name: k.name, lng: kc.lng, lat: kc.lat, val };
    });
  }
  // generik: semua kota/kab dengan data
  const sts = [];
  Object.keys(provObj.kab).forEach(kk => {
    const o = provObj.kab[kk];
    if (o.data && DATA[kk]) sts.push({ name: o.name, lng: o.lng, lat: o.lat, val: DATA[kk].series[month][param] });
  });
  return sts;
}

function idw(lng, lat, stations, power) {
  let num = 0, den = 0;
  for (const s of stations) {
    const d = Math.hypot(lng - s.lng, lat - s.lat);
    if (d < 1e-7) return s.val;
    const w = 1 / Math.pow(d, power);
    num += w * s.val; den += w;
  }
  return den ? num / den : 0;
}

function TabPeta({ climate, committed, REGIONS }) {
  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];
  const [param, setParam] = React.useState("t2m");
  const [month, setMonth] = React.useState(5);
  const [playing, setPlaying] = React.useState(false);
  const [method, setMethod] = React.useState("idw"); // idw | kriging(mock)
  const [layers, setLayers] = React.useState({ surface: true, stations: true, zona: committed.prov === "diy", kontur: false });
  const playRef = React.useRef(null);

  React.useEffect(() => {
    if (playing) {
      playRef.current = setInterval(() => setMonth(m => (m + 1) % 12), 900);
    } else clearInterval(playRef.current);
    return () => clearInterval(playRef.current);
  }, [playing]);

  const stations = React.useMemo(() => getStations(committed.prov, param, month), [committed.prov, committed.kab, param, month]);

  // bounding box surface
  const bbox = React.useMemo(() => {
    if (!stations.length) { const c = [kabObj.lng, kabObj.lat]; return { w: c[0] - 0.3, e: c[0] + 0.3, s: c[1] - 0.3, n: c[1] + 0.3 }; }
    let w = Infinity, e = -Infinity, s = Infinity, n = -Infinity;
    stations.forEach(st => { w = Math.min(w, st.lng); e = Math.max(e, st.lng); s = Math.min(s, st.lat); n = Math.max(n, st.lat); });
    const padX = Math.max(0.08, (e - w) * 0.35), padY = Math.max(0.08, (n - s) * 0.35);
    return { w: w - padX, e: e + padX, s: s - padY, n: n + padY };
  }, [stations, committed.kab]);

  // surface grid → polygons
  const power = method === "idw" ? 2 : 3.2;
  const polygons = React.useMemo(() => {
    if (!layers.surface || !stations.length) return [];
    const cols = 18, rows = 18;
    const dx = (bbox.e - bbox.w) / cols, dy = (bbox.n - bbox.s) / rows;
    const out = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const lng = bbox.w + (c + 0.5) * dx, lat = bbox.s + (r + 0.5) * dy;
      const v = idw(lng, lat, stations, power);
      out.push({
        coords: [[[bbox.w + c * dx, bbox.s + r * dy], [bbox.w + (c + 1) * dx, bbox.s + r * dy], [bbox.w + (c + 1) * dx, bbox.s + (r + 1) * dy], [bbox.w + c * dx, bbox.s + (r + 1) * dy]]],
        color: rampColor(param, v), fillColor: rampColor(param, v), fillOpacity: 0.62, weight: 0,
      });
    }
    return out;
  }, [layers.surface, stations, bbox, param, power]);

  // kontur (garis iso sederhana) — opsional
  const lines = React.useMemo(() => {
    if (!layers.kontur || !stations.length) return [];
    return [];
  }, [layers.kontur, stations]);

  // titik stasiun
  const markers = React.useMemo(() => {
    if (!layers.stations) return [];
    return stations.map(st => ({
      lng: st.lng, lat: st.lat,
      html: `<div class="iklim-stn"><b>${param === "precip" ? Math.round(st.val) : st.val.toFixed(1)}</b></div>`,
      popup: `<b>${st.name}</b><br>${PARAM_RAMP[param].label}: ${param === "precip" ? Math.round(st.val) : st.val.toFixed(1)} ${PARAM_RAMP[param].unit}`,
    }));
  }, [layers.stations, stations, param]);

  // zona kecamatan (titik label, hanya DIY)
  const zonaAreas = React.useMemo(() => {
    if (!layers.zona || committed.prov !== "diy") return [];
    return provObj.kab.yogyakarta.kec.map(kc => ({
      lng: kc.lng, lat: kc.lat, radiusM: 900, color: "#1F2E29", fillOpacity: 0, weight: 1.4, dash: "3 3",
      tooltip: `Kec. ${kc.name}`,
    }));
  }, [layers.zona, committed.prov]);

  const center = [kabObj.lng, kabObj.lat];
  const zoom = committed.prov === "diy" ? 11.5 : 7;

  // zonal statistics
  const zonal = React.useMemo(() => {
    return stations.map(st => ({ name: st.name, val: st.val })).sort((a, b) => b.val - a.val);
  }, [stations]);
  const vmin = Math.min(...zonal.map(z => z.val)), vmax = Math.max(...zonal.map(z => z.val));

  const meta = PARAM_RAMP[param];

  return (
    <div className="iklim-peta-body">
      {/* LEFT: layers */}
      <aside className="peta-side">
        <div className="rdtr-panel">
          <div className="rdtr-panel-head">{tr("Parameter")}</div>
          <div className="fm-radio-col">
            {Object.keys(PARAM_RAMP).map(p => (
              <button key={p} className={`fm-radio-row ${param === p ? "on" : ""}`} onClick={() => setParam(p)}>
                <span className="fm-radio-dot" /><span>{tr(PARAM_RAMP[p].label)}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="rdtr-panel">
          <div className="rdtr-panel-head">{tr("Metode Interpolasi")}</div>
          <div className="peta-seg">
            <button className={method === "idw" ? "on" : ""} onClick={() => setMethod("idw")}>IDW</button>
            <button className={method === "kriging" ? "on" : ""} onClick={() => setMethod("kriging")}>Kriging</button>
          </div>
          <div className="peta-hint">{stations.length} {tr("titik stasiun")} · power {power.toFixed(1)}</div>
        </div>
        <div className="rdtr-panel">
          <div className="rdtr-panel-head">{tr("Layer")}</div>
          <div className="peta-layers">
            {[
              ["surface", tr("Permukaan interpolasi")],
              ["stations", tr("Titik stasiun")],
              ["zona", tr("Batas kecamatan"), committed.prov !== "diy"],
              ["kontur", tr("Kontur (iso)"), true],
            ].map(([k, lbl, disabled]) => (
              <label key={k} className={`fm-check ${disabled ? "is-disabled" : ""}`}>
                <input type="checkbox" checked={!!layers[k]} disabled={disabled} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />
                <span>{lbl}{disabled ? <span className="peta-na"> · {tr("n/a")}</span> : ""}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* CENTER: map + time slider */}
      <div className="peta-center">
        <div className="rdtr-map-card">
          <div className="rdtr-map-head">
            <div className="card-title"><Icon name="map" size={14} /> {tr("Permukaan")} {tr(meta.label)} · {kabObj.name} · {MONTHS[month]}</div>
            <div className="peta-method-tag">{method === "idw" ? "IDW" : "Ordinary Kriging"}</div>
          </div>
          <div className="peta-map-stage">
            <window.GeoMap key={committed.kab} center={center} zoom={zoom} basemap="positron" polygons={polygons} areas={zonaAreas} lines={lines} markers={markers} controls={true} />
            <div className="peta-legend">
              <div className="peta-legend-title">{tr(meta.label)} ({meta.unit})</div>
              <div className="peta-legend-ramp" style={{ background: `linear-gradient(90deg, ${meta.stops.map(s => s[0]).join(", ")})` }} />
              <div className="peta-legend-scale"><span>{meta.stops[0][1]}</span><span>{meta.stops[meta.stops.length - 1][1]}</span></div>
            </div>
          </div>
          {/* time slider */}
          <div className="peta-timeslider">
            <button className="time-play" onClick={() => setPlaying(!playing)}><Icon name={playing ? "pause" : "play"} size={14} /></button>
            <input type="range" min="0" max="11" value={month} onChange={e => { setPlaying(false); setMonth(+e.target.value); }} className="peta-time-range" />
            <div className="peta-time-label">{MONTHS[month]}</div>
          </div>
        </div>
      </div>

      {/* RIGHT: zonal statistics */}
      <aside className="peta-stats">
        <div className="rdtr-panel">
          <div className="rdtr-panel-head"><Icon name="bar-chart-2" size={13} /> {tr("Zonal Statistics")}</div>
          <div className="peta-stats-sub">{tr("Rata-rata per zona")} · {MONTHS[month]}</div>
          <div className="peta-zonal">
            {zonal.map(z => (
              <div key={z.name} className="peta-zrow">
                <span className="peta-zname">{z.name}</span>
                <div className="peta-zbar"><div style={{ width: `${vmax > vmin ? ((z.val - vmin) / (vmax - vmin)) * 100 : 50}%`, background: rampColor(param, z.val) }} /></div>
                <span className="peta-zval">{param === "precip" ? Math.round(z.val) : z.val.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="peta-zsummary">
            <div><span>min</span><b>{param === "precip" ? Math.round(vmin) : vmin.toFixed(1)}</b></div>
            <div><span>maks</span><b>{param === "precip" ? Math.round(vmax) : vmax.toFixed(1)}</b></div>
            <div><span>rentang</span><b>{param === "precip" ? Math.round(vmax - vmin) : (vmax - vmin).toFixed(1)}</b></div>
          </div>
        </div>
        <div className="peta-export-note">
          <Icon name="info" size={12} />
          <span>{tr("Permukaan ini bisa dipublikasikan sebagai layer di Tab Publikasi & Integrasi.")}</span>
        </div>
      </aside>
    </div>
  );
}

Object.assign(window, { TabPeta, rampColor: rampColor, PARAM_RAMP });
