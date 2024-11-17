import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';

export const getSector = async (sector_idx: string) => {
  try {
    console.log('ENTERED');
    const result = await axiosInstance.get<IMetaforestSector>(
      API.getSector(sector_idx)
    );
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR SUKA');
    throw e;
  }
};
