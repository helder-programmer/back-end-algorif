import { prismaClient } from "../../database";

export async function addTopics() {
    const topics = [
        'Array',
        'Decisão',
        'Estrutura de dados',
        'Formatação',
        'Geral',
        'Grafos',
        'Laço de repetição',
        'Lógica matemática',
        'Matrizes',
        'Recursão',
        'String',
        'Variáveis'
    ];

    for (const topic of topics) {
        await prismaClient.questionTopic.create({
            data: {
                name: topic
            }
        });
    }
}