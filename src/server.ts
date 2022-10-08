import express from 'express';
import {
  articleRouter,
  userRouter,
  authRouter,
} from './routes/index.js';

const app = express();
app.set('view engine', 'mustache');
app.use('/article', articleRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use(express.json());

export default app;
