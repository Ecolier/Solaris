import { Router } from 'express'
import { database } from '../database'
import { AuthenticationController } from '../controllers/authentication-controller'
import { PrivacyController } from '../controllers/privacy-controller'

const privacyRouter = Router()

privacyRouter.post('/', async (req, res, next) => {

    const authenticationController = new AuthenticationController(database().collection('user'))

    const user = await authenticationController.login(
        req.body.username, 
        req.body.password
    )

    if (!user) {
        return next('router')
    }

    const privacyController = new PrivacyController(user, database().collection('user'))

    switch (req.body.mode) {
        case 'hidden': privacyController.setHiddenFrom(req.body.target)
        case 'visible': privacyController.setVisibleBy(req.body.target)
    }

})
    
export default privacyRouter