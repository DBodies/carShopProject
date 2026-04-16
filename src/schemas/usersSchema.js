import Joi from 'joi'

export const createUserSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(50)
        .trim()
        .required()
        .messages({
            'string.base': 'Name must be a string',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name must be at least 2 characters',
            'any.required': 'Name is required'
        }),

    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            'string.email': 'Email must be valid',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required'
        }),

    password: Joi.string()
        .min(6)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required'
        })
})
export const loginUserSchema = Joi.object({
    email: Joi.string()
        .email()
        .trim()
        .required()
        .messages({
            'string.email': 'Email must be valid',
            'string.empty': 'Email cannot be empty',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(6)
        .max(100)
        .trim()
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters',
            'string.empty': 'Password cannot be empty',
            'any.required': 'Password is required'
        })
})