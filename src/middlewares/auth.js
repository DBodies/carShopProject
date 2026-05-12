import createHttpError from "http-errors"
import { sessionCollection } from "../collections/sessionCollection.js"
import { userCollection } from "../collections/userCollection.js"

export const authenticate = async (req, res,next) => {
    const header = req.get('Authorization')
    if (!header) {
        next(createHttpError(401, 'Please pride the authorization header'))
        return
    }
    const bearer = header.split(" ")[0]
    const token = header.split(" ")[1]

    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Authorization header should be a type of bearer'))
        return
    }
    const session = await sessionCollection.findOne({accessToken: token})
    if (!session) {
        next(createHttpError(401, 'Session wasn`t found'))
        return
    }
    const isTokenExpired = new Date() > new Date(session.accessTokenValidUntil)
    if (isTokenExpired) {
        next(createHttpError(401, 'Token is expired'))
        return
    }
    const user = await userCollection.findById(session.userId) 
    if (!user) {
        next(createHttpError(401, 'User not found'))
        return
    }
    req.user = user
    next()
}