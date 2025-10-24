// routes/wishlist.js
const express = require('express');
const router = express.Router();
const pool = require('../db');



// Add to wishlist
router.post('/', async (req, res) => {
  const { userId, templateId } = req.body;
  try {
    // Check if already exists
    const [existing] = await pool.query(
      'SELECT * FROM wishlist WHERE user_id = ? AND template_id = ?',
      [userId, templateId]
    );
    if (existing.length > 0) return res.status(400).json({ error: 'Already in wishlist' });

    await pool.query('INSERT INTO wishlist (user_id, template_id) VALUES (?, ?)', [userId, templateId]);
    res.json({ message: 'Added to wishlist' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
});

// Get wishlist for a user
router.get('/:id', async (req, res) => {
  const { userId } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT t.* FROM wishlist w
       JOIN templates t ON w.template_id = t.id
       WHERE w.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
});

module.exports = router;
