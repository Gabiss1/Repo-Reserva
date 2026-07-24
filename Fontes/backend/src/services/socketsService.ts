import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000';

export const setupSocket = (userId: string) => {
  return io(SOCKET_URL, {
    query: { userId },
    transports: ['websocket'],
  });
};