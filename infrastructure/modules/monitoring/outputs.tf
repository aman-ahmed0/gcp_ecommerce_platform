output "email_notification_channel" {
  value = try(google_monitoring_notification_channel.email[0].name, null)
}
