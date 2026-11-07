# Insure Secure Financial Services website

A static marketing website for Insure Secure, Jalandhar, covering insurance and mutual fund services. It has no backend. Enquiries reach the client through WhatsApp and phone.

Built with Next.js (static export), TypeScript, Tailwind CSS and Motion.

## Commands

```bash
npm install
npm run dev        # local development at http://localhost:3000
npm run build      # creates the deployable site in out/
npm run start      # serves out/ locally at http://localhost:3000
npm test           # unit tests
npm run test:e2e   # browser tests (run npm run build first)
npm run lint
npm run typecheck
```

Browser tests need Chromium once: `npx playwright install chromium`.

## Updating business details

Edit `src/content/site.ts`. It holds the phone number, email, address, insurance and investment registrations, advisor profile, testimonials and insurers.

- **Regulatory details:** licence and registration values stay hidden on the site while they are null, and appear in the footer and on the disclosures page once filled in.
- **Investment registrations:** setting `investments.amfiArn` or `investments.sebiRiaNumber` adds them to the footer and disclosures page. Setting `sebiRiaNumber` describes the role as SEBI Registered Investment Adviser.
- **Testimonials and insurers:** these sections stay hidden until entries are added. Add genuine, permitted content only.
- **Email, hours and social links:** these appear only once they are filled in.
- **Free consultation:** the site does not claim this by default. Set `freeConsultation` to true once the client confirms it, and the contact section will say so.

## Updating content

| Content | Location |
|---|---|
| Product list and search words | `src/content/catalog.ts` |
| Product page text | `src/content/products/` |
| Investment services and page text | `src/content/investments.ts`, `src/content/investment-details.ts` |
| Claim steps and checklists | `src/content/claims.ts` |
| Guides | `src/content/guides.ts` |
| Home page selector | `src/content/hero.ts` |
| Calculator and coverage check logic | `src/lib/calculators.ts` |
| All WhatsApp messages | `src/lib/whatsapp.ts` |

## Images

`node scripts/prepare-assets.mjs` regenerates logo variants, the social image and optimised photos. Add `--logos-only` to skip downloading photos. Sources and licenses are listed in `IMAGE-CREDITS.md`.

## Deploying

Run `npm run build` with the live domain set, then upload the `out/` folder to any static host, such as Netlify, Vercel, Cloudflare Pages or shared hosting.

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

Or set `url` in `src/content/site.ts`. The domain is used for the sitemap, canonical links and search data.

## Before launch

1. Confirm the exact registered business name.
2. Set the live domain.
3. Have the client confirm the claim support and policy review wording matches the service offered.
4. Have the content, disclaimers and legal pages reviewed by the client's insurer or a compliance adviser.
5. Set up WhatsApp Business on the client's number.
