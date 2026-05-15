import { Github, Linkedin, Twitter } from "lucide-react";

const cols = [
  {
    h: "Platforms",
    items: [
      "Cloud Cost Optimization",
      "Enterprise GPT",
      "Cloud Security Optimization",
      "ASTRA Agents",
    ],
  },
  {
    h: "By Industry",
    items: [
      "Financial Services",
      "Healthcare",
      "Logistics",
      "Pharmaceutical",
      "Public Sector",
    ],
  },
  {
    h: "By Persona",
    items: [
      "Cloud Architecture",
      "DevOps",
      "FinOps",
      "CIOs & IT Executives",
      "SecOps",
    ],
  },
  {
    h: "Resources",
    items: ["About", "Pricing", "Careers", "Blog", "Case Studies", "Contact"],
  },
];

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="border-t border-[var(--line)] bg-[var(--bg-2)]/40 pt-16 pb-10"
    >
      <div className="container-cs">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <img
                src="/brand/cloudscore-mark.png"
                alt="CloudScore"
                className="h-8 w-8"
                style={{ filter: "drop-shadow(0 0 12px rgba(91,184,240,0.35))" }}
              />
              <span className="text-lg font-semibold tracking-tight">
                CloudScore
              </span>
            </div>
            <p className="mt-4 text-[13px] text-[var(--ink-dim)] max-w-[320px] leading-relaxed">
              The only platform converging{" "}
              <span className="text-[var(--ink)]">AI SRE</span>,{" "}
              <span className="text-[var(--ink)]">FinOps</span>, and{" "}
              <span className="text-[var(--ink)]">Observability</span> — pricing
              every event in real dollars.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="#"
                className="btn-ghost p-2 h-9 w-9 justify-center"
                aria-label="LinkedIn"
                data-testid="footer-linkedin"
              >
                <Linkedin size={14} />
              </a>
              <a
                href="#"
                className="btn-ghost p-2 h-9 w-9 justify-center"
                aria-label="GitHub"
                data-testid="footer-github"
              >
                <Github size={14} />
              </a>
              <a
                href="#"
                className="btn-ghost p-2 h-9 w-9 justify-center"
                aria-label="Twitter"
                data-testid="footer-twitter"
              >
                <Twitter size={14} />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <div className="eyebrow text-[10px] mb-4">{c.h}</div>
              <ul className="space-y-2.5">
                {c.items.map((it) => (
                  <li key={it}>
                    <a
                      href="#"
                      className="text-[13px] text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
                      data-testid={`footer-link-${it.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    >
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--line)] flex items-center justify-between flex-wrap gap-3">
          <div className="mono text-[11px] text-[var(--ink-mute)]">
            © {new Date().getFullYear()} CloudScore.ai · All rights reserved
          </div>
          <div className="mono text-[11px] text-[var(--ink-mute)] flex items-center gap-4">
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
            <span className="flex items-center gap-2">
              <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
              ASTRA · operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
