import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';

export const getGameSession = async (telegram_id?: string) => {
  console.log('AAA', telegram_id);
  try {
    const result = await axiosInstance.get<IMetaforestGameEngine>(
      API.getGameSession(telegram_id)
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
