import 'express-async-errors';
import express from 'express';
import dotEnv from 'dotenv';

import { errorMiddleware } from './middlewares/error';
import userRouter from './routes/users';
dotEnv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/users', userRouter);

app.use(errorMiddleware);

app.listen(process.env.SERVER_PORT, () => {
    console.log('Servidor Rodando');
});