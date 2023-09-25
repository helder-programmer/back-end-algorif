import { prismaClient } from "../../database";
import { IQuestionDifficultyRepository } from "../types/IQuestionDifficultyRepository";
import { ICreateQuestionDifficultyDTO } from "./dtos/ICreateQuestionTopicDTO";
import { IDeleteQuestionDifficultyDTO } from "./dtos/IDeleteQuestionTopicDTO";
import { IUpdateQuestionDifficultyDTO } from "./dtos/IUpdateQuestionTopicDTO";

export class QuestionDifficultyRepository implements IQuestionDifficultyRepository {
    public async create({ name }: ICreateQuestionDifficultyDTO) {
        const difficulty = await prismaClient.questionDifficulty.create({
            data: {
                name
            }
        });

        return difficulty;
    }


    public async update({ name, difficultyId }: IUpdateQuestionDifficultyDTO) {
        const difficulty = await prismaClient.questionDifficulty.update({
            where: { difficultyId },
            data: {
                name
            }
        });

        return difficulty;
    }


    public async remove({ difficultyId }: IDeleteQuestionDifficultyDTO) {
        await prismaClient.questionDifficulty.delete({ where: { difficultyId } });
    }
}