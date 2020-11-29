import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from 'config/environment';

export interface UserPayload {
    id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) return next();

    try {
        req.user = jwt.verify(req.session.jwt, env.JWT_SECRET) as UserPayload;
    } catch (e) {}
    next();
};
