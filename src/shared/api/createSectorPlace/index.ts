import { axiosInstance } from '../axios';

import { API } from '@/shared/api/api';

export const createSectorPlace = async (sector_idx: string) => {
  try {
    const result = await axiosInstance.post<any>(
      API.createSectorPlace(sector_idx)
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
