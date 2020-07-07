const config = require('./config.json')
const { default: Axios } = require('axios')
const randomLocation = require('./common/random-location')
const io = require('socket.io-client')(config.endpoint)

Axios.post(`${config.endpoint}/user`, { username: config.username, password: config.password }).then((response) => {

    const random = randomLocation({
        longitude: config.longitude,
        latitude: config.latitude,
    }, 1)

    io.emit('update location', {
        username: response.data.username,
        password: response.data.password,
        longitude: random.longitude,
        latitude: random.latitude
    })

})