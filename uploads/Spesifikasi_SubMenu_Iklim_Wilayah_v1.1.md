# SPESIFIKASI SUB-MENU "IKLIM WILAYAH"
## Regional Climate Insight, Prediction & Layer — BIGCA Climate Action Platform

| | |
|---|---|
| **Kode Fitur** | FITUR 2.0 |
| **Route prototype** | `feature-iklim` |
| **Plugin** | `bcp-climate-insight` |
| **Versi dokumen** | **v1.1 (8 Juni 2026)** — disesuaikan dengan struktur prototype nyata |
| **Status** | Draft spesifikasi siap-bangun |
| **Modul induk** | Climate Modeling (route `modeling`) · sidebar "Pemodelan Iklim" |
| **Turunan dari** | PRD v2.0 · Katalog Fitur v2.2 · Rancangan Halaman Utama v1.1 · Prototype `BIG CA Homepage 2` |
| **Penyusun** | Tim UI/UX BIGCA — Webgis Indonesia PT JV Hexsa Indotech |

---

## 0. Ringkasan Eksekutif

**Iklim Wilayah** adalah fitur *front-door* iklim yang ringan & persona-aware: pengguna memilih wilayah (**Provinsi → Kota/Kab → Kecamatan**), platform **menarik data iklim/cuaca otomatis dari basis data (PostGIS)**, menampilkannya sebagai **ikhtisar + time-series**, menjalankan **model machine-learning** untuk **prediksi cuaca/iklim**, men-**spasialkan** hasilnya jadi **layer peta**, lalu **menyimpan ke PostGIS** dan **mempublikasikannya sebagai layanan OGC (WMS/WFS/WCS) + STAC** agar **bisa dikonsumsi aplikasi lain (GeoVertix, QGIS, ArcGIS)** dalam satu klik.

Fitur ini menutup celah UX: kapabilitas iklim (FITUR 2.1 Advanced Climate Modeling) saat ini ter-frame sebagai alat *modeling* kelas-peneliti dan terkubur sebagai 1 dari beberapa fitur. Iklim Wilayah menjadi pintu konsumsi-data + prediksi cepat untuk semua persona — **tanpa** menambah menu top-level baru dan **tanpa** menggeser identitas BIGCA sebagai platform analisis multi-parameter.

> **Ruang lingkup penting (§13):** fitur melakukan ML pada **data observasi/reanalysis yang sudah di-ingest** untuk analisis & perencanaan dan memberi makan modul risiko hilir. Ini **bukan** layanan prakiraan operasional pengganti BMKG; prakiraan resmi BMKG **dikonsumsi sebagai sumber data**. Framing ini menjaga kepatuhan TOR (*"integrate, not replace"*).

### 0.1 Hasil Review Kesesuaian dengan Prototype (koreksi v1.0 → v1.1)
Setelah menelaah kode `app.jsx`, `dashboard.jsx`, `shell.jsx`, `data.jsx`, dan `menu-tree.json`:

| # | Aspek | Kondisi v1.0 (keliru) | Koreksi v1.1 (sesuai prototype) |
|---|-------|-----------------------|----------------------------------|
| K-1 | **Routing** | route `iklim-wilayah` (akan diperlakukan *module landing*) | **`feature-iklim`** — mengikuti pola `feature-*` di `app.jsx` |
| K-2 | **Context Bar** | diasumsikan tetap tampil & auto-fill wilayah | `app.jsx` **menyembunyikan Context Bar** di route `feature-*` → **selektor wilayah dipindah ke dalam halaman fitur**; provinsi di-seed dari `ctx.province` |
| K-3 | **Widget Home** | "Zona 4b" (tidak ada) | Home nyata = `hero-row → quick-zone → KPI → two-col(RiskMap·Activity) → ModuleGrid`. Widget jadi **`<section className="zone">` baru** setelah two-col |
| K-4 | **Quick Action** | "chip ditambahkan" (umum) | Mekanisme nyata = **array `quickActions` per persona** → tambah item `{icon,label,route:"feature-iklim"}` |
| K-5 | **Module & breadcrumb** | route modul "climate" | Route modul Climate = **`modeling`** (count **8**); breadcrumb `Beranda › Climate Modeling(modeling) › Iklim Wilayah` |
| K-6 | **URL** | `/iklim/wilayah/...` seolah aktif di prototype | Prototype **tanpa React Router** (state `route`). URL bersifat **aspiratif untuk produksi** (Rancangan §4.3); di prototype = `feature-iklim` + state tab internal |
| K-7 | **Selektor wilayah** | sampai **Desa/Kelurahan** | **Dihapus Kel/Desa.** Hanya **Prov → Kota/Kab → Kec**; minimal **Kota/Kab** (lihat §5.1.1) |
| K-8 | **Data/provinsi** | tak menyebut DIY | **DIY/Yogyakarta belum ada di `PROVINCES`** padahal datanya ada → **wajib ditambahkan**; granularitas **kecamatan saat ini hanya lengkap untuk Yogyakarta** |

> Kesimpulan review: **konsep, isi panel, sumber data, dan strategi publikasi pada v1.0 sudah tepat**; yang perlu dikoreksi adalah **mekanisme penempatan teknis pada homepage** (routing, context bar, widget, quick action, breadcrumb) dan **logika selektor wilayah + ketersediaan data**. Semua sudah diperbaiki di v1.1.

### 0.2 Changelog v1.0 → v1.1
- Selektor wilayah: **Prov → Kota/Kab → Kec** (Kel/Desa dihapus) + aturan minimal Kota/Kab (§5.1.1).
- Routing & penempatan homepage disesuaikan ke struktur nyata (§3, §12).
- Data: tambah **DIY/Yogyakarta**; matriks ketersediaan data per level (§6.3).
- Wireframe Tab Ikhtisar & widget Home diperbarui.

---

## 1. Penamaan

