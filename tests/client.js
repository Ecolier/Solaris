const { default: Axios } = require('axios')
const { box } = require('../src/geography')
const io = require('socket.io-client')('http://localhost:5000')

io.connect()

const bounds = box({
    longitude: 5.729367162103489, 
    latitude: 45.19205106516721
}, 1)

const latitude = Math.random() * (bounds.maxLat - bounds.minLat) + bounds.minLat
const longitude = Math.random() * (bounds.maxLng - bounds.minLng) + bounds.minLng

Axios.get('http://localhost:5000/user').then((response) => {

    const user = response.data

    console.log(user)

    io.emit('update location', {
        username: user.username,
        password: user.password,
        longitude: longitude,
        latitude: latitude
    })

})