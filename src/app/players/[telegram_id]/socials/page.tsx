import SocialParamsForm from '@/widgets/social-params-form/ui/SocialParamsForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';
import BunnyDropdown from '@/widgets/bunny-dropdown/ui/BunnyDropdown';

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
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>
            {session.user.userInfo.username} - Социальные параметры
          </h3>
          <BunnyDropdown
            telegramId={session.user.userInfo.id}
            bunnies={session.bunnies}
            activeBunny={session.activeBunny}
          />
        </div>
        <SocialParamsForm
          session={session}
          initialFormData={{
            ...session.activeBunny,
            energy: session.energy,
            energyLimit: session.energyLimit,
          }}
        />
      </main>
    </>
  );
}
