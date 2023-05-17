import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions extends Partial<CreateNextContextOptions>  {
  // session: Session | null
  user?: {uid: string, role: string}
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {req: Request, user: undefined};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: trpcNext.CreateNextContextOptions,
) {
  // for API-response caching see https://trpc.io/docs/caching
  
  // return await createContextInner({});

  const contextInner = await createContextInner({});

  return {...contextInner, req: opts.req as any, user: undefined};
}