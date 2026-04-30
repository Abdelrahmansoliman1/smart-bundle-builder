# Smart Bundle Builder

A responsive PC Builder application built with React, TypeScript, TailwindCSS, Ant Design, and json-server.

Users can:
- Select compatible PC components
- Track total budget
- Undo/Redo build changes
- Save draft builds using a mock REST API
- Use the app on desktop and mobile devices

---

# Tech Stack

Frontend:
- React
- TypeScript
- Vite
- TailwindCSS
- Ant Design

Mock Backend:
- json-server

Containerization:
- Docker
- Docker Compose

---

# Features

- Component compatibility validation
- Budget limit validation
- Undo / Redo history
- Responsive UI
- Sticky desktop summary panel
- Mobile summary drawer
- Dark mode
- Mock backend persistence using json-server
- Dockerized full-stack setup

---

# Project Structure

```bash
src/
  components/
  context/
  theme/
  App.tsx

backend/
  db.json

Dockerfile
docker-compose.yml
README.md
```

---

# How To Run The Project

## Option 1 — Run With Docker (Recommended)

### Requirements
- Docker Desktop installed

### Run

```bash
docker compose up --build
```

Frontend:
```bash
http://localhost:5173
```

Mock API:
```bash
http://localhost:3001
```

### Stop Containers

```bash
docker compose down
```

---

# Option 2 — Run Locally

## Requirements

- Node.js v24.15.0
- npm

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Start Frontend

```bash
npm run dev
```

Frontend runs on:
```bash
http://localhost:5173
```

---

## 3. Start Mock Backend

Open another terminal:

```bash
npx json-server backend/db.json --port 3001
```

Backend runs on:
```bash
http://localhost:3001
```

---

# Undo / Redo Architecture

The Undo/Redo system is implemented using a history-based state management approach.

## Core Idea

Instead of storing only the current build state, the application stores:

```ts
history: State[]
index: number
```

Example:

```ts
[
  { selected: {} },
  { selected: { CPU: ... } },
  { selected: { CPU: ..., GPU: ... } }
]
```

The `index` points to the current active state.

---

## Selecting Items

When a user selects a component:

1. A new state is created
2. Future history is removed
3. The new state is pushed into history
4. Index moves forward

Example:

```ts
const newHistory = history.slice(0, index + 1);
newHistory.push({ selected: newSelected });

setHistory(newHistory);
setIndex(index + 1);
```

---

## Undo Logic

Undo simply moves the index backward:

```ts
setIndex(prev => prev - 1);
```

---

## Redo Logic

Redo moves the index forward:

```ts
setIndex(prev => prev + 1);
```

---

## Why This Approach?

Advantages:
- Simple and predictable
- Easy to debug
- Efficient for small/medium applications
- No external state library needed

Tradeoffs:
- Large histories can increase memory usage
- Entire state snapshots are stored

For this project size, this approach is ideal.

---

# Mock Backend Persistence

The project uses `json-server` to simulate a REST API.

Endpoints:

```bash
GET  /items
GET  /build
PUT  /build
```

The user's draft build is automatically saved whenever changes occur.

---

# Responsive Design

Desktop:
- Sticky summary sidebar

Mobile:
- Bottom floating summary bar
- Summary drawer

---

# Special Notes

- The project uses TypeScript strict typing.
- Compatibility is validated before selecting items.
- Budget overflow selections are blocked.
- Ant Design is used for notifications and UI components.
- TailwindCSS handles layout and responsive styling.
- The app is fully functional without a real backend.

---

# Future Improvements

Possible future enhancements:
- Authentication
- Real database backend
- Multiple saved builds
- Performance optimizations
- Search and filtering
- Product images
- Unit/integration testing

---


# Author

Abdelrahman Soliman