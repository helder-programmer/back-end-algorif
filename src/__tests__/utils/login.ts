import request from 'supertest';
import App from '../../app';


export async function login(email?: string, password?: string) {

    const { token } = (await request(App)
        .post('/users/login')
        .send({
            email: email ?? 'nick@gmail.com',
            password: '12345'
        })).body;

    return token;
}