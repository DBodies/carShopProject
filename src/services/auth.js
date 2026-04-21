import createHttpError from "http-errors"
import { userCollection } from "../collections/userCollection.js"
import bcrypt from 'bcrypt'
import { randomBytes } from "crypto"
import { FIFTEEN_MINUTE, ONE_DAY } from "../constant/index.js"
import { sessionCollection } from "../collections/sessionCollection.js"

export const registerUser = async (payload) => {
    if (!payload.password) {throw createHttpError(400, 'Password is required')
    }
    const user = await userCollection.findOne({email: payload.email})
    if(user) {
        throw createHttpError(409, 'Email in use')
    } 

    const encryptedPassword = await bcrypt.hash(payload.password, 10)
    
    return await userCollection.create({
        ...payload,
        password: encryptedPassword
    })
}
export const loginUser = async (payload) => {
const user = await userCollection.findOne({email: payload.email})
if(user) {
    throw createHttpError(409, 'Email in use')
    } 
    const isEqual = await bcrypt.compare(payload.password, user.password)
    if(!isEqual) {
        throw createHttpError(403, 'Unauthorized')
    }
    await sessionCollection.deleteOne({userId: user._ud})

    const accessToken = randomBytes(64).toString('base64')
    const refreshToken = randomBytes(64).toString( 'base64')

    return await sessionCollection.create({
        userId: user._id,
        accessToken,
        accessTokenValidUntil: new Date(Date.now + FIFTEEN_MINUTE),
        refreshToken,
        refreshTokenValidUntil: new Date(Date.now + ONE_DAY)
    })
}

export const createSession = () => {
    const accessToken = randomBytes(64).toString('base64')
    const refreshToken = randomBytes(64).toString( 'base64')
    return {
        accessToken,
        accessTokenValidUntil: new Date(Date.now + FIFTEEN_MINUTE),
        refreshToken,
        refreshTokenValidUntil: new Date(Date.now + ONE_DAY)
    }
}
export const logoutUser = async (sessionId) => {
    await sessionCollection.deleteOne({_id: sessionId})
}
export const refreshSession = async ({ sessionId, refreshToken }) => {
    const session = await sessionCollection.findOne({_id:sessionId, refreshToken})
    if (!session) {
        throw createHttpError(401, 'Session not found')
    }
    const isTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isTokenExpired) {
        throw createHttpError(401, 'Token is expired')
    }
    const newSession = createSession()
    await sessionCollection.deleteOne({_id:sessionId, refreshToken})
    return sessionCollection.create({
        userId: session.userId,
        ...newSession

    })
}