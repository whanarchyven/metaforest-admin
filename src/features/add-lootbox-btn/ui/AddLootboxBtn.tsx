'use client';
import { FC } from 'react';
import Button from '@/shared/ui/Button/Button';
import { addLootbox } from '@/shared/api/addLootbox';

interface IAddLootboxBtn {
  telegram_id: string;
}
const AddLootboxBtn: FC<IAddLootboxBtn> = ({ telegram_id }) => {
  return (
    <Button
      onClick={async () => {
        await addLootbox(telegram_id);
        window.location.reload();
      }}
      className={
        'bg-cBlack p-0.8 font-bold text-sm px-2 rounded-xl text-white'
      }>
      Добавить лутбокс
    </Button>
  );
};

export default AddLootboxBtn;
