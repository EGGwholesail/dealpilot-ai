# DealPilot AI v4 — RentCast Connected

## What changed
- New green geometric DealPilot branding
- Main analyzer only requires a full property address; listing URL is optional
- Secure Vercel backend calls RentCast
- Pulls public-record property facts
- Pulls RentCast value estimate / ARV and five comparable properties
- Preliminary repair range based on age + square footage, clearly marked for verification
- Calculates target MAO
- Saves complete leads locally in the browser
- Seller Assistant for pasted seller messages

## Required Vercel environment variable
Create:
`RENTCAST_API_KEY` = your active RentCast API key

Enable it for Production, Preview, and Development if desired, then redeploy.

Never put the API key in index.html or commit it to GitHub.
