import { axiosInstance } from '../axios';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';
import { API } from '@/shared/api/api';

export const updateGameSession = async (
  telegram_id: string,
  session: IMetaforestGameEngine
) => {
  console.log('AAA', telegram_id);
  try {
    const result = await axiosInstance.post<IMetaforestGameEngine>(
      API.updateGameSession(telegram_id),
      session
    );
    console.log(result.data, 'AUE');
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
