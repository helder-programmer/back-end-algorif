import { Difficulty } from "@prisma/client";
import { prismaClient } from "../../database";

export async function addDifficultes() {
    const difficulties = [
        'BEGINNER',
        'EASY',
        'MEDIUM',
        'HARD',
        'EXPERT'
    ];

    for (const difficulty of difficulties) {
        await prismaClient.questionDifficulty.create({
            data: {
                name: difficulty as Difficulty
            }
        });
    }
}