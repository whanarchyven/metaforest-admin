'use client';
import React, { FC, useState } from 'react';
import { IMetaforestBunny } from '@/shared/types/backend/MetaforestBunny/types/IMetaforestBunny';
import BunnyRow from '@/widgets/bunny-dropdown/ui/BunnyRow';
import { changeBunny } from '@/shared/api/changeBunny';

interface BunnyDropdownInterface {
  bunnies: IMetaforestBunny[];
  activeBunny: IMetaforestBunny;
  telegramId: string;
}

const BunnyDropdown: FC<BunnyDropdownInterface> = ({
  activeBunny,
  bunnies,
  telegramId,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleBunnyChange = async (idx: number | string) => {
    await changeBunny(telegramId, idx);
    window.location.reload();
  };

  return (
    <div
      onMouseEnter={() => {
        setIsOpened(true);
      }}
      onMouseLeave={() => {
        setIsOpened(false);
      }}
      className={'flex relative flex-col min-w-[20rem] items-center'}>
      <div
        className={
          'bg-white border-2 border-cBlack w-full rounded-xl shadow-xl '
        }>
        <BunnyRow
          idx={activeBunny.idx}
          displayArrow
          image={activeBunny.images.thumb}
          name={activeBunny.deployedNftWithTrait.name}
        />
      </div>
      {isOpened ? (
        <div
          className={
            'absolute w-full top-[100%] flex flex-col gap-2 rounded-xl h-[20rem] overflow-y-scroll z-10 border-2 border-cBlack bg-white p-1 shadow-xl'
          }>
          {bunnies.map((bunny) => {
            return (
              <BunnyRow
                callback={handleBunnyChange}
                key={bunny.idx}
                idx={bunny.idx}
                image={bunny.images.thumb}
                isSelectable
                name={bunny.deployedNftWithTrait.name}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default BunnyDropdown;