| Elemen | Nilai |
|--------|-------|
| **Label sidebar (ID)** | **Iklim Wilayah** |
| **Judul lengkap (ID)** | Iklim Wilayah — Insight, Prediksi & Layer Iklim |
| **Label (EN)** | Regional Climate Insight |
| **Ikon (lucide)** | `cloud-sun` |
| **Tagline** | "Lihat, prediksi, dan publikasikan iklim wilayah Anda." |

**Alasan:** menekankan *berbasis wilayah terpilih* + *iklim*; menghindari label "Cuaca/Weather" agar tidak menyiratkan layanan prakiraan operasional (mandat BMKG). Kata "Cuaca" hanya muncul sebagai *task* ML di dalam tab Prediksi.

**Alternatif:** "Pusat Iklim Wilayah" · "Wawasan Iklim" · "Studio Iklim Wilayah".

---

## 2. Landasan TOR / PRD / Katalog

| Sumber | Acuan | Relevansi |
|--------|-------|-----------|
| TOR Annex 6 §1.2.2 #5 | Output: Interactive Maps, Dashboards, Reports | Tab Ikhtisar & Peta |
| TOR Annex 6 §1.2.2 #6 | RESTful API, WMS/WFS/WCS, Data Streams | Tab Publikasi |
| TOR §2.b | interoperabilitas dgn BMKG Climate Early Warning & Projections | Sumber data BMKG |
| TOR Annex 6 §1.3.b.1.a | BMKG projection, ensemble, LCZ, microclimate | Hubungan ke FITUR 2.1 |
| TOR Annex 6 §1.3.d | Predictive Modeling, Anomaly, NLP query, XAI | Mesin ML (Tab Prediksi) |
| TOR Annex 6 §1.2.3 #2 | OGC + ISO 19115 + One Data; validasi + lineage | Publikasi & metadata |
| PRD FR-OV / FR-API / FR-AI | Maps/Dashboards; REST+OGC; Predictive+XAI | Seluruh fitur |
| Katalog FITUR 2.1 | "fondasi bagi semua modul analitik lain"; suhu/hujan/angin, time-series, proyeksi | Iklim Wilayah = konsumsi & extend 2.1 |
| Rancangan v1.1 §2 | 8 prinsip (Map-First, Persona-Aware, Progressive Disclosure, Always-On AI, GeoVertix-Transparent, Bilingual) | Desain UI |

---

## 3. Penempatan di Homepage / Information Architecture (disesuaikan prototype)

### 3.1 Lokasi pasti
```
Climate Action Platform
└── Climate Modeling   (modul; route "modeling"; sidebar "Pemodelan Iklim"; count 8→9)
      ├── ★ 2.0  Iklim Wilayah   ← FITUR BARU; kartu PERTAMA di module landing; route "feature-iklim"
      │     └── Tab internal: Ikhtisar · Prediksi · Peta & Layer · Publikasi & Integrasi
      ├── 2.1  Advanced Climate Modeling   (feature-acm; tetap, deep/researcher)
      ├── 2.2  LULC Change Detection (feature-lulc)
      ├── 2.3  Net Carbon Footprint (feature-carbon)
      ├── 2.4  Biodiversity Mapping (feature-bio)
      ├── 2.5  Sea Level Rise & Subsidence (feature-slr)
      ├── 2.6  Flood & Drought Modeling (feature-flood)
      ├── 11.1 Hindcasting (feature-hindcast) · 11.2 Model Monitor (feature-modelmon)
      └── 12.3 Model Compression
```
**Keputusan:** ditempatkan **di dalam modul Climate Modeling sebagai FITUR 2.0** — kartu pertama / *entry point* modul. **Bukan** menu top-level baru (IA tetap 10 modul). FITUR 2.1 yang berat tetap untuk peneliti; FITUR 2.0 jadi pintu ringan semua persona.

> Opsional: ganti nama modul "Pemodelan Iklim" → "Pemodelan Iklim & Lingkungan" (karena memuat 2.3 Carbon, 2.4 Biodiversity). Tidak wajib.

### 3.2 Routing (prototype vs produksi)
| Lapisan | Nilai |
|---------|-------|
| **Prototype (state `route`)** | `route === "feature-iklim"` → render `<window.IklimWilayah ctx={ctx} setRoute={setRoute} openAI={…} />`. Tab = state internal (`useState`), **bukan** URL. |
| **Produksi (Rancangan §4.3)** | `/iklim/wilayah/{ikhtisar\|prediksi\|peta\|publikasi}` + query `?prov=&kab=&kec=&task=&bulan=` (shareable). |

> Catatan: `app.jsx` baris ~37 menyembunyikan `<ContextBar/>` untuk route `feature-*`. Maka **selektor wilayah ada di dalam halaman fitur** (provinsi awal di-seed dari `ctx.province`).

### 3.3 Breadcrumb (mengikuti pola `data.jsx`)
```
Beranda(dashboard)  ›  Climate Modeling(modeling)  ›  Iklim Wilayah  ›  [Tab aktif]
```

### 3.4 Perubahan `menu-tree.json`
Tambahkan sebagai `children[0]` pada modul **Climate Modeling**, dan naikkan `count` modul **8 → 9**:
```json
{
  "code": "2.0",
  "name": "Iklim Wilayah",
  "name_en": "Regional Climate Insight",
  "emoji": "cloud-sun",
  "route": "feature-iklim",
  "tagline": "Lihat, prediksi, dan publikasikan iklim wilayah",
  "tabs": ["Ikhtisar","Prediksi","Peta & Layer","Publikasi & Integrasi"]
}
```

