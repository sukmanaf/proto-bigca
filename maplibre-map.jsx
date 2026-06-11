// ============================================================
// GeoMap — komponen peta reusable berbasis Leaflet (basemap DOM-tile nyata)
// Dipakai lintas aplikasi: Iklim Wilayah, RiskMap, Map Explorer, dll.
// Catatan: memakai Leaflet (raster tiles via <img>) agar render andal di semua
// lingkungan (termasuk preview sandbox). Diekspor sbg window.MapLibreMap (kompat)
// dan window.GeoMap.
//
// Props:
//   center      [lng, lat]            (urutan lng,lat — dikonversi internal)
//   zoom        number
//   basemap     'positron'|'voyager'|'dark'|'osm'
//   markers     [{ lng,lat, color,size,label, html, popup, onClick }]
//   circles     [{ lng,lat, radius,color,fillOpacity, tooltip, onClick }]  ← choropleth
//   fitBounds   [[w,s],[e,n]]
//   interactive bool   controls bool   onReady (map)=>void
//   className   string                 style obj
// ============================================================

const LEAF_BASEMAPS = {
  positron: { url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", sub: "abcd", attr: "© OpenStreetMap · © CARTO" },
  voyager:  { url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png", sub: "abcd", attr: "© OpenStreetMap · © CARTO" },
  dark:     { url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", sub: "abcd", attr: "© OpenStreetMap · © CARTO" },
  osm:      { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", sub: "abc", attr: "© OpenStreetMap" },
};

function GeoMap({
  center = [119.42, -5.14], zoom = 9, basemap = "positron",
  markers = [], circles = [], lines = [], areas = [], polygons = [], fitBounds = null,
  interactive = true, controls = true, onReady, className = "", style = {},
}) {
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markerLayerRef = React.useRef(null);
  const circleLayerRef = React.useRef(null);
  const lineLayerRef = React.useRef(null);
  const areaLayerRef = React.useRef(null);
  const polyLayerRef = React.useRef(null);
  const tileLayerRef = React.useRef(null);
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  // --- Init once ---
  React.useEffect(() => {
    if (!window.L) { setFailed(true); return; }
    if (!containerRef.current) return;
    let map;
    try {
      map = window.L.map(containerRef.current, {
        center: [center[1], center[0]], zoom,
        zoomControl: controls, attributionControl: true,
        dragging: interactive, scrollWheelZoom: interactive,
        doubleClickZoom: interactive, boxZoom: interactive,
        keyboard: interactive, touchZoom: interactive,
        fadeAnimation: false, preferCanvas: true,
      });
      mapRef.current = map;
      const bm = LEAF_BASEMAPS[basemap] || LEAF_BASEMAPS.positron;
      tileLayerRef.current = window.L.tileLayer(bm.url, { subdomains: bm.sub, attribution: bm.attr, maxZoom: 19 }).addTo(map);
      markerLayerRef.current = window.L.layerGroup().addTo(map);
      circleLayerRef.current = window.L.layerGroup().addTo(map);
      lineLayerRef.current = window.L.layerGroup().addTo(map);
      areaLayerRef.current = window.L.layerGroup().addTo(map);
      polyLayerRef.current = window.L.layerGroup().addTo(map);
      map.attributionControl.setPrefix("");

      // pastikan ukuran benar (kontainer below-the-fold / baru tampil)
      const fix = () => { try { map.invalidateSize(false); } catch (_) {} };
      setTimeout(fix, 60); setTimeout(fix, 300); setTimeout(fix, 900);
      let ro;
      if (window.ResizeObserver) { ro = new ResizeObserver(fix); ro.observe(containerRef.current); }
      map._mlxRO = ro;

      setReady(true);
      try { (window.__mlxMaps = window.__mlxMaps || []).push(map); } catch (_) {}
      if (onReady) onReady(map);
    } catch (err) {
      setFailed(true);
    }
    return () => {
      if (map) { try { if (map._mlxRO) map._mlxRO.disconnect(); } catch (_) {} try { map.remove(); } catch (_) {} }
      mapRef.current = null;
    };
    // eslint-disable-next-line
  }, []);

  // --- center/zoom/fitBounds ---
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    if (fitBounds) {
      try { map.fitBounds([[fitBounds[0][1], fitBounds[0][0]], [fitBounds[1][1], fitBounds[1][0]]], { padding: [30, 30] }); } catch (_) {}
    } else {
      try { map.setView([center[1], center[0]], zoom, { animate: true, duration: 0.6 }); } catch (_) { try { map.setView([center[1], center[0]], zoom); } catch (__) {} }
    }
    // eslint-disable-next-line
  }, [center[0], center[1], zoom, fitBounds && JSON.stringify(fitBounds), ready]);

  // --- basemap change ---
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !tileLayerRef.current) return;
    const bm = LEAF_BASEMAPS[basemap] || LEAF_BASEMAPS.positron;
    tileLayerRef.current.setUrl(bm.url);
    // eslint-disable-next-line
  }, [basemap, ready]);

  // --- HTML / dot markers ---
  React.useEffect(() => {
    const map = mapRef.current, grp = markerLayerRef.current;
    if (!map || !ready || !grp || !window.L) return;
    grp.clearLayers();
    for (const mk of markers) {
      let icon;
      if (mk.html) {
        icon = window.L.divIcon({ className: "mlx-divicon", html: mk.html, iconSize: null });
      } else {
        const sz = mk.size || 14;
        const labelHtml = mk.label ? `<div class="mlx-marker-label">${mk.label}</div>` : "";
        icon = window.L.divIcon({
          className: "mlx-divicon",
          html: `<div class="mlx-dot" style="width:${sz}px;height:${sz}px;background:${mk.color || "#0E5A78"};${mk.onClick ? "cursor:pointer;" : ""}"></div>${labelHtml}`,
          iconSize: [sz, sz], iconAnchor: [sz / 2, sz / 2],
        });
      }
      const m = window.L.marker([mk.lat, mk.lng], { icon, interactive: !!(mk.popup || mk.onClick) });
      if (mk.popup) m.bindPopup(mk.popup, { closeButton: false });
      if (mk.onClick) m.on("click", () => mk.onClick(mk));
      m.addTo(grp);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(markers.map(m => [m.lng, m.lat, m.color, m.label, m.size, m.html])), ready]);

  // --- data circles (choropleth) ---
  React.useEffect(() => {
    const map = mapRef.current, grp = circleLayerRef.current;
    if (!map || !ready || !grp || !window.L) return;
    grp.clearLayers();
    for (const c of circles) {
      const cm = window.L.circleMarker([c.lat, c.lng], {
        radius: c.radius || 10, color: "#ffffff", weight: 1.5,
        fillColor: c.color || "#0E5A78", fillOpacity: c.fillOpacity != null ? c.fillOpacity : 0.82,
      });
      if (c.tooltip) cm.bindTooltip(c.tooltip, { sticky: true, direction: "top", className: "mlx-tt" });
      if (c.onClick) cm.on("click", () => c.onClick(c));
      cm.addTo(grp);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(circles.map(c => [c.lng, c.lat, c.color, c.radius, c.fillOpacity])), ready]);

  // --- polylines ---
  React.useEffect(() => {
    const map = mapRef.current, grp = lineLayerRef.current;
    if (!map || !ready || !grp || !window.L) return;
    grp.clearLayers();
    for (const ln of lines) {
      const latlngs = (ln.coords || []).map(c => [c[1], c[0]]);
      const pl = window.L.polyline(latlngs, {
        color: ln.color || "#0E5A78", weight: ln.weight || 4,
        opacity: ln.opacity != null ? ln.opacity : 0.9,
        dashArray: ln.dash || null, lineCap: "round",
      });
      if (ln.tooltip) pl.bindTooltip(ln.tooltip, { sticky: true, className: "mlx-tt" });
      if (ln.onClick) pl.on("click", () => ln.onClick(ln));
      pl.addTo(grp);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(lines.map(l => [l.color, l.weight, l.coords])), ready]);

  // --- geographic circles (meters) — habitat/area ---
  React.useEffect(() => {
    const map = mapRef.current, grp = areaLayerRef.current;
    if (!map || !ready || !grp || !window.L) return;
    grp.clearLayers();
    for (const a of areas) {
      const circ = window.L.circle([a.lat, a.lng], {
        radius: a.radiusM || 10000,
        color: a.stroke || a.color || "#1B5E3A",
        weight: a.weight != null ? a.weight : 1,
        opacity: a.strokeOpacity != null ? a.strokeOpacity : 0.8,
        dashArray: a.dash || null,
        fillColor: a.fillColor || a.color || "#1B5E3A",
        fillOpacity: a.fillOpacity != null ? a.fillOpacity : 0.25,
      });
      if (a.tooltip) circ.bindTooltip(a.tooltip, { sticky: true, className: "mlx-tt" });
      if (a.onClick) circ.on("click", () => a.onClick(a));
      circ.addTo(grp);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(areas.map(a => [a.lng, a.lat, a.radiusM, a.color, a.fillColor, a.fillOpacity, a.dash])), ready]);

  // --- polygons (rings of [lng,lat]) ---
  React.useEffect(() => {
    const map = mapRef.current, grp = polyLayerRef.current;
    if (!map || !ready || !grp || !window.L) return;
    grp.clearLayers();
    for (const p of polygons) {
      const rings = (p.coords || []).map(ring => ring.map(c => [c[1], c[0]]));
      const poly = window.L.polygon(rings, {
        color: p.stroke || p.color || "#0E5A78",
        weight: p.weight != null ? p.weight : 1.5,
        opacity: p.strokeOpacity != null ? p.strokeOpacity : 0.9,
        fillColor: p.fillColor || p.color || "#0E5A78",
        fillOpacity: p.fillOpacity != null ? p.fillOpacity : 0.4,
        dashArray: p.dash || null,
      });
      if (p.tooltip) poly.bindTooltip(p.tooltip, { sticky: true, className: "mlx-tt" });
      if (p.onClick) poly.on("click", () => p.onClick(p));
      poly.addTo(grp);
    }
    // eslint-disable-next-line
  }, [JSON.stringify(polygons.map(p => [p.color, p.fillColor, p.fillOpacity, p.weight, p.coords])), ready]);

  if (failed) {
    return (
      <div className={`mlx-map mlx-failed ${className}`} style={style}>
        <div className="mlx-failed-inner"><span>Peta tidak dapat dimuat</span><small>Leaflet / jaringan tidak tersedia</small></div>
      </div>
    );
  }
  return (
    <div className={`mlx-map ${className}`} style={style}>
      <div ref={containerRef} className="mlx-canvas" />
    </div>
  );
}

Object.assign(window, { GeoMap, MapLibreMap: GeoMap, LEAF_BASEMAPS });
