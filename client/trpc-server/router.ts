import { authRouter } from './auth';
import { router } from './index';
import { userRouter } from './user';
import { userFriendRouter } from './user-friend';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  userFriend: userFriendRouter,
});

export type AppRouter = typeof appRouter;