### 3.5 Lima titik akses dari Halaman Utama (sesuai struktur nyata)
1. **Widget "Snapshot Iklim Wilayah"** — `<section className="zone">` **baru** yang disisipkan di `dashboard.jsx` **tepat setelah** zona `two-col` (RiskMap·Activity), sebelum `ModuleGrid`. Membaca provinsi pada `ctx`. Tombol "Buka Iklim Wilayah →" → `setRoute("feature-iklim")`.
2. **Quick Action** — tambah item ke array `quickActions` (per persona, di `data.jsx`): `{ icon: "cloud-sun", label: "Iklim Wilayah", route: "feature-iklim" }`. Untuk P3 tambah `{ icon:"sparkles", label:"Prediksi Iklim", route:"feature-iklim", tab:"prediksi" }`.
3. **Global Search (⌘K)** — daftarkan entri "Iklim Wilayah", "Prediksi Suhu", "Prediksi Cuaca", "Layer Iklim" → `setRoute("feature-iklim")` (+ tab).
4. **AI Assistant (⌘I)** — pertanyaan "prediksi suhu Makassar Juli" memicu MCP tool `predict_climate` → jawaban + tombol "Tampilkan sebagai layer" (§9.6).
5. **Module Grid / Sidebar** — tile **Pemodelan Iklim** → module landing `modeling` → FITUR 2.0 = kartu pertama → `feature-iklim` (1–2 klik dari Home).

### 3.6 Wireframe widget Home (zona baru, ≤ kolom RiskMap)
```
+----------------------------------------------------------+
|  Snapshot Iklim · Sulawesi Selatan          [ ringkas v ]|
+----------------------------------------------------------+
|  Suhu rata-rata    Hujan (bln ini)   Kondisi terkini     |
|     27.4 C            186 mm           Berawan            |
|   .-^^-.__.-^^-.  (sparkline t2m 12 bln)                  |
|  Sumber: NASA POWER · BMKG  ·  fresh 23m lalu            |
|                              [ Buka Iklim Wilayah -> ]    |
+----------------------------------------------------------+
```
> Jika provinsi pada `ctx` belum punya data (mis. Papua), widget menampilkan: "Data iklim wilayah belum tersedia — [Lihat cakupan data]".

---

## 4. Persona & Hak Akses

| Persona | Akses tab | Perilaku khas |
|---------|-----------|---------------|
| P1 Eksekutif | Ikhtisar (utama), Peta (lihat) | snapshot 1 layar, export PDF; tab Prediksi disembunyikan default |
| P2 Planner | semua (Ikhtisar, Prediksi, Peta, Publikasi) | prediksi → overlay RDTR → publikasi WMS untuk tim RDTR |
| P3 Researcher | semua + MLOps | train/validate, batch/grid predict, export NetCDF/COG, WCS, hindcast |
| P4 Swasta | Ikhtisar, Prediksi (tier), Peta, Publikasi (tier) | kuota prediksi & layer terbatas; export tier |
| P5 Publik | Ikhtisar (read-only layer publik) | hanya layer "public"; tanpa prediksi/publish |

Mengikuti FITUR 9.1 (Auth multi-tier, ABAC spatial) & Rancangan §3.6.

---

## 5. Struktur Tab & Kandungan

Satu halaman fitur (`feature-iklim`) dengan **4 tab internal** (pola "hero + actions + tab strip + konten", konsisten dgn halaman fitur lain di prototype). Di atas konten ada **selektor wilayah** (menggantikan Context Bar yang disembunyikan).

### 5.1 Tab A — Ikhtisar (Overview) · konsumsi-data

#### 5.1.1 Logika & aturan SELEKTOR WILAYAH (sesuai permintaan)
Tiga tingkat saja: **Provinsi → Kota/Kabupaten → Kecamatan**. **Tidak ada Kelurahan/Desa.**

| Kondisi pilihan | Perilaku |
|-----------------|----------|
| Hanya **Provinsi** | **Belum cukup.** Tampilkan prompt: *"Pilih Kota/Kabupaten untuk menampilkan data iklim."* + dropdown Kota/Kab tersorot. Data **belum** dirender. |
| **Provinsi + Kota/Kab** | **Cukup (minimum).** Data dirender pada **tingkat Kota/Kab** (titik BMKG/NASA POWER pada kota tsb, atau titik terdekat). Kecamatan **opsional**. |
| **Provinsi + Kota/Kab + Kecamatan** | Data dirender pada **tingkat Kecamatan** bila tersedia (mis. Yogyakarta: RDTR + grid). Jika kecamatan belum berdata → fallback ke tingkat Kota/Kab + badge *"data kecamatan belum tersedia"*. |

- Kecamatan bersifat **opsional** (boleh dikosongkan).
- Provinsi awal **di-seed** dari `ctx.province` (global), tapi bisa diganti dalam halaman.
- Dropdown menandai opsi tanpa data (disabled / label "belum ada data") berbasis matriks §6.3.

#### 5.1.2 Isi panel
1. **Selektor wilayah** (Prov → Kota/Kab → Kec) dengan aturan §5.1.1.
2. **Kartu kondisi terkini** (BMKG): suhu, kelembaban, curah hujan, angin (kec+arah), tutupan awan, waktu lokal, kondisi (mis. "Berawan").
3. **Time-series historis** (NASA POWER bulanan + CHIRPS hujan): line/bar 12 bulan untuk T2M, hujan, RH, radiasi, angin; toggle parameter; band normal/anomali.
4. **Climatology normals**: rata-rata, min/maks, percentile.
5. **Mini-map** wilayah + titik stasiun/grid; klik titik → time-series titik.
6. **Aksi:** `[Prediksi →]` `[Lihat di Peta →]` `[Export PDF]` `[Jelaskan ini (AI)]`.

