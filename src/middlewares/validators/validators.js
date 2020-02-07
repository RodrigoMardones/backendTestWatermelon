const Joi = require('@hapi/joi');


class Validator {
    static login(payload){
        const schema = Joi.object({
            username : Joi.string().alphanum().min(3),
            password : Joi.string().alphanum().min(6)
        })
        return schema.validate(payload);
    }
    static create(payload){
        const schema = Joi.object({
            name : Joi.string(),
            email: Joi.string(),
            username : Joi.string().alphanum().min(3),
            password : Joi.string().alphanum().min(6),
            confirmPassword: Joi.string().alphanum().min(6)
        })
        return schema.validate(payload);
    }

}

module.exports = Validator;