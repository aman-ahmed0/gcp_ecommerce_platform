# Bootstrap Terraform Remote State

Run this once to create the GCS bucket used by the main Terraform backend.

```bash
cd infrastructure/bootstrap-state
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars
terraform init
terraform apply
```

Copy the `backend_block` output into `../backend.tf`, then run:

```bash
cd ..
terraform init
```

GCS is the GCP equivalent of using S3 for Terraform state. The GCS backend supports state locking, so no DynamoDB table is required.
