terraform {
  backend "s3" {
    bucket       = "terraform-state-bucket-765"
    key          = "CN-task/todo-app/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
    encrypt      = true
  }
}
