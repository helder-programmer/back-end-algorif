import bcrypt from 'bcrypt';

import { prismaClient } from '../../database';
import { truncateDatabase } from '../utils/truncate';



describe('User', () => {
    beforeAll(async () => {
        await truncateDatabase();
    });
    
    it('should return "true" with compare encrypted password', async () => {
        const user = await prismaClient.user.create({
            data: {
                name: 'nicollas',
                email: 'nicollashelder@gmail.com',
                password: await bcrypt.hash('12345', 8),
                isTeacher: false
            }
        });


        const compareResult = await bcrypt.compare('12345', user.password);

        expect(compareResult).toBe(true);
    });
});