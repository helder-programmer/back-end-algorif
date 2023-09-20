import { Prisma } from '@prisma/client';

import { IUserRepository } from "../types/IUserRepository";
import { ICreateUserDTO } from "./dtos/ICreateUserDTO";
import { prismaClient } from "../../database";
import { IUser } from '../../domain/IUser';
import { IFindByEmailDTO } from './dtos/IFindByEmail';
import { NotFoundError } from '../../utils/errors';

export class UserRepository implements IUserRepository {

    async create({ email, name, password, teacher, city, phone, state }: ICreateUserDTO) {

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: password,
                score: new Prisma.Decimal(0),
                teacher: teacher,
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
}