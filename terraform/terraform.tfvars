aws_region  = "us-east-1"
environment = "dev"
project_name = "todo-app"

# Networking
vpc_cidr = "10.0.0.0/16"

public_subnet_cidr = [
  "10.0.1.0/24",
  "10.0.2.0/24"
]

private_subnet_cidr = [
  "10.0.3.0/24",
  "10.0.4.0/24"
]

create_nat_gateway = true

# RDS Database Configuration
db_name     = "todo_db"
db_username = "admin"

engine_version = "8.0"
instance_class = "db.t3.micro"

allocated_storage     = 20
max_allocated_storage = 50

# ECS Fargate Desired Tasks
frontend_desired_count = 1
backend_desired_count  = 1

# Monitoring Alerts (Optional: Set your alert email)
alert_email = "pratikgayakwad322@gmail.com"

# GitHub OIDC repo trust (Format: github_username/repo_name)
github_repo = "pratikgayakwad07/todo-app-assessment"