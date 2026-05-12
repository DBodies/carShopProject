import createHttpError from "http-errors"
import { userCollection } from "../collections/userCollection.js"
import bcrypt from 'bcrypt'
import { randomBytes } from "crypto"
import { FIFTEEN_MINUTE, ONE_DAY, SMTP_KEYS, TEMPLATES_DIR } from "../constant/index.js"
import { sessionCollection } from "../collections/sessionCollection.js"
import jwt from 'jsonwebtoken'
import { getEnvVar } from "../middlewares/getEnvVar.js"
import { sendEmail } from "../utils/transporter.js"
import fs from 'node:fs/promises'
import path from 'node:path'
import handlebars from "handlebars"
import { getFullNameFromTokenPayload, validateCode } from "../utils/googleOAuth.js"

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
if(!user) {
    throw createHttpError(404, 'User not found')
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
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTE),
        refreshToken,
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
    })
}

export const createSession = () => {
    const accessToken = randomBytes(64).toString('base64')
    const refreshToken = randomBytes(64).toString( 'base64')
    return {
        accessToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTE),
        refreshToken,
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY)
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
export const requestResetEmail = async (email) => {
    const isEmail = await userCollection.findOne({ email })
    if (!isEmail) {
        throw createHttpError(404, 'Email not found')
    }
    const resetToken = jwt.sign({
        sub: isEmail._id,
        email
    },
        getEnvVar('JWT_SECRET'), {
        expiresIn: '15m'
    }
    )
    const resetPasswordTemplate = path.join(TEMPLATES_DIR,
        'reset-password.html'
    )
    const templateSource = (await fs.readFile(resetPasswordTemplate)).toString()
    const template = handlebars.compile(templateSource)
    const html = template({
        name: isEmail.name,
        link: `${getEnvVar(`APP_DOMAIN`)}/reset-password?token=${resetToken}`
    })

    await sendEmail({
        from: getEnvVar(SMTP_KEYS.SMTP_FROM),
        to: email,
        subject: 'Reset your password',
        html
    })
}

export const resetPassword = async (payload) => {
    let entries
    try {
        entries = jwt.verify(payload.token, getEnvVar('JWT_SECRET'))
    } catch (err) {
        if (err instanceof Error) throw createHttpError(401, err.message)
        throw err
    }
    const user = await userCollection.findOne({
        email: entries.email,
        _id: entries.sub
    })
    if (!user) {
        throw createHttpError(401, 'User not found')
    }
    const encryptedPassword = await bcrypt.hash(payload.password, 10)
    await userCollection.updateOne(
        { _id: user._id },
        {password: encryptedPassword}
    )
}
export const loginOrSignUpWithGoogle = async (code) => {
    const loginTicket = await validateCode(code)
    const payload = loginTicket.getPayload()
    if (!payload) throw createHttpError(401)
    
    let user = await userCollection.findOne({ email: payload.email })
    if (!user) {
        const password = await bcrypt.hash(randomBytes(10), 10)
        user = await userCollection.create({
            email: payload.email,
            name: getFullNameFromTokenPayload(payload),
            password,
            role: 'user'
        })
    }
        const newSession = createSession()
        return await sessionCollection.create({
            userId: user._id,
            ...newSession
        })
    }
