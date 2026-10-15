# TenaSew deployment

## Vercel

The GitHub repository is intended to be the production source for Vercel. Use the Next.js preset with `npm run build`. Configure `NEXT_PUBLIC_APP_URL` to the assigned production URL. Add `AI_PROVIDER`, `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`, `DATABASE_URL`, and `ADMIN_EMAILS` only when those services are provisioned. Never commit `.env` files.

## Render

Render can run the same repository as a Node web service with build command `npm ci && npm run build` and start command `npm start`. If a managed Postgres instance is used, set `DATABASE_URL` in the service environment. Region should be selected close to the intended users; Oregon is the default in the initial setup.

## Release checks

Run `npm run typecheck`, `npm test`, and `npm run build`. Review authentication, Row Level Security, cookie settings, rate limits, legal copy, safety escalation, and provider retention settings before collecting real user data.
