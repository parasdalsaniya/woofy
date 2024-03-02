import mongoose from 'mongoose';

interface IChat {
  senderId: Object;
  receiverId: Object;
  message: string;
  image: string;
  video: string;
  file: string;
  isViewed: boolean;
  isDeleted: boolean;
}

export type TChat = IChat & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

const Chat = new mongoose.Schema<IChat>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    video: {
      type: String,
      default: '',
    },
    file: {
      type: String,
      default: '',
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Chat || mongoose.model<IChat>('Chat', Chat);
