import { Document } from 'mongoose';

interface UserInterface extends Document {
    firstName: string;
    lastName: string;
    age: number;
    hobby: Array<string>;
    role: string;
    email: string;
    password: string;
    isValidPassword(password: string): Promise<Error | boolean>;
}

export default UserInterface;
