'use client';
import React, { FC } from 'react';
import { createSectorPlace } from '@/shared/api/createSectorPlace';
import { cva } from 'class-variance-authority';

const CreateSectorPlaceBtn: FC<{ sector_idx: string }> = ({ sector_idx }) => {
  const cvaButton = cva([
    'px-2 h-3 bg-cBlack flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);
  return (
    <button
      onClick={async () => {
        await createSectorPlace(sector_idx).then((res) => {
          console.log(res);
          window.location.reload();
        });
      }}
      className={cvaButton()}>
      Создать землю
    </button>
  );
};

export default CreateSectorPlaceBtn;
