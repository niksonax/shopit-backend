import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import { jwtTokens } from '../helpers.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    if (data.rows.length === 0) throw new Error('Incorrect email address.');

    const user = data.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Incorrect password.');

    let tokens = jwtTokens(user);

    res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true });
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;