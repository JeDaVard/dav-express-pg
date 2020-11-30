import request from 'supertest';
import { app } from 'app';
import { env } from 'config/environment';

describe('User Sign-In', () => {
    it('returns 200 and set cookie after successful sign in', async () => {
        try {
            await request(app)
                .post(`/${env.API_VERSION_URL}/users/sign-up`)
                .send({
                    email: 'test@test.com',
                    password: 'aaaaaa',
                })
                .expect(201);
        } catch (e) {
            throw new Error(e);
        }
        const response = await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-in`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa',
            })
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });

    it('returns 400 if missing email or password', async () => {
        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-in`)
            .send({
                email: '',
                password: 'aaaaaa',
            })
            .expect(400);
        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-in`)
            .send({
                email: 'test@test.com',
                password: '',
            })
            .expect(400);
    });

    it('returns 400 when sign in without sign up', async () => {
        return request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-in`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa',
            })
            .expect(400);
    });

    it('returns 400 when sign in with wrong password', async () => {
        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa1',
            })
            .expect(201);
        return request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-in`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa2',
            })
            .expect(400);
    });
});

describe('User Sign-up', () => {
    it('returns a 201 on successful sign up', async () => {
        return request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa',
            })
            .expect(201);
    });

    it('returns a 400 with an invalid email', async () => {
        return request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'invalidEmail',
                password: 'aaaaaa',
            })
            .expect(400);
    });

    it('returns a 400 with an invalid password', async () => {
        return request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
                password: 'a',
            })
            .expect(400);
    });

    it('returns a 400 when missing email or password', async () => {
        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
            })
            .expect(400);

        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                password: 'aaaaaa',
            })
            .expect(400);
    });

    it('returns a 400 when use existing email to sign-up', async () => {
        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa',
            })
            .expect(201);

        await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa',
            })
            .expect(400);
    });

    it('sets a cookie after a successful sign-up', async () => {
        const response = await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-up`)
            .send({
                email: 'test@test.com',
                password: 'aaaaaa',
            })
            .expect(201);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});

describe('Current user route', () => {
    it("returns current user's details", async () => {
        const email = 'some-email@example.com';
        const user = global.signUpAndCookie(email);

        let response = await request(app)
            .get(`/${env.API_VERSION_URL}/users/me`)
            .set('Cookie', user.cookies)
            .send()
            .expect(200);

        expect(response.body.data.currentUser.email).toEqual(email);
    });

    it("returns current user's details", async () => {
        let response = await request(app)
            .get(`/${env.API_VERSION_URL}/users/me`)
            .send()
            .expect(200);
        expect(response.body.data.currentUser).toBeNull();
    });
});

describe('User sign-out route', () => {
    it('returns 200 and invalidate the cookie after successful sign out', async () => {
        await request(app).post(`/${env.API_VERSION_URL}/users/sign-up`).send({
            email: 'test@test.com',
            password: 'aaaaaa',
        });

        const response = await request(app)
            .post(`/${env.API_VERSION_URL}/users/sign-out`)
            .expect(200);

        expect(response.get('Set-Cookie')[0]).toEqual(
            'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
        );
    });
});
