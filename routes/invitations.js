// routes/invitations.js
import express from 'express';
import pool from '../db.js';

const router = express.Router();

// Get all invitations
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM invitations');
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch invitations' });
  }
});

// Add new invitation
router.post('/', async (req, res) => {
  const { name, category, image, price, status, rating } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO invitations (name, category, image, price, status, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, image, price, status, rating]
    );
    res.json({ message: 'Invitation added', id: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add invitation' });
  }
});
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * FROM templates WHERE id = ?', [id]);
  if (rows.length === 0) return res.status(404).json({ error: 'Template not found' });
  res.json(rows[0]);
});


router.post('/:id', async (req, res) => {
  const { name, category, image, price, status, rating } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO invitations (name, category, image, price, status, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [name, category, image, price, status, rating]
    );
    res.json({ message: 'Invitation added', id: result.insertId });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to add invitation' });
  }
});

// Update invitation
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, image, price, status, rating } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE invitations SET name = ?, category = ?, image = ?, price = ?, status = ?, rating = ? WHERE id = ?',
      [name, category, image, price, status, rating, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Invitation not found' });
    }
    res.json({ message: 'Invitation updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to update invitation' });
  }
});

// Delete invitation
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM invitations WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Invitation not found' });
    }
    res.json({ message: 'Invitation deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to delete invitation' });
  }
});

export default router;
