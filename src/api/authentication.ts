import { Router } from 'express'
const validate = require('validate.js')

import { database } from '../database'
import * as schemas from './schemas'
import { AuthenticationController } from '../controllers/authentication-controller'

const authenticationRouter = Router()

authenticationRouter.get('/', async (req, res, next) => {
    const authenticationController = new AuthenticationController(database().collection('user'))
    res.send(
        authenticationController.register()
    )
})

authenticationRouter.post('/', async (req, res, next) => {
    
    if (validate(req.body, schemas.login)) {
        return res.status(400).send()
    }

    const username = req.body.username
    const password = req.body.password

    const authenticationController = new AuthenticationController(database().collection('user'))

    const user = await authenticationController.login(username, password)
    
    res.send(user)
})
    
export default authenticationRouter