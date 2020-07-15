import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication.controller'

const authenticationRouter = Router()

authenticationRouter.get('/register', async (req, res, next) => {
    const authenticationController = new AuthenticationController(res.locals.userCollection)
    res.send(authenticationController.register())
})

authenticationRouter.post('/login', async (req, res, next) => {
    
    if (typeof req.body.username !== 'string' ||
        typeof req.body.password !== 'string') {
        return res.status(400).send()
    }
    
    const authenticationController = new AuthenticationController(res.locals.userCollection)
    return res.send(await authenticationController.login(req.body.username, req.body.password))
})

export default authenticationRouter