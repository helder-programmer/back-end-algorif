import { User } from "@prisma/client";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "../user/dtos/IFindByEmail";
import { IFindByIdDTO } from "../user/dtos/IFindByIdDTO";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(data: IFindByEmailDTO): Promise<User | null>;
    findById(data: IFindByIdDTO): Promise<User | null>;
}