import { prismaClient } from "../../database";

export class UserFactory {
    public static async create(name?: string, email?: string, password?: string) {
        const user = await prismaClient.user.create({
            data: {
                name: name ?? 'nicollas',
                email: email ?? 'nicollashelder@gmail.com',
                password: password ?? '12345'
            }
        });

        return user;
    }
}