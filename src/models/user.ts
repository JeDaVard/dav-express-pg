import { Sequelize, Model, DataTypes, Optional, HasManyAddAssociationMixin } from 'sequelize';
import { Password } from '../libs/passwords';
import { VideoInstance } from './videos';

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    videos?: VideoInstance[] | VideoInstance['id'][];
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}
// export interface UserCreationAttributes {
//     email: string;
//     password: string;
// }

export interface UserInstance
    extends Model<UserAttributes, UserCreationAttributes>,
        UserAttributes {
    getVideos: HasManyAddAssociationMixin<VideoInstance, VideoInstance['id']>;
    // videos: VideoInstance[];
}

function UserFactory(client: Sequelize, Sequelize: typeof DataTypes) {
    const user = client.define<UserInstance>(
        'User',
        {
            id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING(50),
                unique: true,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        },
        {
            timestamps: true,
            tableName: 'users',
        },
    ) as ModelCtor<UserInstance>;

    // Associations
    user.associate = ({ Video }) => {
        user.hasMany(Video, {
            foreignKey: {
                name: 'userId',
                allowNull: false,
            },
            as: 'videos',
            onDelete: 'CASCADE',
        });
    };

    // Hooks
    user.addHook('beforeSave', async (user) => {
        if (user.changed() && (user.changed() as string[]).includes('password')) {
            const hashed = await Password.toHash(user.getDataValue('password'));
            user.setDataValue('password', hashed);
        }
    });

    return user;
}

export { UserFactory };
