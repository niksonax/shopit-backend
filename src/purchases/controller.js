import PurchaseModel from './model.js';

const purchaseModel = new PurchaseModel();

class PurchaseController {
  constructor() {
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.getByUser = this.getByUser.bind(this);
    this.create = this.create.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res) {
    try {
      const purchases = await purchaseModel.getAll();

      res.json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const id = req.params.id;

      const purchase = await purchaseModel.getById(id);

      res.json(purchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getByUser(req, res) {
    try {
      const userId = req.params.userId;

      const purchases = await purchaseModel.getByUser(userId);

      res.json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { productId, userId, price } = req.body;

      const newPurchase = await purchaseModel.create(productId, userId, price);

      res.json(newPurchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;

      const deletedPurchase = await purchaseModel.delete(id);
      if (!deletedPurchase)
        res.status(204).json({ message: "Purchase with this id didn't exist" });

      res.json(deletedPurchase);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default PurchaseController;
