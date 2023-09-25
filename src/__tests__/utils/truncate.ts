import { prismaClient } from "../../database";

export async function truncateDatabase() {
    const users = prismaClient.user.deleteMany();
    const classes = prismaClient.class.deleteMany();
    const questions = prismaClient.question.deleteMany();
    const questionDifficulties = prismaClient.questionDifficulty.deleteMany();
    const questionsTopics = prismaClient.questionTopic.deleteMany();
    const questionTests = prismaClient.questionTest.deleteMany();
    const submissions = prismaClient.submission.deleteMany();


    await prismaClient.$transaction([
        users,
        classes,
        questionDifficulties,
        questions,
        questionsTopics,
        questionTests,
        submissions
    ]);

    await prismaClient.$disconnect();
}