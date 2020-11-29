import { Sequelize } from 'sequelize';

import { env } from 'config/environment';

const client = new Sequelize(env.PG_DATABASE, env.PG_USER, env.PG_PASSWORD, {
    host: env.PG_HOST,
    port: env.PG_PORT,
    dialect: 'postgres',
    logging: env.POSTGRES_LOGGING === '1' ? console.log : false, // eslint-disable-line no-console
    define: {
        freezeTableName: true,
    },
});

export { client };
