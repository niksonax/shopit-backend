import Joi from 'joi';
import ProductModel from './model.js';

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

function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res.status(401).json({
      error: `Validation error: ${error.details
        .map((x) => x.message)
        .join(', ')}`,
    });
  }

  req.body = value;
  next();
}

export { isProductExists, createProductValidation, updateProductValidation };
