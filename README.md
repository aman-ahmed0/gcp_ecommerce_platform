# HomeOffice Hub

An end-to-end, production-ready e-commerce platform for work-from-home electronics, built with a modern DevOps toolchain.

---

## Architecture

```text
┌─────────────┐     ┌──────────────┐     ┌────────────┐
│   Next.js   │───▶│  Flask API   │────▶│ PostgreSQL │
│  Frontend   │     │   (Python)   │     │  Database  │
└─────────────┘     └──────────────┘     └────────────┘
        │                    │
        ▼                    ▼
┌─────────────────────────────────────────────────────┐
│                Docker / Kubernetes                  │
│                                                     │
│  Local Development: Docker Compose                  │
│  Production: GKE with GitOps via ArgoCD             │
└─────────────────────────────────────────────────────┘
```

## Tech Stack

### Frontend

* Next.js 16
* React
* Tailwind CSS (Dark Theme)
* React Context API (Shopping Cart)

### Backend

* Python Flask
* SQLAlchemy
* psycopg2

### Database

* PostgreSQL 15

### DevOps & Infrastructure

* Docker
* Docker Compose
* Kubernetes
* Google Kubernetes Engine (GKE) (Terraform module ready)
* Terraform
* ArgoCD

### Monitoring

* Prometheus
* Grafana

### CI/CD

* GitHub Actions (planned)
* ArgoCD

## Getting Started

### Prerequisites

Install the following tools before running the project:

* Docker Desktop (with Kubernetes enabled)
* kubectl configured for your cluster
* Python 3.11+
* Node.js 20+

### Run with Docker Compose (Development)

Start the entire stack locally:

```bash
docker compose up --build
```

Application URL:

```text
http://localhost:3000
```

### Run on Kubernetes

Deploy all components:

```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/database/
kubectl apply -f kubernetes/backend/
kubectl apply -f kubernetes/frontend/
kubectl apply -f kubernetes/monitoring/
```

### Access the Frontend

```bash
kubectl port-forward -n ecommerce svc/frontend 8080:80
```

Open:

```text
http://localhost:8080
```

### Access Grafana Dashboards

```bash
kubectl port-forward -n monitoring svc/grafana 3001:3000
```

Open:

```text
http://localhost:3001
```

Default credentials:

```text
Username: admin
Password: admin
```

## Branching Strategy

This project follows a simplified Git Flow workflow.

### Branches

| Branch    | Purpose               |
| --------- | --------------------- |
| main      | Production-ready code |
| develop   | Integration branch    |
| feature/* | Feature development   |

### Workflow

1. Create a feature branch from develop
2. Implement changes
3. Open a Pull Request into develop
4. Validate functionality and testing
5. Merge develop into main for releases

Example:

```text
develop
 ├── feature/terraform-gke
 ├── feature/argocd
 └── feature/monitoring
```

## Repository Structure

| Directory/File     | Description                                              |
| ------------------ | -------------------------------------------------------- |
| frontend/          | Next.js application                                      |
| backend/           | Flask REST API                                           |
| kubernetes/        | Kubernetes manifests (deployments, services, monitoring) |
| infrastructure/    | Terraform modules for GCP (VPC, GKE, Artifact Registry)  |
| scripts/           | Deployment and utility scripts                           |
| docs/              | Architecture diagrams and screenshots                    |
| docker-compose.yml | Local full-stack deployment                              |

## Monitoring

### Prometheus

Prometheus collects:

* Kubernetes metrics
* Node metrics
* Container metrics
* cAdvisor metrics

### Grafana

Grafana is pre-configured via ConfigMaps and automatically loads a Cluster Pod Resources dashboard showing real-time CPU and memory usage per pod across all namespaces.

## Contributing

Create a feature branch from develop:

```bash
git checkout develop
git checkout -b feature/my-feature
```

Commit your changes:

```bash
git add .
git commit -m "Add new feature"
```

Push your branch:

```bash
git push origin feature/my-feature
```

Open a Pull Request targeting develop.

### Contribution Guidelines

* Keep manifests backward compatible
* Follow repository structure conventions
* Document significant infrastructure changes
* Request review from at least one team member

## License

This project is provided as part of a portfolio and learning demonstration.

All Rights Reserved.
