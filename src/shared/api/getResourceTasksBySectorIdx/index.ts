import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestResourceTask } from '@/shared/types/backend/MetaforestResourceTask/types/MetaforestBuildTask';

export const getResourceTasksBySectorIdx = async (sector_idx: string) => {
  try {
    console.log('ENTERED getBuildTasksBySectorIdx');
    const result = await axiosInstance.get<IMetaforestResourceTask[]>(
      API.getResourceTaskBySectorIdx(sector_idx)
    );
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR SUKA');
    throw e;
  }
};
