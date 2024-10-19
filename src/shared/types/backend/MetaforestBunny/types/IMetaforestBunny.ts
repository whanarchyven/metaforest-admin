import { MetaforestNftRarityType } from '@/shared/types/backend/MetaforestBunny/types/MetaforestBunnyRarityType';
import { IMetaforestBunnyTalent } from '@/shared/types/backend/MetaforestBunnyTalent/types/IMetaforestBunnyTalent';
import { IMetaforestClothesItem } from '@/shared/types/backend/MetaforestClothesItem/types/IMetaforestClothesItem';

export interface IMetaforestBunny {
  _id: string;
  idx: number;
  uuid: string;
  isFree: boolean;
  rarity: MetaforestNftRarityType;
  level: number;
  exp: number;
  skillPoints: number;
  canBreed: boolean;
  child?: IMetaforestBunny;
  baseParams: {
    str: number;
    int: number;
    dex: number;
    vit: number;
    krm: number;
  };
  calculatedParams: {
    str: number;
    int: number;
    dex: number;
    vit: number;
    krm: number;
  };
  socialParams: {
    satiety: number;
    cleanness: number;
    happiness: number;
    communication: number;
    emotionality: number;
  };
  talents: { talent: IMetaforestBunnyTalent; isOpen: boolean }[];
  wornClothes: {
    Hat: IMetaforestClothesItem | null;
    Face: IMetaforestClothesItem | null;
    Necklace: IMetaforestClothesItem | null;
    HandLeft: IMetaforestClothesItem | null;
    Overhead: IMetaforestClothesItem | null;
    EarsAccessories: IMetaforestClothesItem | null;
    Costume: IMetaforestClothesItem | null;
    HandRight: IMetaforestClothesItem | null;
  };
  bunnyGens: {
    body: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
    ears: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
    eyes: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
    scar: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
    mouth: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
    texture: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
    bg: {
      name: string;
      rarity: MetaforestNftRarityType;
    };
  };
  nftCollection: string;
  layers: string[];
  bodyLayers: string[];
  images: {
    web: string;
    original: string;
    thumb: string;
    transparentBg: string;
  };
  deployedNftWithTrait: {
    id: string;
    name: string;
    attributes: { trait_type: string; value: string | number }[];
    image: string;
  };
  __v: number;
  ownerTonWalletAddress: string;
  ownerUserUri: string;
}
