import { cleanEnv, port, str, bool } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str({ choices: ['development', 'production'] }),
        JWT_EXPIRATION: str(),
        CREDENTIALS: bool(),
        JWT_SECRET: str(),
        LOG_FORMAT: str(),
        LOG_DIR: str(),
        DB_NAME: str(),
        ORIGIN: str(),
        PORT: port(),
    });
};

export default validateEnv;
