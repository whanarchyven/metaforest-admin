import { create } from 'zustand';
import { IGameSession } from '@/shared/types/gameSessions';

interface NavbarStoreState {
  user: IGameSession['user'] | null;
}

interface NavbarStoreActions {
  setUser: (user: IGameSession['user'] | null) => void;
}

export const useNavbarStore = create<NavbarStoreState & NavbarStoreActions>(
  (set) => ({
    user: null,
    setUser: (user) => {
      set(() => {
        return {
          user,
        };
      });
    },
  })
);
