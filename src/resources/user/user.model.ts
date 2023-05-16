import UserInterface from '@/resources/user/user.interface';
import bcrypt from 'bcrypt';
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
        age: {
            type: Number,
            required: true,
        },
        hobby: {
            type: Array<string>,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre<UserInterface>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

userSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

const User = model<UserInterface>('Users', userSchema);

export default User;
