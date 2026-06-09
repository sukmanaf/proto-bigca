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
      makassar:    { name: "Kota Makassar", data: true, lng: 119.4221, lat: -5.1477, kec: [] },
      bone:        { name: "Bone", data: true, lng: 120.3300, lat: -4.5375, kec: [] },
      tana_toraja: { name: "Tana Toraja", data: true, lng: 119.8222, lat: -2.9700, kec: [] },
      maros:       { name: "Maros", data: false, lng: 119.5720, lat: -5.0080, kec: [] },
    },
  },
  jabar: {
    name: "Jawa Barat",
    kab: {
      bandung:   { name: "Kota Bandung", data: true, lng: 107.6098, lat: -6.9147, kec: [] },
      bogor:     { name: "Kota Bogor", data: false, lng: 106.7942, lat: -6.5950, kec: [] },
    },
  },
  diy: {
    name: "DI Yogyakarta",
    kab: {
      yogyakarta: {
        name: "Kota Yogyakarta", data: true, lng: 110.3695, lat: -7.7956, kecLevel: true,
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

// ---- Helper buat seri bulanan realistis ----
function mkSeries(t2m, precip, rh, wind, rad) {
  return MONTHS_ID.map((m, i) => ({
    month: m, t2m: t2m[i], precip: precip[i], rh: rh[i], wind: wind[i], rad: rad[i],
  }));
}

// ---- Kondisi terkini (BMKG) + time-series (NASA POWER 2023) per kota berdata ----
const CLIMATE_DATA = {
  // Makassar — pesisir tropis, sangat musiman (basah Des–Mar, kering Jul–Sep)
  makassar: {
    current: { temp: 27.4, rh: 80.6, rain: 0, wind: 2.9, windDir: 152, cloud: 73, cond: "Berawan", localTime: "2026-06-05 15:00 WITA" },
    normalT2m: 27.1,
    series: mkSeries(
      [27.4, 27.3, 27.6, 27.9, 27.8, 27.0, 26.4, 26.6, 27.5, 28.3, 28.1, 27.6],
      [685, 540, 430, 210, 120, 78, 42, 30, 55, 130, 360, 610],
      [84, 85, 83, 81, 79, 76, 73, 72, 74, 77, 82, 85],
      [3.4, 3.2, 2.8, 2.4, 2.6, 3.1, 3.6, 3.8, 3.5, 2.9, 2.7, 3.1],
      [18.1, 18.6, 19.4, 19.0, 18.2, 17.4, 18.0, 19.6, 20.8, 20.9, 19.2, 18.3]
    ),
  },
  // Bone — pesisir timur, sedikit kurang ekstrem
  bone: {
    current: { temp: 26.8, rh: 82.0, rain: 2, wind: 2.4, windDir: 130, cloud: 68, cond: "Berawan", localTime: "2026-06-05 15:00 WITA" },
    normalT2m: 26.7,
    series: mkSeries(
      [26.9, 26.8, 27.1, 27.4, 27.3, 26.6, 26.0, 26.1, 26.9, 27.6, 27.5, 27.0],
      [320, 300, 340, 380, 420, 360, 280, 210, 180, 220, 300, 360],
      [85, 86, 85, 84, 84, 83, 82, 80, 80, 82, 84, 86],
      [2.8, 2.6, 2.3, 2.1, 2.2, 2.6, 3.0, 3.2, 3.0, 2.5, 2.3, 2.7],
      [17.4, 17.9, 18.6, 18.2, 17.4, 16.8, 17.4, 18.8, 19.9, 20.0, 18.4, 17.6]
    ),
  },
  // Tana Toraja — dataran tinggi, lebih sejuk & basah
  tana_toraja: {
    current: { temp: 22.1, rh: 88.4, rain: 6, wind: 1.6, windDir: 200, cloud: 85, cond: "Hujan Ringan", localTime: "2026-06-05 15:00 WITA" },
    normalT2m: 22.3,
    series: mkSeries(
      [22.0, 21.9, 22.2, 22.6, 22.8, 22.3, 21.8, 22.0, 22.6, 23.0, 22.6, 22.1],
      [410, 380, 420, 460, 430, 350, 280, 250, 300, 390, 470, 450],
      [89, 90, 89, 88, 87, 86, 85, 84, 85, 87, 89, 90],
      [1.8, 1.7, 1.5, 1.4, 1.5, 1.7, 1.9, 2.0, 1.9, 1.6, 1.5, 1.7],
      [16.2, 16.6, 17.2, 16.9, 16.2, 15.6, 16.2, 17.4, 18.4, 18.5, 17.0, 16.4]
    ),
  },
  // Bandung — dataran tinggi, sejuk
  bandung: {
    current: { temp: 23.5, rh: 77.6, rain: 0, wind: 5.4, windDir: 152, cloud: 73, cond: "Berawan", localTime: "2026-06-05 15:00 WIB" },
    normalT2m: 23.2,
    series: mkSeries(
      [23.1, 23.0, 23.4, 23.8, 23.9, 23.3, 22.9, 23.2, 23.8, 24.1, 23.6, 23.2],
      [240, 230, 260, 200, 130, 80, 55, 48, 90, 180, 280, 300],
      [80, 81, 80, 79, 77, 74, 72, 71, 73, 77, 80, 81],
      [5.6, 5.4, 4.8, 4.2, 4.4, 5.0, 5.6, 5.8, 5.4, 4.6, 4.4, 5.2],
      [17.6, 18.0, 18.8, 18.4, 17.8, 17.2, 17.8, 19.0, 20.2, 20.0, 18.4, 17.8]
    ),
  },
  // Yogyakarta — monsoonal, kering Jun–Sep
  yogyakarta: {
    current: { temp: 27.0, rh: 79.0, rain: 0, wind: 3.1, windDir: 110, cloud: 60, cond: "Cerah Berawan", localTime: "2026-06-05 15:00 WIB" },
    normalT2m: 26.8,
    series: mkSeries(
      [26.7, 26.6, 27.0, 27.4, 27.3, 26.7, 26.2, 26.5, 27.2, 27.9, 27.6, 27.0],
      [310, 290, 280, 180, 95, 42, 18, 12, 38, 140, 260, 330],
      [83, 84, 82, 80, 78, 74, 70, 68, 71, 76, 81, 83],
      [3.2, 3.0, 2.7, 2.4, 2.6, 3.1, 3.5, 3.8, 3.5, 2.9, 2.6, 3.0],
      [18.4, 18.8, 19.4, 19.0, 18.4, 17.8, 18.6, 19.8, 20.8, 20.6, 19.0, 18.4]
    ),
  },
};

// ---- Zonal stats kecamatan Yogyakarta (RDTR) — untuk choropleth & Tab Peta ----
const YOGYA_KEC_STATS = [
  { code: "gondokusuman", name: "Gondokusuman", t2m: 27.6, rain: 142 },
  { code: "mergangsan",   name: "Mergangsan",   t2m: 27.4, rain: 138 },
  { code: "umbulharjo",   name: "Umbulharjo",   t2m: 27.8, rain: 130 },
  { code: "jetis",        name: "Jetis",        t2m: 27.3, rain: 145 },
  { code: "wirobrajan",   name: "Wirobrajan",   t2m: 27.5, rain: 140 },
  { code: "kotagede",     name: "Kotagede",     t2m: 27.9, rain: 126 },
  { code: "danurejan",    name: "Danurejan",    t2m: 27.4, rain: 143 },
  { code: "gedongtengen", name: "Gedongtengen", t2m: 27.5, rain: 141 },
];

// ---- Task ML untuk Tab Prediksi ----
const ML_TASKS = [
  { id: "uc1", code: "UC-1", name: "Klasifikasi Kondisi Cuaca", type: "klasifikasi", model: "RandomForest", unit: "kelas" },
  { id: "uc2", code: "UC-2", name: "Prediksi Suhu Bulanan (t2m)", type: "regresi", model: "XGBoost/LightGBM", unit: "°C" },
  { id: "uc3", code: "UC-3", name: "Prediksi Curah Hujan", type: "regresi", model: "LightGBM/Prophet", unit: "mm/bln" },
];

Object.assign(window, {
  CLIMATE_REGIONS, CLIMATE_DATA, YOGYA_KEC_STATS, ML_TASKS, MONTHS_ID,
});
