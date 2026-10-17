# United Open Scout Group — Website & CMS

Public website and (upcoming) member dashboard for United Open Scout Group.

Built with Next.js, TypeScript and Tailwind CSS. Hosted on Vercel.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

- `src/app/(site)` — public website pages
- `src/components/site` — public website sections and layout
- `src/content/site.ts` — website text and data (moves to the CMS later)
- `public/images` — photos and logo
- `Design/` — Figma exports used as the design reference

## Roadmap

1. ✅ Public home page
2. Database, login and member roles, dashboard
3. Letter Builder with PDF export
4. CMS for announcements, gallery and site content
