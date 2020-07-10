const { default: Axios } = require('axios')
const randomLocation = require('./common/random-location')
const config = require('./config.json')
const io = require('socket.io-client')('http://localhost:5000')

io.connect()

Axios.get('http://localhost:5000/user').then((response) => {

    const user = response.data

    console.log(user)

    const random = randomLocation({
        longitude: config.longitude, 
        latitude: config.latitude
    }, 1)

    io.emit('update location', {
        username: user.username,
        password: user.password,
        longitude: random.longitude,
        latitude: random.latitude
    })

})