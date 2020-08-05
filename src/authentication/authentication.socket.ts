import { Socket } from "socket.io";
import { User } from "../models/user";
import { UserPayload } from "../models/user-payload";
import { AuthenticationController } from "./authentication.controller";
import * as jwt from 'jsonwebtoken'

export interface AuthenticationError {
    name: string,
    description: string,
}

export const authenticate = async (socket: Socket, request: any): Promise<User | AuthenticationError> => {
    if (typeof request.token !== 'string') {
        return { name: 'error', description: 'malformed request' }
    }

    if (typeof process.env.JWT_KEY !== 'string') {
        throw 'JWT_KEY is not setup properly'
    }

    const token = request.token
    const key = process.env.JWT_KEY

    // Extract payload which contains the username and try to find the user
    const payload = jwt.verify(token, key) as UserPayload
    const authenticationController = new AuthenticationController()
    const user = await authenticationController.findUser(payload.username)

    if (!user) {
        return { name: 'error', description: 'authentication error' }
    }

    return user
}