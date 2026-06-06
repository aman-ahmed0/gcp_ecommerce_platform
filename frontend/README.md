```markdown
# TechGear Hub - Frontend

React + Vite single-page application for the TechGear Hub e-commerce demo. Features multi-page navigation, responsive design, and client-side cart state.

## 🚀 Run Locally

```bash
npm install
cp .env.example .env
npm run dev
```

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8000` |

## 🏗️ Build & Preview

```bash
npm run build    # Production build → dist/
npm run preview  # Local preview of production build
```

## 🐳 Docker

```bash
# Build
docker build -t techgear-frontend .

# Run
docker run -p 80:80 techgear-frontend
```

## 📝 Development Notes
- Built with React 18 + Vite for fast HMR and optimized bundles
- Client-side navigation via state management (no external router dependency)
- Fetches data from `VITE_API_URL` (CORS enabled in FastAPI backend)
- Fully responsive layout using CSS Grid & Flexbox
```