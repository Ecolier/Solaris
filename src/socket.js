const { database } = require("./database")
const { coordsToPoint, box } = require("./geography")

var defaultSocket = { }

const onConnected = socket => {
    defaultSocket = socket
    defaultSocket.on('update location', (request) => { updateLocation(request) })
    defaultSocket.on('discover strangers', (request) => { discoverStrangers(request) })
}

const updateLocation = async request => {
    
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

const discoverStrangers = async request => {

    const bounds = box({
        longitude: request.longitude,
        latitude: request.latitude
    }, 5)

    const result = await database().collection('user').find({
        $and: [
            { "location.coordinates.0":  { $gt: bounds.minLng }},
            { "location.coordinates.0":  { $lt: bounds.maxLng }},
            { "location.coordinates.1":  { $gt: bounds.minLat }},
            { "location.coordinates.1":  { $lt: bounds.maxLat }},
        ]
    })

    defaultSocket.emit('strangers discovered', ...(await result.toArray()))

}

module.exports = { onConnected }