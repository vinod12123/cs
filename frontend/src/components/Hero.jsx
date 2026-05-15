import { useEffect, useState } from "react";
import { ArrowRight, Activity, DollarSign, Cpu } from "lucide-react";

const logSeed = [
  { agent: "SRE", verb: "DETECT", text: "Spike in 5xx on payments-api", level: "danger" },
  { agent: "REI", verb: "ANALYZE", text: "Pricing P1 at $214/min burn", level: "warn" },
  { agent: "FINOPS", verb: "SCAN", text: "Idle GPU cluster eu-west-1 · 14d", level: "warn" },
  { agent: "OBSV", verb: "TRACE", text: "Causal map: orders → inventory → redis", level: "azure" },
  { agent: "SRE", verb: "HYPOTH", text: "Lock ordering missing in batch_update()", level: "azure" },
  { agent: "EXEC", verb: "PROPOSE", text: "Rollback abc1f4 · 45s · halts $73/min", level: "mint" },
  { agent: "REI", verb: "PRICE", text: "Burn cascade · 3 services · $4,501 so far", level: "danger" },
  { agent: "OBSV", verb: "PREDICT", text: "Memory +22% checkout-svc · no SLO breach 4h", level: "azure" },
  { agent: "SEC", verb: "AUDIT", text: "IAM drift detected · prod-deployer · over-priv", level: "warn" },
  { agent: "INSIGHT", verb: "REPORT", text: "Reliability ROI · weekly · ready", level: "mint" },
];

function colorFor(lvl) {
  if (lvl === "danger") return "var(--danger)";
  if (lvl === "warn") return "var(--warn)";
  if (lvl === "mint") return "var(--signal)";
  return "var(--accent-2)";
}

