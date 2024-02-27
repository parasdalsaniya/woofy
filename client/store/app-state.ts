import { create } from 'zustand';

type TActiveUser = {
  id: string;
  email: string;
};

interface IAppState {
  user: TActiveUser | null;
  setUser: (user: TActiveUser | null) => void;
}

export const useAppStore = create<IAppState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
