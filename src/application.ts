import express from 'express'

import authenticationRouter from './routes/authentication.route'
import privacyRouter from './routes/privacy.route'
import userRouter from './routes/user.route'

import { getDatabase } from './database'
import passport from 'passport'

const application = express()
application.use(express.json())
application.use(passport.initialize())
application.use(passport.session())

application.use((req, res, next) => {
    const database = getDatabase()
    res.locals.database = database
    res.locals.userCollection = database.collection('user')
    return next()
})

application.use('/auth', authenticationRouter)

userRouter.use('/privacy', privacyRouter)
application.use('/user', userRouter)

export default application