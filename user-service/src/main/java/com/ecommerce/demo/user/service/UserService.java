package com.ecommerce.demo.user.service;

import com.ecommerce.demo.user.model.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class UserService {
    private final Map<String, User> users = new ConcurrentHashMap<>();
    
    public UserService() {
        initializeSampleUsers();
    }
    
    private void initializeSampleUsers() {
        User admin = new User("admin", "admin@ecommerce.com", "admin123", "Admin", "User");
        admin.setId(UUID.randomUUID().toString());
        admin.setRole("ADMIN");
        users.put(admin.getId(), admin);
        
        User user1 = new User("john_doe", "john@example.com", "password123", "John", "Doe");
        user1.setId(UUID.randomUUID().toString());
        users.put(user1.getId(), user1);
        
        User user2 = new User("jane_smith", "jane@example.com", "password123", "Jane", "Smith");
        user2.setId(UUID.randomUUID().toString());
        users.put(user2.getId(), user2);
    }
    
    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }
    
    public User getUserById(String id) {
        return users.get(id);
    }
    
    public User getUserByUsername(String username) {
        return users.values().stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst()
                .orElse(null);
    }
    
    public User getUserByEmail(String email) {
        return users.values().stream()
                .filter(user -> user.getEmail().equals(email))
                .findFirst()
                .orElse(null);
    }
    
    public User createUser(User user) {
        if (getUserByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        if (getUserByEmail(user.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setId(UUID.randomUUID().toString());
        user.setUpdatedAt(java.time.LocalDateTime.now());
        users.put(user.getId(), user);
        return user;
    }
    
    public User updateUser(String id, User userDetails) {
        User user = users.get(id);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        
        if (!user.getUsername().equals(userDetails.getUsername()) && 
            getUserByUsername(userDetails.getUsername()) != null) {
            throw new RuntimeException("Username already exists");
        }
        
        if (!user.getEmail().equals(userDetails.getEmail()) && 
            getUserByEmail(userDetails.getEmail()) != null) {
            throw new RuntimeException("Email already exists");
        }
        
        user.setUsername(userDetails.getUsername());
        user.setEmail(userDetails.getEmail());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setUpdatedAt(java.time.LocalDateTime.now());
        
        if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
            user.setPassword(userDetails.getPassword());
        }
        
        return user;
    }
    
    public void deleteUser(String id) {
        User user = users.get(id);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        if ("ADMIN".equals(user.getRole())) {
            throw new RuntimeException("Cannot delete admin user");
        }
        users.remove(id);
    }
    
    public User authenticate(String username, String password) {
        User user = getUserByUsername(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}
