import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestSectorPlace } from '@/shared/types/backend/MetaforestSectorPlace/types/IMetaforestSectorPlace';
import { IMetaforestBuildTask } from '@/shared/types/backend/MetaforestBuildTask/types/MetaforestBuildTask';

export const getBuildTaskBySectorPlaceIdx = async (
  sector_place_idx: string
) => {
  try {
    const result = await axiosInstance.get<IMetaforestBuildTask>(
      API.getBuildTaskBySectorPlaceIdx(sector_place_idx)
    );
    return result.data;
  } catch (e: any) {
    throw e;
  }
};
