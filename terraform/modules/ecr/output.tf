output "frontend_repo_url" {
  description = "ECR URL for frontend repository"
  value       = aws_ecr_repository.frontend.repository_url
}

output "frontend_repo_name" {
  description = "ECR Name for frontend repository"
  value       = aws_ecr_repository.frontend.name
}

output "backend_repo_url" {
  description = "ECR URL for backend repository"
  value       = aws_ecr_repository.backend.repository_url
}

output "backend_repo_name" {
  description = "ECR Name for backend repository"
  value       = aws_ecr_repository.backend.name
}