export default function Hero() {
  const [burn, setBurn] = useState(18914);
  const [logs, setLogs] = useState(logSeed.slice(0, 5));
  const [tickIdx, setTickIdx] = useState(5);

  useEffect(() => {
    const id = setInterval(() => {
      setBurn((b) => b + Math.floor(40 + Math.random() * 90));
      setTickIdx((i) => {
        const next = (i + 1) % logSeed.length;
        setLogs((prev) => {
          const arr = [...prev, logSeed[next]];
          return arr.length > 7 ? arr.slice(arr.length - 7) : arr;
        });
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      {/* grid bg */}
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-70" />
      <div
        className="absolute -top-32 right-0 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,99,235,0.10), transparent 70%)",
        }}
      />
      {/* constellation dots */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="dotG">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 22 }).map((_, i) => {
          const cx = (i * 137) % 100;
          const cy = (i * 271) % 100;
          const r = 1 + ((i * 7) % 3);
          return (
            <circle
              key={i}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r={r}
              fill="url(#dotG)"
              opacity={0.55}
            >
              <animate
                attributeName="opacity"
                values="0.15;0.85;0.15"
                dur={`${3 + (i % 4)}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
      </svg>

      <div className="container-cs relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7">
            <div className="tag-azure mb-6" data-testid="hero-eyebrow">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              RELIABLE ECONOMIC INTELLIGENCE · ASTRA IS LIVE
            </div>

            <h1
              className="headline text-[44px] sm:text-[64px] lg:text-[80px]"
              data-testid="hero-headline"
            >
              Every incident.
              <br />
              Every deploy.
              <br />
              <span className="serif">priced in real </span>
              <span className="serif-accent">dollars.</span>
            </h1>

            <p
              className="mt-7 text-[17px] leading-relaxed text-[var(--ink-dim)] max-w-[560px]"
              data-testid="hero-subhead"
            >
              CloudScore is the first{" "}
              <span className="text-[var(--ink)]">AI-SRE</span> platform that
              investigates, remediates, and quantifies the cost of every
              production event in real time. Technical truth and financial
              truth, in the same pane.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#demo" className="btn-primary" data-testid="hero-cta-primary">
                Start a free investigation <ArrowRight size={16} />
              </a>
              <span
                className="inline-flex items-center gap-3 rounded-full border bg-[var(--panel)] px-4 py-2.5 text-[12px] mono text-[var(--ink-dim)]"
                style={{ borderColor: "var(--line)" }}
                data-testid="hero-trust-pill"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                SOC 2 TYPE II <span className="text-[var(--ink-mute)]">|</span>{" "}
                ISO 27001 <span className="text-[var(--ink-mute)]">|</span> HIPAA
              </span>
              <span
                className="inline-flex items-center gap-2 text-[12px] mono text-[var(--ink-dim)]"
                data-testid="hero-live-pill"
              >
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                14 live investigations running now
              </span>
            </div>

            {/* KPI strip */}
            <div className="mt-12 grid grid-cols-3 gap-4" data-testid="hero-kpis">
              {[
                { label: "MEDIAN MTTR", value: "4m 12s", note: "↓ 78% baseline", icon: Activity },
                { label: "CLOUD WASTE / MO", value: "$412K", note: "avoided by REI", icon: DollarSign },
                { label: "AUTO-REMEDIATED", value: "63%", note: "Tier-3 incidents", icon: Cpu },
              ].map((k) => (
                <div
                  key={k.label}
                  className="hairline rounded-xl p-4 bg-[var(--panel)]/60"
                  data-testid={`hero-kpi-${k.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="eyebrow text-[10px]">{k.label}</div>
                    <k.icon size={14} className="text-[var(--accent-2)]" />
                  </div>
                  <div className="mt-2 text-2xl mono tracking-tight">{k.value}</div>
                  <div className="mt-1 text-[11px] text-[var(--ink-mute)] mono">{k.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live orchestration log card */}
          <div className="lg:col-span-5">
            <div className="glass glow-azure overflow-hidden" data-testid="hero-orchestration-log">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-[var(--danger)]" />
                  <span className="eyebrow text-[10px]">ORCHESTRATION LOG · LIVE</span>
                </div>
                <span className="kbd">P1 · us-east-1</span>
              </div>

              <div className="px-5 py-4">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-[11px] mono text-[var(--ink-mute)]">
                      LIVE · payments-api
                    </div>
                    <div className="mt-1 mono text-[40px] leading-none tracking-tight text-[var(--danger)]">
                      ${burn.toLocaleString()}
                    </div>
                    <div className="mt-1 text-xs mono text-[var(--ink-dim)]">
                      burn · +$73/min · 2 agents investigating
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] mono text-[var(--ink-mute)]">
                      CONFIDENCE
                    </div>
                    <div className="mono text-2xl text-[var(--signal)]">94%</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--line)]">
                <div className="max-h-[260px] overflow-hidden px-5 py-4 space-y-2">
                  {logs.map((l, i) => (
                    <div
                      key={`${l.agent}-${i}-${l.text.slice(0, 8)}`}
                      className="flex items-start gap-3 text-[12.5px] mono"
                      style={{
                        animation: "streamFade 1.6s ease-out",
                      }}
                    >
                      <span
                        className="mt-[3px] inline-block h-1.5 w-1.5 rounded-full"
                        style={{ background: colorFor(l.level) }}
                      />
                      <span
                        className="text-[10px] tracking-[0.14em] uppercase px-1.5 py-0.5 rounded"
                        style={{
                          color: colorFor(l.level),
                          border: `1px solid ${colorFor(l.level)}33`,
                          background: `${colorFor(l.level)}10`,
                        }}
                      >
                        {l.agent}
                      </span>
                      <span className="text-[var(--ink-mute)]">{l.verb}</span>
                      <span className="text-[var(--ink)]">{l.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-[var(--line)] px-5 py-3 flex items-center justify-between">
                <span className="text-[11px] mono text-[var(--ink-mute)]">
                  Ask ASTRA anything…
                </span>
                <span className="kbd">⌘ + ↵</span>
              </div>
            </div>

            {/* small caption */}
            <div className="mt-3 text-[11px] mono text-[var(--ink-mute)] text-right">
              streaming · 16 agents · langgraph-powered
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
