# Backend - Sales API

This folder contains the Express.js backend for the Sales API used by the frontend application.

**Quick summary:**
- Node 18+ (project uses ESM modules)
- Connects to PostgreSQL (recommended: Neon) using `DATABASE_URL`
- Exposes a health endpoint at `/health`

**Contents:**
- `src/index.js` - app entrypoint
- `src/routes/` - Express routes
- `src/controllers/` - request handlers
- `src/services/` - business logic and SQL builders
- `src/utils/db.js` - database connection

**Run locally (development)**

1. Install dependencies

```bash
cd backend
npm install
```

2. Create a `.env` file in the project root (not committed) with your Neon/Postgres connection. Example:

```env
# Example (replace with your real Neon connection)
DATABASE_URL=postgresql://<user>:<password>@ep-xxx.neon.tech/<dbname>?sslmode=require

# App
NODE_ENV=development
PORT=5000
```

3. Start the server in development (uses `nodemon`):

```bash
npm run dev
```

The server listens on the port defined by `PORT` (default 5000). Health endpoint:

```
GET /health
```

**Run in Docker (recommended for consistent staging/CI)**

From project root (where `docker-compose.yml` lives):

```bash
docker-compose up -d --build backend
```

Or rebuild only backend image and start:

```bash
docker-compose build backend
docker-compose up -d backend
```

When using Docker Compose with a remote Neon database, ensure a root `.env` contains `DATABASE_URL` (the containers read env from the project root `.env`).

**Database connection**

The app reads `process.env.DATABASE_URL` (preferred). If you need to switch to separate `DB_HOST/DB_USER/...` variables, update `src/utils/db.js` accordingly.

**Logging & monitoring**

- Uses `winston` for structured logging (see `src/libs/logger.js`).
- Uses `morgan` for incoming HTTP request logging in development.

**Healthcheck**

The Docker Compose file includes a healthcheck that polls the `/health` endpoint. Make sure the endpoint responds `200` when the app is ready.

**Environment & security**

- Never commit `.env` with secrets. Use `.env.example` for placeholders.
- If credentials are accidentally pushed, rotate them immediately and purge history if needed.

**Troubleshooting**
- If the server fails to start, check `docker-compose logs backend` or local logs from `npm run dev`.
- If database connection fails, confirm `DATABASE_URL` is correct and reachable from your environment.
- If you recently rewrote Git history, teammates should re-clone the repo.

**Useful commands**

```bash
# Start backend locally
cd backend && npm run dev

# Build & run via docker-compose from repo root
docker-compose up -d --build backend

# View logs
docker-compose logs -f backend

# Check health locally
curl http://localhost:5000/health
```

If you want, I can add a short sample `docker-compose` snippet here or update `src/utils/db.js` to explicitly read `DATABASE_URL` — which would you like?

