# Codemark — Frontend

React frontend for the Codemark AI code review assistant. Users submit code through an in-browser editor and get back an AI-generated review — a quality score, a list of flagged issues, and suggested fixes.

## Tech Stack

- **React 18** (functional components, hooks)
- **Vite** — build tool and dev server
- **React Router v6** — routing and protected routes
- **Axios** — API communication
- **Monaco Editor** — the code editor that powers VS Code, used for code input and read-only display
- **CSS Modules** — component-scoped styling

## Features

- Signup / login with JWT stored in session
- Protected routes — redirects to login if not authenticated
- Code submission via the Monaco Editor, or by uploading a file directly
- Review dashboard with paginated history
- Review detail view — original code alongside severity-tagged issues and suggested fixes


## Project Structure

src/
context/ → Auth state (JWT, user)
services/ → API calls (single Axios instance)
components/ → Shared components (TopNav, ScoreStamp, ProtectedRoute)
pages/ → Login, Signup, Dashboard, NewReview, ReviewDetail


## Setup

```bash
npm install
```

Create a `.env` file in the root:

VITE_API_BASE_URL=http://localhost:5000


For the deployed backend, use its live URL instead.

Run in development:

```bash
npm run dev
```

App runs at `http://localhost:5173`.

## Build for Production

```bash
npm run build
```

## API Contract

Expects a backend exposing:

POST /api/auth/signup { name, email, password } → { token, user }
POST /api/auth/login { email, password } → { token, user }
POST /api/reviews { code, language } → { id, language, score, issues, createdAt }
GET /api/reviews → { reviews, totalPages, currentPage }
GET /api/reviews/:id → full review object
DELETE /api/reviews/:id → { message }


`issues` is an array of `{ severity: "critical" | "warning" | "minor", description, suggestedFix }`.

## Deployment

Deployed on Vercel. `VITE_API_BASE_URL` is set in the Vercel project's environment variables, pointing to the deployed backend.