import { LineChart, Line, ResponsiveContainer } from "recharts";

const sparkA = Array.from({ length: 28 }, (_, i) => ({ x: i, y: 30 + Math.sin(i / 2.6) * 12 + (i % 5 === 0 ? 8 : 0) }));
const sparkB = Array.from({ length: 28 }, (_, i) => ({ x: i, y: 50 - i * 0.8 + (i % 7 === 0 ? -5 : 2) }));
const sparkC = Array.from({ length: 28 }, (_, i) => ({ x: i, y: 20 + (i % 9 === 0 ? 30 : Math.cos(i / 3) * 10) }));

const insights = [
  {
    type: "PREDICTIVE",
    label: "checkout-service",
    body: "Memory trending +22% — correlated with deploy 14m ago. No SLO breach predicted in next 4h. Watching.",
    tone: "warn",
  },
  {
    type: "CAUSAL",
    label: "3rd party",
    body: "Payment gateway degradation detected (Stripe P95 +340ms). Auto-failover armed. REI exposure: $2,100/min if SLO breaches.",
    tone: "danger",
  },
  {
    type: "TOPOLOGY",
    label: "root cause",
    body: "Causal graph: orders-api → inventory-service → redis-cluster → latency cascade. 4 services affected. Confidence 91%.",
    tone: "azure",
  },
];

function toneColor(t) {
  if (t === "danger") return "var(--danger)";
  if (t === "warn") return "var(--warn)";
  return "var(--accent-2)";
}

