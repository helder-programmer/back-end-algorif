import 'express-async-errors';
import express, { Express } from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';

import { errorMiddleware } from './middlewares/error';
import usersRouter from './routes/users';
import questionTopicsRouter from './routes/questionTopics';
dotEnv.config();

class App {
    public express: Express;

    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
        this.errorHandlers();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    private routes() {
        this.express.use('/users', usersRouter);
        this.express.use('/questionTopics', questionTopicsRouter);
    }

    private errorHandlers() {
        this.express.use(errorMiddleware);
    }
}

export default new App().express;