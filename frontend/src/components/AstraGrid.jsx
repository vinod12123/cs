import {
  Activity,
  Wrench,
  DollarSign,
  Sigma,
  Eye,
  ShieldCheck,
  LineChart,
  Workflow,
  Bot,
  Database,
  Code2,
  Bell,
  Network,
  GitMerge,
  Calculator,
  ScrollText,
} from "lucide-react";

const agents = [
  { cat: "SRE", name: "RCA Agent", desc: "Root cause across distributed services in <3 min.", icon: Activity },
  { cat: "SRE", name: "Execution Agent", desc: "Approved remediations · audit trail · 1-click rollback.", icon: Wrench },
  { cat: "FINOPS", name: "FinOps Agent", desc: "Cost anomaly detection · right-sizing · RI optimization.", icon: DollarSign },
  { cat: "FINOPS", name: "REI Agent", desc: "Reliability Economics — incident impact ↔ live cloud cost.", icon: Calculator },
  { cat: "OBSERVABILITY", name: "Observability Agent", desc: "Unified telemetry · causal AI topology engine.", icon: Eye },
  { cat: "SECURITY", name: "Security Agent", desc: "Drift, compliance, and IAM over-priv detection.", icon: ShieldCheck },
  { cat: "ANALYTICS", name: "Insight Agent", desc: "SLO reports · trend forecasting · Reliability ROI.", icon: LineChart },
  { cat: "ORCHESTRATION", name: "Scheduler Agent", desc: "23 pre-configured agentic workflows · customizable.", icon: Workflow },
  { cat: "SRE", name: "Triage Agent", desc: "Alert dedupe, normalization, and routing.", icon: Bell },
  { cat: "SRE", name: "Hypothesis Agent", desc: "Differential diagnoses ranked by confidence.", icon: Sigma },
  { cat: "SRE", name: "Code Agent", desc: "Bisect commits to a single LOC explanation.", icon: Code2 },
  { cat: "OBSERVABILITY", name: "Topology Agent", desc: "Live service graph & dependency mapping.", icon: Network },
  { cat: "FINOPS", name: "Forecast Agent", desc: "Anomaly forecasting & burn-rate prediction.", icon: LineChart },
  { cat: "ORCHESTRATION", name: "Memory Agent", desc: "Operational memory · MongoDB Atlas backbone.", icon: Database },
  { cat: "ORCHESTRATION", name: "PR Agent", desc: "Drafts the fix · opens a verified PR.", icon: GitMerge },
  { cat: "ORCHESTRATION", name: "Postmortem Agent", desc: "Auto-generated PIRs with $-impact.", icon: ScrollText },
];

const catColor = (c) => {
  switch (c) {
    case "SRE": return "var(--accent-2)";
    case "FINOPS": return "var(--signal)";
    case "OBSERVABILITY": return "#a78bfa00"; // unused
    case "SECURITY": return "var(--warn)";
    case "ANALYTICS": return "#c4b5fd00";
    default: return "var(--accent)";
  }
};

const catTone = (c) => {
  if (c === "FINOPS") return { color: "var(--signal)", bg: "rgba(94,234,212,0.10)", bd: "rgba(94,234,212,0.25)" };
  if (c === "SECURITY") return { color: "var(--warn)", bg: "rgba(255,178,89,0.10)", bd: "rgba(255,178,89,0.25)" };
  if (c === "ANALYTICS") return { color: "var(--accent-2)", bg: "rgba(91,184,240,0.08)", bd: "rgba(91,184,240,0.22)" };
  if (c === "OBSERVABILITY") return { color: "var(--accent-2)", bg: "rgba(91,184,240,0.08)", bd: "rgba(91,184,240,0.22)" };
  if (c === "ORCHESTRATION") return { color: "var(--accent)", bg: "rgba(59,159,224,0.08)", bd: "rgba(59,159,224,0.22)" };
  return { color: "var(--accent-2)", bg: "rgba(91,184,240,0.08)", bd: "rgba(91,184,240,0.22)" };
};

export default function AstraGrid() {
  return (
    <section
      id="astra"
      data-testid="astra-grid-section"
      className="section relative"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
      <div className="container-cs relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
          <div>
            <div className="section-label">ASTRA · UNDER THE HOOD</div>
            <h2 className="section-title">
              16 specialized agents.{" "}
              <span className="serif">One unified brain.</span>
            </h2>
            <p className="section-sub">
              ASTRA is CloudScore's autonomous SRE platform — a 16-agent system
              built on LangGraph, powered by task-optimized open-source LLMs via
              Ollama, with MongoDB Atlas as the unified data backbone.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {["SRE", "FINOPS", "OBSERVABILITY", "SECURITY", "ANALYTICS", "ORCHESTRATION"].map(
              (c) => {
                const t = catTone(c);
                return (
                  <span
                    key={c}
                    className="tag-azure"
                    style={{ color: t.color, background: t.bg, borderColor: t.bd }}
                  >
                    {c}
                  </span>
                );
              }
            )}
          </div>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          data-testid="astra-agents"
        >
          {agents.map((a) => {
            const t = catTone(a.cat);
            return (
              <div
                key={a.name}
                className="glass p-5 group cursor-default transition-all hover:-translate-y-1 hover:border-[var(--line-2)]"
                data-testid={`agent-${a.name.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className="tag-azure"
                    style={{ color: t.color, background: t.bg, borderColor: t.bd }}
                  >
                    {a.cat}
                  </span>
                  <a.icon
                    size={18}
                    className="text-[var(--accent-2)] opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="mt-4 text-[15px] font-medium tracking-tight text-[var(--ink)]">
                  {a.name}
                </div>
                <div className="mt-1 text-[12.5px] text-[var(--ink-dim)] leading-relaxed">
                  {a.desc}
                </div>
                <div className="mt-4 h-px shimmer" />
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs mono text-[var(--ink-mute)]">
          <Bot size={14} className="text-[var(--accent-2)]" />
          Built on LangGraph · Ollama · MongoDB Atlas · MCP-native
        </div>
      </div>
    </section>
  );
}
