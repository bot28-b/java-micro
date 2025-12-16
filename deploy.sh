#!/bin/bash

set -e

# Configuration
GIT_REPO="https://github.com/bot28-b/java-micro.git"
DEPLOY_DIR="/home/ubuntu/ecommerce-demo"
BRANCH="main"

echo "=========================================="
echo "E-Commerce Application - Complete Deployment"
echo "=========================================="
echo ""

# Create deployment directory
echo "[1/7] Setting up deployment directory..."
sudo mkdir -p $DEPLOY_DIR
sudo chown -R $USER:$USER $DEPLOY_DIR
cd $DEPLOY_DIR

# Clone or update repository
if [ -d "$DEPLOY_DIR/.git" ]; then
    echo "[2/7] Updating existing repository..."
    git pull origin $BRANCH
else
    echo "[2/7] Cloning repository..."
    git clone -b $BRANCH $GIT_REPO .
fi

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "[3/7] Installing Docker..."
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo usermod -aG docker $USER
    newgrp docker
else
    echo "[3/7] Docker is already installed"
fi

# Stop and remove existing containers
echo "[4/7] Stopping and removing existing containers..."
docker stop user-service product-service frontend 2>/dev/null || true
docker rm user-service product-service frontend 2>/dev/null || true

# Build Docker images
echo "[5/7] Building Docker images..."
cd $DEPLOY_DIR/user-service
docker build -t user-service:latest .

cd $DEPLOY_DIR/product-service
docker build -t product-service:latest .

cd $DEPLOY_DIR/frontend
docker build -t frontend:latest .

# Run containers
echo "[6/7] Starting services..."
docker run -d --name user-service -p 8081:8081 user-service:latest
docker run -d --name product-service -p 8082:8082 product-service:latest
docker run -d --name frontend -p 3000:3000 frontend:latest

# Verify deployment
echo "[7/7] Verifying deployment..."
sleep 5  # Give containers time to start

echo ""
echo "=========================================="
echo "Deployment Complete!"
echo "=========================================="
echo "Services:"
echo "- User Service:    http://$(curl -s ifconfig.me):8081"
echo "- Product Service: http://$(curl -s ifconfig.me):8082"
echo "- Frontend:        http://$(curl -s ifconfig.me):3000"
echo ""
echo "Container Status:"
docker ps --format "{{.Names}}: {{.Status}}"
echo ""
echo "To view logs:"
echo "  docker logs -f user-service"
echo "  docker logs -f product-service"
echo "  docker logs -f frontend"
echo "=========================================="