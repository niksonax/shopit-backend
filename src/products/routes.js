import { Router } from 'express';
import ProductController from './controller.js';

const router = Router();

const productController = new ProductController();

router.get('/', productController.getAll);

router.get('/user/:userId', productController.getByUser);

// validate given data structure
router.post('/', productController.create);

// validate product exists and given data structure
router.put('/:id', productController.update);

router.delete('/:id', productController.delete);

export default router;
