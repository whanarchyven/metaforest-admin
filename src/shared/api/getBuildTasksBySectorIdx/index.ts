import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';
import { IMetaforestBuildTask } from '@/shared/types/backend/MetaforestBuildTask/types/MetaforestBuildTask';

export const getBuildTasksBySectorIdx = async (sector_idx: string) => {
  try {
    console.log('ENTERED getBuildTasksBySectorIdx');
    const result = await axiosInstance.get<IMetaforestBuildTask[]>(
      API.getBuildTaskBySectorIdx(sector_idx)
    );
    return result.data;
  } catch (e: any) {
    console.log(e, 'ERR SUKA');
    throw e;
  }
};
