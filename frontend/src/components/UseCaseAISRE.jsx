import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Code2, Activity, GitCommitVertical, DollarSign, FlaskConical } from "lucide-react";

const steps = [
  { label: "Triage · alert normalized", meta: "payments-api · P1 · 14:02:11 UTC", icon: Activity },
  { label: "Context · 3 runbooks, 12 PRs pulled", meta: "github.com/acme/payments · deploy abc1f4", icon: GitCommitVertical },
  { label: "Telemetry · Datadog + Loki signal timeline", meta: "4 anomaly windows · 2.1M log lines scanned", icon: Activity },
  { label: "Hypothesis · 4 differential diagnoses ranked", meta: "top theory: deadlock on batch_update lock ordering", icon: FlaskConical },
  { label: "Code · bisected to commit 06b4d9f", meta: "invoice_service.py:182 · CodeLlama 34B · 94%", icon: Code2 },
  { label: "REI · live financial impact computed", meta: "cost cascade across 3 services · $4,501 so far", icon: DollarSign },
];

export default function UseCaseAISRE() {
  const [active, setActive] = useState(0);
  const [burn, setBurn] = useState(18914);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % (steps.length + 1));
      setBurn((b) => b + Math.floor(50 + Math.random() * 110));
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="ai-sre" data-testid="use-case-ai-sre" className="section relative">
      <div className="container-cs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="section-label">USE CASE 01 · AUTONOMOUS INCIDENT INTELLIGENCE</div>
            <h2 className="section-title">
              Root cause in under{" "}
              <span className="serif">5 minutes,</span>
              <br />
              not 5 a.m. on a Tuesday.
            </h2>
            <p className="section-sub">
              ASTRA's AI SRE pulls deploys, code diffs, logs, and traces — runs
              hypotheses in parallel — and lands a verified root cause with
              ranked, $-priced remediations. You approve. It executes.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "< 5 min", l: "to first RCA" },
                { v: "94%", l: "avg confidence" },
                { v: "63%", l: "auto-remediated" },
                { v: "14+", l: "evidence per RCA" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="hairline rounded-xl p-4 bg-[var(--panel)]/40"
                  data-testid={`ai-sre-metric-${m.l.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="mono text-[26px] tracking-tight">{m.v}</div>
                  <div className="mono text-[11px] text-[var(--ink-mute)] mt-1">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>

            <a href="#demo" className="btn-ghost mt-8" data-testid="ai-sre-cta">
              See live RCA → autoremediation
            </a>
          </div>

          {/* Right: animated investigation timeline + recommendations */}
          <div className="lg:col-span-7">
            <div className="glass overflow-hidden" data-testid="ai-sre-timeline-card">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-[var(--warn)]" />
                  <span className="eyebrow text-[10px]">PLAN · STEP {Math.min(active + 1, steps.length)} / {steps.length}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="kbd">P1 · 6m 12s</span>
                  <span className="kbd" style={{ color: "var(--signal)" }}>
                    CONFIDENCE 94%
                  </span>
                </div>
              </div>

              <div className="px-5 py-5 space-y-3">
                {steps.map((s, i) => {
                  const done = i < active;
                  const cur = i === active;
                  return (
                    <div
                      key={s.label}
                      className="flex items-start gap-3"
                      data-testid={`ai-sre-step-${i + 1}`}
                    >
                      <div
                        className="mt-1 h-5 w-5 flex items-center justify-center rounded-full"
                        style={{
                          background: done
                            ? "rgba(94,234,212,0.15)"
                            : cur
                              ? "rgba(91,184,240,0.18)"
                              : "var(--panel-2)",
                          border: `1px solid ${done ? "var(--signal)" : cur ? "var(--accent-2)" : "var(--line-2)"}`,
                        }}
                      >
                        {done ? (
                          <CheckCircle2 size={12} className="text-[var(--signal)]" />
                        ) : cur ? (
                          <Loader2 size={12} className="text-[var(--accent-2)] animate-spin" />
                        ) : (
                          <s.icon size={11} className="text-[var(--ink-mute)]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-[14px] tracking-tight"
                          style={{
                            color: done || cur ? "var(--ink)" : "var(--ink-mute)",
                          }}
                        >
                          {s.label}
                        </div>
                        <div className="mono text-[11.5px] text-[var(--ink-mute)] mt-0.5">
                          {s.meta}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-[var(--line)] px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="eyebrow text-[10px]">WORKING THEORY</div>
                  <p className="mt-2 text-sm text-[var(--ink-dim)]">
                    Deployment-triggered deadlocks from missing lock ordering in{" "}
                    <span className="mono text-[var(--ink)]">batch_update()</span>{" "}
                    introduced in commit{" "}
                    <span className="mono text-[var(--accent-2)]">06b4d9f</span>{" "}
                    by <span className="text-[var(--ink)]">@ravi</span> · shipped
                    42m before incident.
                  </p>
                </div>
                <div className="hairline rounded-xl p-4 bg-[var(--bg-2)]/60">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-[10px]">LIVE BURN</span>
                    <span className="mono text-[11px] text-[var(--ink-mute)]">$/min</span>
                  </div>
                  <div className="mt-2 mono text-3xl text-[var(--danger)] tracking-tight">
                    ${burn.toLocaleString()}
                  </div>
                  <div className="mt-1 mono text-[11px] text-[var(--ink-mute)]">
                    +$73/min · cascade 3 services
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--line)] px-5 py-4">
                <div className="eyebrow text-[10px] mb-3">
                  RECOMMENDED · RANKED BY $ IMPACT
                </div>
                <div className="space-y-2">
                  {[
                    {
                      n: "1",
                      t: "Rollback deploy abc1f4",
                      m: "halts $73/min burn · 45s",
                      tag: "AUTO",
                    },
                    {
                      n: "2",
                      t: "Add ORDER BY to batch_update()",
                      m: "permanent fix · ~6 LOC",
                      tag: "PR",
                    },
                  ].map((r) => (
                    <div
                      key={r.n}
                      className="flex items-center justify-between hairline rounded-lg px-3 py-2.5 hover:border-[var(--line-2)] transition-colors"
                      data-testid={`ai-sre-reco-${r.n}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="mono text-[11px] text-[var(--ink-mute)]">
                          {r.n}.
                        </span>
                        <div>
                          <div className="text-[14px]">{r.t}</div>
                          <div className="mono text-[11px] text-[var(--ink-mute)]">
                            {r.m}
                          </div>
                        </div>
                      </div>
                      <span className="tag-mint">{r.tag}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="btn-primary text-sm" data-testid="ai-sre-approve">
                    Auto-remediate (approve)
                  </button>
                  <button className="btn-ghost text-sm" data-testid="ai-sre-pr">
                    Open PR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
