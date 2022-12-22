import { IsEmail, IsString, MaxLength, NotEquals } from 'class-validator';
import { Expose, Transform, TransformFnParams } from 'class-transformer';

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @MaxLength(100)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    email: string;

    @IsString()
    @MaxLength(16)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    password: string;

    @IsString()
    @MaxLength(100)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @NotEquals('', { message: '$property must not be empty string' })
    fullName: string;
}

export class UserDto {
    @Expose()
    userId: number;

    @Expose()
    email: string;

    @Expose()
    fullName: string;

    @Expose()
    createdAt: Date;
}
