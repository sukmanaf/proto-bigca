// ============================================================
// risk-map-real.jsx — Peta risiko berbasis MapLibre NYATA
// Mengganti MapSurface (SVG stilasi) di RiskMapInline (dashboard) & MapExplorer.
// Kab Sulsel pada koordinat asli; choropleth lingkaran data-driven + popup hover.
// ============================================================

const Icon = window.Icon;

// Koordinat asli kabupaten/kota Sulawesi Selatan (centroid approx)
const SULSEL_KABS = [
  { id: "wajo",        name: "Wajo",        pop: "395K", r: [5,2,3], lng: 120.03, lat: -4.00 },
  { id: "bone",        name: "Bone",        pop: "752K", r: [4,3,2], lng: 120.32, lat: -4.54 },
  { id: "soppeng",     name: "Soppeng",     pop: "230K", r: [3,1,4], lng: 119.89, lat: -4.38 },
  { id: "pinrang",     name: "Pinrang",     pop: "365K", r: [4,4,1], lng: 119.65, lat: -3.79 },
  { id: "makassar",    name: "Makassar",    pop: "1.4M", r: [3,4,1], lng: 119.42, lat: -5.15 },
  { id: "gowa",        name: "Gowa",        pop: "770K", r: [3,2,2], lng: 119.45, lat: -5.21 },
  { id: "takalar",     name: "Takalar",     pop: "295K", r: [2,4,1], lng: 119.48, lat: -5.42 },
  { id: "maros",       name: "Maros",       pop: "355K", r: [3,2,2], lng: 119.57, lat: -5.01 },
  { id: "pangkep",     name: "Pangkep",     pop: "335K", r: [3,3,1], lng: 119.55, lat: -4.83 },
  { id: "barru",       name: "Barru",       pop: "175K", r: [3,3,1], lng: 119.62, lat: -4.42 },
  { id: "parepare",    name: "Parepare",    pop: "150K", r: [2,3,1], lng: 119.62, lat: -4.01 },
  { id: "sidrap",      name: "Sidrap",      pop: "295K", r: [3,1,3], lng: 119.97, lat: -3.85 },
  { id: "luwu",        name: "Luwu",        pop: "365K", r: [2,1,4], lng: 120.33, lat: -3.00 },
  { id: "enrekang",    name: "Enrekang",    pop: "215K", r: [2,1,3], lng: 119.77, lat: -3.57 },
  { id: "tana-toraja", name: "Tana Toraja", pop: "230K", r: [1,1,3], lng: 119.85, lat: -3.08 },
  { id: "selayar",     name: "Selayar",     pop: "140K", r: [3,5,1], lng: 120.46, lat: -6.12 },
  { id: "bulukumba",   name: "Bulukumba",   pop: "425K", r: [3,4,1], lng: 120.19, lat: -5.55 },
  { id: "bantaeng",    name: "Bantaeng",    pop: "190K", r: [3,4,1], lng: 119.98, lat: -5.48 },
  { id: "jeneponto",   name: "Jeneponto",   pop: "410K", r: [2,4,1], lng: 119.73, lat: -5.63 },
  { id: "sinjai",      name: "Sinjai",      pop: "245K", r: [3,3,1], lng: 120.25, lat: -5.13 },
];

const RISK_COLORS = ["#0E5A78", "#2F7D5E", "#C18820", "#C44E37", "#8B1A1A"];
const RISK_LABELS = ["Sangat Rendah", "Rendah", "Sedang", "Tinggi", "Sangat Tinggi"];
const LAYER_IDX = { banjir: 0, slr: 1, karhutla: 2 };

// Pusat & zoom per provinsi
const PROV_VIEW = {
  sulsel: { center: [119.9, -4.3], zoom: 6.6 },
  jabar:  { center: [107.6, -6.9], zoom: 7.8 },
  diy:    { center: [110.4, -7.8], zoom: 9.2 },
  jatim:  { center: [112.5, -7.8], zoom: 7.2 },
  ntt:    { center: [121.5, -9.3], zoom: 6.6 },
  kalbar: { center: [111.5, -0.3], zoom: 6.2 },
  papua:  { center: [138.5, -4.0], zoom: 5.6 },
  all:    { center: [118.0, -2.5], zoom: 4.4 },
};

function RealRiskMap({ ctx, layers, crisis, onSelect, explorer }) {
  const province = ctx.province || "sulsel";
  const view = PROV_VIEW[province] || PROV_VIEW.sulsel;

  const activeKeys = Object.keys(layers || {}).filter(k => layers[k] && k in LAYER_IDX);
  const scoreFor = (k) => activeKeys.length === 0 ? 0 : Math.max(...activeKeys.map(key => k.r[LAYER_IDX[key]]));
  const showKabs = province === "sulsel" || province === "all";

  // Choropleth circles dari kab Sulsel
  const circles = React.useMemo(() => {
    if (!showKabs) return [];
    return SULSEL_KABS.map(k => {
      const score = scoreFor(k);
      const color = score === 0 ? "#9DACA4" : RISK_COLORS[score - 1];
      const label = score === 0 ? "Tidak ada layer" : RISK_LABELS[score - 1];
      const tooltip =
        `<div class="rrm-pop-title">${k.name}</div>
         <div class="rrm-pop-row"><span>Risk</span><b style="color:${color}">${label}</b></div>
         <div class="rrm-pop-row"><span>Populasi</span><b>${k.pop}</b></div>
         ${explorer ? '<div class="rrm-pop-hint">Klik → drill-down Kerentanan</div>' : ''}`;
      return {
        lng: k.lng, lat: k.lat,
        radius: 8 + score * 2.6 + (k.pop.includes("M") ? 5 : 0),
        color, fillOpacity: score === 0 ? 0.45 : 0.82,
        tooltip, onClick: onSelect ? () => onSelect(k.id) : null,
      };
    });
  }, [JSON.stringify(activeKeys), province, showKabs, explorer]);

  // crisis pulse di Wajo
  const markers = (crisis && showKabs) ? [{
    lng: 120.03, lat: -4.00,
    html: `<div class="rrm-pulse"><span></span><i></i></div>`,
  }] : [];

  return (
    <window.GeoMap
      center={view.center} zoom={view.zoom} basemap="positron"
      circles={circles} markers={markers}
      controls={!!explorer}
    />
  );
}

Object.assign(window, { RealRiskMap, SULSEL_KABS });
