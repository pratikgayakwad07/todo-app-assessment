output "alb_arn" {
  description = "ARN of ALB"
  value       = aws_lb.app_alb.arn
}

output "alb_dns_name" {
  description = "DNS name of the ALB"
  value       = aws_lb.app_alb.dns_name
}

output "frontend_target_group_arn" {
  description = "Target group ARN for frontend"
  value       = aws_lb_target_group.frontend_tg.arn
}

output "backend_target_group_arn" {
  description = "Target group ARN for backend"
  value       = aws_lb_target_group.backend_tg.arn
}