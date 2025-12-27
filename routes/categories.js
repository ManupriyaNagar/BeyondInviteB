import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Test database connection
router.get('/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    res.json({
      message: "Categories route is working!",
      database: "Connected successfully"
    });
  } catch (err) {
    console.error('Database connection test failed:', err);
    res.status(500).json({
      message: "Categories route is working!",
      database: "Connection failed",
      error: err.message,
      code: err.code
    });
  }
});

// GET all categories
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({
      error: 'Database error',
      message: err.message,
      code: err.code
    });
  }
});

// POST new category
router.post('/', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  try {
    const [result] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.json({ id: result.insertId, name });
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(500).json({
      error: 'Database error',
      message: err.message,
      code: err.code
    });
  }
});

export default router;
