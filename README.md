# Daric website

A single-page React and Vite landing page for Daric.

## Configure links and releases

Edit `src/config.js`:

- Set each platform's `href` and `active: true` when a release is available. Inactive platforms show “Coming soon”.
- Set each social destination's `href` to the official Nostr, X, Telegram, or email address. Blank destinations remain visible but inactive until configured.
- Set `donationAddresses.bitcoin` and `donationAddresses.lightning` to enable the Donate address rows and copy buttons.
- The investment contact is `investmentEmail` (`info@daric.digital`).

## Local development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
```

## Docker

```sh
docker compose up --build
```

The site is available at `http://localhost:8080`.
