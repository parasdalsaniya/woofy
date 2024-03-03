'use client';

import useSocket from '@/socket/socket';

const HomeMain = () => {
  const { socket } = useSocket();
  socket.on('connect', () => {
    console.log('connected');
  });

  return <section className="p-2">HomeMain</section>;
};

export default HomeMain;
