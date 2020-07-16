import { Router } from 'express'
import { AuthenticationController } from './authentication.controller'
import { getDatabase } from '../common/database'

const passport = require('passport')

const authenticationRouter = Router()

authenticationRouter.get('/register', async (req, res, next) => {
    const authenticationController = new AuthenticationController(getDatabase().collection('user'))
    const token = await authenticationController.register()
    return res.json({ token: token })
})

authenticationRouter.get('/login', passport.authenticate('jwt', { session: false}), async (req, res, next) => {
    return res.send(req.user)
})

export default authenticationRouter