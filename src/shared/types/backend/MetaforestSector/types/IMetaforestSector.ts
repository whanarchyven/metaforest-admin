import { IMetaforestSectorBonuses } from '@/shared/types/backend/MetaforestKing/types/IMetaforestSectorBonuses';

export interface IMetaforestSector {
  idx: string;
  numberIdx: number;
  name: string;
  type: keyof IMetaforestSectorBonuses;
  places: string[];
  available_lootboxes: string[];
  available_tokens: number;
  authority: {
    red: number;
    blue: number;
  };
  level: number;
  image?: string;
}
