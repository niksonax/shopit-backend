import express, { json } from 'express';
import cors from 'cors';
import 'dotenv/config';
import rootRouter from './routes.js';

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = { credentials: true, origin: process.env.URL || '*' };

app.use(cors(corsOptions));
app.use(json());

app.use('/api', rootRouter);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
