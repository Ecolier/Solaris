import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication.controller'

import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getDatabase } from '../database'

const userRouter = Router()

passport.use(new LocalStrategy(async (username, password, done) => {
    const authenticationController = new AuthenticationController(getDatabase().collection('user'))
    const user = await authenticationController.login(username, password)
    if (!user) { return done(401) }
    return done(null, user)
}))

export default userRouter