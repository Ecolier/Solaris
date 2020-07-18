import { getUserCollection } from '../database'
import { AuthenticationController } from '../authentication/authentication.controller'
import { LocationController } from '../location/location.controller'
import { box } from '../common/geography'

import { Socket } from 'socket.io'
import { PrivacyController } from '../privacy/privacy.controller'

import * as jwt from 'jsonwebtoken'
import { UserPayload } from '../models/user-payload'

export default async (socket: Socket, request: any) => {

    if (typeof request.token !== 'string' ||
        typeof request.latitude !== 'number' ||
        typeof request.longitude !== 'number') {
        socket.emit('error', { description: 'malformed request' })
    }

    if (typeof process.env.JWT_KEY !== 'string') {
        throw 'JWT_KEY is not setup properly'
    }

    const payload = jwt.verify(request.token, process.env.JWT_KEY) as UserPayload
    const authenticationController = new AuthenticationController()
    const user = await authenticationController.findUser(payload.username)

    if (!user) { 
        return socket.emit('error', { description: 'authentication error'})
    }

    const locationController = new LocationController()
    locationController.updateLocation(user.username, request.longitude, request.latitude)
    
    const bounds = box(user.longitude, user.latitude, 5)
    const strangers = await locationController.findInBounds(user.username, bounds[0], bounds[1], bounds[2], bounds[3])

    let privacyController = new PrivacyController()
    strangers.forEach(async (stranger) => {
        privacyController.setSeenBy(stranger.username, user.username)
    })

    socket.emit('strangers discovered', ...strangers)

}