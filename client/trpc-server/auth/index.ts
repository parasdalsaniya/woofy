import userModel, { TUser } from '@/models/user-model';
import dbConnect from '@/db/mongoose';
import { router, publicProcedure } from '..';
import { Argon2id } from 'oslo/password';
import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';
import z from 'zod';
import authModel, { TSession } from '@/models/auth-model';
import redisClient from '@/redis/redis';

export const common = {
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password is too short' })
    .max(20, { message: 'Password is too long' }),
};

export const loginSchema = z.object({
  ...common,
});

export const commonTwo = {
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name is too long' }),
  username: z
    .string()
    .min(3, { message: 'Username is too short man' })
    .max(31, { message: 'Username is too long' })
    .regex(/^[a-z0-9_-]+$/, { message: 'Invalid username' }),
};

const signUpSchema = z.object({
  ...common,
  ...commonTwo,
});

export const authRouter = router({
  createAccount: publicProcedure
    .input((v) => {
      const data = signUpSchema.safeParse(v);
      if (!data.success) {
        throw new Error(data.error.errors[0].message);
      }
      return data.data;
    })
    .mutation(async ({ input }) => {
      try {
        const existingUser = await userModel.findOne({
          email: input.email.toLowerCase(),
          username: input.username.toLowerCase(),
        });

        if (existingUser) throw new Error('Email is already registered');

        const hashedPassword = await new Argon2id().hash(input.password);

        await dbConnect();
        await userModel.create({
          ...input,
          password: hashedPassword,
          email: input.email.toLowerCase(),
        });

        return { status: true, message: 'Account created successfully' };
      } catch (error: any) {
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
  login: publicProcedure
    .input((v) => {
      const data = loginSchema.safeParse(v);
      if (!data.success) {
        throw new Error(data.error.errors[0].message);
      }
      return data.data;
    })
    .mutation(async ({ input }) => {
      try {
        await dbConnect();
        const user: TUser | null = await userModel.findOne({
          email: input.email.toLowerCase(),
        });
        if (!user) throw new Error('Email is not registered');

        const validPassword = await new Argon2id().verify(
          user.password,
          input.password
        );
        if (!validPassword) throw new Error('Incorrect password');

        const session = await lucia.createSession(user._id, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );

        const { password, ...userData } = user;
        redisClient.set(`session:${session.id}`, JSON.stringify(userData));

        return {
          status: true,
          message: 'Logged in successfully',
          data: {
            id: user._id.toString(),
            email: user.email,
            image: user.image,
            bio: user.bio,
            name: user.name,
            username: user.username,
          },
          cookies: {
            value: sessionCookie.value,
          },
        };
      } catch (error: any) {
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
  checkUserName: publicProcedure
    .input((v) => {
      const data = z.string().safeParse(v);
      if (!data.success) {
        throw new Error(data.error.errors[0].message);
      }
      return data.data;
    })
    .mutation(async ({ input }) => {
      try {
        const session = cookies();
        const sessionId = session.get('auth_session');

        await dbConnect();

        if (sessionId === undefined) {
          const user: TUser | null = await userModel.findOne({
            username: input.toLowerCase(),
          });
          if (user) return true;
          return false;
        }

        const sessionUser: TSession | null = await authModel.findOne({
          _id: sessionId?.value,
        });

        const isUser: TUser | null = await userModel.findById(
          sessionUser?.user_id?.toString()
        );

        if (isUser?.username === input.toLowerCase()) {
          return false;
        }

        const user: TUser | null = await userModel.findOne({
          username: input.toLowerCase(),
        });
        if (user) return true;
        return false;
      } catch (error: any) {
        console.log(error);
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
  logout: publicProcedure.mutation(async () => {
    try {
      const { session } = await validateRequest();
      if (!session) throw new Error('Unauthorized');

      await lucia.invalidateSession(session.id);
      redisClient.del(`session:${session.id}`);
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return true;
    } catch (error: any) {
      throw new Error(error.message || 'An unknown error occurred');
    }
  }),
});
