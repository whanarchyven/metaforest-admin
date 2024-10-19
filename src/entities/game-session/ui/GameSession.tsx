'use client';
import { FC } from 'react';
import { IGameSession } from '@/shared/types/gameSessions';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import Button from '@/shared/ui/Button/Button';
import { useRouter } from 'next/navigation';

const cvaRoot = cva([
  'gameSession-cvaRoot',
  'w-full',
  'flex flex-col gap-2',
  'p-1',
  'bg-white',
  'rounded-xl',
]);

const cvaAvatar = cva([
  'gameSession-cvaAvatar',
  'aspect-square',
  'rounded-xl',
  'bg-black bg-opacity-50',
]);

const cvaTextRow = cva(['text-base']);

const cvaButton = cva([
  'bg-cBlack text-base p-1 rounded-xl text-white font-bold',
]);

const GameSession: FC<IGameSession> = ({ user }) => {
  const router = useRouter();

  return (
    <div className={cvaRoot()}>
      <div className={cvaAvatar()}></div>
      <p className={cvaTextRow()}>
        <strong>telegram_id:</strong> {user.userInfo.id}
      </p>
      <p className={cvaTextRow()}>
        <strong>username:</strong> {user.userInfo.username}
      </p>
      <p className={cvaTextRow()}>
        <strong>name:</strong> {user.userInfo.firstName}{' '}
        {user.userInfo.lastName}
      </p>
      <p className={clsx(cvaTextRow(), 'line-clamp-2')}>
        <strong>wallet:</strong> {user.wallet}
      </p>
      <Button
        onClick={() => {
          // setUser(user)
          router.push(`/players/${user.userInfo.id}/base`);
        }}
        className={cvaButton()}>
        Управлять
      </Button>
    </div>
  );
};

export default GameSession;
