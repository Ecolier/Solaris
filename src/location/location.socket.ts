import { AuthenticationController } from '../user.model.ts/authentication.controller'
import { LocationController } from '../location/location.controller'
import { box } from '../common/geography'
import { Socket } from 'socket.io'
import { PrivacyController } from '../privacy/privacy.controller'
import * as jwt from 'jsonwebtoken'
import { UserPayload } from '../models/user-payload'
import { authenticate } from '../user.model.ts/authentication.socket'

// inefficient but simple way to hash string arrays
var hashStringArray = function(...strings: string[]) {
    strings.sort()
    return strings.join('|')
}

/**     
 * Updates user location and notifies authorized nearby users
 * @param request an object that contains a token, a latitude, and a longitude
 * @todo authenticate with appropriate middleware instead of rewriting authentication process
 */
export default async (socket: Socket, request: any) => {

    const result = await authenticate(socket, request)
    if ('name' in result) { return socket.emit(result.name, result.description) }

    if (typeof request.latitude !== 'number' ||
        typeof request.longitude !== 'number') {
        socket.emit('error', { description: 'malformed request' })
    }

    const user = result
    const longitude = request.longitude
    const latitude = request.latitude

    // Update user location
    const locationController = new LocationController()
    locationController.updateLocation(user.username, longitude, latitude)

    // Find nearby users
    const bounds = box(longitude, latitude, 5)
    const strangers = await locationController.findInBounds(user.username, bounds[0], bounds[1], bounds[2], bounds[3])

    // Notify each nearby user they are seen and a location has been updated
    let privacyController = new PrivacyController()
    strangers.forEach(async (stranger) => {
        privacyController.setSeenBy(stranger.username, user.username)

        const groupHash = hashStringArray(user.username, stranger.username)
        
        socket.join(groupHash)
        socket.to(groupHash)
        socket.emit('stranger location updated', { username: user.username, longitude: longitude, latitude: latitude })
    })

    socket.emit('strangers discovered', ...strangers)

}