import { Router } from 'express';
import { authenticateToken } from '../auth/middleware.js';
import UserController from './controller.js';

const router = Router();

const userController = new UserController();

router.get('/', authenticateToken, userController.getAll);

export default router;
