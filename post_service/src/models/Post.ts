import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from "../db.js";

export interface PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
    id: CreationOptional<number>,
    author: number,
    title: string,
    description: string
}

const Post = db.define<PostModel>('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
});

export { Post };
export default Post;