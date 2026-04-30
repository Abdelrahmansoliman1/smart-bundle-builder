# Smart Bundle Builder

A responsive PC builder application built with:

- React
- TypeScript
- Tailwind CSS
- Ant Design
- Context API
- json-server
- Docker

---

# Features

- Component compatibility validation
- Budget management
- Undo / Redo system
- Mobile responsive UI
- Dark mode
- Persistent mock backend
- Docker support

---

# Tech Stack

- React
- TypeScript
- Tailwind CSS
- Ant Design
- Vite
- json-server
- Docker

---

# Project Structure

```txt
smart-bundle-builder/
│
├── backend/
│   └── db.json
│
├── src/
├── public/
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── README.md
```

---

# Run Locally

## 1. Clone repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-bundle-builder.git
```

## 2. Go to project folder

```bash
cd smart-bundle-builder
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start frontend

```bash
npm run dev
```

## 5. Start backend

Open another terminal:

```bash
npx json-server backend/db.json --port 3001
```

---

# Local URLs

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3001
```

---

# Run With Docker

## Build and run containers

```bash
docker compose up --build
```

---

# Docker URLs

Frontend:

```txt
http://localhost:5173
```

Backend:

```txt
http://localhost:3001
```

---

# Stop Docker Containers

```bash
docker compose down
```

---

# Docker Setup

## Dockerfile

```dockerfile
# ---------- Build Stage ----------
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------- Production Stage ----------
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

---

## docker-compose.yml

```yaml
version: '3.9'

services:
  frontend:
    build: .
    ports:
      - "5173:80"
    depends_on:
      - backend

  backend:
    image: node:24-alpine
    working_dir: /app
    volumes:
      - ./backend:/app/backend
    command: sh -c "npm install -g json-server && json-server backend/db.json --host 0.0.0.0 --port 3001"
    ports:
      - "3001:3001"
```

---

## nginx.conf

```nginx
server {
  listen 80;

  location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri /index.html;
  }
}
```

---

# Environment Notes

This project uses:
- React + Vite for frontend
- json-server as a mock REST API backend
- Docker Compose to run the full stack with one command

---

# Author

Abdelrahman Soliman