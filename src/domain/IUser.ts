import { Prisma } from '@prisma/client';
export interface IUser {
    user_id: string;
    name: string;
    email: string;
    password: string;
    state: string | null;
    city: string | null;
    phone: string | null;
    score: Prisma.Decimal | number;
    isTeacher: boolean;
    created_at: Date;
    updated_at: Date;
    
    
}