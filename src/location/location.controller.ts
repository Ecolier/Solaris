import { Collection } from 'mongodb'
import { User } from '../models/user'
import { coordsToPoint, box } from '../common/geography'
import { Stranger } from '../models/stranger'
import { getUserCollection } from '../database.service'
 
export class LocationController {

    private readonly collection = getUserCollection()

    async updateLocation (username: string, longitude: number, latitude: number) {
        this.collection.updateOne({
            username : username
        }, 
        {
            $set: {
                location: coordsToPoint(longitude, latitude)
            }
        })
    }

    async findInBounds (username: string, minLng: number, maxLng: number, minLat: number, maxLat: number): Promise<Stranger[]> {
        const results = await this.collection.find({
            $and: [
                { username: { $ne: username }},
                { hiddenFrom: { $ne: username }},
                { 'location.coordinates.0':  { $gt: minLng }},
                { 'location.coordinates.0':  { $lt: maxLng }},
                { 'location.coordinates.1':  { $gt: minLat }},
                { 'location.coordinates.1':  { $lt: maxLat }},
            ]
        }).toArray()

        return results.map((result) => {
            return {
                username: result.username,
                longitude: result.location.coordinates[0],
                latitude: result.location.coordinates[1]
            }
        })
    }

}