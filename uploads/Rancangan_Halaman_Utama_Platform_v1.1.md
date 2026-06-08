# RANCANGAN HALAMAN UTAMA & SISTEM NAVIGASI PLATFORM

## Climate Action Platform — Home Page, Navigation & Cross-Feature UX Design

### UI/UX Specification Document

**Versi 1.1** (Mei 2026) — Spesifikasi rancangan halaman utama platform Climate Action sebagai "rumah" yang menampung dan memberikan akses ke seluruh 62 fitur yang didefinisikan dalam Katalog Fitur SDSS v2.2.

**Status Dokumen:** Draft Inception (akan divalidasi pada Concept Design Phase per PRD §19.2).

**Revision Note (v1.1 — Mei 2026):** Iterasi setelah review v1.0 untuk membuat dokumen lebih actionable sebagai basis pembangunan prototype:

1. **Inkonsistensi diperbaiki**: jumlah modul utama distandardisasi ke **10 modul** (sebelumnya bercampur antara "10" dan "13"); shortcut keyboard `⌘K` (Global Search) vs `⌘I` (AI Assistant) dibedakan dengan tegas.
2. **BAGIAN 15 (baru) — Strategi Pembuatan Prototype**: MVP scope, persona pilihan (P2 Planner), daftar 26 screen prototype dengan prioritas P0/P1/P2, mock data strategy, demo script 8-12 menit, anti-pattern checklist.
3. **BAGIAN 16 (baru) — Component Anatomy Detail**: anatomy lengkap untuk 8 komponen kritis (KPI Card, Module Tile, Activity Feed Item, Top Bar, Context Bar, AI Panel, Map Widget, Quick Actions Bar) dengan dimensi pixel, TypeScript interfaces, dan state variations.
4. **Lampiran E (baru) — Prototype MVP Build Checklist**: 7-phase checklist (foundation → polish) dengan total estimasi 12-16 hari (~5-8 hari dengan AI-assist).
5. **Lampiran F (baru) — Mock Data Schemas (JSON)**: schema lengkap siap-pakai untuk Provinces, Users, KPI Snapshots, Activity Feed, Scenarios, Layers, AI Conversations, Notifications, Module Definitions.
6. **Lampiran G (baru) — Claude Artifacts Implementation Guide**: strategi single-vs-multi artifact, pattern routing tanpa router, mock map dengan SVG, AI streaming simulator, persona switcher, folder structure untuk Next.js setup.
7. **Lampiran H (baru) — Interaction Specifications Detail**: step-by-step untuk 6 interaksi kompleks (Context Bar cascade, Module Tile hover, AI streaming, Search typeahead, Crisis Mode activation, Keyboard shortcut overlay).

**Bahasa:** Bahasa Indonesia primer; istilah teknis dalam Bahasa Inggris dipertahankan sesuai konvensi Katalog Fitur.

**Hubungan dengan Dokumen Lain (Single Source of Truth Bundle):**

| Dokumen | Peran | Hubungan dengan Dokumen Ini |
|---------|-------|------------------------------|
| `PRD_Geospatial_Climate_Action_Platform_v1.2.md` | Authoritative requirements (FR-UI, FR-SDSS, FR-GVX, dll.) | Dokumen ini meng-elaborasi FR-UI-01..06 dan FR-SDSS-10..11 di level UI design |
| `Katalog_Fitur_SDSS_Detail_v2.2.md` | 62 fitur dengan UI mockup per-fitur | Dokumen ini menyediakan kerangka yang menampung 62 fitur tersebut; setiap fitur tetap merujuk ke Katalog untuk detail internal |
| `GeoVertix_SDSS_Reuse_Analysis_v3.xlsx` | Mapping fitur ↔ plugin/API GeoVertix | Halaman utama dirancang untuk bisa menampilkan output dari plugin GeoVertix maupun komponen SDSS native secara seamless |
| `GeoVertix_API_KnowledgeBase.md` | Inventaris API GeoVertix | Diperlukan untuk merancang interaksi data fetching di halaman utama (peta, layer, status task) |

---

## DAFTAR ISI

**BAGIAN 1 — PENGANTAR & TUJUAN**
- 1.1 Mengapa Dokumen Ini Dibutuhkan
- 1.2 Ruang Lingkup
- 1.3 Audiens & Penggunaan
- 1.4 Hubungan dengan Katalog Fitur

**BAGIAN 2 — PRINSIP DESAIN**
- 2.1 Map-First & Spatial-First
- 2.2 Persona-Aware (Role-Based Surfacing)
- 2.3 Progressive Disclosure
- 2.4 Always-On AI Assistant
- 2.5 Crisis-Mode Resilient
- 2.6 Mobile-Responsive & PWA-Ready
- 2.7 GeoVertix-Transparent
- 2.8 Bilingual (ID/EN) by Default

**BAGIAN 3 — PERSONAS & KONTEKS PENGGUNA**
- 3.1 P1 — Government Decision Maker (Executive)
- 3.2 P2 — Government Planner (Operational)
- 3.3 P3 — Researcher / Academic
- 3.4 P4 — Private Sector User
- 3.5 P5 — Public User / Citizen
- 3.6 Matriks Hak Akses per Persona × Modul

**BAGIAN 4 — INFORMATION ARCHITECTURE (SITEMAP LENGKAP)**
- 4.1 Pohon Navigasi Level 1 (Modul Utama)
- 4.2 Penempatan 62 Fitur di Sitemap
- 4.3 Konvensi URL & Routing
- 4.4 Breadcrumb Schema

**BAGIAN 5 — SISTEM NAVIGASI**
- 5.1 Top Bar Global
- 5.2 Left Sidebar (Primary Navigation)
- 5.3 Context Bar (Spatial-Temporal-Scenario Selector)
- 5.4 Quick Actions Bar
- 5.5 Global Search (Spotlight)
- 5.6 AI Assistant Launcher (Floating)
- 5.7 Breadcrumbs
- 5.8 Bottom Status Bar
- 5.9 Keyboard Shortcuts

**BAGIAN 6 — HALAMAN UTAMA (DASHBOARD/HOME)**
- 6.1 Tujuan Halaman Utama
- 6.2 Wireframe Lengkap (Desktop)
- 6.3 Zona 1 — Header Bar
- 6.4 Zona 2 — Context Bar
- 6.5 Zona 3 — KPI Cards Row
- 6.6 Zona 4 — Risk Map (Inline)
- 6.7 Zona 5 — Activity Feed
- 6.8 Zona 6 — Quick Actions
- 6.9 Zona 7 — Module Grid (Pintu ke 10 Modul)
- 6.10 Zona 8 — Footer Status
- 6.11 Varian per Persona
- 6.12 Empty State, Loading State, Error State

**BAGIAN 7 — HALAMAN MODUL (10 MODULE LANDING PAGES + 3 catatan)**
- 7.1 Pola Umum Module Landing Page
- 7.2 Module: Climate Modeling (Bagian 2 — 6 fitur)
- 7.3 Module: Vulnerability Assessment (Bagian 3 — 2 fitur)
- 7.4 Module: Sectoral Analysis (Bagian 4 — 7 fitur)
- 7.5 Module: Decision Support / SDSS Core (Bagian 5 — 10 fitur)
- 7.6 Module: AI Assistant & NLP (Bagian 6 — 9 fitur)
- 7.7 Module: Collaboration & Workflow (Bagian 7 — 3 fitur)
- 7.8 Module: Visualization & Reporting (Bagian 8 — 4 fitur)
- 7.9 Module: Platform Services (Bagian 9 — 6 fitur)
- 7.10 Module: Data Management (Bagian 10 — 5 fitur)
- 7.11 Module: Hindcasting & Validation (Bagian 11 — 2 fitur)
- 7.12 Module: Edge/Mobile (Bagian 12 — 3 fitur, infrastruktur transparan)
- 7.13 Module: External Integrations (Bagian 13 — 5 fitur)

**BAGIAN 8 — USER FLOWS UTAMA**
- 8.1 Flow A — First-Time Login & Onboarding
- 8.2 Flow B — Daily Planner Workflow (Persona P2)
- 8.3 Flow C — Crisis Mode (Disaster Response)
- 8.4 Flow D — Executive Brief (Persona P1)
- 8.5 Flow E — Researcher Deep Dive (Persona P3)
- 8.6 Flow F — Group Decision-Making Session
- 8.7 Flow G — AI Conversational Query
- 8.8 Flow H — Report Generation End-to-End
- 8.9 Flow I — Cross-Sectoral Analysis (Multi-Module)
- 8.10 Flow J — Public Access (Persona P5)

**BAGIAN 9 — KOMPONEN UI LIBRARY**
- 9.1 Atoms (Button, Input, Badge, Tag, Icon, etc.)
- 9.2 Molecules (Search Bar, Dropdown, Card, Toast, etc.)
- 9.3 Organisms (Nav Bar, Sidebar, Map, Dashboard Widget, etc.)
- 9.4 Templates (Dashboard, List, Detail, Map-Full, Wizard)
- 9.5 Custom Spasial Components (Layer Switcher, Time Slider, Scenario Picker, dll.)

**BAGIAN 10 — STATE MANAGEMENT**
- 10.1 Empty States (per template)
- 10.2 Loading States (skeleton + spinner + progress)
- 10.3 Error States (network, auth, GeoVertix down, data missing)
- 10.4 Partial / Degraded States (fallback per FR-GVX-07)
- 10.5 Success States & Feedback

**BAGIAN 11 — MOBILE & PWA**
- 11.1 Breakpoint Strategy
- 11.2 Halaman Utama Mobile (Adaptasi)
- 11.3 Bottom Navigation (Mobile)
- 11.4 Offline-First Patterns
- 11.5 Field Data Capture UX

**BAGIAN 12 — AKSESIBILITAS & i18n**
- 12.1 WCAG 2.1 AA Compliance Checklist
- 12.2 Keyboard Navigation Patterns
- 12.3 Screen Reader Considerations
- 12.4 Color Contrast & Color-Blind Friendly Palettes
- 12.5 Bahasa Indonesia / English Toggle Mechanics
- 12.6 Cultural Considerations (Indonesian context)

**BAGIAN 13 — VISUAL DESIGN SYSTEM (FOUNDATIONS)**
- 13.1 Color Tokens
- 13.2 Typography Scale
- 13.3 Spacing & Grid
- 13.4 Iconography
- 13.5 Elevation & Shadow
- 13.6 Motion & Transitions

**BAGIAN 14 — CATATAN IMPLEMENTASI**
- 14.1 Saran Tech Stack
- 14.2 Performance Budget
- 14.3 Prioritas Pengembangan (Y1-Y3)
- 14.4 Integrasi dengan Component Library Existing
- 14.5 Testing Strategy untuk UI

**BAGIAN 15 — STRATEGI PEMBUATAN PROTOTYPE** *(Baru di v1.1)*
- 15.1 Tujuan Bagian Ini
- 15.2 Tahapan Prototype (Low-Fi → Mid-Fi → Hi-Fi)
- 15.3 MVP Scope untuk Prototype Pertama
- 15.4 Persona Pilihan untuk Prototype Pertama
- 15.5 Daftar Screen yang Harus Ada di MVP Prototype
- 15.6 Mock Data Strategy
- 15.7 Demo Script (Stakeholder Walkthrough)
- 15.8 Anti-Pattern yang Harus Dihindari

**BAGIAN 16 — COMPONENT ANATOMY DETAIL** *(Baru di v1.1)*
- 16.1 KPI Card — Anatomy Detail
- 16.2 Module Tile — Anatomy Detail
- 16.3 Activity Feed Item — Anatomy Detail
- 16.4 Top Bar — Anatomy Detail
- 16.5 Context Bar — Anatomy Detail
- 16.6 AI Assistant Panel — Anatomy Detail
- 16.7 Map Widget (Reusable) — Props & Behavior
- 16.8 Quick Actions Bar — Anatomy Detail

**LAMPIRAN**
- Lampiran A — Glossary UI/UX
- Lampiran B — Cross-Reference 62 Fitur ke Halaman/Modul
- Lampiran C — Cross-Reference FR-UI/FR-SDSS dari PRD ke Section Dokumen Ini
- Lampiran D — Quick Sketch Index (semua wireframe yang ada di dokumen)
- **Lampiran E — Prototype MVP Build Checklist** *(Baru di v1.1)*
- **Lampiran F — Mock Data Schemas (JSON)** *(Baru di v1.1)*
- **Lampiran G — Claude Artifacts Implementation Guide** *(Baru di v1.1)*
- **Lampiran H — Interaction Specifications Detail** *(Baru di v1.1)*

---

# BAGIAN 1 — PENGANTAR & TUJUAN

## 1.1 Mengapa Dokumen Ini Dibutuhkan

Katalog Fitur SDSS v2.2 mendokumentasikan **62 fitur** dengan kedalaman per-fitur (tujuan, algoritma, input/output, wireframe per fitur, integrasi GeoVertix). Namun pertanyaan **"bagaimana 62 fitur ini disatukan ke dalam satu pengalaman pengguna yang utuh?"** belum terjawab — yaitu:

1. Apa halaman pertama yang dilihat pengguna saat login?
2. Bagaimana pengguna menemukan fitur yang mereka butuhkan dari 62 fitur tersebut?
3. Di mana setiap fitur ditempatkan dalam struktur navigasi?
4. Bagaimana navigasi konsisten lintas-fitur?
5. Apa komponen UI yang dipakai berulang lintas-fitur?
6. Bagaimana platform menyesuaikan diri dengan persona (Government / Private / Public)?
7. Bagaimana pengalaman saat krisis (bencana sedang berlangsung) berbeda dari saat normal?

Dokumen ini adalah **jawaban sistematis** atas pertanyaan-pertanyaan tersebut. Ia bekerja **secara berdampingan** dengan Katalog Fitur: Katalog menjelaskan **"di dalam"** setiap fitur; dokumen ini menjelaskan **"di antara"** dan **"di atas"** fitur-fitur tersebut — yaitu kerangka navigasi dan halaman utama yang menjadi "rumah" mereka.

## 1.2 Ruang Lingkup

**Dalam ruang lingkup:**
- Halaman utama (home/dashboard) dengan seluruh zona-nya
- Sistem navigasi global (top bar, sidebar, context bar, quick actions, status bar)
- 10 halaman modul (module landing pages) — module landing dedicated; 3 BAGIAN katalog (11, 12, 13) dijadikan sub-section atau infrastruktur transparan (lihat §4.1 untuk rasionalisasi)
- User flows utama lintas-fitur (login, daily, krisis, group decision, dll.)
- Komponen UI lintas-fitur yang dipakai berulang
- Mobile / PWA adaptation untuk halaman utama
- Visual design system foundations (token-level)

**Di luar ruang lingkup (tetap di Katalog Fitur):**
- Detail UI internal per fitur (wireframe form, parameter, output, dll.)
- Algoritma, model, atau logika bisnis per fitur
- API endpoint per fitur (sudah ada di Katalog dan PRD)
- Detail teknis backend / database
- Pixel-perfect visual mockup (tahap berikutnya: high-fidelity Figma)

## 1.3 Audiens & Penggunaan

| Audiens | Cara Menggunakan Dokumen |
|---------|---------------------------|
| **UX Designer** | Acuan untuk membuat hi-fi mockup di Figma; mapping ke design system existing |
| **Frontend Developer** | Spesifikasi komponen, state, dan routing untuk implementasi React/PWA |
| **Product Owner / Team Leader** | Acuan saat menyusun backlog sprint dan prioritas pengembangan |
| **BIG (klien)** | Acuan saat validasi konsep di Concept Design Phase (PRD §19.2) |
| **QA Engineer** | Acuan untuk skenario testing user flows dan state management |
| **Stakeholder K/L** | Pemahaman bagaimana platform akan terasa saat dipakai di organisasinya |

## 1.4 Hubungan dengan Katalog Fitur

Setiap fitur di Katalog Fitur v2.2 memiliki **section "Wireframe / UI"** yang mendokumentasikan tampilan **internal** fitur tersebut. Dokumen ini **TIDAK MENG-OVERRIDE** wireframe per-fitur tersebut. Sebaliknya, dokumen ini menambahkan layer **"shell"** di sekeliling setiap fitur:

```
+------------------------------------------------------------+
| Global Top Bar  (didefinisikan di dokumen ini, §5.1)      |
+-----+------------------------------------------------------+
| L   |  Context Bar  (didefinisikan di dokumen ini, §5.3)  |
| e   +------------------------------------------------------+
| f   |                                                       |
| t   |    [ Wireframe internal fitur — dari Katalog Fitur]  |
|     |    [ contoh: form scenario builder, table MCDA, ...] |
| N   |                                                       |
| a   |                                                       |
| v   |                                                       |
| (§5.|                                                       |
| 2)  +------------------------------------------------------+
+-----+   Status Bar  (didefinisikan di dokumen ini, §5.8)   +
+------------------------------------------------------------+
```

Dengan kata lain: **shell global + content per-fitur = experience utuh**.

---

# BAGIAN 2 — PRINSIP DESAIN

Delapan prinsip berikut memandu setiap keputusan desain di dokumen ini. Saat ada konflik antar prinsip, urutan di bawah ini dipakai sebagai tie-breaker.

## 2.1 Map-First & Spatial-First

**Prinsip:** Platform ini adalah platform geospasial. **Peta interaktif adalah artefak utama**, bukan tambahan. Setiap halaman yang memungkinkan harus dapat menampilkan output dalam konteks peta dengan satu klik.

**Implementasi:**
- Tombol "View on Map" tersedia di setiap output yang punya komponen spasial
- Halaman utama menampilkan mini-map sebagai zona inti (Zone 4)
- Modul Map (FITUR 8.1) selalu dapat dibuka dari sidebar dengan shortcut `M`
- Setiap entitas spasial (provinsi, kecamatan, lokasi observasi) dapat di-pin ke "Saved Locations" untuk akses cepat

**Kontras dengan dashboard tradisional:** Bukan "dashboard dengan peta di salah satu widget" — tapi "platform peta yang dashboard-nya ringkas".

## 2.2 Persona-Aware (Role-Based Surfacing)

**Prinsip:** Halaman utama, sidebar, dan quick actions **berubah sesuai persona pengguna**. Government Decision Maker tidak melihat tombol "Run Hindcasting" yang relevan untuk Researcher. Public user hanya melihat layer dan dashboard yang sudah dipublikasikan.

**Implementasi:**
- Saat login, role pengguna ditentukan dari token JWT (cross-reference PRD §16.3, FR-GVX-01).
- Tata letak halaman utama (Section 6.11) memiliki **5 varian** sesuai persona P1–P5.
- Item navigasi yang tidak relevan **disembunyikan**, bukan hanya di-disable.
- Quick actions di hero area dipilih dari "top 3 action terprediksi" untuk persona tersebut.

**Bukan personalisasi ML/AI level individu** (tahap berikutnya, mungkin Y2-Y3). Untuk MVP: persona-level (lima kategori) sudah cukup.

## 2.3 Progressive Disclosure

**Prinsip:** Halaman utama menampilkan **ringkasan tingkat tinggi**, bukan semua data. Detail dimunculkan **on-demand** saat pengguna meminta (klik, expand, drill-down).

**Implementasi:**
- KPI cards di home page menampilkan 4 angka utama, bukan 20.
- Activity feed menampilkan 5 item terkini, dengan link "Lihat semua".
- Module grid menampilkan **judul + count fitur**, bukan daftar lengkap; klik tile → masuk module landing page.
- Setiap module landing page menampilkan deskripsi singkat + daftar fitur, bukan langsung fitur penuh.
- Pengguna selalu butuh **1-3 klik** untuk sampai ke fitur spesifik dari home.

**Anti-pattern yang dihindari:** "wall of widgets" — dashboard yang menampilkan 30+ widget di satu layar.

## 2.4 Always-On AI Assistant

**Prinsip:** AI Assistant (FITUR 6.5 Natural Language Query) selalu dapat diakses dari **mana saja** di platform, tanpa kehilangan konteks halaman yang sedang dibuka.

**Implementasi:**
- Tombol floating "🤖 Tanya AI" di pojok kanan bawah, persisten lintas-halaman.
- Klik → buka panel side drawer (bukan modal full-screen) — pengguna tetap bisa melihat konteks halaman.
- AI Assistant menerima konteks halaman aktif secara otomatis (misalnya jika pengguna sedang di halaman Vulnerability Sulsel, query "Mengapa skor tinggi?" otomatis dipahami sebagai pertanyaan tentang Sulsel).
- Shortcut keyboard: `⌘+I` (Mac) / `Ctrl+I` (Win) untuk membuka AI panel. (Catatan: `⌘+K` adalah untuk Global Search — lihat §5.5 dan §5.9.)
- Hasil AI bisa di-pin ke halaman aktif sebagai "AI Insight Card".

## 2.5 Crisis-Mode Resilient

**Prinsip:** Saat bencana sedang berlangsung (banjir, kebakaran hutan, dll.), pengguna butuh akses **cepat** ke informasi & aksi terkait. Platform harus memiliki "Crisis Mode" yang dapat diaktifkan baik **otomatis** (deteksi anomali dari FITUR 6.2) atau **manual** (admin toggle).

**Implementasi:**
- Saat Crisis Mode aktif, top bar berubah warna (kuning/merah) dengan banner "MODE KRISIS: [event]".
- Quick actions di home page **berubah** menjadi: "Lihat Peta Real-Time", "Buat Laporan Cepat", "Hubungi BNPB", "Kirim Alert".
- AI Assistant memprioritaskan query terkait event aktif.
- Performance budget khusus: response time < 500ms di Crisis Mode (vs 2s normal), bahkan saat 500 concurrent users (NFR-PERF-01 PRD).
- Caching agresif untuk layer area terdampak.
- Cross-reference: PRD R-03 (peak load), FITUR 6.2 (Anomaly Detection & EWS).

## 2.6 Mobile-Responsive & PWA-Ready

**Prinsip:** Halaman utama dan navigasi inti **berfungsi penuh di mobile** (smartphone 360-414px width). Tidak ada fitur kritis yang "desktop only" untuk persona Field Officer.

**Implementasi:**
- Bottom navigation bar di mobile (5 ikon: Home, Map, Analysis, Reports, More)
- Sidebar desktop → drawer hamburger di mobile
- Module grid 6×2 di desktop → vertical list di mobile
- KPI cards 4 in a row di desktop → 2×2 grid di mobile
- Peta full-screen dengan overlay controls di mobile
- PWA install prompt setelah login ke-3
- Offline-first untuk data yang sudah disinkronkan (Service Worker)
- Cross-reference: PRD FR-UI-02, FR-UI-03; FITUR 12.2 Mobile PWA.

## 2.7 GeoVertix-Transparent

**Prinsip:** Pengguna **tidak perlu tahu** kalau ada interaksi dengan GeoVertix di belakang layar. Boundary platform yang dijelaskan di PRD §9.6.4 adalah **boundary teknis**, bukan boundary pengalaman.

**Implementasi:**
- Tidak ada label "Powered by GeoVertix" di UI utama (kecuali halaman About).
- Loading state untuk plugin GeoVertix sama dengan loading state untuk komputasi SDSS native.
- Error dari GeoVertix di-translate ke pesan domain-friendly ("Tidak dapat memuat layer banjir saat ini" — bukan "GeoVertix WMS returned 503").
- Fallback graceful per FR-GVX-07: saat GeoVertix down, UI tetap tampak fungsional dengan cached data dan notice ringan.
- Map credit di pojok kanan bawah mencantumkan attribution sesuai standar OGC.

## 2.8 Bilingual (ID/EN) by Default

**Prinsip:** Bahasa Indonesia adalah default. Toggle ke English tersedia di semua halaman tanpa kehilangan konteks.

**Implementasi:**
- Language toggle di top bar (top-right area)
- Klik toggle → semua label berubah tanpa reload halaman (i18next pattern)
- URL tidak berubah saat toggle (state bahasa di user preference / localStorage)
- Setiap label di komponen UI memiliki key i18n; tidak ada hard-coded string
- Default bahasa diambil dari (1) user preference, (2) browser locale, (3) ID sebagai fallback
- Cross-reference: PRD FR-UI-04; FITUR 9.4 i18n ID/EN

---

# BAGIAN 3 — PERSONAS & KONTEKS PENGGUNA

Lima persona berikut adalah perluasan dari PRD §6.3 dengan tambahan detail UX-relevant. Mereka adalah landasan untuk semua keputusan persona-aware di seluruh dokumen ini.

## 3.1 P1 — Government Decision Maker (Executive)

**Profil:**
- Posisi: Eselon I/II di K/L (BIG, Bappenas, BNPB, KLHK, dll.); Gubernur/Bupati/Kepala Bappeda di Pemda
- Usia: 45-60 tahun
- Latar belakang: kebijakan publik, ekonomi, atau ilmu terkait; **tidak technical GIS**
- Konteks pemakaian: di kantor, beberapa kali per minggu; sering di tablet/laptop saat rapat
- Waktu yang dimiliki: 5-15 menit per sesi

**Kebutuhan utama:**
- Ringkasan eksekutif sangat singkat ("apa yang penting hari ini?")
- Indikator KPI level provinsi/nasional
- Membandingkan skenario kebijakan (Apa dampaknya jika kita lakukan X vs Y?)
- Briefing format untuk rapat (export PDF/PPT)
- Bahasa Indonesia 100%

**Fitur yang sering diakses (dari Katalog Fitur):**
- FITUR 8.3 Executive Summary Auto-Generation (heavy use)
- FITUR 8.4 Custom Report Builder (sesekali, biasanya untuk rapat)
- FITUR 5.3 Impact Analysis Engine (untuk briefing)
- FITUR 6.5 NLP Query (pertanyaan ad-hoc dalam Bahasa Indonesia)
- FITUR 8.2 Dynamic Dashboards (lihat saja)

**Fitur yang JARANG diakses:**
- FITUR 11.1 Hindcasting Tool
- FITUR 5.9 Sensitivity Analyzer
- FITUR 6.7 MCP Server
- Sub-fitur teknis di Bagian 6 dan 11

**Dashboard varian (P1):**
- Layout: 1 KPI banner besar, 1 chart trend, 1 map ringkas
- Tidak ada "Quick Actions: Run Model" — diganti "Quick Actions: Lihat Briefing Hari Ini", "Bandingkan Skenario"
- Modul yang prominent: Reports, Decision Support; modul Hindcasting/Edge disembunyikan di "More"

## 3.2 P2 — Government Planner (Operational)

**Profil:**
- Posisi: Eselon III/IV, Perencana Madya/Muda di K/L atau Pemda; staf Bappeda; tim RDTR di Pemkot/Pemkab
- Usia: 30-50 tahun
- Latar belakang: planologi, geografi, sipil; **familiar dengan GIS dasar** (ArcGIS/QGIS)
- Konteks pemakaian: di kantor, **harian**, sebagai bagian dari alur kerja
- Waktu yang dimiliki: 1-4 jam per sesi

**Kebutuhan utama:**
- Tool yang lengkap untuk analisis (vulnerability, scenario builder, MCDA)
- Data yang dapat di-export ke alat lain (Shapefile, GeoTIFF, Excel)
- Riwayat analisis & versi yang terkelola
- Kolaborasi dengan rekan kerja (komentar, sharing)
- Integrasi ke output RDTR (PRD FR-RDTR)

**Fitur yang sering diakses:**
- FITUR 5.2 Scenario Manager & Planning Builder (heavy)
- FITUR 3.1 Multi-Criteria Vulnerability Assessment (heavy)
- FITUR 4.1 Spatial Planning Support Toolbox (RDTR) (heavy)
- FITUR 8.1 Interactive Map (Advanced) (heavy)
- FITUR 7.1 Multi-Stakeholder Consultation Workflow (medium)
- FITUR 10.1 Data Catalog ISO 19115 (medium)

**Fitur yang KADANG diakses:**
- FITUR 2.x Advanced Modeling (jika perlu detail iklim)
- FITUR 5.5 MCDA Engine, 5.10 Optimization Solver
- FITUR 8.4 Custom Report Builder

**Dashboard varian (P2):**
- Layout: KPI cards 4-in-row, Map besar, Activity Feed lengkap
- Quick Actions: "Lanjutkan Skenario Terakhir", "Buat Vulnerability Map Baru", "Cari Layer"
- Modul yang prominent: SDSS Core, Modeling, Vulnerability, RDTR

## 3.3 P3 — Researcher / Academic

**Profil:**
- Posisi: Dosen/Peneliti di universitas (LIPI/BRIN, ITB, UGM, IPB, dll.); konsultan iklim
- Usia: 30-60 tahun
- Latar belakang: PhD/Master di iklim, geosains, ekologi, atau terkait; **highly technical**
- Konteks pemakaian: di kantor/lab/lapangan, project-based
- Waktu yang dimiliki: variable, bisa berjam-jam dalam satu sesi

**Kebutuhan utama:**
- Akses ke data raw (download), bukan hanya visualisasi
- API untuk programmatic access (Python/R)
- Hindcasting & validation untuk paper akademik
- Sensitivity & uncertainty analysis
- Reproducibility (data lineage)
- Bilingual: kadang berkolaborasi dengan peneliti asing

**Fitur yang sering diakses:**
- FITUR 11.1 Hindcasting Tool
- FITUR 5.9 Sensitivity & Uncertainty Analyzer
- FITUR 11.2 Continuous Model Monitor
- FITUR 10.2 Data Lineage
- FITUR 9.6 API & OGC Services
- FITUR 2.x semua Advanced Modeling
- FITUR 6.9 Explainable AI (XAI)

**Dashboard varian (P3):**
- Layout: ringkas; KPI berbasis project/dataset milik mereka
- Quick Actions: "Lanjutkan Project", "Hindcast Baru", "Download Dataset", "API Docs"
- Modul yang prominent: Modeling, Validation, Data, API

## 3.4 P4 — Private Sector User

**Profil:**
- Posisi: Analis di konsultan engineering/insurance/agribisnis/property
- Usia: 25-45 tahun
- Latar belakang: engineering/finance/business; varied GIS skill
- Konteks pemakaian: project-based dengan kebutuhan spesifik (lokasi pabrik, asuransi, dll.)
- Waktu yang dimiliki: project-driven, biasanya berhari-hari per project

**Kebutuhan utama:**
- Akses terbatas (per TOR §6.a "Private Sectors — Some Limitations")
- Subset data publik + paid premium tier
- Tool spesifik: site selection, risk score
- Export untuk laporan klien (PDF, GeoTIFF)
- Compliance dengan PDP Law (data privacy)

**Fitur yang sering diakses:**
- FITUR 4.6 Renewable Energy Deployment Optimization
- FITUR 4.5 Tourism Sector Vulnerability
- FITUR 3.1 Multi-Criteria Vulnerability (subset)
- FITUR 8.4 Custom Report Builder
- FITUR 8.2 Dashboards (kustom per project)

**Fitur YANG TIDAK BISA diakses:**
- FITUR 7.1 Stakeholder Consultation Workflow (gov-only)
- FITUR 9.3 Audit Logger (gov-only)
- Sensitive integrasi K/L (subset INT-01..06 hanya yang publik)

**Dashboard varian (P4):**
- Layout: berorientasi "Project" — daftar project aktif sebagai zona utama
- Quick Actions: "Project Baru", "Lihat Tarif Premium", "Cari Lokasi"
- Banner: subscription tier (Free/Premium/Enterprise)

## 3.5 P5 — Public User / Citizen

**Profil:**
- Posisi: warga, jurnalis, mahasiswa, NGO worker
- Usia: 18-65 tahun
- Latar belakang: variasi sangat luas
- Konteks pemakaian: ad-hoc, biasanya 1-2 sesi sebelum lupa
- Waktu yang dimiliki: 3-10 menit per sesi

**Kebutuhan utama:**
- Informasi yang **dapat dimengerti tanpa background teknis**
- Peta sederhana dengan layer publik (banjir, kebakaran, kualitas udara)
- Cerita / narasi (story map style)
- Sharing di media sosial
- Aksesibilitas mobile yang excellent

**Fitur yang dapat diakses:**
- FITUR 8.1 Interactive Map (Public Layers only)
- FITUR 8.2 Public Dashboards
- FITUR 8.3 Public Executive Summaries
- FITUR 6.5 NLP Query (subset, no detail data)
- FITUR 7.2 Comments (read-only)

**Fitur YANG TIDAK BISA diakses:**
- Semua yang melibatkan data sensitif, sensitive policy planning, atau sumber daya terbatas (model run)
- SDSS Core (Bagian 5)
- AI training fitur (Bagian 6.1, 6.8)

**Dashboard varian (P5):**
- Tidak ada dashboard dalam arti tradisional
- **Landing page edukatif** dengan: "Apa Climate Action Platform?", featured stories, current alerts publik, link ke peta publik
- Mobile-first design
- Tidak perlu login untuk view; opsional sign-up untuk subscribe alert

