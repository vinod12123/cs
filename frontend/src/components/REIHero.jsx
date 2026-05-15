import { ArrowRight, Activity, DollarSign, ShieldCheck, GitBranch } from "lucide-react";

const layers = [
  { tag: "REI", label: "Revenue-at-risk pricing", icon: DollarSign },
  { tag: "SRE", label: "Service health triage", icon: Activity },
  { tag: "FinOps", label: "Cost anomaly detection", icon: DollarSign },
  { tag: "SecOps", label: "IAM & posture scan", icon: ShieldCheck },
  { tag: "Deploy", label: "Pre-merge economic gate", icon: GitBranch },
  { tag: "Observe", label: "Unified telemetry", icon: Activity },
];

export default function REIHero() {
  return (
    <section id="rei" data-testid="rei-section" className="section">
      <div className="container-cs">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="section-label">THE REI LAYER</div>
            <h2 className="section-title">
              Reliability Economics Intelligence —{" "}
              <span className="serif">technical truth meets</span>{" "}
              <span className="serif">financial truth.</span>
            </h2>
            <p className="section-sub">
              A new layer for the cloud era. Every incident, deploy, and idle
              resource gets priced — in real dollars, in real time. So your CFO
              sees what your SRE sees, in the same pane.
            </p>
          </div>
          <a href="#ai-sre" className="btn-ghost" data-testid="rei-explore">
            Explore the layer <ArrowRight size={14} />
          </a>
        </div>

        <div
          data-testid="rei-hero-card"
          className="glass relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-fine opacity-50 pointer-events-none" />
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="p-8 md:p-10 md:col-span-1 border-r border-[var(--line)]">
              <div className="eyebrow mb-3">ASTRA · CORE</div>
              <div className="headline text-4xl md:text-5xl">
                <span>One</span>{" "}
                <span className="serif">unified brain.</span>
              </div>
              <p className="mt-4 text-[var(--ink-dim)] text-[15px] leading-relaxed">
                LangGraph-orchestrated agents reasoning across logs, traces,
                metrics, deploys, and cloud bills — connected by the REI layer.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 mono text-[12px] text-[var(--ink-mute)]">
                <span>· LangGraph</span>
                <span>· Open-source LLMs</span>
                <span>· MongoDB Atlas</span>
                <span>· Ollama-served</span>
                <span>· MCP protocol</span>
                <span>· Read-only by default</span>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3">
              {layers.map((l, i) => (
                <div
                  key={l.tag}
                  className="p-6 md:p-7 border-b md:border-b-0 border-[var(--line)] [&:not(:last-child)]:border-r"
                  style={{
                    borderColor: "var(--line)",
                    borderRightWidth: (i + 1) % 3 === 0 ? 0 : 1,
                    borderBottomWidth: i < 3 ? 1 : 0,
                  }}
                  data-testid={`rei-layer-${l.tag.toLowerCase()}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="tag-azure">{l.tag}</span>
                    <l.icon size={16} className="text-[var(--accent-2)]" />
                  </div>
                  <div className="mt-4 text-[var(--ink)] text-[15px] font-medium tracking-tight">
                    {l.label}
                  </div>
                  <div className="mt-3 h-px shimmer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
