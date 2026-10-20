# TenaSew implementation plan

## Scope

Build a responsive, Ethiopia-rooted wellness MVP with public marketing pages, educational library, safe AI interaction, onboarding, habit dashboard, account screens, admin information architecture, and deployment documentation. The implementation prioritizes honest demo fallbacks and clear production seams rather than claiming unavailable auth or database integrations.

## Design

Three possible styles: **Warm editorial wellness** (0.07); **Quiet Ethiopian modernism** (0.06); **Soft utility journal** (0.05).

Chosen direction: **Warm editorial wellness**. Use forest green and warm cream as grounding colors, restrained gold and terracotta accents, editorial serif headlines paired with readable system sans, organic asymmetry, paper-like cards, and a simple `ts` mark suggesting a folded leaf/connection. Motion is subtle and respects reduced-motion preferences. Voice is clear, human, and non-performative: “A gentler way forward” and “Small steps. Real context. No shame.”

## Structure

- `app/`: App Router pages, public content routes, policies, dashboard, onboarding, and admin.
- `components/`: shared home composition.
- `lib/`: seed content and shared domain data.
- `db/`: normalized PostgreSQL starter migration.
- `public/`: route manifest.
- `docs/`: deployment and architecture notes.
- `tests/`: smoke checks for required files and route manifest.

## Personalized wellness flow

- `components/wellness-onboarding.tsx` owns the four-step, bilingual, optional questionnaire and keeps an unfinished draft in local storage so guests can explore without an account.
- `app/api/preferences/route.ts` reuses `user_preferences` for account-backed persistence, storing the optional personalization fields inside the existing JSON preference column rather than creating duplicate tables.
- `components/personalized-recommendations.tsx` ranks the existing reviewed resources by selected interests and goals; it never invents books or blocks general resources based on gender.

## Runtime and deployment

Use Next.js on Vercel with GitHub production-branch deploys. Render is configured as a Node web-service option and can host a managed Postgres database for `DATABASE_URL`. AI is provider-neutral through environment variables and remains optional.
