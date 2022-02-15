import pool from '../../config/db.js';

class RolesModel {
  async getAll() {
    const data = await pool.query('SELECT * FROM roles');
    const roles = { roles: data.rows };
    return roles;
  }

  async getByName(name) {
    const data = await pool.query('SELECT * FROM roles WHERE title = $1', [
      name,
    ]);
    const role = data.rows[0];
    return role;
  }

  async getById(id) {
    const data = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
    const role = data.rows[0];
    return role;
  }

  async create(name) {
    const data = await pool.query(
      'INSERT INTO roles (title) VALUES ($1) RETURNING *',
      [name]
    );
    const role = data.rows[0];
    return role;
  }
}

export default RolesModel;
