# SNS Topic for Alarms
resource "aws_sns_topic" "ecs_alerts" {
  name = "${var.project_name}-${var.environment}-ecs-alerts"

  tags = {
    Name        = "${var.project_name}-${var.environment}-ecs-alerts"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Optional Email Subscription (active if alert_email is provided)
resource "aws_sns_topic_subscription" "email_sub" {
  count     = var.alert_email != "" ? 1 : 0
  topic_arn = aws_sns_topic.ecs_alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# CloudWatch Alarm: High CPU Utilization on Backend (> 70%)
resource "aws_cloudwatch_metric_alarm" "backend_cpu_high" {
  alarm_name          = "${var.project_name}-${var.environment}-backend-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Average"
  threshold           = 70
  alarm_description   = "Alarm triggered when ECS Backend CPU utilization exceeds 70%"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.backend_service_name
  }

  alarm_actions = [aws_sns_topic.ecs_alerts.arn]
  ok_actions    = [aws_sns_topic.ecs_alerts.arn]
}

# CloudWatch Alarm: High Memory Utilization on Backend (> 80%)
resource "aws_cloudwatch_metric_alarm" "backend_memory_high" {
  alarm_name          = "${var.project_name}-${var.environment}-backend-memory-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "MemoryUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Average"
  threshold           = 80
  alarm_description   = "Alarm triggered when ECS Backend Memory utilization exceeds 80%"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.backend_service_name
  }

  alarm_actions = [aws_sns_topic.ecs_alerts.arn]
  ok_actions    = [aws_sns_topic.ecs_alerts.arn]
}

# CloudWatch Alarm: High CPU Utilization on Frontend (> 70%)
resource "aws_cloudwatch_metric_alarm" "frontend_cpu_high" {
  alarm_name          = "${var.project_name}-${var.environment}-frontend-cpu-high"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/ECS"
  period              = 60
  statistic           = "Average"
  threshold           = 70
  alarm_description   = "Alarm triggered when ECS Frontend CPU utilization exceeds 70%"

  dimensions = {
    ClusterName = var.ecs_cluster_name
    ServiceName = var.frontend_service_name
  }

  alarm_actions = [aws_sns_topic.ecs_alerts.arn]
  ok_actions    = [aws_sns_topic.ecs_alerts.arn]
}

