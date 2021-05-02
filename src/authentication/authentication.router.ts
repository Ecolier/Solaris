import { Router } from 'express'
import { DatabaseService } from '../database.service'
import { AuthenticationController } from './authentication.controller'

const passport = require('passport')

export class AuthenticationRouter {
    router = Router()

    constructor(private databaseServicer: DatabaseService) {}

    authenticationRouter.get('/register', async (req, res, next) => {
        const authenticationController = new AuthenticationController()
        const token = await authenticationController.register()
        return res.json({ token: token })
    })
    
    authenticationRouter.get('/login', passport.authenticate('jwt', { session: false}), async (req, res, next) => {
        return res.send(req.user)
    })
    
    export default authenticationRouter
}
