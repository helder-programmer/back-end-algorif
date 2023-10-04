import 'express-async-errors';
import express, { Express } from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';

import { errorMiddleware } from './middlewares/error';
import usersRouter from './routes/users';
import questionTopicsRouter from './routes/questionTopics';
import questionDifficultiesRouter from './routes/questionDifficulties';
import questionsRouter from './routes/questions';
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
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }

    private routes() {
        this.express.use('/users', usersRouter);
        this.express.use('/questionTopics', questionTopicsRouter);
        this.express.use('/questionDifficulties', questionDifficultiesRouter);
        this.express.use('/questions', questionsRouter);
    }

    private errorHandlers() {
        this.express.use(errorMiddleware);
    }
}

export default new App().express;