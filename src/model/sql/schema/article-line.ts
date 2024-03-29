/* eslint-disable max-classes-per-file */
import {
  Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey,
} from 'sequelize';
import { ArticleModel } from './article.js';

interface IArticleLine {
  id?: number;
  content: string;
  lang: string;
  article: number;
}

class ArticleLineModel extends Model<
InferAttributes<ArticleLineModel>,
InferCreationAttributes<ArticleLineModel>
> implements IArticleLine {
  declare id: number;

  declare content: string;

  declare lang: string;

  declare article: ForeignKey<ArticleModel['id']>;
}

async function initArticleLineModel(con: Sequelize) {
  await ArticleLineModel.init({
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize: con,
    modelName: 'article_line',
    tableName: 'article_line',
    updatedAt: false,
    createdAt: false,
  });

  await ArticleLineModel.belongsTo(ArticleModel, { foreignKey: 'article', targetKey: 'id' });
}

async function syncArticleLine() {
  await ArticleLineModel.sync();
}

export {
  IArticleLine,
  ArticleLineModel,
  initArticleLineModel,
  syncArticleLine,
};
