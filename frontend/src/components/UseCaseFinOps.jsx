import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const trendData = [
  { d: "Mar", spend: 184, savings: 22 },
  { d: "Apr", spend: 192, savings: 36 },
  { d: "May", spend: 178, savings: 48 },
  { d: "Jun", spend: 168, savings: 62 },
  { d: "Jul", spend: 154, savings: 78 },
  { d: "Aug", spend: 142, savings: 94 },
  { d: "Sep", spend: 131, savings: 112 },
  { d: "Oct", spend: 119, savings: 138 },
  { d: "Nov", spend: 108, savings: 162 },
  { d: "Dec", spend: 96, savings: 204 },
];

const breakdown = [
  { svc: "EC2", v: 412 },
  { svc: "RDS", v: 268 },
  { svc: "Lambda", v: 184 },
  { svc: "S3", v: 156 },
  { svc: "EKS", v: 134 },
  { svc: "Other", v: 92 },
];

const anomalies = [
  {
    type: "ANOMALY",
    region: "us-east-1 · Lambda",
    body: "Lambda egress spike → +38% vs baseline",
    sub: "Correlated with deploy abc1f4 · REI confidence 89%",
    delta: "+$1,240/day projected overrun",
    tone: "warn",
  },
  {
    type: "WASTE",
    region: "eu-west-1 · EC2",
    body: "Idle GPU cluster in staging environment",
    sub: "p3.8xlarge × 4 · running 14 days idle · no traffic",
    delta: "$1,240/day · auto-terminate in 24h?",
    tone: "danger",
  },
  {
    type: "SAVINGS",
    region: "us-west-2 · RDS",
    body: "Right-size db.r6g.2xlarge → r6g.xlarge",
    sub: "CPU avg 18% · no SLO impact predicted · 92% confidence",
    delta: "$840/mo savings · apply with 1-click",
    tone: "mint",
  },
];

function tagClass(t) {
  if (t === "danger") return "tag-danger";
  if (t === "warn") return "tag-warn";
  return "tag-mint";
}

