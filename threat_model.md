# Threat Model

## Project Overview

This repository is a pnpm workspace with two production-relevant artifacts and several shared libraries:

- `artifacts/marung-cloud`: a React 19 + Vite landing page served as static files in production.
- `artifacts/api-server`: an Express 5 API service mounted at `/api`.
- `lib/api-spec`, `lib/api-zod`, `lib/api-client-react`, and `lib/db`: shared API/schema/client/database libraries.

Current production scope is narrow. The live API exposes only `/api/healthz`, and the live web artifact is a mostly static marketing site. `artifacts/mockup-sandbox` is a design-time component preview service under `/__mockup` with no production service definition and should normally be treated as dev-only.

Assumptions for future scans:

- Production runs with `NODE_ENV=production`.
- Replit deployment terminates TLS for public traffic.
- The mockup sandbox is not deployed to production unless deployment metadata changes.

## Assets

- **Deployment integrity** — the static web build, API bundle, and shared generated libraries must not be modified or influenced by untrusted input in a way that changes runtime behavior.
- **Application availability** — the public landing page and `/api/healthz` endpoint should remain available; the backend should not be trivially crashed by malformed requests or misconfiguration.
- **Environment secrets** — `DATABASE_URL`, future API keys, and any auth/session secrets must remain server-only.
- **Future authenticated/business data** — the repository already contains shared API client and database plumbing that may later carry tokens, user records, or business data; those surfaces should be re-reviewed when activated in production.

## Trust Boundaries

- **Browser to static site** — all browser input is untrusted; any client-side rendering of dynamic content must avoid XSS and injection sinks.
- **Browser to API (`/api`)** — requests crossing into `artifacts/api-server` are untrusted and require server-side validation, authorization, and safe error handling when more endpoints are added.
- **API to database** — `lib/db` holds direct database connectivity via `DATABASE_URL`; any future query surface would make injection and over-broad data access high-risk.
- **Production artifacts vs dev/design artifacts** — `artifacts/mockup-sandbox` and related preview machinery are out of production scope unless artifact routing or deployment metadata is changed to expose them publicly.

## Scan Anchors

- Production web entry point: `artifacts/marung-cloud/src/main.tsx`, routed from `artifacts/marung-cloud/.replit-artifact/artifact.toml`.
- Production API entry points: `artifacts/api-server/src/index.ts`, `artifacts/api-server/src/app.ts`, `artifacts/api-server/src/routes/**`.
- Highest-risk shared code if production expands: `lib/api-client-react/src/custom-fetch.ts`, `lib/db/src/index.ts`, `lib/api-spec/openapi.yaml`.
- Public surfaces today: `/` static site and `/api/healthz`.
- Dev-only area to usually ignore: `artifacts/mockup-sandbox/**` and its preview module loader, unless it gains a production service definition or production path routing.

## Threat Categories

### Tampering

The current production app accepts very little user input on the server, but the browser and API boundary are still untrusted. If future endpoints are added, request bodies, query parameters, headers, and database-bound values must be validated server-side and passed only into parameterized ORM/database APIs. Client-side form state on the landing page must not be mistaken for persisted or trusted business data.

### Information Disclosure

The main confidentiality risks in this repository are future secret exposure and accidental leakage through logs or client bundles. Secrets such as `DATABASE_URL` must remain server-only, and stack traces, raw database errors, or sensitive headers must not be reflected to clients or stored in logs. Shared frontend code must not embed server secrets or expose sensitive response bodies unnecessarily.

### Denial of Service

The current API is small, but Express request parsing and any future external/database calls still create an availability boundary. Public endpoints must avoid unbounded parsing, expensive unauthenticated operations, and crash-on-input behavior. As the API grows, rate limiting and timeouts should be reviewed on public endpoints and outbound calls.

### Elevation of Privilege

There are no active authenticated or admin routes in current production scope, so privilege escalation risk is currently latent rather than exposed. If authentication or role-based features are introduced, all protected API routes must enforce authorization server-side; generated client helpers or frontend routing must never be relied on as the security boundary.
