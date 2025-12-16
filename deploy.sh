#!/bin/bash

echo "Deploying E-Commerce Demo Application..."

# Stop and remove existing containers
echo "Stopping existing containers..."
docker stop user-service product-service frontend 2>/dev/null || true
docker rm user-service product-service frontend 2>/dev/null || true

# Run User Service
echo "Starting User Service..."
docker run -d --name user-service -p 8081:8081 user-service:latest

# Run Product Service
echo "Starting Product Service..."
docker run -d --name product-service -p 8082:8082 product-service:latest

# Run Frontend
echo "Starting Frontend..."
docker run -d --name frontend -p 3000:3000 frontend:latest

echo "Deployment completed!"
echo "Services are running at:"
echo "  - Frontend: http://localhost:3000"
echo "  - User Service: http://localhost:8081"
echo "  - Product Service: http://localhost:8082"

echo ""
echo "Checking container status..."
docker ps --filter "name=user-service" --filter "name=product-service" --filter "name=frontend"
