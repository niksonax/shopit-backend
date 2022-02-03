import { Router } from 'express';
import AuthController from './controller.js';
import {
  authenticateToken,
  isEmailUnique,
  loginValidation,
  registrationValidation,
} from './middleware.js';

const router = Router();

const authController = new AuthController();

router.post('/login', loginValidation, authController.login);

router.post('/login-by-token', authenticateToken, authController.loginByToken);

router.post(
  '/register',
  registrationValidation,
  isEmailUnique,
  authController.register
);

router.get('/refresh-token', authController.getRefreshToken);

router.delete('/refresh-token', authController.deleteRefreshToken);

export default router;
