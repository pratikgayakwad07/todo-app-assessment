variable "aws_region" {
  type        = string
  description = "AWS Region to deploy resources"
  default     = "us-east-1"
}

variable "environment" {
  type        = string
  description = "Environment identifier (e.g. dev, prod)"
  default     = "dev"
}

variable "project_name" {
  type        = string
  description = "Name of the project"
  default     = "todo-app"
}

# VPC Configuration
variable "vpc_cidr" {
  type        = string
  description = "CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  type        = list(string)
  description = "CIDR blocks for public subnets"
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnet_cidr" {
  type        = list(string)
  description = "CIDR blocks for private subnets"
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "create_nat_gateway" {
  type        = bool
  description = "Flag to create NAT Gateway for private subnet outbound internet access"
  default     = true
}

# RDS Configuration
variable "db_name" {
  type        = string
  description = "Database name"
  default     = "todo_db"
}

variable "db_username" {
  type        = string
  description = "Master username for RDS MySQL"
  default     = "admin"
}

variable "engine_version" {
  type        = string
  description = "MySQL engine version"
  default     = "8.0"
}

variable "instance_class" {
  type        = string
  description = "RDS instance class"
  default     = "db.t3.micro"
}

variable "allocated_storage" {
  type        = number
  description = "Initial allocated storage in GB"
  default     = 20
}

variable "max_allocated_storage" {
  type        = number
  description = "Max storage limit for storage autoscaling in GB"
  default     = 50
}

# ECS Configuration
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

# Monitoring & Alerts
variable "alert_email" {
  type        = string
  description = "Email address to receive CloudWatch CPU/Memory alarm alerts via SNS"
  default     = ""
}

# GitHub OIDC
variable "github_repo" {
  type        = string
  description = "GitHub repository in the format owner/repository for OIDC role trust policy"
  default     = "pratikgayakwad07/todo-app-assessment"
}