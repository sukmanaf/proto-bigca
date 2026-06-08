# What-If Quick Simulator — Analisis Data & Alur Proses

## 1. Ringkasan Fitur

Fitur **5.8 — What-If Quick Simulator** memungkinkan pengguna mengeksplorasi dampak intervensi secara cepat tanpa membangun skenario penuh. Slider di kiri diubah → sistem menghitung ulang → hasil di kanan berubah real-time (debounce ~480ms).

---

## 2. Alur Data (Left → Compute → Right)

```
┌─────────────────────┐        ┌─────────────────────┐        ┌─────────────────────┐
│   KIRI (Input)      │        │   COMPUTE ENGINE    │        │   KANAN (Output)    │
│                     │        │                     │        │                     │
│  Pilih wilayah      │──────► │  computeWhatIf()    │──────► │  Populasi terdampak │
│  [Kab/Kota]         │        │                     │        │  Area banjir (km²)  │
│                     │        │  rainFactor         │        │  Emisi karbon       │
│  Slider params:     │        │  forestFactor       │        │  Composite vuln     │
│  • Curah hujan      │        │  popCompound        │        │                     │
│  • Konversi hutan   │        │  adaptMitigation    │        │  Ringkasan delta    │
│  • Pertumbuhan pop  │        │                     │        │  vs baseline        │
│  • Kapasitas infra  │        │  → popAtRisk        │        │                     │
│                     │        │  → floodKm2         │        │  Interpretasi AI    │
│  Use case cepat     │        │  → carbon           │        │  (teks otomatis)    │
│  (preset buttons)   │        │  → vuln             │        │                     │
└─────────────────────┘        └─────────────────────┘        └─────────────────────┘
                                        ▲
                                        │
                               Data wilayah (seed):
                               basePopRisk, baseFloodKm2,
                               baseVuln, forestHa, areaKm2
```

---

## 3. Formula Komputasi

| Output | Formula |
|--------|---------|
| `rainFactor` | `rainfall ^ 1.4` |
| `forestFactor` | `1 + forestConv × 0.8` |
| `popCompound` | `(1 + popGrowth) ^ 20` *(proyeksi 20 tahun)* |
| `adaptMitigation` | `1 - adapt × 0.35` |
| **Populasi terdampak** | `basePopRisk × (0.45 + 0.55 × rainFactor) × popCompound × adaptMitigation` |
| **Area banjir** | `baseFloodKm2 × rainFactor × forestFactor × adaptMitigation` |
| **Emisi karbon** | `forestHa × forestConv × 0.0021` *(ktCO₂/th)* |
| **Composite vuln** | `baseVuln × (0.62 + 0.24 × rainFactor) × forestFactor × adaptMitigation × 0.86` clamped [0.05, 0.99] |

---

## 4. Data yang Dibutuhkan

### 4.1 Data Wilayah Kabupaten/Kota — `data_wilayah.json`

Setiap kabupaten/kota yang tersedia di dropdown **harus** memiliki field ini:

| Field | Tipe | Mandatory | Keterangan |
|-------|------|-----------|------------|
| `id` | string | Ya | Slug unik, e.g. `"sintang"` |
| `name` | string | Ya | Nama resmi, e.g. `"Kab. Sintang"` |
| `prov` | string | Ya | Singkatan provinsi, e.g. `"Kalbar"` |
| `areaKm2` | number | **Ya** | Luas wilayah dalam km² |
| `forestHa` | number | **Ya** | Total luas hutan dalam ha *(dipakai di formula karbon)* |
| `basePopRisk` | number | Ya | Jumlah populasi di zona rawan (baseline) |
| `baseFloodKm2` | number | Ya | Area banjir historis baseline (km²) |
| `baseVuln` | number (0–1) | Ya | Composite vulnerability index baseline |
| `geometry` | GeoJSON Polygon | Ya | Batas wilayah untuk peta spasial |

### 4.2 Data Polygon Hutan — `data_hutan.json`

Satu kabupaten dapat memiliki beberapa polygon hutan (berbeda tipe/lokasi):

| Field | Tipe | Mandatory | Keterangan |
|-------|------|-----------|------------|
| `id` | string | Ya | Slug unik polygon hutan |
| `kabId` | string | Ya | Foreign key → `data_wilayah.id` |
| `namaHutan` | string | Ya | Nama/kode kawasan hutan |
| `jenisHutan` | string | Ya | e.g. `"Hutan Lindung"`, `"Hutan Produksi"`, `"Hutan Konservasi"` |
| `luasHa` | number | **Ya** | Luas hutan dalam ha |
| `geometry` | GeoJSON Polygon/MultiPolygon | Ya | Batas polygon hutan |

> **Catatan:** Jumlah `luasHa` semua hutan per `kabId` harus konsisten dengan `forestHa` di `data_wilayah.json`.

### 4.3 Data Populasi — `data_populasi.json`

| Field | Tipe | Mandatory | Keterangan |
|-------|------|-----------|------------|
| `kabId` | string | Ya | Foreign key → `data_wilayah.id` |
| `tahun` | number | Ya | Tahun data sensus/proyeksi |
| `totalPopulasi` | number | Ya | Total penduduk kabupaten |
| `popRawan` | number | Ya | Penduduk di zona rawan bencana *(= basePopRisk)* |
| `kepadatan` | number | Ya | Jiwa/km² |
| `growthRateHistoris` | number | Ya | Laju pertumbuhan historis (misal: 0.015 = 1.5%/th) |

---

## 5. Relasi Antar Data

