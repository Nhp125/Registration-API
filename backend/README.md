# Backend — User Registration API

Simple Express + Mongoose backend for user registration.

Prerequisites:

- Node.js 16+
- MongoDB running (local or cloud)

Setup:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `CLIENT_ORIGIN`.
2. Install dependencies:

```powershell
cd backend; npm install
```

3. Run in development:

```powershell
npm run dev
```

API:

- POST `/user/register` — accepts `{ email, password }` and registers a new user.

Notes:

- Passwords are hashed with bcrypt.
- CORS is enabled for `CLIENT_ORIGIN`.
