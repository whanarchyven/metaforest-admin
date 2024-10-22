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
  getGameSessions: (slug?: string) =>
    `${apiUrl}/admin/games?telegram_id=${slug}`,
  getGameSession: (slug?: string) => `${apiUrl}/admin/games/${slug}`,
  updateGameSession: (slug?: string) => `${apiUrl}/admin/games/${slug}/update`,
  changeBunny: (slug?: string) => `${apiUrl}/bunny/change/${slug}`,
  addLootbox: `${apiUrl}/add-lootbox`,
};
