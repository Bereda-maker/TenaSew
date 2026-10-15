# Architecture notes

The MVP uses Next.js App Router with feature-oriented routes and a provider-neutral AI boundary. Public education works without AI. The current browser interactions demonstrate the intended flows while authentication and persistence are represented by versioned SQL and documented environment contracts; connect a managed auth/database provider before production user data is collected.

Sensitive operations must be server-authorized: role claims are checked server-side, resource queries expose `published` content publicly, habit queries require ownership, and admin actions write minimum-necessary audit records. AI calls belong in route handlers or server actions, with input validation, rate limiting, output validation, and a safe fallback when the provider is unavailable.
