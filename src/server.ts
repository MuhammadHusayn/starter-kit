import App from '@/app';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new UsersRoute()]);

app.listen();
