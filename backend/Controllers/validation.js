const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const validationSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().email().required().min(6),
        password: Joi.string().min(6).required()
    })
    return validationSchema.validate(data);    
}

const loginValidation = (data) => {
    const validationSchema = Joi.object({
        email: Joi.string().email().required().min(6),
        password: Joi.string().min(6).required()
    })
    return validationSchema.validate(data);    
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;