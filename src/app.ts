import express from 'express';
import 'express-async-errors';
import session from 'cookie-session';
import router from 'routes';
import { headers } from 'utils/headers';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(headers);
app.use(express.json());
app.use(
    session({
        signed: false,
        secure: process.env.NODE_ENV === 'production',
    }),
);

// Inject apis
app.use(router);

export { app };
