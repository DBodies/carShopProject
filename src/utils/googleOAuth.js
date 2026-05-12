import path from 'node:path'
import { readFile } from 'fs/promises'
import { OAuth2Client } from 'google-auth-library'
import {getEnvVar} from '../middlewares/getEnvVar.js'
import dotenv from 'dotenv'
import createHttpError from 'http-errors'


dotenv.config()

const PATH_JSON = path.join(process.cwd(),'google-OAuth.json')
const parsePath = JSON.parse(await readFile(PATH_JSON))
const clientInfo = new OAuth2Client({
    clientId: getEnvVar("AUTH_CLIENT_ID"),
    clientSecret: getEnvVar('AUTH_CLIENT_SECRET'),
    redirectUri: parsePath.web.redirect_uris[0]
})

export const authUrl = () => {
    return clientInfo.generateAuthUrl({
        scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        ]
    })
}
export const validateCode = async (code) => {
    const res = await clientInfo.getToken(code)
    if (!res.tokens.id_token) {
        throw createHttpError(401, 'Unauthorized')
    }
    const ticket = await clientInfo.verifyIdToken({ idToken: res.tokens.id_token })
    return ticket
}
export const getFullNameFromTokenPayload = (payload) => {
    let fullName = 'user'
    if (payload.given_name && payload.family_name) {
        fullName =`${payload.given_name} ${payload.family_name}`
    } else if (payload.given_name) {
        fullName = payload.given_name
    }
    return fullName
}