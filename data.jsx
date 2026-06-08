// ============================================================
// Mock data — Climate Action Platform v1.1
// Sources: Lampiran F (Mock Data Schemas) from spec
// ============================================================

const PROVINCES = [
  { code: "sulsel", name: "Sulawesi Selatan", kabs: 24, pop: "9.1jt" },
  { code: "jabar", name: "Jawa Barat", kabs: 27, pop: "48.7jt" },
  { code: "jatim", name: "Jawa Timur", kabs: 38, pop: "41.0jt" },
  { code: "ntt", name: "Nusa Tenggara Timur", kabs: 22, pop: "5.5jt" },
  { code: "kalbar", name: "Kalimantan Barat", kabs: 14, pop: "5.5jt" },
  { code: "papua", name: "Papua", kabs: 29, pop: "4.3jt" },
  { code: "all", name: "Seluruh Indonesia", kabs: 514, pop: "275jt" },
];

const SCENARIOS = [
  { id: "ssp1-26", name: "SSP1-2.6", desc: "Sustainability — low emissions" },
  { id: "ssp2-45", name: "SSP2-4.5", desc: "Middle of the road" },
  { id: "ssp3-70", name: "SSP3-7.0", desc: "Regional rivalry" },
  { id: "ssp5-85", name: "SSP5-8.5", desc: "Fossil-fueled development" },
];

const PERIODS = [
  { id: "2025-2030", label: "2025 – 2030 (Short-term)" },
  { id: "2025-2050", label: "2025 – 2050 (Mid-term)" },
  { id: "2025-2100", label: "2025 – 2100 (Long-term)" },
  { id: "history", label: "Histori 1990 – 2024" },
];

// 5 personas — FR-UI-01 PRD
const PERSONAS = {
  P1: { code: "P1", name: "Ahmad Kurnia", role: "Government Decision Maker", org: "Bappenas", title: "Eselon II", color: "#074866" },
  P2: { code: "P2", name: "Budi Pratama", role: "Government Planner", org: "Bappeda Sulsel", title: "Perencana Madya", color: "#0E5A78" },
  P3: { code: "P3", name: "Dr. Rina Sari", role: "Researcher / Academic", org: "BRIN", title: "Peneliti Madya", color: "#6A4C93" },
  P4: { code: "P4", name: "Citra Dewi", role: "Private Sector Analyst", org: "PT Asia Pasifik", title: "Risk Analyst", color: "#2A9D8F" },
  P5: { code: "P5", name: "Public Visitor", role: "Public / Citizen", org: "—", title: "Pengunjung", color: "#6B7B74" },
};

// 10 modul level-1 — §4.1
const MODULES = [
  { id: "dashboard", icon: "home", name: "Dashboard", short: "Halaman Utama", count: 0 },
  { id: "map", icon: "map", name: "Map Explorer", short: "Peta Eksplorer", count: 0 },
  { id: "modeling", icon: "thermometer", name: "Climate Modeling", short: "Pemodelan Iklim", count: 8, tagline: "Hindcast, LULC, SLR, banjir/kekeringan, biodiversity" },
  { id: "vulnerability", icon: "alert-triangle", name: "Vulnerability Assessment", short: "Kerentanan", count: 2, tagline: "Multi-criteria & dynamic vulnerability scoring" },
  { id: "sectoral", icon: "factory", name: "Sectoral Analysis", short: "Analisis Sektoral", count: 7, tagline: "RDTR, food, coast, fire, tourism, energi, daya dukung" },
  { id: "sdss", icon: "compass", name: "Decision Support", short: "SDSS Core", count: 10, tagline: "Scenario builder, MCDA, impact, optimization" },
  { id: "ai", icon: "bot", name: "AI Assistant", short: "Asisten AI", count: 9, tagline: "NLP query, anomaly EWS, XAI, image recognition" },
  { id: "collab", icon: "users", name: "Collaboration", short: "Kolaborasi", count: 3, tagline: "Konsultasi multi-stakeholder, komentar, scenario compare" },
  { id: "reports", icon: "bar-chart-3", name: "Reports & Outputs", short: "Laporan & Output", count: 4, tagline: "Dashboards, exec summary, custom report builder" },
  { id: "data", icon: "database", name: "Data Catalog", short: "Katalog Data", count: 10, tagline: "ISO 19115, lineage, quality, versioning, integrasi K/L" },
  { id: "settings", icon: "settings", name: "Settings & Admin", short: "Pengaturan", count: 0, tagline: "Profile, auth, audit, i18n, integrations, developer" },
];

