import { Collection } from 'mongodb'
import { User } from '../models/user'
 
export class PrivacyController {

    constructor (
        private readonly user: User,
        private readonly collection: Collection) { }

    hideFrom (username: String) {

        this.collection.updateOne({
            username: this.user.username,
        }, {

        })

    }

    isHiddenFrom (username: String) {

    }

}