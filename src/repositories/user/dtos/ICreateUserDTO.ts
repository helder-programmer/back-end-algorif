export interface ICreateUserDTO {
    name: string;
    email: string;
    password: string;
    state?: string;
    city?: string;
    phone?: string;
    teacher: boolean;
}