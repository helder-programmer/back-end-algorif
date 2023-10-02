export interface IUpdateUserDTO {
    userId: string;
    name: string;
    email: string;
    state?: string;
    city?: string;
    phone?: string;
}