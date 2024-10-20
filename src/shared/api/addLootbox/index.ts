import { axiosInstance } from '../axios';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';

export const addLootbox = async (telegram_id: string) => {
  console.log('AAA', telegram_id);
  try {
    const result = await axiosInstance.post<IMetaforestGameEngine>(
      `/api/add-lootbox/${telegram_id}`
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
