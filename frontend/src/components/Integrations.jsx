const integrations = [
  { name: "AWS", g: "Cloud" },
  { name: "Azure", g: "Cloud" },
  { name: "GCP", g: "Cloud" },
  { name: "Datadog", g: "Observability" },
  { name: "New Relic", g: "Observability" },
  { name: "Grafana", g: "Observability" },
  { name: "Prometheus", g: "Observability" },
  { name: "Splunk", g: "Observability" },
  { name: "Dynatrace", g: "Observability" },
  { name: "Loki", g: "Observability" },
  { name: "Honeycomb", g: "Observability" },
  { name: "PagerDuty", g: "Incident" },
  { name: "Opsgenie", g: "Incident" },
  { name: "Slack", g: "Comms" },
  { name: "Teams", g: "Comms" },
  { name: "Jira", g: "ITSM" },
  { name: "ServiceNow", g: "ITSM" },
  { name: "GitHub", g: "Code" },
  { name: "GitLab", g: "Code" },
  { name: "Bitbucket", g: "Code" },
  { name: "Terraform", g: "IaC" },
  { name: "Kubernetes", g: "Runtime" },
  { name: "ArgoCD", g: "CD" },
  { name: "Helm", g: "Runtime" },
];

export default function Integrations() {
  return (
    <section id="integrations" data-testid="integrations-section" className="section">
      <div className="container-cs">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="section-label">INTEGRATIONS · 60+ NATIVE</div>
            <h2 className="section-title">
              Works with{" "}
              <span className="serif">your entire stack.</span>
            </h2>
            <p className="section-sub">
              Connect your whole stack in an afternoon. Read-only by default.
              Open MCP protocol supported — bring your own AI agents.
            </p>
          </div>
          <span className="tag-azure">MCP-NATIVE</span>
        </div>

        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-px bg-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden"
          data-testid="integrations-grid"
        >
          {integrations.map((it, i) => (
            <div
              key={it.name}
              className="aspect-square bg-[var(--panel)] hover:bg-[var(--panel-2)] transition-colors flex flex-col items-center justify-center p-3 group"
              data-testid={`integration-${it.name.toLowerCase().replace(/\s/g, "-")}`}
            >
              <div
                className="h-10 w-10 rounded-lg flex items-center justify-center mono text-[12px] font-semibold tracking-tight"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(91,184,240,0.10), rgba(91,184,240,0.02))",
                  border: "1px solid rgba(91,184,240,0.20)",
                  color: "var(--accent-2)",
                }}
              >
                {it.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="mt-2 text-[12px] tracking-tight text-[var(--ink-dim)] group-hover:text-[var(--ink)] transition-colors text-center leading-tight">
                {it.name}
              </div>
              <div className="mt-0.5 mono text-[9px] text-[var(--ink-mute)] uppercase tracking-[0.16em]">
                {it.g}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center mono text-[12px] text-[var(--ink-mute)]">
          + 36 more · Open MCP protocol · zero agents to maintain
        </div>
      </div>
    </section>
  );
}
