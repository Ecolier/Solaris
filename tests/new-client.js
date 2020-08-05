const { default: Axios } = require('axios')
const randomLocation = require('./common/random-location')
const config = require('./config.json')
const io = require('socket.io-client')('http://localhost:5000')

var token = {}

io.on('message received', (message) => {
    console.log(message)
})

io.on('stranger location updated', (user) => {
    console.log(`${user.username} updated its location`)
})

io.on('strangers discovered', (...users) => {
    users.forEach((user) => {
        console.log(`${user.username} discovered`)
        io.emit('send message', { 
            token: token, 
            target: user.username,
            message: 'hello world'
        })
    })
})

io.connect()

Axios.get('http://localhost:5000/auth/register').then((response) => {

    token = response.data.token

    io.emit('create chatroom', { token: token })

    var location = randomLocation(config.longitude, config.latitude, 1)

    setInterval(() => {

        location.longitude += .0001
        location.latitude += .0001

        io.emit('update location', {
            token: token,
            longitude: location.longitude,
            latitude: location.latitude
        })
    }, 500)
    

})