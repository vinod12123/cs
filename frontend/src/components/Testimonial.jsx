import { Quote } from "lucide-react";

const quotes = [
  {
    quote:
      "CloudScore helped us cut 30% on cloud costs in weeks while quietly catching a deadlock in production. The CFO and the on-call rotation finally agreed on something.",
    name: "Shaun Gilchris",
    role: "Founder & CEO, Radius.AI",
    metric: "30%",
    metricLabel: "cost cut · 6 weeks",
  },
  {
    quote:
      "Critical incidents that used to take days are now handled in minutes. ASTRA quietly resolves Tier-3 issues overnight — by morning we have a $-priced postmortem.",
    name: "Maxime F.",
    role: "Head of Infra, Travel Network",
    metric: "78%",
    metricLabel: "lower MTTR",
  },
  {
    quote:
      "REI is the missing primitive. For the first time, my reliability budget and my cloud budget are the same conversation.",
    name: "Navdip B.",
    role: "SVP Engineering, Bedrock",
    metric: "$2.4M",
    metricLabel: "saved · year one",
  },
];

export default function Testimonial() {
  return (
    <section
      data-testid="testimonial-section"
      className="section relative"
    >
      <div className="container-cs">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="section-label">SIGNAL FROM THE FIELD</div>
            <h2 className="section-title">
              The reliability team{" "}
              <span className="serif">and the CFO</span>{" "}
              <span className="serif" style={{ color: "var(--accent)" }}>
                finally aligned.
              </span>
            </h2>
          </div>
          <div className="mono text-[11px] text-[var(--ink-mute)] flex items-center gap-2">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
            verified outcomes · trust center
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <article
              key={q.name}
              className="glass relative overflow-hidden p-7 group transition-all hover:-translate-y-1"
              data-testid={`testimonial-${i}`}
            >
              <div
                className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(37,99,235,0.18), transparent 70%)",
                }}
              />

              <Quote
                size={22}
                className="text-[var(--accent)] opacity-80"
                strokeWidth={1.6}
              />

              <p className="mt-5 text-[15.5px] leading-relaxed text-[var(--ink)] tracking-tight relative">
                "{q.quote}"
              </p>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={q.name} />
                  <div>
                    <div className="text-[14px] font-medium tracking-tight">
                      {q.name}
                    </div>
                    <div className="mono text-[11px] text-[var(--ink-mute)]">
                      {q.role}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="mono tracking-tight text-[18px]"
                    style={{ color: "var(--accent)" }}
                  >
                    {q.metric}
                  </div>
                  <div className="mono text-[10px] text-[var(--ink-mute)] uppercase tracking-[0.14em]">
                    {q.metricLabel}
                  </div>
                </div>
              </div>

              <div className="mt-6 h-px shimmer" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Avatar({ name }) {
  // generates a deterministic abstract avatar
  const seed = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const hue1 = (seed * 17) % 360;
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="h-10 w-10 rounded-full flex items-center justify-center mono text-[12px] font-semibold"
      style={{
        background: `conic-gradient(from ${hue1}deg at 30% 30%, rgba(37,99,235,0.20), rgba(16,185,129,0.16), rgba(245,158,11,0.14), rgba(37,99,235,0.20))`,
        border: "1px solid var(--line-2)",
        color: "var(--ink)",
      }}
      aria-label={name}
    >
      {initials}
    </div>
  );
}
