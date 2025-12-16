import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './pages/ProductList';
import UserList from './pages/UserList';
import Home from './pages/Home';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [productsResponse, usersResponse] = await Promise.all([
        fetch('http://localhost:8082/api/products'),
        fetch('http://localhost:8081/api/users')
      ]);

      const productsData = await productsResponse.json();
      const usersData = await usersResponse.json();

      setProducts(productsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">E-Commerce Demo</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200">Home</Link>
              <Link to="/products" className="hover:text-blue-200">Products</Link>
              <Link to="/users" className="hover:text-blue-200">Users</Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home products={products} users={users} />} />
            <Route path="/products" element={<ProductList products={products} />} />
            <Route path="/users" element={<UserList users={users} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
