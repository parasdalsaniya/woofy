import mongoose from 'mongoose';

interface IUserChat {
  userId: Object;
  chatId: Object;
  receiverId: Object;
}

export type TUserChat = IUserChat & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const UserChat = new mongoose.Schema<IUserChat>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UserChat ||
  mongoose.model<IUserChat>('UserChat', UserChat);
