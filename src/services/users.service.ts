import { Errors } from './../types/enums/errors.enum';
import { HttpException } from '@utils/HttpException';
import { UserEntity } from '@entities/users.entity';
import { CreateUserDto } from '@dtos/users.dto';
import { isObjectEmpty } from '@utils/util';

export class UserService {
    async getUsers(params: { userId?: number }): Promise<UserEntity[] | UserEntity | null> {
        if (params.userId) {
            const user = await UserEntity.findOneBy({ userId: params.userId });

            return user;
        }

        const users = await UserEntity.find();

        return users;
    }

    async createUser(body: CreateUserDto): Promise<UserEntity> {
        const user = await UserEntity.create({ email: body.email, password: body.password, fullName: body.fullName }).save();

        return user;
    }

    async updateUser(params: { userId?: number }, body: Partial<CreateUserDto>): Promise<UserEntity> {
        if (isObjectEmpty(params) && !params.userId) {
            throw new HttpException(400, Errors.BAD_REQUEST_ERROR, 'userId param is required!');
        }

        const user = await UserEntity.findOneBy({ userId: params.userId });

        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'User not found!');
        }

        const updatedUser = await UserEntity.save({ userId: params.userId, ...body });

        return updatedUser;
    }

    async deleteUser(params: { userId?: number }): Promise<boolean> {
        if (isObjectEmpty(params) && !params.userId) {
            throw new HttpException(400, Errors.BAD_REQUEST_ERROR, 'userId param is required!');
        }

        const user = await UserEntity.findOneBy({ userId: params.userId });

        if (!user) {
            throw new HttpException(404, Errors.USER_NOT_EXISTS, 'User not found!');
        }

        const deletedUser = await UserEntity.delete({ userId: params.userId });

        return !!deletedUser;
    }
}
