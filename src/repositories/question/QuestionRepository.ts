import { prismaClient } from "../../database";
import { IQuestionRepository } from "../types/IQuestionRepository";
import { ICreateQuestionDTO } from "./dtos/ICreateQuestionDTO";

export class QuestionRepository implements IQuestionRepository {
    public async create({ title, description, detailedDescription, code, classId, difficultyId, topicId, userCreatorId }: ICreateQuestionDTO) {

        const question = await prismaClient.question.create({
            data: {
                title,
                description,
                detailedDescription,
                code,
                classId,
                difficultyId,
                topicId,
                userCreatorId
            }
        });

        return question;
    }
}