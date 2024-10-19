import Button from '@/shared/ui/Button/Button';
import { cva } from 'class-variance-authority';

export default function Home() {
  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  return (
    <>
      <main className={cvaRoot()}>
        <h1>Next.js Project home page</h1>
        <Button href={'/another-page'}>Go to another page</Button>
      </main>
    </>
  );
}
