import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

interface statRequirementBarInterface extends VariantProps<typeof cvaRoot> {
  progress: number;
  limit: number;
  displayProgress?: boolean;
  className?: string;
}

const cvaRoot = cva(['h-5 w-full rounded-full relative flex items-center'], {
  variants: {
    theme: {
      white: 'bg-white p-1',
      green: 'bg-white p-1',
      black: 'bg-cBlack p-1',
      color: 'bg-[#FF6565]',
    },
  },
  defaultVariants: { theme: 'white' },
});
const cvaProgressBar = cva(
  [
    'rounded-full h-full transition-all min-w-[1rem] flex justify-end  items-center justify-self-start',
  ],
  {
    variants: {
      theme: {
        white: 'bg-cBlack',
        green: 'bg-uncommon',
        black: 'bg-white',
        color: 'bg-[#5C9DFF]',
      },
    },
    defaultVariants: { theme: 'white' },
  }
);
const cvaProgressLabel = cva(
  [
    'absolute rounded-full h-full aspect-square flex justify-center items-center',
  ],
  {
    variants: {
      theme: {
        white: 'bg-cBlack text-white',
        green: 'bg-uncommon text-cBlack',
        black: 'bg-white text-cBlack',
        color: 'bg-[#FF6565] bg-[#5C9DFF]',
      },
    },
    defaultVariants: { theme: 'white' },
  }
);
const cvaProgressLabelTitle = cva(['justify-self-end text-xs font-bold']);
export const ProgressBar: FC<statRequirementBarInterface> = ({
  progress,
  limit,
  displayProgress,
  className,
  theme,
}) => {
  return (
    <div className={clsx(className, cvaRoot({ theme }))}>
      <div
        style={{ width: `${(progress / limit) * 100 + 5}%` }}
        className={cvaProgressBar({ theme })}>
        {displayProgress && (
          <div className={cvaProgressLabel({ theme })}>
            <p className={cvaProgressLabelTitle()}>{Math.round(progress)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
