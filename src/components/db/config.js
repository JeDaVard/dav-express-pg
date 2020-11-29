const { environment } = require('../../utils/injectEnv');

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USER, PG_PASSWORD } = process.env;

module.exports = {
    [environment]: {
        host: PG_HOST,
        port: PG_PORT,
        database: PG_DATABASE,
        username: PG_USER,
        password: PG_PASSWORD,
        dialect: 'postgres',
    },
};
