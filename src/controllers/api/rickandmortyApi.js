const axios = require('axios');

class RickMortyApi {
    static async getPage(pages, count){
        const request = await axios({
            url: process.env.RNM_API,
            method: "get",
            params : {
                pages,
                count,
            }
        }).catch((error) => error);
        return request;
    }
    static parsePayload(page){
        // parse here the info
        
    }
}

module.exports = RickMortyApi;