import { Router } from 'express'
import { PrivacyController } from '../controllers/privacy.controller'

const privacyRouter = Router()

privacyRouter.post('/', async (req, res, next) => {

    const privacyController = new PrivacyController(res.locals.user, res.locals.userCollection)

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

    if (typeof req.query.target !== 'string') {
        return res.status(400).send()
    }

    const privacyController = new PrivacyController(res.locals.user, res.locals.userCollection)
    const isHiddenFromUser = await privacyController.isHiddenFrom(req.query.target)

    res.send(isHiddenFromUser)

})

privacyRouter.get('/hidden', async (req, res, next) => {

    const privacyController = new PrivacyController(res.locals.user, res.locals.userCollection)

})
    
export default privacyRouter