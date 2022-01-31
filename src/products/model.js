import pool from '../../config/db.js';

class ProductModel {
  async getAll() {
    const data = await pool.query('SELECT * FROM products');
    const products = { products: data.rows };
    return products;
  }

  async getByUser(userId) {
    const data = await pool.query('SELECT * FROM products WHERE user_id = $1', [
      userId,
    ]);
    const products = { products: data.rows };
    return products;
  }

  async create(name, description, price, userId) {
    const data = await pool.query(
      'INSERT INTO products (name, description, price, user_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, userId]
    );
    const newProduct = data.rows[0];
    return newProduct;
  }

  async update(id, name, description, price) {
    const data = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, description, price, id]
    );
    const updatedProduct = data.rows[0];
    return updatedProduct;
  }

  async delete(id) {
    const data = await pool.query(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );
    const deletedProduct = data.rows[0];
    return deletedProduct;
  }
}

export default ProductModel;
