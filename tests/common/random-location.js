const { box } = require('../../dist/geography')

module.exports = (coordinates, distance) => {

    const bounds = box(coordinates, distance)
    
    return {
        latitude: Math.random() * (bounds.maxLat - bounds.minLat) + bounds.minLat,
        longitude: Math.random() * (bounds.maxLng - bounds.minLng) + bounds.minLng
    }

}