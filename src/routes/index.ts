import { Router } from 'express';
import { currentUser, errorHandler } from 'middlewares';
import { NotFoundError } from 'libs/errors';
import { router as apis } from './api';
import { env } from '../config/environment';

const router = Router();

router.use(currentUser);

router.use(`/${env.API_VERSION_URL}`, apis);

router.use('*', async () => {
    throw new NotFoundError();
});

router.use(errorHandler);

export default router;
