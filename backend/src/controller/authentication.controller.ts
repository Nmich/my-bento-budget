import type { Request, Response, NextFunction } from 'express';
import { createUser, findUserByEmail } from '../models/user.model.js'
import * as z from "zod";
import bcrypt from 'bcrypt';
import jtw from 'jsonwebtoken';

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

export const logInUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // recupère les data du body de la requete
        const result = validationUser.safeParse(req.body)
        // si le résultat est différent de la requete, statut 400
        if (!result.success) {
            res.status(400).json(result.error)
        } else {
            // recupérer les data User en bdd avec findUserByEmail
            const existingUser = await findUserByEmail(result.data.email);
            // si l'email n'existe pas en bdd → statut 401
            if (!existingUser?.email) {
                return res.status(401).json(result.error)
            }
            // comparer le password reçu avec le password haché en bdd
            const match = await bcrypt.compare(result.data.password, existingUser.password_hash);
            // si match est false → statut 401
            if (!match) {
                return res.status(401).json(result.error)
            }
            // générer un JWT avec jwt.sign()
            const jwtToken = jtw.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET as string, { expiresIn: "7d" })
            // sinon statut 200 + token + user: { id, email }
            res.status(200).json({ jwtToken, user: { id: existingUser.id, email: existingUser.email } })
        }
    } catch (error) {
        next(error);
    }
}
