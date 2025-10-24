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

-- Insert sample orders for testing
INSERT INTO orders (customer_name, customer_email, customer_phone, invitation_type, status, amount, template_id, order_date, notes) VALUES
('Sarah Johnson', 'sarah@email.com', '+1 (555) 123-4567', 'Wedding', 'Completed', 299.00, 1, '2025-01-15', 'Rush order for wedding next month'),
('Mike Chen', 'mike@email.com', '+1 (555) 234-5678', 'Baby Shower', 'In Progress', 149.00, 2, '2025-01-14', 'Blue theme requested'),
('Emma Davis', 'emma@email.com', '+1 (555) 345-6789', 'Corporate', 'Pending', 399.00, 3, '2025-01-13', 'Company annual meeting invitation'),
('John Smith', 'john@email.com', '+1 (555) 456-7890', 'E-Invitation', 'Completed', 99.00, 4, '2025-01-12', 'Digital only, no printing required'),
('Lisa Wang', 'lisa@email.com', '+1 (555) 567-8901', 'Wedding', 'In Progress', 459.00, 1, '2025-01-11', 'Premium package with RSVP tracking'),
('David Brown', 'david@email.com', '+1 (555) 678-9012', 'Corporate', 'Completed', 299.00, 3, '2025-01-10', 'Quarterly business review invitation');