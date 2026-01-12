# 📡 Communication Protocols Lab

A comprehensive sandbox for exploring and comparing real-time communication techniques between a client and a server.

This project implements and visualizes four major protocols: **Short Polling**, **Long Polling**, **Server-Sent Events (SSE)**, and **WebSockets**.

---

## 🚀 Quick Start (with Docker)

The easiest way to run the entire stack is using Docker Compose.

1.  **Start the environment:**
    ```bash
    docker-compose up --build
    ```
2.  **Access the application:**
    - **Frontend:** [http://localhost:8080](http://localhost:8080)
    - **Unified Backend (API & WS):** [http://localhost:3000](http://localhost:3000)

---

## 🧪 Protocols Comparison

### 1. Short Polling

The client requests data from the server at fixed intervals (e.g., every 2 seconds). Simple but resource-intensive due to frequent HTTP overhead.

### 2. Long Polling

The client makes a request, and the server holds it open until new data is available or a timeout occurs. More efficient than short polling for real-time updates.

### 3. Server-Sent Events (SSE)

A standard HTTP-based protocol for pushing data from server to client over a single, long-lived connection. Unidirectional (Server → Client).

### 4. WebSockets

A full-duplex, bi-directional communication protocol over a single TCP connection. Best for highly interactive applications like chat.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons.
- **Backend:** Node.js, Express, Socket.io.
- **Infrastructure:** Docker, Docker Compose, Nginx.

---

## 📂 Project Structure

```text
├── client/              # React frontend
│   ├── src/common/      # Reusable UI components
│   └── Dockerfile       # Nginx-based production build
├── server/              # Node.js backend
│   ├── src/routes/      # Protocol-specific endpoints
│   └── Dockerfile       # Multi-stage TS build
└── docker-compose.yml   # Orchestration
```

---

## 🐳 Docker Management

- **Stop the project:** `docker-compose down`
- **View logs:** `docker-compose logs -f`
- **Clean build:** `docker-compose build --no-cache`

---

## 🔧 Local Development (No Docker)

### Server

```bash
cd server
npm install
npm run dev
```

### Client

```bash
cd client
pnpm install
pnpm run dev
```
