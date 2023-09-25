import { prismaClient } from "../../database";
import { ICreateQuestionDifficultyDTO } from "./dtos/ICreateQuestionTopicDTO";
import { IDeleteQuestionDifficultyDTO } from "./dtos/IDeleteQuestionTopicDTO";
import { IUpdateQuestionDifficultyDTO } from "./dtos/IUpdateQuestionTopicDTO";

export class QuestionDifficultyRepository {
    public async create({ name }: ICreateQuestionDifficultyDTO) {
        const topic = await prismaClient.questionDifficulty.create({
            data: {
                name
            }
        });

        return topic;
    }


    public async update({ name, difficultyId }: IUpdateQuestionDifficultyDTO) {
        const topic = await prismaClient.questionDifficulty.update({
            where: { difficultyId },
            data: {
                name
            }
        });

        return topic;
    }


    public async remove({ difficultyId }: IDeleteQuestionDifficultyDTO) {
        await prismaClient.questionDifficulty.delete({ where: { difficultyId } })
    }
}