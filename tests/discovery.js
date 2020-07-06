const { default: Axios } = require('axios')
const io = require('socket.io-client')('http://localhost:5000')

io.on('strangers discovered', (...strangers) => {
    console.log(...strangers)
})

io.connect()

Axios.post('http://localhost:5000/user', { username: 'aa1bf5d4', password: '986916a5' }).then((response) => {

    const user = response.data

    io.emit('discover strangers', { username: user.username, password: user.password })

})