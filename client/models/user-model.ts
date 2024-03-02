import { TUserData } from '@/components/auth/signup';
import mongoose from 'mongoose';

export type TUser = TUserData & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  bio: string;
  friends: string[];
};

type TOtherFields = {
  image: string;
  bio: string;
  friends: string[];
};

const UserSchema = new mongoose.Schema<TUserData & TOtherFields>(
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
    image: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    friends: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model<TUserData & TOtherFields>('User', UserSchema);
