import { Router } from 'express';
import PurchaseController from './controller.js';
import {
  isPurchaseExists,
  isProductExists,
  createPurchaseValidation,
} from './middleware.js';
import { authenticateToken } from '../auth/middleware.js';

const router = Router();

const purchaseController = new PurchaseController();

router.get('/', purchaseController.getAll);

router.get('/:id', isPurchaseExists, purchaseController.getById);

router.get('/user/:userId', purchaseController.getByUser);

router.post(
  '/',
  authenticateToken,
  createPurchaseValidation,
  isProductExists,
  purchaseController.create
);

router.delete('/:id', purchaseController.delete);

export default router;
