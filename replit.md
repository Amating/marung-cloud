# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### marung-cloud (/)
Full professional landing page for Marung Cloud — Marung Sebaka Technologies Pty Ltd.
- Single-page React + Vite app (no backend)
- Audience: investors + unbanked ordinary people (dual-audience)
- Sections: Hero, The Problem, Infrastructure/SADC table, Strategic Pillars, Traction/Growth, Partners, Launch Timeline, CTAs
- Colors: Deep forest green + warm amber/gold — African identity palette
- Typography: Plus Jakarta Sans body, Clash Display headings
- Animations: framer-motion scroll-triggered reveals
- Key facts: R10/month flat fee, 11M unbanked, R3M pre-seed, Oct 2026 launch, Nov 20 cross-border live
- Pitch deck at `/pitch-pdf` (8 slides, print-ready, "Download PDF" button)

### marung-wallet (/marung-wallet/)
Full Expo React Native mobile wallet app for Marung Sebaka Technologies.
- **Frontend-only** (AsyncStorage for persistence — no backend)
- Brand: Deep forest green #051A12, gold #D4A017
- Onboarding flow: Welcome → Phone entry (+27 prefix) → Visa/Mastercard card selection → Success with card preview
- Tabs: Home, Pay (NFC tap-to-pay simulation), History, Profile
- Receive Cash Send modal screen (simulates incoming bank cash send)
- VirtualCard component: flippable (shows CVV on back), gold chip, animated
- TransactionItem component: color-coded receive/pay rows
- WalletContext: balance, transactions, user profile — persisted via AsyncStorage
- App icon: AI-generated Marung "M" on forest green background
- Splash: #051A12 background
- Registration: Marung Sebaka Technologies (Reg. 2026/221199/07)

## Brand / Compliance Notes
- Never mention: Nedbank, Standard Bank, CloudZA (NDA)
- Sponsor bank = "Marung Sponsor Bank" or "Tier 1 sponsor bank (early-stage engagement)"
- AWS Partner (not named)
- SARB Draft Exemption compliance referenced in Profile screen

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
