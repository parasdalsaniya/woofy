import mongoose from 'mongoose';
import { MongodbAdapter } from '@lucia-auth/adapter-mongodb';

interface Session {
  user_id: string;
  expires_at: Date;
  _id: string;
}

export type TSession = Session;
const SessionSchema = new mongoose.Schema<Session>(
  {
    _id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  },
  { id: false, _id: false }
);

export default mongoose.models.Session ||
  mongoose.model<Session>('Session', SessionSchema);

export const adapter = new MongodbAdapter(
  mongoose.connection.collection('sessions'),
  mongoose.connection.collection('users')
);
