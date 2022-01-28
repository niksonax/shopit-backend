import { Router } from 'express';
import AuthController from './controller.js';
import { isEmailUnique } from './middleware.js';

const router = Router();

const authController = new AuthController();

router.post('/login', authController.login);

router.post('/register', isEmailUnique, authController.register);

router.get('/refresh-token', authController.getRefreshToken);

router.delete('/refresh-token', authController.deleteRefreshToken);

export default router;
