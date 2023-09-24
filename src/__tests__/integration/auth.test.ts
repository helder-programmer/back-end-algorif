import request from 'supertest';
import bcrypt from 'bcrypt';

import App from '../../app';
import { truncateDatabase } from '../utils/truncate';
import { UserFactory } from '../utils/factories';
import { generateToken } from '../../utils/generateToken';


describe('Auth Tests', () => {
    beforeEach(async () => {
        await truncateDatabase();
    });

    // it('should create user in database', async () => {
    //     const response = await request(App)
    //         .post('/users/register')
    //         .send({
    //             name: 'nicollas',
    //             email: 'nicollashelder@gmail.com',
    //             password: await bcrypt.hash('12345', 8),
    //             isTeacher: false
    //         });

    //     expect(response.status).toBe(200);
    // });


    it('should return user data and token', async () => {
        await UserFactory.create();


        const response = await request(App)
            .post('/users/login')
            .send({
                email: 'nicollashelder@gmail.com',
                password: '12345'
            });

        expect(response.body).toHaveProperty('token');
    });

    it('should return unauthorized with invalid data', async () => {
        await UserFactory.create();

        const response = await request(App)
            .post('/users/login')
            .send({
                email: 'nicollashelder@gmail.com',
                password: '123456'
            });

        expect(response.status).toBe(401);
    });


    it('should not be able to access private routes without token', async () => {
        const response = await request(App)
            .get('/users/recoverUserInformations')

        expect(response.status).toBe(401);
    });

    it('should be able to acess private routes with valid token', async () => {
        const user = await UserFactory.create();

        const token = generateToken(user);

        const response = await request(App)
            .get('/users/recoverUserInformations')
            .set('authorization', token);

        expect(response.status).toBe(200);
    });
});