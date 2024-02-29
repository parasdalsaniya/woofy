import { authRouter } from './auth';
import { router } from './index';
import { userRouter } from './user';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
