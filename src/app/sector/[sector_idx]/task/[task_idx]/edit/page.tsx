import SectorCreateForm from '@/widgets/sector-create-form/ui/SectorCreateForm';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

import { cva } from 'class-variance-authority';
import TaskCreateForm from '@/widgets/task-create-form/ui/TaskCreateForm';
import { getTask } from '@/shared/api/getTask';
import TaskEditForm from '@/widgets/task-update-form/ui/TaskUpdateForm';

export default async function Home({
  params,
}: {
  params: { task_idx: string };
}) {
  const { task_idx } = params;

  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  const task = await getTask(task_idx);

  return (
    <>
      <main key={task_idx} className={cvaRoot()}>
        <div className={'flex items-start justify-between'}>
          <h3 className={'font-bold'}>Редактирование задания {task.name}</h3>
        </div>
        <TaskEditForm initialData={task} />
      </main>
    </>
  );
}
