import { CORS_OPTIONS, DB_CONFIG } from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { Routes } from '@interfaces/routes.interface';
import { logger, stream } from '@utils/logger';
import swaggerUi from 'swagger-ui-express';
import { DataSource } from 'typeorm';
import { loadSeed } from './seed';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import yaml from 'yamljs';
import cors from 'cors';
import hpp from 'hpp';

class App {
    public app: express.Application;
    public env: string;
    public port: string | number;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 3000;

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info('=================================');
            logger.info(`======= ENV: ${this.env} =======`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info('=================================');
        });
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        const AppDataSource = new DataSource(DB_CONFIG);

        AppDataSource.initialize()
            .then(() => {
                console.log('Database: database connected!');
            })
            .then(loadSeed)
            .catch(err => {
                console.error(`Database: ${err.message || err}`);
            });
    }

    private initializeMiddlewares() {
        this.app.use(morgan(process.env.LOG_FORMAT as string, { stream }));
        this.app.use(cors(CORS_OPTIONS));
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeSwagger() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.load('swagger.yaml')));
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;
