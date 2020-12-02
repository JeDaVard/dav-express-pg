import { Video } from '../models';
import { response } from '../utils';
import { Response, Request } from 'express';
import { ForbiddenError, NotFoundError } from '../libs/errors';

export const feedVideos = async (req: Request, res: Response) => {
    const videos = await Video.findAll();

    response(res, 200, true, videos);
};

export const createVideo = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { description, videoUrl } = req.body;

    const video = Video.build({ userId: id, description, videoUrl });
    await video.save();

    response(res, 201, true, video);
};

export const deleteVideo = async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    const video = await Video.findOne({ where: { id } });
    if (!video) throw new NotFoundError();
    if (video.userId !== userId) throw new ForbiddenError();

    await video.destroy();

    response(res, 200, true, null);
};
