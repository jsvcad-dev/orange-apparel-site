# Orange Apparel — Storefront

The custom website for Orange Apparel. Products, inventory, checkout and fulfillment stay in
Fourthwall; this site is the front window. Built on Fourthwall's official Next.js storefront
template ([FourthwallHQ/vercel-commerce](https://github.com/FourthwallHQ/vercel-commerce)).

## What updates automatically

- **Products, prices, sizes, photos and descriptions** come straight from your Fourthwall dashboard.
  Edit them there; the site picks up changes within an hour (instantly if the webhook below is set up).
- **Collections** (Men's, Women's, Kids) appear in the menu automatically, and empty ones are hidden.
- **Help pages** (Contact, Returns & FAQ, Privacy, Terms) come from your Fourthwall shop pages.

## What lives in this code

- **Copy and links** (tagline, intro, announcement bar, the Serendipity feature, Instagram):
  `lib/brand.ts`
- **Hero image, feature photo, logos:** `public/brand/`
- **Social share image:** `app/opengraph-image.jpg`
- **Colors and fonts:** `tailwind.config.js`

## Deploying (Vercel)

1. On vercel.com, **Add New → Project**, import `jsvcad-dev/orange-apparel-site`.
2. Add the environment variables listed in `.env.example`.
3. Click **Deploy**. You'll get a `*.vercel.app` preview address to test with.

## Connecting your domain (only after testing the preview)

1. **Fourthwall first:** in Fourthwall, connect a checkout subdomain such as
   `checkout.orange-apparel.store` so checkout keeps working once the main domain moves.
   Then set `NEXT_PUBLIC_FW_CHECKOUT` to that address.
2. **Vercel:** Project → Settings → Domains → add `orange-apparel.store`. Vercel shows the DNS
   records to create.
3. **IONOS:** Domains & SSL → your domain → DNS → add the records Vercel showed you.
4. Update `NEXT_PUBLIC_VERCEL_URL` to `orange-apparel.store` and redeploy.

## Instant product updates (optional)

Set `FOURTHWALL_WEBHOOK_SECRET` on your host, then in Fourthwall add a webhook to
`https://orange-apparel.store/api/webhooks/fourthwall` for `PRODUCT_CREATED`, `PRODUCT_UPDATED`
and `COLLECTION_UPDATED`.

## Local development

```bash
pnpm install
cp .env.example .env.local   # then fill in your token
pnpm dev                     # http://localhost:3000
```
