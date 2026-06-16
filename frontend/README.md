# Frontend – HomeOffice Hub

Modern dark-themed e-commerce storefront built with **Next.js 16** and **Tailwind CSS**.

---

## Features

* Product listing with dynamic data fetched from the backend API
* Product detail page with:

  * Quantity selector
  * Image zoom
  * Back-to-shop navigation
* Slide-out shopping cart:

  * React Context state management
  * `localStorage` persistence
* About page with rotating gear animation (pure CSS)
* Contact page featuring team member cards with GitHub avatars
* Premium dark theme with subtle dot-grid background

---

## Tech Stack

### Framework

* Next.js 16
* React

### Styling

* Tailwind CSS
* Custom emerald-green accent palette

### State Management

* React Context API

### Development Tools

* Turbopack

---

## How to Run (Standalone)

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

API requests to `/api/*` are automatically proxied to the backend through the Next.js rewrite configuration.

## Project Structure

```text
frontend/
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout (providers, header, cart)
│   │   ├── page.js                # Home page (hero + product grid)
│   │   ├── about/page.js          # About page
│   │   ├── contact/page.js        # Contact page
│   │   ├── product/[id]/page.js   # Product detail page
│   │   ├── globals.css            # Global styles
│   │   └── context/
│   │       └── CartContext.js     # Cart state management
│   │
│   └── components/
│       ├── Header.js              # Navigation and cart toggle
│       ├── CartDrawer.js          # Slide-out shopping cart
│       └── ProductCard.js         # Product card component
│
├── public/                        # Static assets
├── next.config.mjs                # Next.js configuration + API proxy
├── tailwind.config.mjs            # Tailwind theme customization
└── package.json
```

## Styling

### Dark Mode

Dark mode is enforced globally using:

```html
<html class="dark">
```

### Theme

The application uses a custom emerald-green accent palette defined in `tailwind.config.mjs`.

Example color classes:

```text
accent-400
accent-500
accent-600
```

### Background

A subtle dot-grid background is applied globally through `src/app/globals.css`.

## API Integration

The frontend uses Next.js Rewrites to forward API requests to the backend service.

### Rewrite Configuration

```javascript
// next.config.mjs

async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://backend:5000/api/:path*',
    },
  ];
}
```

### Benefits

* No hardcoded backend URLs in components
* Works seamlessly with Docker Compose
* Portable to Kubernetes deployments
* Simplifies local development

All API calls use relative paths such as:

```javascript
fetch('/api/products')
```

## Environment Variables

| Variable            | Default  | Description                                |
| ------------------- | -------- | ------------------------------------------ |
| NEXT_PUBLIC_API_URL | Not used | Optional override for backend API endpoint |

## Docker

The current Dockerfile runs the Next.js development server directly.

```dockerfile
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
```

For a production deployment, you would build the app first and then serve the static output:

```bash
npm run build
npm run start
```

## Testing

Testing infrastructure has not yet been implemented.

## Related Documentation

* Root Project Documentation: `../README.md`
* Backend Documentation: `../backend/README.md`
* Kubernetes Documentation: `../kubernetes/README.md`
