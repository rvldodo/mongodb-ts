import ErrorMiddleware from '@/middleware/error.middleware';
import Controller from '@/utils/interfaces/controller.interface';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';

class App {
    public express: Application;
    public port: number;

    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initializeMiddleware();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initializeErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    private async initializeDatabaseConnection(): Promise<void> {
        const { MONGO_HOST } = process.env;
        await mongoose.connect(MONGO_HOST as string);
        console.log(`connecting to DB: ${MONGO_HOST} successfully`);
    }

    public listen(): void {
        this.express.listen(this.port, async () => {
            console.log(`Server listening on port ${this.port}`);
            this.initializeDatabaseConnection();
        });
    }
}

export default App;
