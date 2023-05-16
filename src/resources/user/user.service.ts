import UserInterface from '@/resources/user/user.interface';
import User from '@/resources/user/user.model';
import token from '@/utils/token';

class UserService {
    private user = User;

    /**
     * Register a new user
     */
    public async register(data: UserInterface): Promise<string | Error> {
        try {
            const duplicate = await this.user.findOne({ email: data.email });
            if (duplicate) throw new Error('User already registered');

            const user = await this.user.create(data);
            const accessToken = token.generateToken(user);
            return accessToken;
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * Login user
     */
    public async login(data: UserInterface): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email: data.email });

            if (!user) throw new Error('User not found');

            const loginToken = (await user?.isValidPassword(data.password))
                ? token.generateToken(data)
                : new Error('Invalid password');

            return loginToken;
        } catch (error) {
            throw new Error('Unable to login');
        }
    }
}

export default UserService;
