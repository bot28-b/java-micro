#!/bin/bash

echo "Building E-Commerce Demo Application..."

# Build User Service
echo "Building User Service..."
cd user-service
docker build -t user-service:latest .
cd ..

# Build Product Service
echo "Building Product Service..."
cd product-service
docker build -t product-service:latest .
cd ..

# Build Frontend
echo "Building Frontend..."
cd frontend
docker build -t frontend:latest .
cd ..

echo "Build completed!"
echo "Images created:"
echo "  - user-service:latest"
echo "  - product-service:latest"
echo "  - frontend:latest"
