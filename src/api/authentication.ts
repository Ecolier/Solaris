import { Router } from 'express'
import validate from 'validate.js'

import { database } from '../database'
import * as schemas from './schemas'
import * as userController from '../user-controller'

const authenticationRouter = Router()

authenticationRouter.get('/', async (req, res, next) => {
    res.send(userController.register())
})

authenticationRouter.post('/', async (req, res, next) => {
    
    if (validate(req.body, schemas.login)) {
        res.status(400).send()
        next()
    }

    const username = req.body.username
    const password = req.body.password

    const user = await userController.login(username, password)
    
    res.send(user)
})
    
export default authenticationRouter