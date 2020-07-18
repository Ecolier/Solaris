const { default: Axios } = require('axios')
const randomLocation = require('./common/random-location')
const config = require('./config.json')
const io = require('socket.io-client')('http://localhost:5000')

io.connect()

Axios.get('http://localhost:5000/auth/register').then((response) => {

    const random = randomLocation(config.longitude, config.latitude, 1)

    io.emit('update location', {
        token: response.data.token,
        longitude: random.longitude,
        latitude: random.latitude
    })

})