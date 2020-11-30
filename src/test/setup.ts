import { env } from 'config/environment';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// DO NOT UNCOMMENT THIS WITHOUT A DEEP INVESTIGATION
// jest.mock('@kuber-ticket/micro-events')

/* eslint-disable */
declare global {
    namespace NodeJS {
        interface Global {
            signUpAndCookie(
                email?: string,
                id?: mongoose.Types.ObjectId,
            ): { id: string; cookies: string[] };
        }
    }
}
/* eslint-enable */

// let mongo: any;
beforeAll(async () => {
    try {
        await mongoose.connect(env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (e) {
        console.error('[MongoDB] Error while connecting');
    }
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
    await mongoose.connection.close();
});

global.signUpAndCookie = (email, id) => {
    // Define a token payload for a user
    const payload = {
        id: id || new mongoose.Types.ObjectId(),
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

    return { id: payload.id.toHexString(), cookies };
};