## 3.6 Matriks Hak Akses per Persona × Modul

Matriks berikut adalah default per-persona untuk modul utama platform. Hak akses spesifik per-fitur didefinisikan di Katalog Fitur dan dapat di-override per-organisasi via FITUR 9.1 Authentication & Authorization.

| Modul (Bagian Katalog) | P1 Exec | P2 Planner | P3 Researcher | P4 Private | P5 Public |
|------------------------|---------|------------|---------------|------------|-----------|
| Dashboard/Home | ✓ (varian Exec) | ✓ (varian Planner) | ✓ (varian Researcher) | ✓ (varian Private) | Landing publik |
| Map Explorer (8.1) | ✓ (read) | ✓ (full) | ✓ (full) | ✓ (subset layers) | ✓ (public layers) |
| Climate Modeling (Bagian 2) | View results | ✓ Run & view | ✓ Full | ✗ | ✗ |
| Vulnerability (Bagian 3) | View results | ✓ Full | ✓ Full | ✓ Subset | View public maps |
| Sectoral Analysis (Bagian 4) | View results | ✓ Full | ✓ Full | ✓ Subset (4.5, 4.6) | ✗ |
| SDSS Core (Bagian 5) | View results | ✓ Full | ✓ Full | ✓ Subset | ✗ |
| AI Assistant (Bagian 6) | ✓ Query | ✓ Full | ✓ Full | ✓ Subset | ✓ Public Q&A |
| Collaboration (Bagian 7) | ✓ Sign-off only | ✓ Full | ✓ Full | ✗ | ✗ |
| Reports & Viz (Bagian 8) | ✓ Read & Export | ✓ Full | ✓ Full | ✓ Subset | ✓ Read public |
| Platform Services (Bagian 9) | Settings | Settings | Settings & API | Settings | (limited) |
| Data Mgmt (Bagian 10) | View catalog | ✓ Full | ✓ Full + download | ✓ Subset | View catalog (public) |
| Hindcasting (Bagian 11) | ✗ | View results | ✓ Full | View only | ✗ |
| Edge/Mobile (Bagian 12) | ✓ Mobile | ✓ Mobile + Field | ✓ Mobile | ✓ Mobile | ✓ Mobile |
| External Integrations (Bagian 13) | View status | ✓ Full | ✓ Full | View | ✗ |

Legenda: ✓ = akses; ✗ = tidak akses; "View" / "View results" = read-only di sub-fitur tertentu

---

# BAGIAN 4 — INFORMATION ARCHITECTURE (SITEMAP LENGKAP)

## 4.1 Pohon Navigasi Level 1 (Modul Utama)

Setelah menganalisis 62 fitur di Katalog Fitur v2.2 dan workflow tipikal 5 persona, navigasi level 1 platform direkomendasikan dalam **10 modul utama**:

```
Climate Action Platform
│
├── 🏠 Dashboard (Home)
├── 🗺  Map Explorer
├── 🌡  Climate Modeling
├── ⚠  Vulnerability Assessment
├── 🏭 Sectoral Analysis
├── 🧭 Decision Support (SDSS Core)
├── 🤖 AI Assistant (selalu floating)
├── 🤝 Collaboration
├── 📊 Reports & Outputs
├── 💾 Data Catalog
└── ⚙  Settings & Admin
```

**Catatan keputusan desain (mengapa 10 modul, bukan 13 sesuai BAGIAN katalog):**

| Aspek | Penjelasan |
|-------|------------|
| BAGIAN 9 "Platform Services" | Dipecah: Auth/Audit → Settings; API & OGC → Settings → Developer; Notifikasi → bagian global (top bar) |
| BAGIAN 11 "Hindcasting & Validation" | Digabung ke "Climate Modeling" (sebagai sub-section "Validation"), karena hindcast secara konseptual adalah bagian dari modeling lifecycle |
| BAGIAN 12 "Edge & Mobile PWA" | **Infrastruktur transparan**, tidak menjadi modul UI tersendiri — fitur ini mempengaruhi semua modul melalui responsive design |
| BAGIAN 13 "External Integrations" | Dipecah: status integrasi → Settings → Integrations; konsumsi data → tersembunyi di dalam Data Catalog (one map, BMKG, BPS layers tampil di catalog seperti layer lain) |

## 4.2 Penempatan 62 Fitur di Sitemap

```
🏠 Dashboard (Home)                                    [Halaman utama; selalu landing]
   │
   ├─ Konteks Bar (provinsi, periode, scenario)
   ├─ KPI Cards (4 angka utama)
   ├─ Mini Risk Map (FITUR 8.1 embedded)
   ├─ Activity Feed (FITUR 7.2 + history)
   ├─ Quick Actions (top 3-4 per persona)
   ├─ Module Grid (pintu ke 10 modul)
   └─ Footer Status (system health, GeoVertix uptime)

🗺  Map Explorer                                       [FITUR 8.1 full screen]
   │
   ├─ Layer Switcher
   ├─ Time Slider (multi-temporal)
   ├─ Scenario Picker
   ├─ Drawing Tools
   ├─ Measurement Tools
   ├─ Print/Export to Map (FITUR 8.4 mini)
   └─ Saved Locations (per-user pin)

🌡  Climate Modeling                                  [Module landing → daftar fitur]
   │
   ├─ 2.1 Advanced Climate Modeling
   ├─ 2.2 LULC Change Detection
   ├─ 2.3 Net Carbon Footprint
   ├─ 2.4 Biodiversity Mapping
   ├─ 2.5 Sea Level Rise & Subsidence
   ├─ 2.6 Flood & Drought Modeling
   ├── Validation (sub-section)
   │   ├─ 11.1 Hindcasting Tool
   │   └─ 11.2 Continuous Model Monitor
   └── Model Compression (sub-section)
       └─ 12.3 Model Compression

⚠  Vulnerability Assessment                           [Module landing]
   │
   ├─ 3.1 Multi-Criteria Vulnerability Assessment
   └─ 3.2 Dynamic Vulnerability System Modeling

🏭 Sectoral Analysis                                   [Module landing]
   │
   ├─ 4.1 Spatial Planning Support Toolbox (RDTR)
   ├─ 4.2 Food Security (Rice Field)
   ├─ 4.3 Coastal Vulnerability
   ├─ 4.4 Forest Fire Risk (ENSO-aware)
   ├─ 4.5 Tourism Sector Vulnerability
   ├─ 4.6 Renewable Energy Optimization
   └─ 4.7 Land Carrying Capacity

🧭 Decision Support (SDSS Core)                        [Module landing]
   │
   ├─ 5.1 Multi-Level Decision Support (entry by role)
   ├─ 5.2 Scenario Manager & Planning Builder
   ├─ 5.3 Impact Analysis Engine
   ├─ 5.4 Customizable Adaptation Recommendation
   ├─ 5.5 MCDA Engine
   ├─ 5.6 Context-Aware Recommendation Engine
   ├─ 5.7 Group Decision-Making
   ├─ 5.8 Simulation & What-If Tool
   ├─ 5.9 Sensitivity & Uncertainty Analyzer
   └─ 5.10 Optimization Solver

🤖 AI Assistant                                        [Floating panel + dedicated page]
   │
   ├─ 6.5 Natural Language Query (interface utama)
   ├─ 6.6 RAG Pipeline & Knowledge Base (background)
   ├─ 6.7 MCP Server (background, dev-visible only)
   ├─ 6.1 Image & Pattern Recognition (page khusus)
   ├─ 6.2 Anomaly Detection & EWS (alerts feed)
   ├─ 6.3 Predictive Modeling Framework (dev/researcher)
   ├─ 6.4 Scenario-Based Analysis Engine (linked from 5.2)
   ├─ 6.8 Federated Learning (admin/researcher)
   └─ 6.9 Explainable AI (XAI) (sub-tab di setiap AI output)

🤝 Collaboration                                       [Module landing]
   │
   ├─ 7.1 Multi-Stakeholder Consultation Workflow
   ├─ 7.2 Annotation & Comment System (lintas-fitur)
   └─ 7.3 Scenario Comparison Tool

📊 Reports & Outputs                                   [Module landing]
   │
   ├─ 8.1 Interactive Map (Advanced) ← LINK ke Map Explorer
   ├─ 8.2 Dynamic Dashboards
   ├─ 8.3 Executive Summary Auto-Generation
   └─ 8.4 Custom Report Builder

💾 Data Catalog                                        [Module landing]
   │
   ├─ 10.1 Data Catalog ISO 19115 (browse, search)
   ├─ 10.2 Data Lineage
   ├─ 10.3 Data Quality Dashboard
   ├─ 10.4 Stream Processor (admin)
   ├─ 10.5 Data Versioning
   ├── External (sub-section)
   │   ├─ 13.1 One Map Policy (BIG)
   │   ├─ 13.2 BNPB InaRISK/InaSAFE
   │   ├─ 13.3 BMKG Climate Service
   │   ├─ 13.4 KLHK SIGN-SMART
   │   └─ 13.5 BPS Socio-economic
   └── Upload Data (link ke FITUR 10.1 upload form)

⚙  Settings & Admin                                    [Module landing]
   │
   ├─ Profile (user setting per-user)
   ├─ 9.1 Authentication & Authorization (admin tier)
   ├─ 9.2 Notification Settings (per-user)
   ├─ 9.3 Audit Logger (admin only)
   ├─ 9.4 i18n / Language (per-user)
   ├─ 9.5 Onboarding / Tutorial (re-trigger)
   ├─ 9.6 API & Developer (researcher/dev)
   ├─ Integrations Status (referensi 13.x admin view)
   └─ About / Help
```

**Total fitur tertempatkan:** 62/62. Semua fitur memiliki home di sitemap.

## 4.3 Konvensi URL & Routing

Platform menggunakan **client-side routing** (React Router / Next.js) dengan URL **bermakna** dan **shareable**.

### Pola URL utama

| Pola | Contoh | Penjelasan |
|------|--------|------------|
| `/` | `https://climate.big.go.id/` | Landing publik (P5) atau redirect ke `/dashboard` jika logged in |
| `/dashboard` | `/dashboard` | Halaman utama per persona |
| `/map` | `/map` | Map Explorer (full screen) |
| `/map?layers=flood,slr&province=sulsel` | (query string) | Map dengan state preset |
| `/modeling` | `/modeling` | Climate Modeling module landing |
| `/modeling/climate-advanced` | `/modeling/climate-advanced` | Detail fitur 2.1 |
| `/vulnerability/mcda?province=sulsel` | `/vulnerability/mcda?province=sulsel` | Vulnerability MCDA dengan state |
| `/sdss/scenarios/scn-2026-001` | `/sdss/scenarios/scn-2026-001` | Detail scenario tertentu |
| `/ai` | `/ai` | AI Assistant dedicated page |
| `/collab/consultation/cons-042` | `/collab/consultation/cons-042` | Halaman consultation session |
| `/reports/exec-summary` | `/reports/exec-summary?province=sulsel&date=2026-05` | Auto-gen exec summary |
| `/data` | `/data` | Data Catalog browse |
| `/data/layer/{layer-id}` | `/data/layer/banjir-sulsel-2024` | Detail layer (preview, metadata, download) |
| `/settings` | `/settings/profile` | Settings landing |
| `/settings/api` | `/settings/api` | API & developer |
| `/public/{slug}` | `/public/sulsel-flood-2024` | Halaman publik (story map / dashboard publik) |

### Deep linking & shareability

Setiap state penting dapat di-link via URL:
- Province context: `?province=sulsel`
- Time period: `?from=2025-01&to=2050-12`
- Scenario: `?scenario=ssp2-45`
- Layer set: `?layers=flood,slr,population`

Implementasi: state penting di-serialize ke URL query string (debounced ~500ms) untuk memungkinkan share link via email/Slack.

### Auth-required routes

Semua route kecuali `/`, `/public/*`, `/login`, `/forgot` membutuhkan login. Redirect ke `/login?return=<original>` jika tidak ter-autentikasi.

## 4.4 Breadcrumb Schema

Breadcrumb adalah cara sekunder navigasi (selain sidebar). Mereka **selalu** muncul di top dari content area kecuali di halaman home dan map full-screen.

### Pola breadcrumb

| Halaman | Breadcrumb |
|---------|------------|
| Dashboard | (tidak ada — sudah home) |
| Map Explorer | (tidak ada — full screen) |
| Module landing | `Home > Climate Modeling` |
| Feature page | `Home > Climate Modeling > Advanced Climate Modeling` |
| Sub-page in feature | `Home > Climate Modeling > Advanced Climate Modeling > Run #2026-042` |
| Cross-link context | `Home > SDSS > Scenarios > #scn-001 > Impact on Vulnerability` |

### Behaviour

- Setiap link breadcrumb adalah **clickable** dan navigasi balik
- Item terakhir tidak clickable (current page)
- Maksimum 4 level breadcrumb; level lebih dalam dikolaps menjadi `...`
- Breadcrumb juga sebagai **anchor untuk deep-linking** dari emails / notifications

---

# BAGIAN 5 — SISTEM NAVIGASI

Sistem navigasi adalah kerangka yang menampung semua content. Ia terdiri dari delapan komponen yang **persisten lintas-halaman**.

## 5.1 Top Bar Global

Top bar adalah baris navigasi paling atas, **selalu tampil** kecuali di mode "Full-Screen Map" (yang juga tetap punya overlay version).

### Wireframe Top Bar (Desktop, ~1280-1920px)

```
+--------------------------------------------------------------------------+
| [☰] [🌐 LOGO]  CLIMATE ACTION  | [🔍 Cari layer, scenario, atau fitur..] |
|                                                                            |
|     [🌍 Sulawesi Selatan ▾] [📅 2025-2050 ▾] [🎯 SSP2-4.5 ▾]              |
|                                                                            |
|                            [🤖 AI] [🔔 3] [🌐 ID ▾] [👤 Ahmad K. ▾]      |
+--------------------------------------------------------------------------+
```

### Komponen dari kiri ke kanan

| Komponen | Fungsi | Behaviour |
|----------|--------|-----------|
| `[☰]` Hamburger | Toggle sidebar collapse/expand | Klik → sidebar slide in/out (animasi 200ms) |
| Logo BIG + "Climate Action" | Brand & home link | Klik → kembali ke `/dashboard` |
| Global Search 🔍 | Spotlight-style search | Klik / `⌘K` → modal search; cari layer, scenario, fitur, report, dokumentasi |
| Context Bar (dijelaskan di §5.3) | Province / period / scenario | Hanya muncul saat halaman membutuhkan konteks |
| AI Launcher 🤖 | Buka AI Assistant panel | Klik → side drawer AI; `⌘+I` shortcut |
| Notifications 🔔 | Notifikasi sistem & alerts | Klik → dropdown 5 notifikasi terkini + link "All" |
| Language Toggle 🌐 | ID ↔ EN | Klik → langsung toggle (no reload) |
| User Menu 👤 | Profile, settings, logout | Klik → dropdown menu |

### State khusus

- **Crisis Mode aktif:** background top bar berubah jadi gradient kuning→merah; muncul banner di bawah top bar: `⚠ MODE KRISIS: Banjir Bandang Sulsel — Lihat Briefing`
- **Offline / GeoVertix down:** indikator kecil di samping logo: `● GeoVertix Offline (Mode Cache)`
- **Maintenance:** banner sticky di bawah top bar: `🔧 Maintenance terjadwal hari Minggu 03:00-05:00 WIB`

### Mobile adaptation (< 768px)

```
+------------------------------------------+
| [☰]  CLIMATE ACTION     [🔍] [🔔] [👤] |
+------------------------------------------+
```

Context Bar dan Language toggle di-hide di mobile top bar; diakses via hamburger menu.

## 5.2 Left Sidebar (Primary Navigation)

Left sidebar adalah navigasi primer. Ia **persistent** di semua halaman kecuali Map full-screen dan modal-modal.

### Wireframe Sidebar (Expanded, Desktop)

```
+---------------------+
| ⌂ Dashboard         |  ← Halaman utama / home
| 🗺  Map Explorer    |  ← FITUR 8.1
| ─────────────       |
|                     |
| 🌡  Modeling     ▾  |  ← Expandable
|   ├ Climate Advanced|
|   ├ LULC Change     |
|   ├ Carbon Footprint|
|   ├ Biodiversity    |
|   ├ SLR & Subsidence|
|   ├ Flood & Drought |
|   └ Validation      |  ← Hindcasting + Monitor
|                     |
| ⚠  Vulnerability    |
| 🏭 Sectoral      ▾  |
|   ├ RDTR Support    |
|   ├ Food Security   |
|   ├ Coastal         |
|   ├ Forest Fire     |
|   ├ Tourism         |
|   ├ Renewable Energy|
|   └ Carrying Capac. |
|                     |
| 🧭 Decision Support |
| 🤝 Collaboration    |
| 📊 Reports          |
| ─────────────       |
| 💾 Data Catalog     |
| ⚙  Settings         |
+---------------------+
| ● System OK         |  ← Footer status
| GVX: 99.8%          |
+---------------------+
```

### Sidebar Collapsed (Icon-Only)

```
+----+
| ⌂  |
| 🗺  |
| ─  |
| 🌡  |
| ⚠  |
| 🏭 |
| 🧭 |
| 🤝 |
| 📊 |
| ─  |
| 💾 |
| ⚙  |
+----+
| ●  |
+----+
```

Hover icon → tooltip dengan nama modul.

### Behaviour

- **Default state:** expanded (240px width) untuk pengguna baru; user preference disimpan di localStorage
- **Toggle:** hamburger `[☰]` di top bar atau shortcut `[`
- **Active state:** modul aktif highlighted (background biru muda + bar kiri biru tua)
- **Submenu:** klik modul dengan `▾` → expand inline; hanya satu submenu open at a time (akordion)
- **Mobile:** sidebar → drawer; default hidden, slide in dari kiri saat hamburger di-tap

### Persona-aware visibility

Sidebar item yang tidak relevan untuk persona aktif **disembunyikan**, bukan hanya di-disable. Contoh untuk P1 (Executive):

```
+---------------------+
| ⌂ Dashboard         |
| 🗺  Peta            |
| 🧭 Decision Support |  ← Executive: hanya scenario picker + impact view
| 📊 Reports          |
| 🤝 Collaboration    |  ← read-only / sign-off
| ─────────────       |
| ⚙  Settings         |
+---------------------+
```

Module "Modeling", "Vulnerability", "Sectoral", "Data Catalog" disembunyikan untuk P1 (mereka bisa lihat **hasil**-nya via Reports/Map, tidak menjalankan modelnya).

## 5.3 Context Bar (Spatial-Temporal-Scenario Selector)

Context Bar adalah **inovasi kunci** desain ini. Dia menampung **state global yang dipakai lintas-fitur**: lokasi, periode waktu, dan skenario aktif.

### Wireframe Context Bar

```
+----------------------------------------------------------------------------+
|  [🌍 Sulawesi Selatan ▾]  [📅 2025 — 2050 ▾]  [🎯 SSP2-4.5 ▾]              |
|                                                                              |
|  Pin: [Makassar] [Palopo] [+]   |   ❌ Reset semua                          |
+----------------------------------------------------------------------------+
```

### Logika

| Selector | Pengaruh |
|----------|----------|
| **Province / Region** | Mempengaruhi: peta center & extent, default layer (provinsi-specific), filter di table/list |
| **Time Period** | Mempengaruhi: time slider default, data filter, forecast horizon, hindcasting window |
| **Scenario** | Mempengaruhi: dataset climate yang dipakai, prediksi, recommendation engine output |

### State persistence

- State Context Bar **persist** lintas-halaman dalam satu sesi (Redux/Zustand store).
- Saat user pindah dari Vulnerability ke Modeling, konteks yang sama dipertahankan.
- Tombol "Reset" mengembalikan ke default per persona.
- State Context Bar di-serialize ke URL untuk deep-linking (§4.3).

### Kapan Context Bar TIDAK tampil

- Di Map Explorer (sudah ada di sidebar peta itu sendiri)
- Di halaman Settings, About, Help
- Di halaman global non-spasial (mis. Notifications page)
- Di Public landing (P5)

### Pin Lokasi

Pengguna dapat menambah "Pin" lokasi favorit (kabupaten, kota). Pin tersimpan di profile dan bisa di-klik untuk cepat zoom ke lokasi tersebut + scope analisis ke wilayah itu.

## 5.4 Quick Actions Bar

Quick Actions adalah baris tombol-tombol cepat di bawah Context Bar. Mereka **persona-aware** dan **context-aware**.

### Wireframe Quick Actions (Desktop, persona P2 di Halaman Utama)

```
+------------------------------------------------------------------------+
| ⚡ Aksi Cepat:                                                          |
| [➕ Skenario Baru]  [🔍 Cari Layer]  [📊 Buat Report]  [🤖 Tanya AI]   |
+------------------------------------------------------------------------+
```

### Varian per persona di Halaman Utama

| Persona | Quick Actions (Top 3-4) |
|---------|---------------------------|
| P1 Exec | `📋 Briefing Hari Ini` `🔄 Bandingkan Skenario` `📈 Lihat Trend` |
| P2 Planner | `➕ Skenario Baru` `🔍 Cari Layer` `📊 Buat Report` `🤖 Tanya AI` |
| P3 Researcher | `📂 Lanjut Project` `🧪 Hindcast Baru` `📥 Download Data` `🔬 API Docs` |
| P4 Private | `🏗 Site Selection` `📊 Risk Report` `💼 Project Baru` |
| P5 Public | `🗺 Peta Banjir` `📰 Cerita Terbaru` `🔔 Subscribe Alert` |

### Crisis Mode override

Saat Crisis Mode aktif, Quick Actions seluruh persona di-override ke:
```
[🚨 Peta Real-Time]  [📞 Hubungi BNPB]  [📋 Laporan Krisis]  [🔄 Refresh Data]
```

### Context-aware behavior

Quick Actions juga **berubah per halaman**. Di halaman feature, baris ini menjadi "Feature-Specific Quick Actions" yang ditentukan per feature di Katalog Fitur.

## 5.5 Global Search (Spotlight)

Search global adalah jalur **tercepat** untuk sampai ke apa saja: layer, scenario, fitur, report, dokumentasi, kontak.

### Wireframe Search Modal

```
+----------------------------------------------------------------+
|  🔍 Cari layer, scenario, fitur, atau pengguna...              |
|                                                                  |
|  Saran (terkini):                                               |
|  └ "banjir sulsel"                                              |
|  └ "scenario rdtr makassar"                                     |
|                                                                  |
|  Hasil (saat mengetik):                                         |
|  ── Fitur ───────────────────────────                           |
|  🌡  Advanced Climate Modeling (2.1)                            |
|  🌡  Flood & Drought Modeling (2.6)                             |
|  ── Layer Data ─────────────────────                            |
|  🗺  Banjir Sulsel 2024 (data 7 jan)                            |
|  🗺  Curah Hujan BMKG Sulsel (data harian)                      |
|  ── Skenario ─────────────────────                              |
|  🎯 Skenario RDTR Makassar 2030 (oleh Budi, 3hr lalu)           |
|  ── Report ──────────────────────                               |
|  📄 Q1 2026 Climate Risk Sulsel (publikasi 5 jan)               |
|  ── Pengguna ────────────────────                               |
|  👤 Budi P. (Bappeda Sulsel)                                    |
|                                                                  |
|  Tip: ↑↓ navigasi   Enter buka   Esc tutup                      |
+----------------------------------------------------------------+
```

### Behaviour

- Trigger: klik search box atau `⌘K` (Mac) / `Ctrl+K` (Win)
- Modal di tengah, latar belakang dimmed
- Search type: typeahead, debounce 200ms, fuzzy match
- Kategori hasil: Fitur, Layer, Skenario, Report, Pengguna, Dokumentasi
- Maksimum 3 hasil per kategori; klik kategori header untuk see all
- Keyboard navigation full (↑↓ select, Enter open, Tab kategori, Esc close)
- Recent searches (last 5) muncul saat search box kosong
- Saved searches (bisa di-pin) untuk akses berulang

### Search index

Search index dibangun dari:
- **Static:** seluruh nama fitur dari Katalog Fitur (62 entries)
- **Dynamic:** Data Catalog (FITUR 10.1) untuk layers
- **Dynamic:** Scenarios DB (FITUR 5.2)
- **Dynamic:** Reports DB (FITUR 8.4)
- **Dynamic:** User directory (FITUR 9.1)

### Search di mobile

Search box di-collapse menjadi icon `🔍` di top bar; tap → buka modal full-screen.

## 5.6 AI Assistant Launcher (Floating)

AI Assistant adalah perwujudan **Prinsip 2.4 Always-On AI**. Ia diakses dari mana saja.

### Wireframe AI Launcher (closed)

```
                                                       +----------+
                                                       |   🤖     |
                                                       |  Tanya   |
                                                       +----------+
```

Floating button di pojok kanan bawah, persisten lintas-halaman.

### Wireframe AI Panel (open, side drawer)

```
+--------+----------------------------------------------+
|        |  🤖 Tanya AI                          [X]   |
|        |  ─────────────────────────────────────       |
| (main  |  Konteks aktif: Sulawesi Selatan,           |
| page   |                 2025-2050, SSP2-4.5         |
| tetap  |  ─────────────────────────────────────       |
| terli- |                                              |
| hat di |  🤖 Halo Ahmad! Saya bisa bantu apa hari    |
| balik  |     ini? Coba tanya:                        |
| panel) |     • "Lokasi banjir terburuk?"             |
|        |     • "Bandingkan skenario A vs B"          |
|        |                                              |
|        |  ──────────────────────────────────────     |
|        |                                              |
|        |  Anda: Lokasi banjir sulsel 2050?           |
|        |                                              |
|        |  🤖 Berdasarkan model SSP2-4.5, lokasi       |
|        |     dengan risiko banjir tertinggi pada     |
|        |     2050 di Sulsel:                          |
|        |     1. Pesisir Makassar (depth 1.5-2.5m)    |
|        |     2. Wajo (di sekitar Sungai Walanae)    |
|        |     3. Bone selatan                          |
|        |     [🗺 Lihat di Peta] [📋 Detail]          |
|        |                                              |
|        |  ──────────────────────────────────────     |
|        |                                              |
|        |  [ Ketik pertanyaan... ]    [🎤] [➤]        |
|        |                                              |
|        |  💾 Pin jawaban  📤 Bagi  ⚙ Settings        |
+--------+----------------------------------------------+
```

### Behaviour

- Trigger: klik floating `🤖` button atau `⌘+I` shortcut
- Panel slide in dari kanan (400px width desktop, 100% mobile)
- **Konteks aktif** ditampilkan di header — agar pengguna tahu AI akan menjawab dalam konteks tertentu
- Panel **tidak menutup** main content — pengguna bisa scroll halaman utama sambil bertanya
- Voice input via `🎤` (FITUR 6.5 opsional)
- Pin jawaban → di-attach sebagai "AI Insight Card" di halaman aktif (dipakai untuk dokumentasi)
- History percakapan disimpan per user; bisa di-resume

### Konteks yang otomatis di-pass ke AI

- Province aktif (Context Bar)
- Periode waktu aktif
- Skenario aktif
- Layer yang sedang ditampilkan di Map (jika di Map Explorer)
- Halaman yang sedang dibuka (untuk follow-up questions)

Detail teknis AI ada di FITUR 6.5 (NLP Query) dan FITUR 6.6 (RAG Pipeline).

## 5.7 Breadcrumbs

Sudah dijelaskan di §4.4. Posisi visual: tepat di atas content area, di bawah Quick Actions Bar.

```
Home > Vulnerability > MCDA Assessment > Run #2026-042
```

## 5.8 Bottom Status Bar

Status bar adalah **footer minimalis** yang menampilkan kesehatan sistem dan info kontekstual.

### Wireframe

```
+----------------------------------------------------------------+
| ● Online | Data fresh: 23m lalu | GVX: 99.8% | 5 jobs ⏳ | v1.2|
+----------------------------------------------------------------+
```

### Konten

| Item | Penjelasan |
|------|------------|
| ● Online | Status koneksi pengguna |
| Data fresh | Berapa lama lalu data utama di-update (Layer Sentinel, BMKG, dll.) |
| GVX | Uptime GeoVertix (24h rolling) |
| Jobs | Jumlah tugas background yang sedang berjalan untuk user ini (klik → lihat detail) |
| v1.2 | Versi platform (klik → release notes) |

### Behaviour

- Hover item → tooltip dengan detail
- Klik item → page detail (mis. klik "5 jobs" → Tasks page)
- Background warna: hijau muda jika semua OK, kuning jika ada warning, merah jika ada error
- Di mobile: hanya tampil di pull-down panel (tidak persistent untuk hemat ruang)

## 5.9 Keyboard Shortcuts

Pengguna power-user (terutama P2 Planner dan P3 Researcher) bergantung pada keyboard. Berikut shortcut yang harus tersedia:

| Shortcut | Aksi |
|----------|------|
| `⌘K` / `Ctrl+K` | Buka Global Search |
| `⌘I` / `Ctrl+I` | Buka AI Assistant |
| `⌘/` / `Ctrl+/` | Lihat daftar shortcut (cheat sheet) |
| `[` | Toggle sidebar |
| `M` | Buka Map Explorer |
| `H` | Kembali ke Home/Dashboard |
| `G then D` | Go to Dashboard (vim-style chord) |
| `G then M` | Go to Map |
| `G then V` | Go to Vulnerability |
| `G then S` | Go to SDSS / Decision Support |
| `G then R` | Go to Reports |
| `Esc` | Tutup modal / drawer aktif |
| `?` | Buka context-aware help |

Cheat sheet dapat di-toggle on di setting per-user (P3 default on, lainnya off).

---

# BAGIAN 6 — HALAMAN UTAMA (DASHBOARD / HOME)

Halaman utama adalah **landing page** setelah login. Ia adalah halaman yang paling sering dilihat dan harus memenuhi tujuan ganda:

1. Memberikan **ringkasan situasional** ("apa yang penting saat ini?")
2. Menjadi **launchpad** ke fitur-fitur (62 features) dengan navigasi efisien

## 6.1 Tujuan Halaman Utama

| Tujuan | Bagaimana Diwujudkan |
|--------|----------------------|
| **Situational Awareness** | KPI cards menampilkan 4 angka utama; mini-map menampilkan area perhatian; Activity Feed menampilkan event terkini |
| **Quick Access** | Quick Actions bar dengan 3-4 aksi tersering per persona |
| **Modul Discovery** | Module Grid menampilkan 10 modul utama dengan count fitur; visual cues untuk modul yang sering dipakai |
| **System Health Visibility** | Bottom Status Bar memberikan one-glance health |
| **Onboarding Friendly** | Untuk pengguna baru: tour overlay; banner welcome dengan link tutorial |
| **Crisis Awareness** | Jika ada krisis aktif, banner override; semua zona menjadi crisis-focused |

## 6.2 Wireframe Lengkap (Desktop, ~1440px)

