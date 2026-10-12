output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = aws_ecs_cluster.application_cluster.name
}

output "ecs_cluster_id" {
  description = "ID of the ECS cluster"
  value       = aws_ecs_cluster.application_cluster.id
}

output "frontend_service_name" {
  description = "Name of Frontend ECS Service"
  value       = aws_ecs_service.frontend_service.name
}

output "backend_service_name" {
  description = "Name of Backend ECS Service"
  value       = aws_ecs_service.backend_service.name
}

output "ecs_execution_role_arn" {
  description = "ARN of ECS Task Execution Role"
  value       = aws_iam_role.ecs_execution_role.arn
}

output "ecs_task_role_arn" {
  description = "ARN of ECS Task Role"
  value       = aws_iam_role.ecs_task_role.arn
}