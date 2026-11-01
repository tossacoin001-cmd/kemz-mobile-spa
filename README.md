# Kemz Mobile Spa — website

Static 5-page site for Kemz Mobile Spa Service (Lagos). No build step — Netlify serves the files as-is.

| Page | File |
|---|---|
| Home | `index.html` |
| Treatments & Prices | `treatments.html` |
| Occasions | `occasions.html` |
| Gallery | `gallery.html` |
| Book & FAQ | `book.html` |

## Common edits

**Prices, WhatsApp number, gallery photos** — open `assets/site.js` and edit the block at the top marked `EDIT YOUR BUSINESS DETAILS HERE`. Every page, price label and WhatsApp booking message updates from there.

**Phone number shown as text / call links** — search all `.html` files for `0814 387 0957` and `+2348143870957`.

**Photos** — replace files in `/images` with real photos using the same file names (JPG, roughly the same proportions).

**Styles** — `assets/site.css`.

## Deploy

Connected to Netlify via GitHub: every push to `main` redeploys automatically.
Build command: *(none)* · Publish directory: `.` (set in `netlify.toml`).

Booking form submissions are collected by Netlify Forms (Site → Forms) and also sent to WhatsApp.
