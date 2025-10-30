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

// Serve static uploads folder
app.use("/uploads", express.static("uploads"));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ message: "Beyond Invite API is running!" });
});
// const templatesRouter = require('./routes/invitations');
// app.use('/api/invitations', templatesRouter);

const userRoutes = require("./routes/users");
app.use("/api/users", userRoutes);

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
