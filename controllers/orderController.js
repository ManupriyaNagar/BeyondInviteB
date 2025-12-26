// controllers/orderController.js
import pool from '../db.js';

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        customer_name as customer,
        customer_email as email,
        customer_phone as phone,
        invitation_type as type,
        status,
        amount,
        template_id as templateId,
        order_date as date,
        notes,
        created_at,
        updated_at
      FROM orders 
      ORDER BY created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT 
        id,
        customer_name as customer,
        customer_email as email,
        customer_phone as phone,
        invitation_type as type,
        status,
        amount,
        template_id as templateId,
        order_date as date,
        notes,
        created_at,
        updated_at
      FROM orders 
      WHERE id = ?
    `, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create new order
const createOrder = async (req, res) => {
  const {
    customer,
    email,
    phone,
    type,
    status = 'Pending',
    amount,
    templateId,
    notes
  } = req.body;

  // Validate required fields
  if (!customer || !email || !type || !amount) {
    return res.status(400).json({
      error: 'Customer name, email, type, and amount are required'
    });
  }

  try {
    const [result] = await pool.query(`
      INSERT INTO orders (
        customer_name,
        customer_email,
        customer_phone,
        invitation_type,
        status,
        amount,
        template_id,
        order_date,
        notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), ?)
    `, [customer, email, phone, type, status, amount, templateId, notes]);

    // Fetch the created order
    const [newOrder] = await pool.query(`
      SELECT 
        id,
        customer_name as customer,
        customer_email as email,
        customer_phone as phone,
        invitation_type as type,
        status,
        amount,
        template_id as templateId,
        order_date as date,
        notes,
        created_at
      FROM orders 
      WHERE id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Order created successfully',
      order: newOrder[0]
    });
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update order
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    customer,
    email,
    phone,
    type,
    status,
    amount,
    templateId,
    notes
  } = req.body;

  try {
    const [result] = await pool.query(`
      UPDATE orders SET
        customer_name = ?,
        customer_email = ?,
        customer_phone = ?,
        invitation_type = ?,
        status = ?,
        amount = ?,
        template_id = ?,
        notes = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [customer, email, phone, type, status, amount, templateId, notes, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Fetch the updated order
    const [updatedOrder] = await pool.query(`
      SELECT 
        id,
        customer_name as customer,
        customer_email as email,
        customer_phone as phone,
        invitation_type as type,
        status,
        amount,
        template_id as templateId,
        order_date as date,
        notes,
        updated_at
      FROM orders 
      WHERE id = ?
    `, [id]);

    res.json({
      message: 'Order updated successfully',
      order: updatedOrder[0]
    });
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM orders WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

// Get order statistics
const getOrderStats = async (req, res) => {
  try {
    const [stats] = await pool.query(`
      SELECT 
        COUNT(*) as totalOrders,
        SUM(amount) as totalRevenue,
        COUNT(CASE WHEN status = 'Completed' THEN 1 END) as completedOrders,
        COUNT(CASE WHEN status = 'Pending' THEN 1 END) as pendingOrders,
        COUNT(CASE WHEN status = 'In Progress' THEN 1 END) as inProgressOrders,
        AVG(amount) as averageOrderValue
      FROM orders
    `);

    res.json(stats[0]);
  } catch (err) {
    console.error('Error fetching order stats:', err);
    res.status(500).json({ error: 'Failed to fetch order statistics' });
  }
};

export {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderStats
};