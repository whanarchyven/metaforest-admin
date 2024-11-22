import { axiosInstance } from '../axios';

import { API } from '@/shared/api/api';

export const deleteTask = async (task_idx: string) => {
  try {
    const result = await axiosInstance.post<any>(API.deleteTask(task_idx));

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
