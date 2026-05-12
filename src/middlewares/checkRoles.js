import createHttpError from "http-errors"

export const authorization = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(createHttpError(403, 'Forbidden'))
        }
        next()
    }
}