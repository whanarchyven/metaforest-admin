import { axiosInstance } from '../axios';

import { API } from '@/shared/api/api';

export const deleteSector = async (sector_idx: string) => {
  try {
    const result = await axiosInstance.post<any>(API.deleteSector(sector_idx));

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
