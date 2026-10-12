variable "project_name" {
  type        = string
  description = "Project name"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "ecs_cluster_name" {
  type        = string
  description = "ECS Cluster Name to monitor"
}

variable "backend_service_name" {
  type        = string
  description = "Backend ECS Service Name to monitor"
}

variable "frontend_service_name" {
  type        = string
  description = "Frontend ECS Service Name to monitor"
}

variable "alert_email" {
  type        = string
  description = "Email address for CloudWatch alarm notifications via SNS"
  default     = ""
}

