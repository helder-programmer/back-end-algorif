import { prismaClient } from "../../database";
import { IQuestionTopicRepository } from "../types/IQuestionTopicRepository";
import { ICreateQuestionTopicDTO } from "./dtos/ICreateQuestionTopicDTO";
import { IDeleteQuestionTopicDTO } from "./dtos/IDeleteQuestionTopicDTO";
import { IUpdateQuestionTopicDTO } from "./dtos/IUpdateQuestionTopicDTO";

export class QuestionTopicRepository implements IQuestionTopicRepository {
    public async create({ name }: ICreateQuestionTopicDTO) {
        const topic = await prismaClient.questionTopic.create({
            data: {
                name
            }
        });

        return topic;
    }


    public async update({ name, topicId }: IUpdateQuestionTopicDTO) {
        const topic = await prismaClient.questionTopic.update({
            where: { topicId },
            data: {
                name
            }
        });

        return topic;
    }


    public async remove({ topicId }: IDeleteQuestionTopicDTO) {
        await prismaClient.questionTopic.delete({ where: { topicId } })
    }
}