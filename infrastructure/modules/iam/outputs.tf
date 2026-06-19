output "gke_node_service_account_email" { value = google_service_account.gke_nodes.email }
output "github_actions_service_account_email" { value = google_service_account.github_actions.email }
output "workload_identity_pool" { value = try(google_iam_workload_identity_pool.github[0].name, null) }
output "workload_identity_provider" { value = try(google_iam_workload_identity_pool_provider.github[0].name, null) }
