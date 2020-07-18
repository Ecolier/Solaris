import { Socket } from 'socket.io'
import updateLocation from './location/location.socket'

const onConnected = (socket: Socket) => {
    socket.on('update location', (args) => { updateLocation(socket, args) })
    socket.emit('connect')
}

export { onConnected }