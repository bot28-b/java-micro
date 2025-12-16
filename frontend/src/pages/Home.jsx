import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ products, users }) => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          E-Commerce Demo Application
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A microservices-based e-commerce platform built with Java 21 and React.
          Perfect for DevOps demonstrations and student practice.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Products</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Browse our catalog of {products.length} products across multiple categories.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Electronics:</span> {products.filter(p => p.category === 'Electronics').length}
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Clothing:</span> {products.filter(p => p.category === 'Clothing').length}
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Books:</span> {products.filter(p => p.category === 'Books').length}
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Total Items:</span> {products.reduce((sum, p) => sum + p.stockQuantity, 0)}
              </div>
            </div>
            <Link to="/products" className="btn btn-primary inline-block">
              View Products
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Users</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Manage {users.length} registered users in the system.
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Admin Users:</span> {users.filter(u => u.role === 'ADMIN').length}
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Regular Users:</span> {users.filter(u => u.role === 'USER').length}
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Total Users:</span> {users.length}
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <span className="font-medium">Active Today:</span> {users.length}
              </div>
            </div>
            <Link to="/users" className="btn btn-primary inline-block">
              View Users
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4 text-purple-600">System Information</h2>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">User Service</h3>
            <p className="text-gray-600">Port: 8081</p>
            <p className="text-gray-600">Java 21 + Spring Boot</p>
            <p className="text-gray-600">In-memory storage</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Product Service</h3>
            <p className="text-gray-600">Port: 8082</p>
            <p className="text-gray-600">Java 21 + Spring Boot</p>
            <p className="text-gray-600">In-memory storage</p>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <h3 className="font-medium mb-2">Frontend</h3>
            <p className="text-gray-600">Port: 3000</p>
            <p className="text-gray-600">React + Vite + TailwindCSS</p>
            <p className="text-gray-600">Docker ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
