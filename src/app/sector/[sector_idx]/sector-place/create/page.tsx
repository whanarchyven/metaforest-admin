import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

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
  params: { sector_idx: string };
}) {
  const { sector_idx } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  return (
    <>
      <main key={sector_idx} className={cvaRoot()}>
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>
            Создание земли на секторе {sector_idx}
          </h3>
        </div>
        <SectorCreateForm />
      </main>
    </>
  );
}
