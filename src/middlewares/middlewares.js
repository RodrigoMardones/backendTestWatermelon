const Validator = require('./validators/validators');


class CustomMiddlewares {
    static async bodyValidationLogin(req, res, next){
        const body = req.body;
        const validation = Validator.login(body);
        // console.log(JSON.stringify(Validator));
        return !validation.error ? next() : res.status(400).send(validation);
    }
    static async bodyValidationCreate(req, res, next) {
       const body = req.body;
       const validation = Validator.create(body);
       return !validation.error ? next() : res.status(400).send(validation);

    }
}

module.exports = CustomMiddlewares;