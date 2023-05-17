import { container } from 'tsyringe';
import { z } from 'zod';
import WinstonService from '../libs/winston.service';
import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  llmchain: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      container.resolve(WinstonService).getClient().info(`${opts.input.text}`, { event: 'hello' });
    }),
});
