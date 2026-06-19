# HomeOffice Hub GCP Infrastructure

Terraform infrastructure for deploying the ecommerce platform to Google Cloud.

## What this creates

- Required Google APIs
- Secure custom VPC and subnet
- Secondary IP ranges for GKE pods and services
- Cloud Router + Cloud NAT for private GKE nodes
- Artifact Registry Docker repository
- Dedicated GKE node service account
- GitHub Actions deploy service account
- Optional GitHub Workload Identity Federation, no JSON key required
- Regional GKE cluster with private nodes, Shielded Nodes, Workload Identity, auto-repair, and auto-upgrade
- Optional Cloud Monitoring email alert channel and node CPU alert
- Optional private Cloud SQL PostgreSQL module, disabled by default

## Recommended flow

### 1. Bootstrap remote state

```bash
cd infrastructure/bootstrap-state
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your project and a globally unique bucket name
terraform init
terraform apply
```

Copy the `backend_block` output into:

```text
infrastructure/backend.tf
```

Or copy `backend.tf.example` to `backend.tf` and replace the bucket name.

### 2. Configure main variables

```bash
cd ..
cp terraform.tfvars.example terraform.tfvars
```

Edit:

```hcl
project_id = "your-gcp-project-id"
region     = "us-central1"

master_authorized_cidr_blocks = [
  {
    cidr_block   = "YOUR_PUBLIC_IP/32"
    display_name = "admin-workstation"
  }
]

github_owner = "your-github-owner"
github_repo  = "your-repo-name"
alert_email  = "ahmad.fawzzi@gmail.com"
```

Find your public IP:

```bash
curl ifconfig.me
```

### 3. Deploy infrastructure

```bash
terraform init
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
```

### 4. Configure kubectl

```bash
gcloud container clusters get-credentials $(terraform output -raw cluster_name) \
  --region $(terraform output -raw cluster_location) \
  --project $(terraform output -raw project_id)

kubectl get nodes
```

### 5. Deploy Kubernetes app

```bash
kubectl apply -f ../kubernetes/namespace.yaml
kubectl apply -f ../kubernetes/database/
kubectl apply -f ../kubernetes/backend/
kubectl apply -f ../kubernetes/frontend/
```

## GCP remote state vs AWS S3

On AWS you used S3 and DynamoDB. On GCP use a GCS bucket:

- State storage: Google Cloud Storage bucket
- Version history: GCS bucket versioning
- Access control: IAM + Uniform Bucket-Level Access
- State locking: supported by the Terraform GCS backend

No DynamoDB equivalent is required for Terraform locking on GCS.

## GitHub Actions without JSON keys

This setup creates:

- `github-actions-deployer` service account
- Workload Identity Pool
- GitHub OIDC provider
- IAM binding limited to one repository

Use Terraform output `workload_identity_provider` in GitHub Actions.

Required GitHub variables:

```text
GCP_PROJECT_ID
GCP_REGION
GKE_CLUSTER
GKE_LOCATION
ARTIFACT_REPO
GCP_SERVICE_ACCOUNT
GCP_WORKLOAD_IDENTITY_PROVIDER
```

## Security notes

- GKE nodes are private.
- Cloud NAT is enabled so private nodes can pull public Docker Hub images when needed.
- Node service account is not the default Compute Engine service account.
- GKE Workload Identity is enabled.
- Legacy metadata endpoints are disabled on nodes.
- Shielded VM secure boot and integrity monitoring are enabled.
- Control-plane access should be restricted to your IP using `master_authorized_cidr_blocks`.
- Do not commit `terraform.tfvars`, `backend.tf`, `.terraform/`, or `*.tfstate`.

## Cleanup

Delete app resources first:

```bash
kubectl delete -f ../kubernetes/frontend/ --ignore-not-found=true
kubectl delete -f ../kubernetes/backend/ --ignore-not-found=true
kubectl delete -f ../kubernetes/database/ --ignore-not-found=true
kubectl delete -f ../kubernetes/namespace.yaml --ignore-not-found=true
```

Then destroy infra:

```bash
terraform destroy
```

The remote state bucket is created by `bootstrap-state` and is not destroyed by the main stack.
