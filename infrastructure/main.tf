locals {
  required_apis = toset([
    "compute.googleapis.com",
    "container.googleapis.com",
    "logging.googleapis.com",
    "monitoring.googleapis.com"
  ])

  enable_monitoring_email = trimspace(var.alert_email) != ""
}

resource "google_project_service" "required" {
  for_each = local.required_apis

  project            = var.project_id
  service            = each.key
  disable_on_destroy = false
}

resource "google_compute_network" "vpc" {
  project                 = var.project_id
  name                    = var.network_name
  auto_create_subnetworks = false
  routing_mode            = "REGIONAL"

  depends_on = [google_project_service.required]
}

resource "google_compute_subnetwork" "subnet" {
  project                  = var.project_id
  name                     = var.subnet_name
  region                   = var.region
  network                  = google_compute_network.vpc.id
  ip_cidr_range            = var.subnet_cidr
  private_ip_google_access = true

  secondary_ip_range {
    range_name    = "homeoffice-pods"
    ip_cidr_range = var.pods_cidr
  }

  secondary_ip_range {
    range_name    = "homeoffice-services"
    ip_cidr_range = var.services_cidr
  }
}

data "google_compute_default_service_account" "default" {
  project = var.project_id

  depends_on = [google_project_service.required]
}

resource "google_container_cluster" "primary" {
  project                  = var.project_id
  name                     = var.cluster_name
  location                 = var.region
  network                  = google_compute_network.vpc.id
  subnetwork               = google_compute_subnetwork.subnet.id
  initial_node_count       = var.node_count
  deletion_protection      = false
  remove_default_node_pool = false
  networking_mode          = "VPC_NATIVE"

  resource_labels = var.labels

  ip_allocation_policy {
    cluster_secondary_range_name  = "homeoffice-pods"
    services_secondary_range_name = "homeoffice-services"
  }

  release_channel {
    channel = "REGULAR"
  }

  workload_identity_config {
    workload_pool = "${var.project_id}.svc.id.goog"
  }

  logging_config {
    enable_components = ["SYSTEM_COMPONENTS", "WORKLOADS"]
  }

  monitoring_config {
    enable_components = ["SYSTEM_COMPONENTS"]

    managed_prometheus {
      enabled = true
    }
  }

  addons_config {
    http_load_balancing {
      disabled = false
    }

    horizontal_pod_autoscaling {
      disabled = false
    }

    gce_persistent_disk_csi_driver_config {
      enabled = true
    }
  }

  node_config {
    machine_type    = var.node_machine_type
    disk_size_gb    = var.node_disk_size_gb
    service_account = data.google_compute_default_service_account.default.email
    oauth_scopes    = ["https://www.googleapis.com/auth/cloud-platform"]

    labels = var.labels

    metadata = {
      disable-legacy-endpoints = "true"
    }

    shielded_instance_config {
      enable_secure_boot          = true
      enable_integrity_monitoring = true
    }
  }

  depends_on = [
    google_project_service.required,
    google_compute_subnetwork.subnet
  ]
}

resource "google_monitoring_notification_channel" "email" {
  count = local.enable_monitoring_email ? 1 : 0

  project      = var.project_id
  display_name = "HomeOffice email alerts"
  type         = "email"

  labels = {
    email_address = var.alert_email
  }

  depends_on = [google_project_service.required]
}

resource "google_monitoring_alert_policy" "gke_node_cpu_high" {
  count = local.enable_monitoring_email ? 1 : 0

  project      = var.project_id
  display_name = "HomeOffice GKE node CPU high"
  combiner     = "OR"
  enabled      = true

  notification_channels = [google_monitoring_notification_channel.email[0].name]

  conditions {
    display_name = "Node CPU utilization above 80 percent"

    condition_threshold {
      filter          = "resource.type=\"k8s_node\" AND metric.type=\"kubernetes.io/node/cpu/allocatable_utilization\" AND resource.labels.cluster_name=\"${google_container_cluster.primary.name}\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 0.8

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }

  documentation {
    content   = "GKE node CPU has been above 80 percent for 5 minutes."
    mime_type = "text/markdown"
  }

  depends_on = [google_container_cluster.primary]
}
