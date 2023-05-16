import authenticate from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import UserService from '@/resources/user/user.service';
import validate from '@/resources/user/user.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRouter();
    }

    private initializeRouter(): void {
        // Register routes
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );

        // Login routes
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );

        // Get me routes
        this.router.get(`${this.path}/get-me`, authenticate, this.getMe);

        // Get users routes
        this.router.get(`${this.path}`, authenticate, this.getUsers);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const user = await this.UserService.register(req.body, next);

            res.status(201).json(user);
        } catch (error) {
            next(new HttpException(400, 'Cannot register user'));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const token = await this.UserService.login(req.body, next);

            res.status(200).json({ token });
        } catch (error) {
            next(new HttpException(404, 'Cannot login'));
        }
    };

    private getMe = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        if (!req.user) return next(new HttpException(404, 'User not found'));

        res.status(200).send({ user: req.user });
    };

    private getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        const users = await this.UserService.findAll(next);

        res.status(200).json({ users });
    };
}

export default UserController;
