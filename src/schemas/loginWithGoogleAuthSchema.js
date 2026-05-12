import Joi from "joi";

export const loginWithGoogleAuthSchema = Joi.object({
    code: Joi.string().required()
})