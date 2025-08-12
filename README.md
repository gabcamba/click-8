# 8-Card Click Tracker

A fullstack application that displays 8 cards, tracks clicks, and stores data to a PostgreSQL database.  
Built with **React + TypeScript** (frontend), **Node.js + Express + TypeScript** (backend), and **PostgreSQL** for storage.  
The app runs fully Dockerized — one command to spin up the entire stack.

---

## Features

- **2x4 Responsive Grid** – Displays eight cards, numbered 1–8.
- **Click Tracking**
  - Shows card number, total clicks, and timestamp of the first click.
  - First click timestamp is only registered once per card.
  - Click counts increment on every click.
  - Data is stored in PostgreSQL.
- **Sorting Options**
  - Sort by most → fewest clicks.
  - Sort by first → last clicked.
- **Reset Functionality**
  - Resets cards to original order (1–8).
  - Clears all click counts and timestamps.
  - Updates both UI and database.
- **Dockerized Setup** – Launch with `docker compose up`.

---

## Tech Stack

### Frontend

- React + TypeScript
- CSS Modules for styling

### Backend

- Node.js + Express + TypeScript
- PostgreSQL for storage

### DevOps

- Docker & Docker Compose

---

## Getting Started

### Prerequisites

- Docker & Docker Compose installed
- Git installed

### Clone Repository

```bash
git clone https://github.com/gabcamba/click-8.git
cd click-8
```

### Run the app

```bash
docker compose up
```

This will:

- Start the PostgreSQL database with seeded card data.

- Start the backend API server.

- Start the frontend React app.

Access
Frontend → http://localhost:5173

Backend API → http://localhost:5050

PostgreSQL → Host: localhost, Port: 5433 (mapped to container’s 5432)

---

## Project Structure

```
├── backend/           # Express + TypeScript API server
│   ├── src/
│   └── package.json
│   └── Dockerfile
├── frontend/          # React + TypeScript frontend
│   ├── src/
│   └── package.json
│   └── Dockerfile
├── db/                # Database init scripts
│   └── init.sql
├── docker-compose.yml
├── README.md
└── ...
```

## Database Schema

The PostgreSQL database contains a single table that tracks card data:

```sql
CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    clicks INT DEFAULT 0,
    first_clicked_at TIMESTAMP
);

-- Insert 8 cards with default values (clicks = 0, first_clicked_at = NULL)
INSERT INTO cards (clicks)
SELECT 0
FROM generate_series(1, 8);
```

-- Seed with 8 cards (IDs 1-8), all with 0 clicks
INSERT INTO cards (clicks)
SELECT 0
FROM generate_series(1, 8);

## API Endpoints

| Method | Endpoint               | Description                                       |
| ------ | ---------------------- | ------------------------------------------------- |
| GET    | `/api/cards`           | Fetch all cards with clicks & timestamps          |
| POST   | `/api/cards/:id/click` | Increment click count & set first click timestamp |
| POST   | `api/cards/reset`      | Reset all card data to initial state              |

## Notes

---

#### Familiar / Easy

- React + TypeScript component structure
- Basic Express API setup

#### New / Challenging

- Docker setup (I have little to no experience working with Docker, it was really fun trying to make it work :))
- Figuring out how to seed initial data

#### Design / Implementation Decisions

- Sorting: Done on backend to keep business logic centralized.

- First Click Timestamp: Stored as NULL until first click, updated only once.

- Reset: Backend handles DB reset, frontend triggers re-fetch.
