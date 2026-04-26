# Lumen Press (Next.js + Prisma + shadcn/ui)

Modern editorial site with a blog powered by Prisma and PostgreSQL. No Directus.

## Requirements

- Node.js 20.9+ (Next.js 16 requirement)
- Docker (optional, for local Postgres)

## Quickstart

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Set in `.env` (see [docs/docker.md](docs/docker.md)): `DB_PASSWORD` and `DATABASE_URL` with the same credentials (e.g. `blog`/`blog`/`blog`).

3. Start Postgres (if using Docker):

```bash
docker compose up -d
```

4. Create blog schema and seed:

```bash
npm install
npx prisma db push
npm run seed:blog
```

5. Run the Next.js app:

```bash
npm run dev
```

Open **http://localhost:3000** and **http://localhost:3000/blog**.

## Book Now SMTP (Modal Email)

The `BookNowModal` now posts to `/api/book-now` by default and sends email using SMTP.

Set these variables in `.env` on the server:

```bash
BOOKNOW_SMTP_HOST=smtp.your-provider.com
BOOKNOW_SMTP_PORT=465
BOOKNOW_SMTP_SECURE=true
BOOKNOW_SMTP_USER=your-smtp-username
BOOKNOW_SMTP_PASS=your-smtp-password
BOOKNOW_SMTP_FROM=no-reply@yourdomain.com
BOOKNOW_SMTP_TO=ops@yourdomain.com,support@yourdomain.com
CONTACT_SMTP_TO=support@yourdomain.com
FREE_GUIDE_SMTP_TO=support@yourdomain.com
SUBSCRIBE_SMTP_TO=support@yourdomain.com
RESEARCH_STYLE_QUOTE_SMTP_TO=support@yourdomain.com
RESEARCH_PLANNING_SMTP_TO=support@yourdomain.com
REMINDS_SMTP_TO=support@yourdomain.com
```

Notes:
- `BOOKNOW_SMTP_TO` supports comma-separated recipient emails.
- `CONTACT_SMTP_TO` is optional. If omitted, contact-style requests go to `BOOKNOW_SMTP_TO`.
- `FREE_GUIDE_SMTP_TO` is optional. If omitted, free-guide requests go to `BOOKNOW_SMTP_TO`.
- `SUBSCRIBE_SMTP_TO` is optional. If omitted, footer subscriptions go to `BOOKNOW_SMTP_TO`.
- `RESEARCH_STYLE_QUOTE_SMTP_TO` is optional. If omitted, editing quote requests go to `BOOKNOW_SMTP_TO`.
- `RESEARCH_PLANNING_SMTP_TO` is optional. If omitted, research-planning enquiries go to `BOOKNOW_SMTP_TO`.
- `REMINDS_SMTP_TO` is optional. If omitted, ReMinds requests go to `BOOKNOW_SMTP_TO`.
- `BOOKNOW_SMTP_PORT=465` with `BOOKNOW_SMTP_SECURE=true` is the recommended setup.
- If `NEXT_PUBLIC_API_URL` is set, the modal continues using `${NEXT_PUBLIC_API_URL}/contact` instead of local SMTP route.

### Docker-first local setup (Mailpit)

```bash
docker compose --profile mail up -d mailpit
```

Local `.env` values:

```bash
BOOKNOW_SMTP_HOST=localhost
BOOKNOW_SMTP_PORT=1025
BOOKNOW_SMTP_SECURE=false
BOOKNOW_SMTP_FROM=no-reply@local.re4u
BOOKNOW_SMTP_TO=ops@local.re4u
```

View captured emails at [http://localhost:8025](http://localhost:8025).

## Blog (Prisma)

- **Schema:** `prisma/schema.prisma` – `Post` model (title, slug, content, excerpt, coverImage, published, authorName, etc.).
- **Data layer:** `src/lib/blog.ts` – `getLatestPosts`, `getPostsPage`, `getPostBySlug`.
- **Seed:** `npm run seed:blog` – creates 3 sample posts (idempotent).

Content is stored as HTML in `Post.content`. Cover images use full URLs in `Post.coverImage`.

## Deployment and server updates

- **First-time setup:** See [DEPLOY.md](DEPLOY.md) for clone, `.env`, and Docker.
- **After pushing new code:** On the server run:
  ```bash
  cd /opt/Re4uWebApp
  git pull
  docker compose -f docker-compose.prod.yml up -d --build
  ```
  See [DEPLOY.md](DEPLOY.md) for details.

## Scripts

- `npm run dev` – local dev
- `npm run build` – production build
- `npm run start` – production server
- `npm run seed:blog` – seed sample blog posts (idempotent)
