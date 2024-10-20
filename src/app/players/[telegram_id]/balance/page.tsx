export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';

import AddLootboxBtn from '@/features/add-lootbox-btn/ui/AddLootboxBtn';
import BalanceParamsForm from '@/widgets/balance-params-form/ui/BalanceParamsForm';

export default async function Home({
  params,
}: {
  params: { telegram_id: string };
}) {
  const { telegram_id } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  console.log(telegram_id);

  const session = await getGameSession(telegram_id);

  return (
    <>
      <main key={telegram_id} className={cvaRoot()}>
        <h3 className={'font-bold'}>
          {session.user.userInfo.username} - Баланс и активы
        </h3>
        <div className={'flex items-start my-3 gap-3'}>
          <p>Лутбоксы: {session.lootboxes.length}</p>
          <AddLootboxBtn telegram_id={session.user.userInfo.id} />
        </div>
        <BalanceParamsForm
          session={session}
          initialFormData={{
            mfgt: session.mfgt,
            tonBalance: session.tonBalance,
          }}
        />
      </main>
    </>
  );
}