// KPI per persona — §6.5
const KPIS_BY_PERSONA = {
  P1: [
    { label: "Provinsi Aktif", value: "34/38", trend: 0, deltaLabel: "vs Q1", spark: [32,33,34,34,33,34,34] },
    { label: "Risk Index Nasional", value: "62.4", unit: "/100", trend: +1.8, deltaLabel: "vs Q4 lalu", spark: [58,59,60,60,61,62,62.4], status: "warning" },
    { label: "Action Items Menunggu", value: "12", trend: -3, deltaLabel: "vs minggu lalu", spark: [18,17,15,14,14,13,12] },
    { label: "Laporan Bulan Ini", value: "8", trend: +2, deltaLabel: "vs bulan lalu", spark: [3,4,5,6,7,7,8] },
  ],
  P2: [
    { label: "Provinsi Aktif", value: "18/18", trend: 0, deltaLabel: "vs Q1 2026", spark: [18,18,18,18,18,18,18] },
    { label: "Risk Alerts", value: "3", trend: +1, deltaLabel: "vs minggu lalu", spark: [1,2,2,2,3,2,3], status: "warning" },
    { label: "Model Running", value: "5", trend: -2, deltaLabel: "vs kemarin", spark: [7,8,7,6,6,5,5] },
    { label: "Active Scenarios", value: "12", trend: +3, deltaLabel: "vs minggu lalu", spark: [8,9,9,10,11,11,12] },
  ],
  P3: [
    { label: "Active Projects", value: "4", trend: 0, deltaLabel: "stabil", spark: [4,4,4,4,4,4,4] },
    { label: "Hindcasts Running", value: "2", trend: +1, deltaLabel: "vs minggu lalu", spark: [1,1,1,2,2,2,2] },
    { label: "Datasets Updated", value: "23", trend: +7, deltaLabel: "vs 30 hari", spark: [10,12,14,16,18,21,23] },
    { label: "Publications Cited", value: "147", trend: +12, deltaLabel: "YTD", spark: [110,118,125,131,138,142,147] },
  ],
  P4: [
    { label: "Active Projects", value: "7", trend: +1, deltaLabel: "vs Q1", spark: [5,6,6,6,7,6,7] },
    { label: "Premium Tier", value: "82d", trend: 0, deltaLabel: "tersisa", spark: [120,115,110,105,100,90,82] },
    { label: "Reports Saved", value: "34", trend: +5, deltaLabel: "30 hari", spark: [22,25,27,29,31,33,34] },
    { label: "Custom Layers", value: "11", trend: +2, deltaLabel: "Q ini", spark: [8,9,9,10,10,11,11] },
  ],
  P5: [
    { label: "Provinsi terpantau", value: "38", trend: 0, deltaLabel: "se-Indonesia", spark: [38,38,38,38,38,38,38] },
    { label: "Peringatan aktif", value: "3", trend: +1, deltaLabel: "minggu ini", spark: [1,2,2,2,3,2,3], status: "warning" },
    { label: "Cerita publik", value: "26", trend: +4, deltaLabel: "bulan ini", spark: [18,20,21,22,24,25,26] },
    { label: "Layer publik", value: "47", trend: +3, deltaLabel: "30 hari", spark: [40,41,43,44,45,46,47] },
  ],
};

const ACTIVITY_FEED = [
  { type: "alert", icon: "alert-triangle", title: "Risk Alert: Banjir Wajo", body: "Proyeksi kedalaman 1.8m dalam 48 jam ke depan, sumber: ensemble model + InaRISK", who: "Sistem EWS", when: "2 jam lalu", province: "sulsel", severity: "high" },
  { type: "comment", icon: "message-square", title: "Rina mengomentari skenario 'Sulsel-Flood-2050'", body: "\"Apakah include data BMKG terbaru? Saya lihat dataset Mei 2026 baru release minggu lalu.\"", who: "Rina · BRIN", when: "3 jam lalu", province: "sulsel" },
  { type: "report", icon: "file-text", title: "Laporan 'Q1 2026 Climate Risk Sulsel' terbit", body: "Auto-generated executive summary untuk Bappeda Sulsel · 14 halaman", who: "Ahmad K.", when: "1 hari lalu", province: "sulsel" },
  { type: "scenario", icon: "target", title: "Skenario baru 'RDTR Makassar 2030'", body: "Mencakup 142 zona kelurahan + 6 layer kriteria · status: konsultasi", who: "Citra D. · Bappeda Makassar", when: "2 hari lalu", province: "sulsel" },
  { type: "ai", icon: "sparkles", title: "AI Insight pinned", body: "\"Wajo perlu perhatian khusus: kombinasi flood risk tinggi + low adaptive capacity + low fiscal space. Rekomendasi: pilot anggaran adaptasi 2027.\"", who: "AI Assistant", when: "3 hari lalu", province: "sulsel" },
  { type: "consultation", icon: "users", title: "Anda diundang ke Konsultasi #042", body: "Sesi sign-off RDTR Pinrang — Selasa 28 Mei 14:00 WITA", who: "Ir. Hadi · Sekda Pinrang", when: "3 hari lalu", province: "sulsel" },
  { type: "data", icon: "database", title: "Layer baru: Sentinel-2 Sulsel Mei 2026", body: "10m resolution multi-spectral · 142 tiles · siap untuk LULC change detection", who: "Data Pipeline", when: "4 hari lalu", province: "sulsel" },
];

