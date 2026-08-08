# DealPilot AI — Wholesale Real Estate MVP

This is a polished, local-first wholesale real estate acquisition dashboard.

## What it does
- Lead database stored in browser localStorage
- Lead scoring
- Deal analyzer / estimated MAO
- Seller conversation generator
- Follow-up tracker
- Cash buyer list
- Dashboard KPIs
- Responsive mobile/desktop UI

## Fastest way to use it
1. Open `index.html` in a browser.
2. Add your first lead.
3. Use Deal Analyzer to screen the deal.
4. Use the generated seller messaging.
5. Use Follow-ups to manage the pipeline.

## Put it online
The easiest option is Vercel:
1. Create a free Vercel account.
2. Create a new project and upload/deploy this folder.
3. The site will receive a public URL.
You can also deploy the `index.html` file through other static hosting providers.

## Important
This MVP intentionally does NOT scrape property records, send unsolicited SMS/calls, or automatically make legally binding offers. Those functions require third-party data/communications services and careful compliance with applicable laws and platform rules.

For production AI:
- Put your AI API key on a server, never inside browser JavaScript.
- Add authentication and a server-side database.
- Add compliant property-data and messaging providers.
- Add audit logs and human approval before binding offers.

## Formula
Estimated MAO = ARV × (1 - investor margin) - repairs - holding/closing - desired wholesale fee

Treat the output as a screening estimate, not an appraisal or guaranteed offer.
