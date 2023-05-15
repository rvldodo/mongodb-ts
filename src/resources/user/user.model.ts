import User from '@/resources/user/user.interface';
import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        age: {
            type: Number,
            required: true,
        },
        hobby: {
            type: Array<string>,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<User>('Users', userSchema);
