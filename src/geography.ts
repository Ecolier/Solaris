import { Coordinates } from "./models/coordinates"

const coordsToPoint = (longitude: number, latitude: number): any => {
    return { type: 'Point', coordinates: [longitude, latitude] }
}

const pointToCoords = (point: any): Coordinates => {
    return { longitude: point.coordinates[0], latitude: point.coordinates[1] }
}

const box = (longitude: number, latitude: number, distance: number): [number, number, number, number] => {
    const earthRadius = 6371
    const minLat = latitude  - (distance / earthRadius) * (180 / Math.PI)
    const minLng = longitude - (distance / earthRadius) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180)
    const maxLat = latitude  + (distance / earthRadius) * (180 / Math.PI)
    const maxLng = longitude + (distance / earthRadius) * (180 / Math.PI) / Math.cos(latitude * Math.PI / 180)
    return [minLng, maxLng, minLat, maxLat]
}

export {
    coordsToPoint,
    pointToCoords,
    box
}