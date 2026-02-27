# Advocate Health · Enterprise External Affairs Dashboard

A comprehensive enterprise-level External Affairs dashboard for Advocate Health, the third-largest nonprofit health system in the United States (69 hospitals, 6 states, 160,000+ teammates, $38B revenue).

## Features

### 7 Dashboard Tabs with Drill-Down & Source Attribution
- **Executive Overview** — KPIs, maturity radar, priority alerts, trend charts
- **Government Relations** — 10 federal priorities, 9 state bills, lobbying trends, key congressional relationships
- **Regulatory & Compliance** — 10 federal/state regulations, Joint Commission systemwide accreditation, compliance scores
- **Community Benefit** — $6.2B breakdown, CHNA progress across 5 markets, partnerships
- **Media & Communications** — Coverage tracking, sentiment analysis, social media, thought leadership
- **Policy & Advocacy** — 10 policy positions, 8 coalitions, $460M+ grant pipeline, PAC activity
- **Stakeholders** — 12 stakeholder groups, influence mapping, regional engagement

### 🤖 AI-Powered Research Hub
- **Live web search** via Claude Sonnet + web search API
- **12 pre-built quick research briefs** covering Medicare, Medicaid, 340B, telehealth, AI regulation, workforce, and more
- **Custom research queries** for any healthcare policy topic
- Results include source citations and can be rerun on demand

### Data Source Attribution
Every data point includes its source (OpenSecrets, Federal Register, Joint Commission, IRS Schedule H, Meltwater, internal systems, etc.)

### Click-to-Drill-Down
Every table row, KPI card, and alert item opens a detail dialog with full context and source information.

## Tech Stack

- **React 18** + TypeScript
- **Vite** build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Recharts** for data visualization
- **Anthropic API** (Claude Sonnet + web search) for Research Hub

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
src/
├── App.tsx           # Main dashboard with all 7 tabs + Research Hub
├── data.ts           # All enterprise data with source attribution
├── ResearchHub.tsx   # AI-powered research component
├── main.tsx          # Entry point
├── index.css         # Tailwind + global styles
├── components/ui/    # shadcn/ui components
├── lib/              # Utilities
└── hooks/            # Custom hooks
```

## Data Sources

| Source | Type | Used For |
|--------|------|----------|
| OpenSecrets.org | Public Record | Lobbying spend, PAC contributions |
| Federal Register / CMS.gov | Government | Regulatory tracking, comment periods |
| Joint Commission | Public/Partner | Accreditation status, quality data |
| AHA 2026 Advocacy Agenda | Industry | Policy alignment, legislative priorities |
| IRS Schedule H | Tax Filing | Community benefit breakdown |
| Meltwater | Vendor Platform | Media monitoring, sentiment analysis |
| Sprout Social | Vendor Platform | Social media analytics |
| State Legislature Systems | Government | Bill tracking (IL, NC, WI, GA, SC, AL) |
| Internal CRMs | Internal | Relationships, partnerships, engagement |

## License

Confidential — Advocate Health Enterprise Use Only

---

Built with the Rewire 2030 strategic framework in mind.
