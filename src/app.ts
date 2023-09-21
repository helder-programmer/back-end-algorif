import 'express-async-errors';
import express, { Express } from 'express';
import dotEnv from 'dotenv';

import { errorMiddleware } from './middlewares/error';
import userRouter from './routes/users';
dotEnv.config();

class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.middlewares();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use('/users', userRouter);

        this.express.use(errorMiddleware);
    }
}

export default new App().express;