```
+--------------------------------------------------------------------------------------------+
| [☰] [🌍] CLIMATE ACTION   [🔍 Cari...]                  [🤖] [🔔3] [🌐 ID] [👤 Ahmad ▾]   |  Top Bar (§5.1)
+--------------------------------------------------------------------------------------------+
|     | [🌍 Sulawesi Selatan ▾]  [📅 2025–2050 ▾]  [🎯 SSP2-4.5 ▾]    Pin: [Makassar] [+]  |  Context Bar (§5.3)
| S   +--------------------------------------------------------------------------------------+
| I   |                                                                                       |
| D   | ⚡ Aksi Cepat:  [➕ Skenario Baru]  [🔍 Cari Layer]  [📊 Buat Report]  [🤖 Tanya AI]  |  Quick Actions (§5.4)
| E   +--------------------------------------------------------------------------------------+
| B   |  ╔════════════╗ ╔════════════╗ ╔════════════╗ ╔════════════╗                         |
| A   |  ║ Provinsi   ║ ║ Risk       ║ ║ Model      ║ ║ Active     ║                         |
| R   |  ║ Aktif      ║ ║ Alerts     ║ ║ Running    ║ ║ Scenarios  ║                         |
|     |  ║            ║ ║            ║ ║            ║ ║            ║                         |
| (§  |  ║   18/18    ║ ║    3  ⚠   ║ ║    5  ⏳  ║ ║    12      ║                         |  Zone 3: KPI Cards (§6.5)
| 5.2)|  ║   ↑ 0      ║ ║   ↑ 1     ║ ║   ↓ 2     ║ ║   ↑ 3      ║                         |
|     |  ║ vs Q1      ║ ║ vs minggu ║ ║ vs kemarin║ ║ vs minggu  ║                         |
|     |  ║            ║ ║           ║ ║           ║ ║            ║                          |
|     |  ╚════════════╝ ╚════════════╝ ╚════════════╝ ╚════════════╝                         |
|     +--------------------------------------------------------------------------------------+
|     |                                              |                                       |
|     |  📍 Peta Risiko Saat Ini                     |  📋 Aktivitas Terkini                |
|     |  ┌──────────────────────────────────┐       |  ┌────────────────────────────────┐  |
|     |  │ Layer aktif:                      │      |  │ ⚠ Risk Alert: Banjir Wajo      │  |
|     |  │ ☑ Banjir   ☐ SLR   ☐ Karhutla    │      |  │   2 jam lalu — Budi            │  |
|     |  │                                   │      |  │                                  │  |
|     |  │   ┌─────────────────────────┐     │      |  │ 📝 Komentar di Sulsel-Flood    │  |
|     |  │   │ [Sulawesi Selatan map  │     │      |  │   3 jam lalu — Rina            │  |
| Zone 4│   │  with flood risk        │     │      |  │                                  │  | Zone 5: Activity Feed (§6.7)
| Risk │   │  overlay, color graded] │     │      |  │ 📄 Report Q1 2026 published   │  |
| Map  │   │                          │     │      |  │   1 hari lalu — Ahmad          │  |
| (§6.6)│   │  zoom controls          │     │      |  │                                  │  |
|     |  │   │  legend                 │     │      |  │ 🎯 New Scenario by Citra        │  |
|     |  │   │                          │     │      |  │   2 hari lalu — Citra          │  |
|     |  │   └─────────────────────────┘     │      |  │                                  │  |
|     |  │                                   │      |  │ 🤖 AI Insight: "Wajo butuh..."  │  |
|     |  │ Insight: 12 kab risk tinggi      │      |  │   3 hari lalu — system         │  |
|     |  │ [🗺 Buka di Peta Full]           │      |  │                                  │  |
|     |  └──────────────────────────────────┘       |  │ [→ Lihat semua aktivitas]      │  |
|     |                                              |  └────────────────────────────────┘  |
|     +--------------------------------------------------------------------------------------+
|     |                                                                                       |
|     |  📂 Modul Platform                                                                    |
|     |                                                                                       |
|     |  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                              |
|     |  │  🌡    │ │  ⚠   │ │  🏭   │ │  🧭   │ │  🤖   │                              |  Zone 7: Module Grid (§6.9)
|     |  │Climate │ │Vulne-  │ │Sect-   │ │ SDSS   │ │  AI    │                              |
|     |  │Modeling│ │rability│ │oral    │ │Decision│ │Assist  │                              |
|     |  │        │ │        │ │Analysis│ │Support │ │ant     │                              |
|     |  │  (8)   │ │  (2)   │ │  (7)   │ │  (10)  │ │  (9)   │                              |
|     |  │ Fitur  │ │ Fitur  │ │ Fitur  │ │ Fitur  │ │ Fitur  │                              |
|     |  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘                              |
|     |                                                                                       |
|     |  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                              |
|     |  │  🤝   │ │  📊   │ │  💾   │ │  🗺    │ │  ⚙    │                              |
|     |  │Collab- │ │Reports │ │ Data   │ │ Map    │ │Settings│                              |
|     |  │oration │ │ &      │ │Catalog │ │Explorer│ │ &      │                              |
|     |  │        │ │Outputs │ │        │ │        │ │ Admin  │                              |
|     |  │  (3)   │ │  (4)   │ │  (10)  │ │  full  │ │  varies│                              |
|     |  │ Fitur  │ │ Fitur  │ │ Fitur  │ │        │ │        │                              |
|     |  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘                              |
|     +--------------------------------------------------------------------------------------+
| Sta-| ● Online | Data fresh: 23m | GVX: 99.8% | 5 jobs ⏳ | v1.2                            |  Footer (§5.8)
| tus +--------------------------------------------------------------------------------------+
+-----+
```

## 6.3 Zona 1 — Header Bar

Sudah dijelaskan di §5.1. Posisi: paling atas, full width, sticky (mengikuti scroll).

## 6.4 Zona 2 — Context Bar

Sudah dijelaskan di §5.3. Posisi: di bawah header, sticky. State dari context bar **mempengaruhi semua zona di bawahnya** (KPI, Map, Activity feed di-filter sesuai konteks).

### Behaviour spesifik di Halaman Utama

- Saat user mengubah Province di Context Bar, halaman utama **otomatis re-render**:
  - KPI cards updated dengan angka provinsi baru
  - Mini Risk Map zoom ke provinsi baru
  - Activity Feed filtered ke event di provinsi tersebut
  - Module Grid tetap sama (modul tidak provinsi-specific)
- Transisi smooth (animasi 300ms cross-fade)
- Loading state: skeleton di KPI dan Map saat data baru di-fetch

## 6.5 Zona 3 — KPI Cards Row

Empat kartu KPI yang menampilkan metrik utama. Pemilihan KPI **sangat strategis** karena ini menentukan apa yang dianggap "penting" oleh platform.

### KPI Default (untuk P2 Planner)

| # | KPI | Sumber Data | Formula | Indikator |
|---|-----|-------------|---------|-----------|
| 1 | **Provinsi Aktif** | FITUR 9.1 user mgmt + provinsi metadata | Count provinsi yang punya data updated < 30hr | Trend vs 3 bulan lalu |
| 2 | **Risk Alerts** | FITUR 6.2 Anomaly Detection | Count alerts unresolved | Trend vs minggu lalu, badge color (kuning/merah) |
| 3 | **Model Running** | FITUR 11.2 Model Monitor + Tasks API GVX-09 | Count tasks in-progress (background) | Trend vs kemarin |
| 4 | **Active Scenarios** | FITUR 5.2 Scenario Manager DB | Count scenarios "draft" + "consultation" status | Trend vs minggu lalu |

### KPI per Persona

| Persona | KPI 1 | KPI 2 | KPI 3 | KPI 4 |
|---------|-------|-------|-------|-------|
| P1 Exec | Provinsi Aktif | Risk Index Nasional (0-100) | Action Items Pending | Reports Diterbitkan Bulan Ini |
| P2 Planner | Provinsi Aktif | Risk Alerts | Model Running | Active Scenarios |
| P3 Researcher | Active Projects | Hindcasts Running | Datasets Updated | Publications Cited |
| P4 Private | Active Projects | Premium Tier Days Left | Reports Saved | Custom Layers |

### Behaviour KPI Card

- Klik kartu → drill-down ke halaman detail metric
- Trend indicator: panah ↑/↓/− dengan angka delta + warna (hijau=baik, merah=buruk, abu=netral)
- Tooltip on hover: penjelasan lebih lanjut + "diperbarui X menit lalu"
- Loading: skeleton bar
- Error: kartu menampilkan ikon ⚠ dengan retry button

### Wireframe detail satu KPI Card

```
+------------------------+
| Provinsi Aktif         |
|                        |
|       18 / 18          |
|                        |
| ↑ 0  vs Q1 2026        |
|                        |
| ╶── stable ───         |
|                        |
| [→ Lihat detail]       |
+------------------------+
```

## 6.6 Zona 4 — Risk Map (Inline)

Mini map embeddable di halaman utama. **Bukan** versi penuh Map Explorer, tapi **preview** yang dapat di-expand.

### Layer default per persona

| Persona | Layer Default |
|---------|----------------|
| P1 Exec | Risk Index Aggregate (1 layer, summarized) |
| P2 Planner | Banjir + SLR + Karhutla (3 layers, toggleable) |
| P3 Researcher | Latest dataset uploaded (most recent) |
| P4 Private | Project-specific layers |

### Komponen di Map Inline

```
+----------------------------------------+
| 📍 Peta Risiko Saat Ini               |
|                                          |
| Layer aktif:                            |
| ☑ Banjir   ☐ SLR   ☐ Karhutla         |
|                                          |
| ┌───────────────────────────────┐      |
| │                                │      |
| │     [Sulsel map dengan         │      |
| │      flood risk overlay]       │      |
| │                                │      |
| │  [+] [-] [⊕]                  │      |
| │                                │      |
| └───────────────────────────────┘      |
|                                          |
| Legend:                                 |
|   🟢 Risiko Rendah                      |
|   🟡 Risiko Sedang                      |
|   🟠 Risiko Tinggi                      |
|   🔴 Risiko Sangat Tinggi              |
|                                          |
| Insight: 12 kab risk tinggi             |
|          (Wajo, Bone, Soppeng...)       |
|                                          |
| [🗺 Buka di Peta Full]                  |
+----------------------------------------+
```

### Behaviour

- Klik peta → buka Map Explorer dengan state preserved (province + layers)
- Toggle layer checkbox → re-render peta di tempat
- Hover area di peta → tooltip dengan kab/kota name + risk score
- Klik area → drill-down ke detail kab (membuka modul Vulnerability dengan filter)
- Auto-refresh setiap 5 menit (saat halaman aktif)

### Integrasi GeoVertix

- Map render via GeoVertix WMS (GVX-03) untuk basemap
- Risk layer via GeoVertix Plugin Runtime (`gxp-mcda` plugin) yang sudah pre-computed
- Cached aggressively (TTL 15 menit)

## 6.7 Zona 5 — Activity Feed

Activity Feed menampilkan **event terkini** yang relevan untuk user. Ini adalah cara utama pengguna stay-in-the-loop tentang apa yang sedang terjadi di platform.

### Item types

| Icon | Type | Contoh |
|------|------|--------|
| ⚠ | Risk Alert | "Risk Alert: Banjir Wajo — depth 1.8m projected for next 48h" |
| 📝 | Comment | "Rina commented on 'Sulsel-Flood-2050': 'Apakah include data BMKG terbaru?'" |
| 📄 | Report | "Report 'Q1 2026 Climate Risk Sulsel' published by Ahmad" |
| 🎯 | Scenario | "New Scenario 'RDTR Makassar 2030' created by Citra" |
| 🤖 | AI Insight | "AI Insight: 'Wajo butuh perhatian khusus karena…'" |
| 👥 | Consultation | "Consultation Session #042 invited you" |
| 📊 | Dashboard | "Dashboard 'Real-time Flood' updated" |
| 🔧 | System | "Maintenance completed 02:30-03:15 WIB" |
| 📥 | Data Upload | "New layer 'Sentinel-2 Sulsel Mei 2026' available" |

### Wireframe detail

```
+----------------------------------------------+
|  📋 Aktivitas Terkini                        |
|  ────────────────────────────────────       |
|                                                |
|  ⚠ Risk Alert: Banjir Wajo                  |
|    Risiko banjir 1.8m projected next 48h    |
|    🕐 2 jam lalu • Budi P. (Bappeda)         |
|    [Lihat detail] [Tutup]                    |
|                                                |
|  ────────────────────────────────────       |
|                                                |
|  📝 Rina commented on 'Sulsel-Flood-2050':   |
|     "Apakah include data BMKG terbaru?"     |
|    🕐 3 jam lalu • Rina (LIPI)               |
|    [Balas] [Buka skenario]                   |
|                                                |
|  ────────────────────────────────────       |
|                                                |
|  📄 Report 'Q1 2026 Climate Risk Sulsel'     |
|     Published by Ahmad K. (Anda)             |
|    🕐 1 hari lalu                            |
|    [Lihat report]                            |
|                                                |
|  ────────────────────────────────────       |
|                                                |
|  🎯 New Scenario 'RDTR Makassar 2030'        |
|     by Citra D. (Bappeda Kota Makassar)     |
|    🕐 2 hari lalu                            |
|    [Buka skenario]                           |
|                                                |
|  ────────────────────────────────────       |
|                                                |
|  🤖 AI Insight                                |
|     "Wajo butuh perhatian khusus karena       |
|      kombinasi flood risk + low capacity"    |
|    🕐 3 hari lalu                            |
|    [Pin] [Detail]                            |
|                                                |
|  ────────────────────────────────────       |
|                                                |
|  Lihat 47 aktivitas lain →                   |
+----------------------------------------------+
```

### Filter & sorting

- **Default**: 5 item terkini, urut waktu terbaru di atas
- Tombol filter di header: All / Mentions Me / My Province / Last 24h
- "Lihat semua" → halaman dedicated Activity dengan timeline lengkap, filter, search

### Notification badge integration

- Jumlah item baru sejak last visit → badge merah di icon `🔔` di top bar
- Klik item activity → mark as read, badge berkurang

## 6.8 Zona 6 — Quick Actions

Sudah dijelaskan di §5.4. Posisi spesifik di Halaman Utama: tepat di atas KPI cards (cross-reference §6.2 wireframe).

## 6.9 Zona 7 — Module Grid (Pintu ke 10 Modul)

Module Grid adalah **discovery surface** untuk modul-modul. Pengguna baru bisa explore platform dari sini; pengguna lama biasanya skip dan langsung ke sidebar.

### Wireframe satu tile

```
+------------+
|     🌡     |
|             |
|  Climate    |
|  Modeling   |
|             |
|   8 fitur   |
|             |
| Hindcast,   |
| LULC, SLR,  |
| flood/drought |
+------------+
```

### Behaviour

- Klik tile → masuk ke Module Landing Page (§7.x)
- Hover → tooltip dengan tagline lebih panjang + 3 fitur paling sering dipakai oleh persona
- Visual cue:
  - Modul yang sering dipakai oleh user (top 3) → border tebal + label "★ Favorite"
  - Modul yang ada update baru → badge "NEW" / "Updated"
  - Modul restricted untuk persona → hidden (atau di-grey untuk varian preview)

### Susunan tile

Dua baris 5×2 di desktop. Urutan dari kiri-atas:

**Baris 1:**
1. Climate Modeling
2. Vulnerability Assessment
3. Sectoral Analysis
4. Decision Support
5. AI Assistant

**Baris 2:**
6. Collaboration
7. Reports & Outputs
8. Data Catalog
9. Map Explorer (shortcut alternatif ke sidebar)
10. Settings & Admin

### Personalisasi (future enhancement, Y2)

- Drag-and-drop tile untuk reorder per-user preference
- "Hide rarely used modules" toggle
- Per-team / per-organization module promotion

## 6.10 Zona 8 — Footer Status

Sudah dijelaskan di §5.8.

## 6.11 Varian per Persona

Wireframe inti sama, tapi **konten zona** berbeda per persona. Berikut adalah tabel perbedaan:

| Zona | P1 Exec | P2 Planner | P3 Researcher | P4 Private | P5 Public |
|------|---------|------------|---------------|------------|-----------|
| Quick Actions | Briefing, Bandingkan, Trend | Skenario, Layer, Report, AI | Project, Hindcast, Download, API | Site, Risk Report, Project | Peta, Cerita, Subscribe |
| KPI Card 1 | Provinsi Aktif | Provinsi Aktif | Active Projects | Active Projects | (no KPI — gunakan headline) |
| KPI Card 2 | Risk Index | Risk Alerts | Hindcasts Running | Premium Days Left | — |
| KPI Card 3 | Action Items | Model Running | Datasets Updated | Reports Saved | — |
| KPI Card 4 | Reports Bulan Ini | Active Scenarios | Publications | Custom Layers | — |
| Risk Map | Nasional aggregated | Provinsi context | Latest project | Project-spesifik | Province-default (Sulsel) |
| Activity Feed | Decisions, Sign-offs, Reports | Comments, Scenarios, Alerts | Hindcast results, Comments | Project events | News, Public events |
| Module Grid | 5 modul saja: Dashboard, Map, Decision, Reports, Collab | 10 modul full | 10 modul full + emphasis pada Modeling/Data | 5 modul: Map, Sectoral subset, Reports, Data subset, Settings | 3 modul: Map (public), Stories, Subscribe |

### Varian P5 — Public Landing (special)

Halaman utama untuk P5 (public) **bukan dashboard tradisional**. Ia adalah landing page edukasi-fokus.

```
+--------------------------------------------------------------------------+
| [LOGO] CLIMATE ACTION                       [Cerita] [Peta] [Berita] [👤 Sign In] |
+--------------------------------------------------------------------------+
|                                                                            |
|  ┌─────────────────────────────────────────────────────────────────┐    |
|  │                                                                    │    |
|  │    🌏  Climate Action Platform                                    │    |
|  │                                                                    │    |
|  │    Platform Pemanfaatan Data Geospasial untuk Aksi Iklim          │    |
|  │    Indonesia 2026-2028                                            │    |
|  │                                                                    │    |
|  │    [🗺 Buka Peta Iklim]   [📰 Baca Cerita]                       │    |
|  │                                                                    │    |
|  │    [Tablet/laptop background image: Indonesia maritime continent]  │    |
|  └─────────────────────────────────────────────────────────────────┘    |
|                                                                            |
|  📰 Cerita Terbaru                                                        |
|                                                                            |
|  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                       |
|  │ Sulsel Kemarau │ Pesisir Demak │ Wajo Flood    │                       |
|  │   2025         │ Tenggelam     │ Solusi        │                       |
|  │ [Read more]    │ [Read more]   │ [Read more]   │                       |
|  └─────────────┘  └─────────────┘  └─────────────┘                       |
|                                                                            |
|  🚨 Peringatan Aktif                                                       |
|  • Banjir Wajo — risiko tinggi 48 jam ke depan [Detail]                  |
|  • Karhutla Aceh — Level 2 [Detail]                                       |
|                                                                            |
|  [🔔 Subscribe untuk dapat alerts]                                        |
|                                                                            |
+--------------------------------------------------------------------------+
| About | Kontak | Kebijakan Privasi | API Publik | Bahasa: [ID] [EN]      |
+--------------------------------------------------------------------------+
```

## 6.12 Empty State, Loading State, Error State

### Empty State (pengguna baru, belum ada activity)

```
+----------------------------------------------+
|  📋 Aktivitas Terkini                        |
|                                                |
|   ╭─────────────────────╮                    |
|   │      📭            │                    |
|   │                       │                    |
|   │   Belum ada           │                    |
|   │   aktivitas           │                    |
|   │                       │                    |
|   │   Mulai dengan:       │                    |
|   │   ➕ Buat skenario    │                    |
|   │   🔍 Cari data        │                    |
|   ╰─────────────────────╯                    |
+----------------------------------------------+
```

### Loading State (saat fetch data awal)

KPI cards menampilkan **skeleton bars** yang animasi shimmer:

```
+------------------------+
| ▓▓▓▓▓▓▓▓▓▓▓            |
|                          |
|     ▓▓▓▓▓▓              |
|                          |
| ▓▓▓ ▓▓▓▓▓▓▓             |
+------------------------+
```

Map menampilkan **placeholder peta** dengan overlay "Memuat data peta..." dan progress indicator.

### Error State (GeoVertix down, API timeout, dll.)

```
+----------------------------------------------+
|  ⚠  Beberapa data tidak tersedia              |
|                                                |
|  Risk Map: Menampilkan data cached            |
|             (umur 2 jam)                       |
|                                                |
|  [🔄 Coba Lagi]   [Detail Status Sistem]      |
+----------------------------------------------+
```

Per FR-GVX-07, fallback graceful. User tidak melihat error teknis (mis. HTTP 503) — mereka melihat pesan domain-friendly.

### Partial Degraded State

Jika **sebagian** zona gagal load (mis. Activity Feed OK tapi Risk Map down):
- Zona yang OK tetap render normal
- Zona yang down menampilkan error inline (per atas)
- Status bar menunjukkan: `● GVX: Degraded`

---

# BAGIAN 7 — HALAMAN MODUL (MODULE LANDING PAGES)

Setiap modul utama memiliki **module landing page** sendiri yang berfungsi sebagai pintu masuk ke fitur-fitur di modul tersebut. Halaman ini muncul saat user klik tile di Module Grid atau item di sidebar yang punya children.

## 7.1 Pola Umum Module Landing Page

Semua module landing page mengikuti pola yang konsisten — ini penting untuk **mental model** pengguna: "saya tahu apa yang akan saya lihat di halaman modul, format-nya sama".

### Wireframe Pola Umum

```
+--------------------------------------------------------------------------+
| [Top Bar Global]                                                         |
+--------------------------------------------------------------------------+
| [Context Bar]                                                            |
+--------------------------------------------------------------------------+
|  Home > [Modul Name]                                                     |
+--------------------------------------------------------------------------+
|                                                                            |
|  🌡 Climate Modeling                                                      |
|                                                                            |
|  Subjudul / tagline 1-2 baris menjelaskan modul ini secara umum.         |
|                                                                            |
|  Fitur kunci dalam modul ini:                                             |
|                                                                            |
|  ┌─────────────────────────────────────────────────────────────────┐    |
|  │  Hero / featured feature (1 fitur paling sering dipakai)         │    |
|  │                                                                    │    |
|  │  [Card besar dengan deskripsi, status terkini, dan tombol Open]   │    |
|  └─────────────────────────────────────────────────────────────────┘    |
|                                                                            |
|  Semua fitur:                                                              |
|                                                                            |
|  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    |
|  │  Fitur 2.1    │  │ Fitur 2.2    │  │ Fitur 2.3    │                    |
|  │  Advanced     │  │ LULC Change  │  │ Net Carbon   │                    |
|  │  Climate      │  │ Detection    │  │ Footprint    │                    |
|  │  Modeling     │  │              │  │              │                    |
|  │              │  │              │  │              │                    |
|  │ Description   │  │ Description  │  │ Description  │                    |
|  │ singkat       │  │ singkat      │  │ singkat      │                    |
|  │              │  │              │  │              │                    |
|  │ [Open]        │  │ [Open]       │  │ [Open]       │                    |
|  └──────────────┘  └──────────────┘  └──────────────┘                    |
|  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                    |
|  │  Fitur 2.4    │  │ Fitur 2.5    │  │ Fitur 2.6    │                    |
|  │  ...          │  │ ...          │  │ ...          │                    |
|  └──────────────┘  └──────────────┘  └──────────────┘                    |
|                                                                            |
|  Sub-section: Validation                                                 |
|  ┌──────────────┐  ┌──────────────┐                                       |
|  │ Hindcasting  │  │ Continuous   │                                       |
|  │ Tool (11.1)  │  │ Monitor (11.2)|                                      |
|  └──────────────┘  └──────────────┘                                       |
|                                                                            |
|  ─────────────────────────────────────────────────────────────────       |
|                                                                            |
|  Aktivitas terkini di modul ini:                                          |
|  • Hindcast SLR Demak running (12m lalu) — Ari                          |
|  • LULC Change Detection Sulsel completed (1h lalu) — Budi              |
|  [Lihat semua]                                                            |
|                                                                            |
+--------------------------------------------------------------------------+
| [Footer Status]                                                           |
+--------------------------------------------------------------------------+
```

### Komponen module landing page

| Komponen | Tujuan |
|----------|--------|
| Modul header (icon + nama + tagline) | Identifikasi modul |
| Hero feature card | Featured / paling sering dipakai untuk persona ini |
| Feature grid | Semua fitur di modul, sebagai card |
| Sub-section grid | Sub-section (jika ada, mis. "Validation" di Modeling) |
| Activity in module | Aktivitas terkini terkait modul ini |
| Quick actions module-specific | Aksi cepat khusus modul (di Quick Actions Bar) |

### Card per fitur

```
+--------------------------------+
| 🌡  Advanced Climate Modeling  |
|                                 |
| BAGIAN 2.1                      |
|                                 |
| Modeling iklim downscaled dengan|
| ensemble CMIP6/CORDEX-SEA       |
| untuk Indonesia.                |
|                                 |
| Status: 2 model running         |
| Last run: 12 menit lalu        |
|                                 |
| Pattern: B (API + Extension)    |
|                                 |
| [Open Fitur →]                  |
+--------------------------------+
```

Informasi yang ditampilkan di card:
- Icon + nama fitur + kode (mis. "2.1")
- Tagline 2 baris dari Katalog
- Status saat ini (running count, last run timestamp)
- **Pattern integrasi GeoVertix** (A/B/C/D/E) — meta-info untuk power user
- Tombol Open → masuk ke detail fitur (yang wireframe-nya ada di Katalog Fitur)

### Hak akses card

Card untuk fitur yang **tidak diakses** oleh persona aktif:
- Untuk modul level: tidak muncul di Module Grid (per matriks §3.6)
- Untuk fitur dalam modul yang accessible: card menampilkan badge "🔒 Restricted" + grey-out

## 7.2 Module: Climate Modeling (Bagian 2 — 6 fitur + 11.x sub-section)

**Header:**
```
🌡  Climate Modeling
Predict climate variables, change detection, and validate models against history.
```

**Hero feature (per persona):**
- P2 Planner: Fitur 2.6 Flood & Drought Modeling (paling actionable untuk RDTR)
- P3 Researcher: Fitur 2.1 Advanced Climate Modeling (paling rigorous)

**Feature grid (8 cards: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, dan sub-section "Validation" dengan 11.1, 11.2):**

| Fitur | Pattern | Sering dipakai |
|-------|---------|----------------|
| 2.1 Advanced Climate Modeling | B | Researcher |
| 2.2 LULC Change Detection | C | Planner |
| 2.3 Net Carbon Footprint | D | Researcher, Planner |
| 2.4 Biodiversity Mapping | D | Researcher |
| 2.5 SLR & Land Subsidence | D | Planner (coastal) |
| 2.6 Flood & Drought Modeling | C | Planner |
| 11.1 Hindcasting Tool (sub) | A | Researcher |
| 11.2 Continuous Monitor (sub) | D | Researcher |

**Quick Actions module-specific:**
`[➕ New Climate Run]  [🧪 Hindcast]  [📊 Compare Models]  [📥 Download Data]`

**Activity in module:**
- Tampilkan 5 task terkini dari Tasks API (GVX-09) yang related ke modeling
- Filter by user: opsi "My runs only"

## 7.3 Module: Vulnerability Assessment (Bagian 3 — 2 fitur)

**Header:**
```
⚠  Vulnerability Assessment
Multi-criteria + dynamic system modeling untuk evaluasi kerentanan iklim.
```

**Hero feature:** Fitur 3.1 Multi-Criteria Vulnerability Assessment (dipakai paling sering oleh planner)

**Feature grid (2 cards):**

| Fitur | Pattern |
|-------|---------|
| 3.1 Multi-Criteria Vulnerability Assessment | A (Direct API Reuse — gxp-mcda) |
| 3.2 Dynamic Vulnerability System Dynamics | E (Pure Native) |

**Karena hanya 2 fitur, layout lebih spacious — card lebih besar dengan deskripsi lebih lengkap.**

**Quick Actions:**
`[➕ New Assessment]  [📊 Compare Provinces]  [🗺 View on Map]`

**Below feature grid:**
- Visualization: bar chart top 10 kab/kota dengan vulnerability score tertinggi (di context aktif)
- Klik bar → buka detail kab di Fitur 3.1

## 7.4 Module: Sectoral Analysis (Bagian 4 — 7 fitur)

**Header:**
```
🏭 Sectoral Analysis
Analisis spesifik per sektor: RDTR, food security, coastal, fire, tourism, energy, carrying capacity.
```

**Hero feature (per persona):**
- P2 Planner: Fitur 4.1 Spatial Planning Support Toolbox (RDTR) — mission-critical
- P4 Private: Fitur 4.6 Renewable Energy Optimization

**Feature grid (7 cards dalam 2 baris):**

| Fitur | Pattern | Sektor |
|-------|---------|--------|
| 4.1 RDTR Toolbox | C | Spatial Planning |
| 4.2 Food Security (Rice Field) | C | Pertanian |
| 4.3 Coastal Vulnerability | C | Pesisir |
| 4.4 Forest Fire Risk (ENSO) | C | Kehutanan |
| 4.5 Tourism Vulnerability | B | Pariwisata |
| 4.6 Renewable Energy | A | Energi |
| 4.7 Carrying Capacity | B | Daya Dukung |

**Quick Actions:**
`[➕ New Sectoral Analysis]  [📊 Cross-Sector Compare]`

**Special: Cross-sectoral filter**
- Di module ini ada filter "Sektor:" yang mempersempit ke 1 atau beberapa fitur
- Filter persisten saat user pindah ke fitur lain di modul ini

## 7.5 Module: Decision Support (SDSS Core, Bagian 5 — 10 fitur)

**Header:**
```
🧭 Decision Support
SDSS core: Scenario, Impact, MCDA, Optimization, What-If, Recommendation.
```

**Hero feature:** Fitur 5.2 Scenario Manager & Planning Builder (most-used by P2)

**Feature grid (10 cards dalam 2-3 baris):**

| Fitur | Pattern | Typical workflow |
|-------|---------|------------------|
| 5.1 Multi-Level Decision Support | D | Entry by role (otomatis) |
| 5.2 Scenario Manager | B | Mulai dari sini |
| 5.3 Impact Analysis | B | Setelah scenario |
| 5.4 Adaptation Recommendation | D | Output dari impact |
| 5.5 MCDA Engine | A | Trade-off analysis |
| 5.6 Context-Aware Recommendation | D | Smart suggestion |
| 5.7 Group Decision-Making | E | Konsensus multi-orang |
| 5.8 What-If Simulation | B | Eksplorasi cepat |
| 5.9 Sensitivity Analyzer | A | Robustness check |
| 5.10 Optimization Solver | A | Best-of |

**Sub-section workflow visualization (special):**

Karena fitur-fitur Bagian 5 saling berkaitan, halaman ini menampilkan **workflow diagram** kecil yang menunjukkan typical flow:

```
  ┌─────────┐    ┌─────────┐    ┌──────────┐    ┌──────────────┐
  │ 5.2     │ →  │ 5.3     │ →  │ 5.5      │ →  │ 5.4          │
  │Scenario │    │ Impact  │    │ MCDA     │    │ Adaptation   │
  │ Manager │    │Analysis │    │ Engine   │    │Recommendation│
  └─────────┘    └─────────┘    └──────────┘    └──────────────┘
       │              │              │                 │
       └──────────────┴──────────────┘                 │
                      │                                 │
              ┌───────▼───────┐    ┌──────────┐  ┌─────▼──────┐
              │  5.8 What-If  │    │ 5.9      │  │ 5.7 Group   │
              │  Simulation   │    │ Sensitive│  │ Decision   │
              └───────────────┘    └──────────┘  └────────────┘
                      │
              ┌───────▼───────┐
              │ 5.10 Optimize │
              └───────────────┘
```

Tiap node clickable → buka fitur tersebut.

**Quick Actions:**
`[➕ New Scenario]  [🔄 Compare Scenarios]  [🤝 Start Group Session]`

## 7.6 Module: AI Assistant (Bagian 6 — 9 fitur)

**Header:**
```
🤖 AI Assistant
LLM, RAG, NLP, image recognition, anomaly detection, dan explainable AI.
```

**Catatan khusus:** AI Assistant juga **selalu floating** di seluruh platform (§5.6). Module landing page ini adalah **dashboard AI** untuk power-user dan researcher.

**Hero feature:** Fitur 6.5 Natural Language Query (interface utama untuk semua persona)

**Feature grid (9 cards dalam 3 baris):**

| Fitur | Pattern | Audiens |
|-------|---------|---------|
| 6.1 Image & Pattern Recognition | B | Researcher, Planner |
| 6.2 Anomaly Detection & EWS | B | Planner, Exec (via alerts) |
| 6.3 Predictive Modeling Framework | B | Researcher |
| 6.4 Scenario-Based Analysis Engine | C | Planner, Researcher |
| 6.5 Natural Language Query | B | Semua persona |
| 6.6 RAG Pipeline & Knowledge Base | E | Admin / Researcher |
| 6.7 MCP Server (Toolbox Bridge) | E | Developer / Admin |
| 6.8 Federated Learning | E | Admin / Researcher |
| 6.9 Explainable AI (XAI) | D | Researcher (dipakai sebagai tab di output fitur lain) |

**Quick Actions:**
`[💬 New Query]  [📸 Upload Image for Recognition]  [⚠ View Anomaly Alerts]`

**Sub-section: AI Insights Library**
Repository semua AI insights yang sudah di-pin oleh user (lintas-halaman). Searchable.

## 7.7 Module: Collaboration (Bagian 7 — 3 fitur)

**Header:**
```
🤝 Collaboration
Multi-stakeholder consultation, annotation, dan scenario comparison untuk group decision-making.
```

**Hero feature:** Fitur 7.1 Multi-Stakeholder Consultation Workflow

**Feature grid (3 cards):**

| Fitur | Pattern |
|-------|---------|
| 7.1 Multi-Stakeholder Consultation Workflow | E |
| 7.2 Annotation & Comment System | D |
| 7.3 Scenario Comparison Tool | B |

**Quick Actions:**
`[➕ Start Consultation]  [💬 My Mentions]  [📊 Open Comparison]`

**Active sessions panel:**
- Daftar consultation session aktif (user di-invite)
- Klik → masuk ke session

## 7.8 Module: Reports & Outputs (Bagian 8 — 4 fitur)

**Header:**
```
📊 Reports & Outputs
Interactive maps, dashboards, executive summaries, custom reports.
```

**Hero feature:**
- P1 Exec: Fitur 8.3 Executive Summary Auto-Generation
- P2 Planner: Fitur 8.4 Custom Report Builder

