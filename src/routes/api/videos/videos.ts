import { Router } from 'express';
import { videoController } from 'controllers';
import { requireAuth, validateRequest } from '../../../middlewares';
import { videosInputSchema as validate } from 'config/validations';

const router = Router();

router
    .route('/')
    .get(videoController.feedVideos)
    .post(requireAuth, validateRequest(validate.createVideo), videoController.createVideo);

router
    .route('/:id')
    .delete(requireAuth, validateRequest(validate.deleteVideo), videoController.deleteVideo);

export { router };
