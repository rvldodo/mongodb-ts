import UserInterface from '@/resources/user/user.interface';
import User from '@/resources/user/user.model';
import HttpException from '@/utils/exceptions/http.exception';
import token from '@/utils/token';
import { NextFunction } from 'express';

class UserService {
    private user = User;

    /**
     * Register a new user
     */
    public async register(
        data: UserInterface,
        next: NextFunction
    ): Promise<string | Error> {
        try {
            const duplicate = await this.user.findOne({ email: data.email });
            if (duplicate)
                next(new HttpException(400, 'User already registered'));

            const user = await this.user.create(data);
            return `Email: ${user.email} successfully registered`;
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * Login user
     */
    public async login(
        data: UserInterface,
        next: NextFunction
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email: data.email });

            if (!user) next(new HttpException(404, 'User not found'));

            const loginToken = (await user?.isValidPassword(data.password))
                ? token.generateToken(data)
                : new HttpException(400, 'Invalid password');

            return loginToken;
        } catch (error) {
            throw new Error('Unable to login');
        }
    }

    /**
     * Find all users
     */
    public async findAll(next: NextFunction): Promise<UserInterface[] | void> {
        try {
            const users = await this.user.find().select('-password').exec();

            if (!users || users.length === 0)
                next(new HttpException(404, 'Users not found or empty'));

            return users;
        } catch (error) {
            next(new HttpException(500, 'Something went wrong'));
        }
    }
}

export default UserService;
