import { Router } from 'express';
import PurchaseController from './controller.js';
import {
  isPurchaseExists,
  isProductExists,
  createPurchaseValidation,
} from './middleware.js';
import { authenticateToken } from '../auth/middleware.js';
import { grantAccess } from '../middleware.js';

const router = Router();

const purchaseController = new PurchaseController();

router.get(
  '/',
  authenticateToken,
  grantAccess('admin'),
  purchaseController.getAll
);

router.get(
  '/:id',
  authenticateToken,
  grantAccess('user'),
  isPurchaseExists,
  purchaseController.getById
);

router.get(
  '/user/:userId',
  grantAccess('user'),
  authenticateToken,
  purchaseController.getByUser
);

router.post(
  '/',
  authenticateToken,
  grantAccess('user'),
  createPurchaseValidation,
  isProductExists,
  purchaseController.create
);

router.delete(
  '/:id',
  grantAccess('user'),
  authenticateToken,
  purchaseController.delete
);

export default router;
