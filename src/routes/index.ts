import { Router } from 'express';
import { currentUser, errorHandler } from 'middlewares';
import { NotFoundError } from 'libs/errors';
import { router as apis } from './api';
import { router as apis_v2 } from './api_v2';
import { env } from '../config/environment';

const router = Router();

router.use(currentUser);

router.use(`/${env.API_VERSION_URL}`, apis);
router.use(`/${env.API_VERSION_V2_URL}`, apis_v2);

router.use('*', async () => {
    throw new NotFoundError();
});

router.use(errorHandler);

export default router;
