import { MetaforestTaskType } from '@/shared/types/backend/MetaforestTask/types/MetaforestTaskType';
import { IMetaforestSectorPlace } from '@/shared/types/backend/MetaforestSectorPlace/types/IMetaforestSectorPlace';
import { MetaforestResourceType } from '@/shared/types/backend/MetaforestResource/types/MetaforestResourceType';

export interface IMetaforestTask {
  _id: string;
  idx: number;
  uid: string;
  type: MetaforestTaskType;
  name: string;
  description: string;
  place: IMetaforestSectorPlace;
  aspect: MetaforestResourceType;
  requirementsPerHour?: {
    resource: MetaforestResourceType;
    amount: number;
  }[];
  energyCostPerHour: number;
}
