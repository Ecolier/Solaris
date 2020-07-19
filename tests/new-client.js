const { default: Axios } = require('axios')
const randomLocation = require('./common/random-location')
const config = require('./config.json')
const io = require('socket.io-client')('http://localhost:5000')

io.on('stranger location updated', (user) => {
    console.log(`${user.username} updated its location`)
})

io.on('strangers discovered', (...users) => {
    users.forEach((user) => {
        console.log(`${user.username} discovered`)
    })
})

io.connect()

Axios.get('http://localhost:5000/auth/register').then((response) => {

    var location = randomLocation(config.longitude, config.latitude, 1)

    setInterval(() => {

        location.longitude += .0001
        location.latitude += .0001

        io.emit('update location', {
            token: response.data.token,
            longitude: location.longitude,
            latitude: location.latitude
        })
    }, 500)
    

})