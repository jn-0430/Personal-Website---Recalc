# Josh Nogen - Private Portfolio

A responsive, password-protected portfolio shell for the Recalc Finance Accelerator application. This iteration establishes the visual system, access flow, chapter structure, interactions, and replaceable content architecture. Unfinished writing and media are intentionally labeled as placeholders.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and replace both sample values:

   ```env
   PORTFOLIO_PASSWORD=choose-a-temporary-local-password
   PORTFOLIO_SESSION_SECRET=use-a-long-random-string-of-at-least-32-characters
   ```

3. Start the development server with `npm run dev`.
4. Open `http://localhost:3000`. You will be redirected to `/login` until a valid session exists.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Authentication and private media

- Password verification happens only in the server route; the password is never bundled into client JavaScript.
- Successful access creates a signed, `HttpOnly`, `SameSite=Strict` cookie with a 12-hour lifetime.
- Middleware protects the portfolio, interior routes, API routes, and direct public-asset paths. Only the login endpoint and `robots.txt` remain public.
- Put approved private images, audio, and PDFs in `private-media/` (the directory is git-ignored). Serve them from `/api/private-media/<filename>` so the session is verified before bytes are returned.
- `robots.txt`, metadata, and response headers discourage indexing. Authentication remains the actual privacy boundary.

## Replacing content

All chapter copy, experience rows, track fields, dishes, and gallery labels live in `lib/portfolio-data.ts`. Components can receive authenticated media URLs from `/api/private-media/...` when files are ready. Sample-based tracks must receive an explicit rights and privacy review before deployment.
