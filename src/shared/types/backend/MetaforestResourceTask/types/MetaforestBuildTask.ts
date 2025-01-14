import { MetaforestResourceType } from '@/shared/types/backend/MetaforestResource/types/MetaforestResourceType';

export interface IMetaforestResourceTask {
  idx: string;
  sector_idx: string; //*
  name: string; //*
  description: string; //*
  duration_per_bp: number; //*
  is_available: boolean;
  requirements: {
    resource_type: MetaforestResourceType;
    total: number;
    bp_per_unit: number;
    current: number;
  }[]; //*
  exp_profit_per_bp: number; //*
  mfgt_per_bp: number; //*
  type: string;
}
