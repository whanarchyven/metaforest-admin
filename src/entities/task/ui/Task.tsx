import React, { FC } from 'react';
import { IMetaforestTask } from '@/shared/types/backend/MetaforestTask/types/IMetaforestTask';
import { imagePrefix } from '@/shared/utils/imagePrefix';
import { cva } from 'class-variance-authority';
import { parseISODuration } from '@/shared/utils/parseISODuration';
import Link from 'next/link';
import DeleteBtn from '@/features/delete-btn';

const Task: FC<IMetaforestTask> = ({
  idx,
  sector_idx,
  sector_place_idx,
  name,
  requirements,
  type,
  profits,
  exp_profit,
  mfgt_profit,
  building_idx,
  duration,
  bunny_workers_limit,
  bunny_workers,
  energy_cost,
  description,
  image,
}) => {
  const cvaTextRow = cva(['text-base text-sm']);
  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);
  return (
    <div className={'flex w-full bg-gray-200 rounded-xl p-2  flex-col gap-1'}>
      <div className={'grid grid-cols-3 gap-3'}>
        <img
          src={imagePrefix(image)}
          className={'w-full object-cover aspect-square rounded-xl'}
        />
        <div className={'flex col-span-2 flex-col gap-1'}>
          <p className={'text-[1.2rem] leading-[100%] font-bold'}>{name}</p>
          <div className={'flex flex-col gap-0.2'}>
            <p className={cvaTextRow()}>
              <strong>энергозатратность:</strong> {energy_cost}
            </p>
            <p className={cvaTextRow()}>
              <strong>длительность:</strong> {parseISODuration(duration)}
            </p>
            <p className={cvaTextRow()}>
              <strong>прирост опыта:</strong> {exp_profit} EXP
            </p>
            <p className={cvaTextRow()}>
              <strong>MFGT прибыль:</strong> {mfgt_profit} MFGT
            </p>
            <p className={cvaTextRow()}>
              <strong>лимит работников</strong> {bunny_workers_limit}
            </p>
          </div>
        </div>
      </div>
      <p className={'text-[1.2rem] leading-[100%]'}>{description}</p>
      <div className={'grid grid-cols-2 gap-2'}>
        <div className={'p-1 bg-white rounded-xl flex flex-col gap-0.5'}>
          <p className={'text-[1.2rem] font-bold'}>Нужно:</p>
          <div className={'flex flex-col gap-0.2'}>
            {requirements.map((req, counter) => {
              return (
                <p key={counter} className={cvaTextRow()}>
                  <strong>{req.resource_type}:</strong> {req.amount}
                </p>
              );
            })}
          </div>
        </div>
        <div className={'p-1 bg-white rounded-xl flex flex-col gap-0.5'}>
          <p className={'text-[1.2rem] font-bold'}>Профит:</p>
          <div className={'flex flex-col gap-0.2'}>
            {profits.map((prof, counter) => {
              return (
                <p key={counter} className={cvaTextRow()}>
                  <strong>{prof.resource_type}:</strong> {prof.amount_coef}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <Link
        className={cvaButton()}
        href={`/sector/${sector_idx}/task/${idx}/edit`}>
        Редактировать
      </Link>
      <DeleteBtn deleteFunc={'deleteTask'} idx={idx} />
    </div>
  );
};

export default Task;
