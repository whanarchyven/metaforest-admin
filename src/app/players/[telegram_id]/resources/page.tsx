export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';

import ResourcesParamsForm from '@/widgets/resources-params-form/ui/ResourcesParamsForm';

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
        <h3 className={'font-bold mb-3'}>
          {session.user.userInfo.username} - Ресурсы
        </h3>
        <ResourcesParamsForm
          session={session}
          initialFormData={{ resources: session.resources }}
        />
      </main>
    </>
  );
}
