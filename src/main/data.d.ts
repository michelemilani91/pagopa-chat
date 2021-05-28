import net from 'net';

export interface SocketClient {
    id: number;
    socket: net.Socket;
}