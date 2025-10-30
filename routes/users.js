// routes/users.js
const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ GET all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, phone, segment, totalSpent, orders, rating, lastOrder, status FROM users"
    );
    res.json({ users: rows });
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// ✅ POST - Create a new user
router.post("/", async (req, res) => {
  const { name, email, phone, segment, totalSpent, orders, rating, lastOrder, status } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO users (name, email, phone, segment, totalSpent, orders, rating, lastOrder, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, segment, totalSpent, orders, rating, lastOrder, status]
    );

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// ✅ PUT - Update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, segment, totalSpent, orders, rating, lastOrder, status } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE users SET 
        name = ?, 
        email = ?, 
        phone = ?, 
        segment = ?, 
        totalSpent = ?, 
        orders = ?, 
        rating = ?, 
        lastOrder = ?, 
        status = ?
      WHERE id = ?`,
      [name, email, phone, segment, totalSpent, orders, rating, lastOrder, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ✅ DELETE - Remove user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
