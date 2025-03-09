import React, { FC } from 'react';
import { IMetaforestBuildTask } from '@/shared/types/backend/MetaforestBuildTask/types/MetaforestBuildTask';
import { cva } from 'class-variance-authority';
import { parseISODuration } from '@/shared/utils/parseISODuration';
import ProgressBar from '@/shared/ui/ProgressBar';
import DeleteBtn from '@/features/delete-btn';

interface BuildTaskInterface {
  task: IMetaforestBuildTask;
}

const BuildingTask: FC<BuildTaskInterface> = ({ task }) => {
  const cvaTextRow = cva(['text-base text-sm']);
  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);
  return (
    <div className={'border-2 border-black rounded-xl'}>
      <div className={'flex items-start gap-1'}>
        <div className={'w-10'}>
          <img
            src={`/images/buildings/${task.building_type}.png`}
            className={'w-full aspect-square rounded-xl'}
          />
        </div>
        <div className={'flex p-0.5 flex-col gap-1'}>
          <p className={'text-base font-bold'}>{task.name}</p>
          <p className={'text-sm'}>{task.description}</p>
          <div className={'grid grid-cols-2 gap-2'}>
            <div className={'p-1 bg-gray-200 rounded-xl flex flex-col gap-0.5'}>
              <p className={'text-[1.2rem] font-bold'}>Нужно:</p>
              <div className={'flex flex-col gap-0.2'}>
                {task.requirements.map((req, counter) => {
                  return (
                    <p key={counter} className={cvaTextRow()}>
                      <strong>{req.resource_type}:</strong> {req.amount}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={'p-1 bg-gray-200 rounded-xl flex flex-col gap-0.5'}>
              <p className={'text-[1.2rem] font-bold'}>Профит:</p>
              <div className={'flex flex-col gap-0.2'}>
                {task.profits.map((prof, counter) => {
                  return (
                    <p key={counter} className={cvaTextRow()}>
                      <strong>{prof.resource_type}:</strong> {prof.amount}
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
        <div className={'grid grid-cols-2 mt-1 gap-x-2 gap-y-1'}>
          <p className={'text-sm'}>
            <strong>Продолжительность: </strong>
            {parseISODuration(task.duration)}
          </p>
          <p className={'text-sm'}>
            <strong>Энергозатратность: </strong>
            {task.energy_cost}
          </p>
          <p className={'text-sm'}>
            <strong>Очки владения: </strong>
            {task.benefit_points_per_player}
          </p>
          <p className={'text-sm'}>
            <strong>Прогресс: </strong>
            {task.progress_per_player}
          </p>
          <p className={'text-sm'}>
            <strong>Очки опыта: </strong>
            {task.exp_profit}
          </p>
          <p className={'text-sm'}>
            <strong>MFGT прибыль: </strong>
            {task.mfgt_profit}
          </p>
          <p className={'text-sm'}>
            <strong>Тип здания: </strong>
            {task.building_type}
          </p>
        </div>
        <p className={'font-bold text-[1.4rem] mb-1'}>
          Прогресс выполнения (общий)
        </p>
        <ProgressBar
          className={'!h-1 !p-0.2'}
          theme={'black'}
          progress={task.current_progress}
          limit={task.total_progress}
        />
        <div className={'flex mt-2 items-center justify-between'}>
          <p className={'text-base font-bold'}>
            Статус: {task.is_available ? 'активен' : 'неактивен'}
          </p>
          {task.building_idx ? (
            <DeleteBtn
              deleteFunc={'revertUpgradeTask'}
              idx={task.building_idx}
            />
          ) : (
            <DeleteBtn deleteFunc={'deleteBuildingTask'} idx={task.idx} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BuildingTask;
