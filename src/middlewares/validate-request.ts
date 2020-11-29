import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { RequestValidationError } from 'libs/errors';

interface ValidationSchema {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

enum FieldSourceKey {
    body = 'body',
    params = 'params',
    query = 'query',
}

const options = {
    abortEarly: false,
    errors: {
        escapeHtml: true,
        wrap: {
            label: false,
        },
    },
};

const validateReqBySchema = (req: Request, schemas: ValidationSchema) => {
    const validated = Object.entries(schemas).map(([key, schema]) => {
        const sourceType = key as FieldSourceKey;
        // eslint-disable-next-line
        const source = req[sourceType];
        return {
            errors: schema.validate(source, options).error,
            sourceType,
        };
    });
    return validated.filter((errObj) => !!errObj.errors);
};

export const validateRequest = (inputs: ValidationSchema) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const results = validateReqBySchema(req, inputs);

    if (results.length > 0) throw new RequestValidationError(results);

    next();
};
