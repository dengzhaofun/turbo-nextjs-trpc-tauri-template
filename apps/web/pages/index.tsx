import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { trpc } from '../utils/trpc';

export default function HomePage() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  const router = useRouter()
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Button onClick={() => {
      }}>{hello.data?.greeting}</Button>
    </>
  );
}
