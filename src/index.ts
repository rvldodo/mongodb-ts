import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import UniversityController from './resources/university/university.controller';
import UserController from './resources/user/user.controller';
import validateEnv from './utils/validateEnv';

validateEnv();

const app = new App(
    [new UserController(), new UniversityController()],
    Number(process.env.PORT)
);

app.listen();
