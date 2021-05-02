import { Router } from 'express'
import { PrivacyController } from './privacy.controller'
import passport from 'passport'
import { getUserCollection, getDatabase } from '../database.service'
import { User } from '../models/user'

const privacyRouter = Router()

privacyRouter.post('/mode', async (req, res, next) => {

    const privacyController = new PrivacyController()

    if (typeof req.user === 'undefined') {
        return
    } 

    const user = req.user as User
    const target = req.body.target

    switch (req.body.mode) {
        case 'hidden': { 
            privacyController.setHiddenFrom(user.username, target) 
            break
        }
        case 'visible': { 
            privacyController.setVisibleBy(user.username, target) 
            break
        }
    }

})

privacyRouter.get('/mode', async (req, res, next) => {

    if (typeof req.query.target !== 'string' ||
        typeof req.user === 'undefined') {
        return res.status(400).send()
    }

    const user = req.user as User
    const target = req.query.target

    const privacyController = new PrivacyController()
    const isHiddenFromUser = await privacyController.isHiddenFrom(user.username, target)

    return res.send(isHiddenFromUser)

})

privacyRouter.get('/hidden', async (req, res, next) => {

    const privacyController = new PrivacyController()


})
    
export default privacyRouter