import pool from '../../config/db.js';
import { snakeToCamelKeys } from '../helpers.js';

class UserModel {
  async getAll() {
    const data = await pool.query('SELECT * FROM users');
    const users = { users: data.rows.map((row) => snakeToCamelKeys(row)) };
    return users;
  }

  async get(email) {
    const data = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    const user = snakeToCamelKeys(data.rows[0]);
    return user;
  }

  async create(name, email, hashedPassword) {
    const data = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    const newUser = { users: data.rows.map((row) => snakeToCamelKeys(row)) };
    return newUser;
  }
}

export default UserModel;
