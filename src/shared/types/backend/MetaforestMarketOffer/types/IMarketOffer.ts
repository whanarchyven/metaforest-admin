import { IMarketOfferResource } from './IMarketOfferResource';
import { IMarketOfferLootbox } from '@/shared/types/backend/MetaforestMarketOffer/types/IMarketOfferLootbox';
import { IMarketOfferItem } from '@/shared/types/backend/MetaforestMarketOffer/types/IMarketOfferItem';
import { IMetaforestPlayer } from '@/shared/types/backend/MetaforestPlayer/types/IMetaforestPlayer';

export type IMetaforestDebt =
  | IMarketOfferResource
  | IMarketOfferLootbox
  | IMarketOfferItem;
export type IMetaforestMarketOfferType = 'resources' | 'items' | 'lootboxes';
export interface IMarketOffer {
  created_at: string;
  seller: IMetaforestPlayer;
  type: IMetaforestMarketOfferType;
  status: 'closed' | 'canceled' | 'pending';
  totalPrice: number;
  debt: IMetaforestDebt;
  customer: IMetaforestPlayer | null;
}
