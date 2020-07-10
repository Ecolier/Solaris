import express from 'express'

import authenticationRouter from './api/authentication'
import privacyRouter from './api/privacy'

const application = express()

application.use(express.json())
application.use('/user', authenticationRouter)
application.use('/user/privacy', privacyRouter)

export default application