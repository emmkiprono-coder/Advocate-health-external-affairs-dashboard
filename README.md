# Advocate Health · Enterprise External Affairs Dashboard

A comprehensive enterprise External Affairs dashboard for Advocate Health (69 hospitals, 6 states, 160,000+ teammates, $38B revenue).

## Features

- **7 Dashboard Tabs** with drill-down dialogs and data source attribution
- **🤖 AI Research Hub** with live web search via Claude Sonnet API
- **12 Pre-built Research Briefs** for healthcare policy topics
- **Custom Research Queries** for any policy, regulatory, or legislative question

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Recharts · Anthropic API

## Getting Started

```bash
pnpm install
pnpm dev
```

## Deploy to Vercel

```bash
pnpm build
```

Or connect your GitHub repo to Vercel for automatic deployments.

## Project Structure

```
src/
├── App.tsx           # Main dashboard (7 tabs + Research Hub)
├── data.ts           # Enterprise data with source attribution
├── ResearchHub.tsx   # AI-powered research component
├── react-augment.d.ts # React 19 type fixes
├── components/ui/    # shadcn/ui components
└── lib/              # Utilities
```

---
Confidential · Advocate Health · Rewire 2030
