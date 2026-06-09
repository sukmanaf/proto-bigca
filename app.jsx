// ============================================================
// App — main router + state
// ============================================================

const DEFAULTS = /*EDITMODE-BEGIN*/{
  "persona": "P2",
  "lang": "id",
  "crisisMode": false,
  "sidebarOpen": true,
  "province": "sulsel",
  "period": "2025-2050",
  "scenario": "ssp2-45",
  "primaryColor": "#0E5A78",
  "density": "comfortable",
  "darkMode": false
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = window.useTweaks(DEFAULTS);
  window.__LANG = t.lang;
  const [route, setRoute] = React.useState("dashboard");
  const [aiOpen, setAiOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [onbOpen, setOnbOpen] = React.useState(false);
  const [shortcutOpen, setShortcutOpen] = React.useState(false);

  // Auto-switch to public landing for P5 + auto-collapse sidebar/contextbar logic
  React.useEffect(() => {
    if (t.persona === "P5" && route === "dashboard") {
      setRoute("public");
    }
  }, [t.persona]);

  const ctx = {
    persona: t.persona,
    lang: t.lang,
    province: t.province,
    period: t.period,
    scenario: t.scenario,
  };
  const setCtx = (next) => {
    setTweak({
      province: next.province,
      period: next.period,
      scenario: next.scenario,
      lang: next.lang,
    });
  };

  const toggleSidebar = () => setTweak("sidebarOpen", !t.sidebarOpen);

  // Keyboard shortcuts (§5.9)
  React.useEffect(() => {
    const onKey = (e) => {
      const isInput = ["INPUT","TEXTAREA"].includes(document.activeElement?.tagName);
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") { e.preventDefault(); setSearchOpen(true); setAiOpen(false); setShortcutOpen(false); }
      else if (mod && e.key.toLowerCase() === "i") { e.preventDefault(); setAiOpen(o => !o); setSearchOpen(false); setShortcutOpen(false); }
      else if (e.key === "Escape") { setSearchOpen(false); setShortcutOpen(false); }
      else if (e.key === "?" && !isInput) { e.preventDefault(); setShortcutOpen(true); }
      else if (e.key === "/" && !isInput) { e.preventDefault(); setSearchOpen(true); }
      else if (e.shiftKey && (e.key === "C" || e.key === "c") && !isInput) {
        // Shift+C → toggle crisis mode
        if (!mod) { e.preventDefault(); setTweak("crisisMode", !t.crisisMode); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [t.crisisMode]);

  // CSS vars from tweaks
  React.useEffect(() => {
    document.documentElement.style.setProperty("--primary-600", t.primaryColor);
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.crisis = t.crisisMode ? "on" : "off";
    document.documentElement.dataset.theme = t.darkMode ? "dark" : "light";
  }, [t.primaryColor, t.density, t.crisisMode, t.darkMode]);

  // Public landing — render outside the app chrome
  if (route === "public") {
    return (
      <div className={`app public-mode ${t.darkMode ? "dark" : ""}`} data-persona={t.persona}>
        <window.PublicLanding setRoute={setRoute} openAI={() => setAiOpen(true)} />
        <FloatingAI open={aiOpen} onClick={() => setAiOpen(true)} />
        <AIDrawer open={aiOpen} onClose={() => setAiOpen(false)} ctx={ctx} route={route} />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} setRoute={setRoute} />
        {shortcutOpen && <window.ShortcutOverlay onClose={() => setShortcutOpen(false)} />}
        <TweaksUI t={t} setTweak={setTweak} setOnbOpen={setOnbOpen} setRoute={setRoute} />
      </div>
    );
  }

  return (
    <div className={`app ${t.crisisMode ? "crisis-mode" : ""} ${t.darkMode ? "dark" : ""}`} data-persona={t.persona}>
      <TopBar
        ctx={ctx} setCtx={setCtx}
        route={route} setRoute={setRoute}
        openSearch={() => setSearchOpen(true)}
        openAI={() => setAiOpen(true)}
        toggleSidebar={toggleSidebar}
        sidebarOpen={t.sidebarOpen}
      />
      <div className="app-body">
        <Sidebar open={t.sidebarOpen} route={route} setRoute={setRoute} persona={t.persona} />
        <main className="main">
          {route !== "map" && !route.startsWith("flow-") && !route.startsWith("feature-") && route !== "state-patterns" && <ContextBar ctx={ctx} setCtx={setCtx} crisis={t.crisisMode} />}
          <div className="content" data-route={route}>
            {route === "dashboard" && !t.crisisMode && (
              <Dashboard ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} crisis={t.crisisMode} />
            )}
            {route === "dashboard" && t.crisisMode && (
              <window.CrisisDashboard setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "map" && (
              <MapExplorer ctx={ctx} setRoute={setRoute} crisis={t.crisisMode} />
            )}
            {route === "flow-scenario" && (
              <window.ScenarioBuilder ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "flow-group" && (
              <window.GroupDecisionRoom ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "flow-report" && (
              <window.ReportBuilder ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-mcda" && (
              <window.MCDAEngine ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-vuln" && (
              <window.VulnerabilityDetail ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-hindcast" && (
              <window.HindcastingTool ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-sensitivity" && (
              <window.SensitivityAnalyzer ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-ews" && (
              <window.AnomalyEWS ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-whatif" && (
              <window.WhatIfSimulator ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-flood" && (
              <window.FloodDroughtModeler ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-rdtr" && (
              <window.RDTRToolbox ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-coastal" && (
              <window.CoastalVulnerability ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-fire" && (
              <window.ForestFireRisk ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-nlp" && (
              <window.NLPQuery ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-xai" && (
              <window.XAIService ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-imgrec" && (
              <window.ImageRecognition ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-dashboards" && (
              <window.DynamicDashboards ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-scompare" && (
              <window.ScenarioComparison ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-renewable" && (
              <window.RenewableEnergy ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-cc" && (
              <window.CarryingCapacity ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-foodsec" && (
              <window.FoodSecurity ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-tourism" && (
              <window.TourismVulnerability ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-lulc" && (
              <window.LULCChangeDetection ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-slr" && (
              <window.SLRSubsidence ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-bio" && (
              <window.BiodiversityMapping ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-acm" && (
              <window.AdvancedClimate ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-carbon" && (
              <window.CarbonFootprint ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-modelmon" && (
              <window.ModelMonitor ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-predictive" && (
              <window.PredictiveModeling ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-rag" && (
              <window.RAGKnowledge ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-mcp" && (
              <window.MCPServer ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-federated" && (
              <window.FederatedLearning ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-scenengine" && (
              <window.ScenarioEngine ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-impact" && (
              <window.ImpactEngine ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-multilevel" && (
              <window.MultiLevelDSS ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-adaptation" && (
              <window.AdaptationLibrary ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-contextaware" && (
              <window.ContextAware ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-optsolver" && (
              <window.OptimizationSolver ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-datadetail" && (
              <window.DataCatalogDetail ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-stream" && (
              <window.StreamProcessor ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-klint" && (
              <window.KLIntegrations ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-dynvuln" && (
              <window.DynamicVulnerability ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "feature-iklim" && (
              <window.IklimWilayah ctx={ctx} setRoute={setRoute} openAI={() => setAiOpen(true)} />
            )}
            {route === "state-patterns" && (
              <window.StatePatterns setRoute={setRoute} />
            )}
            {route !== "dashboard" && route !== "map" && !route.startsWith("flow-") && !route.startsWith("feature-") && route !== "state-patterns" && (
              <ModuleLanding moduleId={route} setRoute={setRoute} openAI={() => setAiOpen(true)} ctx={ctx} setLang={(v) => setTweak("lang", v)} />
            )}
          </div>
          <StatusBar ctx={ctx} crisis={t.crisisMode} />
        </main>
      </div>

      <window.MobileBottomNav route={route} setRoute={setRoute} openAI={() => setAiOpen(true)} />

      <FloatingAI open={aiOpen} onClick={() => setAiOpen(true)} />
      <AIDrawer open={aiOpen} onClose={() => setAiOpen(false)} ctx={ctx} route={route} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} setRoute={setRoute} />
      {onbOpen && <window.OnboardingOverlay onClose={() => setOnbOpen(false)} persona={t.persona} />}
      {shortcutOpen && <window.ShortcutOverlay onClose={() => setShortcutOpen(false)} />}

      <TweaksUI t={t} setTweak={setTweak} setOnbOpen={setOnbOpen} setRoute={setRoute} setShortcutOpen={setShortcutOpen} />
    </div>
  );
}

function TweaksUI({ t, setTweak, setOnbOpen, setRoute, setShortcutOpen }) {
  const {
    TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakColor, TweakSelect, TweakButton,
  } = window;
  return (
    <TweaksPanel title="Tweaks — Climate Action Platform">
      <TweakSection title="Persona (FR-UI-01)" hint="Halaman utama, KPI, sidebar, quick actions berubah per persona">
        <TweakSelect
          value={t.persona}
          onChange={v => setTweak("persona", v)}
          options={[
            { value: "P1", label: "P1 · Government Decision Maker (Executive)" },
            { value: "P2", label: "P2 · Government Planner (default)" },
            { value: "P3", label: "P3 · Researcher / Academic" },
            { value: "P4", label: "P4 · Private Sector Analyst" },
            { value: "P5", label: "P5 · Public / Citizen (lands on public site)" },
          ]}
        />
      </TweakSection>

      <TweakSection title="Tema & Mode">
        <TweakToggle label="Dark Mode" value={t.darkMode} onChange={v => setTweak("darkMode", v)} />
        <TweakToggle label="Crisis Mode (FR-UI-05, §2.5)" value={t.crisisMode} onChange={v => setTweak("crisisMode", v)} />
        <TweakToggle label="Sidebar terbuka" value={t.sidebarOpen} onChange={v => setTweak("sidebarOpen", v)} />
      </TweakSection>

      <TweakSection title="User Flows (Sesi 3)" hint="Buka flow interaktif yang sudah dibangun">
        {TweakButton && <TweakButton label="🎯 Onboarding Tour (4 langkah)" onClick={() => setOnbOpen(true)} />}
        {TweakButton && <TweakButton label="📝 Scenario Builder (FITUR 5.2)" onClick={() => setRoute("flow-scenario")} />}
        {TweakButton && <TweakButton label="👥 Group Decision Room (FITUR 5.7)" onClick={() => setRoute("flow-group")} />}
        {TweakButton && <TweakButton label="📊 Report Builder (FITUR 8.4)" onClick={() => setRoute("flow-report")} />}
      </TweakSection>

      <TweakSection title="Feature pages (Sesi 4)" hint="Halaman fitur-level mendalam">
        {TweakButton && <TweakButton label="⚖️ MCDA Engine (FITUR 5.5)" onClick={() => setRoute("feature-mcda")} />}
        {TweakButton && <TweakButton label="⚠️ Vulnerability Detail (FITUR 3.1)" onClick={() => setRoute("feature-vuln")} />}
        {TweakButton && <TweakButton label="📏 Hindcasting Tool (FITUR 11.1)" onClick={() => setRoute("feature-hindcast")} />}
        {TweakButton && <TweakButton label="📈 Sensitivity Analyzer (FITUR 5.9)" onClick={() => setRoute("feature-sensitivity")} />}
        {TweakButton && <TweakButton label="🚨 Anomaly Detection & EWS (FITUR 6.2)" onClick={() => setRoute("feature-ews")} />}
        {TweakButton && <TweakButton label="⚡ What-If Quick Simulator (FITUR 5.8)" onClick={() => setRoute("feature-whatif")} />}
        {TweakButton && <TweakButton label="🌊 Flood & Drought Modeler (FITUR 2.6)" onClick={() => setRoute("feature-flood")} />}
        {TweakButton && <TweakButton label="🗺 RDTR Spatial Planning Toolbox (FITUR 4.1)" onClick={() => setRoute("feature-rdtr")} />}
        {TweakButton && <TweakButton label="🌐 Coastal Vulnerability (FITUR 4.3)" onClick={() => setRoute("feature-coastal")} />}
        {TweakButton && <TweakButton label="🔥 Forest Fire Risk ENSO (FITUR 4.4)" onClick={() => setRoute("feature-fire")} />}
        {TweakButton && <TweakButton label="💬 Natural Language Query (FITUR 6.5)" onClick={() => setRoute("feature-nlp")} />}
        {TweakButton && <TweakButton label="🔍 Explainable AI / XAI (FITUR 6.9)" onClick={() => setRoute("feature-xai")} />}
        {TweakButton && <TweakButton label="🛰 Image & Pattern Recognition (FITUR 6.1)" onClick={() => setRoute("feature-imgrec")} />}
        {TweakButton && <TweakButton label="📊 Dynamic Dashboards (FITUR 8.2)" onClick={() => setRoute("feature-dashboards")} />}
        {TweakButton && <TweakButton label="🔀 Scenario Comparison (FITUR 7.3)" onClick={() => setRoute("feature-scompare")} />}
        {TweakButton && <TweakButton label="⚡ Renewable Energy Optimization (FITUR 4.6)" onClick={() => setRoute("feature-renewable")} />}
        {TweakButton && <TweakButton label="🧩 Land Carrying Capacity (FITUR 4.7)" onClick={() => setRoute("feature-cc")} />}
        {TweakButton && <TweakButton label="🌾 Food Security Rice Field (FITUR 4.2)" onClick={() => setRoute("feature-foodsec")} />}
        {TweakButton && <TweakButton label="🏖 Tourism Vulnerability (FITUR 4.5)" onClick={() => setRoute("feature-tourism")} />}
        {TweakButton && <TweakButton label="🌳 LULC Change Detection (FITUR 2.2)" onClick={() => setRoute("feature-lulc")} />}
        {TweakButton && <TweakButton label="🌊 SLR & Subsidence (FITUR 2.5)" onClick={() => setRoute("feature-slr")} />}
        {TweakButton && <TweakButton label="🦧 Biodiversity Mapping (FITUR 2.4)" onClick={() => setRoute("feature-bio")} />}
        {TweakButton && <TweakButton label="🌡 Advanced Climate Modeling (FITUR 2.1)" onClick={() => setRoute("feature-acm")} />}
        {TweakButton && <TweakButton label="🏭 Net Carbon Footprint (FITUR 2.3)" onClick={() => setRoute("feature-carbon")} />}
        {TweakButton && <TweakButton label="📡 Model Performance Monitor (FITUR 11.2)" onClick={() => setRoute("feature-modelmon")} />}
        {TweakButton && <TweakButton label="📈 Predictive Modeling Framework (FITUR 6.3)" onClick={() => setRoute("feature-predictive")} />}
        {TweakButton && <TweakButton label="📚 RAG Knowledge Base (FITUR 6.6)" onClick={() => setRoute("feature-rag")} />}
        {TweakButton && <TweakButton label="🔗 MCP Server (FITUR 6.7)" onClick={() => setRoute("feature-mcp")} />}
        {TweakButton && <TweakButton label="🔐 Federated Learning (FITUR 6.8)" onClick={() => setRoute("feature-federated")} />}
        {TweakButton && <TweakButton label="🎯 Scenario Analysis Engine (FITUR 6.4)" onClick={() => setRoute("feature-scenengine")} />}
        {TweakButton && <TweakButton label="🔀 Impact Analysis Engine (FITUR 5.3)" onClick={() => setRoute("feature-impact")} />}
        {TweakButton && <TweakButton label="🏛 Multi-Level Decision Support (FITUR 5.1)" onClick={() => setRoute("feature-multilevel")} />}
        {TweakButton && <TweakButton label="🛡 Adaptation Recommendation (FITUR 5.4)" onClick={() => setRoute("feature-adaptation")} />}
        {TweakButton && <TweakButton label="🧭 Context-Aware Recommendation (FITUR 5.6)" onClick={() => setRoute("feature-contextaware")} />}
        {TweakButton && <TweakButton label="🎯 Optimization Solver (FITUR 5.10)" onClick={() => setRoute("feature-optsolver")} />}
        {TweakButton && <TweakButton label="🗃 Data Lineage/Quality/Versioning (10.2-10.5)" onClick={() => setRoute("feature-datadetail")} />}
        {TweakButton && <TweakButton label="🌊 Real-Time Stream Processor (10.4)" onClick={() => setRoute("feature-stream")} />}
        {TweakButton && <TweakButton label="🔌 Integrasi K/L (FITUR 13.1-13.5)" onClick={() => setRoute("feature-klint")} />}
        {TweakButton && <TweakButton label="🔄 Dynamic Vulnerability SD (FITUR 3.2)" onClick={() => setRoute("feature-dynvuln")} />}
        {TweakButton && <TweakButton label="🌤️ Iklim Wilayah (FITUR 2.0)" onClick={() => setRoute("feature-iklim")} />}
      </TweakSection>

      <TweakSection title="Polish (Sesi 5)" hint="Public site, design system showcase, shortcuts">
        {TweakButton && <TweakButton label="🌐 Public Landing (P5 — story map)" onClick={() => setRoute("public")} />}
        {TweakButton && <TweakButton label="🧩 State Patterns Library (§10)" onClick={() => setRoute("state-patterns")} />}
        {TweakButton && <TweakButton label="⌨️ Keyboard Shortcuts (tekan ?)" onClick={() => setShortcutOpen(true)} />}
      </TweakSection>

      <TweakSection title="Bahasa & density">
        <TweakRadio
          label="Bahasa"
          value={t.lang}
          onChange={v => setTweak("lang", v)}
          options={[{ value: "id", label: "ID" }, { value: "en", label: "EN" }]}
        />
        <TweakRadio
          label="Density"
          value={t.density}
          onChange={v => setTweak("density", v)}
          options={[{ value: "comfortable", label: "Nyaman" }, { value: "compact", label: "Padat" }]}
        />
      </TweakSection>

      <TweakSection title="Tema warna (primary)">
        <TweakColor
          label="Primary"
          value={t.primaryColor}
          onChange={v => setTweak("primaryColor", v)}
          options={["#0E5A78", "#074866", "#2A9D8F", "#2F7D5E", "#8B1A1A"]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
