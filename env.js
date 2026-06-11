// ============================================================
// env.js — konfigurasi runtime per-environment
// EDIT file ini sesuai environment (dev / staging / prod).
// Jangan hardcode URL di dalam file .jsx.
// ============================================================

window.APP_CONFIG = {
  // Base URL untuk ML API (climate-ml FastAPI)
  // Dev local  : "http://localhost:8000"  (Docker/sistem — port resmi)
  // Dev server : "http://100.96.101.0:8000"  (Tailscale)
  // Prod        : "https://api.big-climate.go.id/ml"
  ML_API_URL: "http://100.111.250.98:8000",

  // Aktifkan pemanggilan ML API nyata (false = pakai mock lokal)
  ML_API_ENABLED: true,
};
