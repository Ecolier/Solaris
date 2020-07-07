const config = require('./config.json')
const { default: Axios } = require('axios')
const io = require('socket.io-client')(config.endpoint)

io.on('strangers discovered', (...strangers) => {
    console.log(...strangers)
})

io.connect()

Axios.post(`${config.endpoint}/user`, { username: config.username, password: config.password }).then((response) => {

    const user = response.data
    
    io.emit('discover strangers', { username: user.username, password: user.password })

})