export default function UseCaseObservability() {
  // simple svg topology
  const nodes = [
    { id: "orders", x: 60, y: 50, label: "orders-api" },
    { id: "inv", x: 230, y: 30, label: "inventory" },
    { id: "redis", x: 400, y: 70, label: "redis-cluster" },
    { id: "ship", x: 230, y: 130, label: "shipping" },
    { id: "auth", x: 60, y: 150, label: "auth-svc" },
    { id: "pay", x: 400, y: 170, label: "payments" },
  ];
  const edges = [
    ["orders", "inv"],
    ["inv", "redis"],
    ["orders", "auth"],
    ["inv", "ship"],
    ["ship", "pay"],
    ["redis", "pay"],
  ];

  return (
    <section
      id="observability"
      data-testid="use-case-observability"
      className="section"
    >
      <div className="container-cs">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="section-label">USE CASE 03 · OBSERVABILITY AGENT</div>
            <h2 className="section-title">
              See everything.{" "}
              <span className="serif">Act intelligently.</span>
            </h2>
            <p className="section-sub">
              Ingest metrics, logs, and traces across your full stack — then use
              causal AI topology mapping to surface what actually matters, with
              every signal priced in real dollars.
            </p>
          </div>
        </div>

        {/* Metric tiles */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-testid="observability-metric-tiles"
        >
          {[
            {
              l: "API LATENCY P99",
              v: "42ms",
              n: "▲ 31% faster vs baseline",
              tone: "mint",
              spark: sparkA,
            },
            {
              l: "ERROR RATE",
              v: "0.02%",
              n: "▼ from 1.4% last week",
              tone: "mint",
              spark: sparkB,
            },
            {
              l: "ANOMALIES",
              v: "3",
              n: "2 auto-resolved · 1 watching",
              tone: "warn",
              spark: sparkC,
            },
            {
              l: "SERVICES OBSERVED",
              v: "214",
              n: "100% coverage",
              tone: "azure",
              spark: sparkA,
            },
          ].map((c) => (
            <div
              key={c.l}
              className="glass p-5"
              data-testid={`observability-tile-${c.l.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow text-[10px]">{c.l}</span>
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full pulse-dot"
                  style={{
                    background:
                      c.tone === "warn"
                        ? "var(--warn)"
                        : c.tone === "mint"
                          ? "var(--signal)"
                          : "var(--accent-2)",
                  }}
                />
              </div>
              <div className="mono text-3xl mt-2 tracking-tight">{c.v}</div>
              <div className="mono text-[11px] text-[var(--ink-mute)] mt-1">
                {c.n}
              </div>
              <div className="mt-3 h-9">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={c.spark}>
                    <Line
                      type="monotone"
                      dataKey="y"
                      stroke={
                        c.tone === "warn"
                          ? "#f59e0b"
                          : c.tone === "mint"
                            ? "#10b981"
                            : "#3b82f6"
                      }
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* Topology + insights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          <div
            className="lg:col-span-7 glass relative overflow-hidden"
            data-testid="observability-topology"
          >
            <div className="px-5 py-3 border-b border-[var(--line)] flex items-center justify-between">
              <span className="eyebrow text-[10px]">CAUSAL TOPOLOGY MAP · LIVE</span>
              <span className="mono text-[11px] text-[var(--ink-mute)]">
                4 services affected · confidence 91%
              </span>
            </div>
            <div className="absolute inset-0 bg-grid-fine opacity-30 pointer-events-none top-12" />
            <div className="p-6 relative">
              <svg viewBox="0 0 480 220" className="w-full h-[300px]">
                {edges.map(([a, b], i) => {
                  const A = nodes.find((n) => n.id === a);
                  const B = nodes.find((n) => n.id === b);
                  const isHot = (a === "inv" && b === "redis") || (a === "redis" && b === "pay");
                  return (
                    <g key={i}>
                      <line
                        x1={A.x}
                        y1={A.y}
                        x2={B.x}
                        y2={B.y}
                        stroke={isHot ? "var(--danger)" : "var(--line-2)"}
                        strokeWidth={isHot ? 1.6 : 1}
                        opacity={isHot ? 0.95 : 0.7}
                      />
                      {isHot && (
                        <line
                          x1={A.x}
                          y1={A.y}
                          x2={B.x}
                          y2={B.y}
                          stroke="var(--danger)"
                          strokeWidth={1.4}
                          className="dashflow"
                          opacity={0.9}
                        />
                      )}
                    </g>
                  );
                })}
                {nodes.map((n) => {
                  const isHot = ["inv", "redis"].includes(n.id);
                  return (
                    <g key={n.id}>
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={18}
                        fill={isHot ? "rgba(255,77,122,0.10)" : "rgba(91,184,240,0.08)"}
                        stroke={isHot ? "var(--danger)" : "var(--accent-2)"}
                        strokeWidth={1.2}
                      />
                      <circle
                        cx={n.x}
                        cy={n.y}
                        r={4}
                        fill={isHot ? "var(--danger)" : "var(--accent-2)"}
                      />
                      <text
                        x={n.x}
                        y={n.y + 32}
                        textAnchor="middle"
                        fontFamily="JetBrains Mono"
                        fontSize="9"
                        fill="var(--ink-dim)"
                      >
                        {n.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="border-t border-[var(--line)] px-5 py-3 flex items-center justify-between">
              <span className="mono text-[11px] text-[var(--ink-mute)]">
                Hot path: orders → inventory → redis → payments
              </span>
              <button className="btn-ghost text-xs" data-testid="observability-configure-slo">
                Configure SLOs
              </button>
            </div>
          </div>

          <div
            className="lg:col-span-5 space-y-3"
            data-testid="observability-insights"
          >
            {insights.map((i) => (
              <div
                key={i.body}
                className="glass p-5"
                data-testid={`insight-${i.type.toLowerCase()}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="tag-azure"
                    style={{
                      color: toneColor(i.tone),
                      borderColor: `${toneColor(i.tone)}33`,
                      background: `${toneColor(i.tone)}10`,
                    }}
                  >
                    {i.type}
                  </span>
                  <span className="mono text-[10px] text-[var(--ink-mute)]">
                    {i.label}
                  </span>
                </div>
                <p className="mt-3 text-[13.5px] text-[var(--ink-dim)] leading-relaxed">
                  {i.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
