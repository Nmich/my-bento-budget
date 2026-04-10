import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export async function hashPassword(plainPassword: string) {
    const saltRounds = 12
    return await bcrypt.hash(plainPassword, saltRounds)
}

// comparer le password reçu avec le password haché en bdd
export async function comparePassword(password: string, password_hash: string) { return await bcrypt.compare(password, password_hash)};

// générer un JWT avec jwt.sign()
export function generateToken(id: string, email: string) { return jwt.sign({ id, email }, process.env.JWT_SECRET as string, { expiresIn: "7d" }) }