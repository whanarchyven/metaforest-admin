import { MetaforestResourceType } from '@/shared/types/backend/MetaforestResource/types/MetaforestResourceType';

export interface IMetaforestGrindTask {
  idx: string;
  type: string;
  energy_cost: number;
  exp_profit: number;
  duration: string;
  name: string;
  description: string;
  requirements: {
    resource_type: MetaforestResourceType;
    amount: number;
  }[];
  profits: [
    {
      resource_type: MetaforestResourceType;
      amount_coef: number;
    },
  ];
  sector_idx: string;
  sector_place_idx: string;
  building_idx: string;
  bunny_workers: string[];
  bunny_workers_limit: number;
}
