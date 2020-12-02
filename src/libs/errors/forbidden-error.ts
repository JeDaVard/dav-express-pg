import { CustomError } from './error-interfaces';

export class ForbiddenError extends CustomError {
    constructor(public reason: string = 'Forbidden!') {
        super('Not Found!');

        // Only because we are extending a build-in class
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
    code = 403;
    serialize() {
        return [{ message: this.reason }];
    }
}
