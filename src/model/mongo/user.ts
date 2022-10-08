import { Schema, model } from 'mongoose';
import ICrud from '../ICrud';

interface IUser {
  id?: string;
  name: string;
  email: string;
  pass: string;
  salt: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
}, { id: true });

const UserModel = model('user', userSchema);

class User implements ICrud<IUser> {
  async selectByid(params: Record<string, unknown>): Promise<IUser | null> {
    const article = await UserModel.findOne(params);
    return article;
  }

  async selectAll(): Promise<IUser[]> {
    const articles = await UserModel.find();
    return articles;
  }

  async select(params: Record<string, unknown>): Promise<IUser[]> {
    const articles = await UserModel.find(params);
    return articles;
  }

  async insert(ele: IUser): Promise<IUser> {
    const article = new UserModel(ele);
    await article.save();
    return article;
  }

  async update(ele: Partial<IUser>, params: Record<string, unknown>): Promise<number> {
    const res = await UserModel.updateOne(params, ele);
    return res.modifiedCount;
  }

  async delete(params: Record<string, unknown>): Promise<number> {
    const res = await UserModel.deleteOne(params);
    return res.deletedCount;
  }
}

export { IUser, UserModel, User };
