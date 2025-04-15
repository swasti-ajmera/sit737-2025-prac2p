# SIT737 - Practical Task 6P  
## Deploying a Node.js App on Kubernetes

---

## Project Structure

```
6.1P/
├── Dockerfile
├── index.js
├── package.json
├── deployment.yaml
├── service.yaml
└── README.md
```

---

## Prerequisites

Make sure the following tools are installed and configured:

- [Node.js](https://nodejs.org/en/download/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (with Kubernetes enabled)
- [Git](https://git-scm.com/downloads)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)

---

## Application Details

A basic Express-based Node.js application is created to return a simple message at the root endpoint:

**index.js**
```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Kubernetes Node.js App!');
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
```

---

## Docker Setup

### 1. Dockerfile

This Dockerfile defines how the app is containerized:

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```

### 2. Build Docker Image

```bash
docker build -t 6.1p-node-app .
```

---

## Kubernetes Deployment

### 1. Deployment Configuration

**deployment.yaml**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodejs-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: nodejs
  template:
    metadata:
      labels:
        app: nodejs
    spec:
      containers:
        - name: nodejs
          image: node-kube-app
          imagePullPolicy: Never
          ports:
            - containerPort: 3000
```

> `imagePullPolicy: Never` ensures Kubernetes uses the local image built with Docker.

### 2. Apply Deployment

```bash
kubectl apply -f deployment.yaml
```

---

## Kubernetes Service

### 1. Service Configuration

**service.yaml**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: nodejs-service
spec:
  type: NodePort
  selector:
    app: nodejs
  ports:
    - port: 3000
      targetPort: 3000
      nodePort: 30080
```

### 2. Apply Service

```bash
kubectl apply -f service.yaml
```

### 3. Verify Setup

Check pod and service status:

```bash
kubectl get pods
kubectl get services
```

You should see:

```
NAME             TYPE       CLUSTER-IP      PORT(S)           AGE
nodejs-service   NodePort   10.X.X.X        3000:30080/TCP     Xm
```

---

## Access the Application

Now open your browser and navigate to:

```
http://localhost:30080
```

You should see:
```
Hello from Kubernetes Node.js App!
```

---

## Author

- **Swasti Ajmera**
- **Student ID:** 224891586 
- **Unit:** SIT737 – Cloud Native Application Development
