import { Difficulty } from "@prisma/client";

export interface IUpdateQuestionDifficultyDTO {
    difficultyId: string;
    name: Difficulty;
}