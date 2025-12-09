## Overview
A full-stack retail sales management system built to demonstrate search, multi-select filtering, sorting, and pagination on structured sales data using a production-grade architecture.

## Tech Stack
Frontend: React, Vite, Tailwind CSS  
Backend: Node.js, Express.js  
Database: PostgreSQL (Neon)  
Deployment: Vercel (Frontend), Render (Backend)

## Search Implementation Summary
Case-insensitive search is implemented on customer name and phone number using SQL LIKE queries. Search works in combination with filters, sorting, and pagination.

## Filter Implementation Summary
Multi-select filters are implemented for region, gender, product category, tags, and payment method. Range filters are supported for age and date. All filters are combinable and state is preserved across interactions.

## Sorting Implementation Summary
Sorting is supported on date (newest first), quantity, and customer name (A–Z). Sorting maintains the current filter and search state.

## Pagination Implementation Summary
Pagination is implemented with a fixed page size of 10 records per page. Next and previous navigation is supported with total pages calculated from the database.

## Setup Instructions
1. Clone the repository  
2. Install dependencies in backend and frontend  
3. Add Neon DATABASE_URL in backend `.env`  
4. Run backend using `npm run dev`  
5. Run frontend using `npm run dev`

**Docker / Docker Compose**

- **Prerequisites:** Install Docker Desktop and ensure it is running.
- **Project `.env`:** Create a `.env` file in the project root with your Neon connection string and any other env vars. Example:

	```env
	# Neon / PostgreSQL
	DATABASE_URL=postgresql://<user>:<password>@ep-xxx.neon.tech/<dbname>?sslmode=require

	# Backend
	NODE_ENV=production
	PORT=5000
	```

- **Build & start services (recommended):** from project root run:

	```bash
	docker-compose up -d --build
	```

- **Rebuild only frontend (when Dockerfile changed):**

	```bash
	docker-compose up -d --build frontend
	```

- **Start services in foreground (see build logs):**

	```bash
	docker-compose up
	```

- **Stop & remove containers:**

	```bash
	docker-compose down
	```

- **Stop, remove containers and volumes (destructive):**

	```bash
	docker-compose down -v
	```

- **View logs:**

	```bash
	docker-compose logs -f backend
	docker-compose logs -f frontend
	```

- **Check running containers and ports:**

	```bash
	docker-compose ps
	docker ps
	```

- **Rebuild and force recreate containers:**

	```bash
	docker-compose up -d --build --force-recreate
	```

- **Port mapping (defaults in this repo):**
	- Frontend: `5173` (mapped to container `5173`)
	- Backend: `5000` (mapped to container `5000`)

- **Healthchecks:** Both services include simple healthchecks in `docker-compose.yml`. The backend exposes `/health`.

- **Using a remote database (Neon):** If your data is hosted in Neon (remote Postgres), remove any local `postgres` service in `docker-compose.yml` and set `DATABASE_URL` in the root `.env`. The backend reads `DATABASE_URL` to connect.

- **Security:** Do not commit `.env` to git. Add it to `.gitignore`.

If you want, I can also add a short `.env.example` file (without secrets) and a line in `.gitignore` to ignore `.env`.
