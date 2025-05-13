# MongoDB + App Deployment on Kubernetes with Monitoring

## 📁 Project Structure

```

9.1P/
├── node_modeules
│   ├── mongo-deployment.yaml
│   ├── mongo-pvc.yaml
│   ├── mongo-secret.yaml
│   ├── app-deployment.yaml
│   └── service.yaml
├── README.md
├── screenshots/
│   ├── mongo-pods.png
│   ├── grafana-dashboard.png
│   ├── prometheus-query.png
│   └── app-connected.png
└── backup/
└── mongo-backup-script.sh

````

---

## 🔧 Step-by-Step Setup Instructions

### Step 1: Start Docker Desktop Kubernetes

Ensure Kubernetes is up and running:
```bash
kubectl get nodes
````

---

### Step 2: Create Persistent Volume and Persistent Volume Claim

**`mongo-pvc.yaml`**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongo-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi
```

Apply:

```bash
kubectl apply -f mongo-pvc.yaml
```

---

### Step 3: Create MongoDB Secret

**`mongo-secret.yaml`**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongo-secret
type: Opaque
data:
  mongo-username: bW9uZ291c2Vy  # base64 encoded "mongouser"
  mongo-password: bW9uZ29wYXNz  # base64 encoded "mongopass"
```

Apply:

```bash
kubectl apply -f mongo-secret.yaml
```

---

### Step 4: Deploy MongoDB

**`mongo-deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongo
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongo-secret
              key: mongo-username
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongo-secret
              key: mongo-password
        volumeMounts:
        - name: mongo-storage
          mountPath: /data/db
      volumes:
      - name: mongo-storage
        persistentVolumeClaim:
          claimName: mongo-pvc
```

Apply:

```bash
kubectl apply -f mongo-deployment.yaml
```

---

### Step 5: Connect Your App to MongoDB

Update your app’s deployment manifest to include environment variables to connect to MongoDB.

**`app-deployment.yaml`**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app
spec:
  replicas: 1
  selector:
    matchLabels:
      app: app
  template:
    metadata:
      labels:
        app: app
    spec:
      containers:
      - name: app
        image: your-app-image:latest
        ports:
        - containerPort: 3000
        env:
        - name: MONGO_URI
          value: "mongodb://$(MONGO_USER):$(MONGO_PASS)@mongo:27017"
        - name: MONGO_USER
          valueFrom:
            secretKeyRef:
              name: mongo-secret
              key: mongo-username
        - name: MONGO_PASS
          valueFrom:
            secretKeyRef:
              name: mongo-secret
              key: mongo-password
```

Apply:

```bash
kubectl apply -f app-deployment.yaml
```

---

### Step 6: Test CRUD Operations

1. Port-forward your app:

   ```bash
   kubectl port-forward <app-pod> 3000
   ```

2. Go to `http://localhost:3000` and confirm MongoDB is working.

3. Perform Create, Read, Update, and Delete operations via UI or Postman.

---

### Step 7: Backups & Disaster Recovery

Create a script (`mongo-backup-script.sh`) using `mongodump`:

```bash
#!/bin/bash
TIMESTAMP=$(date +%F)
BACKUP_DIR="/backups/mongo/$TIMESTAMP"
mkdir -p "$BACKUP_DIR"
mongodump --host mongo --username mongouser --password mongopass --out "$BACKUP_DIR"
```

Set a cronjob or GitHub Actions step to trigger the backup daily.

---

### Step 8: Monitoring with Prometheus & Grafana

#### 1. Install Prometheus

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-community/prometheus
```

---

#### 2. Install Grafana

```bash
helm repo add grafana https://grafana.github.io/helm-charts
helm install grafana grafana/grafana
```

Get admin password:

```bash
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | base64 --decode
```

Port forward:

```bash
kubectl port-forward <grafana-pod> 3000
```

Access at [http://localhost:3000](http://localhost:3000)

#### 3. Add Prometheus as a Data Source in Grafana

* URL: `http://prometheus-server.default.svc.cluster.local`
* Create dashboards with metrics like:

  * `container_memory_usage_bytes`
  * `up`
  * MongoDB exporter metrics if available

---

## ✅ Result

* App connected successfully to MongoDB
* CRUD operations verified
* Backup plan in place
* Monitoring via Grafana dashboards


