'use client';
import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { NavbarIconType } from '@/widgets/navbar/types/navbar-icon-type';

import SettingsIcon from '@@/public/icons/navbar/settings.svg';
import WorldIcon from '@@/public/icons/navbar/world.svg';
import PlayersIcon from '@@/public/icons/navbar/players.svg';

import BalanceIcon from '@@/public/icons/navbar/balance.svg';
import BaseParamsIcon from '@@/public/icons/navbar/base_params.svg';
import ResourcesIcon from '@@/public/icons/navbar/resources.svg';
import SocialIcon from '@@/public/icons/navbar/social.svg';

export interface NavbarLinkInterface extends VariantProps<typeof cvaRoot> {
  name: string;
  link?: string;
  icon: NavbarIconType;
}

const cvaRoot = cva(
  ['navbarLink-cvaRoot', 'p-0.5 rounded-xl', 'flex items-center gap-2'],
  {
    variants: {
      isActive: {
        true: 'bg-cBlack',
        false: 'bg-cWhite',
      },
      isDisabled: {
        true: 'opacity-50',
        false: 'opacity-100',
      },
    },
    defaultVariants: { isActive: false, isDisabled: false },
  }
);

const cvaTitle = cva(['navbarLink__title-cvaTitle', 'font-bold text-base'], {
  variants: {
    isActive: {
      true: 'text-cWhite',
      false: 'text-cBlack',
    },
  },
});

const cvaIcon = cva(['w-2'], {
  variants: {
    isActive: {
      true: 'fill-cWhite',
      false: 'fill-cBlack',
    },
  },
});

const getLinkIcon = (linkId: NavbarIconType, isActive: boolean) => {
  switch (linkId) {
    case 'players':
      return <PlayersIcon className={cvaIcon({ isActive })} />;
    case 'settings':
      return <SettingsIcon className={cvaIcon({ isActive })} />;
    case 'world':
      return <WorldIcon className={cvaIcon({ isActive })} />;
    case 'balance':
      return <BalanceIcon className={cvaIcon({ isActive })} />;
    case 'social':
      return <SocialIcon className={cvaIcon({ isActive })} />;
    case 'baseParams':
      return <BaseParamsIcon className={cvaIcon({ isActive })} />;
    case 'resources':
      return <ResourcesIcon className={cvaIcon({ isActive })} />;
  }
};

const NavbarLink: FC<NavbarLinkInterface> = ({
  name,
  link,
  icon,
  isActive,
  isDisabled,
}) => {
  if (isDisabled) {
    return (
      <div className={cvaRoot({ isActive, isDisabled })}>
        {getLinkIcon(icon, Boolean(isActive))}
        <p className={cvaTitle({ isActive })}>{name}</p>
      </div>
    );
  } else {
    return (
      <Link href={link ?? '/'} className={cvaRoot({ isActive, isDisabled })}>
        {getLinkIcon(icon, Boolean(isActive))}
        <p className={cvaTitle({ isActive })}>{name}</p>
      </Link>
    );
  }
};

export default NavbarLink;
