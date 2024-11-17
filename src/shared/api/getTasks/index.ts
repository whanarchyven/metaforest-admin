import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';
import { IMetaforestTask } from '@/shared/types/backend/MetaforestTask/types/IMetaforestTask';

export const getTasks = async (buiding_idx: string) => {
  try {
    const result = await axiosInstance.get<IMetaforestTask[]>(
      API.getTasks(buiding_idx)
    );
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR SUKA');
    throw e;
  }
};
