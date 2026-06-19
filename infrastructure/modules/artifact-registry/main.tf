resource "google_artifact_registry_repository" "docker" {
  project       = var.project_id
  location      = var.region
  repository_id = var.repo_name
  description   = "Docker images for HomeOffice Hub"
  format        = "DOCKER"
  labels        = var.labels

  docker_config {
    immutable_tags = false
  }
}
