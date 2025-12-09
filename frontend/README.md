# Frontend - Sales UI

This folder contains the React + Vite frontend for the Sales Management UI.

Quick summary:
- Built with React + Vite
- Development server runs on port `5173`
- Production build is static files served by a small HTTP server in the supplied `Dockerfile`

Getting started (local development)

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run the development server

```bash
npm run dev
```

Open the app at `http://localhost:5173`.

Configuring the backend API

By default the app uses a simple constant in `src/App.jsx`:

```js
const API_BASE_URL = "http://localhost:5000"; // change to your backend URL
```

For a more flexible setup, replace this with a Vite environment variable. Example:

1. Create `.env` (or `.env.local`) in the project root with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

2. Update `src/App.jsx` to read `import.meta.env.VITE_API_BASE_URL` and fall back to a default.

Building for production

```bash
npm run build
# preview the production build locally
npm run preview
```

Docker (production image)

This repo includes a multi-stage `Dockerfile` that builds the app and serves the static files.

Build and run the frontend image locally:

```bash
# from project root
docker-compose up -d --build frontend

# or build and run directly in the frontend folder
docker build -t adarsh-frontend ./frontend
docker run -p 5173:5173 adarsh-frontend
```

The container serves the built app on port `5173` by default.

Healthcheck

The Dockerfile includes a simple healthcheck that requests `http://localhost:5173` inside the container.

Troubleshooting

- If the dev server won't start, make sure the port `5173` is free or change it in `vite.config.js`.
- If the frontend cannot reach the backend, confirm `API_BASE_URL` (or `VITE_API_BASE_URL`) points to the correct backend host:port. When running via Docker Compose, containers communicate using service names.
- To view logs when running via Docker Compose:

```bash
docker-compose logs -f frontend
```

Notes

- Do not commit secrets or `.env` files with credentials. Use `.env.example` to show intended keys without values.
- If you change the Dockerfile, rebuild the image with `docker-compose up -d --build frontend`.

If you'd like, I can update `src/App.jsx` to use `import.meta.env.VITE_API_BASE_URL` and add a `.env.example` entry for the frontend. Want me to do that now?
