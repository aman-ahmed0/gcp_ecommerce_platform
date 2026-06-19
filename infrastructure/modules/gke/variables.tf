variable "project_id" { type = string }
variable "region" { type = string }
variable "cluster_name" { type = string }
variable "network_id" { type = string }
variable "subnet_id" { type = string }
variable "pods_range_name" { type = string }
variable "services_range_name" { type = string }
variable "node_service_account_email" { type = string }
variable "node_machine_type" { type = string }
variable "node_disk_size_gb" { type = number }
variable "node_min_count" { type = number }
variable "node_max_count" { type = number }
variable "master_ipv4_cidr_block" { type = string }
variable "enable_private_endpoint" { type = bool }
variable "labels" { type = map(string) }
variable "master_authorized_cidr_blocks" {
  type = list(object({
    cidr_block   = string
    display_name = string
  }))
}
