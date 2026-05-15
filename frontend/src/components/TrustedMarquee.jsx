const partners = [
  "AWS",
  "Azure",
  "GCP",
  "Datadog",
  "PagerDuty",
  "Kubernetes",
  "Terraform",
  "Prometheus",
  "GitHub",
  "Grafana",
  "Jira",
  "Slack",
  "Splunk",
  "New Relic",
  "ArgoCD",
  "Dynatrace",
];

export default function TrustedMarquee() {
  const list = [...partners, ...partners];
  return (
    <section
      data-testid="trusted-marquee"
      className="border-y border-[var(--line)] bg-[var(--bg-2)]/60 py-7 overflow-hidden"
    >
      <div className="container-cs">
        <div className="flex items-center justify-between mb-5">
          <span className="eyebrow">Trusted by engineering-first teams</span>
          <span className="text-[11px] mono text-[var(--ink-mute)]">
            60+ native integrations · MCP-ready
          </span>
        </div>
      </div>
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--bg-2), transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--bg-2), transparent)",
          }}
        />
        <div className="flex w-max marquee-track gap-12 px-6">
          {list.map((p, i) => (
            <div
              key={`${p}-${i}`}
              className="flex items-center gap-3 mono text-sm uppercase tracking-[0.22em] text-[var(--ink-mute)] hover:text-[var(--ink)] transition-colors whitespace-nowrap"
              data-testid={`partner-${p.toLowerCase().replace(/\s/g, "-")}-${i}`}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--accent-2)" }}
              />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
