import { Check, Minus, X } from "lucide-react";

const cols = ["CloudScore", "Bacca.ai", "NeuBird", "Cleric.ai", "Lightrun"];

const rows = [
  ["AI SRE / Autonomous RCA", "y", "y", "y", "y", "p"],
  ["Cloud FinOps Agent", "y", "n", "n", "n", "n"],
  ["Unified Observability Agent", "y", "p", "y", "p", "y"],
  ["Reliability Economics (REI)", "y", "n", "n", "n", "n"],
  ["Multi-Cloud (AWS+Azure+GCP)", "y", "p", "y", "p", "p"],
  ["LangGraph Multi-Agent Orchestration", "y", "n", "n", "n", "n"],
  ["Auto-Remediation with Guardrails", "y", "y", "y", "p", "n"],
  ["Pre-Deploy Economic Gate (PERS)", "y", "n", "n", "n", "p"],
  ["On-Premise / Private Deployment", "y", "y", "p", "n", "p"],
  ["SOC 2 Type II Certified", "y", "y", "p", "n", "p"],
];

function Cell({ v, highlight }) {
  if (v === "y")
    return (
      <span
        className="inline-flex items-center justify-center h-7 w-7 rounded-full"
        style={{
          background: highlight ? "rgba(94,234,212,0.16)" : "rgba(91,184,240,0.10)",
          color: highlight ? "var(--signal)" : "var(--accent-2)",
          border: `1px solid ${highlight ? "rgba(94,234,212,0.35)" : "rgba(91,184,240,0.25)"}`,
        }}
      >
        <Check size={14} strokeWidth={2.5} />
      </span>
    );
  if (v === "p")
    return (
      <span
        className="inline-flex items-center justify-center h-7 w-7 rounded-full"
        style={{
          background: "rgba(255,178,89,0.10)",
          color: "var(--warn)",
          border: "1px solid rgba(255,178,89,0.25)",
        }}
      >
        <Minus size={14} strokeWidth={2.5} />
      </span>
    );
  return (
    <span
      className="inline-flex items-center justify-center h-7 w-7 rounded-full"
      style={{
        background: "rgba(255,77,122,0.06)",
        color: "var(--ink-mute)",
        border: "1px solid var(--line)",
      }}
    >
      <X size={14} strokeWidth={2} />
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="compare" data-testid="comparison-section" className="section">
      <div className="container-cs">
        <div className="mb-10">
          <div className="section-label">COMPETITIVE ANALYSIS</div>
          <h2 className="section-title">
            Why CloudScore wins —{" "}
            <span className="serif">where others solve one,</span>{" "}
            we solve all three.
          </h2>
          <p className="section-sub">
            The only platform converging AI SRE, FinOps, and Observability —
            connecting reliability and cost in one autonomous brain.
          </p>
        </div>

        <div className="glass overflow-hidden" data-testid="comparison-table">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth: 720 }}>
              <thead>
                <tr className="border-b border-[var(--line)]">
                  <th className="text-left px-5 py-4 mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-mute)] font-normal">
                    Capability
                  </th>
                  {cols.map((c, i) => (
                    <th
                      key={c}
                      className="px-5 py-4 mono text-[11px] tracking-[0.12em] uppercase font-medium"
                      style={{
                        color: i === 0 ? "var(--accent-2)" : "var(--ink-mute)",
                        background:
                          i === 0
                            ? "linear-gradient(180deg, rgba(91,184,240,0.06), transparent)"
                            : "transparent",
                      }}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, idx) => (
                  <tr
                    key={r[0]}
                    className="border-b border-[var(--line)] last:border-0 hover:bg-[var(--panel-2)]/40 transition-colors"
                    data-testid={`compare-row-${idx}`}
                  >
                    <td className="px-5 py-3.5 text-[var(--ink)] tracking-tight">
                      {r[0]}
                    </td>
                    {r.slice(1).map((v, i) => (
                      <td
                        key={i}
                        className="px-5 py-3.5 text-center"
                        style={{
                          background:
                            i === 0
                              ? "linear-gradient(180deg, rgba(91,184,240,0.04), transparent)"
                              : "transparent",
                        }}
                      >
                        <Cell v={v} highlight={i === 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-[var(--line)] flex items-center gap-6 mono text-[11px] text-[var(--ink-mute)]">
            <span className="flex items-center gap-2">
              <Check size={12} className="text-[var(--accent-2)]" />
              Full support
            </span>
            <span className="flex items-center gap-2">
              <Minus size={12} className="text-[var(--warn)]" />
              Partial / Limited
            </span>
            <span className="flex items-center gap-2">
              <X size={12} className="text-[var(--ink-mute)]" />
              Not available
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
