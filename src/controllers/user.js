const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const RedisConnection = require('../redis/redis');
const RickAndMortyApi = require('../controllers/api/rickandmortyApi');

class User {

    static async login(req, res){
        const { body } = req;
        const { username, password } = body;
        //see if user is created
        const isCreated = await RedisConnection.find(username);
        if(!isCreated){
            return res.status(400).send({status : 400, message: "Usuario no existe existe"});
        }else{
            const result = JSON.parse(isCreated);
            const {password:compare, user, email} = result;
            if(bcrypt.compareSync(password, compare)){
                // token creation 
            
                const token = jwt.sign({
                    username,
                    user,
                    email,
                    appname : process.env.APP_NAME         
                },process.env.JWT_KEY, {expiresIn : "2m"});

                return res.status(200).send({status:200, message: "connected", token})
            
            }else{
                return res.status(400).send({status:400, message: "usuario o contraseña incorrecta"});
            }
        }
    }

    static async create(req, res){
        const { body } = req;
        const { username:user } = body;

        const isCreated = await RedisConnection.find(user);
        if(!isCreated){
            // encrypt password here too
            let encryptedBody = {...body};
            encryptedBody.password = bcrypt.hashSync(encryptedBody.password, 10);
            //created 
            await RedisConnection.create(user, JSON.stringify(encryptedBody))
            .then((response) => {
                return res.status(201).send(response);
            })
            .catch((error)=>{
                return res.status(400).send(error);
            });
        }else{
            return res.status(400).send({status:303 , message: "Usuario ya existe"})
        }
    }
    static async getCharacters(req, res){
        const { params } = req;
        const { page , count } = params;

        const response = await RickAndMortyApi.getPage(page,count);
        return res.status(response.status).send({...response.data})
    }
}

module.exports = User;