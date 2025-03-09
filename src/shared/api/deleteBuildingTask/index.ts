import { axiosInstance } from '../axios';

import { API } from '@/shared/api/api';

export const deleteBuildingTask = async (task_idx: string) => {
  try {
    const result = await axiosInstance.post<any>(
      API.deleteBuildingTask(task_idx)
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
