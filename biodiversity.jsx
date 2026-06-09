// ============================================================
// Climate Modeling — Biodiversity Mapping (Citizen Science) · FITUR 2.4
// Sumber: §2.4 — species distribution + habitat connectivity +
// habitat shift projection + citizen science portal
// ============================================================

const Icon = window.Icon;
const tr = window.tr;

const BIO_SPECIES = [
  { id: "orangutan", emoji: "🦧", name: "Pongo pygmaeus", common: "Orangutan Borneo", iucn: "Critically Endangered", endemic: "Kalimantan", habitat: 23400, shift2050: -28, threat: "Deforestasi, perdagangan", center: [114.0, -0.5], zoom: 7,
    patches: [{ lng: 113.6, lat: -0.4, km2: 14000 }, { lng: 114.7, lat: 0.2, km2: 9400 }], obs: [[113.7,-0.5,"v"],[114.0,-0.2,"v"],[114.6,0.1,"p"],[113.4,-0.7,"v"]] },
  { id: "anoa", emoji: "🐃", name: "Bubalus depressicornis", common: "Anoa Dataran Rendah", iucn: "Endangered", endemic: "Sulawesi", habitat: 8200, shift2050: -22, threat: "Perburuan, konversi lahan", center: [120.3, -2.4], zoom: 7,
    patches: [{ lng: 120.1, lat: -2.5, km2: 5000 }, { lng: 120.7, lat: -2.0, km2: 3200 }], obs: [[120.1,-2.5,"v"],[120.4,-2.3,"v"],[120.7,-2.0,"p"]] },
  { id: "maleo", emoji: "🐦", name: "Macrocephalon maleo", common: "Maleo", iucn: "Critically Endangered", endemic: "Sulawesi", habitat: 4100, shift2050: -34, threat: "Pengambilan telur, habitat loss", center: [121.6, -0.8], zoom: 7,
    patches: [{ lng: 121.4, lat: -0.9, km2: 2600 }, { lng: 122.0, lat: -0.5, km2: 1500 }], obs: [[121.4,-0.9,"v"],[121.7,-0.7,"p"],[122.0,-0.5,"v"]] },
  { id: "cendrawasih", emoji: "🦜", name: "Paradisaea apoda", common: "Cendrawasih Besar", iucn: "Least Concern", endemic: "Papua", habitat: 31200, shift2050: -12, threat: "Perdagangan bulu", center: [138.5, -4.2], zoom: 6.5,
    patches: [{ lng: 138.0, lat: -4.3, km2: 19000 }, { lng: 139.2, lat: -3.8, km2: 12000 }], obs: [[138.0,-4.3,"v"],[138.6,-4.0,"v"],[139.2,-3.8,"p"],[137.6,-4.6,"v"]] },
];

const BIO_OBS = [
  { who: "Andi (Makassar)", species: "Anoa", status: "verified", when: "2 jam lalu", conf: 0.92 },
  { who: "Rina (BRIN)", species: "Maleo", status: "verified", when: "5 jam lalu", conf: 0.88 },
  { who: "Budi (warga)", species: "Orangutan", status: "pending", when: "1 hari lalu", conf: 0.64 },
  { who: "Sari (UNHAS)", species: "Anoa", status: "verified", when: "2 hari lalu", conf: 0.95 },
];

