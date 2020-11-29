describe('Environment variables', () => {
    let initEnv = process.env.NODE_ENV;
    beforeEach(() => {
        process.env.NODE_ENV = initEnv;
    });
    afterEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it('environment has dev. test, stating, prod objects', async () => {
        const { envSchema } = require('config/environment/schema');

        const envSchemaKeys = Object.keys(envSchema);

        const hasDev = envSchemaKeys.includes('development');
        const hasTest = envSchemaKeys.includes('test');
        const hasStag = envSchemaKeys.includes('staging');
        const hasProd = envSchemaKeys.includes('production');

        expect(hasDev).toEqual(true);
        expect(hasTest).toEqual(true);
        expect(hasStag).toEqual(true);
        expect(hasProd).toEqual(true);
    });

    it('receives a string variable', async () => {
        const { env } = require('config/environment');
        expect(typeof Object.values(env)[0]).toEqual('string');
    });

    it('finds the correct NODE_ENV variable', async () => {
        const { env } = require('config/environment');
        expect(env.NODE_ENV).toBeDefined();
        expect(env.NODE_ENV).toEqual(process.env.NODE_ENV);
    });

    it('finds the correct dev env variable', async () => {
        const dev = (process.env.NODE_ENV = 'development');

        const { env: envDev } = require('config/environment');

        expect(envDev.NODE_ENV).toEqual(dev);
        // process.env.PORT = '';
    });

    it('Throws an error if a variable is missing', async () => {
        const { envVars } = require('config/environment/variables');
        const varNameKey = 'API_VERSION_URL';
        // eslint-disable-next-line
        delete envVars[varNameKey];

        jest.doMock('config/environment/variables', () => ({
            envVars,
            environment: 'test',
        }));

        expect(() => require('config/environment')).toThrowError(varNameKey);
    });

    it('should throw when there is a validation error', () => {
        jest.doMock('config/environment/variables', () => ({
            envVars: { notValidKey: 'notValidKey' },
            environment: 'test',
        }));

        expect(() => {
            require('config/environment');
        }).toThrowError();
    });
});
