import request from 'supertest';
import App from '../../app';
import { truncateDatabase } from '../utils/truncate';
import { login } from '../utils/login';
import { prismaClient } from '../../database';


describe('Auth Tests', () => {
    beforeEach(async () => {
        await truncateDatabase();
    });

    it('should create user in database', async () => {
        const response = await request(App)
            .post('/users/register')
            .send({
                name: 'nicollas',
                email: 'nicollashelder@gmail.com',
                password: '12345',
                isTeacher: false
            });

        expect(response.status).toBe(200);
    });


    it('should return user data and token', async () => {
        await prismaClient.user.create({
            data: {
                name: 'nick',
                email: 'nicollshelder@gmail.com',
                password: '12345'
            }
        });


        const response = await request(App).post('/users/login').send({
            email: 'nicollashelder@gmail.com',
            password: '12345'
        });

        expect(response.status).toBe(200);
    });

    it('should return unauthorized with invalid data', async () => {
        await prismaClient.user.create({
            data: {
                name: 'nick',
                email: 'nicollshelder@gmail.com',
                password: '12345'
            }
        });

        const response = await request(App).post('/users/login').send({
            email: 'nicollashelder@gmail.com',
            password: '123456'
        });

        expect(response.status).toBe(401);
    });


    it('should not be able to access private routes when not authenticated', async () => {
       const token = await login()
    });
});