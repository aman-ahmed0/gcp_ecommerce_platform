resource "google_artifact_registry_repository" "repo" {
  location      = var.region
  repository_id = "homeoffice-repo"
  description   = "Docker images for HomeOffice Hub"
  format        = "DOCKER"
}