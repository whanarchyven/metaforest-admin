export const apiUrl = process.env.NEXT_PUBLIC_FRONT_API_URL;
export type Error = {
  message: string;
  code: number;
  customData: any;
};

export type TRequestStatuses = 'init' | 'pending' | 'fulfilled' | 'rejected';

export interface IResponse<D = any> {
  status: 'success' | 'error';
  data: D;
  errors: Error[];
}

export const API = {
  getGameSessions: (slug?: string) => `/admin/games?telegram_id=${slug}`,
  getGameSession: (slug?: string) => `/admin/games/${slug}`,
  updateGameSession: (slug?: string) => `/admin/games/${slug}/update`,
  changeBunny: (slug?: string) => `/bunny/change/${slug}`,
  addLootbox: `/add-lootbox`,
  getSectors: `/admin/sector`,
  getSector: (sector_idx: string) => `/admin/sector/${sector_idx}`,
  createSector: `/admin/sector/create`,
  updateSector: (sector_idx: string) => `/admin/sector/${sector_idx}/update`,
  getSectorPlaces: (sector_idx: string) => `/admin/sector/${sector_idx}/place/`,
  getSectorBuildings: (sector_idx: string) =>
    `/admin/sector/${sector_idx}/buildings/`,
  createSectorPlace: (sector_idx: string) =>
    `/admin/sector/${sector_idx}/place/create`,
  getSectorPlace: (sector_place_idx: string) =>
    `/admin/place/${sector_place_idx}`,
  createBuilding: (place_idx: string) =>
    `/admin/place/${place_idx}/building/create`,
  getBuilding: (building_idx: string) => `/admin/building/${building_idx}/`,
  createTask: (building_idx: string) =>
    `/admin/building/${building_idx}/task/create`,
  getTasks: (building_idx: string) => `/admin/building/${building_idx}/task/`,
  getTask: (task_idx: string) => `/admin/task/${task_idx}/`,
  updateTask: (task_idx: string) => `/admin/task/${task_idx}/update/`,
};
