import { IMetaforestSectorBonuses } from '@/shared/types/backend/MetaforestKing/types/IMetaforestSectorBonuses';

export interface IMetaforestSector {
  idx: string;
  name: string;
  type: keyof IMetaforestSectorBonuses;
  places: string[];
  available_lootboxes: string[];
  available_tokens: number;
  level: number;
}
