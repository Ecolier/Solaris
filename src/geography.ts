import { Coordinates } from "./models/coordinates"

const coordsToPoint = (longitude: number, latitude: number): any => {
    return { type: 'Point', coordinates: [longitude, latitude] }
}

const pointToCoords = (point: any): Coordinates => {
    return { longitude: point.coordinates[0], latitude: point.coordinates[1] }
}

const box = (coordinates: Coordinates, distance: number) => {
    const earthRadius = 6371
    const minLat = coordinates.latitude  - (distance / earthRadius) * (180 / Math.PI)
    const minLng = coordinates.longitude - (distance / earthRadius) * (180 / Math.PI) / Math.cos(coordinates.latitude * Math.PI / 180)
    const maxLat = coordinates.latitude  + (distance / earthRadius) * (180 / Math.PI)
    const maxLng = coordinates.longitude + (distance / earthRadius) * (180 / Math.PI) / Math.cos(coordinates.latitude * Math.PI / 180)
    return { minLat: minLat, minLng: minLng, maxLat: maxLat, maxLng: maxLng }
}

export {
    coordsToPoint,
    pointToCoords,
    box
}