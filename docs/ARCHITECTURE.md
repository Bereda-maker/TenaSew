# Architecture notes

TenaSew uses Next.js App Router with a server-only `pg` pool and feature-oriented route handlers. Public education works without a database. Authenticated operations use HTTP-only session cookies backed by the `sessions` table; passwords are stored as salted scrypt hashes. Server handlers obtain the current user from the session and enforce ownership for preferences and habits.

The API surface currently includes `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/auth/me`, `/api/preferences`, `/api/habits`, `/api/habits/:id/complete`, and `/api/health`. API errors are intentionally generic and database credentials never enter browser bundles.

Before launch, add rate limiting for auth and AI routes, verified email/recovery flows, CSRF protection appropriate to the chosen deployment model, session cleanup, database backups, provider-specific RLS or an equivalent access review, editorial mutation routes, and an admin bootstrap process. Do not treat a configured environment variable as proof that a security control is complete.
