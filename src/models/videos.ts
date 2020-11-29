import { Sequelize, Model, DataTypes, BelongsToCreateAssociationMixin } from 'sequelize';
import { User } from './index';
import { UserInstance } from './user';

export interface VideoAttributes {
    id: number;
    description: string;
    videoUrl: string;
    tags: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
    user?: UserInstance;
}

// export interface VideoCreationAttributes
//   extends Optional<VideoAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
export interface VideoCreationAttributes {
    description: string;
    videoUrl: string;
    userId: string;
}

export interface VideoInstance
    extends Model<VideoAttributes, VideoCreationAttributes>,
        VideoAttributes {
    getUser: BelongsToCreateAssociationMixin<UserInstance>;
    // user: UserInstance;
}

function VideoFactory(client: Sequelize, Sequelize: typeof DataTypes) {
    const video = client.define<VideoInstance>(
        'Video',
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            videoUrl: {
                allowNull: false,
                type: Sequelize.STRING(1000),
            },
            tags: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: User,
                    key: 'id',
                },
            },
        },
        {
            timestamps: true,
            tableName: 'videos',
        },
    ) as ModelCtor<VideoInstance>;

    // Associations
    video.associate = ({ User }) => {
        video.belongsTo(User, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            targetKey: 'id',
            as: 'user',
        });
    };

    // Hooks
    video.addHook('beforeSave', async (Video) => {
        if (Video.changed() && (Video.changed() as string[]).includes('description')) {
            const tags = Video.getDataValue('description').match(/(#[a-zA-Z\d]+\b)/g);
            if (tags) {
                Video.setDataValue('tags', String(tags));
            }
        }
    });

    return video;
}

export { VideoFactory };
