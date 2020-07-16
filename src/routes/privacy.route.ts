import { Router } from 'express'
import { PrivacyController } from '../controllers/privacy.controller'

const privacyRouter = Router()

privacyRouter.post('/mode', async (req, res, next) => {

    const privacyController = new PrivacyController(res.locals.userCollection)

    switch (req.body.mode) {
        case 'hidden': { 
            privacyController.setHiddenFrom(res.locals.user, req.body.target) 
            break
        }
        case 'visible': { 
            privacyController.setVisibleBy(res.locals.user, req.body.target) 
            break
        }
    }

})

privacyRouter.get('/mode', async (req, res, next) => {

    if (typeof req.query.target !== 'string') {
        return res.status(400).send()
    }

    const privacyController = new PrivacyController(res.locals.userCollection)
    const isHiddenFromUser = await privacyController.isHiddenFrom(res.locals.user, req.query.target)

    return res.send(isHiddenFromUser)

})

privacyRouter.get('/hidden', async (req, res, next) => {

    const privacyController = new PrivacyController(res.locals.userCollection)


})
    
export default privacyRouter