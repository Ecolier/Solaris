import express from 'express'
import authentication from './api/authentication'

const application = express()

application.use(express.json())
application.use('/user', authentication)

export default application