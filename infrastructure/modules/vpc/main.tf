resource "google_compute_network" "vpc" {
  name                    = "homeoffice-vpc"
  auto_create_subnetworks = false
}

resource "google_compute_subnetwork" "subnet" {
  name          = "homeoffice-subnet"
  network       = google_compute_network.vpc.self_link
  ip_cidr_range = "10.0.0.0/16"
  region        = var.region
}