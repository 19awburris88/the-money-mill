# The Money Mill

E-commerce storefront for trading cards and collectibles — Pokémon, One Piece, Dragon Ball, and sports cards. Built with React + Vite and deployed on Netlify with Square as the payment processor.

## Tech Stack

- **Frontend:** React 19, React Router 7, Vite 8
- **Payments:** Square Web Payments SDK + Square Orders API
- **Backend:** Netlify Functions (serverless)
- **Deployment:** Netlify (CI/CD from `main`)

## Features

- Product catalog pulled from Square's catalog API
- Shopping cart with persistent state via React Context
- Square checkout with real payment processing
- Category filtering (Pokémon, One Piece, Dragon Ball, Sports)
- Preorder section that surfaces Square catalog preorder items automatically
- Scroll-triggered animations
- Responsive layout with mobile hamburger nav
- Order success page

## Local Development

**Prerequisites:** Node 18+, a Square developer account

1. Clone the repo and install dependencies:

   ```bash
   git clone git@github.com:19awburris88/the-money-mill.git
   cd the-money-mill
   npm install
   ```

2. Copy the env example and fill in your Square credentials:

   ```bash
   cp .env.example .env
   ```

   | Variable | Where to find it |
   |---|---|
   | `SQUARE_ACCESS_TOKEN` | [Square Developer Dashboard](https://developer.squareup.com) → your app → Credentials → Production |
   | `SQUARE_LOCATION_ID` | Square Dashboard → Account & Settings → Business locations |
   | `SQUARE_ENVIRONMENT` | `sandbox` for testing, `production` when live |

3. Run the dev server with Netlify Functions:

   ```bash
   npx netlify dev
   ```

   The site will be available at `http://localhost:8888`.

## Deployment

Pushes to `main` trigger an automatic Netlify build and deploy. Environment variables (`SQUARE_ACCESS_TOKEN`, `SQUARE_LOCATION_ID`) must be set in the Netlify dashboard under **Site configuration → Environment variables**.

## Project Structure

```
src/
  App.jsx          # Root layout, Navbar, Home page, routing
  Shop.jsx         # Product listing with category filter
  Cart.jsx         # Slide-out cart drawer
  CartContext.jsx  # Cart state (items, count, open/close)
  ProductCard.jsx  # Individual product tile
  OrderSuccess.jsx # Post-checkout confirmation page
netlify/
  functions/       # Serverless API routes (catalog, checkout)
```

## Social

- Instagram: [@themoneymill_](https://www.instagram.com/themoneymill_/)
- TikTok: [@uvtofficial](https://www.tiktok.com/@uvtofficial)
- Email: info@uvtofficial.com
