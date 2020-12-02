import request from 'supertest';
import { app } from 'app';
import { env } from 'config/environment';
import { User } from '../../../../models';

describe('Video feed API', () => {
    it('should have a feed api', async () => {
        const res = await request(app).get(`/${env.API_VERSION_URL}/videos`);
        expect(res.status).not.toBe(404);
    });
    it('should have an array in response for data', async () => {
        const response = await request(app).get(
            `/${env.API_VERSION_URL}/videos`,
        );
        expect(response.body.data.length).toBeDefined();
    });
});

describe('Video create API', () => {
    it('should have a create api', async () => {
        const response = await request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .send({});
        expect(response.status).not.toBe(404);
    });

    it('should response unauthorized with 401 if no auth', async () => {
        return request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .send({})
            .expect(401);
    });

    it('throws videoUrl required err and res bad 400 if no videoUrl', async () => {
        const user = global.signUpAndCookie();
        const res = await request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .set('Cookie', user.cookies)
            .send({ description: 'Some description' })
            .expect(400);
        expect(res.body.errors[0].message).toContain('videoUrl');
    });

    it('throws description required err and res bad 400 if no description', async () => {
        const user = global.signUpAndCookie();
        const res = await request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .set('Cookie', user.cookies)
            .send({ videoUrl: '' })
            .expect(400);
        expect(res.body.errors[0].message).toContain('description');
    });

    it('responses 201 if successfully created', async () => {
        const signUpUser = await User.create({
            email: 'a@a.com',
            password: 'qwe123',
        });
        const user = global.signUpAndCookie(signUpUser.email, signUpUser.id);
        const payload = {
            description: 'some desc',
            videoUrl: 'some url',
        };
        return request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .set('Cookie', user.cookies)
            .send(payload)
            .expect(201);
    });

    it("responses the data of created video if it's successfully created", async () => {
        const signUpUser = await User.create({
            email: 'a@a.com',
            password: 'qwe123',
        });
        const user = global.signUpAndCookie(signUpUser.email, signUpUser.id);
        const payload = {
            description: 'some desc',
            videoUrl: 'some url',
        };
        const res = await request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .set('Cookie', user.cookies)
            .send(payload);

        expect(res.body.data.description).toEqual(payload.description);
        expect(res.body.data.videoUrl).toEqual(payload.videoUrl);
        expect(res.body.data.userId).toBe(user.id);
    });
});

describe('Video delete API', () => {
    it('should have a delete api', async () => {
        const response = await request(app)
            .delete(`/${env.API_VERSION_URL}/videos/123`)
            .send({});
        expect(response.status).not.toBe(404);
    });

    it('should response unauthorized with 401 if no auth', async () => {
        return request(app)
            .delete(`/${env.API_VERSION_URL}/videos/123`)
            .send({})
            .expect(401);
    });

    it('throws 404 err if video does not exist', async () => {
        const user = global.signUpAndCookie();
        await request(app)
            .delete(`/${env.API_VERSION_URL}/videos/99999`)
            .set('Cookie', user.cookies)
            .send({})
            .expect(404);
    });

    it('throws 403 err if authed user is not the author of the video', async () => {
        const signUpUser = await User.create({
            email: 'a@a.com',
            password: 'qwe123',
        });
        const user = global.signUpAndCookie(signUpUser.email, signUpUser.id);
        const payload = {
            description: 'some desc',
            videoUrl: 'some url',
        };
        const res = await request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .set('Cookie', user.cookies)
            .send(payload);

        const otherUser = global.signUpAndCookie();

        await request(app)
            .delete(`/${env.API_VERSION_URL}/videos/${res.body.data.id}`)
            .set('Cookie', otherUser.cookies)
            .send({})
            .expect(403);
    });

    it('can successfully delete a video', async () => {
        const signUpUser = await User.create({
            email: 'a@a.com',
            password: 'qwe123',
        });
        const user = global.signUpAndCookie(signUpUser.email, signUpUser.id);
        const payload = {
            description: 'some desc',
            videoUrl: 'some url',
        };
        const res = await request(app)
            .post(`/${env.API_VERSION_URL}/videos`)
            .set('Cookie', user.cookies)
            .send(payload);

        await request(app)
            .delete(`/${env.API_VERSION_URL}/videos/${res.body.data.id}`)
            .set('Cookie', user.cookies)
            .send({})
            .expect(200);
    });
});
