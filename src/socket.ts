import { database } from './database'
import { coordsToPoint, box } from './geography'
import * as userController from './user-controller'

import { Socket } from 'socket.io'

const onConnected = (socket: Socket) => {
    socket.on('update location', (args: any) => { updateLocation(socket, args) })
    socket.on('discover strangers', (args: any) => { discoverStrangers(socket, args) })
}

const updateLocation = async (socket: Socket, request: any) => {
    
    await database().collection('user').updateOne({
        $and: [
            { username : request.username },
            { password: request.password },
        ]
    }, 
    {
        $set: {
            location: coordsToPoint(request.longitude, request.latitude)
        }
    })

}

const discoverStrangers = async (socket: Socket, request: any) => {

    const username = request.username
    const password = request.password

    const user = await userController.login(username, password)

    if (!user) { return }

    const bounds = box({
        longitude: user.longitude,
        latitude: user.latitude
    }, 5)

    const results = database().collection('user').find({
        $and: [
            { username: { $ne: username } },
            { 'location.coordinates.0':  { $gt: bounds.minLng }},
            { 'location.coordinates.0':  { $lt: bounds.maxLng }},
            { 'location.coordinates.1':  { $gt: bounds.minLat }},
            { 'location.coordinates.1':  { $lt: bounds.maxLat }},
        ]
    })

    results.forEach(async (doc) => {
        
        await database().collection('user').updateOne({
            _id: doc._id
        }, { $addToSet: { seenBy: user.username }})

    })

    const strangers = (await results.toArray()).map((result) => {
        return {
            username: result.username,
            longitude: result.location.coordinates[0],
            latitude: result.location.coordinates[1],
        }
    })

    socket.emit('strangers discovered', ...strangers)

}

export { onConnected }