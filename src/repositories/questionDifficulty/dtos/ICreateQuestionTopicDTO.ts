import { Difficulty } from "@prisma/client";

export interface ICreateQuestionDifficultyDTO {
    name: Difficulty;
}