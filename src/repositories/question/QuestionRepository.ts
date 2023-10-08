import { Submission } from "@prisma/client";
import { prismaClient } from "../../database";
import { IQuestionRepository } from "../types/IQuestionRepository";
import { IAnswerQuestionDTO } from "./dtos/IAnswerQuestionDTO";
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
                    every: {
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

        return searchedQuestion;
    }


    public async answerQuestion({ userId, questionId, isCorrectCode, code }: IAnswerQuestionDTO) {
        let submission = null;

        const verifyIfExistsCorrectSubmissionForQuestion = await prismaClient.submission.findFirst({
            where: {
                userId,
                questionId
            }
        });


        if (!verifyIfExistsCorrectSubmissionForQuestion) {
            submission = await prismaClient.submission.create({
                data: {
                    userId,
                    questionId,
                    code,
                    isCorrectCode
                }
            });

            const user = await prismaClient.user.findFirst({ where: { userId } });
            let score = Number(user!.score);

            await prismaClient.user.update({
                data: {
                    score: score + 1,
                },
                where: {
                    userId
                }
            });
        }

        return submission;
    }



}