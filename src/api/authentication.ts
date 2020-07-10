import { Router } from 'express'
const validate = require('validate.js')

import { database } from '../database'
import * as schemas from './schemas'
import { AuthenticationController } from '../controllers/authentication-controller'

const authenticationRouter = Router()
const authenticationController = new AuthenticationController(database())

authenticationRouter.get('/', async (req, res, next) => {
    res.send(authenticationController.register())
})

authenticationRouter.post('/', async (req, res, next) => {
    
    if (validate(req.body, schemas.login)) {
        res.status(400).send()
        next()
    }

    const username = req.body.username
    const password = req.body.password

    const user = await authenticationController.login(username, password)
    
    res.send(user)
})
    
export default authenticationRouter