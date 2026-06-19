output "instance_name" { value = google_sql_database_instance.postgres.name }
output "connection_name" { value = google_sql_database_instance.postgres.connection_name }
output "private_ip_address" { value = google_sql_database_instance.postgres.private_ip_address }
output "database_name" { value = google_sql_database.database.name }
output "user_name" { value = google_sql_user.user.name }
output "generated_password" {
  value     = random_password.db_password.result
  sensitive = true
}
