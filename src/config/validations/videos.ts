import Joi from 'joi';

export const videosInputSchema = {
    createVideo: {
        body: Joi.object({
            description: Joi.string().required(),
            videoUrl: Joi.string().required(),
        }),
    },
    deleteVideo: {
        params: Joi.object({
            id: Joi.number().required(),
        }),
    },
};
