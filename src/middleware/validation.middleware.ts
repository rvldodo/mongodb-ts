import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        };

        try {
            const value = await schema.validateAsync(
                req.body,
                validationOptions
            );

            req.body = value;
            next();
        } catch (er: any) {
            const errors: string[] = [];
            er.details.forEach((err: Joi.ValidationError) => {
                errors.push(err.message);
            });
            res.status(400).send({ errors });
        }
    };
}

export default validationMiddleware;