**Feature grid (4 cards):**

| Fitur | Pattern |
|-------|---------|
| 8.1 Interactive Map (Advanced) | C (link ke Map Explorer) |
| 8.2 Dynamic Dashboards | C |
| 8.3 Executive Summary Auto-Generation | D |
| 8.4 Custom Report Builder | A |

**Quick Actions:**
`[📊 New Dashboard]  [📄 Generate Exec Summary]  [➕ Custom Report]`

**Recent reports panel:**
- 5 report terkini (by user)
- Tombol filter: My Reports / Shared with Me / Public Reports
- Action: View, Download (PDF/PPT/Excel), Share

## 7.9 Module: Platform Services / Settings & Admin (Bagian 9 — 6 fitur)

**Header:**
```
⚙  Settings & Admin
Profile, authentication, notifications, language, audit, API.
```

**Catatan:** Modul ini bukan typical "feature" modul — ia adalah settings hub. Layout berbeda dari module lain.

**Layout (tabbed):**

```
+--------------------------------------------------------------------------+
|  Profile  |  Account  |  Notifications  |  Language  |  Audit (admin)   |
|  API & Dev  |  Integrations  |  About  |  Help                          |
+--------------------------------------------------------------------------+
|                                                                            |
| Tab content (tergantung tab yang dipilih)                                  |
|                                                                            |
+--------------------------------------------------------------------------+
```

**Tab → Fitur mapping:**

| Tab | Fitur | Audiens |
|-----|-------|---------|
| Profile | per-user data (avatar, name, dll.) | Semua |
| Account | 9.1 Auth & Authorization config | Admin |
| Notifications | 9.2 Notification settings (per-user) | Semua |
| Language | 9.4 i18n preference | Semua |
| Audit | 9.3 Audit Logger view | Admin |
| API & Dev | 9.6 API & OGC docs + token | Researcher, Dev |
| Integrations | Status 13.1-13.5 + GVX integration | Admin |
| About | versi, lisensi, kredit | Semua |
| Help | 9.5 Onboarding, tutorial, FAQ | Semua |

## 7.10 Module: Data Catalog (Bagian 10 — 5 fitur + Bagian 13 sub-section)

**Header:**
```
💾 Data Catalog
Browse, upload, manage, version, dan track lineage data geospatial.
```

**Hero feature:** Fitur 10.1 Data Catalog ISO 19115

**Layout khusus (search-first):**

```
+--------------------------------------------------------------------------+
|  💾 Data Catalog                                                          |
|                                                                            |
|  [🔍 Cari layer, dataset, atau koleksi...]    [Filter ▾]                 |
|                                                                            |
|  Filter:                                                                   |
|  Type: ☐ Vector  ☐ Raster  ☐ Tabular  ☐ Time Series                     |
|  Source: ☐ BIG  ☐ BMKG  ☐ BPS  ☐ KLHK  ☐ BNPB  ☐ External  ☐ User-upload|
|  Region: [Sulawesi Selatan ▾]                                            |
|  Date: [2020 — 2026 ▾]                                                   |
|                                                                            |
|  Hasil: 247 datasets                                          [↓ Sort ▾]  |
|                                                                            |
|  ┌──────────────────────────────────────────────────────────────────┐   |
|  │ 🗺 Banjir Sulsel 2024-2025 (Vector — Polygon)                   │   |
|  │ Source: BNPB InaRISK • Updated: 7 Jan 2026                       │   |
|  │ License: Public Domain                                            │   |
|  │ [Preview] [Download] [Add to Map] [API endpoint]                 │   |
|  └──────────────────────────────────────────────────────────────────┘   |
|                                                                            |
|  ┌──────────────────────────────────────────────────────────────────┐   |
|  │ 🌧 Curah Hujan Harian BMKG Sulsel (Raster — daily, 1km)         │   |
|  │ Source: BMKG • Updated: 22 Mei 2026 (real-time stream)           │   |
|  │ License: Restricted (gov-only)                                    │   |
|  │ [Preview] [Download (limited)] [Add to Map]                       │   |
|  └──────────────────────────────────────────────────────────────────┘   |
|                                                                            |
|  ... (paging)                                                              |
|                                                                            |
|  ─────────────────────────────────────────────────────────────────       |
|                                                                            |
|  Modul Sub-Fitur:                                                          |
|  • 10.2 Data Lineage — track sumber & transformasi                       |
|  • 10.3 Data Quality Dashboard — ISO 19157 metrics                       |
|  • 10.4 Stream Processor — real-time IoT/satellite                        |
|  • 10.5 Data Versioning — snapshot & rollback                            |
|                                                                            |
|  External Integrations (Bagian 13):                                       |
|  • 13.1 One Map Policy (BIG)  • 13.2 BNPB  • 13.3 BMKG                  |
|  • 13.4 KLHK SIGN-SMART      • 13.5 BPS                                  |
|                                                                            |
+--------------------------------------------------------------------------+
```

**Quick Actions:**
`[📥 Upload Data]  [🔗 Connect Source]  [📊 Lineage Graph]`

## 7.11 Module: Hindcasting & Validation

Sudah include di module Climate Modeling sebagai sub-section (§7.2). Tidak perlu module landing terpisah.

## 7.12 Module: Edge / Mobile PWA

**Tidak ada module landing dedicated.** Edge/Mobile PWA adalah infrastruktur transparan — ia mempengaruhi semua modul melalui responsive design dan service worker, bukan menjadi tujuan navigasi sendiri.

**Visibility ke user:**
- "PWA Install" prompt setelah login ke-3
- Indikator "Offline mode" di status bar saat tidak ada koneksi
- Pages "Field Data Capture" (sub di Map Explorer) untuk lapangan
- Settings page → tab Mobile (sync preferences, offline data, model compression)

Detail teknis: FITUR 12.1, 12.2, 12.3 di Katalog Fitur.

## 7.13 Module: External Integrations (Bagian 13)

Sudah include sebagai sub-section di Data Catalog (§7.10). Admin view tersedia di Settings → Integrations.

---

# BAGIAN 8 — USER FLOWS UTAMA

User flows menjelaskan **urutan langkah** yang dilakukan pengguna untuk menyelesaikan tugas spesifik di platform. Setiap flow di bawah ini memetakan:
1. Trigger (apa yang membuat user masuk ke flow)
2. Halaman yang dilewati
3. Aksi di setiap halaman
4. Output yang dihasilkan
5. Fallback / error path

## 8.1 Flow A — First-Time Login & Onboarding

**Trigger:** User baru menerima invite email dari admin organisasi mereka.

**Goal:** Sign in pertama kali, complete profile, lihat onboarding tour, sampai di Halaman Utama.

```
1. Email: "Anda diundang ke Climate Action Platform sebagai Planner"
   → Klik link [Activate Account]
2. → Browser: halaman /activate?token=...
   ┌──────────────────────────────────────┐
   │  Set Password                          │
   │  [Password    ]                        │
   │  [Confirm     ]                        │
   │  ☑ Saya setuju Terms & PDP Policy     │
   │  [Activate Account]                    │
   └──────────────────────────────────────┘
3. → Login page /login
   ┌──────────────────────────────────────┐
   │  Selamat Datang!                       │
   │  [Email          ]                     │
   │  [Password       ]                     │
   │  [Sign In]                             │
   │  Lupa password?                        │
   └──────────────────────────────────────┘
4. → Authenticated; redirect ke /dashboard
   (FR-GVX-01: JWT token issued)
5. → Welcome modal muncul:
   ┌──────────────────────────────────────────────────────┐
   │  👋 Selamat datang, Ahmad!                            │
   │                                                         │
   │  Anda adalah Planner di Bappeda Sulsel.               │
   │                                                         │
   │  Tour 5-menit untuk pengenalan?                       │
   │  [Mulai Tour] [Lewati]                                │
   └──────────────────────────────────────────────────────┘
6. Jika "Mulai Tour":
   - Step 1: Highlight Top Bar (search, AI, notifications)
   - Step 2: Highlight Sidebar (modul)
   - Step 3: Highlight Context Bar (province selector)
   - Step 4: Highlight KPI Cards
   - Step 5: Highlight Module Grid
   - Step 6: Demo Quick Actions (start new scenario)
7. → Dashboard ready; PWA install prompt setelah 3 sesi
```

**Onboarding state tracking:**
- `user.onboarding_completed: bool`
- `user.tour_steps_completed: [step_ids]`
- Re-trigger tour dari Settings → Help → Restart Tour (FITUR 9.5)

**Error paths:**
- Token expired → "Link tidak valid. Hubungi admin organisasi Anda."
- Email tidak terdaftar → "Email tidak ditemukan."

## 8.2 Flow B — Daily Planner Workflow (Persona P2)

**Trigger:** Pagi hari, Budi (Planner Bappeda Sulsel) buka platform untuk cek status & lanjut kerjaannya.

**Goal:** Cek alerts, lanjut scenario yang sedang dikerjakan, generate report draft untuk meeting siang.

```
Step 1: Login
→ /dashboard
   ┌─────────────────────────────────────────────┐
   │ KPI: 18 prov | 3 alerts ⚠ | 5 models | 12 scenarios │
   └─────────────────────────────────────────────┘

Step 2: Cek alerts
   Activity Feed top item:
   ┌─────────────────────────────────────────────┐
   │ ⚠ Risk Alert: Banjir Wajo                  │
   │   Risiko 1.8m next 48h                     │
   │   [Lihat detail]                           │
   └─────────────────────────────────────────────┘
   → Klik "Lihat detail"
   → /modeling/flood-drought?event=alert-2026-042
   → Detail page Fitur 2.6 dengan event preset

Step 3: Setelah review, kembali ke dashboard
   → Klik logo / breadcrumb home

Step 4: Lanjut scenario kemarin
   Quick Action: [➕ Skenario Baru] di-skip
   Klik "Lanjut Skenario Terakhir" (smart action)
   → /sdss/scenarios/scn-2026-031 (last edited)
   → Fitur 5.2 Scenario Manager dengan state restored

Step 5: Edit scenario (di dalam Fitur 5.2 — wireframe ada di Katalog)
   - Add new parameter
   - Run impact (Fitur 5.3 inline)
   - Add comment for team
   → Save scenario

Step 6: Generate report untuk meeting siang
   Quick Action di sidebar: [📊 Buat Report]
   → /reports/custom-report-builder
   → Fitur 8.4 Custom Report Builder
   - Pilih scenario aktif sebagai source
   - Pilih template "Weekly Briefing"
   - Customize sections
   - Export PDF

Step 7: Share report ke atasan
   - Klik [Share]
   - Email link / Slack
   - Logout via user menu
```

**Time budget:** 30-45 menit untuk flow ini, termasuk review alert dan scenario editing.

**Critical UX requirements:**
- "Lanjut skenario terakhir" smart action **harus** menyimpan state dengan baik (cursor position, expanded panels, dll.)
- Report generation tidak boleh blocking — async via Tasks API (GVX-09) dengan SSE progress

## 8.3 Flow C — Crisis Mode (Disaster Response)

**Trigger:** Banjir bandang aktif di Wajo; BPBD Sulsel butuh briefing cepat.

**Goal:** Akses informasi situasi terkini, kirim alert ke pemangku kepentingan, koordinasi response.

```
0. Crisis Mode otomatis aktif (deteksi via Fitur 6.2 EWS)
   - Top bar berubah warna kuning
   - Banner: "⚠ MODE KRISIS: Banjir Wajo Aktif"

1. Login (atau jika sudah login, langsung)
   → /dashboard?mode=crisis
   ┌─────────────────────────────────────────────┐
   │ 🚨 MODE KRISIS: Banjir Wajo               │
   │ Active sejak: 6 jam lalu                   │
   │ Tinggi rata: 1.5m  |  Affected: 12,000 KK  │
   │                                              │
   │ [🚨 Peta Real-Time] [📞 Hubungi BNPB]      │
   │ [📋 Briefing Cepat] [🔔 Kirim Alert]       │
   └─────────────────────────────────────────────┘
   - Quick Actions di-override ke crisis-specific
   - KPI menampilkan: Affected, Resources Available, Response Time

2. Klik [🚨 Peta Real-Time]
   → /map?layers=flood-realtime,population,roads,shelter&province=sulsel&zoom=wajo
   → Map Explorer di Wajo, layer banjir terbaru (refresh tiap 5m)

3. Di Map Explorer:
   - Layer: ☑ Banjir Realtime ☑ Population ☑ Roads ☑ Shelter
   - Time slider: now → +48h forecast
   - Click area → popup: "Affected estimate: 850 KK, Shelter nearest: 1.2km"
   - Tombol cepat: [Compute Evacuation Routes] (FITUR 4.1 inline)

4. Generate Crisis Briefing
   Back to dashboard → klik [📋 Briefing Cepat]
   → /reports/exec-summary?event=crisis-wajo-2026
   → Fitur 8.3 Auto-Generation dengan template crisis
   → Output: PDF 5 halaman dalam 30 detik
     - Section 1: Situasi terkini (auto)
     - Section 2: Affected area & population (auto from spatial)
     - Section 3: Predicted progression (Fitur 6.3 prediction)
     - Section 4: Recommended actions (Fitur 5.4)
     - Section 5: Contact list (auto from directory)

5. Kirim Alert
   Klik [🔔 Kirim Alert]
   → Form alert builder:
     - Recipients: BNPB, Pemda Wajo, NGO terdaftar (pre-filled)
     - Channel: Email, SMS, WhatsApp Business API
     - Template: pilih dari pre-defined templates
   → Send → 50 recipients notified

6. Live coordination
   - Activity feed update real-time
   - Comments stream di scenario "wajo-2026-crisis"
   - AI Insights muncul terus: "Tingkat air diprediksi turun pukul 18:00 berdasarkan model BMKG"
```

**Performance requirement:** Semua interaksi < 500ms latency. Peta layer flood < 2s load time. PR NFR-PERF-01 active.

## 8.4 Flow D — Executive Brief (Persona P1)

**Trigger:** Kepala Bappenas akan rapat pukul 14:00 dengan Menteri ATR/BPN. Butuh briefing 1 halaman tentang situasi iklim nasional.

**Goal:** Lihat ringkasan, generate executive brief, presentasikan di rapat.

```
1. Login → /dashboard (varian Exec)
   ┌──────────────────────────────────────────────────┐
   │ Konteks: Indonesia (semua provinsi)              │
   │                                                    │
   │ Risk Index Nasional: 58/100 ⬆ +3 vs Q1 2026     │
   │                                                    │
   │ ⚠ 3 alerts aktif: Wajo, Demak (SLR), Aceh (fire) │
   │ 📊 12 reports Q2 2026 ready                       │
   │                                                    │
   │ Quick: [📋 Briefing Hari Ini] [🔄 Bandingkan]    │
   └──────────────────────────────────────────────────┘

2. Klik [📋 Briefing Hari Ini]
   → /reports/exec-summary
   → Fitur 8.3 — Pre-generated daily exec brief
   - Format: 1 halaman, infographic, key metrics
   - Bahasa: Indonesia (default for P1)
   - Tone: non-technical

3. Review brief — drill down jika perlu
   - Klik chart "Coastal Risk" → buka Fitur 4.3 (read-only view for Exec)
   - Klik map "Wajo Alert" → buka Map dengan flood layer
   - Klik [< Back] → kembali ke brief

4. Customize brief untuk rapat
   - Tambah catatan personal: "Hi Minister, fokus pada Wajo case"
   - Generate ulang dengan filter: hanya 3 provinsi (Sulsel, Jateng, Aceh)
   - Export: PDF + PowerPoint

5. Share dengan tim Menteri
   - Email link (one-time access)
   - Public-domain version untuk press

6. Setelah rapat:
   - Action items dari rapat → tambah ke "Action Items" KPI
   - Track follow-up
```

**Key UX:** Brief default untuk Exec **tidak punya jargon teknis**, semua angka punya konteks komparatif ("naik 3 vs Q1"), dan visualisasi pakai infografis (bukan scatter plot).

## 8.5 Flow E — Researcher Deep Dive (Persona P3)

**Trigger:** Dr. Citra (peneliti ITB) sedang menulis paper tentang sea level rise di Demak. Butuh data raw + hindcasting result + sensitivity analysis.

**Goal:** Download data SLR Demak 1990-2025, run hindcast SLR model 2010-2020 (validation), export sensitivity analysis untuk paper.

```
1. Login → /dashboard (varian Researcher)
   - KPI: My Projects (3 active), Hindcasts Running (1)
   - Quick: [📂 Lanjut Project] [🧪 Hindcast Baru] [📥 Download]

2. Set context
   - Context Bar: Province → "Jawa Tengah", Year → "1990-2025"

3. Pertama: download raw data SLR Demak
   → /data
   - Search: "SLR demak"
   - Filter: Type=Raster, Time=time-series
   - Result: "SLR Demak Composite 1990-2025" (Fitur 10.1)
   - Klik [Download] → option:
     - Format: NetCDF / GeoTIFF / CSV
     - Resolution: original / resampled
     - License: agree to terms
   → Download dimulai (background)

4. Kedua: run hindcast 2010-2020 untuk validation
   → /modeling/climate-advanced/hindcast
   → Fitur 11.1 Hindcasting Tool
   - Setup:
     - Model: SLR composite (selected)
     - Hindcast period: 2010-2020
     - Validation period: 2010-2020 (observed)
     - Metrics: RMSE, MAE, R²
   - Run → submit task
   - Task ID issued; task tracking via Tasks API (GVX-09)
   - Notification: "Hindcast queued. ETA 2 jam."
   - Lanjut kerja lain sambil menunggu

5. Ketiga: explore sensitivity sambil menunggu
   → /sdss/sensitivity
   → Fitur 5.9 Sensitivity Analyzer
   - Input: SLR model parameters (ice melt rate, ocean expansion, dll.)
   - Run sensitivity → output: tornado chart per parameter
   - Klik [Export PNG/SVG]

6. Hindcast selesai (2 jam kemudian)
   - Notification: "Hindcast complete. R²=0.83"
   - Klik notification → /modeling/climate-advanced/hindcast/run-042
   - Review results:
     - Map: observed vs predicted (side-by-side)
     - Time series chart
     - Metrics table
   - Klik [Export Report PDF + Data CSV]

7. Akses API untuk reproducibility
   → /settings/api
   → Fitur 9.6 API & OGC Services
   - Copy API token
   - Get example Python notebook untuk reproduce results
   - Cite DOI (auto-generated per dataset version)

8. Pin AI Insight ke project
   - AI Assistant: "Berdasarkan hindcast, model R²=0.83 cukup baik
     untuk policy use; namun perhatikan bias di periode 2015-2017
     karena anomaly El Niño."
   - Pin insight → tersimpan di project notes
```

**Key UX:** Researcher butuh full transparansi (lineage, version, methodology). Setiap output punya "Methodology" tab dan "Citation" button.

## 8.6 Flow F — Group Decision-Making Session

**Trigger:** Bappeda Sulsel ingin finalize scenario RDTR Kab Wajo 2030 dengan 5 stakeholder: BIG, BMKG, KLHK, BNPB, LIPI. Online session dijadwalkan.

**Goal:** Stakeholder diskusi & vote pada 3 scenario alternatif; menghasilkan consensus scenario.

```
1. Persiapan (sebelum session)
   Host (Budi, Bappeda) buka:
   → /collab/consultation
   → Fitur 7.1 Stakeholder Consultation Workflow
   - Create session:
     - Title: "Finalisasi Scenario RDTR Wajo 2030"
     - Date: Senin 27 Mei 2026, 10:00-12:00 WIB
     - Stakeholders: invite (email)
     - Scenarios to compare: scn-001, scn-002, scn-003
     - Voting method: weighted (per role)
   - Send invites

2. Stakeholder bergabung (saat session)
   - Login → notification "Consultation 'RDTR Wajo' starting"
   - Klik → /collab/consultation/session-042
   ┌──────────────────────────────────────────────────────┐
   │ Session: Finalisasi RDTR Wajo 2030  • Live           │
   │ Host: Budi P. (Bappeda Sulsel)                       │
   │ Participants: 5/5 online ✓                           │
   │                                                         │
   │ Agenda:                                                │
   │ 1. Pengantar (5m)                                      │
   │ 2. Review 3 scenarios (30m)                            │
   │ 3. Diskusi & komentar (45m)                            │
   │ 4. Voting (20m)                                        │
   │ 5. Wrap-up & next steps (10m)                          │
   │                                                         │
   │ [💬 Chat]  [📺 Share Screen]  [🎤 Voice]              │
   └──────────────────────────────────────────────────────┘

3. Review 3 scenarios (paralel)
   - Switch to Fitur 7.3 Scenario Comparison Tool (embedded in session)
   - Side-by-side 3 scenario:
     ┌──────────┐ ┌──────────┐ ┌──────────┐
     │ Scn 001  │ │ Scn 002  │ │ Scn 003  │
     │ Eco-     │ │ Balanced │ │ Pro-     │
     │ Heavy    │ │          │ │ Develop  │
     │          │ │          │ │          │
     │ Maps,    │ │ Maps,    │ │ Maps,    │
     │ KPIs,    │ │ KPIs,    │ │ KPIs,    │
     │ costs    │ │ costs    │ │ costs    │
     └──────────┘ └──────────┘ └──────────┘
   - Annotate (Fitur 7.2): add comment, sticky note di peta
   - Realtime sync: semua participant lihat update

4. Diskusi via chat & komentar
   - Comments di-thread per element peta
   - Mention @user untuk feedback spesifik
   - AI Assistant aktif: "Bandingkan trade-off X di scn 1 vs scn 3"

5. Voting
   - Setiap stakeholder vote per kriteria (5 kriteria):
     - Climate resilience
     - Economic viability
     - Social acceptability
     - Implementation feasibility
     - Cost
   - Weighted by role (e.g., Bappenas weight=2, NGO weight=1)
   - Auto-compute consensus score

6. Result & sign-off
   - Display: "Scenario 002 selected (consensus 72%)"
   - Host generate session report (auto from Fitur 8.3)
   - Sign-off digital (Fitur 9.1 e-sign)
   - Update master scenario db: scn-002 status → "Approved"

7. Distribution
   - Auto-email session minutes ke all participants
   - Action items per stakeholder tracked
   - Public version of decision shared (if applicable)
```

**Key UX:** Session room **simulates physical meeting** dengan tools synchronous (chat, voting, screen share) + tools asynchronous (comments yang persist).

## 8.7 Flow G — AI Conversational Query

**Trigger:** Saat sedang lihat peta vulnerability Sulsel, Ahmad punya pertanyaan ad-hoc: "Mengapa Wajo skor lebih tinggi dari Bone?"

**Goal:** Dapat jawaban contextual, dengan citation ke data source.

```
1. Di halaman /vulnerability/mcda?province=sulsel
   - Sedang lihat vulnerability map Sulsel
   - Wajo tampak merah (high vulnerability), Bone hijau-kuning

2. Klik floating 🤖 AI button (atau ⌘+I)
   - AI Panel slide in dari kanan
   - Konteks auto-detected:
     ┌──────────────────────────────────────────┐
     │ 🤖 AI Assistant                          │
     │ Konteks: Sulsel, Vulnerability MCDA      │
     │ Layer aktif: Banjir, SLR, Population     │
     └──────────────────────────────────────────┘

3. Type / voice input:
   "Mengapa Wajo skor lebih tinggi dari Bone?"

4. AI process (background):
   - Identify entities: Wajo, Bone (kab di Sulsel)
   - Identify metric: vulnerability score
   - Query RAG (Fitur 6.6) untuk MCDA criteria definition
   - Query data: Wajo vs Bone per criterion
   - Generate explanation via Fitur 6.9 XAI

5. Response (5 detik):
   ┌──────────────────────────────────────────────────────┐
   │ 🤖 Wajo memiliki skor vulnerability lebih tinggi   │
   │    daripada Bone (72 vs 48) karena 3 faktor utama: │
   │                                                       │
   │ 1. **Flood Risk (weight 30%)**: Wajo 85 vs Bone 45  │
   │    - Penyebab: berada di hilir Sungai Walanae       │
   │    - Source: BMKG Hidrologi 2024 [link]              │
   │                                                       │
   │ 2. **Population Density Coastal (weight 25%)**:     │
   │    Wajo 1240/km² vs Bone 680/km²                    │
   │    - Source: BPS Sensus 2023 [link]                  │
   │                                                       │
   │ 3. **Adaptive Capacity (weight 20%)**:              │
   │    Wajo memiliki HDI 0.62 (lower) vs Bone 0.71      │
   │    - Source: BPS HDI 2024 [link]                     │
   │                                                       │
   │ [🗺 Lihat di Peta] [📋 Detail XAI] [📤 Share]      │
   │ [💾 Pin to Project]                                  │
   └──────────────────────────────────────────────────────┘

6. Follow-up (kontekstual)
   "Berapa investasi yang perlu untuk turunkan skor Wajo?"
   → AI access Fitur 5.10 Optimization Solver
   → "Investasi sekitar Rp 250 Miliar (intervensi A+B+C)
     dapat menurunkan skor ke 55 (median Sulsel)..."

7. Pin & export
   - Klik [💾 Pin] → tersimpan di scenario project
   - Bisa di-export sebagai "AI Insight Card" di laporan
```

**Critical UX:**
- AI **selalu memberikan source citation** (bukan halusinasi)
- AI dapat **menolak**: "Saya tidak punya data yang cukup untuk menjawab ini"
- AI **transparent** tentang model yang dipakai (FITUR 6.9 XAI tab tersedia)

## 8.8 Flow H — Report Generation End-to-End

**Trigger:** Quarterly report Q2 2026 untuk Sulsel.

**Goal:** Buat report 30 halaman dengan data terkini, layout profesional, brand BIG, export PDF + Indonesian/English versions.

```
1. /reports/custom-report-builder
   → Fitur 8.4 Custom Report Builder

2. Setup
   - Template: "Quarterly Climate Risk Report"
   - Scope: Province Sulsel
   - Period: Apr-Jun 2026
   - Branding: BIG default

3. Section selection (modular)
   Daftar section yang bisa dipilih:
   ☑ Executive Summary (auto from Fitur 8.3)
   ☑ Methodology
   ☑ Climate Variables Trend (with charts from Fitur 2.1)
   ☑ LULC Change (from Fitur 2.2)
   ☑ Vulnerability Snapshot (from Fitur 3.1)
   ☑ Flood Risk (from Fitur 2.6)
   ☐ Carbon Footprint (skip — out of scope this quarter)
   ☑ Recommendations (from Fitur 5.4)
   ☑ Action Items
   ☑ Appendix Data Tables

4. Customize per section
   - Tambah text intro
   - Pilih chart variant
   - Set color scheme
   - Add custom map screenshots

5. Preview
   - Live preview di panel kanan
   - Page count: 32 halaman
   - Estimated read time: 22 menit

6. Generate (async)
   - Submit to Tasks API
   - SSE progress: "Composing section 1/9..." "Rendering maps..." "Compiling PDF..."
   - Total time: ~3 menit

7. Output
   - PDF download
   - "Generate Bahasa Inggris" toggle → re-render dengan label EN
   - "Generate PPT version" untuk presentasi
   - Save as template untuk re-use

8. Distribusi
   - Share via email (with link)
   - Publish to Public dashboard (jika tier publik)
   - Add to "My Reports" collection
```

**Tools used:** 8.4 (Builder), 8.3 (Auto Summary), 2.1/2.2/2.6 (data source), 3.1 (vulnerability), 5.4 (recommendations).

## 8.9 Flow I — Cross-Sectoral Analysis (Multi-Module)

**Trigger:** Question: "Bagaimana climate change mempengaruhi BOTH agriculture DAN tourism di Bali?"

**Goal:** Combine analysis dari 2 sektor untuk integrated view.

```
1. /sectoral
   - Filter: Sektor = [Food Security, Tourism]

2. Klik Fitur 4.2 (Rice Field) untuk Bali
   - Output: peta rice field, flood/drought risk

3. Sambil view, drag panel ke right → split view
   - Left: Fitur 4.2 result
   - Right: open Fitur 4.5 (Tourism) untuk Bali

4. Compose multi-layer map
   - Klik "Combine to Map"
   - Layers: rice flood risk + tourism vulnerability + overlap area

5. Multi-criteria via Fitur 5.5 MCDA
   - Open MCDA in new tab
   - Criteria: agriculture impact, tourism impact, employment, GDP contribution
   - Weight: equal for now
   - Result: heatmap area-area dengan combined impact tinggi

6. AI Insight:
   "Area di kabupaten X (Bali Selatan) menunjukkan high
    risk di BOTH sectors. Saran: priority intervention here."

7. Generate integrated report
   - Cross-sectoral template baru
```

**Key UX:** Platform mendukung **multi-module workflow** tanpa user harus context-switch berlebihan. Split-view, drag-and-drop antar modul, dan shared spatial context (province, time).

## 8.10 Flow J — Public Access (Persona P5)

**Trigger:** Citra (mahasiswa) baca berita "Demak terancam tenggelam 2050", penasaran lihat petanya.

**Goal:** Buka peta publik, eksplorasi, tanya AI, subscribe alert.

```
1. Buka /
   → Public landing page (§6.11)

2. Klik [🗺 Buka Peta Iklim]
   → /public/map
   - Map sederhana, layer publik saja:
     - Flood risk current
     - SLR projection 2030/2050
     - Air quality
   - No login required

3. Zoom ke Demak
   - Klik area → popup:
     "Demak: SLR projection 2050 = 1.2m
      Affected population: 280,000
      [Read story]"

4. Klik [Read story]
   → /public/sulsel-flood-2024 atau /public/demak-slr
   → Story map: scrollytelling article
   - Header image
   - Map embed yang berubah saat scroll
   - Text dalam Bahasa Indonesia sederhana
   - Quote dari ahli
   - Call to action

5. Tanya AI (public-tier)
   → Floating AI button (public-mode)
   - "Apa yang bisa saya lakukan untuk membantu?"
   → AI response dengan link ke:
     - Edukasi: "Apa itu SLR?"
     - Aksi pribadi: tips hemat energi
     - Komunitas: link ke NGO terkait

6. Subscribe alert
   - Klik [🔔 Subscribe]
   - Email input (no full signup)
   - Pilih kategori: Banjir / Kebakaran / SLR
   - Pilih region: Demak (auto-detect from earlier)
   - Confirm via email link

7. Share di sosmed
   - Klik [📤 Share]
   - Pre-filled tweet/IG dengan link ke story
   - Image card thumbnail
```

**Critical UX:**
- Public flow **tidak butuh login** untuk view-only access
- Semua content publik dalam **Bahasa Indonesia sederhana**, no jargon
- Story map adalah format dominan (bukan dashboard)
- AI tier publik **lebih hati-hati**: tidak akses data sensitif, jawaban edukasi-fokus

---

# BAGIAN 9 — KOMPONEN UI LIBRARY

Komponen UI yang dipakai berulang lintas-fitur. Mereka dikelompokkan dengan **atomic design methodology** (Atoms / Molecules / Organisms / Templates).

## 9.1 Atoms

Komponen paling kecil yang tidak bisa dipecah lagi.

### Button

| Variant | Use case | Visual |
|---------|----------|--------|
| **Primary** | Aksi utama di form (Save, Submit, Run) | Filled biru BIG, white text |
| **Secondary** | Aksi sekunder (Cancel, Back) | Border biru, biru text, white bg |
| **Tertiary / Ghost** | Link-style action | No border, biru text |
| **Destructive** | Delete, Remove | Filled merah |
| **Icon-only** | Toolbar actions | Icon only, tooltip on hover |

Sizes: `xs` (24px), `sm` (32px), `md` (40px — default), `lg` (48px), `xl` (56px — hero CTA).

States: default, hover, active, disabled, loading (with spinner).

### Input Field

| Variant | Use case |
|---------|----------|
| **Text input** | Single-line text |
| **Textarea** | Multi-line text |
| **Number input** | Numeric with +/- spinner |
| **Date picker** | Calendar dropdown |
| **Date range** | Two date pickers + presets |
| **Time picker** | Hours/minutes |
| **Search input** | With magnifier icon + clear |

States: default, focus, error (red border + error message), disabled, readonly.

### Badge / Tag

| Variant | Color | Use case |
|---------|-------|----------|
| Info | Biru | Status netral ("Beta") |
| Success | Hijau | "Approved", "Active" |
| Warning | Kuning | "Pending", "Caution" |
| Danger | Merah | "Failed", "Critical" |
| Neutral | Abu | Generic label |

### Icon

- Library: **Heroicons** atau **Lucide** (open-source, lightweight)
- Size: 16px (inline), 20px (button), 24px (standalone), 32px (large)
- Color: inherit from parent, OR semantic (success=hijau, dll.)
- Custom icons untuk domain-specific: weather, climate variables, vulnerability levels

### Label & Help Text

- Label di atas input
- Required marker: red asterisk `*`
- Help text: di bawah input, gray italic
- Error message: di bawah input, red

