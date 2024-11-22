import React, { FC } from 'react';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';
import { imagePrefix } from '@/shared/utils/imagePrefix';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import Link from 'next/link';
import DeleteBtn from '@/features/delete-btn';
import { deleteSector } from '@/shared/api/deleteSector';

const Sector: FC<IMetaforestSector> = ({
  name,
  level,
  authority,
  idx,
  type,
  places,
  available_tokens,
  available_lootboxes,
  image,
  numberIdx,
}) => {
  const cvaTextRow = cva(['text-base']);

  const cvaButton = cva([
    'bg-cBlack text-base p-1 rounded-xl text-sm text-center text-white font-bold',
  ]);

  const cvaRoot = cva(['flex flex-col gap-1']);
  const cvaImageContainer = cva(['w-full aspect-square rounded-xl']);

  return (
    <div className={cvaRoot()}>
      {image ? (
        <img
          className={clsx(cvaImageContainer(), 'object-cover')}
          src={imagePrefix(image)}
        />
      ) : (
        <div className={clsx(cvaImageContainer(), 'bg-gray-400')}></div>
      )}
      <p className={cvaTextRow()}>
        <strong>idx:</strong> {idx}
      </p>
      <p className={cvaTextRow()}>
        <strong>Порядковый номер:</strong> {numberIdx}
      </p>
      <p className={cvaTextRow()}>
        <strong>имя:</strong> {name}
      </p>
      <p className={cvaTextRow()}>
        <strong>тип местности:</strong> {type}
      </p>
      <p className={cvaTextRow()}>
        <strong>уровень:</strong> {level}
      </p>
      <p className={cvaTextRow()}>
        <strong>влияние (red/blue):</strong> {authority.red}/{authority.blue}
      </p>
      <p className={cvaTextRow()}>
        <strong>земель:</strong> {places.length}
      </p>
      <Link className={cvaButton()} href={`/sector/${idx}`}>
        Управлять
      </Link>
      <DeleteBtn deleteFunc={'deleteSector'} idx={idx} />
    </div>
  );
};

export default Sector;
