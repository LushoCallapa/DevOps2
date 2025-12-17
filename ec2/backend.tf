terraform {
  backend "s3" {
    bucket         = "tfstate-devops-tercer-parcial"
    key            = "global/s3/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock-table-devops-tercer-parcial"
    encrypt        = true
  }
}
