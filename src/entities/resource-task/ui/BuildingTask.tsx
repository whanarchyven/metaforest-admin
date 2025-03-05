import React, { FC } from 'react';
import { IMetaforestBuildTask } from '@/shared/types/backend/MetaforestBuildTask/types/MetaforestBuildTask';
import { cva } from 'class-variance-authority';
import { parseISODuration } from '@/shared/utils/parseISODuration';
import ProgressBar from '@/shared/ui/ProgressBar';
import Button from '@/shared/ui/Button/Button';
import { IMetaforestResourceTask } from '@/shared/types/backend/MetaforestResourceTask/types/MetaforestBuildTask';
import DeleteBtn from '@/features/delete-btn';
interface ResourceTaskInterface {
  task: IMetaforestResourceTask;
}

const ResourceTask: FC<ResourceTaskInterface> = ({ task }) => {
  const cvaTextRow = cva(['text-base text-sm']);
  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);
  return (
    <div className={'border-2 border-black rounded-xl'}>
      <div className={'flex items-start gap-1'}>
        <div className={'flex p-0.5 flex-col gap-1'}>
          <p className={'text-base font-bold'}>{task.name}</p>
          <p className={'text-sm'}>{task.description}</p>
          <div className={'grid grid-cols-1 gap-2'}>
            <div className={'p-1 bg-gray-200 rounded-xl flex flex-col gap-0.5'}>
              <p className={'text-[1.2rem] font-bold'}>Нужно:</p>
              <div className={'flex flex-col gap-0.2'}>
                {task.requirements.map((req, counter) => {
                  return (
                    <p key={counter} className={cvaTextRow()}>
                      <strong>{req.resource_type}:</strong> {req.current} /{' '}
                      {req.total}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'p-1 border-t-2 border-black'}>
        <p className={'text-[1.4rem] font-bold'}>
          Для одного игрока (выполнения)
        </p>
        <div className={'grid grid-cols-1 mt-1 gap-x-2 gap-y-1'}>
          <p className={'text-sm'}>
            <strong>Продолжительность: </strong>
            {task.duration_per_bp} сек/ед. ресурса
          </p>

          <p className={'text-sm'}>
            <strong>Очки опыта: </strong>
            {task.exp_profit_per_bp} ед. опыта / ед. ресурса
          </p>
        </div>
        <p className={'font-bold text-[1.4rem] mb-1'}>
          Прогресс выполнения (общий)
        </p>
        <div className={'flex flex-col gap-2'}>
          {task.requirements.map((resource, counter) => {
            return (
              <div key={counter}>
                <div className={'flex justify-between gap-2 items-center'}>
                  <p>{resource.resource_type}</p>
                  <p>
                    {resource.current}/{resource.total}
                  </p>
                </div>
                <ProgressBar
                  className={'!h-1 !p-0.2'}
                  theme={'black'}
                  progress={resource.current}
                  limit={resource.total}
                />
              </div>
            );
          })}
        </div>
        <div className={'flex mt-2 items-center justify-between'}>
          <p className={'text-base font-bold'}>
            Статус: {task.is_available ? 'активен' : 'неактивен'}
          </p>
          <DeleteBtn deleteFunc={'deleteResourceTask'} idx={task.idx} />
          {/*<Button>Снять</Button>*/}
        </div>
      </div>
    </div>
  );
};

export default ResourceTask;
