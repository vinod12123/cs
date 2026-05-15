import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Platform", href: "#astra" },
    { label: "Use Cases", href: "#ai-sre" },
    { label: "REI Layer", href: "#rei" },
    { label: "Integrations", href: "#integrations" },
  ];

  return (
<nav data-testid="sticky-nav" className="fixed top-0 left-0 right-0 z-50 transition-all"
  style={{
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    background: scrolled ? "color-mix(in oklab, var(--bg) 78%, transparent)" : "color-mix(in oklab, var(--bg) 50%, transparent)",
    borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
    paddingTop: "12px",
  }}
>
  <div className="container-cs flex items-center justify-between py-6 pb-4">
        <a
          href="#top"
          className="flex items-center gap-2"
          data-testid="nav-brand"
        >
          <img
            src="/brand/cloudscore-mark.png"
            alt="CloudScore"
            className="h-8 w-8 rounded-md object-contain"
            style={{ filter: "drop-shadow(0 0 12px rgba(91,184,240,0.35))" }}
          />
          <span className="text-[17px] font-semibold tracking-tight">
            CloudScore
          </span>
          <span className="tag-azure ml-2 hidden sm:inline-flex">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-[var(--signal)]" />
            ASTRA · LIVE
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="text-sm text-[var(--ink-dim)] hover:text-[var(--ink)] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="btn-ghost text-sm" data-testid="nav-signin-btn">
            Sign in
          </button>
          <a href="#demo" className="btn-primary text-sm" data-testid="nav-demo-btn">
            Book a demo
            <ArrowRight size={14} />
          </a>
        </div>

        <button
          className="md:hidden btn-ghost p-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--line)] bg-[var(--bg-2)]">
          <div className="container-cs py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[var(--ink-dim)] hover:text-[var(--ink)] py-1"
                data-testid={`nav-mobile-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="btn-primary text-sm justify-center"
              data-testid="nav-mobile-demo-btn"
            >
              Book a demo <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
