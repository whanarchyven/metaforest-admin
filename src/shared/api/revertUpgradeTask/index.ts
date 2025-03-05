import { axiosInstance } from '../axios';

import { API } from '@/shared/api/api';

export const revertUpgradeTask = async (building_idx: string) => {
  try {
    const result = await axiosInstance.post<any>(API.revertUpgradeTask(building_idx));

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
