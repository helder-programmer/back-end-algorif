import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt';

import { prismaClient } from "../../database";

export class UserFactory {
    public static async create(name?: string, email?: string, password?: string) {
        const user = await prismaClient.user.create({
            data: {
                name: name ?? faker.internet.userName(),
                email: email ?? faker.internet.email(),
                password: await bcrypt.hash(password ?? '12345', 8)
            }
        });

        return user;
    }
}