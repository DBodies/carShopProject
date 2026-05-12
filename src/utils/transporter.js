import nodemailer from 'nodemailer'
import { getEnvVar } from '../middlewares/getEnvVar.js'
import { SMTP_KEYS } from '../constant/index.js'
export const transporter = nodemailer.createTransport({
    host: getEnvVar(SMTP_KEYS.SMTP_SERVER),
    port: Number(getEnvVar(SMTP_KEYS.SMTP_PORT)),
    auth: {
        user: getEnvVar(SMTP_KEYS.SMTP_LOGIN),
        pass: getEnvVar(SMTP_KEYS.SMTP_PASSWORD)
    }
})
export const sendEmail = async (options) => {
    return await transporter.sendMail(options)
}