import { Collection } from 'mongodb'
import { User } from '../models/user'
import { Stranger } from '../models/stranger'
import { getUserCollection } from '../database.service'
 
export class PrivacyController {

    private readonly collection = getUserCollection()

    async setSeenBy (username: string, targetUsername: string) {
        this.collection.updateOne({
            username: username
        }, { $addToSet: { seenBy: targetUsername }})
    }

    async setVisibleBy (username: string, targetUsername: string) {   
        this.collection.updateOne(
            { username: username }, 
            { $pull: { hiddenFrom: targetUsername }}
        )
    }

    async setHiddenFrom (username: string, targetUsername: string) {
        this.collection.updateOne(
            { username: username }, 
            { $addToSet: { hiddenFrom: targetUsername }}
        )
    }

    async isHiddenFrom (username: string, targetUsername: string): Promise<boolean> {

        // I am hidden from targeted user if I am hiding from him or if targeted user is hiding from me
        const result = await this.collection.findOne({ 
            $or: [
                { $and: [ { username: username }, { hiddenFrom: targetUsername }] },
                { $and: [ { username: targetUsername}, { hiddenFrom: username }] }
            ]
        })

        return result ? true : false
    }

}