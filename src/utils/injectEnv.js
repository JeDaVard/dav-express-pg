const { config } = require('dotenv');

const environment = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';

if (environment === 'development') config({ path: '.env.development' });
if (environment === 'test') config({ path: '.env.test' });

config();

config({ path: '.env.public' });

module.exports = { environment };
