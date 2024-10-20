import { FC } from 'react';
import { imagePrefix } from '@/shared/utils/imagePrefix';
import ArrowIcon from '@@/public/icons/arrow_back.svg';

interface BunnyRowInterface {
  image: string;
  name: string;
}
const BunnyRow: FC<BunnyRowInterface> = ({ image, name }) => {
  return (
    <div className={'flex items-center gap-2'}>
      <div
        className={
          'rounded-full border-black border-[1px] w-3 aspect-square overflow-clip'
        }>
        <img src={imagePrefix(image)} />
      </div>
      <p className={'text-black font-bold text-base'}>{name}</p>
      <ArrowIcon className={'w-1.5 -rotate-90 opacity-50'} />
    </div>
  );
};

export default BunnyRow;
