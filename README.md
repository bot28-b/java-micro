# E-Commerce Demo Application

A microservices-based e-commerce platform built with Java 21 and React, designed for DevOps demonstrations and student practice.

## Architecture

### Services
- **User Service** (Port 8081): User management, authentication, and profiles
- **Product Service** (Port 8082): Product catalog, inventory, and categories  
- **React Frontend** (Port 3000): Modern web interface with Vite and TailwindCSS

### Technology Stack
- **Backend**: Java 21, Spring Boot 3.2.0, Maven
- **Frontend**: React 18, Vite, TailwindCSS
- **Containerization**: Docker
- **Database**: In-memory (no external database required)

## Quick Start

### Prerequisites
- Docker installed
- Java 21 (for local development)
- Node.js 18+ (for frontend development)

### Build and Deploy
```bash
# Build all Docker images
./build.sh

# Deploy all services
./deploy.sh
```

### Access Points
- Frontend: http://localhost:3000
- User Service API: http://localhost:8081
- Product Service API: http://localhost:8082

## API Endpoints

### User Service
- `GET /api/users` - List all users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Product Service
- `GET /api/products` - List all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/products` - Create product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Sample Data

### Users
- Admin: `admin / admin123`
- User: `john_doe / password123`
- User: `jane_smith / password123`

### Products
- Electronics: Laptops, phones, headphones, watches
- Clothing: T-shirts, jeans
- Books: Programming guides, novels

## Deployment on AWS EC2

### Steps
1. Launch EC2 instance (Ubuntu 22.04 recommended)
2. Install Docker
3. Clone this repository
4. Run `./build.sh` and `./deploy.sh`
5. Access via EC2 public IP:3000

### Docker Commands
```bash
# Build individual service
docker build -t user-service:latest ./user-service
docker build -t product-service:latest ./product-service
docker build -t frontend:latest ./frontend

# Run individual service
docker run -d -p 8081:8081 --name user-service user-service:latest
docker run -d -p 8082:8082 --name product-service product-service:latest
docker run -d -p 3000:3000 --name frontend frontend:latest
```

## Development

### Local Development
```bash
# User Service
cd user-service
mvn spring-boot:run

# Product Service  
cd product-service
mvn spring-boot:run

# Frontend
cd frontend
npm install
npm run dev
```

## Features for Students
- Microservices architecture
- REST API design
- Docker containerization
- No database setup required
- Real-world e-commerce functionality
- CORS configuration
- Input validation
- Error handling

## License
MIT License - Free for educational use
# java-micro
