import User from '@/resources/user/user.interface';
import userModel from '@/resources/user/user.model';

class UserService {
    private user = userModel;

    /**
     * create a new user
     */
    public async create(data: User): Promise<User> {
        try {
            const duplicate = await this.duplicate(data.email);

            const user = await this.user.create(data);
            return user;
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * check duplicate user
     */
    private async duplicate(email: string): Promise<void> {
        const user = await this.user.findOne({ email });
        if (user) throw new Error('User or email already exists');
    }

    /**
     * get all users
     */
    public async findAll(): Promise<User[]> {
        try {
            const users = await this.user.find();
            console.log(users);
            return users;
        } catch (error) {
            throw new Error('Users empty or not found');
        }
    }
}

export default UserService;
