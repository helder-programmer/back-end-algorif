import { prismaClient } from "../../database";

export async function truncateDatabase() {
    const tables = [
        'tb_users',
        'tb_question_topics',
        'tb_question_tests',
        'tb_question_difficulties',
        'tb_submissions',
        'tb_classes',
        'tb_questions'
    ];


    await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=0;`;

    await prismaClient.$executeRaw`TRUNCATE TABLE tb_users;`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tb_question_topics;`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tb_question_tests;`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tb_question_difficulties;`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tb_submissions;`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tb_classes;`;
    await prismaClient.$executeRaw`TRUNCATE TABLE tb_questions;`;

    await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=1;`;

    console.log('Tabelas truncadas');
}