import { Question } from "@prisma/client";
import { ICreateQuestionDTO } from "../question/dtos/ICreateQuestionDTO";

export interface IQuestionRepository {
    create(data: ICreateQuestionDTO): Promise<Question>;
}