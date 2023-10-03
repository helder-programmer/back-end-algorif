import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories/user/UserRepository";
import jwt from 'jsonwebtoken';



export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const repository = new UserRepository();
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided!' });

    jwt.verify(token, process.env.TOKEN_SECRET_KEY!, (err, decoded: any) => {
        if (err) return res.status(401).json({ message: 'Unauthorized: Invalid token!' });

        repository.findById({userId: decoded.userId}).then(user => {
            req.user = user;
            next();
        });
    });
}