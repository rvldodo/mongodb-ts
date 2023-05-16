import User from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import Token from '@/utils/interfaces/token.interface';
import { verifyToken } from '@/utils/token';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }

    const token = bearer.split(' ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(token);

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }

        const user = await User.findOne({ id: payload.id });

        if (!user) return next(new HttpException(404, 'User not found'));

        req.user = user;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorized'));
    }
}

export default authenticate;
