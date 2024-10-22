'use client';
import { FC } from 'react';
import { imagePrefix } from '@/shared/utils/imagePrefix';
import ArrowIcon from '@@/public/icons/arrow_back.svg';
import { cva, VariantProps } from 'class-variance-authority';

interface BunnyRowInterface extends VariantProps<typeof cvaRoot> {
  image: string;
  name: string;
  displayArrow?: boolean;
  callback?: (arg: number | string) => any;
  idx: number | string;
}

const cvaRoot = cva(
  ['flex justify-between  rounded-xl p-0.5 cursor-pointer items-center gap-2'],
  {
    variants: {
      isSelectable: {
        true: 'group hover:bg-cBlack',
        false: '',
      },
    },
    defaultVariants: { isSelectable: false },
  }
);

const BunnyRow: FC<BunnyRowInterface> = ({
  image,
  name,
  callback,
  displayArrow,
  isSelectable,
  idx,
}) => {
  return (
    <div
      onClick={() => {
        if (isSelectable && callback) {
          callback(idx);
        }
      }}
      className={cvaRoot({ isSelectable })}>
      <div className={'flex gap-2 items-center'}>
        <div
          className={
            'rounded-full border-black border-[1px] w-3 aspect-square overflow-clip'
          }>
          <img src={imagePrefix(image)} />
        </div>
        <p className={'text-black font-bold group-hover:text-white text-base'}>
          {name}
        </p>
      </div>
      {displayArrow ? (
        <ArrowIcon className={'w-1.5 -rotate-90 opacity-50'} />
      ) : null}
    </div>
  );
};

export default BunnyRow;
