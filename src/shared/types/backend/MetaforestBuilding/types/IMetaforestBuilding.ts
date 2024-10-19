import { MetaforestBuildingType } from '@/shared/types/backend/MetaforestBuilding/types/MetaforestBuildingType';

export interface IMetaforestBuilding {
  idx: string;
  sector_idx: string;
  sector_place_idx: string;
  type: MetaforestBuildingType;
  level: number;
  owner: string;
}
