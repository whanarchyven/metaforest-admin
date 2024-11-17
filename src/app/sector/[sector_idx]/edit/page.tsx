import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';
import BunnyDropdown from '@/widgets/bunny-dropdown/ui/BunnyDropdown';

import BaseParamsForm from '@/widgets/base-params-form/ui/BaseParamsForm';
import SectorEditForm from '@/widgets/sector-edit-form/ui/SectorEditForm';
import { getSector } from '@/shared/api/getSector';

export default async function Home({
  params,
}: {
  params: { sector_idx: string };
}) {
  const { sector_idx } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  const sector = await getSector(sector_idx);

  return (
    <>
      <main key={sector_idx} className={cvaRoot()}>
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>Редактирование сектора</h3>
        </div>
        <SectorEditForm initialData={sector} />
      </main>
    </>
  );
}
