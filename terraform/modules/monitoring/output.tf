output "sns_topic_arn" {
  description = "ARN of the SNS topic for alarms"
  value       = aws_sns_topic.ecs_alerts.arn
}

output "backend_cpu_alarm_arn" {
  description = "ARN of backend CPU high alarm"
  value       = aws_cloudwatch_metric_alarm.backend_cpu_high.arn
}

