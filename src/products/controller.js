import ProductModel from './model.js';
import PurchaseModel from '../purchases/model.js';

const productModel = new ProductModel();
const purchaseModel = new PurchaseModel();

class ProductController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByUser = this.getByUser.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    try {
      const products = await productModel.getAll();

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;

      const product = await productModel.getById(id);

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByUser(req, res) {
    try {
      const userId = req.params.userId;

      const products = await productModel.getByUser(userId);

      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { name, description, price, userId } = req.body;

      const newProduct = await productModel.create(
        name,
        description,
        price,
        userId
      );

      res.json(newProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { name, description, price } = req.body;

      const updatedProduct = await productModel.update(
        id,
        name,
        description,
        price
      );

      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedProduct = await productModel.delete(id);
      if (!deletedProduct)
        res.status(204).json({ message: "Product with this id didn't exist" });

      // Deleting all purchases that contain this product
      const purchases = await purchaseModel.getByProduct(id);
      for (let purchase of purchases.purchases) {
        await purchaseModel.delete(purchase.id);
      }

      res.json(deletedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductController;
