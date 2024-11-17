import { cva } from 'class-variance-authority';
import { getSectors } from '@/shared/api/getSectors';
import Sector from '@/entities/sector/ui';
import Link from 'next/link';

export default async function Home({}: {
  searchParams: { telegram_id: string };
}) {
  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  const cvaTitle = cva(['font-bold', 'mb-1']);

  const cvaHeader = cva(['flex justify-between my-4']);

  const cvaButton = cva([
    'px-2 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);

  const sectors = await getSectors();
  console.log(sectors);

  return (
    <main className={cvaRoot()}>
      <h1 className={cvaTitle()}>Привет, мир!</h1>
      <div className={cvaHeader()}>
        <p>Сектора</p>
        <Link className={cvaButton()} href={'/sector/create/'}>
          Добавить сектор
        </Link>
      </div>
      <div className={'grid grid-cols-5 gap-3'}>
        {sectors.map((sector) => (
          <Sector key={sector.idx} {...sector} />
        ))}
      </div>
    </main>
  );
}
