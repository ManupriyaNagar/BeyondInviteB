// controllers/templateController.js
import { query } from '../db.js'; // your db helper

// Update a template
export const updateTemplate = async (req, res) => {
  const templateId = req.params.id;
  const {
    name,
    category_id,
    price,
    image,
    description,
    created_by
  } = req.body;

  if (!name || !category_id) {
    return res.status(400).json({ message: 'Name and category_id are required' });
  }

  try {
    // Optional: Check if template exists
    const [existing] = await query('SELECT * FROM templates WHERE id = ?', [templateId]);
    if (!existing) {
      return res.status(404).json({ message: 'Template not found' });
    }

    // Build dynamic update fields
    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = ?');
      values.push(name);
    }
    if (category_id) {
      fields.push('category_id = ?');
      values.push(parseInt(category_id));
    }
    if (price !== undefined) {
      fields.push('price = ?');
      values.push(parseFloat(price) || 0);
    }
    if (image !== undefined) {
      fields.push('image = ?');
      values.push(image);
    }
    if (description !== undefined) {
      fields.push('description = ?');
      values.push(description);
    }
    if (created_by !== undefined) {
      fields.push('created_by = ?');
      values.push(created_by);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    values.push(templateId);

    const sql = `UPDATE templates SET ${fields.join(', ')} WHERE id = ?`;
    await query(sql, values);

    // Return updated template
    const [updated] = await query('SELECT * FROM templates WHERE id = ?', [templateId]);
    res.json(updated);
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
