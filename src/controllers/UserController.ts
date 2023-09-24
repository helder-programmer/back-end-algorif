import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Request, Response } from "express";
import { IUserRepository } from "../repositories/types/IUserRepository";
import { UnauthorizedError } from "../utils/errors";
import { generateToken } from '../utils/generateToken';

export class UserController {
    constructor(
        private repository: IUserRepository
    ) {
        this.repository = repository;
    }


    public async register(req: Request, res: Response) {
        const { email, name, password, isTeacher, city, phone, state } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);


        const user = await this.repository.create({
            name,
            email,
            password: hashedPassword,
            isTeacher,
            city,
            phone,
            state
        });

        return res.status(200).json(user);
    }



    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.repository.findByEmail({ email });

        if (!user) throw new UnauthorizedError('Invalid e-mail or password!');

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) throw new UnauthorizedError('Invalid e-mail or password!');

        const token = generateToken(user);

        return res.status(200).json({ user, token });
    }



    public async recoverUserInformations(req: Request, res: Response) {
        return res.status(200).json(req.user);
    }
}