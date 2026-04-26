# Docker setup (Re4u – PostgreSQL for blog)

Same pattern as the reference blog: **one Postgres service**, single database `blog` with user `blog`. No init scripts.

## Prerequisites

- Docker and Docker Compose (v2+)
- `.env` with `DB_PASSWORD` (must match the password in `DATABASE_URL`)

## Quick start

1. **Copy env:**

   ```bash
   cp .env.example .env
   ```

   Defaults: `DB_USER=blog`, `DB_NAME=blog`, `DB_PASSWORD=blog`. Set `DATABASE_URL=postgresql://blog:blog@localhost:5432/blog` (same credentials).

2. **Start full local stack (DB + web + Mailpit):**

   ```bash
   docker compose up -d
   ```

3. **Create schema and seed blog:**

   ```bash
   npx prisma db push
   npm run seed:blog
   ```

4. **Run the app:**

   ```bash
   npm install
   npm run dev
   ```

   Open **http://localhost:3000** and **http://localhost:3000/blog**.

## Book Now email via Docker (recommended for local)

Use Mailpit as a local SMTP sink so Book Now modal emails are captured safely in Docker.

1. Mailpit starts automatically with `docker compose up -d`.
   If app runs in Docker, `docker-compose.yml` defaults SMTP host to `mailpit` for the `web` service.

2. Add these vars in `.env`:

   ```bash
   BOOKNOW_SMTP_HOST=localhost
   BOOKNOW_SMTP_PORT=1025
   BOOKNOW_SMTP_SECURE=false
   BOOKNOW_SMTP_FROM=no-reply@local.re4u
   BOOKNOW_SMTP_TO=ops@local.re4u
   ```

   Optional auth vars (usually not needed for Mailpit):
   - `BOOKNOW_SMTP_USER`
   - `BOOKNOW_SMTP_PASS`

3. Open Mailpit inbox UI:
   - [http://localhost:8025](http://localhost:8025)

Notes:
- The app posts modal data to `/api/book-now` by default.
- If `NEXT_PUBLIC_API_URL` is set, modal submissions go to `${NEXT_PUBLIC_API_URL}/contact` instead.

## Env vars

| Var | Default | Description |
|-----|---------|-------------|
| `DB_USER` | `blog` | Postgres user |
| `DB_PASSWORD` | (required) | Postgres password – set in `.env` |
| `DB_NAME` | `blog` | Postgres database name |
| `DB_PORT` | `5432` | Port on host |
| `DATABASE_URL` | — | Prisma connection string; use same user/password/db as above |

## Volumes

- **`re4u_db_data`** – Postgres data (survives `docker compose down`)

## Commands

```bash
docker compose logs -f db
docker compose restart db
docker compose down
docker compose down -v   # remove data
```

## Troubleshooting

- **"Set DB_PASSWORD in .env"** – Add `DB_PASSWORD=blog` (or your password) to `.env`.
- **Blog: "relation Post does not exist"** – Run `npx prisma db push` then `npm run seed:blog`.
- **Blog: connection refused** – Start Postgres with `docker compose up -d` and ensure `DATABASE_URL` uses `localhost:5432` (or your `DB_PORT`).
- **Blog shows "No posts yet"** – Run `npm run seed:blog` after `npx prisma db push`.
