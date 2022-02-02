import pool from '../../config/db.js';
import { snakeToCamelKeys } from '../helpers.js';

class PurchaseModel {
  async getAll() {
    const data = await pool.query('SELECT * FROM purchases');
    const purchases = {
      purchases: data.rows.map((row) => snakeToCamelKeys(row)),
    };
    return purchases;
  }

  async getById(id) {
    const data = await pool.query('SELECT * FROM purchases WHERE id = $1', [
      id,
    ]);
    const purchase = snakeToCamelKeys(data.rows[0]);
    return purchase;
  }

  async getByUser(userId) {
    const data = await pool.query(
      'SELECT * FROM purchases WHERE user_id = $1',
      [userId]
    );
    const purchases = {
      purchases: data.rows.map((row) => snakeToCamelKeys(row)),
    };
    return purchases;
  }

  async create(productId, userId, price) {
    const data = await pool.query(
      'INSERT INTO purchases (product_id, user_id, price) VALUES ($1, $2, $3) RETURNING *',
      [productId, userId, price]
    );
    const newPurchase = snakeToCamelKeys(data.rows[0]);
    return newPurchase;
  }

  async delete(id) {
    const data = await pool.query(
      'DELETE FROM purchases WHERE id=$1 RETURNING *',
      [id]
    );
    const deletedPurchase = snakeToCamelKeys(data.rows[0]);
    return deletedPurchase;
  }
}

export default PurchaseModel;
