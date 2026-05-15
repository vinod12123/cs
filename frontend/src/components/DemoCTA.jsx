import { useState } from "react";
import axios from "axios";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function DemoCTA() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.name) {
      toast.error("Name and email are required");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/demo-requests`, form);
      toast.success("Request received — ASTRA will be in touch within 24h.");
      setForm({ name: "", email: "", company: "", role: "", message: "" });
    } catch (err) {
      toast.error("Could not submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section id="demo" data-testid="cta-section" className="section relative">
      <div className="container-cs">
        <div className="glass overflow-hidden relative" data-testid="cta-card">
          <div className="absolute inset-0 bg-grid-fine opacity-40 pointer-events-none" />
          <div
            className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side, rgba(59,159,224,0.20), transparent 70%)",
            }}
          />
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-[var(--line)]">
              <div className="section-label">FOR SRE · FINOPS · CFO</div>
              <h2 className="section-title">
                Your cloud is talking.{" "}
                <span className="serif">Is anyone actually listening?</span>
              </h2>
              <p className="section-sub">
                Connect your cloud, PagerDuty, and GitHub — ASTRA is
                investigating your first incident within the hour.
              </p>

              <ul className="mt-8 space-y-3 text-[14px] text-[var(--ink-dim)]">
                <li className="flex items-start gap-3">
                  <span className="mono text-[10px] mt-1 text-[var(--accent-2)]">
                    01
                  </span>
                  Read-only access. No agents to install. SOC 2 Type II.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mono text-[10px] mt-1 text-[var(--accent-2)]">
                    02
                  </span>
                  First RCA in under 5 minutes — backed by REI dollars.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mono text-[10px] mt-1 text-[var(--accent-2)]">
                    03
                  </span>
                  Transparent reasoning. Every action logged. Reversible.
                </li>
              </ul>

              <div className="mt-8 flex items-center gap-2 text-xs mono text-[var(--ink-mute)]">
                <ShieldCheck size={14} className="text-[var(--accent-2)]" />
                SOC 2 Type II · ISO 27001 · HIPAA · GDPR · Enterprise SLA
              </div>
            </div>

            <div className="lg:col-span-6 p-8 md:p-12">
              <form
                onSubmit={submit}
                className="space-y-4"
                data-testid="demo-form"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Name"
                    value={form.name}
                    onChange={onChange("name")}
                    placeholder="Jane Cooper"
                    required
                    testid="demo-input-name"
                  />
                  <Field
                    label="Work email"
                    type="email"
                    value={form.email}
                    onChange={onChange("email")}
                    placeholder="jane@acme.com"
                    required
                    testid="demo-input-email"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Company"
                    value={form.company}
                    onChange={onChange("company")}
                    placeholder="Acme Inc"
                    testid="demo-input-company"
                  />
                  <Field
                    label="Role"
                    value={form.role}
                    onChange={onChange("role")}
                    placeholder="VP Engineering"
                    testid="demo-input-role"
                  />
                </div>

                <div>
                  <label className="block mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-mute)] mb-2">
                    What are you optimizing?
                  </label>
                  <textarea
                    value={form.message}
                    onChange={onChange("message")}
                    rows={3}
                    placeholder="MTTR, cloud spend, on-call burden…"
                    data-testid="demo-input-message"
                    className="w-full bg-[var(--bg-2)] border border-[var(--line)] rounded-xl px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent-2)] transition-colors placeholder:text-[var(--ink-mute)] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center"
                  data-testid="demo-submit-btn"
                >
                  {loading ? "Submitting…" : "Start free investigation"}
                  <ArrowRight size={14} />
                </button>

                <p className="mono text-[10.5px] text-[var(--ink-mute)] text-center">
                  No credit card · Read-only by default · Live in {`< 1 hour`}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", required, testid }) {
  return (
    <div>
      <label className="block mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-mute)] mb-2">
        {label} {required && <span className="text-[var(--danger)]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={testid}
        className="w-full bg-[var(--bg-2)] border border-[var(--line)] rounded-xl px-4 py-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--accent-2)] transition-colors placeholder:text-[var(--ink-mute)]"
      />
    </div>
  );
}
