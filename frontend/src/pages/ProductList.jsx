import React, { useState, useEffect } from 'react';

const ProductList = ({ products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Electronics',
    stockQuantity: ''
  });

  const categories = ['All', 'Electronics', 'Clothing', 'Books'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stockQuantity: parseInt(newProduct.stockQuantity)
        }),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProducts([...products, createdProduct]);
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: 'Electronics',
          stockQuantity: ''
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8082/api/products/${productId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setProducts(products.filter(p => p.id !== productId));
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary"
        >
          {showAddForm ? 'Cancel' : 'Add Product'}
        </button>
      </div>

      {showAddForm && (
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Price</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="form-input"
                />
              </div>
              <div>
                <label className="form-label">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="form-input"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
              </div>
              <div>
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  required
                  value={newProduct.stockQuantity}
                  onChange={(e) => setNewProduct({...newProduct, stockQuantity: e.target.value})}
                  className="form-input"
                />
              </div>
            </div>
            <div>
              <label className="form-label">Description</label>
              <textarea
                required
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="form-input"
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </form>
        </div>
      )}

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input flex-1"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-input"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xl font-bold text-green-600">${product.price}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  product.stockQuantity > 50 ? 'bg-green-100 text-green-800' :
                  product.stockQuantity > 10 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Stock: {product.stockQuantity}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{product.category}</span>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="btn btn-danger text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
