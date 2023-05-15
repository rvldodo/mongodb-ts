import { cleanEnv, num, port, str } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production'],
        }),
        MONGO_HOST: str(),
        MONGO_PASSWORD: str(),
        MONGO_USER: str(),
        PORT: port({ default: 3000 }),
    });
}

export default validateEnv;
