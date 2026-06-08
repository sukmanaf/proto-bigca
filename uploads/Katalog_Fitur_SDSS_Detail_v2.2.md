# KATALOG FITUR SDSS — DETAIL PENGEMBANGAN (v2.2)
## Spatial Decision Support System untuk Climate Action Platform 2026–2028
### Feature Specification Document — Single Source of Truth

**Versi 2.2** (Mei 2026) — **Penyelarasan ruang lingkup dengan PRD v1.1**. Tiga fitur dihapus karena di luar ruang lingkup PRD: (1) **FITUR 7.4 Approval Workflow Engine** — tidak ada padanan di PRD FR-SDSS-25/27 (yang ada hanyalah Multi-Stakeholder Consultation + Annotation, tanpa approval engine formal); (2) **FITUR 8.5 3D Visualization** — PRD §18.3 Output Types tidak mencantumkan 3D sebagai output requirement; (3) **FITUR 13.6 Additional Integrations** — PRD §16.1 hanya menyebut 6 sistem integrasi wajib (One Map, InaRISK, BMKG, SIGN-SMART, BPS, Sentinel Hub via INT-01..INT-06); tidak ada mandat untuk Bappenas/Kemendagri/PUPR/KKP/Kemenkes/BRIN/Copernicus/NASA/WBKP. **Total fitur: 65 → 62.** Klarifikasi positioning arsitektur tetap: **SDSS dibangun sebagai aplikasi STANDALONE** dengan **integrasi selektif via API ke GeoVertix** untuk memanfaatkan plugin existing yang relevan.

**Versi 2.1** — Klarifikasi positioning arsitektur: SDSS sebagai aplikasi STANDALONE dengan integrasi selektif via API ke GeoVertix. SDSS tidak menyatu dengan GeoVertix; konsumsi GeoVertix murni pragmatis untuk hindari develop dari nol.

**Prinsip inti:** IF GeoVertix sudah ada → integrasi via API; IF belum → bangun native di SDSS.

---

## DAFTAR ISI

**BAGIAN 0 — AUDIT KESESUAIAN TOR & PERUBAHAN**

**BAGIAN 1 — STRUKTUR & PRINSIP KATALOG FITUR**
- 1.1 Hierarki Fitur
- 1.2 Template Spesifikasi Fitur
- 1.3 Diagram Konteks Sistem
- 1.4 **Prinsip Arsitektur: SDSS Standalone dengan Integrasi GeoVertix Selektif** *(BARU v2.1)*

**BAGIAN 2 — ADVANCED MODELING MODULES (6 Modul Wajib)**
- 2.1 Advanced Climate Modeling
- 2.2 Land Cover / Land Use Change Detection
- 2.3 Net Carbon Footprint Monitoring
- 2.4 Biodiversity Mapping (with Citizen Science)
- 2.5 Sea Level Rise & Land Subsidence
- 2.6 Flood & Drought Modeling

**BAGIAN 3 — ENHANCED VULNERABILITY ASSESSMENT FRAMEWORK**
- 3.1 Multi-Criteria Vulnerability Assessment
- 3.2 Dynamic Vulnerability System Modeling **(BARU - dielaborasi)**

**BAGIAN 4 — SPECIALIZED ANALYSIS MODULES (7 Modul)**
- 4.1 Spatial Planning Support Toolbox (RDTR)
- 4.2 Food Security — Rice Field Flood & Drought
- 4.3 Coastal Vulnerability Assessment
- 4.4 Forest Fire Risk Prediction (ENSO-aware)
- 4.5 Tourism Sector Vulnerability
- 4.6 Renewable Energy Deployment Optimization
- 4.7 Land Carrying Capacity Analysis

**BAGIAN 5 — SDSS DECISION SUPPORT CORE (10 Sub-Fitur)**
- 5.1 Multi-Level Decision Support Architecture **(BARU - dielaborasi)**
- 5.2 Scenario Manager & Planning Scenario Builder
- 5.3 Impact Analysis Engine
- 5.4 Customizable Adaptation Recommendation
- 5.5 Multi-Criteria Decision Analysis (MCDA) Engine
- 5.6 Context-Aware Recommendation Engine (4 sub-komponen) **(BARU - dielaborasi)**
- 5.7 Group Decision-Making Module **(BARU)**
- 5.8 Simulation & What-If Tool
- 5.9 Sensitivity & Uncertainty Analyzer
- 5.10 Optimization Solver

**BAGIAN 6 — AI/ML & NLP LAYER (9 Fitur)**
- 6.1 Image & Pattern Recognition Service **(BARU)**
- 6.2 Anomaly Detection & Early Warning System **(BARU)**
- 6.3 Predictive Modeling Framework
- 6.4 Scenario-Based Analysis Engine
- 6.5 Natural Language Query (LLM Conversational Interface)
- 6.6 RAG Pipeline & Knowledge Base
- 6.7 MCP Server (Toolbox Bridge)
- 6.8 Federated Learning Infrastructure **(BARU)**
- 6.9 Explainable AI (XAI) Service

**BAGIAN 7 — COLLABORATION & WORKFLOW (3 Fitur)**

**BAGIAN 8 — VISUALIZATION & REPORTING (4 Fitur)**

**BAGIAN 9 — PLATFORM SERVICES (6 Fitur)**

**BAGIAN 10 — DATA MANAGEMENT FEATURES (5 Fitur)**

**BAGIAN 11 — HINDCASTING & MODEL VALIDATION TOOL** *(BARU)*

**BAGIAN 12 — EDGE COMPUTING & MOBILE PWA** *(BARU)*

**BAGIAN 13 — INTEGRATION FEATURES (Sistem Nasional) (5 Fitur)**

**BAGIAN 14 — RINGKASAN, MATRIKS FITUR vs TOR, ROADMAP FITUR**

**BAGIAN 15 — STRATEGI INTEGRASI GEOVERTIX UNTUK SDSS** *(BARU v2.0)*
- 15.1 Ringkasan Strategis & Statistik
- 15.2 Rekomendasi Arsitektur: Integrasi
- 15.3 Action Items KRITIS
- 15.4 Roadmap Pengembangan Y1-Y3
- 15.5 Risk Register
- 15.6 Quick Reference Plugin

---

# BAGIAN 0 — AUDIT KESESUAIAN TOR & PERUBAHAN

## 0.1 Hasil Review Katalog Fitur Sebelumnya vs TOR

Setelah pembacaan ulang TOR (khususnya Annex 6 Sec. 1.2.2, 1.2.3, 1.3a–1.3d), berikut hasil audit kesesuaian katalog fitur sebelumnya:

| # | Persyaratan TOR | Lokasi TOR | Status Katalog Sebelumnya | Tindakan |
|---|---|---|---|---|
| 1 | 6 Modul Advanced Modeling | Annex 6 §1.2.2 #3, §1.3b.1 | ✓ Tercakup (10.1–10.6) | **Diperdalam** dengan input/algoritma/output/UI/flow |
| 2 | Multi-criteria Vulnerability | §1.3b.2.a | ✓ Tercakup (Bagian 11) | **Diperdalam** |
| 3 | **Dynamic vulnerability modeling (System Dynamics)** | §1.3b.2.b | ⚠️ Disebut sekilas | **DIBUAT FITUR TERSENDIRI** (Bagian 3.2) |
| 4 | Spatial Planning Support Toolbox | §1.3b.3.a (referenced) | ✓ (12.7) | Diperdalam dengan RDTR template |
| 5 | Rice field food security | §1.3b.3.a, §1.2.2 | ✓ (12.1) | Diperdalam |
| 6 | Coastal vulnerability | §1.3b.3.b | ✓ (12.2) | Diperdalam |
| 7 | Forest fire risk + ENSO | §1.3b.3.c | ✓ (12.3) | Diperdalam |
| 8 | Renewable Energy Optimization | §1.3b.3.d | ✓ (12.5) | Diperdalam |
| 9 | Tourism Vulnerability | §1.3b.3.e | ✓ (12.4) | Diperdalam |
| 10 | **Land Carrying Capacity** dengan SHAP | §1.3d (paragraf khusus) | ⚠️ Singkat (12.6) | **DIPERLUAS** menjadi fitur penuh |
| 11 | **Multi-level Decision Support (National/Provincial/District)** | §1.3c #1 | ❌ Belum eksplisit | **DITAMBAH** (Bagian 5.1) |
| 12 | Planning scenarios + Impact analysis + Custom recommendation | §1.3c paragraf 1 | ⚠️ Hanya scenario manager | **DIPERLUAS** menjadi 3 fitur terpisah |
| 13 | **Collaborative Decision-Making** (multi-stakeholder workflow, scenario comparison, annotation) | §1.3c #2 | ⚠️ Singkat | **DIPERDALAM** (Bagian 7) |
| 14 | **Context-Aware Recommendation Engine** (4 sub: policy-compliant, feasibility, temporal sequencing, cross-sectoral) | §1.3c #3 | ⚠️ Hanya disebut "recommendation engine" | **DIPERLUAS** menjadi 4 sub-fitur (5.6) |
| 15 | **Group decision-making support** | §1.3c paragraf 4 | ❌ Tidak dibahas | **DITAMBAH** (Bagian 5.7) |
| 16 | Predictive Modeling (AI) | §1.3d (paragraf 1) | ⚠️ Tersirat | **DIBUAT EKSPLISIT** (6.3) |
| 17 | Scenario-Based Analysis (AI) | §1.3d (paragraf 2) | ⚠️ Tersirat di scenario manager | **DIBUAT EKSPLISIT** (6.4) |
| 18 | **Image and Pattern Recognition (AI)** | §1.3d (list AI) | ❌ Belum sebagai fitur | **DITAMBAH** (Bagian 6.1) |
| 19 | **Anomaly Detection & Early Warning** | §1.3d (list AI) | ❌ Belum sebagai fitur | **DITAMBAH** (Bagian 6.2) |
| 20 | NLP Geospatial Query (LLM) | §1.3d, §1.2.2 #4 | ✓ (14) | Diperdalam |
| 21 | RAG Pipeline | §1.2.2 #4 | ✓ (14.2) | Diperdalam |
| 22 | MCP (Model Context Protocol) | §1.2.2 #3, §1.2.2 #4 | ✓ (14.4) | Diperdalam dengan spesifikasi per modul |
| 23 | **Federated Learning** | §1.3d #3.d | ❌ Tidak disebut | **DITAMBAH** (Bagian 6.8) |
| 24 | Explainable AI (SHAP/LIME) | §1.3d #2.a; §1.3d carrying capacity | ⚠️ Disebut sekilas | **DIBUAT FITUR TERSENDIRI** (6.9) |
| 25 | **Local Climate Zones (LCZ) & microclimates** | §1.3b.1.a.iii | ❌ Tidak ada | **DITAMBAH** ke Climate Modeling (2.1) |
| 26 | **Citizen Science integration (biodiversity)** | §1.3b.1.d.iii | ❌ Tidak ada | **DITAMBAH** ke Biodiversity (2.4) |
| 27 | **Cross-module linking** (LULC→Carbon→Ecosystem) | §1.3b.1.b.iii | ⚠️ Disebut umum | **DITAMBAH** sebagai feature 4.X |
| 28 | Interactive Maps, Dashboards, Executive Summary | §1.2.2 #5 | ✓ Tercakup (Bagian 16) | Diperdalam |
| 29 | RESTful API + OGC (WMS/WFS/WCS) + Data Streams | §1.2.2 #6 | ✓ Tercakup arsitektur | Dibuat feature-level spec |
| 30 | Web + Mobile responsive + i18n (ID primary, EN) | §1.2.2 #7; §1.3a.3 | ✓ Singkat | **DIPERDALAM** (Bagian 12 + 9.4) |
| 31 | Hot/Warm/Cold tiered storage | §1.3a.1.b | ✓ Tercakup arsitektur | Konteks dijelaskan per modul |
| 32 | Real-time data sync, ETL pipelines | §1.3a.1.c | ✓ Tercakup | Dibuat feature-level (10.3) |
| 33 | ISO 19115 metadata + FAIR principles | §1.3a.2.b | ✓ Tercakup (18.1) | Diperdalam |
| 34 | Data versioning + lineage | §1.3a.2.d | ✓ Singkat | Diperluas (10.4 & 10.5) |
| 35 | **Hindcasting validation tool** | §2.1.4 | ❌ Belum sebagai fitur | **DITAMBAH** (Bagian 11) |
| 36 | **Edge computing untuk konektivitas terbatas** | §2.1.5 | ⚠️ Disebut arsitektur | **DITAMBAH** sebagai feature (Bagian 12) |
| 37 | **Onboarding & Tutorial system** | §1.3c (paragraf 1: "comprehensive guides") | ❌ Tidak dibahas | **DITAMBAH** (Bagian 9.5) |
| 38 | National systems integration (One Map, InaRISK, BMKG, SIGN-SMART, BPS) | §1.2.3 #6 | ✓ Singkat | **DIPERDALAM** (Bagian 13) |
| 39 | JIGN integration | TOR Sec. Annex 1 (Year 3) | ✓ Singkat | Diperdalam |
| 40 | Permission tier: Government, Private, Public | §1.2.2 #8 | ✓ Tercakup | Diperdalam dengan matrix per fitur |

**Total perubahan utama:**
- **15 fitur baru / dielaborasi mendalam** yang sebelumnya hilang atau hanya disebut sekilas
- **25 fitur eksisting** diperdalam dengan detail input/algoritma/output/UI/flow/dependencies
- **Total ~70 fitur** dengan spesifikasi lengkap pada katalog revisi ini

## 0.2 Ringkasan Perubahan vs Versi Sebelumnya

```
SEBELUMNYA (v1)                           SESUDAH REVISI (v2)
─────────────────────────                 ─────────────────────────
~25 fitur disebut                  →      ~70 fitur dispesifikasi
Deskripsi 4-7 bullet poin per fitur →     Deskripsi lengkap per fitur dengan
                                          12 sub-aspek (tujuan, input, algoritma,
                                          output, UI, flow, dependencies, dll)
0 flow diagram                     →      ~30+ flow diagram & tabel
Beberapa fitur TOR tersamar        →      Mapping eksplisit ke section TOR
```

---

# BAGIAN 1 — STRUKTUR & PRINSIP KATALOG FITUR

## 1.1 Hierarki Fitur

Katalog fitur diorganisir dalam 3 level:

```
LEVEL 1: KELOMPOK FITUR (10 kelompok)
  ├── LEVEL 2: MODUL / FITUR (~70 fitur utama)
  │     └── LEVEL 3: SUB-FITUR & FUNGSI (banyak)
  │
  Contoh:
  KELOMPOK: Advanced Modeling Modules
    MODUL: Flood & Drought Modeling
      SUB-FITUR: Banjir return period selector
      SUB-FITUR: Simulasi user-defined rainfall
      SUB-FITUR: Animasi inundasi temporal
      SUB-FITUR: Coupling dengan modul Climate
```

## 1.2 Template Spesifikasi Per Fitur

Setiap fitur didokumentasikan dengan struktur konsisten:

```
┌─────────────────────────────────────────────────────────────┐
│  [KODE FITUR] [NAMA FITUR]                                  │
├─────────────────────────────────────────────────────────────┤
│  TUJUAN PENGEMBANGAN                                        │
│  Mengapa fitur ini ada, masalah pengguna yang diselesaikan  │
│                                                              │
│  LANDASAN TOR                                                │
│  Section TOR spesifik + kutipan/parafrase                    │
│                                                              │
│  DESKRIPSI FUNGSIONAL                                        │
│  Apa yang dilakukan fitur dalam 1-2 paragraf                 │
│                                                              │
│  INPUT DATA (Tabel)                                          │
│  Nama | Sumber | Format | Resolusi | Frekuensi | Lisensi    │
│                                                              │
│  ALGORITMA & METODE                                          │
│  Pendekatan teknis, parameter, persamaan jika relevan        │
│                                                              │
│  OUTPUT (Tabel)                                              │
│  Format | Struktur | Unit | Contoh                          │
│                                                              │
│  DETAIL UI/UX                                                │
│  Layout, komponen, interaksi, ASCII mockup                   │
│                                                              │
│  FLOW FITUR                                                  │
│  Diagram input → processing → output                         │
│                                                              │
│  DEPENDENCIES                                                │
│  Modul lain | Layanan eksternal | Library                    │
│                                                              │
│  KARAKTERISTIK NON-FUNGSIONAL                                │
│  Performance | Security | Privacy | Scalability             │
│                                                              │
│  VALIDASI & QA                                               │
│  Cara fitur akan diuji & divalidasi                          │
│                                                              │
│  AKSES PER TIER USER                                         │
│  Government Full | Private Limited | Public                 │
└─────────────────────────────────────────────────────────────┘
```

## 1.3 Diagram Konteks Sistem (Context Diagram)

```
                            ╔═══════════════════════════╗
                            ║  SISTEM EKSTERNAL & USER ║
                            ╚═══════════════════════════╝
                                       │
        ┌─────────┬──────────┬─────────┼─────────┬──────────┬─────────┐
        ▼         ▼          ▼         ▼         ▼          ▼         ▼
    [BMKG]   [BNPB]    [KLHK]   [PEMERINTAH]  [SWASTA]  [PUBLIK]  [AKADEMISI]
    [BPS]    [ATR/BPN] [BIG]    [USER]        [USER]    [USER]    [USER]
        │         │          │         │         │          │         │
        ▼         ▼          ▼         ▼         ▼          ▼         ▼
    [DATA INGESTION GATEWAY]  ◄──►  [API & AUTH GATEWAY]
              │                                  │
              ▼                                  ▼
    ╔══════════════════════════════════════════════════════════════╗
    ║                  SDSS CLIMATE ACTION PLATFORM                ║
    ║                                                              ║
    ║  ┌──────────────────────────────────────────────────────┐   ║
    ║  │  ADVANCED MODELING (6)   VULN. ASSESSMENT (2)        │   ║
    ║  │  Climate, LULC, Carbon,  Multi-criteria,             │   ║
    ║  │  Biodiv, SLR, Flood      Dynamic Vulnerability       │   ║
    ║  ├──────────────────────────────────────────────────────┤   ║
    ║  │  SPECIALIZED ANALYSIS (7)                            │   ║
    ║  │  Spatial Planning, Food, Coastal, Fire, Tourism,     │   ║
    ║  │  Renewable Energy, Carrying Capacity                 │   ║
    ║  ├──────────────────────────────────────────────────────┤   ║
    ║  │  SDSS CORE (10)                                      │   ║
    ║  │  Multi-Level | Scenario | Impact | Recommend |       │   ║
    ║  │  MCDA | Context-Aware | Group DM | What-If |         │   ║
    ║  │  Sensitivity | Optimization                          │   ║
    ║  ├──────────────────────────────────────────────────────┤   ║
    ║  │  AI/ML & NLP LAYER (9)                               │   ║
    ║  │  Image Recog | Anomaly | Predict | Scenario-AI |     │   ║
    ║  │  LLM | RAG | MCP | Federated | XAI                   │   ║
    ║  ├──────────────────────────────────────────────────────┤   ║
    ║  │  COLLAB (4) | VIZ (5) | PLATFORM (6) | DATA (5)     │   ║
    ║  │  HINDCAST | EDGE/MOBILE | INTEGRATION                │   ║
    ║  └──────────────────────────────────────────────────────┘   ║
    ╚══════════════════════════════════════════════════════════════╝
              │
              ▼
    [OUTPUT KEPUTUSAN] → RDTR, Kebijakan iklim, Peringatan dini,
                          Rekomendasi aksi adaptasi/mitigasi
```

---


---

## 1.4 Prinsip Arsitektur: SDSS Standalone dengan Integrasi GeoVertix Selektif *(BARU v2.0)*

### 1.4.1 Positioning Arsitektur

**SDSS Climate Action Platform adalah aplikasi STANDALONE** dengan deployment, frontend, backend, dan database sendiri. SDSS berdiri sendiri sebagai sistem yang fully owned & operated oleh Badan Informasi Geospasial (BIG), TIDAK terbenam ke dalam arsitektur aplikasi lain.

GeoVertix adalah aplikasi GIS existing yang sudah dikembangkan (17 plugin production). **Banyak kapabilitas GeoVertix yang relevan dan sudah teruji** untuk fondasi SDSS. Untuk efektivitas pengembangan, SDSS akan **mengintegrasikan plugin GeoVertix via API** untuk kapabilitas yang sudah ada, dan **mengembangkan modul native SDSS** untuk kapabilitas yang belum ada.

```
+--------------------------------------------------+
|                   SDSS APPLICATION                |
|                     (Standalone)                  |
|                                                   |
|  +-------------------+   +--------------------+   |
|  | Frontend SDSS     |   | API Gateway SDSS   |   |
|  | (React/MapLibre)  |<->| (REST/GraphQL)     |   |
|  +-------------------+   +---------+----------+   |
|                                    |              |
|  +---------------------------------v----------+   |
|  |     SDSS BACKEND (Modul Native + Adapter)  |   |
|  |  - Climate Module     - Vulnerability Mod  |   |
|  |  - LULC Module        - MCDA Module        |   |
|  |  - Flood Module       - SLR Module         |   |
|  |  - Carbon Module      - Scenario Mgr       |   |
|  |  - ...50+ modul SDSS native...             |   |
|  |  - GeoVertix Bridge Adapter                |   |
|  +-----+---------------------+------------+---+   |
|        |                     |            |       |
|  +-----v------+        +-----v-----+   +--v---+   |
|  | PostgreSQL |        | Redis     |   | S3   |   |
|  | (sdss_*)   |        | (cache)   |   |      |   |
|  +------------+        +-----------+   +------+   |
+--------------------------------------------------+
                            |
                            | (REST/gRPC API
                            |  via Bridge Adapter)
                            |
                            v
+--------------------------------------------------+
|         GEOVERTIX APPLICATION (Existing)          |
|              (Dikonsumsi via API)                 |
|                                                   |
|  Dispatcher (port 17500)                          |
|  +------------------------------------------+     |
|  | gxp-mcda  gxp-climate  gxp-geoai         |     |
|  | gxp-qgis  gxp-inference  gxp-ml          |     |
|  | gxp-geoprocess  gxp-3dtiles  gxp-lidar   |     |
|  | gxp-mbtiles  gxp-bpnmap  gxp-pbb         |     |
|  | gxp-mapeditor  gxp-routing  gxp-areainfo |     |
|  | gxp-agrest                               |     |
|  +------------------------------------------+     |
+--------------------------------------------------+
```

### 1.4.2 Prinsip Pemanfaatan GeoVertix

**Hirarki keputusan untuk setiap kapabilitas SDSS:**

1. **IF** plugin GeoVertix sudah punya kapabilitas yang dibutuhkan → **integrasi via API GeoVertix** (PREFERRED untuk hindari duplikasi kerja & maintain konsistensi data)
2. **IF** GeoVertix punya sebagian kapabilitas → **hybrid**: konsumsi API untuk yang ada, build native untuk sisanya
3. **IF** GeoVertix TIDAK punya kapabilitas → **build native sebagai modul SDSS** (di backend SDSS, schema `sdss_*` di database SDSS)

Tidak ada keharusan untuk menyatukan SDSS dengan GeoVertix. Keputusan integrasi adalah **murni pragmatis** berdasarkan apa yang sudah ada vs apa yang harus dibangun.

### 1.4.3 Mekanisme Integrasi API SDSS ↔ GeoVertix

| Aspek | Detail |
|-------|--------|
| **Protocol** | REST API HTTP/JSON (primary), gRPC (jika perlu performance), WebSocket (untuk streaming) |
| **Authentication** | Service account khusus untuk SDSS — JWT bearer token issued by GeoVertix license server |
| **Authorization** | Scoped permissions per plugin (e.g., SDSS hanya boleh akses gxp-mcda compose endpoint, bukan admin endpoint) |
| **Endpoint Pattern** | `https://geovertix-api.bjb.example/api/v1/plugin/<name>/<operation>` |
| **Rate Limiting** | Per service account, configurable (default 100 req/min) |
| **Bridge Adapter di SDSS** | Modul `geovertix_bridge` di backend SDSS — handle: auth refresh, retry/backoff, circuit breaker, response transformation, fallback strategy |
| **Caching** | Aggressive caching di SDSS Redis untuk hasil idempotent (e.g., zonal stats untuk AOI yang sama) |
| **Versioning** | API contract versioning (e.g., `/api/v1/`) dengan deprecation policy |
| **Fallback** | Jika GeoVertix down, SDSS punya fallback: (a) serve cached data, (b) graceful degradation UI, (c) optional in-house fallback algorithms untuk kasus kritis |
| **Audit** | Setiap API call dari SDSS ke GeoVertix dicatat di SDSS audit log (correlation_id, endpoint, latency, status) |
| **Monitoring** | SDSS expose dashboard "GeoVertix Integration Health" — uptime, error rate, p95 latency per plugin |

### 1.4.4 Pola Integrasi per Kapabilitas

Sepanjang dokumen ini (Bagian 2-13), setiap fitur SDSS punya section **"Integrasi dengan GeoVertix"** dengan **5 pola integrasi**:

| Pola | Deskripsi | Contoh Fitur |
|------|-----------|--------------|
| **A. Direct API Reuse** | Kapabilitas hampir 100% ada di GeoVertix. SDSS sekedar wrap UI + call API. | 5.5 MCDA Engine, 5.9 Sensitivity Analyzer, 8.4 Custom Report Builder |
| **B. API + SDSS Extension** | Kapabilitas inti ada, SDSS extend di backend native untuk gap | 2.1 Climate Modeling, 4.7 Carrying Capacity, 6.5 LLM Query |
| **C. Multi-Plugin Orchestration** | SDSS panggil beberapa API GeoVertix dalam satu workflow | 4.1 RDTR Toolbox, 8.1 Interactive Map, 2.6 Flood Modeling |
| **D. Build Native SDSS (with GeoVertix bisa support)** | Kapabilitas dibangun di SDSS, panggil GeoVertix hanya untuk komponen pendukung | 2.3 Carbon, 2.4 Biodiversity, 2.5 SLR |
| **E. Pure Native SDSS** | Tidak ada padanan di GeoVertix, sepenuhnya dibangun di SDSS | 3.2 Dynamic Vulnerability SD, 6.8 Federated Learning, 7.1 Workflow |

### 1.4.5 Pertimbangan Khusus

- **Latency**: API call cross-app ~10-50ms overhead. Mitigasi: caching aggressive, batching, async/streaming untuk long-running.
- **Coupling**: SDSS bergantung pada uptime GeoVertix. Mitigasi: circuit breaker, fallback mode, SLA agreement.
- **Versioning**: GeoVertix plugin upgrade bisa break SDSS integration. Mitigasi: contract testing, pinned versions, deprecation notice.
- **Licensing**: SDSS sebagai API consumer perlu license terms terpisah. Negosiasi dengan tim GeoVertix sebelum production.
- **Data sovereignty**: Data SDSS tetap di database SDSS. Hanya data yang relevan dikirim ke GeoVertix sebagai input compute. Hasil dikembalikan untuk disimpan di SDSS.

### 1.4.6 Manfaat Pendekatan Standalone-with-Integration

| Manfaat | Penjelasan |
|---------|------------|
| **Otonomi penuh** | SDSS punya roadmap, release cycle, branding, governance sendiri |
| **Effort saving 45-55%** | Konsumsi 16/17 plugin GeoVertix existing menghemat ~separuh effort baseline |
| **Fokus tematik** | Tim SDSS fokus develop modul klimat yang spesifik, tidak waste effort di primitive GIS |
| **Time-to-market lebih cepat** | Foundation GIS sudah ada, tinggal build domain logic |
| **Resilience** | SDSS bisa terus operate untuk fitur native meskipun GeoVertix down (degraded mode) |
| **Future flexibility** | Jika GeoVertix tidak lagi cocok di Y3+, SDSS bisa swap implementasi tanpa rewrite |
| **Independent scaling** | Workload SDSS-specific (mis. heavy climate modeling) di-scale di SDSS infra, tidak ganggu GeoVertix |

# BAGIAN 2 — ADVANCED MODELING MODULES (6 Modul)

## FITUR 2.1: Advanced Climate Modeling

### Tujuan Pengembangan
Menyediakan **proyeksi iklim regional terdownscaled** (temperatur, presipitasi, kelembaban, angin) yang menjadi **fondasi** bagi semua modul analitik lain. Tanpa modul ini, modul banjir, kekeringan, kebakaran, kerentanan iklim tidak memiliki driver yang konsisten.

### Landasan TOR
> **Annex 6 §1.3b.1.a:** "*Integration with BMKG's climate projection datasets...; Ensemble modeling approaches combining multiple models to reduce uncertainty; Incorporation of local climate zones and microclimates important in Indonesia's diverse geography*"

Tiga elemen kunci dari TOR yang wajib hadir:
1. Integrasi dengan BMKG RegCM/WRF
2. Ensemble multi-model (CMIP6, CORDEX-SEA)
3. Local Climate Zones (LCZ) — konteks Indonesia archipelagic

### Deskripsi Fungsional
Modul melakukan **statistical downscaling** dari output GCM/RCM ke resolusi yang lebih halus (1-5 km), mengintegrasikan output **dynamical downscaling** dari BMKG, melakukan **bias correction** terhadap observasi historis, dan menghasilkan **ensemble dengan quantification uncertainty**. Khusus untuk Indonesia, modul menambahkan layer **Local Climate Zones (LCZ)** dan microclimate (urban heat island, sea breeze, orographic effect).

### Input Data

| # | Nama Data | Sumber | Format | Resolusi Spasial | Resolusi Temporal | Lisensi | Volume Est. |
|---|-----------|--------|--------|------------------|-------------------|---------|-------------|
| 1 | GCM CMIP6 (multi-model) | ESGF, Copernicus | NetCDF (CF-1.8) | 100-250 km | Monthly/Daily | Open (CC-BY) | ~2 TB/scenario |
| 2 | CORDEX-SEA RCM | CORDEX-SEA portal | NetCDF | 25-50 km | Daily/Hourly | Open | ~500 GB |
| 3 | BMKG RegCM/WRF | BMKG (MoU) | NetCDF/GRIB | 10-25 km | Daily/3-hourly | Restricted | ~300 GB |
| 4 | Observasi stasiun BMKG | BMKG | CSV/API | Point (~120 stasiun) | Hourly/Daily | Restricted | ~50 GB |
| 5 | ERA5 Reanalysis (fallback obs) | Copernicus CDS | NetCDF | 31 km | Hourly | Open (Copernicus) | ~1 TB |
| 6 | DEMNAS (untuk topographic effect) | BIG | GeoTIFF | 8 m | Static | Open BIG | ~30 GB |
| 7 | Land Cover (untuk LCZ derivasi) | Modul 2.2 + KLHK | GeoTIFF | 10-30 m | Annual | Internal/Open | ~20 GB |
| 8 | Urban morphology (untuk UHI) | OpenStreetMap | OSM XML | Vector | Periodic | ODbL | ~5 GB |
| 9 | Sea surface temperature | NOAA, Copernicus | NetCDF | 5-25 km | Daily | Open | ~100 GB |

**Skenario emisi yang harus didukung:** SSP1-2.6, SSP2-4.5, SSP3-7.0, SSP5-8.5 (atau RCP2.6, RCP4.5, RCP6.0, RCP8.5 lama).

### Algoritma & Metode

**1. Statistical Downscaling**
- **Bias Correction & Spatial Disaggregation (BCSD)**: koreksi bias quantile mapping pada skala bulanan, kemudian disaggregasi spasial ke grid halus
- **Empirical Statistical Downscaling (ESD)** menggunakan regresi multivariat
- **Constructed Analog Method** untuk variabel ekstrem
- Persamaan quantile mapping:
  ```
  X_corrected = F_obs^(-1)(F_model(X_model))
  
  dimana F_obs   = CDF observasi historis
         F_model = CDF model historis
         F_obs^(-1) = inverse CDF observasi
  ```

**2. Ensemble Weighting**
- **Skill-based weighting** menggunakan metrik per region:
  ```
  w_i = (1/RMSE_i) / Σ(1/RMSE_j)  untuk model i dalam region
  ```
- **Bayesian Model Averaging (BMA)** untuk integrasi prior expert
- Output: ensemble mean ± spread (= 1 sigma uncertainty)

**3. Local Climate Zones (LCZ)**
- Klasifikasi 17 kelas LCZ Stewart-Oke (2012) berbasis citra Landsat/Sentinel
- Random Forest classifier dengan training dari WUDAPT
- LCZ-specific temperature adjustment (offset per kelas)

**4. Microclimate Adjustments**
- **Urban Heat Island (UHI):** ΔT_UHI = f(building density, impervious surface, vegetation index) — model statistik atau ML (Lin et al. 2016)
- **Sea breeze / land breeze:** WRF-LES untuk pesisir tertentu
- **Orographic precipitation enhancement:** P_enhanced = P_base × (1 + α × slope) dengan kalibrasi BMKG

**5. Uncertainty Quantification**
- Monte Carlo sampling dari distribusi parameter
- Output sebagai ensemble percentile (5th, 25th, 50th, 75th, 95th)

### Output

| Variabel | Unit | Resolusi Spasial | Resolusi Temporal | Format | Periode Proyeksi |
|----------|------|------------------|-------------------|--------|------------------|
| Temperatur 2m | °C | 1 km (urban), 5 km (rural) | Daily | NetCDF + COG | 2025-2100 |
| Presipitasi | mm/day | 1-5 km | Daily | NetCDF + COG | 2025-2100 |
| Kelembaban relatif | % | 5 km | Daily | NetCDF | 2025-2100 |
| Kecepatan angin (10m) | m/s | 5 km | Daily | NetCDF | 2025-2100 |
| Radiasi surya | W/m² | 5 km | Daily | NetCDF | 2025-2100 |
| LCZ classification map | kategori 1-17 | 100 m | Static (update 5-yr) | GeoTIFF | Current + Future |
| Extreme indices (Rx5day, TXx, etc.) | berbagai | 5 km | Annual | NetCDF | 2025-2100 |
| Uncertainty layer (ensemble spread) | unit variabel | 5 km | Annual/Decadal | NetCDF | 2025-2100 |

**Periode snapshot proyeksi standar:** 2030, 2040, 2050, 2070, 2100.

### Detail UI/UX

**Tata letak halaman "Climate Modeling Explorer":**

```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo] SDSS Climate Action ▼ Modul: Advanced Climate Modeling      [User]│
├─────────────────────────────────────────────────────────────────────────┤
│ ┌─ KONTROL PARAMETER ───┐ ┌─ PETA INTERAKTIF ──────────────────────────┐│
│ │ Variabel:             │ │                                            ││
│ │ ◉ Temperatur          │ │     [PETA TILE INDONESIA / WILAYAH]        ││
│ │ ○ Presipitasi         │ │                                            ││
│ │ ○ Angin               │ │     Layer aktif: Temp Mean 2050 SSP2-4.5   ││
│ │ ○ Kelembaban          │ │                                            ││
│ │ ○ Indeks Ekstrem ▼    │ │     [Layer panel di kanan untuk overlay]   ││
│ │                       │ │                                            ││
│ │ Skenario Emisi:       │ │     ▒░░░░ Color scale: 24°C ─── 38°C ▒░░░  ││
│ │ ◉ SSP1-2.6 (Mitigasi) │ │                                            ││
│ │ ○ SSP2-4.5 (Tengah)   │ │     [Bookmark wilayah favorit]             ││
│ │ ○ SSP3-7.0            │ │                                            ││
│ │ ○ SSP5-8.5 (BAU)      │ └────────────────────────────────────────────┘│
│ │                       │ ┌─ KONTROL WAKTU & ENSEMBLE ────────────────┐│
│ │ Periode Proyeksi:     │ │                                            ││
│ │ ┌──────────────┐      │ │ Tahun: [── 2025 ◄═══════ 2050 ═══► 2100]   ││
│ │ │ Baseline:    │      │ │                                            ││
│ │ │ 1991-2020    │      │ │ Tampilkan: ◉ Ensemble Mean                ││
│ │ └──────────────┘      │ │            ○ Anggota individu (n=15)      ││
│ │ ┌──────────────┐      │ │            ○ Uncertainty (5%-95% band)    ││
│ │ │ Target:      │      │ │            ○ Signal-to-noise              ││
│ │ │ 2050 ▼       │      │ │                                            ││
│ │ └──────────────┘      │ │ Statistical aggregation: ◉ Mean            ││
│ │                       │ │                          ○ Min/Max         ││
│ │ Wilayah Fokus:        │ │                          ○ Persentil      ││
│ │ ┌──────────────┐      │ │                                            ││
│ │ │ Banten ▼     │      │ │ Sub-modul lanjutan:                        ││
│ │ │ Provinsi/    │      │ │   □ Aktifkan LCZ overlay                   ││
│ │ │ Kab-Kota/    │      │ │   □ Aktifkan microclimate (UHI)            ││
│ │ │ Kustom       │      │ │   □ Compare baseline vs target             ││
│ │ │ poligon      │      │ │                                            ││
│ │ └──────────────┘      │ └────────────────────────────────────────────┘│
│ │                       │                                                │
│ │ [▶ Jalankan Analisis] │                                                │
│ │ [⤓ Export NetCDF]    │                                                │
│ │ [📊 Grafik Time-      │                                                │
│ │     Series]           │                                                │
│ └───────────────────────┘                                                │
└─────────────────────────────────────────────────────────────────────────┘
```

**Komponen UI utama:**

| Komponen | Fungsi | Behavior |
|----------|--------|----------|
| Map canvas (MapLibre GL) | Tampilan utama raster temp/precip | Pan/Zoom, click for point query, hover untuk nilai |
| Variable picker | Pilih variabel iklim | Radio button; ubah → fetch ulang tile |
| Scenario picker | Pilih emisi pathway | Radio button + tooltip penjelasan |
| Year time-slider | Pilih tahun proyeksi | Smooth animation antar tahun; play button |
| Ensemble toggle | Mean vs anggota vs uncertainty | Mengubah tampilan peta |
| LCZ overlay | Show LCZ classification | Overlay semi-transparan |
| Compare mode | Side-by-side baseline vs proyeksi | Split-screen sync map |
| Time-series chart | Grafik nilai variabel di titik klik | Modal/sidebar; line chart dengan band uncertainty |
| Export | Download data | Format: NetCDF, COG, CSV (untuk titik), PNG (peta) |

**Interaksi penting:**
- Klik titik di peta → popup nilai + grafik time-series 1981–2100
- Hover daerah → tooltip nilai aktual
- Bookmark wilayah → save view config untuk akses cepat berikutnya
- Compare 2 scenarios → split-screen synced pan/zoom

### Flow Fitur

```
[USER]
  │ 1. Pilih variabel, skenario, periode, wilayah
  ▼
[FRONTEND]
  │ 2. POST /api/v1/climate/query
  │    body: {variable, scenario, period, region_geojson}
  ▼
[API GATEWAY → climate-model-service]
  │ 3. Validate input, check cache
  ▼
        ┌─ CACHE HIT? ─ yes ─► return tile URL ─►─┐
        │                                          │
        no                                          │
        │                                          │
        ▼                                          │
[PROCESSING PIPELINE]                              │
  │ 4. Identifikasi grid sel dari region          │
  │ 5. Query NetCDF storage (xarray + Dask)        │
  │ 6. Apply downscaling jika perlu                │
  │ 7. Apply LCZ adjustment jika diaktifkan        │
  │ 8. Apply microclimate adjustment               │
  │ 9. Compute ensemble statistic                  │
  │ 10. Tile rendering (COG generation)            │
  │ 11. Cache hasil di Redis (TTL 24 jam)          │
  ▼                                                 │
[RESPONSE] ────────────────────────────────────────┘
  │ 12. Return: {tile_url, summary_stats, citation}
  ▼
[FRONTEND]
  │ 13. Update map dengan tile, update charts
  ▼
[USER MELIHAT HASIL]
  │ 14. Klik titik → /api/v1/climate/timeseries?lat=&lon=
  ▼
[POINT QUERY]
  │ 15. Return time-series array
```

### Dependencies

**Modul Internal (consumer):**
- 2.2 LULC Change Detection (untuk derivasi LCZ)
- 2.3 Carbon Footprint (driver untuk emisi sektor)
- 2.6 Flood & Drought (presipitasi sebagai driver)
- 3.1 Vulnerability (komponen hazard)
- 4.X semua modul specialized

**Sistem Eksternal:**
- ESGF (CMIP6)
- Copernicus CDS (ERA5, CORDEX)
- BMKG (RegCM/WRF, observasi stasiun)
- NOAA (SST)

**Library/Tools:**
- xarray, dask, netCDF4, h5py, zarr
- cdo (Climate Data Operators)
- pyresample (regridding)
- scikit-downscale, climate-indices
- ML: scikit-learn (untuk LCZ classifier)

**Infrastruktur:**
- Object Storage (NetCDF besar)
- PostGIS Raster (metadata + small grids)
- Compute: K8s job untuk processing batch
- GPU node (opsional untuk percepatan downscaling besar)

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Latency tile cached | < 200 ms p95 |
| Latency tile baru (downscaling job) | < 30 detik untuk wilayah provinsi |
| Throughput | 100 concurrent map view |
| Akurasi (RMSE temperatur) | < 1.5°C |
| Akurasi (precipitation bias) | -20% s/d +20% |
| Update data baru BMKG | Otomatis bulanan |
| Storage retention | 25 tahun rolling (proyeksi 2025-2100 dihitung sekali, observasi 25 thn berjalan) |

### Validasi & QA

1. **Hindcasting:** evaluasi model 1981-2020 vs observasi (lihat Bagian 11)
2. **Cross-validation per provinsi:** train pada 18 provinsi, test pada 1
3. **Expert panel:** review oleh BMKG-Pusat Penelitian, BRIN-OR Iklim
4. **Metrik:** RMSE, MAE, R², Continuous Ranked Probability Score (CRPS)
5. **Statistical tests:** Mann-Kendall trend, Spearman correlation

### Akses Per Tier User

| Tier | Akses |
|------|-------|
| **Government Full** | Semua variabel, semua skenario, raw data, export raster, run custom downscaling |
| **Researcher (akademisi)** | Sama dengan Govt Full + API sandbox + custom region tinggi-resolusi |
| **Private (Some)** | Semua variabel & skenario read-only, export terbatas (PNG), watermark |
| **Public** | Variabel utama (suhu, hujan), 4 skenario standar, agregasi tingkat kabupaten saja, no raw download |

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend Plugin Existing  
**Coverage dari GeoVertix:** 60%  
**Estimasi Effort Saving:** 60%  
**Prioritas:** TINGGI (foundation untuk hampir semua modul tematik lain)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-climate | 19235 | NetCDF/GRIB ingest, zonal statistics per AOI, anomaly vs baseline (1981-2010), Mann-Kendall trend, time-aggregation (hourly→annual), multi-model ensemble averaging | Extend + API call ke GeoVertix |
| gxp-qgis | 19245 | 248 native algos + 57 GDAL untuk terrain analysis (slope, aspect, hillshade, NDVI), interpolation IDW/TIN untuk spatial gap-filling | API call ke GeoVertix sebagai pendukung |
| gxp-ml | 19240 | Container Python untuk run custom downscaling scripts; integrate xarray + scikit-downscale | API call ke GeoVertix + tambah scripts |

#### Metode Integrasi
gxp-climate sudah memiliki **5 dari 6 algoritma inti TOR §1.3b.1.a**: NetCDF processing, ensemble averaging, anomaly computation, trend analysis, time-aggregation. SDSS modul 2.1 cukup **extend plugin ini** dengan menambahkan:
1. **Statistical downscaling pipeline** sebagai script Python baru (di gxp-ml atau extend gxp-climate dengan handler baru): BCSD (Bias Correction & Spatial Disaggregation), ESD (Empirical Statistical Downscaling), Constructed Analog Method.
2. **LCZ Classifier** sebagai ONNX model deployed ke gxp-inference (Random Forest pre-trained dengan WUDAPT data).
3. **Microclimate adjustment layer** sebagai wrapper service yang invoke gxp-qgis untuk terrain features + gxp-climate untuk base data.
4. **Multi-scenario SSP runner** sebagai workflow orchestration di SDSS Application Core (DAG dari multiple gxp-climate calls per skenario × periode).

#### Komponen yang Dimanfaatkan Langsung
- NetCDF/GRIB I/O pipeline (xarray-equivalent sudah ready)
- Zonal statistics per polygon
- Anomaly vs baseline (mekanisme sudah ada — tinggal set baseline 1981-2010)
- Mann-Kendall trend test
- Multi-model ensemble averaging (skill-based weighting tinggal config)
- COG output sebagai standard
- Layer registration di geovertix.layers

#### Yang Perlu DIBANGUN BARU/Extension
- **Statistical downscaling library** (Python): bcsd, esd, constructed-analog (~3-4 minggu dev)
- **Local Climate Zone (LCZ) classifier** ONNX model: training data WUDAPT-Indonesia (~6-8 minggu dengan training time)
- **Urban Heat Island (UHI) adjustment** model statistik (~2 minggu)
- **Multi-scenario orchestration** di SDSS Application Core (~2 minggu)
- Frontend Climate Modeling Explorer (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **TIDAK ADA fundamental gap** — gxp-climate adalah golden match. Extension natural.
- **MoU dengan BMKG** wajib untuk akses RegCM/WRF (restricted data) — koordinasi diperlukan.
- Data volume tinggi: 2 TB/scenario CMIP6 + 500 GB CORDEX. Harus pertimbangkan storage strategy (gxp-climate sudah pakai S3-compat).
- Performance: jangan run heavy downscaling per request — pre-compute via Airflow scheduled jobs.

#### Action Items
1. Konfirmasi dengan tim Pengembang GeoVertix GeoVertix terkait extension gxp-climate (vs build separate plugin)
2. Negotiate MoU dengan BMKG untuk RegCM/WRF data sharing
3. Acquire/train LCZ ONNX model
4. Sprint 0: install xarray, scikit-downscale di gxp-ml container


---

## FITUR 2.2: Land Use / Land Cover (LULC) Change Detection

### Tujuan Pengembangan
Memantau perubahan tutupan/penggunaan lahan multi-temporal untuk:
1. **Perhitungan emisi sektor LULUCF** (input ke 2.3 Carbon)
2. **Deteksi deforestasi & degradasi** sebagai sinyal early warning REDD+
3. **Analisis dampak ekosistem** (input ke 2.4 Biodiversity)
4. **Proyeksi tutupan lahan ke depan** untuk perencanaan RDTR

### Landasan TOR
> **Annex 6 §1.3b.1.b:** "*Integration of Multi-Temporal Satellite Imagery; Machine Learning-Based Land Classification and Change Detection; Linking LCLUC to Carbon and Ecosystem Service Impact Models*"

> **§1.3d:** "*Land Cover and Land Use Change Analysis: AI and machine learning algorithms can analyze satellite imagery...*"

Tiga elemen wajib dari TOR:
1. Multi-temporal satellite (Landsat, Sentinel)
2. ML/DL classification
3. **Cross-module linking ke Carbon & Ecosystem Service Impact**

### Deskripsi Fungsional
Modul mengakuisisi citra optik multi-temporal, melakukan **klasifikasi LULC** menggunakan **Random Forest** dan **deep learning (U-Net/DeepLabV3+)**, melakukan **change detection** antara dua atau lebih periode, melakukan **proyeksi LULC** ke depan menggunakan **CA-Markov**, dan **menyalurkan output ke modul Carbon dan Biodiversity** via internal API/event stream.

### Input Data

| # | Nama Data | Sumber | Format | Resolusi Spasial | Frekuensi | Lisensi | Volume Est. |
|---|-----------|--------|--------|------------------|-----------|---------|-------------|
| 1 | Landsat 8/9 Collection 2 | USGS Earth Explorer / GEE | GeoTIFF / Cloud | 30 m | 16 hari | Public Domain | ~1 TB/tahun Indonesia |
| 2 | Sentinel-2 Level 2A | ESA Copernicus / GEE | JPEG2000 / COG | 10 m (vis), 20 m (SWIR) | 5 hari (combined S2A+S2B) | Open (Copernicus) | ~5 TB/tahun |
| 3 | Sentinel-1 SAR (cloud overcome) | ESA Copernicus | GeoTIFF | 10 m | 6-12 hari | Open | ~3 TB/tahun |
| 4 | PlanetScope (komersial opsional) | Planet Labs | GeoTIFF | 3-5 m | Daily | Komersial | Variable |
| 5 | LULC eksisting KLHK | KLHK SIGN-SMART | Shapefile/GeoTIFF | 1:50K, 1:250K | Annual | Open BIG | ~2 GB |
| 6 | Peta RBI BIG | BIG One Map | Shapefile | 1:5K, 1:25K, 1:50K | Periodic | Open BIG | ~50 GB |
| 7 | DEM (untuk normalisasi terrain) | DEMNAS, SRTM | GeoTIFF | 8-30 m | Static | Open | ~30 GB |
| 8 | Training sample (ground truth) | Walidata + survey | Shapefile/GeoJSON | Point/Polygon | Annual | Internal | ~500 MB |

**Kelas LULC standar yang harus diklasifikasi (mengikuti SNI 7645:2014 dan ekspansi):**
1. Hutan primer
2. Hutan sekunder
3. Hutan tanaman (HTI)
4. Mangrove
5. Lahan gambut bervegetasi
6. Sawah
7. Tegalan/Ladang
8. Perkebunan kelapa sawit
9. Perkebunan karet
10. Perkebunan lain
11. Pemukiman urban padat
12. Pemukiman urban jarang
13. Industri
14. Lahan terbuka
15. Pertambangan
16. Badan air
17. Tambak
18. Rawa
19. Padang rumput / savana
20. Awan (mask)

### Algoritma & Metode

**1. Pre-processing**
- **Atmospheric correction:** sudah dilakukan oleh Sentinel-2 L2A; untuk Landsat: LaSRC
- **Cloud masking:** Fmask 4.x untuk Landsat; SCL band untuk Sentinel-2
- **Cloud gap filling:** harmonic-fit time-series + Sentinel-1 SAR sebagai backup ketika optik berawan
- **Topographic correction:** Sun-Canopy-Sensor (SCS+C) menggunakan DEM
- **Co-registration:** sub-pixel akurasi (RMSE < 0.5 pixel)

**2. Feature Engineering**
Per piksel, hitung:
- Reflectance per band (6-13 band)
- Indeks vegetasi: NDVI, EVI, SAVI, NDMI, NBR
- Indeks air: NDWI, MNDWI
- Indeks lahan terbuka: BSI, NDBI
- Texture (GLCM): contrast, dissimilarity, homogeneity
- Temporal: mean, std, max, min, range NDVI/EVI per tahun
- Phenological metrics: start-of-season, peak, end-of-season (TIMESAT)
- Terrain: elevation, slope, aspect dari DEM

**3. Klasifikasi Per-Pixel (Random Forest)**
- 200-500 trees, depth = 15-30
- Class balancing dengan SMOTE atau stratified sampling
- Feature importance via Gini

**4. Klasifikasi Spasial (Deep Learning)**
- **U-Net** untuk segmentasi piksel-ke-piksel dengan konteks spasial
- **DeepLabV3+** dengan backbone ResNet-50/101 untuk akurasi lebih tinggi
- **Mask R-CNN** untuk deteksi instance (mis. perkebunan individual)
- Training:
  - Patch size: 256×256 atau 512×512
  - Augmentation: flip, rotate, brightness, mixup
  - Loss: Categorical Cross-Entropy + Dice Loss
  - Optimizer: AdamW, lr=1e-4 dengan cosine annealing
  - Hardware: GPU node (NVIDIA A100 atau setara) — 1 epoch full Indonesia ~6-12 jam

**5. Post-processing**
- Majority filter (5×5) untuk smooth boundary
- Minimum mapping unit (MMU) per kelas
- Topological cleanup

**6. Change Detection**
- **Per-pixel post-classification comparison** (PCC): T1 class vs T2 class → transition matrix
- **Continuous Change Detection and Classification (CCDC)** untuk deteksi sub-tahunan
- **Change Vector Analysis (CVA)** untuk magnitude perubahan
- **BFAST (Breaks for Additive Season and Trend)** untuk deteksi anomali jangka panjang

**7. Proyeksi LULC**
- **CA-Markov** (Cellular Automata × Markov chain) menggunakan IDRISI/MOLUSCE-style
- **SimWeight** untuk weighted transition rules
- **LandSimR / FLUS model** untuk konstrain pengaruh lingkungan
- Input transition: historical T1→T2 matrix; spatial drivers (slope, distance to road, distance to settlement, RDTR existing)
- Output: peta LULC proyeksi 2030, 2040, 2050 (per skenario emisi)

**8. Linking ke Modul Lain**
Setelah klasifikasi & change detection selesai:
- Event publish ke Kafka topic `lulc.classified`, `lulc.changed`
- Carbon module subscribe, hitung emisi LUCF perubahan
- Biodiversity module subscribe, recalculate habitat connectivity

### Output

| Layer/Produk | Format | Resolusi | Periode | Atribut |
|-------------|--------|----------|---------|---------|
| LULC annual map | COG | 10-30 m | 2014–sekarang annual | class_id, class_name, confidence |
| Change map (per pair tahun) | COG | 10-30 m | T1→T2 | from_class, to_class, magnitude |
| Transition matrix | CSV/JSON | Per region | Per pair | area (ha) per from-to combination |
| Proyeksi LULC 2030/2050 | COG | 30 m | Future | class_id, probability per skenario |
| Forest cover change | GeoJSON | Polygon | Annual | gain_ha, loss_ha, net_ha |
| Hotspot deforestasi | GeoJSON | Polygon | Annual | severity score |
| Phenology metrics | NetCDF | 10 m | Annual | SOS, peak, EOS, GUR |
| Classification accuracy | JSON | Per region | Per run | OA, Kappa, F1-per-class, confusion matrix |

**Akurasi target:**
- Overall Accuracy ≥ 85%
- Kappa ≥ 0.8
- Per-class F1 ≥ 0.75 untuk kelas dominan

### Detail UI/UX

**Halaman "LULC Explorer":**

```
┌────────────────────────────────────────────────────────────────────────┐
│ Modul: LULC Change Detection                                  [User ▼] │
├────────────────────────────────────────────────────────────────────────┤
│ ┌── PERIODE & WILAYAH ──┐ ┌── PETA UTAMA ─────────────────────────────┐│
│ │ Tahun Awal: 2015 ▼    │ │  [Peta dengan layer LULC 2015 + 2024]     ││
│ │ Tahun Akhir: 2024 ▼   │ │                                            ││
│ │                       │ │     Mode tampilan:                        ││
│ │ Mode:                 │ │     ◉ Single year     ○ Side-by-side     ││
│ │ ◉ Classification      │ │     ○ Swipe compare   ○ Animation        ││
│ │ ○ Change Detection    │ │                                            ││
│ │ ○ Projection          │ │     Legenda kelas: [klik kelas → highlight]││
│ │                       │ │     ▓ Hutan primer (12.3%)                 ││
│ │ Wilayah:              │ │     ▒ Hutan sekunder (8.1%)                ││
│ │ Kabupaten Sintang ▼   │ │     ▒ Perkebunan sawit (15.2%) ← LOSS     ││
│ │                       │ │     ░ Lahan terbuka (3.5%)                 ││
│ │ Kelas Fokus:          │ │     ...                                    ││
│ │ ☑ Hutan primer        │ │                                            ││
│ │ ☑ Hutan sekunder      │ └────────────────────────────────────────────┘│
│ │ ☑ Sawit (perubahan)   │ ┌── SANKEY DIAGRAM TRANSISI ────────────────┐│
│ │ ☐ Sawah               │ │                                            ││
│ │ ☐ ...                 │ │     2015                       2024        ││
│ │                       │ │     ━━━━━━━━━━━━━━╗     ╔━━━━━━━━━━━━━━━━ ││
│ │ Skenario Proyeksi:    │ │     Hutan primer  ║━━━━━║ Hutan primer    ││
│ │ ○ Trend (historical)  │ │     35%           ║  60%║ 21%             ││
│ │ ○ RPJMD-compliant     │ │                   ║━━━━━║ Sawit (new!) 5% ││
│ │ ○ Aggressive forest   │ │     Hutan sek.    ║━━━━━║ Hutan sek. 26%  ││
│ │   protection          │ │     28%           ║━━━━━║ Sawit (new) 2%  ││
│ │                       │ │                                            ││
│ │ [▶ Jalankan Analisis] │ │  Filter: ☑ Hanya transisi >1% [Reset]     ││
│ │ [⤓ Export]           │ └────────────────────────────────────────────┘│
│ └───────────────────────┘                                                │
│                                                                          │
│ ┌── STATISTIK & METRIK ──────────────────────────────────────────────┐  │
│ │ Total area: 21,635 km²                                             │  │
│ │ Forest loss 2015-2024: 87,400 ha (15.8% dari hutan primer)         │  │
│ │ Drivers utama (heuristic): Perkebunan sawit (+15.2%), Pemukiman    │  │
│ │ Annual deforestation rate: 0.92%/year                              │  │
│ │ Carbon impact: ~12.3 MtCO₂ released (cross-link → Modul Carbon →)  │  │
│ │ Biodiversity impact: 8 koridor terancam (cross-link → Modul        │  │
│ │ Biodiversity →)                                                    │  │
│ └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

**Fitur UI khas:**
- **Swipe compare**: slider horizontal menggeser antara peta T1 dan T2
- **Time-lapse animation**: tombol play menampilkan animasi 2014→2024
- **Sankey diagram**: transisi antar kelas (klik flow untuk drill-down)
- **Cross-module link**: klik "Carbon impact" → navigasi ke modul Carbon dengan konteks otomatis
- **Drawing tool**: gambar AOI custom → analisis hanya untuk poligon tersebut
- **Driver attribution**: peta hotspot perubahan disertai analisis driver (proximity ke jalan, RDTR, dll)

### Flow Fitur

```
═════════════════════════════════════════════════════════════════════
PIPELINE 1: KLASIFIKASI BATCH (Scheduled, mingguan/bulanan)
═════════════════════════════════════════════════════════════════════
[AIRFLOW SCHEDULE]
  │ Trigger: setiap Senin 02:00 WIB
  ▼
[CITRA INGESTION]
  │ Download Sentinel-2/Landsat overpass minggu lalu via GEE/Copernicus
  ▼
[PRE-PROCESSING]
  │ Atmospheric, cloud mask, mosaicking, co-registration
  ▼
[FEATURE EXTRACTION]
  │ Bands, indices, texture, temporal stats
  ▼
[INFERENCE]
  │ Random Forest + DL ensemble (rolling tile-based)
  │ Output: LULC raster patch
  ▼
[POST-PROCESSING]
  │ Filter, smoothing, MMU
  ▼
[STORAGE]
  │ Save COG ke MinIO, metadata ke PostGIS
  ▼
[EVENT PUBLISH]
  │ Kafka topic: lulc.classified.v1
  │ Payload: {region_id, year, version, accuracy, classes_summary}

═════════════════════════════════════════════════════════════════════
PIPELINE 2: USER QUERY (On-demand)
═════════════════════════════════════════════════════════════════════
[USER]
  │ Pilih region + tahun + mode
  ▼
[FRONTEND]
  │ GET /api/v1/lulc/classification?region=...&year=...
  ▼
[API: lulc-service]
  │ Query PostGIS untuk metadata
  │ Return tile URL (vector tiles via Tegola atau raster COG)
  ▼
[USER MELIHAT]
  │ Pilih "Change Detection" mode
  │ POST /api/v1/lulc/change body: {region, t1, t2}
  ▼
[CHANGE COMPUTATION]
  │ Lazy compute jika belum ada di cache:
  │   - Load LULC T1, T2
  │   - Compute transition matrix
  │   - Generate change layer
  ▼
[RESPONSE]
  │ {transition_matrix, change_tile_url, hotspot_geojson,
  │  cross_links: {carbon: ..., biodiversity: ...}}
  ▼
[FRONTEND]
  │ Render Sankey + change map + statistics
```

### Dependencies

**Modul Internal (downstream consumer):**
- 2.3 Carbon Footprint (subscribe `lulc.changed` event)
- 2.4 Biodiversity (subscribe untuk habitat update)
- 3.1 Vulnerability (LC sebagai input)
- 4.1 Spatial Planning (LC sebagai dasar suitability)
- 4.4 Forest Fire (vegetasi sebagai fuel layer)
- 4.7 Carrying Capacity (LC sebagai feature)

**Modul Internal (upstream):**
- 2.1 Climate Modeling (Local Climate Zone input untuk klasifikasi urban)

**Sistem Eksternal:**
- Google Earth Engine API (catalog satelit)
- Copernicus Data Space Ecosystem
- USGS Earth Explorer
- KLHK SIGN-SMART (validation crosscheck)

**Library/Tools:**
- earthengine-api (Python)
- rasterio, geopandas, xarray-spatial
- scikit-learn (RF)
- PyTorch + TorchGeo + Raster Vision
- TIMESAT atau phenor (phenology)
- moluscepy / pyLandStats (CA-Markov)

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Latency tile query (cached) | < 200 ms p95 |
| Latency klasifikasi region baru (provinsi) | < 3 menit |
| Throughput inferensi | 1000 km²/menit (DL GPU) |
| Storage growth | ~5 TB/tahun |
| Akurasi OA | ≥ 85% |
| Update otomatis | Mingguan untuk Sentinel-2, dwi-mingguan Landsat |
| Latensi data baru | < 7 hari dari overpass |

### Validasi & QA

1. **Confusion matrix** dengan ground truth dari walidata
2. **Cross-validation** geographic (provinsi-out)
3. **Visual interpretation** sampling stratified
4. **Comparison** dengan produk KLHK & global (Hansen Forest Cover, ESA WorldCover)
5. **Time-series consistency check** (transisi tidak masuk akal → flag untuk review)

### Akses Per Tier User

| Tier | Akses |
|------|-------|
| Government Full | Semua tahun, semua kelas, raw raster, change matrix, run custom AOI |
| Researcher | Sama + API + training data sample |
| Private Some | Kelas standar, peta tampil, export PNG (low-res), tidak raster |
| Public | Visualisasi peta dengan kelas dasar (5 kelas), kabupaten-level only |

### Integrasi dengan GeoVertix

**Status Integrasi:** Hybrid (Extend Plugin + Train Custom Models)  
**Coverage dari GeoVertix:** 65%  
**Estimasi Effort Saving:** 65%  
**Prioritas:** TINGGI (driver untuk Carbon, Biodiv, Vulnerability, RDTR)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-inference | 19210 | **lulc-unet** (5-class U-Net ONNX, deployed) untuk semantic segmentation; tile-based sliding window dengan batch=4; auto-reload models | Integrasi via API GeoVertix |
| gxp-ml | 19240 | **classify_landuse.py** (Random Forest scikit-learn) self-describing schema; **change_detection.py**; container Python isolation | Integrasi via API GeoVertix + tambah scripts |
| gxp-qgis | 19245 | NDVI/focal stats (raster analysis), polygonize (raster→vector), morphological filter | API call ke GeoVertix sebagai helper |
| gxp-geoprocess | 19215 | Clip per region, dissolve, post-processing topology | API call ke GeoVertix sebagai cleanup |

#### Metode Integrasi
SDSS Modul 2.2 punya **pipeline ganda** yang dapat langsung di-leverage:
1. **Per-pixel RF classification** → gunakan `gxp-ml::classify_landuse.py` (sudah deploy dengan schema params: raster_layer_id, training_layer_id, class_field, n_estimators, band_selection)
2. **Spatial DL segmentation** → gunakan `gxp-inference::lulc-unet` untuk 5-kelas dasar, lalu **train custom models** untuk 20 kelas SNI 7645:2014 (deploy ke `gxp-inference::models/`)
3. **Change detection** → `gxp-ml::change_detection.py` sudah ada, perlu konfirmasi algoritma (TBD per dokumen)
4. **LULC projection (CA-Markov)** → script baru di gxp-ml: `project_lulc_camarkov.py`
5. **Cross-module event linking** → SDSS SDSS Application Core subscribe ke event stream dari gxp-ml output (publish ke Kafka `lulc.classified.v1`)

#### Komponen yang Dimanfaatkan Langsung
- ONNX runtime infrastructure (tile-based, NMS post-process)
- Random Forest classification (scikit-learn) pipeline
- Python container isolation untuk ML scripts
- COG output format
- Layer registration ke gisdata
- NDVI computation (gxp-qgis)
- Topology cleanup (gxp-geoprocess)

#### Yang Perlu DIBANGUN BARU/Extension
- **20-class SNI LULC ONNX model** (deeplabv3+, mask r-cnn): training data + train time ~8-12 minggu
- **Sentinel-1 SAR backup pipeline** untuk cloud-overcome: script di gxp-ml
- **CCDC / BFAST temporal analysis** scripts (~3-4 minggu)
- **CA-Markov projection** module (~3 minggu)
- **Phenology metrics (TIMESAT)** integration (~2 minggu)
- **Cross-module event publisher** (Kafka producer wrapper)
- Frontend LULC Explorer (~3 minggu, termasuk Sankey diagram)

#### Pertimbangan Khusus & Risiko
- **Training data quality**: ground truth walidata dari KLHK dibutuhkan; quality bisa menjadi bottleneck.
- **Akurasi target OA >= 85%** menantang untuk 20 kelas. Mungkin perlu hierarchical classification (5 kelas dulu, lalu sub-class).
- gxp-inference saat ini CPU-only (default_device="cpu"). Untuk training/heavy inference perlu GPU node terpisah.
- Citra hi-res (Pleiades, WorldView) komersial — anggaran lisensi tambahan.

#### Action Items
1. Verifikasi parameter schema lulc-unet model — apakah accept tambahan band Sentinel-2 vs hanya RGB?
2. Koordinasi dengan KLHK untuk dataset training Indonesia SNI 7645
3. Provision GPU node untuk training (NVIDIA A100 atau setara)
4. Deploy event streaming infra (Kafka) untuk cross-module linking


---

## FITUR 2.3: Net Carbon Footprint Monitoring

### Tujuan Pengembangan
Mengukur **emisi-serapan GHG net per wilayah** dengan resolusi spasial-temporal yang relevan untuk:
1. **Pelaporan NDC** Indonesia (target 31.89% unconditional, 43.20% conditional pada 2030)
2. **Evaluasi keberhasilan kebijakan** mitigasi tingkat daerah
3. **Carbon neutrality gap analysis** menuju Net Zero 2060
4. **Dasar perdagangan karbon** (Indonesia FOLU Net Sink, perdagangan emisi)

### Landasan TOR
> **§1.3b.1.c:** "*Sector-Wide Carbon Accounting Models...; AI-Powered Emission Estimation Using Proxy and Observational Data (nighttime lights, NO₂ concentrations, vehicle counts); Geospatial Visualization and Decision Support Tools (interactive dashboards, scenario analysis untuk carbon neutrality goals)*"

> **§1.3d:** "*Carbon Footprint Monitoring: AI-powered systems can calculate and track carbon emissions at various scales*"

### Deskripsi Fungsional
Modul menghitung emisi GHG dari semua sektor (energi, transportasi, AFOLU, industri, limbah) dan serapan dari sink (hutan, mangrove, gambut). Menggunakan **kombinasi inventarisasi top-down** (mengikuti IPCC 2006/2019 refinement) dan **estimasi AI berbasis proxy** untuk area dengan data terbatas. Hasil divisualisasikan spasial dan temporal, mendukung **skenario reduksi**.

### Input Data

| # | Nama Data | Sumber | Format | Frekuensi | Cakupan |
|---|-----------|--------|--------|-----------|---------|
| 1 | LULC + Change (Modul 2.2) | Internal | COG | Annual | Semua Indonesia |
| 2 | Carbon stock per kelas | KLHK, BRIN, IPCC | CSV/Lookup | Periodic | Per kelas LC |
| 3 | Konsumsi energi sektoral | Kementerian ESDM, PLN | CSV/API | Annual/Monthly | Nasional + provinsi |
| 4 | Data transportasi (vehicle reg, fuel) | Kemenhub, BPS | CSV | Annual | Provinsi/kab |
| 5 | Data pertanian (luas tanam, ternak, pupuk) | Kementan | CSV/API | Annual | Kab-kota |
| 6 | Data industri (kapasitas, jenis) | Kemenperin, KLHK | CSV | Annual | Per-industri |
| 7 | Data limbah (volume, TPA) | KLHK, Pemda | CSV | Annual | Kab-kota |
| 8 | NO₂ kolom troposfer | Sentinel-5P TROPOMI | NetCDF/COG | Daily | Global |
| 9 | Nighttime lights | VIIRS Day-Night Band | GeoTIFF | Monthly | Global |
| 10 | Vehicle counts proxy | Computer vision dari citra, OSM road density | Various | Annual | Urban |
| 11 | Methane plumes | Sentinel-5P, MethaneSat | NetCDF | Daily | Hotspot |
| 12 | Fire emissions (GFED) | NASA GFED | NetCDF | Monthly | Global |
| 13 | Soil organic carbon | SoilGrids 2.0 | GeoTIFF | Static | Global |
| 14 | Mangrove extent | Global Mangrove Watch | GeoTIFF | Annual | Pesisir |
| 15 | Lahan gambut | KLHK (peta gambut nasional) | Shapefile | Periodic | Sumatra, Kalimantan, Papua |

### Algoritma & Metode

**1. Tier 1-2-3 IPCC Methodology**
- **Tier 1:** default emission factors IPCC × activity data nasional
- **Tier 2:** country-specific emission factors (KLHK 2016, dll)
- **Tier 3:** model-based atau pengukuran langsung (untuk sektor besar)

**2. Sektor-Specific Calculation**

*Sektor Energi (CO₂, CH₄, N₂O):*
```
Emisi = Σ(Aktivitas × Emission Factor × GWP)

Contoh listrik:
  E_CO2 = generation_MWh × EF_CO2_per_MWh
  EF tergantung mix grid (PLN per region)
```

*Sektor LUCF (CO₂):*
```
ΔC = Σ(Area_transisi × ΔCarbon_stock × 44/12)

Misal hutan→sawit: ΔC = area × (C_hutan - C_sawit) × 44/12
```

*Sektor Limbah (CH₄):*
- FOD model (First Order Decay) untuk landfill
- IPCC 2019 untuk wastewater

*Pertanian (CH₄, N₂O):*
- Sawah: CH₄ emission factor × luas tanam × seasonal scaling factor
- Ternak: enteric fermentation per spesies × populasi
- Fertilizer: N₂O = N_applied × EF1 (1%)

**3. AI Spatial Allocation**
- **Dasymetric mapping**: distribusikan emisi nasional/provinsi ke grid 1km menggunakan proxy:
  - Nighttime lights → proxy industri & komersial
  - Populasi (BPS gridded) → proxy domestik
  - Road density → proxy transportasi
  - LC → proxy agrikultur
- **Random Forest regression** untuk weighting proxy
- **Spatial CNN** untuk capture spatial pattern

**4. AI Proxy Estimation (untuk daerah data terbatas)**
- **NO₂ TROPOMI → NOx emisi**: regresi (Beirle et al. 2019 approach)
- **Nighttime lights → CO₂ proxy**: kalibrasi dengan kabupaten yang memiliki data lengkap, ekstrapolasi
- **Methane plumes detection**: deep learning untuk identifikasi sumber spesifik (landfill, oil & gas)
- **Fire emissions**: integrasi GFED + Indonesia-specific peat factor

**5. Serapan (Sequestration)**
- **Hutan**: biomass × 0.47 × stock change (carbon)
- **Mangrove**: above + below ground + soil carbon
- **Gambut**: emisi/serapan tergantung kondisi (drained vs intact)
- **Soil organic carbon dynamics**: RothC atau Century model

**6. Net Carbon Footprint**
```
Net = Emisi total - Serapan total

Per wilayah administrasi:
  Net_kabupaten = ΣEmisi_sektor - ΣSerapan_ekosistem
```

**7. Scenario Reduction**
- User input: target reduksi % per sektor
- Sistem hitung: peta dampak, sektor yang harus dipotong, infeasibility check
- Marginal Abatement Cost Curve (MACC) generation

### Output

| Output | Format | Resolusi | Atribut |
|--------|--------|----------|---------|
| Peta emisi sektoral | COG | 1 km | MtCO₂eq/year, sektor |
| Peta serapan | COG | 1 km | MtCO₂eq/year sequestered |
| Net Carbon footprint per administrasi | GeoJSON | Polygon | net_MtCO2_per_year, per_capita |
| Time-series emisi nasional/provinsi | JSON/CSV | Annual | Per sektor |
| Trajectory vs target NDC | Chart data | Annual | Actual vs NDC commitment |
| MACC | CSV/Chart | Per intervensi | cost_per_tonCO2, potential_reduction |
| Methane hotspot detection | GeoJSON | Point | location, strength, source_type |

### Detail UI/UX

**Halaman "Carbon Dashboard":**

```
┌────────────────────────────────────────────────────────────────────────┐
│ Modul: Net Carbon Footprint                                  [User ▼]  │
├────────────────────────────────────────────────────────────────────────┤
│ ┌── FILTER ─────────────┐ ┌── KPI CARDS ──────────────────────────────┐│
│ │ Wilayah: Indonesia ▼  │ │ ┌─────────┐┌──────────┐┌──────────┐       ││
│ │ Tahun: 2024 ▼         │ │ │ Emisi   ││ Serapan  ││ Net      │       ││
│ │ Sektor:               │ │ │ 1,452   ││  -832    ││  +620    │       ││
│ │ ☑ Energi              │ │ │ MtCO₂eq ││ MtCO₂eq  ││ MtCO₂eq  │       ││
│ │ ☑ Transportasi        │ │ │ ▲ +2.1% ││ ▼ -0.8%  ││ ▲ +3.2%  │       ││
│ │ ☑ AFOLU               │ │ │ vs 2023 ││ vs 2023  ││ vs 2023  │       ││
│ │ ☑ Industri            │ │ └─────────┘└──────────┘└──────────┘       ││
│ │ ☑ Limbah              │ │                                            ││
│ │                       │ │ ┌─────────┐┌──────────┐                   ││
│ │ Tier:                 │ │ │ Per     ││ NDC      │                   ││
│ │ ◉ Tier 2 (country)    │ │ │ Capita  ││ Target   │                   ││
│ │ ○ Tier 3 (advanced)   │ │ │ 2.28    ││ Gap:     │                   ││
│ │                       │ │ │ tCO₂/   ││ -184     │                   ││
│ │ [▶ Update]            │ │ │ jiwa    ││ MtCO₂eq  │                   ││
│ │ [⤓ NDC Report]       │ │ └─────────┘└──────────┘                   ││
│ │                       │ └────────────────────────────────────────────┘│
│ │                       │ ┌── PETA EMISI SPASIAL ──────────────────────┐│
│ │                       │ │                                            ││
│ │                       │ │   [Peta Indonesia heatmap emisi sektoral]  ││
│ │                       │ │                                            ││
│ │                       │ │   Toggle layer:                            ││
│ │                       │ │   ◉ Total net  ○ Energi  ○ AFOLU  ...     ││
│ │                       │ │                                            ││
│ │                       │ │   Methane hotspots: ● ● ● [klik → detail]  ││
│ │                       │ └────────────────────────────────────────────┘│
│ └───────────────────────┘                                                │
│ ┌── TREND TIME-SERIES & NDC TRAJECTORY ─────────────────────────────┐  │
│ │                                                                    │  │
│ │  Emisi (MtCO₂eq)                                                   │  │
│ │  ▲                                                                 │  │
│ │  │   Aktual                            ╭── BAU                     │  │
│ │  │   ●─●─●─●─●─●─●─●  Now                ╰──── 2030                │  │
│ │  │                    ╲                                            │  │
│ │  │                     ╲     ─ ─ ─ NDC unconditional               │  │
│ │  │                      ╲ ─                                        │  │
│ │  │                       ╲── ─ ── ─ NDC conditional                │  │
│ │  │                                                                 │  │
│ │  │                                                                 │  │
│ │  └───────────────────────────────────────►                         │  │
│ │   2010  2015  2020  2024  2025  2030  Year                         │  │
│ │                                                                    │  │
│ └────────────────────────────────────────────────────────────────────┘  │
│ ┌── SCENARIO BUILDER: "WHAT-IF" REDUCTION ──────────────────────────┐  │
│ │ Target reduksi per sektor:                                         │  │
│ │   Energi:        ──[████░░░]─ 25% [slider]                         │  │
│ │   Transport:     ──[██░░░░░]─ 15% [slider]                         │  │
│ │   AFOLU:         ──[██████░]─ 40% [slider]                         │  │
│ │   Industri:      ──[███░░░░]─ 20% [slider]                         │  │
│ │   Limbah:        ──[█████░░]─ 30% [slider]                         │  │
│ │                                                                    │  │
│ │ Total reduksi composite: 27.3% (target NDC: 31.89%)                │  │
│ │ Gap: -84 MtCO₂eq                                                   │  │
│ │ Biaya estimasi (MACC): IDR 142 Triliun                             │  │
│ │                                                                    │  │
│ │ [▶ Simulate Map Impact]  [Save Scenario]  [→ MCDA Compare]         │  │
│ └────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur

```
═════════════════════════════════════════════════════════════════════
PIPELINE 1: ANNUAL CARBON INVENTORY (Batch Annual)
═════════════════════════════════════════════════════════════════════
[AIRFLOW: setiap awal tahun]
  │ Trigger: 1 Januari (data tahun sebelumnya)
  ▼
[INGEST AKTIVITAS DATA]
  │ Kemenhub, PLN, Kementan, KLHK, BPS
  ▼
[INGEST PROXY DATA]
  │ NO₂ TROPOMI, VIIRS NTL, fire detections
  ▼
[INGEST LULC]
  │ Subscribe lulc.classified event tahun lalu
  ▼
[COMPUTE EMISI SEKTORAL]
  │ Apply IPCC Tier-2 formulas per sektor
  ▼
[SPATIAL ALLOCATION (AI)]
  │ Dasymetric + RF regression dengan proxy
  ▼
[COMPUTE SEQUESTRATION]
  │ LC stock change × biomass model
  ▼
[NET CARBON]
  │ Emission - Sequestration per grid & per administrasi
  ▼
[VALIDATION & QC]
  │ Compare nasional total vs Inventarisasi GRK KLHK
  │ Flag anomali (delta > 15% YoY)
  ▼
[STORAGE]
  │ COG layer, GeoJSON administratif, time-series DB
  ▼
[EVENT PUBLISH]
  │ Kafka: carbon.inventory.completed
  │ Notify subscriber (RAN GRK reporting, RDTR module)

═════════════════════════════════════════════════════════════════════
PIPELINE 2: SCENARIO ANALYSIS (Interactive)
═════════════════════════════════════════════════════════════════════
[USER]
  │ Adjust reduction sliders per sektor
  ▼
[FRONTEND]
  │ POST /api/v1/carbon/scenario {reduction_targets}
  ▼
[SCENARIO ENGINE]
  │ 1. Apply % reduction to current emisi per sektor
  │ 2. Re-allocate spatially (proportional)
  │ 3. Compute composite reduction
  │ 4. Compare to NDC target
  │ 5. Estimate cost (lookup MACC database)
  ▼
[RESPONSE]
  │ {new_emission_map, kpi_summary, ndc_gap, cost_estimate}
  ▼
[FRONTEND]
  │ Update peta + KPI cards + chart
  │ Persist sebagai scenario (call ke Scenario Manager 5.2)
```

### Dependencies

**Modul Internal:**
- 2.2 LULC (driver utama untuk AFOLU)
- 2.1 Climate Modeling (suhu untuk anaerobic decomposition rate)
- 4.4 Forest Fire (untuk emisi kebakaran)
- 5.2 Scenario Manager (untuk simpan scenario)
- 5.10 Optimization Solver (untuk solve reduction allocation)

**Sistem Eksternal:**
- KLHK SIGN-SMART (validasi)
- BPS (data populasi gridded)
- Sentinel-5P (NO₂, CH₄)
- VIIRS DNB

**Library:**
- pyIPCC (jika tersedia), atau custom
- earthengine-api
- xarray, scipy, scikit-learn
- climateanalytics-style libraries

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Akurasi nasional total vs Inventarisasi GRK KLHK | ±10% |
| Update frekuensi | Annual + monthly preview |
| Spatial resolution | 1 km grid |
| Latency scenario simulation | < 5 detik |
| Data lineage | Lengkap (semua emisi traceable ke sumber) |

### Validasi & QA

1. Cross-check nasional dengan **Inventarisasi GRK KLHK**
2. Verification dengan **Indonesia 4th Biennial Update Report**
3. Methane plume verification dengan field/proxy
4. Expert review oleh KLHK Ditjen PPI, BRIN

### Akses Per Tier User

| Tier | Akses |
|------|-------|
| Government Full | Semua sektor, semua tier, raw data, scenario builder |
| Researcher | Sama + API + MACC database |
| Private Some | Visualisasi nasional + provinsi, no kab/kota detail |
| Public | Nasional total + NDC progress (read-only chart) |


### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Carbon Footprint SDSS) + Leverage Plugins Pendukung  
**Coverage dari GeoVertix:** 15%  
**Estimasi Effort Saving:** 25%  
**Prioritas:** TINGGI (NDC compliance Indonesia)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-climate | 19235 | NetCDF ingest untuk TROPOMI NO2, methane plumes; zonal aggregation per administrasi | API call ke GeoVertix sebagai data ingest |
| gxp-ml | 19240 | **predict_values.py** (XGBoost regression) untuk spatial allocation; **interpolate.py** (IDW/Kriging) | API call ke GeoVertix untuk dasymetric |
| gxp-inference | 19210 | Methane plume detection (perlu train custom U-Net) | API call ke GeoVertix untuk anomaly visual |
| gxp-areainfo | 19285 | Per-administrasi summarization (kab/kota → provinsi → nasional) | API call ke GeoVertix untuk aggregation |
| gxp-geoprocess | 19215 | Polygon overlay untuk allocation | API call ke GeoVertix |

#### Metode Integrasi
Carbon footprint adalah domain **baru** yang tidak ada di GeoVertix existing. Bangun **Modul Carbon Footprint SDSS** sebagai modul native di backend SDSS** dengan capability:
1. Ingest aktivitas data (PLN, Kemenhub, Kementan, KLHK) via custom handlers
2. Apply IPCC Tier 1-2-3 formulas (database lookup emission factors)
3. Compute serapan/sequestration dari LC output (subscribe ke event `lulc.classified.v1` dari gxp-ml)
4. **API call ke GeoVertix gxp-ml::predict_values.py** untuk spatial allocation dengan proxy (XGBoost regression)
5. **API call ke GeoVertix gxp-climate** untuk ingest TROPOMI NO2 dan VIIRS Nighttime Lights (NetCDF)
6. **API call ke GeoVertix gxp-areainfo** untuk roll-up per administrasi
7. Output: Net Carbon per kab + COG layers + NDC trajectory chart data

#### Komponen yang Dimanfaatkan Langsung
- NetCDF ingestion (gxp-climate)
- XGBoost regression infrastructure (gxp-ml::predict_values)
- Spatial interpolation IDW/Kriging (gxp-ml::interpolate)
- AOI aggregation (gxp-areainfo)
- Layer registration

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Carbon Footprint SDSS** sebagai modul native dengan schema sdss_carbon.* (schema internal SDSS)
- IPCC Tier 1-2-3 formulas database (emission factors, GWP, country-specific) (~3 minggu)
- Sektor-specific handlers: Energi, LUCF, Limbah, Pertanian, Industri, Transportasi (~6 minggu)
- NDC trajectory tracker logic + KLHK Inventarisasi GRK comparison (~2 minggu)
- MACC (Marginal Abatement Cost Curve) generator (~3 minggu)
- Scenario reduction simulator (~3 minggu)
- Frontend Carbon Dashboard (~4 minggu)

#### Pertimbangan Khusus & Risiko
- **Data agreement** dengan KLHK untuk Inventarisasi GRK existing — wajib koordinasi.
- **Validasi nasional total** harus dalam ±10% dari KLHK official number — high accountability.
- Methane plume detection memerlukan **Sentinel-5P data** — kebutuhan storage tambahan ~500 GB/yr.
- Cross-validation dengan **Indonesia 4th Biennial Update Report** dibutuhkan.

#### Action Items
1. Propose ke tim Pengembang GeoVertix GeoVertix untuk register **Modul Carbon Footprint SDSS** di JWT license
2. Negotiate dengan KLHK Ditjen PPI untuk data sharing Inventarisasi GRK
3. Sprint awal: build emission factor database (IPCC default + country-specific)
4. Subscribe ke event `lulc.classified.v1` untuk auto-recompute sequestration


---

---

## FITUR 2.4: Biodiversity Mapping (with Citizen Science)

### Tujuan Pengembangan
Memetakan **kekayaan dan kerentanan biodiversitas** Indonesia (megabiodiversity country) untuk:
1. **Identifikasi koridor ekologis** untuk konservasi
2. **Proyeksi habitat shift** akibat perubahan iklim
3. **Prioritas kawasan konservasi** yang harus dilindungi
4. **Validasi & enrichment data** via citizen science (sesuai mandat TOR)

### Landasan TOR
> **§1.3b.1.d:** "*Species Distribution Modeling with Ecological and Climatic Variables; High-Resolution Habitat and Ecosystem Mapping (UAV, high-res satellites, deep learning); **Integration with Biodiversity Monitoring Networks and Citizen Science** (link biodiversity maps with field data and citizen-science platforms to validate models, monitor changes in species richness, support community-based conservation)*"

**Catatan revisi:** Sub-poin "Citizen Science integration" diabaikan di katalog sebelumnya — sekarang ditambahkan eksplisit.

### Deskripsi Fungsional
Modul menyediakan **species distribution modeling (SDM)** dengan MaxEnt dan ensemble, **habitat segmentation** dari high-resolution imagery, **connectivity analysis** untuk koridor, dan **citizen science portal** untuk submission observasi oleh publik/komunitas yang divalidasi sebelum integrasi.

### Input Data

| # | Nama Data | Sumber | Format | Cakupan | Note |
|---|-----------|--------|--------|---------|------|
| 1 | Occurrence records (global) | GBIF API | DwC-A | Indonesia | ~5 jt records ID |
| 2 | Occurrence records (lokal) | BRIN, LIPI, herbarium | CSV/DB | Indonesia | National |
| 3 | IUCN Red List | IUCN API | JSON | Per spesies | Status konservasi |
| 4 | CITES Appendices | CITES | CSV | Per spesies | Trade restriction |
| 5 | Kawasan Konservasi | KLHK | Shapefile | Nasional | Boundary KK |
| 6 | Citra UAV/drone | Survey lapangan, mitra | TIFF/JPEG | Selective | High-res sample |
| 7 | Pleiades / WorldView (komersial opsional) | Vendor | TIFF | Hotspot | Sub-meter |
| 8 | Sentinel-2 (untuk habitat luas) | ESA | COG | Indonesia | 10m |
| 9 | Climate layers | Modul 2.1 | NetCDF | Indonesia | Variabel |
| 10 | Topographic (DEM, slope, aspect) | DEMNAS | GeoTIFF | Indonesia | 8m |
| 11 | LC (Modul 2.2) | Internal | COG | Indonesia | 10m |
| 12 | **Citizen science submissions** | Internal portal (iNaturalist-style) | Internal | User-generated | Validation queue |
| 13 | iNaturalist API (eksternal) | iNaturalist | JSON | Indonesia | Research-grade observations |

### Algoritma & Metode

**1. Species Distribution Modeling (SDM)**

*MaxEnt:*
- Maximum entropy approach untuk presence-only data
- Features: bioclimatic variables (BIO1-BIO19), terrain, LC
- Regularization (β) tuning per spesies
- Output: continuous habitat suitability 0-1

*Ensemble SDM:*
- MaxEnt + Random Forest + Boosted Regression Trees + GAM
- Weighted ensemble berdasarkan AUC TSS per algoritma
- Mengurangi bias single-algorithm

**2. Habitat Segmentation (Deep Learning)**

*Untuk UAV/Pleiades:*
- U-Net dengan backbone EfficientNet-B4
- Class: hutan tutupan rapat, terbuka, semak, kanopi tinggi/rendah, vegetasi rusak, air, dll
- Training dengan masking manual dari ahli ekologi
- Transfer learning dari ImageNet → fine-tune Indonesia ekosistem

**3. Habitat Connectivity Analysis**

*Algoritma:*
- **Circuitscape** (electric circuit theory) untuk multi-path connectivity
- **Graph-based**: nodes = habitat patches, edges = passability
- **Cost-distance**: based on resistance surface (LC, slope, road density)
- **Linkage Mapper** untuk identify least-cost paths

*Output:*
- Koridor utama (high-conductance corridors)
- Bottlenecks (jika hilang → disconnection)
- Stepping stones

**4. Climate Envelope & Habitat Shift**

*Approach:*
- Train SDM pada climate baseline (1981-2020)
- Predict untuk future climate (2030, 2050, 2070 per skenario)
- Compare baseline vs future → range shift (kontraksi/ekspansi)
- Identify climate refugia (stable habitat under future climate)

**5. Citizen Science Validation Pipeline**

```
[Public submits observation: photo + location + species ID claim]
  │
  ▼
[Auto-validation layer]
  │ - GPS accuracy check
  │ - Photo quality assessment (CNN classifier)
  │ - Species range plausibility check (within known range?)
  │ - Duplicate detection (close to existing submission?)
  ▼
[ML pre-screening]
  │ - ImageNet-style classifier untuk konfirmasi spesies
  │ - Confidence score; if < 0.7 → reject auto
  ▼
[Expert validation queue]
  │ Domain experts (BRIN, akademisi) review
  ▼
[Verified] → integrated to database; user gets credit, gamification
[Rejected] → user notified with reason, can resubmit
```

### Output

| Output | Format | Resolusi |
|--------|--------|----------|
| Peta distribusi spesies prioritas (per spesies) | COG | 1 km |
| Peta ensemble biodiversity hotspot | COG | 1 km |
| Habitat segmentation (UAV) | Vector (GeoJSON) | sub-meter |
| Koridor ekologis | Vector | Variable |
| Habitat shift projection | COG | 1 km, per period |
| Priority conservation areas | GeoJSON | Polygon |
| Citizen observation database | GeoJSON | Point |

### Detail UI/UX

**Halaman "Biodiversity Explorer":**

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Biodiversity Mapping                              [User ▼]  │
├────────────────────────────────────────────────────────────────────┤
│ ┌── PENCARIAN ─────────┐ ┌── PETA DISTRIBUSI ────────────────────┐│
│ │ Cari spesies:        │ │                                        ││
│ │ [_orangutan_____🔍_] │ │   [Peta dengan suitability habitat]    ││
│ │                      │ │                                        ││
│ │ Atau filter:         │ │   ▓▓ Sangat sesuai                     ││
│ │ Taxa: Mamalia ▼      │ │   ▒▒ Sesuai                            ││
│ │ Status: ☑ Endemik    │ │   ░░ Marginal                          ││
│ │        ☑ Terancam    │ │                                        ││
│ │        ☐ CITES App   │ │   ● Citizen obs (verified)             ││
│ │                      │ │   ○ Citizen obs (pending)              ││
│ │ Tampilan Layer:      │ │   ✕ GBIF record                        ││
│ │ ☑ Habitat current    │ │                                        ││
│ │ ☑ Habitat 2050       │ │   Koridor (toggle):                    ││
│ │ ☑ Citizen obs        │ │   ━━━━━ Koridor primer                 ││
│ │ ☐ Kawasan konservasi │ │   ─ ─ ─ Koridor sekunder               ││
│ │ ☑ Koridor ekologis   │ │                                        ││
│ │ ☐ Klimat refugia     │ └────────────────────────────────────────┘│
│ │                      │ ┌── DETAIL SPESIES TERPILIH ────────────┐│
│ │ Periode proyeksi:    │ │ 🐒 Pongo pygmaeus (Orangutan Borneo)   ││
│ │ ◉ Current (1981-2020)│ │ Status IUCN: Critically Endangered    ││
│ │ ○ 2050 SSP2-4.5      │ │ Status nasional: Dilindungi (UU 5/90) ││
│ │ ○ 2070 SSP2-4.5      │ │ Habitat suitability nasional: 23,400 km││
│ │                      │ │   2050: -28% (proyeksi)                ││
│ │ [Refresh Peta]       │ │ Endemik: Kalimantan                    ││
│ │ [Add to Comparison]  │ │ Threat: Deforestasi, perdagangan        ││
│ │                      │ │                                        ││
│ │                      │ │ Rekomendasi konservasi:                ││
│ │                      │ │ [Hubungkan ke Modul 4.1 Spatial Plan]  ││
│ │                      │ └────────────────────────────────────────┘│
│ └──────────────────────┘                                            │
│ ┌── PORTAL CITIZEN SCIENCE ─────────────────────────────────────┐  │
│ │ [📷 Upload Observasi]  [📋 Riwayat Saya]  [🏆 Leaderboard]    │  │
│ │                                                                │  │
│ │ Submit baru:                                                   │  │
│ │ ┌──────────────┐  Lokasi: [auto GPS]                          │  │
│ │ │ [Drop photo] │  Spesies (auto-suggest dari foto): ...        │  │
│ │ │     atau     │  Catatan: ____________________               │  │
│ │ │ [Klik upload]│                                                │  │
│ │ └──────────────┘  [Submit untuk validasi]                      │  │
│ │                                                                │  │
│ │ Status submission Anda:                                        │  │
│ │ ● Verified (12)  ◐ Pending (3)  ○ Rejected (1)                │  │
│ └────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur

```
═════════════════════════════════════════════════════════════════════
PIPELINE 1: SDM TRAINING (Batch periodic)
═════════════════════════════════════════════════════════════════════
[AIRFLOW: bulanan untuk update SDM]
  │
  ▼
[INGEST OBSERVATIONS]
  │ GBIF + BRIN + iNaturalist + citizen science verified
  ▼
[DATA CLEANING]
  │ Outlier removal, taxonomic harmonization (CoL)
  ▼
[FEATURE ASSEMBLY]
  │ Climate (Modul 2.1), terrain, LC (Modul 2.2)
  ▼
[TRAIN SDM ENSEMBLE]
  │ MaxEnt + RF + BRT + GAM
  ▼
[VALIDATION]
  │ k-fold CV, AUC, TSS, Boyce Index
  ▼
[PROJECT TO FUTURE CLIMATE]
  │ For each scenario × period
  ▼
[GENERATE OUTPUT LAYERS]
  │ Current habitat, future habitat, shift maps
  ▼
[CONNECTIVITY ANALYSIS]
  │ Circuitscape over habitat suitability
  ▼
[STORE & PUBLISH]

═════════════════════════════════════════════════════════════════════
PIPELINE 2: CITIZEN SCIENCE SUBMISSION
═════════════════════════════════════════════════════════════════════
[USER MOBILE/WEB]
  │ Upload photo, GPS, species claim
  ▼
[FRONTEND]
  │ POST /api/v1/biodiv/citsci/submit
  ▼
[CITSCI-SERVICE]
  │ 1. EXIF check (GPS, timestamp)
  │ 2. Photo quality CNN (blurry? low light?)
  │ 3. Species classifier CNN (top-5 prediction)
  │ 4. Range plausibility check
  │ 5. Duplicate near-by detection
  ▼
[QUEUE TO EXPERT]
  │ Add to validation queue with auto-score
  ▼
[EXPERT REVIEW (async)]
  │ Verified / Rejected with reason
  ▼
[NOTIFICATION]
  │ User notified; gamification points awarded
  ▼
[IF VERIFIED]
  │ Add to canonical database
  │ Used in next SDM retraining
```

### Dependencies

**Modul Internal:** 2.1 Climate, 2.2 LULC, 4.1 Spatial Planning (untuk koridor in RDTR)

**Sistem Eksternal:** GBIF, IUCN, CITES, iNaturalist (federated), KLHK (kawasan konservasi)

**Library:** maxent (or maxnet R), biomod2 (jika R-bridge), Circuitscape, scikit-learn, PyTorch

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Latency map query | < 500 ms |
| SDM accuracy (AUC) | ≥ 0.80 per spesies prioritas |
| Citizen science validation turn-around | < 7 hari |
| Spesies prioritas tercover | Minimal 200 spesies (endemik + terancam) |

### Validasi & QA
- Field validation oleh BRIN dan akademisi
- Cross-check dengan IUCN range maps
- Expert review per spesies prioritas

### Akses Per Tier User
| Tier | Akses |
|------|-------|
| Government Full | Semua spesies, semua periode, raw + API |
| Researcher | Sama + sandbox SDM training |
| Private Some | Spesies non-sensitif, peta tampil |
| Public | Spesies umum + portal citizen science (kontribusi & lihat verified) |

**Catatan privasi:** lokasi spesies sangat terancam dikaburkan (10 km grid) untuk Public tier — anti-poaching.

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Biodiversity SDSS) + Leverage Plugins Pendukung  
**Coverage dari GeoVertix:** 20%  
**Estimasi Effort Saving:** 25%  
**Prioritas:** SEDANG (Indonesia megabiodiversity, namun bukan critical path Y1)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-ml | 19240 | **cluster_points.py** (KMeans/DBSCAN) untuk biodiversity hotspot clustering; **interpolate.py** untuk habitat suitability surface | API call ke GeoVertix |
| gxp-inference | 19210 | **yolov8-buildings** sebagai foundation untuk train custom habitat segmentation model (33 classes existing termasuk forest, meadow, mountain) | API call ke GeoVertix + train custom |
| gxp-qgis | 19245 | KDE Heatmap untuk species density; Distance matrix; raster terrain (slope, aspect) sebagai SDM features | API call ke GeoVertix sebagai feature pipeline |
| gxp-areainfo | 19285 | AOI summary untuk priority conservation area scoring | API call ke GeoVertix |
| gxp-geoprocess | 19215 | Buffer kawasan konservasi, intersect dengan koridor | API call ke GeoVertix |

#### Metode Integrasi
Bangun **Modul Biodiversity SDSS** sebagai modul native di backend SDSS** untuk Species Distribution Modeling (SDM), karena ini adalah domain spesifik yang tidak ada di GeoVertix:
1. SDM ensemble (MaxEnt + RF + BRT + GAM) sebagai scripts Python di Modul Biodiversity SDSS (bukan gxp-ml — dipisah karena schema isolated)
2. **API call ke GeoVertix gxp-ml::cluster_points.py** untuk hotspot detection
3. **API call ke GeoVertix gxp-qgis::KDE Heatmap** untuk species density surface
4. **API call ke GeoVertix gxp-inference** dengan custom UAV/Pleiades segmentation model
5. **Citizen Science portal** sebagai sub-component dengan upload + validation pipeline (CNN classifier untuk auto-screening)
6. Cross-module: subscribe ke `lulc.classified.v1` untuk re-trigger habitat connectivity recompute

#### Komponen yang Dimanfaatkan Langsung
- KMeans/DBSCAN clustering (gxp-ml)
- KDE heatmap (gxp-qgis)
- AOI summary mechanism (gxp-areainfo)
- Buffer/intersect primitives (gxp-geoprocess)
- ONNX runtime (gxp-inference) untuk custom habitat model

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Biodiversity SDSS plugin** dengan schema sdss_biodiversity.*
- MaxEnt SDM implementation (Python: maxnet atau biomod2 R-bridge) (~4 minggu)
- Ensemble SDM (RF, BRT, GAM) (~3 minggu)
- Habitat connectivity analysis (Circuitscape, NetworkX graph) (~3 minggu)
- Climate envelope projection (per scenario × period) (~2 minggu)
- **Citizen Science portal** (web + mobile PWA): submission, validation queue, expert review (~6-8 minggu)
- Auto-validation CNN: photo quality, species classifier, range plausibility (~4 minggu)
- Frontend Biodiversity Explorer dengan filter taxa (~4 minggu)
- Privacy layer untuk spesies terancam (lokasi blurred) (~1 minggu)

#### Pertimbangan Khusus & Risiko
- **Citizen science memerlukan governance & moderation** — perlu sukarelawan expert dari BRIN/akademisi.
- **Privacy anti-poaching**: lokasi spesies kritis HARUS dikaburkan untuk Public tier — design ABAC dengan spatial scope filter.
- iNaturalist sebagai federated source untuk avoid duplikasi effort.
- SDM training data dari GBIF (~5 juta records ID) butuh data cleaning intensif.

#### Action Items
1. Koordinasi dengan BRIN OR Hayati untuk training data dan validation
2. Setup federated link ke iNaturalist API
3. Design ABAC privacy scope per spesies sensitivity level
4. Sprint Y2-Q1: develop SDM ensemble pipeline


---

## FITUR 2.5: Sea Level Rise & Land Subsidence Monitoring

### Tujuan Pengembangan
Memantau dan memproyeksikan **dua proses gerakan vertikal pesisir** yang krusial bagi Indonesia (panjang pantai ~108,000 km, banyak kota pesisir mengalami subsidence parah seperti Jakarta, Semarang, Pekalongan):
1. **Sea Level Rise (SLR)** — kenaikan permukaan laut global+regional
2. **Land Subsidence** — penurunan tanah lokal (ekstraksi air tanah, konsolidasi)

Output adalah **Relative SLR** = SLR + Subsidence yang merupakan ancaman riil bagi infrastruktur dan populasi.

### Landasan TOR
> **§1.3b.1.e:** "*Satellite Altimetry and Tide Gauge Data Fusion; InSAR and GNSS for Land Subsidence Monitoring; Coastal Vulnerability Assessment Integrating Physical and Socioeconomic Factors*"

### Deskripsi Fungsional
Modul mengkombinasikan **satelit altimetri** untuk SLR regional, **tide gauge** untuk validasi lokal, **InSAR (PS-InSAR/SBAS)** untuk subsidence mm/tahun, **GNSS CORS** untuk vertical land motion absolut, dan **shoreline analysis** dari citra optik. Output meliputi peta inundasi proyeksi, coastal vulnerability index, dan trend analysis per kota pesisir.

### Input Data

| # | Nama Data | Sumber | Format | Resolusi | Note |
|---|-----------|--------|--------|----------|------|
| 1 | Satellite altimetry | Sentinel-3, Jason-3/CS, SARAL | NetCDF | 5-25 km grid | Open Copernicus/NASA |
| 2 | Tide gauge | BIG (PASUT), PUSHIDROSAL, UHSLC | CSV/API | Point (~50 stasiun) | Quality-controlled |
| 3 | Sentinel-1 SAR (untuk InSAR) | ESA | SLC | 5×20 m | Ascending + Descending |
| 4 | GNSS CORS data | BIG InaCORS | RINEX | Point (~200 stasiun) | Continuous, mm precision |
| 5 | DEM tinggi resolusi | LiDAR (kota-kota pesisir), DEMNAS 8m | LAS/GeoTIFF | <1m (LiDAR), 8m | Untuk inundasi |
| 6 | Citra optik (shoreline) | Sentinel-2, Landsat | COG | 10-30 m | Tinggi tide saat akuisisi |
| 7 | Bathymetry | BIG, GEBCO | NetCDF | 100m-1km | Pesisir |
| 8 | Tide model (untuk normalisasi) | FES2014, TPXO | NetCDF | Global | Untuk koreksi tide saat akuisisi |
| 9 | Atmospheric (untuk InSAR correction) | ERA5, GACOS | NetCDF | Regional | Phase correction |
| 10 | Asset & populasi pesisir (exposure) | BPS, OSM | Vector | Variable | Untuk CVI |
| 11 | Future SLR scenarios | IPCC AR6 SROCC, Local studies | NetCDF | Global+local | RCP/SSP |

### Algoritma & Metode

**1. Sea Level Trend Analysis (Altimetry)**

```
SLR_trend = linear_fit(timeseries) with:
  - GIA correction (Glacial Isostatic Adjustment) — ~0.3 mm/yr Indonesia
  - Atmospheric pressure (inverse barometer)
  - Seasonal cycle removal
  - Output: trend per region in mm/year
```

Indonesia-specific value: SLR rate ~3.6-4.2 mm/year (2010s), but regional variation.

**2. Tide Gauge Trend (Validation)**

```
SLR_local = trend(tide_gauge) - VLM (Vertical Land Motion from GNSS)

Karena tide gauge mengukur sea + land movement, perlu dikurangi VLM untuk dapat true SLR.
```

**3. Land Subsidence — PS-InSAR (Persistent Scatterer)**

*Pipeline:*
- Co-register Sentinel-1 SLC time-series (≥ 30 acquisitions)
- Generate interferograms (master-slave pairs)
- Identify persistent scatterers (bangunan, rock outcrop) dengan amplitude stability
- Phase unwrapping (SNAPHU)
- Atmospheric correction (GACOS)
- Time-series inversion → mm/year displacement
- Output: point cloud dengan velocity per PS

**4. Land Subsidence — SBAS-InSAR (Small Baseline)**

*Untuk area pertanian/non-urban:*
- Small baseline pairs (~< 200 m, < 100 hari)
- Reduce decorrelation
- Smoother time-series
- Higher density tetapi noise lebih besar dari PS

**5. GNSS-Anchored Calibration**

- GNSS CORS BIG menyediakan absolute vertical velocity di point
- Calibrate InSAR (relative) → InSAR absolute dengan referensi GNSS
- Improved accuracy untuk regional comparison

**6. Shoreline Change Detection**

- Multi-temporal Sentinel-2/Landsat
- Tide normalization (correct shoreline ke MSL)
- Edge detection (DSAS-style atau ML)
- Compute erosion/accretion rate per transect

**7. Relative SLR Projection**

```
RSL(year, scenario) = SLR_global(year, scenario) + 
                       SLR_regional_offset + 
                       Subsidence_local(year) +
                       Steric_anomaly

Implementasi: 
  RSL projection grid 100m menggunakan IPCC AR6 SROCC + local subsidence dari InSAR
```

**8. Coastal Vulnerability Index (CVI)**

```
CVI = √[(a × b × c × d × e × f) / 6]

dimana:
  a = geomorphology score
  b = coastal slope
  c = relative sea level change
  d = shoreline erosion rate
  e = mean tidal range
  f = mean wave height
```

Adaptasi: tambahkan layer sosioekonomi (densitas penduduk, aset, infrastruktur kritis) untuk **Socio-economic Coastal Vulnerability Index (SCVI)**.

**9. Inundation Mapping**

- Bathtub model (sederhana): all cells below RSL + tide threshold
- Hydraulically connected (advanced): hanya yang connected ke laut via flow path
- Output per skenario × period × tide level

### Output

| Output | Format | Resolusi | Period |
|--------|--------|----------|--------|
| SLR trend per region | GeoJSON polygon | Regional | Annual update |
| Subsidence velocity map (PS-InSAR) | Point cloud + interpolated raster | Point + 100m | Monthly update |
| Subsidence velocity (SBAS) | Raster COG | 30-100m | Monthly |
| RSL projection | NetCDF/COG | 100m | 2030, 2050, 2070, 2100 |
| Inundation map per skenario | COG | 30m | Per period |
| Coastal Vulnerability Index | GeoJSON | Per segment ~1km | Annual |
| Shoreline change | Vector | Per transect | Annual |
| Time-series per tide gauge | JSON/CSV | Point | Daily/Monthly |

### Detail UI/UX

**Halaman "Coastal & SLR Explorer":**

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Sea Level Rise & Land Subsidence              [User ▼]      │
├────────────────────────────────────────────────────────────────────┤
│ ┌── KONTROL ────────────┐ ┌── PETA WILAYAH PESISIR ──────────────┐│
│ │ Wilayah:              │ │                                       ││
│ │ Kota Semarang ▼       │ │  [Peta zoom Semarang dengan layer]    ││
│ │                       │ │                                       ││
│ │ Layer aktif:          │ │   ▓ Inundasi 2050 (SSP5-8.5)         ││
│ │ ☑ SLR (regional)      │ │   ● Tide gauge stations               ││
│ │ ☑ Subsidence          │ │   ▲ GNSS CORS                         ││
│ │ ☑ Inundasi proyeksi   │ │   ░ Subsidence (color: mm/yr)         ││
│ │ ☑ Tide gauges         │ │                                       ││
│ │ ☑ GNSS stations       │ │  Klik titik → time-series             ││
│ │ ☐ CVI                 │ │                                       ││
│ │ ☐ Shoreline change    │ │  [Tools: profile, swipe, 3D, animate] ││
│ │                       │ │                                       ││
│ │ Skenario:             │ │                                       ││
│ │ ○ 2030 SSP2-4.5       │ │                                       ││
│ │ ◉ 2050 SSP5-8.5       │ │                                       ││
│ │ ○ 2100 SSP5-8.5       │ │                                       ││
│ │                       │ └───────────────────────────────────────┘│
│ │ Tide level:           │ ┌── TIME-SERIES TIDE GAUGE TERPILIH ─────┐│
│ │ ○ MLW  ◉ MSL  ○ MHHW  │ │                                        ││
│ │                       │ │  Sea Level (mm)                        ││
│ │ [▶ Update Map]        │ │  100│             ◢◣                   ││
│ │ [⤓ Export Layer]     │ │   50│     ◢◣  ◢◣◢  ◣◢◣      ◢◣ ●(now) ││
│ │                       │ │    0│◢◢◣  ◢ ◢       ◢◣      ◢         ││
│ │                       │ │  -50│◢                                 ││
│ │                       │ │ -100│                                  ││
│ │                       │ │     └────────────────────────►        ││
│ │                       │ │     1990  2000  2010  2020  Year      ││
│ │                       │ │                                        ││
│ │                       │ │  Trend: +6.7 mm/yr (SLR only)         ││
│ │                       │ │  Combined w/ subsidence: +28 mm/yr ⚠️ ││
│ │                       │ └────────────────────────────────────────┘│
│ └───────────────────────┘                                            │
│ ┌── PROFIL CROSS-SECTION PANTAI (klik garis di peta) ────────────┐  │
│ │                                                                  │  │
│ │   Elevation (m)                                                  │  │
│ │    5│ ╱─────╲___                                                 │  │
│ │    3│         ╲___                                                │  │
│ │    1│   - - - 2100 SLR - - - - - - - - - -                      │  │
│ │  MSL│   - - - 2050 SLR - - - - - - - - - -                      │  │
│ │   -1│________________╲____                                       │  │
│ │   -3│                     ╲___ Seabed                            │  │
│ │     0     50    100   150   200 m                                │  │
│ └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur (Subsidence Calc)

```
[Sentinel-1 acquisition baru]
  │
  ▼
[AUTO INGESTION (Airflow)]
  │ Download dari Copernicus → object storage
  ▼
[INSAR PROCESSING]
  │ Co-register dengan stack existing
  │ Generate new interferogram
  ▼
[PHASE UNWRAPPING + ATMOSPHERIC CORR]
  │ SNAPHU, GACOS APS
  ▼
[TIME-SERIES INVERSION]
  │ Update velocity per PS
  ▼
[GNSS CALIBRATION]
  │ Anchor to absolute frame
  ▼
[INTERPOLATION TO RASTER]
  │ Kriging atau IDW
  ▼
[VALIDATION]
  │ Compare with GNSS stations as ground truth
  ▼
[STORAGE]
  │ Point cloud (PostGIS) + interpolated COG
  ▼
[EVENT]
  │ slr.subsidence.updated
```

### Dependencies

**Modul Internal:** 2.1 Climate (untuk wind, SST), 4.3 Coastal Vulnerability (consumer)

**Sistem Eksternal:** ESA SciHub, NASA PO.DAAC, BIG InaCORS, PUSHIDROSAL, UHSLC, IPCC SROCC data

**Library:** SNAP (ESA), GMTSAR, MintPy, RAiDER, pyGNSS, xarray

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Subsidence accuracy | ±2 mm/yr |
| SLR trend accuracy | ±0.5 mm/yr |
| Update frequency InSAR | Setelah setiap akuisisi (6-12 hari) |
| Inundation map resolution | 30m minimum, 1m untuk LiDAR area |

### Validasi & QA
- Cross-validation dengan GNSS independent
- Comparison dengan studi terdahulu (Abidin et al., Andreas et al. untuk Jakarta-Semarang-Pekalongan)
- Field GPS survey periodik untuk hotspot

### Akses Per Tier User
- **Government Full:** Semua data, raw point cloud, scenarios
- **Researcher:** Same + sandbox InSAR processing
- **Private:** Display layer per region, no raw
- **Public:** Visualisasi inundasi kota mereka + trend grafik

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul SLR & Subsidence SDSS) + Leverage Plugin Pendukung  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (Indonesia 108,000 km pantai; Jakarta-Semarang-Pekalongan subsidence parah)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-lidar | 19260 | COPC point cloud ingest + 3D Tiles serving; high-res DEM derivation untuk inundation modeling | Integrasi via API GeoVertix |
| gxp-3dtiles | 19225 | 3D inundation visualization (CityGML buildings tenggelam) | API call ke GeoVertix untuk viz |
| gxp-climate | 19235 | Altimetry data ingest (Sentinel-3, Jason), SST ingest, time-series trend | Integrasi via API GeoVertix |
| gxp-inference | 19210 | yolov8-buildings untuk asset inventory pesisir | API call ke GeoVertix |
| gxp-areainfo | 19285 | AOI summary untuk segmen pantai 1km | API call ke GeoVertix |
| gxp-geoprocess | 19215 | Shoreline buffer, segmentation 1km | API call ke GeoVertix |

#### Metode Integrasi
SLR & Land Subsidence memerlukan **PS-InSAR / SBAS processing** yang tidak ada di GeoVertix. Bangun **Modul SLR & Subsidence SDSS** sebagai modul native di backend SDSS:
1. **InSAR processing pipeline** sebagai scripts Python (MintPy, GMTSAR) di Modul SLR & Subsidence SDSS (heavy compute, container approach seperti gxp-ml)
2. **API call ke GeoVertix gxp-climate** untuk altimetry trend analysis (sudah punya mekanisme)
3. **API call ke GeoVertix gxp-lidar** untuk LiDAR DEM yang dipakai untuk inundation mapping
4. **API call ke GeoVertix gxp-3dtiles** untuk visualisasi 3D inundasi proyeksi
5. **API call ke GeoVertix gxp-inference** untuk auto-inventory aset pesisir terdampak
6. CVI/CCVI composite scoring via **API call ke GeoVertix gxp-mcda** (lihat 4.3 untuk composite)

#### Komponen yang Dimanfaatkan Langsung
- LiDAR point cloud + DEM serving (gxp-lidar)
- 3D Tiles visualization stack (gxp-3dtiles)
- Time-series trend analysis (gxp-climate, Mann-Kendall)
- Object detection ONNX (gxp-inference)
- AOI segmentation (gxp-geoprocess)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul SLR & Subsidence SDSS plugin** dengan schema sdss_slr.*
- **PS-InSAR pipeline** (MintPy, SNAPHU, GACOS APS correction) — heavy dev, ~10-12 minggu
- **SBAS-InSAR pipeline** alternatif — ~6-8 minggu
- **GNSS-anchored calibration** (BIG InaCORS integration) — ~3 minggu
- **Shoreline change detection** (DSAS-style) — ~3 minggu
- **RSL projection logic** (IPCC AR6 SROCC + local subsidence) — ~2 minggu
- **CVI Klasik** computation — ~1 minggu (sederhana setelah inputs siap)
- **Inundation modeling** (bathtub + hydraulically connected) — ~3 minggu
- Frontend Coastal/SLR Explorer dengan cross-section, time-series — ~4 minggu

#### Pertimbangan Khusus & Risiko
- **InSAR processing compute-heavy**: butuh dedicated worker node, 30+ Sentinel-1 SLC stack (TB-scale).
- **Sentinel-1 acquisition continuity**: misi B failed 2022, sekarang single-satellite — koordinasi dengan ESA Copernicus.
- **MoU dengan BIG InaCORS** untuk GNSS continuous data (semi-restricted).
- **Pushidrosal MoU** untuk tide gauge data.
- Akurasi target ±2 mm/yr subsidence — challenging tanpa GNSS anchor.

#### Action Items
1. MoU BIG InaCORS + Pushidrosal untuk GNSS dan tide gauge data
2. Provision compute heavy untuk InSAR (16+ CPU cores, 64 GB RAM minimum)
3. Pilot 3 kota: Jakarta, Semarang, Pekalongan (data abundant)
4. Sprint awal: install GMTSAR/MintPy di dedicated container


---

## FITUR 2.6: Flood & Drought Modeling

### Tujuan Pengembangan
Menyediakan **pemodelan hidrologi & hidrodinamika** komprehensif untuk:
1. **Peta bahaya banjir** per return period & per skenario iklim
2. **Indeks kekeringan** meteorologi, agrikultur, hidrologis
3. **Early warning** banjir-kekeringan dengan AI nowcasting
4. **Skenario-based planning** untuk infrastruktur mitigasi (rumah pompa, waduk, drainase)

### Landasan TOR
> **§1.3b.1.f:** "*Climate-Informed Hydrological Modeling (SWAT, VIC, HEC-HMS); AI and Remote Sensing for Early Warning and Forecasting; Integrated Flood-Drought Risk Mapping and Scenario Analysis*"

> **§1.3d:** "*Flood Modeling and Risk Assessment*"

### Deskripsi Fungsional
Modul ini adalah **kombinasi 4 komponen besar**:
1. **Hidrologi DAS** (SWAT/VIC) — neraca air, runoff, baseflow
2. **Hidrodinamika 2D** (HEC-RAS 2D / Mike Flood) — propagasi banjir, kedalaman
3. **Drainase urban** (SWMM) — sistem perkotaan
4. **Drought indices & forecasting** — SPI, SPEI, PDSI, VHI, soil moisture

Plus **AI Nowcasting** dengan ConvLSTM untuk prediksi 1-72 jam ke depan.

### Input Data

| # | Nama | Sumber | Format | Resolusi |
|---|------|--------|--------|----------|
| 1 | DEM tinggi resolusi | LiDAR (urban), DEMNAS 8m | LAS/GeoTIFF | <1m / 8m |
| 2 | Rainfall stasiun | BMKG | CSV/API | Point hourly |
| 3 | Rainfall satelit | GPM IMERG, CHIRPS | NetCDF | 5-10 km / 30 menit |
| 4 | Sungai network | BBWS/PUPR, RBI BIG | Vector | Variable |
| 5 | Tanggul, infrastruktur air | BBWS | Vector | Vector |
| 6 | Land cover (Modul 2.2) | Internal | COG | 10-30m |
| 7 | Soil characterization | Balittan, SoilGrids | GeoTIFF | 250m |
| 8 | River discharge stasiun | PUPR, BMKG | CSV | Point daily |
| 9 | Climate projection (Modul 2.1) | Internal | NetCDF | 5km |
| 10 | Satellite soil moisture | SMAP, ASCAT | NetCDF | 9-25km |
| 11 | NDVI/VHI (untuk drought) | MODIS, Sentinel-2 | COG | 10-500m |
| 12 | Urban drainage network | PUPR, Pemda | CAD/Vector | Variable |
| 13 | Population & assets (exposure) | BPS, OSM | Vector | Variable |

### Algoritma & Metode

**1. Hidrologi DAS — SWAT (Soil and Water Assessment Tool)**
- Distributed, semi-physical model
- Hydrologic Response Units (HRU) berbasis LC × Soil × Slope
- Curve Number untuk runoff
- Output: discharge per sub-basin, sediment, water quality
- Calibration: SUFI-2 / PEST

**2. Hidrologi DAS — VIC (Variable Infiltration Capacity)**
- Macro-scale, gridded model (1-10 km)
- Suitable untuk forecast/projection skala provinsi-nasional
- Output: soil moisture, evapotranspiration, runoff per grid

**3. Hidrodinamika 2D — HEC-RAS 2D**
- Shallow Water Equations dengan Finite Volume
- Mesh adaptif (denser di area kritis)
- Input: DEM, land use roughness, boundary conditions (inflow hydrograph)
- Output: kedalaman, kecepatan, arrival time per cell, per timestep
- Cocok untuk dataran banjir kompleks

**4. Drainase Urban — SWMM (Storm Water Management Model)**
- Network-based (pipa, manhole, sub-catchment)
- Hydraulic routing
- Output: surcharge, overflow, capacity gaps

**5. Drought Indices**

```
SPI (Standardized Precipitation Index):
  - Hitung CDF presipitasi periode (1, 3, 6, 12 bulan)
  - Transformasi ke standard normal
  - SPI < -2: extremely dry; > 2: extremely wet

SPEI (Standardized Precipitation Evapotranspiration Index):
  - Like SPI but with P - PET (potential evapotranspiration)
  - Better untuk Indonesia tropics

PDSI (Palmer Drought Severity Index):
  - Cumulative moisture anomaly
  - Account for soil capacity

VHI (Vegetation Health Index):
  - Dari satelit NDVI + Land Surface Temperature
  - VHI < 40: drought stress
  - VHI = 0.5×VCI + 0.5×TCI (Vegetation Condition + Temperature Condition Index)
```

**6. AI Nowcasting (Banjir & Curah Hujan)**

- **ConvLSTM** untuk spatio-temporal forecasting curah hujan 0-6 jam
- **Transformer-based** (e.g., MetNet-3 inspired) untuk longer horizon
- Input: radar BMKG, satelit GPM, station obs
- Output: peta probabilistic rainfall 1-6 jam ke depan
- Coupled dengan hydraulic model untuk flood nowcasting

**7. Climate-Coupled Flood Projection**
- Dapatkan presipitasi ekstrem proyeksi (Modul 2.1) per RCP/SSP
- Run hidrologi-hidrodinamika untuk events ekstrem
- Generate future flood hazard map per return period × scenario

**8. Risk Calculation**
```
Risk = Hazard × Exposure × Vulnerability

Hazard: kedalaman banjir × probabilitas
Exposure: populasi/aset terdampak
Vulnerability: kerentanan struktural & sosial (link ke 3.1)
```

### Output

| Output | Format | Resolusi |
|--------|--------|----------|
| Peta bahaya banjir | COG | 5-30m |
| Per return period (2, 5, 10, 25, 50, 100 thn) | Multiple COG | - |
| Peta kedalaman & kecepatan | COG | - |
| Time-to-warning (arrival time) | COG | - |
| Risk map (hazard × exp × vuln) | COG | - |
| Hidrograf prediksi | JSON/CSV | Time-series |
| SPI/SPEI map | NetCDF | 5 km |
| VHI dari satelit | COG | 250 m |
| Nowcast rainfall (next 6 hours) | COG sequence | 1 km |
| Flood early warning alert | GeoJSON + push | Per area |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Flood & Drought Modeling                          [User ▼]  │
├────────────────────────────────────────────────────────────────────┤
│ ┌── MODE ──────────────┐ ┌── PETA UTAMA ───────────────────────────┐│
│ │ ◉ Bahaya & Risiko    │ │                                          ││
│ │ ○ Drought Monitor    │ │ [Peta DAS dengan layer bahaya banjir]    ││
│ │ ○ Real-time Nowcast  │ │                                          ││
│ │ ○ Custom Simulation  │ │ Kedalaman: ░ 0-0.5m ▒ 0.5-1.5m ▓ >1.5m   ││
│ │                      │ │                                          ││
│ │ Wilayah:             │ │ Layer toggleable:                        ││
│ │ DAS Citarum ▼        │ │   ☑ Banjir return 100-yr (current)        ││
│ │                      │ │   ☑ Banjir return 100-yr (2050 RCP8.5)    ││
│ │ Return Period:       │ │   ☐ Drainase urban                        ││
│ │ ◉ 100-yr             │ │   ☐ Tanggul existing                      ││
│ │ ○ 50-yr  ○ 25-yr     │ │   ☐ Asset terdampak (overlay)             ││
│ │ ○ 10-yr  ○ 5-yr      │ │                                          ││
│ │                      │ │ Swipe: current ↔ future                  ││
│ │ Skenario Climate:    │ │                                          ││
│ │ ◉ Current            │ │                                          ││
│ │ ○ 2050 SSP2-4.5      │ │                                          ││
│ │ ○ 2050 SSP5-8.5      │ │                                          ││
│ │ ○ 2100 SSP5-8.5      │ │                                          ││
│ │                      │ └──────────────────────────────────────────┘│
│ │ Custom Run:          │ ┌── STATISTIK & DAMPAK ────────────────────┐│
│ │ Rainfall (mm/24h):   │ │ Area tergenang: 2,340 km²                 ││
│ │ [____250____]        │ │ Populasi terdampak: 412,000               ││
│ │ Duration: 24h ▼      │ │ Aset infrastruktur tergenang: IDR 1.8 T   ││
│ │ Antecedent: medium ▼ │ │ Lahan pertanian: 187 km²                  ││
│ │ [▶ Run Simulation]   │ │ Sekolah: 87  Rumah sakit: 12              ││
│ │                      │ │                                            ││
│ │ Alert Subscriptions: │ │ Future 2050 RCP8.5 (delta):              ││
│ │ ☑ Email              │ │   +24% area, +18% population              ││
│ │ ☑ Push notification  │ │                                            ││
│ │ [Manage Alerts]      │ │ [→ Lihat di MCDA untuk mitigasi]          ││
│ │                      │ │ [→ Compare dengan InaRISK]                ││
│ └──────────────────────┘ └────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur (Real-time Nowcast)

```
[BMKG Radar/Satelit baru → Kafka]
  │
  ▼
[NOWCAST SERVICE]
  │ ConvLSTM inference (GPU)
  │ Output: rainfall prediction 0-6h
  ▼
[HYDROLOGIC COUPLING]
  │ Drive cached HEC-RAS dengan predicted rainfall
  ▼
[FLOOD FORECAST]
  │ Per AOI: probabilistic flood map
  ▼
[ALERT EVALUATOR]
  │ Threshold check: depth > 30 cm + populasi > 1000?
  ▼
[NOTIFICATION SERVICE]
  │ Push ke user subscribed di area
  │ Push ke BNPB integration
  │ Update peta web real-time (WebSocket)
```

### Dependencies

**Modul Internal:** 2.1 Climate (driver), 2.2 LULC (runoff parameters), 3.1 Vulnerability

**Sistem Eksternal:** BMKG (radar, station), PUPR/BBWS (discharge, infrastructure), BNPB (alert dissemination)

**Library:** PyHEC-RAS, pyswmm, pyVIC, climate-indices, xarray-spatial, PyTorch (ConvLSTM)

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Hydraulic sim wall-time (DAS sedang) | < 30 menit |
| Nowcast update | Setiap 10 menit |
| Early warning latency | < 2 menit dari trigger |
| Bias index banjir | 0.7 - 1.3 |
| Drought index accuracy | r > 0.7 vs observed |

### Validasi & QA
- Historic flood events back-test (Jakarta 2007, 2020, Sintang 2021, dll)
- Compare dengan InaRISK BNPB
- Field survey post-flood

### Akses Per Tier User
| Tier | Akses |
|------|-------|
| Government Full | Semua simulation, custom run, raw output, alert config |
| BPBD (sub-tier of Govt) | Real-time alert + custom run untuk wilayahnya |
| Researcher | Same + algorithm tuning |
| Private | Map view, no custom run; alert subscription untuk asset |
| Public | Peta bahaya wilayah mereka + alert push |

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Flood & Drought SDSS) + Leverage Plugin Pendukung  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** KRITIS (banjir = bencana #1 Indonesia, early warning life-saving)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-climate | 19235 | Presipitasi NetCDF ingest, SPI/SPEI calculation foundation, ensemble averaging untuk return period | Integrasi via API GeoVertix (heavy) |
| gxp-lidar | 19260 | High-res DEM dari LiDAR untuk hidrodinamika 2D | Integrasi via API GeoVertix |
| gxp-ml | 19240 | **ConvLSTM nowcasting** script baru; **predict_values.py** untuk regression hujan-debit | API call ke GeoVertix + tambah script |
| gxp-qgis | 19245 | Hydrology basics (slope, flow accumulation, watershed delineation, IDW interpolation hujan) | API call ke GeoVertix (heavy) |
| gxp-geoprocess | 19215 | Sungai network buffer, sub-DAS clip | API call ke GeoVertix |
| gxp-inference | 19210 | yolov8-buildings untuk exposure asset detection | API call ke GeoVertix |

#### Metode Integrasi
Hidrologi-hidrodinamika full pipeline tidak ada di GeoVertix. Bangun **Modul Flood & Drought SDSS** sebagai modul native di backend SDSS** dengan:
1. **HEC-RAS 2D wrapper** (Python bindings atau process wrapper) — heavy compute
2. **SWAT/VIC hidrologi DAS** — scripts Python
3. **SWMM drainase urban** — scripts Python
4. **API call ke GeoVertix gxp-climate** untuk SPI/SPEI/PDSI (sebagian sudah ada mekanisme zonal+anomaly)
5. **API call ke GeoVertix gxp-lidar** untuk DEM resolusi tinggi
6. **API call ke GeoVertix gxp-ml** dengan ConvLSTM nowcasting script baru (deploy ke gxp-ml scripts/)
7. **API call ke GeoVertix gxp-qgis** untuk hydrology preprocessing (watershed, flow accumulation)
8. **Real-time stream** dari BMKG radar via Kafka topic
9. **Alert generation** terintegrasi dengan SDSS Application Core Anomaly Detection (Modul 6.2)

#### Komponen yang Dimanfaatkan Langsung
- SPI/SPEI calculation (gxp-climate sudah punya zonal stats + anomaly mechanism)
- VHI dari satelit (gxp-climate)
- DEM serving (gxp-lidar)
- Watershed delineation (gxp-qgis)
- Spatial interpolation IDW untuk rainfall (gxp-qgis atau gxp-ml::interpolate.py)
- ONNX runtime untuk nowcasting deploy (gxp-inference)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Flood & Drought SDSS plugin** dengan schema sdss_flood.*
- **HEC-RAS 2D Python wrapper** — perlu HEC-RAS license + custom integration ~6-8 minggu
- **SWAT model orchestration** Python — ~4 minggu
- **VIC model orchestration** — ~3 minggu (alternative ke SWAT untuk macro-scale)
- **SWMM urban drainage** Python wrapper — ~3 minggu
- **ConvLSTM nowcasting** model — training ~4-6 minggu (radar archive BMKG)
- **Climate-coupled flood projection** (per RP × SSP × period) — ~3 minggu
- **Risk calculation** (Hazard × Exposure × Vulnerability) — ~2 minggu
- **Real-time alert pipeline** — ~3 minggu (link ke SDSS Application Core Anomaly Detection)
- Frontend Flood & Drought Modeler dengan animation, custom simulation — ~5 minggu

#### Pertimbangan Khusus & Risiko
- **HEC-RAS license** US Army Corps of Engineers — public domain tapi compute-intensive. Backup: open-source LISFLOOD-FP.
- **Compute resource** kritis: 2D simulation DAS sedang butuh 30+ menit. Provision dedicated worker pool.
- **Real-time data feed BMKG** untuk nowcasting — pastikan SLA <10 menit refresh.
- **BNPB cross-validation** dengan InaRISK (lihat Modul 13.2) untuk konsistensi nasional.
- **Alert false positive** harus <15% — over-trigger erosi kepercayaan.

#### Action Items
1. Provision compute pool dedicated untuk HEC-RAS simulation (multi-core, 64+ GB RAM)
2. MoU BMKG untuk radar real-time stream (Kafka feed)
3. Sprint awal: pilot HEC-RAS di DAS Citarum (data lengkap)
4. Train ConvLSTM nowcasting dari arsip radar BMKG 2020-2024
5. Setup integrasi alert dengan BNPB InaRISK (lihat Modul 13.2)


---

# BAGIAN 3 — ENHANCED VULNERABILITY ASSESSMENT FRAMEWORK

TOR Annex 6 §1.3b.2 menyebut **DUA komponen** vulnerability framework:
1. Multi-criteria analysis
2. **Dynamic vulnerability modeling (system dynamics) accounting for temporal changes in adaptive capacity** — yang sebelumnya tidak dielaborasi.

## FITUR 3.1: Multi-Criteria Vulnerability Assessment

### Tujuan Pengembangan
Menghasilkan **indeks kerentanan terpadu** dengan dimensi fisik-sosial-ekonomi-lingkungan-institusional, sebagai dasar **prioritas intervensi**, **anggaran adaptasi**, dan **rekomendasi RDTR**.

### Landasan TOR
> **§1.3b.2.a:** "*Multi-criteria analysis incorporating physical, social, economic, and environmental vulnerability and carrying capacity factors*"

### Deskripsi Fungsional
Framework klasik IPCC AR5/AR6: **Vulnerability = f(Exposure, Sensitivity, Adaptive Capacity)**. Modul mengkomposisikan indikator dari banyak sumber, normalisasi, pembobotan via AHP, dan menghitung composite index. User dapat **adjust bobot live** untuk explore sensitivity.

### Input Data

| Dimensi | Sub-Indikator | Sumber |
|---------|---------------|--------|
| **Physical Hazard** | Output Modul 2.5 (SLR), 2.6 (Flood-Drought), 4.4 (Fire) | Internal |
| **Physical Setting** | Slope, elevation, soil, geology | DEMNAS, BIG, BG |
| **Social** | Densitas penduduk, IPM, % rentan (anak/lansia), gender ratio, disabilitas | BPS, Kemensos |
| **Economic** | PDRB per kapita, garis kemiskinan, sektor ekonomi dominan, ketenagakerjaan | BPS |
| **Environmental** | Tutupan hijau (Modul 2.2), kualitas air, biodiversitas (Modul 2.4) | Internal + KLHK |
| **Institutional** | Anggaran adaptasi, dokumen RPB, jumlah BPBD personnel, training records | BNPB, Pemda |
| **Infrastructure** | Akses jalan, listrik, air, sanitasi, faskes, sekolah | PUPR, BPS |

### Algoritma & Metode

**1. Normalisasi Indikator**
```
X_norm = (X - X_min) / (X_max - X_min)   ; min-max
atau
X_norm = (X - μ) / σ                      ; z-score

Untuk indikator "positif" (semakin tinggi semakin rentan): tetap
Untuk indikator "negatif" (semakin tinggi semakin tahan, mis. PDRB):
  X_norm = 1 - X_norm
```

**2. Pembobotan**
- **AHP** (default): pairwise comparison via expert workshop
- **Entropy weighting** (alternatif): otomatis berdasarkan variance
- **PCA-based** (lanjutan): unsupervised dimensionality

**3. Aggregasi Composite Index**
- **Weighted Sum Model (WSM)**: paling umum
- **Weighted Product Model (WPM)**: untuk non-compensatory
- **TOPSIS**: distance to ideal

**4. Output dengan Confidence**
- Per area: nilai indeks + interval kepercayaan (bootstrap)
- Decomposition: kontribusi tiap dimensi

### Output

| Output | Format | Resolusi |
|--------|--------|----------|
| Composite vulnerability index | COG / GeoJSON | Per kelurahan/kecamatan |
| Per-dimension index | COG | Sama |
| Ranking | CSV/Table | Per kab-kota / kecamatan |
| Decomposition chart data | JSON | Per area |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Vulnerability Assessment Framework             [User ▼]     │
├────────────────────────────────────────────────────────────────────┤
│ ┌── BOBOT (LIVE-ADJUSTABLE) ─┐ ┌── PETA KOMPOSIT VULNERABILITY ──┐│
│ │ Hazard       ──[████░░]─ 35%│ │                                  ││
│ │ Sensitivity  ──[██░░░░]─ 20%│ │   [Peta dengan indeks 0-1]       ││
│ │ Adaptive Cap ──[██░░░░]─ 25%│ │                                  ││
│ │ (1-AC)                      │ │   ▓ High (>0.7)                  ││
│ │ Environment  ──[██░░░░]─ 10%│ │   ▒ Medium (0.4-0.7)             ││
│ │ Institution  ──[█░░░░░]─ 10%│ │   ░ Low (<0.4)                   ││
│ │                             │ │                                  ││
│ │ [Reset to AHP-derived]      │ │ Top 10 kabupaten paling rentan: ││
│ │ [Save Custom Profile]       │ │ 1. Demak: 0.82                   ││
│ │                             │ │ 2. Pekalongan: 0.79              ││
│ │ ──────────────────────      │ │ 3. Banjarnegara: 0.74            ││
│ │ Metode Aggregasi:           │ │ 4. Sintang: 0.73                 ││
│ │ ◉ WSM  ○ WPM  ○ TOPSIS      │ │ ...                              ││
│ │                             │ │                                  ││
│ │ Bootstrap CI:               │ │ [→ Drill-down per kabupaten]     ││
│ │ ☑ Tampilkan 95% CI band     │ │                                  ││
│ └─────────────────────────────┘ └──────────────────────────────────┘│
│ ┌── DECOMPOSITION (klik kabupaten di peta) ──────────────────────┐  │
│ │ Demak (Indeks: 0.82)                                            │  │
│ │                                                                  │  │
│ │ Kontribusi per dimensi:                                          │  │
│ │   Hazard         ████████████████ 0.92 (35% bobot = 0.32)        │  │
│ │   Sensitivity    █████████ 0.65 (20% = 0.13)                     │  │
│ │   1-AdaptCap     ████████████ 0.85 (25% = 0.21)                  │  │
│ │   Environment    ██████ 0.45 (10% = 0.05)                        │  │
│ │   Institution    ████ 0.32 (10% = 0.03)                          │  │
│ │                                                                  │  │
│ │ Indikator kritis:                                                │  │
│ │ ⚠ Subsidence 8-12 cm/yr (sangat tinggi)                          │  │
│ │ ⚠ % populasi di area inundasi proyeksi 2050: 43%                 │  │
│ │ ⚠ Anggaran adaptasi/kapita: rendah (Q1)                          │  │
│ │                                                                  │  │
│ │ [→ Buat skenario adaptasi untuk Demak]                          │  │
│ └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur

```
[USER]
  │ Pilih wilayah + bobot
  ▼
[FRONTEND: POST /api/v1/vulnerability/composite]
  │
  ▼
[VULNERABILITY-SERVICE]
  │ 1. Fetch indikator per area (cached)
  │ 2. Normalize
  │ 3. Apply weights
  │ 4. Aggregate (WSM/WPM/TOPSIS)
  │ 5. Bootstrap untuk CI
  ▼
[RESPONSE]
  │ {map_tile, ranking, decomposition_per_area}
  ▼
[FRONTEND] render
```

### Dependencies

Konsumsi output: Modul 2.5, 2.6, 4.4, 2.2 + data eksternal BPS, BNPB, KLHK, Pemda

### Akses Per Tier
- All tier dapat melihat composite + ranking
- Government Full: bobot custom + raw data
- Researcher: API + sandbox

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend Plugin Existing (Thin Wrapper di atas gxp-mcda)  
**Coverage dari GeoVertix:** 70%  
**Estimasi Effort Saving:** 75%  
**Prioritas:** TINGGI (output dipakai oleh banyak modul SDSS untuk prioritas)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mcda** | 19286 | **AHP pairwise + consistency check (CR < 0.10), Entropy weighting, WSM/WPM composite, sensitivity OAT, LRU cache** — semua method yang dibutuhkan Modul 3.1 ada disini | **Integrasi via API GeoVertix (CORE)** |
| gxp-areainfo | 19285 | AOI summary multi-layer untuk input indikator | API call ke GeoVertix sebagai data prep |
| gxp-geoprocess | 19215 | Overlay indikator spasial | API call ke GeoVertix sebagai preprocessing |
| gxp-qgis | 19245 | Normalization raster, terrain features sebagai indikator fisik | API call ke GeoVertix sebagai feature engineering |

#### Metode Integrasi
**SDSS Modul 3.1 adalah thin wrapper di atas gxp-mcda.** Architecture:
1. SDSS **Modul Vulnerability SDSS** plugin (atau modul di SDSS Application Core) menerima request dengan: AOI, dimensi yang aktif, bobot user-override (atau default AHP-derived)
2. Internally orchestrate:
   - **API call ke GeoVertix gxp-areainfo** untuk fetch nilai per dimensi per unit administrasi (kelurahan/kecamatan/kab)
   - **API call ke GeoVertix gxp-mcda::compose** dengan criteria layers + bobot + method (WSM/WPM/TOPSIS)
   - gxp-mcda return composite score + ranking + cell-detail cache (LRU sudah ada)
   - **API call ke GeoVertix gxp-mcda::sensitivity** untuk bootstrap CI dan tornado decomposition
3. Output: composite vulnerability map + per-dimension breakdown + decomposition view (kontribusi tiap indikator)

#### Komponen yang Dimanfaatkan Langsung
- **AHP pairwise comparison matrix** dengan consistency check otomatis (ahp_inconsistency_threshold = 0.10)
- **Entropy weighting** sebagai alternatif AHP (objective)
- **WSM/WPM composite** computation
- **TOPSIS** distance-to-ideal
- **Sensitivity OAT** (default perturbation ±10%, ±20%)
- **Correlation analysis** (multicollinearity warning > 0.85)
- **Grid-based analysis** (default 750m)
- **LRU cache** untuk cell-detail drilldown
- **Export multi-format**: SHP, GeoJSON, PDF (with charts), XLSX

#### Yang Perlu DIBANGUN BARU/Extension
- **Indikator pipeline** untuk 7 dimensi (Physical, Hazard, Social, Economic, Environmental, Institutional, Infrastructure) — data integration dengan BPS, KLHK, BNPB, dll (~6 minggu, paralel dengan Modul 13.x)
- **Decomposition view UI** untuk drill-down per dimensi (~2 minggu)
- **Bootstrap CI wrapper** di atas gxp-mcda sensitivity (~1 minggu)
- **Climate-specific indicator definitions** sebagai metadata (~1 minggu)
- Frontend Vulnerability Explorer dengan live-adjust weights (~2-3 minggu)

#### Pertimbangan Khusus & Risiko
- **CATATAN KRITIS: gxp-mcda saat ini LICENSE-BLOCKED** (JWT limits.plugins tidak include "mcda"). **Wajib re-mint license JWT** sebelum SDSS Modul 3.1 bisa development production.
- **Compose schema** gxp-mcda perlu di-document — saat ini operations.json endpoint mengembalikan [] saat probe (plugin tidak loaded).
- **Data agreement** dengan BPS untuk gridded population dan socio-economic indicators.
- **AHP expert workshop** diperlukan untuk derive default weights — koordinasi dengan akademisi & BNPB.

#### Action Items
1. **CRITICAL: Escalate ke tim Pengembang GeoVertix GeoVertix untuk unblock gxp-mcda license** (re-mint JWT include "mcda" feature) — gate untuk Modul 3.1, 4.1, 4.3, 4.6, 4.7, 5.5, 5.9
2. Document API contract gxp-mcda compose endpoint (cara invoke, parameter schema)
3. Setup AHP expert workshop dengan BNPB, BPS, KLHK untuk default bobot
4. Sprint awal: integrate 7-dimensi indikator pipeline


---

## FITUR 3.2: Dynamic Vulnerability System Modeling **(BARU - DIPERLUAS)**

### Tujuan Pengembangan
Menyajikan **bagaimana vulnerability berubah seiring waktu** akibat perubahan adaptive capacity (anggaran adaptasi, kapasitas SDM, infrastruktur baru, kebijakan baru). Ini menggunakan **System Dynamics modeling** — pendekatan yang berbeda dari static MCDA.

**Mengapa krusial:** TOR §1.3b.2.b eksplisit meminta "System dynamic of vulnerability modeling accounting for temporal changes in adaptive capacity". Vulnerability bukan statis — investasi pemerintah, learning, kerusakan dari bencana, semuanya mengubah dinamika.

### Landasan TOR
> **§1.3b.2.b:** "*System dynamic of vulnerability modeling accounting for temporal changes in adaptive capacity*"

### Deskripsi Fungsional
Modul ini membangun **System Dynamics (SD) model** dengan stocks, flows, feedback loops yang memodelkan dinamika vulnerability over time. User dapat:
1. **Simulate trajectory** vulnerability 10-30 tahun ke depan
2. **Test intervention policies** (anggaran adaptasi tambahan, regulasi baru)
3. **Identify leverage points** dalam sistem

### Konsep System Dynamics yang Diterapkan

```
                    ┌─────────────────────┐
                    │  EXPOSURE (Stock)   │
   Climate ────────►│  (populasi & aset   │◄─── Migration
   hazard           │   di area rawan)    │     out
                    └─────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  IMPACT (per event) │
                    │  Loss & damage      │◄─── Adaptive Capacity
                    └─────────────────────┘     (reducing impact)
                              │
                              ▼
                    ┌─────────────────────┐
                    │  ADAPTIVE CAPACITY  │
                    │  (Stock)            │
                    │  - Infrastructure   │
                    │  - Institutional    │◄─── Investment flow
                    │  - Knowledge        │
                    │  - Financial        │
                    └─────────────────────┘
                              │
                              ▼ (feedback)
                    ┌─────────────────────┐
                    │  VULNERABILITY      │
                    │  (composite,        │
                    │   computed)         │
                    └─────────────────────┘

Reinforcing loop R1: 
  Impact → drives investment → builds AC → reduces future impact

Balancing loop B1:
  Impact → depletes AC (asset destroyed) → reduces ability to recover

Reinforcing loop R2 (lock-in):
  Low income areas → lower AC accumulation → higher vulnerability → 
  → lower productivity → lower income → ...
```

### Variabel Sistem (Stocks, Flows, Auxiliary)

**Stocks (terakumulasi over time):**
| Stock | Unit | Initial Value | Description |
|-------|------|---------------|-------------|
| Population_at_risk | jiwa | dari sensus | Populasi di area rawan iklim |
| Physical_AC | indeks 0-1 | initial assessment | Infrastruktur, peralatan |
| Institutional_AC | indeks 0-1 | initial assessment | Kelembagaan, SDM, prosedur |
| Knowledge_AC | indeks 0-1 | initial assessment | Pengetahuan lokal, akademik |
| Financial_AC | indeks 0-1 | initial assessment | Tabungan, anggaran, akses kredit |
| Cumulative_damage | IDR | 0 | Akumulasi kerugian |

**Flows:**
| Flow | Direction | Driver |
|------|-----------|--------|
| Migration_out | dari Pop_at_risk | hazard exposure threshold |
| AC_investment_phys | ke Physical_AC | APBN, APBD, swasta |
| AC_depreciation | dari Phys_AC | aging, depreciation rate |
| AC_destruction | dari Phys_AC | bencana intensitas tinggi |
| AC_institutional_growth | ke Inst_AC | training, restructuring |
| Knowledge_inflow | ke Knowledge_AC | research, education |
| Knowledge_decay | dari Knowledge_AC | personnel turnover |

**Auxiliary (computed):**
- Total_AC = w1 × Phys + w2 × Inst + w3 × Know + w4 × Fin
- Impact_per_event = f(Hazard, Exposure, 1 - Total_AC)
- Vulnerability_index = computed at time t

### Algoritma & Metode

**1. Model Specification** dalam DSL/library:
- **Python**: PySD (System Dynamics Python)
- **R**: deSolve, SDmod
- **Stella/Vensim**: untuk model design (export ke XMILE)

**2. Calibration**
- Historical hindcasting: jalankan model 2000-2024, compare dengan observed (damage data BNPB, AC index proxy)
- Calibration optimizer (PEST, DE-MCMC)

**3. Monte Carlo untuk Uncertainty**
- Parameter distributions
- Run N=1000 simulations
- Output: distribusi outcome

**4. Sensitivity Analysis**
- Sobol indices
- Identify dominant parameters (yang paling pengaruh)

**5. Policy Testing**
- "Run baseline" + "Run with intervention X"
- Compare trajectories

### Output

| Output | Format |
|--------|--------|
| Vulnerability trajectory (per area, 10-30 yr) | Time-series JSON |
| Stocks evolution (AC components, exposure) | Time-series JSON + chart |
| Feedback loop analysis | Diagram + numerical |
| Policy comparison | Comparison chart |
| Tipping point identification | Annotation pada chart |
| Sensitivity ranking | Tornado chart |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Dynamic Vulnerability (System Dynamics)        [User ▼]     │
├────────────────────────────────────────────────────────────────────┤
│ ┌── SETUP ──────────────┐ ┌── CAUSAL LOOP DIAGRAM ─────────────────┐│
│ │ Wilayah: Demak ▼      │ │                                         ││
│ │                       │ │   [Visualisasi stocks & flows]         ││
│ │ Periode: 2024-2050 ▼  │ │                                         ││
│ │                       │ │   Stocks (boxes):                       ││
│ │ Initial Adaptive      │ │   ╔════════╗  ╔═══════════╗            ││
│ │ Capacity:             │ │   ║Pop@risk║  ║Physical AC║            ││
│ │   Physical: 0.42      │ │   ╚════════╝  ╚═══════════╝            ││
│ │   Institutional: 0.35 │ │       ▲           ▲ ▼                  ││
│ │   Knowledge: 0.48     │ │       │ flow      │ │                   ││
│ │   Financial: 0.30     │ │   [Investment]    [Damage]              ││
│ │                       │ │                                         ││
│ │ Climate Driver:       │ │   Klik stock → time-series              ││
│ │ ◉ SSP2-4.5            │ │                                         ││
│ │ ○ SSP5-8.5            │ │                                         ││
│ │                       │ └─────────────────────────────────────────┘│
│ │ Policy Intervention:  │ ┌── TRAJECTORY OUTCOMES ─────────────────┐│
│ │ ☑ Investasi adaptasi  │ │                                         ││
│ │   +20% APBD/yr        │ │  Vulnerability Index                    ││
│ │ ☐ Insurance scheme    │ │   1.0 │                                ││
│ │ ☐ Relocation program  │ │   0.8 │.───── BAU ────────.            ││
│ │ ☐ Education boost     │ │   0.6 │ ╲                              ││
│ │                       │ │   0.4 │  ╲── With intervention         ││
│ │ Monte Carlo runs: 500 │ │   0.2 │   ╲___                         ││
│ │                       │ │   0.0 │       ───                      ││
│ │ [▶ Simulate]          │ │       └────────────────────►           ││
│ │ [⤓ Export Results]   │ │       2024  2030  2040  2050           ││
│ │                       │ │                                         ││
│ │                       │ │   ⚠ Tipping point detected at 2038:    ││
│ │                       │ │     AC degradation accelerates         ││
│ │                       │ │     karena cumulative damage           ││
│ │                       │ │                                         ││
│ │                       │ │   [Lihat sensitivity tornado]           ││
│ └───────────────────────┘ └─────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur

```
[USER setup model parameters & interventions]
  │
  ▼
[POST /api/v1/dynvuln/simulate]
  │
  ▼
[DYNAMIC-VULN-SERVICE]
  │ 1. Load calibrated SD model template per region
  │ 2. Override parameters dengan input user
  │ 3. Apply intervention (modify flows/stocks)
  │ 4. Run Monte Carlo (parallelized via Celery)
  │ 5. Aggregate statistics
  │ 6. Detect tipping points (slope change > threshold)
  ▼
[RESPONSE]
  │ {trajectories, statistics, tipping_points, sensitivity}
  ▼
[FRONTEND]
  │ Render CLD interactive, time-series, sensitivity
```

### Dependencies

**Modul Internal:** 3.1 (static Vuln untuk initial values), 2.1 (climate driver), 2.6 (flood frequency), 5.6 (rekomendasi intervensi)

**Library:** PySD, sdtools, scipy.integrate, SALib

### Karakteristik Non-Fungsional

| Aspek | Target |
|-------|--------|
| Single simulation time | < 5 detik |
| Monte Carlo 500 runs | < 60 detik (parallel) |
| Model calibration accuracy | R² > 0.7 vs historical |

### Validasi & QA
- Backtesting dengan data damage BNPB historis
- Expert review oleh peneliti System Dynamics (BRIN, akademisi)
- Cross-checking parameter estimates dengan literatur

### Akses Per Tier
| Tier | Akses |
|------|-------|
| Government Full | Run simulation + custom intervention design |
| Researcher | Same + model structure editing |
| Private | Hanya scenario standar pre-built |
| Public | Tidak akses (terlalu teknis) |


### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Dynamic Vulnerability SDSS) — Tidak Ada Padanan di GeoVertix  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 10%  
**Prioritas:** SEDANG (advanced feature, Y2)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-mcda | 19286 | Composite score sebagai initial value untuk stocks (Adaptive Capacity) | API call ke GeoVertix (sekali di awal) |
| gxp-areainfo | 19285 | AOI summary untuk parameter regional | API call ke GeoVertix |
| gxp-ml | 19240 | Container Python untuk run PySD simulations (jika container approach dipilih) | API call ke GeoVertix atau direct in Modul Dynamic Vulnerability SDSS |

#### Metode Integrasi
**System Dynamics modeling adalah domain SANGAT spesifik** yang tidak ada di GeoVertix. Bangun **Modul Dynamic Vulnerability SDSS** sebagai modul native di backend SDSS** dengan PySD sebagai engine:
1. Plugin baru native (Rust dispatcher) atau container (Python PySD)
2. **API call ke GeoVertix gxp-mcda** sekali di awal untuk dapat initial Adaptive Capacity score per region
3. **API call ke GeoVertix gxp-areainfo** untuk regional parameters (populasi, anggaran, dll)
4. Internal: jalankan SD model dengan stocks/flows/feedback loops (PySD library)
5. Monte Carlo paralel dengan Celery
6. Output: trajectory time-series, tipping point detection, sensitivity tornado

#### Komponen yang Dimanfaatkan Langsung
- Composite vulnerability score (gxp-mcda) sebagai initial AC value
- Regional summary (gxp-areainfo)
- Python container infrastructure (gxp-ml pattern)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Dynamic Vulnerability SDSS plugin** dengan schema sdss_dynvuln.*
- **System Dynamics model template** (stocks, flows, feedback loops) per region (~6 minggu)
- **Model calibration** menggunakan PEST/DE-MCMC dengan historical BNPB damage data (~4 minggu)
- **Monte Carlo orchestration** dengan Celery + 500-1000 runs (~2 minggu)
- **Tipping point detection** (slope change algorithm) (~1 minggu)
- **Sobol sensitivity** integration (lihat Modul 5.9 — bisa share) (~1 minggu)
- **Causal Loop Diagram visualization** interactive (~3 minggu)
- Frontend Dynamic Vulnerability Explorer (~4 minggu)

#### Pertimbangan Khusus & Risiko
- **System Dynamics expert** dibutuhkan untuk design model (BRIN, akademisi UI/ITB)
- **Calibration data** dari BNPB damage history terbatas — mungkin perlu sintesis dari berbagai sumber
- **Computational cost** Monte Carlo 1000 runs per region: parallelize wajib
- **Educational complexity**: user perlu training untuk understand causal loops — tutorial krusial

#### Action Items
1. Recruit System Dynamics consultant (akademisi)
2. Collect BNPB damage data historis 2000-2024 untuk calibration
3. Sprint Y2-Q1: prototype dengan 1 region pilot (Demak atau Sintang)
4. Develop training materials untuk user (Modul 9.5 Onboarding)


---

---

# BAGIAN 4 — SPECIALIZED ANALYSIS MODULES (7 Modul)

TOR Annex 6 §1.2.2 dan §1.3b.3 menyebutkan **5 modul spesialisasi**, ditambah dengan **Optimization of Renewable Energy Deployment** (eksplisit di §1.3b.3.d) dan **Land Carrying Capacity** (§1.3d) = total 7 modul.

## FITUR 4.1: Spatial Planning Support Toolbox (RDTR)

### Tujuan Pengembangan
Menjadi **modul integratif "outlet"** yang menerjemahkan semua hasil analitik (climate, LULC, carbon, hazard, vulnerability) menjadi **input siap-pakai** untuk penyusunan **Rencana Detail Tata Ruang (RDTR)**. Ini adalah deliverable yang **disebut eksplisit di SETIAP tahun TOR** ("Integrate data/information/maps results in the preparation of Detailed Spatial Plans (RDTR)").

### Landasan TOR
> **§1.3d:** "*Support Analysis for Spatial Planning: AI-powered spatial analysis enables the generation of thematic maps that support evidence-based spatial planning at regional and local scales. By integrating land use, environmental constraints, socio-economic indicators, and climate risk data, these tools can guide zoning decisions, infrastructure planning, and sustainable land allocation... for example: land suitability (Settlement Zone, Commercial Zone, Conservation Area), evacuation routes and shelter zone*"

> **Annex 1 (semua tahun):** "*Integrate data/information/maps results to the preparation of Detailed Spatial Plans (RDTR)*"

> **Permen ATR/BPN No. 11/2021:** RDTR membutuhkan analisis fisik, daya dukung, kerawanan bencana, dan rencana pola ruang.

### Deskripsi Fungsional
Modul menyediakan **suite layer tematik climate-informed** yang langsung dapat di-overlay/di-import ke workflow penyusunan RDTR:
1. **Land Suitability Mapping** untuk setiap pola ruang (permukiman, perdagangan-jasa, industri, pertanian, konservasi, RTH)
2. **Risk Zoning** (banjir, kekeringan, longsor, kebakaran hutan, gempa, inundasi pesisir)
3. **Evacuation Routes & Shelter Zoning**
4. **Buffer Zones & Environmental Setbacks**
5. **Climate Refugia & Conservation Priority**
6. **Export ke ATR/BPN template** (.shp, .gpkg, dengan skema atribut sesuai NSPK ATR/BPN)

### Input Data

| # | Nama | Sumber | Format | Note |
|---|------|--------|--------|------|
| 1 | LULC current & proyeksi (Modul 2.2) | Internal | COG | Pola ruang baseline |
| 2 | Climate proyeksi (Modul 2.1) | Internal | NetCDF | Constraints |
| 3 | Hazard maps (2.5, 2.6, 4.4) | Internal | COG | Banjir, fire, SLR |
| 4 | Vulnerability composite (3.1) | Internal | COG/Vector | Prioritas |
| 5 | Biodiversity priority (2.4) | Internal | Vector | Konservasi |
| 6 | Carbon stock (2.3) | Internal | COG | Restriction untuk konservasi |
| 7 | Carrying capacity (4.7) | Internal | COG | Daya dukung |
| 8 | RDTR existing (jika ada revisi) | ATR/BPN, Pemda | Shapefile/.gpkg | Baseline |
| 9 | RTRW (skala provinsi) | ATR/BPN | Shapefile | Hirarki |
| 10 | Infrastruktur eksisting | PUPR, OSM | Vector | Jalan, listrik, air |
| 11 | Faskes, Sekolah | Kemenkes, Kemendikbud | Point/Vector | Public service |
| 12 | Kawasan hutan SK Menhut | KLHK | Shapefile | Constraint legal |
| 13 | Pengaturan KKPR (PP 21/2021) | Regulatif | Rule-based | Validation |

### Algoritma & Metode

**1. Land Suitability Analysis (MCE - Multi-Criteria Evaluation)**

Untuk setiap kelas peruntukan (mis. "Permukiman"):
```
Suitability_permukiman = Σ(w_i × Criterion_i × Constraint_factor)

Kriteria + bobot:
  - Slope (< 15%):     bobot 0.20
  - Aman dari banjir:   bobot 0.20  
  - Aman dari longsor:  bobot 0.15
  - Akses jalan:        bobot 0.15
  - Tidak hutan SK:     bobot constraint (binary)
  - Daya dukung:        bobot 0.15
  - Drainase memadai:   bobot 0.15

Output: skor 0-1 per cell + 5 kategori (S1, S2, S3, N1, N2)
```

**2. Risk Zoning Composite**
- Overlay semua hazard layer × probability × consequence
- Output zona: aman, risiko rendah, sedang, tinggi, sangat tinggi

**3. Evacuation Network Analysis**
- **Origin**: pusat populasi / titik kumpul desa
- **Destination**: shelter (gedung kuat, dataran tinggi, tempat ibadah)
- **Network**: jalan eksisting dengan capacity & passability
- **Algorithm**: Multi-source Dijkstra dengan capacity constraint
- Output: peta jalur evakuasi + service area per shelter + gap analysis

**4. Buffer Zone Generation**
- Garis pantai: buffer 100m (sempadan pantai per UU 26/2007)
- Sungai: 100m kiri-kanan untuk sungai besar
- Mata air: radius 200m
- Hutan lindung: buffer transisi
- Tanggul: setback ketinggian × 5

**5. Rule-based Plausibility Check**
- Validasi rancangan RDTR vs regulasi
- Mis. jangan alokasikan permukiman di kawasan hutan SK Menhut, di zona inundasi 100-yr, dll
- Output: list violation + lokasi

**6. ATR/BPN Schema Compliance**
- Mapping output ke skema atribut RDTR (NSPK):
  - PSN (Pola Ruang) codes
  - PZN (Zonasi) regulations
  - Compliance dengan KKPR

### Output

| Output | Format | Resolusi | Schema |
|--------|--------|----------|--------|
| Land suitability per peruntukan | COG + GeoJSON | 10-30m | S1/S2/S3/N1/N2 |
| Risk zoning composite | COG | 10-30m | 5-level |
| Evacuation routes | Vector (LineString) | Per koridor | Direction, capacity |
| Shelter service areas | Vector (Polygon) | Per shelter | Pop served, distance |
| Buffer zones | Vector (Polygon) | - | Type, regulation source |
| Compliance report | PDF + JSON | - | Per violation: location + rule |
| Export RDTR-ready package | ZIP (.gpkg, .shp, .qgs) | - | Skema NSPK ATR/BPN |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Spatial Planning Support (RDTR)            [User ▼]         │
├────────────────────────────────────────────────────────────────────┤
│ ┌── PILIH WILAYAH RDTR ────┐ ┌── PETA RANCANGAN POLA RUANG ──────┐│
│ │ Kabupaten: Kab Demak ▼   │ │                                    ││
│ │ Kecamatan: ◉ Wedung      │ │   [Peta rancangan dengan zoning]   ││
│ │           ○ Mijen        │ │                                    ││
│ │           ○ Sayung        │ │   Pola Ruang yang direkomendasikan:││
│ │                          │ │   ▓ Permukiman (45.2 ha)            ││
│ │ Layer Suitability Aktif: │ │   ▒ Sawah dilindungi (340 ha)       ││
│ │ ◉ Permukiman             │ │   ░ Konservasi (88 ha)              ││
│ │ ○ Industri               │ │   ░ RTH (32 ha)                     ││
│ │ ○ Perdagangan-Jasa       │ │   ▓ Inundasi 2050: relokasi (12 ha) ││
│ │ ○ Pertanian              │ │                                    ││
│ │ ○ Konservasi             │ │   Garis: Buffer pantai 100m         ││
│ │                          │ │   ━━━━ Rencana jalan evakuasi      ││
│ │ Skenario Climate:        │ │   ⊙ Shelter zone (capacity: 5000)   ││
│ │ ◉ 2050 SSP2-4.5          │ │                                    ││
│ │                          │ │   Compliance check:                 ││
│ │ Constraint:              │ │   ✓ Tidak ada permukiman di hutan SK│
│ │ ☑ Hutan SK Menhut        │ │   ⚠ 2 plot permukiman di zona 50-yr ││
│ │ ☑ Kawasan konservasi     │ │     flood — relokasi dianjurkan    ││
│ │ ☑ Sempadan pantai        │ │                                    ││
│ │ ☑ Risiko banjir 100-yr   │ │                                    ││
│ │ ☑ Slope > 25%            │ │                                    ││
│ │                          │ │                                    ││
│ │ [Generate Recommendation]│ │                                    ││
│ │ [Compare with Existing]  │ │                                    ││
│ │ [⤓ Export RDTR Package] │ │                                    ││
│ └──────────────────────────┘ └────────────────────────────────────┘│
│ ┌── DETAIL ZONASI (klik area di peta) ───────────────────────────┐ │
│ │ Zona: Permukiman R-2 (Kepadatan Sedang)                          │ │
│ │ Luas: 12.4 ha                                                    │ │
│ │ Klasifikasi suitability: S2 (Cukup Sesuai)                      │ │
│ │ KDB max: 60%, KLB max: 1.8, GSB: 4m                              │ │
│ │ Kriteria dasar rekomendasi:                                       │ │
│ │   • Slope: 5-8% (sesuai)                                          │ │
│ │   • Risiko banjir: rendah (20-yr return)                          │ │
│ │   • Akses jalan: < 500m dari arteri                              │ │
│ │   • Tidak di hutan SK                                             │ │
│ │ Rekomendasi PZ (Peraturan Zonasi):                                │ │
│ │   • Wajib drainase tertier capacity 50-yr                         │ │
│ │   • Wajib RTH 30% dari kapling                                    │ │
│ │   • Sertifikat KKPR + analisis dampak iklim                       │ │
│ └──────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur

```
[USER pilih kecamatan + skenario]
  │
  ▼
[FRONTEND: GET /api/v1/spatial-planning/suitability]
  │
  ▼
[SPATIAL-PLANNING-SERVICE]
  │ 1. Fetch dependencies (semua modul terkait)
  │ 2. Run MCE per peruntukan
  │ 3. Apply constraints
  │ 4. Generate evacuation network
  │ 5. Buffer zone calculation
  │ 6. Compliance check vs regulasi
  ▼
[OUTPUT BUNDLE]
  │ Suitability map, zoning recommendations,
  │ evacuation, buffer, compliance report
  ▼
[USER review & adjust]
  │ Klik zona → manual override
  ▼
[EXPORT]
  │ Package generation (RDTR-ready bundle)
  │ Sign manifest with provenance
```

### Dependencies

**Modul Internal:** 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 4.4, 4.7

**Sistem Eksternal:** ATR/BPN (template skema), KLHK (kawasan hutan), Pemda (RDTR existing)

**Library:** geopandas, shapely, networkx (evacuation), rasterio, fiona, pyqgis (untuk QGS template generation)

### Karakteristik Non-Fungsional
| Aspek | Target |
|-------|--------|
| Generate full kecamatan | < 5 menit |
| Export bundle | < 30 detik |
| Compliance schema sesuai NSPK | 100% |

### Akses Per Tier
- **Government Full:** Semua fitur, manual override, export RDTR
- **ATR/BPN tier:** Full + integrasi langsung ke sistem RDTR online
- **Pemda tier:** Wilayahnya saja, full
- **Researcher:** Read-only + analysis
- **Private/Public:** View final RDTR setelah ditetapkan

### Integrasi dengan GeoVertix

**Status Integrasi:** Orchestrate (Orchestrate 7 Plugin Existing via API GeoVertix)  
**Coverage dari GeoVertix:** 60%  
**Estimasi Effort Saving:** 70%  
**Prioritas:** KRITIS (TOR menyebut RDTR di SETIAP tahun 2026-2028)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mcda** | 19286 | **Land Suitability MCE per peruntukan** (AHP weights, WSM composite, sensitivity) | Integrasi via API GeoVertix (core) |
| **gxp-routing** | 19270 | **A* pathfinding** untuk evacuation routes (sudah persis sesuai requirement TOR) | Integrasi via API GeoVertix (core) |
| gxp-geoprocess | 19215 | Buffer zones (pantai 100m, sungai, mata air), dissolve, intersect | Integrasi via API GeoVertix (heavy) |
| gxp-bpnmap | 19265 | BPN aerial basemap untuk konteks cadastre | API call ke GeoVertix (layer) |
| gxp-pbb | 19280 | Cadastre matching parcel-level (PBB-BPN) | API call ke GeoVertix |
| gxp-areainfo | 19285 | AOI quick assessment per kecamatan | API call ke GeoVertix |
| gxp-mapeditor | 19275 | Vector CRUD untuk RDTR drafting (zoning polygons) dengan optimistic locking | Integrasi via API GeoVertix (drafting) |
| gxp-qgis | 19245 | Terrain analysis (slope), polygonize, network analysis | API call ke GeoVertix |

#### Metode Integrasi
**RDTR Toolbox adalah ORCHESTRATION dari banyak plugin existing.** Build **Modul RDTR Toolbox SDSS** plugin (atau modul di SDSS Application Core) yang:
1. **Suitability mapping** per peruntukan (permukiman, industri, dst): API call ke GeoVertix gxp-mcda dengan criteria layers + bobot per peruntukan
2. **Risk zoning composite**: API call ke GeoVertix gxp-mcda dengan hazard inputs dari Modul 2.6, 2.5, 4.4
3. **Evacuation network**: API call ke GeoVertix gxp-routing dengan origin=pusat populasi, destination=shelters, profile=pedestrian
4. **Buffer zone generation**: API call ke GeoVertix gxp-geoprocess dengan UU 26/2007 setbacks
5. **Cadastre context**: API call ke GeoVertix gxp-pbb untuk matched parcels
6. **Compliance check**: rule engine internal (validasi vs UU/Permen) — perlu build
7. **RDTR drafting**: API call ke GeoVertix gxp-mapeditor untuk concurrent editing zoning
8. **ATR/BPN export**: format converter (GPKG, SHP, QGS) dengan NSPK schema

#### Komponen yang Dimanfaatkan Langsung
- MCE land suitability (gxp-mcda)
- A* evacuation pathfinding dengan capacity constraint (gxp-routing)
- Multi-buffer zone generation (gxp-geoprocess)
- BPN basemap layer (gxp-bpnmap)
- Cadastre matching (gxp-pbb)
- Collaborative zoning editor (gxp-mapeditor)
- Terrain features untuk constraint (gxp-qgis)

#### Yang Perlu DIBANGUN BARU/Extension
- **Rule-based plausibility check engine** (vs UU 26/2007, Permen ATR/BPN 11/2021, dll) (~3 minggu)
- **ATR/BPN NSPK schema compliance** export converter (PSN, PZN codes) (~2 minggu)
- **Shelter zone identification** algorithm (~1 minggu)
- **Multi-source Dijkstra extension** (jika A* gxp-routing tidak support multi-source) (~1 minggu)
- **Land suitability rules per peruntukan** (config-driven) (~2 minggu)
- Frontend RDTR Toolbox dengan layer panel, klik-area-detail-zonasi (~4 minggu)

#### Pertimbangan Khusus & Risiko
- **gxp-mcda harus unblock** (lihat 3.1) — gate utama
- **gxp-qgis fake-server mode**: real QGIS belum deploy. Banyak QGIS algos krusial untuk RDTR.
- **Permen ATR/BPN 11/2021 update**: rule engine harus easily configurable (data-driven).
- **Build-graph for evacuation**: setup graph A* per kabupaten (~30 menit/kab). Plan rollout.

#### Action Items
1. Unblock gxp-mcda + deploy real gxp-qgis (kritis)
2. Build-graph A* per kabupaten pilot (start dengan 19 provinsi)
3. Koordinasi ATR/BPN untuk NSPK schema final
4. Sprint Y1-Q3: prototype dengan Demak (full dataset tersedia)


---

## FITUR 4.2: Food Security — Rice Field Flood & Drought Impact

### Tujuan Pengembangan
Memantau dan memproyeksikan **dampak banjir dan kekeringan terhadap produksi sawah** sebagai pilar utama ketahanan pangan Indonesia. Tujuan:
1. **Estimasi kerugian produksi** per musim tanam
2. **Identifikasi area sawah rentan** yang perlu prioritas irigasi/asuransi
3. **Early warning** untuk musim tanam berikutnya
4. **Dukung kebijakan** Kementan & Bulog

### Landasan TOR
> **§1.3b.3.a:** "*Rice field drought and flood impact modeling for food security analysis*"

### Deskripsi Fungsional
Modul ini **menggabungkan** output Flood-Drought (Modul 2.6) dengan **layer sawah** dan **musim tanam (kalender tanam)** untuk menghasilkan estimasi spasial kerugian produksi padi. Menggunakan AI untuk memodelkan **yield response function** spesifik per zona agroekologi.

### Input Data

| # | Nama | Sumber | Format |
|---|------|--------|--------|
| 1 | Peta sawah | Kementan, KSA, classification dari Modul 2.2 | Vector + COG |
| 2 | Kalender tanam | Kementan (KATAM) | CSV/Vector |
| 3 | Banjir hazard map (Modul 2.6) | Internal | COG |
| 4 | Drought index (SPI/SPEI/VHI) (Modul 2.6) | Internal | NetCDF/COG |
| 5 | Climate proyeksi (Modul 2.1) | Internal | NetCDF |
| 6 | Varietas padi (database) | Kementan, IRRI | Database |
| 7 | Yield historis | Kementan, BPS | CSV per kab-kota |
| 8 | Irrigation infrastructure | PUPR | Vector |
| 9 | Soil characterization | Balittan | GeoTIFF |
| 10 | Satellite NDVI/EVI (untuk monitoring) | MODIS, Sentinel-2 | COG |
| 11 | Citra radar Sentinel-1 (sawah-padi detection) | ESA | GRD |

### Algoritma & Metode

**1. Rice Field Detection (Multi-temporal)**
- Sentinel-1 SAR time-series untuk rice phenology (panen → bera → tanam baru)
- Backscatter signature spesifik padi
- ML classifier untuk pre-existing classification refinement
- Output: peta sawah aktif per musim

**2. Yield Estimation Baseline**
- Crop simulation model (DSSAT-CERES-Rice atau APSIM-ORYZA)
- Calibration dengan yield historis per kab
- Per musim: GMT (Gadu, MT-1, MT-2), Sadon, Walik
- Output: expected yield (ton/ha) per kondisi normal

**3. Impact Calculation (Banjir)**
```
Yield_loss_flood = baseline_yield × impact_factor(depth, duration, growth_stage)

Impact factor curves (per stage):
  - Vegetative (0-30 hari): tolerance medium
  - Reproductive (30-60 hari): sensitive (loss up to 100% if > 7 hari genangan)
  - Maturing (60-90 hari): less sensitive
```

**4. Impact Calculation (Kekeringan)**
```
Yield_loss_drought = baseline_yield × f(SPEI, NDVI_anomaly, growth_stage)

Drought stress functions per stage berbeda
```

**5. AI Refinement**
- Random Forest regressor untuk yield loss dengan features:
  - Hazard indicators
  - Soil, irrigation access
  - Variety code
  - Historical management
- Train dengan paired observation (loss data Kementan)

**6. Aggregation & Reporting**
- Sum per kabupaten/kota → estimasi kerugian volume & nilai (IDR)
- Compare dengan target nasional Bulog
- Time-series proyeksi musim depan

### Output

| Output | Format |
|--------|--------|
| Peta sawah aktif per musim | COG |
| Peta yield expected | COG |
| Peta yield loss (banjir) | COG |
| Peta yield loss (kekeringan) | COG |
| Peta yield loss kombinasi | COG |
| Statistik kerugian per kab | CSV/JSON |
| Early warning area | GeoJSON + Alert |
| Time-series produksi proyeksi | JSON |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Food Security — Rice Field Impact            [User ▼]       │
├────────────────────────────────────────────────────────────────────┤
│ ┌── PARAMETER ──────────┐ ┌── PETA YIELD LOSS ────────────────────┐│
│ │ Provinsi: Jawa Tengah ▼│ │                                       ││
│ │ Musim: MT-1 2026 ▼     │ │   [Peta dengan layer sawah + impact]  ││
│ │                       │ │                                        ││
│ │ Hazard:               │ │   ▓ Loss > 50% (zona kritis)           ││
│ │ ☑ Banjir              │ │   ▒ Loss 20-50%                        ││
│ │ ☑ Kekeringan          │ │   ░ Loss < 20%                         ││
│ │ ☐ Hama (TBD)          │ │   ⌗ Sawah aman                         ││
│ │                       │ │                                        ││
│ │ Skenario Climate:     │ └────────────────────────────────────────┘│
│ │ ○ Current obs         │ ┌── KPI DASHBOARD ─────────────────────┐  │
│ │ ◉ 2026 Forecast       │ │ Total sawah aktif: 723,000 ha         │  │
│ │ ○ 2050 SSP2-4.5       │ │ Sawah terdampak: 184,000 ha (25%)     │  │
│ │                       │ │ Loss banjir: ~48,000 ton              │  │
│ │ [▶ Calculate]         │ │ Loss kekeringan: ~67,000 ton          │  │
│ │ [⤓ Export]           │ │ Total kerugian: ~115,000 ton          │  │
│ │ [📧 Alert Kementan]   │ │ Nilai estimasi: IDR 575 M             │  │
│ │                       │ │                                        │  │
│ │                       │ │ vs baseline tahun lalu: ▲ +18%        │  │
│ └───────────────────────┘ └────────────────────────────────────────┘│
│ ┌── TIME-SERIES PRODUKSI 5 TAHUN TERAKHIR + PROYEKSI ───────────┐ │
│ │  Produksi (juta ton)                                            │ │
│ │   5│   ●─●─●─●─●  baseline    ╭─◯─◯  proyeksi optimis           │ │
│ │   4│                          │                                  │ │
│ │   3│                       ⚠ ◯─◯─◯ proyeksi pesimis             │ │
│ │   2│                                                              │ │
│ │     2020  2022  2024  2026  2028  2030                          │ │
│ └────────────────────────────────────────────────────────────────────┘ │
│ ┌── PRIORITAS INTERVENSI (klik kab di peta) ────────────────────┐  │
│ │ Kab. Demak: loss 30%                                            │  │
│ │ Penyebab utama: banjir akibat rob + drainase buruk              │  │
│ │ Rekomendasi:                                                    │  │
│ │   1. Pembangunan tanggul lokal (priority high)                  │  │
│ │   2. Asuransi padi (AUTP) prioritas untuk 12.000 petani        │  │
│ │   3. Varietas tahan banjir (Inpari 30) untuk MT berikutnya     │  │
│ │ [→ Detail RDTR untuk Demak]                                    │  │
│ └────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur
```
[Trigger: awal musim tanam ATAU manual]
  │
  ▼
[FOOD-SECURITY-SERVICE]
  │ 1. Detect sawah aktif (multi-temporal SAR)
  │ 2. Estimate baseline yield (DSSAT)
  │ 3. Fetch hazard (Modul 2.6)
  │ 4. Apply impact functions
  │ 5. AI refinement (RF)
  │ 6. Aggregate per kab-kota
  ▼
[OUTPUT + ALERT]
  │ Save layers; if loss > threshold → alert Kementan
```

### Dependencies
**Internal:** 2.1, 2.2, 2.6  **External:** Kementan, IRRI, BPS, AUTP database

**Library:** DSSAT-py, APSIM bridge, scikit-learn, rasterio

### Akses Per Tier
- Government Full + Kementan tier: semua data, alert
- Researcher: API + sandbox
- Private: visualization, no raw
- Public: nasional level only

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Food Security SDSS) + Leverage Plugin Pendukung  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (food security = NDC + SDG 2 priority)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-climate | 19235 | Curah hujan + suhu + ET0 NetCDF untuk DSSAT input, drought indices | Integrasi via API GeoVertix |
| gxp-inference | 19210 | Custom rice-detection ONNX (perlu train dari Sentinel-1 SAR) | API call ke GeoVertix + train model |
| gxp-ml | 19240 | classify_landuse.py untuk rice field detection alternatif; predict_values.py untuk yield estimation | API call ke GeoVertix |
| gxp-areainfo | 19285 | Aggregation per kab/kota untuk total kerugian | API call ke GeoVertix |
| gxp-qgis | 19245 | NDVI/EVI computation, focal stats | API call ke GeoVertix |

#### Metode Integrasi
Bangun **Modul Food Security SDSS** sebagai modul native di backend SDSS** karena DSSAT-CERES-Rice dan crop modeling adalah domain spesifik:
1. **Rice field detection**: API call ke GeoVertix gxp-inference dengan custom rice-SAR model atau gxp-ml::classify_landuse dengan training samples sawah
2. **Yield baseline (DSSAT)**: scripts Python di Modul Food Security SDSS — DSSAT Python wrapper
3. **API call ke GeoVertix gxp-climate** untuk hazard layers (banjir genangan, drought SPEI)
4. **AI refinement** API call ke GeoVertix gxp-ml::predict_values (RF/XGBoost)
5. **Aggregation** API call ke GeoVertix gxp-areainfo per kab
6. Output: yield loss map + kerugian volume + IDR estimate + AUTP recommendation

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Food Security SDSS plugin** dengan schema sdss_foodsec.*
- **DSSAT-CERES-Rice Python wrapper** (~4 minggu)
- **Rice phenology growth stage logic** (~2 minggu)
- **Impact functions** banjir (depth × duration × stage) dan drought (SPEI × NDVI × stage) (~3 minggu)
- **Custom rice-SAR ONNX model** training (~6 minggu)
- **Kementan KATAM integration** untuk kalender tanam (~2 minggu, via adapter framework K/L)
- **AUTP database integration** untuk asuransi (~1 minggu)
- Frontend Food Security Dashboard (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **DSSAT calibration per zone agroekologi**: butuh data observasi per kab (Kementan ATAP) — koordinasi.
- **APSIM-ORYZA alternatif** jika DSSAT tidak feasible.
- **Sentinel-1 acquisition continuity** (sama dengan 2.5).
- **Early warning timing**: alert harus sebelum musim tanam (minimum H-30 dari tanam) untuk actionable.

#### Action Items
1. Koordinasi Kementan untuk ATAP data + KATAM calendar
2. Sprint Y2-Q1: pilot di Jawa Tengah (data padi lengkap)
3. Train rice-SAR detection model


---

## FITUR 4.3: Coastal Vulnerability Assessment

### Tujuan Pengembangan
Memberikan **penilaian kerentanan pesisir yang komprehensif** untuk garis pantai Indonesia (~108,000 km, terpanjang #2 dunia setelah Kanada) dengan integrasi faktor **fisik (Modul 2.5) + sosial-ekonomi + ekologi (mangrove)**. Output mendukung prioritisasi adaptasi pesisir (relokasi, sea wall, restorasi mangrove).

### Landasan TOR
> **§1.3b.3.b:** "*Coastal vulnerability assessment for Indonesia's extensive coastlines*"

> **§1.3b.1.e.iii:** "*Coastal Vulnerability Assessment Integrating Physical and Socioeconomic Factors*"

### Deskripsi Fungsional
Mengintegrasikan **Coastal Vulnerability Index (CVI)** klasik dengan **Socio-Economic Vulnerability Index (SVI)** dan **Ecological Resilience Index (ERI)** menjadi **Composite Coastal Vulnerability Index (CCVI)**. Dilakukan per segmen pantai (~1km).

### Input Data
| Variabel | Sumber |
|----------|--------|
| Slope pantai | DEMNAS, LiDAR |
| Geomorfologi | BIG, BG |
| Tide range | PASUT BIG |
| Wave climate | ERA5 wave, Wave Watch III |
| SLR rate (Modul 2.5) | Internal |
| Subsidence (Modul 2.5) | Internal |
| Shoreline change (Modul 2.5) | Internal |
| Densitas penduduk pesisir | BPS gridded |
| Aset infrastruktur kritis | PUPR, OSM |
| Mangrove extent | Global Mangrove Watch |
| Kawasan koral | KKP, BRIN |
| Kemiskinan pesisir | BPS |
| Pelabuhan, faskes pesisir | PUPR, Kemenkes |

### Algoritma & Metode

**1. Klasik CVI (USGS approach):**
```
CVI = √[(a × b × c × d × e × f) / 6]

dimana variabel di-rank 1-5:
  a = geomorphology  
  b = coastal slope  
  c = relative sea level rise rate  
  d = shoreline erosion rate  
  e = mean tide range  
  f = mean wave height
```

**2. SVI (Socio-Economic):**
- Densitas penduduk
- % rumah tangga rentan
- % pekerja sektor primer (nelayan, petani garam)
- Akses sanitasi
- Index kemiskinan

**3. ERI (Ecological):**
- Mangrove area & condition
- Koral reef proximity & health
- Estuarine vegetation
- Skor: higher ERI = lebih resilien

**4. Composite:**
```
CCVI = α × CVI_physical + β × SVI_socio - γ × ERI

dengan α, β, γ dari AHP
```

**5. Segmentation**
- Garis pantai dipotong menjadi segmen ~1 km
- Per segmen: semua nilai dihitung
- Cluster: K-means atau hierarchical untuk tipologi pesisir

### Output

| Output | Format |
|--------|--------|
| CVI map | Vector + COG |
| SVI map | Vector |
| ERI map | Vector |
| CCVI composite | Vector ranked |
| Typology cluster | Vector |
| Priority intervention list | Table + map |
| Adaptation options per segmen | Recommendation |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Coastal Vulnerability Assessment             [User ▼]       │
├────────────────────────────────────────────────────────────────────┤
│ ┌── FILTER WILAYAH ────────┐ ┌── PETA COASTLINE TERINTEGRASI ────┐│
│ │ Provinsi: Jawa Tengah ▼  │ │                                    ││
│ │ Atau Kab: Demak ▼        │ │   [Peta garis pantai berwarna       ││
│ │                          │ │    sesuai CCVI 0-1]                  ││
│ │ Layer:                   │ │                                      ││
│ │ ◉ CCVI Composite         │ │   ━━━ CCVI > 0.7 (kritis, merah)     ││
│ │ ○ CVI Physical only      │ │   ━━━ 0.4-0.7 (sedang, oranye)       ││
│ │ ○ SVI Socio only         │ │   ━━━ < 0.4 (rendah, hijau)          ││
│ │ ○ ERI Ecological only    │ │                                      ││
│ │ ○ Typology Cluster       │ │   Klik segmen → detail               ││
│ │                          │ │                                      ││
│ │ Skenario:                │ │   Overlay:                           ││
│ │ ◉ Current                │ │   ☑ Mangrove                         ││
│ │ ○ 2050 SSP2-4.5          │ │   ☑ Populasi terdampak               ││
│ │ ○ 2100 SSP5-8.5          │ │   ☑ Aset kritis                      ││
│ │                          │ │                                      ││
│ │ [▶ Recompute]            │ │                                      ││
│ │ [⤓ Export Segments]     │ │                                      ││
│ └──────────────────────────┘ └──────────────────────────────────────┘│
│ ┌── DETAIL SEGMEN (klik di peta) ────────────────────────────────┐  │
│ │ Segmen S-Demak-042 (1.2 km, Kec. Sayung)                       │  │
│ │                                                                  │  │
│ │  Component scores:                                               │  │
│ │   CVI physical: 0.85 ▓▓▓▓▓▓▓▓░░                                  │  │
│ │   SVI socio:    0.72 ▓▓▓▓▓▓▓░░░                                  │  │
│ │   ERI ecologic: 0.18 ▒░░░░░░░░░ (mangrove rusak)                │  │
│ │   CCVI:         0.81 (Kritis)                                    │  │
│ │                                                                  │  │
│ │ Driver utama:                                                    │  │
│ │   - Subsidence 9.4 cm/yr                                          │  │
│ │   - Densitas 3,800 jiwa/km² di buffer 500m                       │  │
│ │   - Mangrove tinggal 7% dari historic                            │  │
│ │                                                                  │  │
│ │ Adaptation options (recommended):                                 │  │
│ │   1. Mangrove rehabilitation 240 ha (cost: IDR 24 M, benefit/cost│  │
│ │      ratio 3.2)                                                  │  │
│ │   2. Tanggul + rumah pompa (cost: IDR 180 M, BCR 1.8)            │  │
│ │   3. Relokasi rumah pesisir 200 KK (cost: IDR 60 M, BCR 4.1)     │  │
│ │   [→ MCDA untuk decide]                                          │  │
│ └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur
```
[USER pilih provinsi/kab]
  │
  ▼
[COASTAL-SERVICE]
  │ 1. Get garis pantai (BIG)
  │ 2. Segment 1km
  │ 3. Per segmen: compute CVI, SVI, ERI
  │ 4. Composite CCVI
  │ 5. Cluster typology
  │ 6. Recommend interventions (lookup db × CCVI score)
  ▼
[OUTPUT]
  │ Vector with attributes
```

### Dependencies
**Internal:** 2.4, 2.5, 3.1  **External:** BPS, KKP, PUPR

### Akses Per Tier
- Government Full + KKP tier: semua
- Researcher, Private, Public sesuai pattern umum

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend (Thin Wrapper di atas gxp-mcda)  
**Coverage dari GeoVertix:** 50%  
**Estimasi Effort Saving:** 55%  
**Prioritas:** TINGGI (108,000 km pantai Indonesia)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mcda** | 19286 | **CCVI composite scoring** (CVI_physical + SVI_socio - ERI_ecological) dengan AHP weights | Integrasi via API GeoVertix (core) |
| gxp-geoprocess | 19215 | Segmentation garis pantai 1km, buffer 500m untuk populasi catchment | Integrasi via API GeoVertix |
| gxp-qgis | 19245 | Distance matrix segmen-ke-asset, KDE density penduduk pesisir | API call ke GeoVertix |
| gxp-areainfo | 19285 | Per-segment summary multi-layer | API call ke GeoVertix |
| gxp-inference | 19210 | yolov8-buildings untuk asset inventory pesisir | API call ke GeoVertix |

#### Metode Integrasi
**Coastal Vulnerability = MCDA application** ke pesisir. Build thin wrapper:
1. **Segmentation 1km**: API call ke GeoVertix gxp-geoprocess split garis pantai
2. **Per-segment indikator** dari multiple sources (Modul 2.5 SLR, BPS populasi, KKP koral)
3. **CCVI composite**: API call ke GeoVertix gxp-mcda dengan weight α (physical), β (socio), -γ (ecological)
4. **Typology clustering**: API call ke GeoVertix gxp-ml::cluster_points (K-means)
5. **Adaptation lookup**: internal database (mangrove rehab, tanggul, sea wall, relokasi)

#### Yang Perlu DIBANGUN BARU/Extension
- **Coastal segmentation pipeline** (~1 minggu)
- **CVI USGS formula** wrapper (sudah formula, mapping ke gxp-mcda inputs) (~1 minggu)
- **ERI ecological** scoring (mangrove condition, coral health) (~2 minggu)
- **Adaptation options lookup table** dengan cost/benefit (~2 minggu)
- Frontend Coastal Vulnerability Explorer (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **gxp-mcda dependency** sama dengan 3.1
- **Mangrove condition data** dari Global Mangrove Watch (open) + KKP (semi-restricted)
- **MoU dengan KKP** untuk koral monitoring data
- **108,000 km pantai** = ~108,000 segmen 1km. Pre-compute aggressive.

#### Action Items
1. Same as 3.1 + unblock gxp-mcda
2. MoU KKP untuk koral & mangrove data
3. Pilot 3 wilayah: Pantura, NTB, Kep Riau


---

## FITUR 4.4: Forest Fire Risk Prediction (ENSO-aware)

### Tujuan Pengembangan
Prediksi **risiko kebakaran hutan & lahan** harian-mingguan dengan integrasi:
1. **ENSO signal** (El Niño meningkatkan risiko di Sumatra/Kalimantan)
2. **Hotspot history** dari satelit
3. **Fuel condition** (kelembaban vegetasi)
4. **Faktor antropogenik** (aktivitas pertanian, jalan, pemukiman)

Mendukung kesiapsiagaan KLHK Manggala Agni dan BNPB.

### Landasan TOR
> **§1.3b.3.c:** "*Forest fire risk prediction incorporating El Niño-Southern Oscillation (ENSO) patterns*"

### Input Data

| # | Nama | Sumber |
|---|------|--------|
| 1 | Hotspot history (MODIS, VIIRS) | NASA FIRMS |
| 2 | ENSO indices (ONI, MEI, SOI) | NOAA, BMKG |
| 3 | Land cover (Modul 2.2) | Internal |
| 4 | Peta gambut nasional | KLHK |
| 5 | Soil moisture (SMAP, ASCAT) | NASA, EUMETSAT |
| 6 | VHI, FDI dari satelit | MODIS, internal |
| 7 | NDMI (moisture index) | Sentinel-2 derived |
| 8 | Weather forecast (BMKG) | BMKG API |
| 9 | Climate (Modul 2.1) | Internal |
| 10 | Jalan, pemukiman, ladang | OSM, KLHK |
| 11 | Historical fire perimeter | KLHK SIPONGI |

### Algoritma & Metode

**1. ENSO Signal Integration**
- Use ONI 3-month rolling mean
- El Niño classification: weak (0.5-1.0), moderate (1.0-1.5), strong (>1.5)
- Lagged correlation: El Niño JJA → fire risk SON di Sumatra/Kalimantan

**2. Fire Weather Index (FWI System)**
- Canadian FWI: FFMC, DMC, DC → ISI, BUI → FWI
- Indonesia adaptation: FWI-PEAT for lahan gambut

**3. Fuel Moisture from Satellite**
- NDMI, NMDI
- Dryness anomaly vs climatology

**4. ML Model**
- **Gradient Boosting** (LightGBM/XGBoost) untuk daily probability
- Features: FWI, NDMI, ENSO, LC, proximity to anthropogenic
- Target: hotspot occurrence next 7 days
- Train: historical 2010-2023

**5. Probabilistic Forecast**
- Output: probability 0-1 per cell per day
- Confidence interval dari ensemble

**6. Smoke Plume Forecast (Optional)**
- HYSPLIT atau in-house plume model
- Wind-driven dispersal
- Output: PM2.5 forecast untuk transboundary haze

### Output
| Output | Format |
|--------|--------|
| Daily fire probability | COG |
| Weekly outlook | COG sequence |
| Hotspot near real-time | Vector (point) |
| Smoke plume forecast | COG sequence |
| Risk-level alert | GeoJSON + Push |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Forest Fire Risk Prediction                    [User ▼]     │
├────────────────────────────────────────────────────────────────────┤
│ ┌── KONTROL ───────────────┐ ┌── PETA RISIKO HARIAN ──────────────┐│
│ │ Tanggal: 2026-09-15 ▼    │ │                                     ││
│ │ Periode forecast: 7 hari │ │  [Peta dengan probability 0-1]      ││
│ │                          │ │                                     ││
│ │ ENSO Status:             │ │  ▓ Very High (> 0.7)                ││
│ │ El Niño Moderate         │ │  ▒ High (0.4-0.7)                   ││
│ │ ONI: +1.3 (peak SOND)    │ │  ░ Medium (0.2-0.4)                 ││
│ │                          │ │  ⌗ Low                              ││
│ │ Layer:                   │ │                                     ││
│ │ ☑ Probability today      │ │  ● Active hotspot (today, MODIS)    ││
│ │ ☑ Hotspot (24h)          │ │  ○ Hotspot 7-day                    ││
│ │ ☑ Peatland               │ │                                     ││
│ │ ☐ Smoke plume forecast   │ │                                     ││
│ │ ☐ Historic fire perim.   │ │                                     ││
│ │                          │ │                                     ││
│ │ Animation 7-day:         │ │                                     ││
│ │ [▶ Play]                 │ │                                     ││
│ │                          │ │                                     ││
│ │ Subscribe Alert:         │ │                                     ││
│ │ [+ Add AOI]              │ │                                     ││
│ │                          │ │                                     ││
│ │ [→ Manggala Agni Mode]   │ │                                     ││
│ └──────────────────────────┘ └─────────────────────────────────────┘│
│ ┌── KORELASI ENSO-FIRE 30 TAHUN ────────────────────────────────┐  │
│ │  ONI vs Hotspot count                                           │  │
│ │   2│ ●                ●                                  ●     │  │
│ │   1│   ●   ●     ●      ●●                          ●          │  │
│ │   0│ ─●─●─●●─●─●─●●─●●─●●─●─●─●─●─●─●─●●─●─●─●─●─●─●─●─        │  │
│ │  -1│●     ●         ●               ●          ●               │  │
│ │  -2│                                                            │  │
│ │     '94  '98  '02  '06  '10  '14  '18  '22  '24  '26           │  │
│ │  Correlation r=0.78 (p<0.001)                                    │  │
│ └─────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur
```
[Daily trigger 04:00 WIB]
  │
  ▼
[INGEST]
  │ MODIS/VIIRS hotspot last 24h, BMKG forecast,
  │ ENSO index, satellite moisture
  ▼
[FEATURE PIPELINE]
  │ Compute FWI, NDMI, ENSO state
  ▼
[ML INFERENCE]
  │ LightGBM model → probability per cell
  ▼
[POST-PROCESSING]
  │ Smoothing, anomaly check
  ▼
[ALERT GENERATION]
  │ Threshold check → notify subscribers
  ▼
[STORAGE]
  │ COG + DB
```

### Dependencies
**Internal:** 2.1, 2.2  **External:** NASA FIRMS, BMKG, NOAA, KLHK SIPONGI

### Akses Per Tier
- KLHK Manggala Agni: full + alert + tactical layers
- BNPB: alert + coordination view
- Public: peta risiko + alert untuk wilayahnya

### Integrasi dengan GeoVertix

**Status Integrasi:** Hybrid (Extend gxp-ml + leverage gxp-climate)  
**Coverage dari GeoVertix:** 45%  
**Estimasi Effort Saving:** 50%  
**Prioritas:** KRITIS pada periode El Niño (2026-2027 ENSO peaking)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-climate** | 19235 | ENSO ONI/MEI/SOI NetCDF ingest, climate driver time-series, rolling correlation | Integrasi via API GeoVertix |
| **gxp-ml** | 19240 | LightGBM/XGBoost script baru untuk fire probability; predict_values.py existing | Integrasi via API GeoVertix + tambah script |
| gxp-qgis | 19245 | NDVI/NDMI dari Sentinel-2/MODIS, focal statistics | API call ke GeoVertix |
| gxp-inference | 19210 | Hotspot detection visual (custom model dari MODIS/VIIRS) | API call ke GeoVertix |
| gxp-areainfo | 19285 | Smoke plume area summary | API call ke GeoVertix |
| gxp-geoprocess | 19215 | Hotspot spatial clustering, persistence check | API call ke GeoVertix |

#### Metode Integrasi
Forest Fire menggabungkan **ENSO signal** (via gxp-climate) + **fuel moisture** (via gxp-qgis NDVI) + **ML predictor** (via gxp-ml):
1. **ENSO ingest**: API call ke GeoVertix gxp-climate untuk ONI/MEI/SOI NOAA NetCDF
2. **Fuel moisture**: API call ke GeoVertix gxp-qgis untuk NDMI dari Sentinel-2
3. **FWI computation**: script baru di gxp-ml (Canadian FWI system + FWI-PEAT adaptation)
4. **ML probability**: deploy LightGBM script ke gxp-ml dengan features ENSO + FWI + NDMI + LC + anthropogenic
5. **Hotspot persistence**: API call ke GeoVertix gxp-geoprocess spatial cluster
6. **Smoke plume**: HYSPLIT wrapper script (heavy)
7. **Alert routing**: ke KLHK Manggala Agni via Modul 13.4

#### Yang Perlu DIBANGUN BARU/Extension
- **FWI Canadian system** script (~2 minggu)
- **FWI-PEAT adaptation** untuk lahan gambut Indonesia (~2 minggu)
- **LightGBM fire probability model** training dengan FIRMS hotspot historis (~4 minggu)
- **HYSPLIT smoke plume wrapper** (~3 minggu, opsional Y2)
- **KLHK SIPONGI integration** (~2 minggu, lihat 13.4)
- **Alert generation** terintegrasi dengan Anomaly Detection (~2 minggu)
- Frontend Fire Risk Console dengan ENSO correlation chart (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **NASA FIRMS API** open access — pastikan rate limit untuk continuous monitoring.
- **Lahan gambut Riau/Sumsel/Kalbar** punya fire behavior unik — model perlu specialized.
- **Transboundary haze** (Malaysia/Singapore) → smoke plume HYSPLIT untuk diplomatic implications.
- **El Niño 2026 peaking** = urgent untuk deploy Y1.

#### Action Items
1. Sprint Y1-Q3 PRIORITAS untuk El Niño season SON 2026
2. MoU dengan KLHK SIPONGI untuk hotspot history Indonesia
3. Train LightGBM dengan archive 2010-2024


---

## FITUR 4.5: Tourism Sector Vulnerability

### Tujuan Pengembangan
Menilai **kerentanan destinasi wisata Indonesia yang climate-dependent** (pantai, koral, terumbu, gunung, alam) dan memberikan rekomendasi adaptasi bagi industri pariwisata.

### Landasan TOR
> **§1.3b.3.e:** "*Tourism sector vulnerability assessment for climate-dependent destinations*"

### Input Data
| Variabel | Sumber |
|----------|--------|
| Destinasi wisata | Kemenparekraf, BPS |
| Daerah wisata bahari | KKP, Kemenparekraf |
| Coral bleaching alert | NOAA Coral Reef Watch |
| Pantai erosion (Modul 2.5) | Internal |
| Cuaca ekstrem (Modul 2.1) | Internal |
| Banjir/Longsor (Modul 2.6) | Internal |
| Air bersih availability | PUPR |
| Biodiversitas (Modul 2.4) | Internal |
| Akses transportasi | OSM, Kemenhub |
| Revenue wisata historis | Kemenparekraf, BPS |

### Algoritma & Metode

**1. Tourism Climate Index (TCI)** — Mieczkowski 1985
```
TCI = 2×(4×Cld + Cla + 2×R + 2×S + W)

dimana:
  Cld = daytime comfort index
  Cla = daily comfort index
  R   = precipitation rating
  S   = sunshine hours rating
  W   = wind rating
```

**2. Holiday Climate Index (HCI)** — Scott 2016 (refinement TCI untuk tropis)

**3. Destination-Specific Resilience**
- Pantai: erosion threat × wave climate × bleaching risk
- Gunung: longsor, eruption-prep (jika berapi)
- Coral: temperature anomaly × bleaching frequency
- Heritage site: extreme weather, sea level (untuk site pesisir)

**4. Composite Tourism Vulnerability Score**

### Output
- Per destination: TCI current vs future
- Resilience score
- Recommended adaptation (mis. relokasi infrastruktur, diversifikasi, koral restoration)

### Detail UI/UX
```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Tourism Sector Vulnerability             [User ▼]           │
├────────────────────────────────────────────────────────────────────┤
│ Provinsi: Bali ▼   Tipe Destinasi: ☑ Pantai ☑ Koral ☑ Gunung      │
│                                                                    │
│ [Peta destinasi dengan resilience score]                          │
│                                                                    │
│ Top 10 destinasi paling rentan (2050 SSP2-4.5):                  │
│   1. Pantai Kuta — TCI -28%, erosion +18%                         │
│   2. Nusa Penida — Bleaching probability 65% (current 12%)        │
│   3. ...                                                           │
│                                                                    │
│ Rekomendasi adaptasi sektor:                                      │
│   • Diversifikasi produk wisata (less beach-dependent)            │
│   • Investment koral restoration                                  │
│   • Climate-resilient infrastructure standard                     │
└────────────────────────────────────────────────────────────────────┘
```

### Akses Per Tier
- Kemenparekraf full, Pemda destinasi, Researcher, Private (tour operators), Public.

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New Lightweight + Leverage Climate  
**Coverage dari GeoVertix:** 35%  
**Estimasi Effort Saving:** 40%  
**Prioritas:** SEDANG (Y2)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-climate | 19235 | Climate data (suhu, hujan, sunshine, wind) untuk TCI/HCI computation | Integrasi via API GeoVertix |
| gxp-areainfo | 19285 | Destinasi-AOI summary untuk resilience score | API call ke GeoVertix |
| gxp-mcda | 19286 | Composite tourism vulnerability scoring | API call ke GeoVertix |
| gxp-qgis | 19245 | Coastal erosion overlay dari Modul 2.5 | API call ke GeoVertix |

#### Metode Integrasi
Tourism Vulnerability adalah aplikasi MCDA + climate-derived index. Lightweight build:
1. API call ke GeoVertix gxp-climate dengan variabel: suhu, hujan, sunshine hours, wind speed
2. TCI Mieczkowski formula sebagai script Python (~1 minggu dev)
3. API call ke GeoVertix gxp-mcda untuk composite (TCI + coastal erosion + landslide + bleaching)
4. Lookup adaptation options dari knowledge base

#### Yang Perlu DIBANGUN BARU/Extension
- **TCI/HCI formula** wrapper (~1 minggu)
- **Coral bleaching DHW** integration (NOAA CRW API) (~1 minggu)
- **Destination database** (Kemenparekraf data) (~2 minggu)
- **Adaptation recommendations** sektor wisata (~1 minggu)
- Frontend Tourism Dashboard (~2 minggu)

#### Pertimbangan Khusus & Risiko
- **Kemenparekraf koordinasi** untuk destinasi master data
- **Pengaruh BCR rendah** mungkin — ROI assessment per investment

#### Action Items
1. Sprint Y2-Q2
2. Pilot Bali (destinasi paling terdokumentasi)


---

## FITUR 4.6: Renewable Energy Deployment Optimization

### Tujuan Pengembangan
**Optimasi penempatan** instalasi energi terbarukan (PLTS, PLTB, PLTM, geothermal) untuk:
1. Mendukung target **bauran energi terbarukan 23% (2025) → 31% (2050)**
2. Identifikasi **lokasi paling cost-effective** dengan biaya jaringan rendah
3. Hindari **konflik penggunaan lahan** (hutan, sawah, konservasi)
4. **Climate-future-proof** (memperhitungkan perubahan irradiance/wind)

### Landasan TOR
> **§1.3b.3.d:** "*Optimization of Renewable Energy Deployment*"

> **§1.3d:** "*Optimization of Renewable Energy Deployment: AI and machine learning can recommend optimal locations for renewable energy installations*"

### Input Data
| Variabel | Sumber |
|----------|--------|
| Solar irradiance (GHI, DNI) | CAMS, NSRDB, ERA5 |
| Wind speed (10m, 50m, 100m) | ERA5, MERRA-2, NEWA |
| Topography (slope, aspect) | DEMNAS |
| Land cover (Modul 2.2) | Internal |
| Grid eksisting | PLN |
| Demand load centers | PLN, BPS |
| Konservasi/hutan | KLHK |
| Geothermal heat flow | ESDM |
| Hydrology (untuk PLTM) | PUPR, Modul 2.6 |
| Future climate (Modul 2.1) | Internal |

### Algoritma & Metode

**1. Resource Assessment**
- Solar: GHI × PR (Performance Ratio) → kWh/m²
- Wind: power curve dari turbine standar × wind speed distribution → MWh
- Geothermal: heat flow × area × extraction efficiency
- Hydro: head × discharge

**2. Suitability Mapping (per teknologi)**
- Solar suitability:
  - GHI > 4.5 kWh/m²/day
  - Slope < 5°
  - Not hutan, sawah aktif, konservasi
  - Distance to grid < 5 km
- Wind suitability:
  - Wind power density > 200 W/m²
  - Slope < 20°
  - Distance from settlement > 500m
- Geothermal:
  - Heat flow > 80 mW/m²
  - Within geothermal field boundaries
- Hydro:
  - Sungai dengan discharge > 0.5 m³/s
  - Head > 5m

**3. Optimization** — Mixed Integer Linear Programming (MILP)
```
Maximize: Σ (Generation_i × Capacity_i)
Subject to:
  - Investment budget ≤ B
  - Land use constraint (not overlap reserved)
  - Grid capacity at injection point
  - Diverse portfolio (geographic spread)
  - Conflict avoidance (sawah, hutan)
```

Solver: OR-Tools, Gurobi (jika lisensi), atau open-source CBC

**4. Climate-Adjusted Projection**
- Future irradiance & wind from Modul 2.1
- Re-run optimization untuk scenario 2030, 2050

**5. Cost Analysis**
- LCOE per teknologi (referensi terbaru)
- CAPEX + OPEX + Grid connection
- Cost-benefit ranking

### Output
| Output | Format |
|--------|--------|
| Suitability map per teknologi | COG |
| Ranked locations | Vector + Table |
| Portfolio optimization output | JSON + chart |
| LCOE map | COG |
| Future suitability | COG |

### Detail UI/UX
```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Renewable Energy Deployment Optimization     [User ▼]       │
├────────────────────────────────────────────────────────────────────┤
│ Teknologi: ☑ PLTS ☑ PLTB ☐ PLTM ☐ Geothermal                       │
│ Wilayah: NTT ▼  Budget: IDR ___ T  Target Capacity: ___ MW         │
│                                                                    │
│ [Peta dengan ranked optimal locations]                            │
│                                                                    │
│ Optimal portfolio (output MILP):                                  │
│   PLTS: 8 lokasi, total 420 MW (rata-rata LCOE: USD 65/MWh)       │
│   PLTB: 3 lokasi, total 180 MW (LCOE: USD 78/MWh)                 │
│   Total: 600 MW, IDR 12.4 T, CO₂ avoided: 480,000 tCO₂/yr         │
│                                                                    │
│   [→ Export ke ESDM template] [→ Compare scenarios]               │
└────────────────────────────────────────────────────────────────────┘
```

### Dependencies
**Internal:** 2.1, 2.2  **External:** PLN, ESDM, CAMS

### Akses Per Tier
- ESDM full, PLN tier full untuk grid integration, Researcher, Private (IPP investors)

### Integrasi dengan GeoVertix

**Status Integrasi:** Orchestrate + Build Optimization Layer  
**Coverage dari GeoVertix:** 55%  
**Estimasi Effort Saving:** 55%  
**Prioritas:** TINGGI (target NRE 23% 2025 → 31% 2050)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mcda** | 19286 | Site suitability MCDA per teknologi (Solar/Wind/Geothermal/Hydro) | Integrasi via API GeoVertix |
| **gxp-qgis** | 19245 | Terrain analysis (slope < 5°/20°), aspect untuk solar, distance-to-grid | Integrasi via API GeoVertix (heavy) |
| gxp-climate | 19235 | Solar irradiance (CAMS NetCDF), wind speed (ERA5) ingest | Integrasi via API GeoVertix |
| gxp-ml | 19240 | predict_values.py untuk yield/capacity estimation per cell | API call ke GeoVertix |
| gxp-geoprocess | 19215 | Constraint overlay (hutan SK, sawah aktif, konservasi) | API call ke GeoVertix |

#### Metode Integrasi
1. **Resource assessment**: API call ke GeoVertix gxp-climate untuk solar/wind data NetCDF
2. **Suitability per teknologi**: API call ke GeoVertix gxp-mcda dengan kriteria specific per tech
3. **Terrain analysis**: API call ke GeoVertix gxp-qgis (slope, aspect)
4. **Constraint overlay**: API call ke GeoVertix gxp-geoprocess (eliminate forbidden)
5. **MILP optimization**: script Python custom di Modul Renewable Energy SDSS (modul native backend) (OR-Tools)
6. **Climate-adjusted projection**: re-run dengan future climate (Modul 2.1)
7. **Export ESDM template**: format converter

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Renewable Energy SDSS plugin** dengan schema sdss_renewable.*
- **MILP optimization** dengan OR-Tools/CBC (~3 minggu)
- **LCOE calculation per teknologi** (~2 minggu)
- **Wind power curve** library (turbine standar) (~1 minggu)
- **ESDM template export** (~1 minggu)
- **PLN grid integration data** (~2 minggu, semi-restricted data)
- Frontend Renewable Energy Planner (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **Data PLN grid** restricted — koordinasi PLN
- **Geothermal field boundaries** dari ESDM (open)
- **OR-Tools open-source** sudah cukup; Gurobi commercial backup

#### Action Items
1. MoU PLN untuk grid existing + capacity data
2. ESDM koordinasi untuk LCOE benchmark + RUEN
3. Sprint Y2-Q2


---

## FITUR 4.7: Land Carrying Capacity Analysis

### Tujuan Pengembangan
Menjawab pertanyaan kunci RDTR: **"berapa banyak populasi/aktivitas yang dapat didukung area ini secara berkelanjutan?"** menggunakan AI dengan **explainable AI (SHAP)** sesuai mandat TOR.

### Landasan TOR
> **§1.3d (paragraf khusus tentang Land Carrying Capacity):**
> "*AI- and ML-assisted land carrying-capacity analysis integrates geospatial data, environmental constraints, and development pressures to estimate how much population or land-use activity an area can sustainably support... uses satellite-derived features (land cover, slope, soil, flood risk, accessibility), combined with socio-economic indicators, to train predictive models such as gradient boosting, random forests, or spatial CNNs that generate suitability and capacity scores for each spatial unit. By simulating alternative land-use or infrastructure scenarios and identifying limiting factors through explainable AI (e.g., SHAP), the model produces a dynamic, data-driven assessment of the maximum sustainable development*"

### Deskripsi Fungsional
Modul ini melatih **gradient boosting / random forest / spatial CNN** untuk memprediksi **carrying capacity score** per unit spasial. Yang penting: setiap prediksi disertai **SHAP explanation** untuk transparansi.

### Input Data (Features)
| Variabel | Sumber |
|----------|--------|
| Land cover (Modul 2.2) | Internal |
| Slope, elevation | DEMNAS |
| Soil quality | Balittan |
| Banjir risk (Modul 2.6) | Internal |
| Aksesibilitas (jarak jalan, kota) | OSM |
| Air bersih availability | PUPR |
| Listrik availability | PLN |
| Sanitation infrastructure | BPS |
| Densitas penduduk eksisting | BPS |
| Climate suitability | Modul 2.1 |
| Sawah produktivitas | Modul 4.2 |
| Hutan & konservasi | KLHK |
| Pertambangan IUP | ESDM |

### Target Variable
- **Sustainability score 0-1** dari composite indicator (proxy):
  - Tidak melebihi kapasitas air
  - Tidak overload sanitasi
  - Tidak konversi hutan kritis
  - Tidak high-risk hazard
  - Maintains ecosystem services

### Algoritma & Metode

**1. Feature Engineering**
- Distance transforms (jarak ke jalan, kota, sungai)
- Density (populasi dalam buffer)
- Aggregation per H3 hexagon (resolution 8 atau 9)

**2. Model**
- **Gradient Boosting (LightGBM)** sebagai baseline
- **Spatial CNN** untuk capture spatial context
- **Ensemble**: avg prediction

**3. SHAP Explanation**
- TreeSHAP untuk LightGBM (fast, exact)
- Per prediction: top 5 features kontribusi
- Global: feature importance ranking

**4. Scenario Simulation**
- Apply hypothetical change (mis. add 1000 jiwa, build road)
- Re-predict capacity
- Identify limiting factors via SHAP

### Output
| Output | Format |
|--------|--------|
| Carrying capacity score map | COG |
| Capacity remaining (per unit) | COG |
| SHAP global importance | Bar chart |
| Per-unit SHAP explanation | JSON (on-click) |
| Limiting factor map | Categorical COG |
| Scenario diff | COG |

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Land Carrying Capacity Analysis (with SHAP)   [User ▼]      │
├────────────────────────────────────────────────────────────────────┤
│ Wilayah: Kab. Demak ▼                                              │
│                                                                    │
│ ┌── PETA CARRYING CAPACITY ───────────┐ ┌── SHAP GLOBAL ──────────┐│
│ │                                       │ │ Feature Importance:    ││
│ │ [Peta dengan score 0-1]              │ │ ░ Water available 0.28 ││
│ │                                       │ │ ░ Slope          0.18  ││
│ │ ▓ Capacity tinggi tersisa            │ │ ░ Soil quality   0.14  ││
│ │ ▒ Capacity sedang                    │ │ ░ Flood risk     0.12  ││
│ │ ░ Capacity rendah (mendekati limit)  │ │ ░ Aksesibilitas  0.10  ││
│ │ ▓ Sudah melebihi (overloaded)        │ │ ░ Sanitation     0.08  ││
│ │                                       │ │ ░ ...                  ││
│ │ Limiting factor overlay:              │ └────────────────────────┘│
│ │ ⌗ Water: 320 km²                     │                            │
│ │ ⌗ Sanitation: 180 km²                │ ┌── PER-CELL EXPLANATION ┐│
│ │ ⌗ Hazard: 120 km²                    │ │ (klik cell di peta)    ││
│ │                                       │ │                         ││
│ │ Klik cell → detail SHAP per cell     │ │ Cell H3-887c4...        ││
│ │                                       │ │ Predicted CC: 0.34      ││
│ └───────────────────────────────────────┘ │                         ││
│                                            │ Top factor (negative):  ││
│ ┌── SCENARIO SIMULATION ────────────┐    │  Water available -0.15 ││
│ │ Add population: [+1000 jiwa]        │    │  Flood risk     -0.08  ││
│ │ Add infrastructure: ☐ road ☐ water  │    │ Top factor (positive):  ││
│ │                                       │   │  Aksesibilitas  +0.05  ││
│ │ [▶ Simulate]                         │   │                         ││
│ │                                       │   │ Recommendation:         ││
│ │ Hasil:                                │   │  Pre-condition: tingkat ││
│ │   CC akan turun dari 0.45 → 0.31     │   │  kan supply air bersih ││
│ │   Limit utama: water                  │   │  sebelum tambah pop.   ││
│ └───────────────────────────────────────┘   └─────────────────────────┘│
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur
```
[USER pilih wilayah]
  │
  ▼
[CARRYING-CAP-SERVICE]
  │ 1. Fetch features per H3 cell
  │ 2. Inference (LightGBM + Spatial CNN ensemble)
  │ 3. SHAP computation
  │ 4. Identify limiting factor per cell
  ▼
[OUTPUT]
  │ Map + per-cell explanation
  ▼
[USER klik cell → detail SHAP]
[USER run scenario → re-predict]
```

### Dependencies
**Internal:** 2.1, 2.2, 2.6, 4.2; **External:** PUPR (water), PLN, BPS

**Library:** lightgbm, shap, PyTorch (spatial CNN), h3-py

### Karakteristik Non-Fungsional
| Aspek | Target |
|-------|--------|
| Inference per kecamatan | < 10 detik |
| Model accuracy (R²) | > 0.75 |
| SHAP computation per cell | < 1 detik |

### Validasi & QA
- Cross-validation geographic
- Expert review parameter
- Compare with KLHS document existing

### Akses Per Tier
- Government Full, ATR/BPN, Pemda full
- Researcher: full + custom training
- Private/Public: visualization only


### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-ml + Build XAI Service  
**Coverage dari GeoVertix:** 70%  
**Estimasi Effort Saving:** 65%  
**Prioritas:** TINGGI (mandatory di TOR §1.3d carrying capacity)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-ml** | 19240 | **predict_values.py** (XGBoost regression) — MATCH dengan requirement TOR | Integrasi via API GeoVertix (core) |
| **gxp-qgis** | 19245 | Distance transforms (jarak jalan/kota/sungai), terrain features, density | Integrasi via API GeoVertix (heavy) |
| gxp-mcda | 19286 | Composite scoring alternatif (jika non-ML approach diinginkan) | API call ke GeoVertix alternatif |
| gxp-areainfo | 19285 | Per-cell H3 aggregation | API call ke GeoVertix |
| gxp-geoprocess | 19215 | H3 hexagon tesselation, spatial join indikator | Integrasi via API GeoVertix |

#### Metode Integrasi
**TOR EKSPLISIT menyebut**: "gradient boosting, random forests, atau spatial CNNs" + "explainable AI (e.g., SHAP)". gxp-ml::predict_values.py sudah XGBoost/RF — perfect fit.
1. **Feature engineering**: API call ke GeoVertix gxp-qgis untuk distance transforms + terrain
2. **H3 hexagon tesselation**: API call ke GeoVertix gxp-geoprocess + h3-py library
3. **Training & inference**: API call ke GeoVertix gxp-ml::predict_values.py (XGBoost)
4. **SHAP explanation**: tambah xai service (bisa di gxp-ml atau standalone Modul XAI Service SDSS)
5. **Spatial CNN ensemble**: ONNX deploy ke gxp-inference (custom training)
6. **Scenario simulation**: re-predict dengan modified features

#### Yang Perlu DIBANGUN BARU/Extension
- **SHAP service** (~2 minggu) — bisa standalone Modul XAI Service SDSS atau extend gxp-ml
- **Spatial CNN training** custom (~4 minggu)
- **Limiting factor identification** logic (~1 minggu)
- **Scenario simulation engine** (~2 minggu)
- **H3 hexagon visualization** frontend (~2 minggu)
- Frontend Carrying Capacity Explorer dengan SHAP global + per-cell (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **SHAP computation cost**: TreeSHAP fast tapi DL-SHAP slow — pre-compute per cell.
- **Training labels** = sustainability score composite, harus didefinisikan dengan KLHS expert.
- **Cross-module dependency** dengan banyak modul lain (LULC, climate, water, dll).

#### Action Items
1. Define sustainability composite score formula (KLHS coordination)
2. Install shap, h3-py di gxp-ml container
3. Sprint Y2-Q2


---

---

# BAGIAN 5 — SDSS DECISION SUPPORT CORE (10 Sub-Fitur)

Inilah **inti SDSS** sesungguhnya — yang membedakan platform ini dari portal GIS biasa. TOR §1.3c menyebutkan 3 enhancement utama plus paragraf-paragraf naratif. Berikut elaborasi mendetail.

## FITUR 5.1: Multi-Level Decision Support Architecture **(BARU - DIPERLUAS)**

### Tujuan Pengembangan
Menyediakan **interface dan workflow yang berbeda per level pemerintahan** karena kebutuhan analisis dan keputusan **berbeda secara fundamental**:
- **Nasional (Pusat):** koordinasi lintas K/L, alokasi anggaran, NDC compliance
- **Provinsi:** harmonisasi antar kabupaten, RTRW provinsi
- **Kabupaten/Kota:** operasional RDTR, BPBD, OPD sektoral

### Landasan TOR
> **§1.3c #1:** "*Multi-level Decision Support Architecture: a) Customized interfaces for different governance levels (national, provincial, district); b) Role-specific dashboards aligned with institutional mandates and authority; c) Integration with Indonesia's planning frameworks (RPJMN, RPJMD, RDTR); d) Compatibility with existing decision-making workflows in relevant ministries*"

### Deskripsi Fungsional

Sistem menyediakan **3+ workspace berbeda** dengan agregasi data yang sesuai, KPI yang berbeda, decision aids yang berbeda.

**Workspace Nasional (BIG, BMKG, BNPB, KLHK pusat):**
- Dashboard nasional dengan agregasi 19 provinsi pilot + perluasan
- NDC tracker (compliance progress)
- Inter-province comparison
- Cross-K/L coordination dashboard
- Strategic decision support (alokasi anggaran adaptasi nasional)
- Integration: RPJMN, RAN-API (Rencana Aksi Nasional Adaptasi Perubahan Iklim)

**Workspace Provinsi (Bappeda, BPBD Provinsi, OPD sektoral):**
- Dashboard provinsi dengan agregasi kab-kota
- Coordination antara kab-kota
- Project pipeline untuk APBD
- Integration: RPJMD, RAD-API (Rencana Aksi Daerah)

**Workspace Kabupaten/Kota (Bappeda, BPBD, OPD):**
- Operational view per kecamatan/desa
- RDTR drafting tools
- Tactical alert handling
- Integration: RDTR, RPJMD

### Algoritma & Metode (untuk agregasi multi-level)

**1. Hierarchical Data Aggregation**
```
PerCell (10m-1km) 
  ↓ aggregate
PerKecamatan/Kelurahan
  ↓ aggregate
PerKabupaten/Kota
  ↓ aggregate
PerProvinsi
  ↓ aggregate
Nasional
```
Setiap level: pre-computed aggregation untuk performance + on-demand untuk custom AOI.

**2. Role-Based Access Layering**
- Beda data visibility per role
- Beda decision tools per role
- Beda export format per role

**3. Workflow State Machine**
Per dokumen perencanaan (RDTR, RAD-API), state machine:
```
DRAFT → REVIEW → APPROVED → PUBLISHED
```
Each transition: rule check + signature + audit log.

### Output per Workspace

**Nasional:**
- NDC progress tracker
- Compliance scorecard 19+ provinsi
- Cross-K/L coordination matrix
- Strategic priorities heatmap

**Provinsi:**
- Multi-kabupaten comparison
- Project pipeline visualization
- RPJMD-iklim alignment scorecard

**Kab/Kota:**
- Detailed operational maps
- BPBD command view (real-time hazard)
- OPD-specific workspace (Dinas LHK, Pertanian, dll)

### Detail UI/UX

```
LANDING — User memilih workspace berdasarkan role:

┌────────────────────────────────────────────────────────────────────┐
│ Welcome, Pak Budi (BPBD Kab. Demak)                                │
├────────────────────────────────────────────────────────────────────┤
│ Workspace tersedia untuk role Anda:                                │
│                                                                    │
│ ┌────────────────────────┐  ┌────────────────────────┐            │
│ │ KAB. DEMAK             │  │ PROVINSI JAWA TENGAH    │            │
│ │ (Workspace Utama)      │  │ (View-only)            │            │
│ │                        │  │                         │            │
│ │ • Hazard real-time     │  │ • Comparison           │            │
│ │ • Alert management     │  │ • Provinsi dashboards  │            │
│ │ • RDTR tools           │  │                         │            │
│ │ • OPD coordination     │  │ [Enter →]              │            │
│ │ [Enter →]              │  │                         │            │
│ └────────────────────────┘  └────────────────────────┘            │
│                                                                    │
│ Switch workspace anytime via top navigation                       │
└────────────────────────────────────────────────────────────────────┘

NATIONAL WORKSPACE example:

┌────────────────────────────────────────────────────────────────────┐
│ SDSS National Dashboard           Tier: National ▼ [Switch...]    │
├────────────────────────────────────────────────────────────────────┤
│ ┌── NDC TRACKER ─────────────────────┐ ┌── 19 PROVINSI PILOT ───┐ │
│ │ Target 2030: -31.89% unconditional │ │ [Peta nasional dengan  ││ │
│ │ Target 2030: -43.20% conditional   │ │  status compliance]    ││ │
│ │ Status saat ini:                   │ │                          │ │
│ │   Total emisi: 1,452 MtCO₂eq       │ │  ▓ On-track            │ │
│ │   Reduction achieved: 9.2%         │ │  ▒ Lagging             │ │
│ │   Gap to target: 22.6 pp           │ │  ⌗ Critical risk       │ │
│ │   Status: ⚠ Below trajectory       │ │                          │ │
│ │                                    │ │  ☑ 6 provinsi tahun 1  │ │
│ │ [Detail per sektor → ]            │ │  ☑ 7 provinsi tahun 2  │ │
│ │                                    │ │  ☑ 6 provinsi tahun 3  │ │
│ │                                    │ │                          │ │
│ └────────────────────────────────────┘ └──────────────────────────┘ │
│ ┌── KOORDINASI K/L ───────────────────────────────────────────────┐ │
│ │ Active joint projects:                                          │ │
│ │   Project A: BIG × KLHK × BNPB     Status: ●● Berjalan         │ │
│ │   Project B: BIG × Kementan        Status: ●○○ Planning        │ │
│ │ [Calendar koordinasi →]                                        │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│ ┌── STRATEGIC PRIORITIES HEATMAP ─────────────────────────────────┐ │
│ │                                                                  │ │
│ │ [Peta Indonesia: priority untuk intervensi nasional             │ │
│ │  berdasar combined CCVI + carbon impact + food security]        │ │
│ │                                                                  │ │
│ │ Top 5 prioritas alokasi APBN:                                   │ │
│ │   1. Pesisir Demak-Pekalongan (CCVI 0.81)                       │ │
│ │   2. Lahan gambut Riau (fire risk + emission)                   │ │
│ │   3. ...                                                         │ │
│ └─────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

### Dependencies
**Internal:** Semua modul analitik feed ke level ini  
**External:** Sistem K/L masing-masing (SIRENJA Bappenas, SIPD Kemendagri, dll)

### Akses Per Tier
- Auto-detect role via SSO, default workspace
- Setting: User dapat switch workspace dalam role yang diizinkan

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (SDSS Application Core) + Leverage Core Auth  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** KRITIS (orchestration backbone untuk seluruh SDSS)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | Dispatcher, plugin lifecycle, capability-gated DB access | Foundation |
| gxp-areainfo | 19285 | Hierarchical aggregation per administrasi | API call ke GeoVertix |
| (semua plugin SDSS) | various | Orchestrate calls via dispatcher | API call ke GeoVertix hub |

#### Metode Integrasi
Multi-Level Architecture adalah backbone SDSS itu sendiri. Build **SDSS Application Core** orchestration component di SDSS Application Core:
1. Pakai GeoVertix dispatcher untuk API call ke GeoVertix routing
2. Per-tier workspace (National/Provincial/District) sebagai frontend route + backend filter
3. Hierarchical aggregation dengan API call ke GeoVertix gxp-areainfo (per layer aggregation)
4. RBAC dari GeoVertix core (sudah ada) + extend dengan workflow state per dokumen perencanaan
5. Integration RPJMN/RPJMD/RDTR via Modul 13.x adapter plugins

#### Yang Perlu DIBANGUN BARU/Extension
- **SDSS Application Core orchestration component di SDSS Application Core** (~6 minggu)
- **3 workspace frontends** (National/Provincial/District) dengan layout berbeda (~6 minggu)
- **Hierarchical aggregation pipeline** (cell → kec → kab → prov → nas) dengan pre-compute (~3 minggu)
- **Workflow state machine** per dokumen perencanaan (~3 minggu)
- **RPJMN/RPJMD/RDTR integration adapter** (~4 minggu, paralel dengan 13.x)

#### Pertimbangan Khusus & Risiko
- **Koordinasi dengan tim GeoVertix** untuk register akses API GeoVertix untuk SDSS Application Core service account
- **Performance**: hierarchical aggregation harus pre-compute (cache hari/minggu)
- **K/L specific dashboards** = banyak custom UI per workspace

#### Action Items
1. Sprint 0: SDSS Application Core orchestration component di SDSS Application Core setup
2. Workspace design workshop per tier (Nasional, Provinsi, Kab)


---

## FITUR 5.2: Scenario Manager & Planning Scenario Builder

### Tujuan Pengembangan
Memungkinkan **konstruksi, simpan, bandingkan, dan share skenario perencanaan iklim** yang merupakan kombinasi pilihan parameter (climate scenario, kebijakan, intervensi).

### Landasan TOR
> **§1.3c (paragraf 1):** "*planning scenarios, impact analysis, and customizable adaptation action recommendations*"

> **§1.3c (paragraf 2):** "*The SDSS integrates predictive and prescriptive models, supplemented by evaluation functions...*"

### Deskripsi Fungsional
User dapat membuat skenario sebagai **named object** yang mengikat banyak parameter. Skenario dapat:
- Disimpan & dilanjutkan
- Di-clone & dimodifikasi
- Di-bandingkan side-by-side
- Di-share dengan kolaborator
- Di-publish sebagai "official scenario" oleh role yang berwenang

### Struktur Skenario

```yaml
scenario:
  id: scn_2025_demak_adaptasi_v2
  name: "Skenario Adaptasi Demak v2 — Tanggul + Mangrove"
  owner: bpbd-demak@kemendagri.id
  status: draft|review|approved|published
  parameters:
    climate:
      ssp: "SSP2-4.5"
      time_horizon: 2050
    interventions:
      - type: "infrastructure"
        name: "Tanggul pesisir"
        location: GeoJSON(...)
        cost: 180_000_000_000
        completion_year: 2032
      - type: "ecosystem"
        name: "Mangrove rehabilitation"
        location: GeoJSON(...)
        area_ha: 240
        cost: 24_000_000_000
        completion_year: 2030
    assumptions:
      population_growth: 1.2%/yr
      adaptation_budget: 5% of APBD
      ...
  outcomes:
    - metric: "population_exposed_2050"
      value: 184_000
    - metric: "expected_loss_avoided"
      value: 1_200_000_000_000
    ...
  comparison_to:
    - baseline_no_action
    - alt_scn_relocation
```

### Algoritma & Metode

**1. Scenario Composition**
- DAG-based: scenario terdiri dari blocks (climate, interventions, assumptions)
- Inheritance: scenario dapat extend parent scenario

**2. Execution**
- Scenario execution dijalankan oleh **5.3 Impact Analysis Engine**
- Caching: hasil dijaga; re-run hanya jika parameter berubah

**3. Comparison**
- Multi-scenario comparison: side-by-side maps, KPI tables, radar charts

**4. Version Control**
- Setiap scenario versioned (Git-like)
- Diff antar versi

### Output
- Scenario object dengan outcomes terkait
- Comparison report PDF/PPT
- Map exports per scenario

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Modul: Scenario Manager                              [User ▼]      │
├────────────────────────────────────────────────────────────────────┤
│ ┌── DAFTAR SKENARIO SAYA ──────────────┐ ┌── KOMPARASI ──────────┐│
│ │ Saved scenarios:                       │ │ [+] Compare these:    ││
│ │                                        │ │  ☑ scn_baseline       ││
│ │ □ scn_baseline_no_action       v3.2    │ │  ☑ scn_tanggul_mangr  ││
│ │ □ scn_tanggul_only             v1.0    │ │  ☐ scn_relokasi       ││
│ │ □ scn_tanggul_mangrove   ★    v2.1    │ │  [▶ Compare]          ││
│ │ □ scn_relokasi_total           v1.5    │ └───────────────────────┘│
│ │ □ scn_no_intervention          v1.0    │                          │
│ │                                        │ ┌── SCENARIO BUILDER ──┐│
│ │ Public scenarios (BIG, BNPB):          │ │ [Drag-drop blocks]    ││
│ │ □ scn_indonesia_ndc_pathway   v4.0    │ │                        ││
│ │                                        │ │ ┌──────────────┐      ││
│ │ [+ New Scenario] [Import]              │ │ │ Climate      │      ││
│ │                                        │ │ │ Block        │      ││
│ │                                        │ │ │ SSP2-4.5 ▼   │      ││
│ │                                        │ │ │ 2050 ▼       │      ││
│ │                                        │ │ └──────┬───────┘      ││
│ │                                        │ │        ▼              ││
│ │                                        │ │ ┌──────────────┐      ││
│ │                                        │ │ │ Intervention │      ││
│ │                                        │ │ │ Tanggul +    │      ││
│ │                                        │ │ │ Mangrove     │      ││
│ │                                        │ │ └──────┬───────┘      ││
│ │                                        │ │        ▼              ││
│ │                                        │ │ ┌──────────────┐      ││
│ │                                        │ │ │ Run Analysis │      ││
│ │                                        │ │ └──────────────┘      ││
│ └────────────────────────────────────────┘ └───────────────────────┘│
└────────────────────────────────────────────────────────────────────┘
```

### Flow Fitur
```
[USER: New Scenario]
  │
  ▼
[BUILDER UI: drag blocks, configure]
  │
  ▼
[POST /api/v1/scenarios/save]
  │
  ▼
[SCENARIO-SERVICE]
  │ Validate, persist
  ▼
[USER: Run]
  │
  ▼
[Trigger 5.3 Impact Analysis Engine]
  │
  ▼
[Outcomes cached → display]
```

### Dependencies
**Internal:** 5.3 Impact Engine, semua modul analitik untuk parameter blocks  
**Library:** Pydantic (validation), Celery (async exec)

### Akses Per Tier
- Government Full: create + publish official  
- Researcher: create personal scenarios  
- Private: clone public, modify personal  
- Public: view official

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Scenario Manager SDSS)  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 10%  
**Prioritas:** TINGGI (foundation untuk 5.3 Impact Engine)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | Storage S3-compat, DB schema isolation | Foundation |
| gxp-mapeditor | 19275 | Pattern changeset versioning (untuk scenario versions) | Reference pattern |

#### Metode Integrasi
Scenario Manager bukan domain GeoVertix existing. Build **Modul Scenario Manager SDSS** sebagai modul native di backend SDSS:
1. Scenario sebagai DAG object (climate block + intervention blocks + assumption blocks)
2. Storage di sdss_scenario.* schema + S3 untuk artifacts
3. Adopt pattern versioning dari gxp-mapeditor (changesets)
4. ACL sharing (personal/team/official) via GeoVertix core RBAC

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Scenario Manager SDSS plugin** dengan schema sdss_scenario.* (~4 minggu)
- **Scenario block definitions** (climate, intervention, assumption) (~2 minggu)
- **Version control DAG** (~3 minggu)
- **Comparison engine** (multi-scenario) (~2 minggu)
- **Frontend Scenario Builder** drag-drop (~4 minggu)

#### Pertimbangan Khusus & Risiko
- **Komplekitas DAG**: scenario bisa inheritance dari parent
- **Cache invalidation** saat parameter berubah perlu careful

#### Action Items
1. Sprint Y1-Q3
2. Reference pattern dari gxp-mapeditor changesets


---

## FITUR 5.3: Impact Analysis Engine

### Tujuan Pengembangan
Mengeksekusi skenario yang dibuat di 5.2 dan menghasilkan **outcomes multi-dimensi**: dampak fisik, sosial, ekonomi, ekologis, dengan **propagation** dampak antar modul.

### Landasan TOR
> **§1.3c (paragraf 1):** "*impact analysis ... in-depth data analysis*"

### Deskripsi Fungsional
Mesin orkestrasi yang menjalankan workflow:
1. Mengambil parameter scenario
2. Memanggil modul-modul terkait
3. Mengagregasi hasil
4. Menghitung KPI agregat (loss avoided, lives saved, carbon reduced, dll)
5. Menyimpan results & generate visualizations

### Algoritma & Metode

**Orkestrasi DAG (Directed Acyclic Graph):**
```
[Scenario Input]
  ├── Run Climate (Modul 2.1) dengan SSP X
  │     ↓ output: future temp/precip
  ├── Run LULC projection (Modul 2.2) dengan policy
  │     ↓ output: future LC
  ├── Run Flood (Modul 2.6) dengan future climate
  │     ↓ output: future flood hazard
  ├── Apply intervention (mis. tanggul)
  │     ↓ modify hazard layer
  ├── Run Vulnerability (Modul 3.1)
  │     ↓ output: future vulnerability
  ├── Run Carbon impact (Modul 2.3)
  │     ↓ output: emission changes
  └── Aggregate KPIs:
        - Population exposed
        - Loss avoided (IDR)
        - Lives saved (modeled)
        - Carbon impact (MtCO₂)
        - Co-benefits (biodiversity, water, etc)
```

**Engine:** Airflow DAG atau Prefect workflow

**Caching:** intermediate results cached by content hash

### Output
- KPI table per skenario
- Map deltas (baseline vs scenario)
- Causal pathway diagram
- Confidence intervals

### Detail UI/UX
Tampilan integrasi dengan Scenario Manager — saat user "Run Scenario", masuk ke progress view:

```
┌────────────────────────────────────────────────────────────────────┐
│ Impact Analysis: Skenario scn_tanggul_mangrove                     │
├────────────────────────────────────────────────────────────────────┤
│ Progress:                                                          │
│ ✓ Climate (2050 SSP2-4.5)         12s                              │
│ ✓ LULC projection                 18s                              │
│ ✓ Flood hazard recompute          2m 14s                           │
│ ✓ Apply tanggul intervention      32s                              │
│ ⚙ Vulnerability...                running ~1m left                 │
│ ○ Carbon impact                   queued                           │
│ ○ Aggregate                       queued                           │
│                                                                    │
│ Estimated completion: 4 menit                                     │
│ [⏹ Cancel] [Background — notify when done]                        │
└────────────────────────────────────────────────────────────────────┘

Setelah selesai → Outcome view:

┌────────────────────────────────────────────────────────────────────┐
│ Outcome: scn_tanggul_mangrove (vs baseline_no_action)              │
├────────────────────────────────────────────────────────────────────┤
│ ┌── KPI SUMMARY ───────────────────────────────────────────────┐  │
│ │ Populasi terdampak (2050):                                    │  │
│ │   Baseline: 412,000  →  Scenario: 142,000  (-65.5%)           │  │
│ │ Loss avoided: IDR 1.2 T per kejadian × 0.4 freq = 0.48 T/yr   │  │
│ │ Carbon co-benefit: +18 ktCO₂/yr (mangrove sequestration)      │  │
│ │ Biodiversity gain: +12 spesies habitat restored               │  │
│ │ Total investment: IDR 204 M (NPV breakdown ▼)                 │  │
│ │ BCR (benefit-cost ratio): 3.4                                 │  │
│ └────────────────────────────────────────────────────────────────┘  │
│ ┌── MAP DELTA: Population Exposed 2050 ────────────────────────┐  │
│ │ [Side-by-side baseline ↔ scenario, swipe-comparable]          │  │
│ └────────────────────────────────────────────────────────────────┘  │
│ [→ MCDA Compare] [→ Export Report PDF] [→ Share]                 │
└────────────────────────────────────────────────────────────────────┘
```

### Dependencies
**Internal:** Semua modul; **External:** -  
**Library:** Airflow/Prefect, Dask untuk parallel

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New + Leverage gxp-geoai untuk Chain Planning  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | **Chain planning** dengan max_chain_steps=10, function calling, confirmation threshold | Inspiration + API call ke GeoVertix |
| gxp-areainfo | 19285 | KPI aggregation per AOI | API call ke GeoVertix |
| (semua plugin analitik) | various | Invoke modul Modul 2.x, 3.x, 4.x | API call ke GeoVertix hub |

#### Metode Integrasi
Impact Analysis Engine MENGORKES plugin lain. Build:
1. **Airflow/Prefect DAG** sebagai orchestrator (heavier than gxp-geoai chain)
2. **Reuse pattern** dari gxp-geoai chain planning (LLM-derived) — bisa di-augment dengan deterministic DAG
3. **API call ke Modul 2.1, 2.2, 2.6, 3.1, 2.3** sequencing
4. **API call ke GeoVertix gxp-areainfo** untuk KPI aggregation final
5. **Intermediate caching** dengan content hash di S3

#### Yang Perlu DIBANGUN BARU/Extension
- **Airflow/Prefect deployment** untuk SDSS DAGs (~3 minggu)
- **DAG templates** per scenario type (~3 minggu)
- **KPI aggregation logic** multi-dimensi (~2 minggu)
- **Causal pathway visualization** (~2 minggu)
- Frontend Impact Outcome viewer dengan map deltas (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **Long-running scenarios**: bisa puluhan menit — async + notification wajib
- **Cache invalidation** saat upstream module update

#### Action Items
1. Deploy Airflow cluster
2. Sprint Y1-Q4


---

## FITUR 5.4: Customizable Adaptation Recommendation

### Tujuan Pengembangan
Menghasilkan **rekomendasi aksi adaptasi & mitigasi** yang **dapat disesuaikan** dengan kondisi spesifik area dan preferensi user.

### Landasan TOR
> **§1.3c (paragraf 1):** "*customizable adaptation action recommendations tailored to the needs of users*"

### Deskripsi Fungsional
Modul memberikan **library aksi adaptasi** (mis. construction tanggul, mangrove restoration, AUTP rice insurance, early warning system) yang dapat di-filter berdasarkan:
- Tipe hazard utama wilayah
- Anggaran tersedia
- Sektor (pertanian, pesisir, urban, kesehatan, dll)
- Co-benefits diinginkan

Untuk setiap aksi: cost estimate, BCR, implementing agency, timeline.

### Knowledge Base Adaptasi

| Tipe Aksi | Hazard Target | Sektor | Cost Range |
|-----------|---------------|--------|------------|
| Tanggul pesisir | Banjir rob, SLR | Pesisir, Urban | IDR 50-500 M/km |
| Mangrove restoration | SLR, erosion, biodiv | Pesisir, Eko | IDR 80-150 jt/ha |
| Sea wall | SLR, gelombang | Pesisir | IDR 200-1000 M/km |
| Drainase tertier urban | Banjir kota | Urban | Variable |
| Bioswale, rain garden | Urban flood | Urban | Variable |
| AUTP asuransi padi | Drought, flood | Pertanian | IDR 36k/ha/musim |
| Sistem peringatan dini | Multi | Lintas | IDR 100-500 jt setup |
| Edukasi & training | All | All | Variable |
| Climate-resilient seeds | Pangan | Pertanian | Per varietas |
| Embung & water harvesting | Drought | Pertanian | IDR 100-500 jt |
| Reforestasi | Karbon, biodiv, flood | Lingkungan | IDR 30-50 jt/ha |
| Building retrofit | Heat, banjir | Permukiman | Variable |
| Insurance (CAT bond) | Bencana besar | Finansial | Premium |
| Relokasi | Hazard ekstrem | Permukiman | Variable |
| ... | | | |

(Total ~50-80 aksi di knowledge base, dapat di-update)

### Algoritma & Metode

**Recommendation Filtering Pipeline:**
```
1. Identifikasi profil area (hazard utama, sektor, kondisi sosioek)
2. Filter actions dari knowledge base yang relevan
3. Compute fitness score per action:
   fitness = (effectiveness_for_hazard × hazard_weight) +
            (cost_efficiency × budget_constraint) +
            (co_benefits × user_preference)
4. Rank & return top-N
5. Detail per action: assumption, cost, timeline, implementing agency
```

**Effectiveness Database:** dari literatur, evaluation reports BNPB, KLHK, BMKG.

### Output
- Ranked list of recommended actions
- Per-action: card dengan detail
- Bundle (paket aksi yang complementary)
- Cost estimate aggregate

### Akses Per Tier
- Government Full: customize knowledge base, official recommendations  
- Researcher: API + suggest additions  
- Private/Public: view recommendations

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Adaptation Library SDSS)  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 10%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-mcda | 19286 | Fitness scoring composite (effectiveness × hazard_weight + cost_eff × budget + co_benefits × pref) | API call ke GeoVertix |
| gxp-areainfo | 19285 | Profile area (hazard, sektor, sosioek) untuk filtering | API call ke GeoVertix |

#### Metode Integrasi
Knowledge base 50-80 aksi adaptasi adalah curated content. Build:
1. Database knowledge base aksi (gxp_adaptation.actions) dengan effectiveness, cost, BCR, dependencies
2. Filtering pipeline berdasarkan profile area
3. Fitness scoring via API call ke GeoVertix gxp-mcda (composite)
4. Bundle generation: combinations yang complementary

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Adaptation Library SDSS plugin** dengan schema sdss_adaptation.* (~3 minggu)
- **Knowledge base curation** 50-80 aksi (~4 minggu, content work)
- **Filtering & ranking** logic (~2 minggu)
- **Bundle generation** algorithm (~2 minggu)
- Frontend Adaptation Library (~2 minggu)

#### Pertimbangan Khusus & Risiko
- **Curation quality**: butuh literature review dari BNPB, KLHK, BMKG, akademisi
- **Keep-fresh**: update knowledge base secara berkala

#### Action Items
1. Sprint Y1-Q4: build database + initial curation
2. Engage akademisi/BNPB untuk content review


---

## FITUR 5.5: Multi-Criteria Decision Analysis (MCDA) Engine

### Tujuan Pengembangan
**Decide antara beberapa alternatif** dengan banyak kriteria — pendekatan klasik DSS. Mendukung **AHP, TOPSIS, ELECTRE, PROMETHEE, VIKOR**.

### Landasan TOR
> **§1.3c (paragraf 2):** "*Decision-making algorithms are developed to generate adaptation recommendations based on in-depth data analysis*"

### Algoritma & Metode

**AHP (Analytic Hierarchy Process):**
- Pairwise comparison matrix per criterion
- Consistency Ratio check (CR < 0.1)
- Eigenvector → weight

**TOPSIS:**
- Normalize matrix
- Weighted normalized matrix
- Ideal & negative-ideal solutions
- Distance to ideal
- Closeness coefficient → rank

**ELECTRE III, PROMETHEE II, VIKOR**: untuk konteks specific (outranking, partial compensation)

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ MCDA Decision Engine                                  [User ▼]     │
├────────────────────────────────────────────────────────────────────┤
│ Step 1: Pilih alternatif yang dibandingkan                         │
│   ☑ scn_tanggul_only                                               │
│   ☑ scn_tanggul_mangrove                                           │
│   ☑ scn_relokasi_total                                             │
│   ☑ scn_seawall_hightech                                           │
│                                                                    │
│ Step 2: Pilih kriteria & bobot                                    │
│   Cost                  [────●─────] 25%                          │
│   Effectiveness         [────────●─] 30%                          │
│   Social acceptance     [──●───────] 15%                          │
│   Co-benefit ecology    [────●─────] 15%                          │
│   Maintainability       [──●───────] 10%                          │
│   Speed of impl         [─●────────] 5%                           │
│                                                                    │
│ Step 3: Metode                                                    │
│   ◉ TOPSIS  ○ AHP  ○ PROMETHEE  ○ VIKOR                          │
│                                                                    │
│ [▶ Compute Ranking]                                               │
│                                                                    │
│ Result:                                                            │
│   1. scn_tanggul_mangrove (closeness: 0.78) ◄ Recommended         │
│   2. scn_seawall_hightech (0.62)                                  │
│   3. scn_tanggul_only (0.51)                                      │
│   4. scn_relokasi_total (0.34)                                    │
│                                                                    │
│ [Show sensitivity analysis →]                                    │
└────────────────────────────────────────────────────────────────────┘
```

### Library: scikit-criteria, pyDecision

### Akses
Standard tier pattern

### Integrasi dengan GeoVertix

**Status Integrasi:** Direct API Reuse (PERFECT FIT)  
**Coverage dari GeoVertix:** 90%  
**Estimasi Effort Saving:** 90%  
**Prioritas:** KRITIS (gate untuk banyak modul lain)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mcda** | 19286 | **AHP, OWA, WSM/WPM, TOPSIS, ELECTRE I/III, sensitivity OAT + Sobol** — SEMUA method MCDA yang diminta TOR sudah ada | **Integrasi via API GeoVertix (CORE)** |

#### Metode Integrasi
**SDSS Modul 5.5 = LANGSUNG pakai gxp-mcda**. Hampir tidak ada custom logic:
1. Frontend SDSS expose MCDA UI yang invoke gxp-mcda::compose
2. User pilih alternatif, criteria, weights (atau AHP pairwise input)
3. Method selection (AHP/TOPSIS/ELECTRE/PROMETHEE/VIKOR)
4. gxp-mcda return ranking + closeness coefficient + sensitivity overlay
5. Export multi-format dari gxp-mcda (PDF/XLSX/SHP/GeoJSON)

#### Komponen yang Dimanfaatkan Langsung
- AHP pairwise matrix + consistency check (CR < 0.10)
- TOPSIS ideal/negative-ideal distance
- ELECTRE I/III outranking
- OWA Ordered Weighted Averaging
- Sensitivity OAT (perturbation ±10%, ±20%)
- Sobol indices via sensitivity
- Stability overlay (mana area sensitive vs stable)
- Multi-format export

#### Yang Perlu DIBANGUN BARU/Extension
- **PROMETHEE II** jika belum ada di gxp-mcda (~1 minggu, check dengan Lead Dev)
- **VIKOR method** jika belum ada (~1 minggu)
- **Frontend MCDA Decision Engine** UI (~3 minggu)
- **MCDA result interpretation** assistant (LLM-powered via gxp-geoai) (~2 minggu)

#### Pertimbangan Khusus & Risiko
- **KRITIS: gxp-mcda LICENSE-BLOCKED** — gate yang sudah berulang kali disebutkan
- Method coverage check dengan tim Pengembang GeoVertix: confirm PROMETHEE & VIKOR availability

#### Action Items
1. **#1 PRIORITY: Unblock gxp-mcda license JWT** — esensial untuk banyak modul
2. Verifikasi method availability (PROMETHEE, VIKOR) di v0.1.0
3. Sprint Y1-Q2 setelah unblock


---

## FITUR 5.6: Context-Aware Recommendation Engine **(BARU - DIPERLUAS dengan 4 sub-fitur)**

### Tujuan Pengembangan
**Smart recommendation** yang sadar konteks (legal, kapasitas, urutan, sektor) sebagaimana eksplisit di TOR. Ini bukan list rekomendasi biasa — ada 4 lapisan kecerdasan:

### Landasan TOR
> **§1.3c #3:** "*Context-Aware Recommendation Engine:*
> *a) Policy-compliant recommendation generation aligned with Indonesia's legal frameworks*
> *b) Implementation feasibility scoring based on local capacity assessment*
> *c) Temporal sequencing of adaptation actions for optimal impact*
> *d) Cross-sectoral impact analysis to identify synergies and prevent conflicts*"

### Sub-Fitur 5.6.1: Policy-Compliant Recommendation Generator

**Tujuan:** Memastikan setiap rekomendasi **sesuai dengan kerangka hukum Indonesia**.

**Rule Engine:**
- Database aturan: UU 26/2007 (Tata Ruang), UU 24/2007 (Bencana), UU 32/2009 (PPLH), UU 17/2019 (SDA), PP 21/2021, Permen ATR/BPN 11/2021, Permen LHK terkait, dll.
- Setiap rekomendasi di-validate vs rules → output: compliant / conditional / non-compliant
- Conditional → ada syarat (mis. perlu KKPR, AMDAL, izin lingkungan)

**Implementation:**
- Drools-like rule engine atau JSON-based rules
- Update aturan via admin panel oleh tim hukum

**Output per rekomendasi:**
```
{
  "action": "Tanggul pesisir 1km",
  "compliance_status": "conditional",
  "legal_basis": ["UU 26/2007", "Permen ATR/BPN 11/2021"],
  "required_permits": ["KKPR", "AMDAL", "Izin Pemanfaatan Pesisir"],
  "potential_conflicts": ["Sempadan pantai 100m — perlu klarifikasi"]
}
```

### Sub-Fitur 5.6.2: Implementation Feasibility Scoring

**Tujuan:** Tidak semua daerah punya kapasitas yang sama untuk implementasi.

**Variabel kapasitas:**
- Anggaran daerah (APBD)
- SDM teknis (jumlah staff)
- Sertifikasi/training records
- Track record proyek sebelumnya
- Akses pembiayaan eksternal (CSR, donor)
- Political will (sulit diukur tapi proxy: dukungan dokumen RKPD)

**Scoring:**
```
Feasibility = w1×Budget + w2×TechCapacity + w3×TrackRecord + 
              w4×ExternalFunding + w5×PoliticalWill
              
Score 0-1; threshold:
  > 0.7: highly feasible (proceed)
  0.4-0.7: feasible with capacity building first
  < 0.4: not feasible — refer to provincial/national
```

### Sub-Fitur 5.6.3: Temporal Sequencing

**Tujuan:** Menentukan **urutan optimal** aksi adaptasi over time, karena beberapa aksi prerequisites untuk yang lain.

**Algoritma:**
- Build DAG dengan dependencies antar action
- Topological sort untuk dapat valid orderings
- Optimization: pilih ordering yang maximize cumulative benefit early

**Contoh dependencies:**
- "Bangun rumah pompa" depends on "Bangun jaringan drainase"
- "Asuransi padi" depends on "Capacity building petani"

**Output:** Roadmap timeline dengan milestones

### Sub-Fitur 5.6.4: Cross-Sectoral Impact Analysis

**Tujuan:** **Sinergi dan konflik** antar sektor.

**Analisis:**
- Action di sektor X → effect di sektor Y
- Mis. "Reforestasi" → karbon (+), banjir (+ regulasi), tetapi mungkin agriculture (- jika konversi lahan)
- Mis. "Tanggul pesisir" → adaptasi (+), tetapi sedimentation downstream (- pertanian)

**Implementation:**
- Matrix cross-impact (Action × Sektor) dari literatur & expert
- Network analysis untuk identify hub actions (yang banyak positive synergies)

### Detail UI/UX Integrated

```
┌────────────────────────────────────────────────────────────────────┐
│ Context-Aware Recommendation (Smart Mode)            [User ▼]      │
├────────────────────────────────────────────────────────────────────┤
│ Wilayah: Demak  Hazard: Banjir + SLR  Sektor fokus: All            │
│                                                                    │
│ Recommended action paths (smart-sequenced):                       │
│                                                                    │
│ ┌── PATH A: "Green-First" ──────────────────────────────────────┐│
│ │ 2026: Mangrove rehab 240ha + Edukasi             ✓ Compliant  ││
│ │ 2027: Bioswale urban + RTH expansion             ✓ Compliant  ││
│ │ 2028: Tanggul lokal (after eco-baseline)         ⚠ KKPR + AMDAL││
│ │ 2030: Pompa & drainase                            ✓ Compliant  ││
│ │ ──────                                                          ││
│ │ Feasibility: 0.72 (high)                                       ││
│ │ Cross-sectoral synergy: +0.65 (good — fisheries, biodiv ↑)    ││
│ │ Compliance: 100% (1 conditional)                               ││
│ │ Total NPV cost: IDR 380 M                                      ││
│ │ Expected benefit avoided: IDR 1.6 T (2030-2050)                ││
│ │ BCR: 4.2                                                       ││
│ │ [→ Adopt this path]                                            ││
│ └────────────────────────────────────────────────────────────────┘│
│                                                                    │
│ ┌── PATH B: "Gray Infrastructure" ────────────────────────────────┐│
│ │ ...similar layout                                                ││
│ │ Feasibility: 0.45 (challenging — budget gap)                   ││
│ │ Cross-sectoral: -0.12 (some conflict with fisheries)           ││
│ └────────────────────────────────────────────────────────────────┘│
│                                                                    │
│ ┌── PATH C: "Relocation-Heavy" ───────────────────────────────────┐│
│ │ ...                                                              ││
│ └────────────────────────────────────────────────────────────────┘│
│                                                                    │
│ Detail per action (klik) → policy-check, dependencies, alternatives│
└────────────────────────────────────────────────────────────────────┘
```

### Dependencies
**Internal:** 5.4 Adaptation library, 3.1 Vuln, 4.X Specialized  
**Library:** Drools-bridge, networkx (DAG), custom rule engine

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Context-Aware Recommendation SDSS) + Leverage AI Layer  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (TOR §1.3c #3 eksplisit minta 4 sub-fitur)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | LLM untuk policy interpretation, semantic search regulasi via RAG | API call ke GeoVertix (heavy) |
| gxp-mcda | 19286 | Feasibility scoring sebagai composite | API call ke GeoVertix |
| gxp-mapeditor | 19275 | Workflow approval pattern | Reference |
| gxp-areainfo | 19285 | Area capacity profiling | API call ke GeoVertix |

#### Metode Integrasi
4 sub-fitur, masing-masing dengan strategi:
1. **5.6.1 Policy-Compliant Generator**: Rule engine internal + RAG via gxp-geoai untuk semantic search regulasi
2. **5.6.2 Feasibility Scoring**: API call ke GeoVertix gxp-mcda dengan budget, tech_capacity, track_record, dll
3. **5.6.3 Temporal Sequencing**: NetworkX DAG topological sort (Python custom)
4. **5.6.4 Cross-Sectoral**: Matrix lookup + network analysis (NetworkX)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Context-Aware Recommendation SDSS plugin** dengan schema sdss_contextrec.* (~3 minggu)
- **Policy rule engine** dengan UU/Permen database (~6 minggu, heavy content)
- **Feasibility scoring formula** (~2 minggu)
- **Temporal DAG sequencer** (NetworkX) (~2 minggu)
- **Cross-impact matrix** (action × sektor) curation (~4 minggu)
- Frontend Context-Aware Recommendation dengan paths A/B/C (~4 minggu)

#### Pertimbangan Khusus & Risiko
- **Regulasi update frequency**: rule engine must be data-driven (admin panel update)
- **Cross-sectoral matrix** subjective — needs expert workshop
- **Konteks lokal** (kapasitas Pemda) data integrity — koordinasi Kemendagri

#### Action Items
1. Workshop ahli untuk derive cross-sectoral matrix
2. Sprint Y2-Q1


---

## FITUR 5.7: Group Decision-Making Module **(BARU)**

### Tujuan Pengembangan
TOR §1.3c paragraf 4 secara eksplisit menyebut "*decision-making processes, both individually and **in group settings***". Modul ini menyediakan workflow untuk **group decision-making** yang melibatkan multi-stakeholder.

### Landasan TOR
> **§1.3c (paragraf 4):** "*provides comprehensive support for decision-making processes, both individually and in group settings*"

> **§1.3c #2:** "*Collaborative Decision-Making Features: a) Structured multi-stakeholder consultation workflows; b) Interactive scenario comparison tools for group decision processes; c) Comment and annotation capabilities for collaborative analysis*"

### Deskripsi Fungsional
Modul mengakomodasi **proses musyawarah/konsensus** dengan struktur:
1. **Convene stakeholders** (invite via platform)
2. **Pre-meeting**: stakeholders review scenarios secara individual, comment
3. **Live session**: comparison side-by-side, voting features
4. **Decision recording**: hasil keputusan + minutes + persetujuan elektronik
5. **Audit trail**: who decided what, when

### Workflow

```
[FACILITATOR creates GDM session]
  │ Define: stakeholders, alternatives, criteria, timeline
  ▼
[INVITE stakeholders via email/SSO]
  │
  ▼
[PRE-MEETING PHASE — async]
  │ Each stakeholder reviews scenarios
  │ Submits: ranking, comments, concerns
  ▼
[FACILITATOR aggregates pre-input]
  │ Heatmap of preferences, divergence analysis
  ▼
[LIVE SESSION (synchronous, optional)]
  │ Online meeting feature (or external Zoom integration)
  │ Real-time voting, polls
  │ Whiteboard annotations on maps
  ▼
[CONSENSUS BUILDING]
  │ Iterative refinement: voting, modifications
  ▼
[FINAL DECISION RECORDED]
  │ Selected option, dissenting opinions
  │ Electronic sign-off (if required)
  ▼
[ARTIFACTS]
  │ Minutes, decision document, signed
  │ Linked back to scenarios in 5.2
```

### Algoritma & Metode

**Group Aggregation Methods:**
- **Borda Count**: stakeholder rank → score
- **Voting consensus**: majority, supermajority, unanimous
- **Delphi technique**: iterative anonymous feedback
- **Weighted by role**: BNPB vote weight differs from observer

**Divergence Detection:**
- Identify stakeholders with divergent preference → invite for deeper consultation

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Group Decision Session: "Adaptasi Pesisir Demak 2026"             │
├────────────────────────────────────────────────────────────────────┤
│ Facilitator: Bappeda Demak                                         │
│ Stakeholders (8): ●●●●●●○○ (6/8 joined)                            │
│ Session phase: ◉ Pre-meeting input phase (ends in 3 hari)          │
│                                                                    │
│ ┌── PROPOSED ALTERNATIVES ───┐ ┌── YOUR INPUT ────────────────────┐│
│ │ ☑ Path A (Green-first)     │ │ Your ranking:                     ││
│ │ ☑ Path B (Gray infra)      │ │ ┌────────────────────────┐        ││
│ │ ☑ Path C (Relocation)      │ │ │ 1. Path A ▲▼          │        ││
│ │ ☑ Path D (Hybrid)          │ │ │ 2. Path D             │        ││
│ │                            │ │ │ 3. Path B             │        ││
│ │ [View each →]              │ │ │ 4. Path C             │        ││
│ │                            │ │ └────────────────────────┘        ││
│ │ Comments stream (recent):  │ │                                   ││
│ │  Pak Budi (BPBD):          │ │ Comments (anonim opsional):       ││
│ │  "Path B perlu kajian      │ │ ┌────────────────────────┐        ││
│ │   tambahan untuk koridor   │ │ │ Path A excellent ko-   │        ││
│ │   logistik."  💬           │ │ │ benefit ekologi tetapi│        ││
│ │                            │ │ │ implementasi mangrove │        ││
│ │  Bu Sari (LSM):            │ │ │ butuh 5+ tahun.       │        ││
│ │  "Path C harus disertai    │ │ └────────────────────────┘        ││
│ │   pendampingan sosial."    │ │                                   ││
│ │                            │ │ [💾 Submit Input]                  ││
│ │  [Add comment...]          │ │                                   ││
│ └────────────────────────────┘ └───────────────────────────────────┘│
│ ┌── PRE-MEETING AGGREGATE PREVIEW ─────────────────────────────┐  │
│ │ Path A: 🟢🟢🟢🟢🟢🟢 (preferred by 6 of 6 responded)        │  │
│ │ Path B: 🟢🟢🟢🟡🟡🔴                                           │  │
│ │ Path C: 🟢🟢🟡🟡🔴🔴                                            │  │
│ │ Path D: 🟢🟢🟢🟢🟡🟡                                           │  │
│ │                                                                  │  │
│ │ Divergence detected: stakeholder X (LSM) vs Y (Industri) on    │  │
│ │ Path B & C — recommend additional dialogue                      │  │
│ └─────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

### Akses Per Tier
- Government Full: create/facilitate sessions  
- All invited stakeholders (multi-tier): participate  
- Public: view final decisions (transparency)

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Group Decision-Making SDSS) + Leverage Collaboration  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mapeditor** | 19275 | **Concurrent collaboration pattern** (optimistic locking, sessions, changesets) | Reference pattern + extend |
| gxp-geoai | 19250 | LLM untuk facilitator: summary discussion, divergence detection | API call ke GeoVertix |
| gxp-mcda | 19286 | Aggregate ranking (Borda count, voting) | API call ke GeoVertix |

#### Metode Integrasi
Group Decision Making memerlukan workflow + voting + consensus:
1. **Session creation** facilitator: define stakeholders, alternatives, criteria
2. **Pre-meeting async** input: extend gxp-mapeditor pattern dengan input form
3. **Aggregate input**: API call ke GeoVertix gxp-mcda untuk Borda count
4. **Divergence detection**: LLM via gxp-geoai untuk identifikasi outlier
5. **Live session**: WebRTC integration (external service) atau external Zoom embed
6. **Sign-off**: digital signature dengan audit trail

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Group Decision-Making SDSS plugin** dengan schema sdss_groupdm.* (~4 minggu)
- **Voting aggregation methods** (Borda, plurality, Delphi) (~2 minggu)
- **Divergence detection** algorithm (~2 minggu)
- **Pre-meeting async input UI** (~3 minggu)
- **Live session integration** (WebRTC atau Zoom embed) (~3 minggu)
- **Decision artifacts** (minutes, signed document) (~2 minggu)
- Frontend Group Session Workspace (~4 minggu)

#### Pertimbangan Khusus & Risiko
- **Real-time WebRTC** complexity — alternatif: integrate dengan Zoom/Webex external
- **Electronic signature** legal compliance (UU ITE)

#### Action Items
1. Decide WebRTC native vs external Zoom integration
2. Sprint Y2-Q2


---

## FITUR 5.8: Simulation & What-If Tool

### Tujuan Pengembangan
**Interaktif quick-simulation** untuk eksplorasi cepat tanpa membangun full scenario di 5.2.

### Landasan TOR
> **§1.3c (paragraf 2):** "*simulation tools allow for the evaluation of various scenarios*"

### Deskripsi Fungsional
Sliders dan toggles untuk parameter, real-time recompute (atau near-real-time dengan caching aggressive).

**Contoh use cases:**
- "Bagaimana jika curah hujan naik 30%?" → flood map update
- "Bagaimana jika populasi tumbuh 2%/yr selama 20 tahun?" → CC re-evaluate
- "Bagaimana jika 10% hutan dikonversi?" → carbon impact

### Detail UI/UX
```
┌────────────────────────────────────────────────────────────────────┐
│ What-If Quick Simulator                              [User ▼]      │
├────────────────────────────────────────────────────────────────────┤
│ Wilayah: Kab. Sintang ▼                                            │
│                                                                    │
│ Adjust parameters (live):                                          │
│   Curah hujan baseline x:    [────●─────] 1.3x                    │
│   Konversi hutan ke sawit:   [──●───────] 8%                      │
│   Populasi growth:           [─●────────] 1.5%/yr                 │
│   Adaptive infra capacity:   [────●─────] +20%                    │
│                                                                    │
│ Live computation: [⚙ recalculating...] → Done                     │
│                                                                    │
│ Outcomes (live update):                                            │
│   Population at risk: 23,400 → 31,200 (+33%)                       │
│   Carbon emission: +18 ktCO₂/yr                                   │
│   Flood area: +12 km²                                              │
│   Composite vulnerability: 0.52 → 0.61                             │
│                                                                    │
│ [💾 Save as named scenario] [🔄 Reset]                            │
└────────────────────────────────────────────────────────────────────┘
```

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-mcda + Scenario Manager  
**Coverage dari GeoVertix:** 40%  
**Estimasi Effort Saving:** 50%  
**Prioritas:** SEDANG (UX enhancement)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-mcda | 19286 | LRU cache untuk cell-detail (cache_size=1000) — perfect untuk live adjust | Integrasi via API GeoVertix |
| (Modul 5.2 5.3) | various | Scenario Manager + Impact Engine | API call ke GeoVertix hub |

#### Metode Integrasi
What-If = lightweight version dari Scenario Manager dengan aggressive caching:
1. Sliders parameter → debounced API call
2. Live invoke API call ke GeoVertix gxp-mcda (LRU cache hit untuk performance)
3. Outcome dari Modul 5.3 dengan cached intermediate
4. Save as named scenario → promote ke Modul Scenario Manager SDSS (Modul 5.2)

#### Yang Perlu DIBANGUN BARU/Extension
- **Live-adjust API gateway** dengan debouncing (~2 minggu)
- **Aggressive caching layer** Redis untuk parameter combinations (~2 minggu)
- Frontend What-If Simulator UI dengan slider real-time (~3 minggu)

#### Action Items
1. Sprint Y2-Q1 setelah Modul 5.2 dan 5.3 stable


---

## FITUR 5.9: Sensitivity & Uncertainty Analyzer

### Tujuan Pengembangan
**Mengidentifikasi parameter mana** yang paling mempengaruhi outcome — krusial untuk decision robustness.

### Landasan TOR
Tersirat di "*decision-makers have access to information that is not only relevant and timely but also immediately actionable*" — robustness diperlukan.

### Algoritma & Metode
- **One-at-a-time (OAT)**: ubah satu parameter, lihat efek
- **Sobol indices**: variance-based, global sensitivity
- **Morris screening**: efficient identification of influential
- **Tornado chart**: visual summary

### Output
- Tornado chart (top influencers)
- Sobol indices table
- Robustness score per recommendation

### Detail UI/UX
```
Tornado Chart: Sensitivity of "Population at Risk 2050"

  Climate scenario SSP    ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  ±32%
  Subsidence rate          ▒▒▒▒▒▒▒▒▒▒▒▒▒▒        ±21%
  Mangrove area            ▒▒▒▒▒▒▒▒▒              ±14%
  Population growth        ▒▒▒▒▒▒                 ±9%
  Tanggul effectiveness    ▒▒▒▒                   ±6%
  Anggaran adaptasi        ▒▒▒                    ±4%
  ...                     
```

### Library
SALib, scikit-learn (PDP)

### Integrasi dengan GeoVertix

**Status Integrasi:** Direct API Reuse (gxp-mcda sensitivity via API)  
**Coverage dari GeoVertix:** 80%  
**Estimasi Effort Saving:** 85%  
**Prioritas:** TINGGI (robustness essential)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mcda** | 19286 | **OAT sensitivity (default ±10%, ±20%), Sobol indices** — SUDAH PRODUCTION | **Integrasi via API GeoVertix** |
| gxp-ml | 19240 | Custom Morris screening script | API call ke GeoVertix |

#### Metode Integrasi
**gxp-mcda sudah expose sensitivity OAT + Sobol** — Modul 5.9 hampir 100% reuse:
1. API call ke GeoVertix gxp-mcda::sensitivity dengan default_sensitivity_perturbations
2. Sobol indices via sensitivity endpoint
3. Tornado chart UI di SDSS frontend (mapping ke Sobol output)
4. Morris screening sebagai script tambahan di gxp-ml (jika diperlukan)

#### Yang Perlu DIBANGUN BARU/Extension
- **Tornado chart UI** rendering (~1 minggu)
- **Morris screening script** di gxp-ml (~2 minggu, opsional)
- **Robustness score** computation per recommendation (~1 minggu)

#### Action Items
1. (Same as 5.5: unblock gxp-mcda)
2. Sprint Y2-Q1


---

## FITUR 5.10: Optimization Solver

### Tujuan Pengembangan
**Find optimal allocation** untuk resource constraint problems — mis. anggaran adaptasi terbatas, harus dialokasikan ke aksi mana di lokasi mana.

### Algoritma & Metode
- **Linear Programming (LP)** untuk problem linear
- **Mixed Integer LP (MILP)** untuk binary decisions
- **Genetic Algorithm** untuk problem kompleks non-linear
- **Multi-objective optimization** dengan NSGA-II untuk Pareto front

### Solver: OR-Tools (Google), CBC, GLPK, atau Gurobi (commercial)

### Use Cases
- Optimal renewable energy portfolio (sudah di 4.6)
- Optimal allocation of adaptation budget across kab-kota
- Optimal placement of EWS sensors
- Optimal evacuation route assignment

### Detail UI/UX

```
┌────────────────────────────────────────────────────────────────────┐
│ Optimization: Adaptation Budget Allocation         [User ▼]        │
├────────────────────────────────────────────────────────────────────┤
│ Objective: Maximize population protected                          │
│ Constraints:                                                       │
│   Budget total: IDR 500 M                                          │
│   Min allocation per province: IDR 10 M                            │
│   Geographic diversity: minimum 8 provinces                        │
│   Equity: % budget to top-3 vulnerable ≥ 50%                       │
│                                                                    │
│ [▶ Solve]                                                          │
│                                                                    │
│ Result (Pareto front shown):                                      │
│   ◉ Solution A: 245,000 protected, IDR 487 M used                 │
│   ○ Solution B: 198,000 protected, IDR 412 M (savings)            │
│   ○ Solution C: 312,000 protected, IDR 500 M (max coverage)       │
│                                                                    │
│ [Detail breakdown per province/action →]                          │
└────────────────────────────────────────────────────────────────────┘
```



### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Optimization Solver SDSS)  
**Coverage dari GeoVertix:** 35%  
**Estimasi Effort Saving:** 40%  
**Prioritas:** SEDANG-TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-routing** | 19270 | A* pathfinding untuk routing optimization use cases | Integrasi via API GeoVertix |
| gxp-mcda | 19286 | Multi-criteria sebagai constraint | API call ke GeoVertix |
| gxp-ml | 19240 | Container untuk run OR-Tools / DEAP scripts | API call ke GeoVertix |

#### Metode Integrasi
Optimization solver lebih natural sebagai script Python:
1. Linear/MILP via OR-Tools script di gxp-ml
2. Genetic Algorithm (DEAP/pymoo) script di gxp-ml
3. Multi-objective NSGA-II script
4. Routing optimization: API call ke GeoVertix gxp-routing
5. Constraint MCDA: API call ke GeoVertix gxp-mcda

#### Yang Perlu DIBANGUN BARU/Extension
- **Optimization scripts** di gxp-ml: LP, MILP, GA, NSGA-II (~6 minggu)
- **Use case templates**: budget allocation, EWS placement, evacuation (~3 minggu)
- Frontend Optimization Configurator (~3 minggu)

#### Action Items
1. Install OR-Tools, DEAP, pymoo di gxp-ml container
2. Sprint Y2-Q2


---

---

# Ringkasan Bagian 5

Total **10 sub-fitur SDSS Core** dengan kemampuan komprehensif:

| Sub-Fitur | Fungsi |
|-----------|--------|
| 5.1 Multi-Level Architecture | 3 workspace per governance level |
| 5.2 Scenario Manager | Build/save/share scenarios |
| 5.3 Impact Analysis | Execute scenarios → outcomes |
| 5.4 Custom Adaptation | Library aksi adaptasi tunable |
| 5.5 MCDA Engine | AHP/TOPSIS/ELECTRE/PROMETHEE |
| 5.6 Context-Aware Recommend | 4 sub: Policy, Feasibility, Sequencing, Cross-sectoral |
| 5.7 Group Decision-Making | Multi-stakeholder consensus workflow |
| 5.8 What-If Simulator | Interactive quick simulation |
| 5.9 Sensitivity Analyzer | Tornado, Sobol |
| 5.10 Optimization Solver | LP/MILP/GA |

Semuanya **terintegrasi**: scenario di 5.2 dieksekusi 5.3, hasilnya difilter dengan 5.6, dibandingkan di 5.5, dioptimasi di 5.10, divalidasi 5.9, dimusyawarahkan 5.7.
---

# BAGIAN 6 — AI/ML & NLP LAYER (9 Fitur)

TOR §1.3d secara eksplisit menyebut **banyak aplikasi AI**, dengan **3 framework lapisan governance**: AI Development, AI Ethics & Governance, AI Performance Optimization. Beberapa AI use case juga sudah dibahas inline di modul terkait (LULC, Carbon, Biodiv) — di sini kita fokus pada **AI capabilities standalone** yang bukan modul tematik.

## FITUR 6.1: Image & Pattern Recognition Service (BARU)

### Tujuan Pengembangan
Layanan **horizontal** (cross-cutting) untuk **klasifikasi & deteksi pola** dari citra (satelit, UAV, sensor). Berbeda dari LULC yang spesifik tutupan lahan — ini umum: deteksi infrastruktur, kapal, hotspot industri, vegetasi rusak, oil spill, dll.

### Landasan TOR
> **§1.3d:** "*Image and Pattern Recognition: AI-based image recognition tools analyze satellite imagery, drone footage, and other visual data to classify land cover types, detect changes in ecosystems, or identify infrastructure vulnerabilities*"

### Deskripsi Fungsional
Service menyediakan **pre-trained models** dan **fine-tuning capability** untuk berbagai tugas:
- Object detection (kapal, mobil, bangunan, pohon individu)
- Semantic segmentation (luar LULC: infrastruktur tipe, vegetasi sehat/sakit)
- Anomaly visual (oil spill, illegal logging, illegal mining)
- Change detection visual (kapal pendatang, pembangunan ilegal)
- Disaster damage assessment (post-event)

### Input Data
- Satelit (Sentinel-1/2, Landsat, Planet, Pleiades — sesuai akses)
- UAV citra (user upload)
- CCTV/IoT visual stream (jika ada)

### Algoritma & Metode

**Model Library Pre-trained:**
| Task | Architecture | Source |
|------|-------------|--------|
| Object detection generic | YOLOv8 | Open |
| Ship detection SAR | DOTA/CIVET | Open |
| Building footprint | Mask R-CNN | Microsoft |
| Tree detection (UAV) | DeepForest | Open |
| Oil spill SAR | U-Net custom | Train internal |
| Mining detection | Custom segmentation | Train internal |
| Building damage | xView2-derived | Open |

**Fine-tuning Pipeline:**
- Upload labeled samples
- Transfer learning (freeze backbone, train head)
- MLflow tracking
- Deploy via API

**Active Learning:**
- Model identifies low-confidence cases → human review → retrain

### Output
- Detection bounding boxes + class + confidence
- Segmentation masks
- Anomaly heatmaps
- Damage assessment maps (post-disaster)

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Image & Pattern Recognition Service                  [User v]      |
+--------------------------------------------------------------------+
| Task: o Object detection (*) Semantic segm. o Anomaly o Damage    |
|                                                                    |
| Model: [v1_oil_spill_unet v]  Confidence threshold: 0.7            |
|                                                                    |
| Input:                                                             |
|   o AOI on Sentinel-1 latest pass                                  |
|   (*) Upload citra UAV (drag-drop)                                 |
|      [3 files uploaded: 2.3 GB]                                    |
|   o CCTV stream live                                               |
|                                                                    |
| [Run Inference]                                                    |
|                                                                    |
| Results:                                                           |
|   3 anomalies detected on tile 1:                                  |
|   +-------------+  Coords: ...                                     |
|   | [overlay    |  Type: oil_slick                                 |
|   |  visual]    |  Confidence: 0.91                                |
|   |             |  Area: 14.2 ha                                   |
|   +-------------+  [Validate / Reject]                             |
|                                                                    |
| [Save annotations] [Trigger alert]                                 |
|                                                                    |
| Custom training:                                                   |
| [+ Train new model on uploaded labels]                            |
+--------------------------------------------------------------------+
```

### Dependencies
**Library:** PyTorch, TorchGeo, ultralytics (YOLO), MMSegmentation, Raster Vision
**Infra:** GPU node (NVIDIA T4 inference, A100 training)

### Akses Per Tier
- Government Full: semua model + train custom
- Researcher: API + training
- Private: pre-built models, limited custom
- Public: select use cases (mis. ship counting public)

### Integrasi dengan GeoVertix

**Status Integrasi:** Direct API Reuse + Train Custom Models di SDSS  
**Coverage dari GeoVertix:** 75%  
**Estimasi Effort Saving:** 70%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-inference** | 19210 | **ONNX runtime** + 3 model deployed: lulc-unet, ship-detection, yolov8-buildings; tile-based sliding window, batch=4, NMS post-process, auto-reload models | **Integrasi via API GeoVertix (CORE)** |
| **gxp-ml** | 19240 | **detect_objects.py, finetune_foundation.py** untuk custom training (LoRA/PEFT) | Integrasi via API GeoVertix |

#### Metode Integrasi
**Infrastructure 100% ready** — Modul 6.1 langsung pakai:
1. Generic inference: API call ke GeoVertix gxp-inference dengan task = object_detection / segmentation
2. 3 pre-trained model sudah ready dipakai
3. Deploy custom ONNX model (oil spill, illegal mining, damage assessment) ke models/ dir → auto-reload
4. Fine-tuning custom: API call ke GeoVertix gxp-ml::finetune_foundation.py
5. Active learning: low-confidence cases → review queue (build new)

#### Yang Perlu DIBANGUN BARU/Extension
- **Custom ONNX models** untuk SDSS use cases: oil spill U-Net, illegal mining detection (~6-8 minggu per model)
- **Active learning queue** dan review UI (~3 minggu)
- **Custom training data pipeline** (~3 minggu)
- Frontend Image Recognition Console (~3 minggu)

#### Action Items
1. Identify priority custom models (oil spill, mining, damage)
2. Sprint Y2-Q1: prepare training data


---

## FITUR 6.2: Anomaly Detection & Early Warning System (BARU)

### Tujuan Pengembangan
Layanan **deteksi anomali otomatis pada data lingkungan** (suhu, hujan, kualitas air, vegetation health, dll) yang trigger **early warning** untuk:
1. Bencana imminent (banjir bandang, longsor)
2. Degradasi lingkungan (oil spill, deforestasi ilegal)
3. Krisis kesehatan terkait iklim (heat wave, vector-borne disease outbreak)

### Landasan TOR
> **§1.3d:** "*Anomaly Detection and Early Warning Systems: Machine learning algorithms excel at detecting anomalies in environmental data, such as sudden changes in air quality, water levels, or vegetation health. These systems trigger early warnings for critical events like natural disasters or environmental degradation*"

### Deskripsi Fungsional
Streaming pipeline yang **subscribe** ke berbagai data source (IoT, satelit, station data) dan menjalankan model anomali real-time.

### Algoritma & Metode

**1. Statistical Methods:**
- Z-score thresholding
- IQR-based detection
- Cumulative Sum Control Chart (CUSUM)

**2. ML-Based:**
- **Isolation Forest** untuk tabular
- **One-Class SVM** untuk small datasets
- **Autoencoder** (deep learning) untuk complex patterns
- **LSTM-based forecasting + residual analysis** untuk time-series
- **Variational Autoencoder (VAE)** untuk spatial anomaly

**3. Hybrid:**
- Physics-informed: known thresholds + ML for unknown patterns
- Ensemble: aggregate dari multiple detector

**4. Severity Scoring:**
- Score 0-1 berdasarkan deviation magnitude × confidence
- Threshold per use case

**5. Alert Routing:**
- Per anomaly type → routing rules to user groups
- De-duplication (jangan kirim 100 alert untuk 1 event)

### Use Cases & Workflow Examples

| Anomaly Type | Source | Method | Alert Audience |
|--------------|--------|--------|----------------|
| Banjir bandang imminent | IoT sungai + radar | LSTM forecast + threshold | BPBD, masyarakat hilir |
| Heatwave | Suhu station + forecast | Z-score on rolling | Kemenkes, masyarakat |
| Forest fire start | MODIS/VIIRS hotspot | Spatial cluster + persistence | Manggala Agni, BNPB |
| Deforestasi mendadak | NDVI drop | Time-series change | KLHK |
| Subsidence acceleration | InSAR | Slope change detection | PUPR, Pemda |
| Coral bleaching event | DHW threshold | Physics threshold | KKP, NOAA-cross-check |
| Drought intensification | SPEI | Multi-month threshold | Kementan, Bulog |
| PM2.5 spike | Air quality station | Z-score + spatial | Kemenkes, KLHK |
| Vector outbreak (DBD) | Cases + climate proxy | Epidemic model + climate | Kemenkes |

### Output
- Real-time alert events
- Anomaly score time-series
- Historical anomaly catalog
- False positive feedback loop

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Anomaly Detection Console                            [User v]      |
+--------------------------------------------------------------------+
| Active alerts (live):                                              |
|                                                                    |
| [CRITICAL] Banjir bandang Sintang                                  |
|    Detected: 2026-05-12 14:23                                      |
|    Affected: 12 desa, ~8,400 jiwa                                  |
|    Confidence: 0.94                                                |
|    Time-to-impact: ~45 menit                                       |
|    Source: IoT sungai + ConvLSTM nowcast                           |
|    [BPBD notified] [Acknowledge] [Detail]                          |
|                                                                    |
| [HIGH] Heatwave Jakarta                                            |
|    Detected: 2026-05-11 18:00 (still ongoing)                      |
|    Duration: 3 days expected                                       |
|    Source: BMKG + ECMWF forecast                                   |
|                                                                    |
| [MEDIUM] NDVI drop Hutan Kal-Bar                                   |
|    Detected: 2026-05-09                                            |
|    Area: 340 ha                                                    |
|    Possible cause: illegal logging vs natural                      |
|    [Investigate]                                                   |
|                                                                    |
| Detection rules:                                                   |
| [Configure thresholds, audiences, escalation]                      |
|                                                                    |
| Past 30 days statistics:                                           |
|   Total alerts: 142                                                |
|   True positive rate: 87%                                          |
|   False positive: 13%                                              |
|   Average time-to-alert: 4 menit                                   |
+--------------------------------------------------------------------+
```

### Dependencies
**Internal:** Semua modul punya data stream
**External:** BMKG real-time API, BNPB InaSAFE, IoT sensors
**Library:** river (online ML), tslearn, pyod, alibi-detect

### Karakteristik Non-Fungsional
| Aspek | Target |
|-------|--------|
| Detection latency | < 2 menit dari data tiba |
| False positive rate | < 15% |
| Alert delivery latency | < 1 menit |
| Throughput | 10k events/sec |

### Akses Per Tier
- Government + Emergency tier: full + alert manage
- Private: subscribe alerts untuk asset mereka
- Public: alerts untuk lokasi yang di-subscribe

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Anomaly Detection SDSS) + Leverage Inference & ML  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** KRITIS (life-saving early warning)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-inference | 19210 | Visual anomaly detection (custom model) | API call ke GeoVertix |
| gxp-ml | 19240 | Isolation Forest, autoencoder, LSTM scripts | API call ke GeoVertix + tambah |
| gxp-qgis | 19245 | KDE heatmap untuk spatial anomaly clustering | API call ke GeoVertix |
| gxp-areainfo | 19285 | Affected area summary | API call ke GeoVertix |
| gxp-climate | 19235 | Time-series anomaly mechanism (anomaly vs baseline) | API call ke GeoVertix |

#### Metode Integrasi
Anomaly Detection Modul 6.2 = orchestrator + custom logic:
1. **Statistical**: Z-score/CUSUM scripts di gxp-ml
2. **ML methods**: Isolation Forest/OCSVM/Autoencoder scripts di gxp-ml
3. **Visual anomaly**: API call ke GeoVertix gxp-inference dengan custom models
4. **Time-series**: gxp-climate anomaly mechanism + tambah LSTM residual
5. **Alert routing**: integration dengan Modul 9.2 Notification
6. **Real-time stream**: Kafka consumer dari IoT/satellite feeds

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Anomaly Detection SDSS plugin** dengan schema sdss_anomaly.* (~4 minggu)
- **Scripts ML anomaly** di gxp-ml: isolation_forest.py, autoencoder.py, lstm_residual.py (~4 minggu)
- **Real-time stream consumer** Kafka (~3 minggu)
- **Severity scoring formula** per use case (~2 minggu)
- **Alert routing engine** dengan dedup, throttling (~3 minggu)
- Frontend Anomaly Console (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **False positive rate <15%** challenging — calibration penting
- **Real-time SLA <2 menit** — performance tuning
- **Alert fatigue** mitigation: severity-based routing

#### Action Items
1. Sprint Y2-Q1
2. Kafka deployment (atau extend GeoVertix infra)


---

## FITUR 6.3: Predictive Modeling Framework

### Tujuan Pengembangan
Framework horizontal untuk **time-series & spatial forecasting** yang digunakan banyak modul. Memberikan **standardized prediction service**.

### Landasan TOR
> **§1.3d (paragraf 1):** "*Predictive Modeling: AI-driven predictive models can forecast future climate scenarios, such as temperature increases, precipitation patterns, and extreme weather events*"

### Deskripsi Fungsional
Framework yang ekspose:
- Pre-trained models untuk umum (suhu, hujan, debit)
- Custom model training (untuk variabel spesifik)
- Standardized API: input time-series -> output forecast dengan CI

### Architecture
```
+---------------------------------------------+
| PREDICTIVE FRAMEWORK                         |
|                                              |
| +--------------+ +--------------+           |
| | Statistical  | | Deep Learning|           |
| | - ARIMA      | | - LSTM       |           |
| | - SARIMA     | | - GRU        |           |
| | - Prophet    | | - Transformer|           |
| | - Exp Smooth | | - NBeats     |           |
| +--------------+ +--------------+           |
| +--------------+ +--------------+           |
| | Ensemble     | | Spatial-Temp |           |
| | - Stacking   | | - ConvLSTM   |           |
| | - Blending   | | - PredRNN    |           |
| +--------------+ +--------------+           |
|                                              |
| Model Registry (MLflow)                      |
| AutoML capability (PyCaret)                  |
| Hyperparameter tuning (Optuna)               |
+---------------------------------------------+
```

### Use Cases
| Variabel | Model | Horizon |
|----------|-------|---------|
| Temperatur harian | LSTM, Prophet | 1-30 hari |
| Curah hujan jam | ConvLSTM | 1-72 jam |
| Debit sungai | LSTM + physics | 1-7 hari |
| Hotspot fire | XGBoost spatial | 7 hari |
| LULC change rate | ARIMA + spatial | Annual |
| Demand listrik | LSTM | 1-24 jam |
| Disease cases | SARIMA + climate | Weekly |

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Predictive Modeling Framework                        [User v]      |
+--------------------------------------------------------------------+
| Select variable: Curah hujan v                                     |
| Location/AOI: [Click on map to select]                             |
| Horizon: 7 hari                                                    |
| Confidence level: 95%                                              |
|                                                                    |
| Model: (*) Auto-select best (recommended)                          |
|        o ConvLSTM (radar-based)                                    |
|        o Prophet (statistical)                                     |
|        o Ensemble (slower, more accurate)                          |
|                                                                    |
| [Forecast]                                                         |
|                                                                    |
| Result:                                                            |
|  Rainfall (mm/day)                                                 |
|    50|  o-- observation                                            |
|    40|         o           Forecast ---->                          |
|    30|       o   o     /----   --\                                 |
|    20|  o  o        \ //         \                                 |
|    10|   \   o  o   \/            \                                |
|       +--------------------------------                            |
|       D-7  D-3  D0 (now)  D+3   D+7                                |
|       [Shaded band = 95% CI]                                       |
|                                                                    |
| Model used: ConvLSTM v2.3 (auto-selected)                          |
| Accuracy metrics (last validation): MAE 4.2mm, R^2 0.78            |
| [Lihat residual analysis] [Anomaly threshold setting]              |
+--------------------------------------------------------------------+
```

### Dependencies
**Library:** statsmodels, prophet, sktime, darts, neuralforecast, MLflow

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-ml (CORE FIT)  
**Coverage dari GeoVertix:** 60%  
**Estimasi Effort Saving:** 65%  
**Prioritas:** TINGGI (foundation banyak modul prediktif)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-ml** | 19240 | **Python container** untuk ML scripts; **classify_landuse, predict_values, interpolate, cluster_points, change_detection, detect_objects, finetune_foundation** existing | **Integrasi via API GeoVertix + extend scripts** |
| gxp-inference | 19210 | Deploy ONNX models hasil training | Integrasi via API GeoVertix |

#### Metode Integrasi
gxp-ml adalah CORE Predictive Framework. Extend dengan:
1. **Statistical models scripts**: arima.py, sarima.py, prophet.py, exp_smooth.py
2. **Deep learning scripts**: lstm.py, gru.py, transformer.py, nbeats.py
3. **Spatial-temporal**: convlstm.py, predrnn.py
4. **MLflow registry** deployment di gxp-ml container atau standalone
5. **AutoML (PyCaret)** script untuk model selection
6. **Drift detection** monitoring script

#### Yang Perlu DIBANGUN BARU/Extension
- **Statistical scripts**: ARIMA, SARIMA, Prophet, Exp Smoothing (~3 minggu)
- **DL scripts**: LSTM, GRU, Transformer, NBeats (~6 minggu)
- **ConvLSTM, PredRNN** scripts (~4 minggu)
- **MLflow registry deployment** (~2 minggu)
- **PyCaret AutoML script** (~2 minggu)
- **Drift detection script** (KS test, Wasserstein) (~2 minggu, link ke Modul 11.2)
- Frontend Predictive Modeling Configurator (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **GPU acceleration** untuk DL training — provision dedicated
- **MLflow deployment** sebagai shared service untuk semua scripts

#### Action Items
1. Install statsmodels, prophet, sktime, darts, neuralforecast, MLflow di gxp-ml
2. Sprint Y1-Q4


---

## FITUR 6.4: Scenario-Based Analysis Engine (AI-augmented)

### Tujuan Pengembangan
TOR §1.3d menyebut "scenario-based analysis" sebagai capability AI tersendiri. Modul ini AI-augmented untuk **eksplorasi ruang skenario yang luas** secara otomatis.

### Landasan TOR
> **§1.3d:** "*Scenario-Based Analysis: Machine learning tools can simulate various climate action scenarios... simulations help stakeholders evaluate potential outcomes and select optimal interventions*"

### Deskripsi Fungsional
**Berbeda dari 5.2 Scenario Manager** (manual scenario building) — modul ini **otomatis generate banyak scenario** dengan AI dan menemukan yang optimal/representative.

**Capabilities:**
1. **Monte Carlo Scenario Generation**: ribuan random plausible scenarios
2. **Adversarial scenarios**: worst-case discovery
3. **Pareto-optimal scenarios**: multi-objective trade-off frontier
4. **Storyline scenarios**: AI-generated narratives untuk dekarbonisasi pathways

### Algoritma & Metode

**1. Generative scenarios with constraints:**
- Latin Hypercube Sampling
- Latent space sampling (VAE)
- Each scenario: parameter vector + computed outcomes

**2. Reduction to representative set:**
- Clustering (K-means in outcome space)
- Select n_centroids representative

**3. Pareto Frontier:**
- Multi-objective NSGA-II
- Output: non-dominated set

**4. Sensitivity:**
- Cross all scenarios, identify which parameters drive outcomes most

### Output
- Set of representative scenarios with diverse outcomes
- Pareto frontier visualizations
- Storyline narratives (auto-generated via LLM)

### Detail UI/UX
```
+--------------------------------------------------------------------+
| AI Scenario Explorer                                  [User v]     |
+--------------------------------------------------------------------+
| Objective (multi):                                                 |
|   [x] Minimize loss (economic)                                     |
|   [x] Minimize population affected                                 |
|   [x] Maximize co-benefits ecology                                 |
|   [x] Minimize budget                                              |
|                                                                    |
| Parameter ranges (auto-detect):                                    |
|   [Tampilkan list]                                                 |
|                                                                    |
| Sampling: 5000 scenarios via Latin Hypercube                       |
| [Generate & Evaluate]                                              |
|                                                                    |
| Pareto frontier (3D projection):                                   |
| [interactive 3D plot loss vs pop vs cost]                          |
|                                                                    |
| 5 representative scenarios shown:                                  |
|   * Best cost: ...                                                 |
|   * Best protection: ...                                           |
|   * Best balance: ...                                              |
|   * Best eco co-benefit: ...                                       |
|   * Worst case (for stress test): ...                              |
|                                                                    |
| [Save selected to Scenario Manager 5.2]                            |
|                                                                    |
| AI-generated storyline (using LLM):                                |
| "In the Balanced Path, mangrove restoration begins in 2026..."     |
| [Read full narrative]                                              |
+--------------------------------------------------------------------+
```

### Dependencies
**Internal:** 5.3 Impact Engine (evaluate scenarios), 6.5 LLM (storyline gen)
**Library:** DEAP/pymoo (genetic algorithms), SALib

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New + Leverage gxp-geoai untuk Storyline  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** SEDANG

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | **LLM untuk auto-generated storyline narratives** (qwen3:8b context 8192) | Integrasi via API GeoVertix (heavy) |
| gxp-ml | 19240 | Scripts untuk Latin Hypercube sampling, NSGA-II Pareto | API call ke GeoVertix + tambah |
| (Modul 5.3) | - | Impact Analysis Engine evaluate scenarios | API call ke GeoVertix |

#### Metode Integrasi
1. **Latin Hypercube sampling**: script di gxp-ml (~1 minggu)
2. **NSGA-II Pareto frontier**: script di gxp-ml dengan pymoo
3. **Evaluate scenarios**: API call ke GeoVertix Modul 5.3
4. **Cluster representative**: K-means dari gxp-ml
5. **Storyline narrative**: API call ke GeoVertix gxp-geoai dengan prompt structured

#### Yang Perlu DIBANGUN BARU/Extension
- **Latin Hypercube + NSGA-II scripts** (~3 minggu)
- **Clustering representative selection** (~1 minggu)
- **Storyline prompt engineering** (~2 minggu)
- Frontend AI Scenario Explorer (~3 minggu)

#### Action Items
1. Sprint Y2-Q2


---

## FITUR 6.5: Natural Language Query (LLM Conversational Interface)

### Tujuan Pengembangan
TOR sangat eksplisit menyebut **LLM untuk Natural Language interaction** dengan SDSS. Mendemocratize akses analisis geospasial untuk **user non-teknis**.

### Landasan TOR
> **§1.3d:** "*Natural Language Processing (NLP) for Geospatial Queries: Advanced AI techniques, such as NLP, allow users to interact with geospatial data using natural language. This simplifies complex queries and makes advanced analytical tools accessible to non-technical users*"

> **§1.2.2 #4:** "*SDSS can be integrated with cutting-edge artificial intelligence technologies, particularly through implementing those geospatial toolboxes/models with a Model Context Protocol (MCP) and/or similar technologies. This allows them to communicate with local and open-source Large Language Models (LLMs)*"

### Deskripsi Fungsional
Chat interface di mana user bertanya/perintah dalam **Bahasa Indonesia** atau English, sistem:
1. **Parse intent** dengan LLM
2. **Match tool** via MCP (lihat 6.7)
3. **Execute** dengan parameter extracted
4. **Format response** dengan map/chart/table/text

### Contoh Interaksi

```
USER: "Tunjukkan wilayah paling rentan banjir di Jawa Tengah 
       untuk skenario 2050"

SYSTEM (internal):
  1. Intent: spatial_query
  2. Tool: vulnerability_assessment
  3. Parameters extracted:
     - hazard: flood
     - region: "Jawa Tengah" -> province_code: 33
     - period: 2050
     - climate: default SSP2-4.5
  4. Call vulnerability-service via MCP
  5. Format response

SYSTEM RESPONSE:
  "Berikut 5 kabupaten paling rentan banjir di Jawa Tengah untuk 
   skenario 2050 SSP2-4.5:
   
   1. Kab. Demak (composite vulnerability 0.82)
   2. Kab. Pekalongan (0.79)
   3. Kab. Banjarnegara (0.74)
   4. ...
   
   [Peta interaktif ditampilkan di samping]
   
   Apakah Anda ingin saya:
   - Tampilkan detail per kabupaten?
   - Generate rekomendasi adaptasi?
   - Bandingkan dengan skenario lain?"

USER: "Generate rekomendasi adaptasi untuk Demak"

SYSTEM:
  1. Context-aware: maintain conversation state
  2. Tool: context_aware_recommendation (Modul 5.6)
  3. Parameters: area=Demak, hazard=flood+SLR
  4. Execute
  5. Return recommendation paths
```

### Architecture

```
+------------------------------------------------------------+
|                  LLM CONVERSATIONAL LAYER                   |
|                                                             |
|  [User input in Bahasa Indonesia / English]                 |
|         |                                                   |
|         v                                                   |
|  +-------------------+                                      |
|  | Intent Classifier |  (fast small model)                  |
|  +-------------------+                                      |
|         |                                                   |
|         v                                                   |
|  +-------------------+      +------------------+            |
|  | Local LLM         |<---->| RAG Pipeline     |            |
|  | (Llama 3.1 8B /   |      | (Modul 6.6)      |            |
|  | Phi-3 / DeepSeek) |      +------------------+            |
|  +-------------------+                                      |
|         |                                                   |
|         v                                                   |
|  +-------------------+                                      |
|  | MCP Bridge        |  (Modul 6.7)                         |
|  | Tool call dispatch|                                      |
|  +-------------------+                                      |
|         |                                                   |
|         v                                                   |
|  Toolboxes / Modules / API                                  |
|         |                                                   |
|         v                                                   |
|  +-------------------+                                      |
|  | Response          |                                      |
|  | Formatter         |  text + map + chart + table         |
|  +-------------------+                                      |
+------------------------------------------------------------+
```

### Algoritma & Metode

**1. Local LLM Selection**
- **Llama 3.1 8B Instruct** (primary, Bahasa Indonesia tuning)
- **Phi-3 Mini 3.8B** (fast, untuk intent classification)
- **DeepSeek Coder 6.7B** (untuk geospatial code generation)
- Fine-tune dengan dataset Indonesia: kebijakan iklim, terminologi BIG

**2. Prompt Engineering**
- System prompt: "Anda adalah asisten SDSS Climate Action..."
- Few-shot examples: parsing intent
- Constrained output: JSON for tool calls

**3. Function Calling (Tool Use)**
- Schemas yang well-defined per tool
- LLM generates JSON arguments
- Validation before execution

**4. Conversation Memory**
- Session state: keep last N turns
- Long-term: vector store of past queries (RAG)

**5. Hallucination Prevention**
- Wajib gunakan tool untuk fakta numerik
- RAG retrieval untuk policy questions
- Disclaimer: "Hasil ini diturunkan dari model X dengan akurasi Y"

### Detail UI/UX

```
+--------------------------------------------------------------------+
| SDSS Climate Action Assistant                       [User v]       |
+--------------------------------------------------------------------+
| Conversation:                                                      |
|                                                                    |
|  YOU:                                                              |
|  "Berapa risiko banjir di Demak tahun 2050?"                       |
|                                                                    |
|  ASSISTANT:                                                        |
|  Untuk Kab. Demak pada skenario 2050 SSP2-4.5:                     |
|                                                                    |
|  - Area terdampak banjir (return period 100-yr):                   |
|    2024: 1,890 km^2  -->  2050: 2,340 km^2 (+24%)                  |
|  - Populasi terdampak: 412,000 jiwa (+ 18% vs baseline)            |
|  - Composite vulnerability index: 0.82 (Sangat Tinggi)             |
|                                                                    |
|  [Peta interaktif tampil di panel kanan]                           |
|                                                                    |
|  Apakah Anda ingin:                                                |
|  > Lihat breakdown per kecamatan                                   |
|  > Generate skenario adaptasi                                      |
|  > Bandingkan dengan SSP5-8.5                                      |
|  > Export PDF report                                               |
|                                                                    |
|  YOU:                                                              |
|  "Apa rekomendasi adaptasinya?"                                    |
|                                                                    |
|  ASSISTANT:                                                        |
|  Berdasarkan profil Demak (banjir+SLR+subsidence), saya            |
|  merekomendasikan 3 paket adaptasi:                                |
|                                                                    |
|  [Cards untuk Path A, B, C — sama seperti UI 5.6]                  |
|                                                                    |
|  Rekomendasi utama: Path A (Green-First)                          |
|  Alasan: BCR tertinggi (4.2), co-benefit ekologi besar,            |
|  feasibility tinggi (0.72), sesuai dengan kondisi mangrove         |
|  Demak yang masih bisa direhabilitasi.                             |
|                                                                    |
|  [Lihat detail] [Simpan sebagai scenario] [Share]                  |
|                                                                    |
| +----------------------------------------------------------+       |
| | Type your question in Bahasa Indonesia or English...     |       |
| |                                                          |       |
| | [Send] [Voice] [Upload file]                             |       |
| +----------------------------------------------------------+       |
+--------------------------------------------------------------------+
```

### Dependencies
**Internal:** 6.6 RAG, 6.7 MCP, semua modul (target untuk tool calls)
**External:** Ollama runtime untuk local LLM
**Library:** langchain, llama-index, transformers, vLLM (untuk fast inference)

### Karakteristik Non-Fungsional
| Aspek | Target |
|-------|--------|
| Response latency (simple query) | < 3 detik |
| Response latency (complex tool call) | < 10 detik |
| Bahasa Indonesia BLEU score | > 35 (vs Indo gold standard) |
| Tool call accuracy | > 90% correct tool selection |
| Hallucination rate (fact check) | < 5% |

### Validasi & QA
- Test set 500 query Indonesia + 500 English
- Expert review responses sample
- Continuous human-in-the-loop feedback loop
- A/B testing model variants

### Akses Per Tier
- Government Full: full conversational access
- Researcher: full + API for embedding
- Private: limited query rate
- Public: simplified mode (basic queries hanya)

### Integrasi dengan GeoVertix

**Status Integrasi:** Direct API Reuse + Extend Tools Registry di SDSS (PERFECT FIT)  
**Coverage dari GeoVertix:** 80%  
**Estimasi Effort Saving:** 80%  
**Prioritas:** TINGGI (democratization, multi-language)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | **Ollama LLM backend (qwen3:8b primary, qwen3:4b/1.7b alternatives), intent parsing, entity extraction, chain planning (max_chain_steps=10), function calling, session memory (TTL 3600s), confirm threshold, optional VLM (llava)** — semua yang dibutuhkan TOR sudah ada | **Integrasi via API GeoVertix (CORE)** |

#### Metode Integrasi
**Modul 6.5 = LANGSUNG gxp-geoai** dengan minor extension:
1. Frontend SDSS expose chat UI yang invoke gxp-geoai
2. Function calling sudah implementation di gxp-geoai
3. Session memory sudah 3600s default — adjust jika perlu
4. **Extend tools registry** dengan ~70 SDSS-specific tools (Modul 2.x-13.x endpoints)
5. **Fine-tune** qwen3 dengan Indonesian climate corpus untuk vocabulary spesifik

#### Komponen yang Dimanfaatkan Langsung
- Ollama LLM dispatch (qwen3:8b ~5GB RAM)
- Intent parsing + entity extraction
- Chain-of-thought planning (max 10 steps)
- Confirm threshold untuk long chains
- Function calling / tool use
- Session memory (3600s TTL)
- VLM optional (llava untuk image)
- NL response synthesis dengan citations

#### Yang Perlu DIBANGUN BARU/Extension
- **Tools registry untuk SDSS** (~70 tools manifest) (~4 minggu)
- **Indonesian climate fine-tuning** corpus + LoRA (~3 minggu)
- **Chat UI frontend** dengan map embed (~3 minggu)
- **Voice input** integration (Web Speech API) (~1 minggu)

#### Pertimbangan Khusus & Risiko
- **qwen3:8b RAM requirement** ~5GB — pastikan server resource
- **VLM llava** opsional untuk image understanding — disable default
- **Hallucination prevention**: rely on tool calls untuk fakta numerik
- **Bahasa Indonesia accuracy** target BLEU >35 — fine-tuning penting

#### Action Items
1. Sprint Y2-Q1: register SDSS tools ke gxp-geoai tools registry
2. Fine-tune qwen3 dengan korpus iklim Indonesia (KemenLHK, BMKG, BIG publications)
3. UAT dengan native Indonesian speakers


---

## FITUR 6.6: RAG Pipeline & Knowledge Base

### Tujuan Pengembangan
Memberikan LLM **konteks faktual** dari knowledge base internal (dokumen kebijakan, manual modul, FAQ, paper terkait). Mengurangi hallucination.

### Landasan TOR
> **§1.2.2 #4:** "*LLMs and Retrieval Augmented Generation (RAG)*"

### Deskripsi Fungsional
Setiap query LLM:
1. Embed query
2. Retrieve top-K relevant chunks dari vector store
3. Inject chunks ke prompt sebagai context
4. LLM generate dengan grounding

### Knowledge Base Content

| Kategori | Contoh |
|----------|--------|
| Kebijakan & regulasi | UU 24/2007, UU 26/2007, UU 32/2009, Permen ATR/BPN, Permen LHK, dll. |
| RPJMN, RPJMD, RAN-API, RAD-API | Per provinsi |
| Indonesia NDC document | Updated NDC, ENDC |
| IPCC reports | AR6 WG1/WG2/WG3 summary |
| Manual modul SDSS | Per fitur |
| Methodology docs | Per algoritma |
| Best practices adaptasi | dari KemenLHK, BNPB, BIG, akademisi |
| FAQs internal | Tim helpdesk knowledge |
| Glosarium iklim | Indonesia + English |
| Indonesia spatial planning regulations | NSPK, SK Menhut |

### Algoritma & Metode

**1. Document Ingestion Pipeline**
- Parse: PDF, DOCX, HTML, MD
- Chunking: 512 tokens with overlap 50
- Metadata: source, date, topic, page

**2. Embedding**
- Model: `sentence-transformers/paraphrase-multilingual-mpnet-base-v2` (atau Indonesian-specific)
- Vector dimension: 768
- Store: Qdrant atau Weaviate

**3. Retrieval**
- Top-K (default 5)
- Hybrid: dense (vector) + sparse (BM25)
- Re-ranking dengan cross-encoder

**4. Augmentation**
- Concatenate retrieved chunks with citation markers
- Prompt template: "Berdasarkan dokumen berikut: [chunks] ... Jawab pertanyaan: [query]"

**5. Citation**
- LLM diminta cite sumber
- Frontend display citation links

### Detail UI/UX

```
USER: "Bagaimana regulasi tentang sempadan pantai?"

ASSISTANT:
  Berdasarkan regulasi Indonesia:
  
  Sempadan pantai adalah daratan sepanjang tepian pantai yang lebarnya
  proporsional dengan bentuk dan kondisi fisik pantai, minimal 100 meter
  dari titik pasang tertinggi ke arah daratan [1].
  
  Fungsi sempadan pantai:
  - Melindungi pantai dari abrasi
  - Melindungi sumber air dari intrusi air laut
  - Habitat biota pantai
  - Pelestarian biodiversity
  
  Pengaturan di tingkat kabupaten/kota:
  Diatur dalam RTRW dan RDTR sesuai Permen ATR/BPN No. 11/2021 [2].
  
  Untuk Demak, sempadan pantai harus diintegrasikan dengan adaptasi SLR,
  dengan mempertimbangkan proyeksi 100 tahun [3].
  
  Sumber:
  [1] UU 26/2007 tentang Penataan Ruang, Pasal 14
  [2] Permen ATR/BPN 11/2021 tentang RDTR
  [3] Dokumen NDC Indonesia 2022 Update
  
  [Lihat dokumen sumber] [Lihat regulasi terkait]
```

### Dependencies
**Library:** LangChain, LlamaIndex, sentence-transformers, Qdrant client, rank-bm25

### Akses Per Tier
Semua tier dapat menggunakan RAG (knowledge dasar) — beberapa dokumen sensitif terbatas ke government tier.

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-geoai + Add Vector Store  
**Coverage dari GeoVertix:** 40%  
**Estimasi Effort Saving:** 50%  
**Prioritas:** TINGGI (anti-hallucination critical)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | Context injection window 8192 tokens, LLM dispatch | Integrasi via API GeoVertix |

#### Metode Integrasi
gxp-geoai punya context window tapi belum punya **dedicated RAG**. Build extension:
1. Deploy **Qdrant atau Weaviate** sebagai vector store (standalone atau as Modul RAG Service SDSS plugin)
2. **Document ingestion pipeline**: PDF/DOCX/HTML parsing → chunking (512 tokens, overlap 50) → embedding
3. **Embedding model**: sentence-transformers/paraphrase-multilingual-mpnet-base-v2
4. **Hybrid retrieval**: BM25 (sparse) + dense vector + cross-encoder re-ranking
5. **Augmentation**: inject top-K chunks ke gxp-geoai context dengan citation markers

#### Yang Perlu DIBANGUN BARU/Extension
- **Vector store deployment** Qdrant atau Weaviate (~2 minggu)
- **Ingestion pipeline** PDF/DOCX/HTML parsing + chunking (~3 minggu)
- **Embedding service** (~2 minggu)
- **Retrieval API** dengan hybrid search (~3 minggu)
- **Knowledge base content curation**: UU, Permen, RPJMN, IPCC, NDC, manual (~6 minggu, paralel content work)
- **Citation marker** integration di LLM prompt (~1 minggu)

#### Pertimbangan Khusus & Risiko
- **Multilingual embedding** Indonesia/English support
- **Document update** dari sumber resmi — pipeline schedule
- **Vector store size** scaling dengan korpus growth

#### Action Items
1. Deploy Qdrant container
2. Sprint Y2-Q1: pilot dengan UU 26/2007 + Permen ATR/BPN 11/2021
3. Engagement dengan tim legal untuk source curation


---

## FITUR 6.7: MCP Server (Toolbox Bridge)

### Tujuan Pengembangan
TOR sangat eksplisit menyebut **MCP (Model Context Protocol)** sebagai **bridge** antara LLM dan toolbox geospasial. Tanpa MCP, LLM hanya bisa menjawab dari pengetahuan internal — dengan MCP, LLM dapat **memanggil tool nyata**.

### Landasan TOR
> **§1.2.2 #3:** "*Each toolbox has its defined input, output, and parameters that will be read by the Model Context Protocol (MCP) and/or similar technologies for a bridge of communication with a Large Language Model (LLM) Artificial Intelligence*"

> **§1.2.2 #4:** "*implementing those geospatial toolboxes/models with a Model Context Protocol (MCP) and/or similar technologies. This allows them to communicate with local and open-source Large Language Models (LLMs)*"

### Deskripsi Fungsional
MCP Server adalah **layer middleware** yang:
1. **Mendaftarkan tools** dengan schema yang jelas (input, output, parameters)
2. **Menerima tool call** dari LLM (atau client lain)
3. **Validasi & execute** dengan keamanan
4. **Return result** dalam format standar

### MCP Tool Schema Example

```yaml
tool: flood_modeling
description: |
  Hidrodinamika 2D simulasi banjir per return period & climate scenario
inputs:
  region:
    type: GeoJSON
    description: AOI for simulation
    required: true
  return_period:
    type: enum
    values: [2, 5, 10, 25, 50, 100]
    default: 100
  climate_scenario:
    type: enum
    values: [current, SSP1-2.6, SSP2-4.5, SSP3-7.0, SSP5-8.5]
    default: current
  time_horizon:
    type: integer
    range: [2024, 2100]
    default: 2024
outputs:
  hazard_map:
    type: COG
    description: Flood depth raster
  affected_population:
    type: integer
  affected_area_km2:
    type: float
  alert_recommendations:
    type: list[string]
auth_required: read:flood-modeling
sla:
  max_latency_sec: 180
  rate_limit: 10/min
```

### Architecture

```
+-----------------------------------------------+
| MCP SERVER                                    |
|                                               |
| - Tool registry (declarative manifests)       |
| - Request validation (JSON Schema)            |
| - Authentication & authorization              |
| - Rate limiting per user/tier                 |
| - Audit logging                               |
| - Result caching                              |
| - Streaming for long-running ops              |
|                                               |
| Endpoints:                                    |
|   GET  /mcp/tools         (list)              |
|   GET  /mcp/tools/{id}    (schema)            |
|   POST /mcp/call/{id}     (execute)           |
|   GET  /mcp/job/{id}      (poll status)       |
+-----------------------------------------------+
         |                  |
         v                  v
+-----------------+ +-----------------+
| LLM Client      | | Microservices   |
| (LangChain etc) | | (modul SDSS)    |
+-----------------+ +-----------------+
```

### Tools Catalog (~70 tools yang akan didaftarkan)

| Category | Tools |
|----------|-------|
| Climate (Modul 2.1) | get_climate_proj, get_lcz, get_microclimate |
| LULC (Modul 2.2) | get_lulc, get_lulc_change, project_lulc |
| Carbon (Modul 2.3) | get_carbon_inventory, simulate_reduction |
| Biodiv (Modul 2.4) | get_species_dist, get_corridors |
| SLR (Modul 2.5) | get_slr_trend, get_subsidence, get_inundation |
| Flood-Drought (Modul 2.6) | run_flood_sim, get_drought_index, run_nowcast |
| Vulnerability (Modul 3.x) | compute_vulnerability, run_dyn_vuln |
| Specialized (Modul 4.x) | rdtr_suitability, food_security, coastal, ... |
| SDSS Core (Modul 5.x) | create_scenario, run_impact, mcda, ... |
| AI (Modul 6.x) | predict_ts, detect_anomaly, recognize_image |
| Data (Modul 10) | search_catalog, get_metadata, ... |

### Algoritma & Metode

**Tool Discovery:**
- Tools auto-discovered dari manifests in code
- Schema-first approach (OpenAPI 3.0 + extensions)

**Execution:**
- Sync untuk fast tools (< 5s)
- Async with job_id untuk slow tools
- Streaming responses untuk LLM

**Security:**
- OAuth 2.0 / OIDC for auth
- RBAC: tool access per user role
- Sandboxing: tools jalan di container terisolasi
- Rate limiting per user, per tool

**Observability:**
- Trace setiap tool call (correlation_id)
- Metrics: latency, success rate, error types
- Logs ke ELK/Loki

### Detail UI/UX

Untuk admin (developer/maintainer):
```
+--------------------------------------------------------------------+
| MCP Tools Registry                                  [Admin v]      |
+--------------------------------------------------------------------+
| 70 tools registered  |  Last 24h: 12,420 calls  |  Errors: 0.3%   |
|                                                                    |
| Tool                       | Calls(24h) | P95 lat | Errors | Status|
|----------------------------|-----------|---------|--------|-------|
| flood_modeling             | 1,240     | 4.2s    | 0.1%   | OK    |
| get_climate_proj           | 3,840     | 0.4s    | 0.0%   | OK    |
| run_impact_analysis        |   420     | 28s     | 0.8%   | WARN  |
| ...                        |           |         |        |       |
|                                                                    |
| [Add new tool] [Edit] [Disable] [View audit log]                   |
+--------------------------------------------------------------------+
```

### Dependencies
**External:** Anthropic MCP spec (open) atau custom implementation
**Library:** FastAPI, Pydantic, asyncio

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-geoai (PARTIAL CORE FIT)  
**Coverage dari GeoVertix:** 75%  
**Estimasi Effort Saving:** 75%  
**Prioritas:** TINGGI (TOR §1.2.2 #3 #4 eksplisit minta MCP)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | **Function calling / tool use sudah implemented** di gxp-geoai (untuk API call ke GeoVertix lain) | Extend dengan formal MCP spec |

#### Metode Integrasi
gxp-geoai sudah punya **function calling** — Modul 6.7 = formalize sebagai MCP server:
1. **MCP spec compliance**: adopt Anthropic MCP atau custom implementation
2. **Tool registry declarative**: manifest YAML per plugin/operation
3. **Tool discovery endpoint**: GET /mcp/tools (list), GET /mcp/tools/{id} (schema)
4. **Execution endpoint**: POST /mcp/call/{id}, GET /mcp/job/{id} (poll async)
5. **Security**: OAuth 2.0 + RBAC per tool
6. **Audit**: setiap tool call logged dengan correlation_id

#### Komponen yang Dimanfaatkan Langsung
- Function calling infrastructure di gxp-geoai
- API call ke dispatcher GeoVertix
- Auth & authorization GeoVertix core
- Audit pattern (gxp-pbb has audit table example)

#### Yang Perlu DIBANGUN BARU/Extension
- **MCP server formalization** sebagai Modul MCP Server SDSS atau extend gxp-geoai (~4 minggu)
- **Tool manifest schemas** untuk ~70 SDSS tools (~4 minggu, paralel dengan modul lain)
- **Rate limiting per user/tier** (~2 minggu)
- **Async streaming** untuk long-running tools (~2 minggu)
- **MCP Admin UI** (tools registry management) (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **MCP spec evolution**: Anthropic MCP masih relatif baru, breaking changes mungkin
- **Tool versioning** strategy (v1 → v2 deprecation)

#### Action Items
1. Decide MCP impl: extend gxp-geoai vs standalone Modul MCP Server SDSS
2. Define tool manifest template
3. Sprint Y2-Q1


---

## FITUR 6.8: Federated Learning Infrastructure (BARU)

### Tujuan Pengembangan
TOR §1.3d #3.d eksplisit menyebut "**Federated learning approaches to maintain data privacy while improving models**". Penting untuk:
1. **Data sensitif** yang tidak boleh keluar K/L (mis. data populasi rentan, data infrastruktur kritis)
2. **Provincial pilot** dimana data tetap di provinsi tapi model bisa belajar dari semua
3. **Edge devices** (kabupaten dengan konektivitas terbatas) tetap berkontribusi

### Landasan TOR
> **§1.3d #3.d:** "*Federated learning approaches to maintain data privacy while improving models*"

### Deskripsi Fungsional
Setup federated learning di mana:
- **Coordinator** (pusat di BIG) mengelola model global
- **Clients** (provinsi, K/L) train pada data lokal
- **Aggregator** menggabungkan model updates (bukan data) ke model global
- **Privacy**: differential privacy bisa ditambahkan

### Algoritma & Metode

**Federated Averaging (FedAvg):**
```
1. Server initialize global model w_0
2. For each round t:
   a. Sample subset of clients
   b. Send w_t to clients
   c. Each client trains locally: w_t+1^k = train(w_t, local_data_k)
   d. Send w_t+1^k back to server
   e. Server aggregate: w_t+1 = sum(n_k/n * w_t+1^k)
3. Repeat until convergence
```

**Privacy enhancements:**
- Differential privacy (add noise to gradients)
- Secure aggregation (homomorphic encryption)
- Compression (reduce comm overhead)

### Use Cases di Indonesia

| Use Case | Why Federated? |
|----------|---------------|
| Disease outbreak prediction | Data kesehatan sensitif per provinsi |
| Power demand forecasting | Data PLN per region terprotek |
| Crop yield prediction | Data Kementan per provinsi |
| Anomaly detection lokal | Data IoT proprietary |
| Citizen science aggregation | Privacy contributors |

### Architecture
```
+-----------------------------------+
| COORDINATOR (BIG Pusat)            |
| - Global model registry            |
| - Aggregation server               |
| - Privacy budget tracking          |
+-----------------------------------+
              |
   +----------+----------+
   |          |          |
   v          v          v
+------+   +------+   +------+
| Prov |   | Prov |   | Prov |
| Banten   | DIY  |   | NTB  |
| Client   | Client   | Client
+------+   +------+   +------+
   |          |          |
 Data       Data       Data
 lokal      lokal      lokal
 (private)  (private)  (private)
```

### Detail UI/UX

Untuk admin/data steward:
```
+--------------------------------------------------------------------+
| Federated Learning Dashboard                       [Admin v]       |
+--------------------------------------------------------------------+
| Active campaigns:                                                  |
|                                                                    |
| Campaign: "Crop Yield Prediction v3"                               |
|   Participants: 12 provinces (8 active, 4 pending)                 |
|   Round: 28 / 50                                                   |
|   Global model accuracy: 0.82 (improved from 0.74)                 |
|   Privacy budget remaining: 4.2 epsilon                            |
|   Next round: in 2 days                                            |
|                                                                    |
| Campaign: "Disease Outbreak v1"                                    |
|   Participants: 34 kab (Health offices)                            |
|   Status: Recruiting                                               |
|   [Setup details]                                                  |
|                                                                    |
| [New campaign] [View past] [Privacy audit]                         |
+--------------------------------------------------------------------+
```

### Dependencies
**Library:** Flower (FL framework), PySyft, OpenFL, TensorFlow Federated

### Akses Per Tier
- Coordinator: BIG/admin only
- Client deployment: per K/L IT
- Data steward: setup campaigns

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Federated Learning SDSS) - Tidak Ada Padanan  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 10%  
**Prioritas:** RENDAH (Y3)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-ml | 19240 | Container pattern untuk client deployment | Reference pattern |

#### Metode Integrasi
Federated Learning adalah domain SANGAT spesifik tidak ada di GeoVertix. Build:
1. **Coordinator server** di BIG pusat
2. **Client deployment** per K/L provinsi (container)
3. **Flower framework** atau PySyft sebagai FL engine
4. **Differential privacy** dengan epsilon budget
5. **Secure aggregation** (homomorphic encryption)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Federated Learning SDSS plugin** ~8-10 minggu
- **Coordinator-client architecture** ~6 minggu
- **DP + secure aggregation** ~4 minggu
- **Privacy budget tracking** ~2 minggu
- Frontend FL Dashboard ~3 minggu

#### Pertimbangan Khusus & Risiko
- **Multi-K/L deployment complexity** — coordinate dengan masing-masing K/L IT
- **Compliance** dengan PDP Law + per-K/L policy
- **Network bandwidth** untuk sync — compression mandatory

#### Action Items
1. Defer ke Y3
2. Pilot dengan 2-3 provinsi yang siap (Banten, DIY)


---

## FITUR 6.9: Explainable AI (XAI) Service

### Tujuan Pengembangan
TOR §1.3d sangat menekankan **explainable AI**: "*Transparent AI decision-making processes with explainable AI techniques*". Juga di Land Carrying Capacity (sudah disebut SHAP).

### Landasan TOR
> **§1.3d #2.a:** "*AI Ethics and Governance: Transparent AI decision-making processes with explainable AI techniques*"

> **§1.3d (paragraf Carrying Capacity):** "*identifying limiting factors through explainable AI (e.g., SHAP)*"

### Deskripsi Fungsional
Service horizontal yang menyediakan **explanation** untuk hasil model AI:
- Mengapa prediksi ini? (local explanation)
- Feature mana paling penting overall? (global)
- Counterfactual: "kalau X berubah, prediksi jadi apa?"

### Algoritma & Metode

**Local Explanation:**
- **SHAP** (TreeSHAP for tree models, DeepSHAP for NN, KernelSHAP general)
- **LIME** untuk local linear approximation
- **Integrated Gradients** untuk deep models

**Global Explanation:**
- **Feature importance** (built-in untuk tree models)
- **Partial Dependence Plots (PDP)**
- **Permutation importance**

**Counterfactual:**
- DiCE library
- "Apa jika feature X ubah jadi Y? prediksi akan jadi Z"

**Bias Detection:**
- AIF360 fairness metrics
- Detect disparate impact across protected attributes (gender, region, dll)

### Use Cases

| Model | Why XAI? |
|-------|----------|
| Land Carrying Capacity | Identify limiting factor |
| Forest fire prediction | Why this area at risk? |
| Crop yield | What can farmer do? |
| Vulnerability scoring | Why this ranking? |
| Anomaly detection | Why flagged? |
| LLM responses | Sources cited (via RAG) |

### Detail UI/UX

Per-prediction XAI panel:
```
+--------------------------------------------------------------------+
| Why this prediction? — Detail Explanation                          |
+--------------------------------------------------------------------+
| Prediction: Carrying Capacity = 0.34 (Moderate-Low)                |
| Location: Cell H3-887c4d... (Demak)                                |
|                                                                    |
| Top contributing factors (SHAP values):                            |
|                                                                    |
|  Water availability         ----#### -0.15 (BIGGEST NEG)           |
|  Flood risk                 -----### -0.12                         |
|  Slope                      -------# -0.04                         |
|  Aksesibilitas              ##------ +0.05                         |
|  Soil quality               #------- +0.02                         |
|                                                                    |
| Interpretation:                                                    |
| Lokasi ini memiliki keterbatasan utama pada ketersediaan air      |
| bersih dan risiko banjir tinggi. Aksesibilitas baik tapi tidak     |
| cukup untuk mengkompensasi.                                        |
|                                                                    |
| Counterfactual:                                                    |
| Jika ketersediaan air ditingkatkan 30% -> CC akan naik ke 0.52    |
| Jika tanggul flood control dibangun -> CC akan naik ke 0.41        |
| Jika keduanya dilakukan -> CC akan naik ke 0.61                   |
|                                                                    |
| [Lihat global feature importance] [Lihat partial dependence]      |
| [Compare dengan kabupaten lain]                                   |
+--------------------------------------------------------------------+
```

### Dependencies
**Library:** SHAP, LIME, DiCE, ELI5, captum, AIF360

### Akses Per Tier
- Government Full: full XAI for all models
- Researcher: full + custom XAI development
- Private: per-model basis
- Public: simplified explanation (textual)



### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-ml + Build XAI Service  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (TOR §1.3d #2.a explicit + 4.7 SHAP requirement)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-ml** | 19240 | **predict_values.py** (XGBoost) — TreeSHAP fast exact compatible | Integrasi via API GeoVertix |
| gxp-inference | 19210 | DL models untuk DeepSHAP, Integrated Gradients | API call ke GeoVertix |

#### Metode Integrasi
1. **SHAP service** sebagai script di gxp-ml (atau standalone Modul XAI Service SDSS plugin)
2. TreeSHAP untuk XGBoost (fast exact)
3. DeepSHAP untuk DL models
4. Integrated Gradients untuk DL via gxp-inference
5. LIME, DiCE counterfactual via scripts gxp-ml
6. AIF360 bias detection via scripts

#### Yang Perlu DIBANGUN BARU/Extension
- **shap library** di gxp-ml container (~1 minggu)
- **DiCE counterfactual** library install (~1 minggu)
- **AIF360 fairness** library install (~1 minggu)
- **XAI API wrapper** (~3 minggu)
- Frontend Explainability viewer (~3 minggu)

#### Action Items
1. Install shap, lime, dice-ml, captum, aif360 di gxp-ml
2. Sprint Y2-Q1 (paralel dengan 4.7)


---

---

# Ringkasan Bagian 6 — AI/ML Framework Compliance

TOR §1.3d memberikan 3 framework AI yang HARUS dipenuhi. Berikut compliance per framework:

## Framework 1: AI Development & Deployment

| Requirement TOR | Implementasi |
|-----------------|--------------|
| Phased implementation | Year 1: simple models (RF, LightGBM); Year 2: DL & ConvLSTM; Year 3: Federated, advanced ensemble |
| Transfer learning | Modul 6.1 explicit; modul image-based pakai pre-trained |
| Hybrid (physics + data) | Modul 2.6 flood (HEC-RAS + ConvLSTM); Modul 4.4 fire (FWI + ML) |

## Framework 2: AI Ethics & Governance

| Requirement TOR | Implementasi |
|-----------------|--------------|
| Explainable AI | Modul 6.9 dedicated; SHAP di Modul 4.7 |
| Bias detection | AIF360 integrated; audit per release model |
| Human-in-the-loop | Modul 6.1 active learning; Modul 6.2 alert acknowledgment |
| National AI compliance | Comply Permenkominfo SE 9/2023 tentang AI Ethics |

## Framework 3: AI Performance Optimization

| Requirement TOR | Implementasi |
|-----------------|--------------|
| Auto retraining (drift detection) | MLflow monitoring; trigger retrain saat drift > threshold |
| Model compression | Quantization, pruning untuk edge (Modul 12) |
| Ensemble | Modul 6.3 framework supports stacking; modul 2.x explicit ensembles |
| **Federated learning** | **Modul 6.8 dedicated** |
---

# BAGIAN 7 — COLLABORATION & WORKFLOW (3 Fitur)

TOR §1.3c #2 menyebutkan "Collaborative Decision-Making Features" dengan 3 sub: multi-stakeholder workflows, scenario comparison, annotation. Plus naratif tentang "stakeholder preferences and expert knowledge". Berikut elaborasi.

## FITUR 7.1: Multi-Stakeholder Consultation Workflow

### Tujuan Pengembangan
Mengorkestrasi **proses konsultasi terstruktur** lintas K/L dan stakeholder untuk dokumen perencanaan iklim — terhindari "rapat tanpa output", semua input terdokumentasi dan dapat dilacak.

### Landasan TOR
> **§1.3c #2.a:** "*Structured multi-stakeholder consultation workflows*"

### Deskripsi Fungsional
Sistem mendefinisikan **template konsultasi** (mis. "Konsultasi Publik RDTR", "Konsultasi Lintas K/L Anggaran Adaptasi") dengan tahapan, deadline, dan output yang jelas.

### Workflow Template Example

```
TEMPLATE: "RDTR Climate-Informed Consultation"

Stage 1: Internal Drafting (Bappeda)
  Duration: 4 minggu
  Outputs: Draft RDTR v1
  Approval: Kepala Bappeda

Stage 2: K/L Coordination (BIG, KLHK, BNPB, ATR/BPN, PUPR)
  Duration: 2 minggu
  Outputs: Comments matrix, revisi v2
  Approval: Sekretaris/Direktur per K/L

Stage 3: Public Consultation
  Duration: 30 hari (per Permen ATR/BPN 11/2021)
  Outputs: Public comments, response matrix
  Approval: Sosialisasi minimum 3 sesi

Stage 4: Expert Panel Review
  Duration: 2 minggu
  Outputs: Technical review document
  Approval: Tim ahli sign-off

Stage 5: Approval & Publication
  Duration: 1 minggu
  Outputs: SK Bupati/Walikota, dokumen final
  Approval: Bupati/Walikota
```

### Fitur Workflow Engine
- Drag-drop workflow designer (admin)
- State machine: setiap stage punya status (in-progress, completed, blocked)
- Assignee tracking
- Deadline reminders
- Audit log immutable

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Workflow: RDTR Demak Climate-Informed Consultation [User v]        |
+--------------------------------------------------------------------+
| Current stage: 3 / 5 (Public Consultation)                         |
| Progress: ###############----- 60%                                 |
| Deadline overall: 2026-08-15 (45 hari tersisa)                     |
|                                                                    |
| Pipeline:                                                          |
|                                                                    |
|  [Stage 1]    [Stage 2]    [Stage 3]    [Stage 4]    [Stage 5]     |
|  Drafting --> K/L Coord --> Public  --> Expert  --> Approval       |
|  COMPLETED   COMPLETED     ACTIVE       PENDING     PENDING        |
|  4w (4w)     2w (2w)       30d (15d)                              |
|                                                                    |
| Active stage detail:                                               |
|                                                                    |
|  Public Consultation                                               |
|  Sub-tasks:                                                        |
|   [x] Publish dokumen draft                                        |
|   [x] Email broadcast ke 5,200 stakeholder                         |
|   [x] Sosialisasi sesi 1 (200 attendees)                           |
|   [ ] Sosialisasi sesi 2 (next: 2026-06-15)                        |
|   [ ] Sosialisasi sesi 3                                           |
|   [ ] Konsolidasi komentar                                         |
|                                                                    |
|  Comments masuk: 142  (klik untuk lihat)                           |
|  Comments responded: 88                                            |
|  Comments pending: 54                                              |
|                                                                    |
|  [Add team member] [Send reminder] [Export progress report]        |
+--------------------------------------------------------------------+
```

### Dependencies
**Internal:** 5.7 Group Decision (overlap), 9.2 Notification, 9.3 Audit  
**Library:** Camunda atau Apache Airflow untuk workflow engine

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Workflow Engine SDSS) + Reference Pattern  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mapeditor** | 19275 | **Changeset pattern** (changesets table, change_entries, active_sessions) — sebagai reference untuk workflow tracking | Pattern reference + integration |
| gxp-areainfo | 19285 | Workflow context per area | API call ke GeoVertix |
| GeoVertix Core | 17500 | RBAC user/roles untuk assignee | Foundation |

#### Metode Integrasi
Multi-Stakeholder Workflow memerlukan engine yang lebih kompleks dari editing pattern. Build:
1. **Workflow engine**: Camunda atau Apache Airflow untuk workflow definition
2. **State machine** per stage (Drafting → K/L Coord → Public → Expert → Approval)
3. **Adopt changeset pattern** dari gxp-mapeditor untuk per-stage audit
4. **Assignee tracking** menggunakan RBAC GeoVertix
5. **Deadline reminders** via Modul 9.2 Notification

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Workflow Engine SDSS plugin** dengan schema sdss_workflow.* (~5 minggu)
- **Workflow template library** (RDTR consultation, K/L coord, public participation) (~3 minggu)
- **State machine engine** (~3 minggu)
- **Drag-drop workflow designer** admin UI (~4 minggu)
- **Audit log immutable** dengan hash chain (~2 minggu)
- Frontend Workflow Dashboard (~3 minggu)

#### Action Items
1. Sprint Y1-Q4
2. Reference dari gxp-mapeditor changesets schema


---

## FITUR 7.2: Annotation & Comment System

### Tujuan Pengembangan
Memungkinkan **anotasi visual & komentar** langsung pada peta, scenario, dokumen — capture insight kontekstual yang sulit di-text saja.

### Landasan TOR
> **§1.3c #2.c:** "*Comment and annotation capabilities for collaborative analysis*"

### Deskripsi Fungsional
- Draw shape pada peta + attach comment
- Comment threaded (replies)
- Mention user dengan @username
- Tag with category (issue, suggestion, question)
- Resolved/Open status
- Notifications: user mentioned/replied

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Peta dengan annotations terbuka                                    |
|                                                                    |
|  [Peta dengan polygon highlighted]                                 |
|                                                                    |
|  Annotation #142 by @bpbd-demak:                                   |
|  "Area ini sering banjir tapi belum masuk hazard map. Mohon        |
|   verifikasi lapangan."                                            |
|  Tag: [Issue] [High Priority]                                      |
|  Status: Open                                                      |
|                                                                    |
|  Replies:                                                          |
|   @big-pusat: "Verified — akan kami tambahkan di v2.1"            |
|   @bpbd-demak: "Terima kasih"                                      |
|                                                                    |
|  [Resolve] [Reply] [Subscribe]                                     |
|                                                                    |
| Filter annotations:                                                |
|   [x] My area  [x] Open only  [ ] All time                         |
|   [x] Tag: Issue  [ ] Tag: Suggestion  [ ] Tag: Question           |
|                                                                    |
| Annotations summary: 142 total, 38 open, 104 resolved              |
+--------------------------------------------------------------------+
```

### Implementasi
- Annotation stored sebagai GeoJSON Feature dengan properties
- Comment thread = ordered list of comments per annotation_id
- Real-time updates via WebSocket

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-mapeditor + Add Comment Layer  
**Coverage dari GeoVertix:** 65%  
**Estimasi Effort Saving:** 65%  
**Prioritas:** TINGGI (UX critical)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mapeditor** | 19275 | **Vector editing primitive** (draw polygon, line, point), optimistic locking untuk concurrent edit, attribute editing | **Integrasi via API GeoVertix (CORE)** |
| GeoVertix Core | 17500 | WebSocket support untuk real-time | Foundation |

#### Metode Integrasi
Annotation System = vector editing + comment layer:
1. **Draw shape**: API call ke GeoVertix gxp-mapeditor untuk add feature (annotation as Feature dengan properties: comment_thread, tags, status)
2. **Comment thread** sebagai relational table di sdss_annotation.*
3. **@mentions** dengan notification (Modul 9.2)
4. **Tag categorization**: properties di annotation feature
5. **Real-time updates**: WebSocket untuk live collaboration

#### Komponen yang Dimanfaatkan Langsung
- Vector drawing (gxp-mapeditor toolbar tools)
- Optimistic locking (sudah dipakai)
- Active sessions tracking
- Topology validation (jika diperlukan)
- Audit log via changesets

#### Yang Perlu DIBANGUN BARU/Extension
- **Comment threaded model** di sdss_annotation.* (~2 minggu)
- **@mentions logic** + notification integration (~1 minggu)
- **Real-time WebSocket** untuk live comments (~2 minggu)
- **Tag taxonomy & filtering** (~1 minggu)
- Frontend Annotation panel dengan map integration (~3 minggu)

#### Action Items
1. Sprint Y1-Q3
2. Design comment schema linked ke gxp-mapeditor change_entries


---

## FITUR 7.3: Scenario Comparison Tool (Group Context)

### Tujuan Pengembangan
**Side-by-side comparison** skenario yang dirancang untuk **group viewing** — peta sinkron, KPI table comparison, voting feature.

### Landasan TOR
> **§1.3c #2.b:** "*Interactive scenario comparison tools for group decision processes*"

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Scenario Comparison: 3 alternatives                                |
+--------------------------------------------------------------------+
|  +------------+ +------------+ +------------+                      |
|  | Path A     | | Path B     | | Path C     |                      |
|  | Green      | | Gray       | | Relocation |                      |
|  +------------+ +------------+ +------------+                      |
|  | [Map A]    | | [Map B]    | | [Map C]    |                      |
|  | (sync pan/ | | (sync)     | | (sync)     |                      |
|  | zoom)      | |            | |            |                      |
|  +------------+ +------------+ +------------+                      |
|  | KPIs       | | KPIs       | | KPIs       |                      |
|  | Pop: 142k  | | Pop: 89k   | | Pop: 24k   |                      |
|  | Cost: 380M | | Cost: 720M | | Cost: 1.2T |                      |
|  | BCR: 4.2   | | BCR: 2.8   | | BCR: 1.5   |                      |
|  +------------+ +------------+ +------------+                      |
|                                                                    |
|  Group Vote (only role with vote permission):                      |
|   Path A: ##########  60% (12/20)                                  |
|   Path B: #####       25% (5/20)                                   |
|   Path C: ###         15% (3/20)                                   |
|                                                                    |
|  [Cast my vote] [Request discussion] [Add new path]                |
+--------------------------------------------------------------------+
```

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Viz Extension)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** SEDANG

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-mbtiles | 19255 | Tile serving untuk multi-map view | API call ke GeoVertix |
| gxp-mcda | 19286 | Group voting aggregation | API call ke GeoVertix |
| gxp-areainfo | 19285 | KPI per scenario | API call ke GeoVertix |

#### Metode Integrasi
Frontend-heavy feature. Build multi-map comparison view:
1. Side-by-side maps dengan sync pan/zoom (MapLibre GL custom)
2. KPI table comparison
3. Group voting embedded (link ke Modul 5.7)
4. Discussion thread per scenario (link ke 7.2 annotation)

#### Yang Perlu DIBANGUN BARU/Extension
- **Multi-map sync component** (MapLibre GL custom) (~3 minggu)
- **KPI comparison table** generator (~2 minggu)
- **Voting embed** (link ke Modul 5.7) (~1 minggu)
- Frontend Scenario Comparison Tool (~3 minggu)

#### Action Items
1. Sprint Y2-Q2


---

---

# BAGIAN 8 — VISUALIZATION & REPORTING (4 Fitur)

TOR §1.2.2 #5 menyebut 3 output viz: Interactive Maps, Dashboards, Reports/Executive Summary.

## FITUR 8.1: Interactive Map (Advanced)

### Tujuan Pengembangan
Core viz primitive: **peta interaktif performant** dengan layer banyak, tetap responsif.

### Landasan TOR
> **§1.2.2 #5.a:** "*Interactive Maps: Interactive maps that allow users to explore and analyze geospatial data*"

### Deskripsi Fungsional & Fitur

| Fitur | Implementasi |
|-------|--------------|
| Multi-layer | Drag-drop layer panel, ordering, opacity |
| Layer types | Raster (COG via TiTiler), Vector (MVT via Tegola), 3D (terrain, buildings) |
| Symbology | Customizable: choropleth, graduated, categorical |
| Time-aware | Time slider untuk layer dengan dimensi waktu |
| Drawing tools | Polygon, line, point untuk AOI custom |
| Measurement | Distance, area, profile |
| Identify (click) | Pop-up dengan attribute values |
| Print/Export | PNG, PDF, GeoPDF, geo-package |
| Bookmark | Save view (extent + layers + symbology) |
| Sharing | Generate URL state |
| 3D | Terrain visualization, building 3D |
| AR/VR (opsional, lanjutan) | WebXR untuk site planning |

### Tech Stack
- **Frontend:** MapLibre GL JS (open-source dari Mapbox fork) atau OpenLayers
- **Vector tiles:** Tegola atau Tippecanoe + custom server
- **Raster tiles:** TiTiler (FastAPI-based COG tiler)
- **3D:** Cesium atau three.js + DEM
- **Style:** Mapbox GL style spec

### Performance Considerations
- Vector tiles dengan zoom-dependent simplification
- Raster: COG dengan multiple overviews
- Cache: Browser + CDN
- Lazy loading: hanya tile yang visible
- WebWorker untuk heavy computation

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Interactive Map                                       [User v]     |
+--------------------------------------------------------------------+
| +-------+ +--------------------------------------+                 |
| | Layer | | Map canvas                            |  +-------+     |
| | Panel | |                                       |  | Tools |     |
| |       | |   [Map]                               |  | -Pan  |     |
| | +base | |                                       |  | -Zoom |     |
| | +sat  | |                                       |  | -Draw |     |
| | +OSM  | |                                       |  | -Meas |     |
| |       | |                                       |  | -3D   |     |
| | data: | |                                       |  | -Time |     |
| | +Flood| |                                       |  +-------+     |
| | +Vuln | |                                       |                 |
| | +Pop  | |                                       |                 |
| |       | |                                       |                 |
| | [+/-] | |                                       |                 |
| | [reorder]                                                          |
| +-------+ +--------------------------------------+                 |
| +----------------------------------------------------------+       |
| | Time slider: [---o-------]  2024-05-12 14:23 [auto/play]  |       |
| +----------------------------------------------------------+       |
| Status bar: Lat -6.972, Lon 109.401, Zoom 12, Scale 1:38k          |
+--------------------------------------------------------------------+
```

### Integrasi dengan GeoVertix

**Status Integrasi:** Orchestrate (Multi-Plugin Composition via API GeoVertix)  
**Coverage dari GeoVertix:** 70%  
**Estimasi Effort Saving:** 70%  
**Prioritas:** KRITIS (foundation UX)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-bpnmap** | 19265 | BPN aerial basemap (Indonesian-specific) | Integrasi via API GeoVertix (basemap) |
| **gxp-mbtiles** | 19255 | Vector + raster tile serving untuk performance | Integrasi via API GeoVertix (tiles) |
| **gxp-3dtiles** | 19225 | 3D Tiles serving untuk terrain & buildings | Integrasi via API GeoVertix (3D mode) |
| gxp-areainfo | 19285 | Identify (click) summary | API call ke GeoVertix (UX feature) |
| gxp-geoprocess | 19215 | Measurement tools (distance, area) | Integrasi via API GeoVertix (toolbar) |
| GeoVertix Core | 17500 | Map state, layer management | Foundation |

#### Metode Integrasi
**Interactive Map = orchestration multi-plugin** + thin frontend layer:
1. **Frontend** MapLibre GL JS untuk rendering
2. **Layer sources**: gxp-mbtiles, gxp-bpnmap, gxp-3dtiles berdasarkan layer type
3. **Identify pada click**: API call ke GeoVertix gxp-areainfo
4. **Measurement tools**: API call ke GeoVertix gxp-geoprocess
5. **3D mode toggle**: gxp-3dtiles via Cesium JS
6. **Drawing tools**: integrated dengan gxp-mapeditor untuk save AOI
7. **Time-aware slider**: state management frontend, fetch time-aware tiles

#### Komponen yang Dimanfaatkan Langsung
- BPN basemap (gxp-bpnmap)
- MBTiles raster + MVT vector tiles (gxp-mbtiles)
- 3D Tiles streaming (gxp-3dtiles)
- AOI identify (gxp-areainfo)
- Distance/area measurement (gxp-geoprocess)
- Toolbar interactions (pan, select, draw, measure)

#### Yang Perlu DIBANGUN BARU/Extension
- **MapLibre GL frontend** dengan layer manager (~4 minggu)
- **Time-aware slider** component (~2 minggu)
- **Symbology editor** (~3 minggu)
- **Bookmark & URL state** (~1 minggu)
- **Print/Export** (PNG, PDF, GeoPDF) (~2 minggu)
- **3D mode toggle** (~2 minggu)

#### Action Items
1. Sprint Y1-Q2: foundation map setup
2. Coordinate dengan GeoVertix SPA development conventions


---

## FITUR 8.2: Dynamic Dashboards

### Tujuan Pengembangan
**Dashboard berisi banyak widget** (chart, KPI card, table, map) yang dapat di-customize per role.

### Landasan TOR
> **§1.2.2 #5.b:** "*Dashboards: Visual displays that present graphs, diagrams, and numerical results in a concise and informative manner*"

### Komponen Widget Library
- KPI card (number + trend)
- Time-series chart
- Bar/column chart
- Pie/donut
- Scatter plot
- Heatmap
- Map (embed)
- Table
- Sparkline
- Gauge
- Sankey
- Tree map

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Dashboard: BPBD Demak                              [Edit] [User v]|
+--------------------------------------------------------------------+
| +-----------+ +-----------+ +-----------+ +-----------+            |
| | Alerts    | | Pop @ risk| | Anggaran  | | Coverage  |            |
| | aktif: 3  | | 142,000   | | 12.4 M    | | 87%       |            |
| | [chart]   | | ^ +18%    | | of 14.2 M | | ^ +5%     |            |
| +-----------+ +-----------+ +-----------+ +-----------+            |
| +-----------------------------+ +----------------------------+     |
| | Mini map: hazard real-time   | | Trend banjir 5 tahun       |     |
| | [embedded map]               | | [line chart]               |     |
| +-----------------------------+ +----------------------------+     |
| +-----------------------------+ +----------------------------+     |
| | Top 5 kecamatan rentan       | | Forecast 7 hari            |     |
| | [table]                      | | [bar chart probability]    |     |
| +-----------------------------+ +----------------------------+     |
|                                                                    |
| [Edit dashboard] [Share] [Export PNG] [Schedule email]             |
+--------------------------------------------------------------------+
```

**Dashboard editor:** drag-drop layout, widget configuration, save as personal/shared template.

### Tech Stack
- Frontend: React + Recharts/Plotly + custom drag-drop (react-grid-layout)
- Backend: dashboard configuration stored as JSON

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Dashboards SDSS)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| (semua plugin SDSS) | various | Data source per widget | API call ke GeoVertix hub |

#### Metode Integrasi
Dashboards bukan domain GeoVertix existing. Build frontend-heavy:
1. **Widget library**: KPI card, line/bar/pie chart, Sankey, gauge, table, map embed
2. **Drag-drop layout**: react-grid-layout
3. **Data binding** per widget ke API call ke GeoVertix (caching)
4. **Schedule email snapshots**: cron job + PDF render

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Dashboards SDSS plugin** dengan schema sdss_dashboards.* (~3 minggu)
- **Widget library** (KPI/Chart/Map/Table/Sankey) (~6 minggu)
- **Drag-drop editor** dengan react-grid-layout (~3 minggu)
- **Schedule email job** (~2 minggu)
- **Per-role templates** (BPBD, Bappeda, Kementan, dst) (~3 minggu)
- Frontend dashboard editor (~4 minggu)

#### Action Items
1. Sprint Y1-Q3
2. Use Recharts/Plotly + react-grid-layout


---

## FITUR 8.3: Executive Summary Auto-Generation

### Tujuan Pengembangan
**Auto-generate dokumen ringkasan** (PDF/PPT) dari data analitik — mengurangi waktu staff untuk menyusun report manual.

### Landasan TOR
> **§1.2.2 #5.c:** "*Reports / Executive Summary: Reports generated from data analysis for various needs*"

### Deskripsi Fungsional
User pilih template, periode, area → sistem generate dokumen lengkap dengan:
- Cover page
- Executive summary (auto-narrative dari LLM)
- Key findings
- Maps (auto-rendered)
- Charts (auto-generated)
- Tables
- Recommendations (link ke 5.4 dan 5.6)
- Appendix
- References

### Template Library

| Template | Audience | Length |
|----------|----------|--------|
| Brief Executive | Pejabat tinggi | 2-3 halaman |
| Technical Report | Staff teknis | 20-50 halaman |
| Public Communication | Masyarakat | 4-8 halaman + infographic |
| NDC Progress Report | KLHK/UNFCCC | 40+ halaman |
| RDTR Annex | ATR/BPN | Variable |
| BPBD Briefing | BPBD | 5-10 halaman + tactical maps |
| Donor Report | Funder | Variable |

### Algoritma & Metode

**1. Template rendering**
- Markdown templates with placeholders
- Jinja2 untuk substitution

**2. Auto-narrative (LLM)**
- Feed structured data ke LLM dengan prompt "Tulis ringkasan eksekutif..."
- Validation untuk akurasi numerik
- Human review optional

**3. Map rendering server-side**
- Headless browser (Puppeteer/Playwright) → screenshot peta
- Atau MapBox Static Tiles API style server-side
- Output: PNG injected ke document

**4. Chart rendering**
- Plotly/Vega export server-side
- Or matplotlib server-side

**5. PDF/PPT generation**
- WeasyPrint untuk PDF dari HTML/Markdown
- python-pptx untuk PowerPoint
- LaTeX untuk academic-quality

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Generate Report                                    [User v]        |
+--------------------------------------------------------------------+
| Template: [Brief Executive v]                                      |
| Period: 2026-Q1 v                                                  |
| Area: Kab. Demak v                                                 |
| Focus: ☑ Flood ☑ SLR ☑ Adaptation status                          |
|                                                                    |
| Format: ◉ PDF  ○ PPTX  ○ DOCX  ○ HTML                             |
| Language: ◉ Bahasa Indonesia  ○ English  ○ Both                   |
|                                                                    |
| Customization:                                                     |
|   ☑ Auto-narrative (LLM-generated)                                 |
|   ☑ Auto-map (rendered for current scenarios)                      |
|   ☑ Auto-chart (live data)                                         |
|   ☐ Custom logo/letterhead [upload]                                |
|                                                                    |
| [Preview] [Generate]                                               |
|                                                                    |
| Last generated reports:                                            |
|   2026-04-15 Q1 Brief Executive.pdf                                |
|   2026-04-01 Public Communication v2.pdf                           |
|   [Download] [Regenerate]                                          |
+--------------------------------------------------------------------+
```

### Dependencies
**Library:** Jinja2, WeasyPrint, python-pptx, Plotly Kaleido (export), Puppeteer

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New + Heavy Leverage gxp-geoai  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | **Auto-narrative generation via LLM** (executive summary text) | Integrasi via API GeoVertix (heavy) |
| (Modul 5.x outputs) | - | Source content untuk report | API call ke GeoVertix |
| gxp-mcda | 19286 | Export PDF dengan charts (sudah punya export) | API call ke GeoVertix alternatif |

#### Metode Integrasi
1. **Template engine**: Jinja2 Markdown templates
2. **Auto-narrative**: API call ke GeoVertix gxp-geoai dengan structured prompt
3. **Map rendering server-side**: Puppeteer/Playwright headless
4. **Chart rendering**: Plotly Kaleido
5. **PDF generation**: WeasyPrint dari HTML
6. **PPTX**: python-pptx

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Report Generator SDSS plugin** atau modul di SDSS Application Core (~3 minggu)
- **Template library** (Brief, Technical, Public, NDC, RDTR, Donor) (~6 minggu, content work)
- **Auto-narrative prompts** (~3 minggu)
- **Server-side map snapshot** (Puppeteer) (~2 minggu)
- **PDF/PPTX generation pipeline** (~3 minggu)
- Frontend Report Generator UI (~2 minggu)

#### Action Items
1. Sprint Y2-Q1
2. Template content workshop dengan tim BIG


---

## FITUR 8.4: Custom Report Builder

### Tujuan Pengembangan
**Power-user mode** untuk staff teknis yang ingin custom report di luar template.

### Fitur
- Drag-drop blocks (text, chart, map, table, divider)
- Choose data source per block
- Filter & aggregation
- Save as template
- Schedule auto-generation (mis. tiap awal bulan email PDF)

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Extension dari 8.3)  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** SEDANG (power user feature)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| (Modul 8.3) | - | Template engine & rendering pipeline reuse | Direct extension |

#### Metode Integrasi
Custom Report Builder = power user version dari 8.3. Build on top:
1. Drag-drop blocks editor (text, chart, map, table, divider)
2. Data binding per block dengan filter/aggregation mini-query
3. Save as personal/shared template
4. Schedule auto-generation (cron)

#### Yang Perlu DIBANGUN BARU/Extension
- **Drag-drop blocks editor** (~4 minggu)
- **Data source binding UI** (~3 minggu)
- **Mini-query language** untuk filter/aggregation (~3 minggu)
- **Schedule cron** integration (~1 minggu)

#### Action Items
1. Sprint Y2-Q2 (setelah 8.3 stable)


---

---

# BAGIAN 9 — PLATFORM SERVICES (6 Fitur)

Fitur cross-cutting yang dipakai semua modul.

## FITUR 9.1: Authentication & Authorization (Multi-Tier)

### Tujuan Pengembangan
TOR menyebut 4 tier user (Government, Private, Public) dan compliance dengan **PP 71/2019 ESP** dan **PDP Law**. Service ini menangani identitas & permission.

### Landasan TOR
> **§1.2.3 #1.d:** "*Integration with national authentication systems for secure, federated access*"

> **§1.2.3 #3.b:** "*Role-based access control with principle of least privilege*"

> **§1.2.2 #8:** "*End users: Government, Private Sector, Public*"

### Deskripsi Fungsional

**Authentication options:**
- SSO integration: SIKD, OneSSO Indonesia, Google Workspace
- Username/password (with 2FA for sensitive tiers)
- API key for service-to-service

**Authorization model:**
- RBAC (Role-Based Access Control) primary
- ABAC (Attribute-Based) untuk context-aware (mis. spatial scope)
- Hierarchical roles: Govt > Provinsi > Kabupaten

**Tier definitions:**

| Tier | Identitas | Akses |
|------|-----------|-------|
| Government Full | SSO from K/L | Semua data, semua scenarios, full export |
| Government Provinsi | Provincial gov | Provinsi & kab di bawahnya |
| Government Kab/Kota | Kab gov | Kab nya + neighbors |
| Researcher | Akademisi terverifikasi | API + sandbox + most data |
| Private | Registered company | Standard data + limited |
| Public | Anonymous atau registered | Public-tier data only |

**Sub-tier untuk K/L spesifik:**
- BNPB: alert + emergency
- BMKG: climate dan weather
- KLHK: hutan, biodiv
- ATR/BPN: RDTR
- Kementan: pangan
- KKP: kelautan
- ESDM: energy
- Kemenparekraf: tourism

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Login                                                              |
+--------------------------------------------------------------------+
|                                                                    |
|              SDSS Climate Action Platform                          |
|                                                                    |
|  [Login dengan SIKD]                                               |
|  [Login dengan Google]                                             |
|  [Login dengan SSO K/L Anda]                                       |
|                                                                    |
|  ──── atau ────                                                   |
|                                                                    |
|  Email: [_________________]                                        |
|  Password: [_________________]                                     |
|                                                                    |
|  [Login]                                                           |
|                                                                    |
|  [Lupa password] [Daftar baru]                                     |
|                                                                    |
|  Tier akses Anda: berdasarkan email dan verifikasi                 |
+--------------------------------------------------------------------+
```

### Library
Keycloak (open-source), Spring Security, FastAPI Users, Casbin

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend GeoVertix Core Auth  
**Coverage dari GeoVertix:** 50%  
**Estimasi Effort Saving:** 50%  
**Prioritas:** KRITIS

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | **Existing user/roles/groups system** (geovertix.users, user_groups, user_roles, roles), capability-gated DB access | Direct extension |

#### Metode Integrasi
GeoVertix Core sudah punya RBAC foundation. Extend untuk SDSS:
1. **SSO integration**: tambah SIKD, OneSSO Indonesia adapter (existing Keycloak/similar?)
2. **Multi-tier definitions**: extend roles dengan SDSS tiers
3. **K/L sub-tier**: ABAC dengan attribute K/L
4. **ABAC spatial scope**: tambah scope filter per provinsi/kab
5. **2FA**: existing atau add via Keycloak

#### Yang Perlu DIBANGUN BARU/Extension
- **SSO adapter** untuk SIKD, OneSSO Indonesia (~3 minggu)
- **Multi-tier role definitions** (~2 minggu)
- **ABAC spatial scope** middleware (~2 minggu)
- **K/L sub-tier configurations** (~3 minggu)

#### Action Items
1. Konsultasi tim Pengembang GeoVertix untuk auth architecture
2. Sprint Y1-Q1


---

## FITUR 9.2: Notification & Alert System

### Tujuan Pengembangan
**Multi-channel notification** untuk alert, reminder, system events.

### Channels
- Email (SMTP)
- SMS (gateway lokal)
- Push notification (PWA, FCM)
- WhatsApp Business API
- Webhook (untuk integration)
- In-app toast

### Notification Types

| Type | Audience | Channel | Priority |
|------|----------|---------|----------|
| Emergency alert | All in area | All channels | CRITICAL |
| Daily forecast | Subscribed | Email/Push | LOW |
| Workflow reminder | Assignee | Email/Push | MEDIUM |
| Anomaly detected | Subscribed | Multi | HIGH |
| Data updated | Subscribed users | In-app | LOW |
| Comment mention | Mentioned user | Email/Push | MEDIUM |

### Implementation
- Event-driven: subscriptions per topic per user
- Throttling: don't spam
- Quiet hours: per user preference
- Localization: ID/EN

### Detail UI/UX (Subscription manager)

```
+--------------------------------------------------------------------+
| Notification Preferences                            [User v]       |
+--------------------------------------------------------------------+
| Email: budi@bpbd.demak.go.id                                       |
| Phone: +62 812-xxx (verified)                                      |
|                                                                    |
| Subscriptions:                                                     |
|                                                                    |
|  [x] Flood alert: Kab Demak (high+ severity)                       |
|       Channels: [x] Email [x] SMS [x] Push                         |
|                                                                    |
|  [x] Drought alert: Jawa Tengah (medium+)                          |
|       Channels: [x] Email                                          |
|                                                                    |
|  [x] Daily climate forecast                                        |
|       Channels: [x] Email (07:00 WIB)                              |
|                                                                    |
|  [ ] News & updates from SDSS team                                 |
|                                                                    |
| Quiet hours: 22:00 - 06:00 (except CRITICAL alerts)                |
| Language: Bahasa Indonesia v                                       |
|                                                                    |
| [Save] [Test notification]                                         |
+--------------------------------------------------------------------+
```

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Notification SDSS)  
**Coverage dari GeoVertix:** 15%  
**Estimasi Effort Saving:** 20%  
**Prioritas:** TINGGI (early warning critical)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-routing | 19270 | Routing logistics (untuk distribusi alert ke field) | API call ke GeoVertix (use case spesifik) |
| GeoVertix Core | 17500 | User contact info (email, phone) | Foundation |

#### Metode Integrasi
Notification multi-channel. Build:
1. **Email**: SMTP integration
2. **SMS**: Indonesia gateway provider (Telkomsel, Indosat aggregator)
3. **Push**: PWA via FCM
4. **WhatsApp**: WhatsApp Business API
5. **Webhook**: HTTP POST untuk integration
6. **In-app**: WebSocket toast

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Notification SDSS plugin** dengan schema sdss_notif.* (~3 minggu)
- **Channel adapters**: SMTP, SMS, FCM, WA, webhook (~4 minggu)
- **Subscription management** per topic per user (~3 minggu)
- **Throttling & deduplication** (~2 minggu)
- **Quiet hours** logic (~1 minggu)
- Frontend notification preferences (~2 minggu)

#### Action Items
1. Sprint Y1-Q3
2. Procure SMS gateway + WA Business API access


---

## FITUR 9.3: Audit & Compliance Logger

### Tujuan Pengembangan
**Immutable audit log** untuk compliance (PP 71/2019, SPBE, PDP Law). Setiap aksi material di-log dengan who, what, when, where (IP).

### Apa yang Di-log
- Login/logout
- Data access (which file/layer accessed)
- Data modification (create/update/delete records)
- Scenario creation/execution
- Approval actions
- Configuration changes
- Tool calls (MCP)
- API requests (sample)

### Log Properties
- Immutable (append-only)
- Tamper-evident (hash chain)
- Retention: minimum 5 tahun (compliance)
- Searchable
- Compliance reports auto-generated

### Implementation
- Storage: Elasticsearch + cold storage (S3 archive)
- Hash chain: each log entry references previous hash
- Periodic anchor: hash root to blockchain atau immutable receipt

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend Core + Reference Plugin Audit Pattern  
**Coverage dari GeoVertix:** 40%  
**Estimasi Effort Saving:** 45%  
**Prioritas:** TINGGI (compliance mandatory)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | Capability-gated DB (sudah audit-friendly) | Foundation |
| **gxp-pbb** | 19280 | **Audit table pattern** (gxp_pbb.audit, audit trail) | Reference pattern |
| gxp-mapeditor | 19275 | Changesets audit pattern | Reference |

#### Metode Integrasi
Adopt audit patterns dari plugin existing:
1. **Audit per modul**: setiap plugin SDSS punya audit table mirip gxp-pbb pattern
2. **Hash chain**: append-only dengan hash linking
3. **Periodic anchor** ke blockchain atau immutable receipt
4. **ELK storage** untuk searchability
5. **Cold archive** ke S3 untuk retention 5+yr
6. **Compliance reports** auto-generated (PP 71/2019, SPBE, PDP Law)

#### Yang Perlu DIBANGUN BARU/Extension
- **Audit logger library** standardized (~3 minggu)
- **Hash chain implementation** (~2 minggu)
- **ELK or Loki deployment** untuk audit search (~2 minggu)
- **Compliance report generator** (~3 minggu)
- Frontend Audit Console (~2 minggu)

#### Action Items
1. Sprint Y1-Q3
2. Reference gxp-pbb.audit schema


---

## FITUR 9.4: Multilingual Support (Bahasa Indonesia & English)

### Tujuan Pengembangan
TOR §1.3a.3.b: "*Multi-language support with Bahasa Indonesia as primary interface and English translations*"

### Implementation
- i18n framework: React-i18next atau formatJS
- Translation files: JSON per locale
- Locale auto-detection: browser, then user preference
- Switchable any time
- Right-to-left support: tidak perlu (ID/EN)
- Date/number format localization
- Content translation: UI strings + dynamic content (mis. report templates) memerlukan dual versions

### Sumber Konten
- UI strings: tim dev + UX writer (ID native, EN review)
- Documentation: dual-maintained
- LLM responses: prompt to respond in user's language

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Frontend Layer)  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | SPA framework, i18n support (kemungkinan sudah ada) | Foundation |

#### Metode Integrasi
Frontend-heavy. Build:
1. **i18n framework**: react-i18next
2. **Translation JSON** files per locale
3. **Locale auto-detection** + user override
4. **Date/Number/Currency** format per locale
5. **LLM responses** locale-aware (via gxp-geoai)

#### Yang Perlu DIBANGUN BARU/Extension
- **i18n integration** di SPA (~2 minggu)
- **Translation files** ID + EN comprehensive (~6 minggu, content work)
- **Locale-aware formatters** (~1 minggu)
- **Dynamic content translation** (template + LLM dual versions) (~3 minggu)

#### Action Items
1. Sprint Y1-Q2
2. Engage Indonesian UX writer untuk translation quality


---

## FITUR 9.5: Onboarding & Tutorial System (BARU)

### Tujuan Pengembangan
TOR §1.3c menyebut: "*To ensure ease of use across diverse groups, comprehensive guides and technical support are provided.*" Sistem onboarding krusial agar user baru cepat produktif.

### Fitur
- **Welcome tour**: interactive tour saat pertama login
- **Contextual help**: tooltips & "?" buttons per komponen
- **Tutorial library**: video + step-by-step
- **In-app demo data**: sandbox mode dengan dummy region
- **Glossary**: istilah teknis didefinisikan
- **Q&A bot**: chat LLM untuk how-to questions

### Tutorial Topics
- Basic navigation
- Map controls
- Layer management
- Scenario creation
- Each module's quick-start
- Workflow examples
- API getting started

### Detail UI/UX

```
First-time login overlay:

+--------------------------------------------------------------------+
| Welcome to SDSS Climate Action Platform!                          |
|                                                                    |
| Anda adalah user baru. Mari mulai tour singkat:                   |
|                                                                    |
| [Tampilan UI dengan highlight elemen pertama]                     |
|                                                                    |
| Step 1 of 8: This is the main map                                  |
|                                                                    |
| [Skip] [Next ->]                                                   |
|                                                                    |
| Atau pilih tutorial lainnya:                                       |
|   - How to run a scenario                                          |
|   - How to compare paths                                           |
|   - How to use natural language query                              |
|   - All tutorials                                                  |
+--------------------------------------------------------------------+
```

### Library
react-joyride, intro.js, atau custom

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New + Leverage gxp-geoai untuk Q&A Bot  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (adoption critical)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-geoai** | 19250 | LLM untuk Q&A bot tutorial responses | Integrasi via API GeoVertix |

#### Metode Integrasi
Onboarding adalah frontend + content. Use gxp-geoai untuk smart Q&A:
1. **Welcome tour**: react-joyride atau intro.js
2. **Contextual help**: tooltips per komponen
3. **Tutorial library**: video + step-by-step
4. **Q&A bot**: API call ke GeoVertix gxp-geoai dengan RAG knowledge base (Modul 6.6)
5. **Demo sandbox**: dummy region dengan synthesized data

#### Yang Perlu DIBANGUN BARU/Extension
- **react-joyride integration** untuk welcome tour (~2 minggu)
- **Tutorial content production**: video + text (~8 minggu, paralel content work)
- **Q&A bot frontend** (chat widget) (~2 minggu)
- **Demo sandbox** dengan synthetic data (~3 minggu)
- **Glossary** Indonesian + English (~3 minggu)

#### Action Items
1. Sprint Y1-Q4: framework setup
2. Continuous content development through Y2-Y3


---

## FITUR 9.6: API & Web Services (REST + OGC)

### Tujuan Pengembangan
TOR sangat eksplisit tentang **OGC services dan REST API**.

### Landasan TOR
> **§1.2.2 #6:** "*Restful API; Web Services (WMS/WFS/WCS); Data Streams*"

> **§1.3a.2.a:** "*standardized APIs supporting OGC services (WMS, WFS, WCS) and REST/GraphQL interfaces*"

### Endpoints Categories

**REST API:**
- /api/v1/auth/*
- /api/v1/climate/*
- /api/v1/lulc/*
- /api/v1/carbon/*
- /api/v1/biodiv/*
- /api/v1/slr/*
- /api/v1/flood-drought/*
- /api/v1/vulnerability/*
- /api/v1/scenarios/*
- /api/v1/recommendations/*
- /api/v1/notifications/*

**OGC Services:**
- /wms/ — Web Map Service (rendered tiles)
- /wmts/ — Web Map Tile Service
- /wfs/ — Web Feature Service (vector data)
- /wcs/ — Web Coverage Service (raster data)
- /sos/ — Sensor Observation Service (IoT real-time)
- /api/ogc/features/ — OGC API Features (modern)

**Streaming:**
- WebSocket untuk real-time
- Server-Sent Events untuk alerts
- Kafka topics untuk service-to-service

**Documentation:**
- OpenAPI 3.0 spec auto-generated
- Interactive docs: Swagger UI / Redoc
- Versioning: /v1, /v2, dst dengan deprecation policy

**Quality:**
- Rate limiting per tier
- Throttling
- Caching headers
- Pagination, filtering, sorting consistent

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend Core + gxp-agrest  
**Coverage dari GeoVertix:** 65%  
**Estimasi Effort Saving:** 60%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-agrest** | 19230 | **ArcGIS REST API compatibility** untuk legacy K/L | Integrasi via API GeoVertix |
| GeoVertix Core | 17500 | RESTful API existing, dispatcher routing | Foundation extension |

#### Metode Integrasi
GeoVertix sudah ada REST API. Extend dengan OGC services:
1. **OGC WMS/WMTS**: deploy MapServer atau GeoServer container, expose layers
2. **OGC WFS**: feature serving via existing PostGIS
3. **OGC WCS**: raster coverage serving
4. **OGC SOS**: sensor observation untuk IoT real-time
5. **OGC API Features**: modern REST-ful successor to WFS
6. **WebSocket**: untuk real-time updates
7. **Server-Sent Events**: untuk alerts
8. **Kafka topics**: untuk service-to-service

#### Yang Perlu DIBANGUN BARU/Extension
- **GeoServer/MapServer deployment** untuk OGC standards (~3 minggu)
- **OGC adapter layer** (~3 minggu)
- **OpenAPI 3.0 documentation** auto-gen (~2 minggu)
- **WebSocket server** (~2 minggu)
- **SSE endpoint** (~1 minggu)
- **Kafka deployment** (~2 minggu)
- **API gateway** (Kong atau Traefik) untuk rate limiting (~2 minggu)

#### Action Items
1. Sprint Y1-Q2
2. Deploy GeoServer di container


---

# BAGIAN 10 — DATA MANAGEMENT FEATURES (5 Fitur)

## FITUR 10.1: Data Catalog & Metadata (ISO 19115)

### Tujuan Pengembangan
TOR §1.3a.2.b: "*Adoption of ISO 19115 metadata standards aligned with Indonesia's One Data initiative*"

### Deskripsi Fungsional
**Catalog tunggal** semua dataset di platform — dari raw input hingga derived products.

### Metadata Schema (ISO 19115 selected fields)

| Element | Description |
|---------|-------------|
| Title | Nama dataset |
| Abstract | Deskripsi |
| Purpose | Tujuan |
| Topic category | Klasifikasi ISO 19115 (mis. environment, biota) |
| Keywords | Free-text + thesaurus controlled |
| Geographic extent | BBox + polygon |
| Temporal extent | Begin date, end date, update frequency |
| Spatial reference | CRS (mis. EPSG:4326, EPSG:23837 for UTM Indonesia) |
| Spatial resolution | Pixel size atau scale |
| Distribution | Format, online resources |
| Lineage | Process steps |
| Quality | Accuracy metrics |
| Constraints | Use limits, security, legal |
| Maintainer | Contact info |

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Data Catalog                                          [User v]     |
+--------------------------------------------------------------------+
| Search: [_____________________] [Search]                           |
|                                                                    |
| Filter:                                                            |
|   Topic: ☑ Climate ☑ LULC ☑ Hazard ☐ Biodiv ☐ ...                  |
|   Format: ☑ Raster ☑ Vector ☐ NetCDF ☐ JSON                        |
|   Temporal: After [2020] Before [____]                             |
|   Spatial: [draw AOI on map] OR [Jakarta v]                        |
|                                                                    |
| Results: 287 datasets                                              |
|                                                                    |
| ┌──────────────────────────────────────────────────────────────┐  |
| │ * Climate Projection Indonesia 1981-2100 (SSP scenarios)     │  |
| │   Maintainer: BIG-BMKG  Updated: 2026-04  Resolution: 5km    │  |
| │   Format: NetCDF, COG  Coverage: Indonesia  License: Open    │  |
| │   [Detail] [Preview map] [Download] [API]                    │  |
| └──────────────────────────────────────────────────────────────┘  |
| ┌──────────────────────────────────────────────────────────────┐  |
| │ * LULC Indonesia 2014-2024 Annual                            │  |
| │   Maintainer: BIG-KLHK  Updated: 2026-04  Resolution: 30m    │  |
| │   ...                                                         │  |
| └──────────────────────────────────────────────────────────────┘  |
+--------------------------------------------------------------------+
```

### Library
GeoNetwork (open-source catalog) atau pycsw

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend Core layers registry  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** TINGGI (FAIR compliance)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | **geovertix.layers registry** sudah ada (semua plugin write), layer metadata foundation | Direct extension |
| gxp-areainfo | 19285 | Spatial extent computation | API call ke GeoVertix |

#### Metode Integrasi
Layers registry sudah ada di GeoVertix. Extend dengan ISO 19115:
1. **Extend geovertix.layers schema** dengan ISO 19115 fields atau new gxp_catalog.* tables
2. **Catalog UI**: GeoNetwork-style search/filter
3. **Metadata harvest** otomatis dari plugin saat layer registration
4. **Satu Data Indonesia** sync (CKAN-compatible API)
5. **FAIR principles**: persistent identifiers, license info, citations

#### Yang Perlu DIBANGUN BARU/Extension
- **ISO 19115 metadata schema** extension (~3 minggu)
- **Catalog search/filter UI** (~4 minggu)
- **Auto-harvest pipeline** dari plugins (~3 minggu)
- **Satu Data Indonesia adapter** (~2 minggu)
- **FAIR compliance fields**: identifier, license, citation (~2 minggu)

#### Action Items
1. Sprint Y1-Q3
2. Koordinasi dengan tim Pengembang GeoVertix untuk extend geovertix.layers


---

## FITUR 10.2: Data Lineage Tracker

### Tujuan Pengembangan
TOR §1.3a.1.c: "*Real-time data synchronization with national data providers through standardized ETL pipelines*" dan §1.3a.2.d: "*Version control and lineage tracking for all datasets to ensure reproducibility of analyses*"

### Implementation
- Setiap dataset memiliki lineage graph
- Source -> ETL steps -> Derived products
- Tools: Marquez, Apache Atlas, atau custom dengan OpenLineage

### Use Case
"Dari mana data carbon kab Demak 2024?"
- Source: KLHK SIGN-SMART, BPS PDB, modul 2.2 LULC
- Process: IPCC Tier 2 formula, spatial allocation, validation
- Output: layer in catalog

### Detail UI/UX
Visualization lineage graph (DAG) per dataset.

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Data Lineage SDSS)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** SEDANG (reproducibility)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | Plugin call audit trail (kemungkinan ada) | Foundation |

#### Metode Integrasi
Lineage tracking memerlukan instrumentation di setiap plugin call. Build:
1. **OpenLineage integration** sebagai library
2. **Auto-emit lineage events** saat API call ke GeoVertix atau ETL step
3. **Lineage graph visualization** (DAG)
4. **Reproducibility metadata**: input version, params, output version

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Data Lineage SDSS plugin** dengan schema sdss_lineage.* (~3 minggu)
- **OpenLineage client library** (~3 minggu)
- **Plugin instrumentation** (modify dispatcher untuk emit events) (~3 minggu, koordinasi dengan tim GeoVertix)
- **Lineage graph UI** (~3 minggu)

#### Action Items
1. Sprint Y2-Q1
2. Koordinasi dengan tim GeoVertix untuk dispatcher modification


---

## FITUR 10.3: Data Quality Dashboard

### Tujuan Pengembangan
TOR §1.3a.2.a: "*Automated validation workflows applying ISO 19157 geographic data quality principles*"

### Quality Dimensions (ISO 19157)
- Completeness
- Positional accuracy
- Thematic accuracy
- Temporal quality
- Logical consistency

### Implementation
- Per dataset: quality check pipeline (Great Expectations)
- Score per dimension
- Trend over time
- Alert jika quality degrade

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Data Quality Dashboard                                             |
+--------------------------------------------------------------------+
| Filter: All datasets v                                             |
|                                                                    |
| Quality scorecard:                                                 |
|                                                                    |
|  Dataset                       Compl  PosAcc ThmAcc TmpQual Cons   |
|  ─────────────────────────────────────────────────────────────    |
|  Climate Proj v3.2             0.98   0.95   0.91   0.99    0.98  |
|  LULC 2024                     0.96   0.93   0.87   0.95    0.94  |
|  Carbon Inventory 2024         0.92   N/A    0.84   0.98    0.91  |
|  Flood Hazard v2               0.94   0.91   0.89   0.92    0.95  |
|                                                                    |
|  Issues detected (last 7 days): 3                                  |
|    - Carbon: 12% missing for new datasets (auto-imputed)           |
|    - LULC: 4 tiles missing recent acquisition (refresh queued)     |
|    - Climate: 1 station offline (BMKG)                             |
|                                                                    |
| [Drill-down per dataset] [Set quality SLA] [Alert config]          |
+--------------------------------------------------------------------+
```

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Data Quality SDSS)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** SEDANG

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| (any data-producing plugin) | various | Data outputs to check | Subject of monitoring |

#### Metode Integrasi
Build quality monitoring service:
1. **Great Expectations** pipeline per dataset
2. **ISO 19157 dimensions**: Completeness, Positional, Thematic, Temporal, Logical
3. **Quality score** tracking over time
4. **Alert on degradation**

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Data Quality SDSS plugin** dengan schema sdss_quality.* (~3 minggu)
- **Great Expectations integration** (~3 minggu)
- **ISO 19157 dimension formulas** (~2 minggu)
- **Quality dashboard** (~3 minggu)
- **Alert integration** dengan Modul 9.2 (~1 minggu)

#### Action Items
1. Sprint Y2-Q2


---

## FITUR 10.4: Real-Time Data Stream Processor

### Tujuan Pengembangan
TOR §1.2.3 #1.b: "*Event-driven architecture for real-time data processing from IoT and satellite sources*"

### Implementation
- Apache Kafka untuk message bus
- Kafka Streams / Apache Flink untuk stream processing
- Topics:
  - `iot.river-level` (per sensor)
  - `iot.rainfall` (BMKG real-time)
  - `satellite.fire.modis`
  - `satellite.sentinel1.processed`
  - dan banyak lagi

### Processing
- Windowing (tumbling, sliding)
- Aggregation
- Pattern detection
- Forward ke modul (mis. Anomaly Detection 6.2)

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Stream Infra)  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 10%  
**Prioritas:** TINGGI (real-time foundation)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| GeoVertix Core | 17500 | Plugin call event flow | Foundation |

#### Metode Integrasi
Real-time stream infrastructure. Build:
1. **Apache Kafka** deployment
2. **Kafka Streams** atau Apache Flink untuk processing
3. **Topics organization**: iot.*, satellite.*, alerts.*, lulc.*, dst
4. **Stream consumer** templates untuk modul SDSS

#### Yang Perlu DIBANGUN BARU/Extension
- **Kafka cluster** deployment (~2 minggu)
- **Kafka Streams library** wrappers (~3 minggu)
- **Topic schema registry** (Confluent Schema Registry) (~2 minggu)
- **Stream consumer templates** (~2 minggu)
- **Monitoring** (Kafka Manager, Grafana) (~1 minggu)

#### Action Items
1. Sprint Y1-Q2 (foundation)
2. Provision Kafka brokers (min 3 untuk HA)


---

## FITUR 10.5: Data Versioning

### Tujuan Pengembangan
Reproducibility: scenarios harus dapat di-rerun dengan exact data version.

### Implementation
- **DVC (Data Version Control)** atau **lakeFS** untuk dataset versioning
- Semantic versioning per dataset
- Snapshots: setiap update major → snapshot ke cold storage
- Time travel queries: "data per 2025-01-01"

### Use Case
- Hasil scenario 2025 menggunakan data versi v3.2 LULC
- Versi v4.0 LULC keluar dengan koreksi
- Bisa rerun scenario dengan v4.0 untuk update, atau tetap v3.2 untuk consistency historis



### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Data Versioning SDSS)  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** SEDANG

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mapeditor** | 19275 | Changesets pattern sebagai inspirasi versioning | Reference pattern |
| GeoVertix Core | 17500 | S3 storage untuk snapshots | Foundation |

#### Metode Integrasi
Adopt changeset pattern + extend untuk dataset versioning:
1. **DVC (Data Version Control)** atau **lakeFS** untuk dataset versioning
2. **Semantic versioning** per dataset (MAJOR.MINOR.PATCH)
3. **Snapshots** ke S3 cold storage periodic
4. **Time-travel queries** dengan API

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Data Versioning SDSS plugin** atau DVC/lakeFS integration (~4 minggu)
- **Snapshot scheduler** (~2 minggu)
- **Time-travel API** (~3 minggu)
- Frontend versioning console (~2 minggu)

#### Action Items
1. Sprint Y2-Q1
2. Decide DVC vs lakeFS


---

---

# Ringkasan Bagian 7-10

Total 20 fitur cross-cutting yang mendukung modul tematik:

| Bagian | Fitur | Compliance TOR |
|--------|-------|---------------|
| 7. Collaboration | Workflow, Annotation, Comparison, Approval | §1.3c #2 (a, b, c) |
| 8. Visualization | Map, Dashboard, Report Auto, Custom Report, 3D | §1.2.2 #5 (a, b, c) |
| 9. Platform | Auth, Notif, Audit, i18n, Onboard, API/OGC | §1.2.3 #1.d, #3, §1.2.2 #6, §1.3a.3.b |
| 10. Data Mgmt | Catalog, Lineage, Quality, Stream, Versioning | §1.3a.1, §1.3a.2 |
---

# BAGIAN 11 — HINDCASTING & MODEL VALIDATION TOOL (BARU)

TOR §2.1.4 sangat eksplisit menyebut **hindcasting** sebagai pendekatan validasi: "*Historical hindcasting will be employed to evaluate model performance against observed climate impacts over the past decades*". Tool ini berdiri sendiri sebagai fitur transparansi.

## FITUR 11.1: Historical Hindcasting Tool

### Tujuan Pengembangan
Tool **publik** (atau setidaknya researcher tier) untuk **mereproduksi prediksi model pada periode historis** dan **membandingkan dengan observasi nyata**. Ini meningkatkan **trust** dan memungkinkan **validasi independen**.

### Landasan TOR
> **§2.1.4:** "*Following verification, the model is validated by applying it to real-world scenarios in the field and comparing the results with historical data, international reputation journals, or established standards. Validation will also combine statistical validation methods with expert assessment from both climate scientists and local practitioners. **Historical hindcasting** will be employed to evaluate model performance against observed climate impacts over the past decades*"

### Deskripsi Fungsional

**Untuk semua modul predictive utama** (climate, flood, drought, carbon, LULC), tool ini memungkinkan:

1. **"Predict the past"**: jalankan model dengan input historis (mis. 1995-2010), pretend itu prediksi
2. **Compare dengan observasi**: 2010-2024 actual data
3. **Metrik akurasi**: RMSE, MAE, bias, korelasi
4. **Visualisasi**: scatter plot prediction vs observation, time-series, peta residual
5. **Report**: PDF report dengan tabel akurasi per region

### Use Cases
- Memvalidasi climate model: bandingkan downscaling untuk 2000-2024 dengan station BMKG actual
- Validasi flood model: rekonstruksi banjir Jakarta 2007, 2020, lihat akurasi
- Validasi yield prediction: 2010-2023 production data vs predicted
- Validasi carbon: vs inventarisasi GRK KLHK historis

### Algoritma & Metode

**Hindcast Setup:**
```
1. Identifikasi "training period" (mis. 1981-2010)
2. Identifikasi "hindcast/test period" (mis. 2011-2020)
3. Train model HANYA dengan training period
4. Apply model untuk hindcast period (predict)
5. Compare dengan observed actual data hindcast period
```

**Metrics:**
- RMSE, MAE, MAPE
- Bias (mean error)
- Korelasi Pearson, Spearman
- Skill score (vs climatology baseline)
- Probabilistic: Brier score, CRPS untuk forecast ensemble
- Spatial: pattern correlation, structural similarity

### Output
- Akurasi report per region per period
- Scatter plot predicted vs observed
- Time-series overlay
- Spatial residual map
- Confusion matrix (untuk categorical: e.g. drought class)

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Hindcasting & Model Validation Tool                    [User v]    |
+--------------------------------------------------------------------+
| Model: Flood hazard model v3.2 v                                   |
| Region: Jakarta v                                                  |
|                                                                    |
| Training period: 1990 - 2010                                       |
| Hindcast period: 2011 - 2023                                       |
| (events to compare: 8 major floods)                                |
|                                                                    |
| [Run Hindcast]                                                     |
|                                                                    |
| Result:                                                            |
|                                                                    |
| Accuracy Metrics:                                                  |
|   Pattern correlation (avg events): 0.78                           |
|   Affected area MAE: 18%                                           |
|   Peak depth MAE: 22 cm                                            |
|   Hit rate (50% threshold): 84%                                    |
|   False alarm rate: 12%                                            |
|   Skill score (vs climatology): +0.42                              |
|                                                                    |
| Event-by-event comparison:                                         |
|   Event           Date         Pred vs Obs    Score                |
|   ─────────────────────────────────────────────                    |
|   Jakarta flood 2007 Feb 2007   Good (0.82)   ⭐⭐⭐⭐                |
|   Jakarta flood 2013 Jan 2013   Fair (0.68)   ⭐⭐⭐                 |
|   Jakarta flood 2020 Jan 2020   Good (0.79)   ⭐⭐⭐⭐                |
|   ...                                                              |
|                                                                    |
| [Detail per event] [Generate validation report PDF]               |
|                                                                    |
| Time-series overlay:                                               |
|   [Chart: predicted blue, observed orange]                        |
|                                                                    |
| Spatial residual map:                                              |
|   [Map showing prediction error in space]                         |
+--------------------------------------------------------------------+
```

### Dependencies
**Internal:** All predictive modules  
**External:** BNPB historical damage records, BMKG station archive

### Akses Per Tier
- Government Full: full
- Researcher: full + custom hindcast setup
- Private: pre-computed validation reports
- Public: simplified validation summary (badge of accuracy per region)

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New + Leverage gxp-climate Anomaly  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (TOR §2.1.4 eksplisit minta)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-climate** | 19235 | **Anomaly vs baseline mechanism** — reference untuk hindcast computation | Pattern + API call ke GeoVertix |
| (semua predictive modules) | - | Target validation: Modul 2.x | API call ke GeoVertix |
| gxp-ml | 19240 | Re-train dengan train period subset | API call ke GeoVertix |

#### Metode Integrasi
Hindcasting = re-run model dengan train/test split temporal:
1. **Define train period** (e.g. 1990-2010) vs **hindcast period** (e.g. 2011-2023)
2. **Re-train model** hanya dengan train period (via API call ke GeoVertix gxp-ml)
3. **Apply ke hindcast period** dan compare dengan observed
4. **Metrics**: RMSE, MAE, MAPE, bias, correlation, skill score
5. **Event-by-event**: pre-defined major events (banjir Jakarta 2007, 2020, dll)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Hindcasting SDSS plugin** atau modul di SDSS Application Core (~3 minggu)
- **Train/test split logic** per model (~2 minggu)
- **Accuracy metrics library** (~2 minggu)
- **Event registry**: pre-defined Indonesia historical events (~2 minggu, content)
- **Validation report PDF** generator (~2 minggu)
- Frontend Hindcasting Tool (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **BNPB historical damage data** dibutuhkan untuk validation
- **BMKG station archive** untuk climate variables
- **Compute cost** re-train semua model

#### Action Items
1. Sprint Y1-Q4: pilot dengan flood model
2. Collect BNPB damage records 2000-2024


---

## FITUR 11.2: Continuous Model Performance Monitoring

### Tujuan Pengembangan
**Real-time tracking** model performance setelah deployment. Alert jika model drift.

### Implementation
- Per prediction: log prediction + later log actual (when available)
- Compute rolling accuracy metrics
- Alert when metrics degrade beyond threshold
- Trigger retraining (link ke MLflow + Modul 6.3)

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Model Performance Monitor                                          |
+--------------------------------------------------------------------+
| Model: Crop yield predictor v2.1                                   |
| Last 90 days:                                                      |
|                                                                    |
|   MAE: 0.42 ton/ha (target: 0.5)  Status: GOOD                     |
|   R^2: 0.78 (target: 0.7)         Status: GOOD                     |
|   Predictions made: 12,400                                         |
|   Validated against actual: 8,200                                  |
|                                                                    |
|   Trend last 30 days:                                              |
|   [Chart: rolling MAE — slight upward trend last 7 days]          |
|                                                                    |
|   WARNING: Detected data drift in input features (slope test)      |
|   Recommended action: Trigger retraining                           |
|                                                                    |
|   [Schedule retraining] [Investigate drift] [Acknowledge]          |
+--------------------------------------------------------------------+
```

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul Model Monitoring SDSS)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** SEDANG

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-ml | 19240 | Training trigger untuk auto-retraining | API call ke GeoVertix |

#### Metode Integrasi
Build monitoring service:
1. Log setiap prediction dengan timestamp + features
2. Log actual (ground truth) saat tersedia
3. Compute rolling accuracy metrics
4. Drift detection (KS test, Wasserstein)
5. Alert + auto-retraining trigger

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul Model Monitoring SDSS plugin** (~3 minggu)
- **Drift detection algorithm** (~2 minggu)
- **MLflow integration** untuk auto-retrain workflow (~2 minggu)
- Frontend Model Performance dashboard (~2 minggu)

#### Action Items
1. Sprint Y2-Q2
2. Link ke MLflow deployment dari Modul 6.3


---

# BAGIAN 12 — EDGE COMPUTING & MOBILE PWA (BARU)

TOR §2.1.5 menyebut: "*The platform design will employ a hybrid infrastructure approach, combining cloud services for scalability with edge computing capabilities for areas with limited connectivity*". Khususnya penting untuk 19 provinsi pilot — beberapa di Kalimantan, Sulawesi, Papua mungkin punya konektivitas terbatas.

## FITUR 12.1: Edge Computing Deployment

### Tujuan Pengembangan
Mendukung **operasi di lokasi dengan konektivitas terbatas** — mis. BPBD kabupaten, posko bencana, kantor desa.

### Landasan TOR
> **§2.1.5:** "*combining cloud services for scalability with edge computing capabilities for areas with limited connectivity, ensuring functionality across Indonesia's varied technological landscape*"

### Deskripsi Fungsional

**Edge Box** adalah perangkat kompak yang menyediakan:
- Local cache dataset esensial (sudah pre-loaded untuk region tertentu)
- Inference local untuk model AI (compressed/quantized)
- Local map server (offline tiles)
- Local database (SQLite/SpatiaLite)
- Sinkronisasi cerdas saat ada konektivitas

### Hardware Spec (Reference)
- Mini-PC atau Raspberry Pi 5 (8 GB RAM)
- 1-2 TB SSD
- Solar/battery backup
- Optional: GPU stick (Coral, Jetson Nano) untuk AI

### Software Stack
- Container-based (Docker, k3s lightweight)
- Modul SDSS portable subset
- PostgreSQL/SQLite untuk data lokal
- MapTiler/MBTiles untuk offline maps
- TensorFlow Lite / ONNX Runtime untuk inference

### Sync Strategy
- Periodic when online: pull updates, push collected data
- Differential sync (hanya delta)
- Conflict resolution: last-write-wins atau manual review
- Offline-first design

### Use Cases
- Desa di pedalaman Papua: cek peta risiko banjir tanpa internet
- Posko bencana: continue operations meski jaringan down
- Survei lapangan: input data offline, sync later
- Pelatihan field: training dengan dataset lokal

### Detail UI/UX

```
+--------------------------------------------------------------------+
| Edge Device Status (Local Admin)                                   |
+--------------------------------------------------------------------+
| Device: SDSS-EDGE-DEMAK-001                                        |
| Location: Kab Demak Bappeda                                        |
| Status: ONLINE (Wi-Fi 4G backup ready)                             |
|                                                                    |
| Storage:                                                           |
|   Total: 1 TB                                                      |
|   Used: 487 GB (49%)                                               |
|                                                                    |
| Cached datasets (Kab Demak focus):                                 |
|   * Climate projection: latest v3.2 (2.3 GB)                       |
|   * LULC: 2014-2024 (8.1 GB)                                       |
|   * Flood hazard models: all return periods (24 GB)                |
|   * Base maps: vector + raster tiles (180 GB)                      |
|   * Vulnerability: composite + per-dimension                       |
|   ...                                                              |
|                                                                    |
| Last sync: 2026-05-12 03:14 (cloud)                                |
| Pending uploads: 23 field observations, 2 scenario edits           |
|                                                                    |
| [Force sync now] [Update software] [View logs]                     |
+--------------------------------------------------------------------+
```

### Dependencies
**Library:** Docker, k3s, ONNX Runtime, TF Lite, MBTiles, SQLite

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Edge Stack) + Leverage gxp-mbtiles  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** SEDANG (Y2-Y3)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mbtiles** | 19255 | **MBTiles SQLite untuk offline tiles** — perfect untuk edge | Integrasi via API GeoVertix (centerpiece) |
| gxp-inference | 19210 | ONNX runtime portable (compress model untuk edge) | Integrasi via API GeoVertix (compressed) |

#### Metode Integrasi
Edge box adalah lightweight version dari SDSS:
1. **Hardware**: Mini-PC atau RPi5 + SSD 1-2 TB
2. **Container stack**: k3s lightweight Kubernetes
3. **Pre-load MBTiles per region** dari gxp-mbtiles
4. **Local AI inference**: ONNX models compressed (lihat 12.3)
5. **Local PostgreSQL/SQLite**
6. **Sync strategy**: differential, periodic when online

#### Yang Perlu DIBANGUN BARU/Extension
- **Edge box reference architecture** (~3 minggu)
- **k3s setup automation** (~2 minggu)
- **MBTiles pre-load pipeline** per region (~2 minggu)
- **Differential sync** logic (~4 minggu)
- **Offline-first frontend** PWA (~3 minggu, link ke 12.2)
- Operations manual + training (~3 minggu)

#### Pertimbangan Khusus & Risiko
- **Hardware procurement** + distribution logistics
- **Field training** untuk operator kab
- **Connectivity strategy**: kapan sync (jadwal vs opportunistic)

#### Action Items
1. Defer ke Y2-Q4 / Y3
2. Pilot 3 kabupaten remote


---

## FITUR 12.2: Mobile Progressive Web App (PWA)

### Tujuan Pengembangan
TOR §1.2.2 #7 menyebut: "*Web Mobile Interface: This interface also should be optimized for mobile devices, enabling users to access information in the field*"

### Deskripsi Fungsional
**Progressive Web App** (bukan native app) yang:
- Responsive design (works on phone, tablet, desktop)
- Service worker untuk offline support
- Add to Home Screen capability
- Push notifications
- Camera access (untuk citizen science upload)
- GPS access (auto-location)
- Background sync

### Fitur Mobile-Optimized
- Simplified dashboards
- Map dengan gesture-friendly controls
- Citizen science quick upload
- Alert notifications
- Survey & form (untuk field work)
- Voice query (LLM)
- Offline tile cache untuk region terdekat

### Detail UI/UX (Mobile)

```
[Mobile screen ~360x640]

+--------------------+
| SDSS         [≡]   |
+--------------------+
| Lokasi Anda:       |
| Kab Demak          |
|                    |
| Alert aktif: 0 ✓   |
| Bahaya hari ini:   |
|   - Hujan lebat    |
|   - Banjir: Low    |
|                    |
| Quick Action:      |
| [📷 Lapor]         |
| [🗺️ Peta]          |
| [⚠️ Bahaya]        |
| [💬 Tanya]         |
| [📊 Dashboard]     |
|                    |
| Updates:           |
| - Forecast 7-day   |
| - Drought index    |
|                    |
| [Profil] [Setting] |
+--------------------+
```

### Tech Stack
- React + service workers (Workbox)
- Web App Manifest
- IndexedDB untuk local store
- FCM untuk push

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Frontend PWA)  
**Coverage dari GeoVertix:** 25%  
**Estimasi Effort Saving:** 30%  
**Prioritas:** TINGGI (Y1 baseline mobile)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-mbtiles** | 19255 | **Offline-capable basemap** via MBTiles | Integrasi via API GeoVertix |
| gxp-areainfo | 19285 | AOI summary mobile-optimized | API call ke GeoVertix |

#### Metode Integrasi
PWA = Progressive Web App pakai service workers:
1. **React + service workers** (Workbox)
2. **Offline tile cache** dari gxp-mbtiles
3. **IndexedDB** untuk local data store
4. **Push notification** via FCM
5. **Camera + GPS** access via browser APIs
6. **Background sync** untuk upload queue

#### Yang Perlu DIBANGUN BARU/Extension
- **PWA shell** dengan service workers (~3 minggu)
- **Mobile-optimized UI** simplified (~5 minggu)
- **Offline cache strategy** (~3 minggu)
- **Push notification** integration (~2 minggu)
- **Citizen science upload** form (camera + GPS) (~3 minggu, paralel 2.4)
- **Background sync** queue (~2 minggu)
- **Voice query** integration Web Speech API (~1 minggu)

#### Action Items
1. Sprint Y1-Q3
2. Test di Android Chrome + iOS Safari


---

## FITUR 12.3: Model Compression for Edge

### Tujuan Pengembangan
TOR §1.3d #3.b: "*Model compression techniques for deployment on resource-constrained devices*"

### Techniques
- **Quantization**: float32 -> int8 (4x size reduction)
- **Pruning**: remove neurons low importance
- **Knowledge distillation**: small student model trained from large teacher
- **ONNX conversion**: portable format

### Use Case
- LULC classifier originally 240 MB -> compressed 28 MB, runs on Raspberry Pi
- Flood nowcast: ConvLSTM compressed untuk inference on Coral TPU

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-inference + gxp-ml Pipeline  
**Coverage dari GeoVertix:** 30%  
**Estimasi Effort Saving:** 35%  
**Prioritas:** SEDANG

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-inference** | 19210 | **ONNX Runtime** sudah ready untuk run compressed models | Integrasi via API GeoVertix |
| gxp-ml | 19240 | Container untuk run compression scripts (TF Lite converter, ONNX quantization) | API call ke GeoVertix + tambah scripts |

#### Metode Integrasi
Model compression untuk edge devices:
1. **Quantization scripts** di gxp-ml: float32 → int8 (4x size reduction)
2. **Pruning**: remove low-importance neurons
3. **Knowledge distillation**: train student model dari teacher
4. **ONNX optimization**: ORT graph optimization passes
5. **Deploy ke edge**: include di edge box stack (Modul 12.1)

#### Yang Perlu DIBANGUN BARU/Extension
- **Quantization pipeline** (ONNX Runtime quantization) (~2 minggu)
- **Pruning scripts** (TF/PyTorch) (~3 minggu)
- **Distillation training** template (~3 minggu)
- **Model benchmarking** tool (size, latency, accuracy) (~2 minggu)

#### Action Items
1. Sprint Y2-Q2
2. Benchmark setiap SDSS model untuk edge feasibility


---

# BAGIAN 13 — INTEGRATION FEATURES (Sistem Nasional) (5 Fitur)

TOR §1.2.3 #6 menyebut integrasi yang **harus didukung**: One Map, BNPB InaSAFE/InaRISK, BMKG, KLHK SIGN-SMART, BPS. Plus JIGN, BIG One Map Policy, dan sistem lain.

## FITUR 13.1: One Map Policy Integration (BIG)

### Tujuan Pengembangan
Konsistensi base mapping dengan **kebijakan Satu Peta** Indonesia.

### Landasan TOR
> **§1.2.3 #6.a:** "*One Map Policy geoportal for consistent base mapping*"

### Implementation
- Konsumsi base map BIG via WMS/WMTS official
- Sync RBI BIG sebagai reference layer
- Auto-update saat RBI ada revisi
- Coordinate system: BIG's national reference (DGN-95, atau SRGI 2013)
- Topological consistency check vs Satu Peta

### Detail UI/UX
Tidak terlihat user — running di backend layer. Tapi visible: "Base map source: BIG One Map" notice.

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New Integration Adapter  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** TINGGI

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-bpnmap | 19265 | Pattern untuk basemap proxy (referensi untuk One Map adapter) | Reference pattern |

#### Metode Integrasi
One Map Policy adalah integrasi base map BIG:
1. **WMS/WMTS adapter** untuk RBI BIG official
2. **Auto-sync** saat RBI revisi
3. **Coordinate system** SRGI 2013 (atau DGN-95) alignment
4. **Topological consistency check** vs Satu Peta

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul One Map Adapter SDSS adapter** plugin (~3 minggu)
- **WMS/WMTS consumer** (~2 minggu)
- **CRS transformation** SRGI 2013 alignment (~2 minggu)
- **Topology check** vs Satu Peta (~2 minggu)

#### Action Items
1. MoU BIG One Map team
2. Sprint Y1-Q3


---

## FITUR 13.2: BNPB InaRISK / InaSAFE Integration

### Tujuan Pengembangan
**Koordinasi disaster management** dengan sistem BNPB.

### Landasan TOR
> **§1.2.3 #6.b:** "*BNPB's InaSAFE and InaRISK for disaster management coordination*"

### Implementation
- **InaRISK API**: pull existing risk data, push complementary SDSS outputs
- **InaSAFE compatibility**: export SDSS hazard layers ke InaSAFE format (untuk impact analysis cocok)
- Alert routing: SDSS Anomaly Detection -> BNPB
- Bidirectional: BNPB damage data -> SDSS validation

### Touchpoint Endpoints
- GET /api/inarisk/hazards
- POST /api/inarisk/contribute (push SDSS data)
- Webhook: BNPB alerts -> SDSS

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul BNPB InaRISK Adapter SDSS)  
**Coverage dari GeoVertix:** 5%  
**Estimasi Effort Saving:** 10%  
**Prioritas:** KRITIS (BNPB coordination)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-pbb | 19280 | Pattern integration adapter (referensi) | Reference pattern |

#### Metode Integrasi
BNPB integration adapter:
1. **InaRISK API consumer** untuk fetch existing risk data
2. **InaSAFE format export** dari SDSS hazard layers
3. **Bi-directional alert routing**: SDSS anomaly → BNPB, BNPB damage → SDSS

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul BNPB InaRISK Adapter SDSS plugin** (~4 minggu)
- **InaRISK API client** (~2 minggu)
- **InaSAFE export format** converter (~2 minggu)
- **Webhook receiver** dari BNPB (~2 minggu)
- **Alert routing rules** (~2 minggu)

#### Action Items
1. MoU BNPB
2. Sprint Y1-Q3


---

## FITUR 13.3: BMKG Climate Service Integration

### Tujuan Pengembangan
**Integrasi data BMKG** yang merupakan otoritas iklim/cuaca nasional.

### Landasan TOR
> **§1.2.3 #6.c:** "*BMKG climate projection services*"

### Implementation
- Real-time observation stream (station, radar)
- Climate projection BMKG RegCM/WRF (sudah di Modul 2.1)
- Weather forecast 0-7 hari
- Seasonal forecast (ENSO, IOD)
- MoU level: data sharing agreement

### Touchpoint
- BMKG OpenAPI portal
- Direct data sharing (NetCDF on shared storage)
- Real-time via Kafka mirror

### Integrasi dengan GeoVertix

**Status Integrasi:** Extend gxp-climate  
**Coverage dari GeoVertix:** 35%  
**Estimasi Effort Saving:** 40%  
**Prioritas:** KRITIS (climate authority Indonesia)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| **gxp-climate** | 19235 | NetCDF/GRIB ingest sudah perfect untuk BMKG data | Direct extension |

#### Metode Integrasi
Extend gxp-climate dengan BMKG-specific adapters:
1. **BMKG OpenAPI consumer** (real-time observation)
2. **BMKG RegCM/WRF NetCDF** ingest pipeline
3. **Forecast 0-7 hari** consumer
4. **Seasonal forecast** (ENSO, IOD)
5. **Real-time stream** via Kafka (jika BMKG menyediakan feed)

#### Yang Perlu DIBANGUN BARU/Extension
- **BMKG API adapter** (~3 minggu)
- **Real-time stream consumer** (~3 minggu)
- **Forecast ingest scheduler** (~2 minggu)
- **MoU data sharing** (~ongoing coordination)

#### Action Items
1. **CRITICAL: Negotiate MoU BMKG awal** (data restricted)
2. Sprint Y1-Q3


---

## FITUR 13.4: KLHK SIGN-SMART Integration

### Tujuan Pengembangan
**Forest monitoring & emissions** — KLHK adalah otoritas hutan dan emissions.

### Landasan TOR
> **§1.2.3 #6.d:** "*Ministry of Environment and Forestry's SIGN-SMART and forest monitoring systems*"

### Implementation
- LULC cross-validation dengan SIGN-SMART
- Forest cover change push notifications dari SDSS
- Carbon inventory: harmonize with KLHK Inventarisasi GRK
- Fire integration: SIPONGI

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul KLHK Adapter SDSS)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** TINGGI (forest+emissions authority)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| gxp-pbb | 19280 | Pattern integration adapter | Reference |

#### Metode Integrasi
KLHK integration:
1. **SIGN-SMART API** consumer (forest monitoring)
2. **LULC cross-validation** (dengan Modul 2.2 output)
3. **Forest cover change push** notifications
4. **SIPONGI hotspot** integration (untuk Modul 4.4)
5. **Inventarisasi GRK harmonization** (Modul 2.3)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul KLHK Adapter SDSS plugin** (~4 minggu)
- **SIGN-SMART consumer** (~2 minggu)
- **SIPONGI integration** (~2 minggu)
- **GRK harmonization logic** (~3 minggu)
- **MoU data sharing**

#### Action Items
1. MoU KLHK
2. Sprint Y1-Q3


---

## FITUR 13.5: BPS Socio-economic Data Integration

### Tujuan Pengembangan
**Statistical data** dari BPS — populasi, ekonomi, sosial.

### Landasan TOR
> **§1.2.3 #6.e:** "*BPS socio-economic data services*"

### Implementation
- BPS API (datajakarta-style atau via Satu Data)
- SP2020 sensus data
- Susenas, Sakernas, dll
- PDB regional
- Auto-update annually atau saat data baru rilis

### Integrasi dengan GeoVertix

**Status Integrasi:** Build New (Modul BPS Adapter SDSS)  
**Coverage dari GeoVertix:** 10%  
**Estimasi Effort Saving:** 15%  
**Prioritas:** TINGGI (socio-economic data foundation)

#### Plugin GeoVertix yang Dimanfaatkan

| Plugin | Port | Kapabilitas yang Dipakai | Tipe Pemakaian |
|--------|------|---------------------------|----------------|
| (gxp-pbb pattern) | - | Adapter pattern | Reference |

#### Metode Integrasi
BPS data integration:
1. **BPS API** (Satu Data Indonesia compatible)
2. **SP2020 sensus** download + integration
3. **Susenas, Sakernas** survey data
4. **PDB regional** per provinsi & kab
5. **Gridded socio-economic** (jika tersedia)

#### Yang Perlu DIBANGUN BARU/Extension
- **Modul BPS Adapter SDSS plugin** (~3 minggu)
- **BPS API client** (~2 minggu)
- **Survey data normalization** (~2 minggu)
- **Update scheduler** (annual surveys) (~1 minggu)

#### Action Items
1. Sprint Y1-Q3
2. BPS API access (public mostly)


---

---

# BAGIAN 14 — RINGKASAN, MATRIKS FITUR vs TOR, ROADMAP FITUR

## 14.1 Matriks Lengkap Fitur

| # | Fitur | Kelompok | Tahun Pengembangan | Compliance TOR |
|---|-------|----------|---------------------|---------------|
| 2.1 | Advanced Climate Modeling | Advanced | Y1 | §1.3b.1.a |
| 2.2 | LULC Change Detection | Advanced | Y1 | §1.3b.1.b |
| 2.3 | Net Carbon Footprint | Advanced | Y1 | §1.3b.1.c |
| 2.4 | Biodiversity Mapping | Advanced | Y1-Y2 | §1.3b.1.d |
| 2.5 | SLR & Land Subsidence | Advanced | Y1 | §1.3b.1.e |
| 2.6 | Flood & Drought Modeling | Advanced | Y1 | §1.3b.1.f |
| 3.1 | Multi-Criteria Vulnerability | Vulnerability | Y1 | §1.3b.2.a |
| 3.2 | Dynamic Vulnerability SD | Vulnerability | Y2 | §1.3b.2.b |
| 4.1 | Spatial Planning RDTR | Specialized | Y1-Y3 | §1.3d, Annex 1 |
| 4.2 | Food Security Rice Field | Specialized | Y2 | §1.3b.3.a |
| 4.3 | Coastal Vulnerability | Specialized | Y1-Y2 | §1.3b.3.b |
| 4.4 | Forest Fire ENSO | Specialized | Y1 | §1.3b.3.c |
| 4.5 | Tourism Vulnerability | Specialized | Y2 | §1.3b.3.e |
| 4.6 | Renewable Energy Opt | Specialized | Y2 | §1.3b.3.d |
| 4.7 | Land Carrying Capacity | Specialized | Y2 | §1.3d carrying cap |
| 5.1 | Multi-Level Architecture | SDSS Core | Y1 | §1.3c #1 |
| 5.2 | Scenario Manager | SDSS Core | Y1 | §1.3c para 1 |
| 5.3 | Impact Analysis Engine | SDSS Core | Y1-Y2 | §1.3c para 1 |
| 5.4 | Custom Adaptation | SDSS Core | Y1-Y2 | §1.3c para 1 |
| 5.5 | MCDA Engine | SDSS Core | Y1 | §1.3c para 2 |
| 5.6 | Context-Aware Recommend (4 sub) | SDSS Core | Y2 | §1.3c #3 |
| 5.7 | Group Decision-Making | SDSS Core | Y2 | §1.3c para 4 |
| 5.8 | What-If Simulator | SDSS Core | Y1 | §1.3c para 2 |
| 5.9 | Sensitivity Analyzer | SDSS Core | Y2 | implicit |
| 5.10 | Optimization Solver | SDSS Core | Y2 | implicit |
| 6.1 | Image & Pattern Recognition | AI/ML | Y2 | §1.3d |
| 6.2 | Anomaly Detection & EWS | AI/ML | Y2 | §1.3d |
| 6.3 | Predictive Modeling FW | AI/ML | Y1 | §1.3d |
| 6.4 | Scenario-Based AI | AI/ML | Y2 | §1.3d |
| 6.5 | NLP LLM Conversational | AI/ML | Y2 | §1.3d, §1.2.2 #4 |
| 6.6 | RAG Pipeline | AI/ML | Y2 | §1.2.2 #4 |
| 6.7 | MCP Server | AI/ML | Y2 | §1.2.2 #3, #4 |
| 6.8 | Federated Learning | AI/ML | Y3 | §1.3d #3.d |
| 6.9 | Explainable AI | AI/ML | Y2 | §1.3d #2.a |
| 7.1 | Multi-Stakeholder Workflow | Collab | Y1-Y2 | §1.3c #2.a |
| 7.2 | Annotation System | Collab | Y1 | §1.3c #2.c |
| 7.3 | Scenario Comparison | Collab | Y2 | §1.3c #2.b |
| 8.1 | Interactive Map | Viz | Y1 | §1.2.2 #5.a |
| 8.2 | Dynamic Dashboards | Viz | Y1 | §1.2.2 #5.b |
| 8.3 | Auto Exec Summary | Viz | Y2 | §1.2.2 #5.c |
| 8.4 | Custom Report Builder | Viz | Y2 | implicit |
| 9.1 | Auth & Authz Multi-Tier | Platform | Y1 | §1.2.3 #1.d, #3.b |
| 9.2 | Notification System | Platform | Y1 | implicit |
| 9.3 | Audit Logger | Platform | Y1 | §1.2.3 #3 |
| 9.4 | i18n ID/EN | Platform | Y1 | §1.3a.3.b |
| 9.5 | Onboarding/Tutorial | Platform | Y1-Y2 | §1.3c para 1 |
| 9.6 | API & OGC Services | Platform | Y1 | §1.2.2 #6, §1.3a.2.a |
| 10.1 | Data Catalog ISO 19115 | Data Mgmt | Y1 | §1.3a.2.b |
| 10.2 | Data Lineage | Data Mgmt | Y1-Y2 | §1.3a.2.d |
| 10.3 | Data Quality Dashboard | Data Mgmt | Y2 | §1.3a.2.a |
| 10.4 | Stream Processor | Data Mgmt | Y1 | §1.2.3 #1.b |
| 10.5 | Data Versioning | Data Mgmt | Y2 | §1.3a.2.d |
| 11.1 | Hindcasting Tool | Validation | Y1-Y2 | §2.1.4 |
| 11.2 | Continuous Model Monitor | Validation | Y2 | §1.3d #3 |
| 12.1 | Edge Computing | Infra | Y2-Y3 | §2.1.5 |
| 12.2 | Mobile PWA | Infra | Y1 | §1.2.2 #7 |
| 12.3 | Model Compression | Infra | Y2 | §1.3d #3.b |
| 13.1 | One Map Integration | Integration | Y1 | §1.2.3 #6.a |
| 13.2 | InaRISK / InaSAFE | Integration | Y1 | §1.2.3 #6.b |
| 13.3 | BMKG Integration | Integration | Y1 | §1.2.3 #6.c |
| 13.4 | KLHK SIGN-SMART | Integration | Y1 | §1.2.3 #6.d |
| 13.5 | BPS Integration | Integration | Y1 | §1.2.3 #6.e |

**Total: 62 fitur dispesifikasi** *(v2.2: 3 fitur dihapus karena di luar ruang lingkup PRD v1.1 — lihat catatan revisi di atas).*

## 14.2 Roadmap Fitur Per Tahun

```
TAHUN 1 (2026): Foundation + 6 provinsi pilot
==============================================
Core Infrastructure:
  9.1 Auth, 9.2 Notif, 9.3 Audit, 9.4 i18n, 9.6 API
  10.1 Data Catalog, 10.4 Stream Processor
  8.1 Interactive Map, 8.2 Dashboards

Advanced Modeling (6):
  2.1 Climate, 2.2 LULC, 2.3 Carbon, 2.4 Biodiv (partial),
  2.5 SLR, 2.6 Flood-Drought

Vulnerability:
  3.1 Multi-Criteria Vulnerability

SDSS Core:
  5.1 Multi-Level Arch, 5.2 Scenario Mgr,
  5.3 Impact Engine (partial), 5.4 Adapt Library,
  5.5 MCDA, 5.8 What-If

AI Foundations:
  6.3 Predictive Framework

Integration:
  13.1 One Map, 13.2 InaRISK, 13.3 BMKG, 
  13.4 KLHK, 13.5 BPS

Other:
  7.1 Workflow, 7.2 Annotation
  12.2 Mobile PWA
  9.5 Onboarding (Y1 partial)
  11.1 Hindcasting (initial)

Specialized:
  4.4 Forest Fire (Y1 sebab ENSO 2025-26)

TAHUN 2 (2027): Refinement + 7 provinsi tambahan
==================================================
Vulnerability:
  3.2 Dynamic Vulnerability SD

Specialized (complete):
  4.1 RDTR Toolbox (full), 4.2 Food Security,
  4.3 Coastal Vuln, 4.5 Tourism, 4.6 Renewable,
  4.7 Carrying Capacity

SDSS Core (advanced):
  5.6 Context-Aware Recommend (4 sub), 5.7 Group DM,
  5.9 Sensitivity, 5.10 Optimization

AI Full Stack:
  6.1 Image Recognition, 6.2 Anomaly & EWS,
  6.4 Scenario AI, 6.5 LLM, 6.6 RAG, 6.7 MCP,
  6.9 XAI

Collaboration:
  7.3 Scenario Comparison

Visualization:
  8.3 Auto Exec Summary, 8.4 Custom Reports

Data Management:
  10.2 Lineage, 10.3 Quality, 10.5 Versioning

Infra:
  12.1 Edge Computing (initial deployment),
  12.3 Model Compression

Validation:
  11.2 Continuous Monitor

Integration:
  (semua integrasi K/L 13.1–13.5 selesai)

TAHUN 3 (2028): Scaling + 6 provinsi tambahan + Final
=======================================================
AI Advanced:
  6.8 Federated Learning

Infra Scale:
  12.1 Edge full rollout (19+ provinces)
  Performance optimization
  Full DR/HA

Polishing:
  All v1.x -> v2.x stable
  Documentation finalization
  Training materials
  
Sustainability:
  Handover protocol
  Capacity building
  Sustainability plan
```

## 14.3 Cross-Reference: Fitur Lama (v1) -> v2

| Item v1 | Status v2 |
|---------|-----------|
| Section 10 Modul Analitik (10.1-10.6) | -> 6 fitur penuh di Bagian 2 |
| Section 11 Vulnerability | -> 2 fitur (3.1, 3.2) di Bagian 3 |
| Section 12 Specialized (5 modul) | -> 7 fitur di Bagian 4 (tambah 4.6, 4.7) |
| Section 13 SDSS Engine | -> 10 sub-fitur di Bagian 5 |
| Section 14 AI Layer | -> 9 fitur di Bagian 6 |
| Section 15 Collaboration | -> 4 fitur di Bagian 7 |
| Section 16 Viz | -> 5 fitur di Bagian 8 |
| Section 17 User Mgmt | -> 9.1 di Bagian 9 |
| Section 18 Data | -> 5 fitur di Bagian 10 |
| Section 19 Notification | -> 9.2 |
| Section 20 Audit | -> 9.3 |
| (BARU) Multi-Level Arch | -> 5.1 |
| (BARU) Group Decision | -> 5.7 |
| (BARU) Context-Aware (4 sub) | -> 5.6 |
| (BARU) Image Recognition | -> 6.1 |
| (BARU) Anomaly Detection | -> 6.2 |
| (BARU) Federated Learning | -> 6.8 |
| (BARU) XAI Service | -> 6.9 |
| (BARU) Hindcasting Tool | -> 11.1 |
| (BARU) Edge Computing | -> 12.1 |
| (BARU) Onboarding | -> 9.5 |
| (BARU) Dynamic Vulnerability | -> 3.2 dielaborasi |
| (BARU) Carrying Capacity full | -> 4.7 dielaborasi |
| (BARU) LCZ extension | -> dalam 2.1 |
| (BARU) Citizen Science | -> dalam 2.4 |
| (BARU) Cross-module linking | -> dalam 2.2, 2.3, 2.4 |

## 14.4 Compliance Audit Final vs TOR

**Audit per requirement TOR:**

| TOR Requirement | Spec | Status |
|-----------------|------|--------|
| **§1.2.2 toolbox 6 advanced** | 2.1-2.6 lengkap | OK |
| §1.2.2 vulnerability framework | 3.1 + 3.2 | OK |
| §1.2.2 5 specialized | 4.1-4.5 + ekstra | OK |
| §1.2.2 MCP for toolbox | 6.7 dedicated | OK |
| §1.2.2 LLM integration | 6.5 + 6.6 + 6.7 | OK |
| §1.2.2 Visualization (map/dash/report) | 8.1-8.3 | OK |
| §1.2.2 API + OGC + Streams | 9.6 + 10.4 | OK |
| §1.2.2 Web + Mobile | 8.1 + 12.2 | OK |
| §1.2.2 User tiers | 9.1 | OK |
| §1.2.3 Cloud-native + K8s | Arsitektur | OK |
| §1.2.3 Event-driven | 10.4 | OK |
| §1.2.3 SPBE + OGC compliance | 9.6 | OK |
| §1.2.3 National auth | 9.1 | OK |
| §1.2.3 ISO 19115 metadata | 10.1 | OK |
| §1.2.3 500 concurrent users | NFR catatan | OK |
| §1.2.3 Sub-second response | NFR | OK |
| §1.2.3 AI phased | Roadmap | OK |
| §1.2.3 National sys integration (5) | 13.1-13.5 | OK |
| §1.3a database & GIS | Multiple | OK |
| §1.3a hot/warm/cold | Arsitektur | OK |
| §1.3a SDI compliance | 10.1 + integration | OK |
| §1.3a FAIR principles | 10.1, 10.5 | OK |
| §1.3a data cleaning & harmonization | 10.3 | OK |
| §1.3a versioning & lineage | 10.2, 10.5 | OK |
| §1.3a responsive design | 12.2 | OK |
| §1.3a multi-language ID primary | 9.4 | OK |
| §1.3b.1 6 modul advanced | 2.1-2.6 detail | OK |
| §1.3b.1.a.iii LCZ microclimate | dalam 2.1 | OK |
| §1.3b.1.b.iii Cross-module link | dalam 2.2 | OK |
| §1.3b.1.c.iii Carbon dashboard | dalam 2.3 | OK |
| §1.3b.1.d.iii Citizen Science | dalam 2.4 | OK |
| §1.3b.1.e.iii Coastal integrative | dalam 2.5 + 4.3 | OK |
| §1.3b.1.f.iii Risk mapping flood-drought | dalam 2.6 | OK |
| §1.3b.2.a Multi-criteria vuln | 3.1 | OK |
| §1.3b.2.b Dynamic vuln SD | 3.2 dedicated | OK |
| §1.3b.3 Specialized modules | 4.1-4.7 | OK |
| §1.3c #1 Multi-level arch | 5.1 dedicated | OK |
| §1.3c #2 Collaborative DM | 7.1-7.3 | OK |
| §1.3c #3 Context-Aware (4) | 5.6 dedicated 4 sub | OK |
| §1.3c group decision | 5.7 dedicated | OK |
| §1.3c expert knowledge integration | RAG + workflow | OK |
| §1.3c guides & tutorial | 9.5 | OK |
| §1.3d Predictive | 6.3 | OK |
| §1.3d Scenario-based | 6.4 | OK |
| §1.3d NLP | 6.5 | OK |
| §1.3d Image recognition | 6.1 | OK |
| §1.3d Anomaly detection | 6.2 | OK |
| §1.3d LCLUC | 2.2 + 6.1 | OK |
| §1.3d Carbon | 2.3 | OK |
| §1.3d Biodiv | 2.4 | OK |
| §1.3d SLR | 2.5 | OK |
| §1.3d Flood | 2.6 | OK |
| §1.3d Land Carrying Capacity + SHAP | 4.7 + 6.9 | OK |
| §1.3d Spatial Planning Support | 4.1 | OK |
| §1.3d Renewable Energy | 4.6 | OK |
| §1.3d #1 Phased + Transfer learn + Hybrid | Mentioned per modul | OK |
| §1.3d #2 XAI + Bias + HITL + AI Gov | 6.9 + framework | OK |
| §1.3d #3 Auto retrain + Compression + Ensemble + Federated | 6.3 + 6.8 + 12.3 | OK |
| §2.1.4 Hindcasting validation | 11.1 dedicated | OK |
| §2.1.5 Edge + Hybrid + Responsive | 12.1 + 12.2 | OK |
| §2.2 KPI & monitoring | Implicit di setup | OK |

**Total: 100% coverage** dari requirement TOR yang teridentifikasi.

## 14.5 Penutup

Katalog fitur SDSS v2 ini berisi **65+ fitur lengkap** yang mengaddress **setiap requirement spesifik** di TOR Annex 6. Setiap fitur dispesifikasi dengan:

1. Tujuan pengembangan yang jelas
2. Landasan TOR eksplisit (dengan kutipan/parafrase)
3. Deskripsi fungsional rinci
4. Input data dengan tabel sumber, format, frekuensi
5. Algoritma & metode (dengan persamaan jika perlu)
6. Output dengan format dan struktur
7. Detail UI/UX dengan ASCII mockup
8. Flow fitur input -> output
9. Dependencies internal dan eksternal
10. Karakteristik non-fungsional (performance, security)
11. Validasi & QA approach
12. Akses per tier user

Dokumen ini dapat dijadikan **single source of truth** untuk:
- Tim development saat sprint planning
- Stakeholder review per fitur
- User acceptance testing checklist
- Documentation user manual
- Training material reference

---

**Versi:** v2.0  
**Tanggal Revisi:** Mei 2026  
**Status:** Final untuk review  
**Maintainer:** Tim Konsultan SDSS Climate Action Platform  
**Format ASCII-only** untuk portabilitas dan PDF generation.
---

# BAGIAN 15 — STRATEGI INTEGRASI GEOVERTIX UNTUK SDSS

## 15.1 Ringkasan Strategis

SDSS Climate Action Platform 2026-2028 dibangun sebagai **aplikasi standalone** dengan strategi **integrasi selektif via API ke GeoVertix** untuk memanfaatkan plugin existing yang relevan. Tidak ada keharusan untuk menyatukan SDSS dengan GeoVertix — keputusan integrasi murni pragmatis untuk efektivitas pengembangan.

Setelah inventarisasi 17 plugin GeoVertix existing dan pemetaan ke 65 fitur SDSS, dapat disimpulkan bahwa **GeoVertix adalah sumber kapabilitas yang sangat reusable** untuk SDSS. Detail per-fitur sudah dijabarkan di setiap section "### Integrasi dengan GeoVertix" di Bagian 2-13.

### Statistik Kunci

| Indikator | Nilai |
|-----------|-------|
| Total plugin GeoVertix yang diinventarisasi | 17 |
| Plugin yang **dapat dimanfaatkan via API** untuk SDSS | **16 / 17 (94.1%)** |
| Plugin dengan reusability **SANGAT TINGGI** | 7 (gxp-climate, gxp-geoai, gxp-mcda, gxp-qgis, gxp-inference, gxp-ml, gxp-geoprocess) |
| Plugin dengan reusability **TINGGI** | 7 (gxp-3dtiles, gxp-areainfo, gxp-bpnmap, gxp-lidar, gxp-mapeditor, gxp-mbtiles, gxp-routing) |
| Plugin dengan reusability **SEDANG** | 2 (gxp-agrest, gxp-pbb) |
| Plugin dengan reusability **RENDAH** | 1 (gxp-profiles — domain geofisika) |
| Fitur SDSS yang dapat leverage GeoVertix (coverage >= 25%) | **46 / 65 (70.8%)** |
| Fitur SDSS dengan coverage TINGGI (>= 60%) | 12 / 65 |
| Rata-rata coverage GeoVertix untuk SDSS | 34.4% |
| **Estimasi total effort SDSS yang dapat dihemat** | **45-55%** |

## 15.2 Rekomendasi Arsitektur: **SDSS STANDALONE** dengan Integrasi GeoVertix Selektif

**SDSS dibangun sebagai aplikasi standalone** dengan deployment terpisah, frontend & backend sendiri, database sendiri (schema `sdss_*`), dan governance independen. GeoVertix dimanfaatkan **via API integration** untuk kapabilitas yang sudah ada di sana.

### Argumen Pendukung

1. **Otonomi penuh**: SDSS punya roadmap, release cycle, branding, governance sendiri di bawah BIG
2. **Effort saving 45-55%**: konsumsi 16/17 plugin GeoVertix existing menghemat separuh effort baseline GIS
3. **Pattern teruji**: kapabilitas GeoVertix (signing, RBAC, schema isolation) sudah robust di production
4. **Resilience**: SDSS bisa operate untuk fitur native bahkan jika GeoVertix down (degraded mode dengan caching)
5. **Future flexibility**: jika di Y3+ tidak lagi cocok, SDSS bisa swap implementation tanpa rewrite
6. **Independent scaling**: workload SDSS-heavy (climate modeling) di-scale di SDSS infra, tidak ganggu GeoVertix users

### Arsitektur Komponen SDSS

**SDSS dibangun terdiri dari modul-modul native** (bukan plugin GeoVertix). Berikut daftar modul SDSS yang akan dibangun:

| Modul SDSS Native | Untuk Fitur | Estimasi Effort | Status |
|-------------------|-------------|------------------|--------|
| **SDSS Application Core** (orchestrator) | 5.1 Multi-Level Architecture, integrasi semua modul | 8-10 minggu | Y1-Q1 |
| **Modul Vulnerability SDSS** (wrapper bridge ke gxp-mcda) | 3.1 Multi-Criteria Vulnerability | 3-4 minggu | Y1-Q2 |
| **Modul Dynamic Vulnerability SDSS** | 3.2 Dynamic Vulnerability SD | 10-12 minggu | Y2-Q1 |
| **Modul Carbon Footprint SDSS** | 2.3 Net Carbon Footprint | 12-14 minggu | Y1-Q3 |
| **Modul Biodiversity SDSS** | 2.4 Biodiversity Mapping | 14-16 minggu | Y2-Q1 |
| **Modul SLR & Subsidence SDSS** | 2.5 SLR & Subsidence | 14-16 minggu | Y1-Q4 |
| **Modul Flood & Drought SDSS** | 2.6 Flood & Drought | 16-18 minggu | Y1-Q3 |
| **Modul Food Security SDSS** | 4.2 Food Security | 10-12 minggu | Y2-Q1 |
| **Modul Renewable Energy SDSS** | 4.6 Renewable Energy | 10-12 minggu | Y2-Q2 |
| **Modul Context-Aware Recommendation SDSS** | 5.6 Context-Aware Rec | 12-14 minggu | Y2-Q1 |
| **Modul Group Decision-Making SDSS** | 5.7 Group DM | 14 minggu | Y2-Q2 |
| **Modul Scenario Manager SDSS** | 5.2 Scenario Manager | 12 minggu | Y1-Q3 |
| **Modul Adaptation Library SDSS** | 5.4 Custom Adaptation | 10 minggu | Y1-Q4 |
| **Modul Anomaly Detection SDSS** | 6.2 Anomaly Detection | 12 minggu | Y2-Q1 |
| **Modul Federated Learning SDSS** | 6.8 Federated Learning | 20 minggu | Y3 |
| **Modul Workflow Engine SDSS** | 7.1 Multi-Stakeholder Workflow | 14 minggu | Y1-Q4 |
| **Modul Dashboards SDSS** | 8.2 Dynamic Dashboards | 16 minggu | Y1-Q3 |
| **Modul Notification SDSS** | 9.2 Notification System | 12 minggu | Y1-Q3 |
| **Modul K/L Adapter SDSS** (8-10 adapter) | 13.x Integration K/L | 3-4 minggu × 8-10 | Y1-Y2 paralel |
| **GeoVertix Bridge Adapter** | Cross-cutting API integration | 4-6 minggu | Y1-Q1 |

### Arsitektur Integrasi (Detail)

```
SDSS Application (Standalone)
+-----------------------------------------------------------+
|                                                            |
|  Frontend SDSS (React + MapLibre GL JS + Cesium JS)        |
|  +-----------+ +-----------+ +-----------+ +-----------+   |
|  | Workspace | | Vulner.   | | Climate   | | RDTR      |   |
|  | Manager   | | Explorer  | | Modeling  | | Toolbox   |   |
|  +-----------+ +-----------+ +-----------+ +-----------+   |
|                                                            |
|  Backend SDSS (FastAPI/Express/Spring Boot)                |
|  +--------------------------------------------------+      |
|  | SDSS API Gateway (REST + GraphQL + WebSocket)    |      |
|  +--------------------------------------------------+      |
|  +--------------------------------------------------+      |
|  | Modul SDSS Native (50+ modul - lihat tabel di atas)|    |
|  +--------------------------------------------------+      |
|  +--------------------------------------------------+      |
|  | GeoVertix Bridge Adapter                          |      |
|  | (auth, retry, circuit breaker, cache, audit)      |      |
|  +-----------------+-----------------------+--------+      |
|                    |                                       |
|  Storage SDSS      v                                       |
|  +--------+ +----------+ +-------+                         |
|  | PG 17  | | Redis    | | S3    |                         |
|  | sdss_* | | (cache)  | |       |                         |
|  +--------+ +----------+ +-------+                         |
+-----------------------------------------------------------+
                    |
                    | (REST API over HTTPS)
                    | (service account JWT)
                    v
GeoVertix Application (Existing - dikonsumsi)
+--------------------------------+
| Dispatcher (port 17500)        |
| 17 plugin gxp-* terdeploy      |
| - gxp-mcda, gxp-climate, ...   |
+--------------------------------+
```

## 15.3 Action Items KRITIS

### A. Negosiasi Akses API GeoVertix (Pre-Sprint 0)

1. **🔴 KRITIS: Negosiasi service account & API access untuk SDSS**
   - Status: SDSS sebagai aplikasi eksternal perlu mekanisme akses API yang berbeda dari plugin internal
   - Action items:
     - Definisikan service account khusus untuk SDSS (terpisah dari user account)
     - JWT issuance dengan scope per plugin (mis. SDSS hanya boleh akses operasi compose, query, summarize — bukan admin)
     - Rate limiting per service account
     - SLA agreement (uptime, latency p95, support response time)

2. **🔴 KRITIS: Unblock gxp-mcda license**
   - Status saat ini: binary v0.1.0 deployed, signed, tapi JWT `limits.plugins` tidak include `mcda` → plugin tidak load
   - Impact: gate untuk Modul 3.1, 4.1, 4.3, 4.6, 4.7, 5.5, 5.9 — TUJUH fitur SDSS tergantung
   - Action: Eskalasi ke tim Pengembang GeoVertix untuk re-mint JWT include `mcda` feature + akses API untuk SDSS service account
   - Deadline: ASAP, sebelum Sprint 1

3. **🔴 KRITIS: Deploy real gxp-qgis (bukan fake-server mode)**
   - Status saat ini: staging menjalankan `fake-server.py` untuk testing
   - Impact: 344 QGIS algorithms krusial untuk banyak modul SDSS
   - Action: Deploy real QGIS 3.40 LTR container di GeoVertix production
   - Deadline: Sprint 0

4. **🔴 KRITIS: License JWT renewal cycle**
   - Status saat ini: license iat 2026-04-19, **exp 2026-07-16** (mendekati expiry)
   - Action: SDSS perlu monitoring expiry GeoVertix license + alerting agar tidak service disruption
   - Setup: integration ke SDSS monitoring dashboard

### B. Setup Awal (Sprint 0-1)

5. **GeoVertix Bridge Adapter** development
   - Modul native SDSS untuk handle: auth, retry/backoff, circuit breaker, response transformation, fallback
   - Dependency: spec API GeoVertix per plugin yang akan dipakai
   - Spike: build proof-of-concept dengan 1-2 plugin (mis. gxp-areainfo + gxp-mcda)

6. **MoU dengan K/L kunci** (banyak data restricted, akses langsung perlu agreement):
   - BMKG (climate data RegCM/WRF, radar real-time)
   - BIG InaCORS + Pushidrosal (GNSS + tide gauges untuk Modul 2.5)
   - KLHK (Inventarisasi GRK, SIPONGI, SIGN-SMART)
   - BPS (gridded socio-economic)
   - PLN (grid existing untuk 4.6)
   - Kementan (KATAM, AUTP)

7. **Provisioning infrastruktur SDSS standalone**
   - SDSS dedicated cluster (Kubernetes) — terpisah dari GeoVertix
   - PostgreSQL 17 dedicated untuk SDSS (schema `sdss_*`)
   - Redis cluster untuk caching
   - S3-compat storage untuk artifacts
   - GPU node untuk modul ML SDSS native (NVIDIA A100 atau setara)
   - Compute pool untuk Modul Flood (HEC-RAS), Modul SLR (InSAR)
   - Kafka cluster (3+ brokers untuk HA)
   - Vector store Qdrant untuk RAG (Modul 6.6)

## 15.4 Roadmap Pengembangan SDSS (Y1-Y3)

```
TAHUN 1 (2026): Foundation + 6 provinsi pilot
==============================================

Q1: Foundation Setup SDSS
  - Sprint 0: Negosiasi API GeoVertix, unblock gxp-mcda, deploy real gxp-qgis
  - SDSS Application Core (orchestrator) setup
  - GeoVertix Bridge Adapter (PoC + iterate)
  - Auth & RBAC SDSS standalone (Modul 9.1)
  - Map foundation SDSS (Modul 8.1)
  - Kafka cluster + Stream Processor (Modul 10.4)
  - i18n framework SDSS (Modul 9.4)

Q2: Core Modeling Setup
  - Modul 2.1 Climate (SDSS native + API ke gxp-climate)
  - Modul 2.2 LULC (SDSS native + API ke gxp-inference + gxp-ml)
  - Modul 5.5 MCDA (SDSS UI + API ke gxp-mcda direct)
  - Modul Scenario Manager SDSS (5.2)
  - Modul Vulnerability SDSS (3.1)
  - Modul Dashboards SDSS (8.2)
  - API & OGC SDSS native (Modul 9.6)

Q3: Hazard & Specialized
  - Modul SLR & Subsidence SDSS (2.5)
  - Modul Flood & Drought SDSS (2.6)
  - Modul Fire Risk (4.4, urgent for El Niño SON 2026)
  - RDTR Toolbox SDSS (4.1, orchestrate multi-plugin API)
  - Annotation System (7.2, extend pattern dari gxp-mapeditor)
  - Modul Notification SDSS (9.2)
  - Integration K/L: One Map, InaRISK, BMKG, KLHK, BPS

Q4: Advanced AI & Validation
  - Modul Carbon Footprint SDSS (2.3)
  - Impact Engine SDSS (5.3)
  - Modul Adaptation Library SDSS (5.4)
  - Predictive Framework (6.3, SDSS native + API ke gxp-ml)
  - Modul Hindcasting SDSS (11.1)
  - Modul Onboarding SDSS (9.5)

TAHUN 2 (2027): Refinement + 7 provinsi tambahan
==================================================

Q1: Specialized + AI Layer
  - Modul Biodiversity SDSS (2.4)
  - Modul Dynamic Vulnerability SDSS (3.2)
  - Modul Food Security SDSS (4.2)
  - Land Carrying Capacity (4.7, SDSS native + API ke gxp-ml + SHAP)
  - Image Recognition (6.1, SDSS UI + API ke gxp-inference)
  - Modul Anomaly Detection SDSS (6.2)
  - LLM NLQ (6.5, SDSS UI + API ke gxp-geoai)
  - Modul RAG Service SDSS (6.6, Qdrant + integrasi gxp-geoai)
  - Modul MCP Server SDSS (6.7, extend pattern dari gxp-geoai)
  - Modul XAI Service SDSS (6.9)

Q2: SDSS Advanced
  - Coastal Vulnerability (4.3, SDSS UI + API ke gxp-mcda)
  - Tourism Vulnerability (4.5)
  - Modul Renewable Energy SDSS (4.6)
  - Modul Context-Aware Recommendation SDSS (5.6)
  - Modul Group Decision-Making SDSS (5.7)
  - What-If Simulator (5.8)
  - Sensitivity Analyzer (5.9, SDSS UI + API ke gxp-mcda)
  - Modul Optimization Solver SDSS (5.10)
  - AI Scenario Explorer (6.4)
  - Auto Executive Summary (8.3, SDSS native + API ke gxp-geoai)
  - Data Mgmt complete (10.x)

Q3-Q4: Polishing + Integration
  - 7 provinsi tambahan onboard
  - Refinement + bug fix
  - Modul 12.x Edge & Mobile foundations

TAHUN 3 (2028): Scaling + Federated + Edge
============================================

Q1-Q2: Advanced Features
  - Modul Federated Learning SDSS (6.8)
  - Modul Edge Computing SDSS (12.1, full rollout)
  - 6 provinsi terakhir onboard

Q3-Q4: Sustainability
  - Performance optimization
  - Documentation finalization
  - Capacity building K/L & Pemda
  - Handover protocol BIG
```

## 15.5 Risk Register (12 Risk Utama)

| # | Risiko | Likelihood | Impact | Mitigasi |
|---|--------|------------|--------|----------|
| 1 | Tim GeoVertix tidak prioritaskan unblock gxp-mcda | MEDIUM | HIGH (7 fitur terhambat) | Eskalasi executive sponsor; alternatif: fallback minimal MCDA in-house di SDSS |
| 2 | Latency API GeoVertix dari SDSS (cross-app overhead) | MEDIUM | MEDIUM (UX delay) | Aggressive caching di SDSS Redis; batching request; pre-compute hasil idempotent; circuit breaker |
| 3 | GeoVertix API down/unavailable | MEDIUM | HIGH (banyak fitur SDSS impacted) | Circuit breaker pattern; cached responses; graceful degradation UI dengan "GeoVertix temporarily unavailable" banner; SLA agreement |
| 4 | License JWT expire (saat ini exp 2026-07-16) | HIGH | CRITICAL | Monitoring expiry di SDSS dashboard; auto-alert 30 hari sebelum expire; renewal workflow established |
| 5 | gxp-qgis fake-server jadi real QGIS lambat | MEDIUM | HIGH (banyak fitur SDSS gantung) | Sprint 0 priority; SDSS fallback: jalankan QGIS scripts di SDSS sendiri untuk kasus kritis |
| 6 | GeoVertix API contract breaking change | LOW | HIGH | Pinned version client; contract testing di CI SDSS; deprecation policy 6 bulan minimum |
| 7 | Koordinasi MoU K/L jadi bottleneck | HIGH | HIGH | Mulai negosiasi paralel awal; backup data alternatif (sumber publik); incremental rollout per K/L |
| 8 | Federated learning compliance issue (data K/L sensitif) | MEDIUM | HIGH | Privacy-by-default design; staged rollout; legal review per K/L |
| 9 | Edge box hardware tidak tersedia di kabupaten remote | MEDIUM | MEDIUM | Phase rollout; mobile PWA sebagai fallback; partner dengan vendor lokal |
| 10 | Coordination cross-team SDSS vs GeoVertix dev | MEDIUM | MEDIUM | Joint roadmap meeting bulanan; dedicated liaison PIC; shared issue tracker |
| 11 | Data sovereignty: data SDSS mengalir ke GeoVertix | LOW | MEDIUM | Hanya data minimal yang dikirim sebagai input compute; hasil disimpan di SDSS; data agreement formal |
| 12 | Cost API call (jika ada metering) | LOW | MEDIUM | Negosiasi flat-rate atau institutional license; monitoring API consumption di SDSS dashboard |

## 15.6 Penutup

Dokumen Katalog Fitur SDSS Detail v2 ini adalah **single source of truth** untuk pengembangan SDSS Climate Action Platform 2026-2028. Untuk setiap fitur dari 65 fitur utama:
- Spesifikasi fungsional & non-fungsional komprehensif (Bagian 2-13)
- **Strategi integrasi GeoVertix per fitur** dengan plugin spesifik, coverage, effort saving, dan pola integrasi (A/B/C/D/E)
- Prinsip arsitektur SDSS standalone (Bagian 1.4)
- Roadmap pengembangan per tahun (Bagian 14 + 15.4)
- Risk & mitigation (Bagian 15.5)

### Prinsip Inti yang Dipegang

1. **SDSS adalah aplikasi standalone**, bukan plugin di dalam GeoVertix
2. **Integrasi GeoVertix bersifat selektif via API** — bukan keharusan, tapi pragmatis untuk hindari duplikasi
3. **Modul SDSS native** dibangun untuk kapabilitas yang tidak ada di GeoVertix
4. **GeoVertix Bridge Adapter** menjadi single point of integration di sisi SDSS
5. **Fallback strategy** untuk resilience saat GeoVertix unavailable

Tim pengembangan SDSS dapat menggunakan dokumen ini sebagai:
- **Reference utama** saat sprint planning per fitur
- **Decision support** untuk reuse vs build-native
- **Coordination tool** dengan tim GeoVertix (untuk negosiasi API access, license, dll)
- **Stakeholder communication** untuk K/L dan Pemda

### Quick Reference: Top 7 Plugin GeoVertix Paling Berharga (via API)

1. **gxp-climate** — 60% match Modul 2.1, foundation untuk 6 fitur (API: ingest NetCDF, zonal, trend)
2. **gxp-geoai** — 80% match Modul 6.5-6.7, foundation AI/LLM (API: NL query, function calling)
3. **gxp-mcda** — 85% match Modul 5.5/5.9, dipakai 7 fitur (UNBLOCK LICENSE! API: compose, sensitivity)
4. **gxp-qgis** — 344 algoritma, dipakai 10+ fitur (DEPLOY REAL QGIS! API: run any algo by ID)
5. **gxp-inference** — ONNX runtime, foundation Modul 6.1 & 2.2 (API: infer with model)
6. **gxp-ml** — Python ML scripts, foundation Modul 6.3 & 4.7 (API: run script by ID)
7. **gxp-geoprocess** — Primitive yang dipakai SEMUA modul spasial (API: buffer, clip, intersect)

### Versi Dokumen

- **v1.0** (Mei 2026): Katalog fitur SDSS awal tanpa konteks GeoVertix
- **v2.0** (Mei 2026): Tambahan section "Integrasi dengan GeoVertix" per fitur
- **v2.1** (Mei 2026): Klarifikasi positioning — SDSS standalone dengan integrasi GeoVertix selektif (dokumen ini)

---

**Versi:** v2.1 (revisi positioning: SDSS standalone)
**Tanggal Revisi:** Mei 2026
**Status:** Final draft untuk review & development
**Maintainer:** Tim Konsultan SDSS Climate Action Platform
**Format:** Single Source of Truth untuk SDSS development 2026-2028
