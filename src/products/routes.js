import { Router } from 'express';
import ProductController from './controller.js';
import { authenticateToken } from '../auth/middleware.js';
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

router.post(
  '/',
  authenticateToken,
  createProductValidation,
  productController.create
);

router.put(
  '/:id',
  authenticateToken,
  isProductExists,
  updateProductValidation,
  productController.update
);

router.delete('/:id', productController.delete);

export default router;
