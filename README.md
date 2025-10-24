# bInvite Backend Setup

## Database Setup

### 1. Create Database and Tables

Run the initialization script to create all necessary tables:

```sql
-- Connect to your MySQL server and run:
source database/init.sql
```

Or manually create the database:

```sql
CREATE DATABASE binvite_db;
USE binvite_db;
```

Then run the individual table creation scripts:
- `database/init.sql` - Complete setup with sample data

### 2. Environment Variables

Create a `.env` file in the backend root directory:

```env
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=binvite_db
PORT=5001
JWT_SECRET=your_jwt_secret_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Orders
- `GET /api/orders` - Get all orders
- `GET /api/orders/:id` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order
- `GET /api/orders/stats` - Get order statistics

### Templates
- `GET /api/templates` - Get all templates
- `POST /api/templates` - Create new template
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### Invitations
- `GET /api/invitations` - Get all invitations
- `POST /api/invitations` - Create new invitation

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

## Database Schema

### Orders Table
```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    invitation_type VARCHAR(100) NOT NULL,
    status ENUM('Pending', 'In Progress', 'Completed', 'Cancelled'),
    amount DECIMAL(10, 2) NOT NULL,
    template_id INT,
    order_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Testing the API

You can test the API endpoints using tools like Postman or curl:

```bash
# Get all orders
curl http://localhost:5001/api/orders

# Create a new order
curl -X POST http://localhost:5001/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "Test Customer",
    "email": "test@example.com",
    "phone": "+1234567890",
    "type": "Wedding",
    "status": "Pending",
    "amount": 299.00,
    "notes": "Test order"
  }'
```

## Frontend Integration

The frontend is configured to connect to the backend API at `http://localhost:5001/api`. Make sure both servers are running:

1. Backend: `npm run dev` (port 5001)
2. Frontend: `npm run dev` (port 3000)

## Troubleshooting

### Database Connection Issues
1. Ensure MySQL is running
2. Check your `.env` file credentials
3. Verify the database exists: `SHOW DATABASES;`
4. Check if tables exist: `SHOW TABLES;`

### CORS Issues
The backend is configured with CORS to allow requests from the frontend. If you encounter CORS errors, check the CORS configuration in `app.js`.

### Port Conflicts
If port 5001 is in use, change the PORT in your `.env` file and update the frontend API URL in `bInvite/src/lib/api.js`.