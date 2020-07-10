import { Collection } from 'mongodb'
import { User } from '../models/user'
 
export class PrivacyController {

    constructor (
        private readonly user: User,
        private readonly collection: Collection) { }

    setSeenBy (username: String) {
        this.collection.updateOne({
            username: this.user.username
        }, { $addToSet: { seenBy: username }})
    }

    setVisibleBy (username: String) {
        
    }

    setHiddenFrom (username: String) {
        this.collection.updateOne(
            { username: this.user.username }, 
            { $addToSet: { hiddenFrom: username }}
        )
    }

    async isHiddenFrom (username: String): Promise<boolean> {
        const result = await this.collection.findOne({ 
            username: this.user.username, 
            hiddenFrom: { $elemMatch: { $eq: username }}
        })
        return result ? true : false
    }

}