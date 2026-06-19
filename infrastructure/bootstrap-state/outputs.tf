output "state_bucket_name" {
  value = google_storage_bucket.terraform_state.name
}

output "backend_block" {
  value = <<EOT
terraform {
  backend "gcs" {
    bucket = "${google_storage_bucket.terraform_state.name}"
    prefix = "homeoffice/terraform/state"
  }
}
EOT
}
