import { Schema, model } from 'mongoose';
import ICrud from '../Icrud';

interface IArticle {
  id: string;
  title?: string;
  content?: string | [string];
  tags: [string];
  lang: string;
  author: string;
}

const articleSchema = new Schema<IArticle>({
  title: {
    type: String,
  },
  content: {
    type: Schema.Types.Mixed,
  },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  lang: {
    type: String,
    required: true,
    default: 'es',
  },
  author: {
    type: String,
    required: true,
  },
}, { id: true });

const ArticleModel = model('article', articleSchema);

class Article implements ICrud<IArticle> {
  async selectByid(id: string): Promise<IArticle | null> {
    const article = await ArticleModel.findById(id);
    return article;
  }

  async selectAll(): Promise<IArticle[]> {
    const articles = await ArticleModel.find();
    return articles;
  }

  async select(params: Record<string, unknown>): Promise<IArticle[] | null> {
    const articles = await ArticleModel.find(params);
    return articles;
  }

  async insert(ele: IArticle): Promise<IArticle> {
    const article = new ArticleModel(ele);
    await article.save();
    return article;
  }

  async update(ele: IArticle): Promise<boolean> {
    const res = await ArticleModel.updateOne(ele);
    return res.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const res = await ArticleModel.deleteOne({ _id: id });
    return res.deletedCount > 0;
  }
}

export default Article;
