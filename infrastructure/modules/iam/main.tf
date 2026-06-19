locals {
  enable_github_wif = var.github_owner != "" && var.github_repo != ""
}

resource "google_service_account" "gke_nodes" {
  project      = var.project_id
  account_id   = "homeoffice-gke-nodes"
  display_name = "HomeOffice GKE Node Service Account"
  description  = "Least-privilege service account used by GKE nodes."
}

resource "google_project_iam_member" "gke_node_roles" {
  for_each = toset([
    "roles/artifactregistry.reader",
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/monitoring.viewer"
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.gke_nodes.email}"
}

resource "google_service_account" "github_actions" {
  project      = var.project_id
  account_id   = "github-actions-deployer"
  display_name = "GitHub Actions GKE Deployer"
  description  = "CI/CD service account for GitHub Actions via Workload Identity Federation."
}

resource "google_project_iam_member" "github_actions_roles" {
  for_each = toset([
    "roles/artifactregistry.writer",
    "roles/container.developer",
    "roles/iam.serviceAccountUser",
    "roles/logging.viewer"
  ])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_iam_workload_identity_pool" "github" {
  count                     = local.enable_github_wif ? 1 : 0
  project                   = var.project_id
  workload_identity_pool_id = "github-actions-pool"
  display_name              = "GitHub Actions Pool"
  description               = "OIDC pool for GitHub Actions."
}

resource "google_iam_workload_identity_pool_provider" "github" {
  count                              = local.enable_github_wif ? 1 : 0
  project                            = var.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github[0].workload_identity_pool_id
  workload_identity_pool_provider_id = "github-actions-provider"
  display_name                       = "GitHub Actions Provider"

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
    "attribute.ref"        = "assertion.ref"
  }

  attribute_condition = "assertion.repository == '${var.github_owner}/${var.github_repo}'"

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account_iam_member" "github_wif_user" {
  count              = local.enable_github_wif ? 1 : 0
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github[0].name}/attribute.repository/${var.github_owner}/${var.github_repo}"
}