#### 5.1.3 Wireframe (selektor 3 tingkat)
```
+--------------------------------------------------------------------------+
| WILAYAH:  Provinsi [Sulawesi Selatan v]  Kota/Kab [Makassar v]           |
|           Kecamatan (opsional) [ — semua — v]            [ Tampilkan ]    |
+--------------------------------------------------------------------------+
| > Pilih Kota/Kabupaten untuk menampilkan data  (muncul bila prov saja)   |
+--------------------------------------------------------------------------+
| KONDISI TERKINI (BMKG · 2026-06-05 15:00)                                 |
|  Suhu 27.4C | RH 80.6% | Hujan 0 mm | Angin 2.9 m/s 152 | Awan 73% |Berawan|
+----------------------------------------+---------------------------------+
| TIME-SERIES (NASA POWER 2023, bulanan) |  PETA WILAYAH                    |
|  [(o)Suhu ( )Hujan ( )RH ( )Radiasi]   |   [ peta titik stasiun + grid ]  |
|   28 |      .-.                          |    o Makassar  o Bone           |
|   27 |   .--' '-.   .                    |    o Toraja                     |
|   26 | .-'       '--' '-.                |   klik titik -> time-series     |
|      +J F M A M J J A S O N D            |                                 |
|  Normal 27.1C · Anomali +0.3C           |                                 |
+----------------------------------------+---------------------------------+
| [ Prediksi -> ]  [ Lihat di Peta -> ]  [ Export PDF ]  [ Jelaskan ini ]  |
+--------------------------------------------------------------------------+
```

### 5.2 Tab B — Prediksi (ML) · workbench (sesuai screenshot UC-1/UC-2)
**Dua mode:**
- **Mode Titik** — form auto-isi dari DB ("data terisi otomatis dari DB"), boleh diedit, lalu Prediksi (= UC-1 & UC-2 pada gambar). Selektor wilayah memakai aturan §5.1.1 (sampai Kota/Kab atau Kec).
- **Mode Area/Spasial** — prediksi pada **grid** atau **centroid zona RDTR** untuk seluruh Kota/Kab → menghasilkan layer (ke Tab Peta).

| Task ML | Tipe | Input | Output | Model awal |
|---------|------|-------|--------|------------|
| UC-1 Klasifikasi Kondisi Cuaca | klasifikasi | suhu, RH, angin, arah, awan, waktu, lat/lon | kelas (Cerah/Berawan/Hujan…) + prob | RandomForest/XGBoost |
| UC-2 Prediksi Suhu Bulanan (t2m) | regresi | lokasi, bulan, RH, angin, radiasi, koordinat | t2m (°C) + interval | XGBoost/LightGBM |
| UC-3 Prediksi Curah Hujan (usul) | regresi | bulan, koordinat, ENSO/IOD, RH, T2M | mm/bulan + kategori | LightGBM/Prophet |
| UC-4 Tren/Forecast TS (usul) | TS | seri historis titik | proyeksi 1–12 bln + CI | Prophet/ARIMA/LSTM |

```
+------------------- Mode: (o) Titik  ( ) Area/Grid -------------------------+
| Task ML: [ UC-1 Klasifikasi Kondisi Cuaca         v ]   [ Auto-isi DB ~ ] |
+----------------------------------------+---------------------------------+
| PARAMETER (auto dari DB, bisa diedit)  |  HASIL                          |
|  Provinsi [Jawa Barat v] Kota [Bandung v]|  Prediksi: +---------------+   |
|  Kecamatan (opsional) [ — semua — v]    |            |   BERAWAN     |   |
|  Suhu 23.5  RH 77.6  Angin 5.4  Arah 152|            |  prob 0.78    |   |
|  Awan 73.6  Waktu 2026-06-05 15:00      |            +---------------+   |
|  Lat -6.902  Lon 107.5794               |  XAI (SHAP): awan ### RH ##    |
|         [   PREDIKSI CUACA   ]          |  Data: Makassar / Bandung …    |
+----------------------------------------+---------------------------------+
| [ Simpan hasil ]  [ Jadikan Layer -> Peta ]  [ Tambah ke batch grid ]     |
+--------------------------------------------------------------------------+
```

### 5.3 Tab C — Peta & Layer (Spatial)
1. **Peta MapLibre** dengan layer hasil: **titik** (POINT) dan/atau **permukaan kontinu** (raster interpolasi).
2. **Interpolasi titik→raster**: **IDW** / **Ordinary Kriging** / **Regression-Kriging** (kovariat DEM/LST). Output **COG**.
3. **Overlay RDTR**: tumpang-susun zona kecamatan (MULTIPOLYGON) → **zonal statistics** (mean/maks per kecamatan) → tabel + choropleth. *(Lengkap untuk Yogyakarta; wilayah lain menyusul saat data RDTR ditambah.)*
4. **Time slider** (multi-bulan) + **legend** + **styling**.
5. **Inspect**: klik lokasi → nilai + atribut + uncertainty.
6. **Aksi:** `[Publikasikan →]` `[Export GeoTIFF/NetCDF/GeoJSON]`.

```
+--------------------------------------------------------------------------+
| LAYERS                 |                 PETA (MapLibre)                   |
|  [x] Prediksi t2m raster |      [ permukaan suhu interpolasi + titik ]     |
|  [x] Titik stasiun       |        o o o   overlay [] zona RDTR             |
|  [x] Zona RDTR (overlay) |        legend: 24# 26# 28# 30#                  |
|  [ ] CHIRPS hujan        |        time: [ 2023 < ====== > per-bulan ]      |
+------------------------+                                                   |
| INTERPOLASI: (o)IDW ( )Kriging ( )RK   res [0.05 v]   [ Hitung ulang ]     |
| ZONAL STATS (kecamatan): Gondokusuman 27.6C · Mergangsan 27.4C · …         |
+--------------------------------------------------------------------------+
| [ Publikasikan -> ]   [ Export GeoTIFF | NetCDF | GeoJSON | CSV | PNG ]    |
+--------------------------------------------------------------------------+
```

### 5.4 Tab D — Publikasi & Integrasi
1. **Simpan ke PostGIS** (hot tier): tabel titik/zona/raster (COG di object store). Metadata ISO 19115 + lineage.
2. **"Add to GeoVertix"** (1 klik) → `POST /api/v1/layers` (auto-detect geometri/SRID) + style MapLibre.
3. **Publikasi OGC** otomatis: **WMS 1.3.0**, **WFS 2.0**, **WCS 2.0** (raster), **MVT tiles**, **STAC**, **OGC API** — tampilkan URL siap-salin.
4. **Kontrol akses** (privat/organisasi/publik, ABAC + expiry); share-link.
5. **Endpoint API** REST + token/JWT untuk app eksternal.
6. **Versioning** (FITUR 10.5).

