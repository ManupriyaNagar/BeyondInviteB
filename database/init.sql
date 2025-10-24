-- Database initialization script for bInvite
-- Run this script to create all necessary tables

-- Create database (if not exists)
CREATE DATABASE IF NOT EXISTS binvite_db;
USE binvite_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT IGNORE INTO categories (id, name) VALUES
(1, 'Wedding'),
(2, 'Baby Shower'),
(3, 'Corporate'),
(4, 'E-Invitation'),
(5, 'Birthday'),
(6, 'Anniversary');

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category_id INT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    image_url VARCHAR(500),
    description TEXT,
    created_by INT,
    status ENUM('active', 'draft', 'inactive') DEFAULT 'active',
    orders INT DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 4.5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Create invitations table
CREATE TABLE IF NOT EXISTS invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    orders INT DEFAULT 0,
    status ENUM('active', 'draft', 'inactive') DEFAULT 'active',
    rating DECIMAL(3, 2) DEFAULT 4.5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    invitation_type VARCHAR(100) NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed', 'Cancelled') DEFAULT 'Pending',
    amount DECIMAL(10, 2) NOT NULL,
    template_id INT,
    order_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customer_email (customer_email),
    INDEX idx_status (status),
    INDEX idx_order_date (order_date),
    FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE SET NULL
);

-- Insert sample data for testing

-- Sample templates
INSERT IGNORE INTO templates (id, title, category_id, price, image_url, description, created_by, orders, rating) VALUES
(1, 'Elegant Wedding Invitation', 1, 299.00, '/wedding.jpeg', 'Beautiful and elegant wedding invitation perfect for your special day', 1, 234, 4.8),
(2, 'Baby Shower Bliss', 2, 149.00, '/baby-shower.jpeg', 'Adorable baby shower invitation with cute design elements', 1, 156, 4.6),
(3, 'Corporate Event Invitation', 3, 399.00, '/corporate.jpeg', 'Professional corporate event invitation with modern design', 1, 89, 4.7),
(4, 'Digital E-Invitation', 4, 99.00, '/e-invitation.jpeg', 'Modern digital invitation perfect for online events', 1, 345, 4.9);

-- Sample invitations
INSERT IGNORE INTO invitations (id, name, category, image, price, orders, rating) VALUES
(1, 'Classic Wedding Suite', 'Wedding', '/wedding.jpeg', 299.00, 234, 4.8),
(2, 'Sweet Baby Shower', 'Baby Shower', '/baby-shower.jpeg', 149.00, 156, 4.6),
(3, 'Business Conference', 'Corporate', '/corporate.jpeg', 399.00, 89, 4.7),
(4, 'Digital Party Invite', 'E-Invitation', '/e-invitation.jpeg', 99.00, 345, 4.9);

-- Sample orders
INSERT IGNORE INTO orders (id, customer_name, customer_email, customer_phone, invitation_type, status, amount, template_id, order_date, notes) VALUES
(1, 'Sarah Johnson', 'sarah@email.com', '+1 (555) 123-4567', 'Wedding', 'Completed', 299.00, 1, '2025-01-15', 'Rush order for wedding next month'),
(2, 'Mike Chen', 'mike@email.com', '+1 (555) 234-5678', 'Baby Shower', 'In Progress', 149.00, 2, '2025-01-14', 'Blue theme requested'),
(3, 'Emma Davis', 'emma@email.com', '+1 (555) 345-6789', 'Corporate', 'Pending', 399.00, 3, '2025-01-13', 'Company annual meeting invitation'),
(4, 'John Smith', 'john@email.com', '+1 (555) 456-7890', 'E-Invitation', 'Completed', 99.00, 4, '2025-01-12', 'Digital only, no printing required'),
(5, 'Lisa Wang', 'lisa@email.com', '+1 (555) 567-8901', 'Wedding', 'In Progress', 459.00, 1, '2025-01-11', 'Premium package with RSVP tracking'),
(6, 'David Brown', 'david@email.com', '+1 (555) 678-9012', 'Corporate', 'Completed', 299.00, 3, '2025-01-10', 'Quarterly business review invitation');

-- Create a default admin user (password: 'admin123' - hashed)
INSERT IGNORE INTO users (id, name, email, password) VALUES
(1, 'Admin User', 'admin@binvite.com', '$2b$10$rOvHdKzjbQlqJ5vJ5vJ5vOJ5vJ5vJ5vJ5vJ5vJ5vJ5vJ5vJ5vJ5vJ');