export default function UseCaseFinOps() {
  return (
    <section id="finops" data-testid="use-case-finops" className="section">
      <div className="container-cs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:order-2">
            <div className="section-label">USE CASE 02 · CLOUD FINOPS AGENT</div>
            <h2 className="section-title">
              Stop paying for cloud{" "}
              <span className="serif">you don't use.</span>
            </h2>
            <p className="section-sub">
              REI continuously audits spend, identifies waste, right-sizes
              resources, and connects every cost insight back to real incident
              impact — across AWS, Azure, and GCP.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { v: "$2.4M", l: "annual savings identified" },
                { v: "$412K", l: "monthly waste avoided" },
                { v: "71%", l: "RI coverage" },
                { v: "1-click", l: "remediations" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="hairline rounded-xl p-4 bg-[var(--panel)]/40"
                  data-testid={`finops-metric-${m.l.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="mono text-[26px] tracking-tight text-[var(--signal)]">
                    {m.v}
                  </div>
                  <div className="mono text-[11px] text-[var(--ink-mute)] mt-1">
                    {m.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 lg:order-1">
            {/* Top bento: 3 stats + savings chart */}
            <div className="grid grid-cols-3 gap-3" data-testid="finops-stats-row">
              {[
                { l: "IDLE RESOURCES", v: "$128K", s: "27 resources · 30d" },
                { l: "RIGHT-SIZING OPP", v: "$204K", s: "43 instances flagged" },
                { l: "RI COVERAGE", v: "71%", s: "+$12K/mo recommend" },
              ].map((c) => (
                <div
                  key={c.l}
                  className="glass p-4 md:p-5"
                  data-testid={`finops-stat-${c.l.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="eyebrow text-[10px]">{c.l}</div>
                  <div className="mono text-2xl md:text-3xl mt-2 tracking-tight">
                    {c.v}
                  </div>
                  <div className="mono text-[11px] text-[var(--ink-mute)] mt-1">
                    {c.s}
                  </div>
                </div>
              ))}
            </div>

            <div className="glass mt-3 p-5" data-testid="finops-trend-chart">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <div className="eyebrow text-[10px]">SPEND vs SAVINGS · 10 mo</div>
                  <div className="mono text-[12px] text-[var(--ink-dim)] mt-1">
                    spend ↓ 48% · savings ↑ 9.3×
                  </div>
                </div>
                <div className="flex items-center gap-3 mono text-[10px] text-[var(--ink-mute)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-3 rounded-sm bg-[var(--accent-2)]" />
                    spend
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-1.5 w-3 rounded-sm bg-[var(--signal)]" />
                    savings
                  </span>
                </div>
              </div>
              <div style={{ width: "100%", height: 180 }}>
                <ResponsiveContainer>
                  <AreaChart data={trendData} margin={{ left: -10, right: 6, top: 4, bottom: 0 }}>
                    <defs>
                      <linearGradient id="spendG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="savG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="d"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 10, fill: "#8895ad", fontFamily: "JetBrains Mono" }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={28}
                      tick={{ fontSize: 10, fill: "#8895ad", fontFamily: "JetBrains Mono" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "1px solid #c8d1e0",
                        borderRadius: 8,
                        fontFamily: "JetBrains Mono",
                        fontSize: 11,
                        color: "#0a1426",
                      }}
                      labelStyle={{ color: "#4a5876" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="spend"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fill="url(#spendG)"
                    />
                    <Area
                      type="monotone"
                      dataKey="savings"
                      stroke="#10b981"
                      strokeWidth={2}
                      fill="url(#savG)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="glass p-5" data-testid="finops-breakdown-chart">
                <div className="eyebrow text-[10px] mb-3">SERVICE SPEND · this month</div>
                <div style={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer>
                    <BarChart data={breakdown} margin={{ left: -10, right: 4, top: 4, bottom: 0 }}>
                      <XAxis
                        dataKey="svc"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: "#8895ad", fontFamily: "JetBrains Mono" }}
                      />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{
                          background: "#ffffff",
                          border: "1px solid #c8d1e0",
                          borderRadius: 8,
                          fontFamily: "JetBrains Mono",
                          fontSize: 11,
                          color: "#0a1426",
                        }}
                      />
                      <Bar dataKey="v" radius={[4, 4, 0, 0]} fill="#2563eb" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="glass p-5" data-testid="finops-cta-card">
                <div className="eyebrow text-[10px]">ANNUAL SAVINGS</div>
                <div className="mono text-4xl mt-2 tracking-tight text-[var(--signal)]">
                  $2.4M
                </div>
                <div className="mono text-[11px] text-[var(--ink-mute)]">
                  identified + actioned · last 12mo
                </div>
                <div className="divider-x my-4" />
                <div className="flex flex-wrap gap-2">
                  <button className="btn-primary text-sm" data-testid="finops-apply-all">
                    Apply all recommendations
                  </button>
                  <button className="btn-ghost text-sm" data-testid="finops-export">
                    Export report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Anomalies feed */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <div className="eyebrow">COST ANOMALIES · REAL-TIME</div>
            <span className="mono text-[11px] text-[var(--ink-mute)]">
              streaming · 3 active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="finops-anomalies">
            {anomalies.map((a) => (
              <div
                key={a.body}
                className="glass p-5 transition-all hover:-translate-y-1 hover:border-[var(--line-2)]"
                data-testid={`anomaly-${a.type.toLowerCase()}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`tag-azure ${tagClass(a.tone)}`}>{a.type}</span>
                  <span className="mono text-[10px] text-[var(--ink-mute)]">
                    {a.region}
                  </span>
                </div>
                <div className="mt-4 text-[15px] tracking-tight text-[var(--ink)]">
                  {a.body}
                </div>
                <div className="mono text-[11.5px] text-[var(--ink-mute)] mt-2">
                  {a.sub}
                </div>
                <div className="divider-x my-4" />
                <div
                  className="mono text-[12px]"
                  style={{
                    color:
                      a.tone === "danger"
                        ? "var(--danger)"
                        : a.tone === "warn"
                          ? "var(--warn)"
                          : "var(--signal)",
                  }}
                >
                  {a.delta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
