const { box } = require('../../dist/common/geography')

module.exports = (longitude, latitude, distance) => {

    const bounds = box(longitude, latitude, distance)
    
    return {
        latitude: Math.random() * (bounds[3] - bounds[2]) + bounds[2],
        longitude: Math.random() * (bounds[1] - bounds[0]) + bounds[0]
    }

}