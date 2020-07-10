import { Router } from 'express'
import { database } from '../database'
import { AuthenticationController } from '../controllers/authentication-controller'
import { PrivacyController } from '../controllers/privacy-controller'

const db = database()
const privacyRouter = Router()
const authenticationController = new AuthenticationController(db)

privacyRouter.post('/', async (req, res, next) => {

    const user = await authenticationController.login(
        req.body.username, 
        req.body.password
    )

    if (!user) {
        return next('router')
    }

    const privacyController = new PrivacyController(user, db.collection('user'))

    privacyController.hideFrom(req.body.target)

})
    
export default privacyRouter