function BiodiversityMapping({ setRoute, ctx, openAI }) {
  const [selected, setSelected] = React.useState("orangutan");
  const [taxa, setTaxa] = React.useState("Mamalia");
  const [filters, setFilters] = React.useState({ endemik: true, terancam: true, cites: false });
  const [period, setPeriod] = React.useState("current");
  const [layers, setLayers] = React.useState({ current: true, future: true, obs: true, koridor: true, refugia: false });

  const sp = BIO_SPECIES.find(s => s.id === selected);

  return (
    <div className="feat-page bio-page" data-screen-label="Feature: Biodiversity Mapping">
      <div className="feat-head">
        <div className="breadcrumb">
          <button onClick={() => setRoute("dashboard")} className="link-btn">{tr("Beranda")}</button>
          <Icon name="chevron-right" size={12} />
          <button onClick={() => setRoute("modeling")} className="link-btn">{tr("Pemodelan Iklim")}</button>
          <Icon name="chevron-right" size={12} />
          <span>Biodiversity Mapping</span>
        </div>
        <div className="feat-head-row">
          <div className="feat-title-block">
            <div className="feat-icon module-modeling"><Icon name="globe" size={24} /></div>
            <div>
              <div className="feat-badge">FITUR 2.4 · CLIMATE MODELING</div>
              <h1>Biodiversity Mapping</h1>
              <div className="feat-sub">Distribusi spesies + konektivitas habitat + proyeksi habitat shift + portal citizen science</div>
            </div>
          </div>
          <div className="feat-actions">
            <button className="ghost-btn" onClick={openAI}><Icon name="bot" size={14} />{tr("Tanya AI")}</button>
            <button className="primary-btn"><Icon name="plus" size={14} />Upload Observasi</button>
          </div>
        </div>
      </div>

      <div className="bio-body">
        <aside className="bio-controls">
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Pencarian</div>
            <div className="bio-search"><Icon name="search" size={14} /><input placeholder="Cari spesies..." /></div>
            <label className="fm-field" style={{ marginTop: 10 }}>
              <span>Taxa</span>
              <select value={taxa} onChange={e => setTaxa(e.target.value)} className="text-input">
                <option>Mamalia</option><option>Aves</option><option>Reptil</option><option>Amfibi</option>
              </select>
            </label>
            <div className="bio-filters">
              {[["endemik","Endemik"],["terancam","Terancam"],["cites","CITES App"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={filters[k]} onChange={e => setFilters({ ...filters, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Layer & Periode</div>
            <div className="fm-radio-col" style={{ gap: 5, marginBottom: 10 }}>
              {[["current","Habitat current"],["future","Habitat 2050"],["obs","Citizen obs"],["koridor","Koridor ekologis"],["refugia","Klimat refugia"]].map(([k, l]) => (
                <label key={k} className="fm-check"><input type="checkbox" checked={layers[k]} onChange={e => setLayers({ ...layers, [k]: e.target.checked })} />{l}</label>
              ))}
            </div>
            <div className="seg-control">
              {[["current","Current"],["2050","2050"],["2070","2070"]].map(([k, l]) => <button key={k} className={`seg-btn ${period === k ? "active" : ""}`} onClick={() => setPeriod(k)}>{l}</button>)}
            </div>
          </div>

          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Spesies prioritas</div>
            <div className="bio-splist">
              {BIO_SPECIES.map(s => (
                <button key={s.id} className={`bio-sp ${selected === s.id ? "on" : ""}`} onClick={() => setSelected(s.id)}>
                  <span className="bio-sp-emoji">{s.emoji}</span>
                  <div className="bio-sp-body"><div className="bio-sp-common">{s.common}</div><div className="bio-sp-iucn">{s.iucn}</div></div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="bio-center">
          <div className="rdtr-map-card">
            <div className="rdtr-map-head">
              <div className="card-title"><Icon name="map" size={14} />Distribusi Habitat · {sp.common}</div>
              <div className="bio-legend">
                <span><span className="sw" style={{ background: "#1B5E3A" }} />Sangat sesuai</span>
                <span><span className="sw" style={{ background: "#88C0A1" }} />Sesuai</span>
                <span><span className="sw" style={{ background: "#C49A6A" }} />Marginal</span>
              </div>
            </div>
            <div className="bio-map-stage"><BioMap sp={sp} layers={layers} period={period} /></div>
          </div>

          <div className="bio-citizen">
            <div className="rdtr-panel-head">Portal Citizen Science
              <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                <button className="ghost-btn small"><Icon name="file-text" size={12} />Riwayat</button>
                <button className="ghost-btn small"><Icon name="target" size={12} />Leaderboard</button>
              </span>
            </div>
            <div className="bio-obs-list">
              {BIO_OBS.map((o, i) => (
                <div key={i} className="bio-obs">
                  <span className={`bio-obs-status ${o.status}`}>{o.status === "verified" ? <Icon name="check-circle" size={14} /> : <Icon name="clock" size={14} />}</span>
                  <div className="bio-obs-body">
                    <div className="bio-obs-who">{o.who} · <strong>{o.species}</strong></div>
                    <div className="bio-obs-meta">{o.status === "verified" ? "Terverifikasi" : "Menunggu review"} · conf {o.conf} · {o.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="bio-right">
          <div className="rdtr-panel bio-detail">
            <div className="bio-detail-head">
              <span className="bio-detail-emoji">{sp.emoji}</span>
              <div><div className="bio-detail-common">{sp.common}</div><div className="bio-detail-sci">{sp.name}</div></div>
            </div>
            <div className="bio-detail-rows">
              <div className="bio-dr"><span className="muted">Status IUCN</span><span className="bio-iucn-badge">{sp.iucn}</span></div>
              <div className="bio-dr"><span className="muted">Status nasional</span><strong>Dilindungi (UU 5/90)</strong></div>
              <div className="bio-dr"><span className="muted">Endemik</span><strong>{sp.endemic}</strong></div>
              <div className="bio-dr"><span className="muted">Habitat suitability</span><strong>{sp.habitat.toLocaleString("id-ID")} km²</strong></div>
              <div className="bio-dr"><span className="muted">Proyeksi 2050</span><strong style={{ color: "var(--danger-700)" }}>{sp.shift2050}%</strong></div>
            </div>
            <div className="bio-threat"><Icon name="alert-triangle" size={12} />Threat: {sp.threat}</div>
            <button className="fm-crosslink" onClick={() => setRoute("feature-rdtr")} style={{ marginTop: 10 }}>
              <Icon name="map" size={14} /><span>Rekomendasi konservasi (RDTR)</span><Icon name="chevron-right" size={12} />
            </button>
          </div>
          <div className="rdtr-panel">
            <div className="rdtr-panel-head">Habitat Shift</div>
            <div className="bio-shift">
              <div className="bio-shift-bar"><div className="bio-shift-now" style={{ width: "100%" }}>Current 100%</div></div>
              <div className="bio-shift-bar"><div className="bio-shift-fut" style={{ width: `${100 + sp.shift2050}%` }}>2050 {100 + sp.shift2050}%</div></div>
            </div>
            <div className="bio-shift-note"><Icon name="info" size={12} />Range contraction {Math.abs(sp.shift2050)}% di bawah {period === "current" ? "SSP2-4.5 2050" : "skenario terpilih"}. Identifikasi climate refugia direkomendasikan.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function BioMap({ sp, layers, period }) {
  const shrink = period === "current" ? 1 : period === "2050" ? (1 + sp.shift2050 / 100) : (1 + sp.shift2050 / 100 * 1.6);
  const view = sp.center ? { center: sp.center, zoom: sp.zoom || 7 } : { center: [120, -2], zoom: 6 };
  const radM = (km2) => Math.sqrt(km2 / Math.PI) * 1000; // km² → radius meter

  const areas = [];
  if (layers.current) {
    sp.patches.forEach((p, i) => {
      areas.push({ lng: p.lng, lat: p.lat, radiusM: radM(p.km2), color: "#1B5E3A",
        fillColor: i === 0 ? "#1B5E3A" : "#88C0A1", fillOpacity: i === 0 ? 0.38 : 0.30, weight: 1,
        tooltip: `Habitat sesuai · ${p.km2.toLocaleString("id-ID")} km²` });
    });
  }
  if (layers.future) {
    sp.patches.forEach((p) => {
      areas.push({ lng: p.lng, lat: p.lat, radiusM: radM(p.km2) * shrink, color: "#C44E37",
        fillOpacity: 0, weight: 2, dash: "6 4", tooltip: `Proyeksi 2050 (${sp.shift2050}%)` });
    });
  }
  if (layers.refugia) {
    areas.push({ lng: sp.patches[0].lng, lat: sp.patches[0].lat + 0.25, radiusM: radM(sp.patches[0].km2) * 0.45,
      color: "#1E6CB5", fillColor: "#1E6CB5", fillOpacity: 0.22, weight: 1, dash: "3 3", tooltip: "Klimat refugia" });
  }

  const lines = [];
  if (layers.koridor && sp.patches.length > 1) {
    lines.push({ coords: [[sp.patches[0].lng, sp.patches[0].lat], [sp.patches[1].lng, sp.patches[1].lat]],
      color: "#5B8C5A", weight: 4, tooltip: "Koridor ekologis" });
  }

  const markers = [];
  if (layers.obs) {
    (sp.obs || []).forEach(([lng, lat, s]) => {
      markers.push({ lng, lat, html: `<div style="width:9px;height:9px;border-radius:50%;background:${s === "v" ? "#0E5A78" : "transparent"};border:2px solid ${s === "v" ? "#fff" : "#C18820"};"></div>`,
        popup: s === "v" ? "Observasi terverifikasi" : "Observasi pending" });
    });
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <window.GeoMap key={sp.id} center={view.center} zoom={view.zoom} basemap="positron" areas={areas} lines={lines} markers={markers} controls={true} />
    </div>
  );
}

Object.assign(window, { BiodiversityMapping });
