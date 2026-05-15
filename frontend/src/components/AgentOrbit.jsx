import { useEffect, useState } from "react";
import {
  Activity,
  Wrench,
  DollarSign,
  Calculator,
  Eye,
  ShieldCheck,
  LineChart,
  Workflow,
  Bell,
  Sigma,
  Code2,
  Network,
  Database,
  GitMerge,
  ScrollText,
  Bot,
} from "lucide-react";

const orbitAgents = [
  { name: "RCA", icon: Activity, ring: 1 },
  { name: "Exec", icon: Wrench, ring: 1 },
  { name: "Triage", icon: Bell, ring: 1 },
  { name: "Hypoth", icon: Sigma, ring: 1 },
  { name: "Code", icon: Code2, ring: 1 },
  { name: "REI", icon: Calculator, ring: 1 },
  { name: "FinOps", icon: DollarSign, ring: 1 },
  { name: "Forecast", icon: LineChart, ring: 1 },
  { name: "Observe", icon: Eye, ring: 2 },
  { name: "Topology", icon: Network, ring: 2 },
  { name: "Security", icon: ShieldCheck, ring: 2 },
  { name: "Insight", icon: LineChart, ring: 2 },
  { name: "Sched", icon: Workflow, ring: 2 },
  { name: "Memory", icon: Database, ring: 2 },
  { name: "PR", icon: GitMerge, ring: 2 },
  { name: "Postmortem", icon: ScrollText, ring: 2 },
];

export default function AgentOrbit() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => (t + 1) % 360), 50);
    return () => clearInterval(id);
  }, []);

  const inner = orbitAgents.filter((a) => a.ring === 1);
  const outer = orbitAgents.filter((a) => a.ring === 2);

  const place = (i, total, radius, offset = 0) => {
    const angle = ((i * 360) / total + offset + tick * 0.3) * (Math.PI / 180);
    return {
      left: `calc(50% + ${Math.cos(angle) * radius}px)`,
      top: `calc(50% + ${Math.sin(angle) * radius}px)`,
    };
  };

  return (
    <section
      data-testid="agent-orbit-section"
      className="section relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-fine pointer-events-none opacity-60" />

      <div className="container-cs relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <div className="section-label">ASTRA · ORBIT</div>
            <h2 className="section-title">
              16 agents.{" "}
              <span className="serif">Orbiting one</span>{" "}
              <span className="serif" style={{ color: "var(--accent)" }}>
                source of truth.
              </span>
            </h2>
            <p className="section-sub">
              REI sits at the core. Specialized agents — each running their own
              loop in parallel — orbit it, picking up alerts, hypothesizing,
              pricing, and committing fixes. Every signal threaded through the
              same financial lens.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { v: "16", l: "specialized agents" },
                { v: "23", l: "agentic workflows" },
                { v: "< 60s", l: "agent handoff" },
                { v: "100%", l: "auditable trail" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="hairline rounded-xl p-4 bg-[var(--panel)]"
                  data-testid={`orbit-stat-${m.l.replace(/\s/g, "-")}`}
                >
                  <div className="mono text-2xl tracking-tight text-[var(--ink)]">
                    {m.v}
                  </div>
                  <div className="mono text-[11px] text-[var(--ink-mute)] mt-1">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              className="relative mx-auto"
              style={{ width: "100%", maxWidth: 640, aspectRatio: "1/1" }}
              data-testid="agent-orbit-graphic"
            >
              {/* Decorative rings */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="-320 -320 640 640"
              >
                <defs>
                  <radialGradient id="coreGlow">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="ringStroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.0" />
                    <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* glow */}
                <circle cx="0" cy="0" r="280" fill="url(#coreGlow)" />

                {/* dotted rings */}
                <circle
                  cx="0"
                  cy="0"
                  r="120"
                  fill="none"
                  stroke="var(--line-2)"
                  strokeDasharray="2 6"
                  strokeWidth="1"
                />
                <circle
                  cx="0"
                  cy="0"
                  r="220"
                  fill="none"
                  stroke="var(--line-2)"
                  strokeDasharray="2 6"
                  strokeWidth="1"
                />

                {/* animated solid arcs */}
                <circle
                  cx="0"
                  cy="0"
                  r="120"
                  fill="none"
                  stroke="url(#ringStroke)"
                  strokeWidth="1.6"
                  strokeDasharray="200 600"
                  transform={`rotate(${tick * 0.6})`}
                />
                <circle
                  cx="0"
                  cy="0"
                  r="220"
                  fill="none"
                  stroke="url(#ringStroke)"
                  strokeWidth="1.6"
                  strokeDasharray="320 1000"
                  transform={`rotate(${-tick * 0.4})`}
                />

                {/* radial spokes */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const a = (i * 30 * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={Math.cos(a) * 60}
                      y1={Math.sin(a) * 60}
                      x2={Math.cos(a) * 280}
                      y2={Math.sin(a) * 280}
                      stroke="var(--line)"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                  );
                })}
              </svg>

              {/* Core REI badge */}
              <div
                className="absolute"
                style={{
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className="rounded-2xl px-5 py-4 flex flex-col items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(37,99,235,0.10), rgba(37,99,235,0.02))",
                    border: "1px solid rgba(37, 99, 235, 0.30)",
                    boxShadow: "0 24px 60px -20px rgba(37,99,235,0.35)",
                    minWidth: 140,
                  }}
                >
                  <Bot size={20} className="text-[var(--accent)]" />
                  <div className="mono text-[10px] mt-1 tracking-[0.18em] text-[var(--ink-mute)]">
                    ASTRA · CORE
                  </div>
                  <div className="mono text-2xl text-[var(--accent)] tracking-tight mt-1">
                    REI
                  </div>
                  <div className="mono text-[10px] text-[var(--ink-mute)]">
                    16 agents · live
                  </div>
                </div>
              </div>

              {/* Inner agents */}
              {inner.map((a, i) => {
                const pos = place(i, inner.length, 120, 0);
                return (
                  <Bubble
                    key={a.name}
                    name={a.name}
                    Icon={a.icon}
                    style={pos}
                    tone="inner"
                    testid={`orbit-agent-${a.name.toLowerCase()}`}
                  />
                );
              })}

              {/* Outer agents */}
              {outer.map((a, i) => {
                const pos = place(i, outer.length, 220, 12);
                return (
                  <Bubble
                    key={a.name}
                    name={a.name}
                    Icon={a.icon}
                    style={pos}
                    tone="outer"
                    testid={`orbit-agent-${a.name.toLowerCase()}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Bubble({ name, Icon, style, tone, testid }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform"
      style={style}
      data-testid={testid}
    >
      <div
        className="flex items-center gap-2 rounded-full pl-2 pr-3 py-1.5 mono text-[10.5px] uppercase tracking-[0.12em] hairline bg-[var(--panel)]"
        style={{
          color: tone === "inner" ? "var(--accent)" : "var(--ink-dim)",
          boxShadow:
            tone === "inner"
              ? "0 6px 18px -6px rgba(37,99,235,0.25)"
              : "0 4px 14px -4px rgba(10,20,38,0.10)",
          borderColor: tone === "inner" ? "rgba(37,99,235,0.30)" : "var(--line)",
        }}
      >
        <span
          className="h-5 w-5 rounded-full inline-flex items-center justify-center"
          style={{
            background:
              tone === "inner" ? "rgba(37,99,235,0.10)" : "rgba(37,99,235,0.05)",
          }}
        >
          <Icon size={11} className="text-[var(--accent)]" />
        </span>
        {name}
      </div>
    </div>
  );
}
