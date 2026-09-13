# Bangladesh Gadget — website source

A static website (HTML/CSS/JS, no build step) for Bangladesh Gadget: a
US-to-Bangladesh electronics & fashion importer with order tracking,
weight-based shipping, and a checkout flow.

## What's included
- `index.html` — page shell (header, footer, chat widget, modals)
- `css/style.css` — all styling
- `js/data.js` — categories, product catalog, shipping rate
- `js/app.js` — routing, cart, checkout, accounts, order tracking, chat

Everything runs client-side. Accounts, cart, and orders are stored in the
visitor's own browser (`localStorage`) — there is no shared database yet.

## Publish it on GitHub Pages (free)
1. Create a new GitHub repository, e.g. `bangladesh-gadget`.
2. Upload these files (keep the folder structure: `index.html`, `css/`, `js/`)
   — either via the GitHub web UI ("Add file → Upload files") or with git:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/bangladesh-gadget.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like
   `https://<your-username>.github.io/bangladesh-gadget/` within a minute or two.

### Using your own domain (bangladeshgadget.com)
1. Buy the domain from any registrar.
2. In the repo, add a file named `CNAME` (no extension) containing just:
   `bangladeshgadget.com`
3. At your domain registrar, add these DNS records:
   - Four `A` records for `@` pointing to GitHub Pages' IPs:
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - A `CNAME` record for `www` pointing to `<your-username>.github.io`
4. Back in **Settings → Pages**, enter `bangladeshgadget.com` as the custom
   domain and enable "Enforce HTTPS" once it's available.

## What still needs a real backend (GitHub Pages is static-only)
This site gives you a complete, working front-end. To go live for real money
and real shipments you'll need a small backend (e.g. Firebase, Supabase, or a
Node/Express API) for:
- **Payments** — bKash, Nagad, Rocket, internet banking, and card payments
  all require a merchant account with a licensed payment aggregator (e.g.
  SSLCommerz, ShurjoPay, AamarPay) or direct bKash/Nagad merchant APIs. The
  checkout screen here is ready to submit to that API once you have one.
- **Real shipment tracking** — the tracking timeline is currently a
  realistic mock. To show live status you'd connect it to your courier's or
  freight forwarder's tracking API.
- **Shared accounts & order history** — right now accounts/orders live only
  in each visitor's browser. A backend database lets you see total
  registrations, manage orders centrally, and let customers log in from any
  device.

## Editing content
- Products, prices, and weights: edit the `PRODUCTS` array in `js/data.js`.
- Shipping rate per kg: `SHIPPING_RATE_PER_KG` / `MIN_SHIPPING` in `js/data.js`.
- Contact details, address, and About page copy: search for them directly in
  `js/app.js` (functions `pageContact`, `pageAbout`) and in `index.html`.
