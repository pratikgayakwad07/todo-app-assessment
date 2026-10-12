variable "project_name" {
  type        = string
  description = "Project name"
}

variable "environment" {
  type        = string
  description = "Environment name"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID"
}

variable "public_subnets" {
  type        = list(string)
  description = "Public Subnets for ECS Frontend tasks"
}

variable "private_subnets" {
  type        = list(string)
  description = "Private Subnets for ECS Backend tasks"
}

variable "frontend_repo_url" {
  type        = string
  description = "Frontend ECR repository URL"
}

variable "backend_repo_url" {
  type        = string
  description = "Backend ECR repository URL"
}

variable "frontend_target_group_arn" {
  type        = string
  description = "ALB target group ARN for frontend"
}

variable "backend_target_group_arn" {
  type        = string
  description = "ALB target group ARN for backend"
}

variable "frontend_sg_id" {
  type        = string
  description = "Security group ID for frontend ECS tasks"
}

variable "backend_sg_id" {
  type        = string
  description = "Security group ID for backend ECS tasks"
}

variable "db_secret_arn" {
  type        = string
  description = "AWS Secrets Manager ARN containing DB username and password"
}

variable "db_host" {
  type        = string
  description = "RDS DB Hostname endpoint"
}

variable "db_name" {
  type        = string
  description = "Database name"
}

variable "frontend_desired_count" {
  type        = number
  description = "Desired number of Frontend Fargate tasks"
  default     = 1
}

variable "backend_desired_count" {
  type        = number
  description = "Desired number of Backend Fargate tasks"
  default     = 1
}

variable "aws_region" {
  type        = string
  description = "AWS region for CloudWatch logs configuration"
}