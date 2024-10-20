'use client';
import { FC, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import Logo from '@@/public/logo.svg';
import NavbarLink, {
  NavbarLinkInterface,
} from '@/widgets/navbar/ui/NavbarLink';
import { useParams, usePathname } from 'next/navigation';
import { useNavbarStore } from '@/shared/store/navbarStore';
import Link from 'next/link';

import ArrowBack from '@@/public/icons/arrow_back.svg';

import { getGameSessionProxy } from '@/shared/api/getGameSessionProxy';

const Navbar: FC = () => {
  const cvaRoot = cva([
    'navbar-cvaRoot',
    'flex flex-col gap-2',
    'p-2',
    'rounded-xl',
    'bg-white backdrop-blur-sm',
    'shadow-xl',
  ]);

  const cvaLogo = cva(['w-10']);

  const cvaLinks = cva(['flex flex-col gap-1']);

  const cvaPlayerHeader = cva(['flex gap-2 items-center']);

  const links: NavbarLinkInterface[] = [
    {
      name: 'Конфигурация',
      link: '/settings',
      icon: 'settings',
      isDisabled: true,
    },
    {
      name: 'Игроки',
      link: '/players',
      icon: 'players',
      isDisabled: false,
    },
    {
      name: 'Мир',
      link: '/world',
      icon: 'world',
      isDisabled: true,
    },
    {
      name: 'Помогите...',
      link: '/help/me/please/i/wanna/die/im/tired/',
      icon: 'help',
      isDisabled: true,
    },
  ];

  const playerLinks: NavbarLinkInterface[] = [
    {
      name: 'Базовые параметры',
      link: 'base',
      icon: 'baseParams',
      isDisabled: false,
    },
    {
      name: 'Социальные параметры',
      link: 'socials',
      icon: 'social',
      isDisabled: false,
    },
    {
      name: 'Баланс и активы',
      link: 'balance',
      icon: 'balance',
      isDisabled: false,
    },
    {
      name: 'Ресурсы',
      link: 'resources',
      icon: 'resources',
      isDisabled: false,
    },
  ];

  const { user, setUser } = useNavbarStore();

  const pathname = usePathname();
  const { telegram_id } = useParams();

  useEffect(() => {
    if (telegram_id) {
      console.log(telegram_id);
      getGameSessionProxy(telegram_id as string).then((res) => {
        console.log(res, 'AAAA');
        setUser({ userInfo: res.user.userInfo, wallet: res.user.wallet });
      });
    } else {
      setUser(null);
    }
  }, [pathname]);

  return (
    <div className={cvaRoot()}>
      {!user ? (
        <Link href={'/'}>
          <Logo className={cvaLogo()} />
        </Link>
      ) : (
        <div className={cvaPlayerHeader()}>
          <Link
            href={'/players'}
            className={
              'flex items-center gap-1 justify-center cursor-pointer bg-cBlack p-1 pl-0.8 pr-1.2 rounded-full'
            }>
            <ArrowBack className={'fill-cWhite w-1'} />
          </Link>
          <div
            className={
              'p-1 bg-cBlack text-white rounded-xl text-[1.1rem] w-full truncate font-bold flex items-center justify-center'
            }>
            {user.userInfo.username}
          </div>
        </div>
      )}
      <div className={cvaLinks()}>
        {user ? (
          <>
            {playerLinks.map((link, counter) => {
              return (
                <NavbarLink
                  key={counter}
                  isActive={pathname.includes(link.link as string)}
                  name={link.name}
                  icon={link.icon}
                  link={link.link}
                  isDisabled={link.isDisabled}
                />
              );
            })}
          </>
        ) : (
          <>
            {' '}
            {links.map((link, counter) => {
              return (
                <NavbarLink
                  key={counter}
                  isActive={pathname.includes(link.link as string)}
                  name={link.name}
                  icon={link.icon}
                  link={link.link}
                  isDisabled={link.isDisabled}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
