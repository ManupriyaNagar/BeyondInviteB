import express from "express";
import dotenv from "dotenv";
import invitationRoutes from "./routes/invitationRoutes.js"; // correct path

dotenv.config();
const app = express();

app.use(express.json()); // <--- needed to parse JSON bodies

// Test route
app.get("/", (req, res) => res.send("API is running..."));

// Add this line **after middleware and before error handling**
app.use("/api/invitations", invitationRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
