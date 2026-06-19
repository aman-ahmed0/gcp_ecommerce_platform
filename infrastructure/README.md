# Simplified Qwiklabs GKE Terraform

This Terraform replaces the previous multi-module lab infrastructure with a smaller setup designed for a one-hour Qwiklabs session.

It creates:

- Required APIs
- One VPC
- One subnet in `europe-west3`
- One public GKE cluster in `europe-west3`
- One default node pool with 1 node by default, max recommended 2
- Google Cloud Monitoring email channel and CPU alert policy

It intentionally does **not** create:

- Custom service accounts
- Project IAM grants
- GitHub Workload Identity
- Cloud SQL
- Cloud NAT / private GKE nodes
- Artifact Registry
- Remote Terraform state bucket

Those items were removed because the Qwiklabs environment blocks some IAM policy updates and some regional locations, and the lab only lasts one hour.

## Manual usage

```powershell
cd C:\Users\ahmed\gcp-ecommerce-platform\infrastructure

@'
project_id = "YOUR_NEW_PROJECT_ID"
region     = "europe-west3"

cluster_name      = "homeoffice-cluster"
node_count        = 1
node_machine_type = "e2-medium"
node_disk_size_gb = 30

alert_email = "ahmad.fawzzi@gmail.com"
'@ | Set-Content terraform.tfvars

terraform init
terraform apply -auto-approve
```

Then connect kubectl:

```powershell
gcloud container clusters get-credentials homeoffice-cluster --region europe-west3 --project YOUR_NEW_PROJECT_ID
kubectl get nodes
```
