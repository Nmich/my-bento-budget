import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifToken = (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1];
    if (!token) return res.status(401).json({ error: 'Token invalid or missing' });
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        if (typeof decoded === "object") {
            req.user = decoded as { id: string; email: string; };
        }
        next();
    } catch (error) {
        next(error);
    }
}
