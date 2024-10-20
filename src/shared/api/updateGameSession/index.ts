import { axiosInstance } from '../axios';
import { IMetaforestGameEngine } from '@/shared/types/gameEngine';

export const updateGameSession = async (
  telegram_id: string,
  session: IMetaforestGameEngine
) => {
  console.log('AAA', telegram_id);
  try {
    const result = await axiosInstance.post<IMetaforestGameEngine>(
      `/api/update-session/${telegram_id}`,
      session
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
