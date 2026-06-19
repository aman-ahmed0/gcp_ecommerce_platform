variable "project_id" {
  description = "Qwiklabs GCP project ID. Change this for every new lab."
  type        = string
}

variable "region" {
  description = "Region allowed by the Qwiklabs org policy. For this lab family use europe-west3."
  type        = string
  default     = "europe-west3"
}

variable "cluster_name" {
  description = "GKE cluster name."
  type        = string
  default     = "homeoffice-cluster"
}

variable "network_name" {
  description = "VPC name."
  type        = string
  default     = "homeoffice-vpc"
}

variable "subnet_name" {
  description = "Subnet name."
  type        = string
  default     = "homeoffice-subnet"
}

variable "subnet_cidr" {
  description = "Primary subnet CIDR."
  type        = string
  default     = "10.10.0.0/20"
}

variable "pods_cidr" {
  description = "Secondary range for GKE pods."
  type        = string
  default     = "10.20.0.0/16"
}

variable "services_cidr" {
  description = "Secondary range for Kubernetes services."
  type        = string
  default     = "10.30.0.0/20"
}

variable "node_count" {
  description = "Number of GKE nodes. Keep 1 for speed; set 2 only if needed."
  type        = number
  default     = 1

  validation {
    condition     = var.node_count >= 1 && var.node_count <= 2
    error_message = "node_count must be 1 or 2 for the one-hour Qwiklabs lab."
  }
}

variable "node_machine_type" {
  description = "Machine type for GKE nodes. e2-medium is a good balance for the lab."
  type        = string
  default     = "e2-medium"
}

variable "node_disk_size_gb" {
  description = "Boot disk size for each GKE node."
  type        = number
  default     = 30
}

variable "alert_email" {
  description = "Email address for Google Cloud Monitoring notifications. Leave empty to disable email channel and alert policy."
  type        = string
  default     = "ahmad.fawzzi@gmail.com"
}

variable "labels" {
  description = "Common labels."
  type        = map(string)
  default = {
    app       = "homeoffice"
    managedby = "terraform"
  }
}
