import { NextFunction, Request, Response } from 'express'
import { DatabaseService } from '../database.service'


/** 
const userRouter = Router()

passport.use(new JWTStrategy({ 
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrKey: process.env.JWT_KEY }, 
  async (payload, done) => {
    
    if (typeof payload.username !== 'string') {
      return done("error")
    }
    
    const authenticationController = new AuthenticationController()
    const user = await authenticationController.findUser(payload.username)
    
    return done(null, user)
  }))
  
  userRouter.use('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return next()
  })
  
  export default userRouter
  
  */