import { Prisma } from '@prisma/client';

import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { prismaClient } from "../../database";
import { IFindByEmailDTO } from './dtos/IFindByEmail';
import { IFindByIdDTO } from './dtos/IFindByIdDTO';
import { IUpdateUserDTO } from './dtos/IUpdateUserDTO';

export class UserRepository implements IUserRepository {

    async create({ email, name, password, isTeacher, city, phone, state }: ICreateUserDTO) {

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: password,
                score: new Prisma.Decimal(0),
                isTeacher: isTeacher,
                city,
                phone,
                state
            }
        });

        return user;
    }

    async findByEmail({ email }: IFindByEmailDTO) {

        const user = await prismaClient.user.findFirst({
            where: { email },
        });

        return user;
    }


    async findById({ userId }: IFindByIdDTO) {
        const user = await prismaClient.user.findFirst({ where: { userId } });
        return user;
    }


    public async update({ email, name, city, phone, state, userId }: IUpdateUserDTO) {
        const user = await prismaClient.user.update({
            data: {
                name,
                email,
                city,
                phone,
                state
            }, where: { userId }
        });

        return user;
    }
}