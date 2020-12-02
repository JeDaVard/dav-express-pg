import { Router } from 'express';
import { router as users } from 'routes/api/users/users';
import { router as videos } from 'routes/api/videos/videos';
import { healthController } from '../../controllers/health';
import { currentUser } from '../../middlewares';

const router = Router();

router.use(currentUser);

router.use(`/users`, users);
router.use(`/videos`, videos);

/**
 * @api {get} /health Request Health information
 * @apiVersion 0.0.0
 * @apiName GetHealth
 * @apiDescription Provides health of the service.
 * @apiGroup Health
 *
 * @apiSuccess {Object} health Health of the Service.
 * @apiSuccess {String} health.status Status.
 * @apiSuccess {String} health.date Date.
 *
 * @apiError {Object} error Error description
 */
router.get('/health', healthController);

export { router };
