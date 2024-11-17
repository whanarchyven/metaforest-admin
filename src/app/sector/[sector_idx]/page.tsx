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
  const cvaTextRow = cva(['text-base']);
  const cvaImageContainer = cva(['w-full aspect-square rounded-xl']);

  return (
    <main className={cvaRoot()}>
      <div className={cvaHeader()}>
        <h1 className={cvaTitle()}>
          {sector.name}, сектор №{sector.numberIdx}
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
          <p className={cvaTextRow()}>
            <strong>idx:</strong> {sector.idx}
          </p>
          <p className={cvaTextRow()}>
            <strong>имя:</strong> {sector.name}
          </p>
          <p className={cvaTextRow()}>
            <strong>тип местности:</strong> {sector.type}
          </p>
          <p className={cvaTextRow()}>
            <strong>уровень:</strong> {sector.level}
          </p>
          <p className={cvaTextRow()}>
            <strong>влияние (red/blue):</strong> {sector.authority.red}/
            {sector.authority.blue}
          </p>
        </div>
        <div className={'col-span-2 h-full'}>
          <div className={'flex justify-between mb-2 items-center'}>
            <p className={'text-base font-bold'}>
              Земли в секторе: {sector.places.length}
            </p>
            <CreateSectorPlaceBtn sector_idx={sector.idx} />
          </div>
          <div className={'grid grid-cols-1 gap-4'}>
            {sector.places.map((sector, counter) => {
              return <SectorPlace key={counter} sector_place_idx={sector} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