```
+--------------------------------------------------------------------------+
| LAYER: ci_t2m_makassar_2026q2   (raster COG · 0.05 · t2m C)               |
| Akses: ( )Privat (o)Organisasi ( )Publik    Expiry [tanpa v]              |
+--------------------------------------------------------------------------+
|  [ Simpan ke PostGIS ]   [ Add to GeoVertix ]   [ Buat versi ]            |
+--------------------------------------------------------------------------+
| ENDPOINT SIAP-PAKAI (salin):                                             |
|  WMS  https://gvx.big.go.id/wms?...&layers=ci_t2m_makassar...            |
|  WFS  https://gvx.big.go.id/wfs?...&typenames=ci_pts_makassar...         |
|  WCS  https://gvx.big.go.id/wcs?...&coverageid=ci_t2m_makassar...        |
|  MVT  https://gvx.big.go.id/tiles/ci_t2m_makassar/{z}/{x}/{y}.pbf        |
|  STAC https://gvx.big.go.id/stac/collections/climate-insight/items/...   |
|  REST https://api.big.go.id/v1/climate-insight/layers/ci_t2m_makassar    |
+--------------------------------------------------------------------------+
| [ Buka di QGIS ]  [ Salin semua URL ]  [ Unduh metadata ISO 19115 ]      |
+--------------------------------------------------------------------------+
```

---

## 6. Sumber Data

### 6.1 Data yang sudah tersedia
| Dataset | Sumber | Parameter | Resolusi | Temporal | Geometri/Format | Lisensi | Peran |
|---------|--------|-----------|----------|----------|-----------------|---------|-------|
| **BMKG** (418 baris) | BMKG | suhu, RH, hujan, angin, awan | titik (Makassar, Bandung, Yogyakarta) | prakiraan 3 hari | PostGIS POINT 4326 | Restricted (MoU) | Kondisi terkini; UC-1 |
| **NASA POWER** (156 baris) | NASA POWER | T2M, radiasi, RH, angin, hujan (7) | 4 lokasi + 9 grid Yogyakarta | bulanan 2023 | PostGIS POINT | Open | Time-series; UC-2 |
| **CHIRPS** (240 baris) | UCSB/CHC | hujan satelit | ~5.5 km, Yogyakarta | bulanan 2023 | PostGIS grid/POINT | Open | Hujan spasial; interpolasi |
| **RDTR** (14 zona) | Pemkot Yogyakarta | batas kecamatan | MULTIPOLYGON | statis | PostGIS MULTIPOLYGON | Gov | Overlay & zonal stats |

**Format:** PostGIS **hot tier** (transform & QC), **SRID 4326/WGS84**, titik=`POINT`, zona=`MULTIPOLYGON`, **GiST index** semua tabel.

### 6.2 Usulan data tambahan
| Dataset | Sumber | Mengapa | Format | Catatan |
|---------|--------|---------|--------|---------|
| **ERA5 / ERA5-Land** *(XArray)* | Copernicus CDS | baseline reanalysis bergrid; **gap-filling & kovariat interpolasi**; sampel **XArray** | NetCDF/Zarr → xarray | ~9–31 km; 1950–kini |
| **CHIRPS full** | UCSB/CHC | perluas hujan ke luar Yogyakarta, deret panjang | GeoTIFF/NetCDF | 0.05°, 1981–kini |
| **BMKG station + Forecast API** | BMKG | kondisi real-time & validasi | CSV/JSON API | perlu key/MoU |
| **DEMNAS / SRTM** | BIG / USGS | kovariat topografi (Regression-Kriging) | GeoTIFF | DEMNAS 8 m |
| **MODIS / Sentinel-3 LST** | NASA/ESA (STAC/GEE) | kovariat suhu permukaan (isi celah spasial) | COG/NetCDF | harian–8-harian |
| **CMIP6 / CORDEX-SEA** | ESGF/CORDEX | sambung ke **skenario masa depan** (link FITUR 2.1) | NetCDF | bersama FITUR 2.1 |
| **Indeks ENSO/IOD (ONI, DMI)** | NOAA/BoM | prediktor & konteks driver | CSV | bulanan |
| **Batas administrasi (BIG)** | BIG | daftar **Kota/Kab & Kecamatan** + agregasi (di luar Yogyakarta) | GeoJSON/SHP | **diperlukan untuk selektor wilayah** |

> **Sampel XArray (Copernicus):** pipeline ingest NetCDF/Zarr → dibaca **xarray** → subset per wilayah → diturunkan ke (a) titik (fitur ML) & (b) raster COG (layer). Ingest via **GeoVertix Import API** (chunked) atau native `bcp-climate-insight`.

### 6.3 Matriks ketersediaan data per level (penting untuk selektor §5.1.1)
| Provinsi | Kota/Kab berdata | Level Kota/Kab | Level Kecamatan |
|----------|------------------|----------------|------------------|
| **Sulawesi Selatan** | Makassar, Bone, Tana Toraja | ✓ BMKG/NASA POWER (titik) | belum (perlu data kec) |
| **Jawa Barat** | Bandung | ✓ BMKG/NASA POWER (titik) | belum |
| **DI Yogyakarta** *(WAJIB ditambah ke `PROVINCES`)* | Kota Yogyakarta | ✓ BMKG/NASA POWER/CHIRPS | **✓ lengkap** (RDTR 14 kec + grid) |
| Provinsi lain (Jatim, NTT, Kalbar, Papua, …) | — | belum | belum |

> Implikasi UI: dropdown menandai Kota/Kab tanpa data; **kecamatan hanya aktif penuh untuk Yogyakarta**. Untuk wilayah lain, pemilihan kecamatan fallback ke tingkat Kota/Kab. Saat data ditambah, matriks ini diperbarui.

