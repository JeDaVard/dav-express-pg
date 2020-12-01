import Joi from 'joi';

/* eslint-disable  @typescript-eslint/naming-convention */
const envSchema = {
    development: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.string().default(5000),
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.string().required(),
        PG_DATABASE: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_LOGGING: Joi.string(),
    })
        .unknown()
        .required(),
    test: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.string().required(),
        PG_DATABASE: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_LOGGING: Joi.string(),
    })
        .unknown()
        .required(),
    staging: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.string().required(),
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.string().required(),
        PG_DATABASE: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_LOGGING: Joi.string(),
    })
        .unknown()
        .required(),
    production: Joi.object({
        API_VERSION_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        PORT: Joi.string().required(),
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.string().required(),
        PG_DATABASE: Joi.string().required(),
        PG_USER: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_LOGGING: Joi.string(),
    })
        .unknown()
        .required(),
};
/* eslint-enable */

export { envSchema };
