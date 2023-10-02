import { Request, Response } from 'express';

import { IQuestionTopicRepository } from "../repositories/types/IQuestionTopicRepository";

export class QuestionTopicController {
    constructor(
        private repository: IQuestionTopicRepository
    ) {
        this.repository = repository;
    }



    public async create(req: Request, res: Response) {
        const { name } = req.body;

        const topic = await this.repository.create({ name });

        return res.status(200).json(topic);
    }


    public async update(req: Request, res: Response) {
        const { name } = req.body;
        const { topicId } = req.params;


        const topic = await this.repository.update({ topicId, name });

        return res.status(200).json(topic);
    }


    public async remove(req: Request, res: Response) {
        const { topicId } = req.params;

        await this.repository.remove({ topicId });

        return res.status(200).json({ message: 'Topic succesfully removed' });
    }

    public async getAll(req: Request, res: Response) {
        const topics = await this.repository.findAll();
        return res.status(200).json(topics);
    }

}