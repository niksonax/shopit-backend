import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../config/db.js';
import { jwtTokens } from '../helpers.js';

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
    this.getRefreshToken = this.getRefreshToken.bind(this);
    this.deleteRefreshToken = this.deleteRefreshToken.bind(this);
  }

  async login(req, res) {
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

      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async getRefreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) throw new Error("Refresh token wasn't provided.");

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
          if (error) throw new Error(error.message);

          const tokens = jwtTokens(decoded);

          res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
          res.json(tokens);
        }
      );
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async deleteRefreshToken(req, res) {
    try {
      res.clearCookie('refreshToken');
      res.json({ message: 'Refresh token was deleted' });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

export default AuthController;
