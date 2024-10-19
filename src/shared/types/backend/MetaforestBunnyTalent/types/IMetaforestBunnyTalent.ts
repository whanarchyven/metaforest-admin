import { MetaforestAspectType } from '@/shared/types/backend/MetaforestTask/types/MetaforestAspectType';

export interface IMetaforestBunnyTalent {
  aspect: MetaforestAspectType;
  type: 'positive' | 'negative';
  effectValue: number;
}
