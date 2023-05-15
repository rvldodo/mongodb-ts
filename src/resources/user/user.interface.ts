import { Document } from 'mongoose';

interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    hobby: Array<string>;
}

export default User;
