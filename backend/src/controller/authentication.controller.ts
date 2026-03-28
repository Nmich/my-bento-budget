import type { Request, Response, NextFunction } from 'express';
import { createUser, findUserByEmail } from '../models/user.model.js'
import * as z from "zod";
import bcrypt from 'bcrypt';

const validationUser = z.object({
    email: z.email(),
    password: z.string().min(8)
});

async function hashPassword(plainPassword: string) {
    const saltRounds = 12
    return await bcrypt.hash(plainPassword, saltRounds)
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const result = validationUser.safeParse(req.body)
        if (!result.success) {
            res.status(400).json(result.error)
        } else {
            const existingUser = await findUserByEmail(result.data.email);
            if (existingUser) {
                return res.status(409).json('email already exist');
            }
            const hashedPassword = await hashPassword(result.data.password)
            const newUser = await createUser({ email: result.data.email, password: hashedPassword })
            res.status(201).json(newUser)
        }

    } catch (error) {
        next(error);
    }
}