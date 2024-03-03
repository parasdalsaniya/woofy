'use client';

import { io } from 'socket.io-client';
import { useAppStore } from '@/store/app-state';

const useSocket = () => {
  const cookies = useAppStore((state) => state.cookies);

  const socket = io('http://localhost:4001', {
    auth: {
      token: cookies?.value || '',
    },
  });

  return { socket };
};

export default useSocket;
