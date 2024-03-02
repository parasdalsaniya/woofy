import { router, publicProcedure } from '..';
import userModel, { TUser } from '@/models/user-model';
import dbConnect from '@/db/mongoose';
import { z } from 'zod';
import { commonTwo } from '../auth';
import { cookies } from 'next/headers';
import authModel, { TSession } from '@/models/auth-model';

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

        const user = await userModel
          .findByIdAndUpdate(
            input.id,
            {
              userName: input.username.toLowerCase(),
              ...input,
            },
            { new: true }
          )
          .select('-password -createdAt -updatedAt');
        if (!user) throw new Error('User not found');

        return {
          status: true,
          message: 'Profile updated successfully',
          data: user,
        };
      } catch (error: any) {
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
  getAllUser: publicProcedure.query(async () => {
    try {
      const session = cookies();
      const userSession = session.get('auth_session');
      await dbConnect();

      const sessionUser: TSession | null = await authModel.findOne({
        _id: userSession?.value,
      });
      const user: TUser | null = await userModel
        .findById(sessionUser?.user_id)
        .lean();

      type TUserWithIsFriend = TUser & {
        isFriend: boolean;
      };

      let users: TUserWithIsFriend[] = await userModel
        .find({ _id: { $ne: user?._id?.toString() } })
        .lean()
        .select('-password -createdAt -updatedAt');

      for (let i = 0; i < users.length; i++) {
        if (user?.friends?.includes(users[i]._id.toString())) {
          users[i].isFriend = true;
        } else {
          users[i].isFriend = false;
        }
      }

      return {
        status: true,
        message: 'Users fetched successfully',
        data: users,
      };
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred');
    }
  }),
});
