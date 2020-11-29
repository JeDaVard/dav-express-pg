import { envSchema } from './schema';
import { envVars, environment } from './variables';

const { value: env, error } = envSchema[environment as keyof typeof envSchema].validate(envVars, {
    abortEarly: false,
});

if (error) {
    const errors = error.details.map((err) => err.message);

    throw new Error(`Missing ${errors.length} env variable(s):
    ${errors.join('\n').toString()}`);
}

export { env };
