import { ONE_DAY } from "../constant/index.js"
import { loginUser, logoutUser, refreshSession, registerUser } from "../services/auth.js"

export const registerUserController = async (req,res) => {
    const result = await registerUser(req.body)
    res.status(200).json({
        message: 'User created',
        data: {
            id: result._id,
            name: result.name,
            email: result.email
        }
    })
}

export const loginUserController = async (req,res) => {
    const result = await loginUser(req.body)
    res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    })
    res.cookie('sessionId', result._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    })
    res.status(200).json({
        message: "Logged in",
        data: {
            accessToken: result.accessToken
        }
    })
}

const setupSession = (res, session) => {
        res.cookie('refreshToken', session.refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    })
    res.cookie('sessionId', session._id, {
        httpOnly: true,
        expires: new Date(Date.now() + ONE_DAY)
    })
}

export const logoutUserController = async (req, res) => {
    if (req.cookies.sessionId) {
        await logoutUser(res.cookies.sessionId)
    }
    res.clearCookie('sessionId')
    res.clearCookie('refreshId')
    res.status(204).send()
}
export const refreshSessionController = async (req, res) => {
    const session = await refreshSession({
        sessionId:req.cookies.sessionId,
        refreshToken:req.cookies.refreshToken
    })
    setupSession(res, session)
    res.status(200).json({
        message: 'Successfully update a session',
        data: {
            accessToken: session.accessToken
        }
    })
}