# ⏳ API Time Machine

> The tool you probably need. An API time machine for testing, recording, and replaying your requests.

Ever shipped a bug you couldn't reproduce? Ever said *"it worked on my machine"*?  
API Time Machine records every request your app makes, lets you replay them in order, and shows you exactly what happened — method, headers, body, response, latency. All of it.

---

## What it does

- **Record** — point your requests through the proxy and everything gets captured automatically
- **Replay** — re-fire an entire session at 0.5x, 1x, 2x, or 5x speed
- **Inspect** — click any request to see full headers, body, and response
- **Filter** — search by URL, method, or status code
- **Export** — download your session as ready-to-run `curl` commands
- **Share** — every session has a unique ID you can reference or share with teammates

---

## Stack

| Layer | Tech |
|---|---|
| Backend | Go + net/http |
| Database | PostgreSQL |
| Frontend | React + Vite + Tailwind CSS |

---

## Getting started locally

### Requirements

- Go 1.24+
- Node.js + pnpm
- PostgreSQL (local or any hosted provider)

### Backend
```bash
cd server
cp .env.example .env
# Fill in your DATABASE_URL in .env
go run cmd/api/main.go
```

### Frontend
```bash
cd web
pnpm install
cp .env.example .env
# Fill in your API URL in .env
pnpm dev
```

---

## How to use it

1. Create a session with a name and target base URL
2. Copy the proxy URL
3. Send your requests through the proxy instead of directly to your API
4. Watch them appear in the timeline in real time
5. Click any request to inspect it
6. Hit Replay to re-fire the whole session

---

## Why I built this

Debugging API issues is painful. Logs are scattered, curl commands get lost, and reproducing bugs in the exact order they happened is nearly impossible.

API Time Machine gives you a DVR for your API traffic. Record once, replay forever.

---

## Environment variables

### Backend (`server/.env`)
