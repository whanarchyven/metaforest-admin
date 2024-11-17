import { API } from '../api';
import { axiosInstance } from '../axios';
import { IMetaforestBuilding } from '@/shared/types/backend/MetaforestBuilding/types/IMetaforestBuilding';

export const getBuilding = async (building_idx: string) => {
  try {
    const result = await axiosInstance.get<IMetaforestBuilding>(
      API.getBuilding(building_idx)
    );
    return result.data;
  } catch (e: any) {
    throw e;
  }
};
