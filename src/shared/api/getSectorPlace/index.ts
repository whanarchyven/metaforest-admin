import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSectorPlace } from '@/shared/types/backend/MetaforestSectorPlace/types/IMetaforestSectorPlace';

export const getSectorPlace = async (sector_place_idx: string) => {
  try {
    const result = await axiosInstance.get<IMetaforestSectorPlace>(
      API.getSectorPlace(sector_place_idx)
    );
    return result.data;
  } catch (e: any) {
    throw e;
  }
};
