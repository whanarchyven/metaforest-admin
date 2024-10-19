import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';

export default async function Home({
  params,
}: {
  params: { telegram_id: string };
}) {
  const { telegram_id } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  console.log(telegram_id);

  const session = await getGameSession(telegram_id);
  console.log(session);

  return (
    <>
      <main className={cvaRoot()}>
        <h3 className={'font-bold'}>
          {session.user.userInfo.username} - Базовые параметры
        </h3>
      </main>
    </>
  );
}
