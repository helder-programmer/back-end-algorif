import { QuestionTopic } from "@prisma/client";
import { ICreateQuestionDifficultyDTO } from "../questionDifficulty/dtos/ICreateQuestionTopicDTO";
import { IUpdateQuestionDifficultyDTO } from "../questionDifficulty/dtos/IUpdateQuestionTopicDTO";
import { IDeleteQuestionDifficultyDTO } from "../questionDifficulty/dtos/IDeleteQuestionTopicDTO";

export interface IQuestionDifficultyRepository {
    create(data: ICreateQuestionDifficultyDTO): Promise<QuestionTopic>;
    update(data: IUpdateQuestionDifficultyDTO): Promise<QuestionTopic>;
    remove(data: IDeleteQuestionDifficultyDTO): Promise<void>;
}