### 6.4 Lapisan penyimpanan (hot/warm/cold)
```
RAW (cold)        : NetCDF/GeoTIFF asli (object store / MinIO)       -- lineage source
TRANSFORMED (warm): staging + COG ter-tile                          -- ETL + QC
SERVING (hot)     : PostGIS (POINT/MULTIPOLYGON, GiST) + COG hot     -- query & publish
```

---

## 7. Mesin Machine-Learning

### 7.1 Arsitektur
```
[ Wilayah dipilih (Prov>Kota/Kab>Kec?) ] -> Feature Store (auto-fill PostGIS)
                           |
            +--------------+---------------+
            v                              v
   MODE TITIK (1 lokasi)           MODE AREA (grid/zona)
   features -> model.predict       tiap sel -> model.predict
            |                              |
            v                              v
   nilai + prob/CI                 field nilai -> INTERPOLASI (IDW/Kriging)
            +-----------> XAI (SHAP) <-----+
                           |
                  Hasil -> Tab Peta / Publikasi
```

### 7.2 Model & metode awal
- **Tabular** (UC-1/2/3): RandomForest / **XGBoost** / **LightGBM** (cepat, mudah XAI; sesuai gaya form pada screenshot).
- **Time-series** (UC-4): **Prophet**/ARIMA → LSTM/Transformer (lanjutan).
- **Spasialisasi**: **IDW**, **Ordinary Kriging** (pykrige), **Regression-Kriging** (kovariat DEM/LST).
- **Uncertainty**: interval (quantile/ensemble), variance kriging.
- **XAI**: **SHAP** (link FITUR 6.9).

### 7.3 Penyajian model (dual-path, sadar risiko reuse)
| Path | Kapan | Mekanisme |
|------|-------|-----------|
| A. GeoVertix Inference | bila EE `/inference/*` aktif & dukung model kita | `POST /api/v1/inference/predict` |
| B. Native serving (default) | aman | `bcp-climate-insight` (ONNX + MLflow) via `POST /plugins/climate-insight/run` atau REST internal |

> Mengacu Asumsi Kritis A-04/A-05 (verifikasi `/inference` & model lokal). Default **Path B**.

### 7.4 MLOps
- **Registry** (MLflow), **training** (split + hindcasting FITUR 11.1; RMSE/MAE/skill, F1), **drift** (FITUR 11.2), **lineage** (FITUR 10.2).

---

## 8. Output Layer Spasial

| Output | Geometri/Format | Isi | Disimpan |
|--------|------------------|-----|----------|
| Titik prediksi | `POINT` 4326 | lokasi + nilai + prob/CI + atribut | `bcp_climate_insight.ci_points` |
| Permukaan kontinu | **COG** (+NetCDF) | hasil interpolasi grid | object store + ref PostGIS |
| Zona (choropleth) | `MULTIPOLYGON` | zonal stats per kecamatan RDTR | `bcp_climate_insight.ci_zones` |
| Multi-temporal | layer ber-`time` | dimensi bulan/skenario | kolom `valid_time` |

Styling: ramp suhu biru→merah, hujan putih→biru; style MapLibre via `GET /styles/{id}/maplibre`; legenda + uncertainty.

---

## 9. Penyimpanan, Publikasi & Integrasi (teknis)

### 9.1 Endpoint GeoVertix yang dipakai
| Kebutuhan | Endpoint |
|-----------|----------|
| Ingest NetCDF/XArray besar | `POST /api/v1/import/upload` (chunked) + `GET /import/jobs/{id}/stream` (SSE) |
| Daftarkan tabel PostGIS → layer | `POST /api/v1/layers` |
| Style layer | `POST /api/v1/layers/{id}/styles` · `GET /styles/{id}/maplibre` |
| Time-series titik | `GET /api/v1/layers/{id}/timeseries?lon&lat&field&time_start&time_end` |
| Sampling raster titik | `GET /api/v1/raster/{layer}/point?lon&lat` |
| Layanan OGC | `/wms` · `/wfs` · `/wcs` · `/tiles/{layer}/{z}/{x}/{y}.pbf` · `/stac` · `/ogc/api` |
| Prediksi (opsional) | `POST /api/v1/inference/predict` |
| Batch grid (lama) | `POST /api/v1/plugins/climate-insight/run` + `GET /tasks/{id}/stream` (SSE) |

### 9.2 Pola integrasi (PRD §17.4) → **B/D**
- **B:** konsumsi OGC/Layers/Styles/Raster GeoVertix + tambah logika ML & interpolasi native.
- **D:** ML/interpolasi/feature store di `bcp-climate-insight`; GeoVertix untuk penyajian.

### 9.3 "Add to GeoVertix" (1-klik)
```
Hasil layer (PostGIS/COG)
  -> POST /layers (register)               -> layer_id
  -> POST /layers/{id}/styles (ramp)       -> style aktif
  -> (raster) registrasi COG               -> /raster + /wcs siap
  -> balas { layer_id, wms, wfs, wcs, mvt, stac, rest } -> Tab D
```

### 9.4 Konsumsi aplikasi lain
- **QGIS/ArcGIS:** Add WMS/WFS/WCS via URL `GetCapabilities`.
- **GeoVertix lain / WebGIS:** layer langsung muncul atau via OGC.
- **App pihak ketiga:** REST `…/v1/climate-insight/layers/{id}` + token; STAC untuk discovery.

### 9.5 Keamanan & kedaulatan data
Data tetap di **PostGIS domestik**; hanya input compute dikirim ke GeoVertix bila Path A. Selaras **NFR-SEC-08** & temuan **G-02** (hosting SPBE/PDN). Akses layer RBAC/ABAC; audit tiap publish (FITUR 9.3).

### 9.6 Integrasi AI Assistant (MCP) — link FITUR 6.5/6.7
MCP tools: `get_region_climate(prov, kab, kec?, period)` · `predict_climate(task, prov, kab, kec?, month, features?)` · `publish_climate_layer(result_id, access)`. Query "prediksi suhu Makassar Juli" → `predict_climate` → "26.99 °C" + tombol "Jadikan layer".

