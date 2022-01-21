import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { authenticateToken } from '../auth/middleware.js';

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM users');
    const users = { users: data.rows };

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const saltRounds = 10;
    const password = req.body.password.toString();

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const data = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [req.body.name, req.body.email, hashedPassword]
    );
    const newUser = { users: data.rows };

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
