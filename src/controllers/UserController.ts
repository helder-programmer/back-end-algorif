import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

import { Request, Response } from "express";
import { IUserRepository } from "../repositories/types/IUserRepository";
import { NotFoundError, UnauthorizedError } from "../utils/errors";
dotEnv.config();

const secretKey = process.env.TOKEN_SECRET_KEY;

export class UserController {
    constructor(
        private repository: IUserRepository
    ) {
        this.repository = repository;
    }


    async register(req: Request, res: Response) {
        const { email, name, password, teacher, city, phone, state } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);


        const user = await this.repository.create({
            name,
            email,
            password: hashedPassword,
            teacher,
            city,
            phone,
            state
        });

        return res.status(200).json(user);
    }



    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await this.repository.findByEmail({ email });

        if (!user) throw new UnauthorizedError('Invalid e-mail or password!');

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) throw new UnauthorizedError('Invalid e-mail or password!');

        const token = jwt.sign(
            { user_id: user.user_id },
            secretKey!,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ user, token });
    }
}