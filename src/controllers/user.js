const RedisConnection = require('../redis/redis');

class User {

    static async login(req, res){
        const body = req.body;
        if(!body || !(body.username && body.password)) return res.status(404).json({status:404, message: "datos no enviados"});
        return res.status(200).json({body, message:"received"});

    }
    static async create(req, res){
        const body = req.body;
        const user = body.username;
        // create standar for creation of user 
        console.log("todo bien hasta aca!");
        await RedisConnection.create(user, JSON.stringify(body))
            .then((response) => {
                console.log("lo crea!");
                return res.status(201).send(response);
            })
            .catch((error)=>{
                console.log("Error !!");
                console.log(error);
                return res.status(400).send(error);
            });
    }
}

module.exports = User;