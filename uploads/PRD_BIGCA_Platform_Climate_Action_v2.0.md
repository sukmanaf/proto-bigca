# PRODUCT REQUIREMENTS DOCUMENT (PRD)

## BIGCA — Platform Pemanfaatan Data Geospasial untuk Aksi Iklim

### Geospatial Data Utilization Platform for Climate Action

---

**Project Owner:** Direktorat Atlas dan Pemanfaatan Informasi Geospasial, Sekretariat Utama, Badan Informasi Geospasial (BIG)

**Project Period:** 2026 – 2028 (27 bulan)

**Funding Source:** IBRD Loan 9732-ID (Integrated Land Administration and Spatial Planning Project), Komponen 4 — Large Scale Base Maps for Climate Action

**Document Status:** Revised Baseline — Versi Pengembangan Final

**Document Version:** 2.0

**Document Date:** Mei 2026

**Replaces:** PRD v1.2 (Mei 2026) — *PRD v1.2 menjadi historical reference; semua konten v1.2 sudah dikonsolidasikan ke dalam v2.0 ini, dengan penambahan keputusan arsitektur plugin-based, spesifikasi UI/UX, strategi paralel development, dan katalog plugin.*

**Document Language:** Bahasa Indonesia (primer); istilah teknis dalam Bahasa Inggris dipertahankan sesuai konvensi industri. Terjemahan Bahasa Inggris akan diproduksi sebagai deliverable formal sesuai TOR §12.b.

---

## Single Source of Truth Bundle

PRD v2.0 ini adalah **dokumen induk** yang merangkum semua keputusan, spesifikasi, dan arah pengembangan BIGCA. Ia harus dibaca bersama dengan dokumen-dokumen pendamping berikut:

| Dokumen | Peran | Hubungan dengan PRD v2.0 |
|---------|-------|---------------------------|
| **PRD_BIGCA_Platform_Climate_Action_v2.0.md** (dokumen ini) | Authoritative requirements: what, why, how, who, when | Source of truth utama |
| **Katalog_Fitur_SDSS_Detail_v2.2.md** | 62 fitur dengan kedalaman per-fitur (algoritma, input/output, UI wireframe, integrasi GeoVertix) | PRD v2.0 mendefinisikan FR-* level; Katalog mendefinisikan detail per-fitur |
| **Rancangan_Halaman_Utama_Platform_v1.0.md** | UI/UX shell: navigasi, halaman utama, persona, design system | PRD v2.0 §19 mengonsolidasikan poin-poin kunci; Rancangan adalah rujukan detail |
| **GeoVertix_API_KnowledgeBase.md** | Inventaris API GeoVertix v1.0.0 (21 kategori, ~112 endpoint, 6 OGC, 16 plugin) | PRD v2.0 §17 dan §20 merujuk ke katalog ini saat mendefinisikan integrasi |
| **GeoVertix_SDSS_Reuse_Analysis_v3.xlsx** | Mapping fitur ↔ plugin/API GeoVertix (7 sheet) | Sumber data untuk §20 Plugin Catalog |
| **NEW-Plugin-Dev-Guideline.pdf** | Referensi pola plugin development (GeoVertix Rust pattern) | Inspirasi arsitektur plugin BIGCA — bukan adopsi literal, hanya pola |

---

## Document Control

| Item | Detail |
|------|--------|
| Document Title | PRD — BIGCA Platform Pemanfaatan Data Geospasial untuk Aksi Iklim |
| Source Reference | TOR Non-Construction Consulting Services, BIG, Tahun 2026–2028 |
| Commitment-Making Officer (PPK) | Roswidyatmoko Dwihatmojo (Deputi Bidang Informasi Geospasial Tematik) |
| Supervising Directorates | (a) Direktorat Atlas dan Pemanfaatan IG — Dheny Trie Wahyu Sampurno; (b) Direktorat Standar dan Teknologi IG — Abdurasyid (joint supervision khusus SDSS) |
| Project Implementation Unit (PIU) | Ade Komara Mulyana |
| Document Type | Product Requirements Document (PRD), traceable to TOR + Architecture Decision Record |
| Working Language | Bahasa Indonesia (primer), Bahasa Inggris (deliverable formal) |

---

## Changelog v1.2 → v2.0

Berikut perubahan substansial yang membedakan PRD v2.0 dari PRD v1.2:

### Major additions

1. **§10 — System Architecture & Plugin Model** (ditulis ulang sepenuhnya)
   - Plugin-based modular architecture sebagai foundational principle
   - Main App + Plugin Dispatcher + Plugin Marketplace pattern
   - Tech stack decisions made explicit (Frontend, Backend, Database, Infra)
   - GeoVertix integration di-formalize sebagai "external plugin source"

2. **§19 — UI/UX Requirements** (section baru)
   - 8 design principles
   - Information architecture dengan 10 modul navigasi
   - 5 persona dengan dashboard variants
   - Component library (atomic design)
   - Visual design system tokens
   - Performance budget
   - Konsolidasi dari Rancangan Halaman Utama v1.0

3. **§20 — Plugin Catalog** (section baru)
   - 62 fitur dipetakan ke ~35-45 plugin BIGCA + ~16 GeoVertix plugins reusable
   - Klasifikasi plugin: Native BIGCA, GeoVertix Reuse, Hybrid
   - Plugin manifest specification (plugin.json)
   - Per-plugin: scope, dependencies, capabilities, owner team

4. **§22 — Parallel Development Strategy** (section baru)
   - Team organization model (~6-10 squad)
   - Per-plugin development workflow (template → develop → test → integrate → sign)
   - Plugin dependency graph & integration milestones
   - CI/CD per plugin
   - Plugin registry & versioning

### Notable updates

5. **§7 Personas** — diperluas menjadi 5 persona dengan dashboard variant per-persona (dari 8 persona indicative di v1.2)
6. **§11 Functional Requirements** — FR-* dipertahankan, ditambah **FR-PLG-*** (Plugin Architecture Requirements) baru
7. **§12 NFR** — ditambah NFR-PLG-* untuk reliability/observability/isolation per plugin
8. **§28 Risks** — ditambah R-19..R-25 untuk risiko plugin-related (boundary, contract drift, signing bottleneck, dll.)
9. **§30 Acceptance Criteria** — ditambah Plugin Acceptance Criteria

### Carried forward (substantive content, kept verbatim or minor edit)

