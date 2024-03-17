'use client';

import { createContext, useContext } from 'react';
import { Socket, io } from 'socket.io-client';
import { useAppStore } from './app-state';

type TState = {
  socket: Socket | null;
};

const initialState: TState = {
  socket: null,
};

const SocketContext = createContext(initialState);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { cookies } = useAppStore((s) => s);
  const socket = io('http://localhost:4001', {
    auth: {
      token: cookies.value.toString() || '',
    },
    autoConnect: true,
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
export default SocketContext;
