interface IMetaforestSectorBonusChanceSlice {
  level: number;
  bonus: number | null;
  chance: number;
}
interface IMetaforestSectorBonusChances {
  wood: IMetaforestSectorBonusChanceSlice[];
  stone: IMetaforestSectorBonusChanceSlice[];
  carrot: IMetaforestSectorBonusChanceSlice[];
  magic: IMetaforestSectorBonusChanceSlice[];
}

interface IMetaforestSectorBonus {
  chances: IMetaforestSectorBonusChances;
}

export interface IMetaforestSectorBonuses {
  mountains: IMetaforestSectorBonus;
  hills: IMetaforestSectorBonus;
  desert: IMetaforestSectorBonus;
  plains: IMetaforestSectorBonus;
  jungle: IMetaforestSectorBonus;
  swamp: IMetaforestSectorBonus;
  forest: IMetaforestSectorBonus;
}
