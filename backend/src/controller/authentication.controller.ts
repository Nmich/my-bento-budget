import type { Request, Response, NextFunction } from 'express';
import { createUser, findUserByEmail } from '../models/user.model.js'
import { validationUser } from '../validator/auth.validator.js';
import { hashPassword, comparePassword, generateToken } from '../services/auth.service.js'


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
            // si match est false → statut 401
            const match = await comparePassword(result.data.password, existingUser.password_hash)
            if (!match) {
                return res.status(401).json(result.error)
            }
            const jwtToken = generateToken(existingUser.id,existingUser.email)
            // sinon statut 200 + token + user: { id, email }
            res.status(200).json({ jwtToken, user: { id: existingUser.id, email: existingUser.email } })
        }
    } catch (error) {
        next(error);
    }
}
