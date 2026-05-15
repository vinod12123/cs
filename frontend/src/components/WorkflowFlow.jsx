import { useEffect, useState } from "react";
import {
  Bell,
  Brain,
  GitBranch,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

const stages = [
  {
    key: "DETECT",
    title: "Detect",
    body: "Alert lands · normalized · de-duped",
    icon: Bell,
    meta: "PagerDuty · Datadog · Slack",
    tone: "warn",
  },
  {
    key: "REASON",
    title: "Reason",
    body: "16 agents hypothesize in parallel",
    icon: Brain,
    meta: "LangGraph · CodeLlama · MCP",
    tone: "azure",
  },
  {
    key: "PRICE",
    title: "Price",
    body: "Burn rate computed in real $",
    icon: GitBranch,
    meta: "REI · cost cascade across services",
    tone: "danger",
  },
  {
    key: "RESOLVE",
    title: "Resolve",
    body: "Ranked fixes · approve or auto-execute",
    icon: CheckCircle2,
    meta: "PR · rollback · feature flag",
    tone: "mint",
  },
  {
    key: "LEARN",
    title: "Learn",
    body: "Memory captured · postmortem auto-generated",
    icon: GraduationCap,
    meta: "MongoDB Atlas · operational memory",
    tone: "azure",
  },
];

const toneColor = {
  azure: "var(--accent)",
  warn: "var(--warn)",
  danger: "var(--danger)",
  mint: "var(--signal)",
};

export default function WorkflowFlow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % stages.length);
    }, 1700);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      data-testid="workflow-flow"
      className="section relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />

      <div className="container-cs relative">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="section-label">A DAY IN THE LIFE OF ASTRA</div>
            <h2 className="section-title">
              From alert to fix —{" "}
              <span className="serif">five</span>{" "}
              <span className="serif" style={{ color: "var(--accent)" }}>
                deliberate steps.
              </span>
            </h2>
            <p className="section-sub">
              ASTRA's loop is transparent. Every step is logged, every action is
              reversible, and every conclusion ties back to a real-dollar
              impact.
            </p>
          </div>
          <div className="flex items-center gap-2 mono text-[11px] text-[var(--ink-mute)]">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            running · step {active + 1} / {stages.length}
          </div>
        </div>

        {/* Desktop horizontal flow */}
        <div className="hidden md:block relative" data-testid="workflow-desktop">
          {/* connecting line */}
          <div
            className="absolute top-[42px] left-[6%] right-[6%] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--line-2) 6%, var(--line-2) 94%, transparent)",
            }}
          />
          {/* moving pulse along line */}
          <div
            className="absolute top-[39px] h-[7px] w-[7px] rounded-full transition-all duration-700 ease-out"
            style={{
              left: `calc(6% + ${(active / (stages.length - 1)) * 88}%)`,
              transform: "translateX(-50%)",
              background: "var(--accent)",
              boxShadow: "0 0 0 6px rgba(37,99,235,0.16)",
            }}
          />

          <div className="grid grid-cols-5 gap-4 relative">
            {stages.map((s, i) => {
              const isActive = i === active;
              const isDone = i < active;
              const c = toneColor[s.tone];
              return (
                <div
                  key={s.key}
                  className="flex flex-col items-center text-center"
                  data-testid={`workflow-stage-${s.key.toLowerCase()}`}
                >
                  {/* node */}
                  <div
                    className="relative h-[84px] w-[84px] rounded-full flex items-center justify-center transition-all duration-500"
                    style={{
                      background: isActive
                        ? `${c}1A`
                        : isDone
                          ? "rgba(16,185,129,0.08)"
                          : "var(--panel)",
                      border: `1px solid ${
                        isActive ? c : isDone ? "var(--signal)" : "var(--line)"
                      }`,
                      transform: isActive ? "scale(1.06)" : "scale(1)",
                      boxShadow: isActive
                        ? `0 0 0 8px ${c}14, 0 16px 40px -16px ${c}55`
                        : "none",
                    }}
                  >
                    {/* radar ping */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `1px solid ${c}`,
                          animation: "wfPing 1.6s ease-out infinite",
                        }}
                      />
                    )}
                    <s.icon
                      size={26}
                      style={{
                        color: isActive
                          ? c
                          : isDone
                            ? "var(--signal)"
                            : "var(--ink-mute)",
                      }}
                    />
                  </div>

                  <div
                    className="mt-4 mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: "var(--ink-mute)" }}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[16px] font-semibold tracking-tight text-[var(--ink)]">
                    {s.title}
                  </div>
                  <p className="mt-1 text-[13px] text-[var(--ink-dim)] max-w-[180px]">
                    {s.body}
                  </p>
                  <div className="mt-2 mono text-[10.5px] text-[var(--ink-mute)]">
                    {s.meta}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-4" data-testid="workflow-mobile">
          {stages.map((s, i) => {
            const c = toneColor[s.tone];
            const isActive = i === active;
            return (
              <div
                key={s.key}
                className="glass p-5 flex items-start gap-4 transition-all"
                style={{
                  borderColor: isActive ? c : "var(--line)",
                }}
              >
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `${c}14`,
                    border: `1px solid ${c}55`,
                  }}
                >
                  <s.icon size={20} style={{ color: c }} />
                </div>
                <div>
                  <div className="text-[15px] font-medium">{s.title}</div>
                  <div className="text-[12.5px] text-[var(--ink-dim)]">
                    {s.body}
                  </div>
                  <div className="mono text-[10.5px] text-[var(--ink-mute)] mt-1">
                    {s.meta}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes wfPing {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.55); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
