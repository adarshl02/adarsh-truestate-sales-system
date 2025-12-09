# System Architecture

## Backend Architecture
The backend follows a layered architecture using Express.js. Routes receive requests, controllers validate input and forward it to services. Services build dynamic SQL queries for search, filtering, sorting, and pagination. PostgreSQL is used as the primary datastore hosted on Neon.

### Deployment & Docker
The backend is containerized with Docker and can be run locally using `docker-compose`. In this repository the `docker-compose.yml` defines services for the frontend and backend. When using a remote Neon database, the compose file does not include a local Postgres service — the backend uses the `DATABASE_URL` environment variable to connect to Neon.

Key points:
- The backend container exposes a `/health` endpoint used by the compose healthcheck.
- Environment variables (including `DATABASE_URL`) are provided via a root `.env` file and should not be checked into source control.
- Build and run with `docker-compose up -d --build` from the project root.

## Frontend Architecture
The frontend is built using React with a component-based structure. State is managed using React hooks. Data is fetched from the backend using query parameters for all search, filter, sort, and pagination operations.

## Data Flow
User interactions in the UI update query parameters. The frontend sends these parameters to the backend through a REST API. The backend processes the request using SQL queries and returns paginated results.

### Network & Ports
- Frontend default port (container): `5173` -> host `5173` (open in browser at `http://localhost:5173`).
- Backend default port (container): `5000` -> host `5000` (API endpoints and `/health`).

When containers are running via Docker Compose they communicate over an internal bridge network; the backend should connect to the database using the `DATABASE_URL` (hosted Neon) or an internal service name if using a local database container.

## Folder Structure
- backend/src/controllers – request handlers  
- backend/src/services – business logic  
- backend/src/routes – API routing  
- backend/src/utils – database connection  
- frontend/src/components – UI components  
- frontend/src/services – API communication  

## Module Responsibilities
- Controllers handle incoming HTTP requests.  
- Services process filtering, sorting, and pagination logic.  
- Database layer manages connection to PostgreSQL.  
- UI components manage user interaction and display.
