# Kubernetes – HomeOffice Hub

Kubernetes manifests for deploying the complete HomeOffice Hub platform.

---

## Namespaces

| Namespace    | Purpose                                             |
| ------------ | --------------------------------------------------- |
| `ecommerce`  | Application workloads (frontend, backend, database) |
| `monitoring` | Prometheus and Grafana monitoring stack             |

---

## Directory Structure

```text
kubernetes/
├── namespace.yaml
├── database/
│   ├── secret.yaml
│   ├── service.yaml
│   └── statefulset.yaml
│
├── backend/
│   ├── configmap.yaml
│   ├── deployment.yaml
│   └── service.yaml
│
├── frontend/
│   ├── deployment.yaml
│   └── service.yaml
│
├── monitoring/
│   ├── namespace.yaml
│   │
│   ├── prometheus/
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   └── rbac.yaml
│   │
│   └── grafana/
│       ├── configmap.yaml
│       ├── datasources-configmap.yaml
│       ├── provisioning-configmap.yaml
│       ├── deployment.yaml
│       └── service.yaml
│
└── argocd/
    └── (empty – ArgoCD manifests not yet added)
```

---

## Deploy the Full Stack

Apply all manifests in order:

```bash
kubectl apply -f kubernetes/namespace.yaml
kubectl apply -f kubernetes/database/
kubectl apply -f kubernetes/backend/
kubectl apply -f kubernetes/frontend/
kubectl apply -f kubernetes/monitoring/
```

Verify deployments:

```bash
kubectl get pods -A
```

---

## Access the Application

Expose the frontend locally:

```bash
kubectl port-forward -n ecommerce svc/frontend 8080:80
```

Open:

```text
http://localhost:8080
```

---

## Access Grafana

Expose Grafana locally:

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

---

## Component Details

### Database

The PostgreSQL database is deployed as a StatefulSet.

#### Features

* PersistentVolumeClaim (1Gi)
* Stable pod identity
* Persistent storage
* Kubernetes Secret for credentials

#### Networking

A headless service named:

```text
db
```

provides stable DNS resolution for backend connectivity.

#### Secrets

Database credentials are stored in:

```text
database/secret.yaml
```

and injected into dependent workloads through environment variables.

---

### Backend

The Flask API is deployed as a Kubernetes Deployment.

#### Container Image

```text
ahmedaman0/homeoffice-backend:latest
```

#### Configuration

A ConfigMap provides:

* `DB_HOST`
* `DB_PORT`
* `FLASK_ENV`

Database credentials are supplied through Kubernetes Secrets.

#### Startup Process

When the container starts:

1. Waits for PostgreSQL to become available
2. Establishes database connectivity
3. Creates required tables (if needed)
4. Seeds the products table when empty
5. Starts the Flask application

---

### Frontend

The Next.js application is deployed as a Kubernetes Deployment.

#### Container Image

```text
ahmedaman0/homeoffice-frontend:latest
```

#### Service

The frontend is exposed through a:

```text
LoadBalancer
```

service mapping:

```text
Port 80 → Container Port 3000
```

#### API Communication

All frontend API requests use relative URLs:

```javascript
fetch('/api/products')
```

Next.js rewrites forward requests internally to:

```text
http://backend:5000/api/*
```

allowing seamless communication inside the cluster.

---

## Monitoring

The monitoring stack consists of Prometheus and Grafana running in the dedicated `monitoring` namespace.

---

### Prometheus

#### Container Image

```text
prom/prometheus:latest
```

#### Features

* Kubernetes node discovery
* cAdvisor metrics collection
* Container resource monitoring
* Pod resource monitoring

#### Configuration

The Prometheus ConfigMap contains scrape configurations targeting:

```text
Kubelet → cAdvisor → Port 10250
```

on all cluster nodes.

#### RBAC

Prometheus is granted cluster-wide read access through:

* ServiceAccount
* ClusterRole
* ClusterRoleBinding

allowing automatic node discovery and metric collection.

---

### Grafana

#### Container Image

```text
grafana/grafana:latest
```

#### Service Type

```text
ClusterIP
```

exposed internally on port:

```text
3000
```

#### Provisioned Resources

##### Dashboard

```text
cluster-pods.json
```

Provides:

* CPU usage per pod
* Memory usage per pod
* Namespace-level visibility
* Cluster-wide resource monitoring

##### Data Source

```text
datasources.yaml
```

Automatically configures Prometheus:

```text
http://prometheus.monitoring.svc.cluster.local:9090
```

##### Dashboard Provisioning

```text
dashboards.yaml
```

Automatically loads dashboards from:

```text
/var/lib/grafana/dashboards
```

---

## Deployment Notes

### Container Registry

All application images are currently hosted on Docker Hub:

```text
ahmedaman0/homeoffice-backend
ahmedaman0/homeoffice-frontend
```

To use another registry:

1. Push images to the new registry
2. Update the `image:` fields in the deployment manifests
3. Configure image pull secrets if required

---

### Storage Considerations

#### Local Development

Docker Desktop Kubernetes uses local storage.

Data typically survives:

* Pod restarts
* Deployment updates

Data may be lost when:

* The cluster is deleted
* Docker Desktop storage is reset

#### Production Environments

Use a cloud-backed storage class such as:

* Google Persistent Disk (GKE)
* AWS EBS (EKS)
* Azure Managed Disks (AKS)

to ensure durable storage across node failures and cluster upgrades.

---

## Future Enhancements

* ArgoCD GitOps deployment manifests
* Helm chart packaging
* Horizontal Pod Autoscaler (HPA)
* Ingress Controller and TLS
* External Secrets integration
* Automated backups for PostgreSQL
* Production-grade observability stack

---

## Related Documentation

* Root Project Documentation: `../README.md`
* Frontend Documentation: `../frontend/README.md`
* Backend Documentation: `../backend/README.md`
