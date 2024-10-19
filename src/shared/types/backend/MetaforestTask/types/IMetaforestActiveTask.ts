import { IMetaforestGrindTask } from '@/shared/types/backend/MetaforestTask/types/IMetaforestGrindTask';
import { IMetaforestBuilding } from '@/shared/types/backend/MetaforestBuilding/types/IMetaforestBuilding';
import { IMetaforestSector } from '@/shared/types/backend/MetaforestSector/types/IMetaforestSector';

export interface IMetaforestActiveTask {
  task: IMetaforestGrindTask;
  start: string;
  end: string;
  building: IMetaforestBuilding;
  sector: IMetaforestSector;
}
