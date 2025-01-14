import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import TaskCreateForm from '@/widgets/task-create-form/ui/TaskCreateForm';
import BuildingTaskCreateForm from '@/widgets/building-task-create-form/ui/BuildingTaskCreateForm';
import { getSector } from '@/shared/api/getSector';
import { getAvailableSectorPlaces } from '@/shared/api/getAvailableSectorPlaces';
import ResourceTaskCreateForm from '@/widgets/resource-task-create-form/ui/ResourceTaskCreateForm';

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
          <h3 className={'font-bold'}>Создание задания</h3>
        </div>
        <ResourceTaskCreateForm sector_idx={sector_idx} />
      </main>
    </>
  );
}
