import { Router } from 'express';
import { router as users } from 'routes/api_v2/users/users';
import { healthController } from '../../controllers/health';

const router = Router();

router.use(`/users`, users);

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