```
data_wilayah.json
  └── id ──────────────────► data_hutan.json (kabId)
  └── id ──────────────────► data_populasi.json (kabId)
  └── forestHa  ◄─ agregat dari data_hutan.json (SUM luasHa per kabId)
  └── basePopRisk ◄─ dari data_populasi.json (popRawan)
```

---

## 6. Kabupaten yang Akan Dibuat (Dummy)

5 kabupaten dummy, dipilih agar representatif secara geografis dan **semua memiliki kawasan hutan**:

| id | Nama | Provinsi | Karakteristik |
|----|------|----------|--------------|
| `sintang` | Kab. Sintang | Kalimantan Barat | Hutan tropis lebat, lahan gambut |
| `wajo` | Kab. Wajo | Sulawesi Selatan | Dataran rendah, hutan mangrove |
| `bone` | Kab. Bone | Sulawesi Selatan | Campuran hutan lindung + produksi |
| `soppeng` | Kab. Soppeng | Sulawesi Selatan | Pegunungan, hutan lindung |
| `belu` | Kab. Belu | NTT | Hutan sabana, hutan lindung kering |

---

## 7. File Data yang Akan Dibuat

```
BIG CA Homepage 2/
  data/
    data_wilayah.json      ← polygon batas kab + field numerik
    data_hutan.json        ← polygon kawasan hutan per kab
    data_populasi.json     ← data populasi + zona rawan
```

---

## 8. Penjelasan Metrik Output

### 8.1 Vuln Dasar (Baseline Vulnerability Index)

Angka **0–1** yang merepresentasikan seberapa rentan suatu wilayah terhadap dampak iklim secara keseluruhan, **sebelum ada perubahan parameter apapun**. Mengacu pada framework IPCC:

```
Vulnerability = Exposure + Sensitivity − Adaptive Capacity
```

| Nilai | Kategori | Interpretasi |
|-------|----------|-------------|
| 0.00 – 0.20 | Sangat Rendah | Infrastruktur kuat, topografi aman, kapasitas adaptasi tinggi |
| 0.20 – 0.40 | Rendah | Risiko ada tapi terkendali |
| 0.40 – 0.60 | Sedang | Perlu perhatian — contoh: Kab. Sintang (0.52) |
| 0.60 – 0.75 | Tinggi | Rentan terhadap gangguan iklim |
| 0.75 – 1.00 | Sangat Tinggi | Prioritas intervensi — contoh: Kab. Wajo (0.84) |

**Komponen penilaian nyata** (untuk data produksi, bukan dummy):
- % penduduk di zona banjir/longsor
- % lahan kritis terhadap total luas
- Kepadatan penduduk di daerah rawan
- Indeks kemiskinan kabupaten
- Akses layanan kesehatan & evakuasi
- Tutupan hutan sebagai penyangga

> Pada data dummy saat ini, nilai `baseVuln` di-set manual. Pada sistem produksi, nilai ini dihitung dari agregasi indikator di atas.

---

### 8.2 Emisi Karbon

Formula:
```
carbon = forestHa × forestConversionRatio × 0.0021   (satuan: ktCO₂/tahun)
```

**Penjelasan angka 0.0021:**
- = **2.1 tCO₂/ha/tahun**
- Merepresentasikan emisi tahunan dari lahan hutan yang dikonversi menjadi perkebunan (sawit)
- Sumber: hilangnya fungsi serapan karbon hutan + dekomposisi biomassa yang tersisa
- Referensi umum: deforestasi tropis melepas 150–400 tCO₂/ha (sekali) + ~2 tCO₂/ha/tahun ongoing

**Contoh Kab. Sintang** (forestHa=87.400, konversi 8%):
```
87.400 × 0.08 × 0.0021 = 14.7 ktCO₂/tahun
```

> Emisi karbon **tidak dipengaruhi curah hujan, populasi, maupun kapasitas adaptif** — hanya oleh slider "Konversi hutan → sawit".

---

### 8.3 Composite Vulnerability

Berbeda dengan *Vuln Dasar* yang statis, **Composite Vulnerability adalah hasil proyeksi** setelah semua parameter slider diterapkan:

```
composite = baseVuln × (0.62 + 0.24 × rainFactor) × forestFactor × adaptMitigation × 0.86
```

Clamp: nilai selalu dalam rentang **[0.05, 0.99]**

**Cara membaca formula:**
| Komponen | Efek |
|----------|------|
| `baseVuln` | Titik awal — kondisi wilayah saat ini |
| `(0.62 + 0.24 × rainFactor)` | Curah hujan tinggi → vulnerability naik |
| `× forestFactor` | Konversi hutan → vulnerability naik (tutupan berkurang) |
| `× adaptMitigation` | Kapasitas infra adaptif → vulnerability turun |
| `× 0.86` | Faktor normalisasi agar skala tetap di [0,1] |

**Perbedaan Vuln Dasar vs Composite:**

| | Vuln Dasar | Composite Vulnerability |
|--|-----------|------------------------|
| Sifat | Tetap (dari data) | Berubah sesuai slider |
| Representasi | Kondisi historis wilayah | Proyeksi kondisi jika parameter berubah |
| Slider mempengaruhi? | Tidak | Ya (rainfall, hutan, adaptasi) |

---

## 9. Catatan Implementasi

- **Data wilayah:** sudah di-load dari `data/data_wilayah.json` (tidak hardcode lagi di `whatif.jsx`).
- **Peta:** sudah menggunakan Leaflet + OSM basemap dengan polygon batas kabupaten real dari Nominatim (~400 titik per kabupaten, WGS84).
- **Formula komputasi:** tetap di React (tidak perlu backend), sudah sesuai spesifikasi awal.
- **Polygon geometry:** koordinat real hasil fetch dari Nominatim OSM, bukan approximate lagi.
