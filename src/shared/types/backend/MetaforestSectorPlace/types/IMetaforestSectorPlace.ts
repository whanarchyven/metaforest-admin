import { IMetaforestPlayer } from '@/shared/types/backend/MetaforestPlayer/types/IMetaforestPlayer';
import { IMetaforestKing } from '@/shared/types/backend/MetaforestKing/types/IMetaforestKing';
import { IMetaforestBuilding } from '@/shared/types/backend/MetaforestBuilding/types/IMetaforestBuilding';

export interface IMetaforestSectorPlace {
  idx: number;
  uid: string;
  isFree: boolean;
  cost: number;
  owner: IMetaforestPlayer | IMetaforestKing;
  building?: IMetaforestBuilding;
}
