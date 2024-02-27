import userModel, { TUser } from '@/models/user-model';
import dbConnect from '@/db/mongoose';
import { router, publicProcedure } from '..';
import { Argon2id } from 'oslo/password';
import { lucia, validateRequest } from '@/lib/auth';
import { cookies } from 'next/headers';
import z from 'zod';

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

export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(50, { message: 'Name is too long' }),
  ...common,
  username: z
    .string()
    .min(3, { message: 'Username is too short man' })
    .max(31, { message: 'Username is too long' })
    .regex(/^[a-z0-9_-]+$/, { message: 'Invalid username' }),
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
        return {
          status: true,
          message: 'Logged in successfully',
          data: { id: user._id.toString(), email: user.email },
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
        await dbConnect();
        const user: TUser | null = await userModel.findOne({
          username: input.toLowerCase(),
        });
        if (user) return true;
        return false;
      } catch (error: any) {
        throw new Error(error.message || 'An unknown error occurred');
      }
    }),
  logout: publicProcedure.mutation(async () => {
    try {
      const { session } = await validateRequest();
      if (!session) throw new Error('Unauthorized');

      await lucia.invalidateSession(session.id);
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
