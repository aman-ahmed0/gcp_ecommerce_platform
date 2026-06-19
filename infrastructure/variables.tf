variable "project_id" {
  description = "GCP project ID."
  type        = string
}

variable "region" {
  description = "GCP region for regional resources."
  type        = string
  default     = "us-central1"
}

variable "environment" {
  description = "Environment name used for labels and names."
  type        = string
  default     = "dev"
}

variable "network_name" {
  description = "VPC network name."
  type        = string
  default     = "homeoffice-vpc"
}

variable "subnet_name" {
  description = "GKE subnet name."
  type        = string
  default     = "homeoffice-subnet"
}

variable "subnet_cidr" {
  description = "Primary subnet CIDR range."
  type        = string
  default     = "10.10.0.0/20"
}

variable "pods_cidr" {
  description = "Secondary CIDR range for GKE pods."
  type        = string
  default     = "10.20.0.0/16"
}

variable "services_cidr" {
  description = "Secondary CIDR range for GKE services."
  type        = string
  default     = "10.30.0.0/20"
}

variable "cluster_name" {
  description = "GKE cluster name."
  type        = string
  default     = "homeoffice-cluster"
}

variable "master_ipv4_cidr_block" {
  description = "CIDR block for the private GKE control plane. Must be /28 and not overlap with VPC ranges."
  type        = string
  default     = "172.16.0.0/28"
}

variable "master_authorized_cidr_blocks" {
  description = "CIDR blocks allowed to access the public GKE control plane endpoint. Use your public IP as x.x.x.x/32. Empty is not recommended."
  type = list(object({
    cidr_block   = string
    display_name = string
  }))
  default = []
}

variable "enable_private_endpoint" {
  description = "If true, the GKE control plane is reachable only from inside the VPC. GitHub-hosted runners cannot deploy directly when true."
  type        = bool
  default     = false
}

variable "node_machine_type" {
  description = "GKE node machine type."
  type        = string
  default     = "e2-medium"
}

variable "node_disk_size_gb" {
  description = "GKE node disk size in GB."
  type        = number
  default     = 50
}

variable "node_min_count" {
  description = "Minimum number of nodes per region."
  type        = number
  default     = 1
}

variable "node_max_count" {
  description = "Maximum number of nodes per region."
  type        = number
  default     = 3
}

variable "artifact_repo_name" {
  description = "Artifact Registry Docker repository name."
  type        = string
  default     = "homeoffice-repo"
}

variable "github_owner" {
  description = "GitHub organization or username for Workload Identity Federation."
  type        = string
  default     = ""
}

variable "github_repo" {
  description = "GitHub repository name for Workload Identity Federation."
  type        = string
  default     = ""
}

variable "alert_email" {
  description = "Email address for Cloud Monitoring notification channel. Leave empty to disable."
  type        = string
  default     = ""
}

variable "enable_cloud_sql" {
  description = "Create a private Cloud SQL PostgreSQL instance. Disabled by default because the current app uses Kubernetes PostgreSQL."
  type        = bool
  default     = false
}

variable "cloud_sql_database_name" {
  description = "Cloud SQL database name."
  type        = string
  default     = "homeoffice"
}

variable "cloud_sql_user_name" {
  description = "Cloud SQL database user name."
  type        = string
  default     = "homeoffice_user"
}

variable "labels" {
  description = "Common labels applied to supported resources."
  type        = map(string)
  default = {
    app       = "homeoffice"
    managedby = "terraform"
  }
}
