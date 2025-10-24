// routes/templates.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all templates
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM templates');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, category_id, price, image_url, description, created_by } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE templates
       SET title = ?, category_id = ?, price = ?, image_url = ?, description = ?, created_by = ?
       WHERE id = ?`,
      [title, category_id, price, image_url, description, created_by, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json({ message: 'Template updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET template by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM templates WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Template not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create a new template
router.post('/', async (req, res) => {
  const { title, category_id, image_url, price, description, created_by } = req.body;

  if (!title || !category_id || !created_by) {
    return res.status(400).json({ error: 'title, category_id, and created_by are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO templates (title, category_id, price, image_url, description, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [title, category_id, price || 0.0, image_url || null, description || null, created_by]
    );

    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// PUT update template
// PUT update template
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, category_id, price, image_url, description, created_by } = req.body;

  try {
    await pool.query(
      `UPDATE templates 
       SET title = ?, category_id = ?, price = ?, image_url = ?, description = ?, created_by = ? 
       WHERE id = ?`,
      [title, category_id, price, image_url, description, created_by, id]
    );

    res.json({ message: 'Template updated successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// DELETE template
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM templates WHERE id = ?', [id]);
    res.json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
