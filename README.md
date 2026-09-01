# Nan Care — Next.js site

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

- `app/layout.js` — root layout, fonts, page metadata
- `app/page.js` — the homepage (client component: mobile nav + appointment form state)
- `app/globals.css` — all styling (plain CSS, no framework)
- `components/Logo.js` — reusable logo mark, used in the header (`size`, `showWordmark`, `dark` props)
- `public/favicon.svg` — same emblem as the logo, used as the site favicon

## Before going live

- Swap the placeholder doctors, phone numbers, and address in `app/page.js` for real ones.
- Connect the appointment form's `handleSubmit` (in `app/page.js`) to a real API route or booking service — it currently just shows a confirmation message.
- Point the `nan-care.com` domain at your deployment (Vercel is the simplest option for Next.js).
