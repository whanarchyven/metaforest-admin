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
import { getBuildTasksBySectorIdx } from '@/shared/api/getBuildTasksBySectorIdx';
import BuildingTask from '@/entities/build-task/ui/BuildingTask';
import Button from '@/shared/ui/Button/Button';
import { getResourceTasksBySectorIdx } from '@/shared/api/getResourceTasksBySectorIdx';
import ResourceTask from '@/entities/resource-task/ui/BuildingTask';

export default async function Home({
  params: { sector_idx },
}: {
  params: { sector_idx: string };
}) {
  const cvaRoot = cva(['dashboardPage-cvaRoot', 'w-full']);

  const cvaTitle = cva(['font-bold', 'mb-1']);

  const cvaHeader = cva(['flex justify-between mb-4']);

  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);

  const sector = await getSector(sector_idx);
  const buildTasks = await getBuildTasksBySectorIdx(sector_idx);
  const resourceTasks = await getResourceTasksBySectorIdx(sector_idx);
  console.log(resourceTasks);

  const cvaTextRow = cva(['text-base']);
  const cvaImageContainer = cva(['w-full aspect-square rounded-xl']);

  return (
    <main className={cvaRoot()}>
      <div className={cvaHeader()}>
        <h1 className={cvaTitle()}>
          {sector.name}, сектор №{sector.numberIdx} - Задания барона
        </h1>
        <Link className={cvaButton()} href={`/sector/${sector_idx}/edit`}>
          Редактировать сектор
        </Link>
      </div>
      <div className={'grid grid-cols-3 gap-8'}>
        <div className={'flex flex-col gap-1'}>
          {sector.image ? (
            <img
              className={clsx(cvaImageContainer(), 'object-cover')}
              src={imagePrefix(sector.image)}
            />
          ) : (
            <div className={clsx(cvaImageContainer(), 'bg-gray-400')}></div>
          )}
          <p>Баланс ресурсов в секторе:</p>
          <div className={'flex flex-col gap-0.5 text-base'}>
            {Object.entries(sector.resources).map((resource) => {
              return (
                <p key={resource[0]}>
                  <strong>{resource[0]}:</strong> {resource[1].balance}
                </p>
              );
            })}
          </div>
        </div>

        <div>
          <div className={'flex mb-1 justify-between items-center'}>
            <p className={''}>Задания на постройку</p>
            <Link
              className={cvaButton()}
              href={`/sector/${sector_idx}/barons-tasks/create`}>
              Создать
            </Link>
          </div>
          <div className={'flex flex-col gap-1'}>
            {buildTasks.map((task) => {
              return (
                <div key={task.idx}>
                  <BuildingTask task={task} />
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className={'flex mb-1 justify-between items-center'}>
            <p className={''}>Задания на сбор ресурсов</p>
            <Link
              className={cvaButton()}
              href={`/sector/${sector_idx}/barons-tasks/create-resource-task`}>
              Создать
            </Link>
          </div>
          <div className={'flex flex-col gap-1'}>
            {resourceTasks.map((task) => {
              return (
                <div key={task.idx}>
                  <ResourceTask task={task} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
