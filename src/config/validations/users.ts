import Joi from 'joi';

export const usersInputSchema = {
    signIn: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(3).max(20).required(),
        }),
    },
    signUp: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(3).max(20).required(),
        }),
    },
};