// Crisis events for crisis mode
const CRISIS_EVENT = {
  type: "Banjir Bandang",
  area: "Kab. Wajo, Sulsel",
  level: "Siaga 2",
  affected: "12,400 jiwa",
  started: "26 Mei 2026, 04:12 WITA",
  source: "InaRISK BNPB · Model ensemble platform",
};

// Search index (typeahead)
const SEARCH_INDEX = [
  { type: "Modul", name: "Climate Modeling", id: "modeling", desc: "8 fitur · pemodelan iklim" },
  { type: "Modul", name: "Vulnerability Assessment", id: "vulnerability", desc: "2 fitur · MCDA + dynamic" },
  { type: "Modul", name: "Sectoral Analysis", id: "sectoral", desc: "7 fitur · RDTR, food, coast..." },
  { type: "Modul", name: "Decision Support (SDSS)", id: "sdss", desc: "10 fitur · scenario, MCDA, optim" },
  { type: "Modul", name: "AI Assistant", id: "ai", desc: "9 fitur · NLP, anomaly, XAI" },
  { type: "Fitur", name: "Multi-Criteria Vulnerability Assessment", id: "vulnerability", desc: "FITUR 3.1 · weighted overlay" },
  { type: "Fitur", name: "Scenario Manager & Planning Builder", id: "sdss", desc: "FITUR 5.2 · scenario CRUD + planning" },
  { type: "Fitur", name: "Hindcasting Tool", id: "modeling", desc: "FITUR 11.1 · validate model vs observed" },
  { type: "Fitur", name: "Executive Summary Auto-Generation", id: "reports", desc: "FITUR 8.3 · briefing per provinsi" },
  { type: "Fitur", name: "Spatial Planning Support Toolbox (RDTR)", id: "sectoral", desc: "FITUR 4.1 · pendukung RDTR" },
  { type: "Fitur", name: "Forest Fire Risk (ENSO-aware)", id: "sectoral", desc: "FITUR 4.4 · karhutla + ENSO" },
  { type: "Layer", name: "Banjir Wajo 2024 — InaRISK", id: "map", desc: "Layer publik · BNPB · WMS" },
  { type: "Layer", name: "Sentinel-2 Sulsel Mei 2026", id: "data", desc: "10m multi-spectral · 142 tiles" },
  { type: "Layer", name: "SLR projection SSP2-4.5 2050", id: "map", desc: "Sea level rise · platform native" },
  { type: "Layer", name: "Karhutla risk Kalimantan Q2 2026", id: "map", desc: "ENSO-aware · ML overlay" },
  { type: "Skenario", name: "Sulsel-Flood-2050", id: "sdss", desc: "Banjir SSP2-4.5 · konsultasi" },
  { type: "Skenario", name: "RDTR Makassar 2030", id: "sdss", desc: "Draft · 142 zona kelurahan" },
  { type: "Skenario", name: "NTT Drought Adaptation 2027-2032", id: "sdss", desc: "Aktif · MCDA scoring done" },
  { type: "Laporan", name: "Q1 2026 Climate Risk Sulsel", id: "reports", desc: "Executive summary · 14 hal" },
  { type: "Laporan", name: "Briefing Banjir Wajo Mei 2026", id: "reports", desc: "Auto-generated · krisis" },
  { type: "Provinsi", name: "Sulawesi Selatan", id: "dashboard", desc: "24 kab/kota · 9.1jt jiwa · konteks aktif" },
  { type: "Provinsi", name: "Nusa Tenggara Timur", id: "dashboard", desc: "22 kab/kota · drought-prone" },
  { type: "Bantuan", name: "Cara membuat skenario baru", id: "sdss", desc: "Dokumentasi · 4 menit baca" },
  { type: "Bantuan", name: "Apa itu hindcasting?", id: "modeling", desc: "Dokumentasi · 3 menit baca" },
];

