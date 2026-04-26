# VPS Deploy (Ubuntu 24.04) — Docker + Nginx

## 1) Prereqs (run on the server)

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin
sudo systemctl enable --now docker
```

## 2) Upload project

Copy the project to the server (e.g. /opt/re4u):

```bash
sudo mkdir -p /opt/re4u
sudo chown $USER:$USER /opt/re4u
# upload via scp/rsync, then:
cd /opt/re4u
```

## 3) Configure env

```bash
cp .env.example .env
nano .env
```

Set:
- `NEXTAUTH_URL` to `http://62.72.56.143` or your domain
- `NEXTAUTH_SECRET` to a strong secret
- `DB_PASSWORD` strong
- update `DATABASE_URL` to match the DB password
- configure Book Now SMTP:
  - `BOOKNOW_SMTP_HOST`
  - `BOOKNOW_SMTP_PORT`
  - `BOOKNOW_SMTP_SECURE`
  - `BOOKNOW_SMTP_USER` (optional if provider allows no-auth relay)
  - `BOOKNOW_SMTP_PASS` (optional if provider allows no-auth relay)
  - `BOOKNOW_SMTP_FROM`
  - `BOOKNOW_SMTP_TO` (comma-separated recipients)

For Gmail SMTP use:
- `BOOKNOW_SMTP_HOST=smtp.gmail.com`
- `BOOKNOW_SMTP_PORT=587`
- `BOOKNOW_SMTP_SECURE=false`
- `BOOKNOW_SMTP_USER=<gmail>`
- `BOOKNOW_SMTP_PASS=<gmail app password>`

## 4) Build and run

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

## 5) Seed (optional)

This runs in a one-off container with dev deps:

```bash
docker compose -f docker-compose.prod.yml --profile seed run --rm seed
```

## 6) Verify

- App: `http://62.72.56.143/`

## 7) Useful commands

```bash
# logs
sudo docker logs -f re4u-web
sudo docker logs -f re4u-db
sudo docker logs -f re4u-nginx

# stop
sudo docker compose -f docker-compose.prod.yml down

# restart
sudo docker compose -f docker-compose.prod.yml restart
```
