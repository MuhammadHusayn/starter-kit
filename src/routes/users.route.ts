import validationMiddleware from '@middlewares/validation.middleware';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { CreateUserDto } from '@dtos/users.dto';
import { Router } from 'express';

class UsersRoute implements Routes {
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/users', this.usersController.getUsers);
        this.router.get('/users/:userId(\\d+)', this.usersController.getUsers);
        this.router.post('/users', validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
        this.router.put('/users/:userId(\\d+)', validationMiddleware(CreateUserDto, 'body', true), this.usersController.updateUser);
        this.router.delete('/users/:userId(\\d+)', this.usersController.deleteUser);
    }
}

export default UsersRoute;
