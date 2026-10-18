# United Open Scout Group — Website & CMS

Public website and (upcoming) member dashboard for United Open Scout Group.

Built with Next.js, TypeScript and Tailwind CSS. Hosted on Vercel.

## Development

```bash
npm install
cp .env.example .env   # then pick a database (below)
npm run dev
```

Open http://localhost:3000. The dashboard is at `/dashboard`; on an empty database,
`/setup` creates the first admin account.

## Database

PostgreSQL via Prisma. Production uses Neon (connected in Vercel → Storage).

- **Local database:** `npm run db:dev` starts a local Postgres; keep it running and
  use the URLs from `.env.example`.
- **Schema changes:** edit `prisma/schema.prisma`, then `npm run db:migrate -- --name <change>`.
- **Deploys:** `npm run build` applies pending migrations automatically when
  `DATABASE_URL` is set (Vercel sets it once Neon is connected).

## Roles

Permissions live in `src/lib/permissions.ts`. Pages and server actions check them through
`requireUser()` / `requirePermission()` in `src/lib/auth/current-user.ts`.

## Project structure

- `src/app/(site)` — public website pages
- `src/components/site` — public website sections and layout
- `src/content/site.ts` — website text and data (moves to the CMS later)
- `public/images` — photos and logo
- `Design/` — Figma exports used as the design reference

## Roadmap

1. ✅ Public home page
2. ✅ Database, login and member roles, dashboard
3. Letter Builder with PDF export
4. CMS for announcements, gallery and site content
