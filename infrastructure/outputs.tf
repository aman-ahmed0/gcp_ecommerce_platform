output "project_id" {
  description = "GCP project ID."
  value       = var.project_id
}

output "region" {
  description = "GCP region."
  value       = var.region
}

output "network_name" {
  description = "VPC network name."
  value       = module.vpc.network_name
}

output "subnet_name" {
  description = "GKE subnet name."
  value       = module.vpc.subnet_name
}

output "cluster_name" {
  description = "GKE cluster name."
  value       = module.gke.cluster_name
}

output "cluster_location" {
  description = "GKE cluster location."
  value       = module.gke.location
}

output "cluster_endpoint" {
  description = "GKE cluster endpoint."
  value       = module.gke.endpoint
  sensitive   = true
}

output "kubectl_command" {
  description = "Command to configure kubectl."
  value       = "gcloud container clusters get-credentials ${module.gke.cluster_name} --region ${module.gke.location} --project ${var.project_id}"
}

output "artifact_registry_url" {
  description = "Artifact Registry Docker repository URL."
  value       = module.artifact_registry.repository_url
}

output "backend_image_url" {
  description = "Backend image path without tag."
  value       = "${module.artifact_registry.repository_url}/homeoffice-backend"
}

output "frontend_image_url" {
  description = "Frontend image path without tag."
  value       = "${module.artifact_registry.repository_url}/homeoffice-frontend"
}

output "gke_node_service_account_email" {
  description = "GKE node service account email."
  value       = module.iam.gke_node_service_account_email
}

output "github_actions_service_account_email" {
  description = "GitHub Actions deploy service account email."
  value       = module.iam.github_actions_service_account_email
}

output "workload_identity_provider" {
  description = "Workload Identity provider resource name for GitHub Actions."
  value       = module.iam.workload_identity_provider
}

output "cloud_sql_connection_name" {
  description = "Cloud SQL connection name when Cloud SQL is enabled."
  value       = try(module.cloud_sql_postgres[0].connection_name, null)
}

output "cloud_sql_generated_password" {
  description = "Generated Cloud SQL password when Cloud SQL is enabled. Store it in Secret Manager or Kubernetes secret; it is also in Terraform state."
  value       = try(module.cloud_sql_postgres[0].generated_password, null)
  sensitive   = true
}
