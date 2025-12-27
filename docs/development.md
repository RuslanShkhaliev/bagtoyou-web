# Project Overview

This project is an online marketplace (flea market) focused on fast creation and discovery of listings.

The application is frontend-only. There is no custom backend server.
All data, authentication, and storage are handled via Supabase.

---

## Tech Stack

### Frontend

- **Next.js** (App Router)
- **TypeScript** (mandatory)
- **Tanstack/react-query** (cache/api)
- **Tanstack/form** (forms)
- **zod** (validating)
- **Feature-Sliced Design (FSD)** architecture
- **Tailwind CSS v4** for styling
- **shadcn/ui** as the base UI library

> UI must be built on top of shadcn components only.

---

## Architecture Rules (FSD)

### Allowed layers:

1. `app`
2. `processes`
3. `widgets`
4. `features`
5. `entities`
6. `shared`

### Rules:

- No cross-layer violations
- UI layers must not access Supabase directly
- Business logic must not live in UI components
- `shared` contains no business logic

---

## Supabase Usage

- **PostgreSQL** — primary database
- **Supabase Auth** — authentication
- **Supabase Storage** — images and media

### Rules:

- No API keys exposed in UI logic
- All data access goes through typed Supabase clients

---

## Styling Rules

- Tailwind CSS v4 only
- No inline styles
- No custom design systems
- Tokens and variants must align with shadcn patterns

---

## Code Quality

- ESLint and Prettier must be respected
- Strict TypeScript
- No unused exports
- Predictable naming

---

## AI Usage (Cursor)

- Generate concrete, production-ready code
- Respect FSD boundaries
- Prefer composition over abstraction
- Avoid speculative architecture
