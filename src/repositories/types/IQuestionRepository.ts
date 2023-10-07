import { Question } from "@prisma/client";
import { ICreateQuestionDTO } from "../question/dtos/ICreateQuestionDTO";
import { IFindUnansweredQuestionsDTO } from "../question/dtos/IFindUnansweredQuestionsDTO";
import { IFindByIdDTO } from "../question/dtos/IFindByIdDTO";

export interface IQuestionRepository {
    create(data: ICreateQuestionDTO): Promise<Question>;
    findUnansweredQuestions(data: IFindUnansweredQuestionsDTO): Promise<Question[]>;
    findById(data: IFindByIdDTO): Promise<Question | null>;
}