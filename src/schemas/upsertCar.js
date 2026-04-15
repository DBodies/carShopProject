import Joi from 'joi'

export const createCarSchema = Joi.object({
  _id: Joi.string()
    .required()
    .messages({
      'string.base': '_id must be a string',
      'any.required': '_id is required'
    }),

  brand: Joi.string()
    .required()
    .messages({
      'string.base': 'Brand must be a string',
      'any.required': 'Brand is required'
    }),

  model: Joi.string()
    .required()
    .messages({
      'string.base': 'Model must be a string',
      'any.required': 'Model is required'
    }),

  year: Joi.number()
    .min(1950)
    .max(new Date().getFullYear() + 1)
    .required()
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be >= 1950',
      'number.max': 'Year is too big',
      'any.required': 'Year is required'
    }),

  price_use: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative',
      'any.required': 'Price is required'
    }),

  mileage_km: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'Mileage must be a number',
      'number.min': 'Mileage cannot be negative',
      'any.required': 'Mileage is required'
    }),

  engine: Joi.object({
    type: Joi.string()
      .valid('petrol', 'diesel', 'hybrid', 'electric')
      .required()
      .messages({
        'any.only': 'Engine type must be petrol/diesel/hybrid/electric',
        'any.required': 'Engine type is required'
      }),

    volume_l: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'Engine volume must be a number',
        'number.min': 'Engine volume cannot be negative',
        'any.required': 'Engine volume is required'
      }),

    power_hp: Joi.number()
      .min(0)
      .required()
      .messages({
        'number.base': 'Engine power must be a number',
        'number.min': 'Engine power cannot be negative',
        'any.required': 'Engine power is required'
      })
  })
    .required()
    .messages({
      'any.required': 'Engine is required'
    }),

  transmission: Joi.string()
    .valid('manual', 'automatic', 'cvt', 'robot')
    .required()
    .messages({
      'any.only': 'Transmission must be manual/automatic/cvt/robot',
      'any.required': 'Transmission is required'
    }),

  drivetrain: Joi.string()
    .valid('fwd', 'rwd', 'awd', '4wd')
    .required()
    .messages({
      'any.only': 'Drivetrain must be fwd/rwd/awd/4wd',
      'any.required': 'Drivetrain is required'
    }),

  body_type: Joi.string()
    .valid('sedan', 'hatchback', 'wagon', 'suv', 'coupe', 'convertible', 'pickup', 'van')
    .required()
    .messages({
      'any.only': 'Invalid body type',
      'any.required': 'Body type is required'
    }),

  color: Joi.string()
    .required()
    .messages({
      'string.base': 'Color must be a string',
      'any.required': 'Color is required'
    }),

  features: Joi.array()
    .items(Joi.string())
    .default([])
    .messages({
      'array.base': 'Features must be an array of strings'
    }),

  in_stock: Joi.boolean()
    .default(true)
    .messages({
      'boolean.base': 'in_stock must be boolean'
    })
})
export const carPatchSchema = Joi.object({
  brand: Joi.string().messages({
    'string.base': 'Brand must be a string'
  }),

  model: Joi.string().messages({
    'string.base': 'Model must be a string'
  }),

  year: Joi.number()
    .min(1950)
    .max(new Date().getFullYear() + 1)
    .messages({
      'number.base': 'Year must be a number',
      'number.min': 'Year must be >= 1950',
      'number.max': 'Year is too big'
    }),

  price_use: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Price must be a number',
      'number.min': 'Price cannot be negative'
    }),

  mileage_km: Joi.number()
    .min(0)
    .messages({
      'number.base': 'Mileage must be a number',
      'number.min': 'Mileage cannot be negative'
    }),

  engine: Joi.object({
    type: Joi.string()
      .valid('petrol', 'diesel', 'hybrid', 'electric')
      .messages({
        'any.only': 'Engine type must be petrol/diesel/hybrid/electric'
      }),

    volume_l: Joi.number()
      .min(0)
      .messages({
        'number.base': 'Engine volume must be a number',
        'number.min': 'Engine volume cannot be negative'
      }),

    power_hp: Joi.number()
      .min(0)
      .messages({
        'number.base': 'Engine power must be a number',
        'number.min': 'Engine power cannot be negative'
      })
  }),

  transmission: Joi.string()
    .valid('manual', 'automatic', 'cvt', 'robot')
    .messages({
      'any.only': 'Transmission must be manual/automatic/cvt/robot'
    }),

  drivetrain: Joi.string()
    .valid('fwd', 'rwd', 'awd', '4wd')
    .messages({
      'any.only': 'Drivetrain must be fwd/rwd/awd/4wd'
    }),

  body_type: Joi.string()
    .valid('sedan', 'hatchback', 'wagon', 'suv', 'coupe', 'convertible', 'pickup', 'van')
    .messages({
      'any.only': 'Invalid body type'
    }),

  color: Joi.string().messages({
    'string.base': 'Color must be a string'
  }),

  features: Joi.array()
    .items(Joi.string())
    .messages({
      'array.base': 'Features must be an array of strings'
    }),

  in_stock: Joi.boolean().messages({
    'boolean.base': 'in_stock must be boolean'
  })

})
  .min(1) // важно — хотя бы одно поле должно прийти
  .messages({
    'object.min': 'At least one field must be provided for update'
  })