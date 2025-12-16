package com.ecommerce.demo.product.service;

import com.ecommerce.demo.product.model.Product;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class ProductService {
    private final Map<String, Product> products = new ConcurrentHashMap<>();
    
    public ProductService() {
        initializeSampleProducts();
    }
    
    private void initializeSampleProducts() {
        Product laptop = new Product("Laptop Pro 15", "High-performance laptop with 16GB RAM and 512GB SSD", new BigDecimal("999.99"), "Electronics", 50);
        laptop.setId(UUID.randomUUID().toString());
        laptop.setImageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300");
        products.put(laptop.getId(), laptop);
        
        Product phone = new Product("Smartphone X", "Latest smartphone with 5G and 128GB storage", new BigDecimal("699.99"), "Electronics", 100);
        phone.setId(UUID.randomUUID().toString());
        phone.setImageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300");
        products.put(phone.getId(), phone);
        
        Product headphones = new Product("Wireless Headphones", "Noise-cancelling Bluetooth headphones", new BigDecimal("199.99"), "Electronics", 75);
        headphones.setId(UUID.randomUUID().toString());
        headphones.setImageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300");
        products.put(headphones.getId(), headphones);
        
        Product tshirt = new Product("Cotton T-Shirt", "Comfortable 100% cotton t-shirt", new BigDecimal("29.99"), "Clothing", 200);
        tshirt.setId(UUID.randomUUID().toString());
        tshirt.setImageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300");
        products.put(tshirt.getId(), tshirt);
        
        Product jeans = new Product("Denim Jeans", "Classic fit denim jeans", new BigDecimal("79.99"), "Clothing", 150);
        jeans.setId(UUID.randomUUID().toString());
        jeans.setImageUrl("https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300");
        products.put(jeans.getId(), jeans);
        
        Product book = new Product("Java Programming Guide", "Comprehensive guide to Java programming", new BigDecimal("49.99"), "Books", 80);
        book.setId(UUID.randomUUID().toString());
        book.setImageUrl("https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300");
        products.put(book.getId(), book);
        
        Product novel = new Product("Mystery Novel", "Bestselling mystery thriller novel", new BigDecimal("24.99"), "Books", 120);
        novel.setId(UUID.randomUUID().toString());
        novel.setImageUrl("https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300");
        products.put(novel.getId(), novel);
        
        Product watch = new Product("Smart Watch", "Fitness tracking smartwatch with heart rate monitor", new BigDecimal("249.99"), "Electronics", 60);
        watch.setId(UUID.randomUUID().toString());
        watch.setImageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300");
        products.put(watch.getId(), watch);
    }
    
    public List<Product> getAllProducts() {
        return products.values().stream()
                .filter(Product::isActive)
                .collect(Collectors.toList());
    }
    
    public List<Product> getProductsByCategory(String category) {
        return products.values().stream()
                .filter(product -> product.isActive() && product.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }
    
    public Product getProductById(String id) {
        Product product = products.get(id);
        return (product != null && product.isActive()) ? product : null;
    }
    
    public List<Product> searchProducts(String keyword) {
        String lowerKeyword = keyword.toLowerCase();
        return products.values().stream()
                .filter(product -> product.isActive() && 
                    (product.getName().toLowerCase().contains(lowerKeyword) ||
                     product.getDescription().toLowerCase().contains(lowerKeyword) ||
                     product.getCategory().toLowerCase().contains(lowerKeyword)))
                .collect(Collectors.toList());
    }
    
    public Product createProduct(Product product) {
        product.setId(UUID.randomUUID().toString());
        product.setUpdatedAt(java.time.LocalDateTime.now());
        products.put(product.getId(), product);
        return product;
    }
    
    public Product updateProduct(String id, Product productDetails) {
        Product product = products.get(id);
        if (product == null) {
            throw new RuntimeException("Product not found");
        }
        
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setImageUrl(productDetails.getImageUrl());
        product.setActive(productDetails.isActive());
        product.setUpdatedAt(java.time.LocalDateTime.now());
        
        return product;
    }
    
    public void deleteProduct(String id) {
        Product product = products.get(id);
        if (product == null) {
            throw new RuntimeException("Product not found");
        }
        product.setActive(false);
        product.setUpdatedAt(java.time.LocalDateTime.now());
    }
    
    public List<String> getAllCategories() {
        return products.values().stream()
                .filter(Product::isActive)
                .map(Product::getCategory)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }
    
    public void updateStock(String id, Integer quantity) {
        Product product = products.get(id);
        if (product == null) {
            throw new RuntimeException("Product not found");
        }
        product.setStockQuantity(quantity);
        product.setUpdatedAt(java.time.LocalDateTime.now());
    }
}
