import request from 'supertest';
import { truncateDatabase } from '../utils/truncate';
import { UserFactory } from '../utils/factories';
import App from '../../app';
import { generateToken } from '../../utils/generateToken';
import { prismaClient } from '../../database';


describe('Question Topics', () => {
    beforeEach(async () => {
        await truncateDatabase();
    });

    it('should create and return a new question topic', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const response = await request(App)
            .post('/questionTopics')
            .send({ name: 'MATH' })
            .set('authorization', token);

        expect(response.status).toBe(200);
    });


    it('should update and return the question topic', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const topic = await prismaClient.questionTopic.create({
            data: {
                name: 'Math'
            }
        })

        const response = await request(App)
            .put(`/questionTopics/${topic.topicId}`)
            .send({ name: 'Array' })
            .set('authorization', token);


        expect(response.status).toBe(200);
    });


    it('should delete the question topic', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const topic = await prismaClient.questionTopic.create({
            data: {
                name: 'String'
            }
        });

        const response = await request(App)
            .delete(`/questionTopics/${topic.topicId}`)
            .set('authorization', token);

        expect(response.status).toBe(200);
    });


    it('should return all question topics', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const response = await request(App)
            .get('/questionTopics')
            .set('authorization', token);

        expect(response.status).toBe(200);
    });
});