### Spinner / Progress

- **Indeterminate spinner**: untuk loading singkat (<2s)
- **Determinate progress bar**: untuk operasi dengan progress diketahui (uploads, model runs via SSE)
- **Skeleton**: untuk content placeholder saat loading data

### Tooltip

- Trigger: hover (desktop) atau tap (mobile)
- Position: auto (above/below based on space)
- Max width: 240px
- Delay: 500ms on hover

### Divider

- Horizontal divider: tipis abu untuk section separation
- Vertical divider: di toolbar atau navigation

## 9.2 Molecules

Kombinasi 2-3 atoms menjadi unit fungsional.

### Search Bar

```
+----------------------------------------+
| 🔍  Cari layer, scenario...     [X]   |
+----------------------------------------+
```
Components: icon + text input + clear button.

### Dropdown / Select

```
+----------------------------------------+
| Sulawesi Selatan                   ▾   |
+----------------------------------------+
```
- Single-select dengan typeahead untuk option > 10
- Multi-select dengan checkbox list
- Categorized dengan headers

### Card

```
+----------------------------------------+
| [Title]                          [⋮]   |
| ────────────────────────────           |
| Body content                            |
|                                          |
| [Footer action button]                  |
+----------------------------------------+
```
Variants: feature card, scenario card, layer card, report card.

### Toast / Snackbar

- Posisi: top-right (desktop), bottom (mobile)
- Auto-dismiss: 4s untuk info, 6s untuk warning, persistent untuk error
- Action button optional: "Undo", "Retry"
- Variants: success, info, warning, error

### Modal Dialog

- Center modal dengan backdrop dimmed
- Sizes: sm (400px), md (600px — default), lg (800px), xl (1200px)
- Header dengan title + close icon
- Footer dengan action buttons (Cancel + Primary)
- Animation: fade-in + scale 0.95→1
- Close on Esc, backdrop click optional

### Side Drawer

- Slide-in dari kanan (default) atau kiri
- Width: 400px (sm), 600px (md), 800px (lg)
- Backdrop semi-transparent
- Header sticky + close icon
- Content scrollable
- Used for: AI Assistant panel, Filter panel, Detail view

### Tab

```
+----------------------------------------+
| Tab 1 | Tab 2 | Tab 3                  |  ← Active tab highlighted
+----------------------------------------+
| Tab content                              |
+----------------------------------------+
```
Variants: top tab, side tab, pills.

### Breadcrumb

(Sudah di §4.4)

### Pagination

```
[<] 1 2 3 ... 47 [>]   25 of 1,247   [25 ▾]
```

### Table Row

| Sortable header | Sortable header | Action col |
|-----------------|-----------------|------------|
| Cell | Cell | [Edit] [Delete] |

Features: zebra striping, hover highlight, multi-select with checkbox col, sticky header, sticky first col.

## 9.3 Organisms

Kompleks, menggabungkan banyak molecules.

### Nav Bar

(Sudah di §5.1)

### Sidebar

(Sudah di §5.2)

### Map Widget (Reusable)

Embedded map yang bisa dipakai di banyak halaman.

Props:
- `layers: [Layer]` — daftar layer aktif
- `extent: BBox` — extent awal
- `controls: ['zoom', 'layers', 'legend', 'measure']` — controls yang ditampilkan
- `onClick: (feature) => void` — handler klik
- `onLayerChange: (layers) => void` — handler ganti layer

Backed by Leaflet atau MapLibre GL (via Map component dari Fitur 8.1).

### Dashboard Widget Container

Container untuk widget di dashboard (KPI card, chart, mini map, dll.). Mendukung drag-resize-reorder.

### Form

Wrapper komponen form dengan validation (Zod schema), submit handling, error display.

### Data Table

Tabel data dengan:
- Sorting per column
- Filtering per column
- Pagination
- Multi-select dengan bulk actions
- Column show/hide
- Export to CSV / Excel
- Frozen columns
- Inline edit (optional)

Used in: Data Catalog list, Scenario list, Report list, Audit log, dll.

### Chart Library

Charts via **Plotly.js** atau **ECharts** (dipakai konsisten lintas-platform):

- Line chart (time series)
- Bar chart (categorical)
- Stacked area
- Heatmap
- Scatter
- Choropleth (di-render via Map)
- Box plot
- Sankey
- Tornado (sensitivity)

Style consistent dengan design system (colors, fonts).

### Activity Feed Item

(Sudah dijelaskan di §6.7)

### Comment Thread

Components:
- Original comment
- Reply nested (1 level)
- Reactions (👍 ❤️ etc.)
- @mention parsing & autocomplete
- Edit / delete (own comments only)
- Markdown support (basic: bold, italic, link)
- File attachment

Used in: Fitur 7.2 Annotation, scenario discussion, dll.

### File Uploader

Drag-and-drop area + click to browse:

```
+----------------------------------------+
|        ┌───┐                           |
|        │ ⬆ │                           |
|        └───┘                           |
|                                          |
|   Drop file here or click to browse     |
|                                          |
|   Supported: shp, geojson, tif, csv     |
|   Max: 500MB per file                   |
+----------------------------------------+
```

Features: multi-file, progress per-file, validation pre-upload, error per-file.

### Annotation Toolbar (on Map)

Tools untuk annotate peta:
- Point
- Line
- Polygon
- Rectangle (bbox)
- Free draw
- Text label
- Delete

Used in: Map Explorer, Scenario Builder, Consultation session.

## 9.4 Templates

Layout pattern yang dipakai berulang.

### Dashboard Template

Layout untuk semua dashboard variants (home, project dashboard, custom).

```
+--------------------------------------------------------------------------+
| Top Bar                                                                   |
+--------------------------------------------------------------------------+
| Context Bar                                                               |
+--------------------------------------------------------------------------+
|     | Breadcrumb                                                          |
| Side| ──────────────────────────────────────────                          |
| bar | Quick Actions Bar                                                   |
|     | ──────────────────────────────────────────                          |
|     |                                                                       |
|     |  Grid of widgets (draggable, resizable)                              |
|     |  [Widget] [Widget] [Widget]                                          |
|     |  [Widget    ] [Widget]                                                |
|     |                                                                       |
+-----+--------------------------------------------------------------------+
| Status Bar                                                                |
+--------------------------------------------------------------------------+
```

### List + Detail Template

```
+--------------------------------------------------------------------------+
| Top Bar | Context | Breadcrumb                                            |
+-----+--------------------------+-----------------------------------------+
|     | [Search/Filter]          |                                          |
| Side| [List item]              |  [Detail view]                          |
| bar | [List item — selected]   |                                          |
|     | [List item]              |  Content of selected item                |
|     | ...                       |                                          |
+-----+--------------------------+-----------------------------------------+
| Status                                                                    |
+--------------------------------------------------------------------------+
```

Used in: Data Catalog, Scenario list, Reports list.

### Map-Full Template

```
+--------------------------------------------------------------------------+
| Top Bar | Context | (no breadcrumb)                                       |
+-----+--------------------------------------------------------------------+
|     |                                                                      |
| Map |   Full-screen map                                                   |
| ctrl|                                                                      |
|panel|   [Overlay controls: zoom, scale, legend]                           |
|     |                                                                      |
+-----+--------------------------------------------------------------------+
```

Used in: Map Explorer (Fitur 8.1).

### Wizard Template

Multi-step form for complex workflows (scenario builder, report builder, hindcast setup).

```
+--------------------------------------------------------------------------+
|  Step 1 ✓  →  Step 2 (active)  →  Step 3  →  Step 4                     |
+--------------------------------------------------------------------------+
|                                                                            |
|  [Step content]                                                            |
|                                                                            |
|                                                                            |
+--------------------------------------------------------------------------+
|  [Back]                                              [Cancel] [Next →]    |
+--------------------------------------------------------------------------+
```

Used in: Fitur 5.2 (Scenario Builder), 8.4 (Report Builder), 11.1 (Hindcast setup).

## 9.5 Custom Spasial Components

Komponen khusus untuk konteks geospatial.

### Layer Switcher

```
+---------------------------+
|  📚 Layers                |
| ─────────────────         |
|  ── Basemap ──            |
|  ⊙ OSM                    |
|  ○ Satellite              |
|  ○ Terrain                |
|                            |
|  ── Risk Layers ──         |
|  ☑ Banjir 2024            |
|  ☑ SLR Proj 2050          |
|  ☐ Karhutla 2025          |
|  ☐ Population             |
|                            |
|  ── Reference ──           |
|  ☑ Provinsi border        |
|  ☐ Kabupaten border       |
|                            |
|  [+ Add Layer]             |
+---------------------------+
```

Features:
- Group by category
- Toggle per layer
- Reorder via drag
- Opacity slider per layer
- Style editor (click gear icon)
- Add layer dari Data Catalog

### Time Slider

```
+---------------------------+
| 2025 ──●──────── 2050     |
| 2030                       |
| [▶ Play] [⏸] [⏮] [⏭]    |
| Speed: [1x ▾]              |
+---------------------------+
```

Features:
- Drag handle untuk pilih waktu
- Tick marks per year/month
- Play/pause animation
- Speed control
- Loop / once toggle
- Multi-temporal: 2 handles untuk range

### Scenario Picker

```
+---------------------------+
| 🎯 Scenario               |
| ─────                     |
| ⊙ SSP2-4.5 (default)      |
| ○ SSP1-2.6 (low)          |
| ○ SSP3-7.0 (high)         |
| ○ Custom (RCP-based)      |
+---------------------------+
```

### Legend

```
+---------------------------+
| Banjir Risk               |
| 🟢 Low (0-25)             |
| 🟡 Med (26-50)            |
| 🟠 High (51-75)           |
| 🔴 Very High (76-100)     |
+---------------------------+
```

- Auto-generated dari layer style
- Show/hide toggle
- Position: bottom-right (default), draggable

### Coordinate Display

Bottom-left dari map:
```
Lat: -5.13, Lng: 119.42  |  WGS84  |  Scale 1:50,000
```

### Measure Tool

Toggle tool untuk measure distance/area:
- Click first point → start measure
- Click subsequent → add segment
- Double-click → end
- Display: total distance / area in km/km²

### Drawing Tools

Set untuk draw geometry di peta:
- Point
- Line  
- Polygon
- Rectangle (bbox)
- Free draw
- Save as layer / export to Shapefile / GeoJSON

---

# BAGIAN 10 — STATE MANAGEMENT

State management adalah handling **semua kemungkinan kondisi** UI: empty, loading, error, partial, success.

## 10.1 Empty States

Empty state adalah saat tidak ada data untuk ditampilkan. **Bukan error** — ini kondisi valid.

### Pattern Empty State

```
+----------------------------------------+
|                                          |
|              [Icon 64px]                 |
|                                          |
|         Tidak ada hasil                  |
|                                          |
|   Coba ubah filter atau buat data baru   |
|                                          |
|        [Action button]                   |
|                                          |
+----------------------------------------+
```

Komponen:
- Icon ilustrative (📭 untuk no activity, 📂 untuk empty folder, 🔍 untuk no search result)
- Heading 1 baris
- Sub-text 1-2 baris dengan saran
- CTA button untuk aksi yang mungkin (Create new, Clear filter)

### Per-context empty states

| Context | Icon | Heading | Sub-text | CTA |
|---------|------|---------|----------|-----|
| Activity feed (new user) | 📭 | Belum ada aktivitas | Mulai dengan buat skenario atau cari data | [Create Scenario] |
| Search (no results) | 🔍 | Tidak ada hasil | Coba kata kunci lain atau ubah filter | [Clear Filter] |
| Project list (new) | 📂 | Belum ada project | Buat project pertama Anda | [+ New Project] |
| Comments | 💬 | Belum ada komentar | Mulai diskusi tentang topik ini | [Tulis komentar] |
| Notifications | 🔔 | Semua sudah di-read | Tidak ada notifikasi baru | (no CTA) |
| Map (no layers) | 🗺 | Tidak ada layer aktif | Pilih layer dari katalog data | [Browse Data] |
| Reports list | 📄 | Belum ada report | Generate executive summary atau custom report | [+ Buat Report] |

## 10.2 Loading States

Loading state harus **muncul cepat** (< 100ms) dan **memberitahu user apa yang terjadi**.

### Pattern: Skeleton

Untuk content yang akan punya struktur known:

```
+----------------------------------------+
| ▓▓▓▓▓▓▓▓▓▓▓                            |
|                                          |
| ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                  |
| ▓▓▓▓▓▓▓▓▓▓▓▓▓                          |
|                                          |
| ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                       |
+----------------------------------------+
```

Animasi shimmer gradient untuk indikasi aktif.

### Pattern: Spinner

Untuk loading singkat (<2s) atau aksi tidak punya struktur known:

```
        ⏳
   Memuat data...
```

### Pattern: Progress Bar

Untuk loading dengan progress diketahui:

```
Memuat data: ▓▓▓▓▓▓▓░░░░░░░░░  43%
ETA 30s
```

Source: Tasks API SSE (per FR-GVX-04).

### Pattern: Streaming Updates

Untuk AI responses (FITUR 6.5):

```
🤖 Mengetik...
🤖 Wajo memiliki skor vulnerability...
🤖 Wajo memiliki skor vulnerability lebih tinggi daripada Bone...
```

Streamed token-by-token (incremental update).

### Loading state per zona di Halaman Utama

| Zona | Loading Pattern |
|------|-----------------|
| Top Bar | Tidak ada (selalu loaded) |
| Context Bar | Skeleton untuk province dropdown |
| KPI Cards | Skeleton bar untuk angka |
| Risk Map | Placeholder map dengan "Memuat peta..." overlay |
| Activity Feed | Skeleton 5 rows |
| Module Grid | Tile dengan icon shimmer |

### Timeout strategy

- Loading > 10s → tampilkan "Masih memuat... [Cancel]"
- Loading > 30s → muncul dialog "Masih memuat. Coba refresh atau cancel?"
- Loading > 60s → otomatis treat as timeout, error state

## 10.3 Error States

Error harus **actionable** — pengguna harus tahu apa yang salah dan apa yang bisa dilakukan.

### Error Type 1: Network / Connectivity

```
+----------------------------------------+
|  ⚠ Koneksi terputus                    |
|                                          |
|  Periksa koneksi internet Anda.         |
|                                          |
|  Data terakhir: 5 menit lalu            |
|                                          |
|  [🔄 Coba Lagi]   [Offline Mode]        |
+----------------------------------------+
```

### Error Type 2: Authentication (Token Expired)

```
Sesi Anda telah berakhir.
[Login Kembali]
```

Auto-redirect ke `/login?return=<current>` setelah modal close.

### Error Type 3: GeoVertix Down (per FR-GVX-07)

```
+----------------------------------------+
|  ⚠ Sebagian layanan tidak tersedia     |
|                                          |
|  Risk Map sementara menggunakan data    |
|  cached (umur 2 jam).                   |
|                                          |
|  Anda tetap dapat:                       |
|  • Lihat scenarios tersimpan             |
|  • Edit drafts                           |
|  • Generate reports dari cache           |
|                                          |
|  [Lihat Status Sistem]                   |
+----------------------------------------+
```

### Error Type 4: Permission Denied

```
+----------------------------------------+
|  🔒 Akses Dibatasi                      |
|                                          |
|  Anda tidak memiliki akses ke fitur     |
|  ini. Hubungi administrator organisasi  |
|  jika ini adalah kesalahan.             |
|                                          |
|  [Kembali ke Dashboard]                  |
+----------------------------------------+
```

### Error Type 5: Validation Error (Form)

Inline per field:

```
Email *
[ahmad@bappeda]              ← red border
⚠ Format email tidak valid
```

Display rules:
- Show error setelah blur (bukan saat masih mengetik)
- Multiple errors → tampilkan semua, satu per field
- Submit button → disabled jika ada error

### Error Type 6: Generic Server Error

```
+----------------------------------------+
|  Terjadi kesalahan                      |
|                                          |
|  Tim kami sudah diberitahu otomatis.   |
|                                          |
|  Error ID: ERR-2026-05-22-A8F2           |
|                                          |
|  [Refresh Halaman] [Lapor Manual]       |
+----------------------------------------+
```

Error ID untuk tracking di logs.

## 10.4 Partial / Degraded States

Saat **sebagian** data berhasil dan **sebagian** gagal.

### Pattern

- Bagian yang OK → render normal
- Bagian yang gagal → inline error placeholder (bukan empty)
- Banner di top zona: "Beberapa data tidak tersedia"
- Status bar: indicate degraded

### Contoh di Halaman Utama

```
+----------------------------------------------+
|  ⚠ Beberapa zona menampilkan data cached    |
+----------------------------------------------+
|                                                |
|  [KPI 1] [KPI 2] [KPI 3] [KPI 4]            |
|  ✓        ✓        ⚠       ✓                |
|                                                |
|  [Risk Map: OK]    [Activity Feed: cached]   |
|                                                |
|  [Module Grid: OK]                            |
+----------------------------------------------+
```

KPI 3 yang fail menampilkan: `⚠ Tidak tersedia [Retry]`.

### Per FR-GVX-07 (PRD)

Setiap fitur memiliki dokumentasi fallback behavior. Saat GeoVertix integration touchpoint down, fitur tetap berfungsi dengan:
- Cached data (jika ada)
- Native fallback model (jika tersedia)
- Atau pesan clear "Tidak dapat memuat. Coba lagi nanti."

## 10.5 Success States & Feedback

Setiap aksi sukses harus diberi **feedback visual** sehingga user tahu it worked.

### Pattern: Toast Success

```
✓ Scenario tersimpan
```

Muncul 4 detik, top-right.

### Pattern: Inline Confirmation

Untuk aksi destructive yang sudah dilakukan:

```
✓ 5 items deleted [Undo]
```

Undo available 10 detik.

### Pattern: Page transition

Setelah submit form → redirect ke detail page dengan banner success:

```
✓ Scenario "RDTR Wajo 2030" berhasil dibuat. Lanjut edit?
[Edit] [Lihat di Map]
```

### Pattern: Empty state transition

Pertama kali pengguna selesai onboard, empty state berubah menjadi:

```
🎉 Selamat! Project pertama Anda sudah dibuat.
Apa selanjutnya?
[Tambah Layer Data] [Undang Tim]
```

---

# BAGIAN 11 — MOBILE & PWA

Mobile pengalaman harus **first-class**, bukan afterthought. Persona P2 (Planner) sering pakai tablet di lapangan; P5 (Public) mayoritas akses dari smartphone.

## 11.1 Breakpoint Strategy

Tiga breakpoint utama:

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, drawer sidebar, bottom nav |
| Tablet | 768-1280px | Two column, collapsible sidebar |
| Desktop | > 1280px | Full layout per wireframe di §6.2 |

CSS framework: **Tailwind CSS** atau setara dengan responsive utility (mobile-first).

## 11.2 Halaman Utama Mobile

```
+----------------------+
| [☰] ⚡ CA   [🔍][👤] |  Top bar minim
+----------------------+
| [🌍 Sulsel ▾]        |  Context (1 line, simplified)
+----------------------+
| Quick Action:         |
| [➕ Skenario]         |
+----------------------+
|  ┌──────┐ ┌──────┐  |
|  │Prov  │ │Alert │  |  KPI 2x2 grid
|  │18/18 │ │3 ⚠  │  |
|  └──────┘ └──────┘  |
|  ┌──────┐ ┌──────┐  |
|  │Model │ │Scenar│  |
|  │5 ⏳ │ │12   │  |
|  └──────┘ └──────┘  |
+----------------------+
| 📍 Peta Risiko        |
| [Map preview          |
|  scaled to width]     |
+----------------------+
| 📋 Aktivitas          |
| - Risk Alert Wajo     |
| - Comment di Demak    |
| - Report Q1 published |
| [Lihat semua]         |
+----------------------+
| 📂 Modul              |
| [Climate] [Vuln]     |  Vertical list, 1 per row
| [Sectoral] [SDSS]    |
| [AI] [Collab]         |
| ...                   |
+----------------------+
| [⌂] [🗺] [⚡] [📊] [⋮]  |  Bottom Nav
+----------------------+
```

## 11.3 Bottom Navigation (Mobile)

5 ikon di bottom (universal mobile pattern):

| Ikon | Label | Action |
|------|-------|--------|
| ⌂ | Home | Go to /dashboard |
| 🗺 | Map | Go to /map |
| ⚡ | Aksi | Open Quick Actions menu (bottom sheet) |
| 📊 | Reports | Go to /reports |
| ⋮ | More | Open drawer with rest of navigation |

Active state: ikon highlighted + label biru.

## 11.4 Offline-First Patterns

Per FITUR 12.2 Mobile PWA dan PRD NFR-AVAIL.

### Service Worker Strategy

| Resource | Strategy |
|----------|----------|
| App shell (HTML/CSS/JS) | Cache First, update in background |
| API GET (data) | Network First, fallback to cache (TTL 1h) |
| Maps tiles | Cache First (with size limit 100MB) |
| API POST/PUT (mutations) | Network Only — offline queue if no network |
| User-uploaded data | IndexedDB local + sync when online |

### Offline Indicator

Saat offline:
- Banner kuning sticky di top: "Anda offline. Perubahan akan disinkronkan saat online."
- Status bar: `● Offline`
- Disable beberapa actions (mis. Run Model — needs online)
- Allow read-only browsing dari cache
- Allow form filling — di-queue untuk sync

### Sync on Reconnect

- Auto-sync queued mutations saat online detected
- Show progress: "Menyinkronkan 5 perubahan..."
- Conflict resolution: server wins; user notified

## 11.5 Field Data Capture UX

Untuk P2 Planner di lapangan (validation visit per PRD §19.4):

### Mode "Field Capture"

Buka di mobile → /field/capture

```
+----------------------+
| 📍 Field Capture     |
+----------------------+
| Project: RDTR Wajo   |
| ─────────────────    |
| Lokasi:              |
| 📍 -3.97, 120.13     |
| (GPS terdeteksi)      |
| ─────────────────    |
| Observasi:            |
| [📸 Foto] (5/10)     |
| [🎤 Audio note]      |
| [✏ Text note]        |
| ─────────────────    |
| Kategori:             |
| ⊙ Banjir              |
| ○ Erosi               |
| ○ Land Use Change     |
| ○ Other               |
| ─────────────────    |
| Severity (1-5):       |
| [Slider ────●────]    |
| ─────────────────    |
| [💾 Save Offline]    |
+----------------------+
```

- GPS auto-tag location
- Photos compress di device sebelum store
- Notes typed atau dictate (offline-capable speech-to-text via browser API)
- Queue di IndexedDB; sync saat online

---

# BAGIAN 12 — AKSESIBILITAS & i18n

Aksesibilitas adalah **mandate** dari PRD (NFR-USAB) dan TOR — bukan optional. Platform melayani 250+ juta penduduk Indonesia dengan beragam kebutuhan.

## 12.1 WCAG 2.1 AA Compliance Checklist

### Perceivable (semua user bisa lihat/dengar content)

| Item | Status target |
|------|---------------|
| Alt text untuk semua image | ✓ Required (form validation) |
| Caption / transcript untuk video (jika ada) | ✓ Required |
| Color contrast text vs background ≥ 4.5:1 | ✓ Enforced via design system tokens |
| Color contrast UI components ≥ 3:1 | ✓ Enforced |
| Color tidak satu-satunya cara komunikasi (pakai icon + color + text) | ✓ Pattern |
| Text resize sampai 200% tanpa overflow | ✓ Fluid layout |

### Operable (semua user bisa interact)

| Item | Status target |
|------|---------------|
| Semua functionality reachable via keyboard | ✓ Full keyboard nav (§5.9) |
| Visible focus indicator | ✓ Outline ring 2px biru |
| Skip link "Skip to content" | ✓ Top of every page |
| Heading hierarchy logical (h1 > h2 > h3) | ✓ Per template |
| Link text descriptive (no "click here") | ✓ Guideline |
| No keyboard trap | ✓ Tested |
| Time limits adjustable | ✓ Session timeout configurable |
| Pause / stop animation | ✓ Respect prefers-reduced-motion |

### Understandable (content readable & predictable)

| Item | Status target |
|------|---------------|
| Page language declared (`<html lang="id">`) | ✓ Dynamic per language |
| Inline language change marked (`<span lang="en">`) | ✓ For mixed-language content |
| Error suggestion provided | ✓ Field-level error with suggestion |
| Labels for all form inputs | ✓ Required |
| Consistent navigation across pages | ✓ Per design system |

### Robust (works with assistive tech)

| Item | Status target |
|------|---------------|
| Valid HTML | ✓ CI lint |
| ARIA roles for dynamic content | ✓ React component library |
| Live regions for updates | ✓ For notifications, toast |
| Compatible with NVDA, JAWS, VoiceOver | ✓ Tested |

## 12.2 Keyboard Navigation Patterns

### Tab order

- Logical: top → bottom, left → right
- Skip link as first tabbable element
- Modal traps focus saat open, releases on close
- Keyboard shortcuts (§5.9) tidak conflict dengan screen reader shortcuts

### Focus management

- Setelah modal close, focus kembali ke trigger element
- Setelah navigation, focus ke main content (not top bar)
- Focus visible: outline 2px blue + offset 2px
- Custom focus untuk interactive map: arrow keys pan, +/- zoom, Tab moves between controls

### Common keyboard patterns

| Component | Keyboard |
|-----------|----------|
| Dropdown | ↑↓ navigate, Enter select, Esc close |
| Modal | Esc close, Tab cycles through interactive |
| Tab list | ←→ switch tabs, Tab moves into content |
| Table | Arrow keys cell-by-cell navigation |
| Date picker | Arrow keys navigate, Enter select, Esc close |
| Search results | ↑↓ navigate, Enter open, ⌘+click open in new tab |

## 12.3 Screen Reader Considerations

### Semantic HTML

- `<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>` untuk landmarks
- `<button>` (bukan `<div>` dengan onClick)
- `<a>` untuk navigation, `<button>` untuk actions
- `<h1>` per page (only one), `<h2>`-`<h6>` hierarchical
- `<table>` dengan `<th>` untuk data tables

### ARIA

- `aria-label` untuk icon-only buttons
- `aria-live="polite"` untuk activity feed updates
- `aria-live="assertive"` untuk alerts critical
- `aria-expanded` untuk collapsibles
- `aria-current="page"` untuk active nav item
- `role="region"` dengan label untuk landmarks tambahan
- `role="alert"` untuk error inline

### Announcement patterns

Saat KPI angka berubah (auto-refresh):
```html
<div aria-live="polite" aria-atomic="true">
  Risk alerts: 3 (updated 5 seconds ago)
</div>
```

Tidak announce setiap detik — debounce ≥ 5s antar announcement.

### Map accessibility

Map adalah element visual yang sulit di-screen-reader. Strategi:
- Provide **data summary** dalam text form: "Peta menampilkan vulnerability di 12 kabupaten Sulsel. Wajo tertinggi (72), Pinrang terendah (34). [Detail tabel]"
- Tombol "View as table" → buka representasi tabular dari data peta
- Klik fitur di peta → ARIA announcement: "Wajo selected. Vulnerability score 72."

## 12.4 Color Contrast & Color-Blind Friendly Palettes

### Color blindness statistics

8% laki-laki dan 0.5% perempuan memiliki color vision deficiency. Untuk platform climate (yang banyak pakai warna hijau-merah untuk risk), ini krusial.

### Strategy: Multi-modal encoding

Jangan **hanya** pakai warna — selalu kombinasi dengan:
- **Pattern / texture** (striped, solid, dotted)
- **Icon** (✓, ⚠, ⚡, ✗)
- **Label** (text "Low", "High")

### Risk color palette (default + accessible)

| Level | Default | Color-blind friendly | Pattern |
|-------|---------|----------------------|---------|
| Very Low | Hijau gelap | Biru muda | dots |
| Low | Hijau muda | Biru-hijau | solid |
| Medium | Kuning | Kuning | diagonal |
| High | Oranye | Oranye | diagonal-bold |
| Very High | Merah | Merah | cross-hatch |

User dapat toggle "Color-blind friendly mode" di Settings.

### Contrast tools

- Build-time check via Lighthouse / axe-core
- Design tokens dengan WCAG-passing combinations only
- Tidak ada warna text dengan contrast < 4.5:1 vs background

## 12.5 Bahasa Indonesia / English Toggle Mechanics

Per FITUR 9.4 i18n ID/EN.

### Implementation

- Library: **i18next** atau **react-intl**
- Bahasa: Indonesian (default), English
- Keys di JSON files per bahasa:
  ```json
  {
    "dashboard.title": "Dashboard",
    "dashboard.kpi.activeProvinces": "Provinsi Aktif"
  }
  ```
- Translation di-load lazily per page

### Toggle behavior

- Klik 🌐 ID/EN di top bar
- Bahasa berubah seluruh UI tanpa reload
- URL tidak berubah (preferensi tersimpan di localStorage + user profile)
- Mixed-language content (mis. ulasan ahli Inggris di laporan Indonesia) di-mark `lang` attribute

### Content beyond UI labels

| Konten | Bahasa Default | Translation |
|--------|----------------|-------------|
| UI labels | ID | EN (full) |
| System messages | ID | EN (full) |
| Documentation | ID | EN (full) |
| Tooltips | ID | EN (full) |
| Place names | ID native (e.g., "Sulawesi Selatan") | ID native (universal) |
| Dataset names | ID atau original lang | preserved |
| User-generated comments | User's own lang | Not auto-translated; show as-is |

### Tone per bahasa

- ID: formal-friendly (gunakan "Anda", bukan "kamu")
- EN: standard professional ("you")

## 12.6 Cultural Considerations (Indonesian Context)

### Date / time / number formats

| Item | Format ID | Format EN |
|------|-----------|-----------|
| Date | 22 Mei 2026 | 22 May 2026 |
| Time | 14:30 WIB | 14:30 WIB |
| Number | 1.000.000 (titik thousand) | 1,000,000 |
| Decimal | 3,14 | 3.14 |
| Currency | Rp 1.500.000 | IDR 1,500,000 |
| Phone | +62-21-1234-5678 | +62-21-1234-5678 |

### Timezone

- Default WIB (UTC+7)
- Support WITA (UTC+8) untuk pengguna di Indonesia tengah
- Support WIT (UTC+9) untuk pengguna di Indonesia timur
- User dapat set timezone di Settings

### Religious & cultural sensitivities

- No imagery yang sensitif religius
- Kalender Islamic / Hindu disebut untuk events tertentu (Ramadan, Nyepi affect data collection)
- Cuti nasional terlihat di kalender (no model run scheduled at Lebaran)

### Indonesian government conventions

- BIG sebagai authority — logo di top-left
- One Map Policy alignment terlihat di UI (basemap default = One Map)
- Bahasa formal pemerintahan untuk official reports
- Stempel & tanda tangan digital sesuai standar PerBSSN (untuk sign-off)

---

# BAGIAN 13 — VISUAL DESIGN SYSTEM (FOUNDATIONS)

Bagian ini adalah **token-level** specifications. Tidak ada pixel-perfect mockup — itu untuk tahap berikutnya (Figma hi-fi). Tujuan section ini: memberikan **constraint** untuk designer dan developer.

## 13.1 Color Tokens

### Primary palette

```
Primary Blue (BIG):
  primary-50:  #EFF6FF
  primary-100: #DBEAFE
  primary-200: #BFDBFE
  primary-300: #93C5FD
  primary-400: #60A5FA
  primary-500: #3B82F6  ← base
  primary-600: #2563EB  ← default button
  primary-700: #1D4ED8  ← hover
  primary-800: #1E40AF
  primary-900: #1E3A8A
```

### Semantic colors

```
Success Green:
  success-50:  #F0FDF4
  success-500: #22C55E
  success-700: #15803D

Warning Yellow:
  warning-50:  #FEFCE8
  warning-500: #EAB308
  warning-700: #A16207

Danger Red:
  danger-50:   #FEF2F2
  danger-500:  #EF4444
  danger-700:  #B91C1C

Info Blue:
  info-50:     #ECFEFF
  info-500:    #06B6D4
  info-700:    #0E7490
```

### Neutral palette

```
Gray scale:
  gray-50:   #F9FAFB  ← background
  gray-100:  #F3F4F6
  gray-200:  #E5E7EB  ← divider
  gray-300:  #D1D5DB
  gray-400:  #9CA3AF  ← placeholder
  gray-500:  #6B7280
  gray-600:  #4B5563  ← muted text
  gray-700:  #374151
  gray-800:  #1F2937
  gray-900:  #111827  ← heading text
```

### Risk gradient (5-step)

```
risk-1 (Very Low):  #2563EB (blue)
risk-2 (Low):       #16A34A (green)
risk-3 (Medium):    #EAB308 (yellow)
risk-4 (High):      #EA580C (orange)
risk-5 (Very High): #DC2626 (red)
```