- §3 Background & Strategic Context (legal basis, strategic alignment, scientific rationale)
- §4 Vision, Goals, Objectives (TOR §2 & §3)
- §5 Success Metrics & KPIs (KPI-T01..T06, KPI-F01..F05, KPI-I01..I04)
- §8 Scope (in/out)
- §9 Geographical Rollout (18-19 provinsi, 3 cohort)
- §13 Data Requirements & Governance
- §14 Analytical Models & Thematic Toolboxes (10.4 advanced modeling)
- §15 SDSS Requirements (10.6, multi-level decision support)
- §16 AI/ML Requirements (LLM/RAG/MCP, federated learning, XAI)
- §17 Integration Requirements (One Map, InaRISK, BMKG, KLHK SIGN-SMART, BPS)
- §18 Security, Privacy, Compliance (PP 71/2019, PDP Law, SPBE)
- §21 Implementation Approach
- §23 Project Phases & Deliverables (D1-D21)
- §24 Personnel (5 Key + 7 Non-Key + 1 Supporting = 16 positions, 267 PM)
- §25 Stakeholder Engagement (9 events, FGD #1-5, Workshop #1-2)
- §26 QA Testing & Validation
- §27 Reporting (7 report types)
- §29 Assumptions & Dependencies
- §31 Glossary
- §32 Appendices

---

## DAFTAR ISI

1. [Executive Summary](#1-executive-summary)
2. [Background & Strategic Context](#2-background--strategic-context)
3. [Problem Statement & Opportunity](#3-problem-statement--opportunity)
4. [Vision, Goals, Objectives](#4-vision-goals-objectives)
5. [Success Metrics & KPI](#5-success-metrics--kpi)
6. [Users, Stakeholders, Personas](#6-users-stakeholders-personas)
7. [Scope](#7-scope)
8. [Geographical Rollout & Phasing](#8-geographical-rollout--phasing)
9. [Tech Stack & Foundation Decisions](#9-tech-stack--foundation-decisions)
10. [System Architecture & Plugin Model](#10-system-architecture--plugin-model)
11. [Functional Requirements](#11-functional-requirements)
12. [Non-Functional Requirements](#12-non-functional-requirements)
13. [Data Requirements & Governance](#13-data-requirements--governance)
14. [Analytical Models & Thematic Toolboxes](#14-analytical-models--thematic-toolboxes)
15. [SDSS Requirements](#15-sdss-requirements)
16. [AI/ML Requirements](#16-aiml-requirements)
17. [Integration Requirements](#17-integration-requirements)
18. [Security, Privacy, Compliance](#18-security-privacy-compliance)
19. [UI/UX Requirements](#19-uiux-requirements)
20. [Plugin Catalog](#20-plugin-catalog)
21. [Implementation Approach & Methodology](#21-implementation-approach--methodology)
22. [Parallel Development Strategy](#22-parallel-development-strategy)
23. [Project Phases, Milestones, Deliverables](#23-project-phases-milestones-deliverables)
24. [Personnel, Roles, Responsibilities](#24-personnel-roles-responsibilities)
25. [Stakeholder Engagement & Capacity Building](#25-stakeholder-engagement--capacity-building)
26. [QA, Testing, Validation](#26-qa-testing-validation)
27. [Reporting, Monitoring, Evaluation](#27-reporting-monitoring-evaluation)
28. [Risks & Mitigation](#28-risks--mitigation)
29. [Assumptions, Dependencies, Constraints](#29-assumptions-dependencies-constraints)
30. [Acceptance Criteria](#30-acceptance-criteria)
31. [Glossary & Acronyms](#31-glossary--acronyms)
32. [Appendices](#32-appendices)

---

# 1. Executive Summary

**BIGCA (BIG Climate Action Platform)** adalah platform pemanfaatan data geospasial berbasis WebGIS untuk aksi iklim Indonesia, dikembangkan selama 27 bulan (2026–2028) oleh Badan Informasi Geospasial (BIG) di bawah Komponen 4 ILASPP (IBRD Loan 9732-ID).

Platform ini mengintegrasikan **62 fitur** terorganisir dalam 13 kelompok fungsional untuk mendukung penilaian risiko iklim, perencanaan mitigasi-adaptasi, dan integrasi ke dalam Rencana Detail Tata Ruang (RDTR) di **18–19 provinsi prioritas** yang dijadwalkan dalam tiga cohort tahunan.

Inti platform adalah **Spatial Decision Support System (SDSS)** yang ditingkatkan dengan AI/ML, Large Language Models (LLM) berbasis Retrieval-Augmented Generation (RAG), dan Model Context Protocol (MCP) yang menjembatani containerized geospatial toolboxes dengan antarmuka conversational AI.

## Keputusan Arsitektur Utama (v2.0)

**BIGCA dirancang sebagai aplikasi standalone modular berbasis plugin architecture**, dengan tiga pilar:

1. **Main Application (Shell)** — kerangka utama yang berisi halaman utama, navigasi, autentikasi, dispatcher, dan integration adapter. Selalu di-deploy bersama platform.

2. **BIGCA Plugins** — fitur-fitur besar (modeling, SDSS, AI, viz, dll.) dipecah menjadi plugin terpisah yang dapat dikembangkan **paralel oleh tim berbeda**, di-deploy independen, dan di-update tanpa rebuild Main App.

3. **GeoVertix Plugin Reuse** — di mana GeoVertix sudah menyediakan plugin yang relevan (16 plugin reusable: gxp-mcda, gxp-climate, gxp-geoai, gxp-qgis, dll.), BIGCA **memanggil plugin tersebut via API contract** alih-alih membangun ulang. Estimasi penghematan effort 45–60% versus greenfield.

Pola plugin ini terinspirasi dari **GeoVertix Plugin Development Guideline** (process isolation, HTTP contract, manifest-driven, capability scoping, dispatcher pattern) namun **diadaptasi untuk tech stack BIGCA** (Python FastAPI + Node.js + React + Next.js + PostgreSQL/PostGIS, multi-language polyglot — bukan Rust monokultur).

## Strategic Outcomes

PRD v2.0 ini mendukung:

- **Indonesia NDC** di bawah Paris Agreement
- **LTS-LCCR 2050** (Long-Term Strategy for Low Carbon and Climate Resilience)
- **One Map Policy** (Perpres 9/2016 jo. Perpres 23/2021)
- **National Disaster Risk Reduction Plan** (selaras InaRISK/InaSAFE)
- **Climate-Resilient Development Policy** (Perpres 18/2020) sebagai Prioritas Nasional 6
- **SDG 13** (Climate Action)

## Acceptance Targets

- Platform Beta → V.1 → V.2 → V.3 → Full Version (5 milestone rilis)
- ≥ 500 concurrent users saat disaster events
- Sub-second response untuk common map operations
- ≥ 3 pilot case studies didokumentasikan dan tervalidasi
- OGC compliance 100%, ISO 19115 metadata 100%
- ≥ 50% aggregate effort savings via GeoVertix plugin reuse
- All 18–19 provinsi tertangani via analytical pipeline
- Integrasi RDTR untuk ketiga project location groups demonstrated

---

# 2. Background & Strategic Context

## 2.1 Legal & Regulatory Basis

Platform BIGCA mengacu pada hukum, peraturan, dan komitmen internasional Indonesia berikut (sebagaimana di-enumerasi TOR §1.a):

### Undang-Undang
- **UU No. 6/2023** tentang Penetapan Perppu No. 2/2022 tentang Cipta Kerja
- **UU No. 26/2007** tentang Penataan Ruang — penataan ruang wajib mempertimbangkan kondisi fisik, sumber daya alam, lingkungan, dan iptek (Pasal 3, 6); peta tata ruang harus memenuhi akurasi sesuai Peta Dasar (Pasal 14A ayat 3)
- **UU No. 4/2011** tentang Informasi Geospasial — IGT wajib mengacu pada IGD (Pasal 19), skala IGT mengikuti IGD (Pasal 20), BIG bertanggung jawab pembinaan, perencanaan, dan evaluasi IGT (Pasal 57), BIG dapat mengintegrasikan beberapa IGT menjadi IGT baru (Pasal 24 ayat 1 & 2)
- **UU No. 16/2016** tentang Pengesahan Paris Agreement to the UNFCCC
- **UU No. 24/2007** tentang Penanggulangan Bencana — integrasi risiko bencana ke perencanaan pembangunan, analisis risiko bencana, dan penegakan rencana tata ruang (Pasal 35); perencanaan penanggulangan bencana berbasis data risiko terkompilasi (Pasal 36 ayat 3)

### Peraturan Presiden
- **Perpres No. 23/2021** (mengubah Perpres No. 9/2016) tentang Percepatan Kebijakan Satu Peta skala 1:50.000 — mandat penyediaan peta dasar 1:5.000 untuk seluruh wilayah Indonesia dan pemutakhiran peta RBI 1:50.000 (target Desember 2024)
- **Perpres No. 98/2021** tentang Implementasi Nilai Ekonomi Karbon untuk pencapaian NDC dan Pengendalian Emisi GRK
- **Perpres No. 18/2020** tentang Kebijakan Pembangunan Berketahanan Iklim (Prioritas Nasional 6 dalam RPJMN 2020–2024)

### Peraturan Pemerintah
- **PP No. 21/2021** tentang Penyelenggaraan Penataan Ruang — penataan ruang mencakup persiapan, pengumpulan data, pengolahan & analisis, perumusan konsep, dan penyusunan regulasi (Pasal 7)
- **PP No. 45/2021** tentang Penyelenggaraan IG — IG wajib interoperable dan mendukung pengambilan keputusan (Pasal 62); BIG bertanggung jawab pembinaan (Pasal 118); pembinaan mencakup pengelola dan pengguna IGT (Pasal 118–120)

### Peraturan Kementerian/Lembaga
- **Permen ATR/BPN No. 11/2021** tentang Tata Cara Penyusunan, Peninjauan Kembali, Revisi, dan Penerbitan Persetujuan Substansi RTRW Provinsi/Kabupaten/Kota dan RDTR — analisis kondisi fisik (karakteristik umum, potensi bencana alam, potensi SDA, kemampuan lahan, kesesuaian lahan) sebagai analisis kunci
- **Perka BIG No. 16/2023** tentang Wali Data IGT
- **Perka BIG No. 18/2021** tentang Tata Cara Penyelenggaraan IG
- **Perka BIG No. 7/2023** tentang Organisasi dan Tata Kerja BIG
- **Permen LHK No. P.33/2016** tentang Pedoman Penyusunan Rencana Aksi Adaptasi Perubahan Iklim
- **Permen LHK No. P.7/2018** tentang Pedoman Kerentanan, Risiko, dan Dampak Perubahan Iklim

### Project Framework
- **Readiness Criteria 4th Revision** — Integrated Land Administration, Spatial Planning, and Provision of Large-Scale Base Map Project (Kementerian ATR/BPN)

## 2.2 Strategic Alignment

Platform BIGCA mendukung implementasi:

- **Indonesia NDC** di bawah Paris Agreement
- **Long-Term Strategy for Low Carbon and Climate Resilience 2050 (LTS-LCCR 2050)**
- **One Map Policy** (Perpres 9/2016 jo. Perpres 23/2021)
- **National Disaster Risk Reduction Plan** (selaras InaRISK dan InaSAFE BNPB)
- **Climate-Resilient Development Policy** (Perpres 18/2020) sebagai Prioritas Nasional 6 RPJMN 2020–2024
- **SDG 13 (Climate Action)** — memperkuat ketahanan dan kapasitas adaptif terhadap risiko terkait iklim

## 2.3 Scientific & Policy Rationale

Informasi geospasial adalah instrumen fundamental untuk memahami dinamika perubahan iklim. Riset IPCC dan UNEP (sebagaimana dikutip TOR §1.b) menetapkan:

- Data geospasial — termasuk peta perubahan suhu, pola curah hujan, dan penilaian risiko bencana — kritikal untuk memahami dinamika perubahan iklim
- Remote sensing instrumental untuk mengidentifikasi perubahan tutupan lahan yang berkontribusi pada peningkatan emisi karbon
- IG kritikal untuk melacak progres mitigasi dan adaptasi iklim lintas negara
- Analisis berbasis GIS mendukung identifikasi area rawan banjir, risiko kekeringan, ancaman erosi pesisir, dan prediksi dampak perubahan iklim masa depan

SDSS berbasis geospasial mengintegrasikan lapisan data geospasial, citra satelit, statistik demografi, infrastruktur, dan sumber daya lingkungan ke dalam platform berbasis lokasi untuk mendukung keputusan data-driven mengenai perencanaan zona evakuasi, adaptasi tata ruang, dan prioritas investasi green infrastructure.

## 2.4 Procurement Organization (TOR §4)

| Item | Detail |
|------|--------|
| Kementerian/Lembaga | **Badan Informasi Geospasial (BIG)** |
| Unit Kerja | **Sekretariat Utama** |
| Pejabat Pembuat Komitmen (PPK) | **Deputi Bidang Informasi Geospasial Tematik** — Roswidyatmoko Dwihatmojo |
| Direktorat Pelaksana (lead) | **Direktorat Atlas dan Pemanfaatan IG** — Dheny Trie Wahyu Sampurno |
| Direktorat Co-Pelaksana (SDSS only) | **Direktorat Standar dan Teknologi IG** — Abdurasyid |
| Project Implementation Unit (PIU) | Ade Komara Mulyana |

## 2.5 Source of Funding (TOR §5)

| Item | Detail |
|------|--------|
| Funding Instrument | **IBRD Loan 9732-ID** — Integrated Land Administration and Spatial Planning Project (ILASPP) |
| Funding Component | **Komponen 4 — Large Scale Base Maps for Climate Action** |
| Domestic Budget | **DIPA BIG (Daftar Isian Pelaksanaan Anggaran)** |
| Contract Signing Condition | Kontrak hanya boleh ditandatangani setelah anggaran tersedia di DIPA BIG (TOR §5.b) |

**Implikasi untuk Service Provider:** Tanggal efektif kontrak bergantung pada ketersediaan formal anggaran di DIPA BIG. Setiap pergeseran timeline akibat ketersediaan DIPA menjadi tanggung jawab Contracting Authority.

## 2.6 Coordination & Supervision Structure (TOR §7)

TOR §7 menetapkan **dual-track coordination model**:

| Track | Coordinator(s) | Scope |
|-------|----------------|-------|
| **Track A — General execution** | Direktorat Atlas dan Pemanfaatan IG (lead, single) | Semua tahap kerja: concept design, data preparation, analytical model development, validation, capacity building, reporting, dissemination |
| **Track B — SDSS development** | (i) Direktorat Atlas dan Pemanfaatan IG, **AND** (ii) Direktorat Standar dan Teknologi IG (joint) | Tahap kerja terkait pengembangan platform SDSS — arsitektur, infrastruktur, integrasi, AI/LLM/RAG/MCP, security, deployment, platform guidelines |

**Implikasi:** Service Provider wajib (i) report progress melalui lead Directorate untuk semua pekerjaan umum, dan (ii) tambahan engage kedua Directorate untuk SDSS-specific deliverables, technical reviews, dan acceptance steps. Stakeholder Engagement events yang melibatkan SDSS wajib mengundang kedua Directorate sebagai principal host.

---

# 3. Problem Statement & Opportunity

## 3.1 Problem Statement

Indonesia menghadapi risiko terkait iklim yang meningkat — kenaikan suhu, pergeseran pola curah hujan, intensifikasi cuaca ekstrem, kenaikan muka laut, dan amblesan tanah — yang mengancam ekosistem, mata pencaharian, dan stabilitas ekonomi. Tantangan ini diperkuat oleh:

1. **Informasi geospasial yang terfragmentasi** lintas K/L, Pemda, dan sektor swasta, membatasi penilaian risiko yang koheren
2. **Interoperabilitas terbatas** antara sistem iklim, bencana, dan tata ruang
3. **Kapasitas analitis tidak memadai** di tingkat sub-nasional untuk menerjemahkan ilmu iklim menjadi keputusan tata ruang yang actionable
4. **Tidak adanya platform decision-support terintegrasi** yang memadukan analitik geospasial, AI/ML, dan antarmuka conversational yang accessible bagi pengguna non-teknis
5. **Integrasi inkonsisten** pertimbangan iklim ke dalam RDTR

## 3.2 Opportunity

Platform BIGCA mengatasi gap ini dengan menyediakan SDSS terpadu berbasis AI yang:

- Mengintegrasikan IGD dan IGT di bawah kerangka aksi iklim tunggal
- Memungkinkan K/L, Pemda, sektor swasta, universitas, dan publik untuk menilai risiko iklim dan merancang langkah adaptasi/mitigasi
- Mendukung ATR/BPN dalam memasukkan analisis bencana iklim ke dalam Climate-Informed RDTR
- Membangun ekosistem pemanfaatan data geospasial selaras dengan JIGN
- Mempromosikan protokol berbagi data antara BIG, ATR/BPN, BMKG, BNPB, KLH, Kemenhut, swasta, dan institusi riset

---

# 4. Vision, Goals, Objectives

## 4.1 Vision (TOR §2.a)

Mengoptimalkan penggunaan data dan informasi geospasial dalam mendukung analisis, sintesis, perumusan, dan pengambilan keputusan terkait evaluasi risiko perubahan iklim, sehingga memungkinkan aksi mitigasi dan adaptasi yang efektif dan menyediakan akses mudah ke hasil analitis, informasi, dan rekomendasi bagi K/L, Pemda, sektor swasta, universitas, dan masyarakat umum.

## 4.2 Primary Objective (TOR §2.b)

Mengembangkan Platform yang memungkinkan pemerintah, sektor swasta, dan masyarakat untuk menilai risiko dan dampak perubahan iklim, mendukung strategi mitigasi dan adaptasi. Platform menyediakan tool dan output analitis yang menjadi informasi esensial untuk:

1. Mengidentifikasi kerentanan
2. Merencanakan aksi mitigasi dan adaptasi
3. Memonitor aksi iklim
4. Memberikan rekomendasi
5. Mengevaluasi efektivitas tindakan aksi iklim

Selain itu, Platform akan:

- Menjadi fondasi bagi ATR/BPN untuk melakukan analisis bencana iklim dalam pengembangan **Climate-Informed Spatial Plans**
- Memanfaatkan informasi geospasial dalam SDSS terintegrasi dengan teknologi AI dan ML
- Memastikan interoperabilitas dengan sistem nasional (BMKG Climate Early Warning and Projection Models, BIG One Map Portal, BNPB Ina-RISK)
- Mendukung minimal **3 pilot case studies** yang menunjukkan efektivitas dalam perencanaan ketahanan iklim
- Mengintegrasikan dataset geospasial kritikal yang selaras dengan kebijakan iklim nasional

## 4.3 Targets (TOR §3)

**Target T1 — Planning and Monitoring Documents.** Persiapan dokumen perencanaan dan monitoring untuk pemanfaatan IG bagi aksi iklim, termasuk panduan penggunaan data dan Platform itu sendiri.

**Target T2 — Platform Development.** Pengembangan platform pemanfaatan data geospasial yang ditingkatkan oleh SDSS dan model aksi iklim, memungkinkan keputusan berbasis data berbantuan AI/ML untuk mendukung perencanaan tata ruang yang climate-informed, monitoring, dan evaluasi aksi iklim.

**Target T3 — Effective Utilization and Dissemination.** Pemanfaatan efektif Platform dan model aksi iklim, memastikan diseminasi ke stakeholder kunci dan capacity-building untuk mempromosikan penggunaan teknologi untuk adaptasi dan mitigasi perubahan iklim.

---

# 5. Success Metrics & KPI

## 5.1 Technical KPIs

| KPI Code | KPI | Target / Definition | Source |
|----------|-----|---------------------|--------|
| KPI-T01 | Concurrent users supported | ≥ 500 concurrent users saat disaster events | TOR §Annex 6, 1.2.3 |
| KPI-T02 | Response time common map ops | Sub-second | TOR §Annex 6, 1.2.3 |
| KPI-T03 | OGC compliance | 100% layer geospasial via OGC services (WMS, WFS, WCS) | TOR §6.a, Annex 6 |
| KPI-T04 | Metadata compliance | 100% compliance ISO 19115 selaras One Data | TOR §Annex 6, 1.2.3 |
| KPI-T05 | System uptime | ≥ 99.5% (non-disaster); ≥ 99.9% (disaster window) | TOR §Annex 6, §2.2 |
| KPI-T06 | Data quality | Automated validation dengan quality thresholds + lineage tracking | TOR §Annex 6, 1.2.3 |
| KPI-T07 | Plugin contract test coverage **(v2.0)** | 100% integration touchpoint memiliki contract test passing di CI | Architecture Decision Record |

## 5.2 Functional / Coverage KPIs

| KPI Code | KPI | Target |
|----------|-----|--------|
| KPI-F01 | Pilot case studies | ≥ 3 pilot case studies didokumentasikan dan tervalidasi |
| KPI-F02 | Provinsi prioritas | 18 provinsi dalam 3 cohort tahunan (TOR §6.b); up to 19 per Annex 6 §1.1 |
| KPI-F03 | Thematic models | 6 advanced thematic models + integrated analytical processes |
| KPI-F04 | Platform versions | Beta → V.1 → V.2 → V.3 → Full Version per TOR Annex 1 |
| KPI-F05 | RDTR integration outputs | Climate risk evaluation outputs terintegrasi ke RDTR untuk 3 project location groups |
| KPI-F06 | Plugin delivery **(v2.0)** | All planned BIGCA plugins delivered sesuai roadmap Y1-Y3 |

## 5.3 Impact KPIs (co-defined dengan stakeholder)

| KPI Code | KPI | Indicative Definition |
|----------|-----|----------------------|
| KPI-I01 | Climate-informed RDTR documents supported | Jumlah RDTR yang diinformasikan oleh Platform outputs |
| KPI-I02 | Stakeholder reach | Jumlah K/L, Pemda, sektor swasta, universitas yang ter-onboarded |
| KPI-I03 | NDC reporting support | Volume dan kualitas output geospasial yang berkontribusi ke tracking NDC |
| KPI-I04 | LTS-LCCR 2050 alignment | Jumlah analisis mitigasi/adaptasi yang selaras LTS-LCCR 2050 |

## 5.4 Reuse Acceptance KPIs **(v2.0)**

| KPI Code | KPI | Target |
|----------|-----|--------|
| KPI-R01 | Aggregate reuse savings | ≥ 50% aggregate effort savings via GeoVertix plugin reuse |
| KPI-R02 | Pattern classification coverage | 62/62 fitur memiliki documented integration pattern (A/B/C/D/E per §17.4) |
| KPI-R03 | Fallback documentation | Setiap fitur pattern A–D memiliki documented fallback per FR-GVX-07 |
| KPI-R04 | Cross-plugin observability | FR-GVX-10 logging aktif dan visible di dashboards operasional |

---

# 6. Users, Stakeholders, Personas

## 6.1 End User Categories (TOR §Annex 6, 1.2.2)

Platform melayani tiga kategori end-user dengan role-based access:

1. **Government users (Full Features)** — K/L pusat (BIG, ATR/BPN, BMKG, BNPB, KLH, Kemenhut, BPS, BRIN, Bappenas, Kemendagri), Pemda Provinsi/Kabupaten/Kota, dan institusi sektor publik lain
2. **Private Sector users (Some Limitations)** — perusahaan teknologi, pengembang energi terbarukan, konsultan, NGO, institusi riset
3. **Public users (Limited)** — masyarakat umum, akademisi, mahasiswa, jurnalis

## 6.2 Key Stakeholders

| Stakeholder | Role |
|-------------|------|
| **BIG** | Owner; provider IGD, governor IGT, host Platform, capacity-building |
| **ATR/BPN** | Lead user untuk Climate-Informed RDTR |
| **BMKG** | Source data meteo/klimatologi dan proyeksi iklim; integration target |
| **BNPB** | Source data risiko bencana; integration target (InaRISK, InaSAFE) |
| **KLH & Kemenhut** | Source data tutupan lahan, hutan, emisi |
| **BPS** | Source data sosial-ekonomi |
| **BRIN** | Dukungan riset dan validasi |
| **Bappenas** | Strategic policy alignment (RPJMN, climate-resilient development) |
| **Kemendagri** | Data administratif dan koordinasi Pemda |
| **Pemda (Prov/Kab/Kota)** | Validasi data, update tata guna lahan lokal, integrasi observasi lapangan |
| **Sektor swasta** | Kontribusi data dan analisis (perusahaan teknologi, EBT, dll.) |
| **Institusi akademik/riset** | Peningkatan model analitis dan decision-support |
| **World Bank (IBRD)** | Funding authority (Loan 9732-ID), oversight |
| **Service Provider (Konsultan)** | Merancang, membangun, memvalidasi, dan mendiseminasikan Platform |

## 6.3 Personas Detail

Lima persona berikut dikonsolidasikan dari TOR §6.3 dan Rancangan Halaman Utama §3, ditambah detail UX-relevant. Mereka menjadi landasan untuk semua keputusan persona-aware di Platform.

### Persona P1 — Government Decision Maker (Executive)

**Profil:**
- Posisi: Eselon I/II di K/L (BIG, Bappenas, BNPB, KLHK, dll.); Gubernur/Bupati/Kepala Bappeda di Pemda
- Usia: 45–60 tahun
- Latar belakang: kebijakan publik, ekonomi; **tidak technical GIS**
- Konteks: di kantor, beberapa kali/minggu; sering di tablet/laptop saat rapat
- Waktu: 5–15 menit per sesi

**Kebutuhan utama:**
- Ringkasan eksekutif sangat singkat ("apa yang penting hari ini?")
- Indikator KPI level provinsi/nasional
- Bandingkan skenario kebijakan
- Briefing format untuk rapat (export PDF/PPT)
- Bahasa Indonesia 100%

**Fitur yang sering diakses:** FITUR 8.3 (Executive Summary Auto-Gen), 8.4 (Custom Report Builder), 5.3 (Impact Analysis Engine), 6.5 (NLP Query), 8.2 (Dynamic Dashboards)

**Dashboard varian:** 1 KPI banner besar + 1 chart trend + 1 map ringkas. Quick Actions: "Lihat Briefing Hari Ini", "Bandingkan Skenario", "Lihat Trend".

### Persona P2 — Government Planner (Operational)

**Profil:**
- Posisi: Eselon III/IV, Perencana Madya/Muda; staf Bappeda; tim RDTR di Pemda
- Usia: 30–50 tahun
- Latar belakang: planologi, geografi, sipil; **familiar GIS dasar** (ArcGIS/QGIS)
- Konteks: di kantor, **harian**, sebagai bagian alur kerja
- Waktu: 1–4 jam per sesi

**Kebutuhan utama:**
- Tool lengkap analisis (vulnerability, scenario builder, MCDA)
- Data dapat di-export (Shapefile, GeoTIFF, Excel)
- Riwayat analisis dan versi
- Kolaborasi dengan rekan (komentar, sharing)
- Integrasi output RDTR (FR-RDTR)

**Fitur yang sering diakses:** FITUR 5.2 (Scenario Manager), 3.1 (MCDA Vulnerability), 4.1 (RDTR Toolbox), 8.1 (Interactive Map Advanced), 7.1 (Stakeholder Consultation), 10.1 (Data Catalog)

**Dashboard varian:** KPI cards 4-in-row, Map besar, Activity Feed lengkap. Quick Actions: "Lanjut Skenario Terakhir", "Buat Vulnerability Map", "Cari Layer".

### Persona P3 — Researcher / Academic

**Profil:**
- Posisi: Dosen/Peneliti universitas (BRIN, ITB, UGM, IPB, dll.); konsultan iklim
- Usia: 30–60 tahun
- Latar belakang: PhD/Master iklim, geosains, ekologi; **highly technical**
- Konteks: kantor/lab/lapangan, project-based
- Waktu: bisa berjam-jam dalam satu sesi

**Kebutuhan utama:**
- Akses data raw (download), bukan hanya visualisasi
- API untuk programmatic access (Python/R)
- Hindcasting & validation untuk paper akademik
- Sensitivity & uncertainty analysis
- Reproducibility (data lineage)
- Bilingual (kolaborasi dengan peneliti asing)

**Fitur yang sering diakses:** FITUR 11.1 (Hindcasting), 5.9 (Sensitivity Analyzer), 11.2 (Model Monitor), 10.2 (Data Lineage), 9.6 (API & OGC), 2.x (Advanced Modeling), 6.9 (XAI)

**Dashboard varian:** Ringkas; KPI berbasis project. Quick Actions: "Lanjut Project", "Hindcast Baru", "Download Dataset", "API Docs".

### Persona P4 — Private Sector User

**Profil:**
- Posisi: Analis di konsultan engineering/insurance/agribisnis/property
- Usia: 25–45 tahun
- Latar belakang: engineering/finance/business; varied GIS skill
- Konteks: project-based dengan kebutuhan spesifik
- Waktu: project-driven, berhari-hari per project

**Kebutuhan utama:**
- Akses terbatas (TOR §6.a "Some Limitations")
- Subset data publik + paid premium tier
- Tool spesifik: site selection, risk score
- Export untuk laporan klien (PDF, GeoTIFF)
- Compliance UU PDP

**Fitur yang sering diakses:** FITUR 4.6 (Renewable Energy Opt), 4.5 (Tourism Vulnerability), 3.1 (MCDA subset), 8.4 (Custom Report Builder), 8.2 (Dashboards custom)

**Fitur TIDAK BISA diakses:** FITUR 7.1 (Stakeholder Consultation gov-only), 9.3 (Audit Logger), sebagian besar INT-01..06

**Dashboard varian:** Berorientasi "Project". Quick Actions: "Project Baru", "Lihat Tarif Premium", "Cari Lokasi". Banner subscription tier.

### Persona P5 — Public User / Citizen

**Profil:**
- Posisi: warga, jurnalis, mahasiswa, NGO worker
- Usia: 18–65 tahun
- Latar belakang: variasi sangat luas
- Konteks: ad-hoc, 1–2 sesi sebelum lupa
- Waktu: 3–10 menit per sesi

**Kebutuhan utama:**
- Informasi yang dapat dimengerti tanpa background teknis
- Peta sederhana dengan layer publik (banjir, kebakaran, kualitas udara)
- Cerita/narasi (story map style)
- Sharing di media sosial
- Mobile excellence

**Fitur yang dapat diakses:** FITUR 8.1 (public layers only), 8.2 (public dashboards), 8.3 (public exec summaries), 6.5 (NLP subset, no detail data), 7.2 (comments read-only)

**Dashboard varian:** **Bukan dashboard tradisional** — landing page edukatif. Tidak perlu login untuk view; opsional sign-up untuk subscribe alert.

## 6.4 Matriks Hak Akses per Persona × Modul

| Modul | P1 Exec | P2 Planner | P3 Researcher | P4 Private | P5 Public |
|-------|---------|------------|---------------|------------|-----------|
| Dashboard/Home | ✓ (Exec) | ✓ (Planner) | ✓ (Researcher) | ✓ (Private) | Landing publik |
| Map Explorer | ✓ read | ✓ full | ✓ full | ✓ subset | ✓ public layers |
| Climate Modeling | View results | ✓ Run & view | ✓ Full | ✗ | ✗ |
| Vulnerability | View | ✓ Full | ✓ Full | ✓ Subset | View public maps |
| Sectoral Analysis | View | ✓ Full | ✓ Full | ✓ Subset (4.5/4.6) | ✗ |
| SDSS Core | View | ✓ Full | ✓ Full | ✓ Subset | ✗ |
| AI Assistant | ✓ Query | ✓ Full | ✓ Full | ✓ Subset | ✓ Public Q&A |
| Collaboration | Sign-off only | ✓ Full | ✓ Full | ✗ | ✗ |
| Reports & Viz | ✓ Read+Export | ✓ Full | ✓ Full | ✓ Subset | ✓ Read public |
| Data Catalog | View | ✓ Full | ✓ Full + download | ✓ Subset | View catalog public |
| Hindcasting | ✗ | View results | ✓ Full | View only | ✗ |
| Settings/Admin | Settings | Settings | Settings + API | Settings | (limited) |

---

# 7. Scope

## 7.1 In-Scope (TOR §6.a)

Platform BIGCA mencakup:

1. **Climate Action Concept** — articulating kebijakan pembangunan berketahanan iklim Indonesia 2020–2045 (Bappenas)
2. **Climate Action Platform Architecture** — tulang punggung teknologi untuk pemanfaatan data geospasial mendukung kerangka kebijakan iklim Indonesia
3. **Geospatial Data Implementation Platform** — kebutuhan infrastruktur geospasial untuk pembangunan ketahanan iklim
4. **Data Governance Framework** — selaras One Map Policy, mencakup:
   - **Baseline layers** — batas administratif, tutupan lahan, model terrain
   - **Climate hazard layers** — zona risiko banjir, area rawan kekeringan, peta erosi pesisir
   - **GHG emissions layers** — emisi industri, tren deforestasi, potensi sekuestrasi karbon
5. **Stakeholder engagement** — partisipasi Pemda, swasta, akademik
6. **Data interoperability** — OGC standards (WMS, WFS, WCS, GeoTIFF, NetCDF) dan integrasi platform nasional
7. **Data-sharing protocols** — antara BIG, ATR/BPN, BMKG, BNPB, KLH, Kemenhut, swasta, akademik
8. **3 pilot case studies** menunjukkan efektivitas dalam climate resilience planning
9. **Capacity-building, dissemination, workshops, launching events** (TOR Annex 6, §2.1.1, Table 9)

## 7.2 Out-of-Scope

Berikut eksplisit di luar ruang lingkup kecuali ada perjanjian tertulis:

- Konstruksi infrastruktur fisik (kontrak ini adalah non-construction consulting per TOR cover page)
- Pengembangan model iklim yang sudah menjadi mandat BMKG (Platform integrate, bukan replace)
- Operations dan maintenance di luar 27 bulan kontrak (sustainability strategy didefinisikan per Annex 2)
- Authoritative carbon accounting atau NDC reporting yang menggantikan sistem MRV nasional existing (Platform align dan feed ke existing systems)

## 7.3 Scope Change Management

Sekuens geografis dapat direvisi sesuai ketersediaan data atau prioritas strategis pemerintah (TOR §6.b). Setiap perubahan scope, schedule, atau budget wajib mengikuti formal change-control procedure dengan Contracting Authority dan tercermin dalam updated work plans dan reports.

---

# 8. Geographical Rollout & Phasing

## 8.1 Overall Coverage

Platform dirancang applicable seluas Indonesia (38 provinsi) dengan karakteristik sosial-budaya, alam, dan lingkungan yang beragam (TOR §6.b dan Annex 6 §1.1). Implementasi awal fokus pada lokasi-lokasi prioritas selaras dengan ILASPP Sub-component 1.2.

## 8.2 Province Groupings & Annual Schedule (TOR §6.b, Annex 6 §1.1 Tabel 8)

**Group 1 — Year 2026 (First Group, 6 provinsi):**
1. Sulawesi Selatan
2. Gorontalo
3. Sulawesi Tenggara
4. Banten
5. Jawa Barat
6. Jawa Timur

**Group 2 — Year 2027 (Second Group, 7 provinsi):**
1. Kalimantan Barat
2. Kalimantan Timur
3. Kalimantan Selatan
4. Jawa Tengah dan DIY
5. NTB
6. NTT

**Group 3 — Year 2028 (Third Group, 6 provinsi):**
1. Aceh
2. Sumatera Selatan
3. Sumatera Utara
4. Bali
5. Maluku Utara
6. Papua Barat Daya

**Catatan jumlah:** TOR §6.b menyatakan 18 provinsi; Annex 6 §1.1 menyatakan 19 provinsi; perbedaan karena "Jawa Tengah dan DIY" dapat dihitung sebagai satu atau dua entry. PRD ini mengadopsi penghitungan TOR.

## 8.3 Selection Criteria

- Area kepentingan di mana spatial planning ILASPP berlangsung
- Tingkat kerentanan tinggi terhadap risiko iklim (banjir, kekeringan, SLR)
- Signifikansi ekonomi (pertanian, perikanan, kehutanan)
- Kesiapan adopsi teknologi geospasial
- Eksistensi inisiatif adaptasi iklim sebelumnya yang dapat diperluas

## 8.4 Home Base & Supporting Facilities

- **Home base:** Service Provider wajib memiliki workspace di Jakarta dan sekitarnya (TOR §6.b)
- **Supporting:** Akses data geospasial dasar (termasuk citra satelit) via koordinasi K/L; administrative support untuk koordinasi (TOR §6.c)

---

# 9. Tech Stack & Foundation Decisions

Bagian ini menetapkan **keputusan teknologi inti** yang menjadi fondasi bagi semua plugin dan komponen BIGCA. Keputusan ini bersifat **default platform-wide**; setiap plugin boleh memiliki implementation language internal yang berbeda **selama mematuhi kontrak HTTP/JSON yang didefinisikan di §10**.

## 9.1 Decision Drivers

Pemilihan tech stack dipandu oleh:

1. **Talent availability** di Indonesia — Python, JavaScript/TypeScript, dan Java memiliki ecosystem developer terluas
2. **Geospatial ecosystem maturity** — Python (GeoPandas, Rasterio, xarray) dan JS (MapLibre, Turf.js) memiliki tooling terbaik
3. **AI/ML ecosystem** — Python adalah lingua franca AI/ML (PyTorch, scikit-learn, transformers, langchain)
4. **Sustainability post-contract** — open-source, mainstream, dengan dokumentasi luas untuk maintain BIG
5. **GeoVertix interop** — semua interaksi dengan GeoVertix via HTTP REST (bukan Rust SDK direct), karena itu BIGCA bebas dari constraint Rust
6. **Polyglot friendliness** — plugin architecture mendukung multi-language; tidak monokultur

## 9.2 Frontend Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **Framework** | **Next.js 14+** (App Router) | SSR+CSR hybrid, file-based routing, mature React ecosystem |
| **UI library** | **React 18+** | De facto standard, ekosistem terluas |
| **Styling** | **Tailwind CSS** + **shadcn/ui** | Utility-first dengan consistent design tokens; copy-paste components |
| **State (client)** | **Zustand** | Lightweight, modern, no boilerplate |
| **State (server)** | **TanStack Query (React Query)** | Caching, sync, optimistic updates |
| **Forms** | **React Hook Form** + **Zod** | Performance + type safety |
| **Map library** | **MapLibre GL JS** | Open-source, performant, MVT support, OGC compatible |
| **Charts** | **Plotly.js** (default) atau **ECharts** | Rich features, interactive, SVG/Canvas |
| **i18n** | **next-intl** | Lazy loading, format support ID/EN |
| **Testing** | **Vitest** + **React Testing Library** + **Playwright** | Unit + component + e2e |
| **Component dev** | **Storybook 8+** | Isolated component dev + visual testing |
| **Build** | **Turbopack** (Next.js built-in) | Fast HMR, optimal bundling |
| **PWA** | **next-pwa** + **Workbox** | Service worker offline-first |
| **Offline storage** | **IndexedDB** via **Dexie** | Local cache, sync queue |

## 9.3 Backend Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **Primary language (compute/ML)** | **Python 3.11+** | AI/ML ecosystem, geospatial libs (GeoPandas, Rasterio, xarray), climate libs (scikit-downscale, climate-indices, cdo) |
| **Primary framework (compute/ML plugins)** | **FastAPI** | Async, type-hinted, OpenAPI auto-gen, Pydantic validation |
| **Secondary language (I/O-heavy)** | **Node.js 20+ LTS** + **TypeScript** | Auth, gateway, notification, real-time, lightweight services |
| **Secondary framework** | **NestJS** atau **Fastify** | Type safety, modular, scalable |
| **Worker/Job queue** | **Celery** (Python) + **Redis** broker | Long-running tasks (HEC-RAS, InSAR, model training) |
| **Stream processing** | **Apache Kafka** + **Kafka Streams** | Real-time IoT, satellite, alerts |
| **API Gateway** | **Kong** atau **Traefik** | Rate limiting, routing, OAuth, observability |

## 9.4 Database & Storage

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **Primary RDBMS** | **PostgreSQL 17** | Mature, JSONB, performant |
| **Spatial extension** | **PostGIS 3.5+** | De facto spatial SQL standard |
| **Time-series extension** | **TimescaleDB** (opsional) | Time-series optimized untuk IoT high-cardinality |
| **Cache** | **Redis 7+** | Session, query cache, pubsub, queue broker |
| **Object storage** | **MinIO** (self-hosted S3-compatible) atau **AWS S3** | Raster, exports, uploads |
| **Vector DB (RAG)** | **Qdrant** (default) atau **Weaviate** | Dense embedding search untuk LLM RAG |
| **Search** | **Elasticsearch** atau **OpenSearch** | Full-text search untuk Data Catalog, logs |
| **Schema namespace** | Per-plugin schema (`bcp_<name>.*`) | Isolasi data antar plugin |

## 9.5 Infrastructure & DevOps

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **Container** | **Docker** + **Docker Compose** (dev) | Standar industri |
| **Orchestration** | **Kubernetes** (vendor-agnostic) | Auto-scaling, rolling deploy |
| **Container registry** | **Harbor** (self-hosted) | Image distribution + scanning |
| **CI/CD** | **GitHub Actions** atau **GitLab CI** | Multi-pipeline per plugin |
| **GitOps** | **ArgoCD** | Declarative deployment dari Git |
| **Service mesh (opsional)** | **Istio** atau **Linkerd** | mTLS, traffic management |
| **Logs** | **Loki** + **Grafana** | Centralized logs |
| **Metrics** | **Prometheus** + **Grafana** | Metrics, alerting |
| **Tracing** | **Tempo** atau **Jaeger** | Distributed tracing |
| **Secret management** | **HashiCorp Vault** atau **Sealed Secrets** | JWT keys, DB passwords, API keys |
| **Edge computing** | **k3s** | Edge boxes Mini-PC/RPi5 |

## 9.6 AI/ML & LLM Stack

| Layer | Pilihan | Alasan |
|-------|---------|--------|
| **LLM server** | **Ollama** (default) — local/open-source | Llama 3.x, Phi 3.x, Deepseek; aligns NFR-SUST-03 data sovereignty |
| **LLM models** | Llama 3.x 8B, Phi 3.5, Deepseek; opsional Indonesian fine-tuned via LoRA | Multilingual, Bahasa Indonesia |
| **Embedding** | **multilingual-e5-large** atau **BGE-M3** | Multilingual termasuk Bahasa Indonesia |
| **RAG framework** | **LangChain** + **LlamaIndex** | RAG orchestration, document loaders |
| **Vector store** | **Qdrant** | Open-source, performant, mature |
| **ML training** | **PyTorch 2.x** | Industry standard untuk DL |
| **Classical ML** | **scikit-learn**, **XGBoost**, **LightGBM** | Tabular ML untuk vulnerability, risk scoring |
| **Spatial ML** | **PyTorch** + **torchgeo** | Satellite imagery CNN |
| **Model serving** | **ONNX Runtime** + **MLflow** | Cross-framework, production-grade |
| **Model registry** | **MLflow Model Registry** | Versioning, staging, production |
| **XAI** | **SHAP**, **LIME**, **Captum**, **dice-ml**, **aif360** | Explainability per FR-AI-20, FR-AI-21 |
| **MCP server** | Custom **Anthropic MCP spec compliant** | Tool bridge LLM ↔ analytical plugins (FR-AI-42) |
| **Federated learning** | **Flower** atau **PySyft** | Privacy-preserving (FR-AI-33) |

## 9.7 Specialized Compute (Climate Domain)

| Use case | Tool/Library |
|----------|--------------|
| Climate data I/O (NetCDF, GRIB) | xarray, netCDF4, h5py, zarr, cdo |
| Statistical downscaling | scikit-downscale, climate-indices |
| Hydrodynamic modeling | HEC-RAS (wrapper), SWAT, VIC, SWMM |
| InSAR processing | MintPy, SNAPHU, GACOS |
| Tide-gauge / altimetry | tide_tools, ais |
| Hydrology pre-processing | rasterio + GDAL terrain analysis |
| Optimization | OR-Tools (LP/MILP), DEAP/pymoo (GA, NSGA-II) |
| System dynamics | PySD (FR-TM-B-02) |
| Sensitivity analysis | SALib (Sobol, Morris) |

## 9.8 Coding Conventions

| Aspect | Convention |
|--------|------------|
| **Backend Python** | PEP 8, Black formatter, isort, mypy strict |
| **Frontend TS** | ESLint + Prettier, strict mode, no `any` without justification |
| **API contracts** | OpenAPI 3.0 spec per plugin, auto-generated |
| **Commit messages** | Conventional Commits dengan plugin scope |
| **Branch naming** | `feat/<plugin>-<short>`, `fix/<plugin>-<short>` |
| **Code review** | Min 1 reviewer, CODEOWNERS per plugin, branch protection main |
| **Testing thresholds** | Unit ≥ 80%, integration tests semua public endpoint, contract tests semua GeoVertix touchpoint |
| **Documentation** | README.md, docs/contract.md, OpenAPI spec, ADR per plugin |

## 9.9 Build Environment

| Item | Constraint |
|------|------------|
| **Container base image** | Debian 12 / Ubuntu 22.04 LTS |
| **Python version** | 3.11.x pinned via pyproject.toml |
| **Node.js version** | 20.x LTS pinned via .nvmrc |
| **GDAL** | 3.8+ |
| **PostGIS** | 3.5+ |
| **Production target** | Kubernetes 1.28+ |

**Catatan vs GeoVertix:** GeoVertix mengharuskan AlmaLinux 8 (glibc 2.28 + GDAL 3.6) untuk Rust binaries. **BIGCA tidak memiliki constraint ini** karena container-based deployment.

---

# 10. System Architecture & Plugin Model

Bagian ini adalah **inti baru PRD v2.0**. Ia menggantikan §9 PRD v1.2 sepenuhnya dan menetapkan keputusan arsitektur fundamental: **BIGCA dibangun sebagai modular plugin-based platform**.

## 10.1 Positioning Principle

**BIGCA adalah aplikasi standalone modular dengan arsitektur plugin-based.**

```
                        ┌──────────────────────────────────┐
                        │      BIGCA PLATFORM (Whole)      │
                        └──────────────────────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            │                          │                          │
            ▼                          ▼                          ▼
   ┌─────────────────┐      ┌──────────────────┐       ┌───────────────────┐
   │   MAIN APP      │      │  BIGCA PLUGINS   │       │ GEOVERTIX PLUGINS │
   │   (Shell)       │      │  (Native ~35-45) │       │ (Reused ~16)      │
   │                 │      │                  │       │                   │
   │ - Home          │      │ - bcp-climate    │       │ - gxp-mcda        │
   │ - Navigation    │      │ - bcp-vuln-mcda  │       │ - gxp-climate     │
   │ - Auth          │      │ - bcp-rdtr       │       │ - gxp-geoai       │
   │ - Dispatcher    │      │ - bcp-llm-rag    │       │ - gxp-qgis        │
   │ - GVX adapter   │      │ - bcp-...        │       │ - gxp-inference   │
   │ - Settings      │      │                  │       │ - gxp-ml          │
   └─────────────────┘      └──────────────────┘       │ - gxp-areainfo    │
                                                       │ - gxp-mapeditor   │
                                                       │ - gxp-bpnmap      │
                                                       │ - gxp-mbtiles     │
                                                       │ - gxp-3dtiles     │
                                                       │ - gxp-lidar       │
                                                       │ - gxp-routing     │
                                                       │ - gxp-pbb         │
                                                       │ - gxp-agrest      │
                                                       │ - gxp-geoprocess  │
                                                       └───────────────────┘
```

Tiga pilar:

1. **Main App (Shell)** — selalu di-deploy bersama platform. Berisi halaman utama, navigasi, autentikasi, dispatcher, integration adapter, dan settings.

2. **BIGCA Plugins (Native)** — fitur besar dikemas sebagai plugin terpisah. Dikembangkan paralel oleh tim berbeda, di-deploy independen, di-version independen. Naming convention: prefix `bcp-` (**B**IGCA **C**limate **P**lugin) untuk membedakan dari GeoVertix `gxp-*`.

3. **GeoVertix Plugins (External Reuse)** — plugin GeoVertix existing dipanggil via API contract. BIGCA tidak membangun ulang kapabilitas yang sudah ada. Estimasi penghematan effort 45–60%.

## 10.2 Architecture Principles (TOR Annex 6 §1.2.3, extended)

1. **Cloud-native, container-first** — Kubernetes orchestration, dynamic scaling
2. **Event-driven** — Kafka untuk real-time data IoT/satellite (FR-DI-03, FR-DI-04)
3. **Compliance** — SPBE, OGC, ISO 19115, ISO 19157
4. **Federated identity ready** — JWT/OIDC dengan LDAP federasi (BIG SSO / SIKD)
5. **Hybrid cloud + edge** — cloud untuk scalability, edge boxes untuk remote
6. **Modular plugin-based** — main app + plugin marketplace + GeoVertix reuse
7. **API-first, contract-driven** — semua plugin punya OpenAPI 3.0 spec, contract tests gate deployment
8. **Polyglot-friendly** — Python/Node.js/Go OK selama HTTP contract dipatuhi
9. **Capability-scoped security** — setiap plugin declare apa yang bisa diaksesnya
10. **Reuse-first** — GeoVertix plugin existing diutilisasi maksimal

## 10.3 Logical Architecture (7 Layer)

**L1 — Data Sources** — Government (BIG, BPS, BMKG, K/L), Private/open (korporasi, NGO), IoT sensors + satellite

**L2 — Data Management** — Ingestion, Processing, Storage (PostGIS, data warehouse, S3). Plugin: `bcp-data-*` + GeoVertix Layers API / Import API / Raster API

**L3 — SDSS Core** — Containerized thematic toolboxes (Climate, LULC, Carbon, Biodiversity, SLR, Flood/Drought, Vulnerability, Food, Tourism, Spatial Planning), Analysis Output (Viz, Predictive, Scenario), AI Agents (LLM+RAG+KB). Plugin: `bcp-modeling-*`, `bcp-vuln-*`, `bcp-sdss-*`, `bcp-ai-*`

**L4 — Communication & Orchestration** — MCP server. Plugin: `bcp-mcp`

**L5 — API / Data Service** — RESTful API, OGC services, Streams. Main App API Gateway + Plugin Dispatcher + GeoVertix OGC proxied

**L6 — User Interface** — Web Desktop, Web Mobile, PWA. Main App Shell + per-plugin micro-frontend

**L7 — End-User Access** — Government (Full), Private (Some), Public (Limited). JWT claims + ABAC/RBAC

## 10.4 Main App (Shell) — Scope

Main App adalah **kerangka non-fitur** yang dibangun pertama dan tidak boleh tergantung pada plugin manapun selain dependencies operasional (auth, dispatcher).

### 10.4.1 Komponen Main App

| Komponen | Tanggung Jawab |
|----------|----------------|
| **Public landing** (`/`) | Halaman publik P5: peta publik, story maps, info platform, sign-in |
| **Auth pages** | OIDC/JWT flow, password reset, account activation |
| **Dashboard host** (`/dashboard`) | Layout halaman utama; embed widgets dari plugin |
| **Global navigation** | Top bar, sidebar, context bar, breadcrumbs, search spotlight, AI launcher, status bar |
| **Plugin micro-frontend host** | Module Federation runtime — load plugin UI on-demand |
| **API Gateway** | All API calls routed via Main App gateway |
| **Settings hub** | Profile, auth admin, notification prefs, language, audit, API tokens |
| **i18n shell** | next-intl provider, language toggle, locale formatters |
| **Notification UI** | Top bar notification bell, drawer for full list |
| **AI Assistant launcher** | Floating button, side drawer panel, context-aware |
| **PWA registration** | Service worker, install prompt, offline shell |
| **Theme provider** | Color tokens, typography, spacing via Tailwind + shadcn/ui |

### 10.4.2 Main App vs Plugin Responsibility Boundary

| Concern | Main App | Plugin |
|---------|----------|--------|
| Auth (login, JWT issuance) | ✓ | — |
| Authorization (per-route check) | ✓ (coarse) | ✓ (fine, per-feature) |
| Routing global | ✓ | — |
| Routing intra-plugin | — | ✓ |
| Dispatcher / discovery | ✓ | — |
| Plugin business logic | — | ✓ |
| Plugin UI (micro-frontend) | hosts | implements |
| Database connection | ✓ (shared pool) | ✓ (via Main App or own) |
| File storage | ✓ (S3 client lib) | ✓ (consumes lib) |
| Inter-plugin call | via gateway | ✓ (declare capability) |
| GeoVertix call | via Bridge Adapter | via Main App OR direct |
| Logging | ✓ (gateway logs) | ✓ (own logs aggregated) |
| Metrics | ✓ (gateway metrics) | ✓ (per-plugin metrics) |
| Localization keys | ✓ (shared shell) | ✓ (per-plugin locales/) |

## 10.5 BIGCA Plugin Specification

### 10.5.1 Plugin Definition

**BIGCA Plugin** adalah **containerized service** dengan:

1. **Process isolation** — runs sebagai container Docker terpisah
2. **HTTP contract** — komunikasi via REST (JSON) ± WebSocket/SSE
3. **Manifest-driven** — `plugin.json` mendeklarasikan identitas, port, capabilities, dependencies
4. **Health endpoint** — `/health` returns 200 OK untuk polling Dispatcher
5. **Capability-scoped** — declare what it can access (DB, FS, network, other plugins)
6. **Versioned independently** — semver `MAJOR.MINOR.PATCH`
7. **Signed (production)** — `plugin.json.sig` ditandatangani Lead Developer (opsional Y1, mandatory Y2)

### 10.5.2 Plugin Anatomy

```
plugins/bcp-<name>/
├── plugin.json                  # manifest (read by Dispatcher)
├── plugin.json.sig              # OpenSSL signature (mandatory Y2+)
├── README.md                    # user-facing description
├── CHANGELOG.md                 # version history
├── docs/
│   ├── contract.md              # what plugin promises
│   ├── adr/                     # Architecture Decision Records
│   └── api.md                   # OpenAPI spec
├── openapi.yaml                 # OpenAPI 3.0 spec
├── locales/
│   ├── en.json
│   └── id.json
├── src/                         # plugin source
│   ├── main.py / index.ts       # entry point (handshake + server)
│   ├── handlers/                # route handlers
│   ├── services/                # business logic
│   ├── models/                  # data models
│   ├── config.py / config.ts    # config loader
│   └── ...
├── frontend/                    # OPTIONAL: micro-frontend
│   ├── package.json
│   ├── webpack.config.js        # Module Federation config
│   ├── src/App.tsx              # entry component
│   └── src/routes/              # plugin internal routes
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── contract/                # contract tests vs Main App & GeoVertix
│   └── fixtures/
├── migrations/                  # database migrations
├── Dockerfile
├── docker-compose.yml           # dev orchestration
├── pyproject.toml / package.json
└── scripts/
    ├── dev-build.sh
    ├── dev-test.sh
    └── package-runtime.sh
```

### 10.5.3 Plugin Manifest (`plugin.json`)

Contoh lengkap untuk `bcp-vuln-mcda`:

```json
{
  "plugin": {
    "name": "vuln-mcda",
    "version": "0.1.0",
    "binary": "bin/bcp-vuln-mcda",
    "language": "python",
    "framework": "fastapi",
    "port": 9302,
    "kind": "service",
    "enabled": true,
    "startup_grace_seconds": 30,
    "description": "Multi-Criteria Vulnerability Assessment plugin"
  },
  "owner": {
    "team": "Vulnerability Squad",
    "lead": "Budi P.",
    "contact": "vuln-squad@bigca.dev"
  },
  "capabilities": [
    "db:read:bcp_vuln.*",
    "db:write:bcp_vuln.assessments",
    "db:read:bcp_data.layers",
    "fs:read:/opt/bigca/data/vuln-cache",
    "fs:write:/opt/bigca/data/vuln-cache",
    "net:fetch:https://*.bmkg.go.id/*",
    "plugin_call:target:bcp-mcp",
    "geovertix_call:plugin:gxp-mcda",
    "geovertix_call:plugin:gxp-geoprocess",
    "s3:read:bigca-rasters/*",
    "s3:write:bigca-exports/vuln-*"
  ],
  "depends_on": {
    "main_app_version": ">=1.0.0",
    "plugins": [
      { "name": "bcp-data-catalog", "version": ">=0.1.0" },
      { "name": "bcp-mcp", "version": ">=0.1.0" }
    ],
    "geovertix_plugins": [
      { "name": "gxp-mcda", "version_pin": "0.4.x" },
      { "name": "gxp-geoprocess", "version_pin": "0.4.x" }
    ]
  },
  "routes": [
    { "path": "/api/v1/plugin/vuln-mcda/assessments", "methods": ["GET", "POST"] },
    { "path": "/api/v1/plugin/vuln-mcda/assessments/{id}", "methods": ["GET", "PUT", "DELETE"] },
    { "path": "/api/v1/plugin/vuln-mcda/criteria", "methods": ["GET"] },
    { "path": "/api/v1/plugin/vuln-mcda/op/compute_vulnerability", "methods": ["POST"] }
  ],
  "operations": [
    {
      "name": "compute_vulnerability",
      "input_schema": "schemas/compute_vulnerability_input.json",
      "output_schema": "schemas/compute_vulnerability_output.json",
      "long_running": true,
      "estimated_duration_seconds": 120
    }
  ],
  "frontend": {
    "exposes": {
      "./Routes": "./frontend/src/routes/index.tsx"
    },
    "shared": ["react", "react-dom", "next/navigation"],
    "remote_entry": "https://plugin-host.bigca.go.id/bcp-vuln-mcda/remoteEntry.js"
  },
  "config": {
    "mcda_default_method": "topsis",
    "cache_ttl_seconds": 3600,
    "max_concurrent_runs": 5
  },
  "metadata": {
    "bigca_fitur_codes": ["3.1"],
    "tor_compliance": ["FR-TM-B-01", "FR-SDSS-02"],
    "integration_pattern": "A",
    "geovertix_reuse_percent": 85
  }
}
```

**Required fields:** `plugin.name`, `plugin.version`, `plugin.binary`, `plugin.port`, `plugin.kind`, `owner`, `capabilities`, `routes`.

### 10.5.4 Capability Format

Format `resource:action:scope`:

| Resource | Actions | Example Scope |
|----------|---------|---------------|
| `db` | `read`, `write` | `bcp_vuln.assessments` |
| `fs` | `read`, `write` | `/opt/bigca/data/<name>-cache` |
| `net` | `fetch` | `https://api.example.com/*` |
| `plugin_call` | `target` | `bcp-mcp` |
| `geovertix_call` | `plugin` | `gxp-mcda` |
| `s3` | `read`, `write` | `bigca-rasters/*` |
| `cache` | `read`, `write` | `redis:bcp-vuln:*` |
| `kafka` | `subscribe`, `publish` | `events.vuln.*` |

**Enforcement:**

1. **Sign-time** — `bcp-plugin-validate --strict` reject malformed
2. **Runtime** — Dispatcher reject request exceeding declared scope (403)
3. **Audit-time** — admin grep all plugin.json untuk capability summary

### 10.5.5 Plugin Lifecycle

```
   ┌──────────────────────┐
   │ 1. Container boots   │
   │    (k8s deploy)      │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 2. Read plugin.json  │
   │    + plugin.dev.json │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 3. Validate caps     │
   │    against signature │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 4. Connect deps      │
   │    (DB, Redis, S3,   │
   │     Kafka)           │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 5. Build app routes  │
   │    + handlers        │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 6. POST /plugins/    │
   │    register to       │
   │    Dispatcher        │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 7. Dispatcher ack    │
   │    + routing active  │
   └──────────┬───────────┘
              ▼
   ┌──────────────────────┐
   │ 8. /health polled    │
   │    every 30s         │
   └──────────────────────┘
```

### 10.5.6 BIGCA Dispatcher Pattern

**BIGCA Plugin Dispatcher** adalah service Main App yang:

1. Maintains **registry** plugin aktif (in-memory + persisted Redis)
2. **Health check** via `GET /health` setiap 30 detik
3. **Routes** `/api/v1/plugin/<name>/<path>` ke plugin port yang sesuai
4. **Enforces** capability — reject request melebihi declared scope
5. **Injects** JWT claims sebagai header ke plugin request
6. **Records** observability — log+trace+metrics semua request
7. **Discovers** operations — aggregate `/op/list` dari semua plugin

**Endpoint Dispatcher (internal):**

| Endpoint | Purpose |
|----------|---------|
| `POST /dispatcher/plugins/register` | Plugin handshake |
| `DELETE /dispatcher/plugins/<name>` | Plugin deregister |
| `GET /dispatcher/plugins` | List registered plugins |
| `GET /dispatcher/plugins/<name>/health` | Health proxy |
| `GET /dispatcher/operations` | All declared ops |
| `POST /dispatcher/proxy/<name>/*` | Internal proxy route |

**Port range BIGCA plugins: 9300–9399** (menghindari konflik GeoVertix 9200–9299).

### 10.5.7 Inter-Plugin Calls

Plugin A panggil Plugin B via Dispatcher:

```python
from bigca_sdk import PluginClient

client = PluginClient.from_env()
result = await client.plugin_call(
    target="bcp-mcp",
    path="/api/v1/plugin/mcp/tools/discover",
    method="GET"
)
```

Plugin A declare capability: `"plugin_call:target:bcp-mcp"`.

### 10.5.8 GeoVertix Plugin Calls

Plugin BIGCA memanggil GeoVertix via **GeoVertix Bridge Adapter** Main App:

```python
from bigca_sdk import GeoVertixClient

gvx = GeoVertixClient.from_env()
result = await gvx.invoke_plugin(
    plugin="gxp-mcda",
    operation="compute",
    params={...},
    timeout_seconds=60
)
```

Capability: `"geovertix_call:plugin:gxp-mcda"`.

**Bridge Adapter bertanggung jawab:**

1. JWT refresh vs GeoVertix
2. Retry/backoff (exponential)
3. Circuit breaker (FR-GVX-02)
4. Response caching (Redis, TTL configurable)
5. Fallback strategy (FR-GVX-07)
6. Contract testing (FR-GVX-06) di CI
7. Version pinning (FR-GVX-08)
8. Observability (FR-GVX-10) — correlation ID, latency, status, retry

## 10.6 Plugin Communication Protocols

| Protocol | Use case |
|----------|----------|
| **HTTP REST + JSON** | Primary, request/response sinkron |
| **WebSocket** | Real-time collaboration (FITUR 7.2 annotation, 5.7 group decision) |
| **Server-Sent Events** | Long-running task progress (FR-GVX-04) |
| **gRPC** | Opsional, plugin-to-plugin high-throughput internal |
| **Kafka** | Async event-driven (FR-DI-03, FR-AI-44, alerts) |

## 10.7 Plugin Frontend Strategy (Micro-Frontend via Module Federation)

Main App = **shell host**; plugin UI di-load dinamis sebagai **remote modules**.

**Webpack Module Federation Pattern**

Main App config:
```javascript
new NextFederationPlugin({
  name: 'bigca_shell',
  remotes: {
    'bcp-vuln-mcda': `bcp_vuln_mcda@${PLUGIN_HOST}/bcp-vuln-mcda/remoteEntry.js`,
    'bcp-climate':   `bcp_climate@${PLUGIN_HOST}/bcp-climate/remoteEntry.js`
  },
  shared: {
    react: { singleton: true, requiredVersion: '^18' },
    'react-dom': { singleton: true },
    '@bigca/ui-kit': { singleton: true }
  }
});
```

Plugin config:
```javascript
new ModuleFederationPlugin({
  name: 'bcp_vuln_mcda',
  filename: 'remoteEntry.js',
  exposes: {
    './Routes': './src/routes/index.tsx',
    './Widget': './src/widgets/KPICard.tsx'
  },
  shared: ['react', 'react-dom', '@bigca/ui-kit']
});
```

**Manfaat:**
- Plugin UI dapat di-update tanpa rebuild Main App
- Tim plugin develop dengan local mock shell
- Versi UI plugin terikat ke versi backend plugin
- Crash di plugin UI tidak menjatuhkan shell (Error Boundary)

## 10.8 Database Strategy per Plugin

Setiap plugin memiliki PostgreSQL schema dedicated:

| Plugin | Schema |
|--------|--------|
| Main App (auth, audit, settings) | `bigca_core` |
| bcp-data-catalog | `bcp_data` |
| bcp-vuln-mcda | `bcp_vuln` |
| bcp-climate-advanced | `bcp_climate` |
| bcp-llm-rag | `bcp_ai_rag` |
| ... | `bcp_<plugin>` |

**Rules:**

1. Plugin hanya **write** ke schema sendiri
2. Plugin **read** dari schema lain hanya jika di-declare di capability
3. Shared reference tables (provinces, layers metadata) di `bigca_core` (read-only untuk semua)
4. Per-plugin migrations (Alembic untuk Python, TypeORM/Prisma untuk Node)
5. Cross-plugin transactions DIHINDARI — gunakan event-driven (Kafka) untuk consistency

## 10.9 Plugin Manifest Validator (`bcp-plugin-validate`)

Tool CLI di CI dan saat signing:

```bash
bcp-plugin-validate --plugin-dir . --strict
```

Error codes:

| Code | Meaning |
|------|---------|
| E001 | plugin.json not found |
| E002 | plugin.json parse error |
| E010 | plugin.name empty |
| E011 | plugin.version empty |
| E012 | Capability format violation |
| E013 | Capability is not string |
| E020 | Port out of range (9300-9399) |
| E021 | Port conflict |
| E030 | OpenAPI spec invalid |
| W001 | plugin.enabled = false |
| W002 | locales/en.json missing |
| W003 | locales/id.json missing |
| W004 | README.md missing |
| W005 | Binary path doesn't exist |
| W010 | OpenAPI spec missing |
| W011 | Contract tests directory empty |
| W020 | GeoVertix version pin loose |

## 10.10 Plugin Signing (Production)

Production deploy wajib signed plugin (mandatory Y2+):

1. Developer push tag: `bcp-<name>-vMAJOR.MINOR.PATCH`
2. Notify Lead Developer
3. Lead Developer:
   - Pull tag
   - Build container image di production-equivalent env
   - Compute `binary_sha256` (image digest)
   - Generate `plugin.json.sig` = OpenSSL sign over `plugin.json` + binary_sha256
   - Sign di BIGCA Plugin Registry (Harbor + metadata)
4. Production K8s admission controller **menolak** plugin tanpa valid signature

Local dev / Y1 staging: dispatcher dengan `--allow-unsigned-plugins` flag.

## 10.11 Service Level Expectations (SLE)

| Metric | Target |
|--------|--------|
| Plugin handshake time | < 30 detik post-deploy |
| Plugin /health response | < 200ms p95 |
| Plugin sync operation | < 2s p95 (non-compute), < 30s p95 (compute) |
| Plugin async operation | Tasks API + SSE progress, no hard limit |
| Cross-plugin call overhead | < 50ms p95 |
| GeoVertix call overhead | < 100ms p95 |
| Dispatcher availability | ≥ 99.9% (non-disaster), ≥ 99.99% (disaster) |
| Plugin contract change notice | ≥ 30 days deprecation |

## 10.12 Edge Computing Strategy (FITUR 12.x)

Untuk area konektivitas terbatas (Papua, Kalimantan remote):

- Edge box: Mini-PC atau RPi5 + SSD 1-2TB + **k3s** (lightweight Kubernetes)
- Pre-loaded subset BIGCA plugins (bcp-data-catalog read-only, bcp-vuln-mcda compact)
- MBTiles offline via gxp-mbtiles reuse
- ONNX compressed inference via gxp-inference reuse + FITUR 12.3 Model Compression
- Differential sync ke main cluster saat online (CRDT atau last-write-wins)
- Edge box defer ke Y2/Y3

## 10.13 Mobile / PWA Strategy

Per FITUR 12.2 Mobile PWA:

- Main App built as PWA (Next.js + next-pwa)
- Service Worker offline shell + cached tiles + sync queue
- IndexedDB local untuk drafts, field captures, queued mutations
- Plugin micro-frontend opsional di mobile — Field Capture, Map Explorer, Reports view wajib mobile-responsive; Hindcasting, MCDA Designer desktop-first
- Background sync saat reconnect
- Push notifications via FCM atau Web Push API

## 10.14 Observability Stack (FR-GVX-10 + general)

- **Logs**: stdout JSON → Loki → Grafana
- **Metrics**: Prometheus scrape `/metrics` per plugin
- **Tracing**: OpenTelemetry → Tempo → Grafana
- **Audit log**: immutable log stream (FITUR 9.3)

Plugin **WAJIB** expose:
- `/health` — liveness
- `/ready` — readiness
- `/metrics` — Prometheus format
- `/info` — version, build, deps

## 10.15 Plugin Compatibility Matrix

Setiap plugin pin terhadap:
- BIGCA Main App version
- Plugin SDK (`bigca-plugin-sdk`)
- UI Kit (`@bigca/ui-kit`)
- GeoVertix API contract (FR-GVX-08)

Repo `bigca-plugins/COMPATIBILITY.md` maintains canonical matrix.

Cross-plugin version coherence di CI: semua plugin pin SDK version sama; UI Kit version sync dengan Main App.

## 10.16 Architecture Quality Attributes (ISO/IEC 25010)

| Attribute | Implementation |
|-----------|---------------|
| **Modularity** | Plugin = isolated process; clear contract; independent versioning |
| **Reusability** | GeoVertix reuse 45-60%; cross-plugin via dispatcher |
| **Analysability** | Centralized logs, traces, manifest audit |
| **Modifiability** | Plugin update tidak rebuild Main App |
| **Testability** | Per-plugin tests + contract tests CI |
| **Reliability** | Plugin crash isolated; circuit breaker |
| **Performance** | Independent scaling per plugin; cache aggressive |
| **Security** | Capability scoping; signed plugins; least privilege |
| **Maintainability** | Owner team per plugin; CODEOWNERS; documented contract |
| **Portability** | Container-based; K8s vendor-agnostic; polyglot |

---

# 11. Functional Requirements

Functional requirements diorganisir per modul. Setiap requirement memiliki identifier `FR-<module>-<n>` untuk traceability downstream.

## 11.1 Data Ingestion (FR-DI)

| ID | Requirement |
|----|-------------|
| FR-DI-01 | Platform shall ingest data geospasial via API calls, web-derived sources, file-based methods, dan mekanisme lain |
| FR-DI-02 | Platform shall support auto-extraction, auto-transformation, dan auto-reformatting (TOR Annex 6 §1.2.2) |
| FR-DI-03 | Platform shall ingest real-time data dari IoT sensors (soil moisture, temperature, rainfall, air quality, industrial emissions) |
| FR-DI-04 | Platform shall ingest multi-temporal dan hyper-temporal satellite imagery (Landsat, Sentinel, MODIS, dll.) |
| FR-DI-05 | Platform shall ingest tabular dan statistical data dari government databases |
| FR-DI-06 | Platform shall provide ETL pipelines specialized untuk climate dan environmental datasets |
| FR-DI-07 | Platform shall maintain change detection processes untuk tracking updates fitur lingkungan kritikal |

## 11.2 Data Storage & Management (FR-DS)

| ID | Requirement |
|----|-------------|
| FR-DS-01 | Platform shall provide Geospatial Database (PostGIS) optimized untuk storage, management, analysis |
| FR-DS-02 | Platform shall provide Data Warehouse untuk analisis dan reporting |
| FR-DS-03 | Platform shall use Cloud Storage (S3/MinIO) untuk accessibility dan scalability |
| FR-DS-04 | Platform shall implement multi-tier storage (hot/warm/cold) berdasarkan akses |
| FR-DS-05 | Platform shall implement real-time data sync dengan national data providers via ETL standardized |
| FR-DS-06 | Platform shall integrate dengan Spatial Data Infrastructure (SDI) Indonesia dan national geospatial reference |
| FR-DS-07 | Platform shall maintain data lineage tracking untuk semua datasets |
| FR-DS-08 | Platform shall implement automated backup dan recovery untuk critical climate datasets |

## 11.3 Data Processing & Quality (FR-DP)

| ID | Requirement |
|----|-------------|
| FR-DP-01 | Platform shall perform Data Cleaning per standards/specs (attributes, metadata) |
| FR-DP-02 | Platform shall integrate data lintas-sumber dengan basemap dan geospatial reference |
| FR-DP-03 | Platform shall analyze data untuk generate thematic information terkait perubahan iklim |
| FR-DP-04 | Platform shall apply ISO 19157 quality principles via automated validation |
| FR-DP-05 | Platform shall apply FAIR principles untuk metadata enrichment |
| FR-DP-06 | Platform shall provide data cleaning dan harmonization tools |
| FR-DP-07 | Platform shall maintain version control untuk semua datasets |

## 11.4 Thematic Analytical Models — Group A: Advanced Thematic Modeling & Climate Risk Evaluation (FR-TM-A)

Per TOR §Annex 6 §1.2.2 item 3.a:

| ID | Requirement |
|----|-------------|
| FR-TM-A-01 | Implement **Advanced Climate Modeling** — integrasi BMKG climate projections; ensemble approach (CMIP6, CORDEX-SEA); Local Climate Zones (LCZ) dan microclimate Indonesia |
| FR-TM-A-02 | Implement **Change Detection of LULC** menggunakan multi-temporal satellite, ML/DL classification (Random Forest, SVM, CNN), linkage ke carbon dan ecosystem-service impact models |
| FR-TM-A-03 | Implement **Net Carbon Footprint Monitoring** — sector-wide carbon accounting (energi, transport, agriculture, forestry, industry), AI-powered emission estimation menggunakan proxy data (nighttime lights, NO₂, vehicle counts), visualization & decision support |
| FR-TM-A-04 | Implement **Biodiversity Mapping** — species distribution modeling, high-resolution habitat mapping (UAV, satellite, DL), integrasi citizen science |
| FR-TM-A-05 | Implement **Sea Level Rise & Land Subsidence** — satellite altimetry, tide-gauge fusion, InSAR, GNSS, coastal vulnerability assessment |
| FR-TM-A-06 | Implement **Flood & Drought Modeling** — climate-informed hydrological models (SWAT, VIC, HEC-HMS), AI early warning, integrated risk mapping |

## 11.5 Integrated Analytical Process — Group B (FR-TM-B)

Per TOR §Annex 6 §1.2.2 item 3.b dan §1.2.3 item 1:

| ID | Requirement |
|----|-------------|
| FR-TM-B-01 | **Enhanced Vulnerability Assessment Framework** — multi-criteria analysis (physical, social, economic, environmental) + carrying capacity |
| FR-TM-B-02 | **Dynamic / system-dynamic vulnerability modeling** untuk temporal changes adaptive capacity |
| FR-TM-B-03 | **Supporting Toolbox for Spatial Planning** — land suitability, evacuation routes, shelter zones |
| FR-TM-B-04 | **Rice field drought/flood impact** untuk food security |
| FR-TM-B-05 | **Coastal vulnerability assessment** untuk Indonesia coastlines |
| FR-TM-B-06 | **Forest fire risk prediction** incorporating ENSO |
| FR-TM-B-07 | **Optimization of Renewable Energy Deployment** — solar radiation, wind, population proximity |
| FR-TM-B-08 | **Tourism sector vulnerability assessment** |

## 11.6 SDSS Functional Requirements (FR-SDSS)

Detail di §15. Summary:

| ID | Requirement |
|----|-------------|
| FR-SDSS-01 | SDSS shall provide interactive interface untuk spatial decision-making |
| FR-SDSS-02 | SDSS shall integrate predictive dan prescriptive models |
| FR-SDSS-03 | SDSS shall allow interactive dan iterative analyses |
| FR-SDSS-04 | SDSS shall support individual dan group decision-making |
| FR-SDSS-05 | SDSS shall integrate stakeholder preferences dan expert knowledge |
| FR-SDSS-06 | SDSS shall provide customizable adaptation action recommendations |

## 11.7 AI / LLM Requirements (FR-AI)

Detail di §16. Summary:

| ID | Requirement |
|----|-------------|
| FR-AI-01 | Integrate local/open-source LLMs (Llama, Phi, Deepseek on Ollama) untuk NLP geospatial queries |
| FR-AI-02 | Implement RAG backed by Knowledge Base / Definition Rules |
| FR-AI-03 | Integrate LLM/RAG dengan geospatial toolboxes via MCP |
| FR-AI-04 | Support natural-language queries (contoh: "lokasi banjir Sulteng sejak 2014", "prediksi deforestasi Kalsel 10 tahun") |
| FR-AI-05 | Implement explainable AI untuk transparency keputusan iklim |
| FR-AI-06 | Include human-in-the-loop verification untuk high-stakes decisions |

## 11.8 Output & Visualization (FR-OV)

| ID | Requirement |
|----|-------------|
| FR-OV-01 | Produce Interactive Maps untuk eksplorasi/analisis geospasial |
| FR-OV-02 | Produce Dashboards dengan graphs, diagrams, numerical results |
| FR-OV-03 | Produce Reports dan Executive Summaries |
| FR-OV-04 | Provide climate change impact simulation scenarios |
| FR-OV-05 | Provide scenario comparison features |
| FR-OV-06 | Communicate uncertainty dalam climate projections via dedicated visualization |
| FR-OV-07 | Produce thematic maps, temporal animations, interactive dashboards |

## 11.9 API & Data Services (FR-API)

| ID | Requirement |
|----|-------------|
| FR-API-01 | Expose RESTful API untuk real-time data retrieval |
| FR-API-02 | Expose OGC Web Services: WMS, WFS, WCS |
| FR-API-03 | Support Data Streams (continuous IoT/sensor flows) |
| FR-API-04 | Provide Download dan Query endpoints |
| FR-API-05 | Implement API security dan authentication |
| FR-API-06 | Publish technical API documentation (OpenAPI 3.0) untuk third-party integration |

## 11.10 User Interface (FR-UI)

| ID | Requirement |
|----|-------------|
| FR-UI-01 | Provide Web Application accessible via browser |
| FR-UI-02 | Provide Web Mobile Interface optimized untuk mobile devices, enable field access |
| FR-UI-03 | Apply Responsive Design ensuring consistency across devices |
| FR-UI-04 | Provide multilingual support (Bahasa Indonesia primary; English translations) |
| FR-UI-05 | Provide tutorials dan guides untuk non-technical users |
| FR-UI-06 | Provide role-based dashboards aligned dengan institutional mandates |

## 11.11 RDTR Integration (FR-RDTR)

| ID | Requirement |
|----|-------------|
| FR-RDTR-01 | Integrate data/information/maps results ke preparation RDTR (TOR Annex 1, D7, D10, D13, D20) |
| FR-RDTR-02 | Compatible dengan planning frameworks Indonesia (RPJMN, RPJMD, RDTR) |
| FR-RDTR-03 | Produce climate risk evaluation reports sebagai inputs RDTR preparation |

## 11.12 GeoVertix Integration Requirements (FR-GVX)

These FR govern integration boundary BIGCA ↔ GeoVertix (complement §17.4 Integration Patterns dan §17.5 Foundation Integration).

| ID | Requirement |
|----|-------------|
| FR-GVX-01 | SDSS shall **authenticate** terhadap GeoVertix menggunakan JWT via `POST /api/v1/auth/login` dan refresh tokens otomatis sebelum expiry. Service account credentials via secret-management (§18.1) |
| FR-GVX-02 | SDSS shall **invoke** GeoVertix containerized plugins via Plugin Runtime API (`POST /api/v1/plugins/{name}/run`) dengan standardized request/response, configurable timeout, retry, circuit-breaker (§12.3) |
| FR-GVX-03 | SDSS shall **consume** GeoVertix OGC services (WMS 1.3.0, WFS 2.0, WCS 2.0, MVT Tiles, OGC API REST, STAC) — tidak reimplementing OGC server |
| FR-GVX-04 | SDSS shall handle **long-running** GeoVertix operations via Tasks API + SSE streaming untuk progress |
| FR-GVX-05 | SDSS shall use GeoVertix Layers API, Styles API, Import API untuk layer registration, styling, bulk ingestion when appropriate |
| FR-GVX-06 | SDSS shall implement **contract test suite** terhadap GeoVertix endpoints, di CI, untuk deteksi breaking changes pre-deployment |
| FR-GVX-07 | SDSS shall implement **fallback behavior** untuk setiap GeoVertix integration: cached, native fallback, atau clear error per §12.3. Fallback policy didokumentasikan per fitur |
| FR-GVX-08 | SDSS shall **version-pin** GeoVertix API contract per SDSS release, publish deprecation notice ≥ 30 hari pre-adoption baru |
| FR-GVX-09 | SDSS shall **NOT** modify GeoVertix internal data structures, plugin internals, atau config langsung; semua interaksi via published APIs |
| FR-GVX-10 | SDSS shall **log** semua GeoVertix API calls (correlation IDs, latency, status, retry count) untuk observability dan audit |

## 11.13 Plugin Architecture Requirements (FR-PLG) **(v2.0 — NEW)**

These FR govern plugin architecture BIGCA itself.

| ID | Requirement |
|----|-------------|
| FR-PLG-01 | Setiap fitur besar (sebagaimana dipetakan di §20 Plugin Catalog) WAJIB dikemas sebagai BIGCA Plugin terpisah dengan manifest `plugin.json` |
| FR-PLG-02 | Setiap plugin WAJIB di-deploy sebagai container Docker terisolasi dengan port unik di range 9300-9399 |
| FR-PLG-03 | Setiap plugin WAJIB expose `/health`, `/ready`, `/metrics`, `/info` endpoints |
| FR-PLG-04 | Setiap plugin WAJIB handshake dengan BIGCA Dispatcher saat startup (POST `/dispatcher/plugins/register`) |
| FR-PLG-05 | Setiap plugin WAJIB declare capabilities (db, fs, net, plugin_call, geovertix_call, s3, cache, kafka) dengan format `resource:action:scope` |
| FR-PLG-06 | Setiap plugin WAJIB di-version independen menggunakan semver (MAJOR.MINOR.PATCH) |
| FR-PLG-07 | Setiap plugin WAJIB publish OpenAPI 3.0 spec di `openapi.yaml` yang sinkron dengan kode |
| FR-PLG-08 | Setiap plugin WAJIB punya `locales/en.json` + `locales/id.json` |
| FR-PLG-09 | Setiap plugin WAJIB punya contract tests di `tests/contract/` yang dijalankan di CI |
| FR-PLG-10 | Plugin signing (`plugin.json.sig`) WAJIB untuk production deploy mulai Y2; admission controller K8s reject unsigned di production |
| FR-PLG-11 | BIGCA Dispatcher WAJIB enforce capability boundary — reject request yang melebihi declared scope dengan 403 |
| FR-PLG-12 | BIGCA Dispatcher WAJIB poll `/health` setiap 30 detik dan de-register plugin yang fail 3 consecutive polls |
| FR-PLG-13 | Plugin WAJIB log structured JSON (stdout) yang dapat di-parse Loki/Grafana |
| FR-PLG-14 | Plugin WAJIB expose Prometheus metrics di `/metrics` |
| FR-PLG-15 | Plugin WAJIB propagate OpenTelemetry trace headers untuk distributed tracing |
| FR-PLG-16 | Plugin frontend (jika ada) WAJIB di-bundle sebagai Module Federation remote dengan exposes `./Routes` |
| FR-PLG-17 | Plugin database access WAJIB di-batasi ke schema sendiri (`bcp_<name>`) untuk write; read schema lain hanya jika di-declare capability |
| FR-PLG-18 | Cross-plugin call WAJIB via BIGCA Dispatcher dengan capability declaration `plugin_call:target:<name>` |
| FR-PLG-19 | Plugin GeoVertix call WAJIB via GeoVertix Bridge Adapter (Main App) atau direct dengan capability `geovertix_call:plugin:<name>` |
| FR-PLG-20 | Plugin marketplace internal (BIGCA Plugin Registry) WAJIB tracking semua plugin, versi, owner, signature, deployment status |

## 11.14 Data Governance (FR-DG)

| ID | Requirement |
|----|-------------|
| FR-DG-01 | Align data governance dengan One Map Policy (Perpres 9/2016 jo. Perpres 23/2021) |
| FR-DG-02 | Align dengan Perka BIG No. 16/2023 tentang Wali Data IGT |
| FR-DG-03 | Implement data-sharing protocols antara BIG, ATR/BPN, BMKG, BNPB, KLH, Kemenhut, swasta, akademik |
| FR-DG-04 | Maintain version control dan lineage tracking untuk semua datasets |
| FR-DG-05 | Implement RBAC selaras struktur organisasi climate stakeholders |
| FR-DG-06 | Implement data lifecycle management (hot/warm/cold tiers) |
| FR-DG-07 | Include automated change detection untuk fitur lingkungan kritikal |
| FR-DG-08 | Publish standardized metadata management selaras national standards |

---

# 12. Non-Functional Requirements

## 12.1 Performance (NFR-PERF)

| ID | Requirement |
|----|-------------|
| NFR-PERF-01 | Support **≥ 500 concurrent users** saat disaster events (TOR Annex 6 §1.2.3) |
| NFR-PERF-02 | Achieve **sub-second response** untuk common map operations |
| NFR-PERF-03 | Implement caching strategies untuk frequently accessed climate datasets dan base layers |
| NFR-PERF-04 | Implement load balancing untuk peak usage saat extreme climate events |
| NFR-PERF-05 | Implement data partitioning untuk efficient handling time-series climate data |
| NFR-PERF-06 | Implement distributed processing untuk large-scale computations |
| NFR-PERF-07 | Implement automated scaling mechanisms untuk peak usage periods |

## 12.2 Scalability (NFR-SCAL)

| ID | Requirement |
|----|-------------|
| NFR-SCAL-01 | Scale untuk increasing data volumes dan user counts as adoption grows |
| NFR-SCAL-02 | Use containerized deployment (Docker) dengan orchestration (Kubernetes) untuk dynamic scaling |
| NFR-SCAL-03 | Implement microservices architecture untuk modular dan scalable SDSS components |
| NFR-SCAL-04 | Employ event-driven architecture (Kafka) untuk real-time data processing |

## 12.3 Availability & Reliability (NFR-AVAIL)

| ID | Requirement |
|----|-------------|
| NFR-AVAIL-01 | Ensure high uptime via routine maintenance |
| NFR-AVAIL-02 | Implement predictive maintenance systems |
| NFR-AVAIL-03 | Implement automated health-checking procedures |
| NFR-AVAIL-04 | Maintain disaster-recovery procedures untuk critical climate datasets |
| NFR-AVAIL-05 | Maintain business continuity plans untuk critical systems |
| NFR-AVAIL-06 | Circuit breaker pattern untuk semua external dependencies (GeoVertix, BMKG, BNPB APIs) |
| NFR-AVAIL-07 | Graceful degradation strategy per fitur (cache fallback, native fallback, atau clear error) |

## 12.4 Security & Compliance (NFR-SEC)

Per TOR Annex 6 §1.2.3 item 3:

| ID | Requirement |
|----|-------------|
| NFR-SEC-01 | Implement **end-to-end encryption** untuk data in transit dan at rest |
| NFR-SEC-02 | Implement **RBAC** dengan principle of least privilege |
| NFR-SEC-03 | Comply dengan **PP 71/2019** Electronic Systems dan **UU PDP** |
| NFR-SEC-04 | Undergo regular security assessments dan penetration testing |
| NFR-SEC-05 | Implement zero-trust security architecture |
| NFR-SEC-06 | Maintain security incident-response procedures |
| NFR-SEC-07 | Implement data anonymization untuk sensitive socio-economic information |
| NFR-SEC-08 | Respect Indonesia data sovereignty while enabling appropriate sharing lintas agencies |

## 12.5 Interoperability (NFR-INTOP)

| ID | Requirement |
|----|-------------|
| NFR-INTOP-01 | Semua geospatial layers adhere ke **OGC standards** (WMS, WFS, WCS, GeoTIFF, NetCDF) |
| NFR-INTOP-02 | Integrate dengan **national geospatial platforms** |
| NFR-INTOP-03 | Integrate dengan **One Map Policy geoportal** |
| NFR-INTOP-04 | Integrate dengan **BNPB InaSAFE dan InaRISK** |
| NFR-INTOP-05 | Integrate dengan **BMKG climate projection services** |
| NFR-INTOP-06 | Integrate dengan **KLHK SIGN-SMART dan forest monitoring** |
| NFR-INTOP-07 | Integrate dengan **BPS socio-economic data services** |
| NFR-INTOP-08 | Implement standardized data-sharing agreements dengan government dan private entities |

## 12.6 Accessibility & Usability (NFR-USAB)

Per TOR Annex 6 §1.3.a item 3:

| ID | Requirement |
|----|-------------|
| NFR-USAB-01 | Implement **responsive web design** supporting various devices dan bandwidth |
| NFR-USAB-02 | Provide **multi-language support** (Bahasa Indonesia primary, English) |
| NFR-USAB-03 | Provide **offline-capable functionality** untuk field use di area konektivitas terbatas |
| NFR-USAB-04 | Provide **intuitive UI** dengan tutorials dan guides |
| NFR-USAB-05 | Support **Progressive Web Application (PWA)** features untuk offline |
| NFR-USAB-06 | Accessibility testing dilakukan termasuk testing under bandwidth constraints |
| NFR-USAB-07 | Comply dengan **WCAG 2.1 AA** (perceivable, operable, understandable, robust) |

## 12.7 Maintainability (NFR-MAINT)

| ID | Requirement |
|----|-------------|
| NFR-MAINT-01 | Employ **CI/CD pipelines** untuk continuous integration dan deployment |
| NFR-MAINT-02 | Include comprehensive logging dan monitoring |
| NFR-MAINT-03 | Include **automated testing frameworks** |
| NFR-MAINT-04 | Include **technical documentation** untuk system administrators dan future developers |
| NFR-MAINT-05 | Implement automated model retraining schedules berdasarkan data-drift detection |
| NFR-MAINT-06 | Track model versions dan provide rollback capability |

## 12.8 Sustainability & Sovereignty (NFR-SUST)

| ID | Requirement |
|----|-------------|
| NFR-SUST-01 | Service Provider shall define **sustainability strategy** for platform maintenance beyond project timeline |
| NFR-SUST-02 | Platform shall be designed untuk **knowledge transfer** ke institusi Indonesia |
| NFR-SUST-03 | Platform shall prefer **local/open-source LLMs** untuk data sovereignty |
| NFR-SUST-04 | Platform shall comply dengan emerging **national AI governance frameworks** |

## 12.9 Plugin Architecture NFRs (NFR-PLG) **(v2.0 — NEW)**

| ID | Requirement |
|----|-------------|
| NFR-PLG-01 | **Plugin isolation** — plugin crash tidak boleh menjatuhkan Main App atau plugin lain (process boundary, container isolation) |
| NFR-PLG-02 | **Plugin independence** — plugin update tidak boleh memerlukan rebuild Main App |
| NFR-PLG-03 | **Plugin observability** — semua plugin metrics, logs, traces ter-aggregate centralized (Loki, Prometheus, Tempo) |
| NFR-PLG-04 | **Plugin resource limits** — setiap plugin pod K8s memiliki resource requests/limits (CPU, memory) untuk prevent noisy neighbor |
| NFR-PLG-05 | **Plugin auto-recovery** — K8s liveness/readiness probes restart crashed plugin pods otomatis |
| NFR-PLG-06 | **Plugin contract stability** — breaking change ke plugin API memerlukan deprecation notice ≥ 30 hari + major version bump |
| NFR-PLG-07 | **Dispatcher availability** — Dispatcher ≥ 99.9% uptime (non-disaster), ≥ 99.99% disaster window |
| NFR-PLG-08 | **Plugin signing verification** — production admission controller verify signature setiap plugin deploy |
| NFR-PLG-09 | **Plugin telemetry budget** — overhead observability per request ≤ 10ms p95 |
| NFR-PLG-10 | **Plugin cold start** — handshake-to-ready ≤ 30 detik post-pod-creation |

---

# 13. Data Requirements & Governance

## 13.1 Data Source Categories (TOR Annex 6 §1.2.2)

Platform ingest, process, dan serve tiga kategori sumber data:

**S1 — Government Data Sources:** IG dari BIG (Base Maps, RBI), Kemendagri (batas administratif), KLH/Kemenhut (tutupan lahan, hutan, emisi), BPS (sensus, sosek), ATR/BPN (kadastral, RTRW), BMKG (iklim), BNPB (bencana), BRIN (riset).

**S2 — Private and Open Data Sources:** Korporasi, NGO, institusi riset; mencakup land use, emisi karbon, biodiversitas.

**S3 — IoT and Satellite Imagery:** Real-time sensors (soil moisture, temperature, rainfall, air quality, industrial emissions) dan multi/hyper-temporal satellite imagery (Landsat, Sentinel, MODIS, dll.).

## 13.2 Mandatory Data Layers (TOR §6.a)

Platform shall incorporate, at minimum, layer-layer berikut (tidak terbatas pada):

**Baseline geospatial layers:**
- Batas administratif (BIG, Kemendagri)
- Tutupan lahan (KLH, Kemenhut)
- Model terrain (BIG)

**Climate hazard layers:**
- Zona risiko banjir (BMKG, BNPB)
- Area rawan kekeringan (BMKG, BNPB, BRIN)
- Peta erosi pesisir (BMKG, BNPB, BRIN)

**GHG emissions layers:**
- Emisi industri (KLH)
- Tren deforestasi (KLH, Kemenhut)
- Potensi sekuestrasi karbon (KLH, Kemenhut, UNFCCC)

## 13.3 Data Standards

- **OGC standards**: WMS, WFS, WCS untuk service delivery; GeoTIFF, NetCDF untuk format
- **Metadata**: ISO 19115 selaras One Data initiative Indonesia
- **Quality**: ISO 19157 geographic data quality principles
- **FAIR**: Findable, Accessible, Interoperable, Reusable
- **Climate-domain formats**: NetCDF, GRIB
- **Geospatial reference systems**: SRGI 2013 Indonesia (selain ITRF, WGS84 untuk kompatibilitas)

## 13.4 Data Governance Framework

(Lihat FR-DG-01..08 di §11.14)

## 13.5 Validation Datasets

Models validated terhadap:
- Historical data (hindcasting terhadap observasi dekade lalu, TOR Annex 6 §2.1.4)
- Internationally reputable journals dan established standards
- Field data — verification dan field validation **2x per lokasi per fase**, **tim 5 orang**, **5 hari per round**, dengan budget on-site allowance, akomodasi, transportasi, kendaraan (TOR Annex 6 §2.1.4)

---

# 14. Analytical Models & Thematic Toolboxes

Bagian ini mengonsolidasikan analytical models dari TOR §Annex 6 §1.2.2 dan §1.3.b. Implementasi setiap model di-pecah ke dalam plugin BIGCA tersendiri (lihat §20 Plugin Catalog).

## 14.1 Containerization & Communication

Semua toolbox/model WAJIB **containerized** untuk better management libraries dan dependencies (TOR Annex 6 §1.2.2 item 3). Setiap toolbox memiliki **defined input, output, parameters** yang readable oleh **MCP** untuk bridge ke LLM AI.

Dalam arsitektur plugin BIGCA:
- Setiap thematic toolbox = 1 plugin BIGCA (atau sub-module dari plugin compound)
- Plugin manifest deklarasikan operation dengan input/output schema (JSON Schema)
- MCP server (plugin `bcp-mcp`) meng-aggregate manifest semua plugin → expose ke LLM sebagai tools

## 14.2 Advanced Climate Modeling

| Sub-requirement | Description |
|-----------------|-------------|
| Integrasi BMKG | Leverage BMKG regional climate models (RegCM, WRF downscaling) untuk variabel local (rainfall, temperature, wind) |
| Ensemble approaches | Multi-model ensemble CMIP6 + CORDEX-SEA; bias correction; model-skill weighting |
| Local microclimates | Adapt outputs menggunakan Local Climate Zone (LCZ) concept; microclimatic variability di archipelagic/mountainous regions; urban heat island, sea breezes, land-cover heterogeneity untuk city-/district-level planning |

**Plugin**: `bcp-climate-advanced` (extend GeoVertix `gxp-climate`, integration pattern B)

## 14.3 Change Detection of LULC

| Sub-requirement | Description |
|-----------------|-------------|
| Multi-temporal satellite | Detect spatio-temporal trends (forest loss, urban expansion, wetland degradation) |
| ML classification | Random Forest, SVM, deep learning CNN untuk improve akurasi |
| Linkage ke ecosystem/carbon | Quantify dampak ke carbon storage, water regulation, biodiversity; support REDD+ |

**Plugin**: `bcp-lulc-change` (hybrid pattern C — orchestrate gxp-inference + gxp-ml + gxp-qgis)

## 14.4 Net Carbon Footprint Monitoring

| Sub-requirement | Description |
|-----------------|-------------|
| Sector-wide carbon accounting | Energi, transport, agriculture, forestry, industry; aligned NDC |
| AI-powered emission estimation | AI dengan proxy data (nighttime lights, NO₂, vehicle counts) |
| Geospatial viz & decision support | Interactive dashboards untuk spatial-temporal viz, scenario analysis, carbon-neutrality |

**Plugin**: `bcp-carbon` (pattern D — build native + leverage GeoVertix raster/inference)

## 14.5 Biodiversity Mapping

| Sub-requirement | Description |
|-----------------|-------------|
| Species distribution modeling | Ecological niche modeling current+future scenarios |
| High-resolution habitat mapping | UAV, high-resolution satellites, deep learning untuk protected area management |
| Citizen science integration | Validate models dengan community-based monitoring |

**Plugin**: `bcp-biodiversity` (pattern D)

## 14.6 Sea Level Rise & Land Subsidence

| Sub-requirement | Description |
|-----------------|-------------|
| Satellite altimetry + tide-gauge fusion | Monitor regional SLR |
| InSAR + GNSS | Detect/measure subsidence kota pesisir, delta, peat |
| Coastal vulnerability assessment | Multi-criteria models combining SLR+subsidence+population+infrastructure |

**Plugin**: `bcp-slr-subsidence` (pattern D — leverage gxp-lidar, gxp-3dtiles, gxp-climate)

## 14.7 Flood & Drought Modeling

| Sub-requirement | Description |
|-----------------|-------------|
| Climate-informed hydrological modeling | SWAT, VIC, HEC-HMS dengan downscaled rainfall |
| AI + remote sensing untuk early warning | Improved lead time dan spatial precision |
| Integrated flood-drought risk mapping | Composite hazard × exposure × vulnerability |

**Plugin**: `bcp-flood-drought` (pattern D — leverage gxp-climate, gxp-lidar, gxp-ml, gxp-qgis)

## 14.8 Integrated Analytical Process Modules

Per TOR Annex 6 §1.3.b item 2:

- **Enhanced Vulnerability Assessment** — multi-criteria + system-dynamic temporal modeling
- **Specialized Analysis Modules**:
  - Rice field drought/flood impact (food security)
  - Coastal vulnerability assessment
  - Forest fire risk prediction (ENSO patterns)
  - Optimization of Renewable Energy Deployment
  - Tourism sector vulnerability assessment

Per plugin di §20:
- `bcp-vuln-mcda` (FITUR 3.1, pattern A — direct reuse gxp-mcda)
- `bcp-vuln-dynamic` (FITUR 3.2, pattern E — pure native)
- `bcp-rdtr` (FITUR 4.1, pattern C — orchestrate)
- `bcp-food-security` (FITUR 4.2, pattern C)
- `bcp-coastal` (FITUR 4.3, pattern A)
- `bcp-fire-enso` (FITUR 4.4, pattern B)
- `bcp-tourism` (FITUR 4.5, pattern B)
- `bcp-renewable-energy` (FITUR 4.6, pattern A)
- `bcp-carrying-capacity` (FITUR 4.7, pattern B)

## 14.9 AI-Driven Analytical Capabilities (TOR §Annex 6 §1.3.d)

Beyond thematic models, Platform shall provide:

- Predictive Modeling untuk future climate scenarios
- Scenario-Based Analysis simulating interventions
- Natural Language Processing untuk geospatial queries
- Image and Pattern Recognition untuk satellite/drone footage
- Anomaly Detection dan Early Warning Systems
- Land Cover/Land Use Change Analysis
- Carbon Footprint Monitoring
- Biodiversity Mapping dan Conservation
- Sea Level Rise dan Land Subsidence Analysis
- Flood Modeling dan Risk Assessment
- Land Carrying Capacity Analysis (dengan SHAP XAI)
- Support Analysis for Spatial Planning
- Optimization of Renewable Energy

## 14.10 GeoVertix Plugin Reuse Map per Analytical Model

Setiap analytical model menggunakan plugin GeoVertix sesuai pemetaan berikut (authoritative mapping di `GeoVertix_SDSS_Reuse_Analysis_v3.xlsx` Sheet 4):

| Analytical Model | GeoVertix Reuse | Native Extension (BIGCA Plugin) |
|------------------|-----------------|----------------------------------|
| Advanced Climate Modeling | gxp-climate (Raster, STAC, ensemble), gxp-qgis (terrain), gxp-ml (downscaling scripts) | `bcp-climate-advanced`: BMKG bias correction, LCZ adaptation, ensemble weighting, multi-scenario orchestration |
| LULC Change Detection | gxp-inference (lulc-unet ONNX), gxp-ml (classify_landuse), gxp-qgis, gxp-geoprocess | `bcp-lulc-change`: SNI 20-class, S1-SAR pipeline, CCDC/BFAST, CA-Markov, phenology TIMESAT |
| Net Carbon Footprint | gxp-climate (TROPOMI/VIIRS ingest), gxp-ml (XGBoost), gxp-inference, gxp-areainfo | `bcp-carbon`: IPCC Tier-1/2/3 DB, sector handlers, NDC tracker, MACC, scenario simulator |
| Biodiversity Mapping | gxp-ml (cluster, interpolate), gxp-inference (yolov8-buildings), gxp-qgis (KDE) | `bcp-biodiversity`: MaxEnt+ensemble SDM, Circuitscape, climate envelope, Citizen Science portal |
| SLR & Subsidence | gxp-lidar (LiDAR DEM, 3D), gxp-3dtiles, gxp-climate (altimetry), gxp-inference | `bcp-slr-subsidence`: PS-InSAR + SBAS-InSAR (MintPy/SNAPHU/GACOS), GNSS calibration, shoreline DSAS, RSL projection, CVI |
| Flood & Drought | gxp-climate (SPI/SPEI), gxp-lidar (DEM), gxp-ml (ConvLSTM), gxp-qgis, gxp-geoprocess | `bcp-flood-drought`: HEC-RAS 2D wrapper, SWAT, VIC, SWMM, ConvLSTM nowcast, real-time alert |
| Vulnerability MCDA | gxp-mcda (AHP/Entropy/WSM/WPM/TOPSIS/sensitivity/cache) | `bcp-vuln-mcda`: indicator pipeline 7 dimensi, decomposition UI, bootstrap CI, climate metadata |
| Coastal Vulnerability | gxp-mcda, gxp-geoprocess, gxp-qgis | `bcp-coastal`: 1km segmentation, CVI USGS, ERI ecological scoring, adaptation lookup |
| Forest Fire (ENSO) | gxp-climate (ENSO), gxp-ml (LightGBM), gxp-qgis (NDMI) | `bcp-fire-enso`: FWI Canadian + FWI-PEAT, training, HYSPLIT smoke, KLHK SIPONGI |
| Renewable Energy | gxp-mcda, gxp-qgis, gxp-climate, gxp-ml | `bcp-renewable-energy`: MILP OR-Tools, LCOE per teknologi, wind power curve, PLN grid |
| Tourism Vulnerability | gxp-climate, gxp-mcda, gxp-areainfo, gxp-qgis | `bcp-tourism`: TCI/HCI formula, NOAA coral DHW, destination DB |
| Carrying Capacity | gxp-ml (XGBoost), gxp-qgis (distance transforms), gxp-mcda | `bcp-carrying-capacity`: SHAP service, spatial CNN, limiting factor logic, H3 hexagon viz |

---

# 15. SDSS Requirements

Per TOR Annex 6 §1.3.c.

## 15.1 Functional Capabilities (FR-SDSS extended)

| ID | Requirement |
|----|-------------|
| FR-SDSS-10 | SDSS shall offer user-friendly interface dengan planning scenarios, impact analysis, customizable adaptation recommendations |
| FR-SDSS-11 | SDSS shall provide comprehensive guides dan technical support |
| FR-SDSS-12 | SDSS shall include decision-making algorithms generating recommendations dari data analysis |
| FR-SDSS-13 | SDSS shall include simulation tools untuk evaluasi scenarios dan select optimal action |
| FR-SDSS-14 | SDSS shall integrate predictive dan prescriptive models dengan evaluation functions |
| FR-SDSS-15 | SDSS shall provide interactive dan iterative analyses dengan continuous refinement |
| FR-SDSS-16 | SDSS shall provide dynamic visualizations untuk intuitive understanding |
| FR-SDSS-17 | SDSS shall integrate stakeholder preferences dan leverage expert knowledge |
| FR-SDSS-18 | SDSS shall support decision-making individual dan group settings |
| FR-SDSS-19 | SDSS shall ensure information relevan, timely, actionable |
| FR-SDSS-20 | SDSS shall be flexible untuk adapt ke changes in requirements |

## 15.2 Multi-Level Decision Support Architecture (TOR §1.3.c item 1)

| ID | Requirement |
|----|-------------|
| FR-SDSS-21 | Customized interfaces untuk governance levels (national, provincial, district) |
| FR-SDSS-22 | Role-specific dashboards aligned institutional mandates |
| FR-SDSS-23 | Integrate dengan planning frameworks Indonesia (RPJMN, RPJMD, RDTR) |
| FR-SDSS-24 | Compatible dengan decision-making workflows existing di K/L |

**Plugin**: `bcp-sdss-multilevel` (FITUR 5.1, pattern D)

## 15.3 Collaborative Decision-Making (TOR §1.3.c item 2)

| ID | Requirement |
|----|-------------|
| FR-SDSS-25 | Provide structured multi-stakeholder consultation workflows |
| FR-SDSS-26 | Provide interactive scenario comparison tools untuk group decision |
| FR-SDSS-27 | Provide comment dan annotation capabilities untuk collaborative analysis |

**Plugins**: 
- `bcp-collab-consultation` (FITUR 7.1, pattern E)
- `bcp-collab-annotation` (FITUR 7.2, pattern D — extend gxp-mapeditor)
- `bcp-collab-compare` (FITUR 7.3, pattern B)
- `bcp-sdss-group-decision` (FITUR 5.7, pattern E)

## 15.4 Context-Aware Recommendation Engine (TOR §1.3.c item 3)

| ID | Requirement |
|----|-------------|
| FR-SDSS-28 | Generate policy-compliant recommendations aligned legal frameworks Indonesia |
| FR-SDSS-29 | Provide implementation feasibility scoring berdasarkan local capacity |
| FR-SDSS-30 | Provide temporal sequencing of adaptation actions |
| FR-SDSS-31 | Perform cross-sectoral impact analysis identify synergies/conflicts |

**Plugin**: `bcp-sdss-context-aware` (FITUR 5.6, pattern D — leverage gxp-geoai RAG)

## 15.5 SDSS Plugin Composition

Total 10 plugin SDSS Core (FITUR 5.1-5.10):

| FITUR | Plugin | Pattern | Reuse % |
|-------|--------|---------|---------|
| 5.1 Multi-Level Decision Support | `bcp-sdss-multilevel` | D | 15% |
| 5.2 Scenario Manager | `bcp-sdss-scenario` | E | 10% |
| 5.3 Impact Analysis Engine | `bcp-sdss-impact` | D (leverage gxp-geoai chain) | 30% |
| 5.4 Adaptation Recommendation | `bcp-sdss-adaptation` | E | 10% |
| 5.5 MCDA Engine | `bcp-sdss-mcda` | **A (direct reuse gxp-mcda)** | 90% |
| 5.6 Context-Aware Recommendation | `bcp-sdss-context-aware` | D | 30% |
| 5.7 Group Decision-Making | `bcp-sdss-group-decision` | E | 30% |
| 5.8 What-If Simulator | `bcp-sdss-whatif` | A (extend gxp-mcda) | 50% |
| 5.9 Sensitivity & Uncertainty | `bcp-sdss-sensitivity` | **A (direct reuse gxp-mcda Sobol+OAT)** | 85% |
| 5.10 Optimization Solver | `bcp-sdss-optimization` | E | 40% |

---

# 16. AI/ML Requirements

## 16.1 AI Development Framework (TOR §1.3.d item 1)

| ID | Requirement |
|----|-------------|
| FR-AI-10 | AI capabilities dikembangkan via **phased approach**: Foundation (base models), Enhancement (ensemble combining climate + socioecon) |
| FR-AI-11 | Employ **transfer learning** untuk adapt global models ke konteks Indonesia |
| FR-AI-12 | Employ **hybrid modeling** combining physics-based + data-driven |
| FR-AI-13 | Semua AI models undergo rigorous validation: (a) cross-validation; (b) expert review; (c) field testing di pilot provinsi sebelum national deployment |

## 16.2 AI Ethics & Governance (TOR §1.3.d item 2)

| ID | Requirement |
|----|-------------|
| FR-AI-20 | Implement **transparent AI decision-making** dengan explainable AI |
| FR-AI-21 | Implement **bias detection dan mitigation** untuk equitable recommendations |
| FR-AI-22 | Implement **human-in-the-loop verification** untuk high-stakes decisions |
| FR-AI-23 | Comply dengan emerging national AI governance frameworks |
| FR-AI-24 | Implement uncertainty quantification dalam ML models untuk climate predictions |

## 16.3 AI Performance Optimization (TOR §1.3.d item 3)

| ID | Requirement |
|----|-------------|
| FR-AI-30 | Implement **automated model retraining** berdasarkan data-drift detection |
| FR-AI-31 | Use **model compression** untuk deployment device terbatas |
| FR-AI-32 | Use **ensemble methods** untuk improved accuracy + reduced uncertainty |
| FR-AI-33 | Implement **federated learning** approaches untuk maintain data privacy |

## 16.4 LLM, RAG, MCP

| ID | Requirement |
|----|-------------|
| FR-AI-40 | Integrate **local/open-source LLMs** (Llama, Phi, Deepseek) on Ollama-like server |
| FR-AI-41 | Implement **RAG** backed by Knowledge Base / Definition Rules untuk ground LLM responses |
| FR-AI-42 | Bridge toolboxes/models ke LLM AI via **MCP** untuk communicate input, output, parameters |
| FR-AI-43 | Enable natural-language geospatial queries (illustrative dari TOR) |
| FR-AI-44 | Log semua AI interactions untuk auditability dan continuous improvement |

## 16.5 MLOps & Maintenance

| ID | Requirement |
|----|-------------|
| FR-AI-50 | Implement **MLOps practices** — deployment, monitoring, versioning, lifecycle |
| FR-AI-51 | Implement **automated model drift detection** |
| FR-AI-52 | Implement **performance dashboards** untuk model monitoring |
| FR-AI-53 | Implement **A/B testing** untuk model comparison |
| FR-AI-54 | Implement **cross-validation** strategies untuk spatial models |
| FR-AI-55 | Implement **automated model deployment pipelines** |

## 16.6 AI/ML Plugin Composition

Total 9 plugin AI Layer (FITUR 6.1-6.9):

| FITUR | Plugin | Pattern | Reuse % |
|-------|--------|---------|---------|
| 6.1 Image & Pattern Recognition | `bcp-ai-image-recog` | A+B (gxp-inference + train custom) | 70% |
| 6.2 Anomaly Detection & EWS | `bcp-ai-anomaly` | D (build + leverage) | 35% |
| 6.3 Predictive Modeling | `bcp-ai-predictive` | B (extend gxp-ml) | 65% |
| 6.4 Scenario-Based Analysis | `bcp-ai-scenario` | D | 30% |
| 6.5 Natural Language Query | `bcp-ai-nlq` | **A (direct reuse gxp-geoai)** | 80% |
| 6.6 RAG Pipeline & KB | `bcp-ai-rag` | B (extend gxp-geoai + Qdrant) | 50% |
| 6.7 MCP Server | `bcp-mcp` | B (extend gxp-geoai function calling) | 75% |
| 6.8 Federated Learning | `bcp-ai-federated` | E (pure native, Flower/PySyft) | 10% |
| 6.9 Explainable AI (XAI) | `bcp-ai-xai` | D (extend gxp-ml + SHAP service) | 30% |

---

# 17. Integration Requirements (National Systems & GeoVertix)

## 17.1 Mandatory Integration Targets (TOR §Annex 6 §1.2.3 item 6)

| Code | System | Owner | Purpose |
|------|--------|-------|---------|
| INT-01 | One Map Policy Geoportal | BIG | Consistent base mapping, IGD/IGT alignment |
| INT-02 | InaSAFE | BNPB | Disaster management coordination |
| INT-03 | InaRISK | BNPB | Disaster risk assessment |
| INT-04 | Climate Projection Services | BMKG | Climate variables, projections, downscaled datasets |
| INT-05 | SIGN-SMART + forest monitoring | KLHK | Forest, land cover, emissions monitoring |
| INT-06 | Socio-economic services | BPS | Population, economic, social indicators |

**Plugins implementing INT-01..06:**
- `bcp-int-onemap` (FITUR 13.1)
- `bcp-int-bnpb` (FITUR 13.2 — InaRISK/InaSAFE)
- `bcp-int-bmkg` (FITUR 13.3)
- `bcp-int-klhk` (FITUR 13.4 — SIGN-SMART, SIPONGI)
- `bcp-int-bps` (FITUR 13.5)

## 17.2 Data Exchange Requirements (TOR §Annex 6 §1.2.3 item 2)

| ID | Requirement |
|----|-------------|
| INT-EX-01 | Standardized APIs supporting OGC (WMS/WFS/WCS) dan REST/GraphQL |
| INT-EX-02 | ISO 19115 metadata aligned One Data Indonesia |
| INT-EX-03 | Automated data validation dengan quality thresholds + lineage tracking |
| INT-EX-04 | Standardized data-sharing agreements |

## 17.3 Authentication & Federated Access

| ID | Requirement |
|----|-------------|
| INT-AUTH-01 | Integrate dengan national authentication systems untuk federated access |
| INT-AUTH-02 | Implement RBAC aligned organizational structures |

## 17.4 Integration Patterns dengan GeoVertix

Untuk setiap fitur, Service Provider klasifikasikan integration approach ke salah satu 5 pattern (lihat Katalog Fitur v2.2 untuk per-fitur assignment):

| Pattern | Description | When | Example |
|---------|-------------|------|---------|
| **A. Direct API Reuse** | Capability ~100% di GeoVertix; SDSS wrap UI + call API | Plugin/endpoint sudah produce exact output | FITUR 5.5 MCDA, 5.9 Sensitivity, 8.4 Custom Report Builder |
| **B. API + SDSS Extension** | Core capability exists; SDSS extend native untuk gap | GeoVertix cover ~50-80%, sisanya climate-specific | FITUR 2.1 Climate, 4.7 Carrying Capacity, 6.5 LLM |
| **C. Multi-Plugin Orchestration** | SDSS chain multiple GeoVertix endpoints | Composite, beberapa plugin together | FITUR 4.1 RDTR, 8.1 Map Advanced, 2.6 Flood |
| **D. Build Native with GeoVertix Support** | Built mainly SDSS; GeoVertix untuk ancillary (rendering, storage, OGC) | Climate-specific intelligence; ancillary only | FITUR 2.3 Carbon, 2.4 Biodiversity, 2.5 SLR |
| **E. Pure Native SDSS** | No GeoVertix equivalent | Tidak align GeoVertix surface | FITUR 3.2 Dynamic Vuln SD, 6.8 Federated, 7.1 Workflow |

**Pattern selection criteria** (apply in order; first match wins):
1. GeoVertix plugin/endpoint produce required output ≥ 80% match? → **A**
2. GeoVertix cover ≥ 50% requirement dengan clear extensibility gap? → **B**
3. Composable dari 2+ GeoVertix endpoints? → **C**
4. GeoVertix needed only untuk ancillary services? → **D**
5. Otherwise → **E**

**Cross-cutting concerns** untuk pattern A-D:

- **Latency**: Cross-app API calls ~10-50ms overhead. Mitigasi: caching aggressive, batching, async/streaming (Tasks API + SSE)
- **Coupling**: SDSS bergantung GeoVertix uptime. Mitigasi: circuit breaker (FR-GVX-02), fallback (FR-GVX-07), SLA (§17.5)
- **Versioning**: GeoVertix upgrade bisa break. Mitigasi: contract testing (FR-GVX-06), pinned versions (FR-GVX-08), advance deprecation notices
- **Licensing**: SDSS sebagai API consumer perlu terms agreed sebelum production

## 17.5 GeoVertix Foundation Integration

Distinguishes from §17.1 (national systems): GeoVertix adalah **technical platform foundation**, sedangkan §17.1 adalah **upstream/downstream data peers**. Keduanya wajib.

| Code | Surface | Endpoint/Service | Purpose |
|------|---------|------------------|---------|
| GVX-01 | Authentication | `POST /api/v1/auth/login` + JWT refresh | SDSS user/service auth |
| GVX-02 | Plugin Runtime | `POST /api/v1/plugins/{name}/run` | Invoke containerized plugins (primary vector) |
| GVX-03 | OGC WMS 1.3.0 | `/geoserver/wms` | Map image rendering |
| GVX-04 | OGC WFS 2.0 | `/geoserver/wfs` | Vector access |
| GVX-05 | OGC WCS 2.0 | `/geoserver/wcs` | Coverage/raster access |
| GVX-06 | MVT Tiles | `/tiles/{layer}/{z}/{x}/{y}.mvt` | Vector tile streaming |
| GVX-07 | OGC API REST | `/ogcapi/...` | Modern OGC API |
| GVX-08 | STAC | `/stac/...` | Satellite imagery catalog |
| GVX-09 | Tasks API + SSE | `GET /api/v1/tasks/{id}/events` | Long-running streaming |
| GVX-10 | Inference API | `POST /api/v1/inference/{model}` | Geo-AI inference |
| GVX-11 | Layers/Styles/Import/Raster | various REST | Data management |

**Service Level Expectations:**

- Uptime ≥ 99.5% (non-disaster)
- Max request rate limits + burst per consumer
- Sync ops < 2s p95; async via Tasks API + SSE progress
- Contract change notice ≥ 30 hari deprecation
- Incident escalation paths + on-call contacts

**Operational Hand-off:** GeoVertix team retains ownership runtime (deployment, scaling, patching, plugin lifecycle). BIGCA team responsible integration code, contract tests, graceful-degradation.

---

# 18. Security, Privacy, Compliance

Platform comply dengan:

- **PP No. 71/2019** tentang Penyelenggaraan Sistem dan Transaksi Elektronik
- **UU PDP** (Pelindungan Data Pribadi)
- **SPBE** (E-Government Standards)
- **One Map Policy** (Perpres 9/2016 jo. Perpres 23/2021)
- **Emerging national AI governance frameworks**
- **NDA**: Service Provider sign NDA upon being selected (TOR §10.f)

## 18.1 Security Controls Summary

| Category | Control |
|----------|---------|
| Encryption | End-to-end encryption (in transit dan at rest) |
| Access | RBAC, principle of least privilege, zero-trust architecture |
| Testing | Regular security assessments dan penetration testing |
| Incident response | Defined procedures dan runbooks |
| Privacy | Data anonymization untuk sensitive socio-economic data |
| Backup | Automated backup dan recovery untuk critical climate datasets |
| Continuity | Business continuity plans untuk critical systems |
| Secret management | HashiCorp Vault atau Sealed Secrets untuk JWT keys, DB passwords, API keys |
| Container security | Image scanning di registry (Harbor), runtime security (Falco opsional) |
| Network security | Service mesh mTLS opsional, NetworkPolicy K8s |

## 18.2 Plugin Security Considerations (v2.0)

| Concern | Mitigation |
|---------|-----------|
| Plugin escalation | Capability scoping enforced di Dispatcher; reject 403 di luar declared scope |
| Untrusted plugin code | Plugin signing mandatory production (Y2+); admission controller reject unsigned |
| Container escape | Run as non-root, read-only root filesystem, seccomp profiles |
| Inter-plugin lateral movement | NetworkPolicy K8s limit pod-to-pod, JWT injection per request |
| Secrets leak | Plugin tidak bisa baca secret di luar declared `fs:read` capability |
| GeoVertix credentials | Service account credentials di Vault, rotated quarterly, never committed |
| Dependency vulnerabilities | Automated dependency scanning (Dependabot, Snyk) per plugin repo |

---

# 19. UI/UX Requirements

Bagian ini mengonsolidasikan keputusan UI/UX dari **Rancangan Halaman Utama Platform v1.0** menjadi bagian dari PRD. Rancangan Halaman Utama tetap sebagai dokumen pendamping dengan detail wireframe; PRD v2.0 menetapkan **requirement level** yang authoritative.

## 19.1 Design Principles (8 Prinsip)

Delapan prinsip berikut memandu setiap keputusan desain. Saat konflik antar prinsip, urutan di bawah ini sebagai tie-breaker:

1. **Map-First & Spatial-First** — Platform geospasial; peta interaktif adalah artefak utama, bukan tambahan
2. **Persona-Aware** — Halaman utama, sidebar, quick actions berubah sesuai persona pengguna
3. **Progressive Disclosure** — Ringkasan high-level dulu, detail on-demand; 1-3 klik dari home ke fitur spesifik
4. **Always-On AI Assistant** — AI accessible dari mana saja via floating launcher (⌘+K / ⌘+I)
5. **Crisis-Mode Resilient** — Crisis Mode auto-trigger via FITUR 6.2; UI ber-override; latency budget khusus < 500ms
6. **Mobile-Responsive & PWA-Ready** — Mobile sebagai first-class citizen, bukan afterthought
7. **GeoVertix-Transparent** — Pengguna tidak perlu tahu integrasi GeoVertix; error di-translate domain-friendly
8. **Bilingual (ID/EN) by Default** — Bahasa Indonesia default; toggle EN tanpa reload

## 19.2 Information Architecture — 10 Modul Navigasi

Berdasarkan analisis 62 fitur dan typical workflow 5 persona, navigation level 1 memiliki **10 modul utama**:

```
Climate Action Platform
│
├── 🏠 Dashboard (Home)
├── 🗺  Map Explorer
├── 🌡  Climate Modeling
├── ⚠   Vulnerability Assessment
├── 🏭 Sectoral Analysis
├── 🧭 Decision Support (SDSS Core)
├── 🤖 AI Assistant (also floating, always-on)
├── 🤝 Collaboration
├── 📊 Reports & Outputs
├── 💾 Data Catalog
└── ⚙   Settings & Admin
```

**Catatan keputusan (mengapa 10 modul, bukan 13 sesuai BAGIAN Katalog):**

| Aspect | Penjelasan |
|--------|------------|
| BAGIAN 9 Platform Services | Dipecah: Auth/Audit → Settings; API & OGC → Settings → Developer; Notifications → bagian global (top bar) |
| BAGIAN 11 Hindcasting & Validation | Digabung ke Climate Modeling (sub-section "Validation"), karena hindcast secara konseptual bagian modeling lifecycle |
| BAGIAN 12 Edge & Mobile PWA | **Infrastruktur transparan**, tidak modul UI tersendiri — fitur mempengaruhi semua modul via responsive design |
| BAGIAN 13 External Integrations | Dipecah: status integrasi → Settings → Integrations; konsumsi data → tersembunyi di Data Catalog |

## 19.3 URL Routing Convention

Platform pakai **client-side routing** (Next.js App Router) dengan URL **bermakna** dan **shareable**.

| Pattern | Example | Purpose |
|---------|---------|---------|
| `/` | `https://climate.big.go.id/` | Landing publik (P5) atau redirect ke `/dashboard` jika logged in |
| `/dashboard` | `/dashboard` | Halaman utama per persona |
| `/map` | `/map` | Map Explorer (full screen) |
| `/map?layers=flood,slr&province=sulsel` | (query string) | Map dengan state preset |
| `/modeling` | `/modeling` | Climate Modeling module landing |
| `/modeling/climate-advanced` | `/modeling/climate-advanced` | Detail FITUR 2.1 |
| `/vulnerability/mcda?province=sulsel` | (query) | Vulnerability MCDA dengan state |
| `/sdss/scenarios/scn-2026-001` | (path param) | Detail scenario tertentu |
| `/ai` | `/ai` | AI Assistant dedicated page |
| `/collab/consultation/cons-042` | (path param) | Consultation session |
| `/reports/exec-summary` | `/reports/exec-summary?province=sulsel&date=2026-05` | Auto-gen exec summary |
| `/data` | `/data` | Data Catalog browse |
| `/data/layer/{layer-id}` | `/data/layer/banjir-sulsel-2024` | Detail layer |
| `/settings/*` | `/settings/profile` | Settings landing |
| `/public/{slug}` | `/public/sulsel-flood-2024` | Public pages (story map / dashboard) |

**Deep linking & shareability:** State penting di-serialize ke URL query (`?province=`, `?from=`, `?to=`, `?scenario=`, `?layers=`).

**Auth-required routes:** Semua kecuali `/`, `/public/*`, `/login`, `/forgot` memerlukan login. Redirect ke `/login?return=<original>` jika unauthenticated.

## 19.4 Sistem Navigasi (8 Komponen Persisten)

Sistem navigasi adalah kerangka yang menampung semua content. Terdiri dari delapan komponen **persisten lintas-halaman**:

### 19.4.1 Top Bar Global

Selalu tampil kecuali Map full-screen (yang punya overlay version).

Wireframe (Desktop):
```
+--------------------------------------------------------------------------+
| [☰] [LOGO]  CLIMATE ACTION  | [🔍 Cari layer, scenario, atau fitur..]   |
|                                                                            |
|     [🌍 Sulawesi Selatan ▾] [📅 2025-2050 ▾] [🎯 SSP2-4.5 ▾]              |
|                                                                            |
|                            [🤖 AI] [🔔 3] [🌐 ID ▾] [👤 Ahmad K. ▾]      |
+--------------------------------------------------------------------------+
```

**Komponen:** Hamburger, Logo, Global Search (⌘K), Context Bar, AI Launcher, Notifications, Language Toggle, User Menu.

**State khusus:**
- Crisis Mode: background kuning→merah dengan banner
- Offline / GeoVertix down: indikator `● GeoVertix Offline (Mode Cache)`
- Maintenance: sticky banner

### 19.4.2 Left Sidebar

**Default state:** expanded (240px) untuk new user; collapsed (56px) state remembered di localStorage.

**Behaviour:**
- Toggle via hamburger `[☰]` atau shortcut `[`
- Active state highlighted (background biru muda + bar kiri biru tua)
- Submenu akordion — hanya satu open at a time
- Mobile: drawer slide-in dari kiri
- **Persona-aware visibility** — item tidak relevan untuk persona disembunyikan, bukan disabled

### 19.4.3 Context Bar (Spatial-Temporal-Scenario Selector)

Inovasi kunci. Menampung **state global** yang dipakai lintas-fitur: lokasi, periode, scenario aktif.

| Selector | Pengaruh |
|----------|----------|
| Province / Region | Map center & extent, default layer, filter list |
| Time Period | Time slider default, data filter, forecast horizon |
| Scenario | Climate dataset, predictions, recommendation engine output |

**State persistence:** persist lintas-halaman dalam satu sesi (Zustand store); reset ke default per persona; di-serialize ke URL untuk deep-linking.

Tidak tampil di: Map Explorer (built-in), Settings, About/Help, Public landing P5.

### 19.4.4 Quick Actions Bar

Persona-aware dan context-aware. Override saat Crisis Mode.

**Varian per persona di Halaman Utama:**

| Persona | Quick Actions |
|---------|---------------|
| P1 Exec | `Briefing Hari Ini` `Bandingkan Skenario` `Lihat Trend` |
| P2 Planner | `Skenario Baru` `Cari Layer` `Buat Report` `Tanya AI` |
| P3 Researcher | `Lanjut Project` `Hindcast Baru` `Download Data` `API Docs` |
| P4 Private | `Site Selection` `Risk Report` `Project Baru` |
| P5 Public | `Peta Banjir` `Cerita Terbaru` `Subscribe Alert` |

**Crisis Mode override:** `[Peta Real-Time] [Hubungi BNPB] [Laporan Krisis] [Refresh Data]`

### 19.4.5 Global Search (Spotlight)

Jalur tercepat untuk apapun.

**Behaviour:**
- Trigger: search box click atau `⌘K`/`Ctrl+K`
- Modal di tengah, backdrop dimmed
- Typeahead, debounce 200ms, fuzzy match
- Kategori: Fitur, Layer, Skenario, Report, Pengguna, Dokumentasi
- Max 3 hasil per kategori; klik header untuk see all
- Keyboard nav full (↑↓ select, Enter open, Tab kategori, Esc close)
- Recent searches (last 5) saat kosong
- Saved searches dapat di-pin

### 19.4.6 AI Assistant Launcher (Floating)

Always-on dari Prinsip 2.4.

- Floating button pojok kanan bawah, persisten lintas-halaman
- Trigger: klik atau `⌘+I`
- Side drawer dari kanan (400px desktop, 100% mobile)
- **Konteks aktif** ditampilkan di header — AI tahu province, scenario, period aktif
- Panel **tidak menutup** main content
- Voice input via 🎤 (FITUR 6.5 opsional)
- Pin jawaban → AI Insight Card di halaman aktif
- History percakapan disimpan per user

**Konteks otomatis di-pass:** province aktif, period, scenario, layer aktif di Map, halaman dibuka

### 19.4.7 Breadcrumbs

Posisi: tepat di atas content area, di bawah Quick Actions Bar.

```
Home > Vulnerability > MCDA Assessment > Run #2026-042
```

Setiap link clickable. Item terakhir non-clickable (current). Max 4 level; level lebih dalam kolaps menjadi `...`.

### 19.4.8 Bottom Status Bar

Footer minimalis.

```
● Online | Data fresh: 23m lalu | GVX: 99.8% | 5 jobs ⏳ | v1.2
```

| Item | Penjelasan |
|------|------------|
| ● Online | Status koneksi user |
| Data fresh | Berapa lama lalu data utama updated |
| GVX | Uptime GeoVertix (24h rolling) |
| Jobs | Background tasks user (klik → detail) |
| v1.2 | Versi platform (klik → release notes) |

Background hijau jika OK, kuning warning, merah error. Mobile: pull-down panel (hidden by default).

### 19.4.9 Keyboard Shortcuts

| Shortcut | Aksi |
|----------|------|
| `⌘K` / `Ctrl+K` | Global Search |
| `⌘I` / `Ctrl+I` | AI Assistant |
| `⌘/` / `Ctrl+/` | Shortcut cheat sheet |
| `[` | Toggle sidebar |
| `M` | Map Explorer |
| `H` | Home/Dashboard |
| `G then D` | Go Dashboard (vim-style chord) |
| `G then M` | Go Map |
| `G then V` | Go Vulnerability |
| `G then S` | Go SDSS |
| `G then R` | Go Reports |
| `Esc` | Tutup modal/drawer |
| `?` | Context-aware help |

## 19.5 Halaman Utama (Dashboard / Home)

Halaman utama adalah **landing setelah login**. Dua tujuan:

1. **Situational Awareness** — ringkasan tingkat tinggi situasi
2. **Launchpad** — akses 62 fitur dengan navigasi efisien

### 8 Zona Halaman Utama (Desktop ~1440px)

```
+--------------------------------------------------------------------------+
| Zone 1: Top Bar (Global Navigation)                                       |
+--------------------------------------------------------------------------+
| Zone 2: Context Bar (Province × Period × Scenario)                        |
+--------+-----------------------------------------------------------------+
|        | Zone 6: Quick Actions Bar                                       |
| S      +-----------------------------------------------------------------+
| I      | Zone 3: KPI Cards Row (4 cards)                                 |
| D      | [Province] [Risk Alerts] [Model Running] [Active Scenarios]    |
| E      +-----------------------------------------------------------------+
| B      | Zone 4: Risk Map (Inline)  |  Zone 5: Activity Feed              |
| A      | (left, 60%)                |  (right, 40%)                       |
| R      |                            |                                     |
|        +-----------------------------------------------------------------+
|        | Zone 7: Module Grid (10 tiles, 5x2 layout)                      |
|        |                                                                 |
+--------+-----------------------------------------------------------------+
| Zone 8: Footer Status Bar                                                |
+--------------------------------------------------------------------------+
```

### 19.5.1 KPI Cards (Zone 3) — Per Persona

| Persona | KPI 1 | KPI 2 | KPI 3 | KPI 4 |
|---------|-------|-------|-------|-------|
| P1 Exec | Provinsi Aktif | Risk Index Nasional (0-100) | Action Items Pending | Reports Bulan Ini |
| P2 Planner | Provinsi Aktif | Risk Alerts | Model Running | Active Scenarios |
| P3 Researcher | Active Projects | Hindcasts Running | Datasets Updated | Publications |
| P4 Private | Active Projects | Premium Tier Days | Reports Saved | Custom Layers |
| P5 Public | (no KPI — pakai headline) | — | — | — |

### 19.5.2 Public Landing (P5)

P5 **bukan dashboard tradisional**. Landing edukasi-fokus:

- Hero section: tagline "Platform Pemanfaatan Data Geospasial untuk Aksi Iklim Indonesia 2026-2028"
- Featured stories (3 cards, scrollytelling)
- Active warnings (banjir, kebakaran, dll.)
- Subscribe alert form (email-only, no full signup)
- Tidak perlu login untuk view
- Footer: About, Kontak, Kebijakan Privasi, API Publik, Lang toggle

## 19.6 Module Landing Pages

Setiap modul memiliki **module landing page** yang berfungsi sebagai pintu masuk fitur-fitur di modul tersebut.

**Pola umum:** Modul header (icon + nama + tagline) → Hero feature card (featured per persona) → Feature grid (semua fitur sebagai card) → Sub-section grid (jika ada) → Activity in module → Quick actions module-specific.

10 modul landing pages (detail per modul ada di Rancangan Halaman Utama §7.x).

## 19.7 User Flows Utama (10 Flow)

| Flow | Trigger | Persona |
|------|---------|---------|
| **Flow A** First-Time Login & Onboarding | Email invite | All |
| **Flow B** Daily Planner Workflow | Pagi hari cek status | P2 |
| **Flow C** Crisis Mode (Disaster Response) | Banjir bandang aktif | All gov |
| **Flow D** Executive Brief | Rapat kepala Bappenas | P1 |
| **Flow E** Researcher Deep Dive | Paper akademik | P3 |
| **Flow F** Group Decision Session | Bappeda finalisasi scenario | P2 multi |
| **Flow G** AI Conversational Query | Pertanyaan ad-hoc | All |
| **Flow H** Report Generation E2E | Quarterly report | P2 |
| **Flow I** Cross-Sectoral Multi-Module | Climate × agri × tourism | P3 |
| **Flow J** Public Access | Mahasiswa baca berita | P5 |

Detail flow di Rancangan Halaman Utama §8.x.

## 19.8 Component Library (Atomic Design)

| Level | Komponen |
|-------|----------|
| **Atoms** | Button (5 variants × 5 sizes), Input (7 types), Badge (5 colors), Icon (Lucide), Spinner/Skeleton/Progress, Tooltip, Divider, Label/Help Text |
| **Molecules** | Search Bar, Dropdown/Select, Card (variants: feature/scenario/layer/report), Toast/Snackbar, Modal Dialog (4 sizes), Side Drawer, Tab, Breadcrumb, Pagination, Table Row |
| **Organisms** | Nav Bar, Sidebar, Map Widget (Leaflet/MapLibre wrapper), Dashboard Widget Container (drag-resize-reorder), Form (Zod schema), Data Table (sort/filter/paginate/multi-select/export), Chart Library (Plotly/ECharts), Activity Feed Item, Comment Thread, File Uploader, Annotation Toolbar (on Map) |
| **Templates** | Dashboard, List + Detail, Map-Full, Wizard |
| **Custom Spasial** | Layer Switcher, Time Slider, Scenario Picker, Legend, Coordinate Display, Measure Tool, Drawing Tools |

Library: distribute sebagai npm package `@bigca/ui-kit` — versioned, shared across Main App dan semua plugin frontend.

## 19.9 State Management

Setiap template wajib handle:

| State | Pattern |
|-------|---------|
| **Empty** | Icon ilustrative + heading + sub-text + CTA button. Per-context per Rancangan §10.1 |
| **Loading** | Skeleton (untuk known structure) atau Spinner (untuk singkat <2s) atau Progress Bar (untuk known progress, SSE) atau Streaming Updates (untuk AI responses) |
| **Error** | 6 types: Network, Auth Expired, GeoVertix Down (FR-GVX-07), Permission Denied, Validation, Generic Server. Setiap error actionable dengan clear CTA |
| **Partial/Degraded** | Zona OK render normal; zona gagal tampilkan inline error placeholder; banner top "Beberapa data tidak tersedia"; status bar `● GVX: Degraded` |
| **Success** | Toast (4s auto-dismiss), Inline Confirmation (dengan Undo 10s), Page Transition dengan success banner |

Timeout strategy:
- > 10s: "Masih memuat... [Cancel]"
- > 30s: dialog "Coba refresh atau cancel?"
- > 60s: otomatis treat as timeout, error state

## 19.10 Mobile & PWA

### Breakpoint Strategy

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 768px | Single column, drawer sidebar, bottom nav |
| Tablet | 768-1280px | Two column, collapsible sidebar |
| Desktop | > 1280px | Full layout |

CSS framework: **Tailwind CSS** dengan responsive utility (mobile-first).

### Bottom Navigation (Mobile)

5 ikon: ⌂ Home | 🗺 Map | ⚡ Aksi (bottom sheet) | 📊 Reports | ⋮ More

### Offline-First Service Worker Strategy

| Resource | Strategy |
|----------|----------|
| App shell (HTML/CSS/JS) | Cache First, update background |
| API GET (data) | Network First, fallback cache (TTL 1h) |
| Maps tiles | Cache First (size limit 100MB) |
| API POST/PUT (mutations) | Network Only — offline queue if no network |
| User uploads | IndexedDB local + sync when online |

**Sync on Reconnect:** Auto-sync queued mutations; conflict resolution server wins, user notified.

### Field Data Capture UX

Mode `/field/capture` untuk P2 di lapangan:
- GPS auto-tag location
- Foto compress di device sebelum store
- Audio note + text note (offline speech-to-text via browser API)
- Queue di IndexedDB; sync saat online

## 19.11 Aksesibilitas & i18n

### WCAG 2.1 AA Compliance

Wajib (cek di build-time via Lighthouse + axe-core CI):

| Category | Items |
|----------|-------|
| **Perceivable** | Alt text semua image, color contrast ≥ 4.5:1, color tidak satu-satunya komunikasi (icon+color+text), text resize 200% tanpa overflow |
| **Operable** | Full keyboard nav, visible focus indicator (2px ring), skip link "Skip to content", heading hierarchy logical, no keyboard trap, prefers-reduced-motion respected |
| **Understandable** | `<html lang="id">` dinamis, inline language change `<span lang="en">`, error suggestion, labels semua form input, consistent navigation |
| **Robust** | Valid HTML, ARIA roles untuk dynamic content, live regions (notifications, toast), kompatibel NVDA/JAWS/VoiceOver |

### Color-Blind Friendly

8% laki-laki + 0.5% perempuan punya color vision deficiency. Multi-modal encoding:

| Level | Default | CB-friendly | Pattern |
|-------|---------|-------------|---------|
| Very Low | Hijau gelap | Biru muda | dots |
| Low | Hijau muda | Biru-hijau | solid |
| Medium | Kuning | Kuning | diagonal |
| High | Oranye | Oranye | diagonal-bold |
| Very High | Merah | Merah | cross-hatch |

User dapat toggle "Color-blind friendly mode" di Settings.

### Bahasa Indonesia / English Toggle

- Library: **next-intl** atau i18next
- Keys di JSON files per bahasa
- Toggle: klik 🌐 di top bar, no reload (state localStorage + user profile)
- Mixed-language: marked `lang` attribute
- Tone: ID formal-friendly ("Anda"), EN standard professional ("you")

### Cultural Considerations

| Item | Format ID | Format EN |
|------|-----------|-----------|
| Date | 22 Mei 2026 | 22 May 2026 |
| Time | 14:30 WIB | 14:30 WIB |
| Number | 1.000.000 | 1,000,000 |
| Decimal | 3,14 | 3.14 |
| Currency | Rp 1.500.000 | IDR 1,500,000 |

Timezone: WIB (default UTC+7), WITA (UTC+8), WIT (UTC+9). User-configurable.

Sensitivitas: tidak ada imagery religius sensitif; kalender Islamic/Hindu disebut untuk events (Ramadan, Nyepi); cuti nasional terlihat di kalender; stempel digital sesuai standar PerBSSN.

## 19.12 Visual Design System Tokens

### Color Tokens

```
Primary Blue (BIG):
  primary-50:  #EFF6FF
  primary-500: #3B82F6  ← base
  primary-600: #2563EB  ← default button
  primary-700: #1D4ED8  ← hover
  primary-900: #1E3A8A

Success Green:  success-500: #22C55E
Warning Yellow: warning-500: #EAB308
Danger Red:     danger-500:  #EF4444
Info Cyan:      info-500:    #06B6D4

Gray scale:
  gray-50:  #F9FAFB  ← background
  gray-200: #E5E7EB  ← divider
  gray-400: #9CA3AF  ← placeholder
  gray-600: #4B5563  ← muted text
  gray-900: #111827  ← heading

Risk Gradient (5-step):
  risk-1: #2563EB (blue)
  risk-2: #16A34A (green)
  risk-3: #EAB308 (yellow)
  risk-4: #EA580C (orange)
  risk-5: #DC2626 (red)
```

### Typography Scale

- Font family: **Inter** (sans), **Source Serif Pro** (serif display), **JetBrains Mono** (code)
- Scale: text-xs (12px) → text-6xl (60px), 10 levels
- Line heights: leading-tight (1.25, headings), leading-normal (1.5, body)
- Weights: 100/300/400/500/600/700

### Spacing & Grid

- Tailwind 4px-base scale: space-0 (0) → space-24 (96px)
- 12-column grid, 24px gutter
- Max content width 1440px (centered) for dashboards
- Map/canvas pages: full-width

### Iconography

- **Lucide** library (stroke-only, 1.5px stroke)
- Sizes: icon-xs (12px) → icon-2xl (48px)
- Domain icons: 🌡 💧 🌊 🔥 🌳 ⚡ 🌬 ☀ 🛰 🏗

### Elevation & Shadow

6 levels: shadow-none, shadow-sm, shadow-md (cards default), shadow-lg (hover lift), shadow-xl (modal), shadow-2xl (overlay)

### Motion & Transitions

| Pattern | Duration | Easing |
|---------|----------|--------|
| Sidebar collapse | 200ms | ease-in-out |
| Modal fade-in | 250ms | ease-out |
| Modal scale (0.95→1) | 250ms | ease-out |
| Toast slide-in | 200ms | ease-out |
| Tab switch | 150ms | ease-in-out |
| Hover lift | 150ms | ease-out |
| Skeleton shimmer | infinite 1500ms | linear |
| Page transition | 250ms | ease-out (fade) |

User dengan `prefers-reduced-motion: reduce`: no fade, no slide, no shimmer; spinner tetap (essential feedback).

## 19.13 Performance Budget UI

Per NFR-PERF-02 (sub-second common ops):

### Initial Load Budget

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Web Vitals |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Total Blocking Time (TBT) | < 200ms | Web Vitals |
| Cumulative Layout Shift (CLS) | < 0.1 | Web Vitals |
| Initial bundle (gzipped) | < 200KB | bundle-analyzer |

### Runtime Budget

| Interaction | Target |
|-------------|--------|
| Page navigation | < 500ms |
| Map pan/zoom | < 100ms (60fps) |
| Filter apply | < 200ms |
| Search results | < 300ms |
| AI query (cached) | < 1s |
| AI query (live) | < 5s (streaming) |

### Network Budget

| Resource | Target |
|----------|--------|
| HTML initial | < 50KB |
| Critical CSS | < 20KB inline |
| JS chunk per route | < 100KB |
| Map tiles | progressive load |
| Images | WebP + AVIF, srcset |

## 19.14 Testing Strategy untuk UI

### Unit Testing
- React Testing Library, Vitest
- Coverage > 80% core components
- Mock external dependencies (API, maps)

### Component Testing (Storybook)
- Visual regression via Chromatic atau Percy
- Interaction tests via Storybook Interaction Addon
- Accessibility tests via axe-storybook-addon

### Integration Testing
- Critical user flows via Playwright
- Per persona (P1-P5)
- Per browser: Chrome, Firefox, Safari, Edge
- Per device: desktop 1440px, tablet 1024px, mobile 375px

### Accessibility Testing
- Automated: Lighthouse, axe-core di CI
- Manual: keyboard walkthrough, screen reader (NVDA + VoiceOver)
- Audit: external WCAG audit pre-launch

### Performance Testing
- Lighthouse CI di pipeline
- Bundle size budget (gates di CI)
- Real User Monitoring (RUM) via web-vitals

### Cross-cutting Tests
- **Persona walkthrough**: setiap rilis, 5 persona × 10 user flows via Playwright
- **GeoVertix integration**: contract tests (FR-GVX-06)
- **i18n**: ID + EN keys lengkap, no missing translations

## 19.15 Component Library Distribution

`@bigca/ui-kit` adalah npm package internal yang berisi:

- Atoms, Molecules, Organisms, Templates
- Theme provider (color tokens, typography, spacing)
- i18n provider wrapper
- Tested via Storybook + Chromatic

Distribusi via internal npm registry. Versioned semver. Main App dan semua plugin frontend pin version yang sama (untuk avoid micro-frontend dependency conflict).

---

# 20. Plugin Catalog

Bagian ini adalah **inti operasional PRD v2.0** untuk paralelisasi development. Setiap fitur besar (62 fitur dari Katalog Fitur v2.2) dipetakan ke **plugin BIGCA tersendiri** + GeoVertix plugin reuse, dengan owner team, dependencies, dan integration pattern eksplisit.

## 20.1 Plugin Inventory Summary

| Kategori | Jumlah | Naming Convention |
|----------|--------|---------------------|
| **Main App (Shell)** | 1 | `bigca-main` |
| **BIGCA Plugins — Modeling** | 6 | `bcp-modeling-*` (Bagian 2 fitur) |
| **BIGCA Plugins — Vulnerability** | 2 | `bcp-vuln-*` (Bagian 3 fitur) |
| **BIGCA Plugins — Sectoral** | 7 | `bcp-sectoral-*` (Bagian 4 fitur) |
| **BIGCA Plugins — SDSS Core** | 10 | `bcp-sdss-*` (Bagian 5 fitur) |
| **BIGCA Plugins — AI/ML** | 9 | `bcp-ai-*` (Bagian 6 fitur) |
| **BIGCA Plugins — Collaboration** | 3 | `bcp-collab-*` (Bagian 7 fitur) |
| **BIGCA Plugins — Viz & Reports** | 4 | `bcp-viz-*` (Bagian 8 fitur) |
| **BIGCA Plugins — Platform Services** | 6 | `bcp-svc-*` (Bagian 9 fitur, opsional split) |
| **BIGCA Plugins — Data Management** | 5 | `bcp-data-*` (Bagian 10 fitur) |
| **BIGCA Plugins — Hindcasting** | 2 | `bcp-hindcast-*` (Bagian 11 fitur) |
| **BIGCA Plugins — Edge/Mobile** | 3 | `bcp-edge-*`, `bcp-mobile-*` (Bagian 12 fitur) |
| **BIGCA Plugins — External Integration** | 5 | `bcp-int-*` (Bagian 13 fitur) |
| **Total BIGCA Plugins (Native)** | **~62 plugin (1:1 dengan fitur)** | |
| **GeoVertix Plugins (Reused)** | 16 | `gxp-*` (existing) |

**Catatan**: Beberapa fitur kecil/sangat-mirip dapat dikonsolidasi ke 1 plugin (mis. FITUR 9.x Platform Services bisa 1-2 plugin saja). Final granularitas ditentukan saat Concept Design Phase. PRD ini menggunakan **1:1 mapping** sebagai upper bound — implementer dapat consolidate jika rasional.

## 20.2 Port Allocation

| Range | Owner |
|-------|-------|
| 9200-9299 | GeoVertix plugins (existing) |
| **9300-9399** | **BIGCA plugins** |
| 9400-9499 | Reserved for future BIGCA expansion |
| 9500-9599 | Reserved for partner plugins |

**BIGCA port assignments** (initial — dapat di-adjust):

| Port | Plugin |
|------|--------|
| 9301 | bcp-modeling-climate (FITUR 2.1) |
| 9302 | bcp-modeling-lulc (FITUR 2.2) |
| 9303 | bcp-modeling-carbon (FITUR 2.3) |
| 9304 | bcp-modeling-biodiversity (FITUR 2.4) |
| 9305 | bcp-modeling-slr (FITUR 2.5) |
| 9306 | bcp-modeling-flood-drought (FITUR 2.6) |
| 9310 | bcp-vuln-mcda (FITUR 3.1) |
| 9311 | bcp-vuln-dynamic (FITUR 3.2) |
| 9320 | bcp-sectoral-rdtr (FITUR 4.1) |
| 9321 | bcp-sectoral-food (FITUR 4.2) |
| 9322 | bcp-sectoral-coastal (FITUR 4.3) |
| 9323 | bcp-sectoral-fire (FITUR 4.4) |
| 9324 | bcp-sectoral-tourism (FITUR 4.5) |
| 9325 | bcp-sectoral-renewable (FITUR 4.6) |
| 9326 | bcp-sectoral-carrying-capacity (FITUR 4.7) |
| 9330 | bcp-sdss-multilevel (FITUR 5.1) |
| 9331 | bcp-sdss-scenario (FITUR 5.2) |
| 9332 | bcp-sdss-impact (FITUR 5.3) |
| 9333 | bcp-sdss-adaptation (FITUR 5.4) |
| 9334 | bcp-sdss-mcda (FITUR 5.5) |
| 9335 | bcp-sdss-context-aware (FITUR 5.6) |
| 9336 | bcp-sdss-group-decision (FITUR 5.7) |
| 9337 | bcp-sdss-whatif (FITUR 5.8) |
| 9338 | bcp-sdss-sensitivity (FITUR 5.9) |
| 9339 | bcp-sdss-optimization (FITUR 5.10) |
| 9340 | bcp-ai-image-recog (FITUR 6.1) |
| 9341 | bcp-ai-anomaly (FITUR 6.2) |
| 9342 | bcp-ai-predictive (FITUR 6.3) |
| 9343 | bcp-ai-scenario (FITUR 6.4) |
| 9344 | bcp-ai-nlq (FITUR 6.5) |
| 9345 | bcp-ai-rag (FITUR 6.6) |
| 9346 | bcp-mcp (FITUR 6.7) |
| 9347 | bcp-ai-federated (FITUR 6.8) |
| 9348 | bcp-ai-xai (FITUR 6.9) |
| 9350 | bcp-collab-consultation (FITUR 7.1) |
| 9351 | bcp-collab-annotation (FITUR 7.2) |
| 9352 | bcp-collab-compare (FITUR 7.3) |
| 9360 | bcp-viz-map (FITUR 8.1) |
| 9361 | bcp-viz-dashboard (FITUR 8.2) |
| 9362 | bcp-viz-exec-summary (FITUR 8.3) |
| 9363 | bcp-viz-custom-report (FITUR 8.4) |
| 9370 | bcp-svc-auth (FITUR 9.1) |
| 9371 | bcp-svc-notification (FITUR 9.2) |
| 9372 | bcp-svc-audit (FITUR 9.3) |
| 9373 | bcp-svc-i18n (FITUR 9.4 — opsional, mungkin built-in Main App) |
| 9374 | bcp-svc-onboarding (FITUR 9.5) |
| 9375 | bcp-svc-api-ogc (FITUR 9.6) |
| 9380 | bcp-data-catalog (FITUR 10.1) |
| 9381 | bcp-data-lineage (FITUR 10.2) |
| 9382 | bcp-data-quality (FITUR 10.3) |
| 9383 | bcp-data-stream (FITUR 10.4) |
| 9384 | bcp-data-versioning (FITUR 10.5) |
| 9385 | bcp-hindcast-historical (FITUR 11.1) |
| 9386 | bcp-hindcast-monitor (FITUR 11.2) |
| 9387 | bcp-edge-runtime (FITUR 12.1) |
| 9388 | bcp-mobile-pwa (FITUR 12.2 — service worker config, sebagian besar built-in Main App PWA) |
| 9389 | bcp-edge-model-compression (FITUR 12.3) |
| 9390 | bcp-int-onemap (FITUR 13.1) |
| 9391 | bcp-int-bnpb (FITUR 13.2) |
| 9392 | bcp-int-bmkg (FITUR 13.3) |
| 9393 | bcp-int-klhk (FITUR 13.4) |
| 9394 | bcp-int-bps (FITUR 13.5) |

## 20.3 Detailed Plugin Catalog

Format per plugin:
- **Name** — kebab-case
- **FITUR ref** — kode fitur di Katalog Fitur v2.2
- **Pattern** — A/B/C/D/E per §17.4
- **Reuse %** — estimasi penghematan effort
- **GeoVertix dependencies** — plugin GeoVertix yang dipanggil
- **BIGCA dependencies** — plugin BIGCA lain yang dibutuhkan
- **Database schema** — schema PostgreSQL
- **Has UI** — apakah plugin punya micro-frontend
- **Estimated effort** — dev-month untuk team 2-3 orang

### 20.3.1 Modeling Plugins (Bagian 2 — 6 plugin)

#### `bcp-modeling-climate` (FITUR 2.1)
- **Capability**: Advanced Climate Modeling — downscaled climate projections (temperature, precipitation), CMIP6 + CORDEX-SEA ensemble, LCZ, microclimate
- **Pattern**: B (API + Extension)
- **Reuse**: 60% (extend gxp-climate)
- **GeoVertix deps**: gxp-climate, gxp-qgis, gxp-ml
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_climate`
- **Has UI**: ✓ (Climate Modeling Explorer)
- **Estimated effort**: 8-10 dev-months

#### `bcp-modeling-lulc` (FITUR 2.2)
- **Capability**: LULC Change Detection — multi-temporal Landsat/Sentinel, RF/CNN classification, CCDC, CA-Markov projection, REDD+ linkage
- **Pattern**: C (Multi-Plugin Orchestration)
- **Reuse**: 65%
- **GeoVertix deps**: gxp-inference (lulc-unet ONNX), gxp-ml, gxp-qgis, gxp-geoprocess
- **BIGCA deps**: bcp-data-catalog, bcp-modeling-carbon (downstream), bcp-modeling-biodiversity (downstream)
- **DB schema**: `bcp_lulc`
- **Has UI**: ✓ (LULC Explorer + Sankey)
- **Estimated effort**: 10-12 dev-months

#### `bcp-modeling-carbon` (FITUR 2.3)
- **Capability**: Net Carbon Footprint Monitoring — IPCC Tier-1/2/3, sektor-wide accounting, AI emission via proxy data, MACC, NDC tracker
- **Pattern**: D (Build Native with GeoVertix Support)
- **Reuse**: 25%
- **GeoVertix deps**: gxp-climate (TROPOMI/VIIRS), gxp-ml (XGBoost), gxp-inference, gxp-areainfo
- **BIGCA deps**: bcp-modeling-lulc (LULUCF input)
- **DB schema**: `bcp_carbon`
- **Has UI**: ✓ (Carbon Dashboard + Scenario Simulator)
- **Estimated effort**: 12-14 dev-months

#### `bcp-modeling-biodiversity` (FITUR 2.4)
- **Capability**: Biodiversity Mapping — MaxEnt+ensemble SDM, Circuitscape, climate envelope, Citizen Science portal
- **Pattern**: D
- **Reuse**: 25%
- **GeoVertix deps**: gxp-ml (cluster, interpolate), gxp-inference (yolov8-buildings), gxp-qgis (KDE), gxp-areainfo
- **BIGCA deps**: bcp-modeling-lulc (habitat overlay), bcp-modeling-climate (envelope)
- **DB schema**: `bcp_biodiv`
- **Has UI**: ✓ (Biodiversity Explorer + Citizen Science form)
- **Estimated effort**: 10-12 dev-months

#### `bcp-modeling-slr` (FITUR 2.5)
- **Capability**: Sea Level Rise & Land Subsidence — PS-InSAR+SBAS-InSAR (MintPy/SNAPHU/GACOS), GNSS calibration, shoreline DSAS, RSL projection, CVI, inundation modeling
- **Pattern**: D
- **Reuse**: 30%
- **GeoVertix deps**: gxp-lidar (LiDAR DEM, 3D), gxp-3dtiles, gxp-climate (altimetry), gxp-inference, gxp-areainfo
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_slr`
- **Has UI**: ✓ (SLR Explorer + Subsidence Map + 3D Inundation viz)
- **Estimated effort**: 14-16 dev-months (compute-heavy)

#### `bcp-modeling-flood-drought` (FITUR 2.6)
- **Capability**: Flood & Drought — HEC-RAS 2D wrapper, SWAT, VIC, SWMM, ConvLSTM nowcast, climate-coupled projection, real-time alert
- **Pattern**: C/D
- **Reuse**: 35%
- **GeoVertix deps**: gxp-climate (SPI/SPEI), gxp-lidar (DEM), gxp-ml (ConvLSTM), gxp-qgis (watershed), gxp-geoprocess
- **BIGCA deps**: bcp-modeling-climate (driver), bcp-ai-anomaly (alert)
- **DB schema**: `bcp_flood`
- **Has UI**: ✓ (Flood Explorer + animasi inundasi)
- **Estimated effort**: 14-16 dev-months

### 20.3.2 Vulnerability Plugins (Bagian 3 — 2 plugin)

#### `bcp-vuln-mcda` (FITUR 3.1)
- **Capability**: Multi-Criteria Vulnerability Assessment — 7-dimensi (physical, social, economic, environmental, exposure, sensitivity, adaptive capacity)
- **Pattern**: **A (Direct API Reuse — gxp-mcda)**
- **Reuse**: 75%
- **GeoVertix deps**: gxp-mcda (AHP/Entropy/WSM/WPM/TOPSIS/sensitivity/cache), gxp-areainfo, gxp-geoprocess, gxp-qgis
- **BIGCA deps**: bcp-data-catalog, bcp-modeling-climate (hazard input)
- **DB schema**: `bcp_vuln`
- **Has UI**: ✓ (Vulnerability Explorer + decomposition UI)
- **Estimated effort**: 4-5 dev-months (low because high reuse)

#### `bcp-vuln-dynamic` (FITUR 3.2)
- **Capability**: Dynamic Vulnerability System Modeling — PySD model templates, calibration PEST/DE-MCMC, Monte Carlo, tipping point detection, Sobol, CLD viz
- **Pattern**: **E (Pure Native)**
- **Reuse**: 10%
- **GeoVertix deps**: gxp-mcda (initial AC), gxp-areainfo, gxp-ml (container)
- **BIGCA deps**: bcp-vuln-mcda
- **DB schema**: `bcp_vuln_dyn`
- **Has UI**: ✓ (System Dynamics Builder + simulation playback)
- **Estimated effort**: 12-14 dev-months

### 20.3.3 Sectoral Plugins (Bagian 4 — 7 plugin)

#### `bcp-sectoral-rdtr` (FITUR 4.1)
- **Capability**: Spatial Planning Toolbox (RDTR) — 7 plugin orchestration, rule-based plausibility engine (UU/Permen), ATR/BPN NSPK export, shelter zone, multi-source Dijkstra
- **Pattern**: **C (Multi-Plugin Orchestration)**
- **Reuse**: 70%
- **GeoVertix deps**: gxp-mcda, gxp-routing, gxp-geoprocess, gxp-bpnmap, gxp-pbb, gxp-areainfo, gxp-mapeditor, gxp-qgis
- **BIGCA deps**: bcp-vuln-mcda, bcp-modeling-lulc, bcp-sdss-scenario
- **DB schema**: `bcp_rdtr`
- **Has UI**: ✓ (RDTR Builder + NSPK export)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sectoral-food` (FITUR 4.2)
- **Capability**: Food Security (Rice Field) — DSSAT-CERES-Rice wrapper, rice phenology, impact functions banjir/drought, rice-SAR ONNX, KATAM/AUTP integration
- **Pattern**: C/D
- **Reuse**: 30%
- **GeoVertix deps**: gxp-climate, gxp-inference (rice-SAR custom), gxp-ml (predict_values), gxp-areainfo, gxp-qgis
- **BIGCA deps**: bcp-modeling-climate, bcp-modeling-flood-drought
- **DB schema**: `bcp_food`
- **Has UI**: ✓ (Rice Field Explorer)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sectoral-coastal` (FITUR 4.3)
- **Capability**: Coastal Vulnerability (CCVI) — segmentation 1km, CVI USGS formula, ERI ecological scoring, adaptation lookup
- **Pattern**: **A (Direct API Reuse — gxp-mcda + thin wrapper)**
- **Reuse**: 55%
- **GeoVertix deps**: gxp-mcda, gxp-geoprocess, gxp-qgis, gxp-areainfo, gxp-inference
- **BIGCA deps**: bcp-modeling-slr
- **DB schema**: `bcp_coastal`
- **Has UI**: ✓ (Coastal Explorer)
- **Estimated effort**: 5-7 dev-months

#### `bcp-sectoral-fire` (FITUR 4.4)
- **Capability**: Forest Fire Risk (ENSO-aware) — FWI Canadian + FWI-PEAT, LightGBM training, HYSPLIT smoke plume (opsional), KLHK SIPONGI integration, alerts
- **Pattern**: B (Extend gxp-ml + gxp-climate)
- **Reuse**: 50%
- **GeoVertix deps**: gxp-climate (ENSO), gxp-ml (LightGBM), gxp-qgis (NDMI), gxp-inference, gxp-areainfo, gxp-geoprocess
- **BIGCA deps**: bcp-int-klhk (SIPONGI), bcp-ai-anomaly (alert)
- **DB schema**: `bcp_fire`
- **Has UI**: ✓ (Fire Risk Explorer + ENSO panel)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sectoral-tourism` (FITUR 4.5)
- **Capability**: Tourism Vulnerability — TCI/HCI formula, NOAA coral DHW integration, destination DB, adaptation knowledge base
- **Pattern**: B (Build Lightweight)
- **Reuse**: 40%
- **GeoVertix deps**: gxp-climate, gxp-areainfo, gxp-mcda, gxp-qgis
- **BIGCA deps**: bcp-modeling-climate
- **DB schema**: `bcp_tourism`
- **Has UI**: ✓ (Tourism Dashboard)
- **Estimated effort**: 6-8 dev-months

#### `bcp-sectoral-renewable` (FITUR 4.6)
- **Capability**: Renewable Energy Optimization — MILP OR-Tools, LCOE per teknologi, wind power curve, ESDM template, PLN grid integration
- **Pattern**: **A (Direct API Reuse + Build Optimization)**
- **Reuse**: 55%
- **GeoVertix deps**: gxp-mcda, gxp-qgis, gxp-climate, gxp-ml, gxp-geoprocess
- **BIGCA deps**: bcp-modeling-climate, bcp-vuln-mcda (suitability)
- **DB schema**: `bcp_re`
- **Has UI**: ✓ (Renewable Energy Configurator)
- **Estimated effort**: 8-10 dev-months

#### `bcp-sectoral-carrying-capacity` (FITUR 4.7)
- **Capability**: Land Carrying Capacity (+ SHAP) — XGBoost+spatial CNN, SHAP service, limiting factor logic, H3 hexagon viz
- **Pattern**: B (Extend gxp-ml + Build XAI)
- **Reuse**: 65%
- **GeoVertix deps**: gxp-ml (XGBoost), gxp-qgis (distance transforms), gxp-mcda, gxp-areainfo, gxp-geoprocess
- **BIGCA deps**: bcp-ai-xai (SHAP service shared), bcp-modeling-lulc
- **DB schema**: `bcp_cc`
- **Has UI**: ✓ (Carrying Capacity Dashboard + H3 hex viz)
- **Estimated effort**: 7-9 dev-months

### 20.3.4 SDSS Core Plugins (Bagian 5 — 10 plugin)

#### `bcp-sdss-multilevel` (FITUR 5.1)
- **Capability**: Multi-Level Decision Architecture — 3 workspace (National/Provincial/District), hierarchical aggregation, workflow state machine, RPJMN/RPJMD/RDTR adapter
- **Pattern**: D (build SDSS App Core)
- **Reuse**: 15%
- **GeoVertix deps**: gxp-areainfo, multiple
- **BIGCA deps**: bcp-svc-auth, hampir semua plugin
- **DB schema**: `bcp_sdss`
- **Has UI**: ✓ (3 workspace shells)
- **Estimated effort**: 8-10 dev-months

#### `bcp-sdss-scenario` (FITUR 5.2)
- **Capability**: Scenario Manager — block definitions (climate/intervention/assumption), version DAG, comparison engine, drag-drop Builder
- **Pattern**: E
- **Reuse**: 10%
- **GeoVertix deps**: gxp-mapeditor (changeset pattern reference)
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_scenario`
- **Has UI**: ✓ (Scenario Builder)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sdss-impact` (FITUR 5.3)
- **Capability**: Impact Analysis Engine — Airflow/Prefect orchestrator, DAG templates per scenario, KPI multi-dim, causal pathway viz
- **Pattern**: D
- **Reuse**: 30%
- **GeoVertix deps**: gxp-geoai (chain planning), gxp-areainfo, multiple
- **BIGCA deps**: bcp-sdss-scenario
- **DB schema**: `bcp_impact`
- **Has UI**: ✓ (Impact Outcome Viewer)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sdss-adaptation` (FITUR 5.4)
- **Capability**: Customizable Adaptation Recommendation — KB curation 50-80 aksi, filtering/ranking, bundle generation
- **Pattern**: E
- **Reuse**: 10%
- **GeoVertix deps**: gxp-mcda (fitness scoring), gxp-areainfo
- **BIGCA deps**: bcp-sdss-impact, bcp-vuln-mcda
- **DB schema**: `bcp_adaptation`
- **Has UI**: ✓ (Adaptation Library)
- **Estimated effort**: 8-10 dev-months (heavy content curation)

#### `bcp-sdss-mcda` (FITUR 5.5)
- **Capability**: MCDA Engine (AHP/TOPSIS/ELECTRE/PROMETHEE/VIKOR)
- **Pattern**: **A (Direct API Reuse — gxp-mcda 90%)**
- **Reuse**: 90%
- **GeoVertix deps**: gxp-mcda (full)
- **BIGCA deps**: —
- **DB schema**: `bcp_mcda` (cache, history)
- **Has UI**: ✓ (MCDA Configurator + LLM result interpreter)
- **Estimated effort**: 3-4 dev-months

#### `bcp-sdss-context-aware` (FITUR 5.6)
- **Capability**: Context-Aware Recommendation (Policy / Feasibility / Sequencing / Cross-sectoral)
- **Pattern**: D
- **Reuse**: 30%
- **GeoVertix deps**: gxp-geoai (RAG regulasi), gxp-mcda, gxp-mapeditor, gxp-areainfo
- **BIGCA deps**: bcp-ai-rag, bcp-sdss-impact
- **DB schema**: `bcp_ctxrec`
- **Has UI**: ✓ (Recommendation Engine)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sdss-group-decision` (FITUR 5.7)
- **Capability**: Group Decision-Making — voting (Borda/Delphi), divergence detection, pre-meeting async input, live WebRTC/Zoom embed, decision artifacts
- **Pattern**: E
- **Reuse**: 30%
- **GeoVertix deps**: gxp-mapeditor (collaboration pattern), gxp-geoai (divergence detect), gxp-mcda (Borda)
- **BIGCA deps**: bcp-collab-consultation
- **DB schema**: `bcp_group_dm`
- **Has UI**: ✓ (Group Decision Room)
- **Estimated effort**: 10-12 dev-months

#### `bcp-sdss-whatif` (FITUR 5.8)
- **Capability**: What-If Simulator — live-adjust API gateway dengan debouncing, slider UI real-time
- **Pattern**: A (Extend gxp-mcda + Modul 5.2/5.3)
- **Reuse**: 50%
- **GeoVertix deps**: gxp-mcda (LRU cache)
- **BIGCA deps**: bcp-sdss-scenario, bcp-sdss-impact
- **DB schema**: shared `bcp_sdss`
- **Has UI**: ✓ (What-If Slider Panel)
- **Estimated effort**: 4-5 dev-months

#### `bcp-sdss-sensitivity` (FITUR 5.9)
- **Capability**: Sensitivity & Uncertainty Analyzer (Tornado/Sobol)
- **Pattern**: **A (Direct API Reuse — gxp-mcda OAT + Sobol)**
- **Reuse**: 85%
- **GeoVertix deps**: gxp-mcda (OAT + Sobol), gxp-ml (Morris screening opsional)
- **BIGCA deps**: bcp-sdss-mcda
- **DB schema**: shared `bcp_mcda`
- **Has UI**: ✓ (Tornado Chart + Robustness score)
- **Estimated effort**: 3-4 dev-months

#### `bcp-sdss-optimization` (FITUR 5.10)
- **Capability**: Optimization Solver — LP/MILP/GA/NSGA-II via OR-Tools/DEAP/pymoo, use case templates
- **Pattern**: E
- **Reuse**: 40%
- **GeoVertix deps**: gxp-routing, gxp-mcda, gxp-ml (container)
- **BIGCA deps**: bcp-sdss-mcda
- **DB schema**: `bcp_opt`
- **Has UI**: ✓ (Optimization Configurator)
- **Estimated effort**: 10-12 dev-months

### 20.3.5 AI/ML Plugins (Bagian 6 — 9 plugin)

#### `bcp-ai-image-recog` (FITUR 6.1)
- **Capability**: Image & Pattern Recognition — custom ONNX (oil spill U-Net, illegal mining, damage), active learning queue
- **Pattern**: A+B (Direct + Custom Train)
- **Reuse**: 70%
- **GeoVertix deps**: gxp-inference (ONNX), gxp-ml (finetune)
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_image_recog`
- **Has UI**: ✓ (Image Upload + Detection Result)
- **Estimated effort**: 8-10 dev-months

#### `bcp-ai-anomaly` (FITUR 6.2)
- **Capability**: Anomaly Detection & Early Warning — scripts ML anomaly (IsoForest/Autoencoder/LSTM), Kafka real-time consumer, severity scoring, alert routing
- **Pattern**: D
- **Reuse**: 35%
- **GeoVertix deps**: gxp-inference, gxp-ml, gxp-qgis (KDE), gxp-areainfo, gxp-climate
- **BIGCA deps**: bcp-data-stream, bcp-svc-notification
- **DB schema**: `bcp_anomaly`
- **Has UI**: ✓ (Alert Console + EWS dashboard)
- **Estimated effort**: 10-12 dev-months

#### `bcp-ai-predictive` (FITUR 6.3)
- **Capability**: Predictive Modeling Framework — statistical (ARIMA/SARIMA/Prophet), DL (LSTM/GRU/Transformer/NBeats), ConvLSTM/PredRNN, MLflow, PyCaret AutoML, drift detection
- **Pattern**: B (Extend gxp-ml)
- **Reuse**: 65%
- **GeoVertix deps**: gxp-ml, gxp-inference
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_predictive`
- **Has UI**: ✓ (Predictive Model Builder + MLflow embed)
- **Estimated effort**: 12-14 dev-months

#### `bcp-ai-scenario` (FITUR 6.4)
- **Capability**: Scenario-Based Analysis (AI-augmented) — LHS+NSGA-II, clustering representative, storyline prompt engineering
- **Pattern**: D
- **Reuse**: 30%
- **GeoVertix deps**: gxp-geoai (storyline LLM), gxp-ml (LHS/NSGA-II)
- **BIGCA deps**: bcp-sdss-scenario, bcp-ai-nlq
- **DB schema**: `bcp_ai_scenario`
- **Has UI**: ✓ (Scenario Explorer)
- **Estimated effort**: 10-12 dev-months

#### `bcp-ai-nlq` (FITUR 6.5)
- **Capability**: Natural Language Query (LLM Conversational Interface)
- **Pattern**: **A (Direct API Reuse — gxp-geoai 80%)**
- **Reuse**: 80%
- **GeoVertix deps**: gxp-geoai (qwen3:8b, intent, chain, function calling, session memory, VLM optional)
- **BIGCA deps**: bcp-ai-rag (KB), bcp-mcp (tools registry)
- **DB schema**: `bcp_nlq` (chat history)
- **Has UI**: ✓ (Chat UI + Map embed + voice input)
- **Estimated effort**: 4-5 dev-months

#### `bcp-ai-rag` (FITUR 6.6)
- **Capability**: RAG Pipeline & Knowledge Base — Qdrant vector store, ingestion (PDF/DOCX/HTML), multilingual embedding, hybrid retrieval (BM25+dense+rerank), KB curation
- **Pattern**: B (Extend gxp-geoai + add vector store)
- **Reuse**: 50%
- **GeoVertix deps**: gxp-geoai
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_rag` + Qdrant
- **Has UI**: ✓ (KB Browser + Ingestion Admin)
- **Estimated effort**: 10-12 dev-months (heavy KB content curation)

#### `bcp-mcp` (FITUR 6.7)
- **Capability**: MCP Server (Toolbox Bridge) — Anthropic MCP spec, tool manifest ~70 tools, rate limiting, async streaming
- **Pattern**: B (Extend gxp-geoai function calling)
- **Reuse**: 75%
- **GeoVertix deps**: gxp-geoai
- **BIGCA deps**: semua plugin yang expose tools (via OpenAPI auto-discovery)
- **DB schema**: `bcp_mcp` (registry, usage logs)
- **Has UI**: ✓ (Admin tool registry browser)
- **Estimated effort**: 6-8 dev-months

#### `bcp-ai-federated` (FITUR 6.8)
- **Capability**: Federated Learning — Coordinator-client architecture, Flower/PySyft, differential privacy + secure aggregation
- **Pattern**: E
- **Reuse**: 10%
- **GeoVertix deps**: gxp-ml (pattern reference)
- **BIGCA deps**: bcp-svc-auth
- **DB schema**: `bcp_fed`
- **Has UI**: ✓ (FL Admin Dashboard)
- **Estimated effort**: 12-14 dev-months (specialist, defer ke Y3)

#### `bcp-ai-xai` (FITUR 6.9)
- **Capability**: Explainable AI Service — SHAP/LIME/dice-ml/captum/aif360
- **Pattern**: D (Extend gxp-ml + Build XAI service)
- **Reuse**: 30%
- **GeoVertix deps**: gxp-ml, gxp-inference
- **BIGCA deps**: dipanggil oleh banyak plugin AI lain
- **DB schema**: `bcp_xai` (explanation cache)
- **Has UI**: ✓ (XAI Viewer — sub-tab di output fitur lain)
- **Estimated effort**: 8-10 dev-months

### 20.3.6 Collaboration Plugins (Bagian 7 — 3 plugin)

#### `bcp-collab-consultation` (FITUR 7.1)
- **Capability**: Multi-Stakeholder Consultation Workflow — template library, state machine engine, drag-drop designer, immutable audit hash chain
- **Pattern**: E
- **Reuse**: 30%
- **GeoVertix deps**: gxp-mapeditor (changeset pattern), gxp-areainfo
- **BIGCA deps**: bcp-svc-auth, bcp-svc-notification, bcp-svc-audit
- **DB schema**: `bcp_collab`
- **Has UI**: ✓ (Consultation Session Room + Workflow Designer)
- **Estimated effort**: 12-14 dev-months

#### `bcp-collab-annotation` (FITUR 7.2)
- **Capability**: Annotation & Comment System — threaded comments, @mentions, real-time WebSocket, tag taxonomy
- **Pattern**: D (Extend gxp-mapeditor)
- **Reuse**: 65%
- **GeoVertix deps**: gxp-mapeditor (vector editing + optimistic lock)
- **BIGCA deps**: bcp-svc-auth, bcp-svc-notification
- **DB schema**: `bcp_annotation`
- **Has UI**: ✓ (Annotation Panel — embedded di plugin lain)
- **Estimated effort**: 5-7 dev-months

#### `bcp-collab-compare` (FITUR 7.3)
- **Capability**: Scenario Comparison Tool — multi-map sync (MapLibre custom), KPI comparison table, voting embed
- **Pattern**: B (Viz Extension)
- **Reuse**: 15%
- **GeoVertix deps**: gxp-mbtiles, gxp-mcda, gxp-areainfo
- **BIGCA deps**: bcp-sdss-scenario
- **DB schema**: shared
- **Has UI**: ✓ (Multi-Map Compare Layout)
- **Estimated effort**: 6-8 dev-months

### 20.3.7 Viz & Reports Plugins (Bagian 8 — 4 plugin)

#### `bcp-viz-map` (FITUR 8.1)
- **Capability**: Interactive Map Advanced — MapLibre frontend dengan layer manager, time-aware slider, symbology editor, bookmark, print/export, 3D toggle
- **Pattern**: **C (Orchestrate Multi-Plugin)**
- **Reuse**: 70%
- **GeoVertix deps**: gxp-bpnmap, gxp-mbtiles, gxp-3dtiles, gxp-areainfo, gxp-geoprocess
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_map` (bookmarks, user state)
- **Has UI**: ✓ (Map Explorer — FULL SCREEN — primary surface)
- **Estimated effort**: 12-14 dev-months

#### `bcp-viz-dashboard` (FITUR 8.2)
- **Capability**: Dynamic Dashboards — widget library (KPI/Chart/Map/Table/Sankey), drag-drop editor (react-grid-layout), schedule email
- **Pattern**: E (Frontend-heavy)
- **Reuse**: 15%
- **GeoVertix deps**: all plugins (data sources)
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_dashboard`
- **Has UI**: ✓ (Dashboard Designer + Viewer)
- **Estimated effort**: 10-12 dev-months

#### `bcp-viz-exec-summary` (FITUR 8.3)
- **Capability**: Executive Summary Auto-Generation — template library, auto-narrative prompts, server-side map snapshot (Puppeteer), PDF/PPTX
- **Pattern**: D (Heavy leverage gxp-geoai)
- **Reuse**: 35%
- **GeoVertix deps**: gxp-geoai (auto-narrative), gxp-mcda (export PDF)
- **BIGCA deps**: bcp-data-catalog, bcp-ai-rag
- **DB schema**: `bcp_exec_summary`
- **Has UI**: ✓ (Exec Summary Builder + Preview)
- **Estimated effort**: 8-10 dev-months

#### `bcp-viz-custom-report` (FITUR 8.4)
- **Capability**: Custom Report Builder — drag-drop blocks editor, data source binding, mini-query language, schedule cron
- **Pattern**: A (Build pada Exec Summary base)
- **Reuse**: 15% (sebagian besar reuse infra bcp-viz-exec-summary)
- **GeoVertix deps**: (via bcp-viz-exec-summary)
- **BIGCA deps**: bcp-viz-exec-summary, bcp-data-catalog
- **DB schema**: shared
- **Has UI**: ✓ (Custom Report Editor)
- **Estimated effort**: 6-8 dev-months

### 20.3.8 Platform Services Plugins (Bagian 9 — 6 plugin)

Catatan: beberapa fitur Bagian 9 mungkin built-in di Main App. Pilihan: konsolidasi atau split berdasarkan team capacity.

#### `bcp-svc-auth` (FITUR 9.1)
- **Capability**: Auth & Authorization (Multi-Tier) — SSO adapter SIKD/OneSSO, multi-tier role, ABAC spatial scope, K/L sub-tier configs
- **Pattern**: B (Extend GeoVertix Core auth atau adopt OIDC standar)
- **Reuse**: 50%
- **GeoVertix deps**: GeoVertix Core auth (sebagai reference)
- **BIGCA deps**: — (foundational)
- **DB schema**: `bigca_core.auth`
- **Has UI**: ✓ (Auth Admin)
- **Estimated effort**: 6-8 dev-months

#### `bcp-svc-notification` (FITUR 9.2)
- **Capability**: Notification & Alert — channel adapters (SMTP/SMS/FCM/WA/webhook), subscription mgmt, throttling/dedup, quiet hours
- **Pattern**: E
- **Reuse**: 20%
- **GeoVertix deps**: gxp-routing (opsional)
- **BIGCA deps**: bcp-svc-auth
- **DB schema**: `bigca_core.notification`
- **Has UI**: ✓ (Notification Preferences di Settings + Admin)
- **Estimated effort**: 6-8 dev-months

#### `bcp-svc-audit` (FITUR 9.3)
- **Capability**: Audit & Compliance Logger — hash chain, ELK/Loki deployment, compliance report generator
- **Pattern**: B (Reference gxp-pbb pattern + extend)
- **Reuse**: 45%
- **GeoVertix deps**: gxp-pbb (audit pattern reference), gxp-mapeditor (changesets)
- **BIGCA deps**: — (foundational, called by all)
- **DB schema**: `bigca_core.audit`
- **Has UI**: ✓ (Audit Console — admin)
- **Estimated effort**: 5-7 dev-months

#### Built-in Main App: i18n (FITUR 9.4)
- Tidak plugin terpisah; built-in di Main App shell (next-intl provider)

#### `bcp-svc-onboarding` (FITUR 9.5)
- **Capability**: Onboarding & Tutorial — react-joyride integration, tutorial content (video+text), Q&A bot, demo sandbox, glossary
- **Pattern**: D (Leverage gxp-geoai Q&A)
- **Reuse**: 30%
- **GeoVertix deps**: gxp-geoai
- **BIGCA deps**: bcp-ai-nlq, bcp-ai-rag
- **DB schema**: `bcp_onboarding`
- **Has UI**: ✓ (Tutorial overlay + Help center)
- **Estimated effort**: 6-8 dev-months

#### `bcp-svc-api-ogc` (FITUR 9.6)
- **Capability**: API & Web Services (REST + OGC) — GeoServer/MapServer deployment, OGC adapter, OpenAPI auto-gen, WebSocket, SSE, Kafka, API gateway
- **Pattern**: B (Extend Main App gateway + gxp-agrest)
- **Reuse**: 60%
- **GeoVertix deps**: gxp-agrest (ArcGIS REST compat untuk legacy K/L)
- **BIGCA deps**: Main App gateway
- **DB schema**: `bigca_core.api_keys`
- **Has UI**: ✓ (Developer Portal di Settings)
- **Estimated effort**: 8-10 dev-months

### 20.3.9 Data Management Plugins (Bagian 10 — 5 plugin)

#### `bcp-data-catalog` (FITUR 10.1)
- **Capability**: Data Catalog ISO 19115 — schema extension, catalog UI search/filter (GeoNetwork-style), auto-harvest, Satu Data Indonesia adapter, FAIR fields
- **Pattern**: B (Extend Main App + register GeoVertix layers)
- **Reuse**: 35%
- **GeoVertix deps**: GeoVertix Core (Layers registry), gxp-areainfo
- **BIGCA deps**: — (foundational)
- **DB schema**: `bcp_data`
- **Has UI**: ✓ (Data Catalog Browser — major surface)
- **Estimated effort**: 12-14 dev-months

#### `bcp-data-lineage` (FITUR 10.2)
- **Capability**: Data Lineage Tracker — OpenLineage client lib, plugin instrumentation, lineage graph UI
- **Pattern**: E
- **Reuse**: 15%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog, all plugins (instrumented)
- **DB schema**: `bcp_lineage`
- **Has UI**: ✓ (Lineage Graph Viewer)
- **Estimated effort**: 8-10 dev-months

#### `bcp-data-quality` (FITUR 10.3)
- **Capability**: Data Quality Dashboard — Great Expectations integration, ISO 19157 dimension formulas, alerts
- **Pattern**: E
- **Reuse**: 15%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog, bcp-svc-notification
- **DB schema**: `bcp_dq`
- **Has UI**: ✓ (DQ Dashboard)
- **Estimated effort**: 8-10 dev-months

#### `bcp-data-stream` (FITUR 10.4)
- **Capability**: Real-Time Data Stream Processor — Kafka cluster, Kafka Streams library, topic schema registry, stream consumer templates
- **Pattern**: E (Stream Infra)
- **Reuse**: 10%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_stream` + Kafka
- **Has UI**: ✓ (Stream Monitor Admin)
- **Estimated effort**: 10-12 dev-months

#### `bcp-data-versioning` (FITUR 10.5)
- **Capability**: Data Versioning — DVC/lakeFS integration, snapshot scheduler, time-travel API
- **Pattern**: B (Reference gxp-mapeditor changeset)
- **Reuse**: 35%
- **GeoVertix deps**: gxp-mapeditor (reference), GeoVertix Core (S3)
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_versioning`
- **Has UI**: ✓ (Version Console)
- **Estimated effort**: 8-10 dev-months

### 20.3.10 Hindcasting Plugins (Bagian 11 — 2 plugin)

#### `bcp-hindcast-historical` (FITUR 11.1)
- **Capability**: Historical Hindcasting Tool — event registry, metrics library (RMSE/MAE/Skill score), validation report PDF
- **Pattern**: B
- **Reuse**: 30%
- **GeoVertix deps**: gxp-climate (anomaly mechanism), gxp-ml (retrain)
- **BIGCA deps**: bcp-modeling-* (target models)
- **DB schema**: `bcp_hindcast`
- **Has UI**: ✓ (Hindcasting Configurator + Report Viewer)
- **Estimated effort**: 10-12 dev-months

#### `bcp-hindcast-monitor` (FITUR 11.2)
- **Capability**: Continuous Model Performance Monitoring — per-prediction log + actual, rolling accuracy + drift (KS test/Wasserstein), auto-trigger retrain MLflow
- **Pattern**: D
- **Reuse**: 15%
- **GeoVertix deps**: gxp-ml
- **BIGCA deps**: bcp-modeling-*, bcp-ai-predictive
- **DB schema**: `bcp_monitor`
- **Has UI**: ✓ (Model Monitor Dashboard)
- **Estimated effort**: 6-8 dev-months

### 20.3.11 Edge/Mobile Plugins (Bagian 12 — 3 plugin)

#### `bcp-edge-runtime` (FITUR 12.1)
- **Capability**: Edge Computing Runtime — Mini-PC/RPi5 + SSD 1-2TB + k3s, pre-loaded MBTiles, ONNX compressed, differential sync
- **Pattern**: B (extend with gxp-mbtiles + gxp-inference)
- **Reuse**: 35%
- **GeoVertix deps**: gxp-mbtiles, gxp-inference
- **BIGCA deps**: bcp-data-catalog (sync target)
- **DB schema**: subset di edge (PostgreSQL Lite atau SQLite)
- **Has UI**: ✓ (Edge Admin Console)
- **Estimated effort**: 12-14 dev-months (defer ke Y2/Y3)

#### `bcp-mobile-pwa-shell`: (FITUR 12.2)
- Built-in di Main App (next-pwa); tidak plugin terpisah. Service workers, push notification, camera/GPS untuk citizen science, background sync.

#### `bcp-edge-model-compression` (FITUR 12.3)
- **Capability**: Model Compression — quantization int8 (4x reduction), pruning, knowledge distillation
- **Pattern**: B (extend gxp-inference)
- **Reuse**: 35%
- **GeoVertix deps**: gxp-inference
- **BIGCA deps**: bcp-ai-predictive (source models)
- **DB schema**: `bcp_compression`
- **Has UI**: ✓ (Compression Admin)
- **Estimated effort**: 6-8 dev-months

### 20.3.12 External Integration Plugins (Bagian 13 — 5 plugin)

#### `bcp-int-onemap` (FITUR 13.1)
- **Capability**: One Map Policy BIG integration — WMS/WMTS RBI consumer, SRGI 2013 CRS alignment, topological consistency
- **Pattern**: E (data ingest adapter)
- **Reuse**: 20%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog
- **DB schema**: `bcp_int_onemap`
- **Has UI**: ✓ (Admin status di Settings)
- **Estimated effort**: 4-5 dev-months

#### `bcp-int-bnpb` (FITUR 13.2)
- **Capability**: BNPB InaRISK/InaSAFE integration — bi-directional API consumer, export format converter, webhook receiver alert routing
- **Pattern**: E
- **Reuse**: 20%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog, bcp-ai-anomaly (alert)
- **DB schema**: `bcp_int_bnpb`
- **Has UI**: ✓ (Status di Settings)
- **Estimated effort**: 5-6 dev-months

#### `bcp-int-bmkg` (FITUR 13.3)
- **Capability**: BMKG Climate Service integration — BMKG OpenAPI consumer real-time, RegCM/WRF NetCDF ingest, seasonal forecast
- **Pattern**: B (Extend gxp-climate)
- **Reuse**: 30%
- **GeoVertix deps**: gxp-climate
- **BIGCA deps**: bcp-data-catalog, bcp-modeling-climate
- **DB schema**: `bcp_int_bmkg`
- **Has UI**: ✓ (Status di Settings)
- **Estimated effort**: 5-6 dev-months (MoU required)

#### `bcp-int-klhk` (FITUR 13.4)
- **Capability**: KLHK SIGN-SMART integration — SIGN-SMART consumer + SIPONGI hotspot + GRK Inventarisasi harmonization
- **Pattern**: E
- **Reuse**: 20%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog, bcp-modeling-lulc, bcp-sectoral-fire
- **DB schema**: `bcp_int_klhk`
- **Has UI**: ✓ (Status di Settings)
- **Estimated effort**: 5-6 dev-months

#### `bcp-int-bps` (FITUR 13.5)
- **Capability**: BPS Socio-economic Data integration — BPS API client Satu Data compatible, SP2020/Susenas/Sakernas, PDB regional, annual update scheduler
- **Pattern**: E
- **Reuse**: 20%
- **GeoVertix deps**: —
- **BIGCA deps**: bcp-data-catalog, bcp-vuln-mcda (social indicators)
- **DB schema**: `bcp_int_bps`
- **Has UI**: ✓ (Status di Settings)
- **Estimated effort**: 5-6 dev-months

## 20.4 Plugin Dependency Graph

Plugin dengan dependency tinggi (consumed by banyak plugin lain — perlu prioritas Y1):

```
bcp-svc-auth ─────────────────────────────────► (all plugins)
bcp-data-catalog ─────────────────────────────► (all data-consuming plugins)
bcp-mcp ──────────────────────────────────────► (LLM tools surface)
bcp-ai-rag ───────────────────────────────────► (context-aware, summaries)
bcp-svc-audit ────────────────────────────────► (all plugins, immutable log)
bcp-svc-notification ─────────────────────────► (alerts, EWS)
bcp-modeling-climate ─────────────────────────► (driver hampir semua tematik)
bcp-modeling-lulc ────────────────────────────► (carbon, biodiversity, RDTR)
bcp-vuln-mcda ────────────────────────────────► (RDTR, sectoral)
bcp-sdss-scenario ────────────────────────────► (impact, what-if, group decision)
```

## 20.5 Build vs Reuse Summary

| Metric | Value |
|--------|-------|
| Total in-scope fitur (PRD) | 62 |
| BIGCA native plugin (count) | ~60 (1:1 mapping) atau ~45 (jika konsolidasi rasional) |
| GeoVertix plugin reused | 16/17 = 94% reusable |
| Fitur dengan reuse ≥ 60% (HIGH) | 15 |
| Fitur dengan reuse ≥ 25% (MEDIUM+) | 45 |
| Fitur pure native (pattern E) | 6 |
| Average reuse per fitur | 39.3% |
| **Estimated aggregate effort savings** | **50–60%** |

## 20.6 Total Estimated Effort (Person-Months)

Rough sum semua plugin di atas: ~450–550 dev-months untuk plugin development (excluding Main App, infrastructure, QA, integration, dokumentasi).

Vs greenfield estimate (~900–1100 dev-months): **savings ~45–55%** sesuai target KPI-R01.

Per TOR Annex 3 Tabel 5: total person-months personnel = 267. Plugin effort tidak 1:1 dengan personnel PM karena (a) team composition, (b) parallelisme, (c) GeoVertix tim sebagai dependency eksternal yang tidak counted di BIGCA PM.

## 20.7 Per-Plugin Owner Team Assignment

Distribusi plugin ke ~6-8 development squad (lihat §22 Parallel Development Strategy). Indicative initial assignment:

| Squad | Plugins (initial assignment) |
|-------|------------------------------|
| **Squad A — Foundation** | Main App, bcp-svc-auth, bcp-svc-audit, bcp-svc-i18n (built-in), bcp-svc-notification, bcp-data-catalog |
| **Squad B — Modeling Core** | bcp-modeling-climate, bcp-modeling-lulc, bcp-modeling-carbon, bcp-hindcast-historical, bcp-hindcast-monitor |
| **Squad C — Modeling Specialized** | bcp-modeling-biodiversity, bcp-modeling-slr, bcp-modeling-flood-drought |
| **Squad D — Vulnerability & Sectoral** | bcp-vuln-mcda, bcp-vuln-dynamic, bcp-sectoral-rdtr, bcp-sectoral-food, bcp-sectoral-coastal, bcp-sectoral-fire, bcp-sectoral-tourism, bcp-sectoral-renewable, bcp-sectoral-carrying-capacity |
| **Squad E — SDSS Core** | bcp-sdss-multilevel, bcp-sdss-scenario, bcp-sdss-impact, bcp-sdss-adaptation, bcp-sdss-mcda, bcp-sdss-context-aware, bcp-sdss-group-decision, bcp-sdss-whatif, bcp-sdss-sensitivity, bcp-sdss-optimization |
| **Squad F — AI/ML** | bcp-ai-image-recog, bcp-ai-anomaly, bcp-ai-predictive, bcp-ai-scenario, bcp-ai-nlq, bcp-ai-rag, bcp-mcp, bcp-ai-federated, bcp-ai-xai |
| **Squad G — Viz, Reports, Collab** | bcp-viz-map, bcp-viz-dashboard, bcp-viz-exec-summary, bcp-viz-custom-report, bcp-collab-consultation, bcp-collab-annotation, bcp-collab-compare |
| **Squad H — Data Mgmt, Integration, Edge** | bcp-data-lineage, bcp-data-quality, bcp-data-stream, bcp-data-versioning, bcp-int-onemap, bcp-int-bnpb, bcp-int-bmkg, bcp-int-klhk, bcp-int-bps, bcp-edge-runtime, bcp-edge-model-compression |

**Catatan**: assignment di atas indikatif untuk perencanaan kapasitas. Squad lead dapat re-shuffle berdasarkan ketersediaan talent dan dependency Y1-Y3 roadmap.

## 20.8 Plugin Catalog di Plugin Registry

BIGCA Plugin Registry (Harbor + custom metadata DB) maintains:

- Plugin name, version, owner squad
- Manifest (parsed dari plugin.json)
- Signature status
- Deployment status per environment (dev/staging/prod)
- Capability summary
- Dependency graph
- GeoVertix touchpoints
- Test coverage badges
- Latest release notes

Browsable via internal admin UI di `/settings/integrations/plugin-registry` (admin only).

---

# 21. Implementation Approach & Methodology

Service Provider memiliki latitude untuk berinovasi (TOR §11), namun approach selaras dengan TOR Annex 6 §2.1 yang prescribe workflow berikut.

## 21.1 Workflow Overview (TOR Annex 6 §2.1 "Picture 4")

Implementasi mengikuti workflow step-by-step dengan **explicit Y/N decision gates**:

**Linear flow:**
1. Preparation
2. Concept Design
3. Data Collection (parallel input ke both tracks)

**Parallel tracks:**

| Track | Stages |
|-------|--------|
| **Analytical Model Track** | Analytical Model Development → Model Testing & Implementation → **G1 — Analytical Model Validation** |
| **Platform Track** | Platform Development → Platform Infrastructure Development → **G2 — User Testing** |

**Decision gates:**

| Gate | After | Y (Pass) | N (Fail) |
|------|-------|----------|----------|
| **G1 — Analytical Model Validation** | Model Testing | Lanjut Platform Development; model dikonsumsi platform track | Loop back ke Analytical Model Development |
| **G2 — User Testing** | Platform Development | Lanjut Launching & Evaluation | Loop back ke Platform Development |

**Convergence:** Both tracks converge di **Launching & Evaluation**. Analytical Model Track dapat converge ke Platform Track di multiple points.

Y/N pass criteria explicit dan measurable (e.g., model accuracy thresholds, UAT pass rates) ditetapkan di **Inception Report**.

## 21.2 Concept Design Phase (TOR Annex 6 §2.1.2)

- Desktop study / literature review
- Technical consultations dengan akademisi dan policymakers
- Comprehensive stakeholder analysis
- Konstruksi analytical model concept untuk konteks Indonesia (coastal, highland, urban, forested)
- Platform architecture design considering flexibility, scalability, security; aligned e-government enterprise architecture principles
- **Proof of Concept (PoC)** prototype untuk assess technical feasibility
- Storyboarding dan interactive mockups untuk early concept testing
- Detailed data dan hardware specifications

**Output kunci:**
- Validated 8 design principles (§19.1)
- Validated 5 persona profiles (§6.3)
- Validated plugin catalog (§20)
- Validated 10 navigation modules (§19.2)
- PoC: Main App skeleton + 2-3 plugin paling kompleks (mis. bcp-ai-nlq, bcp-vuln-mcda, bcp-modeling-climate)
- Inception Report dengan detailed work plan

## 21.3 Analytical Model Development Phase (TOR Annex 6 §2.1.3)

- Data collection dari credible sources: field sensors, IoT, existing databases, surveys, real-time data
- Standardized data processing dan cleansing: missing values, outlier detection, consistency checks
- Model construction menggunakan statistical, ML, atau AI techniques as appropriate
- Documentation of uncertainty quantification

**Per plugin** — analytical model development di-track per plugin (bcp-modeling-*, bcp-vuln-*, bcp-sectoral-*) dengan owner squad.

## 21.4 Verification & Field Validation (TOR Annex 6 §2.1.4)

- **Verification**: Conformance ke initial design; standardized model documentation
- **Validation**: Real-world performance vs historical data, reputable journals, established standards
- **Hindcasting**: Evaluasi model vs observed climate impacts decades past (implementation: bcp-hindcast-historical)
- **Cross-validation** lintas konteks: semua pilot provinces
- **Formal validation report** per model: performance metrics, limitations, appropriate use cases
- **Field validation logistics**: 2 rounds per location per phase; team 5 personnel; 5 days per round; budget allowances, akomodasi, transport, kendaraan

## 21.5 SDSS Platform Development Phase (TOR Annex 6 §2.1.5)

- Prototype development (PC workstation atau IPU)
- **Agile methodologies** dengan regular iterations dan stakeholder feedback
- **Hybrid infrastructure**: cloud services + edge computing
- Data integration dan management (database management, real-time processing, security, encryption)
- Implementation testing under operational conditions
- Accessibility testing, performance testing under bandwidth constraints, security penetration testing
- **User Acceptance Testing (UAT)** dengan local officials, planners, community representatives, technical staff
- Structured feedback collection (usability, feature requests, context-specific challenges)
- **Phased deployment** — provinsi well-prepared dulu, kemudian challenging contexts

## 21.6 Methods (TOR §11)

Approaches/methodology employed:

- Workshops / FGDs (per §25 Stakeholder Engagement)
- Concept development
- Konstruksi data analytic systems, platforms, models
- Implementation testing dan validation
- Monitoring dan evaluation

## 21.7 Reuse-First Development Methodology

Setiap fitur mengikuti **five-step reuse-first decision process**:

**Step 1 — Reuse Inventory.** Buka `GeoVertix_SDSS_Reuse_Analysis_v3.xlsx` Sheet 4, locate feature, review plugin/endpoint indicated, assigned pattern A-E, reuse coverage %.

**Step 2 — Validate Reuse.** Untuk pattern A-D: baca dokumentasi GeoVertix API, test endpoint behaviour vs feature contract, decide apakah proceed atau escalate (mis. reclassify B → E jika gap lebih besar).

**Step 3 — Build Native (only what's missing).** Untuk A dan C: hanya UI dan orchestration. Untuk B dan D: climate-specific intelligence atas GeoVertix surface. Untuk E: full feature native.

**Step 4 — Contract Test.** Setiap GeoVertix integration touchpoint **WAJIB** memiliki contract test di CI (FR-GVX-06).

**Step 5 — Document.** Setiap fitur dokumentasi:
- Pattern used (A/B/C/D/E)
- Endpoints/plugins invoked, dengan version pin
- Fallback behaviour (FR-GVX-07)
- Estimated vs actual effort, tracked di portfolio level untuk savings vs greenfield (target ≥ 50% per KPI-R01)

**Reporting cadence:** Methodology tercermin di project plan sejak Inception Report. Reported di Quarterly Progress Reports per §27.4. Portfolio-level reuse statistics adalah standing agenda di quarterly review.

---

# 22. Parallel Development Strategy

Bagian ini adalah **manual operasional** untuk paralel pengembangan plugin. Inti dari arsitektur plugin BIGCA adalah kemampuan **tim multipel bekerja paralel** tanpa konflik.

## 22.1 Team Organization Model

Service Provider mengorganisir tim development menjadi **6-8 development squad**, masing-masing mengelola subset plugin (lihat §20.7 untuk indicative assignment).

### Squad Composition

Setiap squad terdiri dari:

| Role | Headcount | Responsibility |
|------|-----------|----------------|
| **Squad Lead** | 1 | Technical lead, architecture decisions, code review |
| **Backend Engineer** | 2-3 | Plugin backend (Python/Node.js), API, business logic |
| **Frontend Engineer** | 1-2 | Plugin frontend (React micro-frontend) — opsional bila plugin tidak punya UI |
| **Data/Domain Expert** | 1 | Klimatologi/hidrologi/dll. — collaboratif untuk model accuracy |
| **QA Engineer** | 1 (shared 0.5 FTE per squad) | Test design, contract test, integration test |
| **DevOps/Platform (cross-squad)** | shared | CI/CD, K8s, registry, dispatcher |

Total tim ~6-10 orang per squad × 6-8 squad = ~40-60 orang aktif puncak (Y2 high-activity period).

### Cross-Squad Roles

| Role | Headcount | Responsibility |
|------|-----------|----------------|
| **Team Leader / Project Manager** | 1 (Key Personnel) | Disaster Management Expert per TOR Annex 2 |
| **Architect / SDSS Lead** | 1 | Cross-squad architecture, GeoVertix integration, contract evolution |
| **GeoVertix Liaison** | 1 (part-time) | Daily coordination dengan GeoVertix team untuk API changes, signing, escalation |
| **DevOps Lead** | 1 | Infrastructure, K8s, CI/CD, registry, dispatcher operasi |
| **UX Lead** | 1 | Cross-squad UI/UX consistency, design system, persona research |
| **QA Lead** | 1 | Cross-squad test strategy, persona walkthroughs, performance testing |
| **Security Lead** | 1 (part-time) | Capability audits, signing workflow, penetration testing coord |
| **Documentation Lead** | 1 (part-time) | Cross-squad docs consistency, bilingual deliverables |

## 22.2 Per-Plugin Development Workflow

Setiap plugin mengikuti workflow standar berikut. Workflow ini terinspirasi **GeoVertix Plugin Development Guideline** namun di-adapt untuk multi-language polyglot BIGCA.

### Step 0 — Plugin Provisioning (1 hari)

```bash
# 1. Copy template dari plugin scaffold repo
cd ~/Codes/bigca-plugins/plugins
cp -r ../templates/python-fastapi bcp-myfeature
cd bcp-myfeature

# 2. Rename + adjust manifest
sed -i 's/template/myfeature/g' plugin.json Dockerfile pyproject.toml src/main.py README.md

# 3. Pick free port dari §20.2 port allocation table
sed -i 's/"port": 9399/"port": 9XXX/' plugin.json

# 4. Initial git commit
git add . && git commit -m "chore(myfeature): scaffold from template"
git push origin main
```

### Step 1 — Contract First (3-5 hari)

Sebelum implementasi, draft **OpenAPI 3.0 spec** + **`plugin.json` manifest**:

- Routes yang diserve
- Operations yang di-expose (input/output schema)
- Capabilities yang dibutuhkan
- Dependencies (plugins, GeoVertix)
- Database schema sketch
- Frontend component contracts (jika punya UI)

Output: `openapi.yaml`, `plugin.json` draft, `docs/contract.md`.

**Reviewed by:** Architect Lead + dependent squads (mis. squad yang akan consume plugin ini).

### Step 2 — Skeleton & Health (1-2 hari)

- Implement minimal handlers untuk `/health`, `/ready`, `/metrics`, `/info`
- Implement dispatcher handshake (POST `/dispatcher/plugins/register`)
- Container Dockerfile + docker-compose.yml dev orchestration
- CI pipeline: lint + format + unit tests + manifest validation

**Output:** Plugin dapat boot, handshake dengan local dispatcher, response `/health`. Smoke test passed.

### Step 3 — Core Implementation (sprint-based)

Sprint length: **2 minggu**. Per sprint:

- Sprint Planning hari Senin: ambil tasks dari backlog
- Daily standup (15 menit)
- Code review per PR (minimum 1 reviewer)
- Sprint Demo hari Jumat (sisa minggu ke-2)
- Retrospective

Per task:
1. Branch: `feat/<plugin>-<short>`
2. Write code + tests (TDD encouraged)
3. Run local: `make test` (lint + unit + integration)
4. PR ke `main`
5. CI gates harus green (test, lint, contract test, validator)
6. Code review + approval
7. Merge ke `main`
8. Auto-deploy ke dev environment via ArgoCD

### Step 4 — Integration Testing

- Spin up plugin di staging environment dengan dependencies (other plugins, GeoVertix)
- Run contract tests vs Main App
- Run contract tests vs GeoVertix endpoints (if applicable)
- Run persona walkthrough untuk plugin (e.g., P2 Planner uses bcp-vuln-mcda end-to-end)

### Step 5 — Tag & Sign

Setelah feature ready dan tests green:

```bash
# Bump version di plugin.json
# Update CHANGELOG.md
git tag bcp-myfeature-v0.1.0
git push origin bcp-myfeature-v0.1.0

# Notify Lead Developer untuk signing (Y2+)
```

Lead Developer:
- Pull tag, build image, compute hash
- Sign `plugin.json.sig`
- Push signed artifact ke Harbor registry
- Update pinned version di `bigca-plugins/PINS.json`

### Step 6 — Staging Deploy

- ArgoCD detect new signed image
- Deploy ke staging cluster
- Smoke test + persona walkthrough oleh QA
- Stakeholder demo (jika applicable)

### Step 7 — Production Deploy

- After staging stability ≥ 1 minggu + approval
- ArgoCD promote ke production
- Monitoring metrics + logs for 24-48 jam
- Rollback ready if any KPI degradation

## 22.3 Plugin Dependency Management

### Foundation Order (Y1 wajib build dulu)

```
Order 1: Main App (Shell)
Order 2: bcp-svc-auth, bcp-svc-audit
Order 3: bcp-data-catalog, bcp-mcp
Order 4: bcp-ai-nlq, bcp-ai-rag (foundational AI)
Order 5: bcp-modeling-climate (driver banyak modul tematik)
Order 6: bcp-vuln-mcda (foundational SDSS pattern)
Order 7: bcp-viz-map (primary visualization surface)
Order 8: bcp-sdss-mcda, bcp-sdss-scenario (SDSS basics)
```

Setelah Order 1-4 ready, semua squad dapat work paralel dengan **mock services** untuk dependencies belum siap.

### Mock Service Strategy

Setiap plugin dependency yang belum siap dapat di-mock via:

- **Mock service per plugin** — Docker image kecil yang return stubbed response sesuai contract OpenAPI
- **Mock distributed di registry** — `mock-bcp-<name>` deployed di dev environment
- **Local mock dengan WireMock** atau **MSW** (Mock Service Worker untuk frontend)

Mock service maintain di repo `bigca-plugin-mocks` — di-generate dari OpenAPI spec.

### Dependency Version Pinning

Setiap plugin pin dependencies di `plugin.json`:

```json
"depends_on": {
  "main_app_version": ">=1.0.0",
  "plugins": [
    { "name": "bcp-data-catalog", "version": ">=0.2.0" },
    { "name": "bcp-mcp", "version": ">=0.1.0" }
  ],
  "geovertix_plugins": [
    { "name": "gxp-mcda", "version_pin": "0.4.x" }
  ]
}
```

CI **fail** jika dependency tidak available atau version mismatch.

## 22.4 CI/CD Per Plugin

Setiap plugin punya pipeline CI/CD independen.

### CI Pipeline (per PR)

```yaml
# .github/workflows/ci.yml (per plugin repo)
on: [pull_request]

jobs:
  validate:
    - bcp-plugin-validate --strict
  lint:
    - black --check
    - ruff check
    - mypy --strict
  test:
    - pytest tests/unit -v
    - pytest tests/integration -v
    - pytest tests/contract -v
  build:
    - docker build -t bcp-myfeature:${{ github.sha }} .
    - docker image scan
  contract-test-geovertix:
    - python tests/contract/test_geovertix_endpoints.py
```

Wajib green sebelum merge.

### CD Pipeline (per tag)

```yaml
on:
  push:
    tags:
      - 'bcp-*-v*'

jobs:
  build-image:
    - docker build + push ke Harbor registry
  notify-signing:
    - Issue signing request ke Lead Developer (GitHub Issue automation)
  on-signed:
    - Update PINS.json di bigca-plugins repo
    - ArgoCD trigger staging deploy
  on-staging-stable:
    - Manual approval untuk production
    - ArgoCD promote ke production
```

## 22.5 Plugin Repository Structure

### Mono-repo vs Multi-repo

**Rekomendasi: Mono-repo** dengan workspace per plugin:

```
bigca-platform/
├── README.md
├── PINS.json                      # signed plugin versions
├── COMPATIBILITY.md               # cross-plugin compatibility
├── docs/
│   ├── architecture.md
│   ├── plugin-dev-guide.md
│   └── ADR/
├── shared/
│   ├── bigca-plugin-sdk/          # shared SDK library
│   │   ├── python/                # Python SDK
│   │   └── typescript/            # TS SDK
│   ├── ui-kit/                    # @bigca/ui-kit npm package
│   ├── tools/
│   │   ├── bcp-plugin-validate/
│   │   └── bcp-plugin-scaffold/
│   └── templates/
│       ├── python-fastapi/        # plugin template
│       └── node-fastify/          # plugin template
├── main-app/                      # Main App (shell)
│   └── ...
└── plugins/
    ├── bcp-svc-auth/
    ├── bcp-svc-audit/
    ├── bcp-data-catalog/
    ├── bcp-modeling-climate/
    ├── bcp-modeling-lulc/
    ├── ...
```

**Alternatif: Multi-repo** — satu repo per plugin. Lebih clean untuk independent deploy, tapi memerlukan cross-repo tooling lebih heavy.

**Keputusan untuk BIGCA: mono-repo** karena (a) lebih mudah untuk ~60 plugin, (b) shared SDK/UI Kit lebih konsisten, (c) cross-plugin refactoring mudah, (d) CI/CD per-plugin tetap independen via path filters.

### Path-based CI Triggers

```yaml
# Only trigger CI untuk plugin yang berubah
on:
  pull_request:
    paths:
      - 'plugins/bcp-myfeature/**'
      - 'shared/bigca-plugin-sdk/python/**'
```

### CODEOWNERS

Setiap path memiliki owner squad:

```
# CODEOWNERS
/plugins/bcp-svc-auth/         @squad-foundation
/plugins/bcp-modeling-climate/ @squad-modeling-core
/plugins/bcp-vuln-mcda/        @squad-vuln-sectoral
/shared/bigca-plugin-sdk/      @squad-foundation @architect-lead
/shared/ui-kit/                @ux-lead @frontend-lead
/main-app/                     @squad-foundation
```

PR ke plugin specific routes to plugin owner; PR ke shared routes to multiple owners.

## 22.6 Communication Channels Antar Squad

| Channel | Purpose |
|---------|---------|
| **Slack/Discord** | Daily async chat per squad + cross-squad channels |
| **Weekly Squad Sync** | 30 menit per squad, demo progress + blockers |
| **Bi-weekly Cross-Squad Sync** | 60 menit, architecture review + integration points |
| **Monthly Architecture Review** | 90 menit, lead + architect, contract evolution + GeoVertix coordination |
| **Plugin Marketplace UI** | Self-service: lihat plugin lain, contract, status, owner |
| **GitHub Issues + Projects** | Backlog, sprint planning, cross-squad dependencies |
| **ADR (Architecture Decision Records)** | Per plugin + cross-cutting; markdown di repo |

## 22.7 Integration Milestones

Plugin integration di-test di milestone besar:

| Milestone | Plugins Integrated | Persona Flow Tested |
|-----------|---------------------|---------------------|
| **M3 PoC End** | Main App + 2-3 plugin paling kompleks | P2 single-plugin walkthrough |
| **M9 Beta (D15)** | Main App + Foundation (~10 plugin) | P2 daily workflow basic |
| **M15 V.1 (D16a)** | Foundation + Modeling+Vuln+Sectoral selected (~25 plugin) | P2 Daily, P1 Exec Brief |
| **M18 V.2 (D16b)** | + AI/LLM/RAG layer + Reports (~40 plugin) | P2 Daily, P1 Exec, P3 Researcher |
| **M21 V.3 (D17)** | + Collab + Hindcasting + Edge/Mobile (~55 plugin) | All 10 user flows |
| **M24 Full (D18)** | All 62 plugin | All persona + Crisis Mode |

## 22.8 Conflict Resolution

| Conflict Type | Resolution |
|---------------|------------|
| **Port collision** | Plugin validator enforce range 9300-9399 unique; conflict → CI fail; coordinate via PINS.json |
| **Capability creep** | New capability declaration requires Architect Lead approval via PR review |
| **Contract breaking change** | 30-day deprecation notice (FR-GVX-08 equivalent) + major version bump + migration guide |
| **GeoVertix API change** | Liaison coordinator routes to relevant squads; emergency patch path via hotfix branch |
| **Dependency loop** | Architect Lead refactor to break cycle (introduce intermediate plugin atau event-driven decoupling via Kafka) |
| **UI Kit breaking change** | UX Lead coordinate dengan all frontend developers; major version bump |
| **Database migration conflict** | Per-plugin schema isolation prevents most; cross-plugin reads via API only |

## 22.9 Plugin Signing Coordination

Per FR-PLG-10 (production signing mandatory dari Y2):

1. Plugin developer push tag
2. GitHub Action auto-create signing request issue
3. Lead Developer:
   - Review changes (capability diff, contract diff)
   - Pull tag, build di production-equivalent env
   - Run `bcp-plugin-validate --strict`
   - Generate signature
   - Push signed plugin.json.sig
   - Update PINS.json
4. ArgoCD detect signed version, deploy staging
5. After staging stable, promote ke prod

SLA: signing request → signed dalam 2 business days (non-disaster).

## 22.10 Onboarding New Developer

Saat tim grow:

1. Read `/docs/architecture.md` (high-level)
2. Read `/docs/plugin-dev-guide.md` (this is the BIGCA equivalent of GeoVertix Plugin Guide)
3. Setup dev environment (Docker, Python, Node, kubectl, dev cluster access)
4. Clone repo, run `make dev` (spins up Main App + minimum plugins)
5. Walkthrough: copy template, build minimal plugin, deploy ke dev cluster
6. Pair-program first feature dengan squad lead
7. Solo feature after 2 sprints

Time-to-first-PR target: ≤ 5 business days post-onboarding.

## 22.11 Plugin Performance Monitoring

Per NFR-PLG-03 (centralized observability), each squad memiliki **Grafana dashboard** untuk plugin mereka:

| Metric | Source |
|--------|--------|
| Request rate per route | Prometheus (HTTP middleware) |
| Latency p50/p95/p99 per route | Prometheus + OpenTelemetry |
| Error rate (4xx, 5xx) | Prometheus |
| Capability violation rate | Dispatcher metrics |
| GeoVertix call latency + error | Bridge Adapter metrics |
| DB query latency | SQLAlchemy/TypeORM middleware |
| Memory + CPU per pod | K8s metrics |
| Cache hit rate | Redis metrics |
| Queue depth (Celery) | Worker metrics |

SLO per plugin defined dan tracked di Quarterly Review.

## 22.12 Lessons-Learned & Continuous Improvement

- **Post-mortem template** (blameless) untuk setiap incident
- **Sprint retrospective** captured per squad → roll-up monthly
- **Cross-squad retro** quarterly
- **Lessons-learned database** di Confluence atau Notion
- **ADR updates** untuk decision yang berubah

---

# 23. Project Phases, Milestones, Deliverables

## 23.1 Total Duration

**27 bulan** (TOR §8 dan Annex 1), spanning **9 kuartal (Q1–Q9)** lintas 2026–2028.

## 23.2 Major Activity Streams (TOR Annex 1)

TOR mengorganisir **21 numbered deliverables (D1–D21)** dalam **3 stream**:

**Stream 1** — Building models dan conducting climate risk evaluations untuk First Project Location Group (RDTR preparation).

**Stream 2** — Conducting model dan database integration dan climate risk evaluation untuk Second dan Third Project Location Groups (RDTR preparation).

**Stream 3** — Developing applied geospatial data analysis approach dengan platform integration, AI/LLM, pilot testing, full deployment.

## 23.3 Deliverables Catalogue (TOR Annex 1)

### Stream 1 — Group 1 (Year 1)

**D1 — Design of model architecture, modules/toolbox, data dan model integration, dan SDSS platform.**
- a. Identify thematic data dan info on climate risk untuk RDTR
- b. Develop data specifications/standards untuk raster, thematic geospatial, integrasi data, climate models, thematic analysis models
- c. Identify data & information needs dan availability
- d. Develop SDSS platform architecture design **(memerlukan PRD v2.0 + Rancangan Halaman Utama validated)**

**D2 — Database specification requirements, models, SDSS platforms + IT infrastructure.**
- e. Conduct analysis database specifications + infrastructure

**D3 — Proof of Concept (PoC) system software + hardware.**
- f. Establish PoC system
- g. Develop prototypes data (large scale), databases, models, modules/toolbox, SDSS

**D4 — Prototypes thematic models, modules/toolboxes, SDSS.**
- h. Conduct data dan information collection
- i. Design dan prototyping each thematic model + module/toolbox + SDSS design

**D5 — Thematic analysis results (First Group).**
- j. Build dan conduct individual thematic analysis modeling + risk evaluation untuk Group 1
- k. Conduct data validation
- l. Refine thematic models

**D6 — Climate risk evaluation + integrated analytical modules (First Group).**
- m. Build dan conduct integrated thematic analysis process untuk Group 1
- n. Conduct result validation
- o. Refine integrated process + result

**D7 — Integrate data/info/maps results ke preparation RDTR (First Group).**
- p. Conduct evaluation aplikasi thematic + integrated analysis
- q. Formulate results dan reporting climate risk evaluation sebagai input RDTR

### Stream 2 — Groups 2 & 3 (Year 2)

**D8 — Thematic analysis results (Second Group).** Activities a-e (DB mgmt, data collection, integrated process, data validation, refining)

**D9 — Climate risk evaluation + integrated modules (Second Group).** Activities f-h (build, validate, refine)

**D10 — Integrate results ke RDTR (Second Group).** Activities i-j

**D11 — Thematic analysis results (Third Group).** Activities k-o

**D12 — Climate risk evaluation + integrated modules (Third Group).** Activities p-r

**D13 — Integrate results ke RDTR (Third Group).** Activities s-t

**D14 — Database integration + model performance reporting.**
- u. Database integration + management
- v. Model performance (sensitivity, transferability, scalability) testing + reporting

**D15 — Specification & guideline thematic model + integrated analysis → Platform Beta Version**
- w. Specification + guideline → **Platform Beta**

### Stream 3 — Platform Integration + AI + Pilot + Full Deployment (Year 3)

**D16 — System integration data utilization platform.**
- a. Integrate thematic models ke modules/toolboxes + SDSS → **Platform V.1**
- b. Conduct evaluation + adjustment
- c. Build AI LLM + RAG
- d. Integrate LLM + RAG dengan SDSS → **Platform V.2**
- e. Internal evaluation

**D17 — Pilot development + usability report.**
- f. Phased + limited trial AI-integrated SDSS
- g. Usability/benefit testing specific users → **Platform V.3**

**D18 — Platform performance report.**
- h. Reconfiguration + development SDSS calibration + enhancement
- i. Usability trials wider audience (K/L, Pemda)
- j. Evaluation + adjustment full version → **Platform Full Version**

**D19 — Specification & Guideline Data Utilization Platform (Draft).**
- k. Develop specifications + guidelines/manuals SDSS

**D20 — Integrate data/info/maps ke preparation RDTR (full).**
- l. Full implementation platform semua region
- m. Performance effectiveness evaluation + improvements

**D21 — SDSS platform implementation roadmap (policy recommendation).**
- n. Launch ke stakeholders
- o. Develop + conduct periodic monitoring + reporting scheme
- p. Develop roadmap utilization/implementation

## 23.4 Compact Deliverables Summary

| ID | Deliverable | Activities | Platform Version |
|----|-------------|-----------|-------------------|
| D1 | Design model arch + modules/toolbox + SDSS | a-d | — |
| D2 | DB specs + models + SDSS + IT infra | e | — |
| D3 | PoC software + hardware | f-g | — |
| D4 | Prototypes thematic models + modules + SDSS | h-i | — |
| D5 | Thematic analysis Group 1 | j-l | — |
| D6 | Climate risk eval + integrated Group 1 | m-o | — |
| D7 | Integrate ke RDTR Group 1 | p-q | — |
| D8 | Thematic analysis Group 2 | a-e (S2) | — |
| D9 | Climate risk + integrated Group 2 | f-h | — |
| D10 | Integrate ke RDTR Group 2 | i-j | — |
| D11 | Thematic analysis Group 3 | k-o | — |
| D12 | Climate risk + integrated Group 3 | p-r | — |
| D13 | Integrate ke RDTR Group 3 | s-t | — |
| D14 | DB integration + model performance | u-v | — |
| D15 | Spec + guideline thematic + integrated | w | **Platform Beta** |
| D16 | System integration | a-e (S3) | **V.1 → V.2** |
| D17 | Pilot + usability | f-g | **V.3** |
| D18 | Platform performance | h-j | **Full Version** |
| D19 | Spec + Guideline Platform (Draft) | k | — |
| D20 | Integrate ke RDTR (full) | l-m | — |
| D21 | Implementation roadmap | n-p | — |

## 23.5 Platform Version Sequence

- **Platform Beta** — D15 (after thematic + integrated analysis spec)
- **Platform V.1** — D16 (thematic models integrated to modules/toolboxes + SDSS)
- **Platform V.2** — D16 (after AI LLM/RAG integration)
- **Platform V.3** — D17 (after limited usability trial)
- **Platform Full Version** — D18 (after broader trials + full evaluation)

## 23.6 Payment Phases (TOR Annex 5)

| Phase | Deliverables | Key Events | Reports | Others |
|-------|--------------|------------|---------|--------|
| Advance Payment | — | — | Inception Report | — |
| Phase 1 | D1, D2, D3, D4 | Kick-off; FGD #1; Data Validation Group 1; Result Validation Group 1 | QPR Q1 | — |
| Phase 2 | D5, D6, D7, D8 | FGD #2; Data Validation Group 2; Result Validation Group 2 | Fiscal Year Report; QPR Q2, Q3 | Softcopy 1 TB HD |
| Phase 3 | D9, D10, D11 | Data Validation Group 3; Result Validation Group 3 | QPR Q4, Q5 | — |
| Phase 4 | D3 (extended), D12, D13, D14, D15, D16 | FGD #3; Workshop #1; FGD #4 | Fiscal Year Report; QPR Q6, Q7 | Softcopy 1 TB HD |
| Phase 5 | D17, D18, D19, D20, D21 | Workshop #2; FGD #5; Launching Platform | QPR Q8; Final Report; Technical Docs; Spec & Guideline; Multi-Year Financial | Softcopy 1 TB HD |

## 23.7 Indicative Timeline (TOR Annex 1)

21 deliverables di-sequence lintas 9 kuartal (Q1-Q9), months 1-27. Detailed work plan di-produce di **Inception Report**, aligned dengan TOR Annex 1 indicative timeline.

## 23.8 Plugin Development Roadmap (Aligned to Versions)

| Phase | Months | Platform Version | Plugins Delivered | Squad Focus |
|-------|--------|------------------|-------------------|-------------|
| **Inception** | M1-M3 | — | (none — concept design, PRD validation, PoC plan) | All squads onboarding |
| **PoC** | M4-M6 | — | Main App skeleton + 3 plugin (bcp-modeling-climate, bcp-vuln-mcda, bcp-ai-nlq) | Foundation, Modeling Core, AI |
| **Beta** | M7-M9 | **Beta (D15)** | Main App + Foundation (~10 plugin): bcp-svc-auth, bcp-svc-audit, bcp-svc-notification, bcp-data-catalog, bcp-mcp, bcp-ai-rag, bcp-modeling-climate, bcp-vuln-mcda, bcp-viz-map, bcp-sdss-mcda | All squads |
| **V.1** | M10-M15 | **V.1 (D16a)** | All Bagian 2 modeling (6), all Bagian 3 vuln (2), selected Bagian 4 sectoral (RDTR, coastal, fire), bcp-sdss-scenario, bcp-sdss-impact, bcp-int-onemap, bcp-int-bmkg, bcp-int-bnpb | Modeling, Vuln/Sectoral, SDSS, Integration |
| **V.2** | M16-M18 | **V.2 (D16b)** | AI/LLM/RAG full (bcp-ai-image-recog, bcp-ai-anomaly, bcp-ai-predictive, bcp-ai-scenario, bcp-ai-xai), all SDSS Core (10), all Bagian 8 viz (4) | AI, SDSS, Viz |
| **V.3** | M19-M21 | **V.3 (D17)** | Bagian 7 Collaboration (3), Bagian 11 Hindcasting (2), Mobile PWA refinement, all Bagian 13 integrations (5), remaining Bagian 4 sectoral | Collab, Hindcast, Integration |
| **Full** | M22-M24 | **Full Version (D18)** | Bagian 12 Edge/Mobile (3), bcp-ai-federated, Crisis Mode E2E, performance optimization, all 62 plugin in production | Edge, AI specialty, polishing |
| **Validation & Handover** | M25-M27 | — | UAT wider audience, documentation finalized, capacity building, implementation roadmap | All + cross-squad documentation |

## 23.9 Critical Path & Dependencies

```
M1-M3 Inception (concept + plan)
   │
   ▼
M4 PoC start ───────────────────────────────────────────────────────────────────────
   │
   ▼ M4: Main App scaffold + bcp-svc-auth (foundational)
   │
M6 PoC end ─ Y/N gate: PoC pass? ───────────────────────────────────────────────────
   │ Y
   ▼
M7-M9 Beta (D15) ───────────────────────────────────────────────────────────────────
   │
   ▼ Group 1 data collection in parallel
   │
M10-M15 V.1 (D16a) ─────────────────────────────────────────────────────────────────
   │  Group 1 model validation Y/N gate
   │
M16-M18 V.2 (D16b) ─ AI/LLM ───────────────────────────────────────────────────────
   │
M19-M21 V.3 (D17) ─ Pilot UAT Y/N gate ─────────────────────────────────────────────
   │
M22-M24 Full (D18) ─────────────────────────────────────────────────────────────────
   │  Group 2 & 3 data collection & analytics in parallel from M10
   │
M25-M27 Validation, Handover, Roadmap ─────────────────────────────────────────────
```

---

# 24. Personnel, Roles, Responsibilities

## 24.1 Personnel Categories (TOR §9, Annex 2, Annex 3)

Service Provider memobilisasi **Key Personnel** (subject to technical evaluation), **Non-Key Personnel** (approved individually by BIG), dan **Supporting Personnel**.

Per TOR §9: hanya CV Key Personnel di-score sebagai bagian dari technical evaluation; qualifications melebihi minima adalah advantage. CV Non-Key dan Supporting tidak di-score tapi BIG review individually. Winning firm wajib replace experts unacceptable selama negosiasi kontrak.

## 24.2 Key Personnel Summary (TOR Annex 3)

| # | Role | PM | Edu Min | Exp Min |
|---|------|-----|---------|---------|
| 1 | **Disaster Management Expert / Team Leader** | 27 | Master Disaster Mgmt / Earth Sci / Env Sci / Climate Adaptation / Resilience | 5 yrs |
| 2 | **GIS Expert (Modelling Analysis)** | 27 | Master Geography / Geomatics / Geoinformatics / Remote Sensing / Env Sci / Climate Sci | 3 yrs |
| 3 | **Programming (Application) Expert** | 27 | Master CS / IT / Information Systems / Geoinformatics | 3 yrs |
| 4 | **Spatial DSS Programming Expert** | 27 | Master CS / Geoinformatics / GIS / Data Sci | 3 yrs |
| 5 | **AI & ML Expert** | 27 | Master CS / Data Sci / Statistics / Eng with AI/ML/DL focus | 3 yrs |

## 24.3 Non-Key Personnel Summary (TOR Annex 3)

| # | Role | PM | Edu Min | Exp Min |
|---|------|-----|---------|---------|
| 6 | **IT Infrastructure Expert** (×2 staffing: 12+8) | 20 | Master IT / Computer Eng / Information Sys / Cloud | 3 yrs |
| 7 | **Remote Sensing Expert** (×2: 6+6) | 12 | Master Remote Sensing / Geoinformatics / Geography / Env / Climate | 3 yrs |
| 8 | **Geospatial Database Expert** (×2: 20+16) | 36 | Master CS / Information Sys / Geography / Geodesy / Geoinformatics | 3 yrs |
| 9 | **Geodetic / Geodynamic Expert** | 9 | Master Geodesy / Geophysics / Geoinformatics | 3 yrs |
| 10 | **Meteorologist / Climatologist** | 9 | Master Meteorology / Climatology / Atmos Sci / Climate Sci / Geography | 3 yrs |
| 11 | **Flood Modelling Expert** | 9 | Master Civil Eng / Hydrology / Env Eng / Geography / Water Resources | 3 yrs |
| 12 | **Climate Mitigation Expert** | 9 | Master Env Sci / Climate / Geography / Forestry / Env Economics | 3 yrs |

## 24.4 Supporting Personnel (TOR Annex 2 Table 4)

| # | Role | PM | Edu Min |
|---|------|-----|---------|
| 13 | **Bilingual Secretary** | 27 | Bachelor Secretarial / Business Admin / English Lit / Int'l Relations |

## 24.5 Personnel Totals

- **Total Personnel positions**: 16 (termasuk duplicate IT Infra / RS / GeoDB staffed sequentially)
- **Total Person-Months**: 267

## 24.6 Time Distribution by Quarter

TOR menentukan monthly allocation per position lintas M1-M27. Key personnel (1-5) + Bilingual Secretary continuous M1-M27. Posisi lain scheduled di phase spesifik per Annex 3.

## 24.7 Mapping Personnel ke Squad (v2.0)

| Personnel | Squad / Role di Tim BIGCA |
|-----------|---------------------------|
| Team Leader (Disaster Mgmt Expert) | Cross-squad: Program Manager + Architect Lead |
| GIS Expert (Modelling Analysis) | Squad B+C (Modeling) lead OR cross-squad GIS architect |
| Programming (Application) Expert | Squad A (Foundation) lead atau Main App development |
| Spatial DSS Programming Expert | Squad E (SDSS Core) lead atau cross-squad SDSS architect |
| AI & ML Expert | Squad F (AI/ML) lead |
| IT Infrastructure Expert | DevOps Lead, infra setup, K8s, Vault, registry |
| Remote Sensing Expert | Squad B (Modeling Core) — Landsat/Sentinel pipelines |
| Geospatial Database Expert | Cross-squad: PostGIS schema design, query optimization |
| Geodetic / Geodynamic Expert | Squad C — bcp-modeling-slr (InSAR, GNSS) |
| Meteorologist / Climatologist | Squad B — bcp-modeling-climate, BMKG MoU coordinator |
| Flood Modelling Expert | Squad C — bcp-modeling-flood-drought (HEC-RAS, SWAT) |
| Climate Mitigation Expert | Squad B — bcp-modeling-carbon (IPCC, MRV, NDC) |
| Bilingual Secretary | Support all squads (admin, translation, document mgmt) |

Detail per-personnel job description di TOR Annex 2 dan PRD v1.2 §21.7 (carry-forward, tidak diulang verbatim di v2.0 untuk hemat ruang).

## 24.8 Project Organization

Service Provider submit, sebagai bagian Technical Proposal (TOR §10.e):

- Detailed work-implementation approach
- Proposed project organizational structure
- Job descriptions untuk semua key positions

---

# 25. Stakeholder Engagement & Capacity Building

## 25.1 Stakeholder Engagement Series (TOR Annex 6 §2.1.1, Tabel 9)

| # | Event | Theme | Location | Output | Participants |
|---|-------|-------|----------|--------|--------------|
| 1 | Project Kick-off | Introduction; alignment scope, goals, roles | Bogor | Initial workplan + communication protocol | 40 (32+6+1+1) |
| 2 | FGD #1 | Concept dan Design Platform | Bogor | Conceptual model; system components; design principles | 40 (33+6+1) |
| 3 | FGD #2 | Preliminary Review Climate Risk Assessment | Bogor | Gaps dalam data dan analysis | 40 |
| 4 | FGD #3 | Thematic Priorities Integrating Climate Risk + Spatial Planning | Bogor | Prioritized thematic areas; integration roadmap | 40 |
| 5 | FGD #4 | Regional Review Integration Process | Bogor | Refined workflow; regional constraints + enablers | 40 |
| 6 | FGD #5 | System Functional Requirements untuk SDSS | Bogor | Documented FRs; technical specs; prioritized features | 40 |
| 7 | Workshop #1 | Development dan Operationalization Plan | Bogor | System architecture; analytical approaches; draft plan | 60 (52+7+1) |
| 8 | Workshop #2 | Data Integration + Detailed Implementation Plan (RDTR) | Bogor | Validated datasets; RDTR structure + content; detailed plan | 60 |
| 9 | Platform Launching | Introduce platform; demonstrate; gather feedback | Jakarta | Official launch + feedback | 200 (190+8+1+1) |

## 25.2 Meeting Cost Components

Setiap event:
1. Fullday meeting package
2. Per diem (daily allowance)
3. Honoraria (MC, moderator, Professionals)
4. Moderator wajib di setiap event
5. MC wajib di Kick-off + Launching
6. Round-trip ground transport untuk professionals
7. Round-trip airfare + hotel untuk professionals out-of-town

## 25.3 Participant Profile

Workshops + FGDs include 2 Echelon-II + 4 Echelon-III officials. Participatory design methodologies. Sectoral FGDs target spatial planning, agriculture, water resources, coastal mgmt, forestry, disaster response.

## 25.4 Working Groups & Knowledge Co-Production

- Working groups integrate traditional knowledge holders + scientific experts
- Knowledge co-production combining local experience + technical data
- Strong collaboration framework untuk robust geospatial data utilization ecosystem

## 25.5 Capacity Building (TOR §3.c, Annex 2 Team Leader)

- **Dissemination** platform + climate action models ke stakeholders
- **Capacity-building initiatives** untuk technology adaptation+mitigation
- **Knowledge transfer protocols** untuk institutional capacity (Team Leader responsibility)
- **Translation technical info → actionable insights** untuk policy audiences
- **Communities of practice** lintas priority provinces

## 25.6 Dissemination Materials (TOR Annex 6 §1.3.e)

- Outreach programs, workshops, technical assistance
- Educational materials: brochures, videos, presentations
- Seminars dan conferences

## 25.7 Plugin-Specific Capacity Building (v2.0)

Beyond TOR baseline, BIGCA plugin architecture memerlukan:

- **Plugin Developer Onboarding** — internal BIG IT team trained untuk maintain plugin pasca-kontrak
- **Plugin Operations Training** — DevOps tim BIG dilatih untuk dispatcher operations, signing workflow, registry management
- **Train-the-Trainer** — Service Provider train ToT batch yang kemudian disebar ke K/L + Pemda
- **Plugin Marketplace browsing** — admin training untuk plugin registry, lihat capability, dependency, status

---

# 26. QA, Testing, Validation

## 26.1 QA Approach

QA embedded lintas lifecycle per TOR Annex 6 §2.1.4 dan §2.2:

- **Verification**: Conformance ke design specs; standardized model documentation
- **Validation**: Real-world performance vs historical, journals, standards
- **Cross-validation**: Across all pilot provinces
- **Hindcasting**: Vs observed climate impacts decades past
- **Expert review panels**: Climate scientists + local knowledge
- **Field testing**: Di pilot provinces sebelum national deployment

## 26.2 Testing Types

| Test Type | Description |
|-----------|-------------|
| Implementation testing | Processing speed, accuracy, resilience |
| Accessibility testing | Across devices dan bandwidth |
| Performance testing | Under bandwidth constraints (remote areas) |
| Security penetration testing | By qualified assessors |
| UAT | Local officials, planners, community, technical staff |
| A/B testing | For model comparison |
| Automated testing | CI/CD pipelines |
| Cross-validation | Spatial models across diverse contexts |
| **Plugin contract testing (v2.0)** | Per plugin vs Main App; per plugin vs GeoVertix |
| **Persona walkthrough (v2.0)** | 5 persona × 10 user flows via Playwright |
| **Capability boundary testing (v2.0)** | Verify Dispatcher 403 untuk request di luar declared capability |
| **Plugin signing verification (v2.0)** | Production admission controller reject unsigned |

## 26.3 Validation Activities Logistics (TOR Annex 6 §2.1.4)

- 2 rounds per location per phase
- Team 5 personnel per round
- 5 days per round
- Budget: on-site allowances, akomodasi, transport, kendaraan

## 26.4 Validation Reporting

**Formal validation report** per model:
- Performance metrics
- Limitations
- Appropriate use cases

## 26.5 Per-Plugin Testing Strategy (v2.0)

Per FR-PLG-09 dan §22.2 Step 4:

| Layer | Tests | Tool |
|-------|-------|------|
| Unit | ≥ 80% coverage per plugin | pytest (Python), Vitest (TS) |
| Integration | Per public endpoint | pytest + httpx, Vitest + supertest |
| Contract | Vs Main App + GeoVertix touchpoints | Pact, Dredd, atau custom |
| Performance | Per plugin load test | k6 atau Locust |
| Security | Image scanning + dependency scanning + SAST | Trivy, Snyk, Bandit, Semgrep |
| Accessibility | UI plugin a11y | axe-core, Lighthouse |
| Visual regression | UI plugin | Chromatic atau Percy |
| E2E | Per persona walkthrough | Playwright |

## 26.6 Quality Gates

| Gate | Threshold |
|------|-----------|
| PR merge | All CI green |
| Plugin tag | Validator strict pass + tests green |
| Staging deploy | Auto via ArgoCD post-sign |
| Production deploy | Manual approval + staging stability ≥ 1 minggu + KPI baseline |
| Major version bump | Architect Lead approval + 30-day deprecation notice for breaking |

---

# 27. Reporting, Monitoring, Evaluation

## 27.1 Report Types (TOR §12)

7 jenis report:

| # | Report | Frequency | Description |
|---|--------|-----------|-------------|
| R1 | **Inception Report** | Sekali, ≤ 1 bulan post-commencement | Detailed work plan |
| R2 | **Quarterly Progress Reports (Q1-Q8)** | Every 3 months | Project performance summary + activities + deliverables per Annex 2 |
| R3 | **Annual Progress Report** | Annual | Project updates, performance, challenges, risks, outlook |
| R4 | **Fiscal Year Financial Report** | End fiscal year | Per schedule; consolidated Multi-Year Contract Financial Report at end |
| R5 | **Final Report** | 2 weeks pre-contract end | Comprehensive coverage; academic manuscripts; policy recs |
| R6 | **Technical Documents on Geospatial Data Utilization** | At end | Whole process: methods, workflows, architecture, governance, validation, challenges |
| R7 | **Specification & Guideline Data Utilization Platform** | At end | Functionalities, structures, roles, access, SOPs, standards, interoperability |

## 27.2 Reporting Format (TOR §12.b, c, d, e)

- Setiap report **duplicate**, **bilingual (EN + ID)**
- Report + data dari project di-deliver di **1 TB hard drive, two copies per year**
- Reports support transparency, monitoring, completion
- Payment schedule corresponds ke deliverables + reports (Annex 4 + 5)

## 27.3 Monitoring Framework (TOR Annex 6 §2.2)

- **KPI framework** combining technical metrics (uptime, response, data quality) + impact indicators
- **Formal supervision** by Contracting Authority; technical meetings 2x/month, ~30 participants
- **Accessible monitoring tools** during dev + stakeholder phases: real-time performance dashboards
- **Periodic quality + effectiveness evaluations** via forms, surveys/interviews, data analysis
- **Mixed-methods evaluation** combining quantitative + qualitative
- **Lessons-learned database** maintained
- **Quarterly review cycles** dengan formal go/no-go decision points

## 27.4 Periodic Reporting Content

Reports communicate monitoring (QC) + evaluation (QE) results dengan informative data visualizations dan include improvement recommendations.

## 27.5 Plugin-Level Monitoring (v2.0)

Per NFR-PLG-03 dan §22.11:

- Plugin status dashboards di Grafana per squad
- Plugin health/uptime/SLO tracking
- Plugin dependency graph + integration test status
- Quarterly per-plugin performance review

## 27.6 Reuse-First Methodology Reporting (v2.0)

Per §21.7 Step 5 dan KPI-R01:

- Portfolio-level reuse statistics di Quarterly Progress Report
- Per-plugin: pattern used, GeoVertix endpoints invoked, version pin, fallback behaviour, estimated vs actual effort
- Aggregate savings vs greenfield tracked at portfolio level
- Standing agenda di quarterly review meetings

---

# 28. Risks & Mitigation

Risk register illustrative; Service Provider maintain dan update full risk register sejak Inception Phase.

## 28.1 Risk Register

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R-01 | Data availability gaps lintas provinsi prioritas | Medium | High | Phased rollout; geographical sequencing revisable per TOR §6.b; close coord data custodians |
| R-02 | Interoperability barriers dengan national systems existing | Medium | High | Early engagement BMKG, BNPB, KLHK, BPS; OGC/ISO adherence; staged integration |
| R-03 | Performance under peak load (disaster events) | Medium | High | Cloud-native auto-scaling; caching; load balancing; bandwidth-constrained testing |
| R-04 | AI/ML model accuracy + bias | Medium | High | Explainable AI; bias detection; human-in-the-loop; field validation; expert review |
| R-05 | Stakeholder adoption resistance | Medium | Medium | Participatory design; tailored capacity building; multilingual UX; tutorials |
| R-06 | Data sovereignty + privacy concerns | Low-Medium | High | PP 71/2019 + UU PDP compliance; data anonymization; RBAC |
| R-07 | Sustainability beyond contract | Medium | High | Sustainability strategy (Team Leader); knowledge transfer; documentation; local-lang docs |
| R-08 | Schedule slippage | Medium | Medium | Quarterly reviews + go/no-go gates; agile iteration; clear deliverable-payment linkage |
| R-09 | Connectivity limitations remote areas | High | Medium | Offline-capable PWA; edge computing; mobile-optimized; data synchronization |
| R-10 | Security incidents | Low | High | E2E encryption; zero-trust; pen testing; incident-response procedures |
| R-11 | Talent retention 27-bulan | Medium | Medium | Clear staffing plan; replacement protocols dengan BIG approval per TOR §9 |
| R-12 | Mismatch outputs Platform vs RDTR/BPN workflows | Medium | High | Direct engagement ATR/BPN; FGD targeted RDTR; iterative validation |
| R-13 | **GeoVertix platform unavailability/downtime** | Medium | High | Circuit breaker every integration (FR-GVX-02); cached fallback (FR-GVX-07); SLA (§17.5); offline/native fallback critical disaster features |
| R-14 | **GeoVertix API contract changes break SDSS** | Medium | High | Contract test suite CI (FR-GVX-06); version pinning (FR-GVX-08); 30-day deprecation notice; quarterly drift review |
| R-15 | **GeoVertix plugin behaviour changes (silent upgrade)** | Medium | Medium | Pin plugin versions; integration tests across upgrades; coordinate release windows dengan GeoVertix team |
| R-16 | **Licensing/commercial terms GeoVertix API consumption** | Low-Medium | High | Negotiate licence terms during Inception (§29.2); document permissible usage; counterpart letter BIG confirming SDSS authorized consumer |
| R-17 | **Latency cross-platform calls degrade UX** | Medium | Medium | Aggressive caching SDSS edge; batching; async via Tasks API + SSE; budget < 50ms overhead |
| R-18 | **Misclassification integration pattern (over/under-estimate reuse)** | Medium | Medium | Concept Design (§21.2) validates each pattern; pattern reclassification protocol; portfolio reuse % tracked quarterly |
| **R-19 (v2.0)** | **Plugin boundary violations** — plugin akses data di luar declared capability | Medium | High | Dispatcher enforce capability (FR-PLG-11); audit log capability violations; quarterly capability review |
| **R-20 (v2.0)** | **Plugin contract drift** — plugin internal change breaks consumer | Medium | High | OpenAPI spec versioned, contract tests gate CI; 30-day deprecation untuk breaking changes |
| **R-21 (v2.0)** | **Signing bottleneck** — Lead Developer overwhelmed signing requests | Medium | Medium | SLA signing ≤ 2 business days; signing automation tooling; delegated reviewer Y2+ |
| **R-22 (v2.0)** | **Inter-plugin circular dependency** | Low | Medium | Architect Lead review dependencies di Concept Design; event-driven Kafka decoupling untuk loops |
| **R-23 (v2.0)** | **Plugin port collisions** | Low | Low | Validator enforce range 9300-9399 unique; PINS.json registry; CI fail on conflict |
| **R-24 (v2.0)** | **Module Federation runtime incompatibilities** — plugin UI version mismatch shell | Medium | Medium | Strict version pinning untuk shared deps (React, UI Kit); semver discipline; runtime version check; fallback dynamic import error boundary |
| **R-25 (v2.0)** | **Plugin observability overhead** — telemetry slow plugin requests | Low | Medium | Telemetry budget ≤ 10ms p95 (NFR-PLG-09); sampling untuk traces; async log shipping |
| **R-26 (v2.0)** | **Polyglot tech stack complexity** — Python + Node + TS support overhead | Medium | Medium | Limit stack ke max 2-3 languages; centralized SDK per language; shared CI templates |
| **R-27 (v2.0)** | **Edge box hardware procurement delay** | Medium | Medium | Defer ke Y2/Y3; phased rollout; Mobile PWA fallback untuk areas Y1; alternative hardware vendors |
| **R-28 (v2.0)** | **Plugin signing key compromise** | Low | Critical | Vault-based key storage; HSM if available; key rotation procedures; emergency response runbook |

---

# 29. Assumptions, Dependencies, Constraints

## 29.1 Assumptions

- Contracting Authority provide access data dasar + citra satelit via koordinasi K/L (TOR §6.c)
- Contracting Authority provide administrative support untuk koordinasi (TOR §6.c)
- Funding IBRD Loan 9732-ID available per DIPA BIG (TOR §5)
- Counterpart agencies (BMKG, BNPB, KLHK, BPS, ATR/BPN) provide timely cooperation untuk data integration

## 29.2 Dependencies

### Data & Service Dependencies (Counterpart Agencies)

- BMKG climate projection datasets + methodologies
- BNPB InaRISK + InaSAFE APIs/services
- One Map Policy geoportal endpoints
- KLHK SIGN-SMART + forest monitoring continued operation
- BPS socio-economic data services

### Foundation Platform Dependency

**GeoVertix / GeoPortal platform** — SDSS bergantung GeoVertix operational, stable API contracts (per §17.5), untuk 21 REST categories, 6 OGC services, 16 reusable plugins. Specifically:

- **Licence/authorization** SDSS invoke GeoVertix APIs di production, agreed during Inception
- **JWT service account** dengan scopes appropriate (auth, plugins, layers, OGC)
- **SLA** covering uptime, latency, contract change notification, incident escalation
- **Operational contact** di GeoVertix team untuk triage + joint debugging
- **Stable behaviour** 16 reusable plugins dengan version pinning where supported

### Internal Platform Dependencies (v2.0)

- **BIGCA Plugin SDK** library (Python + TypeScript) — built early Y1, maintained throughout
- **BIGCA UI Kit** (`@bigca/ui-kit`) — built parallel with Main App
- **Plugin Dispatcher** + **Plugin Registry** (Harbor + metadata DB) — built Y1
- **Signing infrastructure** — Vault + signing automation tools — built late Y1 / early Y2

## 29.3 Constraints

- **Funding**: IBRD Loan 9732-ID Komponen 4, per DIPA BIG
- **Duration**: 27 bulan (TOR §8)
- **Geographical**: 18 provinsi prioritas dalam 3 cohort (TOR §6.b)
- **Home base**: Jakarta area + sekitar (TOR §6.b)
- **Bilingual deliverables**: Bahasa Indonesia + English (TOR §12.b)
- **Data delivery medium**: 1 TB hard drive, 2 copies per year (TOR §12.c)
- **Confidentiality**: NDA on award (TOR §10.f)
- **Plugin port range**: 9300-9399 (v2.0)
- **Container base image**: Debian 12 / Ubuntu 22.04 LTS (v2.0)
- **K8s version target**: 1.28+ (v2.0)

---

# 30. Acceptance Criteria

Platform di-deem accepted jika semua berikut satisfied:

## 30.1 Deliverable Acceptance

- Semua 21 deliverables (D1-D21) submitted, reviewed, approved
- Semua 7 report types submitted (EN + ID, duplicate)
- 1 TB hard drives (2 copies per year) delivered dengan data + reports

## 30.2 Functional Acceptance

- Semua FR-* demonstrated dalam working software
- 6 advanced thematic models (FR-TM-A-01..06) + integrated analytical process (FR-TM-B-01..08) operational
- SDSS dengan AI/LLM/RAG integration operational (Platform Full Version)
- Integration minimum One Map Portal, BMKG, BNPB InaRISK demonstrated
- **GeoVertix Integration Requirements (FR-GVX-01..10) demonstrated** dengan minimum 3 working integration patterns (A, B atau C, dan D) + 1 pure-native (E) feature delivered E2E
- **Plugin Architecture Requirements (FR-PLG-01..20) demonstrated** — all 62 plugins (atau jumlah final post-consolidation) deployed, manifest signed, capability-scoped (v2.0)

## 30.3 Non-Functional Acceptance

- ≥ 500 concurrent users supported saat simulated peak load
- Sub-second response untuk common map operations
- OGC, ISO 19115, SPBE compliance demonstrated
- Security audit + pen testing completed + remediated
- Bilingual UI (ID/EN) operational
- Mobile-responsive + offline-capable PWA features operational
- **Plugin SLA achieved (v2.0)** — handshake ≤ 30s, /health < 200ms p95, sync ops < 2s p95, dispatcher availability ≥ 99.9%
- **WCAG 2.1 AA compliance (v2.0)** — Lighthouse + axe-core CI passing; manual screen reader audit completed

## 30.4 Coverage Acceptance

- Semua 18 (atau 19) provinsi prioritas processed via analytical pipeline
- ≥ 3 pilot case studies completed dan documented
- Integrasi ke RDTR preparation demonstrated untuk semua 3 project location groups

## 30.5 Dissemination Acceptance

- Semua Stakeholder Engagement events (Kick-off, FGD #1-5, Workshop #1-2, Launching) executed as scheduled
- Capacity-building materials produced + disseminated
- Implementation roadmap (D21) finalized + periodic monitoring + reporting scheme

## 30.6 Reuse Acceptance

- **Aggregate reuse target** — ≥ 50% in-scope feature implementation effort saved via GeoVertix reuse vs greenfield baseline. Tracked via portfolio metrics quarterly
- **Per-feature pattern classification** — Setiap 62 fitur memiliki documented integration pattern (A/B/C/D/E)
- **Contract test coverage** — Every GeoVertix integration touchpoint memiliki passing contract test di CI (FR-GVX-06)
- **Fallback behaviour documented** — Every pattern A-D feature memiliki documented fallback per FR-GVX-07
- **GeoVertix integration logs operational** — FR-GVX-10 logging operational + visible di dashboards

## 30.7 Plugin Architecture Acceptance (v2.0)

- **Manifest compliance** — Setiap plugin memiliki `plugin.json` valid sesuai schema, di-validate via `bcp-plugin-validate --strict` di CI
- **Capability scoping** — Semua plugin declare capabilities; Dispatcher enforce; audit log capability violations
- **Plugin signing** — Production deploys mandatory signed; admission controller verify signature
- **OpenAPI compliance** — Setiap plugin `openapi.yaml` valid OAS 3.0; auto-generated dari code; di-publish
- **Contract test coverage** — Setiap plugin punya contract tests untuk Main App + GeoVertix integrations
- **Per-plugin observability** — Logs, metrics, traces aggregated centralized; Grafana dashboards per squad
- **Plugin micro-frontend (jika ada UI)** — Module Federation works, dynamic loading, error boundary, shared deps versioning
- **Plugin documentation** — Setiap plugin punya README + CHANGELOG + contract.md + ADR records
- **Plugin team ownership** — CODEOWNERS file, code review enforced
- **Plugin SDK + UI Kit** — `bigca-plugin-sdk` (Python + TS) + `@bigca/ui-kit` published + used konsisten lintas plugin
- **Plugin Registry** — Harbor + metadata DB tracking all plugins, versions, deployments, signatures
- **Plugin lifecycle automation** — CI/CD pipelines per plugin, ArgoCD GitOps deployment, automated rollback ready

## 30.8 UI/UX Acceptance (v2.0)

- All 8 design principles (§19.1) reflected in implementation
- All 10 navigation modules functional (§19.2)
- 8 navigation components persistent across pages (§19.4)
- Dashboard 8 zones implemented dengan persona variants (§19.5)
- 10 user flows tested via Playwright E2E (§19.7)
- Component library `@bigca/ui-kit` complete dengan Storybook + visual regression
- Visual design system tokens implemented konsisten
- Performance budget achieved (FCP < 1.5s, LCP < 2.5s, TTI < 3.5s, CLS < 0.1)
- Persona walkthrough tests passing untuk 5 persona × 10 flow

---

# 31. Glossary & Acronyms

| Term / Acronym | Definition |
|----------------|------------|
| **AHP** | Analytic Hierarchy Process (MCDA method) |
| **AI** | Artificial Intelligence |
| **API** | Application Programming Interface |
| **ATR/BPN** | Kementerian Agraria dan Tata Ruang / Badan Pertanahan Nasional |
| **Bappenas** | Kementerian Perencanaan Pembangunan Nasional |
| **bcp-*** | BIGCA Plugin (naming prefix, v2.0) |
| **BIG** | Badan Informasi Geospasial |
| **BIGCA** | BIG Climate Action (singkatan platform v2.0) |
| **BMKG** | Badan Meteorologi, Klimatologi, dan Geofisika |
| **BNPB** | Badan Nasional Penanggulangan Bencana |
| **BPS** | Badan Pusat Statistik |
| **BRIN** | Badan Riset dan Inovasi Nasional |
| **CCDC** | Continuous Change Detection and Classification |
| **CI/CD** | Continuous Integration / Continuous Deployment |
| **CMIP6** | Coupled Model Intercomparison Project Phase 6 |
| **CNN** | Convolutional Neural Network |
| **COG** | Cloud Optimized GeoTIFF |
| **CORDEX-SEA** | Coordinated Regional Climate Downscaling Experiment — Southeast Asia |
| **CVI** | Coastal Vulnerability Index |
| **DIPA** | Daftar Isian Pelaksanaan Anggaran |
| **DSS** | Decision Support System |
| **ENSO** | El Niño-Southern Oscillation |
| **ETL** | Extract, Transform, Load |
| **FAIR** | Findable, Accessible, Interoperable, Reusable |
| **FGD** | Focus Group Discussion |
| **GCM** | Global Circulation/Climate Model |
| **GHG** | Greenhouse Gas |
| **GIS** | Geographic Information System |
| **GNSS** | Global Navigation Satellite System |
| **GRIB** | GRIdded Binary |
| **gxp-*** | GeoVertix Plugin (naming prefix) |
| **HEC-HMS / HEC-RAS** | Hydrologic Engineering Center Hydrologic / River Analysis System |
| **IBRD** | International Bank for Reconstruction and Development (World Bank) |
| **IGD** | Informasi Geospasial Dasar |
| **IGT** | Informasi Geospasial Tematik |
| **ILASPP** | Integrated Land Administration and Spatial Planning Project |
| **InaRISK / InaSAFE** | BNPB disaster risk / impact assessment platforms |
| **InSAR** | Interferometric Synthetic Aperture Radar |
| **IoT** | Internet of Things |
| **IPCC** | Intergovernmental Panel on Climate Change |
| **ISO** | International Organization for Standardization |
| **JIGN** | Jaringan Informasi Geospasial Nasional |
| **JWT** | JSON Web Token |
| **K/L** | Kementerian / Lembaga |
| **K8s** | Kubernetes |
| **KLH / KLHK** | Kementerian Lingkungan Hidup / Lingkungan Hidup dan Kehutanan |
| **LCZ** | Local Climate Zone |
| **LLM** | Large Language Model |
| **LTS-LCCR** | Long-Term Strategy for Low Carbon and Climate Resilience |
| **LULC** | Land Use / Land Cover |
| **LULUCF** | Land Use, Land-Use Change and Forestry |
| **MCDA** | Multi-Criteria Decision Analysis |
| **MCP** | Model Context Protocol |
| **ML** | Machine Learning |
| **MLOps** | Machine Learning Operations |
| **MoU** | Memorandum of Understanding |
| **MRV** | Measurement, Reporting, and Verification |
| **MVT** | Mapbox Vector Tiles |
| **NDC** | Nationally Determined Contributions |
| **NetCDF** | Network Common Data Form |
| **NSGA-II** | Non-dominated Sorting Genetic Algorithm II |
| **OGC** | Open Geospatial Consortium |
| **OIDC** | OpenID Connect |
| **OAS / OpenAPI** | OpenAPI Specification |
| **PB / Perppu** | Peraturan Pemerintah / Pengganti Undang-Undang |
| **PIU** | Project Implementation Unit |
| **PostGIS** | PostgreSQL spatial extension |
| **PPK** | Pejabat Pembuat Komitmen |
| **PRD** | Product Requirements Document |
| **PWA** | Progressive Web Application |
| **QPR** | Quarterly Progress Report |
| **RAG** | Retrieval-Augmented Generation |
| **RBI** | Rupa Bumi Indonesia |
| **RBAC / ABAC** | Role-Based / Attribute-Based Access Control |
| **RDTR** | Rencana Detail Tata Ruang |
| **RPJMN / RPJMD** | Rencana Pembangunan Jangka Menengah Nasional / Daerah |
| **SaaS** | Software as a Service |
| **SD** | System Dynamics |
| **SDG** | Sustainable Development Goal |
| **SDI** | Spatial Data Infrastructure |
| **SDK** | Software Development Kit |
| **SDSS** | Spatial Decision Support System |
| **SHAP** | SHapley Additive exPlanations |
| **SIKD / OneSSO** | Sistem Identitas Kependudukan Digital / Single Sign-On |
| **SLR** | Sea Level Rise |
| **SPBE** | Sistem Pemerintahan Berbasis Elektronik |
| **SPI / SPEI** | Standardized Precipitation Index / Evapotranspiration Index |
| **SRGI** | Sistem Referensi Geospasial Indonesia |
| **SSE** | Server-Sent Events |
| **STAC** | SpatioTemporal Asset Catalog |
| **TOR** | Terms of Reference |
| **UAT** | User Acceptance Testing |
| **UNFCCC** | United Nations Framework Convention on Climate Change |
| **UU PDP** | Undang-Undang Pelindungan Data Pribadi |
| **VPN** | Virtual Private Network |
| **WCAG** | Web Content Accessibility Guidelines |
| **WCS / WFS / WMS** | Web Coverage / Feature / Map Service (OGC) |
| **XAI** | Explainable AI |

## 31.1 Plugin Glossary (v2.0)

| Term | Definition |
|------|------------|
| **Main App (Shell)** | Aplikasi utama BIGCA berisi halaman utama, navigasi, auth, dispatcher, integration adapter |
| **BIGCA Plugin (bcp-*)** | Containerized service yang mengimplementasi fitur besar, di-develop paralel |
| **GeoVertix Plugin (gxp-*)** | Plugin GeoVertix existing yang di-reuse via API call dari BIGCA |
| **Dispatcher** | Service yang routing request `/api/v1/plugin/<name>/*` ke plugin yang sesuai |
| **Manifest (plugin.json)** | File JSON yang declare identitas plugin, port, capabilities, dependencies |
| **Capability** | String `resource:action:scope` yang declare access plugin |
| **Handshake** | One-time HTTP POST plugin → dispatcher saat startup untuk registrasi |
| **Health probe** | Endpoint `/health` yang di-poll dispatcher setiap 30s |
| **Plugin Signing** | OpenSSL signature atas plugin.json + binary_sha256 oleh Lead Developer |
| **Module Federation** | Webpack pattern untuk micro-frontend — plugin UI loaded dinamis ke Shell |
| **Bridge Adapter** | Komponen Main App yang manage panggilan ke GeoVertix (JWT, retry, circuit breaker, fallback) |
| **Pattern A-E** | Integration patterns dengan GeoVertix: A=Direct Reuse, B=API+Extension, C=Multi-Plugin Orchestration, D=Native+GeoVertix Support, E=Pure Native |
| **BIGCA SDK** | Library Python + TypeScript yang plugin pakai untuk handshake, plugin_call, geovertix_call, dll. |
| **UI Kit (@bigca/ui-kit)** | npm package shared component library |
| **Plugin Registry** | Harbor + metadata DB tracking semua plugin + versions + signatures |

---

# 32. Appendices

## Appendix A — Cross-Reference Bundle Documents

| Topic | PRD v2.0 Section | Katalog Fitur v2.2 | Rancangan Halaman Utama v1.0 | GeoVertix API KB | GeoVertix Plugin Guide |
|-------|------------------|---------------------|--------------------------------|------------------|------------------------|
| Plugin Architecture | §10 | §1.4, §15 | — | — | Whole doc (referensi pola) |
| 62 Features detail | §20 plugin catalog | All BAGIAN 2-13 | §4.2, App. B | — | — |
| UI/UX detail | §19 | per fitur "UI/Wireframe" | All sections | — | — |
| GeoVertix integration | §17 | per fitur "Integrasi GeoVertix" | §2.7 GeoVertix-Transparent | All sections | — |
| Tech stack | §9 | — | §14.1 | — | §3 |
| Personas | §6.3 | — | §3 | — | — |
| Acceptance criteria | §30 | — | — | — | — |
| Risks | §28 | — | — | — | §22 |
| Security | §18 | — | — | — | §7, §18 |

## Appendix B — 62 Features → Plugin Mapping (Detailed)

(Detail mapping ada di §20.3. Berikut ringkasan tabular untuk traceability.)

| FITUR | Nama Fitur (BAGIAN Katalog) | Plugin BIGCA | Pattern | Reuse % | Squad |
|-------|------------------------------|---------------|---------|---------|-------|
| 2.1 | Advanced Climate Modeling | bcp-modeling-climate | B | 60% | B |
| 2.2 | LULC Change Detection | bcp-modeling-lulc | C | 65% | B |
| 2.3 | Net Carbon Footprint | bcp-modeling-carbon | D | 25% | B |
| 2.4 | Biodiversity Mapping | bcp-modeling-biodiversity | D | 25% | C |
| 2.5 | SLR & Land Subsidence | bcp-modeling-slr | D | 30% | C |
| 2.6 | Flood & Drought | bcp-modeling-flood-drought | C/D | 35% | C |
| 3.1 | Multi-Criteria Vulnerability | bcp-vuln-mcda | A | 75% | D |
| 3.2 | Dynamic Vulnerability SD | bcp-vuln-dynamic | E | 10% | D |
| 4.1 | RDTR Toolbox | bcp-sectoral-rdtr | C | 70% | D |
| 4.2 | Food Security (Rice) | bcp-sectoral-food | C/D | 30% | D |
| 4.3 | Coastal Vulnerability | bcp-sectoral-coastal | A | 55% | D |
| 4.4 | Forest Fire ENSO | bcp-sectoral-fire | B | 50% | D |
| 4.5 | Tourism Vulnerability | bcp-sectoral-tourism | B | 40% | D |
| 4.6 | Renewable Energy Opt | bcp-sectoral-renewable | A | 55% | D |
| 4.7 | Land Carrying Capacity | bcp-sectoral-carrying-capacity | B | 65% | D |
| 5.1 | Multi-Level Decision Support | bcp-sdss-multilevel | D | 15% | E |
| 5.2 | Scenario Manager | bcp-sdss-scenario | E | 10% | E |
| 5.3 | Impact Analysis Engine | bcp-sdss-impact | D | 30% | E |
| 5.4 | Adaptation Recommendation | bcp-sdss-adaptation | E | 10% | E |
| 5.5 | MCDA Engine | bcp-sdss-mcda | A | 90% | E |
| 5.6 | Context-Aware Recommendation | bcp-sdss-context-aware | D | 30% | E |
| 5.7 | Group Decision-Making | bcp-sdss-group-decision | E | 30% | E |
| 5.8 | What-If Simulator | bcp-sdss-whatif | A | 50% | E |
| 5.9 | Sensitivity Analyzer | bcp-sdss-sensitivity | A | 85% | E |
| 5.10 | Optimization Solver | bcp-sdss-optimization | E | 40% | E |
| 6.1 | Image & Pattern Recognition | bcp-ai-image-recog | A+B | 70% | F |
| 6.2 | Anomaly Detection EWS | bcp-ai-anomaly | D | 35% | F |
| 6.3 | Predictive Modeling | bcp-ai-predictive | B | 65% | F |
| 6.4 | Scenario-Based Analysis | bcp-ai-scenario | D | 30% | F |
| 6.5 | Natural Language Query | bcp-ai-nlq | A | 80% | F |
| 6.6 | RAG Pipeline & KB | bcp-ai-rag | B | 50% | F |
| 6.7 | MCP Server | bcp-mcp | B | 75% | F |
| 6.8 | Federated Learning | bcp-ai-federated | E | 10% | F |
| 6.9 | Explainable AI (XAI) | bcp-ai-xai | D | 30% | F |
| 7.1 | Stakeholder Consultation Workflow | bcp-collab-consultation | E | 30% | G |
| 7.2 | Annotation & Comment System | bcp-collab-annotation | D | 65% | G |
| 7.3 | Scenario Comparison Tool | bcp-collab-compare | B | 15% | G |
| 8.1 | Interactive Map (Advanced) | bcp-viz-map | C | 70% | G |
| 8.2 | Dynamic Dashboards | bcp-viz-dashboard | E | 15% | G |
| 8.3 | Executive Summary Auto-Gen | bcp-viz-exec-summary | D | 35% | G |
| 8.4 | Custom Report Builder | bcp-viz-custom-report | A | 15% | G |
| 9.1 | Auth & Authorization | bcp-svc-auth | B | 50% | A |
| 9.2 | Notification System | bcp-svc-notification | E | 20% | A |
| 9.3 | Audit Logger | bcp-svc-audit | B | 45% | A |
| 9.4 | i18n ID/EN | Built-in Main App | — | 30% | A |
| 9.5 | Onboarding / Tutorial | bcp-svc-onboarding | D | 30% | A |
| 9.6 | API & OGC Services | bcp-svc-api-ogc | B | 60% | A |
| 10.1 | Data Catalog ISO 19115 | bcp-data-catalog | B | 35% | A |
| 10.2 | Data Lineage | bcp-data-lineage | E | 15% | H |
| 10.3 | Data Quality Dashboard | bcp-data-quality | E | 15% | H |
| 10.4 | Stream Processor | bcp-data-stream | E | 10% | H |
| 10.5 | Data Versioning | bcp-data-versioning | B | 35% | H |
| 11.1 | Hindcasting Tool | bcp-hindcast-historical | B | 30% | B |
| 11.2 | Continuous Model Monitor | bcp-hindcast-monitor | D | 15% | B |
| 12.1 | Edge Computing Runtime | bcp-edge-runtime | B | 35% | H |
| 12.2 | Mobile PWA | Built-in Main App | — | 30% | A |
| 12.3 | Model Compression | bcp-edge-model-compression | B | 35% | H |
| 13.1 | One Map Policy BIG | bcp-int-onemap | E | 20% | H |
| 13.2 | BNPB InaRISK/InaSAFE | bcp-int-bnpb | E | 20% | H |
| 13.3 | BMKG Climate Service | bcp-int-bmkg | B | 30% | H |
| 13.4 | KLHK SIGN-SMART | bcp-int-klhk | E | 20% | H |
| 13.5 | BPS Socio-economic | bcp-int-bps | E | 20% | H |

**Total: 62 fitur** → 60 BIGCA plugins (FITUR 9.4 dan 12.2 built-in Main App).

## Appendix C — TOR Compliance Matrix

| TOR Requirement | PRD v2.0 Section |
|-----------------|-------------------|
| TOR §1.a Legal & Regulatory Basis | §2.1 |
| TOR §1.b Scientific Rationale | §2.3 |
| TOR §2.a Vision | §4.1 |
| TOR §2.b Primary Objective | §4.2 |
| TOR §3 Targets | §4.3 |
| TOR §4 Procurement Organization | §2.4 |
| TOR §5 Source of Funding | §2.5 |
| TOR §6.a Scope of Work | §7.1, §13.2 |
| TOR §6.b Geographical Sequencing | §8.2 |
| TOR §6.c Supporting Facilities | §8.4 |
| TOR §7 Coordination & Supervision | §2.6 |
| TOR §8 Duration | §23.1 |
| TOR §9 Key Personnel evaluation | §24 |
| TOR §10.e Technical Proposal | §24.8 |
| TOR §10.f NDA | §18 |
| TOR §11 Methods | §21.6 |
| TOR §12 Reports | §27 |
| TOR §Annex 1 Deliverables D1-D21 | §23.3-23.4 |
| TOR §Annex 2 Job Descriptions | §24.7 (mapping) |
| TOR §Annex 3 Personnel allocation | §24.2-24.5 |
| TOR §Annex 4-5 Payment phases | §23.6 |
| TOR §Annex 6 §1.1 Provinsi prioritas | §8.2-8.3 |
| TOR §Annex 6 §1.2.1 Picture 2 Ecosystem | §10.3-10.4 |
| TOR §Annex 6 §1.2.2 Picture 3 Architecture | §10.4 |
| TOR §Annex 6 §1.2.3 Architecture principles | §10.2, §12 |
| TOR §Annex 6 §1.3.a Architecture | §10 |
| TOR §Annex 6 §1.3.b.1 Advanced Modeling | §11.4, §14 |
| TOR §Annex 6 §1.3.b.2 Vulnerability | §11.5, §15 |
| TOR §Annex 6 §1.3.b.3 Specialized | §11.5, §14.8 |
| TOR §Annex 6 §1.3.c SDSS | §15 |
| TOR §Annex 6 §1.3.d AI/ML | §16 |
| TOR §Annex 6 §1.3.e Dissemination | §25.6 |
| TOR §Annex 6 §2.1.1 Stakeholder Events | §25.1 |
| TOR §Annex 6 §2.1.2 Concept Design | §21.2 |
| TOR §Annex 6 §2.1.3 Analytical Model Dev | §21.3 |
| TOR §Annex 6 §2.1.4 Validation | §21.4, §26.3 |
| TOR §Annex 6 §2.1.5 SDSS Platform Dev | §21.5 |
| TOR §Annex 6 §2.2 Monitoring | §27.3 |

## Appendix D — Architecture Decision Records (ADR) Summary

Berikut ringkasan keputusan arsitektur kunci yang ditetapkan di PRD v2.0. Setiap ADR detail di-maintain di `/docs/ADR/` di repo.

| ADR # | Decision | Rationale |
|-------|----------|-----------|
| ADR-001 | Plugin-based architecture | Paralelisasi development; isolasi; reuse GeoVertix |
| ADR-002 | Main App sebagai Shell, plugin sebagai micro-services | Clear boundary; independent versioning |
| ADR-003 | Python+FastAPI primary, Node+TS secondary | AI/ML ecosystem Python; I/O Node |
| ADR-004 | Next.js + React + Tailwind + shadcn/ui frontend | Modern, mature, community-backed |
| ADR-005 | MapLibre GL JS untuk maps | Open-source, OGC, MVT |
| ADR-006 | Module Federation untuk micro-frontend | Plugin UI dinamis tanpa rebuild Shell |
| ADR-007 | Plugin manifest format: JSON (bukan TOML) | Polyglot-friendly |
| ADR-008 | Port range 9300-9399 BIGCA plugins | Avoid GeoVertix 9200-9299 conflict |
| ADR-009 | PostgreSQL schema per plugin (bcp_*) | Data isolation; capability boundary |
| ADR-010 | Kafka untuk async event-driven | Real-time, decoupling, alert routing |
| ADR-011 | Redis untuk cache + queue broker | Standard, mature |
| ADR-012 | MinIO/S3 object storage | Open-source S3-compat OR cloud |
| ADR-013 | Qdrant vector store RAG | Performant, open-source, mature |
| ADR-014 | Ollama LLM server | Local sovereignty, open-source |
| ADR-015 | Kubernetes orchestration | Vendor-agnostic, standar industri |
| ADR-016 | Harbor container registry | Self-hosted, scanning |
| ADR-017 | ArgoCD GitOps | Declarative, traceable |
| ADR-018 | Mono-repo strategy | ~60 plugin, shared SDK/UI Kit, cross-plugin refactoring |
| ADR-019 | Plugin signing mandatory Y2+ | Production security |
| ADR-020 | Contract testing wajib di CI | Catch breaking changes pre-deploy |
| ADR-021 | OpenAPI 3.0 auto-gen per plugin | Documentation + client gen |
| ADR-022 | i18n built-in Main App (bukan plugin terpisah) | Cross-cutting concern, shared by all |
| ADR-023 | Mobile PWA built-in Main App | Service worker scope = whole app |
| ADR-024 | Capability-scoped security | Least privilege, audit trail |

## Appendix E — Implementation Quick Start

Untuk Service Provider yang start fresh, urutan pengembangan rekomendasi:

### Week 1-2 (Setup)
1. Onboard all squads, distribute PRD v2.0 + Katalog Fitur v2.2 + Rancangan Halaman Utama v1.0
2. Setup mono-repo `bigca-platform`
3. Setup development infrastructure (K8s cluster dev, Harbor, GitLab/GitHub Actions, Loki, Prometheus, Grafana)
4. Sign MoU dengan GeoVertix team untuk service account JWT + SLA

### Week 3-4 (Foundation)
1. Squad A start Main App scaffold + bcp-svc-auth
2. Architect Lead + GeoVertix Liaison: validate API contract, test PoC integration
3. UX Lead: implement design system tokens di `@bigca/ui-kit`
4. DevOps: Plugin scaffold templates + bcp-plugin-validate tool

### Week 5-12 (PoC Phase, M3-end of PoC)
1. Squad B: bcp-modeling-climate (extend gxp-climate)
2. Squad D: bcp-vuln-mcda (direct reuse gxp-mcda)
3. Squad F: bcp-ai-nlq (direct reuse gxp-geoai)
4. PoC review gate: persona walkthrough P2 single-plugin

### Month 4-9 (Beta — D15)
1. All squads ramp up
2. Foundation plugins complete: bcp-svc-*, bcp-data-catalog, bcp-mcp, bcp-ai-rag
3. Modeling Group 1 plugins for pilot provinces
4. UI shell + 5-10 plugin functional E2E
5. Beta launch with selected stakeholders

### Month 10-24 (V.1 → V.2 → V.3 → Full)
- See §23.8 plugin roadmap

### Month 25-27 (Validation & Handover)
- UAT wider audience
- Documentation finalize
- Capacity building
- Implementation roadmap delivered

## Appendix F — Document Maintenance

| Item | Responsibility |
|------|----------------|
| **PRD v2.0 owner** | Architect Lead + Team Leader |
| **Update cadence** | Major: per platform version (Beta/V.1/V.2/V.3/Full). Minor: monthly |
| **Change control** | PR ke `docs/` dengan minimum 2 reviewers (Architect Lead + relevant squad lead) |
| **Versioning** | Semver: v2.0.X untuk minor, v2.X.0 untuk significant addition, v3.0.0 untuk major arch change |
| **Validation** | Setiap update di-validate vs TOR compliance matrix (Appendix C) |
| **Bilingual deliverable** | English translation maintained in `PRD_BIGCA_v2.0_EN.md` |

---

## ─── END OF DOCUMENT ───

**Status:** PRD v2.0 ditetapkan sebagai single source of truth untuk pengembangan BIGCA Platform.

**Next steps post-PRD-v2.0 approval:**

1. Validasi PRD v2.0 dengan BIG di Concept Design Phase (TOR §19.2)
2. Stakeholder workshop (FGD #1 sesuai TOR Annex 6 §2.1.1)
3. PoC prototype 3-5 plugin paling kompleks untuk validate plugin architecture
4. Translate ke Bahasa Inggris untuk formal deliverable
5. Generate Figma hi-fi prototypes berdasarkan Rancangan Halaman Utama v1.0
6. Build component library di Storybook (target M5-M6)
7. Decompose ke task-task development per plugin (master backlog)

**Companion documents to be maintained synchronously:**

- `Katalog_Fitur_SDSS_Detail_v2.2.md` — feature catalogue
- `Rancangan_Halaman_Utama_Platform_v1.0.md` — UI/UX shell
- `GeoVertix_API_KnowledgeBase.md` — GeoVertix API surface
- `GeoVertix_SDSS_Reuse_Analysis_v3.xlsx` — feature-to-plugin reuse mapping
- `NEW-Plugin-Dev-Guideline.pdf` — GeoVertix pattern reference

---

**Document version:** 2.0  
**Date:** Mei 2026  
**Prepared by:** Tim Konsultan (sesuai PRD §24.2 Team Leader)  
**Approved by:** _(pending BIG Directorate signoff)_

---
