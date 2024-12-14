import { MetaforestBuildingType } from '@/shared/types/backend/MetaforestBuilding/types/MetaforestBuildingType';
import { MetaforestResourceType } from '@/shared/types/backend/MetaforestResource/types/MetaforestResourceType';

export interface IMetaforestBuildTask {
  idx: string;
  sector_idx: string;
  sector_place_idx: string;
  building_type: MetaforestBuildingType;
  building_idx: string | null;
  building_level: number | null;
  name: string;
  description: string;
  duration: string;
  is_available: boolean;
  profits: { resource_type: MetaforestResourceType; amount: number }[];
  requirements: { resource_type: MetaforestResourceType; amount: number }[];
  benefit_points_per_player: number;
  energy_cost: number;
  progress_per_player: number;
  total_progress: number;
  current_progress: number;
  exp_profit: number;
  type: string;
}
