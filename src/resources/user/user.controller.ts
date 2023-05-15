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
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.getAll);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const user = await this.UserService.create(req.body);

            res.status(201).send({ user });
        } catch (error) {
            next(new HttpException(400, 'Cannot create user'));
        }
    };

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const users = await this.UserService.findAll();
            console.log(users);
            res.status(200).send({ users });
        } catch (error) {
            next(new HttpException(400, 'Users not found or empty'));
        }
    };
}

export default UserController;
