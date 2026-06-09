// ============================================================
// iklim-publikasi.jsx — Tab D: Publikasi & Integrasi untuk Iklim Wilayah
// Simpan ke PostGIS · Add to GeoVertix · publikasi OGC (WMS/WFS/WCS/STAC) ·
// ekspor (GeoTIFF/NetCDF/CSV) · metadata ISO 19115. Sumber §2.0 / §10.x.
// ============================================================

const Icon = window.Icon;
const tr = window.tr;
const MONTHS = window.MONTHS_ID;

function slugify(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function TabPublikasi({ climate, committed, REGIONS }) {
  const provObj = REGIONS[committed.prov];
  const kabObj = provObj.kab[committed.kab];

  const [param, setParam] = React.useState("t2m");
  const layerSlug = `iklim_${slugify(kabObj.name)}_${param}_2026`;
  const [table, setTable] = React.useState(layerSlug);
  const [schema, setSchema] = React.useState("climate");
  const [ogc, setOgc] = React.useState({ wms: true, wfs: true, wcs: false, stac: true });
  const [published, setPublished] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [savedPg, setSavedPg] = React.useState(false);
  const [savingPg, setSavingPg] = React.useState(false);

  React.useEffect(() => { setTable(`iklim_${slugify(kabObj.name)}_${param}_2026`); setPublished(false); setSavedPg(false); }, [param, committed.kab]);

  const PARAM = window.PARAM_RAMP || { t2m: { label: "Suhu", unit: "°C" }, precip: { label: "Hujan", unit: "mm" }, rh: { label: "Kelembaban", unit: "%" }, rad: { label: "Radiasi", unit: "MJ/m²" } };
  const base = "https://geo.big.go.id/geoserver/climate/ows";
  const ogcUrls = {
    wms: `${base}?service=WMS&version=1.3.0&request=GetMap&layers=${schema}:${table}`,
    wfs: `${base}?service=WFS&version=2.0.0&request=GetFeature&typeNames=${schema}:${table}`,
    wcs: `${base}?service=WCS&version=2.0.1&request=GetCoverage&coverageId=${schema}__${table}`,
    stac: `https://geo.big.go.id/stac/collections/${schema}/items/${table}`,
  };

  function doPublish() {
    setPublishing(true);
    setTimeout(() => { setPublishing(false); setPublished(true); }, 1100);
  }
  function savePg() { setSavingPg(true); setTimeout(() => { setSavingPg(false); setSavedPg(true); }, 900); }

  const exports = [
    { id: "geotiff", label: "GeoTIFF", icon: "image", desc: "Raster permukaan interpolasi · EPSG:4326", size: "4.2 MB" },
    { id: "netcdf", label: "NetCDF", icon: "layers", desc: "Time-series 12 bulan (CF-1.8)", size: "1.8 MB" },
    { id: "csv", label: "CSV", icon: "table", desc: "Titik stasiun + nilai per bulan", size: "24 KB" },
    { id: "geojson", label: "GeoJSON", icon: "map-pin", desc: "Zonal statistics per zona", size: "61 KB" },
  ];

  return (
    <div className="iklim-pub-body">
      {/* param selector strip */}
      <div className="pub-paramstrip">
        <span className="pub-paramstrip-label"><Icon name="layers" size={13} /> {tr("Layer untuk dipublikasikan")}:</span>
        {Object.keys(PARAM).map(p => (
          <button key={p} className={`pub-chip ${param === p ? "on" : ""}`} onClick={() => setParam(p)}>{tr(PARAM[p].label)}</button>
        ))}
        <span className="pub-layer-id">{layerSlug}</span>
      </div>

      <div className="pub-grid">
        {/* 1. PostGIS */}
        <div className="pub-card pub-card-wide">
          <div className="pub-card-head"><div className="pub-ic pg"><Icon name="database" size={16} /></div><div><div className="pub-card-title">Simpan ke PostGIS</div><div className="pub-card-sub">Spatial database · PostGIS 3.4</div></div></div>
          <div className="pub-form">
            <label className="pub-field"><span>Schema</span><input value={schema} onChange={e => setSchema(e.target.value)} /></label>
            <label className="pub-field"><span>Tabel</span><input value={table} onChange={e => setTable(e.target.value)} /></label>
            <div className="pub-field-row"><span>SRID</span><b>4326</b><span>Geometri</span><b>Raster + Point</b></div>
          </div>
          <button className={`pub-action ${savedPg ? "done" : ""}`} onClick={savePg} disabled={savingPg || savedPg}>
            {savingPg ? <><span className="pub-spin" /> {tr("Menyimpan…")}</> : savedPg ? <><Icon name="check" size={14} /> {tr("Tersimpan")} · {schema}.{table}</> : <><Icon name="save" size={14} /> {tr("Simpan ke PostGIS")}</>}
          </button>
        </div>

        {/* 3. OGC services */}
        <div className="pub-card pub-card-wide">
          <div className="pub-card-head"><div className="pub-ic ogc"><Icon name="share-2" size={16} /></div><div><div className="pub-card-title">Publikasi OGC Web Services</div><div className="pub-card-sub">GeoServer · standar interoperabilitas</div></div></div>
          <div className="pub-ogc-grid">
            {[
              ["wms", "WMS", "Web Map Service · tile gambar"],
              ["wfs", "WFS", "Web Feature Service · vektor"],
              ["wcs", "WCS", "Web Coverage Service · raster"],
              ["stac", "STAC", "SpatioTemporal Asset Catalog"],
            ].map(([k, name, desc]) => (
              <div key={k} className={`pub-ogc-item ${ogc[k] ? "on" : ""}`}>
                <label className="pub-ogc-toggle">
                  <input type="checkbox" checked={ogc[k]} onChange={e => { setOgc({ ...ogc, [k]: e.target.checked }); setPublished(false); }} />
                  <span className="pub-ogc-name">{name}</span>
                </label>
                <div className="pub-ogc-desc">{desc}</div>
                {ogc[k] && published && (
                  <div className="pub-ogc-url">
                    <code>{ogcUrls[k]}</code>
                    <button className="pub-copy" title={tr("Salin")} onClick={() => navigator.clipboard && navigator.clipboard.writeText(ogcUrls[k])}><Icon name="copy" size={11} /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button className={`pub-action ${published ? "done" : ""}`} onClick={doPublish} disabled={publishing || published}>
            {publishing ? <><span className="pub-spin" /> {tr("Mempublikasikan…")}</> : published ? <><Icon name="check" size={14} /> {tr("Terpublikasi")} · {Object.values(ogc).filter(Boolean).length} {tr("layanan aktif")}</> : <><Icon name="upload-cloud" size={14} /> {tr("Publikasikan Layanan OGC")}</>}
          </button>
          {published && <div className="pub-published-note"><Icon name="check-circle" size={13} /> {tr("Endpoint aktif — bisa dipakai di QGIS, ArcGIS, atau Map Explorer.")}</div>}
        </div>

        {/* 4. Export */}
        <div className="pub-card pub-card-wide">
          <div className="pub-card-head"><div className="pub-ic exp"><Icon name="download" size={16} /></div><div><div className="pub-card-title">Ekspor Data</div><div className="pub-card-sub">Unduh dalam format standar</div></div></div>
          <div className="pub-export-grid">
            {exports.map(x => (
              <button key={x.id} className="pub-export-item" onClick={() => {}}>
                <Icon name={x.icon} size={16} />
                <div className="pub-export-body"><div className="pub-export-label">{x.label}</div><div className="pub-export-desc">{x.desc}</div></div>
                <span className="pub-export-size">{x.size}</span>
                <Icon name="download" size={13} />
              </button>
            ))}
          </div>
        </div>

        {/* 5. Metadata */}
        <div className="pub-card pub-card-wide">
          <div className="pub-card-head"><div className="pub-ic meta"><Icon name="file-text" size={16} /></div><div><div className="pub-card-title">Metadata ISO 19115</div><div className="pub-card-sub">Standar geospasial · auto-generated</div></div></div>
          <div className="pub-meta-grid">
            <div className="pub-meta-row"><span>Judul</span><b>Iklim {kabObj.name} — {tr(PARAM[param].label)} 2026</b></div>
            <div className="pub-meta-row"><span>Produsen</span><b>Badan Informasi Geospasial (BIG)</b></div>
            <div className="pub-meta-row"><span>Sumber</span><b>NASA POWER · BMKG · CHIRPS</b></div>
            <div className="pub-meta-row"><span>CRS</span><b>EPSG:4326 (WGS 84)</b></div>
            <div className="pub-meta-row"><span>Resolusi temporal</span><b>Bulanan (12 langkah)</b></div>
            <div className="pub-meta-row"><span>Lisensi</span><b>Pemerintah RI · internal K/L/D</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TabPublikasi });
