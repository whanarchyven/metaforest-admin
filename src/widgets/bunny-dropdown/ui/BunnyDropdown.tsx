import React, { FC } from 'react';
import { IMetaforestBunny } from '@/shared/types/backend/MetaforestBunny/types/IMetaforestBunny';
import BunnyRow from '@/widgets/bunny-dropdown/ui/BunnyRow';

interface BunnyDropdownInterface {
  bunnies: IMetaforestBunny[];
  activeBunny: IMetaforestBunny;
}

const BunnyDropdown: FC<BunnyDropdownInterface> = ({ activeBunny }) => {
  return (
    <div className={'flex relative flex-col'}>
      <div
        className={'bg-white border-2 border-cBlack rounded-xl shadow-xl p-1'}>
        <BunnyRow
          image={activeBunny.images.thumb}
          name={activeBunny.deployedNftWithTrait.name}
        />
      </div>
    </div>
  );
};

export default BunnyDropdown;
