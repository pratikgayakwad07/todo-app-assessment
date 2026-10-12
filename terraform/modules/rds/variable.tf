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

variable "private_subnets" {
  type        = list(string)
  description = "Private Subnet IDs"
}

variable "backend_sg_id" {
  type        = string
  description = "Security group ID of ECS backend"
}

variable "db_name" {
  type        = string
  description = "Database name"
  default     = "todo_db"
}

variable "db_username" {
  type        = string
  description = "Master database username"
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
  description = "Allocated storage in GB"
  default     = 20
}

variable "max_allocated_storage" {
  type        = number
  description = "Max storage autoscaling limit in GB"
  default     = 50
}