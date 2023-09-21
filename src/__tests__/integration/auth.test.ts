import request from 'supertest';
import App from '../../app';

describe('Auth Tests', () => {
    it('should create user in database', async () => {
        const response = await request(App)
            .post('/users/register')
            .send({
                name: 'nicollas',
                email: 'nicollashelder@gmail.com',
                password: '12345',
                teacher: false
            });

        expect(response.status).toBe(200);
    });


    it('should return user data and token', async () => {
        const response = await request(App).post('/users/login').send({
            email: 'nicollashelder@gmail.com',
            password: '123456'
        });

        expect(response.status).toBe(200);
    });

    it('should return unauthorized with invalid data', async () => {
        const response = await request(App).post('/users/login').send({
            email: 'nicollashelder@gmail.com',
            password: '12345'
        });

        expect(response.status).toBe(401);
    })
});