### Color-blind friendly alternative

```
cb-1: #1F77B4 (blue)
cb-2: #FF7F0E (orange)
cb-3: #2CA02C (green)
cb-4: #D62728 (red)
cb-5: #9467BD (purple)
```

(Per Tol-rainbow palette, color-blind tested)

## 13.2 Typography Scale

### Font family

```
Sans-serif: "Inter", "Helvetica Neue", system-ui, sans-serif
Serif (display): "Source Serif Pro", Georgia, serif
Monospace (code): "JetBrains Mono", "Fira Code", monospace
```

Inter dipilih karena: open-source, multi-script support (Latin + extended), highly readable di small sizes.

### Scale

```
text-xs:    12px (0.75rem)  — labels, metadata
text-sm:    14px (0.875rem) — body small, table cells
text-base:  16px (1rem)     — body default
text-lg:    18px (1.125rem) — body emphasized
text-xl:    20px (1.25rem)  — h6
text-2xl:   24px (1.5rem)   — h5
text-3xl:   30px (1.875rem) — h4
text-4xl:   36px (2.25rem)  — h3
text-5xl:   48px (3rem)     — h2 / page title
text-6xl:   60px (3.75rem)  — h1 / hero
```

### Line height

```
leading-none:    1
leading-tight:   1.25  — headings
leading-snug:    1.375
leading-normal:  1.5   — body
leading-relaxed: 1.625 — long-form
leading-loose:   2
```

### Font weight

```
font-thin:       100
font-light:      300
font-normal:     400  — body
font-medium:     500  — emphasized body
font-semibold:   600  — headings
font-bold:       700  — strong emphasis
```

### Typography pattern per element

| Element | Token | Weight | Line height |
|---------|-------|--------|-------------|
| H1 | text-5xl | 700 | tight |
| H2 | text-4xl | 600 | tight |
| H3 | text-3xl | 600 | snug |
| H4 | text-2xl | 600 | snug |
| H5 | text-xl | 600 | snug |
| H6 | text-lg | 600 | normal |
| Body | text-base | 400 | normal |
| Body emphasis | text-base | 500 | normal |
| Body small | text-sm | 400 | normal |
| Caption | text-xs | 400 | normal |
| Code | mono text-sm | 400 | normal |

## 13.3 Spacing & Grid

### Spacing scale (Tailwind-style, 4px base)

```
space-0:  0px
space-1:  4px
space-2:  8px
space-3:  12px
space-4:  16px
space-5:  20px
space-6:  24px
space-8:  32px
space-10: 40px
space-12: 48px
space-16: 64px
space-20: 80px
space-24: 96px
```

### Grid system

- 12-column grid
- Gutter: 24px (space-6)
- Margin: 32px (space-8) desktop, 16px (space-4) mobile
- Max content width: 1440px (centered) untuk dashboards & long-form pages
- Map / canvas pages: full-width (no max)

### Layout zones width

| Zone | Width |
|------|-------|
| Top Bar | 100% (full width, sticky) |
| Sidebar (expanded) | 240px |
| Sidebar (collapsed) | 56px |
| Context Bar | 100% (full width below top bar) |
| Main content | flex (fill remaining) |
| AI Drawer | 400px (desktop), 100% (mobile) |
| Modal default | 600px |

## 13.4 Iconography

### Icon library

- **Lucide** (open-source fork of Feather Icons): 1000+ ikon, konsisten weight
- Custom domain icons: weather, climate, flood, fire, biodiversity, vulnerability scale

### Icon sizes

```
icon-xs:  12px — inline within text
icon-sm:  16px — buttons, inputs
icon-md:  20px — navigation
icon-lg:  24px — standalone, headers
icon-xl:  32px — empty states, large CTAs
icon-2xl: 48px — hero illustrations
```

### Icon style

- Stroke-only (line) — bukan filled
- Stroke width 1.5px consistent
- Rounded line caps
- 24×24 viewport base

### Domain icons

Khusus untuk climate platform:
- 🌡 Temperature — climate model
- 💧 Drop — water / flood
- 🌊 Wave — sea level
- 🔥 Fire — fire risk
- 🌳 Tree — forest / biodiversity
- ⚡ Lightning — anomaly / EWS
- 🌬 Wind — air quality / wind energy
- ☀ Sun — solar / temperature
- 🛰 Satellite — remote sensing
- 🏗 Construction — infrastructure

## 13.5 Elevation & Shadow

```
shadow-none:  none
shadow-sm:    0 1px 2px rgba(0,0,0,0.05)   — subtle
shadow-md:    0 4px 6px rgba(0,0,0,0.1)    — cards default
shadow-lg:    0 10px 15px rgba(0,0,0,0.1)  — hover lift
shadow-xl:    0 20px 25px rgba(0,0,0,0.1)  — modal
shadow-2xl:   0 25px 50px rgba(0,0,0,0.25) — overlay
```

### Usage

- Cards: shadow-md (rest), shadow-lg (hover)
- Sidebar: no shadow (border-right instead)
- Modal: shadow-xl
- Toast: shadow-lg
- Floating AI button: shadow-xl

## 13.6 Motion & Transitions

### Duration

```
duration-fast:    150ms — micro-interactions (hover, focus)
duration-base:    250ms — default (drawer slide, modal fade)
duration-slow:    400ms — page transition, large layout shift
duration-slowest: 700ms — onboarding tour highlights
```

### Easing

```
ease-in:      cubic-bezier(0.4, 0, 1, 1)
ease-out:     cubic-bezier(0, 0, 0.2, 1)   — default for entering
ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1) — default for transforms
```

### Animation patterns

| Pattern | Duration | Easing |
|---------|----------|--------|
| Sidebar collapse | 200ms | ease-in-out |
| Modal fade-in | 250ms | ease-out |
| Modal scale (0.95→1) | 250ms | ease-out |
| Toast slide-in (top) | 200ms | ease-out |
| Tab switch | 150ms | ease-in-out |
| Hover lift | 150ms | ease-out |
| Skeleton shimmer | infinite 1500ms | linear |
| Page transition | 250ms | ease-out (fade only) |

### prefers-reduced-motion

User dengan `prefers-reduced-motion: reduce` mendapat:
- No fade transitions (instant)
- No slide animations (instant position change)
- No shimmer skeleton (static gray)
- Spinner masih ada (essential feedback)

---

# BAGIAN 14 — CATATAN IMPLEMENTASI

## 14.1 Saran Tech Stack

### Frontend

| Layer | Recommendation | Alasan |
|-------|----------------|--------|
| Framework | **Next.js 14+** (App Router) | SSR + CSR hybrid, file-based routing, Vercel-compatible |
| UI library | **React 18+** | Mature, ecosystem besar |
| Styling | **Tailwind CSS** + **shadcn/ui** | Utility-first, consistent design tokens |
| State mgmt | **Zustand** (lokal) + **React Query** (server state) | Lightweight, modern |
| Map library | **MapLibre GL JS** | Open-source, performant, MVT support, OGC compatible |
| Charting | **Plotly.js** atau **ECharts** | Rich features, interactive, SVG/Canvas |
| Forms | **React Hook Form** + **Zod** | Performance + type safety |
| i18n | **next-intl** atau **i18next** | Lazy loading, format support |
| Testing | **Vitest** + **React Testing Library** + **Playwright** | Unit + component + e2e |
| Component dev | **Storybook 8+** | Isolated component dev + visual testing |

### PWA

- **next-pwa** atau Workbox
- Service worker untuk offline-first
- IndexedDB untuk local storage (Dexie wrapper)
- Web Manifest untuk install prompt

### Build & deployment

- Bundler: Turbopack (Next.js built-in) atau Vite
- Image optimization: Next.js Image
- Code splitting: Next.js automatic route-based + manual dynamic imports
- CDN: CloudFront atau equivalent
- Hosting: Kubernetes containerized

### Communication dengan backend

- REST: Axios atau Fetch wrapper
- WebSocket: untuk realtime (collaboration session, SSE updates)
- GraphQL: optional, untuk admin/researcher API
- gRPC: bukan untuk frontend (server-to-server only)

## 14.2 Performance Budget

Per PRD NFR-PERF-02 (sub-second response common operations).

### Initial Load Budget

| Metric | Target | Tools |
|--------|--------|-------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Web Vitals |
| Time to Interactive | < 3.5s | Lighthouse |
| Total Blocking Time | < 200ms | Web Vitals |
| Cumulative Layout Shift | < 0.1 | Web Vitals |
| Initial bundle size (gzipped) | < 200KB | webpack-bundle-analyzer |

### Runtime Budget

| Interaction | Target |
|-------------|--------|
| Page navigation | < 500ms |
| Map pan/zoom | < 100ms (60fps) |
| Filter apply | < 200ms |
| Search results | < 300ms |
| AI query (cached) | < 1s |
| AI query (live) | < 5s (with streaming) |

### Network Budget

| Resource | Target |
|----------|--------|
| HTML initial | < 50KB |
| Critical CSS | < 20KB inline |
| JS chunk per route | < 100KB |
| Map tiles | progressive load, prioritize visible |
| Images | WebP + AVIF, srcset |

## 14.3 Prioritas Pengembangan (Y1-Y3)

Per PRD §20 deliverables timeline (27 bulan).

### Year 1 (2026) — Foundation

**Q1-Q2 (M1-M6): Inception + Concept Design**
- Validate desain dokumen ini dengan stakeholder
- Design system setup di Figma + Storybook
- Tech stack POC

**Q3 (M7-M9): Platform Beta (D15)**
- Top bar, sidebar, basic dashboard (no live data)
- Authentication & authorization
- Map Explorer skeleton
- 5-10 fitur prioritas implemented

**Q4 (M10-M12):**
- Data Catalog (Fitur 10.1)
- Scenario Manager basic (Fitur 5.2)
- Vulnerability MCDA basic (Fitur 3.1)

### Year 2 (2027) — Core Platform

**M13-M15: Platform V.1 (D16)**
- All Bagian 2 modeling features
- All Bagian 3 vulnerability
- Selected Bagian 4 sectoral (RDTR, coastal)
- AI integration baseline (Fitur 6.5 LLM, 6.6 RAG)

**M16-M18: Platform V.2 (D16)**
- AI/LLM/RAG full integration
- Bagian 5 SDSS Core complete
- Bagian 8 Reports & Outputs

**M19-M21: Platform V.3 (D17)**
- Bagian 7 Collaboration
- Bagian 11 Hindcasting
- Mobile PWA refinement
- Bagian 13 External Integrations

### Year 3 (2028) — Full Version

**M22-M24: Platform Full Version (D18)**
- Performance optimization
- Accessibility audit & remediation
- All persona variants polished
- Crisis Mode rollout
- All 62 fitur in production

**M25-M27: Validation & Handover (D19-D21)**
- UAT broad audience
- Documentation finalized
- Capacity building
- Implementation roadmap

## 14.4 Integrasi dengan Component Library Existing

BIG / GeoVertix mungkin sudah punya component library internal. Strategi:

1. **Inventory existing components** — list semua komponen yang sudah ada dengan style guide
2. **Identify overlap** — komponen mana yang bisa di-reuse, mana yang perlu di-build
3. **Plan deprecation / merge** — jika ada konflik style, decide one source of truth
4. **Maintain consistency** — jangan introduce 2 button styles di same platform

Jika tidak ada existing library, mulai dengan **shadcn/ui** (copy-paste components, full customizable, owned by team).

## 14.5 Testing Strategy untuk UI

### Unit testing
- Per component dengan React Testing Library
- Coverage target: > 80% untuk core components
- Mocking external dependencies (API, maps)

### Component testing (Storybook)
- Visual regression via Chromatic atau Percy
- Interaction tests via Storybook Interaction Addon
- Accessibility tests via axe-storybook-addon

### Integration testing
- Critical user flows via Playwright
- Per persona (P1-P5)
- Per browser: Chrome, Firefox, Safari, Edge
- Per device: desktop 1440px, tablet 1024px, mobile 375px

### Accessibility testing
- Automated: Lighthouse, axe-core
- Manual: keyboard navigation walkthrough, screen reader test (NVDA + VoiceOver)
- Audit: external WCAG audit pre-launch

### Performance testing
- Lighthouse CI di pipeline
- Bundle size budget (gates di CI)
- Real User Monitoring (RUM) via web-vitals

### Cross-cutting tests

- **Persona walkthrough**: setiap rilis, walk through 5 personas via 10 user flows (otomatis via Playwright)
- **GeoVertix integration**: contract tests (per FR-GVX-06) untuk memastikan integration touchpoints tetap valid
- **i18n**: ID + EN keys lengkap, no missing translations

---



---

# BAGIAN 15 — STRATEGI PEMBUATAN PROTOTYPE *(Baru di v1.1)*

Bagian ini adalah **jembatan operasional** antara dokumen desain ini dengan implementasi prototype. Ia menjawab pertanyaan:

> "Saya punya dokumen lengkap 4400+ baris. Sekarang **dari mana saya mulai** untuk membuat prototype?"

## 15.1 Tujuan Bagian Ini

- Memberikan **scope MVP yang tegas** untuk prototype pertama
- Memilih **satu persona prioritas** sebagai fokus pertama (tidak semua 5 sekaligus)
- Mengurutkan **screen yang harus dibuat** dengan prioritas tinggi-menengah-rendah
- Memberikan **demo script** untuk presentasi pertama ke stakeholder
- Mengidentifikasi **anti-pattern** yang harus dihindari di tahap prototype

Bagian ini **tidak menggantikan** dokumen utama — ia mempersempit fokus untuk fase pembuatan prototype.

## 15.2 Tahapan Prototype (Low-Fi → Mid-Fi → Hi-Fi)

Pembangunan prototype harus iteratif. Tiga tahap berikut adalah rekomendasi roadmap:

| Tahap | Output | Tujuan | Estimasi Effort |
|-------|--------|--------|------------------|
| **L1 — Low-Fi** | Static wireframe (HTML+CSS atau Figma frame) | Validate IA + zona layout | 1-2 minggu |
| **L2 — Mid-Fi** | Interactive prototype dengan mock data | Validate flows + interaksi kunci | 3-4 minggu |
| **L3 — Hi-Fi** | Production-quality UI dengan API integration | Validate end-to-end + handover ke dev penuh | 6-8 minggu |

**Untuk prototype pertama (yang akan menggunakan Claude/AI-assisted development), target tahap L2 (Mid-Fi)** — interactive dengan mock data, single-page React app yang dapat di-demo, tapi belum terhubung ke backend real.

## 15.3 MVP Scope untuk Prototype Pertama

**Definisi MVP Prototype:**

> Sebuah aplikasi web single-page yang menunjukkan **Halaman Utama untuk Persona P2 (Planner)** dengan **interaktivitas penuh untuk 4 zona inti** dan **navigasi static ke 2-3 module landing pages** sebagai bukti konsep informasi arsitektur.

### Yang HARUS ADA (Must-have)

| # | Elemen | Catatan |
|---|--------|---------|
| 1 | Top Bar lengkap (logo, search box, AI button, notification badge, language toggle, user menu) | Dengan fungsi search modal yang muncul saat diklik |
| 2 | Left Sidebar lengkap dengan 10 module items | Toggle collapse/expand bekerja |
| 3 | Context Bar (province dropdown, period selector, scenario picker) | Dropdown province bekerja & trigger re-render KPI |
| 4 | Quick Actions Bar dengan 4 tombol persona P2 | Klik buka modal/dialog (sederhana saja) |
| 5 | KPI Cards Row (4 cards) dengan data mock | Re-render saat ganti province |
| 6 | Risk Map Inline (placeholder atau static image map) | Tidak perlu real map — placeholder image OK |
| 7 | Activity Feed dengan 5-7 mock items | Klik item buka detail panel atau toast |
| 8 | Module Grid (10 tiles) | Klik tile navigasi ke module landing page |
| 9 | Footer Status Bar | Live indicator + uptime mock |
| 10 | 2-3 Module Landing Pages (Climate Modeling, Vulnerability, Reports) | Sebagai bukti konsep navigasi |
| 11 | AI Assistant floating button + side drawer | Drawer terbuka saat diklik, dengan mock conversation |
| 12 | Empty state, loading skeleton, error state untuk 1-2 zona | Demonstrate state management |

### Yang BOLEH DITUNDA (Nice-to-have)

| Elemen | Mengapa Ditunda |
|--------|------------------|
| Mobile responsive penuh | Desktop dulu; mobile bisa ditunjukkan via Chrome DevTools responsive view |
| Real map (Leaflet/MapLibre GL) | Bisa pakai placeholder image atau static SVG sebagai mock |
| Real AI integration (OpenAI/Claude API) | Mock conversation pakai pre-canned responses |
| 5 personas (P1-P5) penuh | Persona switcher di settings sebagai bonus, tapi cukup tunjukkan default P2 |
| Crisis Mode lengkap | Hanya toggle button untuk demo "ada Crisis Mode" |
| Authentication flow (login, signup) | Bypass dengan "default user logged in as Ahmad" |
| i18n ID/EN toggle | Toggle ada di UI tapi belum berfungsi penuh |
| Map Explorer full screen | Module landing page Map cukup tampilkan placeholder + link |
| Module Landing untuk semua 10 modul | Cukup 2-3 sebagai bukti pola |
| User flows lainnya (selain Daily Planner) | Demonstrate via story-driven walkthrough |

### Yang TIDAK USAH ADA di Prototype

| Elemen | Mengapa |
|--------|---------|
| Backend API real | Mock data sudah cukup |
| Database | Mock data di-load dari JSON |
| Authentication / Authorization real | Hardcoded user role |
| Map tiles dari GeoVertix | Placeholder image OK |
| Plugin runtime calls | Tidak relevan di UI prototype |
| OGC services | Tidak relevan di UI prototype |
| WebSocket/SSE | Polling atau static OK |
| Offline / PWA / Service Worker | Tahap berikutnya |
| File upload yang berfungsi | Hanya tampilkan UI-nya |

## 15.4 Persona Pilihan untuk Prototype Pertama

**Rekomendasi: Mulai dengan Persona P2 (Government Planner).**

**Alasan:**

1. **Persona "tengah" dalam complexity** — tidak terlalu sederhana (P5) atau terlalu kompleks (P3 Researcher), sehingga dapat menunjukkan kapabilitas platform secara seimbang.
2. **Daily user — paling sering dipakai** — desain untuk pengguna harian akan otomatis mendekati desain "umum" yang dapat diadaptasi ke persona lain.
3. **Mengakses paling banyak modul** — sehingga prototype dapat menunjukkan breadth of platform (10 modul) tanpa harus membuat varian khusus.
4. **Sesuai customer primary** — BIG sebagai klien utama akan banyak menggunakan platform pada role P2 (Planner di Bappeda, Direktorat Tata Ruang, dll.).
5. **Background user middle-tier** — familiar dengan GIS tapi bukan power-user, sehingga UI harus jelas dan tidak overload.

**Sekali prototype P2 selesai dan divalidasi, varian lain dapat dibangun dengan effort 30-40% per persona** (karena shell, navigasi, dan komponen sudah ada — hanya konten zona yang berubah).

## 15.5 Daftar Screen yang Harus Ada di MVP Prototype

Daftar screen di-prioritisasi: **P0** (must-have untuk demo pertama), **P1** (penting untuk validasi flows), **P2** (nice-to-have untuk demo lengkap).

### Prioritas P0 (Must-have)

| # | Screen | Persona | Estimasi Build |
|---|--------|---------|----------------|
| 1 | `/dashboard` (Home — P2 Planner variant) | P2 | 8-12 jam |
| 2 | Global Search Modal (overlay) | All | 3-5 jam |
| 3 | AI Assistant Side Drawer | All | 4-6 jam |
| 4 | `/modeling` (Module Landing: Climate Modeling) | P2 | 4-6 jam |
| 5 | `/vulnerability` (Module Landing: Vulnerability) | P2 | 3-4 jam |
| 6 | `/reports` (Module Landing: Reports) | P2 | 3-4 jam |
| 7 | `/data` (Module Landing: Data Catalog) | P2 | 4-6 jam |
| 8 | 404 / Not Found page | All | 1-2 jam |

**Total estimasi P0:** 30-45 jam developer time (sekitar 1 minggu kerja).

### Prioritas P1 (Penting untuk Validasi)

| # | Screen | Persona | Estimasi Build |
|---|--------|---------|----------------|
| 9 | `/sdss` (Module Landing: Decision Support) dengan workflow diagram | P2 | 4-6 jam |
| 10 | `/sectoral` (Module Landing: Sectoral) dengan filter sektor | P2 | 3-4 jam |
| 11 | `/collab` (Module Landing: Collaboration) | P2 | 2-3 jam |
| 12 | `/ai` (Module Landing: AI Assistant) | P2 | 3-4 jam |
| 13 | `/settings` (Settings — tabbed layout) | All | 3-4 jam |
| 14 | `/map` (Map Explorer placeholder) | All | 2-3 jam |
| 15 | Notifications dropdown | All | 2-3 jam |
| 16 | Empty state demo (1 fitur kosong, e.g., Activity Feed kosong) | All | 1-2 jam |
| 17 | Loading state demo (skeleton di KPI) | All | 1-2 jam |
| 18 | Error state demo (Risk Map gagal load) | All | 1-2 jam |

**Total estimasi P1:** 22-33 jam.

### Prioritas P2 (Nice-to-have)

| # | Screen | Persona | Estimasi Build |
|---|--------|---------|----------------|
| 19 | Persona Switcher (untuk demo varian P1-P5) | All | 4-6 jam |
| 20 | `/dashboard` (varian P1 Executive) | P1 | 3-4 jam |
| 21 | `/dashboard` (varian P5 Public landing) | P5 | 4-6 jam |
| 22 | Crisis Mode banner + override Quick Actions | All | 2-3 jam |
| 23 | Mobile responsive demo (Halaman utama di < 768px) | All | 4-6 jam |
| 24 | Onboarding tour (1-3 step) | All | 3-4 jam |
| 25 | Detail card popover saat klik KPI | All | 2-3 jam |
| 26 | Activity item detail panel | All | 2-3 jam |

**Total estimasi P2:** 24-35 jam.

### Total estimasi keseluruhan MVP Prototype

| Tier | Screens | Effort (jam) | Effort (minggu, 1 dev FT) |
|------|---------|---------------|----------------------------|
| P0 | 8 | 30-45 | 1 minggu |
| P1 | 10 | 22-33 | 0.5-1 minggu |
| P2 | 8 | 24-35 | 0.5-1 minggu |
| **Total** | **26 screens** | **76-113 jam** | **2-3 minggu** |

Untuk Claude/AI-assisted development, effort bisa lebih cepat (faktor 0.3-0.5x) tergantung kompleksitas styling dan iterasi visual.

## 15.6 Mock Data Strategy

Prototype TIDAK boleh menggunakan empty placeholder data ("Lorem ipsum") — harus menggunakan **data semi-realistic yang relevan dengan konteks Indonesia & climate action**.

### Mock Data yang Harus Disiapkan

| Kategori | Jumlah Mock Records | Sumber Inspirasi |
|----------|---------------------|-------------------|
| Provinces (Sulsel, Bali, Jateng, dll.) | 18 | TOR Annex 6 prioritas provinsi |
| User profiles (Ahmad, Budi, Rina, dll.) | 8-10 | Persona generic Indonesian names |
| Scenarios | 12 | "RDTR Wajo 2030", "Sulsel Adaptation Plan", dll. |
| Layers | 20 | Banjir, SLR, LULC, Karhutla, Curah Hujan, Population |
| KPI snapshots per province | 4 × 18 = 72 entries | Active provinces, alerts, models, scenarios |
| Activity feed items | 15-20 | Comments, alerts, reports published |
| Risk alerts | 5-7 | Banjir Wajo, Karhutla Aceh, SLR Demak, dll. |
| AI conversation logs (sample) | 5-8 messages | Pre-canned untuk demo |
| Notifications | 10 | Mix dari mentions, alerts, system |

Format & schema lengkap untuk mock data tersedia di **Lampiran F**.

### Strategi Mock Data Refresh

- **Realtime simulation**: KPI berubah setiap 30 detik (random ±10%) untuk demo "live" feel
- **Time-based**: Activity feed item ditambah tiap 1 menit (dari pool predefined)
- **User-triggered**: Saat ganti province, KPI re-fetch dari mock (delay 300ms artificial untuk demo loading state)

## 15.7 Demo Script (Stakeholder Walkthrough)

Saat presentasi prototype ke stakeholder pertama kali (BIG, BMKG, BNPB, dll.), gunakan script berikut. Total durasi: **8-12 menit**.

### Babak 1 — Konteks & Login (1 menit)

1. **Buka halaman** — tunjukkan `/dashboard` langsung (skip login screen di demo).
2. **Narasi**: "Setelah login sebagai Budi (Planner di Bappeda Sulsel), inilah halaman pertama yang dilihat."
3. **Highlight Persona Awareness**: "Tampilan ini berbeda untuk Direktur (Executive view), Peneliti (Researcher view), dll. — kita akan tunjukkan di akhir."

### Babak 2 — Halaman Utama Tour (3 menit)

1. **Zona Top Bar** — tunjukkan search (jangan klik dulu), AI button, notification badge, language toggle.
2. **Zona Context Bar** — tunjukkan: "Konteks aktif adalah Sulawesi Selatan, periode 2025-2050, skenario SSP2-4.5. Konteks ini mempengaruhi semua data di bawahnya."
3. **Klik Province dropdown** → ganti ke "Bali" → tunjukkan **KPI ber-update** dengan smooth transition.
4. **Zona KPI Cards** — jelaskan 4 KPI utama dan trend indicator (panah ↑/↓).
5. **Zona Risk Map inline** — tunjukkan: "Mini peta risiko area aktif. Klik untuk buka peta penuh." (klik tombol → halaman map).
6. **Kembali ke dashboard** → **Activity Feed** — tunjukkan event terkini, contoh: "Risk Alert: Banjir Wajo".
7. **Module Grid** — tunjukkan: "Akses ke 10 modul utama. Klik untuk masuk."

### Babak 3 — AI Assistant Live (2 menit)

1. **Klik tombol floating AI** atau tekan `⌘+I` → AI panel terbuka di kanan.
2. **Type query**: "Lokasi banjir Sulsel terburuk 2050?"
3. **Tunjukkan AI response** dengan streaming animation + citation links.
4. **Highlight Konteks Awareness**: "AI menerima konteks Sulsel + 2025-2050 + SSP2-4.5 secara otomatis. Tidak perlu re-state."
5. **Klik [Pin to Project]** → tunjukkan AI insight tersimpan di halaman.

### Babak 4 — Navigasi ke Modul (2 menit)

1. **Klik Module Grid → Climate Modeling** → masuk ke module landing page.
2. **Tunjukkan**: hero feature, daftar 6 fitur dalam grid, sub-section Validation (Hindcasting).
3. **Klik Vulnerability Assessment** → tunjukkan layout dengan 2 fitur dan bar chart top 10 kab/kota.
4. **Klik Reports** → tunjukkan 4 fitur dan recent reports list.

### Babak 5 — Persona Switching (1-2 menit)

1. **Klik Persona Switcher** di settings (jika P2 sudah selesai dan ada bonus).
2. **Switch ke P1 Executive** → tunjukkan: KPI berubah (Risk Index Nasional, Action Items, dll.), sidebar lebih ringkas (5 modul saja), Quick Actions berubah ke "Briefing Hari Ini".
3. **Switch ke P5 Public** → tunjukkan landing page edukatif (story map style).
4. **Narasi**: "Platform menyesuaikan diri dengan role pengguna otomatis berdasarkan JWT token."

### Babak 6 — Crisis Mode Demo (Opsional, 1 menit)

1. **Toggle Crisis Mode** dari settings/admin (atau tombol demo).
2. **Tunjukkan**: top bar berubah warna kuning, banner muncul, Quick Actions di-override.
3. **Narasi**: "Saat anomali terdeteksi via FITUR 6.2 EWS, platform otomatis switch ke Crisis Mode untuk membantu response cepat."

### Babak 7 — Q&A & Roadmap (1-2 menit)

1. **Tunjukkan dokumen Rancangan Halaman Utama v1.1** (PDF) sebagai reference.
2. **Diskusi**: apa yang feel/fungsi-nya benar? Apa yang harus dikoreksi?
3. **Next steps**: validasi konsep → high-fidelity Figma → component library di Storybook → integrasi backend.

## 15.8 Anti-Pattern yang Harus Dihindari Saat Membuat Prototype

Selama tahap prototype, anti-pattern berikut sering muncul dan harus aktif dihindari:

| Anti-Pattern | Mengapa Buruk | Apa yang Harus Dilakukan |
|--------------|----------------|---------------------------|
| **Build everything before showing** | Stakeholder menunggu 3 bulan lihat sesuatu yang ternyata salah arah | Tampilkan setiap minggu, dapatkan feedback awal |
| **Over-fidelity di L1/L2** | Diskusi terjebak di "warna tombol" alih-alih "apa fitur ini" | Gunakan grayscale di L1; warna mulai di L2 |
| **Mock data unrealistic** | Stakeholder tidak bisa imagine penggunaan real | Gunakan nama, angka, lokasi Indonesia yang familiar |
| **Lupa empty/loading/error state** | Saat demo data kosong, prototype "rusak" | Sediakan 3 state ini sejak L2 |
| **Hard-code semua data inline** | Sulit di-refactor saat backend siap | Pisahkan mock data ke `data/mock.json` |
| **Skip persona variations** | Stakeholder bingung "untuk siapa platform ini?" | Tunjukkan minimal 2 persona variants di demo |
| **Map tanpa konteks Indonesia** | Demo terasa generic, tidak relevan | Pakai data semi-realistic Sulsel/Bali/Jateng |
| **AI Assistant yang "tahu segalanya"** | Tidak realistic, raise expectation salah | Tunjukkan AI menolak ("Saya tidak punya data ini") sesekali |
| **Bypass keyboard accessibility di prototype** | Aksesibilitas mahal untuk di-retrofit | Pakai semantic HTML + ARIA sejak awal |
| **Build prototype di tech stack berbeda dari production** | Effort terbuang saat handover | Pakai stack yang dekat dengan production (React + Tailwind) |

---


# BAGIAN 16 — COMPONENT ANATOMY DETAIL *(Baru di v1.1)*

Bagian ini menyediakan **anatomy detail** untuk komponen-komponen kritis yang akan dibangun di prototype. Setiap komponen disertai:

1. ASCII anatomy diagram dengan annotation
2. Dimensi pixel exact
3. TypeScript-style props interface
4. States (default, hover, active, disabled, loading, error)
5. Behavior notes

Komponen lain yang sederhana (button, input, badge) sudah cukup didefinisikan di §9.1 dan tidak perlu di-detail di sini.

## 16.1 KPI Card — Anatomy Detail

### Anatomy

```
┌────────────────────────────────┐  ◀── border: 1px solid gray-200
│                                 │      border-radius: 8px
│  Provinsi Aktif        [ⓘ]    │  ◀── label (text-sm gray-600)
│  ─── ◀── divider 8px gap       │      + info icon (16×16)
│                                 │
│         18 / 18                 │  ◀── value (text-4xl font-bold gray-900)
│                                 │      center-aligned
│                                 │
│  ↑ 0   vs Q1 2026               │  ◀── trend indicator (text-sm)
│                                 │      + comparison label
│                                 │
│  ╶── stable ───                 │  ◀── trend visualization (mini bar/sparkline, 80×16)
│                                 │
│  [→ Lihat detail]               │  ◀── CTA link (text-sm primary-600)
│                                 │
└────────────────────────────────┘
   ◀──── 220px ────▶
        140px tinggi (fixed)
        24px padding all sides
        background: white
        shadow: shadow-sm
```

### TypeScript Interface

```typescript
interface KPICardProps {
  // Required
  label: string;                    // "Provinsi Aktif"
  value: string | number;           // 18 atau "18/18"

  // Optional
  unit?: string;                    // "%" atau "kab"
  trend?: {
    direction: 'up' | 'down' | 'stable';
    delta: number;                  // angka absolute (3) atau persen (15)
    comparisonLabel: string;        // "vs Q1 2026"
  };
  semanticColor?: 'positive' | 'negative' | 'neutral' | 'warning' | 'danger';
  sparklineData?: number[];         // untuk mini visualization
  ctaLabel?: string;                // "Lihat detail"
  ctaHref?: string;                 // "/dashboard/provinces"
  tooltipText?: string;             // shown on info icon hover

  // States
  loading?: boolean;
  error?: string;
  onClick?: () => void;
}
```

### States

| State | Visual |
|-------|--------|
| Default | Background white, border gray-200, shadow-sm |
| Hover | Border primary-300, shadow-md, cursor pointer |
| Loading | Skeleton bar di tempat value, label visible |
| Error | Border danger-300, value diganti ⚠ icon + error message |
| Trend Positive | Trend arrow + delta dalam warna success-700 |
| Trend Negative | Trend arrow + delta dalam warna danger-700 |
| Trend Stable | Trend arrow ╶─ horizontal dalam warna gray-500 |

