export type User = {
    id: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
};

export type CreateUserDTO = {
    email: string;
    password: string;
};

export type UserResponse = {
    id: string;
    email: string;
};