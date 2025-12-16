#!/bin/bash

echo "Cleaning up E-Commerce Demo Application..."

# Stop and remove containers
echo "Stopping containers..."
docker stop user-service product-service frontend 2>/dev/null || true

echo "Removing containers..."
docker rm user-service product-service frontend 2>/dev/null || true

# Remove images (optional)
read -p "Remove Docker images? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Removing Docker images..."
    docker rmi user-service:latest product-service:latest frontend:latest 2>/dev/null || true
fi

echo "Cleanup completed!"
