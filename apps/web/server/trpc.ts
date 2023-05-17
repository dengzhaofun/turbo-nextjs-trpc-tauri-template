import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { TRPCPanelMeta } from 'trpc-panel';
import { Context } from './context';
import { authMiddleware } from './middlewares/auth.middleware';
import { typeormMiddleware } from './middlewares/typeorm.middleware';

interface Meta {
  authRequired: boolean;
  role?: 'user' | 'admin';
}

const t = initTRPC.context<Context>().meta<TRPCPanelMeta | Meta>().create({
  transformer: superjson,
  defaultMeta: {
    authRequired: false,
  },
});

export const publicProcedure = t.procedure;


export const authProcedure = publicProcedure
  .use(t.middleware(authMiddleware))
  .meta({
    authRequired: true,
    role: 'user',
  });

export const adminProcedure = authProcedure.meta({
  authRequired: true,
  role: 'admin',
});

// Base router and procedure helpers
export const router = t.router;

