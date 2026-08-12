# CitrusV

Premium company website for CitrusV — websites, IT solutions, digital marketing, **Citrus AI**, **Citrus Playzone**, and 80+ free online tools.

## Stack

- **Next.js 15** (App Router) + **React** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion**

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Powers Citrus AI chat and AI tools |
| `OPENAI_BASE_URL` | Optional compatible API base URL |
| `NEXT_PUBLIC_GOOGLE_APPOINTMENTS_URL` | Google Calendar booking link (Google Meet) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact mailto address |

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve production build

## Site map

- `/` — Home
- `/about`, `/what-we-do`, `/partners`, `/careers`, `/contact`
- `/book` — Schedule a Google Meet call
- `/citrus-ai` — AI assistant
- `/playzone` — Browser games
- `/tools` — Tools hub (text, PDF, dev, calculators, and more)

## Company overview PDF

A branded PDF with full company, services, tools, and setup information:

```bash
python3 scripts/generate-company-pdf.py
```

Output: `CitrusV-Company-Overview.pdf` (project root).
