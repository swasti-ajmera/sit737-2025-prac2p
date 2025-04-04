# 🚀 Dockerizing a Node.js Web Application

This project demonstrates how to Dockerize a Node.js web application using a `Dockerfile` and `docker-compose.yml`, including setting up a container health check, exposing ports, and pushing the image to Docker Hub.

---

## 📁 Project Structure

```
docker-project/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── server.js         # Entry point of the Node.js app
└── README.md
```

---

## 🧰 Requirements

Install the following tools before proceeding:

- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 🔧 Setup Instructions

### 1. Clone this Repository

```bash
git clone https://github.com/swasti-ajmera/SIT707.git
cd Week-5/docker-project
```

---

### 2. Dockerfile

The Dockerfile contains the instructions to build a Docker image:

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Install curl for health checks
RUN apt-get update && apt-get install -y curl

EXPOSE 3000
CMD ["npm", "start"]
```

---

### 3. Docker Compose

The `docker-compose.yml` sets up the application container with a health check:

```yaml
version: "3.8"

services:
  web:
    build: .
    ports:
      - "3000:3000"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: always
```

---

### 4. Build and Run

Build the image:

```bash
docker-compose build
```

Start the container:

```bash
docker-compose up
```

Access the app at: [http://localhost:3000](http://localhost:3000)

---

### 5. Verify Container Health

List running containers:

```bash
docker ps
```

Check health status:

```bash
docker inspect --format="{{json .State.Health}}" docker-project-web-1
```

You should see a response like:

```json
{
  "Status": "healthy",
  "FailingStreak": 0,
  "Log": [...]
}
```

---

### 6. Push Docker Image to Docker Hub

#### Tag the Image

```bash
docker tag docker-project swastiajmera/docker-project-web
```

#### Login and Push

```bash
docker login
docker push swastiajmera/docker-project-web
```

---

### 7. Repository and Submission

- ✅ All code and configurations pushed to GitHub.
- ✅ Docker image published on Docker Hub.
- ✅ Health check implemented.
- ✅ Application verified and running.

---

## 👨‍💻 Author

**Swasti Ajmera**  
SIT737 - Cloud Native Application Development  
Deakin University, 2025
