'use client';
import React, { FC } from 'react';
import { createSectorPlace } from '@/shared/api/createSectorPlace';
import { cva } from 'class-variance-authority';
import { deleteBuilding } from '@/shared/api/deleteBuilding';
import { deleteSector } from '@/shared/api/deleteSector';
import { deleteSectorPlace } from '@/shared/api/deleteSectorPlace';
import { deleteTask } from '@/shared/api/deleteTask';

interface DeleteBtnInterface {
  deleteFunc: deleteMethods;
  idx: string;
}

export type deleteMethods =
  | 'deleteSector'
  | 'deleteTask'
  | 'deleteSectorPlace'
  | 'deleteBuilding';

const DeleteBtn: FC<DeleteBtnInterface> = ({ deleteFunc, idx }) => {
  const executeDelete = async () => {
    switch (deleteFunc) {
      case 'deleteBuilding':
        return await deleteBuilding(idx);
      case 'deleteSector':
        return await deleteSector(idx);
      case 'deleteSectorPlace':
        return await deleteSectorPlace(idx);
      case 'deleteTask':
        return await deleteTask(idx);
      default:
        return async () => {
          alert('Unknown method');
        };
    }
  };

  const cvaButton = cva([
    'px-2 h-3 bg-red-500 flex rounded-xl text-sm text-cWhite justify-center items-center',
  ]);
  return (
    <button
      onClick={async () => {
        await executeDelete().then((res) => {
          console.log(res);
          alert(res.message);
          window.location.reload();
        });
      }}
      className={cvaButton()}>
      Удалить
    </button>
  );
};

export default DeleteBtn;
