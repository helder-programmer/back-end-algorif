import request from 'supertest';
import { truncateDatabase } from '../utils/truncate';
import { UserFactory } from '../utils/factories';
import App from '../../app';
import { generateToken } from '../../utils/generateToken';
import { prismaClient } from '../../database';


describe('Question Difficulties', () => {
    beforeEach(async () => {
        await truncateDatabase();
    });

    it('should create and return a new question difficulty', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const response = await request(App)
            .post('/questionDifficulties')
            .send({ name: 'EASY' })
            .set('authorization', token);

        expect(response.status).toBe(200);
    });


    it('should update and return the question difficulty', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const difficulty = await prismaClient.questionDifficulty.create({
            data: {
                name: 'EASY'
            }
        })

        const response = await request(App)
            .put(`/questionDifficulties/${difficulty.difficultyId}`)
            .send({ name: 'BEGINNER' })
            .set('authorization', token);


        expect(response.status).toBe(200);
    });


    it('should delete the question difficulty', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const difficulty = await prismaClient.questionDifficulty.create({
            data: {
                name: 'EASY'
            }
        });

        const response = await request(App)
            .delete(`/questionDifficulties/${difficulty.difficultyId}`)
            .set('authorization', token);

        expect(response.status).toBe(200);
    });

});