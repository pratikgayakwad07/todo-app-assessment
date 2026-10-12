output "github_actions_role_arn" {
  description = "IAM Role ARN to configure in GitHub Actions Secrets/Variables"
  value       = aws_iam_role.github_actions_role.arn
}

