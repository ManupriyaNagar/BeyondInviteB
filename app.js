import express from "express";
import cors from "cors";
import bodyParser from "body-parser"; // ✅ ESM import
import dotenv from "dotenv";
dotenv.config();

// Routes (convert require → import)
import authRoutes from "./routes/auth.js";
import invitationsRoutes from "./routes/invitations.js";
import categoriesRoutes from "./routes/categories.js";
import templatesRoutes from "./routes/templates.js";
import ordersRoutes from "./routes/orders.js";
import uploadRoutes from "./routes/uploads.js";
import wishlistRoutes from './routes/wishlist.js';
import userRoutes from "./routes/users.js";
// const userRoutes = require("./routes/users");



const app = express();
// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/api/categories", categoriesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/invitations", invitationsRoutes);
app.use("/api/templates", templatesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/upload", uploadRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use("/api/users", userRoutes);

// Serve static uploads folder
app.use("/uploads", express.static("uploads"));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Beyond Invite API is running!" });
});
// const templatesRouter = require('./routes/invitations');
// app.use('/api/invitations', templatesRouter);



// const cors = require("cors");
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Start server
const PORT = process.env.PORT || 5001;

// Test database connection before starting server
import pool from './db.js';

async function startServer() {
  // Skip DB check if SKIP_DB_CHECK is set
  if (process.env.SKIP_DB_CHECK === 'true') {
    console.log('⚠️  Skipping database connection check (SKIP_DB_CHECK=true)');
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`⚠️  Database connection not verified`);
    });
    return;
  }

  try {
    // Test database connection
    console.log('Testing database connection...');
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('✓ Database connected successfully');

    // Start the server
    app.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ Database: ${process.env.DATABASE_URL ? 'Cloud (DATABASE_URL)' : 'Local'}`);
    });
  } catch (err) {
    console.error('✗ Failed to connect to database:', err.message);
    console.error('Error code:', err.code);
    console.error('\nPlease check your database configuration and ensure:');
    console.error('1. Database server is running');
    console.error('2. DATABASE_URL or DB_* environment variables are set correctly');
    console.error('3. Database credentials are valid');
    console.error('4. Network allows connection to database host');
    console.error('\n💡 Tip: Set SKIP_DB_CHECK=true to start server without DB connection');
    process.exit(1);
  }
}

startServer();

