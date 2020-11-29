import { client } from '../components/db';
import { UserFactory } from './user';
import { VideoFactory } from './videos';
import { DataTypes } from 'sequelize';

/* eslint-disable */
export const User = UserFactory(client, DataTypes);
export const Video = VideoFactory(client, DataTypes);

Object.values(client.models).forEach((model: any) => {
    if ('associate' in model) {
        model.associate(client.models);
    }
});
/* eslint-enable */

async function fn() {
    // const user = User.build({ password: 'asdasd', email: 'a@a.com' });
    // await user.save();
    // const user = await User.findOne({ where: { id: 1 } });
    // const video = await Video.create({
    //     description: 'hey this is a #newvideo #foryou',
    //     videoUrl: 'https://somelink.com/video.mp4',
    //     userId: String(user?.id),
    // });
    const video = await Video.findOne({ where: { userId: 1 }, include: 'user' });
    // const user = await User.findOne({ where: { id: 1 }, include: 'videos' });
    // @ts-ignore
    // const videos = user?.videos;
    console.log(video);
    // console.log(user?.videos);
}

fn();
