// ============================================================
// Iklim Wilayah — Regional Climate Insight · FITUR 2.0
// Modul induk: Climate Modeling (route "modeling")
// Route: feature-iklim · 4 tab internal (MVP: Ikhtisar + Prediksi)
// Selektor wilayah: Provinsi → Kota/Kab → Kecamatan (§5.1.1)
// Peta: MapLibre nyata (window.MapLibreMap)
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

function IklimWilayah({ ctx, setRoute, openAI }) {
  const REGIONS = window.CLIMATE_REGIONS;
  const DATA = window.CLIMATE_DATA;

  // seed provinsi dari ctx.province bila ada di REGIONS, else sulsel
  const seedProv = (ctx && REGIONS[ctx.province]) ? ctx.province : "sulsel";
  const [tab, setTab] = React.useState("ikhtisar");
  const [prov, setProv] = React.useState(seedProv);
  const [kab, setKab] = React.useState("");
  const [kec, setKec] = React.useState("");
  const [committed, setCommitted] = React.useState(null); // {prov,kab,kec} setelah "Tampilkan"

  // reset kab/kec saat prov berubah
  function onProvChange(v) { setProv(v); setKab(""); setKec(""); setCommitted(null); }
  function onKabChange(v) { setKab(v); setKec(""); }

  const provObj = REGIONS[prov];
  const kabObj = kab ? provObj.kab[kab] : null;
  const canShow = !!kab; // minimum Kota/Kab (§5.1.1)

  function commit() {
    if (!canShow) return;
    setCommitted({ prov, kab, kec });
  }
  // auto-commit jika seed prov punya 1 kota berdata? Tidak — biarkan user pilih (sesuai spec prompt).

  // data aktif
  const activeKab = committed ? committed.kab : null;
  const climate = activeKab && DATA[activeKab] ? DATA[activeKab] : null;

  return (
    <div className="feat-page iklim-page" data-screen-label="Feature: Iklim Wilayah">
      {/* HEAD */}
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>{tr("Iklim Wilayah")}</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="cloud-sun" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.0 · CLIMATE MODELING · REGIONAL INSIGHT</div>
              <h1>{tr("Iklim Wilayah")}</h1>
              <div className="feat-sub">{tr("Lihat, prediksi, dan publikasikan iklim wilayah Anda.")}</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="ghost-btn" onClick={() => setRoute("feature-acm")}><Icon name="layers" size={14} />{tr("Pemodelan Lanjut")} (2.1)</button>
          </div>
        </div>
      </div>

      {/* SELEKTOR WILAYAH (menggantikan Context Bar yang disembunyikan) */}
      <RegionSelector
        REGIONS={REGIONS} prov={prov} kab={kab} kec={kec}
        onProvChange={onProvChange} onKabChange={onKabChange} onKecChange={setKec}
        onShow={commit} canShow={canShow}
      />

      {/* TAB STRIP */}
      <div className="tabs iklim-tabs">
        {[
          { id: "ikhtisar", label: tr("Ikhtisar"), icon: "layout-dashboard" },
          { id: "prediksi", label: tr("Prediksi"), icon: "sparkles" },
          { id: "peta", label: tr("Peta & Layer"), icon: "map" },
          { id: "publikasi", label: tr("Publikasi & Integrasi"), icon: "share-2" },
        ].map(t => (
          <button key={t.id} className={`tab ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <Icon name={t.icon} size={13} /> {t.label}
          </button>
        ))}
      </div>

      {/* KONTEN */}
      {!committed && <RegionPrompt prov={prov} provObj={provObj} canShow={canShow} />}

      {committed && !climate && <NoDataState kabObj={kabObj} setRoute={setRoute} />}

      {committed && climate && tab === "ikhtisar" && (
        <window.TabIkhtisar climate={climate} committed={committed} REGIONS={REGIONS} setTab={setTab} setRoute={setRoute} openAI={openAI} />
      )}
      {committed && climate && tab === "prediksi" && (
        <window.TabPrediksi climate={climate} committed={committed} REGIONS={REGIONS} setTab={setTab} />
      )}
      {committed && climate && tab === "peta" && (
        <window.TabPeta climate={climate} committed={committed} REGIONS={REGIONS} />
      )}
      {committed && climate && tab === "publikasi" && (
        <window.TabPublikasi climate={climate} committed={committed} REGIONS={REGIONS} />
      )}
    </div>
  );
}

// ---------------- Selektor wilayah ----------------
function RegionSelector({ REGIONS, prov, kab, kec, onProvChange, onKabChange, onKecChange, onShow, canShow }) {
  const provObj = REGIONS[prov];
  const kabObj = kab ? provObj.kab[kab] : null;
  const kecList = (kabObj && kabObj.kecLevel) ? kabObj.kec : [];

  return (
    <div className="region-selector">
      <div className="rs-label"><Icon name="map-pin" size={14} /> {tr("WILAYAH")}</div>
      <div className="rs-field">
        <label>{tr("Provinsi")}</label>
        <select value={prov} onChange={e => onProvChange(e.target.value)}>
          {Object.keys(REGIONS).map(k => <option key={k} value={k}>{REGIONS[k].name}</option>)}
        </select>
      </div>
      <Icon name="chevron-right" size={14} className="rs-arrow" />
      <div className="rs-field">
        <label>{tr("Kota/Kabupaten")}</label>
        <select value={kab} onChange={e => onKabChange(e.target.value)}>
          <option value="">{tr("— pilih —")}</option>
          {Object.keys(provObj.kab).map(k => {
            const o = provObj.kab[k];
            return <option key={k} value={k} disabled={!o.data}>{o.name}{!o.data ? " · belum ada data" : ""}</option>;
          })}
        </select>
      </div>
      <Icon name="chevron-right" size={14} className="rs-arrow" />
      <div className="rs-field">
        <label>{tr("Kecamatan")} <span className="rs-opt">({tr("opsional")})</span></label>
        <select value={kec} onChange={e => onKecChange(e.target.value)} disabled={!kabObj || !kabObj.kecLevel}>
          <option value="">{tr("— semua —")}</option>
          {kecList.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
        </select>
      </div>
      <button className={`rs-show ${canShow ? "" : "disabled"}`} onClick={onShow} disabled={!canShow}>
        <Icon name="search" size={14} /> {tr("Tampilkan")}
      </button>
    </div>
  );
}

function RegionPrompt({ prov, provObj, canShow }) {
  return (
    <div className="region-prompt">
      <Icon name="info" size={18} />
      <div>
        <strong>{canShow ? tr("Klik \u201cTampilkan\u201d untuk memuat data iklim.") : tr("Pilih Kota/Kabupaten untuk menampilkan data iklim.")}</strong>
        <div>{tr("Provinsi terpilih")}: <b>{provObj.name}</b>. {tr("Minimal pilih satu Kota/Kabupaten; kecamatan bersifat opsional.")}</div>
      </div>
    </div>
  );
}

function NoDataState({ kabObj, setRoute }) {
  return (
    <div className="iklim-empty">
      <Icon name="cloud-off" size={36} />
      <h3>{tr("Data iklim wilayah belum tersedia")}</h3>
      <p>{kabObj ? kabObj.name : ""} {tr("belum memiliki data iklim ter-ingest. Cakupan data terus diperluas.")}</p>
      <button className="ghost-btn" onClick={() => setRoute("data")}><Icon name="database" size={14} /> {tr("Lihat cakupan data")}</button>
    </div>
  );
}

Object.assign(window, { IklimWilayah });
