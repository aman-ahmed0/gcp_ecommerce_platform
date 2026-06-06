```markdown
# TechGear Hub - Backend API

FastAPI-based REST API for product management and database seeding. Built with Python, Motor (async MongoDB), and Pydantic for validation.

## 🚀 Run Locally

```bash
# 1. Create & activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env if using a remote MongoDB instance

# 4. Start the server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

##  Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017` |
| `DB_NAME` | Database name | `ecommerce` |

## 📡 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/products` | List all products |
| `POST` | `/products` | Add a new product |
| `POST` | `/seed` | Insert 4 sample products |
| `GET` | `/health` | Health check |
| `GET` | `/docs` | Interactive Swagger UI |

## 🐳 Docker

```bash
# Build
docker build -t techgear-backend .

# Run (ensure MongoDB is reachable)
docker run -p 8000:8000 -e MONGO_URI=mongodb://host.docker.internal:27017 techgear-backend
```

##  Development Notes
- All request/response models validated via Pydantic
- Async database operations using Motor driver
- CORS enabled for local frontend development (`http://localhost:5173`)
- Use `--reload` flag for hot-reload during local development
```