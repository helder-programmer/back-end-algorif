import { QuestionTopic } from "@prisma/client";
import { ICreateQuestionTopicDTO } from "../questionTopic/dtos/ICreateQuestionTopicDTO";
import { IDeleteQuestionTopicDTO } from "../questionTopic/dtos/IDeleteQuestionTopicDTO";
import { IUpdateQuestionTopicDTO } from "../questionTopic/dtos/IUpdateQuestionTopicDTO";

export interface IQuestionTopicRepository {
    create(data: ICreateQuestionTopicDTO): Promise<QuestionTopic>;
    update(data: IUpdateQuestionTopicDTO): Promise<QuestionTopic>;
    remove(data: IDeleteQuestionTopicDTO): Promise<void>;
    findAll(): Promise<QuestionTopic[]>;
}