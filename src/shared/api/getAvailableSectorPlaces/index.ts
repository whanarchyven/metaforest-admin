import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSectorPlace } from '@/shared/types/backend/MetaforestSectorPlace/types/IMetaforestSectorPlace';

export const getAvailableSectorPlaces = async (sector_idx: string) => {
  try {
    const result = await axiosInstance.get<IMetaforestSectorPlace[]>(
      API.getAvailableSectorPlaces(sector_idx)
    );
    console.log(result.data, 'DATA');
    return result.data;
  } catch (e: any) {
    throw e;
  }
};
