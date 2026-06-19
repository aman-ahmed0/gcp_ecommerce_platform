locals {
  enable_email_alerts = var.alert_email != ""
}

resource "google_monitoring_notification_channel" "email" {
  count        = local.enable_email_alerts ? 1 : 0
  project      = var.project_id
  display_name = "HomeOffice email alerts"
  type         = "email"

  labels = {
    email_address = var.alert_email
  }
}

resource "google_monitoring_alert_policy" "gke_node_cpu_high" {
  count        = local.enable_email_alerts ? 1 : 0
  project      = var.project_id
  display_name = "HomeOffice GKE node CPU high"
  combiner     = "OR"
  enabled      = true

  conditions {
    display_name = "Node CPU utilization above 80 percent"

    condition_threshold {
      filter          = "resource.type=\"k8s_node\" AND metric.type=\"kubernetes.io/node/cpu/allocatable_utilization\" AND resource.labels.cluster_name=\"${var.cluster_name}\""
      duration        = "300s"
      comparison      = "COMPARISON_GT"
      threshold_value = 0.8

      aggregations {
        alignment_period   = "60s"
        per_series_aligner = "ALIGN_MEAN"
      }
    }
  }

  notification_channels = [google_monitoring_notification_channel.email[0].name]

  documentation {
    content   = "GKE node CPU has been above 80 percent for 5 minutes."
    mime_type = "text/markdown"
  }
}
