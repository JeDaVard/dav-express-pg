import httpMocks from 'node-mocks-http';

import { healthController } from './index';

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe('healthController', () => {
    /* eslint-disable */
    let req: httpMocks.MockRequest<any>;
    let res: httpMocks.MockResponse<any>;
    /* eslint-enable */

    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();

        res.json = jest.fn();
    });

    it(`should call res.send() with status object`, async () => {
        healthController(req, res);

        await sleep(100);

        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                status: 'OK',
            }),
        );
    });
});