### Behaviour

- Auto-refresh: setiap 30 detik via setInterval (di prototype) atau via WebSocket (di production)
- Click → navigasi ke detail page (jika ctaHref) atau buka modal (jika onClick handler)
- Hover info icon → tooltip dengan deskripsi metric formula

## 16.2 Module Tile — Anatomy Detail

### Anatomy

```
┌──────────────────┐  ◀── 160×160px (fixed square)
│                  │      border: 1px solid gray-200
│      🌡          │  ◀── icon 48×48px (centered horizontal)
│                  │      color: primary-600
│   Climate        │
│   Modeling       │  ◀── title (text-base font-semibold gray-900)
│                  │      max 2 lines, center-aligned
│   8 fitur        │  ◀── meta (text-xs gray-500)
│                  │
│                  │
└──────────────────┘
   24px padding all sides
   background: white
   border-radius: 12px
   shadow: shadow-sm
```

### TypeScript Interface

```typescript
interface ModuleTileProps {
  id: string;                       // 'climate-modeling'
  icon: ReactNode;                  // <ThermometerIcon />
  title: string;                    // "Climate Modeling"
  featureCount: number;             // 8
  href: string;                     // "/modeling"

  // Optional
  isFavorite?: boolean;             // ★ Favorite badge
  isNew?: boolean;                  // "NEW" badge
  isRestricted?: boolean;           // 🔒 grey-out
  badgeText?: string;               // custom badge "Beta", "Coming Soon"

  // States
  variant?: 'default' | 'compact' | 'expanded';
  onClick?: () => void;
}
```

### States

| State | Visual |
|-------|--------|
| Default | White bg, border gray-200, shadow-sm |
| Hover | Border primary-400, shadow-md, transform: translateY(-2px), cursor pointer |
| Active (klik) | transform: translateY(0px), shadow-sm |
| Favorite | Border thicker (2px primary-500) + ★ icon di pojok kanan atas |
| New | Badge "NEW" merah di pojok kanan atas |
| Restricted | opacity 0.5, cursor not-allowed, 🔒 icon overlay |

### Behaviour

- Hover tile → tooltip muncul setelah 500ms dengan tagline + top 3 fitur paling sering dipakai oleh persona aktif
- Click → navigate ke `href` (module landing page)
- Keyboard: focus dengan outline ring, Enter untuk activate

## 16.3 Activity Feed Item — Anatomy Detail

### Anatomy

```
┌────────────────────────────────────────────────────┐
│  ┌─────┐                                            │
│  │ ⚠  │  Risk Alert: Banjir Wajo                   │ ◀── icon 40×40 circle bg-{type}-50
│  │     │  Risiko 1.8m projected next 48h           │     title (text-sm font-medium)
│  └─────┘  ──────────────────────                    │     subtitle (text-sm gray-600)
│           🕐 2 jam lalu • Budi P. (Bappeda)        │ ◀── meta (text-xs gray-500)
│                                                      │
│           [Lihat detail]  [Tutup]                   │ ◀── action buttons (text-xs primary-600)
│                                                      │
└────────────────────────────────────────────────────┘
                                  ◀── full width
                                  16px padding vertical
                                  20px padding horizontal
                                  border-bottom: 1px solid gray-100
```

### TypeScript Interface

```typescript
type ActivityItemType =
  | 'risk-alert'      // ⚠ red icon
  | 'comment'         // 📝 blue icon
  | 'report'          // 📄 purple icon
  | 'scenario'        // 🎯 green icon
  | 'ai-insight'      // 🤖 indigo icon
  | 'consultation'    // 👥 cyan icon
  | 'dashboard'       // 📊 yellow icon
  | 'system'          // 🔧 gray icon
  | 'data-upload';    // 📥 teal icon

interface ActivityItemProps {
  id: string;
  type: ActivityItemType;
  title: string;                    // "Risk Alert: Banjir Wajo"
  subtitle?: string;                // "Risiko 1.8m projected next 48h"
  timestamp: Date;                  // ISO date untuk format "2 jam lalu"
  actor: {
    name: string;                   // "Budi P."
    organization?: string;          // "Bappeda Sulsel"
    avatarUrl?: string;
  };
  actions?: Array<{
    label: string;                  // "Lihat detail"
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  }>;
  isRead?: boolean;                 // unread → bold title + dot indicator
  onMarkAsRead?: () => void;
}
```

### Behaviour

- Auto-format timestamp: < 1 min → "baru saja", < 1 hr → "X menit lalu", < 24 hr → "X jam lalu", > 24 hr → "X hari lalu"
- Click anywhere di item (kecuali action button) → mark as read + navigate ke source
- Hover → background gray-50

## 16.4 Top Bar — Anatomy Detail

### Anatomy

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│ ┃ [☰]  [Logo+Text]  │ [🔍 Cari layer, scenario, ...] │     [🤖] [🔔3] [🌐 ID] [👤] │
│ ┃                    │                                  │                                │
│ ┃ 24×24  104×24      │       600px (max-w)             │  40×40 each, 8px gap between │
│ ┃        icon+text   │       12px padding              │                                │
│ ┃                    │                                  │                                │
└──────────────────────────────────────────────────────────────────────────────────────┘
  ◀── 56px height
  background: white
  border-bottom: 1px solid gray-200
  position: sticky, top: 0
  z-index: 50
  padding: 0 24px
```

### Komponen Detail

| Komponen | Width | Behavior |
|----------|-------|----------|
| Hamburger button | 40×40 | Toggle sidebar collapse/expand |
| Logo + text | 104×24 | Klik → navigate ke /dashboard |
| Search input | 600px max | Klik atau ⌘K → open Search Modal |
| AI button | 40×40 | Klik atau ⌘I → open AI Drawer |
| Notifications | 40×40 | Badge dengan count merah; klik → dropdown |
| Language toggle | 40×40 | Klik → toggle ID ↔ EN tanpa reload |
| User menu | 40×40 + avatar | Klik → dropdown profile/settings/logout |

### TypeScript Interface

```typescript
interface TopBarProps {
  user: {
    name: string;
    role: PersonaType;              // 'P1' | 'P2' | ...
    avatarUrl?: string;
    organization: string;
  };
  notificationCount: number;
  language: 'id' | 'en';
  isCrisisMode?: boolean;
  isGeoVertixOffline?: boolean;

  // Handlers
  onSidebarToggle: () => void;
  onSearchOpen: () => void;
  onAIOpen: () => void;
  onNotificationsOpen: () => void;
  onLanguageToggle: () => void;
  onUserMenuOpen: () => void;
}
```

### State Variations

| State | Visual Change |
|-------|---------------|
| Crisis Mode | Background gradient kuning → merah; banner appears below |
| GeoVertix Offline | Small indicator "● GeoVertix Offline (Cache Mode)" di samping logo |
| Maintenance | Sticky banner di bawah top bar |
| Mobile | Search collapse ke icon; Context Bar hide; Language toggle hide |

## 16.5 Context Bar — Anatomy Detail

### Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  [🌍 Sulawesi Selatan ▾]  [📅 2025–2050 ▾]  [🎯 SSP2-4.5 ▾]          │
│   200px max               160px max          140px max                │
│                                                                         │
│   Pin: [Makassar ×] [Palopo ×] [+ Pin]   |   ❌ Reset semua            │
│                                                                         │
└──────────────────────────────────────────────────────────────────────┘
   ◀── 56px height (1 line) atau 80px (dengan pins)
   background: gray-50
   border-bottom: 1px solid gray-200
   padding: 12px 24px
   position: sticky, top: 56px (di bawah top bar)
   z-index: 40
```

### TypeScript Interface

```typescript
interface ContextBarProps {
  province: {
    id: string;                     // 'sulsel'
    name: string;                   // 'Sulawesi Selatan'
    bbox?: [number, number, number, number];
  };
  timePeriod: {
    from: string;                   // '2025' atau '2025-01-01'
    to: string;                     // '2050' atau '2050-12-31'
  };
  scenario: {
    id: string;                     // 'ssp2-45'
    name: string;                   // 'SSP2-4.5 (Moderate)'
  };
  pinnedLocations?: Array<{
    id: string;
    name: string;
  }>;

  onProvinceChange: (newProvince) => void;
  onTimePeriodChange: (newPeriod) => void;
  onScenarioChange: (newScenario) => void;
  onPinAdd: () => void;
  onPinRemove: (id: string) => void;
  onResetAll: () => void;
}
```

### Behaviour Saat Context Berubah

Implementasi Prinsip 2.2 (Persona-Aware) — saat user mengubah province di Context Bar, **cascade re-render** ke seluruh halaman:

```
User klik [🌍 Sulsel ▾]
    ↓
Dropdown muncul (showing list of 18 provinces)
    ↓
User pilih "Bali"
    ↓
1. URL update: ?province=bali (push to history)
2. State update di global store (Zustand/Context)
3. Trigger re-fetch:
   - KPI Cards → loading skeleton 300ms → updated values
   - Risk Map → re-center to Bali + reload layers
   - Activity Feed → filter to events in Bali
   - Module Grid → no change (modul tidak province-specific)
4. Toast appear: "Konteks berubah ke Bali"
5. Persist preference ke localStorage
```

Detail interaction lihat **Lampiran H — Interaction Specifications §H.1**.

## 16.6 AI Assistant Panel — Anatomy Detail

### Anatomy (Drawer Open, Desktop)

```
                           ┌───────────────────────────────────────┐
                           │  🤖 Tanya AI                  [X]    │ ◀── header (56px)
                           │                                        │
                           │  Konteks: Sulsel, Vulnerability MCDA  │ ◀── context strip
                           │  Layer: Banjir, SLR, Population       │     (40px, bg-primary-50)
                           ├───────────────────────────────────────┤
                           │                                        │
                           │  [AI Avatar] Halo Ahmad! Saya bisa    │ ◀── message bubble (AI)
                           │              bantu apa? Contoh:        │     bg-gray-50, rounded
                           │              • Lokasi banjir terburuk? │
                           │              • Bandingkan skenario?    │
                           │                                        │
                           │                Anda: Lokasi banjir [▮] │ ◀── message bubble (user)
                           │                       Sulsel 2050?    │     bg-primary-50,
                           │                                        │     align-right
                           │  [AI Avatar] Berdasarkan model        │
                           │              SSP2-4.5, lokasi dengan  │
                           │              risiko banjir tertinggi:  │
                           │              1. Pesisir Makassar      │
                           │              2. Wajo                   │
                           │              [🗺 Lihat di Peta]       │
                           │                                        │
                           ├───────────────────────────────────────┤
                           │  [ Ketik pertanyaan...    ] [🎤] [➤] │ ◀── input area (64px)
                           ├───────────────────────────────────────┤
                           │  💾 Pin  📤 Bagi  ⚙ Settings         │ ◀── footer actions (40px)
                           └───────────────────────────────────────┘
                            ◀── 400px width (sm: 100vw)
                            full height (100vh)
                            background: white
                            border-left: 1px solid gray-200
                            shadow: shadow-2xl
                            slide-in dari kanan (250ms ease-out)
```

### TypeScript Interface

```typescript
interface AIPanelProps {
  isOpen: boolean;
  conversation: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string | ReactNode;    // text atau structured response with citations
    timestamp: Date;
    citations?: Array<{
      label: string;
      url: string;
    }>;
    actions?: Array<{
      label: string;                // "Lihat di Peta"
      onClick: () => void;
    }>;
  }>;
  contextAwareness: {
    province?: string;
    layer?: string[];
    page?: string;
  };
  isStreaming?: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
  onPin: (messageId: string) => void;
  onShare: (messageId: string) => void;
  onSettings: () => void;
}
```

### Behaviour

- Slide-in dari kanan dengan animasi 250ms ease-out
- Main content TIDAK ter-block (panel overlay di sebelah kanan)
- User dapat scroll halaman utama sambil baca AI response
- Streaming token-by-token untuk respons AI (typewriter effect)
- Auto-scroll ke bawah saat respons baru muncul
- Konteks di header strip berubah dinamis sesuai halaman saat ini
- Shortcut: Esc untuk tutup, ⌘+I untuk toggle

## 16.7 Map Widget (Reusable) — Props & Behavior

### TypeScript Interface

```typescript
interface MapWidgetProps {
  // Initial state
  initialExtent: [number, number, number, number];  // [minLng, minLat, maxLng, maxLat]
  initialZoom?: number;
  initialCenter?: [number, number];

  // Layers
  layers: Array<{
    id: string;
    name: string;
    type: 'tile' | 'vector' | 'raster' | 'wms';
    url: string;                    // tile URL atau WMS endpoint
    visible: boolean;
    opacity?: number;               // 0-1
    style?: object;                 // Maplibre style spec
  }>;

  // Controls
  controls?: Array<
    'zoom' | 'pan' | 'layers' | 'legend' |
    'scale' | 'measure' | 'draw' | 'fullscreen' | 'export'
  >;

  // Interactions
  onClick?: (feature: GeoJSONFeature, latlng: [number, number]) => void;
  onLayerToggle?: (layerId: string, visible: boolean) => void;
  onExtentChange?: (newExtent: [number, number, number, number]) => void;

  // Style
  width?: string | number;
  height?: string | number;
  isInteractive?: boolean;          // false = static image fallback

  // Performance
  lazyLoad?: boolean;               // load saat scroll into view
  fallbackImageUrl?: string;        // jika map gagal load
}
```

### Implementasi di Prototype

Karena Claude Artifacts tidak mendukung map library penuh (Leaflet/MapLibre), gunakan **pattern fallback**:

1. **Lapis 1 — Placeholder image:** Static SVG atau PNG map of Indonesia/Sulsel dengan overlay risk colors.
2. **Lapis 2 — Mock interactivity:** Clickable area dengan tooltip popup, pakai `<area>` HTML map atau SVG `<polygon>` dengan onclick.
3. **Lapis 3 (production):** Replace dengan MapLibre GL JS.

Contoh wireframe placeholder map untuk prototype:

```
┌──────────────────────────────────┐
│   [Sulawesi Selatan SVG map]      │
│                                    │
│   - 24 kab/kota sebagai SVG paths │
│   - Color graded by risk score    │
│   - Klik path → tooltip popup     │
│                                    │
│   Legend: 🟢🟡🟠🔴               │
└──────────────────────────────────┘
```

## 16.8 Quick Actions Bar — Anatomy Detail

### Anatomy

```
┌────────────────────────────────────────────────────────────────────────┐
│  ⚡ Aksi Cepat:  [➕ Skenario Baru] [🔍 Cari Layer] [📊 Buat Report]   │
│                                                                          │
│                  Each button: 160-180px width, 40px height              │
│                  Gap antar button: 12px                                  │
│                  Active button: primary-600 bg, white text              │
│                  Inactive: white bg, gray-700 text, gray-200 border    │
└────────────────────────────────────────────────────────────────────────┘
   48px height total
   background: white (atau transparent saat dalam dashboard)
   padding: 8px 24px
```

### TypeScript Interface

```typescript
interface QuickActionsBarProps {
  persona: PersonaType;             // determines which actions to show
  isCrisisMode?: boolean;           // override actions to crisis-specific

  // Action definitions (configurable per persona)
  actions: Array<{
    id: string;
    icon: ReactNode;
    label: string;                  // "Skenario Baru"
    variant: 'primary' | 'secondary' | 'crisis';
    onClick: () => void;
    disabled?: boolean;
    badge?: string | number;        // "3" atau "Beta"
  }>;
}
```

### Persona Defaults

| Persona | Action 1 | Action 2 | Action 3 | Action 4 |
|---------|----------|----------|----------|----------|
| P1 Exec | 📋 Briefing Hari Ini | 🔄 Bandingkan Skenario | 📈 Lihat Trend | — |
| P2 Planner | ➕ Skenario Baru | 🔍 Cari Layer | 📊 Buat Report | 🤖 Tanya AI |
| P3 Researcher | 📂 Lanjut Project | 🧪 Hindcast Baru | 📥 Download Data | 🔬 API Docs |
| P4 Private | 🏗 Site Selection | 📊 Risk Report | 💼 Project Baru | — |
| P5 Public | 🗺 Peta Banjir | 📰 Cerita Terbaru | 🔔 Subscribe Alert | — |
| Crisis Mode (semua) | 🚨 Peta Real-Time | 📞 Hubungi BNPB | 📋 Laporan Krisis | 🔔 Kirim Alert |

---

# LAMPIRAN

## Lampiran A — Glossary UI/UX

| Term | Definition |
|------|------------|
| Atomic Design | Methodology by Brad Frost: atoms → molecules → organisms → templates → pages |
| Breadcrumb | Navigasi sekunder yang menunjukkan path hierarki halaman |
| Context Bar | Baris di top yang menampilkan state global (province, time, scenario) |
| Empty State | Tampilan saat tidak ada data untuk display |
| Information Architecture (IA) | Struktur navigasi dan organisasi content platform |
| Module | Pengelompokan fitur level 1 (10 di platform ini) |
| Persona | Representasi user type (P1-P5 di dokumen ini) |
| Progressive Disclosure | Pola UX: tampilkan ringkasan dulu, detail on-demand |
| PWA | Progressive Web App — web app yang berfungsi seperti native app |
| Quick Actions | Tombol-tombol cepat di hero area untuk top 3-4 aksi |
| Sitemap | Pohon navigasi lengkap platform |
| Skeleton | Placeholder content saat loading (shimmer animation) |
| Toast | Notifikasi pop-up sementara di corner |
| Wireframe | Sketsa low-fidelity UI tanpa detail visual |
| WCAG | Web Content Accessibility Guidelines (standar internasional) |

## Lampiran B — Cross-Reference 62 Fitur ke Halaman/Modul

| Fitur Code | Nama Fitur | Modul Home | URL Path | Section di Dokumen Ini |
|------------|-----------|------------|----------|------------------------|
| 2.1 | Advanced Climate Modeling | Climate Modeling | /modeling/climate-advanced | §7.2 |
| 2.2 | LULC Change Detection | Climate Modeling | /modeling/lulc-change | §7.2 |
| 2.3 | Net Carbon Footprint | Climate Modeling | /modeling/carbon | §7.2 |
| 2.4 | Biodiversity Mapping | Climate Modeling | /modeling/biodiversity | §7.2 |
| 2.5 | SLR & Land Subsidence | Climate Modeling | /modeling/slr | §7.2 |
| 2.6 | Flood & Drought Modeling | Climate Modeling | /modeling/flood-drought | §7.2 |
| 3.1 | Multi-Criteria Vulnerability | Vulnerability | /vulnerability/mcda | §7.3 |
| 3.2 | Dynamic Vulnerability System | Vulnerability | /vulnerability/dynamic | §7.3 |
| 4.1 | RDTR Toolbox | Sectoral | /sectoral/rdtr | §7.4 |
| 4.2 | Food Security (Rice) | Sectoral | /sectoral/food-security | §7.4 |
| 4.3 | Coastal Vulnerability | Sectoral | /sectoral/coastal | §7.4 |
| 4.4 | Forest Fire Risk | Sectoral | /sectoral/fire | §7.4 |
| 4.5 | Tourism Vulnerability | Sectoral | /sectoral/tourism | §7.4 |
| 4.6 | Renewable Energy Optimization | Sectoral | /sectoral/renewable | §7.4 |
| 4.7 | Land Carrying Capacity | Sectoral | /sectoral/carrying-capacity | §7.4 |
| 5.1 | Multi-Level Decision Support | SDSS | /sdss | §7.5 |
| 5.2 | Scenario Manager | SDSS | /sdss/scenarios | §7.5 |
| 5.3 | Impact Analysis Engine | SDSS | /sdss/impact | §7.5 |
| 5.4 | Adaptation Recommendation | SDSS | /sdss/adaptation | §7.5 |
| 5.5 | MCDA Engine | SDSS | /sdss/mcda | §7.5 |
| 5.6 | Context-Aware Recommendation | SDSS | /sdss/recommendations | §7.5 |
| 5.7 | Group Decision-Making | SDSS | /sdss/group | §7.5 |
| 5.8 | What-If Simulation | SDSS | /sdss/what-if | §7.5 |
| 5.9 | Sensitivity Analyzer | SDSS | /sdss/sensitivity | §7.5 |
| 5.10 | Optimization Solver | SDSS | /sdss/optimization | §7.5 |
| 6.1 | Image & Pattern Recognition | AI Assistant | /ai/image-recognition | §7.6 |
| 6.2 | Anomaly Detection & EWS | AI Assistant | /ai/anomaly | §7.6 |
| 6.3 | Predictive Modeling Framework | AI Assistant | /ai/predictive | §7.6 |
| 6.4 | Scenario-Based Analysis Engine | AI Assistant | /ai/scenarios | §7.6 |
| 6.5 | Natural Language Query | AI Assistant | /ai (floating + page) | §5.6, §7.6 |
| 6.6 | RAG Pipeline & Knowledge Base | AI Assistant | /ai/rag (admin) | §7.6 |
| 6.7 | MCP Server | AI Assistant | /ai/mcp (admin) | §7.6 |
| 6.8 | Federated Learning | AI Assistant | /ai/federated (admin) | §7.6 |
| 6.9 | Explainable AI (XAI) | AI Assistant + sub-tab di output | /ai/xai | §7.6 |
| 7.1 | Stakeholder Consultation Workflow | Collaboration | /collab/consultation | §7.7 |
| 7.2 | Annotation & Comment System | Collaboration (lintas-fitur) | inline + /collab/comments | §7.7 |
| 7.3 | Scenario Comparison Tool | Collaboration | /collab/compare | §7.7 |
| 8.1 | Interactive Map (Advanced) | Map Explorer | /map | §5.6, §7.8 |
| 8.2 | Dynamic Dashboards | Reports | /reports/dashboards | §7.8 |
| 8.3 | Executive Summary Auto-Gen | Reports | /reports/exec-summary | §7.8 |
| 8.4 | Custom Report Builder | Reports | /reports/custom | §7.8 |
| 9.1 | Auth & Authorization | Settings/Admin | /settings/auth | §7.9 |
| 9.2 | Notification System | Top Bar 🔔 + Settings | inline + /settings/notif | §5.1, §7.9 |
| 9.3 | Audit Logger | Settings/Admin | /settings/audit | §7.9 |
| 9.4 | i18n ID/EN | Top Bar 🌐 + Settings | inline + /settings/lang | §5.1, §7.9 |
| 9.5 | Onboarding / Tutorial | Settings + auto first-login | /settings/help, /onboarding | §7.9, §8.1 |
| 9.6 | API & OGC Services | Settings/Developer | /settings/api | §7.9 |
| 10.1 | Data Catalog ISO 19115 | Data Catalog | /data | §7.10 |
| 10.2 | Data Lineage | Data Catalog | /data/lineage | §7.10 |
| 10.3 | Data Quality Dashboard | Data Catalog | /data/quality | §7.10 |
| 10.4 | Stream Processor | Data Catalog (admin) | /data/streams | §7.10 |
| 10.5 | Data Versioning | Data Catalog | /data/versions | §7.10 |
| 11.1 | Hindcasting Tool | Climate Modeling (sub) | /modeling/hindcast | §7.2 |
| 11.2 | Continuous Model Monitor | Climate Modeling (sub) | /modeling/monitor | §7.2 |
| 12.1 | Edge Computing | Infrastructure (transparent) | (background) | §7.12 |
| 12.2 | Mobile PWA | Cross-cutting | (all pages mobile) | §11 |
| 12.3 | Model Compression | Settings → Mobile | /settings/mobile | §7.12 |
| 13.1 | One Map Policy (BIG) | Data Catalog (External) | /data/external/one-map | §7.10 |
| 13.2 | BNPB InaRISK/InaSAFE | Data Catalog (External) | /data/external/bnpb | §7.10 |
| 13.3 | BMKG Climate Service | Data Catalog (External) | /data/external/bmkg | §7.10 |
| 13.4 | KLHK SIGN-SMART | Data Catalog (External) | /data/external/klhk | §7.10 |
| 13.5 | BPS Socio-economic Data | Data Catalog (External) | /data/external/bps | §7.10 |

**Total: 62 fitur** — semua memiliki home dan path di dokumen ini.

## Lampiran C — Cross-Reference FR-UI/FR-SDSS dari PRD ke Section Dokumen Ini

| PRD Requirement | Cara Dipenuhi di Dokumen Ini |
|------------------|--------------------------------|
| FR-UI-01 (Web Application) | §6.2 desktop wireframe |
| FR-UI-02 (Web Mobile) | §11 Mobile & PWA |
| FR-UI-03 (Responsive Design) | §11.1 Breakpoint Strategy |
| FR-UI-04 (Multilingual ID/EN) | §2.8 Prinsip + §12.5 Toggle Mechanics |
| FR-UI-05 (Tutorials & Guides) | §8.1 First-Time Onboarding |
| FR-UI-06 (Role-based dashboards) | §3 Personas + §6.11 Varian per Persona |
| FR-SDSS-10 (User-friendly interface) | §2.3 Progressive Disclosure + §6 Halaman Utama |
| FR-SDSS-11 (Comprehensive guides) | §8.1 Onboarding + Settings → Help |
| FR-SDSS-15 (Interactive iterative) | §8.2 Daily Planner + §7.5 SDSS workflow |
| FR-SDSS-16 (Dynamic visualizations) | §9.5 Spatial Components + §13 Visual Design |
| FR-SDSS-18 (Group decision) | §8.6 Group Decision-Making Flow + §7.7 Collaboration |
| FR-SDSS-21 (Customized interfaces governance level) | §3 Personas P1-P5 |
| FR-SDSS-22 (Role-specific dashboards) | §6.11 Varian per Persona |
| FR-GVX-01..10 (GeoVertix integration) | §2.7 GeoVertix-Transparent + §7.x integration di setiap modul |
| NFR-USAB (Usability & accessibility) | §12 Aksesibilitas & i18n |
| NFR-PERF (Performance) | §14.2 Performance Budget |
| NFR-AVAIL (Availability) | §10 State Management (degraded states) + §11.4 Offline |

## Lampiran D — Quick Sketch Index

Daftar semua wireframe ASCII di dokumen ini:

| Section | Wireframe |
|---------|-----------|
| §5.1 | Top Bar (desktop + mobile) |
| §5.2 | Sidebar (expanded + collapsed + persona-aware) |
| §5.3 | Context Bar |
| §5.4 | Quick Actions Bar |
| §5.5 | Global Search Modal |
| §5.6 | AI Assistant Launcher + Panel |
| §5.8 | Bottom Status Bar |
| §6.2 | **Halaman Utama lengkap (Desktop ~1440px)** |
| §6.5 | KPI Card detail |
| §6.6 | Risk Map Inline |
| §6.7 | Activity Feed |
| §6.9 | Module Grid Tile |
| §6.11 | Public Landing (P5) |
| §6.12 | Empty / Loading / Error states |
| §7.1 | Pola Umum Module Landing |
| §7.5 | SDSS Workflow diagram |
| §7.9 | Settings Tabbed Layout |
| §7.10 | Data Catalog Search-First Layout |
| §8.1 | First-time Login Flow |
| §8.3 | Crisis Mode |
| §8.6 | Group Decision Session |
| §8.7 | AI Conversational Query |
| §9.5 | Layer Switcher, Time Slider, Scenario Picker |
| §10.x | Empty / Loading / Error patterns |
| §11.2 | Halaman Utama Mobile |
| §11.5 | Field Data Capture |

---


## Lampiran E — Prototype MVP Build Checklist *(Baru di v1.1)*

Checklist screen-by-screen untuk memandu pembangunan MVP prototype. Sudah diurutkan sesuai dependency dan prioritas.

### Phase 1 — Foundation (Estimasi: 1-2 hari)

- [ ] **Setup project**
  - [ ] React + TypeScript + Vite (atau Next.js dengan App Router)
  - [ ] Tailwind CSS + base config
  - [ ] Folder structure: `/src/components`, `/src/pages`, `/src/data/mock`, `/src/hooks`, `/src/types`
  - [ ] Color tokens dari §13.1 di tailwind.config.js
  - [ ] Typography setup (Inter font)
  - [ ] Icon library (Lucide React)

- [ ] **Global state setup**
  - [ ] Zustand store untuk: currentUser, currentPersona, contextBar state (province, period, scenario), uiState (sidebar collapsed, AI panel open, search open)
  - [ ] Mock data loader dari `/data/mock/*.json`

- [ ] **Type definitions**
  - [ ] Lihat Lampiran F untuk schema; tulis interfaces di `/src/types/`

### Phase 2 — Layout Shell (Estimasi: 2-3 hari)

- [ ] **TopBar component** (Anatomy §16.4)
  - [ ] Logo + brand text
  - [ ] Search input (klik buka modal)
  - [ ] AI button (klik buka drawer)
  - [ ] Notifications dengan badge
  - [ ] Language toggle
  - [ ] User menu dropdown
  - [ ] Hamburger untuk toggle sidebar
  - [ ] Crisis Mode banner (conditional)

- [ ] **Sidebar component** (§5.2)
  - [ ] 10 module items dengan icon
  - [ ] Active state highlighting
  - [ ] Submenu expand/collapse (akordion)
  - [ ] Collapse mode (icon-only)
  - [ ] Persona-aware visibility (hide items per matriks §3.6)

- [ ] **ContextBar component** (Anatomy §16.5)
  - [ ] Province dropdown (mock 18 provinces)
  - [ ] Period selector
  - [ ] Scenario picker
  - [ ] Pin chips (add/remove)
  - [ ] Reset button

- [ ] **Footer Status Bar** (§5.8)
  - [ ] Online indicator
  - [ ] Data freshness timestamp
  - [ ] GeoVertix uptime mock
  - [ ] Jobs running count
  - [ ] Version label

### Phase 3 — Halaman Utama (Estimasi: 3-4 hari)

- [ ] **Dashboard page** (`/dashboard`, persona P2 variant)
  - [ ] Layout: TopBar + Sidebar + ContextBar + Main + Status
  - [ ] Quick Actions Bar (Anatomy §16.8)
  - [ ] KPI Cards Row (4 cards, Anatomy §16.1)
    - [ ] Mock data per province
    - [ ] Re-render saat ganti province (dengan loading skeleton)
    - [ ] Click → detail (dummy modal)
  - [ ] Risk Map Inline (placeholder SVG map of Sulawesi Selatan dengan overlay)
    - [ ] Layer toggle checkboxes
    - [ ] Mock interactive area dengan tooltip
    - [ ] "Buka di Peta Full" button
  - [ ] Activity Feed (5-7 items, Anatomy §16.3)
    - [ ] Mock data dari Lampiran F
    - [ ] Filter buttons (All / Mentions Me / Last 24h)
    - [ ] "Lihat semua" link
  - [ ] Module Grid (10 tiles, Anatomy §16.2)
    - [ ] Hover effect dengan tooltip
    - [ ] Click → navigate ke module landing

### Phase 4 — Global Overlays (Estimasi: 2 hari)

- [ ] **Search Modal** (§5.5)
  - [ ] Triggered by ⌘K atau klik search input
  - [ ] Typeahead dengan debounce 200ms
  - [ ] Mock results categorized (Fitur, Layer, Skenario, Report, User)
  - [ ] Keyboard navigation (↑↓ Enter Esc)
  - [ ] Recent searches saat empty

- [ ] **AI Assistant Drawer** (§5.6, Anatomy §16.6)
  - [ ] Triggered by ⌘I atau klik AI button
  - [ ] Konteks strip di header
  - [ ] Mock conversation (pre-canned 3-5 exchanges)
  - [ ] Streaming animation untuk respons
  - [ ] Pin/Share/Settings buttons
  - [ ] Esc untuk tutup

- [ ] **Notifications Dropdown** (§5.1)
  - [ ] Triggered by klik 🔔
  - [ ] 5 mock notifications
  - [ ] "Mark all as read" button
  - [ ] "View all" link

- [ ] **User Menu Dropdown** (§5.1)
  - [ ] Profile, Settings, Logout
  - [ ] Persona switcher (untuk demo P1-P5)

### Phase 5 — Module Landing Pages (Estimasi: 2 hari, P0 subset)

- [ ] **Climate Modeling** (`/modeling`, §7.2)
  - [ ] Hero feature card
  - [ ] 8 feature cards (incl. sub-section Validation)
  - [ ] Activity in module mini-feed

- [ ] **Vulnerability** (`/vulnerability`, §7.3)
  - [ ] 2 feature cards (lebih spacious)
  - [ ] Bar chart placeholder: top 10 kab/kota

- [ ] **Reports** (`/reports`, §7.8)
  - [ ] 4 feature cards
  - [ ] Recent reports list (3-5 mock)

- [ ] **Data Catalog** (`/data`, §7.10)
  - [ ] Search-first layout
  - [ ] 5-7 mock datasets dengan filters

