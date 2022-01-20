import 'dotenv/config';
import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rootRouter from './routes.js';

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = { credentials: true, origin: process.env.URL || '*' };

app.use(json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api', rootRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
