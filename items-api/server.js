const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'lostfound',
  user: process.env.DB_USER || 'lostfound_user',
  password: process.env.DB_PASSWORD || 'secret_password_123',
  port: 5432,
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', service: 'items-api' });
});

app.get('/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/items', async (req, res) => {
  const { title, description, category, location } = req.body;
  if (!title || !description || !category || !location) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO items (title, description, category, location) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, category, location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => console.log('API running on port 3000'));
}

module.exports = app;
