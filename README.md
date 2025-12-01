# User Registration — Fullstack Demo

This workspace contains a simple User Registration system:

- `backend/` — Express + Mongoose API handling registration (`POST /user/register`).
- `frontend/` — Vite + React app with Tailwind, React Hook Form, and React Query.

Run locally

1. Start MongoDB (local or set `MONGO_URI` to a cloud DB).

2. Backend

```powershell
cd backend
npm install
# create .env from .env.example and set MONGO_URI
npm run dev
```

3. Frontend

```powershell
cd frontend
npm install
# optionally set VITE_API_BASE in .env
npm run dev
```

Deployment tips

- Backend: deploy to Render, Heroku, or Railway; set `MONGO_URI` env var and `CLIENT_ORIGIN`.
- Frontend: deploy to Vercel or Netlify; set `VITE_API_BASE` to the backend URL.

What I implemented

- Backend: `/user/register` with validation, existing email check, bcrypt password hashing, error handling, CORS.
- Frontend: pages for Home, Login (UI only), and Sign Up with form validation and API integration using fetch + React Query.

If you want, I can:

- Add login logic and JWTs.
- Add tests or Dockerfiles.
- Deploy the apps to a public host (I can provide deployment steps or attempt deployment if you provide credentials or authorize a provider).
