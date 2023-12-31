import { IQuestionDifficultyRepository } from "../repositories/types/IQuestionDifficultyRepository";
import { Request, Response } from "express";

export class QuestionDifficultyController {
    constructor(
        private repository: IQuestionDifficultyRepository
    ) {
        this.repository = repository;
    }

    public async create(req: Request, res: Response) {
        const questionDifficulty = await this.repository.create(req.body);

        return res.status(200).json(questionDifficulty);
    }


    public async update(req: Request, res: Response) {
        const { name } = req.body;
        const { difficultyId } = req.params;


        const questionDifficulty = await this.repository.update({ difficultyId, name });

        return res.status(200).json(questionDifficulty);
    }


    public async remove(req: Request, res: Response) {
        const { difficultyId } = req.params;

        await this.repository.remove({ difficultyId });

        return res.status(200).json({ message: 'difficulty succesfully removed' });
    }

    public async getAll(req: Request, res: Response) {
        const difficulties = await this.repository.findAll();

        res.status(200).json(difficulties);
    }
}