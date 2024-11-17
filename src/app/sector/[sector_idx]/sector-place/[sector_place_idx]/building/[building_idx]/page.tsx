import { cva } from 'class-variance-authority';
import { getSectors } from '@/shared/api/getSectors';
import Sector from '@/entities/sector/ui';
import Link from 'next/link';
import { getSector } from '@/shared/api/getSector';
import React from 'react';
import clsx from 'clsx';
import { imagePrefix } from '@/shared/utils/imagePrefix';
import SectorPlace from '@/entities/sector-place/ui/SectorPlace';
import { createSectorPlace } from '@/shared/api/createSectorPlace';
import CreateSectorPlaceBtn from '@/features/create-sector-place-btn';
import { getBuilding } from '@/shared/api/getBuilding';
import { getBuildingName } from '@/shared/utils/getBuildingName';
import { getTasks } from '@/shared/api/getTasks';
import Task from '@/entities/task/ui/Task';

export default async function Home({
  params: { building_idx, sector_idx, sector_place_idx },
}: {
  params: {
    sector_idx: string;
    sector_place_idx: string;
    building_idx: string;
  };
}) {
  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  const cvaTitle = cva(['font-bold', 'mb-1']);

  const cvaHeader = cva(['flex justify-between mb-4']);

  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);

  const cvaTextRow = cva(['text-base']);
  const cvaImageContainer = cva(['w-full aspect-square rounded-xl']);

  const building = await getBuilding(building_idx);
  const tasks = await getTasks(building.idx);

  return (
    <main className={cvaRoot()}>
      <div className={cvaHeader()}>
        <h1 className={cvaTitle()}>
          {getBuildingName(building.type)}, владение №
          {building.sector_place_idx}
        </h1>
      </div>
      <div className={'grid grid-cols-3 gap-8'}>
        <div className={'flex flex-col gap-1'}>
          <img
            className={clsx(cvaImageContainer(), 'object-cover')}
            src={`/images/buildings/${building.type}.png`}
          />
          <p className={cvaTextRow()}>
            <strong>idx:</strong> {building.idx}
          </p>

          <p className={cvaTextRow()}>
            <strong>уровень:</strong> {building.level}
          </p>
          <p className={cvaTextRow()}>
            <strong>Владелец:</strong>{' '}
            {building.owner ?? 'отсутствует (казённое)'}
          </p>
        </div>
        <div className={'col-span-2 h-full'}>
          <div className={'w-full flex flex-col gap-2'}>
            <div className={'flex items-center justify-between'}>
              <p className={'font-bold'}>Задания:</p>
              <Link
                className={cvaButton()}
                href={`/sector/${sector_idx}/sector-place/${sector_place_idx}/building/${building_idx}/task/create`}>
                Создать задание
              </Link>
            </div>
            <div className={'grid grid-cols-2 gap-2'}>
              {tasks.map((task) => (
                <Task key={task.idx} {...task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
