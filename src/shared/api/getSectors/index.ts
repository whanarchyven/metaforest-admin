import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';

export const getSectors = async () => {
  try {
    console.log('ENTERED');
    const result = await axiosInstance.get<IMetaforestSector[]>(API.getSectors);
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR SUKA');
    throw e;
  }
};
