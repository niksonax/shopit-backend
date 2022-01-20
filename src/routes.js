import { Router } from 'express';
import authRouter from './auth/routes.js';
import userRouter from './user/routes.js';

const rootRouter = Router();

rootRouter.use('/users', userRouter);
rootRouter.use('/auth', authRouter);

export default rootRouter;
