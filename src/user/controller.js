import bcrypt from 'bcrypt';
import pool from '../../config/db.js';

class UserController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
  }

  async getAll(req, res) {
    try {
      const data = await pool.query('SELECT * FROM users');
      const users = { users: data.rows };

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
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
  }
}

export default UserController;
