import { Request, Response, NextFunction } from 'express';
import { CustomError } from 'libs/errors/error-interfaces';
import { response } from 'utils';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        response(res, err.code, false, null, 'Failed', err.serialize());
        return;
    }
    // console.info('[ERROR] Unexpected error from errorHandler');
    response(res, 500, false, null, 'Internal Server Error', [
        { message: 'Something went wrong!' },
    ]);
};
