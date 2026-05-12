import path from 'node:path'

export const SORT_VALUE = {
    ASC: 'asc',
    DESC: 'desc'
}
export const ONE_DAY = 24 * 60 * 60 * 1000
export const FIFTEEN_MINUTE = 15 * 60 * 1000

export const ROLES = {
    admin: 'admin',
    user: 'user', 
}
export const SMTP_KEYS = {
    SMTP_SERVER: 'SMTP_SERVER',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_LOGIN: 'SMTP_LOGIN',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM'
}
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates')
export const SWAGGER_PATH = path.join(process.cwd(), 'src','docs', 'swagger.json')