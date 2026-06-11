// ============================================================
// climate-data.jsx — Mock data realistis untuk Iklim Wilayah (FITUR 2.0)
// Sumber yang ditiru: BMKG (kondisi terkini), NASA POWER (time-series bulanan 2023),
// CHIRPS (hujan), RDTR Yogyakarta (zona kecamatan).
// 3 level: Provinsi → Kota/Kab → Kecamatan (tanpa desa). Lihat §5.1.1 & §6.3.
// ============================================================

const MONTHS_ID = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

// ---- Daftar wilayah (selektor) ----
// data: ada/tidaknya data iklim. kecLevel: granularitas kecamatan lengkap.
const CLIMATE_REGIONS = {
  sulsel: {
    name: "Sulawesi Selatan",
    kab: {
      makassar:    { name: "Kota Makassar", data: true, locationLabel: "Makassar", lng: 119.4221, lat: -5.1477, kec: [] },
      bone:        { name: "Bone",          data: true, locationLabel: "Bone",     lng: 120.3300, lat: -4.5375, kec: [] },
      tana_toraja: { name: "Tana Toraja",   data: true, locationLabel: "Toraja",   lng: 119.8222, lat: -2.9700, kec: [] },
      maros:       { name: "Maros",         data: false, locationLabel: null,      lng: 119.5720, lat: -5.0080, kec: [] },
    },
  },
  jabar: {
    name: "Jawa Barat",
    kab: {
      bandung:   { name: "Kota Bandung", data: true,  locationLabel: "Bandung", lng: 107.6098, lat: -6.9147, kec: [] },
      bogor:     { name: "Kota Bogor",   data: false, locationLabel: null,      lng: 106.7942, lat: -6.5950, kec: [] },
    },
  },
  diy: {
    name: "DI Yogyakarta",
    kab: {
      yogyakarta: {
        name: "Kota Yogyakarta", data: true, locationLabel: "Yogya_C", lng: 110.3695, lat: -7.7956, kecLevel: true,
        kec: [
          { code: "gondokusuman", name: "Gondokusuman", lng: 110.3840, lat: -7.7830 },
          { code: "mergangsan",   name: "Mergangsan",   lng: 110.3720, lat: -7.8160 },
          { code: "umbulharjo",   name: "Umbulharjo",   lng: 110.3890, lat: -7.8190 },
          { code: "jetis",        name: "Jetis",        lng: 110.3650, lat: -7.7790 },
          { code: "wirobrajan",   name: "Wirobrajan",   lng: 110.3520, lat: -7.8010 },
          { code: "kotagede",     name: "Kotagede",     lng: 110.3990, lat: -7.8270 },
          { code: "danurejan",    name: "Danurejan",    lng: 110.3720, lat: -7.7900 },
          { code: "gedongtengen", name: "Gedongtengen", lng: 110.3600, lat: -7.7920 },
        ],
      },
    },
  },
  // Provinsi tanpa data (untuk demonstrasi state "belum tersedia")
  papua:   { name: "Papua", kab: { jayapura: { name: "Kota Jayapura", data: false, lng: 140.7181, lat: -2.5337, kec: [] } } },
  ntt:     { name: "Nusa Tenggara Timur", kab: { kupang: { name: "Kota Kupang", data: false, lng: 123.6075, lat: -10.1772, kec: [] } } },
};

// CLIMATE_DATA dihapus — semua data historis kini diambil dari DB via API:
// - Time-series: GET /v1/climate/series/{location_label}
// - Kondisi terkini: GET /v1/sample/weather?lat=...&lon=...
// - Grid provinsi: GET /v1/climate/stations/{prov}
// - UC-5 risk zones: GET /v1/risk/zones
// YOGYA_KEC_STATS dihapus — diganti fetch di iklim-peta.jsx

// ---- Task ML untuk Tab Prediksi ----
const ML_TASKS = [
  { id: "uc1", code: "UC-1", name: "Klasifikasi Kondisi Cuaca", type: "klasifikasi", model: "RandomForest", unit: "kelas" },
  { id: "uc2", code: "UC-2", name: "Prediksi Suhu Bulanan (t2m)", type: "regresi", model: "XGBoost/LightGBM", unit: "°C" },
  { id: "uc3", code: "UC-3", name: "Deteksi Anomali / QC", type: "anomali", model: "Rule+IsolationForest", unit: "score" },
];

Object.assign(window, {
  CLIMATE_REGIONS, ML_TASKS, MONTHS_ID,
});
