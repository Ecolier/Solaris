import { getDatabase } from './common/database'
import { AuthenticationController } from './authentication/authentication.controller'
import { LocationController } from './location/location.controller'
import { box } from './common/geography'

import { Socket } from 'socket.io'
import { PrivacyController } from './privacy/privacy.controller'

const onConnected = (socket: Socket) => {
    socket.on('update location', (args: any) => { updateLocation(socket, args) })
    socket.emit('connect')
}

const updateLocation = async (socket: Socket, request: any) => {

    const username = request.username
    const password = request.password
    const longitude = request.longitude
    const latitude = request.latitude

    const authenticationController = new AuthenticationController(
        getDatabase().collection('user')
    )

    const user = await authenticationController.login(username, password)

    if (!user) { 
        return socket.emit('authentication error')
    }

    const locationController = new LocationController(
        user, getDatabase().collection('user')
    )

    locationController.updateLocation(longitude, latitude)

    const bounds = box(user.longitude, user.latitude, 5)
    const strangers = await locationController.findInBounds(bounds[0], bounds[1], bounds[2], bounds[3])

    let privacyController = new PrivacyController(getDatabase().collection('user'))
    strangers.forEach(async (stranger) => {
        privacyController.setSeenBy(stranger.username, user.username)
    })

    socket.emit('strangers discovered', ...strangers)

}

export { onConnected }