### Phase 6 — State Management & Polish (Estimasi: 1-2 hari)

- [ ] **Loading states** — skeleton di KPI saat ganti province
- [ ] **Empty state** — Activity Feed kosong dengan ilustrasi
- [ ] **Error state** — Risk Map gagal load dengan retry button
- [ ] **Toast notifications** — "Scenario tersimpan", "Context berubah"
- [ ] **Page transitions** — smooth fade 250ms
- [ ] **Keyboard shortcuts** — ⌘K, ⌘I, M, H, Esc, ?
- [ ] **Responsive** — minimal breakpoint tablet (1024px) supaya tidak rusak

### Phase 7 — Demo Polish & Persona Switcher (Estimasi: 1 hari, BONUS)

- [ ] **Persona Switcher** di settings (untuk demo)
  - [ ] Switch antara P1, P2, P3 (P4, P5 opsional)
  - [ ] Dashboard re-render dengan variant
  - [ ] Sidebar items berubah sesuai persona
  - [ ] Quick Actions berubah

- [ ] **Crisis Mode demo**
  - [ ] Toggle dari settings/admin
  - [ ] Top bar gradient kuning-merah
  - [ ] Banner muncul
  - [ ] Quick Actions di-override

- [ ] **Onboarding tour** (3-step minimum)
  - [ ] Highlight TopBar → KPI → Module Grid
  - [ ] "Skip" dan "Selanjutnya" buttons

### Total Estimasi MVP

| Phase | Effort |
|-------|--------|
| 1. Foundation | 1-2 hari |
| 2. Layout Shell | 2-3 hari |
| 3. Halaman Utama | 3-4 hari |
| 4. Global Overlays | 2 hari |
| 5. Module Landings (P0 subset) | 2 hari |
| 6. State & Polish | 1-2 hari |
| 7. Demo Polish (Bonus) | 1 hari |
| **TOTAL** | **12-16 hari** (~2-3 minggu, 1 dev) |

Dengan AI-assisted development, effort dapat dipangkas ke **5-8 hari**.

---

## Lampiran F — Mock Data Schemas (JSON) *(Baru di v1.1)*

JSON schema lengkap untuk semua mock data yang dibutuhkan prototype. Salin ke `/src/data/mock/*.json`.

### F.1 Provinces

```json
[
  {
    "id": "sulsel",
    "name": "Sulawesi Selatan",
    "nameEn": "South Sulawesi",
    "code": "73",
    "bbox": [118.7, -7.4, 122.0, -2.3],
    "center": [120.0, -4.5],
    "population": 9073509,
    "area_km2": 46717,
    "regions_count": 24,
    "priority_group": 1,
    "active_since": "2026-01-01"
  },
  {
    "id": "bali",
    "name": "Bali",
    "nameEn": "Bali",
    "code": "51",
    "bbox": [114.4, -8.9, 115.7, -8.0],
    "center": [115.0, -8.5],
    "population": 4317404,
    "area_km2": 5780,
    "regions_count": 9,
    "priority_group": 3,
    "active_since": "2028-01-01"
  }
  // ... 16 lagi sesuai TOR Annex 6
]
```

### F.2 Users

```json
[
  {
    "id": "user-001",
    "name": "Ahmad Kusumo",
    "nameInitials": "AK",
    "email": "ahmad@bappeda-sulsel.go.id",
    "avatarUrl": null,
    "role": "P2",
    "roleLabel": "Planner",
    "organization": "Bappeda Sulsel",
    "department": "Bidang Penataan Ruang",
    "language": "id",
    "timezone": "Asia/Makassar",
    "createdAt": "2026-01-15T08:30:00Z",
    "lastLoginAt": "2026-05-22T07:45:00Z",
    "permissions": ["read:all", "write:scenarios", "write:reports"]
  },
  {
    "id": "user-002",
    "name": "Budi Pratama",
    "role": "P2",
    "organization": "Bappeda Sulsel"
  },
  {
    "id": "user-003",
    "name": "Citra Dewi",
    "role": "P2",
    "organization": "Bappeda Kota Makassar"
  },
  {
    "id": "user-004",
    "name": "Rina Sari",
    "role": "P3",
    "organization": "LIPI / BRIN"
  },
  {
    "id": "user-005",
    "name": "Roswidyatmoko Dwihatmojo",
    "role": "P1",
    "organization": "BIG (Deputi Bidang Informasi Geospasial Tematik)"
  }
]
```

### F.3 KPI Snapshots

```json
{
  "p2-default": {
    "kpi1": {
      "label": "Provinsi Aktif",
      "labelEn": "Active Provinces",
      "value": 18,
      "max": 18,
      "format": "fraction",
      "trend": { "direction": "stable", "delta": 0, "comparisonLabel": "vs Q1 2026" },
      "tooltip": "Provinsi dengan data updated dalam 30 hari terakhir"
    },
    "kpi2": {
      "label": "Risk Alerts",
      "labelEn": "Risk Alerts",
      "value": 3,
      "format": "number",
      "semanticColor": "warning",
      "trend": { "direction": "up", "delta": 1, "comparisonLabel": "vs minggu lalu" }
    },
    "kpi3": {
      "label": "Model Running",
      "labelEn": "Models Running",
      "value": 5,
      "format": "number",
      "trend": { "direction": "down", "delta": 2, "comparisonLabel": "vs kemarin" }
    },
    "kpi4": {
      "label": "Active Scenarios",
      "labelEn": "Active Scenarios",
      "value": 12,
      "format": "number",
      "trend": { "direction": "up", "delta": 3, "comparisonLabel": "vs minggu lalu" }
    }
  },
  "p1-default": {
    "kpi1": { "label": "Provinsi Aktif", "value": 18, "max": 18 },
    "kpi2": { "label": "Risk Index Nasional", "value": 58, "max": 100, "semanticColor": "warning",
              "trend": { "direction": "up", "delta": 3 } },
    "kpi3": { "label": "Action Items Pending", "value": 7 },
    "kpi4": { "label": "Reports Diterbitkan", "value": 12, "unit": "bulan ini" }
  }
}
```

### F.4 Activity Feed Items

```json
[
  {
    "id": "act-001",
    "type": "risk-alert",
    "title": "Risk Alert: Banjir Wajo",
    "subtitle": "Risiko banjir 1.8m projected next 48h",
    "timestamp": "2026-05-22T10:30:00Z",
    "actor": {
      "id": "user-002",
      "name": "Budi Pratama",
      "organization": "Bappeda Sulsel"
    },
    "actions": [
      { "label": "Lihat detail", "href": "/modeling/flood-drought?event=alert-2026-042" },
      { "label": "Tutup", "action": "dismiss" }
    ],
    "isRead": false,
    "metadata": {
      "province": "sulsel",
      "regency": "wajo",
      "severity": "high"
    }
  },
  {
    "id": "act-002",
    "type": "comment",
    "title": "Rina Sari commented on 'Sulsel-Flood-2050'",
    "subtitle": ""Apakah include data BMKG terbaru?"",
    "timestamp": "2026-05-22T09:15:00Z",
    "actor": { "id": "user-004", "name": "Rina Sari", "organization": "LIPI" },
    "actions": [
      { "label": "Balas", "href": "/sdss/scenarios/scn-001#comment-042" },
      { "label": "Buka skenario", "href": "/sdss/scenarios/scn-001" }
    ],
    "isRead": false
  },
  {
    "id": "act-003",
    "type": "report",
    "title": "Report 'Q1 2026 Climate Risk Sulsel'",
    "subtitle": "Published by Ahmad Kusumo (Anda)",
    "timestamp": "2026-05-21T16:20:00Z",
    "actor": { "id": "user-001", "name": "Ahmad Kusumo" },
    "actions": [{ "label": "Lihat report", "href": "/reports/q1-2026-sulsel" }],
    "isRead": true
  },
  {
    "id": "act-004",
    "type": "scenario",
    "title": "New Scenario 'RDTR Makassar 2030'",
    "subtitle": "Created by Citra Dewi",
    "timestamp": "2026-05-20T11:45:00Z",
    "actor": { "id": "user-003", "name": "Citra Dewi", "organization": "Bappeda Kota Makassar" },
    "actions": [{ "label": "Buka skenario", "href": "/sdss/scenarios/scn-002" }]
  },
  {
    "id": "act-005",
    "type": "ai-insight",
    "title": "AI Insight tersimpan",
    "subtitle": ""Wajo butuh perhatian khusus karena kombinasi flood risk + low capacity"",
    "timestamp": "2026-05-19T14:00:00Z",
    "actor": { "id": "system", "name": "AI Assistant" },
    "actions": [
      { "label": "Pin ke project", "action": "pin" },
      { "label": "Detail", "href": "/ai/insights/ins-042" }
    ]
  }
]
```

### F.5 Scenarios

```json
[
  {
    "id": "scn-001",
    "name": "Sulsel Flood Adaptation 2050",
    "nameEn": "Sulsel Flood Adaptation 2050",
    "description": "Skenario adaptasi banjir di Sulawesi Selatan untuk horizon 2050",
    "createdBy": "user-001",
    "createdAt": "2026-04-10T09:00:00Z",
    "updatedAt": "2026-05-15T14:30:00Z",
    "status": "consultation",
    "province": "sulsel",
    "scenarioType": "ssp2-45",
    "timePeriod": { "from": "2025", "to": "2050" },
    "tags": ["flood", "coastal", "adaptation"],
    "collaborators": ["user-002", "user-004"],
    "version": "1.3"
  },
  {
    "id": "scn-002",
    "name": "RDTR Makassar 2030",
    "description": "RDTR planning scenario untuk Kota Makassar 2030",
    "createdBy": "user-003",
    "createdAt": "2026-05-20T11:45:00Z",
    "status": "draft",
    "province": "sulsel",
    "city": "makassar",
    "tags": ["rdtr", "urban-planning"]
  }
]
```

### F.6 Layers

```json
[
  {
    "id": "lyr-flood-sulsel-2024",
    "name": "Banjir Sulsel 2024-2025",
    "type": "vector",
    "geometry": "Polygon",
    "source": "BNPB InaRISK",
    "license": "Public Domain",
    "updatedAt": "2026-01-07T00:00:00Z",
    "bbox": [118.7, -7.4, 122.0, -2.3],
    "preview": "/api/layers/lyr-flood-sulsel-2024/preview.png",
    "metadata": {
      "iso19115": true,
      "featureCount": 245
    }
  },
  {
    "id": "lyr-rainfall-bmkg",
    "name": "Curah Hujan Harian BMKG Sulsel",
    "type": "raster",
    "format": "GeoTIFF",
    "source": "BMKG",
    "license": "Restricted (gov-only)",
    "resolution": "1km",
    "updatedAt": "2026-05-22T06:00:00Z",
    "isStreaming": true,
    "metadata": {
      "stream_interval": "10min"
    }
  }
]
```

### F.7 AI Conversation (Pre-canned)

```json
[
  {
    "id": "msg-001",
    "role": "assistant",
    "content": "Halo Ahmad! Saya bisa bantu apa hari ini? Coba tanya:\n• "Lokasi banjir terburuk?"\n• "Bandingkan skenario A vs B"",
    "timestamp": "2026-05-22T10:00:00Z"
  },
  {
    "id": "msg-002",
    "role": "user",
    "content": "Lokasi banjir sulsel 2050?",
    "timestamp": "2026-05-22T10:00:30Z"
  },
  {
    "id": "msg-003",
    "role": "assistant",
    "content": "Berdasarkan model SSP2-4.5, lokasi dengan risiko banjir tertinggi pada 2050 di Sulsel:\n\n1. **Pesisir Makassar** (depth 1.5-2.5m)\n2. **Wajo** (di sekitar Sungai Walanae)\n3. **Bone selatan**",
    "citations": [
      { "label": "BMKG Hidrologi 2024", "url": "/data/external/bmkg/hydro-2024" },
      { "label": "BPS Sensus 2023", "url": "/data/external/bps/sensus-2023" }
    ],
    "actions": [
      { "label": "Lihat di Peta", "href": "/map?layer=flood-2050&province=sulsel" },
      { "label": "Detail XAI", "href": "/ai/xai/explain-flood-projection" }
    ],
    "timestamp": "2026-05-22T10:00:35Z"
  }
]
```

### F.8 Notifications

```json
[
  {
    "id": "notif-001",
    "type": "mention",
    "title": "Rina Sari mentioned you",
    "subtitle": "@Ahmad apakah include data BMKG terbaru?",
    "timestamp": "2026-05-22T09:15:00Z",
    "isRead": false,
    "actionUrl": "/sdss/scenarios/scn-001#comment-042"
  },
  {
    "id": "notif-002",
    "type": "alert",
    "title": "Risk Alert: Banjir Wajo",
    "subtitle": "Risiko 1.8m next 48h",
    "timestamp": "2026-05-22T10:30:00Z",
    "isRead": false,
    "severity": "warning",
    "actionUrl": "/modeling/flood-drought?event=alert-2026-042"
  },
  {
    "id": "notif-003",
    "type": "system",
    "title": "Maintenance terjadwal",
    "subtitle": "Minggu 26 Mei 03:00-05:00 WIB",
    "timestamp": "2026-05-20T08:00:00Z",
    "isRead": true
  }
]
```

### F.9 Module Definitions (untuk Sidebar & Module Grid)

```json
[
  {
    "id": "dashboard",
    "icon": "Home",
    "labelId": "Dashboard",
    "labelEn": "Dashboard",
    "href": "/dashboard",
    "personas": ["P1", "P2", "P3", "P4", "P5"]
  },
  {
    "id": "map",
    "icon": "Map",
    "labelId": "Peta",
    "labelEn": "Map",
    "href": "/map",
    "personas": ["P1", "P2", "P3", "P4", "P5"]
  },
  {
    "id": "modeling",
    "icon": "Thermometer",
    "labelId": "Climate Modeling",
    "labelEn": "Climate Modeling",
    "href": "/modeling",
    "featureCount": 8,
    "personas": ["P2", "P3"],
    "children": [
      { "id": "climate-advanced", "label": "Advanced Climate", "href": "/modeling/climate-advanced" },
      { "id": "lulc-change", "label": "LULC Change Detection", "href": "/modeling/lulc-change" },
      { "id": "carbon", "label": "Carbon Footprint", "href": "/modeling/carbon" },
      { "id": "biodiversity", "label": "Biodiversity", "href": "/modeling/biodiversity" },
      { "id": "slr", "label": "SLR & Subsidence", "href": "/modeling/slr" },
      { "id": "flood-drought", "label": "Flood & Drought", "href": "/modeling/flood-drought" },
      { "id": "hindcast", "label": "Hindcasting", "href": "/modeling/hindcast" },
      { "id": "monitor", "label": "Model Monitor", "href": "/modeling/monitor" }
    ]
  }
  // ... 8 module lain
]
```

---

## Lampiran G — Claude Artifacts Implementation Guide *(Baru di v1.1)*

Bagian ini memandu cara menerjemahkan dokumen ini menjadi prototype yang dapat dibangun di Claude Artifacts (atau lingkungan AI-assisted lainnya).

### G.1 Pemahaman Batasan Claude Artifacts

Claude Artifacts memiliki batasan teknis yang harus dipertimbangkan:

| Batasan | Implikasi untuk Prototype |
|----------|-----------------------------|
| Single file artifact (untuk React) | Tidak bisa pakai Next.js dengan multi-file routing |
| Tidak ada external API access (kecuali via fetch ke whitelist) | Gunakan mock data inline atau dari JSON |
| Tidak ada `localStorage` / `sessionStorage` | Pakai React state (useState/useReducer) |
| Library yang tersedia: React, lucide-react, recharts, lodash, papaparse, mathjs, shadcn/ui (subset) | Tidak bisa pakai Leaflet/MapLibre — pakai SVG placeholder |
| Tailwind base classes only (no compiler) | Cukup memadai untuk prototype |
| Max satu artifact per pembuatan | Strategi: single large artifact yang berisi seluruh aplikasi |

### G.2 Strategi Pembagian Artifact

Untuk prototype yang lengkap, ada dua strategi:

#### Strategi A — Single Comprehensive Artifact (Rekomendasi)

Bangun **satu artifact React** yang berisi seluruh prototype. Internal "routing" pakai React state, bukan URL routing.

**Struktur:**
```
ClimateActionPrototype.jsx (artifact tunggal)
├── App component (top-level)
│   ├── State: currentPage, currentPersona, contextBar, uiState
│   ├── Routing via switch(currentPage)
│   ├── TopBar (always rendered)
│   ├── Sidebar (always rendered)
│   ├── ContextBar (conditional)
│   ├── Main Content (switches based on currentPage)
│   ├── AI Drawer (overlay, conditional)
│   ├── Search Modal (overlay, conditional)
│   └── Footer Status (always rendered)
├── Mock data (inline JSON objects)
└── Sub-components (definisi dalam file yang sama)
```

**Pros:** Bisa di-share sebagai 1 link, mudah di-iterate, semua state terkelola di satu tempat.

**Cons:** File jadi besar (~800-1500 baris), navigasi pakai state bukan URL (tidak ada deep link).

#### Strategi B — Multiple Artifacts (per Module)

Buat beberapa artifacts:
1. **Artifact 1**: Halaman Utama (Dashboard) lengkap dengan TopBar + Sidebar + zona-zona
2. **Artifact 2**: Module Landing pages (Climate Modeling, Vulnerability, dll.) — bisa beberapa
3. **Artifact 3**: Komponen library showcase (KPI Card, Activity Item, dll.) untuk Storybook-style

**Pros:** Setiap artifact fokus, lebih mudah di-iterate per area.

**Cons:** Tidak terhubung sebagai aplikasi utuh; lebih sulit demo end-to-end.

**Rekomendasi:** Mulai dengan Strategi A untuk demo komprehensif. Setelah validasi, pecah ke Strategi B untuk fine-tuning per area.

### G.3 Pattern untuk Internal Routing (tanpa URL Router)

Karena tidak bisa pakai React Router di artifact, gunakan state-based routing:

```typescript
type Page =
  | 'dashboard'
  | 'modeling'
  | 'vulnerability'
  | 'sectoral'
  | 'sdss'
  | 'ai'
  | 'collab'
  | 'reports'
  | 'data'
  | 'map'
  | 'settings'
  | 'feature-detail';  // generic for detail pages

interface AppState {
  currentPage: Page;
  detailParams?: { module: string; featureId: string };
}

// Navigation helper
function navigateTo(page: Page, params?: object) {
  setAppState({ currentPage: page, detailParams: params });
}

// Click handler
<button onClick={() => navigateTo('modeling')}>
  Climate Modeling
</button>
```

### G.4 Pattern untuk Mock Map (tanpa MapLibre)

Karena Leaflet/MapLibre tidak tersedia di artifact, pakai pendekatan **SVG static map**:

```jsx
const SulselMapMock = ({ riskData, onAreaClick }) => (
  <svg viewBox="0 0 800 600" className="w-full h-auto">
    {/* Outline Sulawesi Selatan */}
    <path d="M..." fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2" />

    {/* Kab/Kota polygons dengan risk color */}
    {riskData.map(region => (
      <path
        key={region.id}
        d={region.svgPath}
        fill={getRiskColor(region.riskScore)}
        onClick={() => onAreaClick(region)}
        className="cursor-pointer hover:opacity-80"
      >
        <title>{region.name}: {region.riskScore}/100</title>
      </path>
    ))}

    {/* Legend overlay */}
    <g transform="translate(20, 540)">
      <rect width="200" height="40" fill="white" opacity="0.9" />
      <text x="10" y="20" fontSize="12">Risiko:</text>
      {/* ... */}
    </g>
  </svg>
);
```

Untuk **paths SVG kab/kota**, generate dari GeoJSON yang di-simplify menggunakan `mapshaper` atau `d3.geoPath()`. Lampirkan sebagai inline data atau JSON file.

### G.5 Pattern untuk Mock AI Streaming

AI streaming response (typewriter effect) tanpa real LLM API:

```typescript
const useStreamingResponse = (fullText: string, isOpen: boolean) => {
  const [displayed, setDisplayed] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsStreaming(true);
    setDisplayed('');

    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayed(prev => prev + fullText[i]);
        i++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 20);  // 20ms per character — adjust untuk lebih realistic

    return () => clearInterval(interval);
  }, [fullText, isOpen]);

  return { displayed, isStreaming };
};
```

### G.6 Pattern untuk Persona Switcher (Demo Feature)

```typescript
const personas = {
  P1: { name: 'Roswidyatmoko Dwihatmojo', role: 'Executive', module: 'reports' },
  P2: { name: 'Ahmad Kusumo', role: 'Planner', module: 'sdss' },
  P3: { name: 'Citra Dewi (Dr.)', role: 'Researcher', module: 'modeling' }
};

const PersonaSwitcher = ({ current, onChange }) => (
  <div className="flex gap-2 p-4 bg-yellow-50 border-2 border-yellow-300 rounded">
    <span className="text-sm font-semibold">🎭 Demo Persona:</span>
    {Object.entries(personas).map(([key, p]) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={cn(
          "px-3 py-1 text-xs rounded",
          current === key ? "bg-primary-600 text-white" : "bg-white border"
        )}
      >
        {key} {p.role}
      </button>
    ))}
  </div>
);
```

Place this banner above the TopBar di prototype (only visible di demo mode).

### G.7 Suggested Folder Structure (Jika Bukan Single Artifact)

Untuk implementasi di luar Claude Artifacts (mis. local dev environment dengan Next.js):

```
climate-action-prototype/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── public/
│   ├── icons/
│   ├── maps/sulsel-simplified.svg
│   └── images/placeholder-map.png
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout dengan TopBar + Sidebar
│   │   ├── page.tsx              # Redirect to /dashboard
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Halaman Utama
│   │   ├── modeling/
│   │   │   ├── page.tsx          # Module landing
│   │   │   └── [feature]/page.tsx
│   │   ├── vulnerability/page.tsx
│   │   ├── sdss/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── data/page.tsx
│   │   ├── ai/page.tsx
│   │   ├── settings/page.tsx
│   │   └── map/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── ContextBar.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   ├── FooterStatus.tsx
│   │   │   └── AIDrawer.tsx
│   │   ├── dashboard/
│   │   │   ├── KPICard.tsx
│   │   │   ├── RiskMapInline.tsx
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── ModuleGrid.tsx
│   │   │   └── ModuleTile.tsx
│   │   ├── ui/                   # Atoms (button, input, badge)
│   │   └── shared/
│   ├── data/mock/
│   │   ├── provinces.json
│   │   ├── users.json
│   │   ├── kpi.json
│   │   ├── activity.json
│   │   ├── scenarios.json
│   │   ├── layers.json
│   │   ├── conversations.json
│   │   ├── notifications.json
│   │   └── modules.json
│   ├── hooks/
│   │   ├── useGlobalState.ts     # Zustand store
│   │   ├── useContextBar.ts
│   │   └── usePersona.ts
│   ├── types/
│   │   ├── persona.ts
│   │   ├── feature.ts
│   │   ├── activity.ts
│   │   └── data.ts
│   └── lib/
│       ├── cn.ts                 # className helper
│       └── formatters.ts         # date, number formatters
└── README.md
```

### G.8 Prompt Patterns untuk Claude

Saat meminta Claude untuk membuat prototype, gunakan pattern berikut:

**Untuk satu komponen kecil:**
```
Buatkan komponen KPICard dengan props sesuai spec di
Rancangan Halaman Utama §16.1. Gunakan Tailwind CSS dan
TypeScript. Sertakan semua state (default, hover, loading,
error) dan trend indicator visualization.
```

**Untuk halaman lengkap:**
```
Buatkan halaman Dashboard untuk persona P2 (Planner) sesuai
wireframe §6.2. Sertakan: TopBar, ContextBar, Quick Actions,
4 KPI Cards, mini Risk Map (SVG placeholder Sulsel), Activity
Feed dengan 5 mock items, dan Module Grid 10 tiles. Pakai
mock data dari Lampiran F. Jadikan single React artifact.
```

**Untuk iterasi:**
```
Refer ke artifact sebelumnya. Tambahkan AI Assistant Drawer
yang muncul saat klik tombol floating 🤖. Implementasikan
streaming animation untuk respons AI (gunakan pre-canned
conversation dari Lampiran F.7). Slide-in dari kanan dengan
animasi 250ms.
```

---

## Lampiran H — Interaction Specifications Detail *(Baru di v1.1)*

Specifications detail untuk interaksi kompleks yang penting bagi prototype yang berfungsi natural.

### H.1 Context Bar Province Change → Cascade Re-render

```
TRIGGER: User klik dropdown [🌍 Sulawesi Selatan ▾]
─────────────────────────────────────────────────

STEP 1 — Dropdown Open (0ms)
  - Dropdown panel slide-down 150ms ease-out
  - Backdrop semi-transparent dim
  - Search box auto-focus
  - List 18 provinces, alphabetical
  - Current province "Sulsel" highlighted dengan ✓

STEP 2 — User Select "Bali" (klik)
  - Visual feedback: row highlight saat hover
  - Klik → dropdown close (150ms)
  - Toast appear top-right: "Konteks berubah ke Bali"

STEP 3 — Global State Update (immediate)
  - useContextBar().setProvince('bali')
  - URL update (jika di production): pushState ?province=bali
  - localStorage save preference

STEP 4 — Cascade Re-render (parallel)
  ┌─ KPI Cards (loading skeleton 300ms → updated values)
  ├─ Risk Map (re-center to Bali bbox, smooth pan 600ms)
  │  └─ Layer reload (loading overlay → fade in)
  ├─ Activity Feed (filter to Bali events, 200ms fade)
  └─ Module Grid (NO change)

STEP 5 — Toast Auto-Dismiss (4000ms)
  - Toast fade out 250ms

EDGE CASES:
- Network slow: KPI loading skeleton tetap > 300ms (skeleton shown)
- API error: Fallback ke cached data + warning banner di KPI
- Province dengan no data: Empty state per zona + actionable hint
```

### H.2 Module Grid Tile Hover → Preview Tooltip

```
TRIGGER: Mouse hover module tile (e.g., "Climate Modeling")
─────────────────────────────────────────────────────────

STEP 1 — Tile Hover (delay 500ms before tooltip)
  - Tile state change: border primary-400, shadow-md, lift -2px
  - Cursor: pointer

STEP 2 — Tooltip Appear (after 500ms hover)
  - Position: above tile (default) or below if no space
  - Width: 280px max
  - Background: dark gray-900 + white text
  - Arrow indicator pointing to tile
  - Content:
    ┌────────────────────────────┐
    │ Climate Modeling            │
    │ ─────────────────────       │
    │ Predict climate variables,  │
    │ change detection, validate. │
    │                              │
    │ Top features for you:        │
    │ • Advanced Climate Modeling  │
    │ • Flood & Drought           │
    │ • LULC Change Detection      │
    │                              │
    │ → Press Enter to open        │
    └────────────────────────────┘

STEP 3 — Mouse Leave
  - Tooltip fade out 150ms
  - Tile state reset

STEP 4 — Click (saat hover atau setelah)
  - Navigation immediate
  - Tooltip close
```

### H.3 AI Assistant Query → Streaming Response

```
TRIGGER: User type "Lokasi banjir sulsel 2050?" + Enter
─────────────────────────────────────────────────────

STEP 1 — User Message Append
  - User message bubble appear immediately (right-aligned)
  - Input field clear
  - Send button disable (loading state)

STEP 2 — AI "Thinking" Indicator
  - 3-dot pulsing animation: "🤖 ⏺⏺⏺"
  - Duration: 800ms (artificial delay untuk demo)

STEP 3 — Response Streaming
  - Replace thinking indicator dengan empty bubble
  - Token-by-token append (20ms interval)
  - Auto-scroll ke bawah saat content grow
  - Markdown support: bold, italic, bullet, links

STEP 4 — Citations Render (after streaming complete)
  - Citation badges fade in (250ms)
  - Hover citation → preview popup

STEP 5 — Action Buttons Appear
  - [🗺 Lihat di Peta] [📋 Detail XAI] [📤 Share]
  - Slide-up 200ms

STEP 6 — Input Field Re-enable
  - Send button re-enable
  - Focus kembali ke input
  - Placeholder rotate: "Tanya lagi..."

EDGE CASES:
- User Cancel mid-stream: stop stream + delete partial message
- Long response (>5000 chars): "Continue" button at end
- AI tidak yakin: show "Maaf, saya tidak punya cukup data" + suggest
```

### H.4 Search Modal Typeahead

```
TRIGGER: ⌘+K atau click search input
──────────────────────────────────

STEP 1 — Modal Open (250ms ease-out)
  - Backdrop fade-in
  - Modal scale 0.95 → 1.0 + fade-in
  - Auto-focus search input

STEP 2 — Empty State (saat input kosong)
  - Show "Recent searches" (last 5)
  - Show "Suggestions" (per persona top 3)

STEP 3 — Typing (debounce 200ms)
  - Loading indicator di search box (subtle)
  - Search mock data fuzzy match
  - Update results live

STEP 4 — Results Display
  - Grouped by category: Fitur, Layer, Skenario, Report, User
  - Each group max 3 results + "See all"
  - Keyboard navigation: ↑↓ traverse, Tab next group
  - Mouse hover → highlight

STEP 5 — Selection
  - Enter or click → navigate ke result
  - Modal close (150ms)
  - Recent searches updated (push new query)

STEP 6 — Escape
  - Esc → modal close, focus return ke trigger
  - Search input preserved (so user can re-open)

KEYBOARD:
- ↓ ↑: navigate results
- Tab: switch category
- Enter: select
- ⌘+Enter: open in new tab (production)
- Esc: close
```

### H.5 Crisis Mode Activation Cascade

```
TRIGGER: Anomaly detected (FITUR 6.2) atau admin toggle
─────────────────────────────────────────────────────

STEP 1 — Mode Activate (5 detik countdown banner)
  - Banner appear: "⚠ MODE KRISIS akan aktif dalam 5 detik..."
  - Admin: opsi "Cancel"
  - Auto: no cancel option

STEP 2 — Visual Transition (1.5 detik smooth)
  - Top Bar background: white → gradient yellow→red (1.5s)
  - Banner text update: "🚨 MODE KRISIS: Banjir Wajo Aktif"
  - Notification sound (optional, configurable)

STEP 3 — Quick Actions Override
  - Quick Actions bar slide-out (200ms)
  - New crisis quick actions slide-in (200ms)
  - Actions: 🚨 Peta Real-Time, 📞 Hubungi BNPB, 📋 Briefing, 🔔 Alert

STEP 4 — KPI Cards Override (P1 & P2)
  - KPI 1: "Affected Population" (replace "Provinsi Aktif")
  - KPI 2: "Response Time" (replace "Risk Alerts")
  - KPI 3: "Resources Available"
  - KPI 4: "Active Alerts Sent"

STEP 5 — Map Auto-Zoom
  - Risk Map auto-zoom ke affected area
  - Layer overlay: realtime flood (refresh 5min)
  - Time slider: now → +48h forecast

STEP 6 — Activity Feed Prioritize
  - Filter: hanya event terkait crisis (top)
  - Real-time push notifications enabled

STEP 7 — Audit Log
  - Crisis Mode activation logged (FITUR 9.3)
  - Notify admin via email (production)

DEACTIVATION (admin trigger):
- Confirmation dialog: "Yakin deactivate Crisis Mode?"
- Smooth reverse transitions
- Log deactivation
```

### H.6 Keyboard Shortcut Cheatsheet Overlay (?)

```
TRIGGER: User press "?"
─────────────────────

STEP 1 — Overlay Appear (250ms)
  - Backdrop dimmed
  - Centered modal 600px
  - List shortcuts grouped:

GLOBAL:
  ⌘K       Global Search
  ⌘I       AI Assistant
  ⌘/       This help
  H        Home
  M        Map
  Esc      Close overlay/modal/drawer

NAVIGATION (G then X chord):
  G then D Dashboard
  G then M Map
  G then V Vulnerability
  G then S SDSS
  G then R Reports

UI:
  [        Toggle Sidebar
  ?        This help

STEP 2 — Close
  - Press ? again, Esc, atau click backdrop
```

---

## STATUS DOKUMEN

**Versi:** 1.1  
**Tanggal:** Mei 2026  
**Penyusun:** Tim Konsultan (sesuai PRD §21.2)  
**Validasi yang Diperlukan:**
1. Review oleh BIG selama Concept Design Phase (PRD §19.2)
2. Stakeholder workshop (FGD #1 sesuai TOR Annex 6 §2.1.1)
3. UAT prototype dengan persona representatives sebelum Platform Beta (D15)

**Next steps:**
1. Konversi ke Figma hi-fi prototypes (target: M3-M4)
2. Build component library di Storybook (target: M5-M6)
3. Iteratif refinement berdasarkan feedback stakeholder
4. Validation di Platform Beta UAT (sebelum D15)

---

**End of Document.**
