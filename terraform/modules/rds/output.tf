output "db_endpoint" {
  description = "RDS DB connection address (hostname)"
  value       = aws_db_instance.mysql.address
}

output "db_port" {
  description = "RDS DB connection port"
  value       = aws_db_instance.mysql.port
}

output "db_name" {
  description = "Database name"
  value       = aws_db_instance.mysql.db_name
}

output "db_username" {
  description = "Database master username"
  value       = aws_db_instance.mysql.username
}

output "db_instance_id" {
  description = "RDS instance ID"
  value       = aws_db_instance.mysql.id
}

output "rds_sg_id" {
  description = "RDS security group ID"
  value       = aws_security_group.rds_sg.id
}

output "master_user_secret_arn" {
  description = "ARN of the AWS Secrets Manager secret holding master DB credentials"
  value       = aws_db_instance.mysql.master_user_secret[0].secret_arn
}