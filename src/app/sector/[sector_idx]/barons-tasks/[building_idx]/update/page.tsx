import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import TaskCreateForm from '@/widgets/task-create-form/ui/TaskCreateForm';
import BuildingTaskCreateForm from '@/widgets/building-task-create-form/ui/BuildingTaskCreateForm';
import { getSector } from '@/shared/api/getSector';
import { getAvailableSectorPlaces } from '@/shared/api/getAvailableSectorPlaces';
import BuildingTaskUpgradeForm from '@/widgets/building-task-upgrade-form/ui/BuildingTaskUpgradeForm';

export default async function Home({
  params,
}: {
  params: { building_idx: string };
}) {
  const { building_idx } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  return (
    <>
      <main key={building_idx} className={cvaRoot()}>
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>Создание задания на апгрейд</h3>
        </div>
        <BuildingTaskUpgradeForm building_idx={building_idx} />
      </main>
    </>
  );
}
