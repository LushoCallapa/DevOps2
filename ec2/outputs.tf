output "vpc_id" {
  description = "VPC id"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = aws_subnet.public[*].id
}

output "web_instance_public_ip" {
  description = "Public IP of the web EC2 instance"
  value       = aws_instance.web_server.public_ip
}
