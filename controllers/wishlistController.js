import pool from '../db.js';

// Add to wishlist
const addToWishlist = async (req, res) => {
  const { userId, templateId } = req.body;

  if (!userId || !templateId) {
    return res.status(400).json({ error: 'userId and templateId are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO wishlists (user_id, template_id) VALUES (?, ?)',
      [userId, templateId]
    );

    res.status(201).json({ message: 'Added to wishlist', id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to wishlist' });
  }
};

// Get user's wishlist
const getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      `SELECT w.id, t.id as templateId, t.title, t.image_url 
       FROM wishlists w
       JOIN templates t ON w.template_id = t.id
       WHERE w.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch wishlist' });
  }
};

export { addToWishlist, getWishlist };
