import { env } from 'config/environment';
import jwt from 'jsonwebtoken';
import { client } from 'components/db';

// DO NOT UNCOMMENT THIS WITHOUT A DEEP INVESTIGATION
// jest.mock('@kuber-ticket/micro-events')

/* eslint-disable */
declare global {
    namespace NodeJS {
        interface Global {
            signUpAndCookie(email?: string, id?: number): { id: string; cookies: string[] };
        }
    }
}
/* eslint-enable */

// let mongo: any;
beforeAll(async () => {
    try {
        // connect to db
        await client.authenticate();
    } catch (e) {
        console.error('[DB] Error while connecting');
    }
});

beforeEach(async () => {
    // drop everything in DB
    for (const model of Object.values(client.models)) {
        await model.destroy({
            truncate: true,
            // force: true,
            cascade: true,
        });
    }
    // await client.sync({force: true})
});

afterAll(async () => {
    // drop everything and close the connection
    for (const model of Object.values(client.models)) {
        await model.destroy({
            truncate: true,
            // force: true,
            cascade: true,
        });
    }
    await client.close();
});

global.signUpAndCookie = (email, id) => {
    // Define a token payload for a user
    const payload = {
        id: id || 1,
        email: email || 'text@example.com',
    };
    // Sign a token
    const token = jwt.sign(payload, env.JWT_SECRET);
    // Create a session object
    const session = { jwt: token };
    const sessionJson = JSON.stringify(session);
    // Convert to base64 format
    const base64 = Buffer.from(sessionJson).toString('base64');
    // Imitate default expressJS session-cookies appearance
    const cookies = [`express:sess=${base64}`];

    return { id: String(payload.id), cookies };
};
