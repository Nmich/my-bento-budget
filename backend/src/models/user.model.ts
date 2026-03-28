import getPool from './db.js';
import type { User, CreateUserDTO, UserResponse } from '../types/user.types.js';

export const createUser = async (data: CreateUserDTO): Promise<UserResponse> => {
const result = await getPool().query<User>(
    `INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email`,
    [data.email, data.password]
);

return result.rows[0] as UserResponse;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
const result = await getPool().query<User>(
    `SELECT * FROM users WHERE email = $1`,
    [email]
);

return result.rows[0] ?? null;
};