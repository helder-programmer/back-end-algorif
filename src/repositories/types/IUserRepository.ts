import { IUser } from "../../domain/IUser";
import { ICreateUserDTO } from "../user/dtos/ICreateUserDTO";
import { IFindByEmailDTO } from "../user/dtos/IFindByEmail";

export interface IUserRepository {
    create(data: ICreateUserDTO): Promise<IUser>;
    findByEmail(data: IFindByEmailDTO): Promise<IUser | null>;
}