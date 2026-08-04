import { io } from 'socket.io-client';

// Endereço do servidor responsável pelas conexões WebSocket
const SOCKET_URL = 'http://localhost:3000';

// Função para criar e configurar uma conexão WebSocket
export const setupSocket = (userId: string) => {
  return io(SOCKET_URL, {
    // Envia o identificador do usuário durante a conexão
    query: { userId },

    // Utiliza apenas o protocolo WebSocket
    transports: ['websocket'],
  });
};