// AI mock conversation responses (keyword-based)
const AI_RESPONSES = [
  {
    triggers: ["wajo", "banjir wajo", "kenapa wajo"],
    text: "Skor risiko banjir Kab. Wajo tinggi karena **kombinasi tiga faktor**:\n\n1. **Hazard**: presipitasi proyeksi SSP2-4.5 menunjukkan peningkatan 18% (2025→2050) di musim hujan, dengan return period 25-th meningkat dari 240mm/hari → 295mm/hari.\n2. **Exposure**: 142.000 jiwa di 8 kecamatan rendah berada di floodplain Sungai Cenranae.\n3. **Vulnerability**: indeks adaptive capacity Wajo = 0.42 (rendah), kombinasi dari fiscal space terbatas dan minim infrastruktur drainase.\n\nRekomendasi:\n- Prioritaskan retrofit drainase 5 ruas utama di Sengkang\n- Update RDTR — restrict zona pertanian di flood-prone\n- Pilot anggaran adaptasi 2027 (Rp 8.4M est.)\n\nSumber: FITUR 3.1 MCDA + FITUR 6.2 Anomaly Detection · data ter-update 23 menit lalu",
  },
  {
    triggers: ["risk", "risiko", "ringkasan", "summary"],
    text: "Ringkasan risiko **Sulawesi Selatan** (konteks aktif):\n\n• **12 kab/kota** dalam kategori risiko tinggi-sangat tinggi\n• **Top 3**: Wajo (banjir), Soppeng (kekeringan), Bone (multi-hazard)\n• **Trend**: peningkatan 1.4 poin Risk Index vs Q1 2026\n• **Drivers**: presipitasi extreme +18%, SLR pesisir +6.2cm proyeksi 2050\n\nMau saya buat executive brief untuk Kepala Bappeda?",
  },
  {
    triggers: ["scenario", "skenario", "ssp"],
    text: "Saya bisa bantu membuat skenario baru. Templat yang tersedia:\n\n• **RDTR Update** — perubahan zonasi tata ruang\n• **Climate Adaptation** — intervensi adaptasi terhadap iklim\n• **Sectoral Investment** — alokasi anggaran per-sektor\n• **Disaster Response** — protokol tanggap bencana\n\nUntuk konteks Sulsel + SSP2-4.5 (2025-2050), templat **Climate Adaptation** paling sering dipakai. Mau saya buka builder-nya?",
  },
  {
    triggers: ["hello", "hai", "halo", "hi"],
    text: "Halo! Saya AI Assistant Climate Action Platform. Saya bisa bantu:\n\n• Menjelaskan **mengapa** sebuah area punya skor risiko tertentu\n• Membuat **ringkasan eksekutif** dari data peta atau skenario\n• Merekomendasikan **aksi prioritas** berdasar MCDA + sensitivitas\n• Menarik data dari **62 fitur** platform via natural language\n\nKonteks aktif Anda: **Sulawesi Selatan · SSP2-4.5 · 2025-2050**. Coba tanya: *\"Kenapa Wajo skor tinggi?\"* atau *\"Ringkasan risiko Sulsel\"*.",
  },
];

const DEFAULT_AI_RESPONSE = "Saya belum punya konteks yang cukup untuk menjawab pertanyaan itu dengan presisi. Coba spesifikkan: **provinsi/kab apa**, **periode mana**, **skenario apa**. Atau pilih dari saran cepat di bawah.";

const QUICK_PROMPTS = [
  "Kenapa Wajo skor tinggi?",
  "Ringkasan risiko Sulsel",
  "Buat skenario adaptasi baru",
  "Bandingkan SSP2-4.5 vs SSP5-8.5",
];

// Notifications
const NOTIFICATIONS = [
  { icon: "alert-triangle", color: "danger", title: "Risk Alert: Wajo", body: "Banjir 1.8m proyeksi 48h", when: "2j" },
  { icon: "message-square", color: "info", title: "Komentar baru", body: "Rina di Sulsel-Flood-2050", when: "3j" },
  { icon: "file-text", color: "success", title: "Laporan terbit", body: "Q1 2026 Climate Risk Sulsel", when: "1h" },
];

Object.assign(window, {
  PROVINCES, SCENARIOS, PERIODS, PERSONAS, MODULES,
  KPIS_BY_PERSONA, ACTIVITY_FEED, CRISIS_EVENT, SEARCH_INDEX,
  AI_RESPONSES, DEFAULT_AI_RESPONSE, QUICK_PROMPTS, NOTIFICATIONS,
});
