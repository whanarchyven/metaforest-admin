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
  resources: {
    carrots: {
      balance: 0;
    };
    wood: {
      balance: 0;
    };
    stone: {
      balance: 0;
    };
    ether: {
      balance: 0;
    };
    wheat: {
      balance: 0;
    };
    timber: {
      balance: 0;
    };
    iron: {
      balance: 0;
    };
    cake: {
      balance: 0;
    };
    beer: {
      balance: 0;
    };
  };
  has_store: false;
}
