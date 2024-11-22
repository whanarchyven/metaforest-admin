import React, { FC } from 'react';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';
import { imagePrefix } from '@/shared/utils/imagePrefix';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import Link from 'next/link';
import { IMetaforestSectorPlace } from '@/shared/types/backend/MetaforestSectorPlace/types/IMetaforestSectorPlace';
import { getSectorPlace } from '@/shared/api/getSectorPlace';
import Building from '@/entities/building/ui/Building';
import DeleteBtn from '@/features/delete-btn';

const SectorPlace: FC<{ sector_place_idx: string }> = async ({
  sector_place_idx,
}) => {
  const sectorPlace = await getSectorPlace(sector_place_idx);
  console.log(sectorPlace);
  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);

  return (
    <div
      className={
        'grid bg-gray-200 p-1 border-cBlack rounded-xl grid-cols-2 gap-1'
      }>
      <div className={'flex p-1 flex-col gap-1'}>
        <p>Владение #{sectorPlace.idx}</p>
        <p>Владелец: {sectorPlace.owner ?? 'отсутствует'}</p>
        <DeleteBtn deleteFunc={'deleteSectorPlace'} idx={sectorPlace.idx} />
      </div>
      <div className={'flex p-1 bg-white rounded-xl flex-col gap-2'}>
        <div className={'flex border-b-2 pb-1 justify-between'}>
          <p>Постройка:</p>
          {sectorPlace.building == null ? (
            <Link
              className={cvaButton()}
              href={`/sector/${sectorPlace.sector_idx}/sector-place/${sectorPlace.idx}/building/create`}>
              Добавить постройку
            </Link>
          ) : null}
        </div>
        {sectorPlace.building != null ? (
          <Building building_idx={sectorPlace.building} />
        ) : (
          <p className={'text-[1.4rem]'}>Отсутствует</p>
        )}
      </div>
    </div>
  );
};

export default SectorPlace;
