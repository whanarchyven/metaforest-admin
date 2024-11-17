import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import { getGameSession } from '@/shared/api/getGameSession';
import BunnyDropdown from '@/widgets/bunny-dropdown/ui/BunnyDropdown';

import BaseParamsForm from '@/widgets/base-params-form/ui/BaseParamsForm';
import BuildingCreateForm from '@/widgets/building-create-form/ui/BuildingCreateForm';

export default async function Home({
  params,
}: {
  params: { sector_idx: string; sector_place_idx: string };
}) {
  const { sector_idx, sector_place_idx } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  return (
    <>
      <main key={sector_place_idx} className={cvaRoot()}>
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>
            Создание здания на владении {sector_place_idx}
          </h3>
        </div>
        <BuildingCreateForm placeIdx={sector_place_idx} />
      </main>
    </>
  );
}
