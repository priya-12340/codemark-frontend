# Codemark — Frontend

React + Vite frontend for the AI Code Review Assistant.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

App runs at `http://localhost:5173`.

## Backend connection

Set `VITE_API_BASE_URL` in `.env` to wherever your Spring Boot backend is running
(default assumed: `http://localhost:8080`). The frontend expects these endpoints:

- `POST /api/auth/signup` → `{ name, email, password }` → `{ token, user }`
- `POST /api/auth/login` → `{ email, password }` → `{ token, user }`
- `POST /api/reviews` → `{ code, language }` → `{ id, language, score, issues, createdAt }`
- `GET /api/reviews` → array of review summaries
- `GET /api/reviews/{id}` → full review detail

`issues` is an array of `{ severity: "critical" | "warning" | "minor", description, suggestedFix }`.

## Build for production

```bash
npm run build
```

Output goes to `dist/`, ready to deploy on Vercel, Netlify, or any static host.
