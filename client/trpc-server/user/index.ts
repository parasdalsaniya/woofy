import { router, publicProcedure } from '..';
import userModel from '@/models/user-model';
import dbConnect from '@/db/mongoose';
import { z } from 'zod';
import { commonTwo } from '../auth';

const schema = z.object({
  ...commonTwo,
  bio: z.string().max(160, { message: 'Bio is too long' }).optional(),
  id: z.string().min(1, { message: 'Id is required' }),
  image: z.string().optional(),
});

export const userRouter = router({
  updateUser: publicProcedure
    .input((v) => {
      const data = schema.safeParse(v);
      if (!data.success) {
        throw new Error(data.error.errors[0].message);
      }
      return data.data;
    })
    .mutation(async ({ input }) => {
      try {
        await dbConnect();
        const isUniqueUserName = await userModel.findOne({
          username: input.username.toLowerCase(),
          _id: { $ne: input.id },
        });

        if (isUniqueUserName) throw new Error('Username is already taken');

        const user = await userModel.findByIdAndUpdate(input.id, {
          userName: input.username.toLowerCase(),
          ...input,
        });
        if (!user) throw new Error('User not found');

        return { status: true, message: 'Profile updated successfully' };
      } catch (error: any) {
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
});
