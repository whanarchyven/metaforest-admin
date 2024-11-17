import { API } from '../api';
import { axiosInstance } from '../axios';
import { IGameSession } from '@/shared/types/gameSessions';

export const getGameSessions = async (telegram_id?: string) => {
  try {
    const result = await axiosInstance.get<IGameSession[]>(
      API.getGameSessions(telegram_id ?? '')
    );
    console.log(result.data, `${API.getGameSessions(telegram_id)}`);
    return result.data;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};
