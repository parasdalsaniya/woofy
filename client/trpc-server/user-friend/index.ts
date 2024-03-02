import { router, publicProcedure } from '..';
import dbConnect from '@/db/mongoose';
import userChat, { TUserChat } from '@/models/user-chat';
import chat, { TChat } from '@/models/chat';
import z from 'zod';
import userModel from '@/models/user-model';

export const userFriendRouter = router({
  sendChatRequest: publicProcedure
    .input((v) => {
      const schema = z.object({
        userId: z.string().min(1, { message: 'Sender Id is required' }),
        receiverId: z.string().min(1, { message: 'Receiver Id is required' }),
        receiverName: z
          .string()
          .min(1, { message: 'Receiver username is required' }),
      });

      const data = schema.safeParse(v);
      if (!data.success) {
        throw new Error(data.error.errors[0].message);
      }
      return data.data;
    })
    .mutation(async ({ input }) => {
      try {
        await dbConnect();
        const isUniqueChatRequest = await userChat.findOne({
          $or: [
            {
              userId: input.userId,
              receiverId: input.receiverId,
            },
            {
              userId: input.receiverId,
              receiverId: input.userId,
            },
          ],
        });

        if (isUniqueChatRequest) throw new Error('Chat request already sent');

        const newChat: TChat = await chat.create({
          senderId: input.userId,
          receiverId: input.receiverId,
          message: `Hello ${input.receiverName} 😇`,
        });

        const chatRequest: TUserChat = await userChat.create({
          userId: input.userId,
          receiverId: input.receiverId,
          chatId: newChat._id,
        });

        await userModel.findByIdAndUpdate(input.userId, {
          $push: { friends: input.receiverId },
        });

        return {
          status: true,
          message: 'Chat request sent successfully',
          data: chatRequest,
        };
      } catch (error: any) {
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
});
