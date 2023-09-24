import dotEnv from 'dotenv';
import jwt from 'jsonwebtoken'
import { User } from '@prisma/client';
dotEnv.config();

const secretKey = process.env.TOKEN_SECRET_KEY;

export function generateToken(user: User) {
    
    const token = jwt.sign(
        { userId: user.userId },
        secretKey!,
        { expiresIn: '1h' }
    );

    return token;
}