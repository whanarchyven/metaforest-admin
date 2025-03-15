export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';
import BunnyDropdown from '@/widgets/bunny-dropdown/ui/BunnyDropdown';

import BaseParamsForm from '@/widgets/base-params-form/ui/BaseParamsForm';

export default async function Home({
  params,
}: {
  params: { telegram_id: string };
}) {
  const { telegram_id } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  console.log(telegram_id);

  const session = await getGameSession(telegram_id);

  const attributes = session.activeBunny.deployedNftWithTrait.attributes.filter(
    (attribute) => {
      if (
        attribute.trait_type === 'str' ||
        attribute.trait_type === 'vit' ||
        attribute.trait_type === 'int' ||
        attribute.trait_type === 'dex' ||
        attribute.trait_type === 'krm'
      ) {
        return attribute;
      }
    }
  );

  console.log(attributes);

  return (
    <>
      <main key={telegram_id} className={cvaRoot()}>
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>
            {session.user.userInfo.username} - Базовые параметры
          </h3>
          <BunnyDropdown
            telegramId={session.user.userInfo.id}
            bunnies={session.bunnies}
            activeBunny={session.activeBunny}
          />
        </div>
        <div className={'flex items-center mb-3 gap-2'}>
          {attributes.map((attribute) => (
            <p className={'text-sm'} key={attribute.trait_type}>
              {attribute.trait_type}: {attribute.value}
            </p>
          ))}
        </div>
        <BaseParamsForm
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
