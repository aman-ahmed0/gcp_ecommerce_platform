# Backend – HomeOffice Hub

RESTful API built with **Flask**, **SQLAlchemy**, and **PostgreSQL** for the HomeOffice Hub e-commerce platform.

---

## Features

* Product catalog API

  * List all products
  * Retrieve a single product
* Automatic database initialization
* Automatic product seeding on first startup
* CORS enabled for frontend integration
* Environment variable-based configuration
* Compatible with both Docker Compose and Kubernetes deployments

---

## Tech Stack

### Language

* Python 3.11

### Frameworks & Libraries

* Flask
* Flask-SQLAlchemy
* Flask-CORS
* psycopg2

### Database

* PostgreSQL 15

---

## API Endpoints

| Method | Endpoint             | Description              |
| ------ | -------------------- | ------------------------ |
| `GET`  | `/`                  | Health check             |
| `GET`  | `/api/products`      | List all products        |
| `GET`  | `/api/products/<id>` | Retrieve a product by ID |

---

## Example Response

### GET `/api/products/1`

```json
{
  "id": 1,
  "name": "Wireless Mouse",
  "price": 19.99,
  "image": "https://commons.wikimedia.org/...",
  "description": "Ergonomic wireless mouse with silent clicks..."
}
```

---

## Database

### Schema

**Table:** `products`

| Column        | Type         | Description                |
| ------------- | ------------ | -------------------------- |
| `id`          | Integer (PK) | Auto-increment primary key |
| `name`        | String(100)  | Product name               |
| `price`       | Float        | Product price              |
| `image`       | String(255)  | Product image URL          |
| `description` | Text         | Product description        |

### Database Connection

The application dynamically builds the PostgreSQL connection string from environment variables:

```text
postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{DB_HOST}:{DB_PORT}/{POSTGRES_DB}
```

### Default Values

Used by Docker Compose and local development:

| Variable            | Default Value   |
| ------------------- | --------------- |
| `POSTGRES_USER`     | `homeoffice`    |
| `POSTGRES_PASSWORD` | `homeoffice123` |
| `POSTGRES_DB`       | `homeoffice_db` |
| `DB_HOST`           | `db`            |
| `DB_PORT`           | `5432`          |

### Database Seeding

On first startup, the application checks whether the `products` table contains data.

If empty:

* Tables are created automatically
* 14 work-from-home products are inserted
* Stable Wikimedia Commons image URLs are assigned

No manual seed command is required.

---

## How to Run Locally

### 1. Create a Virtual Environment

**Linux/macOS**

```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows**

```powershell
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Start PostgreSQL

Using Docker:

```bash
docker run \
  --name postgres \
  -e POSTGRES_USER=homeoffice \
  -e POSTGRES_PASSWORD=homeoffice123 \
  -e POSTGRES_DB=homeoffice_db \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Run the API

```bash
python app.py
```

The API will be available at:

```text
http://localhost:5000
```

---

## Project Structure

```text
backend/
├── app.py              # Application entry point
├── models.py           # SQLAlchemy Product model
├── db.py               # Database instance
├── requirements.txt    # Python dependencies
├── Dockerfile          # Container image definition
└── venv/               # Local virtual environment (ignored)
```

---

## Environment Variables

| Variable            | Default         | Description               |
| ------------------- | --------------- | ------------------------- |
| `POSTGRES_USER`     | `homeoffice`    | Database username         |
| `POSTGRES_PASSWORD` | `homeoffice123` | Database password         |
| `POSTGRES_DB`       | `homeoffice_db` | Database name             |
| `DB_HOST`           | `db`            | Database host             |
| `DB_PORT`           | `5432`          | Database port             |
| `FLASK_ENV`         | `development`   | Flask runtime environment |

---

## Docker

The backend image is based on:

```text
python:3.11-slim
```

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
```

The same image is used for:

* Docker Compose deployments
* Kubernetes deployments

---

## Startup Flow

```text
Container Starts
        │
        ▼
Wait for PostgreSQL
        │
        ▼
Create Tables
        │
        ▼
Seed Products (if empty)
        │
        ▼
Start Flask API
```

---

## Health Check

The health check endpoint returns a simple confirmation message:

```http
GET /
```

Example response:

```text
HomeOffice Hub API is running!
```

---

## Related Documentation

* Root Project Documentation: `../README.md`
* Frontend Documentation: `../frontend/README.md`
* Kubernetes Documentation: `../kubernetes/README.md`
