provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "tfstate" {
  bucket = "tfstate-devops-tercer-parcial"

  tags = {
    Name = "terraform-state-devops-tercer-parcial"
    Project = "devops-tercer-parcial"
  }
}

resource "aws_s3_bucket_versioning" "tfstate_version" {
  bucket = aws_s3_bucket.tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "lock_table" {
  name         = "terraform-lock-table-devops-tercer-parcial"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name    = "terraform-lock-table-devops-tercer-parcial"
    Project = "devops-tercer-parcial"
  }
}
