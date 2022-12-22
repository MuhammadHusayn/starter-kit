import { NextFunction, Request, Response } from 'express';
import { UserDto, CreateUserDto } from '@dtos/users.dto';
import { stringValuesToPrimitives } from '@utils/util';
import { UserService } from '@services/users.service';
import { serializer } from '@utils/serializer';

class UsersController {
    userService = new UserService();

    getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params || {}) as { userId?: number };
            const users = await this.userService.getUsers(params);

            res.status(200).json(serializer(UserDto, users));
        } catch (error) {
            next(error);
        }
    };

    createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const body: CreateUserDto = req.body;
            const user = await this.userService.createUser(body);

            res.status(201).json({
                status: 201,
                message: 'User successfully created!',
                user: serializer(UserDto, user),
            });
        } catch (error) {
            next(error);
        }
    };

    updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params || {}) as { userId?: number };
            const body: Partial<CreateUserDto> = req.body;
            const user = await this.userService.updateUser(params, body);

            res.status(200).json({
                status: 201,
                message: 'User successfully updated!',
                user: serializer(UserDto, user),
            });
        } catch (error) {
            next(error);
        }
    };

    deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const params = stringValuesToPrimitives(req.params || {}) as { userId?: number };
            await this.userService.deleteUser(params);

            res.status(200).json({
                status: 201,
                message: 'User successfully deleted!',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
