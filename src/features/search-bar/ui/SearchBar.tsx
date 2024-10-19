'use client';
import { FC, useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import Button from '@/shared/ui/Button/Button';
import { useRouter } from 'next/navigation';

const cvaRoot = cva(['searchBar-cvaRoot', 'flex items-center gap-2']);

const cvaInput = cva([
  'outline-none',
  'p-1',
  'rounded-xl',
  'text-base',
  'w-1/3',
]);

const cvaButton = cva([
  'bg-cBlack',
  'text-white',
  'rounded-xl',
  'p-1',
  'text-base',
  'h-full',
]);

const SearchBar: FC = () => {
  const [id, setId] = useState('');
  const router = useRouter();

  const doSearch = () => {
    if (id) {
      router.push(`?telegram_id=${id}`);
    } else {
      router.push(``);
    }
  };

  useEffect(() => {
    if (id == '') {
      router.push('/players');
    }
  }, [id]);

  return (
    <div className={cvaRoot()}>
      <input
        value={id}
        onChange={(event) => {
          setId(event.target.value);
        }}
        placeholder={'Поиск по telegramId'}
        className={cvaInput()}
      />
      <Button onClick={doSearch} className={cvaButton()}>
        Поиск
      </Button>
    </div>
  );
};

export default SearchBar;
