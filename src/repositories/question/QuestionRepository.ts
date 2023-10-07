import { prismaClient } from "../../database";
import { IQuestionRepository } from "../types/IQuestionRepository";
import { ICreateQuestionDTO } from "./dtos/ICreateQuestionDTO";
import { IFindByIdDTO } from "./dtos/IFindByIdDTO";
import { IFindUnansweredQuestionsDTO } from "./dtos/IFindUnansweredQuestionsDTO";

export class QuestionRepository implements IQuestionRepository {
    public async create({ title, description, detailedDescription, code, classId, difficultyId, topicId, userCreatorId, tests }: ICreateQuestionDTO) {

        const question = await prismaClient.question.create({
            data: {
                title,
                description,
                detailedDescription,
                code,
                classId,
                difficultyId,
                topicId,
                userCreatorId,
            }
        });

        for (const test of tests) {
            await prismaClient.questionTest.create({
                data: {
                    input: test.input,
                    output: test.output,
                    question: {
                        connect: {
                            questionId: question.questionId
                        }
                    }
                }
            })
        }

        return question;
    }


    public async findUnansweredQuestions({ userId }: IFindUnansweredQuestionsDTO) {
        const unansweredQuestions = await prismaClient.question.findMany({
            where: {
                submissions: {
                    some: {
                        userId: { not: userId }
                    }
                }
            },
            include: {
                difficulty: true
            }
        });

        return unansweredQuestions;
    }


    public async findById({ questionId }: IFindByIdDTO) {
        const searchedQuestion = await prismaClient.question.findFirst({
            where: {
                questionId
            },
            include: {
                tests: true
            }
        });

        console.log(searchedQuestion);

        return searchedQuestion;
    }
}