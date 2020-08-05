import { Socket } from 'socket.io'
import updateLocation from './location/location.socket'
import { sendMessage, createChatroom } from './chat/chat.socket'

const onConnected = (socket: Socket) => {
    socket.on('update location', (args) => { updateLocation(socket, args) })
    socket.on('create chatroom', (args) => { 
        createChatroom(socket, args) 
    })
    socket.on('send message', (args) => { sendMessage(socket, args) })
    socket.emit('connect')
}

export { onConnected }