---

## 10. User Flows

**Flow 1 — P2 Planner:**
```
Home widget Snapshot -> Buka Iklim Wilayah -> Tab Prediksi (UC-2, prov Sulsel, Kota Makassar, Juli; auto-isi DB)
-> Prediksi t2m 26.99C -> Mode Area grid kota -> Jalankan Spasial (SSE)
-> Tab Peta: IDW + overlay RDTR -> zonal stats -> Tab Publikasi: Add to GeoVertix -> salin WMS
```
**Flow 2 — P3 Researcher (Yogyakarta, kecamatan):**
```
Tab Prediksi -> prov DIY, Kota Yogyakarta, Kec [opsional] -> train (NASA POWER+ERA5) -> hindcast 2023 (RMSE)
-> batch grid -> Kriging (RK+DEM) -> export NetCDF/COG -> publish WCS
```
**Flow 3 — AI:** `⌘I "prediksi suhu Makassar Juli" -> 26.99C -> "Jadikan layer" -> publish`
**Flow 4 — Eksternal:** `Tab Publikasi -> salin WMS -> QGIS Add WMS -> tampil`
**Flow 5 — Selektor:** `Pilih hanya Provinsi -> prompt "pilih Kota/Kab" -> pilih Makassar -> data tampil (kec opsional)`

---

## 11. Arsitektur Teknis & Plugin

### 11.1 Aliran data
```
Sumber (BMKG/NASA POWER/CHIRPS/ERA5/RDTR/BIG admin)
   |  ingest/ETL (xarray, GeoVertix Import / native)
   v
PostGIS hot (POINT/MULTIPOLYGON, GiST) + COG store
   |
   v  Feature Store -> ML (bcp-climate-insight) -> XAI(SHAP)
   |                                |
   |                                v hasil (titik/raster/zona)
   v                                |
GeoVertix: Layers/Styles/Raster/OGC <- (register + publish)
   |
   v  WMS/WFS/WCS/MVT/STAC/REST -> QGIS · GeoVertix lain · App pihak ke-3
```

### 11.2 Pemetaan PRD/plugin
| Aspek | Nilai |
|-------|-------|
| Plugin | `bcp-climate-insight` (Bagian 2 — extension) · port 9300–9399 |
| Schema DB | `bcp_climate_insight.*` |
| Pola reuse | B/D |
| Frontend | `iklim-wilayah.jsx` (`window.IklimWilayah`) · route `feature-iklim` |
| Dependensi | FITUR 2.1, 10.1, 10.5, 11.1/11.2, 6.7, 6.9, 8.1, 9.1 |
| MCP tools | `get_region_climate`, `predict_climate`, `publish_climate_layer` |

---

## 12. Catatan Implementasi pada Prototype `BIG CA Homepage 2`

### 12.1 Berkas baru
- **`iklim-wilayah.jsx`** — komponen `IklimWilayah` (4 tab via `useState`); akhiri dgn `Object.assign(window, { IklimWilayah })`. Pakai `window.tr`, `Icon`, `window.PERSONAS`.
- **`climate-snapshot.jsx`** — `Object.assign(window, { ClimateSnapshot })` untuk widget Home.
- Mock: `mock/climate_bmkg.json`, `mock/climate_nasapower.json`, `mock/climate_chirps.json`, `mock/rdtr_yogya.geojson`, `mock/regions.json` (daftar Prov→Kota/Kab→Kec).

### 12.2 Pengaitan (sentuhan kode tepat)
1. **`app.jsx`** — di blok feature, tambah:
   `{route === "feature-iklim" && <window.IklimWilayah ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />}`
   *(ContextBar sudah otomatis tersembunyi untuk `feature-*` — tidak perlu ubah baris 37.)*
2. **`dashboard.jsx`** — setelah `</section>` zona `two-col` (≈ baris 122), sisipkan:
   `<section className="zone"><window.ClimateSnapshot ctx={ctx} setRoute={setRoute} /></section>`
3. **`data.jsx`** —
   - Tambah **DIY** ke `PROVINCES`: `{ code:"diy", name:"DI Yogyakarta", kabs:5, pop:"3.7jt" }`.
   - Lengkapi data Kota/Kab & Kecamatan (mock `regions.json`) untuk prov berdata.
   - Naikkan `count` modul `modeling` 8→9; tambah kartu FITUR 2.0 (route `feature-iklim`) sebagai item **pertama** daftar fitur modul `modeling`.
   - Tambah item ke `quickActions` persona: `{ icon:"cloud-sun", label:"Iklim Wilayah", route:"feature-iklim" }`.
4. **`menu-tree.json`** — sisipkan node §3.4 (children[0] modul Climate Modeling), count 8→9.
5. **`i18n.jsx`** — kunci ID/EN: `nav.climateInsight`, `ci.tab.*`, label parameter & aksi.

### 12.3 Catatan selektor wilayah
- Komponen selektor membaca `mock/regions.json`. Render aturan §5.1.1: `kab==null` → prompt; `kab` set → render; `kec` opsional.
- Tandai opsi tanpa data berdasarkan §6.3.

---

## 13. NFR, Validasi, Aksesibilitas, Ruang Lingkup
- **Performa:** Ikhtisar < 2 dtk; prediksi titik < 1 dtk; batch grid async (SSE). Cache (Redis).
- **Validasi model:** hindcasting + metrik transparan sebelum publish "authoritative".
- **Aksesibilitas:** WCAG 2.1 AA; ramp ramah buta-warna; chart punya tabel data alternatif.
- **i18n:** ID default, EN toggle (Rancangan §12.5).
- **Ruang lingkup:** prediksi dari **data ter-ingest** untuk analisis/perencanaan; **bukan** pengganti prakiraan operasional BMKG (PRD §7.2). Output prediksi diberi **disclaimer "indikatif/eksperimen"** hingga tervalidasi.

---

