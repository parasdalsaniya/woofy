import { create } from 'zustand';

type TActiveUser = {
  id: string;
  email: string;
  image: string | undefined;
  bio: string | undefined;
  name: string;
  username: string;
};

type TUser = {
  id: number;
  name: string;
  image: string;
};

type TCookies = {
  value: string;
};

interface IAppState {
  user: TActiveUser | null;
  setUser: (user: TActiveUser | null) => void;
  users: TUser[] | [];
  setUsers: (users: TUser[] | []) => void;
  cookies: TCookies;
  setCookies: (cookies: TCookies) => void;
}

export const useAppStore = create<IAppState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  users: [],
  setUsers: (users) => set({ users }),
  cookies: { value: '' },
  setCookies: (cookies) => set({ cookies }),
}));
