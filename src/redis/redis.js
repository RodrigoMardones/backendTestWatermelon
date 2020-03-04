const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis);

class RedisConnection {
    constructor(){
        this.client = redis.createClient(process.env.REDISRS_PORT);
        this.client.on('connect', () => console.log("connected to redis"));
        this.client.on('error', () => console.log("error trying to connect with redis"));
    }
    getClient() {
        return this.client;
    }
    async find(key) {
        return await this.getClient().getAsync(key)
        .catch(() => null);
    }
    async create(key, value) {
        return await this.getClient().setAsync(key, value)
            .then(() => { return {status:200 , message:"created"}})
            .catch(() => {return {status : 400 , message:"error trying to create user"}});
    }
    async del(key) {
        return await this.getClient().delAsync(key)
            .then(() => { return {status:200 , message: "deleted"} })
            .catch(() => { throw new Error('failing deleting element'); });
    }
    async update(key, newValue) {
        return 'string' === typeof await this.find(key) ? await this.create(key, newValue) : new Error('failing updating element');
    }
}

module.exports = new RedisConnection();