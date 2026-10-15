# TenaSew deployment

## Production database

The application reads `DATABASE_URL` only in server-side modules. Create PostgreSQL in Render or use an equivalent managed provider, then apply `db/001_initial.sql` once with the provider's external connection string. For the Render service, use its internal connection string as the runtime `DATABASE_URL`.

```bash
export DATABASE_URL='postgresql://...'
psql "$DATABASE_URL" -f db/001_initial.sql
psql "$DATABASE_URL" -c "select 1"
```

The migration creates profiles, preferences, content, habits, completions, feedback, audit logs, `auth_users`, and `sessions`. Passwords are scrypt-hashed by the server and session cookies are HTTP-only, Secure, SameSite=None for embedded HTTPS previews.

## Render

The `tenasew` Render web service deploys from `main` with `npm ci && npm run build` and `npm start`. Configure these values in the Render Environment page:

- `NEXT_PUBLIC_APP_URL=https://tenasew.onrender.com`
- `DATABASE_URL=<Render internal PostgreSQL URL>`
- `AI_PROVIDER`, `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL` when an AI provider is provisioned
- `ADMIN_EMAILS` only if used by later role bootstrap tooling

Check `https://tenasew.onrender.com/api/health`; it should return `{"ok":true,"database":"connected"}` after the migration and env var are correct.

## Vercel

When Vercel access is available, configure the same app variables. Use a database endpoint reachable from Vercel; a Render internal hostname is only for Render services. Set `NEXT_PUBLIC_APP_URL` to the Vercel production URL. Use separate preview database credentials where possible.

## Release checks

Run `npm run typecheck`, `npm test`, and `npm run build`. Then verify `/api/health`, registration, login, onboarding preference save, habit creation, habit completion, and unauthorized `/admin` access. Review rate limits, email verification, password recovery, CSRF strategy, database backups, and legal/safety copy before public launch.
