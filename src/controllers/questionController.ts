import { Request, Response } from "express";
import { IQuestionRepository } from "../repositories/types/IQuestionRepository";

export class QuestionController {
    constructor(
        private repository: IQuestionRepository
    ) {
        this.repository = repository;
    }



    public async create(req: Request, res: Response) {
        const {
            title,
            description,
            detailedDescription,
            code,
            topicId,
            difficultyId,
            classId
        } = req.body;


        const userCreatorId = req.user!.userId;

        const question = await this.repository.create({ title, description, detailedDescription, code, topicId, difficultyId, userCreatorId, classId });


        return res.status(200).json(question);
    }


}