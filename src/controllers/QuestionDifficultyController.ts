import { IQuestionDifficultyRepository } from "../repositories/types/IQuestionDifficultyRepository";
import { Request, Response } from "express";

export class QuestionDifficultyController {
    constructor(
        private repository: IQuestionDifficultyRepository
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
        const { difficultyId } = req.params;


        const topic = await this.repository.update({ difficultyId, name });

        return res.status(200).json(topic);
    }


    public async remove(req: Request, res: Response) {
        const { difficultyId } = req.params;

        await this.repository.remove({ difficultyId });

        return res.status(200).json({ message: 'Topic succesfully removed' });
    }


}