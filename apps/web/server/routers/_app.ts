import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { testRouter } from './test';

export const appRouter = router({
  test: testRouter,
  hello: publicProcedure
  .meta({description: 'hello world description'})
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;