import { RequestHandler, NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import { HttpException } from '@utils/HttpException';
import { plainToInstance } from 'class-transformer';
import { Errors } from '@enums/errors.enum';

const validationMiddleware = (
    type: ClassType,
    value: string | 'body' | 'query' | 'params' | 'headers' = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToInstance(type, req[value as keyof typeof req]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then(
            (errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors
                        .map((error: ValidationError) => {
                            if (error.constraints) {
                                return Object.values(error.constraints || {});
                            }

                            return error.children?.map((error: ValidationError) => Object.values(error.constraints || {}));
                        })
                        .join(', ');
                    next(new HttpException(400, Errors.VALIDATION_ERROR, message));
                } else {
                    next();
                }
            },
        );
    };
};

export default validationMiddleware;
