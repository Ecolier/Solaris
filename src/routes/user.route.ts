import { Router } from 'express'
import { AuthenticationController } from '../controllers/authentication.controller'

const userRouter = Router()

userRouter.use(async (req, res, next) => {

    if (typeof req.query.username !== 'string' ||
        typeof req.query.password !== 'string') {
        return res.status(400).send()
    }

    const authenticationController = new AuthenticationController(res.locals.userCollection)

    const user = await authenticationController.login(
        req.query.username, 
        req.query.password
    )

    if (!user) { return res.status(401).send() }

    res.locals.user = user

    return next()
})
    
export default userRouter