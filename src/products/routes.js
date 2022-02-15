import { Router } from 'express';
import ProductController from './controller.js';
import { authenticateToken } from '../auth/middleware.js';
import {
  isProductExists,
  createProductValidation,
  updateProductValidation,
} from './middleware.js';
import { grantAccess } from '../middleware.js';

const router = Router();

const productController = new ProductController();

router.get(
  '/',
  authenticateToken,
  grantAccess('user'),
  productController.getAll
);

router.get(
  '/:id',
  authenticateToken,
  grantAccess('user'),
  isProductExists,
  productController.getById
);

router.get(
  '/user/:userId',
  authenticateToken,
  grantAccess('user'),
  productController.getByUser
);

router.post(
  '/',
  authenticateToken,
  grantAccess('manager'),
  createProductValidation,
  productController.create
);

router.put(
  '/:id',
  authenticateToken,
  grantAccess('manager'),
  isProductExists,
  updateProductValidation,
  productController.update
);

router.delete('/:id', productController.delete);

export default router;
