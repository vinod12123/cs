# CloudScore.ai — Marketing Site PRD

## Original Problem
Build a dynamic, graphic-rich CloudScore.ai marketing website. Match cloudscore.ai brand exactly (logo/fonts/theme: dark, azure #3b9fe0, Inter Tight + JetBrains Mono + Instrument Serif). Add animated, graphic-rich sections inspired by bacca.ai, cleric.ai, lightrun.com, neubird.ai. Cover 4 use cases: AI SRE, Cloud FinOps Agent, Observability Agent, REI (Reliability Economics Intelligence).

## User Personas
- SRE / DevOps engineers — autonomous incident response, MTTR reduction
- FinOps leaders — cloud cost optimization, anomaly detection, RI coverage
- CIOs / CFOs — REI ($-priced reliability), executive dashboards
- Platform teams — observability, causal topology, multi-cloud

## Architecture
- Frontend: React 19 + Tailwind + recharts + lucide-react + sonner toasts; CRA on port 3000
- Backend: FastAPI + Motor (MongoDB); supervisor on port 8001
- Brand DNA: dark theme #050a14 base, azure #3b9fe0 accent, mint #5eead4, amber #ffb259, danger #ff4d7a
- Fonts: Inter Tight (UI), JetBrains Mono (data/eyebrow), Instrument Serif italic (emphasis)
- Single-page anchor-scrolled landing at `/`

## Implemented (2026-05-09)
### Frontend sections (single-page Landing)
- StickyNav (backdrop blur, ASTRA · LIVE pill, mobile menu)
- Hero (animated orchestration log, live $burn ticker, KPI tiles MTTR/Waste/Auto-remediated)
- TrustedMarquee (16 partners, infinite CSS marquee)
- REIHero (ASTRA · CORE card + 6 layer tiles)
- UseCaseAISRE (animated 6-step investigation timeline, ranked $-impact recommendations)
- UseCaseFinOps ($128K/$204K/71% stat row, 10mo spend-vs-savings AreaChart, service BarChart, anomalies feed)
- UseCaseObservability (4 metric tiles + sparklines, custom SVG causal topology with dashflow, 3 insight cards)
- AstraGrid (16 specialized agents categorized SRE/FinOps/Observability/Security/Analytics/Orchestration)
- Comparison (CloudScore vs Bacca/NeuBird/Cleric/Lightrun, 10 capability rows)
- Integrations (24+ tools grid, MCP-native)
- DemoCTA (working contact form → MongoDB)
- Footer

### Backend
- `GET /api/` — service status
- `GET /api/stats` — public stats payload
- `POST /api/demo-requests` — saves lead to MongoDB (`demo_requests`), validates email
- `GET /api/demo-requests` — list (no `_id` leaked)
- `GET/POST /api/status` — preserved baseline endpoints

### Brand assets
- `/app/frontend/public/brand/cloudscore-logo.png` and `cloudscore-mark.png` (from user zip)

## Testing
- iteration_1: 100% backend (9/9 pytest), 100% frontend (Playwright E2E). 0 critical issues.
- Pytest suite at `/app/backend/tests/test_cloudscore_api.py`

## Next / Backlog
### P0
- Add rate-limiting + hCaptcha on `POST /api/demo-requests` (public form spam protection)
- Add admin-only `/api/admin/demo-requests` with auth before exposing leads externally

### P1
- "Ask ASTRA anything" inline AI chat in hero (Emergent LLM key + Claude Sonnet 4.5)
- Resend email integration: notify sales on new demo request
- Per-use-case sub-pages (Use Cases mega-menu)
- Pricing page + ROI calculator (REI calculator)
- Case studies page

### P2
- Migrate `@app.on_event("shutdown")` to lifespan handler
- Return HTTP 201 on resource creation (REST convention)
- Tighten CORS in production (env-driven origin allowlist)
- Per-section motion library (Framer Motion) for richer entrance animations
- Localization (en, es, ar) — given financial/healthcare/public-sector targeting
- Blog CMS integration (existing CloudScore blog has many posts)

## Notes
- Universal/Emergent LLM key NOT used yet — reserved for "Ask ASTRA" chat (P1)
- All `data-testid` attributes follow descriptive kebab-case
