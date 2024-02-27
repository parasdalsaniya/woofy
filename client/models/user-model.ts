import { TUserData } from '@/components/auth/signup';
import mongoose from 'mongoose';

export type TUser = TUserData & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const UserSchema = new mongoose.Schema<TUserData>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<TUserData>('User', UserSchema);
