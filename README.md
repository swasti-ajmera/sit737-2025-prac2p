
## Publishing the Microservice into the Cloud  

### 📦 Project Overview
This project demonstrates the Dockerization of a Node.js microservice and its deployment to a **private container registry** on **Google Cloud Platform (GCP)** using **Artifact Registry**.

---

## 📁 Repository Structure

```
.
├── Dockerfile
├── docker-compose.yml
├── server.js
├── package.json
├── package-lock.json
├── README.md
```

---

## ✅ Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [Google Cloud SDK (gcloud)](https://cloud.google.com/sdk/docs/install)
- A Google Cloud account with billing enabled and a project created

---

## 🔨 Step-by-Step Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/swasti-ajmera/sit737-2025-prac2p.git
cd sit737-2025-prac2p
```

---

### 2. Dockerize the Microservice

Create a `Dockerfile` with the following contents:

```Dockerfile
# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy files
COPY package*.json ./
RUN npm install
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
```

---

### 3. Build the Docker Image

```bash
docker build -t docker-project-web .
```

---

### 4. Tag the Docker Image for the Registry

```bash
docker tag docker-project-web australia-southeast2-docker.pkg.dev/sit737-455910/docker-project/docker-project-web
```

---

### 5. Authenticate Docker with Artifact Registry

```bash
gcloud auth configure-docker australia-southeast2-docker.pkg.dev
```

---

### 6. Push the Image to Artifact Registry

```bash
docker push australia-southeast2-docker.pkg.dev/sit737-455910/docker-project/docker-project-web
```

---

### 7. Run the Image from the Registry (Verify Deployment)

```bash
docker run -d -p 3000:3000 australia-southeast2-docker.pkg.dev/sit737-455910/docker-project/docker-project-web
```

Then open `http://localhost:3000` to verify your service is running.

---

## 👨‍💻 Author

**Name:** Your Name  
**Student ID:** s224891586  
