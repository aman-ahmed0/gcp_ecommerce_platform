```markdown
# TechGear Hub - E-Commerce Demo

> End-to-end DevOps project: React + FastAPI + MongoDB + Docker + Kubernetes + GCP

---

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed & running
- Git

### 1. Clone & Start
```bash
git clone https://github.com/AhmeFawzy/gcp_ecommerce_platform.git
cd gcp-ecommerce-platform
docker compose up --build
```

### 2. Access the App
| Service | URL |
|---------|-----|
| 🛍️ Frontend | http://localhost |
| 🔌 Backend API | http://localhost:8000 |
| 📚 API Docs | http://localhost:8000/docs |
| 🗄️ MongoDB Dashboard | http://localhost:8081 (login: `admin` / `password`) |

### 3. Seed Sample Products
```bash
# Option A: Via curl
curl -X POST http://localhost:8000/seed

# Option B: Click the "🌱 Seed Sample Products" button on the Products page
```

### 4. Stop Services
```bash
docker compose down
```

---

## 🧪 Testing Locally (Without Docker)

### Backend
```bash
cd backend
python -m venv venv && source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
# Visit: http://127.0.0.1:8000/docs
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Visit: http://localhost:5173
```

> ⚠️ Ensure MongoDB is running locally or update `MONGO_URI` in `.env`

---

## 📁 Project Structure
```
gcp-ecommerce-platform/
├── backend/               # FastAPI + MongoDB
│   ├── app/
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/              # React + Vite
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── kubernetes/            # K8s manifests + ArgoCD config
├── infrastructure/        # Terraform (GCP)
├── docker-compose.yml     # Local dev setup
└── README.md
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| Frontend shows blank page | Wait 30s for build; check browser console |
| API returns 404 | Ensure backend container is running: `docker ps` |
| Can't connect to MongoDB | Wait for `mongod startup complete` in logs |
| Build fails on Windows | Check file casing: `App.jsx` ≠ `app.jsx` in Docker/Linux |
| Port already in use | Change ports in `docker-compose.yml` |

---

## 🌐 Deploy to GCP (Preview)

```bash
# 1. Authenticate
gcloud auth application-default login

# 2. Provision infrastructure
cd infrastructure
terraform init && terraform apply

# 3. Deploy to GKE
kubectl apply -k kubernetes/

# 4. Sync via ArgoCD
kubectl apply -f kubernetes/argocd/application.yaml
```

> See `infrastructure/README.md` for full GCP deployment guide.

---

## 👤 Author
**Ahmed Fawzy**  
📧 ahmad.fawzzi@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/ahmed-abdelsamad-2825851b0/)  
🐙 [GitHub](https://github.com/AhmeFawzy/gcp_ecommerce_platform)

> 💡 This is a demo project for DevOps portfolio purposes. Not for production use.
```