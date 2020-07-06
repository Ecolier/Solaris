const coordsToPoint = (longitude, latitude) => {
    return { type: 'Point', coordinates: [longitude, latitude] }
}

const pointToCoords = (point) => {
    return { longitude: point.coordinates[0], latitude: point.coordinates[1] }
}

const box = (location, distance) => {
    const earthRadius = 6371
    const minLat = location.latitude  - (distance / earthRadius) * (180 / Math.PI)
    const minLng = location.longitude - (distance / earthRadius) * (180 / Math.PI) / Math.cos(location.latitude * Math.PI / 180)
    const maxLat = location.latitude  + (distance / earthRadius) * (180 / Math.PI)
    const maxLng = location.longitude + (distance / earthRadius) * (180 / Math.PI) / Math.cos(location.latitude * Math.PI / 180)
    return { minLat: minLat, minLng: minLng, maxLat: maxLat, maxLng: maxLng }
}

module.exports = {
    coordsToPoint,
    pointToCoords,
    box
}