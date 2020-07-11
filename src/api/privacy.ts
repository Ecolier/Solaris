import { Router } from 'express'
import { database } from '../database'
import { AuthenticationController } from '../controllers/authentication-controller'
import { PrivacyController } from '../controllers/privacy-controller'
import { type } from 'os'

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
        case 'hidden': { 
            privacyController.setHiddenFrom(req.body.target) 
            break
        }
        case 'visible': { 
            privacyController.setVisibleBy(req.body.target) 
            break
        }
    }

})

privacyRouter.get('/', async (req, res, next) => {

    const authenticationController = new AuthenticationController(database().collection('user'))

    if (typeof req.query.username !== 'string' ||
        typeof req.query.password !== 'string' ||
        typeof req.query.target !== 'string') {
        return res.status(400).send()
    }
    const user = await authenticationController.login(
        req.query.username, 
        req.query.password
    )

    if (!user) {
        return next('router')
    }

    const privacyController = new PrivacyController(user, database().collection('user'))
    const isHiddenFromUser = await privacyController.isHiddenFrom(req.query.target)

    res.send(isHiddenFromUser)

})
    
export default privacyRouter