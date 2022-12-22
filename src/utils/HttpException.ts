import { Errors } from '@enums/errors.enum';

export class HttpException extends Error {
    status: number;
    error: Errors;
    message: string;

    constructor(status: number, error: Errors, message?: string) {
        super();
        this.status = status;
        this.error = error;
        this.message = message || '';
    }
}
