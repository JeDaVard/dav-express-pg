import { Router } from 'express';
import { userController } from 'controllers';
import { validateRequest } from 'middlewares';
import { usersInputSchema } from 'config/validations';

const router = Router();

router.get('/me', userController.currentUser);
router.post('/sign-in', validateRequest(usersInputSchema.signIn), userController.signIn);
router.post('/sign-up', validateRequest(usersInputSchema.signUp), userController.signUp);
router.post('/sign-out', userController.signOut);

export { router };
