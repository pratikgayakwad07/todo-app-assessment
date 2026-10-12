# 1. VPC Module
module "vpc" {
  source = "./modules/vpc"

  vpc_cidr            = var.vpc_cidr
  public_subnet_cidr  = var.public_subnet_cidr
  private_subnet_cidr = var.private_subnet_cidr
  create_nat_gateway  = var.create_nat_gateway
}

# 2. Security Groups Module
module "sg" {
  source = "./modules/sg"

  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.vpc.vpc_output
}

# 3. Application Load Balancer Module
module "alb" {
  source = "./modules/ALB"

  project_name   = var.project_name
  environment    = var.environment
  vpc_id         = module.vpc.vpc_output
  public_subnets = module.vpc.public_subnets
  alb_sg_id      = module.sg.alb_sg_id
}

# 4. Amazon Elastic Container Registry (ECR) Module
module "ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  environment  = var.environment
}

# 5. Amazon Relational Database Service (RDS MySQL) with Secrets Manager
module "rds" {
  source = "./modules/rds"

  project_name          = var.project_name
  environment           = var.environment
  vpc_id                = module.vpc.vpc_output
  private_subnets       = module.vpc.private_subnets
  backend_sg_id         = module.sg.backend_sg_id
  db_name               = var.db_name
  db_username           = var.db_username
  engine_version        = var.engine_version
  instance_class        = var.instance_class
  allocated_storage     = var.allocated_storage
  max_allocated_storage = var.max_allocated_storage
}

# 6. Amazon ECS (Fargate) Module for Frontend and Backend
module "ecs" {
  source = "./modules/ecs"

  project_name              = var.project_name
  environment               = var.environment
  vpc_id                    = module.vpc.vpc_output
  aws_region                = var.aws_region
  public_subnets            = module.vpc.public_subnets
  private_subnets           = module.vpc.private_subnets
  frontend_repo_url         = module.ecr.frontend_repo_url
  backend_repo_url          = module.ecr.backend_repo_url
  frontend_target_group_arn = module.alb.frontend_target_group_arn
  backend_target_group_arn  = module.alb.backend_target_group_arn
  frontend_sg_id            = module.sg.frontend_sg_id
  backend_sg_id             = module.sg.backend_sg_id

  # Secrets Manager integration for database credentials
  db_secret_arn = module.rds.master_user_secret_arn
  db_host       = module.rds.db_endpoint
  db_name       = module.rds.db_name

  frontend_desired_count = var.frontend_desired_count
  backend_desired_count  = var.backend_desired_count
}

# 7. CloudWatch Alarms and SNS Alerts Module
module "monitoring" {
  source = "./modules/monitoring"

  project_name          = var.project_name
  environment           = var.environment
  ecs_cluster_name      = module.ecs.ecs_cluster_name
  frontend_service_name = module.ecs.frontend_service_name
  backend_service_name  = module.ecs.backend_service_name
  alert_email           = var.alert_email
}

# 8. GitHub Actions OIDC Authentication Role Module
module "oidc" {
  source = "./modules/oidc"

  project_name = var.project_name
  github_repo  = var.github_repo
}