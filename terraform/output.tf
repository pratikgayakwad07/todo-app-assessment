# VPC Outputs
output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_output
}

output "public_subnets" {
  description = "List of public subnet IDs"
  value       = module.vpc.public_subnets
}

output "private_subnets" {
  description = "List of private subnet IDs"
  value       = module.vpc.private_subnets
}

# ALB Outputs
output "alb_dns_name" {
  description = "Public URL/DNS name of the Application Load Balancer"
  value       = module.alb.alb_dns_name
}

# ECR Outputs
output "ecr_frontend_repository_url" {
  description = "ECR Repository URL for frontend"
  value       = module.ecr.frontend_repo_url
}

output "ecr_backend_repository_url" {
  description = "ECR Repository URL for backend"
  value       = module.ecr.backend_repo_url
}

# RDS Outputs
output "rds_endpoint" {
  description = "RDS MySQL Host Endpoint"
  value       = module.rds.db_endpoint
}

output "rds_database_name" {
  description = "RDS MySQL Database Name"
  value       = module.rds.db_name
}

output "rds_master_user_secret_arn" {
  description = "ARN of AWS Secrets Manager secret storing RDS master credentials"
  value       = module.rds.master_user_secret_arn
}

# ECS Outputs
output "ecs_cluster_name" {
  description = "ECS Cluster Name"
  value       = module.ecs.ecs_cluster_name
}

output "ecs_frontend_service_name" {
  description = "ECS Frontend Service Name"
  value       = module.ecs.frontend_service_name
}

output "ecs_backend_service_name" {
  description = "ECS Backend Service Name"
  value       = module.ecs.backend_service_name
}

# Monitoring Outputs
output "sns_alert_topic_arn" {
  description = "SNS Topic ARN for CloudWatch alerts"
  value       = module.monitoring.sns_topic_arn
}

# GitHub OIDC Output
output "github_actions_role_arn" {
  description = "IAM Role ARN configured for GitHub Actions OIDC"
  value       = module.oidc.github_actions_role_arn
}