import { Request, Response } from "express";
import { IQuestionRepository } from "../repositories/types/IQuestionRepository";
import { NotFoundError } from "../utils/errors";

export class QuestionController {
    constructor(
        private repository: IQuestionRepository
    ) {
        this.repository = repository;
    }



    public async create(req: Request, res: Response) {
        const userCreatorId = req.user!.userId;

        const data = { ...req.body, userCreatorId };

        const question = await this.repository.create(data);

        return res.status(200).json(question);
    }


    public async getUnansweredQuestions(req: Request, res: Response) {

        const searchedQuestions = await this.repository.findUnansweredQuestions(req.user!);

        return res.status(200).json(searchedQuestions);
    }

    public async getOne(req: Request, res: Response) {
        const { questionId } = req.params;
        console.log(questionId);
        const searchedQuestion = await this.repository.findById({ questionId });

        if (!searchedQuestion) throw new NotFoundError('Question not found!');

        return res.status(200).json(searchedQuestion);
    }


}