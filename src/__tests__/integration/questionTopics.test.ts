import request from 'supertest';

import { login } from '../utils/login';
import { truncateDatabase } from '../utils/truncate';
import App from '../../app';


describe('Question Topics', () => {
    beforeAll(async () => {
        await truncateDatabase();
    })

    it('should create and return a new question topic', async () => {
        const token = await login();

        const response = await request(App)
            .post('/questionTopics')
            .send({ name: 'INICIANTE' })
            .set('authorization', token)

        expect(response.statusCode).toBe(200);
    });
});