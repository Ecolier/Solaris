import { Collection } from 'mongodb'
import { User } from '../models/user'
import { Stranger } from '../models/stranger'
 
export class PrivacyController {

    constructor (
        private readonly user: User | Stranger,
        private readonly collection: Collection) { }

    async setSeenBy (username: String) {
        this.collection.updateOne({
            username: this.user.username
        }, { $addToSet: { seenBy: username }})
    }

    async setVisibleBy (username: String) {
        
        this.collection.updateOne(
            { username: this.user.username }, 
            { $pull: { hiddenFrom: username }}
        )

        
        this.collection.updateOne(
            { username: username }, 
            { $pull: { hiddenFrom: this.user.username }}
        )
    }

    async setHiddenFrom (username: String) {

        // Hide me from targeted user
        this.collection.updateOne(
            { username: this.user.username }, 
            { $addToSet: { hiddenFrom: username }}
        )

        // And targeted user from me
        this.collection.updateOne(
            { username: username }, 
            { $addToSet: { hiddenFrom: this.user.username }}
        )
    }

    async isHiddenFrom (username: String): Promise<boolean> {

        // I am hidden from targeted user if I am hiding from him or if targeted user is hiding from me
        const result = await this.collection.findOne({ 
            $or: [
                { $and: [ { username: this.user.username }, { hiddenFrom: username }] },
                { $and: [ { username: username}, { hiddenFrom: this.user.username }] }
            ]
        })


        return result ? true : false
    }

}