# Server Docker Setup

## ✅ Completed

### Files Created:

1. **`Dockerfile`** - Multi-stage build for production
2. **`.dockerignore`** - Excludes unnecessary files from Docker context

### Configuration Updates:

1. **`package.json`** - Added build and start scripts
2. **`tsconfig.json`** - Added `skipLibCheck` to handle Socket.IO types

## 📦 Build Process

The Dockerfile uses a **multi-stage build**:

### Stage 1: Builder

- Installs all dependencies (including devDependencies)
- Compiles TypeScript to JavaScript using `npm run build`
- Output goes to `dist/` folder

### Stage 2: Production

- Installs only production dependencies
- Copies compiled JavaScript from builder stage
- Runs both servers using `npm start`

## 🚀 Usage

### Build the Docker image:

```bash
cd server
docker build -t protocol-lab-server .
```

### Run the container:

```bash
docker run -p 3000:3000 -p 3001:3001 protocol-lab-server
```

### Test the endpoints:

- HTTP API: http://localhost:3000/short-poll
- WebSocket: ws://localhost:3001

## 📋 Scripts

- `npm run dev` - Development mode (HTTP server)
- `npm run dev:socket` - Development mode (WebSocket server)
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run both servers in production mode

## 🔌 Exposed Ports

- **3000** - HTTP API (Express)
- **3001** - WebSocket server (Socket.IO)

## 🎯 Next Steps

1. Build and test the client Dockerfile
2. Create docker-compose.yml to run both services together
