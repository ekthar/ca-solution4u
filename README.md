# CA SOLUTION4U website

Marketing site for CA SOLUTION4U (tax, GST, accounting, project reports, financial advisory) and the
upcoming N1 ERP. Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion.

## Pages

| Route              | Purpose                                                     |
| ------------------ | ----------------------------------------------------------- |
| `/`                | Hero, philosophy, six service chapters, signature section, N1 teaser, principles, process, contact |
| `/services`        | All services                                                |
| `/services/[slug]` | One static page per service (six)                           |
| `/n1`              | N1 ERP reveal page, marked Coming Soon, with early-access form |
| `/about`           | About the firm                                              |
| `/contact`         | Call, WhatsApp, email and the enquiry form                  |
| `/privacy`, `/terms`, `/disclaimer` | Legal pages                                |

Generated: `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, Open Graph images, icons, and
`POST /api/contact`.

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm run build && npm run start
```

## Where things live

- `src/lib/constants.ts` - phone, WhatsApp, email and every link built from them.
- `src/data/services.ts` - service copy, lists, WhatsApp messages, SEO text, form options.
- `src/data/navigation.ts` - header, footer and legal links.

## Contact form

The form validates in the browser and again in `src/app/api/contact/route.ts` (shared rules in
`src/lib/contact.ts`). Spam protection: hidden honeypot field, minimum fill time, per-IP rate limit.

Email delivery uses the [Resend](https://resend.com) API. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`
and `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend). Until all three are set, the
API answers 503 and the form says plainly that nothing was sent, then offers to send the same
details by WhatsApp or email. It never shows a false success.

Set `NEXT_PUBLIC_SITE_URL` before a production build so canonical URLs, the sitemap and Open Graph
point at the real domain.
