const onConnected = (socket) => {
    socket.on("update location", updateLocation)
    socket.on("discover strangers", discoverStrangers)
}

const updateLocation = async (username, password, longitude, latitude) => {
    
}

const discoverStrangers = (username, password) => {

}

module.exports = { onConnected }