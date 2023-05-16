import validationMiddleware from '@/middleware/validation.middleware';
import UniversityService from '@/resources/university/university.service';
import validate from '@/resources/university/university.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../../middleware/authenticated.middleware';

class UniversityController implements Controller {
    public path = '/universities';
    public router = Router();
    private UniversityService = new UniversityService();

    constructor() {
        this.initializeRouter();
    }

    private initializeRouter() {
        // Create university router
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );

        // Get all universities
        this.router.get(`${this.path}`, authenticate, this.getAll);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const university = await this.UniversityService.create(req.body);

            res.status(201).send({ university });
        } catch (error) {
            next(new HttpException(400, 'Cannot create university'));
        }
    };

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const universities = await this.UniversityService.findAll();

            res.status(200).send({ universities });
        } catch (error) {
            next(new HttpException(404, 'Universities not found or empty'));
        }
    };
}

export default UniversityController;
