import { Router } from 'express';
import AuthController from './controller.js';

const router = Router();

const authController = new AuthController();

router.post('/login', authController.login);

router.get('/refresh-token', authController.getRefreshToken);

router.delete('/refresh-token', authController.deleteRefreshToken);

export default router;
