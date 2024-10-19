import { cva } from 'class-variance-authority';
import SearchBar from '@/features/search-bar/ui/SearchBar';
import { getGameSessions } from '@/shared/api/getGameSessions';
import GameSession from '@/entities/game-session/ui/GameSession';

export default async function Home({
  searchParams,
}: {
  searchParams: { telegram_id: string };
}) {
  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  const cvaTitle = cva(['font-bold', 'mb-1']);

  const { telegram_id } = searchParams;
  console.log(telegram_id, 'TELEGRAM ID');

  const sessions = await getGameSessions(telegram_id);
  console.log(sessions);

  return (
    <main className={cvaRoot()}>
      <h1 className={cvaTitle()}>Игроки</h1>
      <SearchBar />
      <div className={'mt-2 grid grid-cols-5 gap-2'}>
        {sessions?.map((item, counter) => (
          <GameSession key={counter} user={item.user} />
        ))}
      </div>
    </main>
  );
}
