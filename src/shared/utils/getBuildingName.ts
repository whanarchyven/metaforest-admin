import { MetaforestBuildingType } from '@/shared/types/backend/MetaforestBuilding/types/MetaforestBuildingType';

export const getBuildingName = (type: MetaforestBuildingType) => {
  switch (type) {
    case 'townHall':
      return 'Ратуша';
    case 'storehouse':
      return 'Склад';
    case 'etherTower':
      return 'Башня эфира';
    case 'logging':
      return 'Лесозаготовка';
    case 'mine':
      return 'Шахта';
    case 'sawmill':
      return 'Лесопилка';
    case 'forge':
      return 'Кузница';
    case 'farm':
      return 'Ферма';
    case 'tavern':
      return 'Таверна';
    case 'magicCave':
      return 'Магическая пещера';
    case 'home':
      return 'Жилой дом';
  }
};
