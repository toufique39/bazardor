# BazarDor — বাজার দর

BazarDor is a responsive web application that helps users explore essential products and view their latest available prices across markets in Bangladesh.

**Live Website:** https://bazardor39.netlify.app/

## Technologies Used

- Next.js (App Router)
- React.js
- JavaScript
- Tailwind CSS
- MongoDB Atlas
- Better Auth
- Google OAuth
- GitHub OAuth
- Netlify
- External BazarDor API

## Features

1. **Responsive Design:** Optimized for mobile, tablet, and desktop screens.
2. **Product Price Overview:** Browse essential products and their available price information.
3. **Price Change Indicators:** Identify products with increasing or decreasing prices.
4. **Category Browsing:** Explore products by category and sort them by price.
5. **Product Details:** View product information and market-level prices.
6. **Authentication:** Register and sign in using email and password.
7. **Social Login:** Sign in using Google or GitHub.
8. **Protected Pages:** Require authentication to access protected product details and profile pages.
9. **Profile Management:** View profile information and update your name.
10. **Custom Error Page:** Display a helpful page for unavailable routes.

## Getting Started

### Prerequisites

- Node.js
- npm
- A MongoDB Atlas database
- Better Auth and OAuth credentials

### Installation

Clone the repository:

```bash
git clone https://github.com/toufique39/bazardor
cd bazardor
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file in the project root and configure the required environment variables:

```env
MONGODB_URI
MONGODB_DB=bazardor
BETTER_AUTH_SECRET
BETTER_AUTH_URL=http://localhost:10000

GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

Never commit `.env.local` or expose database credentials and secret keys.

### Run Locally

Start the development server:

```bash
npm run dev -- --port 10000
```

Open http://localhost:10000 in your browser.

### Build

```bash
npm run build
```

## Deployment

The application is deployed on Netlify.

**Production URL:** https://bazardor39.netlify.app/

Production environment variables and OAuth callback URLs must be configured for the deployed domain.

## Author
    Toufique Ahmed

