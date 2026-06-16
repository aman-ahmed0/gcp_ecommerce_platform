# All modules receive the project ID and region from variables.
# VPC network
module "vpc" {
  source     = "./modules/vpc"
  project_id = var.project_id
  region     = var.region
}

# GKE cluster
module "gke" {
  source        = "./modules/gke"
  project_id    = var.project_id
  region        = var.region
  cluster_name  = var.cluster_name
  network       = module.vpc.network_name
  subnetwork    = module.vpc.subnet_name
}

# Artifact Registry repository for Docker images // (later used by CI/CD).
module "artifact_registry" {
  source     = "./modules/artifact-registry"
  project_id = var.project_id
  region     = var.region
}