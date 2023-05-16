import UserInterface from '../../resources/user/user.interface';

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface;
        }
    }
}
