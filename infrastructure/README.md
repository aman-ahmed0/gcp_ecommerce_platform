# Infrastructure as Code – Terraform (GCP)

Terraform modules that provision the cloud foundation for HomeOffice Hub on Google Cloud Platform.

---

## Architecture

```text
┌────────────────────────────────────────────────────────────┐
│                         Terraform                          │
│                                                            │
│   ┌────────────┐   ┌────────────┐   ┌──────────────────┐   │
│   │    VPC     │   │    GKE     │   │ Artifact Registry│   │
│   │  Network   │   │  Cluster   │   │   Docker Repo    │   │
│   │ + Subnet   │   │ + NodePool │   │                  │   │
│   └────────────┘   └────────────┘   └──────────────────┘   │
│                                                            │
│      All resources are created in a single GCP project.    │
└────────────────────────────────────────────────────────────┘
```

---

## Overview

This Terraform configuration provisions:

* Custom VPC network
* Dedicated subnet
* Google Kubernetes Engine (GKE) cluster
* Managed node pool
* Artifact Registry Docker repository

The infrastructure serves as the cloud foundation for deploying the HomeOffice Hub Kubernetes workloads.

---

## Prerequisites

Before using Terraform, ensure you have:

### Google Cloud

* A Google Cloud project
* Billing enabled on the project
* Sufficient permissions to create infrastructure

### Local Tools

* Terraform >= 1.5
* Google Cloud SDK (`gcloud`)
* kubectl

---

## How to Use

### 1. Authenticate with Google Cloud

```bash
gcloud auth application-default login
```

A browser window will open requesting authentication and authorization.

After successful login, Terraform can use your Google Cloud credentials.

---

### 2. Configure Variables

Create a file named:

```text
terraform.tfvars
```

inside the `infrastructure/` directory.

Example:

```hcl
project_id = "your-gcp-project-id"
```

Optional overrides:

```hcl
project_id  = "your-gcp-project-id"
region      = "us-central1"
cluster_name = "homeoffice-cluster"
```

---

### 3. Initialize Terraform

```bash
cd infrastructure

terraform init
```

This command:

* Downloads required providers
* Initializes modules
* Prepares the working directory

---

### 4. Review the Execution Plan

```bash
terraform plan
```

Terraform will display all resources that will be created without making changes.

Review the plan carefully before proceeding.

---

### 5. Apply the Configuration

```bash
terraform apply
```

When prompted:

```text
Do you want to perform these actions?
```

Type:

```text
yes
```

Terraform will provision:

* VPC network
* Subnet
* GKE cluster
* Node pool
* Artifact Registry repository

---

### 6. Configure kubectl

After deployment completes, retrieve cluster credentials:

```bash
gcloud container clusters get-credentials \
  $(terraform output -raw cluster_name) \
  --region $(terraform output -raw cluster_location)
```

Verify connectivity:

```bash
kubectl get nodes
```

Your Kubernetes cluster is now ready for application deployment.

---

### 7. Deploy HomeOffice Hub

After configuring kubectl:

```bash
kubectl apply -f ../kubernetes/namespace.yaml
kubectl apply -f ../kubernetes/database/
kubectl apply -f ../kubernetes/backend/
kubectl apply -f ../kubernetes/frontend/
kubectl apply -f ../kubernetes/monitoring/
```

---

### 8. Destroy Infrastructure

To avoid ongoing cloud charges:

```bash
terraform destroy
```

Confirm when prompted:

```text
yes
```

Terraform will remove all managed resources.

---

## Module Details

### VPC Module

Creates the networking foundation for the cluster.

#### Resources

| Resource   | Value               |
| ---------- | ------------------- |
| Network    | `homeoffice-vpc`    |
| Subnet     | `homeoffice-subnet` |
| CIDR Range | `10.0.0.0/16`       |

#### Purpose

* Isolated networking environment
* Private communication between resources
* Foundation for GKE

---

### GKE Module

Creates a regional Google Kubernetes Engine cluster.

#### Default Configuration

| Setting      | Value                |
| ------------ | -------------------- |
| Cluster Name | `homeoffice-cluster` |
| Cluster Type | Regional             |
| Node Count   | 2                    |
| Machine Type | `e2-medium`          |
| Disk Size    | 50 GB                |

#### Features

* Managed Kubernetes control plane
* Auto-healing nodes
* Auto-upgrade support
* Regional high availability

---

### Artifact Registry Module

Creates a Docker repository for application images.

#### Configuration

| Setting    | Value             |
| ---------- | ----------------- |
| Repository | `homeoffice-repo` |
| Format     | `DOCKER`          |
| Service    | Artifact Registry |

#### Registry URL

```text
{region}-docker.pkg.dev/{project_id}/homeoffice-repo
```

Example:

```text
us-central1-docker.pkg.dev/my-project/homeoffice-repo
```

---

## Outputs

After a successful deployment, Terraform provides useful outputs.

| Output                  | Description                |
| ----------------------- | -------------------------- |
| `cluster_name`          | Name of the GKE cluster    |
| `cluster_location`      | Region hosting the cluster |
| `cluster_endpoint`      | Kubernetes API endpoint    |
| `artifact_registry_url` | Docker registry URL        |

### View Outputs

```bash
terraform output
```

Retrieve a specific value:

```bash
terraform output -raw cluster_name
```

---

## State Management

By default, Terraform stores state locally:

```text
terraform.tfstate
```

This is suitable for learning and individual development.

### Recommended for Teams

Use a Google Cloud Storage backend.

Example:

```hcl
terraform {
  backend "gcs" {
    bucket = "homeoffice-terraform-state"
    prefix = "terraform/state"
  }
}
```

Benefits:

* Shared state
* State locking
* Version history
* Disaster recovery

---

## Customization

The GKE configuration can be adjusted in:

```text
modules/gke/main.tf
```

Common settings:

| Variable       | Purpose                 |
| -------------- | ----------------------- |
| `machine_type` | VM size                 |
| `node_count`   | Number of worker nodes  |
| `disk_size_gb` | Node disk capacity      |
| `cluster_name` | Kubernetes cluster name |
| `region`       | Deployment region       |

---

## Security Notes

### OAuth Scopes

The node pool uses:

```hcl
oauth_scopes = ["cloud-platform"]
```

This allows workloads running inside the cluster to access Google Cloud APIs when appropriately authorized.

### Recommendations

For production environments:

* Use Workload Identity
* Enable private clusters
* Restrict network access
* Store secrets outside Terraform state
* Enable Binary Authorization
* Configure IAM using least-privilege principles

---

## Cost Considerations

Resources that generate charges include:

* GKE cluster nodes
* Persistent disks
* Artifact Registry storage
* Network egress

Always destroy unused environments:

```bash
terraform destroy
```

---

## Future Enhancements

* Remote state in GCS
* Workload Identity
* Private GKE cluster
* Cloud SQL PostgreSQL
* Managed SSL certificates
* Ingress Controller
* DNS automation
* GitOps integration with ArgoCD

---

## Related Documentation

* Root Project Documentation: `../README.md`
* Kubernetes Documentation: `../kubernetes/README.md`
* Frontend Documentation: `../frontend/README.md`
* Backend Documentation: `../backend/README.md`
