import { Collection } from 'mongodb'
import { User } from '../models/user'
import { coordsToPoint, box } from '../geography'
import { Stranger } from '../models/stranger'
 
export class LocationController {

    constructor (
        private readonly user: User,
        private readonly collection: Collection) { }

    async updateLocation (longitude: number, latitude: number) {
        this.collection.updateOne({
            $and: [
                { username : this.user.username },
                { password: this.user.password },
            ]
        }, 
        {
            $set: {
                location: coordsToPoint(longitude, latitude)
            }
        })
    }

    async findInBounds (minLng: number, maxLng: number, minLat: number, maxLat: number): Promise<User[]> {
        const results = await this.collection.find({
            $and: [
                { username: { $ne: this.user.username }},
                { hiddenFrom: { $ne: this.user.username }},
                { 'location.coordinates.0':  { $gt: minLng }},
                { 'location.coordinates.0':  { $lt: maxLng }},
                { 'location.coordinates.1':  { $gt: minLat }},
                { 'location.coordinates.1':  { $lt: maxLat }},
            ]
        }).toArray()

        return results.map((result) => {
            return {
                username: result.username,
                password: result.password,
                longitude: result.location.coordinates[0],
                latitude: result.location.coordinates[1]
            }
        })
    }

}