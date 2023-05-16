import UserInterface from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';
import jwt from 'jsonwebtoken';

export const generateToken = (user: UserInterface): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string
): Promise<Token | jwt.JsonWebTokenError> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject(err);

                resolve(payload as Token);
            }
        );
    });
};

export default { generateToken, verifyToken };
