import { IMetaforestBunny } from '@/shared/types/backend/MetaforestBunny/types/IMetaforestBunny';
import { IMetaforestPlayer } from '@/shared/types/backend/MetaforestPlayer/types/IMetaforestPlayer';
import { IMetaforestActiveTask } from '@/shared/types/backend/MetaforestTask/types/IMetaforestActiveTask';
import { IMetaforestLootbox } from '@/shared/types/backend/MetaforestLootBox/types/IMetaforestLootbox';

export interface IMetaforestGameEngine {
  //назвать по-лучше
  _id?: string;
  activeBunny: IMetaforestBunny;
  bunnies: IMetaforestBunny[];
  user: IMetaforestPlayer;
  currentSectorIdx: string;
  activeTask: IMetaforestActiveTask | null;
  isBunnyBusy: boolean;
  bunnyBusyTill: string | null;
  lastTickHour: string;
  lastTickDay: string;
  energy: number;
  energyLimit: number;
  //karma:number
  mfgt: number;
  tonBalance: number;
  lootboxes: IMetaforestLootbox[];
  resources: {
    carrots: {
      balance: number;
      limit: number;
    };
    wood: {
      balance: number;
      limit: number;
    };
    stone: {
      balance: number;
      limit: number;
    };
    ether: {
      balance: number;
      limit: number;
    };
    wheat: {
      balance: number;
      limit: number;
    };
    timber: {
      balance: number;
      limit: number;
    };
    iron: {
      balance: number;
      limit: number;
    };
    cake: {
      balance: number;
      limit: number;
    };
    beer: {
      balance: number;
      limit: number;
    };
  };
  inventory: number[];
  refererUid: string | null;
  referrals: string[];
  isActive?: boolean;
  lastActiveTick: string;
}
