import { IMetaforestPlayer } from '@/shared/types/backend/MetaforestPlayer/types/IMetaforestPlayer';
import { MetaforestClothesItem } from '@/shared/types/backend/MetaforestClothesItem/types/MetaforestClothesSlot';
import { MetaforestNftRarityType } from '@/shared/types/backend/MetaforestBunny/types/MetaforestBunnyRarityType';

export interface IMetaforestClothesItem {
  _id: string;
  idx: number;
  uid: string;
  name: string;
  itemWornOnBunnyIdx: number | null;
  owner: IMetaforestPlayer;
  isOnMarket: boolean;
  itemsSlot: MetaforestClothesItem;
  images: {
    original: string;
    square: string;
  };
  baseParams: {
    str: number;
    int: number;
    dex: number;
    vit: number;
    krm: number;
    rarity: MetaforestNftRarityType;
  };
}
