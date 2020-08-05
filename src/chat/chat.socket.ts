import { Socket } from 'socket.io'
import { authenticate } from '../authentication/authentication.socket'

export const createChatroom = async (socket: Socket, request: any) => {
    const result = await authenticate(socket, request)
    if ('name' in result) { return socket.emit(result.name, result.description) }
    socket.join(result.username)
}

export const sendMessage = async (socket: Socket, request: any) => {
    const result = await authenticate(socket, request)
    if ('name' in result) { return socket.emit(result.name, result.description) }
    if (typeof request.target !== 'string' ||
        typeof request.message !== 'string') {
        return socket.emit('error', 'malformed request')
    }
    socket.to(request.target).emit('message received', request.message)
}