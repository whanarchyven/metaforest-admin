import { axiosInstance } from '../axios';

import { API } from '@/shared/api/api';

export const deleteSectorPlace = async (sectorPlace_idx: string) => {
  try {
    const result = await axiosInstance.post<any>(
      API.deleteSectorPlace(sectorPlace_idx)
    );

    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR');
    throw e;
  }
};
