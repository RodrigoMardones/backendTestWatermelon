const Joi = require('@hapi/joi');


class Validator {
    static login(payload){
        const schema = Joi.object({
            username : Joi.string().alphanum().min(3).required(),
            password : Joi.string().alphanum().min(6).required()
        })
        return schema.validate(payload);
    }
    static create(payload){
        const schema = Joi.object({
            name : Joi.string().required(),
            email: Joi.string().required(),
            username : Joi.string().alphanum().min(3).required(),
            password : Joi.string().alphanum().min(6).required(),
        })
        return schema.validate(payload);
    }
}

module.exports = Validator;