import { axiosInstance } from '../axios';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';

export const changeBunny = async (
  telegram_id: string,
  bunny_idx: string | number
) => {
  console.log('AAA', telegram_id);
  try {
    const result = await axiosInstance.post<IMetaforestGameEngine>(
      `/api/change-bunny/${bunny_idx}`,
      {},
      { headers: { Authorization: telegram_id } }
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
