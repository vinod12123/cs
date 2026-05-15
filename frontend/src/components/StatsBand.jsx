import { useEffect, useRef, useState } from "react";
import { TrendingUp, Zap, ShieldCheck } from "lucide-react";

function useInView(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVis(true),
      { threshold: 0.3 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return vis;
}

function Counter({ to, suffix = "", duration = 1400 }) {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const seen = useInView(ref);

  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(Math.floor(to * eased));
      if (t < 1) requestAnimationFrame(tick);
      else setV(to);
    };
    requestAnimationFrame(tick);
  }, [seen, to, duration]);

  return (
    <span ref={ref} className="mono">
      {v}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 40,
    suffix: "%",
    label: "Faster Operations",
    body: "Accelerate cloud optimization with AI-driven automation across SRE, FinOps, and Security.",
    icon: Zap,
  },
  {
    value: 90,
    suffix: "%",
    label: "Operational Confidence",
    body: "Sleep easy knowing CloudScore ensures reliability and remediation around the clock.",
    icon: ShieldCheck,
  },
  {
    value: 30,
    suffix: "%",
    label: "Cost Reduction",
    body: "Slash unnecessary expenses while maintaining top-tier performance at every layer.",
    icon: TrendingUp,
  },
];

export default function StatsBand() {
  return (
    <section
      data-testid="stats-band"
      className="section relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(700px 400px at 50% 0%, rgba(37,99,235,0.10), transparent 70%)",
        }}
      />
      <div className="container-cs relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="section-label">REAL IMPACT · REAL RESULTS</div>
          <h2 className="section-title mx-auto" style={{ textAlign: "center" }}>
            Numbers that{" "}
            <span className="serif">make CFOs and CTOs</span>{" "}
            <span className="serif" style={{ color: "var(--accent)" }}>
              agree.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="glass relative overflow-hidden p-7 group transition-all hover:-translate-y-1"
              data-testid={`stat-card-${i}`}
            >
              {/* arrow streak */}
              <svg
                className="absolute -right-4 -top-4 opacity-50 group-hover:opacity-100 transition-opacity"
                width="120"
                height="120"
                viewBox="0 0 120 120"
              >
                <defs>
                  <linearGradient id={`streak-${i}`} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {Array.from({ length: 6 }).map((_, k) => (
                  <line
                    key={k}
                    x1={20 + k * 16}
                    y1={120}
                    x2={120}
                    y2={20 + k * 16}
                    stroke={`url(#streak-${i})`}
                    strokeWidth="1"
                  />
                ))}
              </svg>

              <div className="flex items-center justify-between">
                <s.icon size={20} className="text-[var(--accent)]" />
                <span
                  className="mono text-[10px] tracking-[0.16em] uppercase"
                  style={{ color: "var(--ink-mute)" }}
                >
                  {String(i + 1).padStart(2, "0")} / 03
                </span>
              </div>

              <div
                className="mt-5 headline"
                style={{ fontSize: 64, lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>

              <div className="mt-2 text-[15px] font-medium tracking-tight text-[var(--ink)]">
                {s.label}
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--ink-dim)]">
                {s.body}
              </p>

              {/* progress bar */}
              <div className="mt-6">
                <div className="h-[3px] rounded-full bg-[var(--line)] overflow-hidden">
                  <div
                    className="h-full"
                    style={{
                      width: `${s.value}%`,
                      background:
                        "linear-gradient(90deg, var(--accent), var(--accent-2))",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
