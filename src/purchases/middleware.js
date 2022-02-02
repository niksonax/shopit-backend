import Joi from 'joi';
import PurchaseModel from './model.js';
import ProductModel from '../products/model.js';
import { validateRequest } from '../middleware.js';

const purchaseModel = new PurchaseModel();
const productModel = new ProductModel();

// Create general function is Entity exists? (passing model as an arg)
async function isPurchaseExists(req, res, next) {
  const id = req.params.id;

  const purchase = await purchaseModel.getById(id);

  if (!purchase)
    return res
      .status(404)
      .json({ error: "Purchase with this id doesn't exists" });

  next();
}

async function isProductExists(req, res, next) {
  const id = req.body.productId;

  const product = await productModel.getById(id);

  if (!product)
    return res
      .status(404)
      .json({ error: "Product with this id doesn't exists" });

  next();
}

function createPurchaseValidation(req, res, next) {
  const schema = Joi.object({
    productId: Joi.string().guid().required(),
    userId: Joi.string().guid().required(),
    price: Joi.number().precision(2).positive().required(),
  });

  validateRequest(req, res, next, schema);
}

export { isPurchaseExists, isProductExists, createPurchaseValidation };
