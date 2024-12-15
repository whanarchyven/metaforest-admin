import React, { FC } from 'react';
import { getBuilding } from '@/shared/api/getBuilding';
import Link from 'next/link';
import { cva } from 'class-variance-authority';
import { getBuildingName } from '@/shared/utils/getBuildingName';
import { getTasks } from '@/shared/api/getTasks';
import DeleteBtn from '@/features/delete-btn';
import clsx from 'clsx';

const Building: FC<{ building_idx: string; isUpgrading?: boolean }> = async ({
  building_idx,
  isUpgrading,
}) => {
  const building = await getBuilding(building_idx);
  const tasks = await getTasks(building_idx);
  console.log(building, 'BUILDING', building.type, building.level);
  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);
  return (
    <div className={'grid grid-cols-2 gap-2'}>
      <div className={'flex flex-col gap-0.5'}>
        <p className={'text-[1.4rem]'}>
          {getBuildingName(building.type)}, {building.level} LVL
        </p>
        <div
          className={'relative w-full aspect-square rounded-xl overflow-clip'}>
          <img
            src={`/images/buildings/${building.type}.png`}
            className={'w-full h-full'}
          />
          {isUpgrading ? (
            <div
              className={
                'absolute left-0 top-0 bg-green-500 bg-opacity-50 w-full h-full flex items-center justify-center'
              }>
              <p className={'font-bold text-white -rotate-45'}>На апгрейде</p>
            </div>
          ) : null}
        </div>
        <p className={'text-[1.4rem]'}>
          Владелец: {building.owner ?? 'отсутствует'}
        </p>
      </div>
      <div className={'flex flex-col gap-2'}>
        <p className={'text-[1.4rem]'}>Заданий: {tasks.length}</p>
        <Link
          className={cvaButton()}
          href={`/sector/${building.sector_idx}/sector-place/${building.sector_place_idx}/building/${building.idx}`}>
          Управление заданиями
        </Link>
        <DeleteBtn deleteFunc={'deleteBuilding'} idx={building.idx} />
        {!isUpgrading ? (
          <Link
            className={clsx(cvaButton(), '!bg-green-500')}
            href={`/sector/${building.sector_idx}/barons-tasks/${building.idx}/update/`}>
            Апгрейд
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Building;
