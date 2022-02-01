import Joi from 'joi';
import ProductModel from './model.js';
import { validateRequest } from '../middleware.js';

const productModel = new ProductModel();

async function isProductExists(req, res, next) {
  const id = req.params.id;

  const product = await productModel.getById(id);

  if (!product)
    return res
      .status(404)
      .json({ error: "Product with this id doesn't exists" });

  next();
}

function createProductValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).positive().required(),
    userId: Joi.string().guid().required(),
  });

  validateRequest(req, res, next, schema);
}

function updateProductValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).positive().required(),
  });

  validateRequest(req, res, next, schema);
}

export { isProductExists, createProductValidation, updateProductValidation };
