import { QuestionDifficulty } from "@prisma/client";
import { ICreateQuestionDifficultyDTO } from "../questionDifficulty/dtos/ICreateQuestionTopicDTO";
import { IUpdateQuestionDifficultyDTO } from "../questionDifficulty/dtos/IUpdateQuestionTopicDTO";
import { IDeleteQuestionDifficultyDTO } from "../questionDifficulty/dtos/IDeleteQuestionTopicDTO";

export interface IQuestionDifficultyRepository {
    create(data: ICreateQuestionDifficultyDTO): Promise<QuestionDifficulty>;
    update(data: IUpdateQuestionDifficultyDTO): Promise<QuestionDifficulty>;
    remove(data: IDeleteQuestionDifficultyDTO): Promise<void>;
    findAll(): Promise<QuestionDifficulty[]>;
}