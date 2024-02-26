import { authRouter } from "./auth";
import { router } from "./index";

export const appRouter = router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
