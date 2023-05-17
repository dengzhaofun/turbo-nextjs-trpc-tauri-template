import "reflect-metadata";

import { NextApiHandler } from 'next';
import { nextHandler } from 'trpc-playground/handlers/next';
import { appRouter } from '../../server/routers/_app';

const setupHandler = nextHandler({
  router: appRouter,
  // tRPC api path, pages/api/trpc/[trpc].ts in this case
  trpcApiEndpoint: '/api/trpc',
  playgroundEndpoint: '/api/trpc-playground',
  // uncomment this if you're using superjson
  // request: {
  //   superjson: true,
  // },
})

const handler: NextApiHandler = async (req, res) => {
  const playgroundHandler = await setupHandler
  await playgroundHandler(req, res)
}

export default handler