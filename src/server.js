const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes/routes');


class Server {

    constructor(port){
        this.port = port;
        this.app = express();
    }

    static init(port){
        return new Server(port);
    }

    config(){
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use("/", router);
    }

    start(callback){
        this.config();
        this.app.listen(this.port, callback);
    }
}

module.exports = Server