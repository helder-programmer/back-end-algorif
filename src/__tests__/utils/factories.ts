import { prismaClient } from "../../database";
import bcrypt from 'bcrypt';

export class UserFactory {
    public static async create(name?: string, email?: string, password?: string) {
        const user = await prismaClient.user.create({
            data: {
                name: name ?? 'nicollas',
                email: email ?? 'nicollashelder@gmail.com',
                password: await bcrypt.hash(password ?? '12345', 8)
            }
        });

        return user;
    }
}