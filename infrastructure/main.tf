module "apis" {
  source     = "./modules/apis"
  project_id = var.project_id
}

module "vpc" {
  source = "./modules/vpc"

  project_id    = var.project_id
  region        = var.region
  network_name  = var.network_name
  subnet_name   = var.subnet_name
  subnet_cidr   = var.subnet_cidr
  pods_cidr     = var.pods_cidr
  services_cidr = var.services_cidr
  labels        = var.labels

  depends_on = [module.apis]
}

module "artifact_registry" {
  source = "./modules/artifact-registry"

  project_id = var.project_id
  region     = var.region
  repo_name  = var.artifact_repo_name
  labels     = var.labels

  depends_on = [module.apis]
}

module "iam" {
  source = "./modules/iam"

  project_id   = var.project_id
  region       = var.region
  github_owner = var.github_owner
  github_repo  = var.github_repo
  labels       = var.labels

  depends_on = [module.apis]
}

module "gke" {
  source = "./modules/gke"

  project_id                    = var.project_id
  region                        = var.region
  cluster_name                  = var.cluster_name
  network_id                    = module.vpc.network_id
  subnet_id                     = module.vpc.subnet_id
  pods_range_name               = module.vpc.pods_range_name
  services_range_name           = module.vpc.services_range_name
  node_service_account_email    = module.iam.gke_node_service_account_email
  node_machine_type             = var.node_machine_type
  node_disk_size_gb             = var.node_disk_size_gb
  node_min_count                = var.node_min_count
  node_max_count                = var.node_max_count
  master_ipv4_cidr_block        = var.master_ipv4_cidr_block
  master_authorized_cidr_blocks = var.master_authorized_cidr_blocks
  enable_private_endpoint       = var.enable_private_endpoint
  labels                        = var.labels

  depends_on = [
    module.apis,
    module.vpc,
    module.iam,
    module.artifact_registry
  ]
}

module "monitoring" {
  source = "./modules/monitoring"

  project_id   = var.project_id
  cluster_name = module.gke.cluster_name
  alert_email  = var.alert_email

  depends_on = [module.gke]
}

module "cloud_sql_postgres" {
  count  = var.enable_cloud_sql ? 1 : 0
  source = "./modules/cloud-sql-postgres"

  project_id    = var.project_id
  region        = var.region
  network_id    = module.vpc.network_id
  database_name = var.cloud_sql_database_name
  user_name     = var.cloud_sql_user_name
  labels        = var.labels

  depends_on = [module.apis, module.vpc]
}
