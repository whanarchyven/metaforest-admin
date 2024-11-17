import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import TaskCreateForm from '@/widgets/task-create-form/ui/TaskCreateForm';

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
          <h3 className={'font-bold'}>Создание задания</h3>
        </div>
        <TaskCreateForm buildingIdx={building_idx} />
      </main>
    </>
  );
}
