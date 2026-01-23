# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

File Hasher - A web application for computing cryptographic file hashes (MD5, SHA-1, SHA-256, SHA-512).

## Tech Stack

- **Frontend**: React 18, Mantine UI v7, React Router v7, Vite, TypeScript
- **Backend**: Flask 3.0, Flask-CORS, Python 3.11
- **Containerization**: Docker, docker-compose

## Commands

### Development (without Docker)

```bash
# Backend - Terminal 1
cd backend
pip install -r requirements.txt
python app.py

# Frontend - Terminal 2
cd frontend
npm install
npm run dev
```

### Production (with Docker)

```bash
docker-compose up --build
```

### Ports

- Frontend: http://localhost:3000 (Docker) or http://localhost:5173 (dev)
- Backend: http://localhost:5000

## Architecture

```
WorkShopClaude1/
├── backend/
│   ├── app.py              # Flask API with /api/status and /api/hash endpoints
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── main.tsx        # Entry point with MantineProvider + BrowserRouter
│   │   ├── App.tsx         # Route definitions
│   │   ├── components/
│   │   │   └── Layout.tsx  # AppShell with header navigation
│   │   └── pages/
│   │       ├── Home.tsx    # Landing page
│   │       ├── Upload.tsx  # Dropzone + algorithm selector
│   │       └── Status.tsx  # Backend health check
│   ├── Dockerfile
│   └── nginx.conf
└── docker-compose.yml
```

## API Endpoints

- `GET /api/status` - Health check, returns `{"status": "healthy", "message": "..."}`
- `POST /api/hash` - Compute file hash
  - Form data: `file` (file), `algorithm` (md5|sha1|sha256|sha512)
  - Returns: `{"filename": "...", "algorithm": "...", "hash": "...", "size": 123}`




# Security rules

- Never read the contents of a .env file, unless there is a skill to parse the fields. Warn the user of this.