import { Router } from 'express'
import { AuthenticationController } from './authentication.controller'

import passport from 'passport'
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import { getDatabase } from '../common/database'

const userRouter = Router()

passport.use(new JWTStrategy({ 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_KEY }, 
    async (payload, done) => {
        
    if (typeof payload.username !== 'string') {
        return done("error")
    }

    const authenticationController = new AuthenticationController(getDatabase().collection('user'))
    const user = await authenticationController.findUser(payload.username)

    return done(null, user)
}))

export default userRouter