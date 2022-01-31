import { Router } from 'express';
import ProductController from './controller.js';
import {
  isProductExists,
  createProductValidation,
  updateProductValidation,
} from './middleware.js';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAll);

router.get('/:id', isProductExists, productController.getById);

router.get('/user/:userId', productController.getByUser);

router.post('/', createProductValidation, productController.create);

router.put(
  '/:id',
  isProductExists,
  updateProductValidation,
  productController.update
);

router.delete('/:id', productController.delete);

export default router;