## 14. Rencana Implementasi Bertahap
| Tahap | Cakupan | Data | Output |
|-------|---------|------|--------|
| **MVP** | Tab Ikhtisar + Prediksi titik (UC-1, UC-2) + Home widget + Quick Action + selektor Prov→Kota/Kab(→Kec) | BMKG, NASA POWER (eksisting) + **DIY ditambah** | dashboard + prediksi titik + simpan PostGIS |
| **V1** | Tab Peta (IDW + overlay RDTR Yogyakarta) + Publikasi (PostGIS, WMS/WFS, Add to GeoVertix) | + CHIRPS, RDTR | layer titik/zona + OGC |
| **V2** | Ingest **ERA5/XArray**, raster COG + WCS/STAC, Kriging/RK, UC-3/UC-4, MCP tools, drift/hindcast, perluas kecamatan ke kota lain | + ERA5, DEM, LST, ENSO/IOD, admin BIG | raster kontinu + skenario + AI + cakupan luas |

---

## 15. Lampiran

### 15.1 Skema PostGIS (ringkas)
```sql
CREATE TABLE bcp_climate_insight.ci_points (
  id bigserial PRIMARY KEY,
  prov_code text, kab_code text, kec_code text,   -- 3 level (tanpa desa)
  source text, task text, valid_time timestamptz,
  variable text, value double precision, unit text,
  proba double precision, ci_low double precision, ci_high double precision,
  model_ver text, geom geometry(POINT,4326)
);
CREATE INDEX ci_points_gix ON bcp_climate_insight.ci_points USING GIST(geom);

CREATE TABLE bcp_climate_insight.ci_zones (
  id bigserial PRIMARY KEY, kec_code text, task text, variable text,
  valid_time timestamptz, mean_val double precision, min_val double precision,
  max_val double precision, model_ver text, geom geometry(MULTIPOLYGON,4326)
);
CREATE INDEX ci_zones_gix ON bcp_climate_insight.ci_zones USING GIST(geom);

CREATE TABLE bcp_climate_insight.ci_rasters (
  id bigserial PRIMARY KEY, layer_name text UNIQUE, task text, variable text,
  valid_time timestamptz, cog_uri text, bbox geometry(POLYGON,4326),
  res_deg double precision, method text, gvx_layer_id text, iso19115_xml text
);
```

### 15.2 Mock `regions.json` (selektor 3 level)
```json
{
  "sulsel": { "name":"Sulawesi Selatan",
    "kab": { "makassar": {"name":"Kota Makassar","data":true,"kec":[]},
             "bone": {"name":"Bone","data":true,"kec":[]},
             "tana_toraja": {"name":"Tana Toraja","data":true,"kec":[]} } },
  "jabar": { "name":"Jawa Barat",
    "kab": { "bandung": {"name":"Kota Bandung","data":true,"kec":[]} } },
  "diy":   { "name":"DI Yogyakarta",
    "kab": { "yogyakarta": {"name":"Kota Yogyakarta","data":true,
             "kec":["Gondokusuman","Mergangsan","Umbulharjo","Jetis","Wirobrajan","..."] } } }
}
```
> `data:false`/kab kosong → opsi disabled. `kec:[]` → kecamatan fallback ke tingkat kota.

### 15.3 Kontrak REST internal (ringkas)
```http
POST /v1/climate-insight/predict
{ "task":"t2m", "prov":"sulsel","kab":"makassar","kec":null, "month":7,
  "features":{ "rh":80.6,"wind":2.9,"radiation":18.92,"lat":-5.14,"lon":119.42 } }
-> 200 { "value":26.99,"unit":"°C","ci":[26.1,27.8],"model_ver":"t2m-lgbm@1.3",
         "shap":[{"f":"radiation","w":0.41},{"f":"month","w":0.22}] }

POST /v1/climate-insight/predict/spatial   (async)
{ "task":"t2m","prov":"sulsel","kab":"makassar","grid_deg":0.05,"interp":"idw" }
-> 202 { "task_id":"…","stream":"/tasks/{id}/stream" }

POST /v1/climate-insight/publish
{ "result_id":"…","access":"organisasi","add_to_geovertix":true }
-> 200 { "layer_id":"…","wms":"…","wfs":"…","wcs":"…","mvt":"…","stac":"…" }
```

### 15.4 Model Card (template)
```
Nama: t2m-lgbm | Versi: 1.3 | Task: regresi suhu bulanan (°C)
Data latih: NASA POWER 2023 (4 lokasi + grid) + ERA5 kovariat
Fitur: bulan, lat, lon, RH, angin, radiasi, (ENSO/IOD opsional)
Metrik (hold-out): RMSE 0.8°C · MAE 0.6°C · R² 0.86
Validasi historis (hindcast 2023): skill vs klimatologi +0.2
Batasan: berlaku wilayah pilot; status: indikatif (belum authoritative)
```

### 15.5 Daftar periksa MVP
- [ ] `data.jsx`: tambah DIY + `regions.json` + quickActions + kartu FITUR 2.0 + count 8→9
- [ ] `app.jsx`: route `feature-iklim`
- [ ] `iklim-wilayah.jsx` (Tab Ikhtisar + Prediksi) + selektor Prov→Kota/Kab(→Kec) aturan §5.1.1
- [ ] `dashboard.jsx`: sisip `<ClimateSnapshot/>` setelah two-col + chip Quick Action
- [ ] `climate-snapshot.jsx` + i18n ID/EN
- [ ] Prediksi titik UC-1 & UC-2 (auto-isi DB) + simpan PostGIS + disclaimer "indikatif"

---

*v1.1 disesuaikan dengan struktur prototype `BIG CA Homepage 2` (routing `feature-*`, dashboard zones nyata, data.jsx). Selektor wilayah dibatasi Provinsi → Kota/Kab → Kecamatan (Kel/Desa dihapus), minimum Kota/Kab. Sumber data dapat ditambah — sebutkan dataset & sumbernya untuk diperbarui di §6.*
