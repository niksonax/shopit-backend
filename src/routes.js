import { Router } from 'express';
import authRouter from './auth/routes.js';
import userRouter from './user/routes.js';
import productRouter from './products/routes.js';

const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/users', userRouter);
rootRouter.use('/products', productRouter);

export default rootRouter;
